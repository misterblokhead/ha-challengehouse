"""Pure logic for the fitness page: payload checks, who is who, who may edit. No Home Assistant imports."""
import json

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


def shape(scores: dict, viewer_person: str | None, is_admin: bool) -> dict:
    return {**scores, "viewer": {"person": viewer_person,
                                 "can_edit": [p for p in scores["people"] if can_edit(viewer_person, is_admin, p)]}}


def find_workout(scores: dict, person: str, key: str) -> dict | None:
    feed = scores["people"].get(person, {}).get("feed", [])
    return next((w for w in feed if w.get("key") == key), None)


def manual_message(action: str, person: str, key: str, msg_id: str) -> tuple[str, str]:
    if action not in ("remove", "restore"):
        raise ValueError(f"unknown action {action!r}")
    return MANUAL_PREFIX + msg_id, json.dumps({"action": action, "person": person, "key": key})
