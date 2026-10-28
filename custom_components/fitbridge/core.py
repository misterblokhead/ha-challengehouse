"""Pure logic for the fitness page: payload checks, who is who, who may edit. No Home Assistant imports."""
import json
import math
from datetime import date, timedelta

from .const import MANUAL_PREFIX


def parse_scores(raw: str | bytes) -> dict | None:
    """The retained scores payload, or None when it is not the shape the page needs."""
    try:
        data = json.loads(raw)
    except ValueError:  # includes bad UTF-8 in bytes
        return None
    people = data.get("people") if isinstance(data, dict) else None
    if not isinstance(people, dict):
        return None
    if not all(isinstance(p, dict) and isinstance(p.get("feed"), list) and all(isinstance(w, dict) for w in p["feed"])
               for p in people.values()):
        return None
    return data


def viewer_person(user_id: str, viewers: dict[str, str], scores: dict) -> str | None:
    """The person a HA user is mapped to, if that person is in the payload."""
    person = viewers.get(user_id)
    return person if person in scores["people"] else None


def can_edit(viewer_person: str | None, is_admin: bool, target: str) -> bool:
    if viewer_person is None:
        return False
    return is_admin or viewer_person == target


def public(scores: dict) -> dict:
    """The scores without each person's `older` feed: that stays in memory for GET feed (the page's Load older); /scores,
    the page's payload and shadow-scores.json never carry it."""
    people = scores.get("people")
    if not isinstance(people, dict):
        return scores
    return {**scores, "people": {p: {k: v for k, v in r.items() if k != "older"} for p, r in people.items()}}


def shape(scores: dict, viewer_person: str | None, is_admin: bool, shoes_by_person: dict[str, list] | None = None,
          steps_by_person: dict[str, int | None] | None = None, steps_week_by_person: dict[str, dict[str, int]] | None = None) -> dict:
    shoes_by_person, steps_by_person, steps_week_by_person = shoes_by_person or {}, steps_by_person or {}, steps_week_by_person or {}
    scores = public(scores)
    return {**scores,
            "people": {p: {**r, "shoes": shoes_by_person.get(p, r.get("shoes", [])), "steps_today": steps_by_person.get(p),
                           "steps_week": steps_week_by_person.get(p)}
                       for p, r in scores["people"].items()},
            "viewer": {"person": viewer_person,
                       "can_edit": [p for p in scores["people"] if can_edit(viewer_person, is_admin, p)]}}


def older_feed(scores: dict, person: str, before: date) -> dict:
    """The next 90 days of `person`'s older feed: items dated on or after before - 90 days and before `before`, newest first,
    and whether any are older still."""
    since = (before - timedelta(days=90)).isoformat()
    older = scores["people"][person].get("older", [])
    return {"items": [i for i in older if since <= i["start"][:10] < before.isoformat()],
            "more": any(i["start"][:10] < since for i in older)}


def _km(state: str) -> float | None:
    try:
        km = float(state)
    except ValueError:  # unavailable, unknown
        return None
    return km if math.isfinite(km) else None


def shoes(chosen: dict[str, float], states: dict[str, tuple[str, dict] | None]) -> list[dict]:
    """A person's chosen Endurain shoe sensors ({entity_id: replace-at km}) as page rows, in the chosen order.
    `states`: entity_id -> (state, attributes), or None when HA has no such entity. Shoes Endurain retired are left out."""
    rows = []
    for entity_id, limit in chosen.items():
        state, attrs = states.get(entity_id) or ("unavailable", {})
        if attrs.get("active") is False:
            continue
        rows.append({"entity_id": entity_id, "name": attrs.get("nickname") or attrs.get("friendly_name") or entity_id,
                     "km": _km(state), "limit": limit, "runs": attrs.get("activity_count"),
                     "last_run": attrs.get("last_activity_at")})
    return rows


def find_workout(scores: dict, person: str, key: str) -> dict | None:
    r = scores["people"].get(person, {})
    return next((w for w in r.get("feed", []) + r.get("older", []) if w.get("key") == key), None)


def manual_message(action: str, person: str, key: str, msg_id: str) -> tuple[str, str]:
    if action not in ("remove", "restore"):
        raise ValueError(f"unknown action {action!r}")
    return MANUAL_PREFIX + msg_id, json.dumps({"action": action, "person": person, "key": key})
