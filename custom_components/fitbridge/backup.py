"""HA's backup copies /config/fitbridge/fitbridge.db while HA runs: no cycle, scan or upload writes it meanwhile."""
from homeassistant.core import HomeAssistant

from .const import DOMAIN

HELD = f"{DOMAIN}_backup"  # the runner a backup holds: a reload meanwhile takes hass.data[DOMAIN] away before it stops


async def async_pre_backup(hass: HomeAssistant) -> None:
    data = hass.data.get(DOMAIN)
    if data is None or data.runner is None:
        return
    await data.runner._lock.acquire()  # after the running cycle; each write is committed when it ends (no WAL)
    hass.data[HELD] = data.runner


async def async_post_backup(hass: HomeAssistant) -> None:
    if (runner := hass.data.pop(HELD, None)) is not None:
        runner._lock.release()
