"""Tests for the SQLite store (synthetic data only)."""
import tempfile
import unittest
from pathlib import Path

from custom_components.fitbridge.engine.scoring_config import load_config
from custom_components.fitbridge.engine.store import Store
from . import TWO
from .test_config import DEFAULT
from .test_ingest import counts

PEOPLE = tuple(load_config(DEFAULT, TWO)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]


class StoreTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.path = Path(self.tmp.name) / "db.sqlite"
        self.store = Store(self.path)

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def test_plan_blocks_roundtrip(self):
        self.store.set_plan_blocks(P0, "a", {"blocks": [[0, 60, 8.3]], "boundary_kmh": 6.9})
        self.store.set_plan_blocks(P0, "b", None)
        self.assertEqual(self.store.plan_blocks(), {(P0, "a"): {"blocks": [[0, 60, 8.3]], "boundary_kmh": 6.9}, (P0, "b"): None})

    def test_plan_review_set_and_clear(self):
        self.store.set_plan_review(P0, "a", "type", "cycling")
        self.store.set_plan_review(P0, "b", "ok")
        self.assertEqual(self.store.plan_reviews(), {(P0, "a"): {"decision": "type", "type_match": "cycling"},
                                                     (P0, "b"): {"decision": "ok", "type_match": None}})
        self.store.set_plan_review(P0, "a", None)
        self.assertEqual(list(self.store.plan_reviews()), [(P0, "b")])

    def test_old_indoor_awaiting_rows_move_to_no_route(self):
        self.store.add(P1, "OLD", "health_exporter", "awaiting_route", activity_type="walking", indoor=1)
        self.store.add(P1, "OUT", "health_exporter", "awaiting_route", activity_type="running", indoor=0)
        self.store.db.close()
        self.store = Store(self.path)
        self.assertEqual(counts(self.store), {P1: {"no_route": 1, "awaiting_route": 1}})

    def test_badges_first_scoring_is_silent_and_unseen_is_read_only(self):
        b = [{"id": "a", "unlocked_at": "2026-10-28"}, {"id": "b", "unlocked_at": "2026-10-28"}]
        self.assertEqual(self.store.unseen_badges(P0, b), (b, False))
        self.assertEqual(self.store.unseen_badges(P0, b), (b, False))  # nothing recorded by looking
        self.store.record_badges(P0, b[:1])
        self.assertEqual(self.store.unseen_badges(P0, b), (b[1:], True))
        self.store.record_badges(PEOPLE[-1], [])  # empty first scoring still counts as scored
        self.assertEqual(self.store.unseen_badges(PEOPLE[-1], b), (b, True))

    def test_kv(self):
        self.assertIsNone(self.store.kv_get("k"))
        self.store.kv_set("k", "v")
        self.store.kv_set("k", "w")
        self.assertEqual(self.store.kv_get("k"), "w")


if __name__ == "__main__":
    unittest.main()
