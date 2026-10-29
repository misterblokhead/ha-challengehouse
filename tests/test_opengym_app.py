from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

import pytest
from aiohasupervisor import SupervisorError, SupervisorNotFoundError
from aiohasupervisor.models import AddonsOptions, Repository, StoreAddRepository

from custom_components.fitbridge import opengym_app
from custom_components.fitbridge.opengym_app import REPOSITORY

SLUG = "abcd1234_opengym"
REPO = Repository(slug="abcd1234", name="openGym", source=REPOSITORY, url=REPOSITORY, maintainer="Synthetic")
ADDRESS = "https://ha.example.test"
OPTIONS = {"address": ADDRESS, "invite_only": False, "first_user_admin": True}


@pytest.fixture
def client():
    c = AsyncMock()
    c.addons.addon_info.return_value = SimpleNamespace(hostname="abcd1234-opengym")
    with patch("custom_components.fitbridge.opengym_app.get_supervisor_client", return_value=c):
        yield c


async def test_install_adds_repository_installs_configures_and_starts(hass, client):
    client.store.repositories_list.side_effect = [[], [REPO]]
    client.addons.addon_info.side_effect = [SupervisorNotFoundError("not installed"), SimpleNamespace(hostname="abcd1234-opengym")]
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_awaited_once_with(StoreAddRepository(repository=REPOSITORY))
    client.store.install_addon.assert_awaited_once_with(SLUG)
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(config=OPTIONS, ingress_panel=True))
    client.addons.start_addon.assert_awaited_once_with(SLUG)


async def test_install_skips_what_is_already_there(hass, client):
    other_case = Repository(slug="abcd1234", name="openGym", source=REPOSITORY, url=REPOSITORY.upper() + "/", maintainer="Synthetic")
    client.store.repositories_list.return_value = [other_case]
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_not_awaited()
    client.store.install_addon.assert_not_awaited()
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(config=OPTIONS, ingress_panel=True))
    client.addons.start_addon.assert_awaited_once_with(SLUG)


@pytest.mark.parametrize("url", ["", "https://other.example.test/declared"])
async def test_a_repository_is_also_found_by_the_source_it_was_added_from(hass, client, url):
    client.store.repositories_list.return_value = [
        Repository(slug="abcd1234", name="openGym", source=REPOSITORY + ".git", url=url, maintainer="Synthetic")]
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_not_awaited()


@pytest.mark.parametrize(("failing", "reason"), [
    ("store.install_addon", "app_install_failed"),
    ("store.add_repository", "app_unavailable"),
    ("addons.start_addon", "app_start_failed"),
])
async def test_install_failures_map_to_a_reason(hass, client, failing, reason):
    client.store.repositories_list.side_effect = [[], [REPO]]
    client.addons.addon_info.side_effect = [SupervisorNotFoundError("not installed"), SimpleNamespace(hostname="abcd1234-opengym")]
    target = client
    for part in failing.split("."):
        target = getattr(target, part)
    target.side_effect = SupervisorError("boom")
    with pytest.raises(opengym_app.AppError) as err:
        await opengym_app.async_install(hass, ADDRESS)
    assert err.value.reason == reason


async def test_a_repository_that_does_not_show_up_is_unavailable(hass, client):
    client.store.repositories_list.return_value = []
    with pytest.raises(opengym_app.AppError) as err:
        await opengym_app.async_install(hass, ADDRESS)
    assert err.value.reason == "app_unavailable"


async def test_invite_only_keeps_the_other_options_and_restarts(hass, client):
    client.addons.addon_config.return_value = OPTIONS
    await opengym_app.async_invite_only(hass, SLUG)
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(config={**OPTIONS, "invite_only": True}))
    client.addons.restart_addon.assert_awaited_once_with(SLUG)


async def test_invite_only_failure_is_an_app_error(hass, client):
    client.addons.restart_addon.side_effect = SupervisorError("boom")
    client.addons.addon_config.return_value = OPTIONS
    with pytest.raises(opengym_app.AppError) as err:
        await opengym_app.async_invite_only(hass, SLUG)
    assert err.value.reason == "app_start_failed"


async def test_available_and_detected_address(hass):
    with patch("custom_components.fitbridge.opengym_app.is_hassio", return_value=True):
        assert opengym_app.available(hass)
    with patch("custom_components.fitbridge.opengym_app.get_url", return_value=ADDRESS):
        assert opengym_app.detected_address(hass) == ADDRESS
    assert opengym_app.detected_address(hass) == ""  # the test instance has no external URL
