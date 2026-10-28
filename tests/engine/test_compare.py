"""Tests for dev/compare_scores.py (synthetic data only)."""
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

_SRC = Path(__file__).resolve().parents[2] / "dev" / "compare_scores.py"
_spec = importlib.util.spec_from_file_location("compare_scores", _SRC)
cmp = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(cmp)


def doc():
    return {
        "scored_at": "2026-10-28T10:00:00",
        "config_error": None,
        "people": {"person1": {
            "xp": 100,
            "shoes": [{"id": "a"}],
            "run_shoes": [{"id": "b"}],
            "feed": [{"id": 1, "xp": 5, "url": "u1"}, {"id": 2, "xp": 6, "url": "u2"}],
            "week": {"week": "2026-W44", "goal_as_of": "x"},
        }},
    }


class CompareTests(unittest.TestCase):
    def test_identical(self):
        self.assertEqual(cmp.diff(doc(), doc()), [])

    def test_xp_difference_path(self):
        b = doc()
        b["people"]["person1"]["xp"] = 101
        self.assertEqual(len(cmp.diff(doc(), b)), 1)
        self.assertTrue(cmp.diff(doc(), b)[0].startswith("people.person1.xp"))

    def test_ignored_keys(self):
        b = doc()
        b["scored_at"] = "other"
        b["config_error"] = "boom"
        b["settings_error"] = "boom"
        p = b["people"]["person1"]
        p["shoes"] = []
        del p["run_shoes"]
        p["feed"][0]["url"] = "changed"
        p["week"]["goal_as_of"] = "y"
        self.assertEqual(cmp.diff(doc(), b), [])

    def test_feed_order_matters(self):
        b = doc()
        b["people"]["person1"]["feed"].reverse()
        out = cmp.diff(doc(), b)
        self.assertTrue(out)
        self.assertTrue(any("feed[0]" in line for line in out))

    def test_one_sided_key_and_list_length(self):
        b = doc()
        b["people"]["person1"]["extra"] = 1
        b["people"]["person1"]["feed"].pop()
        out = cmp.diff(doc(), b)
        self.assertIn("people.person1.extra: only in shadow", out)
        self.assertIn("people.person1.feed[1]: only in lxc", out)

    def test_main_exit_codes(self):
        with tempfile.TemporaryDirectory() as t:
            a, b = Path(t, "a.json"), Path(t, "b.json")
            a.write_text(json.dumps(doc()))
            b.write_text(json.dumps(doc()))
            self.assertEqual(cmp.main([str(a), str(b)]), 0)
            d = doc()
            d["people"]["person1"]["xp"] = 1
            b.write_text(json.dumps(d))
            self.assertEqual(cmp.main([str(a), str(b)]), 1)
