"""Weekly goals and couple mode: validated, kept per week in a Store, read by the runner
(and published retained for the LXC's fitbridge in shadow mode)."""
import json
from collections.abc import Iterable
from datetime import date, timedelta

from homeassistant.components import mqtt
from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import DOMAIN, SETTINGS_TOPIC

GOAL_KEYS = ("runs", "workouts", "active_days")
MODES = ("own", "together", "team")


def _int_in(v, lo: int, hi: int) -> bool:
    return isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi


def _bad(field: str, reason: str):
    raise ValueError(f"{field}: {reason}")


def validate(body: dict, people: Iterable[str]) -> dict:
    """One settings entry (without `from`) from a page body; ValueError "<field>: <reason>" on the first problem."""
    people = list(people)
    if not isinstance(body, dict):
        _bad("body", "must be an object")
    given = body.get("people")
    if not isinstance(given, dict):
        _bad("people", "must be an object")
    out = {"people": {}}
    for p in given:
        if p not in people:
            _bad(f"people.{p}", "unknown person")
    for p in people:
        g = given.get(p)
        if not isinstance(g, dict):
            _bad(f"people.{p}", "required")
        for k in GOAL_KEYS:
            if not _int_in(g.get(k), 0, 7):
                _bad(f"people.{p}.{k}", "must be an integer 0-7")
        if not (_int_in(g.get("steps"), 2000, 30000) and g["steps"] % 1000 == 0):
            _bad(f"people.{p}.steps", "must be 2000-30000 in steps of 1000")
        out["people"][p] = {k: g[k] for k in (*GOAL_KEYS, "steps")}
    c = body.get("couple")
    if not isinstance(c, dict):
        _bad("couple", "required")
    if c.get("mode") not in MODES:
        _bad("couple.mode", "must be own, together or team")
    if not _int_in(c.get("together"), 1, 3):
        _bad("couple.together", "must be an integer 1-3")
    if not _int_in(c.get("team"), 1, 42):
        _bad("couple.team", "must be an integer 1-42")
    if not (isinstance(c.get("reward"), str) and len(c["reward"]) <= 60):
        _bad("couple.reward", "must be text of at most 60 characters")
    out["couple"] = {k: c[k] for k in ("mode", "together", "team", "reward")}
    return out


def put(history: list, entry: dict, monday: date) -> list:
    """History with entry as that week's settings: replaces the same Monday, stays sorted by `from`."""
    start = monday.isoformat()
    return sorted([e for e in history if e["from"] != start] + [{"from": start, **entry}], key=lambda e: e["from"])


def current(history: list, monday: date) -> dict | None:
    """The entry in force for the week of monday: the last one that starts on or before it."""
    start = monday.isoformat()
    return next((e for e in reversed(history) if e["from"] <= start), None)


def monday_of(day: date) -> date:
    return day - timedelta(days=day.weekday())


async def publish(hass: HomeAssistant, history: list) -> None:
    if hass.data[DOMAIN].shadow:  # live: the runner reads the history in-process
        await mqtt.async_publish(hass, SETTINGS_TOPIC, json.dumps({"history": history}), qos=1, retain=True)


async def load(store: Store) -> list:
    raw = await store.async_load()
    history = raw.get("history") if isinstance(raw, dict) else None
    return [e for e in history if isinstance(e, dict) and isinstance(e.get("from"), str)] if isinstance(history, list) else []
