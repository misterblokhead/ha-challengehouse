"""Pure logic for the fitness page: who is who, who may edit. No Home Assistant imports."""
from datetime import date, timedelta


def viewer_person(user_id: str, viewers: dict[str, str], scores: dict) -> str | None:
    """The person a HA user is mapped to, if that person is in the payload."""
    person = viewers.get(user_id)
    return person if person in scores["people"] else None


def can_edit(viewer_person: str | None, is_admin: bool, target: str) -> bool:
    if viewer_person is None:
        return False
    return is_admin or viewer_person == target


def can_connect(viewer_person: str | None, is_admin: bool, target: str) -> bool:
    return is_admin or viewer_person == target


def public(scores: dict) -> dict:
    """The scores without each person's `older` feed: that stays in memory for GET feed (the page's Load older); /scores
    and the page's payload never carry it."""
    people = scores.get("people")
    if not isinstance(people, dict):
        return scores
    return {**scores, "people": {p: {k: v for k, v in r.items() if k != "older"} for p, r in people.items()}}


def shape(scores: dict, viewer_person: str | None, is_admin: bool, steps_by_person: dict[str, int | None] | None = None,
          steps_week_by_person: dict[str, dict[str, int]] | None = None) -> dict:
    steps_by_person, steps_week_by_person = steps_by_person or {}, steps_week_by_person or {}
    scores = public(scores)
    return {**scores,
            "people": {p: {**r, "shoes": r.get("shoes", []), "steps_today": steps_by_person.get(p),
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


def find_workout(scores: dict, person: str, key: str) -> dict | None:
    r = scores["people"].get(person, {})
    return next((w for w in r.get("feed", []) + r.get("older", []) if w.get("key") == key), None)

