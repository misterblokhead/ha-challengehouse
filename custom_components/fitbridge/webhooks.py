"""One webhook per person in scoring.toml: Health Exporter exports (ZIP or JSON) and OpenTracks GPX files in."""
import hmac
import logging
import secrets

from aiohttp import web
from homeassistant.components import webhook
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.network import NoURLAvailableError, get_url

from .const import DOMAIN, OPT_LOCAL_ONLY, OPT_REQUIRE_TOKEN, WEBHOOK_TOKENS, WEBHOOKS
from .engine.ingest import Unreadable
from .views import _read_limited

_LOGGER = logging.getLogger(__name__)
MAX_BODY = 16 * 1024 * 1024  # HA's own request limit


@callback
def async_url(hass: HomeAssistant, webhook_id: str) -> str:
    """HA's external URL, else its Nabu Casa remote UI URL, else its internal one; the bare path when there is none.
    Not webhook.async_generate_url: it never offers the remote UI URL. Never a Nabu Casa cloudhook: its relay carries
    the body as text, which breaks ZIP exports (the remote UI is a TLS passthrough, so it passes them intact)."""
    try:
        return get_url(hass, prefer_external=True) + webhook.async_generate_path(webhook_id)
    except NoURLAvailableError:
        return webhook.async_generate_path(webhook_id)


@callback
def async_external(hass: HomeAssistant) -> bool:
    """Whether a phone away from home can reach the webhook: HA has an external URL or a Nabu Casa remote UI."""
    try:
        get_url(hass, allow_internal=False, prefer_external=True)
    except NoURLAvailableError:
        return False
    return True


@callback
def async_setup(hass: HomeAssistant, entry: ConfigEntry, people) -> None:
    """Registers a webhook for each person in people and each one made before. Ids are made once and kept in the entry,
    so a phone keeps its URL; one made before stays registered while scoring.toml is broken (HA answers 200 for an
    unregistered id, so the phone would never retry) or no longer names that person (its rows are not scored).
    With the token option each webhook also gets a token, made once and kept like its id; the options apply at registration,
    so a change of them reloads the entry."""
    ids = dict(entry.data.get(WEBHOOKS, {}))
    ids |= {p: webhook.async_generate_id() for p in people if p not in ids}
    tokens = dict(entry.data.get(WEBHOOK_TOKENS, {}))
    if require := entry.options.get(OPT_REQUIRE_TOKEN, False):
        tokens |= {p: secrets.token_urlsafe(32) for p in ids if p not in tokens}
    if ids != entry.data.get(WEBHOOKS, {}) or tokens != entry.data.get(WEBHOOK_TOKENS, {}):
        hass.config_entries.async_update_entry(entry, data={**entry.data, WEBHOOKS: ids, WEBHOOK_TOKENS: tokens})
    for person, webhook_id in ids.items():
        webhook.async_register(hass, DOMAIN, f"Fitness {person}", webhook_id, _handler(person, tokens[person] if require else None),
                               local_only=entry.options.get(OPT_LOCAL_ONLY, False), allowed_methods=("POST",))


@callback
def async_unregister(hass: HomeAssistant, entry: ConfigEntry) -> None:
    for webhook_id in entry.data.get(WEBHOOKS, {}).values():
        webhook.async_unregister(hass, webhook_id)  # one never registered is ignored


def _authorized(request: web.Request, token: str) -> bool:
    """Authorization: Bearer <token>, compared in constant time; the header is never logged."""
    scheme, _, value = request.headers.get("Authorization", "").partition(" ")
    return scheme.lower() == "bearer" and hmac.compare_digest(value.strip().encode(), token.encode())


def _handler(person: str, token: str | None):
    async def handle(hass: HomeAssistant, webhook_id: str, request: web.Request) -> web.Response:
        if token is not None and not _authorized(request, token):  # before the body is read
            return web.Response(status=401)
        # chunked uploads have no content_length: counted while read
        if (getattr(request, "content_length", None) or 0) > MAX_BODY or (body := await _read_limited(request.content, MAX_BODY)) is None:
            return web.Response(status=413)
        data = hass.data.get(DOMAIN)
        try:
            reply = None if data is None or data.runner is None else await data.runner.async_ingest(person, body)
        except Unreadable as err:  # its message is a class name, never the body
            _LOGGER.warning("Upload for %s not stored, not an export or GPX file: %s", person, err)
            return web.Response(status=400)
        except Exception as err:
            _LOGGER.error("Upload for %s failed: %s", person, type(err).__name__)
            return web.Response(status=500)
        if reply is None:  # unloading
            return web.Response(status=503)
        return web.json_response(reply)
    return handle
