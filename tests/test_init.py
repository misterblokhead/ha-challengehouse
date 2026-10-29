import hashlib
import logging
from pathlib import Path

from engine.test_config import LEGACY
from homeassistant.components import frontend

from custom_components.fitbridge.const import DOMAIN, OPT_GROUP, OPT_PEOPLE, OPT_START, OPT_VIEWERS

OLD_TOML = LEGACY.replace('name = "Person 1"', 'name = "Person 1"\ngoal = { runs = 3 }')  # a live scoring.toml with its own people
PEOPLE = {
    "person1": {"name": "Person 1", "goal": {"runs": 3}, "plan_history": [{"plan": "c25k", "from": "2026-10-26"}]},
    "person2": {"name": "Person 2", "plan_history": [{"plan": "c25k", "from": "2026-10-26"}]}}
GROUP = {"name": "couple", "members": ["person1", "person2"]}


def _toml(hass, text):
    path = Path(hass.config.path("fitbridge", "scoring.toml"))
    path.parent.mkdir(exist_ok=True)
    path.write_text(text, encoding="utf-8")
    return path


async def test_panel_registered_and_removed_on_unload(hass, entry):
    panel = hass.data[frontend.DATA_PANELS]["fitness"]
    assert panel.sidebar_title == "ChallengeHouse" and panel.sidebar_icon == "mdi:home-heart" and panel.require_admin is False
    built = Path(__file__).parents[1] / "custom_components" / "fitbridge" / "frontend" / "panel.js"
    assert panel.config["_panel_custom"]["module_url"] == f"/fitbridge_static/panel.js?v={hashlib.sha256(built.read_bytes()).hexdigest()[:10]}"
    await hass.config_entries.async_unload(entry.entry_id)
    assert "fitness" not in hass.data[frontend.DATA_PANELS] and DOMAIN not in hass.data
    assert await hass.config_entries.async_setup(entry.entry_id)  # back: the view is not registered twice
    assert "fitness" in hass.data[frontend.DATA_PANELS]


async def test_migrate_copies_people_once(hass, setup, caplog):
    caplog.set_level(logging.INFO)
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    path = _toml(hass, OLD_TOML)
    e = await setup({OPT_VIEWERS: {"u1": "person1"}}, minor_version=3)
    assert e.minor_version == 4
    assert e.options == {OPT_VIEWERS: {"u1": "person1"}, OPT_PEOPLE: PEOPLE, OPT_GROUP: GROUP, OPT_START: "2026-10-26"}
    assert "timezone" not in caplog.text and path.read_text(encoding="utf-8") == OLD_TOML  # the file is left alone
    assert len([r for r in caplog.records if "edit them in Configure" in r.message]) == 1
    await hass.config_entries.async_reload(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    assert len([r for r in caplog.records if "edit them in Configure" in r.message]) == 1  # once, not every start


async def test_migrate_keeps_the_people_already_in_the_options(hass, setup):
    _toml(hass, OLD_TOML)
    mine = {"mine": {"name": "Mine", "plan_history": []}}
    e = await setup({OPT_PEOPLE: mine, OPT_START: "2026-11-02"}, minor_version=3)
    assert e.minor_version == 4
    assert e.options == {OPT_PEOPLE: mine, OPT_START: "2026-11-02"}
    assert set(await hass.data[DOMAIN].runner.async_people()) == {"mine"}


async def test_migrate_a_toml_without_people_or_a_missing_one_just_bumps(hass, setup, caplog):
    e = await setup({OPT_VIEWERS: {"u1": "p1"}}, minor_version=3)  # no file
    assert e.minor_version == 4 and e.options == {OPT_VIEWERS: {"u1": "p1"}}
    assert "add them in Configure -> People" in caplog.text


async def test_migrate_unreadable_toml_keeps_minor_3(hass, setup, caplog):
    _toml(hass, "not [toml")
    e = await setup({OPT_VIEWERS: {"u1": "person1"}}, minor_version=3)
    assert e.minor_version == 3 and e.options == {OPT_VIEWERS: {"u1": "person1"}}
    assert [r.message for r in caplog.records if r.levelno == logging.WARNING and "scoring.toml" in r.message] == [
        "Could not read the people from scoring.toml (TOMLDecodeError); they stay there for now"]
    assert hass.data[DOMAIN].runner.holder.overlay is None  # scoring goes on with the file's people


async def test_migrate_toml_with_a_bad_start_keeps_minor_3(hass, setup):
    _toml(hass, OLD_TOML.replace("start = 2026-10-26", "start = 2026-10-26T00:00:00"))
    assert (await setup(minor_version=3)).minor_version == 3


async def test_migrate_logs_timezone_mismatch(hass, setup, caplog):
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    _toml(hass, OLD_TOML.replace("Europe/Amsterdam", "Europe/London"))
    await setup(minor_version=3)
    assert [r.message for r in caplog.records if r.name.startswith("custom_components") and "timezone" in r.message] == [
        "scoring.toml has timezone Europe/London, Home Assistant has Europe/Amsterdam: Home Assistant's is used"]
