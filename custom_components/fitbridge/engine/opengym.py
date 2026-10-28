"""openGym admin API client: turns gym sessions into scorer workout dicts."""
import json
import re
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

from .records import session_lifts
from .scoring_config import finite

MAX_SESSION_S = 12 * 3600


class OpenGymAuthError(Exception):
    pass


class OpenGym:
    def __init__(self, url, get_token, save_token, opener=urllib.request.urlopen):
        self.url, self.get_token, self.save_token, self.opener = url.rstrip("/"), get_token, save_token, opener

    def _get(self, path):
        req = urllib.request.Request(self.url + path, headers={"Authorization": f"Bearer {self.get_token()}"})
        try:
            with self.opener(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 401:
                raise OpenGymAuthError("openGym rejected the token (HTTP 401)") from None
            raise

    def text(self, path):
        """Public page or asset, no auth."""
        with self.opener(urllib.request.Request(self.url + path), timeout=30) as r:
            return r.read().decode("utf-8", "replace")

    def renew_token(self):
        token = self._get("/api/me").get("token")
        if token:
            self.save_token(token)

    def users(self):
        return self._get("/api/admin/users")["users"]

    def user(self, uid):
        return self._get(f"/api/admin/user?id={urllib.parse.quote(uid)}")

    def exercise_file(self):
        """Path of the hashed exercises bundle named by the index page, or None."""
        m = re.search(r"assets/exercises-[\w-]+\.js", self.text("/"))
        return m.group(0) if m else None


def person_for(user, uids):
    """Explicit uid match only (uids: person id -> openGym uid); never by name."""
    return next((p for p, uid in uids.items() if uid == user.get("id")), None)


def to_workout(raw, person, public_url, unit="kg"):
    """Scorer workout dict, or None for a session we cannot use (one bad row never stops the rest)."""
    start, end, vol = raw.get("start"), raw.get("end"), raw.get("vol") or 0
    if (raw.get("id") is None or not (finite(start) and finite(end) and finite(vol))
            or end <= start or (end - start) / 1000 > MAX_SESSION_S):
        return None
    try:
        start_dt, end_dt = (datetime.fromtimestamp(t / 1000, timezone.utc) for t in (start, end))
    except (OverflowError, ValueError, OSError):  # outside datetime's range
        return None
    return {
        "person": person, "key": f"opengym:{raw['id']}", "source": "opengym", "kind": "gym", "indoor": True,
        "start": start_dt, "end": end_dt,
        "duration_s": (end - start) / 1000, "distance_m": None, "avg_hr": None,
        "vol_kg": float(vol), "prs": list(raw.get("prs") or []),
        "lifts": session_lifts(raw.get("entries")), "unit": unit,
        "name": raw.get("name") or "Gym session",
        "url": public_url or None,  # no per-workout route known in openGym; link to the app
        "excluded": False,
    }


def fetch_all(og, uids, people, public_url):
    out = {p: [] for p in people}
    for user in og.users():
        person = person_for(user, uids)
        if person in out:
            detail = og.user(user["id"])
            unit = "lb" if detail.get("unit") == "lb" else "kg"
            ws = (to_workout(r, person, public_url, unit) for r in detail["workouts"])
            out[person] += [w for w in ws if w]
    return out
