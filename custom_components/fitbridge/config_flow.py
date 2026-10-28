import logging
import re
from pathlib import Path

import aiohttp
import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    EntitySelector,
    EntitySelectorConfig,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
    TextSelectorType,
)

from . import webhooks
from .const import (
    DOMAIN,
    OPENGYM_TOKEN,
    OPT_FOLDERS,
    OPT_OPENGYM_UIDS,
    OPT_OPENGYM_URL,
    OPT_SHADOW,
    OPT_STEPS,
    OPT_VIEWERS,
    WEBHOOKS,
)

_LOGGER = logging.getLogger(__name__)
CODE = re.compile(r"[A-Za-z0-9]{4,16}")  # as opengym-pair.sh checked it
GYM_TIMEOUT = aiohttp.ClientTimeout(total=30)
NEW_URLS = "new_urls"


def _labels(names: dict[str, str], tag=lambda k: k) -> dict[str, str]:
    """A field's label is its key: the name, made unique by tag(key) when two share one."""
    return {k: n if list(names.values()).count(n) == 1 else f"{n} ({tag(k)})" for k, n in names.items()}


class FitbridgeConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1
    MINOR_VERSION = 2  # 2: options carry shadow (async_migrate_entry)

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is None:
            return self.async_show_form(step_id="user")
        await self.async_set_unique_id(DOMAIN)
        return self.async_create_entry(title="Fitness", data={}, options={OPT_SHADOW: False})  # a new install is live

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return FitbridgeOptionsFlow()


class FitbridgeOptionsFlow(config_entries.OptionsFlowWithReload):
    """A menu: viewers (which fitbridge person each HA user is, nobody, "", meaning the read-only household view; then
    each person's phone step sensor),
    the openGym pairing, each person's openGym user, each person's webhook URL and watch folder, and shadow mode."""

    async def async_step_init(self, user_input=None):
        data = self.hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        return self.async_show_menu(step_id="init", menu_options=["viewers", "opengym", "people", "inputs", "mode"])

    async def async_step_viewers(self, user_input=None):
        data = self.hass.data[DOMAIN]
        users = [u for u in await self.hass.auth.async_get_users() if u.is_active and not u.system_generated]
        labels = _labels({u.id: u.name or u.id[:6] for u in users}, lambda uid: uid[:6])  # a user may have no name
        if user_input is not None:
            self._viewers = {uid: user_input[label] for uid, label in labels.items() if user_input.get(label)}
            return await self.async_step_steps()
        people = data.scores["people"]
        viewers = self.config_entry.options.get(OPT_VIEWERS, {})
        select = SelectSelector(SelectSelectorConfig(mode=SelectSelectorMode.DROPDOWN, options=[
            {"value": "", "label": "Nobody"}, *({"value": p, "label": str(r.get("name") or p)} for p, r in people.items())]))
        return self.async_show_form(step_id="viewers", data_schema=vol.Schema({
            vol.Optional(label, default=viewers.get(uid) if viewers.get(uid) in people else ""): select
            for uid, label in labels.items()}))

    async def async_step_steps(self, user_input=None):
        people = self.hass.data[DOMAIN].scores["people"]
        labels = _labels({p: str(r.get("name") or p) for p, r in people.items()})
        if user_input is not None:
            steps = {p: user_input[label] for p, label in labels.items() if user_input.get(label)}
            return self.async_create_entry(data={**self.config_entry.options, OPT_VIEWERS: self._viewers, OPT_STEPS: steps})
        old = self.config_entry.options.get(OPT_STEPS, {})
        select = EntitySelector(EntitySelectorConfig(domain="sensor"))
        return self.async_show_form(step_id="steps", data_schema=vol.Schema({  # a suggestion, not a default: the field can be cleared
            vol.Optional(label, description={"suggested_value": old.get(p)}): select for p, label in labels.items()}))

    async def _people(self) -> dict[str, str]:
        """scoring.toml's people (webhooks, folders and openGym users go by them) as person -> field label."""
        people = await self.hass.data[DOMAIN].runner.async_people()
        return _labels({p: str(r.get("name") or p) for p, r in people.items()})

    async def async_step_opengym(self, user_input=None):
        """openGym's address and a pairing code from it, exchanged for the token (never logged)."""
        errors = {}
        if user_input is not None:
            url, code = user_input[OPT_OPENGYM_URL].strip().rstrip("/"), user_input["code"].strip()
            if "://" not in url:  # the URL field accepts a bare host name
                url = f"https://{url}"
            if not CODE.fullmatch(code):
                errors["code"] = "invalid_code"
            else:
                try:
                    async with async_get_clientsession(self.hass).post(
                            f"{url}/api/pair/redeem", json={"code": code}, timeout=GYM_TIMEOUT) as resp:
                        reply = await resp.json(content_type=None)  # an unknown code comes with an error status
                except (aiohttp.ClientError, TimeoutError, ValueError) as err:
                    # the message names host and cause (DNS, TLS, refused); the code travels in the body, never in it
                    _LOGGER.warning("Pairing with openGym at %s failed: %s: %s", url, type(err).__name__, err)
                    errors["base"] = "cannot_connect"
                else:
                    token = reply.get("token") if isinstance(reply, dict) else None
                    if isinstance(token, str) and token:
                        await self.hass.data[DOMAIN].runner.async_pair(token)
                        return self.async_create_entry(data={**self.config_entry.options, OPT_OPENGYM_URL: url})
                    if not isinstance(reply, dict):
                        _LOGGER.warning("Pairing with openGym at %s failed: HTTP %s without a JSON object", url, resp.status)
                    errors["base"] = "invalid_code" if isinstance(reply, dict) else "cannot_connect"
        schema = vol.Schema({vol.Required(OPT_OPENGYM_URL): TextSelector(TextSelectorConfig(type=TextSelectorType.URL)),
                             vol.Required("code"): TextSelector()})
        return self.async_show_form(step_id="opengym", errors=errors, data_schema=self.add_suggested_values_to_schema(
            schema, {OPT_OPENGYM_URL: (user_input or {}).get(OPT_OPENGYM_URL) or self.config_entry.options.get(OPT_OPENGYM_URL)}))

    async def async_step_people(self, user_input=None):
        """Each person's openGym user, from the paired openGym's user list."""
        url, token = self.config_entry.options.get(OPT_OPENGYM_URL), self.config_entry.data.get(OPENGYM_TOKEN)
        if not url or not token:
            return self.async_abort(reason="not_paired")
        labels = await self._people()
        if user_input is not None:
            uids = {p: user_input[label] for p, label in labels.items() if user_input.get(label)}
            return self.async_create_entry(data={**self.config_entry.options, OPT_OPENGYM_UIDS: uids})
        try:
            async with async_get_clientsession(self.hass).get(
                    f"{url}/api/admin/users", headers={"Authorization": f"Bearer {token}"}, timeout=GYM_TIMEOUT) as resp:
                resp.raise_for_status()
                users = (await resp.json(content_type=None))["users"]
            options = [{"value": "", "label": "Nobody"}, *({"value": u["id"], "label": str(u.get("name") or u["id"])} for u in users)]
        except (aiohttp.ClientError, TimeoutError, ValueError, LookupError, TypeError, AttributeError):
            return self.async_abort(reason="cannot_connect")
        old, offered = self.config_entry.options.get(OPT_OPENGYM_UIDS, {}), {o["value"] for o in options}
        select = SelectSelector(SelectSelectorConfig(mode=SelectSelectorMode.DROPDOWN, options=options))
        return self.async_show_form(step_id="people", data_schema=vol.Schema({
            vol.Optional(label, default=old.get(p) if old.get(p) in offered else ""): select for p, label in labels.items()}))

    async def async_step_inputs(self, user_input=None):
        """Each person's webhook URL (shown, can be replaced) and optional watch folder (must exist)."""
        labels = await self._people()
        errors = {}
        if user_input is not None:
            folders = {p: f for p, label in labels.items() if (f := (user_input.get(label) or "").strip())}
            missing = await self.hass.async_add_executor_job(
                lambda: [p for p, f in folders.items() if not (Path(f).is_absolute() and Path(f).is_dir())])
            if not missing:
                if user_input.get(NEW_URLS):  # the old ids stop now; the reload below makes new ones
                    webhooks.async_unregister(self.hass, self.config_entry)
                    self.hass.config_entries.async_update_entry(self.config_entry, data={**self.config_entry.data, WEBHOOKS: {}})
                return self.async_create_entry(data={**self.config_entry.options, OPT_FOLDERS: folders})
            errors = {labels[p]: "folder_missing" for p in missing}
        hooks = self.config_entry.data.get(WEBHOOKS, {})
        urls = [f"- {label}: {webhooks.async_url(self.hass, hooks[p])}" for p, label in labels.items() if p in hooks]
        old = self.config_entry.options.get(OPT_FOLDERS, {})
        schema = vol.Schema({**{vol.Optional(label): TextSelector() for label in labels.values()},
                             vol.Optional(NEW_URLS, default=False): bool})
        return self.async_show_form(
            step_id="inputs", errors=errors, description_placeholders={"urls": "\n".join(urls)},
            data_schema=self.add_suggested_values_to_schema(schema, user_input or {labels[p]: f for p, f in old.items() if p in labels}))

    async def async_step_mode(self, user_input=None):
        """Shadow mode on or off: the switch from the LXC's fitbridge and back."""
        if user_input is not None:
            return self.async_create_entry(data={**self.config_entry.options, OPT_SHADOW: user_input[OPT_SHADOW]})
        return self.async_show_form(step_id="mode", data_schema=vol.Schema({
            vol.Required(OPT_SHADOW, default=self.config_entry.options.get(OPT_SHADOW, False)): bool}))
