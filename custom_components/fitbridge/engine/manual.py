"""Manual changes: remove / restore a workout, or log one by hand (the integration's actions and the page)."""
from datetime import datetime, timedelta, timezone

from .ingest import aware
from .scoring_config import KINDS, finite

MANUAL_MAX_MIN = 600
MANUAL_MAX_KM = 1000
MANUAL_EARLIEST = datetime(2000, 1, 1, tzinfo=timezone.utc)


def apply(store, msg: dict, msg_id: str, now, people):
    """Apply one manual change; raises ValueError (short reason) when it is invalid."""
    if not isinstance(msg, dict):
        raise ValueError("not an object")
    person, action = msg.get("person"), msg.get("action")
    if person not in people:
        raise ValueError("unknown person")
    if action in ("remove", "restore"):
        key = msg.get("key")
        if not isinstance(key, str) or not key:
            raise ValueError("missing key")
        if action == "remove" and key.startswith("manual:"):
            store.delete_workout(person, key)
        else:
            store.set_excluded(person, key, action == "remove")
    elif action == "add":
        minutes, km = msg.get("minutes"), msg.get("km")
        if msg.get("kind") not in KINDS:
            raise ValueError("unknown kind")
        if not finite(minutes) or not 0 < minutes <= MANUAL_MAX_MIN:
            raise ValueError("bad minutes")
        if km is not None and (not finite(km) or not 0 <= km <= MANUAL_MAX_KM):
            raise ValueError("bad km")
        start = aware(msg.get("start"))
        if not start:
            raise ValueError("start must be an ISO 8601 time with timezone")
        if start > now:
            raise ValueError("start in the future")
        if start < MANUAL_EARLIEST:  # absurd years overflow later datetime arithmetic
            raise ValueError("start too early")
        indoor = msg.get("indoor", False)
        if not isinstance(indoor, bool):
            raise ValueError("indoor must be a boolean")
        store.add(person, f"manual:{msg_id}", "manual", "manual", activity_type=msg["kind"],
                  start=start.isoformat(), end=(start + timedelta(minutes=minutes)).isoformat(),
                  duration_s=minutes * 60, distance_m=None if km is None else km * 1000,
                  indoor=int(indoor))
    else:
        raise ValueError("unknown action")
