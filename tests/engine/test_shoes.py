"""Tests for shoes (synthetic data only)."""
import sqlite3
import tempfile
import unittest
from pathlib import Path

from custom_components.fitbridge.engine import cycle, shoes, store as store_mod
from custom_components.fitbridge.engine.ingest import db_workouts
from custom_components.fitbridge.engine.scoring_config import load_config
from custom_components.fitbridge.engine.store import Store
from .test_config import DEFAULT
from .test_cycle import NOW

PEOPLE = tuple(load_config(DEFAULT)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]


class ShoeTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / "db.sqlite"
        self.store = Store(self.path)

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def workout(self, key, activity="running", km=5.0, day="2026-10-20", hour=18, person=P0, source="opentracks"):
        self.store.add(person, key, source, "completed", activity_type=activity, points=5, distance_m=km * 1000,
                       start=f"{day}T{hour:02d}:00:00+01:00", end=f"{day}T{hour:02d}:30:00+01:00", duration_s=1800)

    def rows(self, person=P0):
        return shoes.rows(self.store, person, db_workouts(self.store, PEOPLE)[person])

    def assign(self, person=P0):
        shoes.assign_new(self.store, person, [w["key"] for w in db_workouts(self.store, PEOPLE)[person] if w["kind"] == "run"])

    def count(self, table):
        return self.store.db.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]

    def test_only_runs_count_and_rows_shape(self):
        a = shoes.add(self.store, P0, "Alpha", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1", km=5.0, day="2026-10-20")
        self.workout("r2", km=3.04, day="2026-10-22")
        self.workout("w1", activity="walking", km=9, day="2026-10-23")
        self.workout("h1", activity="HIIT", km=9, day="2026-10-24")
        self.assign()
        self.assertEqual(self.rows(), [{"id": a, "name": "Alpha", "km": 8.0, "limit": 600, "runs": 2,
                                        "last_run": "2026-10-22", "current": True}])
        self.assertEqual(self.count("run_shoes"), 2)

    def test_start_km_counts_and_empty_shoe(self):
        a = shoes.add(self.store, P0, "Alpha", 600)
        shoes.update(self.store, a, start_km=12.34)
        r = self.rows()[0]
        self.assertEqual((r["km"], r["runs"], r["last_run"], r["current"]), (12.3, 0, None, False))

    def test_moving_a_run_moves_its_km(self):
        a, b = shoes.add(self.store, P0, "A", 600), shoes.add(self.store, P0, "B", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1", km=5)
        self.workout("r2", km=4, day="2026-10-21")
        self.assign()
        shoes.move_run(self.store, P0, "r2", b)
        self.assertEqual([(r["name"], r["km"], r["runs"]) for r in self.rows()], [("A", 5.0, 1), ("B", 4.0, 1)])

    def test_add_makes_the_first_shoe_current_only_when_asked_and_only_without_one(self):
        a = shoes.add(self.store, P0, "A", 600)
        self.assertFalse(self.rows()[0]["current"])  # plain add: unchanged
        b = shoes.add(self.store, P0, "B", 600, current_if_none=True)  # no current yet: B takes it
        self.assertEqual([(r["id"], r["current"]) for r in self.rows()], [(a, False), (b, True)])
        c = shoes.add(self.store, P0, "C", 600, current_if_none=True)  # there is one: it stays
        self.assertEqual([r["current"] for r in self.rows()], [False, True, False])
        self.assertNotEqual(b, c)

    def test_assigned_maps_each_run_to_its_shoe_including_retired(self):
        a, b = shoes.add(self.store, P0, "A", 600), shoes.add(self.store, P0, "B", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1")
        self.workout("r2", day="2026-10-21")
        self.assign()
        shoes.move_run(self.store, P0, "r2", b)
        shoes.update(self.store, a, retired=True)
        self.assertEqual(shoes.assigned(self.store, P0), {"r1": a, "r2": b})
        self.assertEqual(shoes.assigned(self.store, P1), {})

    def test_changing_current_shoe_leaves_older_runs(self):
        a, b = shoes.add(self.store, P0, "A", 600), shoes.add(self.store, P0, "B", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1", km=5)
        self.assign()
        shoes.set_current(self.store, P0, b)
        self.workout("r2", km=4, day="2026-10-21")
        self.assign()
        self.assertEqual([(r["name"], r["km"], r["current"]) for r in self.rows()], [("A", 5.0, False), ("B", 4.0, True)])

    def test_excluded_run_drops_out(self):
        a = shoes.add(self.store, P0, "A", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1", km=5)
        self.workout("r2", km=4, day="2026-10-21")
        self.assign()
        self.store.set_excluded(P0, "r2", True)
        self.assertEqual((self.rows()[0]["km"], self.rows()[0]["runs"]), (5.0, 1))
        self.store.set_excluded(P0, "r2", False)
        self.assertEqual(self.rows()[0]["km"], 9.0)

    def test_run_seen_by_two_sources_counts_once(self):
        a = shoes.add(self.store, P0, "A", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1", km=5)
        self.workout("r1-hex", km=5, source="health_exporter")
        self.assign()
        self.assertEqual(self.rows()[0]["km"], 5.0)

    def test_retired_shoe_absent_but_keeps_runs(self):
        a, b = shoes.add(self.store, P0, "A", 600), shoes.add(self.store, P0, "B", 600)
        shoes.set_current(self.store, P0, a)
        self.workout("r1")
        self.assign()
        shoes.update(self.store, a, retired=True)
        self.assertEqual([r["name"] for r in self.rows()], ["B"])
        self.assertEqual(self.store.db.execute("SELECT shoe_id FROM run_shoes").fetchone()[0], a)
        self.workout("r2", day="2026-10-21")  # a retired shoe takes no new runs
        self.assign()
        self.assertEqual(self.count("run_shoes"), 1)
        shoes.update(self.store, a, retired=False)
        self.assertEqual([r["name"] for r in self.rows()], ["A", "B"])

    def test_run_with_no_current_shoe_counts_nowhere(self):
        a = shoes.add(self.store, P0, "A", 600)
        self.workout("r1")
        self.assign()
        self.assertEqual(self.rows()[0]["km"], 0.0)
        self.assertEqual(self.count("run_shoes"), 0)
        shoes.set_current(self.store, P0, a)
        self.assign()  # once a shoe is current, the unassigned run lands on it
        self.assertEqual(self.rows()[0]["km"], 5.0)

    def test_value_errors(self):
        a, other = shoes.add(self.store, P0, "A", 600), shoes.add(self.store, P1, "X", 600)
        retired = shoes.add(self.store, P0, "R", 600)
        shoes.update(self.store, retired, retired=True)
        self.workout("r1")
        self.workout("w1", activity="walking")
        for shoe in (other, retired, 999):
            with self.assertRaises(ValueError):
                shoes.set_current(self.store, P0, shoe)
            with self.assertRaises(ValueError):
                shoes.move_run(self.store, P0, "r1", shoe)
        for key in ("w1", "nope"):
            with self.assertRaises(ValueError):
                shoes.move_run(self.store, P0, key, a)
        with self.assertRaises(ValueError):
            shoes.move_run(self.store, P1, "r1", other)  # P0's run
        with self.assertRaises(ValueError):
            shoes.update(self.store, 999, name="x")
        shoes.update(self.store, a, name="Renamed", replace_at_km=700)
        self.assertEqual((self.rows()[0]["name"], self.rows()[0]["limit"]), ("Renamed", 700))

    def test_carry_over_sets_start_km_and_is_idempotent(self):
        self.workout("r1", km=5.0)
        self.workout("r2", km=3.5, day="2026-10-21")
        self.workout("w1", activity="walking", km=9)
        endurain = [{"name": "A", "replace_at_km": 600, "km": 10.0}, {"name": "B", "replace_at_km": 800, "km": None}]
        for _ in range(2):
            shoes.carry_over(self.store, P0, endurain)
            self.assertEqual([(r["name"], r["km"], r["runs"], r["current"]) for r in self.rows()],
                             [("A", 10.0, 2, True), ("B", 0.0, 0, False)])
        self.assertEqual(self.store.db.execute("SELECT start_km FROM shoes WHERE name='A'").fetchone()[0], 1.5)
        self.assertEqual(self.count("shoes"), 2)

    def test_carry_over_never_subtracts_runs_endurain_missed(self):
        self.workout("r1", km=2.0)  # never reached Endurain, so its shoe says 0 km
        shoes.carry_over(self.store, P0, [{"name": "A", "replace_at_km": 600, "km": 0.0}])
        self.assertEqual([(r["km"], r["runs"]) for r in self.rows()], [(2.0, 1)])

    def test_old_database_gains_the_tables(self):
        self.store.db.close()
        old = Path(self.tmp.name) / "old.sqlite"
        db = sqlite3.connect(old)
        db.executescript(store_mod.SCHEMA.split("CREATE TABLE IF NOT EXISTS shoes")[0])
        db.execute("INSERT INTO kv VALUES('k','v')")
        db.execute("INSERT INTO workouts(person,key,source,status,updated) VALUES('p','k1','manual','manual','x')")
        db.commit()
        db.close()
        self.store = Store(old)
        self.assertEqual(self.store.kv_get("k"), "v")
        self.assertEqual(len(self.store.all_rows()), 1)
        shoes.add(self.store, P0, "A", 600)
        self.assertEqual(self.count("run_shoes"), 0)


class ShoeCycleTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        (root / "scoring.toml").write_text(DEFAULT, encoding="utf-8")
        self.store = Store(root / "db.sqlite")
        self.holder = cycle.ConfigHolder(root / "scoring.toml")

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def test_cycle_assigns_new_runs_in_live_and_shadow_and_serves_rows(self):
        a = shoes.add(self.store, P0, "A", 600)
        shoes.set_current(self.store, P0, a)
        self.store.add(P0, "r1", "opentracks", "completed", activity_type="running", points=5, distance_m=6000,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        for live in (False, True):
            c = cycle.score_cycle(self.store, self.holder, None, cycle.Inputs([], None, None, {}), NOW, live)
            self.assertEqual(c.scores["people"][P0]["shoes"],
                             [{"id": a, "name": "A", "km": 6.0, "limit": 600, "runs": 1, "last_run": "2026-10-27", "current": True}])
            self.assertEqual(c.scores["people"][P1]["shoes"], [])
            self.assertEqual((c.scores["people"][P0]["run_shoes"], c.scores["people"][P1]["run_shoes"]), ({"r1": a}, {}))


if __name__ == "__main__":
    unittest.main()
