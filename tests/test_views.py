import json
import re

import pytest
from conftest import SCORES
from homeassistant.auth.const import GROUP_ID_ADMIN, GROUP_ID_USER
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge.const import OPT_VIEWERS

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
    assert body["people"] == SCORES["people"] and body["viewer"] == {"person": "p1", "can_edit": ["p1"]}
    robin = await (await (await client("robin")).get(f"{UI}/scores")).json()
    assert robin["viewer"] == {"person": None, "can_edit": []}


@pytest.mark.parametrize("key,action", [("k1", "remove"), ("manual:a/b", "restore")])
async def test_own_workout_publishes_retained_manual_message(hass, client, send, mqtt_mock, key, action):
    await send(SCORES)
    mqtt_mock.async_publish.reset_mock()
    resp = await (await client("alex")).post(f"{UI}/workouts", json={"person": "p1", "key": key, "action": action})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    mqtt_mock.async_publish.assert_called_once()
    topic, payload, qos, retain = mqtt_mock.async_publish.call_args.args
    assert re.fullmatch(r"fitbridge/manual/\d+-[0-9a-f]{6}", topic)
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
