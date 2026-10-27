import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.selector import (
    EntitySelector,
    EntitySelectorConfig,
    NumberSelector,
    NumberSelectorConfig,
    NumberSelectorMode,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
)

from .const import DOMAIN, OPT_SHOES, OPT_VIEWERS, SHOE_LIMIT_KM


def _labels(names: dict[str, str], tag=lambda k: k) -> dict[str, str]:
    """A field's label is its key: the name, made unique by tag(key) when two share one."""
    return {k: n if list(names.values()).count(n) == 1 else f"{n} ({tag(k)})" for k, n in names.items()}


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
    """Which fitbridge person each HA user is (nobody, "", means the read-only household view), then each person's
    Endurain shoes and the km at which each should be replaced."""

    async def async_step_init(self, user_input=None):
        data = self.hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return self.async_abort(reason="waiting_for_fitbridge")
        users = [u for u in await self.hass.auth.async_get_users() if u.is_active and not u.system_generated]
        labels = _labels({u.id: u.name or u.id[:6] for u in users}, lambda uid: uid[:6])  # a user may have no name
        if user_input is not None:
            self._viewers = {uid: user_input[label] for uid, label in labels.items() if user_input.get(label)}
            return await self.async_step_shoes()
        people = data.scores["people"]
        viewers = self.config_entry.options.get(OPT_VIEWERS, {})
        select = SelectSelector(SelectSelectorConfig(mode=SelectSelectorMode.DROPDOWN, options=[
            {"value": "", "label": "Nobody"}, *({"value": p, "label": str(r.get("name") or p)} for p, r in people.items())]))
        return self.async_show_form(step_id="init", data_schema=vol.Schema({
            vol.Optional(label, default=viewers.get(uid) if viewers.get(uid) in people else ""): select
            for uid, label in labels.items()}))

    async def async_step_shoes(self, user_input=None):
        people = self.hass.data[DOMAIN].scores["people"]
        labels = _labels({p: str(r.get("name") or p) for p, r in people.items()})
        if user_input is not None:
            self._shoes = {p: list(user_input[label]) for p, label in labels.items() if user_input.get(label)}
            return await self.async_step_limits() if self._shoes else self._finish({})
        old = self.config_entry.options.get(OPT_SHOES, {})
        select = EntitySelector(EntitySelectorConfig(integration="endurain", domain="sensor", device_class="distance", multiple=True))
        return self.async_show_form(step_id="shoes", data_schema=vol.Schema({
            vol.Optional(label, default=list(old.get(p, {}))): select for p, label in labels.items()}))

    async def async_step_limits(self, user_input=None):
        chosen = dict.fromkeys(e for shoes in self._shoes.values() for e in shoes)
        labels = _labels({e: (s.attributes.get("nickname") or s.name) if (s := self.hass.states.get(e)) else e for e in chosen})
        if user_input is not None:
            return self._finish({p: {e: user_input[labels[e]] for e in shoes} for p, shoes in self._shoes.items()})
        old = {e: km for limits in self.config_entry.options.get(OPT_SHOES, {}).values() for e, km in limits.items()}
        km = NumberSelector(NumberSelectorConfig(min=50, max=5000, step=10, unit_of_measurement="km", mode=NumberSelectorMode.BOX))
        return self.async_show_form(step_id="limits", data_schema=vol.Schema({
            vol.Required(labels[e], default=old.get(e, SHOE_LIMIT_KM)): km for e in chosen}))

    def _finish(self, shoes: dict):
        return self.async_create_entry(data={OPT_VIEWERS: self._viewers, OPT_SHOES: shoes})
