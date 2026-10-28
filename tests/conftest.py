import json

import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_mqtt_message

SCORES = {"people": {
    "p1": {"name": "Alex", "feed": [{"key": "k1"}, {"key": "manual:a/b", "excluded": True}]},
    "p2": {"name": "Sam", "feed": [{"key": "k2"}]},
}}


@pytest.fixture
def expected_lingering_timers():
    """MQTT's client keeps a 1 s misc timer even after unload; HA core allows this for its own component tests too."""
    return True


@pytest.fixture
def hass_config_dir(hass_tmp_config_dir):
    """A fresh config dir per test: the runner keeps /config/fitbridge/ there."""
    return hass_tmp_config_dir


@pytest.fixture
async def entry(enable_custom_integrations, hass, mqtt_mock):
    """An entry from before 0.4.0: migrated into shadow mode, so the page reads MQTT as before."""
    e = MockConfigEntry(domain="fitbridge", unique_id="fitbridge", title="Fitness")
    e.add_to_hass(hass)
    assert await hass.config_entries.async_setup(e.entry_id)
    await hass.async_block_till_done(wait_background_tasks=True)
    yield e
    await hass.config_entries.async_unload(e.entry_id)


@pytest.fixture
def send(hass):
    """Deliver a fitbridge/scores message; a dict goes as JSON."""
    async def _send(payload):
        async_fire_mqtt_message(hass, "fitbridge/scores", payload if isinstance(payload, str) else json.dumps(payload))
        await hass.async_block_till_done()
    return _send
