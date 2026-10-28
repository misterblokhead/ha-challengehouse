"""The three events (engine.entities), with the old MQTT entity ids, event types and fields. Live only."""
import logging

from homeassistant.components.event import EventEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_SCORES
from .engine.entities import EVENT_ENTITIES, EVENTS

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    if not hass.data[DOMAIN].runner.live:
        return
    events = {t: FitEvent(t, name, icon) for t, (name, icon) in EVENT_ENTITIES.items()}
    async_add_entities(events.values())

    @callback
    def scored(cycle) -> None:
        for event_type, items in (("badge_unlocked", cycle.badges), ("workout_scored", cycle.workouts),
                                  ("record_set", cycle.records)):
            for person, item in items:
                try:  # never raises (the dispatcher would log the whole cycle); one bad item never stops the rest
                    events[event_type].fire(EVENTS[event_type](person, item))
                except Exception as err:
                    _LOGGER.error("Firing %s failed: %s", event_type, type(err).__name__)

    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_SCORES, scored))


class FitEvent(EventEntity):
    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, event_type: str, name: str, icon: str) -> None:
        self.entity_id = f"event.fit_{event_type}"
        self._attr_unique_id = f"fit_{event_type}"
        self._attr_name, self._attr_icon, self._attr_event_types = name, icon, [event_type]
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, "fitbridge")}, name="Fitness", manufacturer="fitbridge")

    @callback
    def fire(self, payload: dict) -> None:
        """As HA's MQTT event platform did: the payload minus event_type are the event's fields."""
        fields = dict(payload)
        self._trigger_event(fields.pop("event_type"), fields)
        self.async_write_ha_state()
