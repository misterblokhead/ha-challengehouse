import json
import unittest

from custom_components.fitbridge.engine.publish import RECORD_TOPIC, SCORES_TOPIC, discovery_messages, scores_message
from custom_components.fitbridge.engine.scoring import score
from .test_scoring import CFG, NOW, SOLO, week_of, wk

P1, P2 = CFG["people"]                      # derived from the loaded config, never hardcoded
G = CFG["group"]["name"]
SAMPLE_RESULT = score({P1: [dict(w, person=P1) for w in week_of(0)] + [wk(P1, "run", 3, 8, 0, 20, km=2.5)], P2: []},
                      [], CFG, NOW(6))


class PublishTests(unittest.TestCase):
    def test_contract_entities_and_expire(self):
        msgs = discovery_messages(SAMPLE_RESULT, [])
        configs = {t: json.loads(p) for t, p, r in msgs if t.endswith("/config")}
        expected = {f"sensor.fit_{p}_{k}" for p in (P1, P2) for k in
                    ("xp", "week", "streak_weeks", "plan", "badges", "pbs", "recent")} | \
                   {f"sensor.fit_{G}_streak_weeks", f"sensor.fit_{G}_week", f"sensor.fit_{G}_month", "event.fit_badge_unlocked", "event.fit_workout_scored", "event.fit_record_set"}
        self.assertEqual({c["default_entity_id"] for c in configs.values()}, expected)
        self.assertTrue(all(c.get("expire_after") == 1200 for t, c in configs.items() if "/sensor/" in t))
        self.assertTrue(all(r for t, p, r in msgs if t.endswith(("/config", "/state", "/attributes"))))

    def test_states_attributes_and_devices(self):
        msgs = {t: p for t, p, r in discovery_messages(SAMPLE_RESULT, [])}
        r1 = SAMPLE_RESULT["people"][P1]
        self.assertEqual(msgs[f"fitbridge/{P1}/xp/state"], str(r1["xp"]))
        self.assertEqual(msgs[f"fitbridge/{P1}/week/state"], str(r1["week"]["progress"]))
        self.assertEqual(json.loads(msgs[f"fitbridge/{P1}/xp/attributes"])["level"], r1["level"])
        self.assertEqual(len(json.loads(msgs[f"fitbridge/{P1}/recent/attributes"])["workouts"]), int(msgs[f"fitbridge/{P1}/recent/state"]))
        cfg = json.loads(msgs[f"homeassistant/sensor/fit_{P1}_xp/config"])
        self.assertEqual((cfg["unit_of_measurement"], cfg["state_class"]), ("XP", "measurement"))
        self.assertEqual(cfg["device"]["name"], f"Fitness {r1['name']}")
        self.assertEqual(cfg["name"], "XP")  # HA prefixes the device name: "Fitness <name> XP"
        grp = json.loads(msgs[f"homeassistant/sensor/fit_{G}_month/config"])
        self.assertEqual(grp["device"], {"identifiers": [f"fitbridge_{G}"], "name": f"Fitness {G.capitalize()}", "manufacturer": "fitbridge"})
        self.assertIn("km_together", json.loads(msgs[f"fitbridge/{G}/month/attributes"]))

    def test_pbs_sensor_attributes_leave_out_the_growing_lifts_list(self):
        result = {**SAMPLE_RESULT, "people": {**SAMPLE_RESULT["people"], P1: {**SAMPLE_RESULT["people"][P1], "pbs": {
            **SAMPLE_RESULT["people"][P1]["pbs"], "lifts": [{"id": "0118", "w": 70, "r": 5}], "fastest_1k": None}}}}
        msgs = {t: p for t, p, r in discovery_messages(result, [])}
        attrs = json.loads(msgs[f"fitbridge/{P1}/pbs/attributes"])
        self.assertNotIn("lifts", attrs)
        self.assertIn("longest_session_km", attrs)

    def test_announced_badge_is_one_non_retained_event(self):
        b = {"id": "runs_1", "title": "First Steps", "icon": "mdi:run", "category": "running"}
        ev = [m for m in discovery_messages(SAMPLE_RESULT, [(P1, b)]) if m[0] == "fitbridge/badge_unlocked"]
        self.assertEqual(len(ev), 1)
        self.assertFalse(ev[0][2])
        self.assertEqual(json.loads(ev[0][1])["person"], P1)

    def test_scores_message_is_retained_json(self):
        topic, payload, retain = scores_message(SAMPLE_RESULT)
        self.assertEqual((topic, retain), (SCORES_TOPIC, True))
        self.assertEqual(topic, "fitbridge/scores")
        self.assertEqual(json.loads(payload), json.loads(json.dumps(SAMPLE_RESULT)))

    def test_workout_event_config_and_messages(self):
        feed = SAMPLE_RESULT["people"][P1]["feed"]
        self.assertGreaterEqual(len(feed), 2)
        msgs = discovery_messages(SAMPLE_RESULT, [], [(P1, feed[0]), (P2, feed[1])])
        cfg = json.loads(next(p for t, p, r in msgs if t == "homeassistant/event/fit_workout_scored/config"))
        self.assertEqual((cfg["name"], cfg["unique_id"], cfg["default_entity_id"], cfg["event_types"], cfg["icon"], cfg["state_topic"]),
                         ("Workout scored", "fit_workout_scored", "event.fit_workout_scored", ["workout_scored"], "mdi:run",
                          "fitbridge/workout_scored"))
        self.assertEqual(cfg["device"], {"identifiers": ["fitbridge"], "name": "Fitness", "manufacturer": "fitbridge"})
        ev = [m for m in msgs if m[0] == "fitbridge/workout_scored"]
        self.assertEqual(len(ev), 2)
        self.assertFalse(any(r for t, p, r in ev))
        want = ("event_type", "person", "key", "kind", "minutes", "km", "xp", "plan", "joint")
        for (t, p, r), (who, item) in zip(ev, [(P1, feed[0]), (P2, feed[1])]):
            d = json.loads(p)
            self.assertEqual(tuple(d), want)
            self.assertEqual(d, {"event_type": "workout_scored", "person": who, **{k: item[k] for k in want[2:]}})

    def test_week_attributes_have_goal_and_last_week(self):
        r1 = SAMPLE_RESULT["people"][P1]
        attrs = json.loads({t: p for t, p, r in discovery_messages(SAMPLE_RESULT, [])}[f"fitbridge/{P1}/week/attributes"])
        self.assertEqual(attrs["goal"], r1["week"]["goal"])
        self.assertEqual(attrs["last_week"], r1["week"]["last_week"])

    def test_week_attributes_list_and_couple_week_sensor(self):
        msgs = {t: p for t, p, r in discovery_messages(SAMPLE_RESULT, [])}
        attrs = json.loads(msgs[f"fitbridge/{P1}/week/attributes"])
        self.assertEqual(tuple(attrs), ("week", "runs", "workouts", "active_days", "bonus", "goal", "last_week",
                                        "goal_met", "paused", "days_left"))
        cfg = json.loads(msgs[f"homeassistant/sensor/fit_{G}_week/config"])
        self.assertEqual((cfg["default_entity_id"], cfg["unique_id"], "unit_of_measurement" in cfg), (f"sensor.fit_{G}_week", f"fit_{G}_week", False))
        week = SAMPLE_RESULT["group"]["week"]
        self.assertEqual(msgs[f"fitbridge/{G}/week/state"], "on" if week["met"] else "off")
        self.assertEqual(json.loads(msgs[f"fitbridge/{G}/week/attributes"]), week)
        met = {**SAMPLE_RESULT, "group": {**SAMPLE_RESULT["group"], "week": {**week, "met": not week["met"]}}}
        self.assertEqual({t: p for t, p, r in discovery_messages(met, [])}[f"fitbridge/{G}/week/state"], "off" if week["met"] else "on")

    def test_one_person_household_gets_ten_entities(self):
        (S1,) = SOLO["people"]
        solo = score({S1: []}, [], SOLO, NOW(1))
        configs = [t for t, p, r in discovery_messages(solo, []) if t.endswith("/config")]
        self.assertEqual(len(configs), 10)
        self.assertFalse(any(G in t or P2 in t for t in configs))

    def test_record_event_config_and_messages(self):
        ev1 = {"key": "g1", "lifts": [{"name": "Row", "w": 70, "r": 6, "unit": "kg"}], "fastest_1k": None}
        ev2 = {"key": "t1", "lifts": [], "fastest_1k": 290}
        msgs = discovery_messages(SAMPLE_RESULT, [], (), [(P1, ev1), (P2, ev2)])
        cfg = json.loads(next(p for t, p, r in msgs if t == "homeassistant/event/fit_record_set/config"))
        self.assertEqual((cfg["name"], cfg["unique_id"], cfg["default_entity_id"], cfg["event_types"], cfg["icon"], cfg["state_topic"]),
                         ("Record set", "fit_record_set", "event.fit_record_set", ["record_set"], "mdi:trophy", "fitbridge/record_set"))
        self.assertEqual(cfg["device"], {"identifiers": ["fitbridge"], "name": "Fitness", "manufacturer": "fitbridge"})
        ev = [m for m in msgs if m[0] == RECORD_TOPIC]
        self.assertEqual(RECORD_TOPIC, "fitbridge/record_set")
        self.assertFalse(any(r for t, p, r in ev))
        self.assertEqual([json.loads(p) for t, p, r in ev],
                         [{"event_type": "record_set", "person": P1, **ev1}, {"event_type": "record_set", "person": P2, **ev2}])


if __name__ == "__main__":
    unittest.main()
