"""The calls Home Assistant makes to openGym itself: pairing, its user list and invites. The token and codes travel in
headers and bodies, never in a log line or an error."""
import logging
import re

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)
CODE = re.compile(r"[A-Za-z0-9]{4,16}")  # as opengym-pair.sh checked it
GYM_TIMEOUT = aiohttp.ClientTimeout(total=30)


class GymError(Exception):
    """reason is a config flow error key: invalid_code or cannot_connect."""

    def __init__(self, reason: str) -> None:
        super().__init__(reason)
        self.reason = reason


def normalize_url(text: str) -> str:
    """openGym's address as typed: trimmed, no trailing slash, https:// when it has no scheme."""
    url = text.strip().rstrip("/")
    return url if "://" in url else f"https://{url}"


async def _call(hass: HomeAssistant, method: str, url: str, path: str, token: str | None = None, body: dict | None = None):
    """(HTTP status, JSON reply). The log names host and cause (DNS, TLS, refused)."""
    headers = {"Authorization": f"Bearer {token}"} if token else None
    try:
        async with async_get_clientsession(hass).request(
                method, f"{url}{path}", json=body, headers=headers, timeout=GYM_TIMEOUT) as resp:
            return resp.status, await resp.json(content_type=None)  # an unknown code comes with an error status
    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
        _LOGGER.warning("openGym at %s failed on %s: %s: %s", url, path, type(err).__name__, err)
        raise GymError("cannot_connect") from err


async def _admin(hass: HomeAssistant, method: str, url: str, path: str, token: str, body: dict | None = None):
    """The JSON reply of an admin call; anything but a 2xx answer is cannot_connect."""
    status, reply = await _call(hass, method, url, path, token, body)
    if status >= 400:
        _LOGGER.warning("openGym at %s answered %s on %s", url, status, path)
        raise GymError("cannot_connect")
    return reply


async def async_redeem(hass: HomeAssistant, url: str, code: str) -> str:
    """A pairing code exchanged for the token."""
    status, reply = await _call(hass, "POST", url, "/api/pair/redeem", body={"code": code})
    token = reply.get("token") if isinstance(reply, dict) else None
    if isinstance(token, str) and token:
        return token
    if not isinstance(reply, dict):
        _LOGGER.warning("Pairing with openGym at %s failed: HTTP %s without a JSON object", url, status)
    raise GymError("invalid_code" if isinstance(reply, dict) else "cannot_connect")


async def async_users(hass: HomeAssistant, url: str, token: str) -> list[dict]:
    reply = await _admin(hass, "GET", url, "/api/admin/users", token)
    users = reply.get("users") if isinstance(reply, dict) else None
    if not isinstance(users, list) or not all(isinstance(u, dict) and "id" in u for u in users):
        _LOGGER.warning("openGym at %s sent a user list in an unknown shape", url)
        raise GymError("cannot_connect")
    return users


async def async_invite(hass: HomeAssistant, url: str, token: str, note: str) -> str:
    """A new sign-up invite code; the note says whom it is for."""
    reply = await _admin(hass, "POST", url, "/api/admin/invites/new", token, {"note": note})
    code = reply.get("invite", {}).get("code") if isinstance(reply, dict) and isinstance(reply.get("invite"), dict) else None
    if not isinstance(code, str) or not code:
        _LOGGER.warning("openGym at %s sent an invite in an unknown shape", url)
        raise GymError("cannot_connect")
    return code


async def async_revoke(hass: HomeAssistant, url: str, token: str, code: str) -> None:
    await _admin(hass, "POST", url, "/api/admin/invites/revoke", token, {"code": code})


async def async_withdraw(hass: HomeAssistant, url: str, token: str, person: str, code: str) -> None:
    """Best-effort revoke of an invite nobody will use; the log names the person, never the code."""
    try:
        await async_revoke(hass, url, token, code)
    except GymError:
        _LOGGER.warning("Could not withdraw an unused openGym invite for %s; remove it in openGym's admin settings", person)


async def async_invites(hass: HomeAssistant, url: str, token: str, notes: dict[str, str], stale: dict[str, str]) -> dict[str, str]:
    """A new invite per person in notes (person -> note), then the stale open codes (person -> code) withdrawn; returns
    person -> new code. On a GymError the codes made so far are withdrawn, the stale ones stay and it re-raises: no new
    code is left live and nobody loses theirs."""
    made = {}
    try:
        for person, note in notes.items():
            made[person] = await async_invite(hass, url, token, note)
    except GymError:
        for person, code in made.items():
            await async_withdraw(hass, url, token, person, code)
        raise
    for person, code in stale.items():
        await async_withdraw(hass, url, token, person, code)
    return made
