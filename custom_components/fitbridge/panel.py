"""The static path for the page and its sidebar panel."""
import hashlib
import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import PANEL, STATIC_URL
from .views import UiView

log = logging.getLogger(__name__)
_HTTP = "fitbridge_http"  # not DOMAIN: that key is the entry's Data
FRONTEND = Path(__file__).parent / "frontend"


async def async_register_http(hass: HomeAssistant) -> None:
    """The view and the static path cannot be unregistered: once per HA run."""
    if hass.data.get(_HTTP):
        return
    hass.data[_HTTP] = True
    hass.http.register_view(UiView())
    if await hass.async_add_executor_job(FRONTEND.is_dir):
        await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(FRONTEND), cache_headers=False)])
    else:
        log.error("The page is missing (%s): the Fitness panel will not load", FRONTEND)


def _build_hash() -> str:
    """A short hash of the built panel.js: a new build is a new URL, so no browser keeps an old panel.js that asks for
    hashed chunks the new build no longer has."""
    try:
        return hashlib.sha256((FRONTEND / "panel.js").read_bytes()).hexdigest()[:10]
    except OSError:  # no page: async_register_http has logged it
        return "missing"


async def async_register_panel(hass: HomeAssistant) -> None:
    version = await hass.async_add_executor_job(_build_hash)
    await panel_custom.async_register_panel(
        hass, frontend_url_path=PANEL, webcomponent_name="fitbridge-panel",
        module_url=f"{STATIC_URL}/panel.js?v={version}", sidebar_title="Fitness",
        sidebar_icon="mdi:run", embed_iframe=True, require_admin=False)


def remove_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL, warn_if_unknown=False)
