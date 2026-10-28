"""Loads and validates scoring.toml (see specs/2026-10-26-scoring-design.md, sections 5 and 6)."""
import math
import re
import tomllib
from datetime import date, datetime
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

COUNTERS = frozenset({
    "runs", "walks", "run_km", "longest_session_km", "gym", "tonnes", "prs", "max_prs_in_week",
    "plan_weeks", "plan_graduated", "goal_weeks", "best_streak", "bonus_weeks", "perfect_weeks",
    "paused_week_workouts", "early", "late", "joint", "joint_km", "workouts", "home", "active_days",
})

# Every key below must be present and > 0 (xp.per_min values may be 0).
POSITIVE = {
    "rules": ("merge_gap_min", "min_run_min", "min_gym_min", "min_home_min"),
    "xp": ("session_cap_min", "day_cap_min", "joint_factor", "plan_session", "pr_session",
           "bonus", "level_base", "active_day"),
    "joint": ("start_window_min", "overlap"),
    "pause": ("min_days",),
    "plan": ("max_sessions_per_day",),
}
KINDS = ("run", "walk", "gym", "home")
# HealthKit activityType names (lowercase) that count as a home workout.
HOME_TYPES = frozenset({
    "functionalstrengthtraining", "traditionalstrengthtraining", "highintensityintervaltraining",
    "coretraining", "yoga", "pilates", "dance", "cardiodance", "socialdance", "mixedcardio",
    "flexibility",
})
GOAL_DEFAULTS = {"active_days": 0, "steps": 10000}
TARGET_TYPES = ("duration", "distance", "none")
ID_RE = re.compile(r"^[a-z0-9_]+$")


class ConfigError(ValueError):
    """Raised with every problem found, joined by '; '."""


def finite(v):
    """A real number: not a bool, NaN or infinity, and small enough for a float."""
    try:
        return isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v)
    except OverflowError:  # int too large to convert to float
        return False


def _date(v):
    return isinstance(v, date) and not isinstance(v, datetime)  # a TOML datetime is a date subclass


def _check_numbers(errs, name, table, keys, minimum_exclusive=True):
    for k in keys:
        v = table.get(k)
        if not finite(v) or (v <= 0 if minimum_exclusive else v < 0):
            errs.append(f"{name}.{k} must be a number {'> 0' if minimum_exclusive else '>= 0'}")


def _int_in(v, lo, hi):
    return isinstance(v, int) and not isinstance(v, bool) and lo <= v <= hi


def _alias_gym(errs, where, goal):
    """In a goal table, `gym` is the old name of `workouts`."""
    if "gym" in goal:
        old = goal.pop("gym")
        if "workouts" in goal:
            errs.append(f"{where}: use workouts or gym, not both")
        else:
            goal["workouts"] = old


def _check_goal(errs, where, goal):
    for k in ("runs", "workouts", "active_days"):
        if not _int_in(goal.get(k), 0, 10**6):
            errs.append(f"{where}.{k} must be an integer >= 0")
    if not _int_in(goal.get("steps"), 2000, 30000):
        errs.append(f"{where}.steps must be an integer 2000-30000")


def _check_session(errs, where, s):
    if not isinstance(s, dict):
        return errs.append(f"{where} must be a table")
    if not finite(s.get("warmup_s")) or s["warmup_s"] < 0:
        errs.append(f"{where}.warmup_s must be a number >= 0")
    times = s.get("times", 1)
    if not isinstance(times, int) or isinstance(times, bool) or times < 1:
        errs.append(f"{where}.times must be an integer >= 1")
    for iv in s.get("intervals", []):
        if not (isinstance(iv, list) and len(iv) == 2 and iv[0] in ("run", "walk")
                and finite(iv[1]) and iv[1] > 0):
            errs.append(f"{where}.intervals entry {iv!r} must be [\"run\"|\"walk\", seconds > 0]")
    t = s.get("target")
    if not isinstance(t, dict) or t.get("type") not in TARGET_TYPES:
        return errs.append(f"{where}: unknown target type {t.get('type') if isinstance(t, dict) else t!r}")
    if t["type"] != "none":
        f = t.get("fraction")
        if not finite(f) or not 0 < f <= 1:
            errs.append(f"{where}.target.fraction must be in (0, 1]")
    if t["type"] == "distance" and not (finite(t.get("km")) and t["km"] > 0):
        errs.append(f"{where}.target distance requires km > 0")


def _check_plans(errs, plans):
    for pid, plan in plans.items():
        weeks = plan.get("weeks")
        if not isinstance(weeks, list) or not weeks:
            errs.append(f"plans.{pid}.weeks must be a non-empty list")
            continue
        for wi, wk in enumerate(weeks, 1):
            sessions = wk.get("sessions")
            where = f"plans.{pid} week {wi}"
            if not isinstance(sessions, list) or not sessions:
                errs.append(f"{where}: sessions must be a non-empty list")
                continue
            rep = wk.get("repeat")
            if rep is not None and (not isinstance(rep, int) or rep < 1 or len(sessions) != 1):
                errs.append(f"{where}: repeat needs an integer >= 1 and exactly one session")
            for si, s in enumerate(sessions, 1):
                _check_session(errs, f"{where} session {si}", s)


def _check_badges(errs, badges):
    seen = set()
    for i, b in enumerate(badges, 1):
        where = f"badge {b.get('id', i)}"
        if b.get("id") in seen:
            errs.append(f"{where}: duplicate id")
        seen.add(b.get("id"))
        for k in ("id", "counter", "title", "icon", "category"):
            if not isinstance(b.get(k), str) or not b[k]:
                errs.append(f"{where}: {k} must be a non-empty string")
        if b.get("counter") not in COUNTERS:
            errs.append(f"{where}: unknown counter {b.get('counter')!r}")
        th = b.get("thresholds")
        if not (isinstance(th, list) and th and all(finite(t) and t > 0 for t in th)):
            errs.append(f"{where}: thresholds must be a non-empty list of numbers > 0")
            continue
        if any(a >= c for a, c in zip(th, th[1:])):
            errs.append(f"{where}: thresholds must be strictly ascending")
        for k in b.get("titles", {}):
            if k not in {f"{t:g}" for t in th}:
                errs.append(f"{where}: titles key {k!r} is not a threshold")


def _check_group(errs, group, people):
    if group is None:
        return
    if not isinstance(group, dict):
        return errs.append("group must be a table")
    name = group.get("name")
    if not isinstance(name, str) or not ID_RE.match(name) or name in people:
        errs.append("group.name must match ^[a-z0-9_]+$ and not be a person id")
    m = group.get("members")
    if not (isinstance(m, list) and len(m) == 2 and len(set(map(str, m))) == 2
            and all(x in people for x in m)):
        errs.append("group.members must be two distinct configured people ids")


def _validate(cfg, errs):
    for name, keys in POSITIVE.items():
        if isinstance(cfg.get(name), dict):
            _check_numbers(errs, name, cfg[name], keys)
        else:
            errs.append(f"missing table [{name}]")
    if isinstance(cfg.get("goal"), dict):
        _alias_gym(errs, "goal", cfg["goal"])
    else:
        errs.append("missing table [goal]")
    rules = cfg.get("rules", {})
    if not _date(rules.get("start")):
        errs.append("rules.start must be a date")
    try:
        ZoneInfo(rules.get("timezone"))
    except (ZoneInfoNotFoundError, ValueError, TypeError):
        errs.append(f"rules.timezone {rules.get('timezone')!r} is not a known timezone")
    per_min = cfg.get("xp", {}).get("per_min", {})
    _check_numbers(errs, "xp.per_min", per_min if isinstance(per_min, dict) else {}, KINDS, False)

    _check_plans(errs, cfg.get("plans", {}))
    if not cfg.get("plans"):
        errs.append("missing table [plans]")
    for p, person in cfg.get("people", {}).items():
        if not ID_RE.match(p):
            errs.append(f"people.{p}: id must match ^[a-z0-9_]+$")
        if not isinstance(person.get("name"), str) or not person["name"].strip():
            errs.append(f"people.{p}.name must be a non-empty string")
        own = person.get("goal", {})
        _alias_gym(errs, f"people.{p}.goal", own)
        goal = {**GOAL_DEFAULTS, **cfg.get("goal", {}), **own}
        _check_goal(errs, f"people.{p}.goal", goal)
        person["goal"] = goal
        hist = person.get("plan_history")
        if not isinstance(hist, list) or not hist:
            errs.append(f"people.{p}.plan_history must be a non-empty list")
            continue
        for h in hist:
            if not _date(h.get("from")):
                errs.append(f"people.{p}.plan_history entry needs a date `from`")
            if h.get("plan") not in cfg.get("plans", {}):
                errs.append(f"people.{p}: unknown plan {h.get('plan')!r}")
    if not cfg.get("people"):
        errs.append("missing table [people]")
    _check_group(errs, cfg.get("group"), cfg.get("people", {}))

    _check_badges(errs, cfg.get("badges", []))
    if not cfg.get("badges"):
        errs.append("missing [[badges]]")


def load_config(text):
    """Parse and validate scoring.toml text; per-person goals default from [goal]."""
    try:
        cfg = tomllib.loads(text)
    except tomllib.TOMLDecodeError as e:
        raise ConfigError(f"invalid TOML: {e}") from e
    errs = []
    try:
        _validate(cfg, errs)
    except (AttributeError, TypeError, KeyError) as e:  # wrong-shaped entries: never leak a non-ConfigError
        errs.append(f"malformed config: {e!r}")
    if errs:
        raise ConfigError("; ".join(errs))
    cfg.setdefault("group", None)
    return cfg


def pause_titles(cfg, person):
    """Lowercase calendar-event titles that pause `person`: own name, plus both/group name for group members."""
    titles = {cfg["people"][person]["name"].lower()}
    group = cfg["group"]
    if group and person in group["members"]:
        titles |= {"both", group["name"].lower()}
    return titles


def plan_sessions(config, plan_id):
    """Flat, ordered session list of a plan with total_s = warmup_s + sum of interval seconds."""
    out = []
    for wi, wk in enumerate(config["plans"][plan_id]["weeks"], 1):
        sessions = wk["sessions"] * wk.get("repeat", 1)
        for di, s in enumerate(sessions, 1):
            intervals = [(k, sec) for k, sec in s.get("intervals", [])] * s.get("times", 1)
            out.append({"week": wi, "day": di, "warmup_s": s["warmup_s"], "intervals": intervals,
                        "target": s["target"],
                        "total_s": s["warmup_s"] + sum(sec for _, sec in intervals)})
    return out


def _bad(msg):
    raise ValueError(msg)


def _iso_date(v):
    try:
        return date.fromisoformat(v) if isinstance(v, str) and len(v) == 10 else None
    except ValueError:
        return None


def _check_entry(i, entry, people):
    """One validated settings history entry; raises ValueError naming the first problem."""
    at = f"history[{i}]"
    if not isinstance(entry, dict):
        _bad(f"{at} must be an object")
    d = _iso_date(entry.get("from"))
    if d is None or d.weekday() != 0:
        _bad(f"{at}.from must be a Monday (YYYY-MM-DD)")
    out = {"from": entry["from"]}
    if "people" in entry:
        if not isinstance(entry["people"], dict):
            _bad(f"{at}.people must be an object")
        out["people"] = {}
        for p, g in entry["people"].items():
            if p not in people:  # a person who left the config is dropped, not an error
                continue
            if not isinstance(g, dict):
                _bad(f"{at}.people.{p} must be an object")
            for k in ("runs", "workouts", "active_days"):
                if not _int_in(g.get(k), 0, 7):
                    _bad(f"{at}.people.{p}.{k} must be an integer 0-7")
            s = g.get("steps")
            if not (_int_in(s, 2000, 30000) and s % 1000 == 0):
                _bad(f"{at}.people.{p}.steps must be 2000-30000 in steps of 1000")
            out["people"][p] = {k: g[k] for k in ("runs", "workouts", "active_days", "steps")}
    if "couple" in entry:
        c = entry["couple"]
        if not isinstance(c, dict):
            _bad(f"{at}.couple must be an object")
        if c.get("mode") not in ("own", "together", "team"):
            _bad(f"{at}.couple.mode must be own, together or team")
        if not _int_in(c.get("together"), 1, 3):
            _bad(f"{at}.couple.together must be an integer 1-3")
        if not _int_in(c.get("team"), 1, 42):
            _bad(f"{at}.couple.team must be an integer 1-42")
        if not (isinstance(c.get("reward"), str) and len(c["reward"]) <= 60):
            _bad(f"{at}.couple.reward must be text of at most 60 characters")
        out["couple"] = {k: c[k] for k in ("mode", "together", "team", "reward")}
    return out


def parse_settings(obj, people):
    """The `fitbridge/settings` payload (goals spec section 3), validated: {"history": [...]}.

    Raises ValueError with a readable reason. Unknown person ids are dropped."""
    if not (isinstance(obj, dict) and isinstance(obj.get("history"), list)):
        _bad("settings must be an object with a history list")
    history = [_check_entry(i, e, people) for i, e in enumerate(obj["history"])]
    if any(a["from"] >= b["from"] for a, b in zip(history, history[1:])):
        _bad("history must be sorted by from, one entry per week")
    return {"history": history}


def parse_steps(obj, people):
    """The `fitbridge/steps` payload: {person: {"YYYY-MM-DD": int}}. Floats round down; unusable values are dropped.

    Raises ValueError when the payload is not an object. Unknown person ids are dropped."""
    if not isinstance(obj, dict):
        _bad("steps must be an object")
    out = {}
    for p, days in obj.items():
        if p in people and isinstance(days, dict):
            out[p] = {d: int(n) for d, n in days.items() if _iso_date(d) and finite(n) and n >= 0}
    return out
