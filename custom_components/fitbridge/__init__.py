"""Fitness page: runs fitbridge's scoring (runner.py) and serves the scores to a sidebar panel.
In shadow mode the LXC's fitbridge stays the live system: the page keeps its MQTT scores and steps/settings go out over MQTT."""
import logging
from dataclasses import dataclass, field

from homeassistant.components import mqtt
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.storage import Store

from . import settings
from .const import DOMAIN, OPT_SHADOW, SCORES_TOPIC, SIGNAL_SCORES
from .core import parse_scores
from .panel import async_register_http, async_register_panel, remove_panel
from .runner import Runner
from .steps import StepsCollector

_LOGGER = logging.getLogger(__name__)


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

    @callback
    def scored(cycle) -> None:
        if isinstance(cycle.scores.get("people"), dict):  # a cycle without a valid scoring config keeps the last scores
            data.scores = cycle.scores

    if shadow:
        entry.async_on_unload(await mqtt.async_subscribe(hass, SCORES_TOPIC, received))
    else:
        entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_SCORES, scored))
    data.steps = StepsCollector(hass, entry, Store(hass, 1, "fitbridge.steps"))
    await data.steps.async_start(entry)
    if data.settings_history:  # retained, but a broker that lost it must get it back
        await settings.publish(hass, data.settings_history)
    data.runner = Runner(hass, entry)
    await data.runner.async_start()
    entry.async_on_unload(data.runner.async_stop)
    await async_register_http(hass)
    await async_register_panel(hass)  # last: a failed setup is not unloaded
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    remove_panel(hass)
    hass.data.pop(DOMAIN, None)
    return True
