import hashlib
from pathlib import Path

from homeassistant.components import frontend

from custom_components.fitbridge.const import DOMAIN


async def test_panel_registered_and_removed_on_unload(hass, entry):
    panel = hass.data[frontend.DATA_PANELS]["fitness"]
    assert panel.sidebar_title == "Fitness" and panel.sidebar_icon == "mdi:run" and panel.require_admin is False
    built = Path(__file__).parents[1] / "custom_components" / "fitbridge" / "frontend" / "panel.js"
    assert panel.config["_panel_custom"]["module_url"] == f"/fitbridge_static/panel.js?v={hashlib.sha256(built.read_bytes()).hexdigest()[:10]}"
    await hass.config_entries.async_unload(entry.entry_id)
    assert "fitness" not in hass.data[frontend.DATA_PANELS] and DOMAIN not in hass.data
    assert await hass.config_entries.async_setup(entry.entry_id)  # back: the view is not registered twice
    assert "fitness" in hass.data[frontend.DATA_PANELS]
