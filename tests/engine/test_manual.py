"""Tests for manual remove / restore / add (synthetic data only)."""
import sqlite3
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import mock

from custom_components.fitbridge.engine import manual
from custom_components.fitbridge.engine.ingest import db_workouts
from custom_components.fitbridge.engine.scoring_config import load_config
from custom_components.fitbridge.engine.store import Store
from . import TWO
from .test_config import DEFAULT

PEOPLE = tuple(load_config(DEFAULT, TWO)["people"])
TYPES = load_config(DEFAULT, TWO)["types"]
P0 = PEOPLE[0]
NOW = datetime(2026, 10, 28, 12, 0, tzinfo=timezone.utc)
GOOD = {"action": "add", "person": P0, "kind": "run", "start": "2026-10-28T07:00:00+01:00", "minutes": 30}


class ManualTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.store = Store(Path(self.tmp.name) / "db.sqlite")

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def apply(self, msg_id, **msg):
        manual.apply(self.store, msg, msg_id, NOW, PEOPLE)

    def test_add_remove_and_same_id_stored_once(self):
        msg = {**GOOD, "km": 4, "indoor": True}
        self.apply("m1", **msg)
        self.apply("m1", **msg)
        ws = db_workouts(self.store, PEOPLE, TYPES)[0][P0]
        self.assertEqual([(w["kind"], w["indoor"], w["distance_m"], w["duration_s"], w["source"]) for w in ws],
                         [("run", True, 4000, 1800, "manual")])
        self.assertEqual(ws[0]["end"] - ws[0]["start"], timedelta(minutes=30))
        self.apply("r1", action="remove", person=P0, key="manual:m1")
        self.assertEqual(db_workouts(self.store, PEOPLE, TYPES)[0][P0], [])

    def test_remove_automatic_excludes_and_restore_brings_back(self):
        self.store.add(P0, "trk1", "opentracks", "completed", activity_type="running", points=10,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800,
                       endurain_ids="[42]")
        for action, expected in [("remove", True), ("restore", False)]:
            self.apply(action, action=action, person=P0, key="trk1")
            w = db_workouts(self.store, PEOPLE, TYPES)[0][P0][0]
            self.assertEqual(w["excluded"], expected)
        self.assertIsNone(w["url"])

    def test_bad_messages_raise_and_store_nothing(self):
        bad = {"c": ({**GOOD, "start": "2099-01-01T00:00:00+00:00"}, "start in the future"),
               "d": ({**GOOD, "kind": "swim"}, "unknown kind"),
               "e": ({**GOOD, "person": "nobody"}, "unknown person"),
               "f": ({**GOOD, "minutes": 0}, "bad minutes"),
               "g": ({**GOOD, "minutes": 601}, "bad minutes"),
               "h": ({**GOOD, "start": "2026-10-28T07:00:00"}, "start must be an ISO 8601 time with timezone"),
               "i": ({**GOOD, "km": -1}, "bad km"),
               "j": ({"action": "remove", "person": P0}, "missing key"),
               "k": ({**GOOD, "action": "explode"}, "unknown action"),
               "l": ({**GOOD, "indoor": "false"}, "indoor must be a boolean"),
               "m": ({**GOOD, "start": "0001-01-01T00:00:00+01:00"}, "start too early"),
               "o": ({**GOOD, "minutes": 10 ** 400}, "bad minutes"),   # too big for a float
               "p": ({**GOOD, "km": 10 ** 400}, "bad km"),
               "q": ({**GOOD, "km": 1e306}, "bad km")}                 # km * 1000 would be stored as inf
        for msg_id, (msg, reason) in bad.items():
            with self.subTest(msg_id=msg_id), self.assertRaises(ValueError) as ctx:
                manual.apply(self.store, msg, msg_id, NOW, PEOPLE)
            self.assertEqual(str(ctx.exception), reason)
        for not_object in ([1], "x", None):
            with self.assertRaisesRegex(ValueError, "^not an object$"):
                manual.apply(self.store, not_object, "b", NOW, PEOPLE)
        self.assertEqual(self.store.all_rows(), [])

    def test_database_error_is_not_a_validation_error(self):
        with mock.patch.object(self.store, "add", side_effect=sqlite3.OperationalError("database is locked")), \
                self.assertRaises(sqlite3.OperationalError):
            self.apply("m1", **GOOD)


if __name__ == "__main__":
    unittest.main()
