"""Fitness page: runs fitbridge's scoring (runner.py), shows it as sensors and events and serves it to a sidebar panel.
In shadow mode the LXC's fitbridge stays the live system: the page keeps its MQTT scores and steps/settings go out over MQTT."""
import logging
import re
from dataclasses import dataclass, field

import voluptuous as vol
from homeassistant.components import mqtt
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ConfigEntryNotReady, ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.storage import Store

from . import settings, webhooks
from .const import DOMAIN, OPT_SHADOW, SCORES_TOPIC
from .core import parse_scores
from .engine.entities import EVENTS, GROUP_SENSORS, PERSON_SENSORS
from .panel import async_register_http, async_register_panel, remove_panel
from .runner import Runner
from .steps import StepsCollector

_LOGGER = logging.getLogger(__name__)
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)
PLATFORMS = [Platform.SENSOR, Platform.EVENT]
ISSUE_OLD = "old_entities"
OURS = re.compile(rf"sensor\.fit_.+_({'|'.join(PERSON_SENSORS.keys() | GROUP_SENSORS.keys())})|event\.fit_({'|'.join(EVENTS)})")
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
    scores: dict | None = None
    warned: bool = False
    settings_history: list = field(default_factory=list)  # weekly goals history, oldest first
    settings_store: Store | None = None
    steps: StepsCollector | None = None
    shadow: bool = False
    runner: Runner | None = None


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


@callback
def _go_live(hass: HomeAssistant, shadow: bool) -> bool:
    """Not in shadow, and not while another platform (the LXC's MQTT discovery) holds one of our entity ids:
    that raises a repair issue until a reload finds them gone."""
    old = not shadow and any(e.platform != DOMAIN and OURS.fullmatch(e.entity_id) for e in er.async_get(hass).entities.values())
    if old:
        ir.async_create_issue(hass, DOMAIN, ISSUE_OLD, is_fixable=False, severity=ir.IssueSeverity.ERROR,
                              translation_key=ISSUE_OLD)
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_OLD)
    return not shadow and not old


async def async_migrate_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if entry.version > 1:
        return False
    if entry.minor_version < 2:  # before 0.4.0 the LXC's fitbridge was the live system: stay in shadow until the switch
        hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_SHADOW: True}, minor_version=2)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    shadow = entry.options.get(OPT_SHADOW, False)
    if shadow and not await mqtt.async_wait_for_mqtt_client(hass):
        raise ConfigEntryNotReady("MQTT is not available")
    data = hass.data[DOMAIN] = Data(entry, settings_store=Store(hass, 1, "fitbridge.settings"), shadow=shadow)
    data.settings_history = await settings.load(data.settings_store)

    @callback
    def received(msg: mqtt.ReceiveMessage) -> None:
        scores = parse_scores(msg.payload)
        if scores is not None:
            data.scores, data.warned = scores, False
        elif not data.warned:  # fitbridge republishes every cycle: one warning until a good payload comes
            data.warned = True
            _LOGGER.warning("Ignored a %s payload the fitness page cannot use; keeping the last good one", SCORES_TOPIC)

    if shadow:  # live: the runner hands the page its scores
        entry.async_on_unload(await mqtt.async_subscribe(hass, SCORES_TOPIC, received))
    data.steps = StepsCollector(hass, entry, Store(hass, 1, "fitbridge.steps"))
    await data.steps.async_start(entry)
    if data.settings_history:  # retained, but a broker that lost it must get it back
        await settings.publish(hass, data.settings_history)
    data.runner = Runner(hass, entry)
    data.runner.live = _go_live(hass, shadow)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)  # before the first cycle: they listen for it
    await data.runner.async_start()
    entry.async_on_unload(data.runner.async_stop)
    await async_register_http(hass)
    await async_register_panel(hass)
    webhooks.async_setup(hass, entry, await data.runner.async_people())  # last: a failed setup is not unloaded
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    webhooks.async_unregister(hass, entry)
    remove_panel(hass)
    hass.data.pop(DOMAIN, None)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: ConfigEntry) -> None:
    await webhooks.async_remove(hass, entry)
