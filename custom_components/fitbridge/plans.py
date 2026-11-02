"""Custom running plans built on the Fitness page: validated, ids, loaded from a Store; the runner hands them to the
engine in the overlay."""
import logging
import re

from homeassistant.util import slugify

from .engine.scoring_config import check_plan
from .people import make_ids

_LOGGER = logging.getLogger(__name__)

FRACTIONS = {"duration": 0.8, "distance": 0.9}  # fixed by the builder
MAX_S = 10800


def _int_in(v, lo: int, hi: int) -> bool:
    return isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi


def _bad(field: str, reason: str):
    raise ValueError(f"{field}: {reason}")


def _list(v, field: str, lo: int, hi: int) -> list:
    if not isinstance(v, list):
        _bad(field, "must be a list")
    if not lo <= len(v) <= hi:
        _bad(field, f"must have {lo}-{hi} entries" if lo != hi else f"must have {lo} entries")
    return v


def _session(s, at: str) -> dict:
    if not isinstance(s, dict):
        _bad(at, "must be an object")
    out = {}
    for k in ("warmup_s", "cooldown_s"):
        if k in s or k == "warmup_s":
            if not _int_in(s.get(k), 0, MAX_S):
                _bad(f"{at}.{k}", f"must be an integer 0-{MAX_S}")
            out[k] = s[k]
    if "intervals" in s:
        out["intervals"] = []
        for i, iv in enumerate(_list(s["intervals"], f"{at}.intervals", 0, 30), 1):
            if not (isinstance(iv, list) and len(iv) == 2 and iv[0] in ("run", "walk") and _int_in(iv[1], 1, MAX_S)):
                _bad(f"{at}.intervals.{i}", f"must be [\"run\"|\"walk\", 1-{MAX_S} seconds]")
            out["intervals"].append([iv[0], iv[1]])
    if "times" in s:
        if not _int_in(s["times"], 1, 50):
            _bad(f"{at}.times", "must be an integer 1-50")
        out["times"] = s["times"]
    t = s.get("target")
    kind = t.get("type") if isinstance(t, dict) else None
    if kind == "none":
        out["target"] = {"type": "none"}
    elif kind == "duration":
        out["target"] = {"type": kind, "fraction": FRACTIONS[kind]}
    elif kind == "distance":
        km = t.get("km")  # no float() or isfinite: a huge int overflows; the range test refuses it, NaN and inf
        if isinstance(km, bool) or not isinstance(km, (int, float)) or not 0.1 <= km <= 100:
            _bad(f"{at}.target.km", "must be a number 0.1-100")
        out["target"] = {"type": kind, "km": km, "fraction": FRACTIONS[kind]}
    else:
        _bad(f"{at}.target", "must be duration, distance or none")
    if s.get("note"):
        if not (isinstance(s["note"], str) and len(s["note"]) <= 80):
            _bad(f"{at}.note", "must be text of at most 80 characters")
        out["note"] = s["note"]
    return out


def validate(body) -> dict:
    """A stored plan {"name", "loop", "weeks"} from a page body; unknown keys dropped. ValueError "<field>: <reason>" on the
    first problem."""
    if not isinstance(body, dict):
        _bad("body", "must be an object")
    name = body.get("name")
    if not (isinstance(name, str) and name.strip() and len(name) <= 40):
        _bad("name", "must be text of 1-40 characters")
    loop = body.get("loop", False)
    if not isinstance(loop, bool):
        _bad("loop", "must be true or false")
    weeks = []
    for w, week in enumerate(_list(body.get("weeks"), "weeks", 1, 52), 1):
        if not isinstance(week, dict):
            _bad(f"weeks.{w}", "must be an object")
        sessions = _list(week.get("sessions"), f"weeks.{w}.sessions", 1, 7)
        weeks.append({"sessions": [_session(s, f"weeks.{w}.sessions.{i}") for i, s in enumerate(sessions, 1)]})
    plan = {"name": name, "loop": loop, "weeks": weeks}
    if errs := check_plan(plan):  # last line of defence
        raise ValueError(errs[0])
    return plan


def new_id(name: str, taken) -> str:
    """my_<slug of name>, _2, _3 when taken."""
    taken = set(taken)
    base = re.sub(r"[^a-z0-9_]", "", slugify(name)).strip("_") or "plan"
    return make_ids([f"my_{base}"], taken)[0]


def used(people_options: dict) -> set[str]:
    """Plan ids any person's plan_history names."""
    return {e["plan"] for p in people_options.get("people", {}).values() for e in p.get("plan_history", []) if e.get("plan")}


async def load(store) -> dict:
    """{id: plan} from the store; a plan that fails the plan check is skipped, so one broken plan never stops scoring."""
    data = await store.async_load()
    stored = data.get("plans") if isinstance(data, dict) else None
    out = {}
    for pid, plan in (stored if isinstance(stored, dict) else {}).items():
        errs = check_plan({k: v for k, v in plan.items() if k != "by"}) if isinstance(plan, dict) else ["plan: not an object"]
        if errs:
            _LOGGER.warning("Skipping custom plan %s: %s", pid, errs[0])
        else:
            out[pid] = plan
    return out
