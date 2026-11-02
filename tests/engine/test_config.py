import json
import tomllib
import unittest
from datetime import date
from pathlib import Path

from custom_components.fitbridge.engine.scoring_config import COUNTERS, ConfigError, check_plan, load_config, parse_settings, parse_steps, pause_titles, plan_sessions

from . import LEGACY_PEOPLE, ONE, TWO, overlay

DEFAULT = (Path(__file__).parents[2] / "custom_components" / "fitbridge" / "engine" / "scoring.toml").read_text()


# The shipped plans win by id, so a test that edits a plan edits this renamed copy of c25k.
OWN = DEFAULT.replace("plans.c25k", "plans.own")
LEGACY = OWN + LEGACY_PEOPLE  # a copy that still has its own people: the TOML's checks keep applying


MY_PLAN = {"name": "Mine", "weeks": [{"sessions": [{"warmup_s": 300, "target": {"type": "none"}}]}]}


class ConfigTests(unittest.TestCase):
    def test_default_loads_and_c25k_totals(self):
        cfg = load_config(DEFAULT, TWO)
        s = plan_sessions(cfg, "c25k")
        self.assertEqual(len(s), 27)
        self.assertEqual((s[0]["week"], s[0]["day"], s[0]["total_s"]), (1, 1, 1500))
        self.assertEqual(s[14]["total_s"], 300 + 1200)        # W5D3
        self.assertEqual(s[15]["total_s"], 300 + 1440)        # W6D1: 5+3+8+3+5 min
        self.assertEqual(s[26]["total_s"], 300 + 1800)        # W9D3
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 2, "active_days": 0, "steps": 10000})

    def test_cooldown_default_and_total(self):
        s = plan_sessions(load_config(DEFAULT, TWO), "c25k")
        self.assertEqual({x["cooldown_s"] for x in s}, {300})
        self.assertEqual(s[0]["total_s"], 1500)
        cfg = load_config(OWN.replace("cooldown_s = 300, ", "", 1), TWO)
        self.assertEqual(plan_sessions(cfg, "own")[0]["cooldown_s"], 0)
        self.assertEqual(plan_sessions(cfg, "own")[0]["total_s"], 1500)

    def test_cooldown_negative_rejected(self):
        for bad in ("-1", '"x"'):
            with self.subTest(bad=bad), self.assertRaisesRegex(ConfigError, r"cooldown_s must be a number >= 0"):
                load_config(OWN.replace("cooldown_s = 300", f"cooldown_s = {bad}", 1), TWO)

    def test_plan_sessions_steps_times(self):
        w1 = plan_sessions(load_config(DEFAULT, TWO), "c25k")[0]
        self.assertEqual((w1["steps"], w1["times"]), ([("run", 60), ("walk", 90)], 8))

    def test_goal_defaults_and_gym_alias(self):
        cfg = load_config(DEFAULT.replace("workouts = 2", "gym = 1"), TWO)
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 1, "active_days": 0, "steps": 10000})
        cfg = load_config(DEFAULT.replace("active_days = 0\nsteps = 10000\n", ""), TWO)
        self.assertEqual(cfg["people"]["person1"]["goal"], {"runs": 2, "workouts": 2, "active_days": 0, "steps": 10000})
        with self.assertRaisesRegex(ConfigError, "not both"):
            load_config(DEFAULT.replace("workouts = 2", "workouts = 2\ngym = 2"), TWO)

    def test_goal_zero_allowed_negative_not(self):
        load_config(DEFAULT.replace("runs = 2\nworkouts = 2", "runs = 0\nworkouts = 0"), TWO)
        for bad in ("runs = -1\nworkouts = 2", "runs = 2\nworkouts = 2.5", "runs = 2\nworkouts = 2\nsteps = 1000"):
            with self.subTest(bad=bad), self.assertRaises(ConfigError):
                load_config(DEFAULT.replace("runs = 2\nworkouts = 2", bad), TWO)

    def test_home_minimum_and_xp_required(self):  # min_home_min and xp.active_day are POSITIVE keys
        with self.assertRaisesRegex(ConfigError, "min_home_min"):
            load_config(DEFAULT.replace("min_home_min = 15\n", ""), TWO)
        with self.assertRaisesRegex(ConfigError, "xp.active_day"):
            load_config(DEFAULT.replace("active_day = 15\n", ""), TWO)

    def test_home_and_active_day_badges_load(self):
        ids = {b["id"] for b in load_config(DEFAULT, TWO)["badges"]}
        self.assertLessEqual({"home", "active_days"}, ids)

    def test_every_badge_uses_a_known_counter(self):
        for b in load_config(DEFAULT, TWO)["badges"]:
            self.assertIn(b["counter"], COUNTERS)

    def test_invalid_configs_are_rejected_with_reasons(self):
        for broken, reason in [
            (LEGACY.replace("runs = 2", "runs = -1"), "goal.runs"),
            (LEGACY.replace('type = "duration"', 'type = "pace"', 1), "target type"),
            (LEGACY.replace('counter = "runs"', 'counter = "nope"', 1), "unknown counter"),
            (LEGACY.replace("[1, 5, 10, 25, 50, 100]", "[5, 1]", 1), "ascending"),
            (LEGACY.replace('plan = "c25k"', 'plan = "missing"', 1), "unknown plan"),
            (LEGACY.replace("Europe/Amsterdam", "Nope/Nope"), "timezone"),
            (LEGACY.replace("start = 2026-10-26", "start = 2026-10-26T00:00:00"), "rules.start"),
            (LEGACY.replace("from = 2026-10-26", "from = 2026-10-26T00:00:00", 1), "plan_history"),
            (LEGACY.replace("merge_gap_min = 30", "merge_gap_min = inf"), "rules.merge_gap_min"),
            (LEGACY.replace("per_min = { run = 1", "per_min = { run = nan"), "xp.per_min.run"),
            (LEGACY.replace("[1, 5, 10, 25, 50, 100]", "[1, 1" + "0" * 400 + "]", 1), "thresholds"),
            ("not = [toml", "TOML"),
        ]:
            with self.subTest(reason=reason):
                with self.assertRaises(ConfigError) as e:
                    load_config(broken)
                self.assertIn(reason, str(e.exception))

    def test_malformed_entries_raise_config_error(self):
        for broken in [
            DEFAULT + "[people]\nperson1 = 5\n",                                     # scalar person
            LEGACY.replace('[{ plan = "c25k", from = 2026-10-26 }]', "[5]", 1),      # scalar plan_history entry
            LEGACY.replace('[["run", 60], ["walk", 90]]', "5", 1),                   # scalar intervals
        ]:
            with self.assertRaises(ConfigError):
                load_config(broken)

    def test_group_optional_and_pause_titles(self):
        cfg = load_config(DEFAULT, TWO)
        self.assertEqual(cfg["group"]["members"], ["person1", "person2"])
        self.assertEqual(pause_titles(cfg, "person1"), {"person 1", "both", "couple"})
        solo = load_config(DEFAULT, ONE)
        self.assertIsNone(solo["group"])
        self.assertEqual(pause_titles(solo, "person1"), {"person 1"})

    def test_bad_people_and_group_rejected(self):
        for broken, reason in [
            (LEGACY.replace('members = ["person1", "person2"]', 'members = ["person1", "bob"]'), "group"),
            (LEGACY.replace('members = ["person1", "person2"]', 'members = ["person1", "person1"]'), "group"),
            (LEGACY.replace('name = "couple"', 'name = "person1"'), "group"),
            (LEGACY.replace('name = "Person 1"', ''), "name"),
            (LEGACY.replace("[people.person1]", "[people.Person1]").replace('"person1"', '"Person1"'), "id"),
        ]:
            with self.subTest(reason=reason):
                with self.assertRaises(ConfigError) as e:
                    load_config(broken)
                self.assertIn(reason, str(e.exception))

    def test_default_toml_has_no_people(self):
        raw = tomllib.loads(DEFAULT)
        self.assertNotIn("people", raw)
        self.assertNotIn("group", raw)
        with self.assertRaisesRegex(ConfigError, r"missing table \[people\]"):
            load_config(DEFAULT)

    def test_overlay_replaces_people_group_start_and_timezone(self):
        cfg = load_config(DEFAULT, overlay(("person1",), start="2026-11-01", timezone="Europe/London"))
        self.assertEqual(cfg["people"].keys(), {"person1"})
        self.assertIsNone(cfg["group"])
        self.assertEqual(cfg["rules"]["start"], date(2026, 11, 1))
        self.assertEqual(cfg["rules"]["timezone"], "Europe/London")
        self.assertEqual(cfg["people"]["person1"]["plan_history"][0]["from"], date(2026, 11, 1))

    def test_overlay_still_validated(self):
        with self.assertRaises(ConfigError) as e:
            load_config(DEFAULT, overlay(("Bad Id",)))
        self.assertIn("id must match", str(e.exception))

    def test_person_without_plan_is_valid(self):
        ov = overlay(("person1", "person2"))
        ov["people"]["person1"]["plan_history"] = []
        del ov["people"]["person2"]["plan_history"]
        cfg = load_config(DEFAULT, ov)
        self.assertEqual([cfg["people"][p]["plan_history"] for p in ("person1", "person2")], [[], []])

    def test_overlay_is_not_modified(self):
        ov = overlay()
        load_config(DEFAULT, ov)
        self.assertEqual(ov, overlay())

    def test_session_note_loop_and_source_validate(self):
        plan = {**MY_PLAN, "loop": True, "source": "https://example.org/p"}
        plan["weeks"] = [{"sessions": [{**MY_PLAN["weeks"][0]["sessions"][0], "note": "easy"}]}]
        cfg = load_config(DEFAULT, {**TWO, "plans": {"my_x": plan}})
        self.assertEqual(plan_sessions(cfg, "my_x")[0]["note"], "easy")
        self.assertIsNone(plan_sessions(cfg, "c25k")[0]["note"])

    def test_bad_note_loop_source_name_are_errors(self):
        session = MY_PLAN["weeks"][0]["sessions"][0]
        for field, plan in {
            "note": {**MY_PLAN, "weeks": [{"sessions": [{**session, "note": "x" * 81}]}]},
            "loop": {**MY_PLAN, "loop": "yes"},
            "source": {**MY_PLAN, "source": "http://x"},
            "name": {**MY_PLAN, "name": ""},
        }.items():
            with self.subTest(field), self.assertRaisesRegex(ConfigError, field):
                load_config(DEFAULT, {**TWO, "plans": {"my_x": plan}})

    def test_check_plan_returns_errors_of_one_plan(self):
        self.assertEqual(check_plan(MY_PLAN), [])
        self.assertNotEqual(check_plan({"name": "X", "weeks": []}), [])
        self.assertTrue(all(e.startswith("plan") for e in check_plan({"name": "X", "weeks": []})))

    def test_start_week_validates(self):
        def history(**h):
            ov = overlay()
            ov["people"]["person1"]["plan_history"][0].update(h)
            return ov
        self.assertEqual(load_config(DEFAULT, history(start_week=2))["people"]["person1"]["plan_history"][0]["start_week"], 2)
        for bad in (0, 10, True, "2"):  # c25k has 9 weeks
            with self.subTest(bad=bad), self.assertRaisesRegex(ConfigError, "start_week"):
                load_config(DEFAULT, history(start_week=bad))

    def test_badge_plan_must_be_known(self):
        badge = DEFAULT + "\n[[badges]]\nid = 'b'\ncounter = 'plan_weeks'\nthresholds = [1]\ntitle = 'B {t}'\nicon = 'mdi:x'\ncategory = 'plan'\n"
        load_config(badge + "plan = 'c25k'\n", TWO)
        with self.assertRaisesRegex(ConfigError, "unknown plan"):
            load_config(badge + "plan = 'nope'\n", TWO)

    def test_badge_plan_only_on_plan_weeks(self):
        badge = DEFAULT + "\n[[badges]]\nid = 'b'\ncounter = 'runs'\nplan = 'c25k'\nthresholds = [1]\ntitle = 'B {t}'\nicon = 'mdi:x'\ncategory = 'plan'\n"
        with self.assertRaisesRegex(ConfigError, "badge b: plan"):
            load_config(badge, TWO)

    def test_wrong_shaped_plans_or_badges_are_config_errors(self):
        for text in ("plans = 5\n", "badges = 5\n"):
            with self.subTest(text), self.assertRaisesRegex(ConfigError, "malformed config"):
                load_config(text, TWO)

    def test_shipped_plans_win_over_the_users_copy(self):
        text = (DEFAULT.replace('name = "Couch to 5K"', 'name = "Mine"') + "\n[plans.extra]\nname = 'Extra'\n"
                "[[plans.extra.weeks]]\nsessions = [{ warmup_s = 0, target = { type = 'none' } }]\n")
        plans = load_config(text, TWO)["plans"]
        self.assertEqual(plans["c25k"]["name"], "Couch to 5K")
        self.assertIn("extra", plans)  # Task 3 adds: "higdon_10k" in plans

    def test_shipped_plan_badges_replace_the_users(self):
        text = DEFAULT.replace('title = "C25K week {t}"', 'title = "Old {t}"')
        badges = {b["id"]: b for b in load_config(text, TWO)["badges"]}
        self.assertEqual(badges["plan_week"]["title"], "C25K week {t}")
        text = text.replace('id = "plan_week"', 'id = "plan_week_gone"')  # a user copy without the shipped id: it is added
        self.assertIn("plan_week", {b["id"] for b in load_config(text, TWO)["badges"]})

    def test_overlay_plans_are_merged(self):
        cfg = load_config(DEFAULT, {**TWO, "plans": {"my_x": MY_PLAN}})
        self.assertIn("my_x", cfg["plans"])
        self.assertIn("c25k", cfg["plans"])


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
