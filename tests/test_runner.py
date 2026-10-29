"""The runner: fitbridge's scoring cycle inside HA (synthetic data only)."""
import asyncio
import dataclasses
import logging
import sqlite3
import threading
from datetime import timedelta
from pathlib import Path
from unittest.mock import patch

import pytest
from engine.test_config import LEGACY
from homeassistant.core import SupportsResponse, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.fitbridge import runner as runner_mod
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_GROUP,
    OPT_INVITES,
    OPT_OPENGYM_UIDS,
    OPT_OPENGYM_URL,
    OPT_PEOPLE,
    OPT_VIEWERS,
    SIGNAL_SCORES,
)
from custom_components.fitbridge.engine.cycle import Cycle, score_cycle

GYM = {OPT_OPENGYM_URL: "https://gym.example.test"}
ALL_DAY = {"start": "2026-10-26", "end": "2026-10-28", "summary": "Sick"}  # end exclusive
TIMED = {"start": "2026-10-28T08:00:00+01:00", "end": "2026-10-28T18:00:00+01:00", "summary": "Trip", "description": "x"}


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
    def fake(store, holder, og, inputs, now):
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
    assert hass.data[DOMAIN].scores is runner.scores  # the page reads the runner's scores
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
        runner._scoring += 1  # a cycle still running
        await runner._lock.acquire()
        await _tick(hass, 301)
        runner._lock.release()
        runner._scoring -= 1
        assert cycles.call_count == 1 and scan.call_count == 0  # skipped, not queued
        await hass.async_block_till_done(wait_background_tasks=True)
        assert cycles.call_count == 1
        await _tick(hass, 301)  # the scan due too may take the lock first: the score then waits, it is not skipped
    assert cycles.call_count == 2


async def test_a_scan_or_upload_in_progress_delays_the_score_tick_but_never_skips_it(hass, setup, cycles):
    await setup()
    runner = _runner(hass)
    await runner._lock.acquire()  # a folder scan or a webhook upload, not a cycle
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=301))
    for _ in range(5):
        await asyncio.sleep(0)
    assert cycles.call_count == 1
    runner._lock.release()
    await hass.async_block_till_done(wait_background_tasks=True)
    assert cycles.call_count == 2


async def test_uploads_while_a_cycle_waits_share_that_cycle(hass, setup, cycles):
    await setup()
    runner = _runner(hass)
    await runner._lock.acquire()  # a cycle, scan or upload running
    for _ in range(3):  # a burst of uploads
        hass.async_create_task(runner.async_score_now())
    for _ in range(5):
        await asyncio.sleep(0)
    runner._lock.release()
    await hass.async_block_till_done(wait_background_tasks=True)
    assert cycles.call_count == 2  # setup, then one for the whole burst
    await runner.async_score_now()
    assert cycles.call_count == 3


async def test_an_unload_during_a_cycle_neither_announces_nor_commits(hass, setup, order):
    async_dispatcher_connect(hass, SIGNAL_SCORES, callback(lambda cycle: order.append("signal")))
    e = await setup()
    runner, scored = _runner(hass), runner_mod.score_cycle
    order.clear()
    started, go = threading.Event(), threading.Event()

    def slow(*args):  # a cycle still in the executor when the unload starts
        started.set()
        go.wait(5)
        return scored(*args)
    with patch.object(runner_mod, "score_cycle", side_effect=slow):
        cycle = hass.async_create_task(runner.async_score_now())
        assert await hass.async_add_executor_job(started.wait, 5)
        unload = hass.async_create_task(hass.config_entries.async_unload(e.entry_id))
        for _ in range(20):
            await asyncio.sleep(0)
        go.set()
        assert await unload
        await cycle
    assert order == []  # the next runner announces these
    for change in (runner.async_manual({"action": "remove", "person": "p1", "key": "k"}), runner.async_shoes(lambda st: 1)):
        with pytest.raises(ValueError, match="stopping"):  # a page or action call that raced the unload
            await change


async def test_commits_only_after_the_signal_handlers_ran(hass, setup, order):
    async_dispatcher_connect(hass, SIGNAL_SCORES, callback(lambda cycle: order.append("signal")))
    await setup()
    assert order == ["signal", "commit"]


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


async def test_steps_and_settings_are_read_in_process(hass, setup, cycles, hass_storage):
    today = dt_util.now().date().isoformat()
    history = [{"from": "2026-10-26", "people": {}, "couple": {}}]
    hass_storage["fitbridge.steps"] = {"version": 1, "key": "fitbridge.steps", "data": {"p1": {today: 812}}}
    hass_storage["fitbridge.settings"] = {"version": 1, "key": "fitbridge.settings", "data": {"history": history}}
    await setup()
    inputs = cycles.call_args.args[3]
    assert inputs.steps == {"p1": {today: 812}} and inputs.settings == {"history": history, "profiles": {}}


async def test_a_birth_year_reaches_the_cycle_without_any_weekly_goals(hass, setup, cycles, hass_storage):
    hass_storage["fitbridge.settings"] = {"version": 1, "key": "fitbridge.settings", "data": {"history": [], "profiles": {"p1": {"birth_year": 1990}}}}
    await setup()
    assert cycles.call_args.args[3].settings == {"history": [], "profiles": {"p1": {"birth_year": 1990}}}


async def test_a_cycle_without_a_valid_config_keeps_the_last_scores(hass, setup):
    await setup()
    runner = _runner(hass)
    good = runner.scores
    with patch.object(runner_mod, "score_cycle", return_value=Cycle({"error": "no valid scoring config"}, [], [], [], lambda: None)):
        await runner.async_score_now()
    assert runner.scores is good and hass.data[DOMAIN].scores is good  # one source: the page and the details pop-up


async def test_manual_change_is_applied_then_scored(hass, setup, cycles):
    await setup()
    runner = _runner(hass)
    person = next(iter(runner.scores["people"]))
    await runner.async_manual({"action": "remove", "person": person, "key": "opentracks:t1"})
    assert (person, "opentracks:t1") in runner.store.exclusions() and cycles.call_count == 2
    with pytest.raises(ValueError):
        await runner.async_manual({"action": "remove", "person": "nobody", "key": "k"})
    assert cycles.call_count == 2


async def test_async_review_rescored(hass, setup, cycles):
    await setup()
    runner = _runner(hass)
    await runner.async_review("p1", "k", "type", "walking")
    assert runner.store.plan_reviews() == {("p1", "k"): {"decision": "type", "type_match": "walking"}} and cycles.call_count == 2
    await runner.async_review("p1", "k", None)
    assert runner.store.plan_reviews() == {} and cycles.call_count == 3


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


async def test_runner_applies_links(hass, setup, caplog):
    caplog.set_level(logging.INFO)
    linked = Cycle({"people": {}}, [], [], [], lambda: None, gym_links={"p2": "u1"})
    with patch.object(runner_mod, "score_cycle", return_value=linked):
        e = await setup({OPT_OPENGYM_UIDS: {"p1": "u0"}, OPT_INVITES: {"p2": "AB", "p3": "CD"}})
        runner = _runner(hass)
        assert e.options[OPT_OPENGYM_UIDS] == {"p1": "u0", "p2": "u1"}
        assert e.options[OPT_INVITES] == {"p3": "CD"}  # only the linked person's invite is gone
        await _tick(hass, 301)
    assert _runner(hass) is runner  # no reload
    assert "openGym account linked for p2" in caplog.text and "AB" not in caplog.text and "u1" not in caplog.text


async def test_links_are_checked_against_the_options_as_they_are_now(hass, setup, cycles):
    e = await setup({OPT_OPENGYM_UIDS: {"p1": "u0"}, OPT_INVITES: {"p2": "AB"}})
    asked = {"p2": "AB", "p3": "CD", "p4": "EF", "p5": "GH"}  # what the cycle ran with
    hass.config_entries.async_update_entry(e, options={**e.options, OPT_OPENGYM_UIDS: {"p1": "u0", "p2": "mine"},  # p2 was linked by hand
                                                       OPT_INVITES: {"p3": "NEW", "p4": "EF", "p5": "GH"}})  # p3 got a new invite
    _runner(hass)._link({"p2": "u1", "p3": "u2", "p4": "u0", "p5": "u5"}, asked)  # u0 belongs to p1 now
    assert e.options[OPT_OPENGYM_UIDS] == {"p1": "u0", "p2": "mine", "p5": "u5"}
    assert e.options[OPT_INVITES] == {"p3": "NEW", "p4": "EF"}


async def test_no_url_or_token_means_no_opengym(hass, setup, cycles):
    await setup({OPT_OPENGYM_URL: "https://gym.example.test"})
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


@pytest.mark.parametrize("minor_version", [1, 2])
async def test_an_older_entry_loses_the_shadow_and_shoes_options(hass, setup, minor_version):
    old = {OPT_VIEWERS: {"u1": "p1"}, "shadow": True, "shoes": {"p1": {"sensor.trail": 700}}}
    e = await setup(old, minor_version=minor_version)
    assert e.minor_version == 4 and e.options == {OPT_VIEWERS: {"u1": "p1"}}


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


async def test_runner_uses_options_people(hass, setup, caplog):
    caplog.set_level(logging.INFO)
    path = Path(hass.config.path("fitbridge", "scoring.toml"))
    path.parent.mkdir()
    path.write_text(LEGACY, encoding="utf-8")  # person1 and person2 in the file
    await setup({OPT_PEOPLE: {"mine": {"name": "Mine", "plan_history": []}}, OPT_GROUP: None})
    assert set(await _runner(hass).async_people()) == {"mine"}
    assert _runner(hass).scores["people"].keys() == {"mine"}
    assert not [r for r in caplog.records if "Configure" in r.message]  # the migration said it, once
