"""Entity and event data for HA, checked against the recorded MQTT discovery output (tests/fixtures/mqtt_discovery.json)."""
import json
import unittest

from custom_components.fitbridge.engine.entities import (EVENT_ENTITIES, EVENTS, GROUP_SENSORS, MEASURED, PERSON_SENSORS,
                                                         WORKOUT_FIELDS)
from custom_components.fitbridge.engine.scoring import score
from .discovery_fixture import FIXTURE, P1, P2, build
from .test_scoring import CFG, NOW, SOLO, wk

G = CFG["group"]["name"]
FIX = json.loads(FIXTURE.read_text(encoding="utf-8"))
MSGS = {t: p for t, p, r in FIX["messages"]}
RESULT = FIX["scores"]


def no_url(value):
    """The recorded payload without Endurain links (the integration has none)."""
    if isinstance(value, dict):
        return {k: no_url(v) for k, v in value.items() if k != "url"}
    if isinstance(value, list):
        return [no_url(v) for v in value]
    return value


def sensors():
    """(owner id, subject, key, spec) for every sensor of the fixture's result."""
    for p, r in RESULT["people"].items():
        yield from ((p, r, k, s) for k, s in PERSON_SENSORS.items())
    g = RESULT["group"]
    yield from ((g["id"], g, k, s) for k, s in GROUP_SENSORS.items())


class FixtureTests(unittest.TestCase):
    def test_fixture_is_reproducible(self):
        result, badges, workouts, records = build()
        for r in result["people"].values():  # newer than the recorded capture (not regenerated); counts/reason DO appear in the `recent` attribute payload
            r.pop("max_hr")
            r.pop("older")
            for w in r["recent"] + r["feed"]:
                del w["counts"], w["reason"]
        self.assertEqual(result, RESULT)
        events = [json.loads(p) for t, p, r in FIX["messages"] if not r]
        self.assertEqual([(e["event_type"], e["person"]) for e in events],
                         [("badge_unlocked", P1), ("workout_scored", P1), ("record_set", P1)])
        self.assertEqual(len(badges) + len(workouts) + len(records), len(events))

    def test_states_attributes_and_configs_match_mqtt(self):
        for owner, subject, key, (label, icon, unit, state, attrs) in sensors():
            with self.subTest(owner=owner, key=key):
                base = f"fitbridge/{owner}/{key}"
                self.assertEqual(str(state(subject)), MSGS[f"{base}/state"])
                self.assertEqual(attrs(subject), no_url(json.loads(MSGS[f"{base}/attributes"])))
                cfg = json.loads(MSGS[f"homeassistant/sensor/fit_{owner}_{key}/config"])
                self.assertEqual((cfg["name"], cfg["icon"], cfg.get("unit_of_measurement")), (label, icon, unit))
                self.assertEqual(cfg.get("state_class"), "measurement" if unit in MEASURED else None)

    def test_events_match_mqtt(self):
        _, badges, workouts, records = build()
        items = {"badge_unlocked": badges, "workout_scored": workouts, "record_set": records}
        recorded = [json.loads(p) for t, p, r in FIX["messages"] if not r]
        built = [EVENTS[t](p, item) for t in EVENTS for p, item in items[t]]
        self.assertEqual(built, recorded)
        self.assertEqual([tuple(e) for e in built], [tuple(e) for e in recorded])  # same key order too
        for t, (name, icon) in EVENT_ENTITIES.items():
            cfg = json.loads(MSGS[f"homeassistant/event/fit_{t}/config"])
            self.assertEqual((cfg["name"], cfg["icon"], cfg["event_types"]), (name, icon, [t]))


class EntityTests(unittest.TestCase):
    def test_contract_keys(self):
        self.assertEqual(set(PERSON_SENSORS), {"xp", "week", "streak_weeks", "plan", "badges", "pbs", "recent"})
        self.assertEqual(set(GROUP_SENSORS), {"streak_weeks", "week", "month"})
        self.assertEqual(set(EVENTS), set(EVENT_ENTITIES))
        self.assertEqual(set(EVENTS), {"badge_unlocked", "workout_scored", "record_set"})
        self.assertEqual(WORKOUT_FIELDS, ("kind", "minutes", "km", "xp", "plan", "joint"))

    def test_no_sensor_carries_the_older_feed(self):
        old = wk("person1", "gym", 0, 18, 0, 26)
        old["kind"] = None                                               # uncounted: in the feed and `older`, never in `recent`
        res = score({"person1": [], "person2": []}, [], CFG, NOW(120), uncounted={"person1": [old]})
        self.assertEqual([i["key"] for i in res["people"]["person1"]["older"]], [old["key"]])
        for key, (_, _, _, state, attrs) in PERSON_SENSORS.items():
            self.assertNotIn(old["key"], json.dumps([state(res["people"]["person1"]), attrs(res["people"]["person1"])]), key)

    def test_recent_attributes_have_no_url(self):
        r1 = RESULT["people"][P1]
        self.assertTrue(r1["recent"] and all("url" in w for w in r1["recent"]))
        workouts = PERSON_SENSORS["recent"][4](r1)["workouts"]
        self.assertEqual(len(workouts), PERSON_SENSORS["recent"][3](r1))
        self.assertFalse(any("url" in w for w in workouts))

    def test_pbs_attributes_have_no_url(self):
        run = {"seconds": 300, "date": "2026-10-27", "key": "f9"}
        r1 = {**RESULT["people"][P1], "pbs": {**RESULT["people"][P1]["pbs"], "fastest_1k": {**run, "url": "https://e.test/1"}}}
        self.assertEqual(PERSON_SENSORS["pbs"][4](r1)["fastest_1k"], run)

    def test_pbs_sensor_attributes_leave_out_the_growing_lifts_list(self):
        r1 = {**RESULT["people"][P1], "pbs": {**RESULT["people"][P1]["pbs"], "lifts": [{"id": "0118", "w": 70, "r": 5}]}}
        attrs = PERSON_SENSORS["pbs"][4](r1)
        self.assertNotIn("lifts", attrs)
        self.assertIn("longest_session_km", attrs)

    def test_week_attributes_list_and_couple_week_state(self):
        r1 = RESULT["people"][P1]
        attrs = PERSON_SENSORS["week"][4](r1)
        self.assertEqual(tuple(attrs), ("week", "runs", "workouts", "active_days", "bonus", "goal", "last_week",
                                        "goal_met", "paused", "days_left"))
        self.assertEqual((attrs["goal"], attrs["last_week"]), (r1["week"]["goal"], r1["week"]["last_week"]))
        week = RESULT["group"]["week"]
        state = GROUP_SENSORS["week"][3]
        self.assertEqual(state(RESULT["group"]), "on" if week["met"] else "off")
        self.assertEqual(state({**RESULT["group"], "week": {**week, "met": not week["met"]}}), "off" if week["met"] else "on")
        self.assertEqual(GROUP_SENSORS["week"][2], None)

    def test_one_person_household_has_no_group(self):
        (S1,) = SOLO["people"]
        self.assertIsNone(score({S1: []}, [], SOLO, NOW(1))["group"])
        self.assertEqual(len(PERSON_SENSORS) + len(EVENTS), 10)
        self.assertNotIn(P2, SOLO["people"])


if __name__ == "__main__":
    unittest.main()
