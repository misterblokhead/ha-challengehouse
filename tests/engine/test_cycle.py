"""Tests for the scoring cycle (synthetic data only)."""
import json
import os
import tempfile
import time
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import mock

from custom_components.fitbridge.engine import cycle, ingest, opengym
from custom_components.fitbridge.engine.scoring_config import load_config
from custom_components.fitbridge.engine.store import Store
from . import overlay
from .test_config import DEFAULT
from .test_ingest import gpx_with_points, hex_workout, hex_zip
from .test_opengym import fake
from .test_records import seg, track

PEOPLE = tuple(load_config(DEFAULT)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]
NOW = datetime(2026, 10, 28, 12, 0, tzinfo=timezone.utc)
GYM_UID = "uid-0"
_GYM_START = int(datetime(2026, 10, 27, 17, tzinfo=timezone.utc).timestamp() * 1000)
GYM = {"id": "g1", "start": _GYM_START, "end": _GYM_START + 3600_000, "vol": 1000, "name": "Push"}


class FakeOpenGym:
    def __init__(self, raws=(), raise_=None):
        self.raws, self.raise_ = list(raws), raise_

    def renew_token(self):
        if self.raise_:
            raise self.raise_

    def users(self):
        return [{"id": GYM_UID}]

    def user(self, uid):
        return {"unit": "kg", "workouts": self.raws}

    def exercise_file(self):
        return "assets/exercises-t.js"

    def text(self, path):
        return '{"id":"0118","n":"bent over row","bp":"back"}'


class ScoringCycleTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.toml_path = root / "scoring.toml"
        self.toml_path.write_text(DEFAULT, encoding="utf-8")
        self.archive = root / "archive"
        self.store = Store(root / "db.sqlite")
        self.holder = cycle.ConfigHolder(self.toml_path)
        self.badges, self.workouts, self.records = [], [], []

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def run_cycle(self, og=None, now=NOW, commit=True, pauses=[], steps=None, settings=None):  # noqa: B006 (never mutated)
        """One cycle; commit=True stands in for a successful announce."""
        c = cycle.score_cycle(self.store, self.holder, og,
                              cycle.Inputs(pauses, steps, settings, {P0: GYM_UID}),
                              now)
        if commit:
            self.badges += c.badges
            self.workouts += c.workouts
            self.records += c.records
            c.commit()
        return c

    def scores(self, *args, **kw):
        return self.run_cycle(*args, **kw).scores

    def add_run(self, key, day="2026-10-27"):
        self.store.add(P0, key, "opentracks", "completed", activity_type="running", points=5,
                       start=f"{day}T18:00:00+01:00", end=f"{day}T18:30:00+01:00", duration_s=1800)

    def workout_keys(self):
        return [(p, w["key"]) for p, w in self.workouts]

    def record_keys(self):
        return [e["key"] for _, e in self.records]

    def announce_state(self):
        db = self.store.db
        return [db.execute(f"SELECT * FROM {t} ORDER BY 1, 2").fetchall() for t in
                ("badges", "announced_workouts", "records", "record_holders")] + \
            [db.execute("SELECT * FROM kv WHERE key LIKE '%scored:%' ORDER BY key").fetchall()]

    # ---------- inputs and caches ----------

    def test_opengym_down_uses_cache(self):
        self.run_cycle(FakeOpenGym([GYM]))
        with self.assertLogs("custom_components.fitbridge", "WARNING") as logs:
            res = self.scores(FakeOpenGym(raise_=OSError()))
        self.assertEqual(res["people"][P0]["week"]["workouts"], 1)
        self.assertIsNotNone(res["gym_data_as_of"])
        self.assertIn("OSError", logs.output[0])

    def test_gym_error_names_the_failure_by_class(self):
        self.assertIsNone(self.run_cycle().gym_error)  # no openGym: nothing failed
        self.assertIsNone(self.run_cycle(FakeOpenGym([GYM])).gym_error)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            c = self.run_cycle(FakeOpenGym(raise_=opengym.OpenGymAuthError("rejected")))
        self.assertEqual(c.gym_error, "OpenGymAuthError")

    def test_gym_items_have_no_url(self):
        res = self.scores(FakeOpenGym([GYM]))
        self.assertEqual([w["url"] for w in res["people"][P0]["recent"]], [None])
        self.assertIsNone(json.loads(self.store.kv_get("gym_cache"))[P0][0]["url"])

    def test_gym_remove_and_restore(self):
        for excluded, gym in [(True, 0), (False, 1)]:
            self.store.set_excluded(P0, "opengym:g1", excluded)
            res = self.scores(FakeOpenGym([GYM]))
            self.assertEqual(res["people"][P0]["week"]["workouts"], gym)
            self.assertEqual([w["excluded"] for w in res["people"][P0]["recent"]], [excluded])

    def test_no_opengym_and_no_cache_scores_without_gym(self):
        res = self.scores()
        self.assertEqual(res["people"][P0]["week"]["workouts"], 0)
        self.assertIsNone(res["gym_data_as_of"])

    def test_pauses_cached_when_missing(self):
        name = load_config(DEFAULT)["people"][P0]["name"]
        self.run_cycle(pauses=[{"summary": name, "start": "2026-10-26", "end": "2026-11-02"}])
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            res = self.scores(pauses=None)
        self.assertTrue(res["people"][P0]["week"]["paused"])
        self.assertIsNotNone(res["pauses_as_of"])

    def test_bad_pause_payload_keeps_good_cache(self):
        name = load_config(DEFAULT)["people"][P0]["name"]
        self.run_cycle(pauses=[{"summary": name, "start": "2026-10-26", "end": "2026-11-02"}])
        for bad in ([{"summary": name, "start": "not a date", "end": "2026-11-02"}],
                    [{"summary": 5, "start": "2026-10-26", "end": "2026-11-02"}],
                    [{"summary": "Someone Else", "start": "2026-10-26", "end": "not a date"}],
                    {"summary": name}):
            with self.subTest(bad=bad), self.assertLogs("custom_components.fitbridge", "WARNING"):
                res = self.scores(pauses=bad)
                self.assertTrue(res["people"][P0]["week"]["paused"])

    def test_settings_and_steps_scored_and_bad_settings_keep_good_cache(self):
        good = {"history": [{"from": "2026-10-26", "people": {P0: {"runs": 1, "workouts": 0, "active_days": 1, "steps": 4000}}}]}
        res = self.scores(settings=good, steps={P0: {"2026-10-27": 4500.7}})
        week = res["people"][P0]["week"]
        self.assertEqual((week["goal"]["steps"], week["active_days"]), (4000, 1))
        self.assertIsNone(res["settings_error"])
        self.assertTrue(res["settings_as_of"] and res["steps_as_of"])
        for bad in ({"history": [{"from": "2026-10-27"}]}, {"history": [{"from": "2026-10-26", "couple": {"mode": "x"}}]}):
            with self.subTest(bad=bad), self.assertLogs("custom_components.fitbridge", "WARNING"):
                res = self.scores(settings=bad, steps=[])
                self.assertEqual(res["people"][P0]["week"]["goal"]["steps"], 4000)     # cached settings and steps
                self.assertEqual(res["people"][P0]["week"]["active_days"], 1)
                self.assertIn("history[0]", res["settings_error"])
        with self.assertLogs("custom_components.fitbridge", "WARNING"):                                   # not an object is invalid too
            res = self.scores(settings=["history"])
        self.assertTrue(res["settings_error"])
        self.assertIsNone(self.scores(settings=good)["settings_error"])                # a good payload clears it

    def test_missing_settings_and_steps_are_not_an_error(self):
        self.run_cycle(steps={P0: {"2026-10-27": 12000}})
        with self.assertNoLogs("custom_components.fitbridge", "WARNING"):
            res = self.scores()
        self.assertEqual((res["settings_error"], res["settings_as_of"]), (None, None))
        self.assertEqual(json.loads(self.store.kv_get("steps_cache")), {P0: {"2026-10-27": 12000}})  # None keeps the cache

    def test_steps_merge_keeps_the_higher_count_per_day(self):
        settings = {"history": [{"from": "2026-10-26", "people": {
            P0: {"runs": 0, "workouts": 0, "active_days": 2, "steps": 10000}}}]}

        def run(steps):
            r = self.scores(settings=settings, steps={P0: steps})["people"][P0]
            return r["week"]["active_days"], r["xp"], r["streak"]

        first = run({"2026-10-26": 12000, "2026-10-27": 12000})
        self.assertEqual(first[0::2], (2, 1))
        self.assertEqual(run({"2026-10-27": 11000, "2026-10-28": 500}), first)   # HA dropped the 26th and reports less
        self.assertEqual(json.loads(self.store.kv_get("steps_cache")),
                         {P0: {"2026-10-26": 12000, "2026-10-27": 12000, "2026-10-28": 500}})

    def test_active_days_are_recorded_but_never_announced(self):
        self.run_cycle()  # seeds
        res = self.scores(steps={P0: {"2026-10-27": 12000}})
        self.assertEqual([w["kind"] for w in res["people"][P0]["feed"]], ["active_day"])
        self.run_cycle(steps={P0: {"2026-10-27": 12000}})
        self.assertEqual(self.workouts, [])
        known = {r[0] for r in self.store.db.execute("SELECT key FROM announced_workouts WHERE person=?", (P0,))}
        self.assertEqual(known, {f"steps:{P0}:2026-10-27"})

    # ---------- announcing ----------

    def test_scores_carry_the_old_scores_keys(self):
        self.add_run("t1")
        res = self.scores()
        self.assertEqual(json.loads(json.dumps(res)), res)
        self.assertEqual([w["key"] for w in res["people"][P0]["feed"]], ["t1"])
        self.assertLessEqual({"config_error", "gym_data_as_of", "pauses_as_of", "settings_error", "settings_as_of",
                              "steps_as_of", "scored_at"}, set(res))
        self.assertEqual(res["scored_at"], NOW.isoformat(timespec="seconds"))

    def test_uncommitted_cycle_does_not_record_badges(self):
        self.run_cycle(FakeOpenGym([]))  # seeds
        self.store.add(P0, "t2", "opentracks", "completed", activity_type="running", points=5,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        res = self.scores(FakeOpenGym([]), commit=False)  # announcing failed
        self.assertEqual(res["people"][P0]["week"]["runs"], 1)
        fresh, announce = self.store.unseen_badges(P0, res["people"][P0]["badges"]["unlocked"])
        self.assertTrue(fresh and announce)
        self.run_cycle(FakeOpenGym([]))
        self.assertEqual({(p, b["id"]) for p, b in self.badges}, {(P0, b["id"]) for b in fresh})
        self.assertEqual(self.store.unseen_badges(P0, fresh)[0], [])

    def test_first_cycle_is_silent_then_new_workout_announced_once(self):
        self.add_run("t1")
        self.run_cycle()
        self.assertEqual(self.workouts, [])
        self.add_run("t2", "2026-10-28")
        self.run_cycle()
        self.run_cycle()
        self.assertEqual(self.workout_keys(), [(P0, "t2")])

    def test_workout_older_than_48_hours_is_recorded_without_announcing(self):
        later = NOW + timedelta(days=3)                       # 2026-10-31
        self.run_cycle(now=later)                             # seeds
        self.add_run("t1", "2026-10-27")                      # first scored days later, e.g. a stored home workout after deploy
        self.add_run("t2", "2026-10-30")
        res = self.scores(now=later)
        self.assertEqual([k for _, k in self.workout_keys()], ["t2"])
        self.assertEqual(self.store.unseen_workouts(P0, res["people"][P0]["feed"])[0], [])

    def test_uncounted_type_is_in_the_feed_but_never_announced(self):
        self.run_cycle()  # seeds
        self.store.add(P0, "g1", "health_exporter", "completed", activity_type="golf",
                       start="2026-10-28T09:00:00+01:00", end="2026-10-28T11:00:00+01:00", duration_s=7200)
        res = self.scores()
        row = next(w for w in res["people"][P0]["feed"] if w["key"] == "g1")
        self.assertEqual((row["counts"], row["reason"], row["xp"]), (False, "type", 0))
        self.assertEqual(self.workouts, [])
        self.assertEqual(self.store.unseen_workouts(P0, res["people"][P0]["feed"])[0], [])  # recorded as seen

    def test_a_run_without_gps_is_in_the_feed_as_no_gps_but_never_announced(self):
        self.run_cycle()  # seeds
        self.store.add(P0, "t0", "opentracks", "skipped_no_gps", activity_type="running", points=0,
                       start="2026-10-28T09:00:00+01:00", end="2026-10-28T09:30:00+01:00", duration_s=1800)
        res = self.scores()
        row = next(w for w in res["people"][P0]["feed"] if w["key"] == "t0")
        self.assertEqual((row["counts"], row["reason"], row["xp"]), (False, "no_gps", 0))
        self.assertEqual(self.workouts, [])

    def test_excluded_workout_not_announced(self):
        self.run_cycle()  # seeds
        self.add_run("t1")
        self.store.set_excluded(P0, "t1", True)
        self.run_cycle()
        self.store.set_excluded(P0, "t1", False)  # restoring it later is not news either
        self.run_cycle()
        self.assertEqual(self.workouts, [])

    def test_late_route_does_not_reannounce(self):
        self.run_cycle()  # seeds
        w = dict(hex_workout("R", "running"), routeFile="routes/r.gpx",  # inside the scoring window
                 startDate="2026-10-27T15:00:00Z", endDate="2026-10-27T15:30:00Z", duration=1800)
        ingest.ingest_export(self.store, self.archive, P1, hex_zip([w]))
        self.run_cycle()
        ingest.ingest_export(self.store, self.archive, P1, hex_zip([w], {"routes/r.gpx": gpx_with_points()}))
        self.run_cycle()
        self.assertEqual(self.workout_keys(), [(P1, "R")])

    def test_longer_copy_from_another_source_is_not_announced_again(self):
        self.run_cycle()  # seeds
        self.add_run("t1")
        self.run_cycle()
        self.store.add(P0, "H", "health_exporter", "no_route", activity_type="running", indoor=1,  # longer, overlaps t1
                       start="2026-10-27T17:55:00+01:00", end="2026-10-27T18:40:00+01:00", duration_s=2700)
        self.run_cycle()
        res = self.scores()
        self.assertEqual([k for _, k in self.workout_keys()], ["t1"])
        self.assertEqual(self.store.unseen_workouts(P0, res["people"][P0]["feed"])[0], [])

    def test_stop_start_continuation_is_not_announced_again(self):
        self.run_cycle()  # seeds
        self.add_run("t1")
        self.run_cycle()
        self.store.add(P0, "t3", "opentracks", "completed", activity_type="running", points=5,  # 10 min later, longer
                       start="2026-10-27T18:40:00+01:00", end="2026-10-27T19:30:00+01:00", duration_s=3000)
        self.run_cycle()
        self.assertEqual([k for _, k in self.workout_keys()], ["t1"])

    def test_uncommitted_cycle_retries_announcement(self):
        self.run_cycle()  # seeds
        self.add_run("t1")
        self.run_cycle(commit=False)
        self.run_cycle()
        self.assertEqual([k for _, k in self.workout_keys()], ["t1"])

    # ---------- scoring config ----------

    def test_holder_uses_overlay(self):
        holder = cycle.ConfigHolder(self.toml_path, overlay(("person1",)))
        self.assertEqual(holder.get()[0]["people"].keys(), {"person1"})

    def test_broken_toml_keeps_last_good(self):
        self.holder.get()
        self.toml_path.write_text("broken = [")
        os.utime(self.toml_path, (time.time() + 5, time.time() + 5))
        with self.assertLogs("custom_components.fitbridge", "ERROR"):
            conf, err = self.holder.get()
        self.assertIsNotNone(conf)
        self.assertIn("TOML", err)

    def test_config_that_cannot_score_keeps_last_good(self):
        good, _ = self.holder.get()
        for i, (old, new) in enumerate([('title = "{t} runs"', 'title = "{n} runs"'),
                                        ("start = 2026-10-26", "start = 2026-10-26T00:00:00"),
                                        ("from = 2026-10-26", "from = 2026-10-26T00:00:00"),
                                        ("merge_gap_min = 30", "merge_gap_min = inf"),
                                        ("per_min = { run = 1", "per_min = { run = nan")]):
            with self.subTest(new=new):
                self.toml_path.write_text(DEFAULT.replace(old, new, 1), encoding="utf-8")
                os.utime(self.toml_path, (time.time() + 10 + i, time.time() + 10 + i))
                with self.assertLogs("custom_components.fitbridge", "ERROR"):
                    conf, err = self.holder.get()
                self.assertIs(conf, good)
                self.assertIsNotNone(err)

    def test_no_good_config_skips_scoring(self):
        self.toml_path.write_text("broken = [")
        with self.assertLogs("custom_components.fitbridge", "ERROR"):
            c = self.run_cycle()
        self.assertNotIn("people", c.scores)
        self.assertEqual(c.scores["error"], "no valid scoring config")
        self.assertIn("TOML", c.scores["config_error"])
        self.assertEqual((c.badges, c.workouts, c.records), ([], [], []))

    # ---------- records ----------

    def _names_og(self, file="exercises-a1.js", js='{"id":"0118","n":"bent over row","bp":"back"}', fail=False):
        routes = {"/": f'<link href="./assets/{file}">', f"/assets/{file}": js}
        opener = fake(routes)
        if fail:
            def opener(req, timeout=None):
                raise OSError("down")
            opener.paths = []
        return opengym.OpenGym("http://og", lambda: "t", lambda t: None, opener=opener), opener

    def add_gpx_run(self, key, gpx, name=None, activity="running", **fields):
        path = Path(self.tmp.name) / (name or f"{key}.gpx")
        path.write_bytes(gpx)
        self.store.add(P0, key, "opentracks", "completed", **{
            "activity_type": activity, "points": 5, "file": str(path), "start": "2026-10-27T18:00:00+01:00",
            "end": "2026-10-27T18:30:00+01:00", "duration_s": 1800, **fields})
        return path

    def test_fill_best_km_reads_a_run_file_once(self):
        path = self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        self.add_gpx_run("t2", track([seg(1500, pace=300)]), activity="walking")
        res = self.scores()
        self.assertEqual(self.store.best_km(), {(P0, "t1"): 300})        # the walk gets no row
        self.assertEqual(res["people"][P0]["pbs"]["fastest_1k"]["seconds"], 300)
        path.unlink()
        with self.assertNoLogs("custom_components.fitbridge", "WARNING"):
            res = self.scores()
        self.assertEqual(res["people"][P0]["pbs"]["fastest_1k"]["seconds"], 300)

    def test_fill_best_km_stores_null_for_a_missing_or_unparseable_file_once(self):
        self.add_gpx_run("gone", b"").unlink()
        self.add_gpx_run("bad", track([seg(1500)]))
        with mock.patch.object(cycle.records, "fastest_1k_s", side_effect=TypeError("naive vs aware")):
            with self.assertLogs("custom_components.fitbridge", "WARNING") as logs:
                res = self.scores()
        self.assertEqual(self.store.best_km(), {(P0, "gone"): None, (P0, "bad"): None})
        self.assertEqual(sorted(l.split(":")[-1].strip() for l in logs.output if "best 1 km" in l),
                         ["FileNotFoundError", "TypeError"])
        self.assertNotIn("naive", "".join(logs.output))
        self.assertIsNone(res["people"][P0]["pbs"]["fastest_1k"])
        with self.assertNoLogs("custom_components.fitbridge", "WARNING"):
            self.run_cycle()

    def test_old_gym_cache_without_lifts_scores_as_no_lifts(self):
        self.run_cycle(FakeOpenGym([GYM]))
        cache = json.loads(self.store.kv_get("gym_cache"))
        for w in cache[P0]:
            del w["lifts"], w["unit"]
        self.store.kv_set("gym_cache", json.dumps(cache))
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            res = self.scores(FakeOpenGym(raise_=OSError()))
        self.assertEqual(res["people"][P0]["week"]["workouts"], 1)
        self.assertEqual(res["people"][P0]["pbs"]["lifts"], [])

    def test_scores_carry_lift_and_run_records(self):
        gym = {**GYM, "entries": [{"id": "0118", "sets": [{"w": 70, "r": 5, "done": True}]},
                                  {"id": "0200", "sets": [{"w": 20, "r": 5, "done": True}]}]}
        self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        pbs = self.scores(FakeOpenGym([gym]))["people"][P0]["pbs"]
        self.assertEqual([(x["id"], x["name"], x["w"], x["r"], x["unit"], x["date"]) for x in pbs["lifts"]],
                         [("0118", "Bent over row", 70, 5, "kg", "2026-10-27"),
                          ("0200", "Exercise 0200", 20, 5, "kg", "2026-10-27")])
        self.assertEqual([(x["group"], x["sessions"]) for x in pbs["lifts"]], [("Back", 1), ("Other", 1)])
        self.assertEqual((pbs["fastest_1k"]["seconds"], pbs["fastest_1k"]["key"], pbs["fastest_1k"]["date"]),
                         (300, "t1", "2026-10-27"))

    @staticmethod
    def gym(w, r, gid="g1", hours=0):
        start = _GYM_START + hours * 3600_000
        return {**GYM, "id": gid, "start": start, "end": start + 3600_000,
                "entries": [{"id": "0118", "sets": [{"w": w, "r": r, "done": True}]}]}

    def gym_cycle(self, *sessions, now=NOW, **kw):
        return self.run_cycle(FakeOpenGym(list(sessions)), now=now, **kw).scores

    def test_better_lift_is_announced_once_after_a_silent_first_pass(self):
        self.gym_cycle(self.gym(70, 5))
        self.assertEqual(self.records, [])
        self.assertEqual(self.store.records(P0), ({"lift:0118": 70005}, True))
        self.gym_cycle(self.gym(70, 5), self.gym(72.5, 5, "g2", hours=2))
        self.gym_cycle(self.gym(70, 5), self.gym(72.5, 5, "g2", hours=2))
        ((p, ev),) = self.records
        self.assertEqual((p, ev["key"], ev["fastest_1k"]), (P0, "opengym:g2", None))
        self.assertEqual(ev["lifts"], [{"name": "Bent over row", "w": 72.5, "r": 5, "unit": "kg"}])

    def test_faster_kilometre_is_announced(self):
        self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        self.run_cycle()
        self.add_gpx_run("t2", track([seg(1500, pace=280)]), start="2026-10-28T08:00:00+01:00",
                         end="2026-10-28T08:30:00+01:00")  # not a copy of t1
        self.run_cycle()
        ((_, ev),) = self.records
        self.assertEqual((ev["key"], ev["lifts"], ev["fastest_1k"]), ("t2", [], 280))

    def test_uncommitted_cycle_keeps_records_unsaved_and_next_cycle_announces(self):
        self.gym_cycle(self.gym(70, 5))
        better = self.gym(75, 5, "g2", hours=2)
        self.gym_cycle(self.gym(70, 5), better, commit=False)
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 70005})
        self.gym_cycle(self.gym(70, 5), better)
        self.assertEqual(self.record_keys(), ["opengym:g2"])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 75005})

    def test_improvement_in_a_workout_older_than_48_hours_is_stored_silently(self):
        later = NOW + timedelta(days=3)
        self.gym_cycle(self.gym(70, 5), now=later)
        self.gym_cycle(self.gym(70, 5), self.gym(80, 5, "g2", hours=2), now=later)  # e.g. a restored old session
        self.assertEqual(self.records, [])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 80005})

    def test_whole_number_weights_stay_whole_in_scores_and_the_record_event(self):
        self.gym_cycle(self.gym(70, 5))
        res = self.gym_cycle(self.gym(70, 5), self.gym(70, 6, "g2", hours=2))
        payload = json.dumps(self.records[0][1])
        self.assertIn('"w": 70,', payload)
        self.assertNotIn("70.0", payload)
        self.assertIsInstance(res["people"][P0]["pbs"]["lifts"][0]["w"], int)
        self.assertNotIn('"w": 70.0', self.store.kv_get("gym_cache"))

    def test_removing_and_restoring_the_record_workout_announces_it_once(self):
        self.gym_cycle(self.gym(70, 5), self.gym(75, 5, "g2", hours=2))   # first pass
        self.gym_cycle(self.gym(70, 5), self.gym(80, 5, "g3", hours=5))
        self.assertEqual(len(self.records), 1)
        self.gym_cycle(self.gym(70, 5), self.gym(75, 5, "g2", hours=2))   # g3 removed: lower value stored
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 75005})
        self.gym_cycle(self.gym(70, 5), self.gym(75, 5, "g2", hours=2), self.gym(80, 5, "g3", hours=5))  # restored
        self.assertEqual(len(self.records), 1)
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 80005})

    def test_the_same_workout_improving_a_record_it_holds_is_silent(self):
        self.gym_cycle(self.gym(70, 5))
        self.gym_cycle(self.gym(70, 5), self.gym(72, 5, "g2", hours=2))
        self.gym_cycle(self.gym(70, 5), self.gym(74, 5, "g2", hours=2))   # g2 improved in place
        self.assertEqual(self.record_keys(), ["opengym:g2"])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 74005})
        self.gym_cycle(self.gym(70, 5), self.gym(74, 5, "g2", hours=2), self.gym(76, 5, "g3", hours=5))
        self.assertEqual(self.record_keys(), ["opengym:g2", "opengym:g3"])

    # ---------- exercise names ----------

    def test_exercise_catalog_cached_fetches_once_per_file_name(self):
        og, opener = self._names_og()
        self.assertEqual(cycle.exercise_catalog_cached(og, self.store, NOW), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/", "/assets/exercises-a1.js"])
        self.assertEqual(json.loads(self.store.kv_get("opengym_exercises")),
                         {"file": "assets/exercises-a1.js", "version": 2, "exercises": {"0118": {"name": "Bent over row", "bp": "back"}}})
        later = NOW + timedelta(hours=2)
        self.assertEqual(cycle.exercise_catalog_cached(og, self.store, later), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths[2:], ["/"])                      # same file: no bundle fetch
        og2, opener2 = self._names_og("exercises-b2.js", '{"id":"0119","n":"squat","bp":"upper legs"}')
        self.assertEqual(cycle.exercise_catalog_cached(og2, self.store, later + timedelta(hours=2)),
                         {"0119": {"name": "Squat", "bp": "upper legs"}})
        self.assertEqual(opener2.paths, ["/", "/assets/exercises-b2.js"])

    def test_exercise_catalog_from_before_body_parts_is_refetched_under_the_same_file_name(self):
        self.store.kv_set("opengym_exercises", json.dumps({"file": "assets/exercises-a1.js", "names": {"0118": "Bent over row"}}))
        og, opener = self._names_og()
        self.assertEqual(cycle.exercise_catalog_cached(og, self.store, NOW), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/", "/assets/exercises-a1.js"])

    def test_exercise_catalog_from_before_body_parts_serves_its_names_when_the_refetch_fails(self):
        self.store.kv_set("opengym_exercises", json.dumps({"file": "assets/exercises-a1.js", "names": {"0118": "Bent over row"}}))
        bad, _ = self._names_og(fail=True)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            self.assertEqual(cycle.exercise_catalog_cached(bad, self.store, NOW), {"0118": {"name": "Bent over row", "bp": ""}})
        self.assertEqual(cycle.exercise_catalog_cached(None, self.store, NOW), {"0118": {"name": "Bent over row", "bp": ""}})

    def test_exercise_catalog_failure_serves_cache_and_retries_hourly(self):
        og, _ = self._names_og()
        cycle.exercise_catalog_cached(og, self.store, NOW)
        bad, bad_opener = self._names_og(fail=True)
        calls = []
        bad.opener = lambda req, timeout=None: calls.append(1) or bad_opener(req, timeout)
        t = NOW + timedelta(hours=2)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            self.assertEqual(cycle.exercise_catalog_cached(bad, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(len(calls), 1)
        cycle.exercise_catalog_cached(bad, self.store, t + timedelta(minutes=30))
        self.assertEqual(len(calls), 1)                                 # tried < 1 h ago: no request
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            cycle.exercise_catalog_cached(bad, self.store, t + timedelta(minutes=61))
        self.assertEqual(len(calls), 2)

    def test_exercise_catalog_index_without_bundle_counts_as_failure(self):
        og, _ = self._names_og()
        cycle.exercise_catalog_cached(og, self.store, NOW)
        opener = fake({"/": "<html>changed</html>"})
        changed = opengym.OpenGym("http://og", lambda: "t", lambda t: None, opener=opener)
        t = NOW + timedelta(hours=2)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            self.assertEqual(cycle.exercise_catalog_cached(changed, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/"])
        cycle.exercise_catalog_cached(changed, self.store, t + timedelta(minutes=30))
        self.assertEqual(opener.paths, ["/"])                           # waits an hour

    def test_exercise_catalog_new_bundle_without_names_keeps_the_cache_and_backs_off(self):
        og, _ = self._names_og()
        cycle.exercise_catalog_cached(og, self.store, NOW)
        changed, opener = self._names_og("exercises-b2.js", "not a bundle")
        t = NOW + timedelta(hours=2)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            self.assertEqual(cycle.exercise_catalog_cached(changed, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        n = len(opener.paths)
        self.assertEqual(cycle.exercise_catalog_cached(changed, self.store, t + timedelta(minutes=30)),
                         {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(len(opener.paths), n)                          # waits an hour

    def test_exercise_catalog_without_cache_or_opengym_is_empty(self):
        self.assertEqual(cycle.exercise_catalog_cached(None, self.store, NOW), {})
        bad, _ = self._names_og(fail=True)
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            self.assertEqual(cycle.exercise_catalog_cached(bad, self.store, NOW + timedelta(hours=2)), {})


if __name__ == "__main__":
    unittest.main()
