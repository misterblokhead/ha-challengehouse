"""Sensors, events and actions without MQTT, checked against the recorded MQTT discovery output (synthetic data only)."""
import json
from datetime import timedelta
from pathlib import Path
from unittest.mock import patch

import pytest
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from homeassistant.util import dt as dt_util

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import DOMAIN, OPT_SHADOW
from custom_components.fitbridge.engine.cycle import Cycle

FIX = json.loads((Path(__file__).parent / "fixtures" / "mqtt_discovery.json").read_text(encoding="utf-8"))
PAYLOADS = {t: p for t, p, r in FIX["messages"]}
CONFIGS = {(c := json.loads(p))["default_entity_id"]: c for t, p, r in FIX["messages"] if t.startswith("homeassistant/")}
SENSORS = {e: c for e, c in CONFIGS.items() if e.startswith("sensor.")}
FIRED = [json.loads(p) for t, p, r in FIX["messages"] if not r]  # the event payloads, in publish order
TYPES = ("badge_unlocked", "workout_scored", "record_set")


def no_url(value):
    if isinstance(value, dict):
        return {k: no_url(v) for k, v in value.items() if k != "url"}
    if isinstance(value, list):
        return [no_url(v) for v in value]
    return value


def _announced(event_type):
    """The cycle's (person, item) pairs behind the recorded payloads of one event type."""
    return [(e["person"], {k: v for k, v in e.items() if k not in ("event_type", "person")})
            for e in FIRED if e["event_type"] == event_type]


@pytest.fixture
def commits():
    return []


@pytest.fixture
def scored(commits):
    """score_cycle stand-in: the fixture's scores and announcements; commit() notes itself in `commits`."""
    def fake(store, holder, og, inputs, now, live):
        return Cycle(FIX["scores"], *(_announced(t) for t in TYPES), lambda: commits.append("commit"))
    with patch.object(runner_mod, "score_cycle", side_effect=fake) as m:
        yield m


def _ours(hass):
    return {e.entity_id for e in er.async_get(hass).entities.values() if e.platform == DOMAIN}


async def test_live_entities_match_the_mqtt_discovery_minus_url(hass, setup, scored, commits):
    await setup()
    assert _ours(hass) == set(CONFIGS)
    registry, devices = er.async_get(hass), dr.async_get(hass)
    for entity_id, cfg in SENSORS.items():
        state = hass.states.get(entity_id)
        expected = {**no_url(json.loads(PAYLOADS[cfg["json_attributes_topic"]])), "icon": cfg["icon"],
                    "friendly_name": f"{cfg['device']['name']} {cfg['name']}",
                    **{k: cfg[k] for k in ("unit_of_measurement", "state_class") if k in cfg}}
        assert (state.state, dict(state.attributes)) == (PAYLOADS[cfg["state_topic"]], expected), entity_id
        entry = registry.async_get(entity_id)
        device = devices.async_get(entry.device_id)
        assert (entry.unique_id, device.name, device.manufacturer) == (
            cfg["unique_id"], cfg["device"]["name"], cfg["device"]["manufacturer"])
    assert all("url" not in json.dumps(dict(hass.states.get(e).attributes)) for e in SENSORS)
    for payload in FIRED:  # payload minus event_type = the event's fields, as HA's MQTT event platform made them
        t = payload["event_type"]
        cfg = CONFIGS[f"event.fit_{t}"]
        state = hass.states.get(f"event.fit_{t}")
        assert dict(state.attributes) == {**payload, "event_types": [t], "icon": cfg["icon"],
                                          "friendly_name": f"{cfg['device']['name']} {cfg['name']}"}
        assert dt_util.parse_datetime(state.state) is not None
        device = devices.async_get(registry.async_get(f"event.fit_{t}").device_id)
        assert (device.name, device.manufacturer) == (cfg["device"]["name"], cfg["device"]["manufacturer"])
    assert commits == ["commit"]  # announced, then recorded


async def test_the_next_cycle_updates_the_sensors_in_place(hass, setup, scored):
    await setup()
    runner = hass.data[DOMAIN].runner
    xp = FIX["scores"]["people"]["person1"]["xp"]
    FIX["scores"]["people"]["person1"]["xp"] = xp + 5
    try:
        await runner.async_score_now()
    finally:
        FIX["scores"]["people"]["person1"]["xp"] = xp
    assert hass.states.get("sensor.fit_person1_xp").state == str(xp + 5)
    assert _ours(hass) == set(CONFIGS)  # no duplicates


async def test_shadow_creates_no_entities_and_fires_nothing(hass, setup, scored, commits, mqtt_mock):
    await setup({OPT_SHADOW: True})
    assert _ours(hass) == set()
    assert not [e for e in hass.states.async_entity_ids() if e.startswith(("sensor.fit_", "event.fit_"))]
    assert commits == []


async def test_an_old_mqtt_entity_keeps_everything_off_until_it_is_gone(hass, setup, scored, commits):
    registry = er.async_get(hass)
    old = registry.async_get_or_create("sensor", "mqtt", "fit_person1_week", suggested_object_id="fit_person1_week")
    assert old.entity_id == "sensor.fit_person1_week"
    e = await setup()
    assert _ours(hass) == set() and hass.states.get("event.fit_badge_unlocked") is None
    issue = ir.async_get(hass).async_get_issue(DOMAIN, "old_entities")
    assert issue is not None and issue.translation_key == "old_entities"
    assert scored.call_args.args[5] is False and commits == []  # as in shadow: nothing announced, nothing recorded
    assert hass.data[DOMAIN].scores == FIX["scores"]  # scoring goes on; the page shows it
    registry.async_remove(old.entity_id)
    await hass.config_entries.async_reload(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert _ours(hass) == set(CONFIGS) and hass.states.get("sensor.fit_person1_week").state == "100"
    assert ir.async_get(hass).async_get_issue(DOMAIN, "old_entities") is None


async def test_a_failing_handler_is_logged_by_class_and_the_rest_still_fire(hass, setup, commits, caplog):
    good = _announced("workout_scored")[0]
    bad = Cycle({"people": {"person1": {"name": "Person1", "note": "secret-a"}}, "group": None}, [],
                [("person1", {"key": "secret-b"}), good], [], lambda: commits.append("commit"))
    with patch.object(runner_mod, "score_cycle", return_value=bad):
        await setup()
    assert hass.states.get("event.fit_workout_scored").attributes["key"] == good[1]["key"]
    assert commits == ["commit"]
    assert "KeyError" in caplog.text and "secret" not in caplog.text


async def test_sensors_a_failed_cycle_could_not_show_come_with_the_next(hass, setup, caplog):
    people = FIX["scores"]["people"]
    broken = {**FIX["scores"], "people": {**people, "person2": {k: v for k, v in people["person2"].items() if k != "pbs"}}}
    cycles = [Cycle(broken, [], [], [], lambda: None), Cycle(FIX["scores"], [], [], [], lambda: None)]
    with patch.object(runner_mod, "score_cycle", side_effect=cycles):
        await setup()
        assert "KeyError" in caplog.text
        assert hass.states.get("sensor.fit_person1_xp").state == "282"  # shown before the failure: added all the same
        assert hass.states.get("sensor.fit_person2_pbs") is None
        await hass.data[DOMAIN].runner.async_score_now()
        await hass.async_block_till_done()
    assert _ours(hass) == set(CONFIGS)
    for entity_id, cfg in SENSORS.items():
        assert hass.states.get(entity_id).state == PAYLOADS[cfg["state_topic"]], entity_id


@pytest.mark.parametrize("options", [{OPT_SHADOW: False}, {OPT_SHADOW: True}], ids=["live", "shadow"])
async def test_actions_apply_through_the_runner(hass, setup, mqtt_mock, options):
    await setup(options)
    store = hass.data[DOMAIN].runner.store
    with patch.object(runner_mod, "score_cycle", wraps=runner_mod.score_cycle) as cycles:
        await hass.services.async_call(DOMAIN, "remove_workout", {"person": "person1", "key": "opentracks:t1"}, blocking=True)
        assert ("person1", "opentracks:t1") in store.exclusions()
        await hass.services.async_call(DOMAIN, "restore_workout", {"person": "person1", "key": "opentracks:t1"}, blocking=True)
        assert ("person1", "opentracks:t1") not in store.exclusions()
        start = (dt_util.now() - timedelta(hours=2)).isoformat()
        await hass.services.async_call(DOMAIN, "log_workout", {"person": "person2", "kind": "run", "start": start,
                                                               "minutes": 30, "km": 5, "indoor": True}, blocking=True)
        assert cycles.call_count == 3  # each change is scored at once
    (row,) = [r for r in store.all_rows() if r["key"].startswith("manual:")]
    assert (row["person"], row["activity_type"], row["duration_s"], row["distance_m"], row["indoor"]) == (
        "person2", "run", 1800, 5000, 1)


@pytest.mark.parametrize("service,data,reason", [
    ("remove_workout", {"person": "nobody", "key": "k"}, "unknown person"),
    ("log_workout", {"person": "person1", "kind": "swim", "start": "2026-10-27T10:00:00+01:00", "minutes": 30}, "unknown kind"),
    ("log_workout", {"person": "person1", "kind": "run", "start": "2099-01-01T10:00:00+01:00", "minutes": 30}, "start in the future"),
])
async def test_an_invalid_action_names_the_reason(hass, setup, service, data, reason):
    await setup()
    with pytest.raises(ServiceValidationError, match=reason):
        await hass.services.async_call(DOMAIN, service, data, blocking=True)
