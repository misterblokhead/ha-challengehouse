"""The workout type table in scoring.toml: classification, validation and the uncounted rows (synthetic data only)."""
import tempfile
import unittest
from pathlib import Path

from custom_components.fitbridge.engine import ingest
from custom_components.fitbridge.engine.scoring_config import ConfigError, load_config
from custom_components.fitbridge.engine.store import Store
from custom_components.fitbridge.engine.scoring import score
from .test_config import DEFAULT
from .test_scoring import NOW, wk

CONFIG = load_config(DEFAULT)
TYPES = CONFIG["types"]
PEOPLE = tuple(CONFIG["people"])
P0 = PEOPLE[0]

# The classification as it was before the table, kept here as the oracle for every type that counted.
OLD_HOME_TYPES = {
    "functionalstrengthtraining", "traditionalstrengthtraining", "highintensityintervaltraining",
    "coretraining", "yoga", "pilates", "dance", "cardiodance", "socialdance", "mixedcardio", "flexibility",
}


def old_classify(source, activity_type, points):
    t = str(activity_type or "").lower()
    if source == "opentracks":
        if "run" in t or "hardlop" in t:
            return "run" if points else None
        return "walk" if "walk" in t or "wandel" in t else None
    if source == "health_exporter":
        if t in OLD_HOME_TYPES:
            return "home"
        return {"running": "run", "walking": "walk", "hiking": "walk"}.get(t)
    return None


class ClassifyTests(unittest.TestCase):
    def kind(self, *args):
        c = ingest.classify(*args, TYPES)
        return c and c["kind"]

    def test_defaults(self):
        c = ingest.classify("health_exporter", "cycling", 0, TYPES)
        self.assertEqual(c, {"kind": "home", "name": "Cycling", "min_min": 20, "effort": True})
        c = ingest.classify("health_exporter", "yoga", 0, TYPES)
        self.assertEqual(c, {"kind": "home", "name": "Yoga", "min_min": None, "effort": False})  # the scorer: rules.min_home_min
        self.assertEqual(self.kind("health_exporter", "running", 0), "run")
        self.assertEqual(ingest.classify("health_exporter", "running", 0, TYPES)["min_min"], None)
        self.assertEqual(self.kind("health_exporter", "walking", 0), "walk")
        self.assertEqual(self.kind("health_exporter", "hiking", 0), "walk")
        self.assertIsNone(ingest.classify("health_exporter", "golf", 0, TYPES))
        c = ingest.classify("opentracks", "Fietsen", 400, TYPES)
        self.assertEqual((c["kind"], c["effort"], c["min_min"]), ("home", True, 20))
        c = ingest.classify("opentracks", "hardlopen", 0, TYPES)  # a run needs GPS points
        self.assertEqual((c["kind"], c["reason"]), (None, "no_gps"))
        self.assertEqual(self.kind("opentracks", "Hardlopen", 10), "run")

    def test_every_default_type_is_in_the_spec_lists(self):
        for t in ("traditionalstrengthtraining", "mixedcardio", "dance", "flexibility"):
            self.assertFalse(ingest.classify("health_exporter", t, 0, TYPES)["effort"])
        for t in ("cycling", "swimming", "rowing", "elliptical", "stairclimbing", "stairs", "steptraining"):
            c = ingest.classify("health_exporter", t, 0, TYPES)
            self.assertEqual((c["kind"], c["effort"], c["min_min"]), ("home", True, 20), t)
        for t in ("Biking", "Mountain biking", "Cycling"):
            self.assertEqual(self.kind("opentracks", t, 0), "home", t)

    def test_manual_keeps_its_own_kinds(self):
        self.assertEqual(self.kind("manual", "gym", None), "gym")
        self.assertEqual(self.kind("manual", "home", []), "home")
        self.assertIsNone(ingest.classify("manual", "swim", None, TYPES))

    def test_default_table_matches_old_classification(self):
        health = [*OLD_HOME_TYPES, "running", "walking", "hiking", "HighIntensityIntervalTraining", "cardioDance"]
        opentracks = ["Hardlopen", "running", "Wandelen", "Walking", "Trail run", "Yoga"]
        for t in health:
            with self.subTest(source="health_exporter", t=t):
                self.assertEqual(self.kind("health_exporter", t, None), old_classify("health_exporter", t, None))
        for t in opentracks:
            for points in (0, 10):
                with self.subTest(source="opentracks", t=t, points=points):
                    self.assertEqual(self.kind("opentracks", t, points), old_classify("opentracks", t, points))


class TableTests(unittest.TestCase):
    def test_bad_table(self):
        for what, broken in [
            ("unknown kind", DEFAULT.replace('kind = "run"', 'kind = "swim"', 1)),
            ("duplicate match", DEFAULT.replace('match = "yoga"', 'match = "pilates"')),
            ("min_min 0", DEFAULT.replace("min_min = 20", "min_min = 0", 1)),
            ("min_min text", DEFAULT.replace("min_min = 20", 'min_min = "20"', 1)),
            ("effort not bool", DEFAULT.replace("effort = true", 'effort = "yes"', 1)),
            ("upper-case match", DEFAULT.replace('match = "yoga"', 'match = "Yoga"')),
            ("no name", DEFAULT.replace('name = "Yoga"', 'name = ""')),
            ("source missing from [types]", DEFAULT.replace("health_exporter = [", "garbage = [")),
            ("source not a list", DEFAULT.replace("opentracks = [", "opentracks = 3\nunused = [")),
        ]:
            with self.subTest(what), self.assertRaises(ConfigError):
                load_config(broken)

    def test_missing_types_uses_shipped_table(self):
        before, rest = DEFAULT.split("# Which workout types count.", 1)  # a config from before the table existed
        old = before + rest[rest.index("[goal]"):]
        self.assertNotIn("[types]", old)
        cfg = load_config(old)
        self.assertEqual(cfg["types"], TYPES)
        self.assertEqual(ingest.classify("health_exporter", "yoga", 0, cfg["types"])["name"], "Yoga")

    def test_min_min_defaults_from_the_rules(self):
        cfg = load_config(DEFAULT.replace("min_home_min = 15", "min_home_min = 25"))
        c = ingest.classify("health_exporter", "yoga", 0, cfg["types"])  # the shipped yoga entry sets no min_min
        yoga = wk(P0, c["kind"], 0, 18, 0, 20, min_min=c["min_min"], effort=c["effort"])
        self.assertEqual(score({P0: [yoga]}, [], cfg, NOW(1))["people"][P0]["feed"][0]["reason"], "short")  # 20 < 25


class UncountedTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.store = Store(Path(self.tmp.name) / "db.sqlite")

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def test_uncounted_rows(self):
        t = dict(start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800, kcal=200.0,
                 avg_hr=120.0, max_hr=150.0)
        self.store.add(P0, "y", "health_exporter", "archived", activity_type="yoga", **t)
        self.store.add(P0, "g", "health_exporter", "archived", activity_type="golf", **t)
        counted, uncounted = ingest.db_workouts(self.store, PEOPLE, TYPES)
        (y,), (g,) = counted[P0], uncounted[P0]
        self.assertEqual((y["key"], y["kind"], y["name"], y["min_min"], y["effort"], y["max_hr"], y["kcal"]),
                         ("y", "home", "Yoga", None, False, 150.0, 200.0))
        self.assertEqual((g["key"], g["kind"], g["name"], g["duration_s"], g["avg_hr"]), ("g", None, "Golf", 1800.0, 120.0))
        self.assertEqual(uncounted[PEOPLE[1]], [])
        self.assertEqual((g["reason"], y["reason"]), ("type", None))

    def test_an_opentracks_run_without_gps_is_uncounted_as_no_gps(self):
        self.store.add(P0, "r", "opentracks", "skipped_no_gps", activity_type="running", points=0,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        counted, uncounted = ingest.db_workouts(self.store, PEOPLE, TYPES)
        (r,) = uncounted[P0]
        self.assertEqual((counted[P0], r["kind"], r["name"], r["reason"]), ([], None, "Run", "no_gps"))


if __name__ == "__main__":
    unittest.main()
