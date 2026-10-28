import unittest
from datetime import date

from custom_components.fitbridge.engine.scoring import max_hr, score
from custom_components.fitbridge.engine.scoring_config import ConfigError, load_config, parse_settings
from .test_config import DEFAULT, ONE_PERSON
from .test_scoring import NOW, wk

CFG = load_config(ONE_PERSON.replace("[people.person1]", "[people.p1]"))  # a synthetic id
TODAY = date(2026, 10, 28)
BORN = TODAY.year - 40  # 40 years old: 208 - 0.7 x 40 = 180
PEOPLE = ("p1", "p2")
AGE_40 = {"history": [], "profiles": {"p1": {"birth_year": BORN}}}


def cardio(minutes=30, **kw):
    """A cycling workout (a home kind with the effort check, 20 min) on Monday."""
    return wk("p1", "home", 0, 18, 0, minutes, min_min=20, effort=True, **kw)


def feed_row(ws, settings=AGE_40, uncounted=None):
    res = score({"p1": ws}, [], CFG, NOW(1), settings=settings, uncounted=uncounted)
    return res["people"]["p1"]


class MaxHrTests(unittest.TestCase):
    def test_estimate(self):
        self.assertEqual(max_hr([], BORN, TODAY, CFG), {"bpm": 180, "source": "estimate", "date": None})

    def test_measured_higher(self):
        run = wk("p1", "run", 0, 18, 0, 30, max_hr=186, avg_hr=150)
        self.assertEqual(max_hr([run], BORN, TODAY, CFG), {"bpm": 186, "source": "measured", "date": "2026-10-26"})

    def test_measured_below_estimate_keeps_estimate(self):
        run = wk("p1", "run", 0, 18, 0, 30, max_hr=170, avg_hr=150)
        self.assertEqual(max_hr([run], BORN, TODAY, CFG)["source"], "estimate")

    def test_spike_rejected(self):
        walk = wk("p1", "walk", 0, 18, 0, 30, max_hr=190, avg_hr=100)
        self.assertEqual(max_hr([walk], BORN, TODAY, CFG)["bpm"], 180)

    def test_measured_alone_without_birth_year(self):
        run = wk("p1", "run", 0, 18, 0, 30, max_hr=186, avg_hr=150)
        self.assertEqual(max_hr([run], None, TODAY, CFG)["bpm"], 186)

    def test_no_birth_year_no_hr(self):
        self.assertIsNone(max_hr([wk("p1", "run", 0, 18, 0, 30)], None, TODAY, CFG))
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
        yoga = feed_row([wk("p1", "home", 0, 18, 0, 12, min_min=15, effort=False)])
        self.assertEqual((yoga["feed"][0]["counts"], yoga["feed"][0]["reason"], yoga["feed"][0]["xp"]), (False, "short", 12))
        self.assertEqual(yoga["week"]["workouts"], 0)

    def test_walk_and_manual_defaults(self):
        walk = feed_row([wk("p1", "walk", 0, 18, 0, 30, min_min=None)])
        self.assertEqual((walk["feed"][0]["counts"], walk["feed"][0]["reason"]), (True, None))
        manual = feed_row([wk("p1", "gym", 0, 18, 0, 25, source="manual", min_min=None)])  # rules.min_gym_min = 20
        self.assertEqual(manual["week"]["workouts"], 1)

    def test_uncounted_in_feed(self):
        golf = wk("p1", "gym", 1, 9, 0, 120, name="Golf")
        golf["kind"] = None
        ws = [cardio(avg_hr=120, max_hr=180)]
        base = feed_row(ws)
        res = feed_row(ws, uncounted={"p1": [golf]})
        row = next(w for w in res["feed"] if w["key"] == golf["key"])
        self.assertEqual((row["xp"], row["counts"], row["reason"], row["kind"], row["name"]), (0, False, "type", None, "Golf"))
        self.assertNotIn(golf["key"], [w["key"] for w in res["recent"]])  # `recent` drives the HA Recent sensor
        for k in ("xp", "week", "badges", "pbs", "streak", "level", "plan", "recent"):
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
        ok = parse_settings({"history": [], "profiles": {"p1": {"birth_year": BORN}, "ghost": {"birth_year": BORN + 4}}}, PEOPLE)
        self.assertEqual(ok, {"history": [], "profiles": {"p1": {"birth_year": BORN}}})
        for year in (1899, date.today().year + 1, str(BORN), True, None):
            with self.subTest(year), self.assertRaises(ValueError):
                parse_settings({"history": [], "profiles": {"p1": {"birth_year": year}}}, PEOPLE)
        with self.assertRaises(ValueError):
            parse_settings({"history": [], "profiles": []}, PEOPLE)
        self.assertEqual(parse_settings({"history": []}, PEOPLE), {"history": []})
