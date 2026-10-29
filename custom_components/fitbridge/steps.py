"""Daily steps per person: the highest value each phone sensor showed per local day, read by the runner."""
import math
from datetime import date, timedelta

from homeassistant.const import STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.event import async_call_later, async_track_state_change_event
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import KEEP_DAYS, OPT_STEPS

SAVE_EVERY = 60  # seconds


def parse(value: str) -> int | None:
    """A sensor state as whole steps (floats floored), or None for unavailable, unknown, NaN or negative."""
    try:
        n = float(value)
    except ValueError:
        return None
    return int(n) if math.isfinite(n) and n >= 0 else None


def candidates(hass: HomeAssistant, user_id: str) -> list[str]:
    """The user's phone and watch step counters: mobile_app entities with unit steps on the devices of the user's mobile_app entries."""
    devices, entities = dr.async_get(hass), er.async_get(hass)
    found = []
    for entry in hass.config_entries.async_entries("mobile_app"):
        if entry.data.get("user_id") != user_id:
            continue
        for device in dr.async_entries_for_config_entry(devices, entry.entry_id):
            found += [e.entity_id for e in er.async_entries_for_device(entities, device.id)
                      if e.platform == "mobile_app" and (s := hass.states.get(e.entity_id)) and s.attributes.get("unit_of_measurement") == "steps"]
    return found


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


def week(days: dict[str, int], today: date) -> dict[str, int]:
    """The days from the Monday of today's week up to today."""
    first = (today - timedelta(days=today.weekday())).isoformat()
    return {d: n for d, n in days.items() if first <= d <= today.isoformat()}


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
        if self._sensors:
            entry.async_on_unload(async_track_state_change_event(self._hass, list(self._sensors.values()), self._changed))
        entry.async_on_unload(self._stop)
        await self._flush()

    def days(self, person: str) -> dict[str, int]:
        return self._days.get(person, {})

    def snapshot(self) -> dict[str, dict[str, int]] | None:
        """Every person's days, copied for the executor; None while nothing is known."""
        return {p: dict(days) for p, days in self._days.items()} if any(self._days.values()) else None

    def _record(self, person: str, value: str) -> None:
        if record(self._days.setdefault(person, {}), dt_util.now().date().isoformat(), value):
            self._dirty = True

    @callback
    def _changed(self, event) -> None:
        state, old = event.data["new_state"], event.data["old_state"]
        # Only a phone's own report counts: a state that is new or comes back from unavailable is the entity's
        # initial or restored one (yesterday's total after a restart), not today's steps.
        if state is None or old is None or old.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            return
        for person, sensor in self._sensors.items():
            if sensor == event.data["entity_id"]:
                self._record(person, state.state)
        if self._dirty and self._timer is None:
            self._timer = async_call_later(self._hass, SAVE_EVERY, self._flush)

    async def _flush(self, _now=None) -> None:
        self._timer = None
        today = dt_util.now().date()
        self._days = {p: trim(days, today) for p, days in self._days.items()}
        await self._store.async_save(self._days)
        self._dirty = False

    async def _stop(self) -> None:
        if self._timer:
            self._timer()
            self._timer = None
        if self._dirty:  # a reload within the minute must not lose steps
            await self._store.async_save(self._days)
