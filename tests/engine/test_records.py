import math
import unittest

from custom_components.fitbridge.engine.records import best_set, exercise_catalog, fastest_1k_s, muscle_group, record_changes, session_lifts

M_TO_DEG = 180 / (math.pi * 6371000)  # one metre of latitude, matching haversine_m's radius


def track(segments, ns="http://www.topografix.com/GPX/1/1", prefix="", seg_pause_s=600):
    """GPX 1.1 from segments of (length_m, s_per_km, step_m, gap_after_m, gap_s); points run due north."""
    xmlns = f' xmlns{":" + prefix.rstrip(":") if prefix else ""}="{ns}"' if ns else ""
    out, t, lat = [f'<{prefix}gpx{xmlns} version="1.1"><{prefix}trk>'], 0.0, 45.0
    for length, pace, step, gap_after, gap_s in segments:
        out.append(f"<{prefix}trkseg>")
        d = 0.0
        while d <= length + 1e-9:
            hh, rem = divmod(int(t), 3600)
            mm, ss = divmod(rem, 60)
            out.append(f'<{prefix}trkpt lat="{lat + d * M_TO_DEG:.8f}" lon="5.0">'
                       f"<{prefix}time>2026-01-01T{hh:02d}:{mm:02d}:{ss:02d}Z</{prefix}time></{prefix}trkpt>")
            if gap_after is not None and abs(d - gap_after) < 1e-9:
                t += gap_s
            d += step
            t += step * pace / 1000
        lat += length * M_TO_DEG
        out.append(f"</{prefix}trkseg>")
        t += seg_pause_s
    out.append(f"</{prefix}trk></{prefix}gpx>")
    return "".join(out).encode()


def seg(length, pace=300, step=10, gap_after=None, gap_s=0):
    return (length, pace, step, gap_after, gap_s)


class BestSetTests(unittest.TestCase):
    def test_skips_warmups_undone_and_zero_weight(self):
        sets = [
            {"w": 100, "r": 5, "done": True, "warmup": True},
            {"w": 100, "r": 5, "done": True, "phase": "warmup"},
            {"w": 100, "r": 5, "done": False},
            {"w": 0, "r": 20, "done": True},
        ]
        self.assertIsNone(best_set(sets))

    def test_heaviest_then_most_reps(self):
        sets = [{"w": w, "r": r, "done": True} for w, r in ((40, 8), (40, 10), (35, 12))]
        self.assertEqual(best_set(sets), (40, 10))

    def test_sides_count_the_lower_side(self):
        sets = [{"w": 4.5, "r": 20, "sides": {"L": {"r": 10, "done": True}, "R": {"r": 9, "done": True}}}]
        self.assertEqual(best_set(sets), (4.5, 9))

    def test_sides_need_both_done(self):
        sets = [{"w": 4.5, "r": 10, "sides": {"L": {"r": 10, "done": True}, "R": {"r": 0, "done": False}}}]
        self.assertIsNone(best_set(sets))

    def test_dropset_uses_the_main_set(self):
        sets = [{"w": 50, "r": 10, "done": True, "type": "dropset", "drops": [{"w": 80, "r": 3}]}]
        self.assertEqual(best_set(sets), (50, 10))

    def test_empty(self):
        self.assertIsNone(best_set([]))

    def test_non_finite_or_non_numeric_weight_never_counts(self):
        inf, nan = float("inf"), float("nan")
        sets = [{"w": inf, "r": 5, "done": True}, {"w": nan, "r": 5, "done": True},
                {"w": "heavy", "r": 5, "done": True}, {"w": True, "r": 5, "done": True}]
        self.assertIsNone(best_set(sets))
        self.assertEqual(best_set(sets + [{"w": 40, "r": 5, "done": True}]), (40, 5))

    def test_session_lifts_leave_out_bodyweight_and_idless(self):
        entries = [
            {"id": "0118", "sets": [{"w": 40, "r": 8, "done": True}]},
            {"id": "0001", "sets": [{"w": 0, "r": 15, "done": True}]},
            {"sets": [{"w": 40, "r": 8, "done": True}]},
        ]
        self.assertEqual(session_lifts(entries), {"0118": {"w": 40, "r": 8}})


class ExerciseCatalogTests(unittest.TestCase):
    def test_parses_and_decodes(self):
        js = 'x=[{"id":"0118","n":"barbell row","bp":"back"},{"id":"9","n":"say \\"hi\\""}]'
        self.assertEqual(exercise_catalog(js), {"0118": {"name": "Barbell row", "bp": "back"},
                                                "9": {"name": 'Say "hi"', "bp": ""}})

    def test_bp_anywhere_in_the_entry(self):
        js = '[{"id":"1","eq":"barbell","n":"squat","t":["a","b"],"bp":"upper legs"},{"id":"2","n":"curl","bp":"upper arms","eq":"x"}]'
        self.assertEqual(exercise_catalog(js), {"1": {"name": "Squat", "bp": "upper legs"},
                                                "2": {"name": "Curl", "bp": "upper arms"}})

    def test_an_entry_does_not_borrow_the_next_ones_bp(self):
        self.assertEqual(exercise_catalog('[{"id":"1","n":"a"},{"id":"2","n":"b","bp":"chest"}]')["1"]["bp"], "")

    def test_the_last_entry_does_not_borrow_a_bp_from_later_js(self):
        js = '[{"id":"1","n":"a","eq":"x"}];o={"bp":"chest"}'
        self.assertEqual(exercise_catalog(js), {"1": {"name": "A", "bp": ""}})

    def test_a_bad_bp_keeps_the_name(self):
        self.assertEqual(exercise_catalog('[{"id":"1","n":"a","bp":7},{"id":"2","n":"b","bp":"back"}]'),
                         {"1": {"name": "A", "bp": ""}, "2": {"name": "B", "bp": "back"}})

    def test_garbage(self):
        self.assertEqual(exercise_catalog("not a bundle"), {})


class MuscleGroupTests(unittest.TestCase):
    def test_mapping(self):
        got = {bp: muscle_group(bp) for bp in ("chest", "back", "shoulders", "neck", "upper arms", "lower arms",
                                               "upper legs", "lower legs", "waist", "full body", "cardio", "", "tail")}
        self.assertEqual(got, {"chest": "Chest", "back": "Back", "shoulders": "Shoulders", "neck": "Shoulders",
                               "upper arms": "Arms", "lower arms": "Arms", "upper legs": "Legs", "lower legs": "Legs",
                               "waist": "Core", "full body": "Core", "cardio": "Core", "": "Other", "tail": "Other"})


class Fastest1kTests(unittest.TestCase):
    def test_steady_5_min_km(self):
        self.assertEqual(fastest_1k_s(track([seg(2000)])), 300)

    def test_too_short(self):
        self.assertIsNone(fastest_1k_s(track([seg(900)])))

    def test_windows_do_not_cross_segments(self):
        # a 5 s pause is under the gap rule, so only the <trkseg> split can stop a 1.2 km window
        self.assertIsNone(fastest_1k_s(track([seg(600), seg(600)], seg_pause_s=5)))

    def test_windows_do_not_cross_a_gap(self):
        self.assertIsNone(fastest_1k_s(track([seg(1000, gap_after=500, gap_s=90)])))

    def test_implausibly_fast_is_ignored(self):
        self.assertIsNone(fastest_1k_s(track([seg(1200, pace=140)])))

    def test_interpolates_to_exactly_1000_m(self):
        self.assertLessEqual(abs(fastest_1k_s(track([seg(2000, pace=240, step=30)])) - 240), 1)

    def test_picks_the_fastest_window(self):
        self.assertEqual(fastest_1k_s(track([seg(1100, pace=360), seg(1100, pace=300)])), 300)

    def test_namespace_prefix_or_none(self):
        base = fastest_1k_s(track([seg(2000)]))
        self.assertEqual(fastest_1k_s(track([seg(2000)], prefix="gpx:")), base)
        self.assertEqual(fastest_1k_s(track([seg(2000)], ns=None)), base)

    def test_malformed_is_none(self):
        self.assertIsNone(fastest_1k_s(b"<gpx"))


def lift(i, w, r, key="g1", name="Row"):
    return {"id": i, "name": name, "w": w, "r": r, "unit": "kg", "date": "2026-10-27", "key": key}


def pbs(lifts=(), run=None):
    return {"lifts": list(lifts), "fastest_1k": run and {"seconds": run[0], "date": "2026-10-27", "key": run[1], "url": None}}


class RecordChangesTests(unittest.TestCase):
    RECENT = {"g1", "t1"}

    def changes(self, pbs_, stored, loud=True, holders=(), recent=None):
        return record_changes(pbs_, stored, loud, set(holders), self.RECENT if recent is None else recent)

    def test_first_pass_is_silent_but_returns_every_value(self):
        events, updates, held = self.changes(pbs([lift("0118", 70, 5)], (300, "t1")), {}, loud=False)
        self.assertEqual((events, updates), ([], {"lift:0118": 70005, "run:1k": 300}))
        self.assertEqual(held, {("lift:0118", "g1"), ("run:1k", "t1")})

    def test_new_exercise_is_silent(self):
        events, updates, _ = self.changes(pbs([lift("0200", 20, 8)]), {"lift:0118": 70005})
        self.assertEqual((events, updates), ([], {"lift:0200": 20008}))

    def test_better_lift_is_announced_once(self):
        stored = {"lift:0118": 70005}
        events, updates, held = self.changes(pbs([lift("0118", 70, 6)]), stored)
        self.assertEqual(events, [{"key": "g1", "lifts": [{"name": "Row", "w": 70, "r": 6, "unit": "kg"}], "fastest_1k": None}])
        self.assertEqual(self.changes(pbs([lift("0118", 70, 6)]), {**stored, **updates}, holders=held)[:2], ([], {}))

    def test_worse_value_is_stored_silently(self):
        events, updates, _ = self.changes(pbs([lift("0118", 60, 5)], (330, "t1")), {"lift:0118": 70005, "run:1k": 300})
        self.assertEqual((events, updates), ([], {"lift:0118": 60005, "run:1k": 330}))

    def test_faster_kilometre_is_announced(self):
        events, updates, _ = self.changes(pbs(run=(290, "t1")), {"run:1k": 300})
        self.assertEqual(events, [{"key": "t1", "lifts": [], "fastest_1k": 290}])
        self.assertEqual(updates, {"run:1k": 290})

    def test_improvement_in_an_old_workout_is_silent(self):
        events, updates, _ = self.changes(pbs([lift("0118", 80, 5, key="old")], (250, "oldrun")),
                                          {"lift:0118": 70005, "run:1k": 300})
        self.assertEqual((events, updates), ([], {"lift:0118": 80005, "run:1k": 250}))

    def test_two_lifts_in_one_workout_make_one_event(self):
        events, _, _ = self.changes(pbs([lift("0118", 70, 6), lift("0200", 25, 8, name="Curl")]),
                                    {"lift:0118": 70005, "lift:0200": 20008})
        self.assertEqual([(e["key"], [x["name"] for x in e["lifts"]]) for e in events], [("g1", ["Row", "Curl"])])

    def test_lift_and_run_of_different_workouts_make_two_events(self):
        events, _, _ = self.changes(pbs([lift("0118", 70, 6)], (290, "t1")), {"lift:0118": 70005, "run:1k": 300})
        self.assertEqual([e["key"] for e in events], ["g1", "t1"])

    def test_a_workout_that_already_held_the_record_is_silent_when_it_beats_the_stored_value_again(self):
        # restored workout: the fallback value was stored when it was removed, the restore beats it
        events, updates, _ = self.changes(pbs([lift("0118", 72, 5)]), {"lift:0118": 70005}, holders={("lift:0118", "g1")})
        self.assertEqual((events, updates), ([], {"lift:0118": 72005}))
        # the same run improving after its second route attached
        events, updates, _ = self.changes(pbs(run=(298, "t1")), {"run:1k": 302}, holders={("run:1k", "t1")})
        self.assertEqual((events, updates), ([], {"run:1k": 298}))

    def test_a_newer_workout_beating_a_record_still_announces(self):
        events, _, held = self.changes(pbs([lift("0118", 75, 5)]), {"lift:0118": 72005}, holders={("lift:0118", "g0")})
        self.assertEqual([e["key"] for e in events], ["g1"])
        self.assertEqual(held, {("lift:0118", "g1")})

    def test_a_holder_of_another_record_does_not_silence_this_one(self):
        events, _, _ = self.changes(pbs([lift("0118", 75, 5)]), {"lift:0118": 72005}, holders={("lift:0200", "g1")})
        self.assertEqual([e["key"] for e in events], ["g1"])

    def test_integer_weight_stays_an_integer(self):
        self.assertEqual(session_lifts([{"id": "0118", "sets": [{"w": 70, "r": 5, "done": True}]}])["0118"]["w"], 70)
        self.assertIsInstance(session_lifts([{"id": "0118", "sets": [{"w": 70, "r": 5, "done": True}]}])["0118"]["w"], int)
        self.assertEqual(session_lifts([{"id": "0118", "sets": [{"w": 72.5, "r": 5, "done": True}]}])["0118"]["w"], 72.5)


if __name__ == "__main__":
    unittest.main()
