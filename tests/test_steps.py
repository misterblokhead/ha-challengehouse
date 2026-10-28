from datetime import date, timedelta

import pytest
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import async_fire_time_changed

from custom_components.fitbridge.const import DOMAIN, OPT_STEPS, OPT_VIEWERS
from custom_components.fitbridge.steps import record, trim, week


def test_record_keeps_the_days_maximum_and_ignores_non_numbers():
    days = {}
    assert record(days, "2026-10-27", "247.0") is True and days == {"2026-10-27": 247}  # floats are floored
    assert record(days, "2026-10-27", "247.9") is False  # still 247
    for junk in ("unavailable", "unknown", "", "nan", "inf", "-5"):
        assert record(days, "2026-10-27", junk) is False
    assert record(days, "2026-10-27", "200") is False and days == {"2026-10-27": 247}  # the max is kept
    assert record(days, "2026-10-27", "812.6") is True and days == {"2026-10-27": 812}
    assert record(days, "2026-10-28", "0") is True and days["2026-10-28"] == 0  # a new day starts at its first value


def test_trim_keeps_35_days_up_to_today():
    today = date(2026, 10, 27)
    days = {(today - timedelta(days=n)).isoformat(): n for n in range(40)}
    kept = trim(days, today)
    assert len(kept) == 35 and min(kept) == "2026-09-23" and max(kept) == "2026-10-27"


def test_week_is_monday_up_to_today_and_drops_last_week():
    days = {"2026-10-25": 900, "2026-10-26": 12000, "2026-10-27": 8000, "2026-10-28": 3000, "2026-10-29": 5}  # Sun, Mon-Wed, Thu
    assert week(days, date(2026, 10, 28)) == {"2026-10-26": 12000, "2026-10-27": 8000, "2026-10-28": 3000}
    assert week(days, date(2026, 10, 25)) == {"2026-10-25": 900}  # on a Sunday the week began six days ago


@pytest.fixture
async def saved(hass, entry, hass_storage):
    """The entry with p1 -> sensor.phone_steps, set up again so the collector reads the options; returns what the Store holds."""
    hass.config_entries.async_update_entry(entry, options={OPT_VIEWERS: {}, OPT_STEPS: {"p1": "sensor.phone_steps"}})
    hass.states.async_set("sensor.phone_steps", "4000")  # the phone's value at startup: the collector must not file it
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    return lambda: hass_storage["fitbridge.steps"]["data"]


async def _tick(hass, seconds):
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=seconds))
    await hass.async_block_till_done()


async def test_state_change_is_saved_within_a_minute(hass, saved):
    today = dt_util.now().date().isoformat()
    assert saved() == {}  # nothing known at startup
    hass.states.async_set("sensor.phone_steps", "812.0")
    hass.states.async_set("sensor.phone_steps", "unavailable")
    hass.states.async_set("sensor.phone_steps", "300")
    await hass.async_block_till_done()
    assert saved() == {}  # throttled
    await _tick(hass, 61)
    assert saved() == {"p1": {today: 812}}


async def test_restores_from_the_store(hass, entry, saved):
    today = dt_util.now().date().isoformat()
    hass.states.async_set("sensor.phone_steps", "812")
    await hass.async_block_till_done()
    await _tick(hass, 61)
    hass.states.async_remove("sensor.phone_steps")  # nothing live to record: the days can only come from the Store
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert hass.data[DOMAIN].steps.snapshot() == {"p1": {today: 812}}


async def test_only_the_phones_own_reports_count(hass, saved):
    assert saved() == {}  # the 4000 already set at startup is not recorded
    today = dt_util.now().date().isoformat()
    hass.states.async_remove("sensor.phone_steps")
    hass.states.async_set("sensor.phone_steps", "4100")  # old_state None: an initial or restored state
    hass.states.async_set("sensor.phone_steps", "unavailable")
    hass.states.async_set("sensor.phone_steps", "4200")  # back from unavailable: restored, not reported
    await _tick(hass, 61)
    assert saved() == {}
    hass.states.async_set("sensor.phone_steps", "4300")  # the next real change counts
    await _tick(hass, 61)
    assert saved() == {"p1": {today: 4300}}


async def test_unload_saves_a_pending_change(hass, entry, saved):
    today = dt_util.now().date().isoformat()
    hass.states.async_set("sensor.phone_steps", "90")
    await hass.async_block_till_done()
    await hass.config_entries.async_unload(entry.entry_id)  # before the minute is up
    assert saved() == {"p1": {today: 90}}
    assert await hass.config_entries.async_setup(entry.entry_id)  # the fixture unloads it again


async def test_a_value_after_midnight_belongs_to_the_new_day(hass, saved, freezer):
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    freezer.move_to("2026-10-27 22:59:00+00:00")  # 23:59 local (CET, +1)
    hass.states.async_set("sensor.phone_steps", "9000")
    freezer.move_to("2026-10-27 23:05:00+00:00")  # 00:05 on the 28th
    hass.states.async_set("sensor.phone_steps", "120")
    await hass.async_block_till_done()
    await _tick(hass, 61)
    assert saved() == {"p1": {"2026-10-27": 9000, "2026-10-28": 120}}
