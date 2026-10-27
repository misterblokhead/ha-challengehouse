"""Daily steps per person: the highest value each phone sensor showed per local day, published for fitbridge."""
import json
import math
from datetime import date, timedelta

from homeassistant.components import mqtt
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_call_later, async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import KEEP_DAYS, OPT_STEPS, STEPS_TOPIC

PUBLISH_EVERY = 60  # seconds


def parse(value: str) -> int | None:
    """A sensor state as whole steps (floats floored), or None for unavailable, unknown, NaN or negative."""
    try:
        n = float(value)
    except ValueError:
        return None
    return int(n) if math.isfinite(n) and n >= 0 else None


def record(days: dict[str, int], day: str, value: str) -> bool:
    """Keep value as the day's steps if it is the highest so far (sensors only count up; a dip is a glitch)."""
    n = parse(value)
    if n is None or n <= days.get(day, -1):
        return False
    days[day] = n
    return True


def trim(days: dict[str, int], today: date) -> dict[str, int]:
    """The last KEEP_DAYS days up to today (ISO dates sort as text)."""
    first = (today - timedelta(days=KEEP_DAYS - 1)).isoformat()
    return {d: n for d, n in days.items() if d >= first}


class StepsCollector:
    def __init__(self, hass: HomeAssistant, entry, store: Store) -> None:
        self._hass, self._store = hass, store
        self._sensors: dict[str, str] = entry.options.get(OPT_STEPS, {})  # person id -> step sensor
        self._days: dict[str, dict[str, int]] = {}
        self._timer = None
        self._dirty = False

    async def async_start(self, entry) -> None:
        raw = await self._store.async_load()
        if isinstance(raw, dict):
            self._days = {p: {d: n for d, n in days.items() if isinstance(n, int)}
                          for p, days in raw.items() if isinstance(days, dict)}
        for person, sensor in self._sensors.items():
            if state := self._hass.states.get(sensor):
                self._record(person, state.state)
        if self._sensors:
            entry.async_on_unload(async_track_state_change_event(self._hass, list(self._sensors.values()), self._changed))
        entry.async_on_unload(self._stop)
        await self._flush()

    def _record(self, person: str, value: str) -> None:
        if record(self._days.setdefault(person, {}), dt_util.now().date().isoformat(), value):
            self._dirty = True

    @callback
    def _changed(self, event) -> None:
        if (state := event.data["new_state"]) is None:
            return
        for person, sensor in self._sensors.items():
            if sensor == event.data["entity_id"]:
                self._record(person, state.state)
        if self._dirty and self._timer is None:
            self._timer = async_call_later(self._hass, PUBLISH_EVERY, self._flush)

    async def _flush(self, _now=None) -> None:
        self._timer = None
        today = dt_util.now().date()
        self._days = {p: trim(days, today) for p, days in self._days.items()}
        await self._store.async_save(self._days)
        self._dirty = False
        if any(self._days.values()):
            await mqtt.async_publish(self._hass, STEPS_TOPIC, json.dumps(self._days), qos=1, retain=True)

    async def _stop(self) -> None:
        if self._timer:
            self._timer()
            self._timer = None
        if self._dirty:  # a reload within the minute must not lose steps; the restart's startup publish sends them on
            await self._store.async_save(self._days)
