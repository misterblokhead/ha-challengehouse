import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.selector import SelectSelector, SelectSelectorConfig, SelectSelectorMode

from .const import DOMAIN, OPT_VIEWERS


class FitbridgeConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is None:
            return self.async_show_form(step_id="user")
        await self.async_set_unique_id(DOMAIN)
        return self.async_create_entry(title="Fitness", data={})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return FitbridgeOptionsFlow()


class FitbridgeOptionsFlow(config_entries.OptionsFlowWithReload):
    """Which fitbridge person each HA user is; nobody ("") means the read-only household view."""

    async def async_step_init(self, user_input=None):
        data = self.hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        users = [u for u in await self.hass.auth.async_get_users() if u.is_active and not u.system_generated]
        names = {u.id: u.name or u.id[:6] for u in users}  # a user may have no name
        # a field's label is its key: the user's name, made unique by the id when two users share one
        labels = {uid: n if list(names.values()).count(n) == 1 else f"{n} ({uid[:6]})" for uid, n in names.items()}
        if user_input is not None:
            return self.async_create_entry(data={OPT_VIEWERS: {
                uid: user_input[label] for uid, label in labels.items() if user_input.get(label)}})
        people = data.scores["people"]
        viewers = self.config_entry.options.get(OPT_VIEWERS, {})
        select = SelectSelector(SelectSelectorConfig(mode=SelectSelectorMode.DROPDOWN, options=[
            {"value": "", "label": "Nobody"}, *({"value": p, "label": str(r.get("name") or p)} for p, r in people.items())]))
        return self.async_show_form(step_id="init", data_schema=vol.Schema({
            vol.Optional(label, default=viewers.get(uid) if viewers.get(uid) in people else ""): select
            for uid, label in labels.items()}))
