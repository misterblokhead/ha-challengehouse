from pathlib import Path

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.fitbridge.const import DOMAIN

SCORES = {"people": {
    "p1": {"name": "Alex", "feed": [{"key": "k1"}, {"key": "manual:a/b", "excluded": True}]},
    "p2": {"name": "Sam", "feed": [{"key": "k2"}]},
}}


@pytest.fixture
def hass_config_dir(hass_tmp_config_dir):
    """A fresh config dir per test: the runner keeps /config/fitbridge/ there."""
    return hass_tmp_config_dir


@pytest.fixture
async def entry(enable_custom_integrations, hass):
    """An entry whose runner never scores (its scoring.toml is invalid): the page has what `send` hands it."""
    config = Path(hass.config.path("fitbridge", "scoring.toml"))
    config.parent.mkdir()
    config.write_text("not [toml", encoding="utf-8")
    e = MockConfigEntry(domain="fitbridge", unique_id="fitbridge", title="Fitness", minor_version=3)
    e.add_to_hass(hass)
    assert await hass.config_entries.async_setup(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    yield e
    await hass.config_entries.async_unload(e.entry_id)


@pytest.fixture
def send(hass):
    """Hand the page these scores, as a cycle would."""
    async def _send(scores):
        hass.data[DOMAIN].scores = scores
    return _send


@pytest.fixture
async def setup(hass, enable_custom_integrations):
    """Set up an entry and wait for its first cycle; unloaded afterwards."""
    entries = []

    async def _setup(options={}, data=None, minor_version=3):
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
