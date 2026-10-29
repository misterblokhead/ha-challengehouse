import asyncio
from unittest.mock import patch

import aiohttp
from conftest import PEOPLE_OPTIONS, SCORES
from engine.test_ingest import P0, P1
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import issue_registry as ir
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockUser
from test_steps import _phone

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_FOLDERS,
    OPT_GROUP,
    OPT_INVITES,
    OPT_OPENGYM_UIDS,
    OPT_OPENGYM_URL,
    OPT_PEOPLE,
    OPT_PHONES,
    OPT_START,
    OPT_STEPS,
    OPT_VIEWERS,
    WEBHOOKS,
)

GYM = "https://gym.example.test"


async def _open(hass, entry, step):
    """The options flow, past its menu."""
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["viewers", "opengym", "people", "inputs"]
    return await hass.config_entries.options.async_configure(result["flow_id"], {"next_step_id": step})


async def _start(hass, *names):
    """The first setup flow at its person step: one MockUser per name, all ticked; returns (result, users)."""
    users = [MockUser(name=n).add_to_hass(hass) for n in names]
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"users": [u.id for u in users]})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "person"
    return result, users


async def _answer(hass, result, plan="c25k", phone="iphone", **extra):
    return await hass.config_entries.flow.async_configure(result["flow_id"], {"plan": plan, "phone": phone, **extra})


async def test_setup_one_person_no_gym(hass, enable_custom_integrations):
    MockUser(name="Gone", is_active=False).add_to_hass(hass)
    MockUser(name="Bot", system_generated=True).add_to_hass(hass)
    result, (user,) = await _start(hass, "Person 1")
    assert result["description_placeholders"] == {"name": "Person 1"}
    result = await _answer(hass, result)
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["skip", "pair"]  # one person: no group step
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    assert result["type"] is FlowResultType.CREATE_ENTRY and result["title"] == "ChallengeHouse" and result["data"] == {}
    today = dt_util.now().date().isoformat()
    assert result["options"] == {
        OPT_PEOPLE: {"person_1": {"name": "Person 1", "plan_history": [{"plan": "c25k", "from": today}]}},
        OPT_START: today, OPT_PHONES: {"person_1": "iphone"}, OPT_VIEWERS: {user.id: "person_1"}, OPT_STEPS: {}}
    assert result["result"].unique_id == DOMAIN and result["result"].minor_version == 4
    await hass.async_block_till_done(wait_background_tasks=True)
    assert set(result["result"].data[WEBHOOKS]) == {"person_1"}  # the entry sets up with its people
    again = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert again["type"] is FlowResultType.ABORT and again["reason"] == "single_instance_allowed"


async def test_setup_needs_a_person(hass, enable_custom_integrations):
    MockUser(name="Person 1").add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"users": []})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user" and result["errors"] == {"users": "no_people"}


async def _two(hass, group_answer):
    result, users = await _start(hass, "Person 1", "Person 2")
    result = await _answer(hass, result, plan="none", phone="android")
    assert result["step_id"] == "person" and result["description_placeholders"] == {"name": "Person 2"}  # in the order ticked
    result = await _answer(hass, result)
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "group"
    assert [(str(k), k.default()) for k in result["data_schema"].schema] == [("group", True)]  # on by default
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {} if group_answer is None else {"group": group_answer})
    assert result["type"] is FlowResultType.MENU
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    return result["options"], users


async def test_setup_two_people_group_default_on(hass, enable_custom_integrations):
    options, users = await _two(hass, None)
    assert options[OPT_GROUP] == {"name": "couple", "members": ["person_1", "person_2"]}
    assert options[OPT_PEOPLE]["person_1"]["plan_history"] == []  # no plan
    assert options[OPT_PEOPLE]["person_2"]["plan_history"][0]["plan"] == "c25k"
    assert options[OPT_PHONES] == {"person_1": "android", "person_2": "iphone"}
    assert options[OPT_VIEWERS] == {users[0].id: "person_1", users[1].id: "person_2"}


async def test_setup_two_people_group_off(hass, enable_custom_integrations):
    options, _ = await _two(hass, False)
    assert OPT_GROUP not in options


async def test_setup_three_people_no_group_step(hass, enable_custom_integrations):
    result, _ = await _start(hass, "Person 1", "Person 2", "Person 3")
    for _ in range(3):
        assert result["step_id"] == "person"
        result = await _answer(hass, result)
    assert result["type"] is FlowResultType.MENU
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    assert OPT_GROUP not in result["options"] and len(result["options"][OPT_PEOPLE]) == 3


def _field(result, name):
    """(key, selector) of a form field."""
    schema = result["data_schema"].schema
    key = next(k for k in schema if str(k) == name)
    return key, schema[key]


async def test_setup_offers_and_keeps_the_step_sensors(hass, enable_custom_integrations):
    one, a, b = _phone(hass, "u-one", "one_steps"), _phone(hass, "u-two", "phone_steps"), _phone(hass, "u-two", "watch_steps")
    users = [MockUser(id=f"u-{n}", name=f"Person {i}").add_to_hass(hass) for i, n in enumerate(("one", "two", "three"), 1)]
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"users": [u.id for u in users]})
    key, _ = _field(result, "steps")
    assert key.description == {"suggested_value": one}  # the only candidate: suggested, so it can be cleared
    result = await _answer(hass, result, steps=one)
    key, selector = _field(result, "steps")
    assert sorted(selector.config["include_entities"]) == sorted([a, b]) and not (key.description or {}).get("suggested_value")  # several: only those
    result = await _answer(hass, result, steps=b)
    key, selector = _field(result, "steps")
    assert "include_entities" not in selector.config and not (key.description or {}).get("suggested_value")  # none: any sensor
    result = await _answer(hass, result)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    assert result["options"][OPT_STEPS] == {"person_1": one, "person_2": b}


async def test_setup_pair_and_invite(hass, enable_custom_integrations, aioclient_mock, caplog):
    result, _ = await _start(hass, "Person 1", "Person 2")
    result = await _answer(hass, result)
    result = await _answer(hass, result)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"group": False})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "pair"})
    assert result["step_id"] == "pair"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ab-1"})
    assert result["errors"] == {"code": "invalid_code"} and aioclient_mock.call_count == 0
    aioclient_mock.post(f"{GYM}/api/pair/redeem", status=404, json={"error": "unknown code"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"})
    assert result["errors"] == {"base": "invalid_code"}
    aioclient_mock.clear_requests()
    aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-new"})
    aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}]})
    aioclient_mock.post(f"{GYM}/api/admin/invites/new", json={"invite": {"code": "C0DE"}})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: " gym.example.test/", "code": "ABCD"})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "gym_people"
    schema = result["data_schema"].schema
    first, second = (str(k) for k in schema)
    assert [(o["value"], o["label"]) for o in schema[next(iter(schema))].config["options"]] == [
        ("", "Nobody"), ("invite", "Invite"), ("u1", "Synthetic A")]
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {first: "invite", second: "u1"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert result["data"] == {"opengym_token": "tok-new"}
    assert result["options"][OPT_OPENGYM_URL] == GYM
    assert result["options"][OPT_INVITES] == {"person_1": "C0DE"} and result["options"][OPT_OPENGYM_UIDS] == {"person_2": "u1"}
    invites = [c for c in aioclient_mock.mock_calls if c[1].path == "/api/admin/invites/new"]
    assert [c[2] for c in invites] == [{"note": "Person 1"}]  # the person's name
    assert "tok-new" not in caplog.text and "C0DE" not in caplog.text


async def test_setup_invite_failure_creates_nothing(hass, enable_custom_integrations, aioclient_mock):
    aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-new"})
    aioclient_mock.get(f"{GYM}/api/admin/users", exc=aiohttp.ClientConnectionError())  # no list: Nobody and Invite only
    aioclient_mock.post(f"{GYM}/api/admin/invites/new", status=500, json={})
    result, _ = await _start(hass, "Person 1")
    result = await _answer(hass, result)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "pair"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"})
    assert result["step_id"] == "gym_people"
    field, selector = _field(result, next(str(k) for k in result["data_schema"].schema))
    assert [o["value"] for o in selector.config["options"]] == ["", "invite"]
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {str(field): "invite"})
    assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "invite_failed"}
    assert hass.config_entries.async_entries(DOMAIN) == []


async def test_options_wait_for_fitbridge(hass, entry):
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "waiting_for_fitbridge"


async def test_options_map_users_to_people(hass, entry, send):
    await send(SCORES)
    alex, sam = MockUser(name="Alex").add_to_hass(hass), MockUser(name="Sam").add_to_hass(hass)
    twins = MockUser(id="aaaaaa01", name="Robin").add_to_hass(hass), MockUser(id="bbbbbb02", name="Robin").add_to_hass(hass)
    MockUser(id="cccccc03", name=None).add_to_hass(hass)  # a user without a name is labelled by its id
    MockUser(name="Gone", is_active=False).add_to_hass(hass)
    MockUser(name="Bot", system_generated=True).add_to_hass(hass)
    result = await _open(hass, entry, "viewers")
    assert result["type"] is FlowResultType.FORM
    fields = [str(k) for k in result["data_schema"].schema]
    assert sorted(fields) == ["Alex", "Robin (aaaaaa)", "Robin (bbbbbb)", "Sam", "cccccc"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"Alex": "p1", "Sam": "", "Robin (bbbbbb)": "p2"})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"  # the shoes steps are gone: shoes are managed on the page
    assert sorted(str(k) for k in result["data_schema"].schema) == ["Alex", "Sam"]  # the payload's people, by name
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options == {OPT_VIEWERS: {alex.id: "p1", twins[1].id: "p2"}, OPT_STEPS: {}}
    assert sam.id not in entry.options[OPT_VIEWERS]


async def test_options_step_sensors_after_viewers(hass, entry, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={OPT_VIEWERS: {}, OPT_STEPS: {"p2": "sensor.old_steps"}})
    result = await _open(hass, entry, "viewers")
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"
    assert {str(k): k.description for k in result["data_schema"].schema} == {
        "Alex": {"suggested_value": None}, "Sam": {"suggested_value": "sensor.old_steps"}}  # earlier choices are kept, and can be cleared
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"Alex": "sensor.phone_steps"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert entry.options[OPT_STEPS] == {"p1": "sensor.phone_steps"}


async def test_inputs_show_each_persons_url_and_take_existing_folders_only(hass, setup, tmp_path):
    e = await setup({OPT_VIEWERS: {"u1": P0}})
    hass.config.external_url = "https://ha.example.test"
    result = await _open(hass, e, "inputs")
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "inputs"
    urls = result["description_placeholders"]["urls"]
    assert all(f"https://ha.example.test/api/webhook/{hook}" in urls for hook in e.data[WEBHOOKS].values())
    first, second, new_urls = (str(k) for k in result["data_schema"].schema)
    assert new_urls == "new_urls"
    for bad in (str(tmp_path / "gone"), "share/relative"):
        result = await hass.config_entries.options.async_configure(result["flow_id"], {first: bad})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {first: "folder_missing"}
    result = await hass.config_entries.options.async_configure(result["flow_id"], {first: str(tmp_path), second: " "})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options == {**PEOPLE_OPTIONS, OPT_VIEWERS: {"u1": P0}, OPT_FOLDERS: {P0: str(tmp_path)}}
    await hass.async_block_till_done(wait_background_tasks=True)
    assert hass.data[DOMAIN].runner.folders == {P0: tmp_path}  # reloaded with it


async def test_inputs_make_new_webhook_urls_and_retire_the_old_ones(hass, setup):
    e = await setup({})
    old = dict(e.data[WEBHOOKS])
    result = await _open(hass, e, "inputs")
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"new_urls": True})
    assert result["type"] is FlowResultType.CREATE_ENTRY and "new_urls" not in e.options
    await hass.async_block_till_done(wait_background_tasks=True)
    new = e.data[WEBHOOKS]
    assert new.keys() == old.keys() and not set(new.values()) & set(old.values())
    assert not set(old.values()) & set(hass.data["webhook"]) and set(new.values()) <= set(hass.data["webhook"])


async def test_opengym_pairing_stores_the_token_and_clears_the_issue(hass, setup, aioclient_mock, caplog):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):  # no real gym in tests
        e = await setup({OPT_STEPS: {P0: "sensor.steps"}}, {"opengym_token": "tok-old"})
        ir.async_create_issue(hass, DOMAIN, "opengym_token", is_fixable=False, severity=ir.IssueSeverity.ERROR,
                              translation_key="opengym_token")
        aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-new"})
        result = await _open(hass, e, "opengym")
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "opengym"
        result = await hass.config_entries.options.async_configure(result["flow_id"], {OPT_OPENGYM_URL: " gym.example.test/", "code": "AB12cd"})  # typed without https://
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert aioclient_mock.mock_calls[0][2] == {"code": "AB12cd"}
    assert e.data["opengym_token"] == "tok-new" and WEBHOOKS in e.data
    assert e.options == {**PEOPLE_OPTIONS, OPT_STEPS: {P0: "sensor.steps"}, OPT_OPENGYM_URL: GYM}
    assert ir.async_get(hass).async_get_issue(DOMAIN, "opengym_token") is None
    assert "tok-" not in caplog.text and "AB12cd" not in caplog.text


async def test_opengym_pairing_errors_keep_the_old_token(hass, setup, aioclient_mock):
    e = await setup()
    redeem = f"{GYM}/api/pair/redeem"
    result = await _open(hass, e, "opengym")
    result = await hass.config_entries.options.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ab-1"})
    assert result["errors"] == {"code": "invalid_code"} and aioclient_mock.call_count == 0  # never sent
    for reply, error in (({"json": {"error": "unknown code"}, "status": 404}, "invalid_code"), ({"json": {}}, "invalid_code"),
                         ({"exc": aiohttp.ClientConnectionError()}, "cannot_connect"),
                         ({"text": "<html>bad gateway</html>", "status": 502}, "cannot_connect")):
        aioclient_mock.clear_requests()
        aioclient_mock.post(redeem, **reply)
        result = await hass.config_entries.options.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": error}
    assert "opengym_token" not in e.data


async def test_pairing_waits_for_a_running_cycle_so_its_renewal_cannot_overwrite_the_new_token(hass, setup, aioclient_mock):
    e = await setup()
    aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-new"})
    result = await _open(hass, e, "opengym")
    runner = hass.data[DOMAIN].runner
    await runner._lock.acquire()  # a cycle with the old token is running
    task = hass.async_create_task(hass.config_entries.options.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"}))
    for _ in range(20):
        await asyncio.sleep(0)
    assert not task.done()
    runner._store_token("tok-old-renewed")  # that cycle's renewal lands
    runner._lock.release()
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        assert (await task)["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert e.data["opengym_token"] == "tok-new"


async def test_people_pick_their_opengym_user(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        e = await setup({OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P1: "gone"}}, {"opengym_token": "tok"})
        aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}, {"id": "u2"}]})
        result = await _open(hass, e, "people")
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "people"
        assert aioclient_mock.mock_calls[0][3]["Authorization"] == "Bearer tok"
        schema = result["data_schema"].schema
        first, second = (str(k) for k in schema)
        assert [k.default() for k in schema] == ["", ""]  # a uid openGym no longer has is not offered
        assert [o["value"] for o in schema[next(iter(schema))].config["options"]] == ["", "u1", "u2"]
        result = await hass.config_entries.options.async_configure(result["flow_id"], {first: "u2", second: ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert e.options == {**PEOPLE_OPTIONS, OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P0: "u2"}}


async def test_people_need_a_pairing_and_a_reachable_gym(hass, setup, aioclient_mock):
    e = await setup()
    assert (await _open(hass, e, "people"))["reason"] == "not_paired"
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        hass.config_entries.async_update_entry(e, data={**e.data, "opengym_token": "tok"}, options={OPT_OPENGYM_URL: GYM})
        aioclient_mock.get(f"{GYM}/api/admin/users", status=401)
        assert (await _open(hass, e, "people"))["reason"] == "cannot_connect"
