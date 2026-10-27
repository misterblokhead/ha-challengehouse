"""Pure logic for the fitness page: payload checks, who is who, who may edit. No Home Assistant imports."""
import json
import math

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


def shape(scores: dict, viewer_person: str | None, is_admin: bool, shoes_by_person: dict[str, list] | None = None) -> dict:
    shoes_by_person = shoes_by_person or {}
    return {**scores,
            "people": {p: {**r, "shoes": shoes_by_person.get(p, [])} for p, r in scores["people"].items()},
            "viewer": {"person": viewer_person,
                       "can_edit": [p for p in scores["people"] if can_edit(viewer_person, is_admin, p)]}}


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
    feed = scores["people"].get(person, {}).get("feed", [])
    return next((w for w in feed if w.get("key") == key), None)


def manual_message(action: str, person: str, key: str, msg_id: str) -> tuple[str, str]:
    if action not in ("remove", "restore"):
        raise ValueError(f"unknown action {action!r}")
    return MANUAL_PREFIX + msg_id, json.dumps({"action": action, "person": person, "key": key})
