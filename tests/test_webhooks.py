"""Webhooks per person and watch folders (synthetic data only)."""
import json
from datetime import timedelta
from pathlib import Path
from unittest.mock import AsyncMock, patch

import pytest
from engine.test_ingest import P0, P1, TRACK, gpx_with_points, hex_workout, hex_zip
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.network import NoURLAvailableError
from homeassistant.setup import async_setup_component
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge import webhooks
from custom_components.fitbridge.const import DOMAIN, OPT_FOLDERS, OPT_SHADOW, WEBHOOKS
from custom_components.fitbridge.engine.cycle import score_cycle

MB16 = 16 * 1024 * 1024


@pytest.fixture
def cycles():
    with patch.object(runner_mod, "score_cycle", wraps=score_cycle) as m:
        yield m


@pytest.fixture
async def client(hass, hass_client_no_auth):
    assert await async_setup_component(hass, "http", {})  # the test client needs it before the entry is set up
    return await hass_client_no_auth()


async def _post(hass, client, hook, body, status=200):
    resp = await client.post(f"/api/webhook/{hook}", data=body)
    assert resp.status == status
    await hass.async_block_till_done(wait_background_tasks=True)
    return await resp.json() if resp.content_type == "application/json" else None


def _counts(hass):
    return hass.data[DOMAIN].runner.store.counts()


async def test_each_person_gets_a_kept_webhook_and_bodies_land_as_their_rows(hass, setup, client, cycles):
    e = await setup()
    hooks = e.data[WEBHOOKS]
    p0, p1 = people = list(hooks)
    assert people == list(await hass.data[DOMAIN].runner.async_people()) and len(set(hooks.values())) == 2
    assert await _post(hass, client, hooks[p1], hex_zip([hex_workout("A")])) == {"workouts": 1, "new": 1}
    assert await _post(hass, client, hooks[p1], json.dumps({"workouts": [hex_workout("B")]}).encode()) == {"workouts": 1, "new": 1}
    assert await _post(hass, client, hooks[p0], gpx_with_points()) == {"new": True}
    assert _counts(hass) == {p0: {"stored": 1}, p1: {"archived": 2}}
    assert cycles.call_count == 4  # setup, then one per new upload
    await hass.config_entries.async_reload(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert e.data[WEBHOOKS] == hooks  # the phones keep their URL


async def test_the_same_upload_twice_is_one_row_and_one_score(hass, setup, client, cycles):
    hooks = (await setup()).data[WEBHOOKS]
    p0, p1 = list(hooks)
    body = hex_zip([hex_workout("A"), hex_workout("R", "running")])
    assert await _post(hass, client, hooks[p1], body) == {"workouts": 2, "new": 2}
    assert await _post(hass, client, hooks[p1], body) == {"workouts": 2, "new": 0}  # a phone retry after a timeout
    assert await _post(hass, client, hooks[p0], gpx_with_points()) == {"new": True}
    assert await _post(hass, client, hooks[p0], gpx_with_points()) == {"new": False}
    assert _counts(hass) == {p0: {"stored": 1}, p1: {"archived": 1, "awaiting_route": 1}}
    assert cycles.call_count == 3  # setup + one per first upload: no second announcement


async def test_junk_is_400_stores_nothing_and_logs_the_class_only(hass, setup, client, caplog):
    hooks = (await setup()).data[WEBHOOKS]
    p1 = list(hooks)[1]
    for body in (b"secret junk", b'[{"uuid": "secret"}]', b'{"secret": 1', b"<gpx>secret"):
        await _post(hass, client, hooks[p1], body, 400)
    assert _counts(hass) == {}
    assert "JSONDecodeError" in caplog.text and "secret" not in caplog.text


async def test_a_value_of_the_wrong_type_is_400_or_dropped_and_scoring_goes_on(hass, setup, client, cycles, caplog):
    hooks = (await setup()).data[WEBHOOKS]
    p1 = list(hooks)[1]
    archive = Path(hass.config.path("fitbridge", "archive"))
    await _post(hass, client, hooks[p1], json.dumps({"workouts": [dict(hex_workout("A"), startDate={"x": 1})]}).encode(), 400)
    assert _counts(hass) == {} and not (archive / p1).exists()  # not even the raw body
    text = dict(hex_workout("T", "running"), duration="an hour")
    assert await _post(hass, client, hooks[p1], json.dumps({"workouts": [text]}).encode()) == {"workouts": 1, "new": 1}
    assert cycles.call_count == 2 and "Scoring cycle failed" not in caplog.text
    assert p1 in hass.data[DOMAIN].runner.scores["people"]


async def test_webhooks_stay_registered_while_scoring_toml_is_broken(hass, setup, client):
    e = await setup()
    hooks = dict(e.data[WEBHOOKS])
    await hass.config_entries.async_unload(e.entry_id)
    Path(hass.config.path("fitbridge", "scoring.toml")).write_text("broken = [\n", encoding="utf-8")
    assert await hass.config_entries.async_setup(e.entry_id)  # after a restart: no good config at all
    await hass.async_block_till_done(wait_background_tasks=True)
    assert await hass.data[DOMAIN].runner.async_people() == {}
    assert await _post(hass, client, hooks[P0], gpx_with_points()) == {"new": True}  # not lost behind HA's 200
    assert _counts(hass) == {P0: {"stored": 1}} and e.data[WEBHOOKS] == hooks


async def test_over_16_mb_is_413_by_length_or_by_count(hass, setup, client):
    hook = list((await setup()).data[WEBHOOKS].values())[0]
    await _post(hass, client, hook, b" " * (MB16 + 1), 413)

    async def chunked():  # no Content-Length: counted while read
        for _ in range(17):
            yield b" " * (1024 * 1024)
    await _post(hass, client, hook, chunked(), 413)
    assert _counts(hass) == {}


async def test_an_unknown_webhook_id_gets_homeassistants_200_and_stores_nothing(hass, setup, client):
    await setup()
    assert await _post(hass, client, "0" * 64, gpx_with_points()) is None  # HA never tells whether a hook exists
    assert _counts(hass) == {}


async def test_503_while_unloading_and_gone_after(hass, setup, client):
    e = await setup()
    hook = list(e.data[WEBHOOKS].values())[0]
    data = hass.data.pop(DOMAIN)  # the entry's Data goes first when it unloads
    await _post(hass, client, hook, gpx_with_points(), 503)
    hass.data[DOMAIN] = data
    await hass.config_entries.async_unload(e.entry_id)
    assert await _post(hass, client, hook, gpx_with_points()) is None  # unregistered: HA's own answer
    assert DOMAIN not in hass.data


async def test_works_in_shadow_mode(hass, setup, client, mqtt_mock):
    hooks = (await setup({OPT_SHADOW: True})).data[WEBHOOKS]
    assert await _post(hass, client, list(hooks.values())[0], gpx_with_points()) == {"new": True}


async def test_a_missing_folder_raises_its_issue_and_other_inputs_go_on(hass, setup, client, tmp_path):
    folders = {"a": tmp_path / "a", "b": tmp_path / "b"}
    for f in folders.values():
        f.mkdir()
    registry = ir.async_get(hass)
    p0, p1 = P0, P1
    e = await setup({OPT_SHADOW: False, OPT_FOLDERS: {p0: str(folders["a"]), p1: str(folders["b"])}})
    folders["a"].rmdir()
    (folders["b"] / "run.gpx").write_bytes(gpx_with_points())
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=61))
    await hass.async_block_till_done(wait_background_tasks=True)
    issue = registry.async_get_issue(DOMAIN, f"folder_missing_{p0}")
    assert issue is not None and issue.translation_key == "folder_missing"
    assert issue.translation_placeholders == {"person": p0, "folder": str(folders["a"])}
    assert registry.async_get_issue(DOMAIN, f"folder_missing_{p1}") is None
    assert _counts(hass) == {p1: {"stored": 1}}  # the other folder was scanned
    other = gpx_with_points(TRACK.replace("1", "2"))
    assert await _post(hass, client, e.data[WEBHOOKS][p0], other) == {"new": True}  # and the webhooks work
    folders["a"].mkdir()
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=122))
    await hass.async_block_till_done(wait_background_tasks=True)
    assert registry.async_get_issue(DOMAIN, f"folder_missing_{p0}") is None  # back
    folders["a"].rmdir()
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=183))
    await hass.async_block_till_done(wait_background_tasks=True)
    assert registry.async_get_issue(DOMAIN, f"folder_missing_{p0}") is not None
    await hass.config_entries.async_unload(e.entry_id)
    assert registry.async_get_issue(DOMAIN, f"folder_missing_{p0}") is None  # a reload without that folder must not keep it


async def test_urls_are_cloudhooks_with_nabu_casa_else_the_external_url(hass, setup):
    hook = list((await setup()).data[WEBHOOKS].values())[0]
    assert (await webhooks.async_url(hass, hook)).endswith(f":8123/api/webhook/{hook}")  # no external URL: the internal one
    with patch.object(webhooks.webhook, "async_generate_url", side_effect=NoURLAvailableError):
        assert await webhooks.async_url(hass, hook) == f"/api/webhook/{hook}"  # none at all: the path to put a host before
    hass.config.external_url = "https://ha.example.test"
    assert await webhooks.async_url(hass, hook) == f"https://ha.example.test/api/webhook/{hook}"
    cloudhook = AsyncMock(return_value="https://hooks.example.test/abc")
    with patch.object(webhooks, "_uses_cloud", return_value=True), \
            patch.object(webhooks.cloud, "async_get_or_create_cloudhook", cloudhook):
        assert await webhooks.async_url(hass, hook) == "https://hooks.example.test/abc"
    cloudhook.assert_awaited_once_with(hass, hook)


async def test_removing_the_entry_deletes_its_cloudhooks(hass, enable_custom_integrations):
    e = MockConfigEntry(domain=DOMAIN, unique_id=DOMAIN, minor_version=2, options={OPT_SHADOW: False})
    e.add_to_hass(hass)
    assert await hass.config_entries.async_setup(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    hooks = list(e.data[WEBHOOKS].values())
    delete = AsyncMock(side_effect=[None, ValueError("gone")])  # one already deleted is fine
    with patch.object(webhooks, "_uses_cloud", return_value=True), patch.object(webhooks.cloud, "async_delete_cloudhook", delete):
        await hass.config_entries.async_remove(e.entry_id)
    assert [c.args[1] for c in delete.await_args_list] == hooks
