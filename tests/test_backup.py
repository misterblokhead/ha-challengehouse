"""HA backups copy fitbridge.db while HA runs: the runner holds still meanwhile (synthetic data only)."""
import asyncio

from custom_components.fitbridge import backup
from custom_components.fitbridge.const import DOMAIN


async def test_a_backup_holds_the_runner_until_it_is_done(hass, setup):
    await setup()
    runner = hass.data[DOMAIN].runner
    await backup.async_pre_backup(hass)
    assert runner._lock.locked()  # no cycle, scan or upload writes the database now
    await backup.async_post_backup(hass)
    assert not runner._lock.locked()
    await backup.async_post_backup(hass)  # HA calls it after a failed pre-backup too: nothing to release


async def test_a_reload_during_a_backup_waits_for_it(hass, setup):
    e = await setup()
    old = hass.data[DOMAIN].runner
    await backup.async_pre_backup(hass)
    reload = hass.async_create_task(hass.config_entries.async_reload(e.entry_id))
    for _ in range(50):
        await asyncio.sleep(0)
    assert DOMAIN not in hass.data  # unloaded up to the runner's stop, which waits for the backup
    await backup.async_post_backup(hass)  # the old runner's lock, though the entry's data is already gone
    assert await reload
    assert not old._lock.locked() and hass.data[DOMAIN].runner is not old


async def test_nothing_to_hold_when_fitness_is_not_loaded(hass):
    await backup.async_pre_backup(hass)
    await backup.async_post_backup(hass)
