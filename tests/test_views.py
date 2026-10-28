import json
import re
import time
from datetime import date, timedelta
from unittest.mock import patch

import pytest
from conftest import SCORES
from homeassistant.auth.const import GROUP_ID_ADMIN, GROUP_ID_USER
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge.const import DOMAIN, OPT_SHADOW, OPT_SHOES, OPT_STEPS, OPT_VIEWERS
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
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_VIEWERS: {made["alex"].id: "p1", made["sam"].id: "p2"}})
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
    assert body["people"] == {p: {**r, "shoes": [], "steps_today": None, "steps_week": None} for p, r in SCORES["people"].items()} and body["viewer"] == {"person": "p1", "can_edit": ["p1"]}
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

async def test_scores_carry_this_weeks_steps_with_today_from_the_live_sensor(hass, entry, users, client, send, freezer):
    freezer.move_to("2026-10-28 12:00:00+00:00")  # a Wednesday
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps", "p2": "sensor.gone"}})
    hass.data["fitbridge"].steps._days["p1"] = {"2026-10-25": 900, "2026-10-26": 12000, "2026-10-27": 8000}
    c = await client("sam")
    for state, today in (("3000", 3000), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        body = await (await c.get(f"{UI}/scores")).json()
        assert body["people"]["p1"]["steps_week"] == {"2026-10-26": 12000, "2026-10-27": 8000, **({"2026-10-28": today} if today else {})}
        assert body["people"]["p2"]["steps_week"] == {}  # a sensor but nothing collected yet
    hass.data["fitbridge"].steps._days["p1"]["2026-10-28"] = 9000  # collected beats a lower live value
    hass.states.async_set("sensor.phone_steps", "100")
    body = await (await c.get(f"{UI}/scores")).json()
    assert body["people"]["p1"]["steps_week"]["2026-10-28"] == 9000


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


async def test_live_remove_goes_through_the_runner(hass, client, send, mqtt_mock):
    await send(SCORES)
    data = hass.data[DOMAIN]
    data.shadow = False  # live: no MQTT, the runner applies it
    mqtt_mock.async_publish.reset_mock()
    c = await client("alex")
    with patch.object(data.runner, "async_manual") as manual:
        resp = await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    manual.assert_awaited_once_with({"action": "remove", "person": "p1", "key": "k1"})
    with patch.object(data.runner, "async_manual", side_effect=ValueError("unknown person")):
        resp = await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "restore"})
    assert resp.status == 400 and await resp.json() == {"detail": "unknown person"}
    mqtt_mock.async_publish.assert_not_called()

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
    assert hass_storage["fitbridge.settings"]["data"] == {"history": history, "profiles": {}}


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
    assert body == {"history": [], "profiles": {}, "current": None, "week_start": _this_monday(),
                    "defaults": {"p1": {"runs": 1, "workouts": 2, "active_days": 0, "steps": 8000}}}  # old gym key still read
    await c.post(f"{UI}/settings", json=SETTINGS)
    body = await (await c.get(f"{UI}/settings")).json()
    assert body["current"] == {"from": _this_monday(), **SETTINGS} and body["history"] == [body["current"]]


async def test_birth_years_are_stored_returned_kept_and_cleared(hass, client, send, mqtt_mock, hass_storage):
    await send(SCORES)
    c = await client("alex")
    mqtt_mock.async_publish.reset_mock()
    both = {"profiles": {"p1": {"birth_year": 1990}, "p2": {"birth_year": 1985}}}
    assert (await c.post(f"{UI}/settings", json={**SETTINGS, **both})).status == 202
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == both["profiles"]
    assert hass_storage["fitbridge.settings"]["data"]["profiles"] == both["profiles"]
    assert _settings_publishes(mqtt_mock) == [("fitbridge/settings", json.dumps({"history": [{"from": _this_monday(), **SETTINGS}]}), 1, True)]  # profiles stay local
    assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 202  # an older page sends none: they stay
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == both["profiles"]
    assert (await c.post(f"{UI}/settings", json={**SETTINGS, "profiles": {"p1": {"birth_year": None}}})).status == 202  # null clears, p2 untouched
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == {"p2": {"birth_year": 1985}}
    assert hass_storage["fitbridge.settings"]["data"]["profiles"] == {"p2": {"birth_year": 1985}}


@pytest.mark.parametrize("profiles,detail", [
    ({"p1": {"birth_year": 1899}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": date.today().year + 1}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": "1990"}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": True}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"zed": {"birth_year": 1990}}, "profiles.zed: unknown person"),
    ([], "profiles: must be an object"),
])
async def test_a_bad_birth_year_is_refused_and_nothing_is_stored(hass, client, send, hass_storage, profiles, detail):
    await send(SCORES)
    resp = await (await client("alex")).post(f"{UI}/settings", json={**SETTINGS, "profiles": profiles})
    assert resp.status == 400 and (await resp.json())["detail"] == detail
    assert "fitbridge.settings" not in hass_storage


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


# ---------- shoes (live: the engine's own shoes) ----------

@pytest.fixture
async def live(hass, setup, hass_client):
    """A live entry (people person1 and person2 from scoring.toml); clients: person1 (not admin), person2 (admin), robin (admin, unmapped)."""
    admin, user = await hass.auth.async_get_group(GROUP_ID_ADMIN), await hass.auth.async_get_group(GROUP_ID_USER)
    made = {"person1": MockUser(name="Person1", groups=[user]), "person2": MockUser(name="Person2", groups=[admin]),
            "robin": MockUser(name="Robin", groups=[admin])}
    for u in made.values():
        u.add_to_hass(hass)
    await setup({OPT_SHADOW: False, OPT_VIEWERS: {made["person1"].id: "person1", made["person2"].id: "person2"},
                 OPT_SHOES: {"person1": {"sensor.endurain_trail": 700}}})

    async def _client(name):
        token = await hass.auth.async_create_refresh_token(made[name], "https://fit.example.test")
        return await hass_client(hass.auth.async_create_access_token(token))
    return _client


async def _shoes(c, who="person1"):
    return (await (await c.get(f"{UI}/scores")).json())["people"][who]["shoes"]


async def _add(c, person="person1", name="Trail", km=700):
    resp = await c.post(f"{UI}/shoes", json={"op": "add", "person": person, "name": name, "replace_at_km": km})
    assert resp.status == 202, await resp.text()
    return (await resp.json())["id"]


def _run(hass, person, key, km, days_ago):
    start = dt_util.now() - timedelta(days=days_ago)
    hass.data[DOMAIN].runner.store.add(person, key, "opentracks", "completed", activity_type="running", points=5, distance_m=km * 1000,
                                       start=start.isoformat(), end=(start + timedelta(minutes=30)).isoformat(), duration_s=1800)


async def test_live_scores_carry_the_engines_shoes_not_endurains(hass, live):
    c = await live("person1")
    body = await (await c.get(f"{UI}/scores")).json()
    assert body["people"]["person1"]["shoes"] == [] and body["people"]["person1"]["run_shoes"] == {}  # OPT_SHOES is for the shadow weeks
    a = await _add(c)
    assert await _shoes(c) == [{"id": a, "name": "Trail", "km": 0.0, "limit": 700, "runs": 0, "last_run": None, "current": True}]
    assert await (await c.get(f"{UI}/shoes")).json() == {"person1": await _shoes(c), "person2": []}


async def test_shoe_ops_add_update_current_retire(hass, live):
    c = await live("person1")
    a, b = await _add(c, name=" Trail "), await _add(c, name="Road", km=500)
    assert [s["name"] for s in await _shoes(c)] == ["Trail", "Road"]  # trimmed
    assert [s["current"] for s in await _shoes(c)] == [True, False]  # the first one added is current
    resp = await c.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": b})
    assert resp.status == 202 and [s["current"] for s in await _shoes(c)] == [False, True]
    resp = await c.post(f"{UI}/shoes", json={"op": "update", "id": a, "name": "Trail 2", "replace_at_km": 650.5})
    assert resp.status == 202 and [(s["name"], s["limit"]) for s in await _shoes(c)][0] == ("Trail 2", 650.5)
    resp = await c.post(f"{UI}/shoes", json={"op": "update", "id": a, "replace_at_km": 800})  # one field alone
    assert resp.status == 202 and (await _shoes(c))[0]["name"] == "Trail 2" and (await _shoes(c))[0]["limit"] == 800
    resp = await c.post(f"{UI}/shoes", json={"op": "retire", "id": b})
    assert resp.status == 202 and [s["id"] for s in await _shoes(c)] == [a]


async def test_the_first_shoe_added_becomes_current_a_second_does_not(hass, live):
    c = await live("person1")
    a, b = await _add(c, name="A"), await _add(c, name="B")
    assert [(s["id"], s["current"]) for s in await _shoes(c)] == [(a, True), (b, False)]
    await c.post(f"{UI}/shoes", json={"op": "retire", "id": a})  # no current left: the next one added takes over
    c2 = await _add(c, name="C")
    assert [(s["id"], s["current"]) for s in await _shoes(c)] == [(b, False), (c2, True)]
    _run(hass, "person1", "r1", 5, 1)
    await hass.data[DOMAIN].runner.async_score_now()
    assert [(s["km"], s["runs"]) for s in await _shoes(c)] == [(0.0, 0), (5.0, 1)]  # new runs count on it


async def test_a_shoe_op_scores_before_it_answers(hass, live):
    c = await live("person1")
    runner = hass.data[DOMAIN].runner
    with patch.object(runner, "_score", wraps=runner._score) as score:
        await _add(c)
    score.assert_awaited_once()


async def test_shoe_rights_follow_the_shoes_owner(hass, live):
    person1, person2, robin = await live("person1"), await live("person2"), await live("robin")
    mine = await _add(person1)
    theirs = await _add(person2, "person2", "Hers")
    for who, body, status in (
        (person1, {"op": "add", "person": "person2", "name": "X", "replace_at_km": 700}, 403),  # partner's, not admin
        (robin, {"op": "add", "person": "person1", "name": "X", "replace_at_km": 700}, 403),  # admin, but not mapped
        (person1, {"op": "update", "id": theirs, "name": "X"}, 403),
        (person1, {"op": "retire", "id": theirs}, 403),
        (person1, {"op": "current", "person": "person2", "id": theirs}, 403),
        (robin, {"op": "retire", "id": mine}, 403),
    ):
        assert (await who.post(f"{UI}/shoes", json=body)).status == status, body
    assert [s["name"] for s in await _shoes(person1)] == ["Trail"] and [s["name"] for s in await _shoes(person1, "person2")] == ["Hers"]
    assert (await person2.post(f"{UI}/shoes", json={"op": "retire", "id": mine})).status == 202  # an admin may edit anyone's
    assert await _shoes(person1) == []


@pytest.mark.parametrize("body,status,detail", [
    ({"op": "add", "person": "person1", "name": "", "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "   ", "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "x" * 41, "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": 5, "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "x" * 40, "replace_at_km": 99}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": 3001}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": "700"}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": True}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x"}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "nobody", "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "add", "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "add", "person": [], "name": "x", "replace_at_km": 700}, 400, "person: not a person"),  # unhashable: not a 500
    ({"op": "add", "person": {}, "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "current", "person": [], "id": 1}, 400, "person: not a person"),
    ({"op": "frobnicate"}, 400, "op: add, update, current or retire"),
    ({"op": "update", "id": "1", "name": "x"}, 400, "id: a whole number"),
    ({"op": "update", "id": True, "name": "x"}, 400, "id: a whole number"),
    ({"op": "update", "id": 1}, 400, "update: name or replace_at_km"),
    ({"op": "update", "id": 1, "name": ""}, 400, "name: 1-40 characters"),
    ({"op": "update", "id": 999, "name": "x"}, 404, "no such shoe"),
    ({"op": "retire", "id": 999}, 404, "no such shoe"),
    ({"op": "current", "person": "person1", "id": 999}, 400, "no such shoe"),
    (["add"], 400, "expected an object"),
])
async def test_shoe_validation(hass, live, body, status, detail):
    c = await live("person1")
    resp = await c.post(f"{UI}/shoes", json=body)
    assert resp.status == status and await resp.json() == {"detail": detail}
    assert await _shoes(c) == []


async def test_current_takes_only_the_persons_own_shoes(hass, live):
    person1, person2 = await live("person1"), await live("person2")
    theirs = await _add(person2, "person2", "Hers")
    resp = await person1.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": theirs})
    assert resp.status == 400 and await resp.json() == {"detail": "no such shoe"}


async def test_moving_a_run_moves_its_km(hass, live):
    c = await live("person1")
    a, b = await _add(c, name="A"), await _add(c, name="B")
    await c.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": a})
    _run(hass, "person1", "r1", 5, 2)
    await hass.data[DOMAIN].runner.async_score_now()
    body = await (await c.get(f"{UI}/scores")).json()
    assert [(s["km"], s["runs"]) for s in body["people"]["person1"]["shoes"]] == [(5.0, 1), (0.0, 0)]
    assert body["people"]["person1"]["run_shoes"] == {"r1": a}
    resp = await c.post(f"{UI}/workouts", json={"action": "shoe", "person": "person1", "key": "r1", "shoe_id": b})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    body = await (await c.get(f"{UI}/scores")).json()
    assert [(s["km"], s["runs"]) for s in body["people"]["person1"]["shoes"]] == [(0.0, 0), (5.0, 1)]
    assert body["people"]["person1"]["run_shoes"] == {"r1": b}


async def test_moving_a_run_is_refused_when_it_should(hass, live):
    person1, person2, robin = await live("person1"), await live("person2"), await live("robin")
    a, theirs = await _add(person1, name="A"), await _add(person2, "person2", "Hers")
    _run(hass, "person1", "r1", 5, 2)
    _run(hass, "person2", "r2", 5, 2)
    hass.data[DOMAIN].runner.store.add("person1", "w1", "opentracks", "completed", activity_type="walking", points=5, distance_m=3000,
                                       start=dt_util.now().isoformat(), end=dt_util.now().isoformat(), duration_s=1800)
    await hass.data[DOMAIN].runner.async_score_now()
    for who, body, status, detail in (
        (person1, {"person": "person2", "key": "r2", "shoe_id": theirs}, 403, "not allowed"),  # partner's, not admin
        (robin, {"person": "person1", "key": "r1", "shoe_id": a}, 403, "not allowed"),
        (person1, {"person": "person1", "key": "gone", "shoe_id": a}, 404, "not found"),
        (person1, {"person": "person1", "key": "w1", "shoe_id": a}, 400, "not a run"),
        (person1, {"person": "person1", "key": "r1", "shoe_id": theirs}, 400, "no such shoe"),  # somebody else's shoe
        (person1, {"person": "person1", "key": "r1", "shoe_id": True}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": "r1", "shoe_id": "1"}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": "r1"}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": 1, "shoe_id": a}, 400, "expected person, key and shoe_id"),
    ):
        resp = await who.post(f"{UI}/workouts", json={"action": "shoe", **body})
        assert (resp.status, (await resp.json())["detail"]) == (status, detail), body
    assert (await person2.post(f"{UI}/workouts", json={"action": "shoe", "person": "person2", "key": "r2", "shoe_id": theirs})).status == 202


async def test_shoes_are_not_managed_during_shadow(hass, client, send, mqtt_mock):
    await send(SCORES)  # the shadow entry: the page shows the LXC's scores, the engine's shoes are not what it counts
    mqtt_mock.async_publish.reset_mock()
    c = await client("alex")
    for path, body in (("shoes", {"op": "add", "person": "p1", "name": "X", "replace_at_km": 700}),
                       ("workouts", {"action": "shoe", "person": "p1", "key": "k1", "shoe_id": 1})):
        resp = await c.post(f"{UI}/{path}", json=body)
        assert resp.status == 409 and await resp.json() == {"detail": "shoes are managed after the switch"}
    mqtt_mock.async_publish.assert_not_called()
    assert (await c.get(f"{UI}/shoes")).status == 200


async def test_carry_over_shoes_takes_the_endurain_shoes_and_their_km(hass, setup):
    hass.states.async_set("sensor.trail", "412.4", {"nickname": "Trail"})
    hass.states.async_set("sensor.old", "50", {"nickname": "Old", "active": False})  # retired in Endurain
    hass.states.async_set("sensor.road", "unavailable", {"friendly_name": "Road"})
    await setup({OPT_SHADOW: False, OPT_SHOES: {"person1": {"sensor.trail": 700, "sensor.old": 500, "sensor.road": 600, "sensor.gone": 400},
                                                 "nobody": {"sensor.trail": 700}}})
    _run(hass, "person1", "r1", 5, 2)
    for _ in range(2):  # twice: nothing doubles
        await hass.services.async_call(DOMAIN, "carry_over_shoes", {}, blocking=True)
        rows = hass.data[DOMAIN].scores["people"]["person1"]["shoes"]
        assert [(s["name"], s["km"], s["limit"], s["runs"], s["current"]) for s in rows] == [
            ("Trail", 412.4, 700, 1, True), ("Road", 0.0, 600, 0, False)]
    assert hass.data[DOMAIN].scores["people"]["person2"]["shoes"] == []
