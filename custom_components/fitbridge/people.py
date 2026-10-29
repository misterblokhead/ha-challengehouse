"""People, group and start date as the config entry's options hold them (JSON-safe); the runner hands them to the engine
as an overlay on scoring.toml."""
import re
import tomllib
from collections.abc import Iterable, Mapping
from datetime import date, datetime
from itertools import chain, count

from homeassistant.util import slugify

from .const import OPT_GROUP, OPT_PEOPLE, OPT_START


def make_ids(names: list[str], taken: Iterable[str] = ()) -> list[str]:
    """One id per name, as ^[a-z0-9_]+$: the slug of the name, personN when nothing is left, _2, _3 when it is taken."""
    used, ids = set(taken), []
    for name in names:
        base = re.sub(r"[^a-z0-9_]", "", slugify(name)).strip("_")
        if base == "unknown" and name.strip().lower() != "unknown":  # slugify's answer for a name with nothing to keep
            base = ""
        tries = chain([base], (f"{base}_{n}" for n in count(2))) if base else (f"person{n}" for n in count(1))
        candidate = next(c for c in tries if c not in used)
        used.add(candidate)
        ids.append(candidate)
    return ids


def overlay(options: Mapping, time_zone: str) -> dict | None:
    """What ConfigHolder merges into scoring.toml; None for an entry whose people are still in the file."""
    if OPT_PEOPLE not in options:
        return None
    return {"people": options[OPT_PEOPLE], "group": options.get(OPT_GROUP), "start": options[OPT_START], "timezone": time_zone}


def _json_safe(value):
    if isinstance(value, dict):
        return {k: _json_safe(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_json_safe(v) for v in value]
    return value.isoformat() if isinstance(value, date) else value  # a TOML datetime is a date too


def from_toml(text: str) -> dict | None:
    """{"people", "group", "start"} of a scoring.toml, tables unchanged, dates as ISO strings; None when it has no
    [people]. Raises when the TOML does not parse or has no valid rules.start."""
    raw = tomllib.loads(text)
    if "people" not in raw:
        return None
    start = raw.get("rules", {}).get("start")
    if not isinstance(start, date) or isinstance(start, datetime):
        raise ValueError("rules.start must be a date")
    return {OPT_PEOPLE: _json_safe(raw["people"]), OPT_GROUP: _json_safe(raw.get("group")), OPT_START: start.isoformat()}


def person(name: str, pick: str | None, today: date) -> dict:
    """A new person; pick as in with_plan."""
    return with_plan({"name": name, "plan_history": []}, pick, today)


def with_plan(record: dict, pick: str | None, today: date) -> dict:
    """record with the plan picked in a form from today: a plan name starts it (again), "none" (or None) stops the plan;
    stopping when no plan is active changes nothing. Earlier history stays."""
    plan, history = None if pick == "none" else pick, record.get("plan_history", [])
    if plan is None and (not history or history[-1]["plan"] is None):
        return record
    return {**record, "plan_history": [*history, {"plan": plan, "from": today.isoformat()}]}
