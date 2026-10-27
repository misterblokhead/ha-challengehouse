"""Fitness page: keeps fitbridge's retained scores from MQTT and serves them to a sidebar panel."""
import logging
from dataclasses import dataclass, field

from homeassistant.components import mqtt
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers.storage import Store

from . import settings
from .const import DOMAIN, SCORES_TOPIC
from .core import parse_scores
from .panel import async_register_http, async_register_panel, remove_panel
from .steps import StepsCollector

_LOGGER = logging.getLogger(__name__)


@dataclass
class Data:
    entry: ConfigEntry
    scores: dict | None = None
    warned: bool = False
    settings_history: list = field(default_factory=list)  # weekly goals history, oldest first
    settings_store: Store | None = None


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    if not await mqtt.async_wait_for_mqtt_client(hass):
        raise ConfigEntryNotReady("MQTT is not available")
    data = hass.data[DOMAIN] = Data(entry, settings_store=Store(hass, 1, "fitbridge.settings"))
    data.settings_history = await settings.load(data.settings_store)

    @callback
    def received(msg: mqtt.ReceiveMessage) -> None:
        scores = parse_scores(msg.payload)
        if scores is not None:
            data.scores, data.warned = scores, False
        elif not data.warned:  # fitbridge republishes every cycle: one warning until a good payload comes
            data.warned = True
            _LOGGER.warning("Ignored a %s payload the fitness page cannot use; keeping the last good one", SCORES_TOPIC)

    entry.async_on_unload(await mqtt.async_subscribe(hass, SCORES_TOPIC, received))
    await StepsCollector(hass, entry, Store(hass, 1, "fitbridge.steps")).async_start(entry)
    if data.settings_history:  # retained, but a broker that lost it must get it back
        await settings.publish(hass, data.settings_history)
    await async_register_http(hass)
    await async_register_panel(hass)  # last: a failed setup is not unloaded
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    remove_panel(hass)
    hass.data.pop(DOMAIN, None)
    return True
