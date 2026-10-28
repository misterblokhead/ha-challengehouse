import logging

from conftest import SCORES
from homeassistant.components import frontend

from custom_components.fitbridge.const import DOMAIN


async def test_valid_payload_is_kept_and_invalid_ignored(hass, entry, send, caplog):
    assert hass.data[DOMAIN].scores is None
    await send(SCORES)
    assert hass.data[DOMAIN].scores == SCORES
    with caplog.at_level(logging.WARNING):
        await send("not json")
        await send({"people": []})
    assert hass.data[DOMAIN].scores == SCORES
    assert len([r for r in caplog.records if r.levelno == logging.WARNING and "fitbridge/scores" in r.getMessage()]) == 1


async def test_panel_registered_and_removed_on_unload(hass, entry, send):
    panel = hass.data[frontend.DATA_PANELS]["fitness"]
    assert panel.sidebar_title == "Fitness" and panel.sidebar_icon == "mdi:run" and panel.require_admin is False
    assert panel.config["_panel_custom"]["module_url"] == "/fitbridge_static/panel.js?v=0.3.3"
    await hass.config_entries.async_unload(entry.entry_id)
    assert "fitness" not in hass.data[frontend.DATA_PANELS] and DOMAIN not in hass.data
    await send(SCORES)  # unsubscribed: nothing to keep it in
    assert DOMAIN not in hass.data
    assert await hass.config_entries.async_setup(entry.entry_id)  # back: the view is not registered twice
    assert "fitness" in hass.data[frontend.DATA_PANELS]
