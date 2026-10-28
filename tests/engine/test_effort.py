import unittest
from datetime import date

from custom_components.fitbridge.engine.scoring import max_hr, score
from custom_components.fitbridge.engine.scoring_config import ConfigError, load_config, parse_settings
from .test_config import DEFAULT
from .test_scoring import CFG, NOW, wk

TODAY = date(2026, 10, 28)
PEOPLE = ("person1", "person2")
AGE_40 = {"history": [], "profiles": {"person1": {"birth_year": 1986}}}  # 2026 - 1986 = 40: 208 - 28 = 180


def cardio(minutes=30, **kw):
    """A cycling workout (a home kind with the effort check, 20 min) on Monday."""
    return wk("person1", "home", 0, 18, 0, minutes, min_min=20, effort=True, **kw)


def feed_row(ws, settings=AGE_40, uncounted=None):
    res = score({"person1": ws}, [], CFG, NOW(1), settings=settings, uncounted=uncounted)
    return res["people"]["person1"]


class MaxHrTests(unittest.TestCase):
    def test_estimate(self):
        self.assertEqual(max_hr([], 1986, TODAY, CFG), {"bpm": 180, "source": "estimate", "date": None})

    def test_measured_higher(self):
        run = wk("person1", "run", 0, 18, 0, 30, max_hr=186, avg_hr=150)
        self.assertEqual(max_hr([run], 1986, TODAY, CFG), {"bpm": 186, "source": "measured", "date": "2026-10-26"})

    def test_measured_below_estimate_keeps_estimate(self):
        run = wk("person1", "run", 0, 18, 0, 30, max_hr=170, avg_hr=150)
        self.assertEqual(max_hr([run], 1986, TODAY, CFG)["source"], "estimate")

    def test_spike_rejected(self):
        walk = wk("person1", "walk", 0, 18, 0, 30, max_hr=190, avg_hr=100)
        self.assertEqual(max_hr([walk], 1986, TODAY, CFG)["bpm"], 180)

    def test_measured_alone_without_birth_year(self):
        run = wk("person1", "run", 0, 18, 0, 30, max_hr=186, avg_hr=150)
        self.assertEqual(max_hr([run], None, TODAY, CFG)["bpm"], 186)

    def test_no_birth_year_no_hr(self):
        self.assertIsNone(max_hr([wk("person1", "run", 0, 18, 0, 30)], None, TODAY, CFG))
        week = feed_row([cardio(avg_hr=100, max_hr=180)], settings=None)
        self.assertIsNone(week["max_hr"])
        self.assertEqual(week["week"]["workouts"], 1)  # effort check not applied: 100 would be too easy


class EffortTests(unittest.TestCase):
    def test_effort(self):
        hard = feed_row([cardio(avg_hr=120, max_hr=180)])
        self.assertEqual(hard["max_hr"]["bpm"], 180)
        self.assertEqual(hard["week"]["workouts"], 1)
        self.assertEqual((hard["feed"][0]["counts"], hard["feed"][0]["reason"]), (True, None))
        easy = feed_row([cardio(avg_hr=100, max_hr=180)])
        self.assertEqual(easy["week"]["workouts"], 0)
        self.assertEqual((easy["feed"][0]["counts"], easy["feed"][0]["reason"], easy["feed"][0]["xp"]), (False, "easy", 30))
        none = feed_row([cardio()])
        self.assertEqual((none["week"]["workouts"], none["feed"][0]["counts"]), (1, True))

    def test_short_label(self):
        yoga = feed_row([wk("person1", "home", 0, 18, 0, 12, min_min=15, effort=False)])
        self.assertEqual((yoga["feed"][0]["counts"], yoga["feed"][0]["reason"], yoga["feed"][0]["xp"]), (False, "short", 12))
        self.assertEqual(yoga["week"]["workouts"], 0)

    def test_walk_and_manual_defaults(self):
        walk = feed_row([wk("person1", "walk", 0, 18, 0, 30, min_min=None)])
        self.assertEqual((walk["feed"][0]["counts"], walk["feed"][0]["reason"]), (True, None))
        manual = feed_row([wk("person1", "gym", 0, 18, 0, 25, source="manual", min_min=None)])  # rules.min_gym_min = 20
        self.assertEqual(manual["week"]["workouts"], 1)

    def test_uncounted_in_feed(self):
        golf = wk("person1", "gym", 1, 9, 0, 120, name="Golf")
        golf["kind"] = None
        base = feed_row([cardio(avg_hr=120, max_hr=180)])
        res = feed_row([cardio(avg_hr=120, max_hr=180)], uncounted={"person1": [golf]})
        row = next(w for w in res["feed"] if w["key"] == golf["key"])
        self.assertEqual((row["xp"], row["counts"], row["reason"], row["kind"], row["name"]), (0, False, "type", None, "Golf"))
        self.assertIn(golf["key"], [w["key"] for w in res["recent"]])
        for k in ("xp", "week", "badges", "pbs", "streak", "level", "plan"):
            self.assertEqual(res[k], base[k], k)


class ConfigTests(unittest.TestCase):
    def test_defaults_when_absent(self):
        text = "".join(l for l in DEFAULT.splitlines(keepends=True) if not l.startswith(("effort_hr_pct", "max_hr_fit_pct")))
        rules = load_config(text)["rules"]
        self.assertEqual((rules["effort_hr_pct"], rules["max_hr_fit_pct"]), (60, 70))
        self.assertEqual(load_config(DEFAULT.replace("effort_hr_pct = 60", "effort_hr_pct = 50"))["rules"]["effort_hr_pct"], 50)
        with self.assertRaisesRegex(ConfigError, "max_hr_fit_pct"):
            load_config(DEFAULT.replace("max_hr_fit_pct = 70", 'max_hr_fit_pct = "x"'))

    def test_profiles_validation(self):
        ok = parse_settings({"history": [], "profiles": {"person1": {"birth_year": 1986}, "ghost": {"birth_year": 1990}}}, PEOPLE)
        self.assertEqual(ok, {"history": [], "profiles": {"person1": {"birth_year": 1986}}})
        for year in (1899, date.today().year + 1, "1986", True, None):
            with self.subTest(year), self.assertRaises(ValueError):
                parse_settings({"history": [], "profiles": {"person1": {"birth_year": year}}}, PEOPLE)
        with self.assertRaises(ValueError):
            parse_settings({"history": [], "profiles": []}, PEOPLE)
        self.assertEqual(parse_settings({"history": []}, PEOPLE), {"history": []})
