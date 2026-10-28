"""What the integration shows for a scoring.score() result: sensors per person and group, and three events.

Same states, attributes and event payloads as fitbridge's MQTT discovery published (spec section 7), minus Endurain links."""

def _no_url(item):
    """An item without its Endurain link (fastest_1k and the recent workouts carried one over MQTT)."""
    return {k: v for k, v in item.items() if k != "url"} if isinstance(item, dict) else item


# key -> (label, icon, unit, state(person), attributes(person)); entity sensor.fit_<person or group id>_<key>
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
             lambda r: {k: _no_url(v) for k, v in r["pbs"].items() if k != "lifts"}),  # the growing lifts list could pass HA's 16 KB limit; the page reads the full scores
    "recent": ("Recent", "mdi:history", None, lambda r: len(r["recent"]),
               lambda r: {"workouts": [_no_url(w) for w in r["recent"]]}),
}
GROUP_SENSORS = {
    "streak_weeks": ("Streak", "mdi:fire", "wk", lambda g: g["streak"], lambda g: {"best": g["best_streak"]}),
    "week": ("Couple week", "mdi:heart-multiple", None, lambda g: "on" if g["week"]["met"] else "off", lambda g: g["week"]),
    "month": ("Joint workouts", "mdi:account-heart", None, lambda g: g["month_joint"],
              lambda g: {"km_together": g["km_together"]}),
}
MEASURED = {"XP", "%", "wk", "km"}                  # units that also get state_class: measurement
WORKOUT_FIELDS = ("kind", "minutes", "km", "xp", "plan", "joint")
EVENT_ENTITIES = {"badge_unlocked": ("Badge unlocked", "mdi:medal"), "workout_scored": ("Workout scored", "mdi:run"),
                  "record_set": ("Record set", "mdi:trophy")}  # event type -> (name, icon); entity event.fit_<type>
# event type -> payload(person, item): item is a badge, a feed item or a record event
EVENTS = {
    "badge_unlocked": lambda p, b: {"event_type": "badge_unlocked", "person": p, **b},
    "workout_scored": lambda p, w: {"event_type": "workout_scored", "person": p, "key": w["key"],
                                    **{k: w[k] for k in WORKOUT_FIELDS}},
    "record_set": lambda p, e: {"event_type": "record_set", "person": p, **e},
}
