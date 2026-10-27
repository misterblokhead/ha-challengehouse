import json
import re
import time
from datetime import timedelta
from unittest.mock import patch

import pytest
from conftest import SCORES
from homeassistant.auth.const import GROUP_ID_ADMIN, GROUP_ID_USER
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge.const import OPT_SHOES, OPT_STEPS, OPT_VIEWERS
from custom_components.fitbridge.settings import monday_of

UI = "/api/fitbridge/ui"


@pytest.fixture
async def users(hass, entry):
    """Synthetic users: alex (p1, not admin), sam (p2, admin), robin (admin, not mapped)."""
    admin, user = await hass.auth.async_get_group(GROUP_ID_ADMIN), await hass.auth.async_get_group(GROUP_ID_USER)
    made = {"alex": MockUser(name="Alex", groups=[user]), "sam": MockUser(name="Sam", groups=[admin]),
            "robin": MockUser(name="Robin", groups=[admin])}
    for u in made.values():
        u.add_to_hass(hass)
    hass.config_entries.async_update_entry(entry, options={OPT_VIEWERS: {made["alex"].id: "p1", made["sam"].id: "p2"}})
    return made


@pytest.fixture
def client(hass, hass_client, users):
    async def _client(name):
        token = await hass.auth.async_create_refresh_token(users[name], "https://fit.example.test")
        return await hass_client(hass.auth.async_create_access_token(token))
    return _client


async def test_scores_wait_for_the_first_payload(hass, client, send):
    c = await client("alex")
    resp = await c.get(f"{UI}/scores")
    assert resp.status == 503 and await resp.json() == {"detail": "waiting"}
    await send(SCORES)
    resp = await c.get(f"{UI}/scores")
    assert resp.status == 200
    body = await resp.json()
    assert body["people"] == {p: {**r, "shoes": [], "steps_today": None} for p, r in SCORES["people"].items()} and body["viewer"] == {"person": "p1", "can_edit": ["p1"]}
    robin = await (await (await client("robin")).get(f"{UI}/scores")).json()
    assert robin["viewer"] == {"person": None, "can_edit": []}



async def test_scores_carry_each_persons_shoes(hass, entry, users, client, send):
    await send(SCORES)
    hass.states.async_set("sensor.trail", "123.4", {"nickname": "Trail", "activity_count": 9, "last_activity_at": "2026-10-20T07:00:00Z"})
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_SHOES: {"p1": {"sensor.trail": 700, "sensor.gone": 500}}})
    body = await (await (await client("sam")).get(f"{UI}/scores")).json()
    assert body["people"]["p1"]["shoes"] == [
        {"entity_id": "sensor.trail", "name": "Trail", "km": 123.4, "limit": 700, "runs": 9, "last_run": "2026-10-20T07:00:00Z"},
        {"entity_id": "sensor.gone", "name": "sensor.gone", "km": None, "limit": 500, "runs": None, "last_run": None}]
    assert body["people"]["p2"]["shoes"] == []

async def test_scores_carry_steps_today_from_the_live_sensor(hass, entry, users, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps", "p2": "sensor.gone"}})
    for state, expected in (("247.9", 247), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        body = await (await (await client("sam")).get(f"{UI}/scores")).json()
        assert (body["people"]["p1"]["steps_today"], body["people"]["p2"]["steps_today"]) == (expected, None)



async def test_steps_today_is_0_until_the_phone_reports_today(hass, entry, users, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps"}})
    c = await client("sam")
    for state, expected in (("10504", 0), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        with patch("custom_components.fitbridge.views.dt_util.now", return_value=dt_util.now() + timedelta(days=1)):  # next morning, no report yet
            body = await (await c.get(f"{UI}/scores")).json()
        assert body["people"]["p1"]["steps_today"] == expected

@pytest.mark.parametrize("key,action", [("k1", "remove"), ("manual:a/b", "restore")])
async def test_own_workout_publishes_retained_manual_message(hass, client, send, mqtt_mock, key, action):
    await send(SCORES)
    mqtt_mock.async_publish.reset_mock()
    resp = await (await client("alex")).post(f"{UI}/workouts", json={"person": "p1", "key": key, "action": action})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    mqtt_mock.async_publish.assert_called_once()
    topic, payload, qos, retain = mqtt_mock.async_publish.call_args.args
    assert re.fullmatch(r"fitbridge/manual/\d{13}-[0-9a-f]{6}", topic)  # ms: an Undo sorts after its Remove
    assert abs(int(topic.rsplit("/", 1)[1][:13]) - time.time() * 1000) < 60000
    assert payload == json.dumps({"action": action, "person": "p1", "key": key}) and qos == 1 and retain is True


async def test_mapped_admin_may_edit_partner(hass, client, send, mqtt_mock):
    await send(SCORES)
    resp = await (await client("sam")).post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})
    assert resp.status == 202


@pytest.mark.parametrize("who,body,status", [
    ("alex", {"person": "p2", "key": "k2", "action": "remove"}, 403),  # partner's, not admin
    ("robin", {"person": "p1", "key": "k1", "action": "remove"}, 403),  # admin, but not mapped
    ("alex", {"person": "p1", "key": "gone", "action": "remove"}, 404),
    ("alex", {"person": "p1", "key": "k1", "action": "delete"}, 400),
    ("alex", {"person": "p1", "key": 1, "action": "remove"}, 400),
    ("alex", ["p1", "k1", "remove"], 400),
    ("alex", {"person": "p1", "key": "steps:p1:2026-10-27", "action": "remove"}, 400),  # an active day is not removable
])
async def test_refused_edits_publish_nothing(hass, client, send, mqtt_mock, who, body, status):
    await send(SCORES)
    mqtt_mock.async_publish.reset_mock()
    resp = await (await client(who)).post(f"{UI}/workouts", json=body)
    assert resp.status == status
    mqtt_mock.async_publish.assert_not_called()


@pytest.mark.parametrize("raw,status", [(b"{nope", 400), (b"\xff\xfe", 400), (b'{"key": NaN}', 400), (b" " * 4097, 413)],
                         ids=["not-json", "bad-utf8", "nan", "too-big"])
async def test_bad_bodies(hass, client, send, raw, status):
    await send(SCORES)
    resp = await (await client("alex")).post(f"{UI}/workouts", data=raw)
    assert resp.status == status


async def test_post_before_payload_waits_and_unknown_path_is_404(hass, client, send):
    c = await client("alex")
    assert (await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})).status == 503
    await send(SCORES)
    assert (await c.get(f"{UI}/nope")).status == 404
    assert (await c.post(f"{UI}/scores", json={})).status == 404


async def test_unauthenticated_is_401(hass, entry, hass_client_no_auth):
    assert (await (await hass_client_no_auth()).get(f"{UI}/scores")).status == 401


P = {"runs": 2, "workouts": 1, "active_days": 3, "steps": 10000}
SETTINGS = {"people": {"p1": P, "p2": {**P, "runs": 0}}, "couple": {"mode": "together", "together": 2, "team": 8, "reward": "Pizza night"}}


def _this_monday():
    return monday_of(dt_util.now().date()).isoformat()


def _settings_publishes(mqtt_mock):
    return [c.args for c in mqtt_mock.async_publish.call_args_list if c.args[0] == "fitbridge/settings"]


async def test_settings_publish_retained_with_this_mondays_entry(hass, client, send, mqtt_mock, hass_storage):
    await send(SCORES)
    mqtt_mock.async_publish.reset_mock()
    resp = await (await client("alex")).post(f"{UI}/settings", json=SETTINGS)
    monday = _this_monday()
    assert resp.status == 202 and await resp.json() == {"ok": True, "from": monday}
    history = [{"from": monday, **SETTINGS}]
    assert _settings_publishes(mqtt_mock) == [("fitbridge/settings", json.dumps({"history": history}), 1, True)]
    assert hass_storage["fitbridge.settings"]["data"] == {"history": history}


async def test_second_save_in_a_week_replaces_and_a_later_week_appends(hass, client, send, hass_storage):
    await send(SCORES)
    c = await client("sam")
    await c.post(f"{UI}/settings", json=SETTINGS)
    again = {**SETTINGS, "couple": {**SETTINGS["couple"], "mode": "own"}}
    assert (await c.post(f"{UI}/settings", json=again)).status == 202
    saved = hass_storage["fitbridge.settings"]["data"]["history"]
    assert [(e["from"], e["couple"]["mode"]) for e in saved] == [(_this_monday(), "own")]
    with patch("custom_components.fitbridge.views.dt_util.now", return_value=dt_util.now() + timedelta(days=7)):  # not freezegun: it expires the token
        assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 202
    saved = hass_storage["fitbridge.settings"]["data"]["history"]
    assert len(saved) == 2 and saved[0]["from"] < saved[1]["from"] and saved[1]["couple"]["mode"] == "together"



async def test_a_failed_publish_keeps_the_old_settings(hass, client, send):
    await send(SCORES)
    c = await client("alex")
    with patch("custom_components.fitbridge.settings.publish", side_effect=HomeAssistantError("broker down")):
        assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 500
    assert (await (await c.get(f"{UI}/settings")).json())["current"] is None

@pytest.mark.parametrize("who,body,status,detail", [
    ("robin", SETTINGS, 403, "not allowed"),  # admin, but not mapped
    ("alex", {**SETTINGS, "people": {"p1": {**P, "runs": 9}, "p2": P}}, 400, "people.p1.runs: must be an integer 0-7"),
    ("alex", {"people": {"p1": P}, "couple": SETTINGS["couple"]}, 400, "people.p2: required"),
    ("alex", ["x"], 400, "body: must be an object"),
])
async def test_refused_settings_publish_nothing(hass, client, send, mqtt_mock, hass_storage, who, body, status, detail):
    await send(SCORES)
    mqtt_mock.async_publish.reset_mock()
    resp = await (await client(who)).post(f"{UI}/settings", json=body)
    assert resp.status == status and (await resp.json())["detail"] == detail
    assert _settings_publishes(mqtt_mock) == [] and "fitbridge.settings" not in hass_storage


async def test_settings_wait_for_the_first_scores(hass, client):
    c = await client("alex")
    assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 503
    assert (await c.get(f"{UI}/settings")).status == 503


async def test_settings_get_returns_current_week_start_and_defaults(hass, client, send):
    p1 = {**SCORES["people"]["p1"], "week": {"goal": {"runs": 1, "gym": 2, "active_days": 0, "steps": 8000}}}
    await send({"people": {"p1": p1, "p2": {"name": "Sam", "feed": []}}})
    c = await client("alex")
    body = await (await c.get(f"{UI}/settings")).json()
    assert body == {"history": [], "current": None, "week_start": _this_monday(),
                    "defaults": {"p1": {"runs": 1, "workouts": 2, "active_days": 0, "steps": 8000}}}  # old gym key still read
    await c.post(f"{UI}/settings", json=SETTINGS)
    body = await (await c.get(f"{UI}/settings")).json()
    assert body["current"] == {"from": _this_monday(), **SETTINGS} and body["history"] == [body["current"]]


async def test_settings_survive_a_reload_and_are_published_at_startup(hass, entry, client, send, mqtt_mock, hass_storage):
    await send(SCORES)
    await (await client("alex")).post(f"{UI}/settings", json=SETTINGS)
    mqtt_mock.async_publish.reset_mock()
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert _settings_publishes(mqtt_mock) == [("fitbridge/settings", json.dumps({"history": [{"from": _this_monday(), **SETTINGS}]}), 1, True)]
    await send(SCORES)
    body = await (await (await client("alex")).get(f"{UI}/settings")).json()
    assert body["current"] == {"from": _this_monday(), **SETTINGS}
