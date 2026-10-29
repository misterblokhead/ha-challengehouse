import unittest
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.fitbridge.engine.scoring import clean, local_date, mark_joint, pause_days, score, score_person, week_couple, week_goal
from custom_components.fitbridge.engine.scoring_config import COUNTERS, load_config
from .test_config import DEFAULT, ONE_PERSON

TZ = ZoneInfo("Europe/Amsterdam")
CFG = load_config(DEFAULT)
SOLO = load_config(ONE_PERSON)
_n = 0


def wk(person, kind, day, hh, mm, minutes, km=None, source="opentracks", **kw):
    """A workout on 2026-10-26 + `day`, local time."""
    global _n
    _n += 1
    start = datetime(2026, 10, 26, hh, mm, tzinfo=TZ) + timedelta(days=day)
    w = {"person": person, "key": f"k{_n}", "source": source, "kind": kind, "indoor": False,
         "start": start, "end": start + timedelta(minutes=minutes), "duration_s": minutes * 60.0,
         "distance_m": None if km is None else km * 1000.0, "avg_hr": None, "vol_kg": 0.0,
         "prs": [], "name": "", "url": None, "excluded": False}
    w.update(kw)
    return w


def NOW(day):
    """2026-10-26 + `day` days at 12:00 local."""
    return datetime(2026, 10, 26, 12, 0, tzinfo=TZ) + timedelta(days=day)


def week_of(day0, runs=2, gym=2):  # a goal week starting `day0` days after 26 Oct
    return ([wk("person1", "run", day0 + 2 * i, 18, 0, 26, km=3) for i in range(runs)] +
            [wk("person1", "gym", day0 + 2 * i + 1, 19, 0, 60) for i in range(gym)])


def sp(ws, now_day, paused=frozenset(), **kw):
    return score_person(clean(ws, CFG), set(paused), CFG, "person1", NOW(now_day), **kw)


def st(day, n):
    """Steps on 2026-10-26 + `day`: a (date, steps) pair for dict()."""
    return ((date(2026, 10, 26) + timedelta(days=day)).isoformat(), n)


def goals(frm, runs=2, workouts=2, active_days=0, steps=10000):
    """A settings payload with one history entry for person1."""
    return {"history": [{"from": frm, "people": {"person1": {"runs": runs, "workouts": workouts, "active_days": active_days,
                                                          "steps": steps}},
                         "couple": {"mode": "together", "together": 2, "team": 8, "reward": "Pizza"}}]}


class ScoringTests(unittest.TestCase):
    def test_pause_days_all_day_end_exclusive_and_timed(self):
        ev = [{"summary": "Both", "start": "2026-11-02", "end": "2026-11-06"},
              {"summary": "person 1", "start": "2026-11-10T20:00:00+01:00", "end": "2026-11-11T09:00:00+01:00"},
              {"summary": "Person 2", "start": "2026-11-20", "end": "2026-11-21"}]
        self.assertEqual(len(pause_days(ev, "person1", CFG)), 4 + 2)
        self.assertEqual(len(pause_days(ev, "person2", CFG)), 4 + 1)
        self.assertEqual(len(pause_days(ev, "person1", SOLO)), 2)   # no group: "Both" doesn't apply

    def test_timed_pause_ending_at_midnight_excludes_end_date(self):
        ev = [{"summary": "Person 1", "start": "2026-11-10T20:00:00+01:00", "end": "2026-11-11T00:00:00+01:00"}]
        self.assertEqual(len(pause_days(ev, "person1", CFG)), 1)

    def test_dedup_prefers_automatic_and_merge_joins_stop_start(self):
        a = wk("person1", "run", 0, 18, 0, 20, km=3)
        m = wk("person1", "run", 0, 18, 5, 20, source="manual")
        b = wk("person1", "run", 0, 18, 45, 10, km=1)          # 25 min after a ends -> merged
        out = clean([a, m, b], CFG)
        self.assertEqual(len(out), 1)
        self.assertEqual(out[0]["source"], "opentracks")
        self.assertEqual(out[0]["duration_s"], 55 * 60)
        self.assertAlmostEqual(out[0]["distance_m"], 4000)

    def test_dedup_within_automatic_keeps_longer_and_gap_of_30_does_not_merge(self):
        short, long_ = wk("person1", "run", 0, 18, 0, 20), wk("person1", "run", 0, 18, 5, 30, source="health_exporter")
        later = wk("person1", "run", 0, 19, 5, 10)             # exactly 30 min after long_ ends -> separate
        gym = wk("person1", "gym", 0, 18, 10, 30)               # other kind: untouched
        out = clean([short, long_, later, gym], CFG)
        self.assertEqual([w["key"] for w in out], [long_["key"], gym["key"], later["key"]])

    def test_dedup_and_merge_keep_absorbed_keys_as_aliases(self):
        short, long_ = wk("person1", "run", 0, 18, 0, 20), wk("person1", "run", 0, 18, 5, 30, source="health_exporter")
        after = wk("person1", "run", 0, 18, 50, 40)             # 15 min after long_ ends, and longer: the merged copy keeps its key
        alone = wk("person1", "run", 2, 18, 0, 30)
        out = clean([short, long_, after, alone], CFG)
        self.assertEqual([(w["key"], sorted(w.get("aliases", []))) for w in out],
                         [(after["key"], sorted([short["key"], long_["key"]])), (alone["key"], [])])
        feed = score({"person1": [short, long_, after, alone], "person2": []}, [], CFG, NOW(3))["people"]["person1"]["feed"]
        self.assertEqual([sorted(i["aliases"]) for i in feed], [[], sorted([short["key"], long_["key"]])])

    def test_dedup_keeps_the_gym_copy_of_a_session_also_logged_as_home(self):
        gym = wk("person1", "gym", 0, 18, 0, 40, source="opengym", vol_kg=1000.0)
        home = wk("person1", "home", 0, 17, 55, 60, source="health_exporter")   # longer, but the gym copy has the volume
        self.assertEqual([(w["key"], w["aliases"]) for w in clean([home, gym], CFG)], [(gym["key"], [home["key"]])])
        r = sp([home, gym], 1)
        self.assertEqual((r["counters"]["gym"], r["counters"]["home"], r["xp"]), (1, 0, 40))

    def test_stop_start_merge_and_joint_need_the_same_effort_flag(self):
        yoga = wk("person1", "home", 0, 18, 0, 30, min_min=15, effort=False)
        ride = wk("person1", "home", 0, 18, 40, 40, min_min=20, effort=True, avg_hr=100)  # 10 min after the yoga, easy
        fit = wk("person1", "run", 0, 7, 0, 30, avg_hr=150, max_hr=180)                   # measured max HR 180
        self.assertEqual([w["key"] for w in clean([yoga, ride], CFG)], [yoga["key"], ride["key"]])
        feed = score({"person1": [fit, yoga, ride], "person2": []}, [], CFG, NOW(1))["people"]["person1"]
        rows = {i["key"]: i for i in feed["feed"]}
        self.assertEqual((rows[yoga["key"]]["counts"], rows[ride["key"]]["reason"], feed["week"]["workouts"]), (True, "easy", 1))
        r1, r2 = (wk("person1", "home", 0, 18, 0, 30, effort=True), wk("person1", "home", 0, 18, 40, 30, effort=True))
        self.assertEqual(len(clean([r1, r2], CFG)), 1)                                 # a ride next to a ride still merges
        a, b = wk("person1", "home", 1, 19, 0, 40, effort=False), wk("person2", "home", 1, 19, 2, 40, effort=True)
        mark_joint({"person1": [a], "person2": [b]}, CFG)
        self.assertNotIn("joint_s", a)

    def test_excluded_passes_through_untouched(self):
        a, x = wk("person1", "run", 0, 18, 0, 20), wk("person1", "run", 0, 18, 5, 20, excluded=True)
        self.assertEqual(clean([a, x], CFG), [a, x])

    def test_before_start_dropped_and_midnight_belongs_to_start_day(self):
        old = wk("person1", "run", -1, 18, 0, 30)
        late = wk("person1", "run", 6, 23, 40, 40)              # Sunday 23:40 -> 00:20 Monday
        out = clean([old, late], CFG)
        self.assertEqual([local_date(w["start"], TZ).isoformat() for w in out], ["2026-11-01"])

    def test_joint_uses_shorter_session_and_start_window(self):
        a, b = wk("person1", "gym", 1, 19, 0, 60), wk("person2", "gym", 1, 19, 5, 40)
        c, d = wk("person1", "run", 2, 18, 0, 30), wk("person2", "run", 2, 18, 11, 30)
        mark_joint({"person1": [a, c], "person2": [b, d]}, CFG)
        self.assertEqual(a["joint_s"], 40 * 60)
        self.assertEqual(b["joint_s"], 40 * 60)
        self.assertNotIn("joint_s", c)
        e, f = wk("person1", "gym", 1, 19, 0, 60), wk("person2", "gym", 1, 19, 5, 40)
        mark_joint({"person1": [e], "person2": [f]}, dict(CFG, group=None))
        self.assertNotIn("joint_s", e)

    def test_joint_partner_km(self):
        a, b = wk("person1", "run", 1, 18, 0, 30, km=4), wk("person2", "run", 1, 18, 2, 30, km=3)
        mark_joint({"person1": [a], "person2": [b]}, CFG)
        self.assertEqual((a["partner_km"], b["partner_km"]), (3.0, 4.0))

    def test_short_run_repeats_session_and_one_plan_session_per_day(self):
        r = sp([wk("person1", "run", 0, 7, 0, 10), wk("person1", "run", 0, 18, 0, 26), wk("person1", "run", 0, 19, 0, 26)], 1)
        self.assertEqual(r["plan"]["completed"], 1)          # 10-min run too short; 2nd same-day run ignored
        self.assertEqual(r["plan"]["state"], "W1D2")

    def test_walk_never_advances_plan_or_goal_but_earns_xp(self):
        r = sp([wk("person1", "walk", 0, 18, 0, 40)], 1)
        self.assertEqual((r["plan"]["completed"], r["week"]["runs"], r["xp"]), (0, 0, 40))

    def test_home_counts_toward_workouts_from_15_min(self):
        r = score({"person1": [wk("person1", "home", 0, 19, 0, 15), wk("person1", "home", 1, 19, 0, 14)]}, [], CFG, NOW(2))["people"]["person1"]
        self.assertEqual(r["week"]["workouts"], 1)
        self.assertEqual(r["badges"]["recent"][0]["id"], "home_1")

    def test_one_workout_per_day_gym_and_home(self):
        r = sp([wk("person1", "gym", 0, 8, 0, 20), wk("person1", "home", 0, 19, 0, 15)], 1)
        self.assertEqual((r["week"]["workouts"], r["counters"]["gym"], r["counters"]["home"]), (1, 1, 1))

    def test_active_day_threshold_xp_and_feed_row(self):
        r = score({"person1": []}, [], CFG, NOW(1), steps={"person1": dict([st(0, 10000), st(1, 9999)])})["people"]["person1"]
        self.assertEqual(r["week"]["active_days"], 1)
        self.assertEqual(r["xp"], 15)
        row = r["feed"][0]
        self.assertEqual((row["kind"], row["key"], row["steps"], row["xp"]), ("active_day", "steps:person1:2026-10-26", 10000, 15))
        self.assertEqual((row["name"], row["source"], row["minutes"], row["km"], row["excluded"]), ("Active day", "steps", 0, None, False))
        self.assertEqual(row["start"], "2026-10-26T00:00:00+01:00")
        self.assertFalse(any(w["kind"] == "active_day" for w in r["recent"]))
        self.assertIn("active_days_1", [u["id"] for u in r["badges"]["unlocked"]])

    def test_feed_merges_active_days_newest_first(self):
        w = wk("person1", "run", 1, 18, 0, 26)
        r = score({"person1": [w]}, [], CFG, NOW(2), steps={"person1": dict([st(0, 12000), st(1, 12000)])})["people"]["person1"]
        self.assertEqual([i["key"] for i in r["feed"]], [w["key"], "steps:person1:2026-10-27", "steps:person1:2026-10-26"])
        self.assertEqual([i["key"] for i in r["recent"]], [w["key"]])

    def test_active_day_xp_outside_day_cap(self):
        r = sp([wk("person1", "gym", 0, 8, 0, 200), wk("person1", "gym", 0, 19, 0, 60)], 1, steps=dict([st(0, 15000)]))
        self.assertEqual(r["xp"], 240 + 15)

    def test_active_day_threshold_comes_from_the_week_goal(self):
        r = sp([], 1, steps=dict([st(0, 6000)]), settings=goals("2026-10-26", steps=6000))
        self.assertEqual(r["week"]["active_days"], 1)

    def test_bonus_once_on_any_goal(self):
        r = sp([], 3, steps=dict(st(d, 10000) for d in range(3)), settings=goals("2026-10-26", active_days=1))
        self.assertEqual((r["week"]["active_days"], r["week"]["bonus"]), (3, 1))
        self.assertEqual(r["xp"], 3 * 15 + 30)

    def test_zero_goals_always_met(self):
        s = {"history": [{"from": "2026-10-26", "people": {"person1": {"runs": 0, "workouts": 0, "active_days": 0, "steps": 10000}},
                          "couple": {"mode": "own", "together": 1, "team": 8, "reward": ""}}]}
        week = score({"person1": []}, [], CFG, NOW(0), settings=s)["people"]["person1"]["week"]
        self.assertTrue(week["goal_met"])
        self.assertEqual((week["progress"], week["bonus"]), (100, 0))

    def test_settings_apply_from_their_week_only(self):
        ws = [wk("person1", "run", 0, 18, 0, 26), wk("person1", "run", 7, 18, 0, 26)]
        s = goals("2026-11-02", runs=1, workouts=0)
        r = sp(ws, 8, settings=s)
        self.assertEqual((r["weekly"]["2026-10-26"]["goal_met"], r["weekly"]["2026-11-02"]["goal_met"]), (False, True))
        self.assertEqual(r["week"]["goal"], {"runs": 1, "workouts": 0, "active_days": 0, "steps": 10000})
        self.assertEqual(week_goal(CFG, s, "person2", date(2026, 11, 2)), CFG["people"]["person2"]["goal"])

    def test_week_goal_before_first_entry_is_toml(self):
        s = goals("2026-11-02", runs=1)
        self.assertEqual(week_goal(CFG, s, "person1", date(2026, 10, 26)), CFG["people"]["person1"]["goal"])
        self.assertEqual(week_goal(CFG, None, "person1", date(2026, 11, 2)), CFG["people"]["person1"]["goal"])
        default = {"mode": "own", "together": 1, "team": 8, "reward": ""}
        self.assertEqual(week_couple(s, date(2026, 10, 26)), default)
        self.assertEqual(week_couple(None, date(2026, 11, 2)), default)
        self.assertEqual(week_couple(s, date(2026, 11, 9))["mode"], "together")

    def test_one_counting_run_per_day_and_minimums(self):
        r = sp([wk("person1", "run", 0, 7, 0, 25), wk("person1", "run", 0, 18, 0, 25), wk("person1", "gym", 1, 19, 0, 15)], 2)
        self.assertEqual((r["week"]["runs"], r["week"]["workouts"]), (1, 0))

    def test_symmetric_bonus_once_per_week(self):
        r = sp(week_of(0, runs=3, gym=3), 6)
        self.assertEqual(r["week"]["bonus"], 1)
        self.assertEqual(r["xp"], 3 * 26 + 3 * 60 + 3 * 20 + 30)

    def test_caps_session_and_day(self):
        r = sp([wk("person1", "gym", 0, 8, 0, 200), wk("person1", "run", 0, 18, 0, 90)], 1)
        self.assertEqual(r["xp"], 240 + 20)                  # 180 + 90 clipped to 240/day, + plan session

    def test_pr_bonus_once_per_session_and_levels(self):
        r = sp([wk("person1", "gym", 0, 19, 0, 40, prs=["a", "b", "c"])], 1)
        self.assertEqual((r["xp"], r["level"], r["level_floor"], r["next_level_xp"]), (65, 2, 50, 200))

    def test_streak_missed_paused_and_current_week(self):
        ws = week_of(0) + week_of(7) + week_of(21)           # week 3 (day 14..20) missed
        self.assertEqual(sp(ws, 27)["streak"], 1)
        self.assertEqual(sp(ws, 27)["best_streak"], 2)
        paused = {date(2026, 11, 9) + timedelta(days=i) for i in range(4)}
        self.assertEqual(sp(ws, 27, paused)["streak"], 3)
        self.assertEqual(sp(week_of(0), 8)["streak"], 1)     # new week not met yet: no reset

    def test_due_today_needs_rest_day(self):
        self.assertFalse(sp([wk("person1", "run", 0, 18, 0, 26)], 1)["plan"]["due_today"])
        self.assertTrue(sp([wk("person1", "run", 0, 18, 0, 26)], 2)["plan"]["due_today"])

    def test_distance_and_none_targets_and_plan_switch(self):
        cfg = load_config(DEFAULT + '\n[plans.free]\nname="Free"\n[[plans.free.weeks]]\nrepeat=1\n'
                          'sessions=[{warmup_s=0, target={type="none"}}]\n[[plans.free.weeks]]\nrepeat=1\n'
                          'sessions=[{warmup_s=0, target={type="distance", km=5, fraction=0.9}}]\n')
        cfg["people"]["person1"]["plan_history"].append({"plan": "free", "from": date(2026, 10, 28)})
        ws = clean([wk("person1", "run", 2, 18, 0, 5, km=1), wk("person1", "run", 4, 18, 0, 30, km=4.4)], cfg)
        r = score_person(ws, set(), cfg, "person1", NOW(5))
        self.assertEqual((r["plan"]["plan"], r["plan"]["completed"]), ("free", 1))   # 4.4 < 0.9*5

    def test_counters_and_week_fields(self):
        r = sp(week_of(0, runs=3, gym=3) + [wk("person1", "walk", 6, 7, 0, 30)], 6)
        c = r["counters"]
        self.assertEqual(set(c), COUNTERS)
        self.assertEqual((c["runs"], c["run_km"], c["gym"], c["walks"], c["workouts"], c["early"]), (3, 9, 3, 1, 7, 1))
        self.assertEqual((c["goal_weeks"], c["bonus_weeks"], c["perfect_weeks"], c["best_streak"]), (1, 1, 1, 1))
        self.assertEqual((r["week"]["progress"], r["week"]["days_left"], r["week"]["goal_met"]), (100, 1, True))
        self.assertEqual(r["weekly"], {"2026-10-26": {"goal_met": True, "paused": False, "runs": 3, "workouts": 3,
                                                      "active_days": 0}})

    def test_runs_and_gym_counters_need_minimum_duration(self):
        r = sp([wk("person1", "run", 0, 7, 0, 5), wk("person1", "run", 0, 18, 0, 15), wk("person1", "gym", 0, 19, 0, 10)], 1)
        c = r["counters"]
        self.assertEqual((c["runs"], c["gym"], c["workouts"]), (1, 0, 3))

    def test_dst_night_workout_uses_local_start_date(self):   # Review Focus 1
        w = wk("person1", "run", 0, 18, 0, 26)
        w["start"] = datetime(2027, 3, 28, 0, 30, tzinfo=TZ); w["end"] = w["start"] + timedelta(minutes=26)
        r = score_person(clean([w], CFG), set(), CFG, "person1", datetime(2027, 3, 28, 12, tzinfo=TZ))
        self.assertEqual(r["week"]["week"], "2027-W12")

    def test_badges_dates_next_and_hidden(self):
        res = score({"person1": week_of(0) + [wk("person1", "gym", 5, 19, 0, 60, prs=["x"])], "person2": []}, [], CFG, NOW(6))
        b = res["people"]["person1"]["badges"]
        ids = {u["id"]: u["unlocked_at"] for u in b["unlocked"]}
        self.assertEqual(ids["runs_1"], "2026-10-26")
        self.assertEqual(ids["goal_weeks_1"], "2026-10-29")   # 2nd gym on day 3 completes the goal
        self.assertEqual(ids["prs_1"], "2026-10-31")
        self.assertNotIn("centurion_100", [n["id"] for n in b["next"]])
        self.assertEqual(len(b["next"]), 3)
        ratios = [n["current"] / n["target"] for n in b["next"]]
        self.assertEqual(ratios, sorted(ratios, reverse=True))

    def test_excluded_workout_shows_in_feed_but_does_not_count(self):
        w = wk("person1", "run", 0, 18, 0, 26, km=3, excluded=True)
        p = score({"person1": [w], "person2": []}, [], CFG, NOW(1))["people"]["person1"]
        self.assertEqual((p["xp"], p["badges"]["count"]), (0, 0))
        self.assertTrue(p["recent"][0]["excluded"])

    def test_workout_xp_sums_to_total(self):
        ws = [wk("person1", "run", d, 18, 0, 26, km=3) for d in (0, 2, 4)]    # 3rd run beats the goal of 2: bonus
        p = score({"person1": ws, "person2": []}, [], CFG, NOW(5))["people"]["person1"]
        xps = [i["xp"] for i in p["feed"]]
        self.assertEqual(xps, [26 + 20 + 30, 26 + 20, 26 + 20])             # newest first; plan session on each
        self.assertLessEqual(abs(sum(xps) - p["xp"]), 1)
        self.assertEqual([i["xp"] for i in p["recent"]], xps)
        self.assertNotIn("workout_xp", p)

    def test_excluded_workout_has_zero_xp_and_stays_in_feed(self):
        w = wk("person1", "run", 0, 18, 0, 26, km=3, excluded=True)
        p = score({"person1": [w], "person2": []}, [], CFG, NOW(1))["people"]["person1"]
        self.assertEqual([(i["key"], i["xp"]) for i in p["feed"]], [(w["key"], 0)])

    def test_feed_covers_90_days_and_recent_stays_20(self):
        days = [int(i * 1.4) for i in range(25)]                           # 25 workouts over days 0..33
        ws = [wk("person1", "gym", d, 19, 0, 30) for d in days]
        p = score({"person1": ws, "person2": []}, [], CFG, NOW(120))["people"]["person1"]
        self.assertEqual(len(p["feed"]), len([d for d in days if d >= 31]))  # today is day 120: window = days 31..120 (90 days)
        self.assertEqual(len(p["recent"]), 20)
        self.assertEqual(p["feed"][0]["key"], ws[-1]["key"])

    def test_the_90_day_window_is_today_and_89_days_back(self):
        edge, before = wk("person1", "gym", 31, 19, 0, 30), wk("person1", "gym", 30, 19, 0, 30)
        p = score({"person1": [before, edge], "person2": []}, [], CFG, NOW(120))["people"]["person1"]
        self.assertEqual(([i["key"] for i in p["feed"]], [i["key"] for i in p["older"]]), ([edge["key"]], [before["key"]]))

    def test_older_holds_what_the_feed_dropped_newest_first_with_the_same_kinds_of_rows(self):
        ws = [wk("person1", "gym", d, 19, 0, 30) for d in (0, 5, 100)]
        golf = wk("person1", "gym", 10, 9, 0, 120, name="Golf")
        golf["kind"] = None
        steps = {"person1": dict([st(3, 12000), st(100, 12000)])}
        p = score({"person1": ws, "person2": []}, [], CFG, NOW(120), steps=steps, uncounted={"person1": [golf]})["people"]["person1"]
        self.assertEqual([i["key"] for i in p["feed"]], [ws[2]["key"], "steps:person1:2027-02-03"])
        self.assertEqual([i["key"] for i in p["older"]], [golf["key"], ws[1]["key"], "steps:person1:2026-10-29", ws[0]["key"]])
        self.assertEqual([(i["counts"], i["reason"]) for i in p["older"]][0], (False, "type"))

    def test_rows_before_the_start_are_older_rows_that_score_nothing(self):
        self.assertEqual(CFG["rules"]["start"], date(2026, 10, 26))  # the shipped start
        ws = [wk("person1", "gym", 0, 19, 0, 30), wk("person1", "run", 1, 18, 0, 30, km=4)]
        run = wk("person1", "run", -10, 18, 0, 30, km=5)
        copy = wk("person1", "run", -10, 18, 2, 25, km=5, source="health_exporter")       # one session, two sources
        gone = wk("person1", "gym", -12, 19, 0, 40, excluded=True)
        golf = wk("person1", "gym", -20, 9, 0, 120, name="Golf")
        golf["kind"] = None
        base = score({"person1": ws, "person2": []}, [], CFG, NOW(2))["people"]["person1"]
        p = score({"person1": ws + [run, copy, gone], "person2": []}, [], CFG, NOW(2), uncounted={"person1": [golf]})["people"]["person1"]
        self.assertEqual([(i["key"], i["aliases"], i["xp"], i["counts"], i["reason"], i["excluded"]) for i in p["older"]],
                         [(run["key"], [copy["key"]], 0, False, None, False), (gone["key"], [], 0, True, None, True),
                          (golf["key"], [], 0, False, "type", False)])
        self.assertEqual(p["feed"], base["feed"])
        for k in ("xp", "week", "badges", "pbs", "streak", "best_streak", "level", "plan", "recent", "max_hr"):
            self.assertEqual(p[k], base[k], k)

    def test_no_older_when_nothing_is_past_the_window(self):
        p = score({"person1": [wk("person1", "gym", 0, 19, 0, 30)], "person2": []}, [], CFG, NOW(1))["people"]["person1"]
        self.assertEqual(p["older"], [])

    def test_week_has_goal_and_last_week(self):
        now = datetime(2026, 11, 2, 8, 0, tzinfo=TZ)                         # Monday morning
        p = score({"person1": week_of(0), "person2": []}, [], CFG, now)["people"]["person1"]
        self.assertEqual(p["week"]["goal"], {"runs": 2, "workouts": 2, "active_days": 0, "steps": 10000})
        self.assertEqual(p["week"]["runs"], 0)
        self.assertEqual(p["week"]["last_week"],
                         {"week": "2026-W44", "runs": 2, "workouts": 2, "active_days": 0, "goal_met": True,
                          "paused": False})
        self.assertIsNone(sp([], 1)["week"]["last_week"])                    # before the first full week

    def test_plan_has_warmup(self):
        self.assertEqual(sp([], 1)["plan"]["warmup_s"], 300)

    def test_couple_streak_neutral_when_the_one_who_missed_was_paused(self):
        person1 = week_of(0) + week_of(7)
        person2 = [dict(w, person="person2") for w in week_of(0)]
        pauses = [{"summary": "Person 2", "start": "2026-11-02", "end": "2026-11-07"}]
        c = score({"person1": person1, "person2": person2}, pauses, CFG, NOW(15))["group"]
        self.assertEqual((c["streak"], c["best_streak"]), (1, 1))

    def test_couple_week_own_together_and_team_modes(self):
        def couple(mode, **kw):
            return {"history": [{"from": "2026-10-26", "people": {}, "couple": {
                "mode": mode, "together": 1, "team": 8, "reward": "Pizza", **kw}}]}

        def week(mode, person1, person2, steps=None, **kw):
            return score({"person1": person1, "person2": person2}, [], CFG, NOW(6), steps, couple(mode, **kw))["group"]

        person1 = week_of(0)
        apart = [dict(w, person="person2", start=w["start"] + timedelta(hours=2), end=w["end"] + timedelta(hours=2))
                 for w in person1]                                       # same goals, nothing shared
        g = week("own", person1, apart)
        self.assertEqual((g["week"]["mode"], g["week"]["met"], g["week"]["reward"]), ("own", True, "Pizza"))
        self.assertEqual(g["week"]["members_met"], {"person1": True, "person2": True})
        self.assertEqual(g["week"]["together"], {"done": 0, "target": 1})
        self.assertEqual(g["week"]["team"], {"done": 4 + 4, "target": 8})
        self.assertFalse(week("own", person1, apart[:3])["week"]["met"])
        self.assertFalse(week("together", person1, apart)["week"]["met"])            # both met, nothing together
        joint_run = [dict(apart[0], start=person1[0]["start"], end=person1[0]["end"])] + apart[1:]
        g = week("together", person1, joint_run)
        self.assertEqual((g["week"]["met"], g["week"]["together"]["done"]), (True, 1))
        walk_a, walk_b = wk("person1", "walk", 4, 10, 0, 30), wk("person2", "walk", 4, 10, 3, 30)
        joint_walk = week("together", person1 + [walk_a], apart + [walk_b])          # a joint walk counts
        self.assertEqual((joint_walk["week"]["met"], joint_walk["week"]["together"]["done"]), (True, 1))
        self.assertFalse(week("together", person1, joint_run, together=2)["week"]["met"])
        # team: 2 person1 runs + 3 person2 active days = 5 points, regardless of the own goals
        runs = [w for w in person1 if w["kind"] == "run"]
        days = {"person2": dict(st(i, 10000) for i in range(3))}
        for target, met in ((5, True), (6, False)):
            g = week("team", runs, [], days, team=target)["week"]
            self.assertEqual((g["met"], g["team"]), (met, {"done": 5, "target": target}))
            self.assertEqual(g["members_met"], {"person1": False, "person2": False})

    def test_couple_streak_follows_each_weeks_mode(self):
        settings = {"history": [
            {"from": "2026-10-26", "people": {}, "couple": {"mode": "own", "together": 1, "team": 8, "reward": ""}},
            {"from": "2026-11-02", "people": {}, "couple": {"mode": "team", "together": 1, "team": 4, "reward": ""}}]}
        person1 = week_of(0) + [w for w in week_of(7) if w["kind"] == "run"]      # week 2: 2 runs, own goal missed
        person2 = [dict(w, person="person2") for w in person1]
        g = score({"person1": person1, "person2": person2}, [], CFG, NOW(9), None, settings)["group"]
        self.assertEqual((g["streak"], g["best_streak"], g["week"]["mode"], g["week"]["met"]), (2, 2, "team", True))

    def test_couple_streak_keeps_through_a_paused_week_in_team_mode(self):
        settings = {"history": [{"from": "2026-10-26", "people": {}, "couple": {
            "mode": "team", "together": 1, "team": 4, "reward": ""}}]}
        person1 = week_of(0) + week_of(14)
        person2 = [dict(w, person="person2") for w in week_of(0) + week_of(14)]
        pauses = [{"summary": "Person 2", "start": "2026-11-02", "end": "2026-11-09"}]
        g = score({"person1": person1, "person2": person2}, pauses, CFG, NOW(21), None, settings)["group"]
        self.assertEqual((g["streak"], g["best_streak"]), (2, 2))

    def test_couple_streak_resets_on_a_missed_team_week(self):
        settings = {"history": [{"from": "2026-10-26", "people": {}, "couple": {
            "mode": "team", "together": 1, "team": 4, "reward": ""}}]}
        week3 = [wk("person1", "run", 14, 18, 0, 26, km=3)]                       # 2 team points, nobody paused
        person1 = week_of(0) + week_of(7) + week3 + week_of(21)
        person2 = [dict(w, person="person2") for w in person1]
        g = score({"person1": person1, "person2": person2}, [], CFG, NOW(28), None, settings)["group"]
        self.assertEqual((g["streak"], g["best_streak"]), (1, 2))

    def test_one_person_household_has_no_group(self):
        res = score({"person1": week_of(0)}, [], SOLO, NOW(6))
        self.assertIsNone(res["group"])
        self.assertEqual(list(res["people"]), ["person1"])
        self.assertTrue(res["people"]["person1"]["week"]["goal_met"])

    def test_joint_xp_on_shared_minutes_and_km_together(self):
        a, b = wk("person1", "run", 0, 18, 0, 30, km=4), wk("person2", "run", 0, 18, 2, 20, km=3)
        res = score({"person1": [a], "person2": [b]}, [], CFG, NOW(1))
        self.assertEqual(res["people"]["person1"]["xp"], 30 + 10 + 20)    # 20 shared min × 0.5, + plan
        self.assertEqual((res["group"]["month_joint"], res["group"]["km_together"]), (1, 3.5))

    def test_score_leaves_input_untouched_and_feed_starts_at_rules_start(self):
        old, a = wk("person1", "run", -1, 18, 0, 26, km=3, excluded=True), wk("person1", "run", 0, 18, 0, 26, km=8)
        b = wk("person2", "run", 0, 18, 2, 26, km=3)
        ins = {"person1": [old, a], "person2": [b]}
        before = [dict(w) for w in ins["person1"] + ins["person2"]]
        p = score(ins, [], CFG, NOW(1))["people"]["person1"]
        self.assertEqual(ins["person1"] + ins["person2"], before)
        self.assertEqual([(r["key"], r["plan"], r["joint"], r["km"]) for r in p["recent"]], [(a["key"], "W1D1", True, 8)])
        self.assertIn("long_session_7.5", [u["id"] for u in p["badges"]["unlocked"]])
        self.assertEqual(p["pbs"], {"longest_session_km": 8, "prs": 0, "gym_tonnes": 0, "lifts": [], "fastest_1k": None})
        self.assertEqual(p["name"], CFG["people"]["person1"]["name"])

    def test_pause_without_summary_is_ignored(self):
        self.assertEqual(pause_days([{"summary": None, "start": "2026-11-02", "end": "2026-11-06"},
                                     {"start": "2026-11-02", "end": "2026-11-06"}], "person1", CFG), set())

    def test_float_km_sum_unlocks_on_the_reaching_workout(self):
        ws = [wk("person1", "run", i, 18, 0, 15, km=1.1) for i in range(9)] + [wk("person1", "run", 9, 18, 0, 15, km=0.1)]
        b = score({"person1": ws, "person2": []}, [], CFG, NOW(10))["people"]["person1"]["badges"]
        self.assertEqual({u["id"]: u["unlocked_at"] for u in b["unlocked"]}["run_km_10"], "2026-11-04")


    def test_xp_floors_the_exact_sum_at_a_level_boundary(self):
        ws = [wk("person1", "walk", d, 18, 0, 100 / 60) for d in range(30)]  # 30 x 1.666.. min = exactly 50 XP
        p = score({"person1": ws, "person2": []}, [], CFG, NOW(30))["people"]["person1"]
        self.assertEqual((p["xp"], p["level"]), (50, 2))


def lift(w, r):
    return {"w": w, "r": r}


def cat(**names):
    """A catalog from {id: name} or {id: (name, bp)}."""
    return {k: {"name": v[0], "bp": v[1]} if isinstance(v, tuple) else {"name": v, "bp": ""} for k, v in names.items()}


def pbs(ws, catalog=None, day=10):
    return score({"person1": ws, "person2": []}, [], CFG, NOW(day), catalog=catalog)["people"]["person1"]["pbs"]


class RecordTests(unittest.TestCase):
    def test_lifts_best_set_per_exercise_ties_keep_the_earliest(self):
        a = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(60, 8), "0001": lift(20, 10)}, unit="kg")
        b = wk("person1", "gym", 2, 18, 0, 60, lifts={"0118": lift(70, 5), "0001": lift(20, 12), "0002": lift(5, 5)})
        c = wk("person1", "gym", 4, 18, 0, 60, lifts={"0118": lift(70, 5), "0001": lift(20, 12)})
        got = {x["id"]: x for x in pbs([a, b, c], cat(**{"0118": "Bent over row", "0001": "Curl"}))["lifts"]}
        self.assertEqual((got["0118"]["w"], got["0118"]["r"], got["0118"]["date"], got["0118"]["key"]),
                         (70, 5, "2026-10-28", b["key"]))
        self.assertEqual((got["0001"]["r"], got["0001"]["date"]), (12, "2026-10-28"))
        self.assertEqual((got["0118"]["name"], got["0118"]["unit"]), ("Bent over row", "kg"))

    def test_lifts_sorted_by_date_desc_then_name_and_name_fallback(self):
        a = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(60, 8)})
        b = wk("person1", "gym", 2, 18, 0, 60, lifts={"0002": lift(5, 5), "0001": lift(5, 5)}, unit="lb")
        out = pbs([a, b], cat(**{"0001": "Zed", "0002": "Alpha", "0003": ""}))["lifts"]
        self.assertEqual([(x["name"], x["unit"]) for x in out], [("Alpha", "lb"), ("Zed", "lb"), ("Exercise 0118", "kg")])

    def test_lifts_carry_their_muscle_group_and_session_count(self):
        a = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(60, 8), "0001": lift(20, 10)})
        b = wk("person1", "gym", 2, 18, 0, 60, lifts={"0118": lift(70, 5)})
        c = wk("person1", "gym", 2, 18, 30, 60, lifts={"0118": lift(65, 5)})            # merges into b: one session
        d = wk("person1", "gym", 3, 18, 0, 60, lifts={"0118": lift(99, 9)}, excluded=True)
        e = wk("person1", "home", 4, 18, 0, 60, lifts={"0118": lift(99, 9)})
        got = {x["id"]: x for x in pbs([a, b, c, d, e], cat(**{"0118": ("Row", "back"), "0001": ("Curl", "upper arms")}))["lifts"]}
        self.assertEqual([(got[i]["group"], got[i]["sessions"]) for i in ("0118", "0001")], [("Back", 2), ("Arms", 1)])
        self.assertEqual(got["0118"]["w"], 70)

    def test_a_lift_missing_from_the_catalog_or_without_bp_is_other(self):
        a = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(60, 8), "0001": lift(20, 10)})
        got = {x["id"]: x["group"] for x in pbs([a], cat(**{"0118": "Row"}))["lifts"]}
        self.assertEqual(got, {"0118": "Other", "0001": "Other"})

    def test_lifts_ignore_excluded_and_other_kinds_and_old_cache_dicts(self):
        gone = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(99, 9)}, excluded=True)
        home = wk("person1", "home", 1, 18, 0, 60, lifts={"0118": lift(98, 9)})
        old = wk("person1", "gym", 2, 18, 0, 60)  # a gym_cache written before lifts existed
        self.assertEqual(pbs([gone, home, old])["lifts"], [])

    def test_merged_halves_keep_the_better_set_of_both(self):
        a = wk("person1", "gym", 0, 18, 0, 30, lifts={"0118": lift(60, 8), "0001": lift(20, 10)})
        b = wk("person1", "gym", 0, 18, 45, 30, lifts={"0118": lift(70, 5), "0002": lift(5, 5)})
        m, = clean([a, b], CFG)
        self.assertEqual(m["lifts"], {"0118": lift(70, 5), "0001": lift(20, 10), "0002": lift(5, 5)})
        self.assertEqual(clean([b, a], CFG)[0]["lifts"], m["lifts"])

    def test_duplicate_sync_keeps_the_better_set_of_both(self):
        a = wk("person1", "gym", 0, 18, 0, 60, lifts={"0118": lift(60, 8)})
        b = wk("person1", "gym", 0, 18, 5, 50, lifts={"0118": lift(60, 10)})
        self.assertEqual(clean([a, b], CFG)[0]["lifts"], {"0118": lift(60, 10)})

    def test_fastest_1k_lowest_wins_earliest_on_tie_and_only_runs(self):
        slow = wk("person1", "run", 0, 18, 0, 30, km=5, best_1k_s=300, url="u0")
        fast = wk("person1", "run", 2, 18, 0, 30, km=5, best_1k_s=240, url="u1")
        tie = wk("person1", "run", 4, 18, 0, 30, km=5, best_1k_s=240, url="u2")
        walk = wk("person1", "walk", 5, 18, 0, 30, km=5, best_1k_s=100)
        gone = wk("person1", "run", 6, 18, 0, 30, km=5, best_1k_s=90, excluded=True)
        self.assertEqual(pbs([slow, fast, tie, walk, gone])["fastest_1k"],
                         {"seconds": 240, "date": "2026-10-28", "key": fast["key"], "url": "u1"})

    def test_fastest_1k_none_without_a_value(self):
        self.assertIsNone(pbs([wk("person1", "run", 0, 18, 0, 30, km=5), wk("person1", "run", 2, 18, 0, 30, km=5, best_1k_s=None)])["fastest_1k"])

    def test_merged_runs_take_the_faster_1k(self):
        a = wk("person1", "run", 0, 18, 0, 20, km=3, best_1k_s=300)
        b = wk("person1", "run", 0, 18, 45, 10, km=1, best_1k_s=250)
        self.assertEqual(clean([a, b], CFG)[0]["best_1k_s"], 250)
        c = wk("person1", "run", 3, 18, 0, 20, km=3)
        d = wk("person1", "run", 3, 18, 45, 10, km=1, best_1k_s=250)
        self.assertEqual(clean([c, d], CFG)[0]["best_1k_s"], 250)


if __name__ == "__main__":
    unittest.main()
