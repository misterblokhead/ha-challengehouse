import asyncio
from unittest.mock import patch

import aiohttp
from conftest import SCORES
from engine.test_ingest import P0, P1
from homeassistant import config_entries
from homeassistant.data_entry_flow import FlowResultType
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockUser

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_FOLDERS,
    OPT_OPENGYM_UIDS,
    OPT_OPENGYM_URL,
    OPT_SHADOW,
    OPT_STEPS,
    OPT_VIEWERS,
    WEBHOOKS,
)

GYM = "https://gym.example.test"


async def _open(hass, entry, step):
    """The options flow, past its menu."""
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] is FlowResultType.MENU and result["menu_options"] == ["viewers", "opengym", "people", "inputs", "mode"]
    return await hass.config_entries.options.async_configure(result["flow_id"], {"next_step_id": step})


async def test_one_empty_step_creates_the_only_entry(hass, enable_custom_integrations, mqtt_mock):
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {})
    assert result["type"] is FlowResultType.CREATE_ENTRY and result["data"] == {}
    assert result["result"].unique_id == DOMAIN
    assert result["result"].options == {OPT_SHADOW: False} and result["result"].minor_version == 2  # a new install is live
    await hass.async_block_till_done()
    again = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert again["type"] is FlowResultType.ABORT and again["reason"] == "single_instance_allowed"


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
    assert entry.options == {OPT_SHADOW: True,  # options the flow does not show are kept
                             OPT_VIEWERS: {alex.id: "p1", twins[1].id: "p2"}, OPT_STEPS: {}}
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
    e = await setup({OPT_SHADOW: False, OPT_VIEWERS: {"u1": P0}})
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
    assert e.options == {OPT_SHADOW: False, OPT_VIEWERS: {"u1": P0}, OPT_FOLDERS: {P0: str(tmp_path)}}
    await hass.async_block_till_done(wait_background_tasks=True)
    assert hass.data[DOMAIN].runner.folders == {P0: tmp_path}  # reloaded with it


async def test_inputs_make_new_webhook_urls_and_retire_the_old_ones(hass, setup):
    e = await setup({OPT_SHADOW: False})
    old = dict(e.data[WEBHOOKS])
    result = await _open(hass, e, "inputs")
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"new_urls": True})
    assert result["type"] is FlowResultType.CREATE_ENTRY and "new_urls" not in e.options
    await hass.async_block_till_done(wait_background_tasks=True)
    new = e.data[WEBHOOKS]
    assert new.keys() == old.keys() and not set(new.values()) & set(old.values())
    assert not set(old.values()) & set(hass.data["webhook"]) and set(new.values()) <= set(hass.data["webhook"])


async def test_mode_turns_shadow_on_and_off_and_keeps_the_other_options(hass, setup, mqtt_mock, send):
    e = await setup({OPT_SHADOW: False, OPT_VIEWERS: {"u1": P0}})
    for shadow in (True, False):
        if shadow is False:
            await send(SCORES)  # in shadow the options wait for the LXC's scores
        result = await _open(hass, e, "mode")
        assert result["type"] is FlowResultType.FORM and result["step_id"] == "mode"
        assert [k.default() for k in result["data_schema"].schema] == [not shadow]  # the current mode
        result = await hass.config_entries.options.async_configure(result["flow_id"], {OPT_SHADOW: shadow})
        assert result["type"] is FlowResultType.CREATE_ENTRY
        await hass.async_block_till_done(wait_background_tasks=True)
        assert e.options == {OPT_SHADOW: shadow, OPT_VIEWERS: {"u1": P0}}
        assert hass.data[DOMAIN].runner.shadow is shadow  # reloaded in that mode


async def test_opengym_pairing_stores_the_token_and_clears_the_issue(hass, setup, aioclient_mock, caplog):
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):  # no real gym in tests
        e = await setup({OPT_SHADOW: False, OPT_STEPS: {P0: "sensor.steps"}}, {"opengym_token": "tok-old"})
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
    assert e.options == {OPT_SHADOW: False, OPT_STEPS: {P0: "sensor.steps"}, OPT_OPENGYM_URL: GYM}
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
        e = await setup({OPT_SHADOW: False, OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P1: "gone"}}, {"opengym_token": "tok"})
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
    assert e.options == {OPT_SHADOW: False, OPT_OPENGYM_URL: GYM, OPT_OPENGYM_UIDS: {P0: "u2"}}


async def test_people_need_a_pairing_and_a_reachable_gym(hass, setup, aioclient_mock):
    e = await setup()
    assert (await _open(hass, e, "people"))["reason"] == "not_paired"
    with patch.object(runner_mod.Runner, "_opengym", return_value=None):
        hass.config_entries.async_update_entry(e, data={**e.data, "opengym_token": "tok"}, options={OPT_OPENGYM_URL: GYM})
        aioclient_mock.get(f"{GYM}/api/admin/users", status=401)
        assert (await _open(hass, e, "people"))["reason"] == "cannot_connect"
