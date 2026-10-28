"""The runner: fitbridge's scoring cycle inside HA (synthetic data only)."""
import dataclasses
import json
import sqlite3
from datetime import timedelta
from pathlib import Path
from unittest.mock import patch

import pytest
from homeassistant.core import SupportsResponse, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_OPENGYM_URL,
    OPT_SHADOW,
    OPT_VIEWERS,
    SIGNAL_SCORES,
)
from custom_components.fitbridge.engine.cycle import Cycle, score_cycle

LIVE = {OPT_SHADOW: False}
GYM = {OPT_SHADOW: False, OPT_OPENGYM_URL: "https://gym.example.test"}
ALL_DAY = {"start": "2026-10-26", "end": "2026-10-28", "summary": "Sick"}  # end exclusive
TIMED = {"start": "2026-10-28T08:00:00+01:00", "end": "2026-10-28T18:00:00+01:00", "summary": "Trip", "description": "x"}


@pytest.fixture
async def setup(hass, enable_custom_integrations):
    """Set up an entry (live unless options say otherwise) and wait for its first cycle; unloaded afterwards."""
    entries = []

    async def _setup(options=LIVE, data=None, minor_version=2):
        e = MockConfigEntry(domain=DOMAIN, unique_id=DOMAIN, title="Fitness", minor_version=minor_version,
                            options=options, data=data or {})
        e.add_to_hass(hass)
        entries.append(e)
        assert await hass.config_entries.async_setup(e.entry_id)
        await hass.async_block_till_done(wait_background_tasks=True)
        return e
    yield _setup
    for e in entries:
        await hass.config_entries.async_unload(e.entry_id)


@pytest.fixture
def cycles():
    """The real score_cycle, with every call kept."""
    with patch.object(runner_mod, "score_cycle", wraps=score_cycle) as m:
        yield m


@pytest.fixture
def order():
    """The real score_cycle whose commit() notes itself in the returned list."""
    calls = []

    def scored(*args):
        return dataclasses.replace(score_cycle(*args), commit=lambda: calls.append("commit"))
    with patch.object(runner_mod, "score_cycle", side_effect=scored):
        yield calls


def _fake(errors=None, tokens=None):
    """A score_cycle stand-in: renews the token like OpenGym does (from the executor) and reports gym_error."""
    def fake(store, holder, og, inputs, now, live):
        if tokens is not None:
            tokens.append(og.get_token())
            og.save_token(f"token-{len(tokens)}")
            tokens.append(og.get_token())  # what users() / user() send next, as in engine.cycle._gym
        return Cycle({"people": {}}, [], [], [], lambda: None, gym_error=errors.pop(0) if errors else None)
    return fake


async def _tick(hass, seconds):
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=seconds))
    await hass.async_block_till_done(wait_background_tasks=True)


def _runner(hass):
    return hass.data[DOMAIN].runner


async def test_scores_at_start_every_5_minutes_and_scans_every_minute(hass, setup, cycles, tmp_path):
    await setup()
    runner = _runner(hass)
    assert cycles.call_count == 1 and "people" in runner.scores
    assert hass.data[DOMAIN].scores is runner.scores  # live: the page reads the runner's scores
    assert cycles.call_args.args[3].pauses is None  # no pause calendar: the engine keeps its cache
    runner.folders = {"p1": tmp_path}
    with patch.object(runner_mod, "scan_folder") as scan:
        await _tick(hass, 61)
        assert scan.call_count == 1 and cycles.call_count == 1
        scan.assert_called_with(runner.store, Path(hass.config.path("fitbridge", "archive")), "p1", tmp_path)
        await _tick(hass, 301)
    assert cycles.call_count == 2


async def test_a_cycle_still_running_skips_the_tick(hass, setup, cycles, tmp_path):
    await setup()
    runner = _runner(hass)
    runner.folders = {"p1": tmp_path}
    with patch.object(runner_mod, "scan_folder") as scan:
        await runner._lock.acquire()  # a cycle still running
        await _tick(hass, 301)
        runner._lock.release()
        assert cycles.call_count == 1 and scan.call_count == 0  # skipped, not queued
        await hass.async_block_till_done(wait_background_tasks=True)
        assert cycles.call_count == 1
        await _tick(hass, 301)
    assert cycles.call_count == 2 and scan.call_count == 1


async def test_shadow_writes_the_json_and_never_signals_or_commits(hass, setup, mqtt_mock, order):
    signals = []
    async_dispatcher_connect(hass, SIGNAL_SCORES, callback(lambda cycle: signals.append(cycle)))
    await setup({OPT_SHADOW: True})
    runner = _runner(hass)
    written = json.loads(Path(hass.config.path("fitbridge", "shadow-scores.json")).read_text(encoding="utf-8"))
    assert written == runner.scores and "people" in written
    assert signals == [] and order == []
    assert hass.data[DOMAIN].scores is None  # the page keeps reading fitbridge/scores from MQTT


async def test_live_commits_only_after_the_signal_handlers_ran(hass, setup, order):
    async_dispatcher_connect(hass, SIGNAL_SCORES, callback(lambda cycle: order.append("signal")))
    await setup()
    assert order == ["signal", "commit"]
    assert not Path(hass.config.path("fitbridge", "shadow-scores.json")).exists()


async def test_pauses_are_the_calendars_events_unchanged(hass, setup, cycles):
    calls = []

    async def get_events(call):
        calls.append(call.data)
        return {"calendar.training_pause": {"events": [ALL_DAY, TIMED]}}
    hass.services.async_register("calendar", "get_events", get_events, supports_response=SupportsResponse.ONLY)
    await setup()
    assert cycles.call_args.args[3].pauses == [ALL_DAY, TIMED]  # what fitbridge/pauses carried
    asked = calls[0]
    assert asked["entity_id"] == "calendar.training_pause"
    assert asked["start_date_time"] < dt_util.now() - timedelta(days=399)
    assert asked["end_date_time"] - asked["start_date_time"] == timedelta(days=414)


async def test_steps_and_settings_are_read_in_process_without_mqtt(hass, setup, cycles, hass_storage):
    today = dt_util.now().date().isoformat()
    history = [{"from": "2026-10-26", "people": {}, "couple": {}}]
    hass_storage["fitbridge.steps"] = {"version": 1, "key": "fitbridge.steps", "data": {"p1": {today: 812}}}
    hass_storage["fitbridge.settings"] = {"version": 1, "key": "fitbridge.settings", "data": {"history": history}}
    await setup()  # live and no MQTT set up: any publish would fail the setup
    inputs = cycles.call_args.args[3]
    assert inputs.steps == {"p1": {today: 812}} and inputs.settings == {"history": history}


async def test_manual_change_is_applied_then_scored(hass, setup, cycles):
    await setup()
    runner = _runner(hass)
    person = next(iter(runner.scores["people"]))
    await runner.async_manual({"action": "remove", "person": person, "key": "opentracks:t1"})
    assert (person, "opentracks:t1") in runner.store.exclusions() and cycles.call_count == 2
    with pytest.raises(ValueError):
        await runner.async_manual({"action": "remove", "person": "nobody", "key": "k"})
    assert cycles.call_count == 2


async def test_a_failing_cycle_is_logged_by_class_and_the_timer_goes_on(hass, setup, caplog):
    with patch.object(runner_mod, "score_cycle", side_effect=RuntimeError("secret detail")) as failing:
        await setup()
        await _tick(hass, 301)
    assert failing.call_count == 2
    assert "RuntimeError" in caplog.text and "secret detail" not in caplog.text


async def test_a_renewed_token_lands_in_the_entry_without_a_reload(hass, setup, caplog):
    tokens = []
    with patch.object(runner_mod, "score_cycle", side_effect=_fake(tokens=tokens)):
        e = await setup(GYM, {"opengym_token": "token-0"})
        runner = _runner(hass)
        assert tokens == ["token-0", "token-1"] and e.data["opengym_token"] == "token-1"  # the renewed one, at once
        await _tick(hass, 301)
    assert tokens == ["token-0", "token-1", "token-1", "token-3"] and e.data["opengym_token"] == "token-3"
    assert _runner(hass) is runner  # a data-only update does not reload
    assert "token-" not in caplog.text


async def test_no_url_or_token_means_no_opengym(hass, setup, cycles):
    await setup({OPT_SHADOW: False, OPT_OPENGYM_URL: "https://gym.example.test"})
    assert cycles.call_args.args[2] is None


async def test_a_rejected_token_raises_one_repair_issue_until_the_gym_answers(hass, setup):
    errors = ["OpenGymAuthError", "OpenGymAuthError", "URLError", None]
    registry = ir.async_get(hass)
    with patch.object(runner_mod, "score_cycle", side_effect=_fake(errors)), \
            patch.object(runner_mod.ir, "async_create_issue", wraps=ir.async_create_issue) as create:
        await setup(GYM, {"opengym_token": "token-0"})
        issue = registry.async_get_issue(DOMAIN, "opengym_token")
        assert issue is not None and issue.translation_key == "opengym_token"
        await _tick(hass, 301)
        await _tick(hass, 301)  # unreachable is not an answer: the issue stays
        assert create.call_count == 1 and registry.async_get_issue(DOMAIN, "opengym_token") is not None
        await _tick(hass, 301)
    assert registry.async_get_issue(DOMAIN, "opengym_token") is None


async def test_an_entry_from_before_0_4_starts_in_shadow(hass, setup, mqtt_mock):
    e = await setup({OPT_VIEWERS: {"u1": "p1"}}, minor_version=1)
    assert e.minor_version == 2 and e.options == {OPT_VIEWERS: {"u1": "p1"}, OPT_SHADOW: True}
    assert _runner(hass).shadow


async def test_scoring_toml_is_copied_once_and_the_store_closes_on_unload(hass, setup):
    path = Path(hass.config.path("fitbridge", "scoring.toml"))
    e = await setup()
    packaged = (Path(runner_mod.__file__).parent / "engine" / "scoring.toml").read_text(encoding="utf-8")
    assert path.read_text(encoding="utf-8") == packaged
    store = _runner(hass).store
    path.write_text("# my own\n" + packaged, encoding="utf-8")
    await hass.config_entries.async_reload(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert path.read_text(encoding="utf-8").startswith("# my own")  # never overwritten
    with pytest.raises(sqlite3.ProgrammingError):
        store.kv_get("x")  # the old store was closed
