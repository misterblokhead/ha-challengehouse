"""Fitness page: runs fitbridge's scoring (runner.py), shows it as sensors and events and serves it to a sidebar panel."""
import logging
import tomllib
from dataclasses import dataclass, field
from pathlib import Path

import voluptuous as vol
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.storage import Store

from . import people, settings, webhooks
from .const import DATA_DIR, DOMAIN, OPT_PEOPLE
from .panel import async_register_http, async_register_panel, remove_panel
from .runner import Runner
from .steps import StepsCollector

_LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)
PLATFORMS = [Platform.SENSOR, Platform.EVENT]
_WORKOUT = {vol.Required("person"): cv.string, vol.Required("key"): cv.string}
ACTIONS = {  # action -> (manual.apply's action, fields as manual.apply reads them; it validates the values)
    "remove_workout": ("remove", vol.Schema(_WORKOUT)),
    "restore_workout": ("restore", vol.Schema(_WORKOUT)),
    "log_workout": ("add", vol.Schema({
        vol.Required("person"): cv.string, vol.Required("kind"): cv.string, vol.Required("start"): cv.string,
        vol.Required("minutes"): vol.Coerce(float), vol.Optional("km"): vol.Coerce(float), vol.Optional("indoor"): cv.boolean})),
}


@dataclass
class Data:
    entry: ConfigEntry
    settings_history: list = field(default_factory=list)  # weekly goals history, oldest first
    settings_profiles: dict = field(default_factory=dict)  # {person: {"birth_year": int}}, kept next to the history
    settings_store: Store | None = None
    steps: StepsCollector | None = None
    runner: Runner | None = None

    @property
    def scores(self) -> dict | None:
        """The runner's last good scores, which the page and the options flow show."""
        return self.runner.scores if self.runner else None


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    async def manual(call: ServiceCall) -> None:
        data = hass.data.get(DOMAIN)
        if data is None or data.runner is None:
            raise ServiceValidationError("Fitness is not loaded")
        try:
            await data.runner.async_manual({**call.data, "action": ACTIONS[call.service][0]})
        except ValueError as err:
            raise ServiceValidationError(str(err)) from err

    for name, (_, schema) in ACTIONS.items():
        hass.services.async_register(DOMAIN, name, manual, schema=schema)
    return True


def _old_settings(path: Path) -> tuple[dict | None, str | None]:
    """The people, group and start in scoring.toml and its rules.timezone; (None, None) when there is no file."""
    try:
        text = path.read_text(encoding="utf-8")
    except FileNotFoundError:
        return None, None
    return people.from_toml(text), tomllib.loads(text).get("rules", {}).get("timezone")


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if entry.version > 1:
        return False
    if entry.minor_version < 3:  # 3: the switch is done; shadow mode and the Endurain shoes (options "shadow", "shoes") are gone
        options = {k: v for k, v in entry.options.items() if k not in ("shadow", "shoes")}
        hass.config_entries.async_update_entry(entry, options=options, minor_version=3)
    if entry.minor_version < 4:  # 4: people, group and start moved from scoring.toml into the options
        try:
            old, timezone = await hass.async_add_executor_job(_old_settings, Path(hass.config.path(DATA_DIR, "scoring.toml")))
        except Exception as err:  # the entry keeps scoring from the file; the next start tries again
            _LOGGER.warning("Could not read the people from scoring.toml (%s); they stay there for now", type(err).__name__)
            return True
        options = dict(entry.options)
        if old and OPT_PEOPLE not in options:  # copied once: what Configure holds is never overwritten by the file
            options |= {k: v for k, v in old.items() if v is not None}
            if timezone != hass.config.time_zone:
                _LOGGER.warning("scoring.toml has timezone %s, Home Assistant has %s: Home Assistant's is used", timezone, hass.config.time_zone)
        elif OPT_PEOPLE not in options:
            _LOGGER.warning("scoring.toml has no people to move (missing or without [people]); add them in Configure -> People")
        hass.config_entries.async_update_entry(entry, options=options, minor_version=4)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data[DOMAIN] = Data(entry, settings_store=Store(hass, 1, "fitbridge.settings"))
    data.settings_history, data.settings_profiles = await settings.load(data.settings_store)
    data.steps = StepsCollector(hass, entry, Store(hass, 1, "fitbridge.steps"))
    await data.steps.async_start(entry)
    data.runner = Runner(hass, entry)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)  # before the first cycle: they listen for it
    await data.runner.async_start()
    entry.async_on_unload(data.runner.async_stop)
    await async_register_http(hass)
    await async_register_panel(hass)
    webhooks.async_setup(hass, entry, await data.runner.async_people())  # last: a failed setup is not unloaded
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    runner = hass.data[DOMAIN].runner
    runner.stopping = True  # before the handlers go: a cycle still in the executor must not commit what they never got
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        runner.stopping = False
        return False
    webhooks.async_unregister(hass, entry)
    remove_panel(hass)
    hass.data.pop(DOMAIN, None)
    return True
