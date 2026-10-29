import json
import unittest
from pathlib import Path

from custom_components.fitbridge.engine.scoring_config import COUNTERS, ConfigError, load_config, parse_settings, parse_steps, pause_titles, plan_sessions

DEFAULT = (Path(__file__).parents[2] / "custom_components" / "fitbridge" / "engine" / "scoring.toml").read_text()


def _drop_tables(text, *headers):
    """Remove the named [tables] (header line through the next line starting with '[')."""
    out, skipping = [], False
    for line in text.splitlines(keepends=True):
        if line.startswith("["):
            skipping = line.strip() in headers
        if not skipping:
            out.append(line)
    return "".join(out)


ONE_PERSON = _drop_tables(DEFAULT, "[people.person2]", "[group]")


class ConfigTests(unittest.TestCase):
    def test_default_loads_and_c25k_totals(self):
        cfg = load_config(DEFAULT)
        s = plan_sessions(cfg, "c25k")
        self.assertEqual(len(s), 27)
        self.assertEqual((s[0]["week"], s[0]["day"], s[0]["total_s"]), (1, 1, 1500))
        self.assertEqual(s[14]["total_s"], 300 + 1200)        # W5D3
        self.assertEqual(s[15]["total_s"], 300 + 1440)        # W6D1: 5+3+8+3+5 min
        self.assertEqual(s[26]["total_s"], 300 + 1800)        # W9D3
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 2, "active_days": 0, "steps": 10000})

    def test_goal_defaults_and_gym_alias(self):
        cfg = load_config(DEFAULT.replace("workouts = 2", "gym = 1"))
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 1, "active_days": 0, "steps": 10000})
        cfg = load_config(DEFAULT.replace("active_days = 0\nsteps = 10000\n", ""))
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 2, "active_days": 0, "steps": 10000})
        with self.assertRaisesRegex(ConfigError, "not both"):
            load_config(DEFAULT.replace("workouts = 2", "workouts = 2\ngym = 2"))

    def test_goal_zero_allowed_negative_not(self):
        load_config(DEFAULT.replace("runs = 2\nworkouts = 2", "runs = 0\nworkouts = 0"))
        for bad in ("runs = -1\nworkouts = 2", "runs = 2\nworkouts = 2.5", "runs = 2\nworkouts = 2\nsteps = 1000"):
            with self.subTest(bad=bad), self.assertRaises(ConfigError):
                load_config(DEFAULT.replace("runs = 2\nworkouts = 2", bad))

    def test_home_minimum_and_xp_required(self):  # min_home_min and xp.active_day are POSITIVE keys
        with self.assertRaisesRegex(ConfigError, "min_home_min"):
            load_config(DEFAULT.replace("min_home_min = 15\n", ""))
        with self.assertRaisesRegex(ConfigError, "xp.active_day"):
            load_config(DEFAULT.replace("active_day = 15\n", ""))

    def test_home_and_active_day_badges_load(self):
        ids = {b["id"] for b in load_config(DEFAULT)["badges"]}
        self.assertLessEqual({"home", "active_days"}, ids)

    def test_every_badge_uses_a_known_counter(self):
        for b in load_config(DEFAULT)["badges"]:
            self.assertIn(b["counter"], COUNTERS)

    def test_invalid_configs_are_rejected_with_reasons(self):
        for broken, reason in [
            (DEFAULT.replace("runs = 2", "runs = -1"), "goal.runs"),
            (DEFAULT.replace('type = "duration"', 'type = "pace"', 1), "target type"),
            (DEFAULT.replace('counter = "runs"', 'counter = "nope"', 1), "unknown counter"),
            (DEFAULT.replace("[1, 5, 10, 25, 50, 100]", "[5, 1]", 1), "ascending"),
            (DEFAULT.replace('plan = "c25k"', 'plan = "missing"', 1), "unknown plan"),
            (DEFAULT.replace("Europe/Amsterdam", "Nope/Nope"), "timezone"),
            (DEFAULT.replace("start = 2026-10-26", "start = 2026-10-26T00:00:00"), "rules.start"),
            (DEFAULT.replace("from = 2026-10-26", "from = 2026-10-26T00:00:00", 1), "plan_history"),
            (DEFAULT.replace("merge_gap_min = 30", "merge_gap_min = inf"), "rules.merge_gap_min"),
            (DEFAULT.replace("per_min = { run = 1", "per_min = { run = nan"), "xp.per_min.run"),
            (DEFAULT.replace("[1, 5, 10, 25, 50, 100]", "[1, 1" + "0" * 400 + "]", 1), "thresholds"),
            ("not = [toml", "TOML"),
        ]:
            with self.subTest(reason=reason):
                with self.assertRaises(ConfigError) as e:
                    load_config(broken)
                self.assertIn(reason, str(e.exception))

    def test_malformed_entries_raise_config_error(self):
        head, rest = DEFAULT.split("[people.person1]")
        tail = rest[rest.index("# NHS"):]
        for broken in [
            head + "[people]\nperson1 = 5\n\n" + tail,                                   # scalar person
            DEFAULT.replace('[{ plan = "c25k", from = 2026-10-26 }]', "[5]", 1),      # scalar plan_history entry
            DEFAULT.replace('[["run", 60], ["walk", 90]]', "5", 1),                   # scalar intervals
        ]:
            with self.assertRaises(ConfigError):
                load_config(broken)

    def test_group_optional_and_pause_titles(self):
        cfg = load_config(DEFAULT)
        self.assertEqual(cfg["group"]["members"], ["person1", "person2"])
        self.assertEqual(pause_titles(cfg, "person1"), {"person 1", "both", "couple"})
        solo = load_config(ONE_PERSON)
        self.assertIsNone(solo["group"])
        self.assertEqual(pause_titles(solo, "person1"), {"person 1"})

    def test_bad_people_and_group_rejected(self):
        for broken, reason in [
            (DEFAULT.replace('members = ["person1", "person2"]', 'members = ["person1", "bob"]'), "group"),
            (DEFAULT.replace('members = ["person1", "person2"]', 'members = ["person1", "person1"]'), "group"),
            (DEFAULT.replace('name = "couple"', 'name = "person1"'), "group"),
            (DEFAULT.replace('name = "Person 1"', ''), "name"),
            (DEFAULT.replace("[people.person1]", "[people.Person1]").replace('"person1"', '"Person1"'), "id"),
        ]:
            with self.subTest(reason=reason):
                with self.assertRaises(ConfigError) as e:
                    load_config(broken)
                self.assertIn(reason, str(e.exception))


PEOPLE = ("person1", "person2")
GOOD = {"history": [{"from": "2026-10-26",
                     "people": {"person1": {"runs": 2, "workouts": 1, "active_days": 3, "steps": 10000}},
                     "couple": {"mode": "team", "together": 1, "team": 8, "reward": "Pizza night"}}]}


def _entry(**over):
    """GOOD's entry with one dotted field replaced, e.g. _entry(**{"couple.team": 43})."""
    e = json.loads(json.dumps(GOOD["history"][0]))
    for path, v in over.items():
        *parents, last = path.split(".")
        d = e
        for k in parents:
            d = d[k]
        d[last] = v
    return {"history": [e]}


class SettingsTests(unittest.TestCase):
    def test_spec_example_accepted(self):
        self.assertEqual(parse_settings(GOOD, PEOPLE), GOOD)
        self.assertEqual(parse_settings({"history": []}, PEOPLE), {"history": []})
        self.assertEqual(parse_settings(_entry(**{"couple.reward": ""}), PEOPLE)["history"][0]["couple"]["reward"], "")

    def test_unknown_person_dropped(self):
        obj = _entry()
        obj["history"][0]["people"]["ghost"] = {"runs": 1, "workouts": 1, "active_days": 1, "steps": 5000}
        self.assertEqual(parse_settings(obj, PEOPLE), GOOD)

    def test_each_limit_rejected(self):
        bad = {"runs 8": {"people.person1.runs": 8}, "runs -1": {"people.person1.runs": -1}, "runs float": {"people.person1.runs": 1.5},
               "runs bool": {"people.person1.runs": True}, "workouts 8": {"people.person1.workouts": 8},
               "active_days 8": {"people.person1.active_days": 8}, "steps 1000": {"people.person1.steps": 1000},
               "steps 31000": {"people.person1.steps": 31000}, "steps 10500": {"people.person1.steps": 10500},
               "together 0": {"couple.together": 0}, "together 4": {"couple.together": 4},
               "team 0": {"couple.team": 0}, "team 43": {"couple.team": 43},
               "reward 61": {"couple.reward": "x" * 61}, "reward number": {"couple.reward": 5},
               "mode": {"couple.mode": "all"}, "from Tuesday": {"from": "2026-10-27"}, "from junk": {"from": "soon"},
               "from number": {"from": 20261026}}
        for name, over in bad.items():
            with self.subTest(name), self.assertRaises(ValueError):
                parse_settings(_entry(**over), PEOPLE)
        self.assertEqual(parse_settings(_entry(**{"couple.reward": "x" * 60}), PEOPLE)["history"][0]["couple"]["reward"], "x" * 60)

    def test_shape_and_order_rejected(self):
        e1, e2 = GOOD["history"][0], {**GOOD["history"][0], "from": "2026-11-02"}
        for name, obj in {"list": [], "no history": {}, "history not list": {"history": {}}, "entry not object": {"history": [1]},
                          "unsorted": {"history": [e2, e1]}, "duplicate from": {"history": [e1, e1]}}.items():
            with self.subTest(name), self.assertRaises(ValueError):
                parse_settings(obj, PEOPLE)
        self.assertEqual(len(parse_settings({"history": [e1, e2]}, PEOPLE)["history"]), 2)


class StepsTests(unittest.TestCase):
    def test_parse_steps_drops_what_it_cannot_use(self):
        obj = {"person1": {"2026-10-26": 8412, "2026-10-27": 9000.9, "2026-10-28": "n/a", "2026-10-29": None,
                        "2026-10-30": True, "2026-10-31": -5, "nope": 5, "2026-02-30": 5, "26-10-26": 5},
               "ghost": {"2026-10-26": 1}, "person2": "x"}
        self.assertEqual(parse_steps(obj, PEOPLE), {"person1": {"2026-10-26": 8412, "2026-10-27": 9000}})
        with self.assertRaises(ValueError):
            parse_steps([], PEOPLE)


if __name__ == "__main__":
    unittest.main()
