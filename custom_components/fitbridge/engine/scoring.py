"""Pure scoring functions (no I/O)."""
import math
from collections import defaultdict
from datetime import date, datetime, time, timedelta
from functools import partial
from zoneinfo import ZoneInfo

from .records import muscle_group
from .scoring_config import COUNTERS, pause_titles, plan_sessions


def local_date(dt, tz):
    return dt.astimezone(tz).date()


def event_dates(ev, tz):
    """Local dates an event touches: all-day end is exclusive, timed end is exclusive only at 00:00."""
    s, e = ev["start"], ev["end"]
    if len(s) == 10:  # all-day: plain dates
        first, last_excl = date.fromisoformat(s), date.fromisoformat(e)
    else:
        sd, ed = (datetime.fromisoformat(x) for x in (s, e))
        sd, ed = (d if d.tzinfo else d.replace(tzinfo=tz) for d in (sd, ed))
        sd, ed = sd.astimezone(tz), ed.astimezone(tz)
        first = sd.date()
        last_excl = ed.date() if ed.time() == time.min else ed.date() + timedelta(days=1)
    return {first + timedelta(days=i) for i in range((last_excl - first).days)}


def pause_days(pauses, person, cfg):
    tz = ZoneInfo(cfg["rules"]["timezone"])
    titles = pause_titles(cfg, person)
    days = set()
    for ev in pauses:
        if (ev.get("summary") or "").strip().lower() in titles:
            days |= event_dates(ev, tz)
    return days


def _rank(w):
    """Sort key: automatic sources before manual, then longer first."""
    return (w["source"] == "manual", -w["duration_s"])


def _overlap_s(a, b):
    return (min(a["end"], b["end"]) - max(a["start"], b["start"])).total_seconds()


def _dedup_kind(kind):
    """Gym and home are one kind here: a session logged by OpenGym and by a watch counts once."""
    return "gym" if kind == "home" else kind


def _dedup(workouts):
    """One copy per overlapping same-kind group; the kept copy lists the dropped keys in `aliases`.
    Gym copies go first, so a gym/home pair keeps the gym copy (it has sets and volume)."""
    kept = []
    for w in sorted(workouts, key=lambda w: (w["kind"] != "gym", *_rank(w))):
        i = next((i for i, k in enumerate(kept)
                  if _dedup_kind(k["kind"]) == _dedup_kind(w["kind"]) and _overlap_s(k, w) > 0), None)
        if i is None:
            kept.append(w)
        else:
            kept[i] = dict(kept[i], aliases=kept[i].get("aliases", []) + [w["key"]], **_best_of(kept[i], w))
    return kept


def _best_of(a, b):
    """The record fields of two copies of one session: the better set per exercise, the faster 1 km.
    Old gym_cache dicts have no lifts/best_1k_s."""
    lifts = dict(a.get("lifts") or {})
    for ex, s in (b.get("lifts") or {}).items():
        if ex not in lifts or (s["w"], s["r"]) > (lifts[ex]["w"], lifts[ex]["r"]):
            lifts[ex] = s
    km = [x for x in (a.get("best_1k_s"), b.get("best_1k_s")) if x is not None]
    return {"lifts": lifts, "best_1k_s": min(km, default=None)}


def _alike(a, b):
    """Same kind and same effort flag: an effort-checked ride never merges or pairs with a yoga session."""
    return a["kind"] == b["kind"] and bool(a.get("effort")) == bool(b.get("effort"))


def _merge(a, b):
    base = min(a, b, key=_rank)
    other = b if base is a else a
    dist = [x["distance_m"] for x in (a, b) if x["distance_m"] is not None]
    start, end = min(a["start"], b["start"]), max(a["end"], b["end"])
    return dict(base, start=start, end=end, duration_s=(end - start).total_seconds(),
                distance_m=sum(dist) if dist else None, vol_kg=a["vol_kg"] + b["vol_kg"],
                prs=a["prs"] + [p for p in b["prs"] if p not in a["prs"]],
                aliases=base.get("aliases", []) + [other["key"]] + other.get("aliases", []), **_best_of(a, b))


def clean(workouts, cfg, early=False):
    """One person's workouts: drop pre-start, dedup across sources, merge stop-starts, sort by start.
    early: only the non-excluded ones before rules.start instead, deduped and merged alike (feed rows that score nothing)."""
    tz = ZoneInfo(cfg["rules"]["timezone"])
    gap = timedelta(minutes=cfg["rules"]["merge_gap_min"])
    live = [w for w in workouts if not w["excluded"] and (local_date(w["start"], tz) < cfg["rules"]["start"]) == early]
    merged = []
    for w in sorted(_dedup(live), key=lambda w: w["start"]):
        i = next((i for i in range(len(merged) - 1, -1, -1) if _alike(merged[i], w)), None)
        if i is not None and w["start"] - merged[i]["end"] < gap:
            merged[i] = _merge(merged[i], w)
        else:
            merged.append(w)
    return sorted(merged + ([] if early else [w for w in workouts if w["excluded"]]), key=lambda w: w["start"])


def mark_joint(by_person, cfg):
    """Set joint_s (shared seconds) and partner_km on both workouts of a joint pair (spec section 5)."""
    group = cfg["group"]
    if not group:
        return
    p, q = group["members"]
    window = timedelta(minutes=cfg["joint"]["start_window_min"])
    for a in by_person.get(p, []):
        for b in by_person.get(q, []):
            if a["excluded"] or b["excluded"] or not _alike(a, b) or "joint_s" in a or "joint_s" in b:
                continue
            shared = _overlap_s(a, b)
            if (abs(a["start"] - b["start"]) <= window and shared > 0
                    and shared >= cfg["joint"]["overlap"] * min(a["duration_s"], b["duration_s"])):
                for x, y in ((a, b), (b, a)):
                    x["joint_s"] = shared
                    x["partner_km"] = None if y["distance_m"] is None else y["distance_m"] / 1000


def _badge_id(badge, t):
    return f"{badge['id']}_{t:g}"


def _bump(counters, unlocked_at, badges, day, name, by=1, to=None):
    """The one place a counter changes: add `by`, or raise to `to`.

    Records `day` (local date) in unlocked_at for every badge threshold the change crosses."""
    old = counters[name]
    new = counters[name] = round(old + by, 6) if to is None else max(old, to)  # float sums: 1.1*9+0.1 must reach 10
    for b in badges:
        if b["counter"] == name:
            for t in b["thresholds"]:
                if old < t <= new:
                    unlocked_at.setdefault(_badge_id(b, t), day.isoformat())


def _iso_week(d):
    iso = d.isocalendar()
    return f"{iso.year}-W{iso.week:02d}"


def _active_plan(history, day):
    """Index of the last plan_history entry with from <= day, or None."""
    return next((i for i in range(len(history) - 1, -1, -1) if history[i]["from"] <= day), None)


GOAL_KEYS = ("runs", "workouts", "active_days")
COUPLE_DEFAULT = {"mode": "own", "together": 1, "team": 8, "reward": ""}


def _settings_entry(settings, monday):
    """The last settings history entry with from <= monday (history is sorted by from), or None."""
    return next((h for h in reversed((settings or {}).get("history", [])) if h["from"] <= monday.isoformat()), None)


def week_goal(cfg, settings, person, monday):
    """The person's goal for the week of `monday`: the settings entry for that week, else scoring.toml."""
    entry = _settings_entry(settings, monday) or {}
    return {**cfg["people"][person]["goal"], **entry.get("people", {}).get(person, {})}


def week_couple(settings, monday):
    """The couple settings for the week of `monday`; mode own without an entry."""
    return dict((_settings_entry(settings, monday) or {}).get("couple") or COUPLE_DEFAULT)


def _meets(w, session):
    t = session["target"]
    if t["type"] == "duration":
        return w["duration_s"] >= t["fraction"] * session["total_s"]
    if t["type"] == "distance":
        return (w["distance_m"] or 0) >= t["fraction"] * t["km"] * 1000
    return True


def max_hr(workouts, birth_year, today, cfg):
    """A person's max HR: the higher of the Tanaka estimate (208 - 0.7 x age, needs a birth year) and the highest
    plausible measured max (a workout's max counts only when its average is >= rules.max_hr_fit_pct of it).
    {"bpm", "source": "estimate" | "measured", "date": local date of the measuring workout | None}, or None."""
    fit = cfg["rules"]["max_hr_fit_pct"] / 100
    best = max((w for w in workouts if not w["excluded"] and w.get("max_hr") and w.get("avg_hr")
                and w["avg_hr"] >= fit * w["max_hr"]), key=lambda w: w["max_hr"], default=None)
    estimate = None if birth_year is None else round(208 - 0.7 * (today.year - birth_year))
    if best and (estimate is None or best["max_hr"] > estimate):
        tz = ZoneInfo(cfg["rules"]["timezone"])
        return {"bpm": round(best["max_hr"]), "source": "measured", "date": local_date(best["start"], tz).isoformat()}
    return None if estimate is None else {"bpm": estimate, "source": "estimate", "date": None}


def score_person(workouts, paused, cfg, person, now, steps=None, settings=None, max_bpm=None):
    """Week, XP, level, streak, plan and counters for one person (spec section 5).

    `workouts`: output of clean(), joint-marked; `paused`: the person's pause dates;
    `steps`: the person's {"YYYY-MM-DD": steps}; `settings`: the settings payload (goals spec section 3);
    `max_bpm`: the person's max HR for the effort check (None: duration only)."""
    tz = ZoneInfo(cfg["rules"]["timezone"])
    rules, xpc = cfg["rules"], cfg["xp"]
    history = cfg["people"][person]["plan_history"]
    sessions = [plan_sessions(cfg, h["plan"]) if h["plan"] else [] for h in history]
    done = [0] * len(history)                      # completed sessions per plan_history entry
    today = local_date(now, tz)
    this_monday = today - timedelta(days=today.weekday())
    by_week = defaultdict(list)
    for w in workouts:
        if not w["excluded"]:
            d = local_date(w["start"], tz)
            by_week[d - timedelta(days=d.weekday())].append((d, w))

    c, unlocked_at, plan_done = dict.fromkeys(COUNTERS, 0), {}, {}
    bump = partial(_bump, c, unlocked_at, cfg["badges"])
    streak, last_run, weekly, last_week = 0, None, {}, None
    workout_xp = defaultdict(float)                # XP per workout key: the feed's numbers and, summed, the total
    day_xp, plan_days = defaultdict(float), defaultdict(int)
    active_rows = []                               # synthetic feed rows, one per active day
    not_counted = {}                               # workout key -> "short" | "easy": minute XP, no ring

    def count(wkst, goal, d, key, xp_key):
        """One goal event for `key` on day `d`: the weekly bonus once beyond a goal > 0, then settle."""
        was_perfect = wkst["goal_met"] and wkst["bonus"]
        wkst[key] += 1
        if goal[key] and wkst[key] > goal[key] and not wkst["bonus"]:
            wkst["bonus"] = 1
            workout_xp[xp_key] += xpc["bonus"]
            bump(d, "bonus_weeks")
        settle(wkst, goal, d, was_perfect)

    def settle(wkst, goal, d, was_perfect=False):
        """goal_met (streak, goal badges) once every goal is reached; a perfect week once it is met with the bonus."""
        nonlocal streak
        if not wkst["goal_met"] and all(wkst[k] >= goal[k] for k in GOAL_KEYS):
            wkst["goal_met"] = True
            streak += 1
            bump(d, "goal_weeks")
            bump(d, "best_streak", to=streak)
        if wkst["goal_met"] and wkst["bonus"] and not was_perfect:
            bump(d, "perfect_weeks")

    monday = min(rules["start"] - timedelta(days=rules["start"].weekday()), this_monday)
    while monday <= this_monday:
        paused_wk = sum(monday + timedelta(days=i) in paused for i in range(7)) >= cfg["pause"]["min_days"]
        goal = week_goal(cfg, settings, person, monday)
        wkst = {"runs": 0, "workouts": 0, "active_days": 0, "bonus": 0, "goal_met": False}
        counted, prs_wk, active = set(), 0, []
        for d in (monday + timedelta(days=i) for i in range(7)):
            n = (steps or {}).get(d.isoformat())
            if n is not None and n >= goal["steps"] and d >= rules["start"]:
                active.append((d, {"key": f"steps:{person}:{d}", "kind": "active_day", "name": "Active day",
                                   "source": "steps", "indoor": False, "start": datetime.combine(d, time.min, tz),
                                   "duration_s": 0, "distance_m": None, "avg_hr": None, "url": None,
                                   "excluded": False, "steps": n}))
        active_rows += [w for _, w in active]
        settle(wkst, goal, monday)                 # all goals 0: met before any event
        for d, w in sorted(by_week[monday] + active, key=lambda e: e[1]["start"]):
            if w["kind"] == "active_day":          # XP outside the minute day cap
                bump(d, "active_days")
                workout_xp[w["key"]] += xpc["active_day"]
                count(wkst, goal, d, "active_days", w["key"])
                continue
            kind, mins, start = w["kind"], w["duration_s"] / 60, w["start"].astimezone(tz).time()
            km = None if w["distance_m"] is None else w["distance_m"] / 1000
            bump(d, "workouts")
            if start < time(7, 30):
                bump(d, "early")
            if start >= time(21):
                bump(d, "late")
            if paused_wk:
                bump(d, "paused_week_workouts")
            min_min = w.get("min_min") or rules.get(f"min_{kind}_min")  # None (manual entry, a type without its own): the kind's; a walk has none
            effort_ok = not (w.get("effort") and max_bpm and w["avg_hr"] is not None
                             and w["avg_hr"] < rules["effort_hr_pct"] / 100 * max_bpm)
            long_enough = kind != "walk" and mins >= min_min and effort_ok
            if kind != "walk" and not long_enough:
                not_counted[w["key"]] = "short" if mins < min_min else "easy"
            if kind == "run":
                if long_enough:
                    bump(d, "runs")
                last_run = d
                if km:
                    bump(d, "run_km", km)
                    if not w["indoor"]:
                        bump(d, "longest_session_km", to=km)
            elif kind == "walk":
                bump(d, "walks")
            elif kind == "home":
                if long_enough:
                    bump(d, "home")
            elif kind == "gym":
                if long_enough:
                    bump(d, "gym")
                if w["vol_kg"]:
                    bump(d, "tonnes", w["vol_kg"] / 1000)
                if w["prs"]:
                    prs_wk += len(w["prs"])
                    bump(d, "prs", len(w["prs"]))
                    bump(d, "max_prs_in_week", to=prs_wk)
            if w.get("joint_s"):
                bump(d, "joint")
                if kind == "run" and km is not None and w.get("partner_km") is not None:
                    bump(d, "joint_km", (km + w["partner_km"]) / 2)

            # Weekly goal: at most one counting run and one counting workout (gym or home) per local day.
            key = {"run": "runs", "gym": "workouts", "home": "workouts"}.get(kind)
            if key and long_enough and (key, d) not in counted:
                counted.add((key, d))
                count(wkst, goal, d, key, w["key"])

            # Plan: a run completes the next session if it meets the target, within the per-day limit.
            i = _active_plan(history, d) if kind == "run" else None
            if (i is not None and done[i] < len(sessions[i])
                    and plan_days[d] < cfg["plan"]["max_sessions_per_day"] and _meets(w, sessions[i][done[i]])):
                s = sessions[i][done[i]]
                done[i] += 1
                plan_days[d] += 1
                plan_done[w["key"]] = f"W{s['week']}D{s['day']}"
                workout_xp[w["key"]] += xpc["plan_session"]
                graduated = done[i] == len(sessions[i])
                if graduated or sessions[i][done[i]]["week"] != s["week"]:
                    bump(d, "plan_weeks", to=s["week"])
                if graduated:
                    bump(d, "plan_graduated")

            minute_xp = (min(mins, xpc["session_cap_min"]) * xpc["per_min"][kind]
                         + w.get("joint_s", 0) * (xpc["joint_factor"] - 1) / 60)
            gained = min(minute_xp, xpc["day_cap_min"] - day_xp[d])
            day_xp[d] += gained
            pr_xp = xpc["pr_session"] if w["prs"] else 0
            workout_xp[w["key"]] += gained + pr_xp

        counts = {k: wkst[k] for k in GOAL_KEYS}
        weekly[monday.isoformat()] = {"goal_met": wkst["goal_met"], "paused": paused_wk, **counts}
        if monday == this_monday - timedelta(days=7):
            last_week = {"week": _iso_week(monday), **counts, "goal_met": wkst["goal_met"], "paused": paused_wk}
        if monday < this_monday and not wkst["goal_met"] and not paused_wk:
            streak = 0                             # closed, missed, not paused; the current week never resets
        monday += timedelta(days=7)

    xp = math.floor(round(math.fsum(workout_xp.values()), 6))  # float sums: 30 x 100/60 min must reach 50
    base = xpc["level_base"]
    level = int(math.sqrt(xp / base)) + 1
    i = _active_plan(history, today) or 0
    active = history[i]["plan"] if history else None   # no history, or a stopped plan: no plan block
    nxt = sessions[i][done[i]] if active and done[i] < len(sessions[i]) else None
    total = sum(goal[k] for k in GOAL_KEYS)        # `goal` is this week's now
    progress = sum(min(wkst[k], goal[k]) for k in GOAL_KEYS) / total if total else 1
    return {
        "xp": xp, "level": level, "level_floor": base * (level - 1) ** 2, "next_level_xp": base * level ** 2,
        "week": dict(wkst, week=_iso_week(this_monday), paused=paused_wk,
                     days_left=7 - today.weekday(), progress=int(100 * progress),
                     goal=goal, last_week=last_week),
        "streak": streak, "best_streak": c["best_streak"],
        "plan": {
            "state": f"W{nxt['week']}D{nxt['day']}" if nxt else "Graduated",
            "plan": history[i]["plan"], "completed": done[i], "warmup_s": nxt["warmup_s"] if nxt else None,
            "week": nxt["week"] if nxt else None, "day": nxt["day"] if nxt else None,
            "target": nxt["target"] if nxt else None,
            "intervals": [list(iv) for iv in nxt["intervals"]] if nxt else [],
            "due_today": (nxt is not None and wkst["runs"] < goal["runs"] and today not in paused
                          and (last_run is None or (today - last_run).days >= 2)),
        } if active else None,
        "weekly": weekly,
        "counters": c,
        "unlocked_at": unlocked_at,
        "plan_done": plan_done,
        "workout_xp": workout_xp,
        "active_rows": active_rows,
        "not_counted": not_counted,
    }


def _title(badge, t):
    return badge.get("titles", {}).get(f"{t:g}", badge["title"]).format(t=f"{t:g}")


def _badges(cfg, counters, unlocked_at):
    """Badge attributes (spec section 7); `next` = lowest locked threshold per visible family, best ratio first."""
    info, nxt = {}, []
    for b in cfg["badges"]:
        for t in b["thresholds"]:
            info[_badge_id(b, t)] = {"id": _badge_id(b, t), "title": _title(b, t), "icon": b["icon"],
                                     "category": b["category"]}
        locked = [t for t in b["thresholds"] if _badge_id(b, t) not in unlocked_at]
        if locked and not b.get("hidden"):
            nxt.append(dict(info[_badge_id(b, locked[0])], current=round(counters[b["counter"]], 2), target=locked[0]))
    nxt.sort(key=lambda n: n["current"] / n["target"], reverse=True)
    # unlocked_at is filled in workout order, so reversed = newest first
    unlocked = [dict(info[i], unlocked_at=d) for i, d in reversed(unlocked_at.items())]
    return {"count": len(unlocked), "recent": unlocked[:3], "next": nxt[:3], "unlocked": unlocked}


def _feed(workouts, plan_done, workout_xp, not_counted, cfg, since, limit):
    """Workouts on or after local date `since` (at most `limit`), excluded ones included, newest first.
    `not_counted`: {key: "short" | "easy" | "type" | "no_gps" | None (before rules.start)}, why a row fills no ring (counts False)."""
    tz = ZoneInfo(cfg["rules"]["timezone"])
    ws = [w for w in workouts if local_date(w["start"], tz) >= since][::-1][:limit]
    return [{"key": w["key"], "aliases": w.get("aliases", []), "kind": w["kind"], "name": w["name"], "source": w["source"], "indoor": w["indoor"],
             "start": w["start"].astimezone(tz).isoformat(), "minutes": round(w["duration_s"] / 60),
             "km": None if w["distance_m"] is None else round(w["distance_m"] / 1000, 2), "avg_hr": w["avg_hr"],
             "xp": round(workout_xp.get(w["key"], 0)), "plan": plan_done.get(w["key"]), "joint": bool(w.get("joint_s")), "excluded": w["excluded"],
             "counts": w["key"] not in not_counted, "reason": not_counted.get(w["key"]),
             "url": w["url"]} | ({"steps": w["steps"]} if "steps" in w else {}) for w in ws]


def _group(cfg, results, cleaned, now, settings=None):
    """Couple streak and this week's couple goal in each week's mode (goals spec section 4),
    plus this month's joint workouts / km together; None without [group]."""
    g = cfg["group"]
    if not g:
        return None
    tz = ZoneInfo(cfg["rules"]["timezone"])
    today = local_date(now, tz)
    this_monday = today - timedelta(days=today.weekday())
    weeks = [results[p]["weekly"] for p in g["members"]]
    joint_by_week = defaultdict(int)               # joint workouts per Monday (walks count)
    for w in cleaned[g["members"][0]]:
        if w.get("joint_s"):
            d = local_date(w["start"], tz)
            joint_by_week[d - timedelta(days=d.weekday())] += 1
    streak = best = 0
    for key in sorted(weeks[0]):
        monday = date.fromisoformat(key)
        st = [w[key] for w in weeks]
        couple = week_couple(settings, monday)
        done = {"together": joint_by_week[monday], "team": sum(x["runs"] + x["workouts"] + x["active_days"] for x in st)}
        met = (done["team"] >= couple["team"] if couple["mode"] == "team"
               else all(x["goal_met"] for x in st) and (couple["mode"] == "own" or done["together"] >= couple["together"]))
        if met:
            streak += 1
            best = max(best, streak)
        elif monday < this_monday and not (any(x["paused"] for x in st) and (
                couple["mode"] == "team" or all(x["goal_met"] or x["paused"] for x in st))):
            streak = 0
    week = {"mode": couple["mode"], "met": met, "reward": couple["reward"],
            "together": {"done": done["together"], "target": couple["together"]},
            "team": {"done": done["team"], "target": couple["team"]},
            "members_met": {p: x["goal_met"] for p, x in zip(g["members"], st)}}
    joint = [w for w in cleaned[g["members"][0]]
             if w.get("joint_s") and local_date(w["start"], tz).replace(day=1) == today.replace(day=1)]
    km = sum((w["distance_m"] / 1000 + w["partner_km"]) / 2 for w in joint
             if w["kind"] == "run" and w["distance_m"] is not None and w["partner_km"] is not None)
    return {"id": g["name"], "name": g["name"].capitalize(), "members": list(g["members"]),
            "streak": streak, "best_streak": best, "week": week, "month_joint": len(joint), "km_together": round(km, 2)}


def _records(workouts, tz, catalog):
    """(lifts, fastest_1k) over the non-excluded workouts, which are sorted by start: a record moves only
    when strictly beaten, so a tie keeps the earliest workout. Each lift also carries its muscle group and the
    number of gym workouts it was done in."""
    best, run, sessions = {}, None, {}
    for w in workouts:
        if w["excluded"]:
            continue
        day = local_date(w["start"], tz).isoformat()
        if w["kind"] == "gym":
            for ex, s in (w.get("lifts") or {}).items():
                sessions[ex] = sessions.get(ex, 0) + 1
                if ex not in best or (s["w"], s["r"]) > (best[ex]["w"], best[ex]["r"]):
                    info = (catalog or {}).get(ex) or {}
                    best[ex] = {"id": ex, "name": info.get("name") or f"Exercise {ex}", "w": s["w"], "r": s["r"],
                                "unit": w.get("unit") or "kg", "date": day, "key": w["key"],
                                "group": muscle_group(info.get("bp") or "")}
        elif w["kind"] == "run" and w.get("best_1k_s") is not None and (run is None or w["best_1k_s"] < run["seconds"]):
            run = {"seconds": w["best_1k_s"], "date": day, "key": w["key"], "url": w["url"]}
    lifts = sorted(({**b, "sessions": sessions[b["id"]]} for b in best.values()), key=lambda x: x["name"])
    return sorted(lifts, key=lambda x: x["date"], reverse=True), run  # stable: date desc, then name


def score(by_person, pauses, cfg, now, steps=None, settings=None, catalog=None, uncounted=None):
    """Full result for every configured person plus the optional group. Never mutates the caller's workouts.

    `steps`: {person: {"YYYY-MM-DD": steps}}; `settings`: the settings payload (goals spec section 3); None = none;
    `catalog`: {exercise id: {"name", "bp"}} for the lift records;
    `uncounted`: {person: [workout that counts nothing, its `reason` "type" unless given]}, shown in `feed` only."""
    cleaned = {p: clean([dict(w) for w in by_person.get(p, [])], cfg) for p in cfg["people"]}
    mark_joint(cleaned, cfg)
    tz = ZoneInfo(cfg["rules"]["timezone"])
    profiles = (settings or {}).get("profiles", {})
    max_hrs = {p: max_hr(cleaned[p], profiles.get(p, {}).get("birth_year"), local_date(now, tz), cfg) for p in cfg["people"]}
    raw = {p: score_person(cleaned[p], pause_days(pauses, p, cfg), cfg, p, now, (steps or {}).get(p), settings,
                           max_hrs[p] and max_hrs[p]["bpm"])
           for p in cfg["people"]}
    start = cfg["rules"]["start"]
    window = max(start, local_date(now, tz) - timedelta(days=89))  # today + 89 days back = 90
    people = {}
    for p, r in raw.items():
        c = r["counters"]
        lifts, fastest_1k = _records(cleaned[p], tz, catalog)
        other = (uncounted or {}).get(p, [])  # added after scoring: they touch nothing but the feed (not `recent`)
        early = clean(by_person.get(p, []), cfg, early=True)  # before rules.start: likewise, and no reason to show
        reasons = r["not_counted"] | {w["key"]: None for w in early} | {w["key"]: w.get("reason", "type") for w in other}
        rows = _feed(sorted(cleaned[p] + early + r["active_rows"] + other, key=lambda w: w["start"]),
                     r["plan_done"], r["workout_xp"], reasons, cfg, date.min, None)
        people[p] = {k: v for k, v in r.items() if k not in ("weekly", "counters", "unlocked_at", "plan_done", "workout_xp", "active_rows", "not_counted")} | {
            "name": cfg["people"][p]["name"], "max_hr": max_hrs[p],
            "badges": _badges(cfg, c, r["unlocked_at"]),
            "pbs": {"longest_session_km": round(c["longest_session_km"], 2), "prs": c["prs"],
                    "gym_tonnes": round(c["tonnes"], 2),
                    "lifts": lifts, "fastest_1k": fastest_1k},
            "recent": _feed(cleaned[p], r["plan_done"], r["workout_xp"], r["not_counted"], cfg, start, 20),
            "feed": [i for i in rows if i["start"][:10] >= window.isoformat()],  # start's date is the local one
            "older": [i for i in rows if i["start"][:10] < window.isoformat()],  # in memory only: core.shape drops it, GET feed pages it
        }
    return {"people": people, "group": _group(cfg, raw, cleaned, now, settings)}
