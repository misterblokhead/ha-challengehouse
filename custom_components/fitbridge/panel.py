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


def _build_hash() -> str | None:
    """A short hash of the built panel.js (None when the page is missing): a new build is a new URL, so no browser keeps an
    old panel.js that asks for hashed chunks the new build no longer has."""
    try:
        return hashlib.sha256((FRONTEND / "panel.js").read_bytes()).hexdigest()[:10]
    except OSError:
        return None


async def async_register_http(hass: HomeAssistant) -> None:
    """The view and the static path cannot be unregistered: once per HA run. So is the page's hash: a new build comes
    with a restart."""
    if hass.data.get(_HTTP):
        return
    hass.data[_HTTP] = "missing"  # the page's hash once it is found
    hass.http.register_view(UiView())
    if version := await hass.async_add_executor_job(_build_hash):
        hass.data[_HTTP] = version
        await hass.http.async_register_static_paths([StaticPathConfig(STATIC_URL, str(FRONTEND), cache_headers=False)])
    else:
        log.error("The page is missing (%s): the Fitness panel will not load", FRONTEND)


async def async_register_panel(hass: HomeAssistant) -> None:
    """After async_register_http."""
    await panel_custom.async_register_panel(
        hass, frontend_url_path=PANEL, webcomponent_name="fitbridge-panel",
        module_url=f"{STATIC_URL}/panel.js?v={hass.data[_HTTP]}", sidebar_title="Fitness",
        sidebar_icon="mdi:run", embed_iframe=True, require_admin=False)


def remove_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL, warn_if_unknown=False)
