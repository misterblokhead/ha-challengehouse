"""Home Assistant MQTT discovery messages for a scoring.score() result (spec section 7)."""
import json

# key -> (label, icon, unit, state(person), attributes(person))
PERSON_SENSORS = {
    "xp": ("XP", "mdi:star-circle", "XP", lambda r: r["xp"],
           lambda r: {k: r[k] for k in ("level", "level_floor", "next_level_xp")}),
    "week": ("Week", "mdi:calendar-week", "%", lambda r: r["week"]["progress"],
             lambda r: {k: r["week"][k] for k in ("week", "runs", "workouts", "active_days", "bonus", "goal", "last_week", "goal_met", "paused", "days_left")}),
    "streak_weeks": ("Streak", "mdi:fire", "wk", lambda r: r["streak"], lambda r: {"best": r["best_streak"]}),
    "plan": ("Plan", "mdi:run-fast", None, lambda r: r["plan"]["state"], lambda r: r["plan"]),
    "badges": ("Badges", "mdi:medal", None, lambda r: r["badges"]["count"], lambda r: r["badges"]),
    # longest_session_km is always a number (0.0 before the first outdoor run), so no unknown state
    "pbs": ("Personal bests", "mdi:trophy", "km", lambda r: r["pbs"]["longest_session_km"],
             lambda r: {k: v for k, v in r["pbs"].items() if k != "lifts"}),  # the growing lifts list could pass HA's 16 KB limit; the page reads fitbridge/scores
    "recent": ("Recent", "mdi:history", None, lambda r: len(r["recent"]), lambda r: {"workouts": r["recent"]}),
}
GROUP_SENSORS = {
    "streak_weeks": ("Streak", "mdi:fire", "wk", lambda g: g["streak"], lambda g: {"best": g["best_streak"]}),
    "week": ("Couple week", "mdi:heart-multiple", None, lambda g: "on" if g["week"]["met"] else "off", lambda g: g["week"]),
    "month": ("Joint workouts", "mdi:account-heart", None, lambda g: g["month_joint"],
              lambda g: {"km_together": g["km_together"]}),
}
MEASURED = {"XP", "%", "wk", "km"}                  # units that also get state_class: measurement
EVENT_TOPIC = "fitbridge/badge_unlocked"
WORKOUT_TOPIC = "fitbridge/workout_scored"
RECORD_TOPIC = "fitbridge/record_set"
SCORES_TOPIC = "fitbridge/scores"
WORKOUT_FIELDS = ("kind", "minutes", "km", "xp", "plan", "joint")
FITNESS_DEVICE = {"identifiers": ["fitbridge"], "name": "Fitness", "manufacturer": "fitbridge"}


def _sensor(owner, device, key, spec, subject, expire_after):
    label, icon, unit, state, attrs = spec
    oid, base = f"fit_{owner}_{key}", f"fitbridge/{owner}/{key}"
    # name is the label only: HA prefixes the device name ("Fitness <person>")
    config = {"name": label, "unique_id": oid, "default_entity_id": f"sensor.{oid}",
              "state_topic": f"{base}/state", "json_attributes_topic": f"{base}/attributes",
              "expire_after": expire_after, "icon": icon, "device": device}
    if unit:
        config["unit_of_measurement"] = unit
    if unit in MEASURED:
        config["state_class"] = "measurement"
    return [(f"homeassistant/sensor/{oid}/config", json.dumps(config), True),
            (f"{base}/state", str(state(subject)), True),
            (f"{base}/attributes", json.dumps(attrs(subject)), True)]


def scores_message(last_score):
    """The retained payload the fitness page reads: the same JSON as GET /scores."""
    return SCORES_TOPIC, json.dumps(last_score), True


def discovery_messages(result, announce, workouts=(), records=(), expire_after=1200):
    """(topic, payload, retain) tuples: sensors, the event configs, then one event per announced badge / scored workout / record.

    workouts is a list of (person, feed_item), records a list of (person, record event)."""
    msgs = []
    for p, r in result["people"].items():
        device = {"identifiers": [f"fitbridge_{p}"], "name": f"Fitness {r['name']}", "manufacturer": "fitbridge"}
        for key, spec in PERSON_SENSORS.items():
            msgs += _sensor(p, device, key, spec, r, expire_after)
    if g := result["group"]:
        device = {"identifiers": [f"fitbridge_{g['id']}"], "name": f"Fitness {g['name']}", "manufacturer": "fitbridge"}
        for key, spec in GROUP_SENSORS.items():
            msgs += _sensor(g["id"], device, key, spec, g, expire_after)
    event = {"name": "Badge unlocked", "unique_id": "fit_badge_unlocked", "default_entity_id": "event.fit_badge_unlocked",
             "state_topic": EVENT_TOPIC, "event_types": ["badge_unlocked"], "icon": "mdi:medal",
             "device": FITNESS_DEVICE}
    msgs.append(("homeassistant/event/fit_badge_unlocked/config", json.dumps(event), True))
    wevent = {"name": "Workout scored", "unique_id": "fit_workout_scored", "default_entity_id": "event.fit_workout_scored",
              "state_topic": WORKOUT_TOPIC, "event_types": ["workout_scored"], "icon": "mdi:run", "device": FITNESS_DEVICE}
    msgs.append(("homeassistant/event/fit_workout_scored/config", json.dumps(wevent), True))
    revent = {"name": "Record set", "unique_id": "fit_record_set", "default_entity_id": "event.fit_record_set",
              "state_topic": RECORD_TOPIC, "event_types": ["record_set"], "icon": "mdi:trophy", "device": FITNESS_DEVICE}
    msgs.append(("homeassistant/event/fit_record_set/config", json.dumps(revent), True))
    msgs += [(EVENT_TOPIC, json.dumps({"event_type": "badge_unlocked", "person": p, **b}), False)
             for p, b in announce]
    msgs += [(WORKOUT_TOPIC, json.dumps({"event_type": "workout_scored", "person": p, "key": w["key"],
                                         **{k: w[k] for k in WORKOUT_FIELDS}}), False) for p, w in workouts]
    msgs += [(RECORD_TOPIC, json.dumps({"event_type": "record_set", "person": p, **e}), False) for p, e in records]
    return msgs
