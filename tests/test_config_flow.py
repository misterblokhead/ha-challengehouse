import asyncio
from pathlib import Path
from unittest.mock import AsyncMock, MagicMock, patch

import aiohttp
from conftest import PEOPLE_OPTIONS
from engine.test_ingest import P0, P1
from homeassistant import config_entries
from homeassistant.components import persistent_notification
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import issue_registry as ir
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockUser
from test_steps import _phone

from custom_components.fitbridge import gym, opengym_app
from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_FOLDERS,
    OPT_GROUP,
    OPT_INVITES,
    OPT_OPENGYM_LINK,
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
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["people", "viewers", "inputs", "opengym", "gym_people"]
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
    assert result["description_placeholders"]["name"] == "Person 1" and "only works at home" in result["description_placeholders"]["warning"]
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


async def test_setup_without_the_warning_when_there_is_an_external_url(hass, enable_custom_integrations):
    hass.config.external_url = "https://ha.example.test"
    result, _ = await _start(hass, "Person 1")
    assert result["description_placeholders"]["warning"] == ""


async def test_setup_twice_at_once_makes_one_entry(hass, enable_custom_integrations):
    first, (user,) = await _start(hass, "Person 1")
    second = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    second = await hass.config_entries.flow.async_configure(second["flow_id"], {"users": [user.id]})
    for result in (first, second):
        result = await _answer(hass, result)
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "already_configured"
    assert len(hass.config_entries.async_entries(DOMAIN)) == 1


async def test_setup_after_a_failed_pairing_can_go_on_without_gym(hass, enable_custom_integrations, aioclient_mock):
    aioclient_mock.post(f"{GYM}/api/pair/redeem", exc=aiohttp.ClientConnectionError())
    result, _ = await _start(hass, "Person 1")
    result = await _answer(hass, result)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "pair"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"})
    assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "cannot_connect"}
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"skip": True})
    assert result["type"] is FlowResultType.CREATE_ENTRY and result["data"] == {}
    assert OPT_OPENGYM_URL not in result["options"]


async def test_setup_needs_a_person(hass, enable_custom_integrations):
    MockUser(name="Person 1").add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"users": []})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user" and result["errors"] == {"users": "no_people"}


async def _two(hass, group_answer):
    result, users = await _start(hass, "Person 1", "Person 2")
    result = await _answer(hass, result, plan="none", phone="android")
    assert result["step_id"] == "person" and result["description_placeholders"]["name"] == "Person 2"  # in the order ticked
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
    """No people known yet (scoring.toml invalid, none in the options): steps that would write per person wait."""
    for step in ("viewers", "inputs"):
        result = await _open(hass, entry, step)
        assert result["type"] is FlowResultType.ABORT and result["reason"] == "waiting_for_fitbridge"


async def test_options_people_steps_need_no_scores(hass, setup):
    e = await setup()
    hass.data[DOMAIN].runner.scores = None  # e.g. a scoring.toml broken after the last start
    result = await _people_step(hass, e, P0)
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "person_edit"
    result = await _open(hass, e, "viewers")
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "viewers"


async def test_options_map_users_to_people(hass, setup):
    e = await setup()
    alex, sam = MockUser(name="Alex").add_to_hass(hass), MockUser(name="Sam").add_to_hass(hass)
    twins = MockUser(id="aaaaaa01", name="Robin").add_to_hass(hass), MockUser(id="bbbbbb02", name="Robin").add_to_hass(hass)
    MockUser(id="cccccc03", name=None).add_to_hass(hass)  # a user without a name is labelled by its id
    MockUser(name="Gone", is_active=False).add_to_hass(hass)
    MockUser(name="Bot", system_generated=True).add_to_hass(hass)
    result = await _open(hass, e, "viewers")
    assert result["type"] is FlowResultType.FORM
    fields = [str(k) for k in result["data_schema"].schema]
    assert sorted(fields) == ["Alex", "Robin (aaaaaa)", "Robin (bbbbbb)", "Sam", "cccccc"]
    result = await hass.config_entries.options.async_configure(
        result["flow_id"], {"Alex": P0, "Sam": "", "Robin (bbbbbb)": P1})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"  # the shoes steps are gone: shoes are managed on the page
    assert sorted(str(k) for k in result["data_schema"].schema) == ["Person 1", "Person 2"]  # the people, by name
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options == {**PEOPLE_OPTIONS, OPT_VIEWERS: {alex.id: P0, twins[1].id: P1}, OPT_STEPS: {}}
    assert sam.id not in e.options[OPT_VIEWERS]


async def test_options_step_sensors_after_viewers(hass, setup):
    e = await setup({OPT_VIEWERS: {}, OPT_STEPS: {P1: "sensor.old_steps"}})
    result = await _open(hass, e, "viewers")
    result = await hass.config_entries.options.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "steps"
    assert {str(k): k.description for k in result["data_schema"].schema} == {
        "Person 1": {"suggested_value": None}, "Person 2": {"suggested_value": "sensor.old_steps"}}  # earlier choices are kept, and can be cleared
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"Person 1": "sensor.phone_steps"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options[OPT_STEPS] == {P0: "sensor.phone_steps"}


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
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "opengym_pair"
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


async def test_gym_people_pick_their_opengym_user(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        e = await setup({OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P1: "gone"}}, {"opengym_token": "tok"})
        aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}, {"id": "u2"}]})
        result = await _open(hass, e, "gym_people")
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "gym_people"
        assert aioclient_mock.mock_calls[0][3]["Authorization"] == "Bearer tok"
        schema = result["data_schema"].schema
        first, second = (str(k) for k in schema)
        assert [k.default() for k in schema] == ["", ""]  # a uid openGym no longer has is not offered
        assert [o["value"] for o in schema[next(iter(schema))].config["options"]] == ["", "invite", "u1", "u2"]
        result = await hass.config_entries.options.async_configure(result["flow_id"], {first: "u2", second: ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert e.options == {**PEOPLE_OPTIONS, OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P0: "u2"}}


async def test_gym_people_need_a_pairing(hass, setup):
    e = await setup()
    assert (await _open(hass, e, "gym_people"))["reason"] == "not_paired"


async def test_gym_people_without_the_user_list_still_invite_and_keep_what_is_there(hass, setup, aioclient_mock):
    aioclient_mock.get(f"{GYM}/api/admin/users", status=401)
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        e = await setup({OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P0: "u1"}, OPT_INVITES: {P1: "OLD2"}}, {"opengym_token": "tok"})
        before = dict(e.options)
        result = await _open(hass, e, "gym_people")
        assert result["type"] is FlowResultType.FORM
        (first, a), (second, b) = ((str(k), sel) for k, sel in result["data_schema"].schema.items())
        assert [o["value"] for o in a.config["options"]] == ["", "invite", "u1"]  # the linked account, though the list is not there
        assert [o["value"] for o in b.config["options"]] == ["", "keep", "invite"]
        result = await _configure(hass, result, {first: "u1", second: "keep"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert dict(e.options) == before


async def _gym_people(hass, aioclient_mock, *names):
    """Two (or more) people, paired, at the gym_people form; returns (result, field labels)."""
    aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-new"})
    aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}, {"id": "u2", "name": "Synthetic B"}]})
    result, _ = await _start(hass, *names)
    for _ in names:
        result = await _answer(hass, result)
    if len(names) == 2:
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"group": False})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "pair"})
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {OPT_OPENGYM_URL: GYM, "code": "ABCD"})
    assert result["step_id"] == "gym_people"
    return result, [str(k) for k in result["data_schema"].schema]


async def test_setup_one_gym_account_per_person(hass, enable_custom_integrations, aioclient_mock):
    result, (first, second) = await _gym_people(hass, aioclient_mock, "Person 1", "Person 2")
    with patch.object(gym, "async_invite", AsyncMock(return_value="C0DE")) as invite:
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {first: "u1", second: "u1"})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "duplicate_gym_user"}
        invite.assert_not_called()
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {first: "invite", second: "invite"})
        assert result["type"] is FlowResultType.CREATE_ENTRY  # one invite per person who picked Invite
    assert result["options"][OPT_INVITES] == {"person_1": "C0DE", "person_2": "C0DE"} and OPT_OPENGYM_UIDS not in result["options"]


async def test_setup_failed_invite_reshows_the_picks_and_a_retry_makes_fresh_codes(hass, enable_custom_integrations, aioclient_mock):
    result, (first, second) = await _gym_people(hass, aioclient_mock, "Person 1", "Person 2")
    with patch.object(gym, "async_invite", AsyncMock(side_effect=["C0DE", gym.GymError("cannot_connect")])) as invite, \
            patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {first: "invite", second: "invite"})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "invite_failed"}
        assert _field(result, first)[0].description == {"suggested_value": "invite"}  # the picks stay
        assert [c.args[3] for c in revoke.call_args_list] == ["C0DE"]  # nothing from a failed try is left live
        invite.side_effect = ["D0DE", "E0DE"]
        invite.reset_mock()
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {first: "invite", second: "invite"})
        assert [c.args[3] for c in invite.call_args_list] == ["Person 1", "Person 2"]
    assert result["options"][OPT_INVITES] == {"person_1": "D0DE", "person_2": "E0DE"}


async def _configure(hass, result, user_input):
    return await hass.config_entries.options.async_configure(result["flow_id"], user_input)


async def _people_step(hass, e, pick):
    """The People step with one pick: a person's id, or "+" for a new one."""
    result = await _open(hass, e, "people")
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "people"
    return await _configure(hass, result, {"person": pick})


async def test_add_person(hass, setup):
    e = await setup({OPT_VIEWERS: {"taken": P0}})
    free = MockUser(name="Person1").add_to_hass(hass)  # the slug person1 is taken
    MockUser(id="taken", name="Taken").add_to_hass(hass)
    MockUser(name="Gone", is_active=False).add_to_hass(hass)
    MockUser(name="Bot", system_generated=True).add_to_hass(hass)
    result = await _people_step(hass, e, "+")
    assert result["step_id"] == "person_add"
    assert [o["label"] for o in _field(result, "user")[1].config["options"]] == ["Person1"]  # a viewer, an inactive and a system user are not offered
    result = await _configure(hass, result, {"user": free.id, "plan": "none", "phone": "android"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done(wait_background_tasks=True)
    assert e.options[OPT_PEOPLE]["person1_2"] == {"name": "Person1", "plan_history": []}
    assert e.options[OPT_PHONES] == {"person1_2": "android"} and e.options[OPT_VIEWERS] == {"taken": P0, free.id: "person1_2"}
    assert e.options[OPT_GROUP] == PEOPLE_OPTIONS[OPT_GROUP] and e.options[OPT_START] == PEOPLE_OPTIONS[OPT_START]
    assert e.data[WEBHOOKS]["person1_2"] in hass.data["webhook"]  # the reload registered it


async def test_add_person_with_a_plan_starts_today(hass, setup):
    e = await setup()
    user = MockUser(name="Person 3").add_to_hass(hass)
    result = await _people_step(hass, e, "+")
    result = await _configure(hass, result, {"user": user.id, "plan": "c25k", "phone": "iphone"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options[OPT_PEOPLE]["person_3"]["plan_history"] == [{"plan": "c25k", "from": dt_util.now().date().isoformat()}]


async def test_add_person_making_two_asks_for_the_group(hass, setup):
    e = await setup({OPT_PEOPLE: {P0: PEOPLE_OPTIONS[OPT_PEOPLE][P0]}, OPT_GROUP: None})
    user = MockUser(name="Person 3").add_to_hass(hass)
    result = await _people_step(hass, e, "+")
    result = await _configure(hass, result, {"user": user.id, "plan": "none", "phone": "iphone"})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "group"
    assert [(str(k), k.default()) for k in result["data_schema"].schema] == [("group", True)]  # on by default
    result = await _configure(hass, result, {})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done(wait_background_tasks=True)
    assert e.options[OPT_GROUP] == {"name": "couple", "members": [P0, "person_3"]}
    assert set(hass.data[DOMAIN].runner.scores["people"]) == {P0, "person_3"}  # the engine took the group


async def test_add_person_never_reuses_a_retired_id_or_the_group_name(hass, setup):
    e = await setup(data={WEBHOOKS: {"person_3": "retired-hook"}})  # a person whose id still owns a webhook
    for name, pid in (("Person 3", "person_3_2"), ("Couple", "couple_2")):
        user = MockUser(name=name).add_to_hass(hass)
        result = await _people_step(hass, e, "+")
        result = await _configure(hass, result, {"user": user.id, "plan": "none", "phone": "iphone"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
        assert e.options[OPT_VIEWERS][user.id] == pid


async def test_setup_never_uses_the_group_name_as_an_id(hass, enable_custom_integrations):
    result, _ = await _start(hass, "Couple")
    result = await _answer(hass, result)
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "skip"})
    assert list(result["options"][OPT_PEOPLE]) == ["couple_2"]


async def test_add_person_needs_a_free_user(hass, setup):
    user = MockUser(name="Person 3").add_to_hass(hass)
    e = await setup({OPT_VIEWERS: {user.id: P0}})
    result = await _people_step(hass, e, "+")
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "no_free_users"


async def test_edit_person_plan_appends_history(hass, setup):
    e = await setup({OPT_PHONES: {P0: "iphone"}})
    old = e.options[OPT_PEOPLE][P0]["plan_history"]
    result = await _people_step(hass, e, P0)
    assert result["step_id"] == "person_edit"
    assert _field(result, "name")[0].description == {"suggested_value": "Person 1"} and _field(result, "plan")[0].default() == "keep"
    assert _field(result, "phone")[0].default() == "iphone"
    result = await _configure(hass, result, {"name": " Renamed ", "plan": "c25k", "phone": "android"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    today = dt_util.now().date().isoformat()
    assert e.options[OPT_PEOPLE][P0] == {"name": "Renamed", "plan_history": [*old, {"plan": "c25k", "from": today}]}
    assert e.options[OPT_PHONES][P0] == "android" and e.options[OPT_PEOPLE][P1] == PEOPLE_OPTIONS[OPT_PEOPLE][P1]


async def test_edit_person_none_keeps_history(hass, setup):
    e = await setup()
    old = e.options[OPT_PEOPLE][P1]["plan_history"]
    result = await _people_step(hass, e, P1)
    result = await _configure(hass, result, {"name": "Person 2", "plan": "none", "phone": "iphone"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options[OPT_PEOPLE][P1]["plan_history"] == [*old, {"plan": None, "from": dt_util.now().date().isoformat()}]


async def test_edit_person_keep_changes_no_plan_and_needs_a_name(hass, setup):
    e = await setup()
    result = await _people_step(hass, e, P0)
    result = await _configure(hass, result, {"name": "  ", "plan": "keep", "phone": "iphone"})
    assert result["type"] is FlowResultType.FORM and result["errors"] == {"name": "name_required"}
    result = await _configure(hass, result, {"name": "Person 1", "plan": "keep", "phone": "iphone"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    assert e.options[OPT_PEOPLE] == PEOPLE_OPTIONS[OPT_PEOPLE]


async def _gym_form(hass, setup, aioclient_mock, options):
    aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}, {"id": "u2", "name": "Synthetic B"}]})
    e = await setup({OPT_OPENGYM_URL: GYM, **options}, {"opengym_token": "tok"})
    result = await _open(hass, e, "gym_people")
    return e, result, [str(k) for k in result["data_schema"].schema]


async def test_gym_people_invite_then_revokes_old_code(hass, setup, aioclient_mock):
    calls = []

    async def revoke(hass_, url, token, code):
        calls.append(("revoke", code))

    async def invite(hass_, url, token, note):
        calls.append(("invite", note))
        return "NEW1"
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), patch.object(gym, "async_revoke", revoke), patch.object(gym, "async_invite", invite):
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1"}})
        assert _field(result, first)[0].default() == "keep"  # an unchanged form keeps the open invite
        assert [o["value"] for o in _field(result, first)[1].config["options"]] == ["", "keep", "invite", "u1", "u2"]
        assert [o["value"] for o in _field(result, second)[1].config["options"]] == ["", "invite", "u1", "u2"]
        result = await _configure(hass, result, {first: "invite", second: "invite"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert calls == [("invite", "Person 1"), ("invite", "Person 2"), ("revoke", "OLD1")]  # the old code goes once every new one exists
    assert e.options[OPT_INVITES] == {P0: "NEW1", P1: "NEW1"}


async def test_gym_people_pick_user_clears_invite(hass, setup, aioclient_mock, caplog):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1", P1: "OLD2"}})
        revoke.side_effect = [None, gym.GymError("cannot_connect")]
        result = await _configure(hass, result, {first: "u1", second: ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert [c.args[3] for c in revoke.call_args_list] == ["OLD1", "OLD2"]
    assert OPT_INVITES not in e.options and e.options[OPT_OPENGYM_UIDS] == {P0: "u1"}
    assert f"Could not withdraw an unused openGym invite for {P1}" in caplog.text and "OLD" not in caplog.text


async def test_gym_people_keep_leaves_the_invite(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1"}})
        result = await _configure(hass, result, {first: "keep", second: "u2"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    revoke.assert_not_called()
    assert e.options[OPT_INVITES] == {P0: "OLD1"} and e.options[OPT_OPENGYM_UIDS] == {P1: "u2"}


async def test_gym_people_keep_takes_a_link_made_while_the_form_was_open(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1"}})
        hass.data[DOMAIN].runner._link({P0: "u1"}, {P0: "OLD1"})  # a cycle sees the invite used
        result = await _configure(hass, result, {first: "keep", second: ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    revoke.assert_not_called()
    assert e.options[OPT_OPENGYM_UIDS] == {P0: "u1"} and OPT_INVITES not in e.options


async def test_gym_people_one_account_per_person(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), patch.object(gym, "async_invite", AsyncMock()) as invite, \
            patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1"}})
        result = await _configure(hass, result, {first: "u1", second: "u1"})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "duplicate_gym_user"}
        invite.assert_not_called()
        revoke.assert_not_called()  # checked before anything is made or withdrawn


async def test_gym_people_failed_invite_changes_nothing(hass, setup, aioclient_mock):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None), \
            patch.object(gym, "async_invite", AsyncMock(side_effect=["NEW1", gym.GymError("cannot_connect")])), \
            patch.object(gym, "async_revoke", AsyncMock()) as revoke:
        e, result, (first, second) = await _gym_form(hass, setup, aioclient_mock, {OPT_INVITES: {P0: "OLD1"}})
        before = dict(e.options)
        result = await _configure(hass, result, {first: "invite", second: "invite"})
        assert result["type"] is FlowResultType.FORM and result["errors"] == {"base": "invite_failed"}
        assert [c.args[3] for c in revoke.call_args_list] == ["NEW1"]  # only the code made meanwhile; the old one is still the person's
        assert _field(result, first)[0].description == {"suggested_value": "invite"}  # the picks stay
    assert dict(e.options) == before


async def test_people_not_migrated_are_left_alone(hass, setup):
    """An entry whose migration is still pending (scoring.toml unreadable) has no people in its options: neither add nor
    edit may start."""
    path = Path(hass.config.path("fitbridge", "scoring.toml"))
    path.parent.mkdir()
    path.write_text("not [toml", encoding="utf-8")
    e = await setup(minor_version=3)
    assert e.minor_version == 3
    MockUser(name="Person 3").add_to_hass(hass)
    before = dict(e.options)
    result = await _open(hass, e, "people")
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "people_not_migrated"
    assert dict(e.options) == before


async def test_first_person_after_a_migration_without_people(hass, setup):
    """Migrated (minor 4) while scoring.toml was missing: People adds the first person, as the first setup would."""
    e = await setup(minor_version=4)
    hass.config_entries.async_update_entry(e, options={})
    user = MockUser(name="Person 3").add_to_hass(hass)
    result = await _open(hass, e, "people")
    assert [o["value"] for o in _field(result, "person")[1].config["options"]] == ["+"]
    result = await _configure(hass, result, {"person": "+"})
    result = await _configure(hass, result, {"user": user.id, "plan": "c25k", "phone": "iphone"})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    await hass.async_block_till_done(wait_background_tasks=True)
    today = dt_util.now().date().isoformat()
    assert e.options == {OPT_PEOPLE: {"person_3": {"name": "Person 3", "plan_history": [{"plan": "c25k", "from": today}]}},
                         OPT_START: today, OPT_PHONES: {"person_3": "iphone"}, OPT_VIEWERS: {user.id: "person_3"}}
    assert set(hass.data[DOMAIN].runner.scores["people"]) == {"person_3"}


APP = "http://abcd1234-opengym:8099"
HA = "https://ha.example.test"


def _app(**overrides):
    """opengym_app with a Supervisor, a detected address and an install that works, unless overridden; (patcher, mocks)."""
    mocks = {"available": MagicMock(return_value=True), "detected_address": MagicMock(return_value="https://abc.ui.nabu.casa"),
             "async_install": AsyncMock(return_value=("abcd1234_opengym", APP)), "async_invite_only": AsyncMock(), **overrides}
    return patch.multiple(opengym_app, **mocks), mocks


async def _install(hass, address=HA):
    """One person set up, the install form answered; returns the result after it."""
    result, _ = await _start(hass, "Person 1")
    result = await _answer(hass, result)
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["skip", "pair", "install"]
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "install"})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "install"
    return await hass.config_entries.flow.async_configure(result["flow_id"], {"address": address})


async def _installed(hass, result, flow):
    """Past the progress step, once the install has finished."""
    assert result["type"] is FlowResultType.SHOW_PROGRESS and result["step_id"] == "install_progress"
    assert result["progress_action"] == "install_app"
    await hass.async_block_till_done()
    return await flow.async_configure(result["flow_id"])


async def test_setup_install_hidden_without_supervisor(hass, enable_custom_integrations):
    patcher, _ = _app(available=MagicMock(return_value=False))
    with patcher:
        result, _ = await _start(hass, "Person 1")
        result = await _answer(hass, result)
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["skip", "pair"]


async def test_setup_install_prefills_and_takes_the_edited_address(hass, enable_custom_integrations):
    patcher, app = _app()
    with patcher:
        result, _ = await _start(hass, "Person 1")
        result = await _answer(hass, result)
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "install"})
        assert _field(result, "address")[0].description == {"suggested_value": "https://abc.ui.nabu.casa"}
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"address": " ha.example.test/"})
        result = await _installed(hass, result, hass.config_entries.flow)
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "install_pair"
    app["async_install"].assert_awaited_once_with(hass, HA)  # what the person confirmed, not what was detected


async def test_setup_install_rejects_http(hass, enable_custom_integrations):
    patcher, app = _app()
    with patcher:
        result = await _install(hass, "http://homeassistant.local:8123")
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "install" and result["errors"] == {"address": "address_https"}
    app["async_install"].assert_not_called()


async def test_setup_install_pair_and_invite(hass, enable_custom_integrations, aioclient_mock, caplog):
    aioclient_mock.post(f"{APP}/api/pair/redeem", json={"token": "tok-new"})
    aioclient_mock.get(f"{APP}/api/admin/users", json={"users": []})
    patcher, app = _app()
    with patcher, patch.object(runner_mod.Runner, "_opengym", return_value=None):
        result = await _installed(hass, await _install(hass), hass.config_entries.flow)
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "install_pair"
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"code": "AB12cd"})
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "gym_people"
        app["async_invite_only"].assert_awaited_once_with(hass, "abcd1234_opengym")
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"Person 1": ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert aioclient_mock.mock_calls[0][2] == {"code": "AB12cd"}  # redeemed at the app's internal address
    assert result["data"] == {"opengym_token": "tok-new"}
    assert result["options"][OPT_OPENGYM_URL] == APP and result["options"][OPT_OPENGYM_LINK] == f"{HA}/abcd1234_opengym"
    assert persistent_notification._async_get_or_create_notifications(hass) == {}
    assert "tok-new" not in caplog.text and "AB12cd" not in caplog.text


async def test_setup_install_failure_offers_retry_pair_or_skip(hass, enable_custom_integrations):
    patcher, app = _app(async_install=AsyncMock(side_effect=[opengym_app.AppError("app_install_failed"), ("abcd1234_opengym", APP)]))
    with patcher:
        result = await _installed(hass, await _install(hass), hass.config_entries.flow)
        assert result["type"] is FlowResultType.MENU and result["step_id"] == "install_failed"
        assert result["menu_options"] == ["install", "pair", "skip"]
        assert "could not install" in result["description_placeholders"]["reason"]  # the reason, readable
        assert hass.config_entries.async_entries(DOMAIN) == []
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "install"})  # retry
        assert result["step_id"] == "install" and _field(result, "address")[0].description == {"suggested_value": HA}
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"address": HA})
        result = await _installed(hass, result, hass.config_entries.flow)
    assert result["step_id"] == "install_pair" and app["async_install"].await_count == 2


async def test_setup_invite_only_failure_still_creates_the_entry(hass, enable_custom_integrations, aioclient_mock):
    aioclient_mock.post(f"{APP}/api/pair/redeem", json={"token": "tok-new"})
    aioclient_mock.get(f"{APP}/api/admin/users", json={"users": []})
    patcher, _ = _app(async_invite_only=AsyncMock(side_effect=opengym_app.AppError("app_start_failed")))
    with patcher, patch.object(runner_mod.Runner, "_opengym", return_value=None):
        result = await _installed(hass, await _install(hass), hass.config_entries.flow)
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"code": "AB12cd"})
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"Person 1": ""})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    (note,) = persistent_notification._async_get_or_create_notifications(hass).values()
    assert note["message"] == "openGym: switch on \"invite_only\" in the openGym app's settings"


async def test_install_pair_wrong_code_stays(hass, enable_custom_integrations, aioclient_mock):
    aioclient_mock.post(f"{APP}/api/pair/redeem", status=404, json={"error": "unknown code"})
    patcher, app = _app()
    with patcher:
        result = await _installed(hass, await _install(hass), hass.config_entries.flow)
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"code": "nope"})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "install_pair" and result["errors"] == {"base": "invalid_code"}
    app["async_invite_only"].assert_not_called()


async def test_options_install_pairs_and_saves_both_addresses(hass, setup, aioclient_mock):
    aioclient_mock.post(f"{APP}/api/pair/redeem", json={"token": "tok-new"})
    patcher, app = _app()
    with patcher, patch.object(runner_mod.Runner, "_opengym", return_value=None):
        e = await setup()
        result = await _open(hass, e, "opengym")
        assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["opengym_pair", "install"]
        result = await _configure(hass, result, {"next_step_id": "install"})
        result = await _configure(hass, result, {"address": HA})
        result = await _installed(hass, result, hass.config_entries.options)
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "install_pair"
        result = await _configure(hass, result, {"code": "AB12cd"})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
    assert e.data["opengym_token"] == "tok-new"  # runner.async_pair stored it
    assert e.options == {**PEOPLE_OPTIONS, OPT_OPENGYM_URL: APP, OPT_OPENGYM_LINK: f"{HA}/abcd1234_opengym"}
    app["async_invite_only"].assert_awaited_once_with(hass, "abcd1234_opengym")
