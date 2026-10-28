"""Sensors per person and group (engine.entities), with the entity ids, states and attributes of the old MQTT ones.
Live only; they appear with the first cycle, as the people come from scoring.toml."""
import logging

from homeassistant.components.sensor import SensorEntity, SensorStateClass
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, SIGNAL_SCORES
from .engine.entities import GROUP_SENSORS, MEASURED, PERSON_SENSORS

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback) -> None:
    if not hass.data[DOMAIN].runner.live:
        return
    sensors: dict[str, FitSensor] = {}

    @callback
    def scored(cycle) -> None:
        try:  # never raises: the dispatcher would log the whole cycle
            people = cycle.scores.get("people")
            if not isinstance(people, dict):  # no valid scoring config: the sensors keep their state
                return
            owners = [(p, r, PERSON_SENSORS) for p, r in people.items()]
            if group := cycle.scores.get("group"):
                owners.append((group["id"], group, GROUP_SENSORS))
            new = []
            try:
                for owner, subject, specs in owners:
                    for key, spec in specs.items():
                        sensor = sensors.get(f"{owner}_{key}") or FitSensor(owner, subject["name"], key, spec)
                        sensor.show(subject)
                        if f"{owner}_{key}" not in sensors:  # kept only once shown: one that failed is new again next cycle
                            sensors[f"{owner}_{key}"] = sensor
                            new.append(sensor)
            finally:  # those shown before a failure are added all the same
                async_add_entities(new)
        except Exception as err:
            _LOGGER.error("Updating the fitness sensors failed: %s", type(err).__name__)

    entry.async_on_unload(async_dispatcher_connect(hass, SIGNAL_SCORES, scored))


class FitSensor(SensorEntity):
    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, owner: str, name: str, key: str, spec) -> None:
        label, icon, unit, self._state, self._attrs = spec
        self.entity_id = f"sensor.fit_{owner}_{key}"
        self._attr_unique_id = f"fit_{owner}_{key}"
        self._attr_name, self._attr_icon, self._attr_native_unit_of_measurement = label, icon, unit
        self._attr_state_class = SensorStateClass.MEASUREMENT if unit in MEASURED else None
        self._attr_device_info = DeviceInfo(identifiers={(DOMAIN, f"fitbridge_{owner}")}, name=f"Fitness {name}",
                                            manufacturer="fitbridge")

    @callback
    def show(self, subject: dict) -> None:
        self._attr_native_value = self._state(subject)
        self._attr_extra_state_attributes = self._attrs(subject)
        if self.hass is not None:  # a new one shows its first state when it is added
            self.async_write_ha_state()
