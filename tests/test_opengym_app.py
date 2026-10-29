from types import SimpleNamespace
from unittest.mock import MagicMock, create_autospec, patch

import pytest
from aiohasupervisor import SupervisorBadRequestError, SupervisorError, SupervisorForbiddenError
from aiohasupervisor.addons import AddonsClient
from aiohasupervisor.models import AddonsOptions, AddonState, Repository, StoreAddRepository
from aiohasupervisor.store import StoreClient

from custom_components.fitbridge import opengym_app
from custom_components.fitbridge.opengym_app import REPOSITORY

SLUG = "abcd1234_opengym"
REPO = Repository(slug="abcd1234", name="openGym", source=REPOSITORY, url=REPOSITORY, maintainer="Synthetic")
ADDRESS = "https://ha.example.test"
OPTIONS = {"address": ADDRESS, "invite_only": False, "first_user_admin": True}
THEIRS = {"address": "https://old.example.test", "invite_only": True, "first_user_admin": False}  # an installed app's own


def _info(state=AddonState.STOPPED, options=OPTIONS):
    return SimpleNamespace(hostname="abcd1234-opengym", state=state, options=options)


@pytest.fixture
def client():
    """The Supervisor as it answers: installed or not from the store, options from the app's info, never its options/config."""
    c = MagicMock()
    c.store, c.addons = create_autospec(StoreClient, instance=True), create_autospec(AddonsClient, instance=True)
    c.store.addon_info.return_value = SimpleNamespace(installed=True)
    c.addons.addon_info.return_value = _info()
    c.addons.addon_config.side_effect = SupervisorForbiddenError("This can be only read by the app itself!")
    with patch("custom_components.fitbridge.opengym_app.get_supervisor_client", return_value=c):
        yield c


def _not_installed(client):
    """In the store only: the app's own info is a 400 until install_addon ran."""
    client.store.addon_info.return_value = SimpleNamespace(installed=False)

    def info(slug):
        if not client.store.install_addon.await_count:
            raise SupervisorBadRequestError("App is not installed")
        return _info()
    client.addons.addon_info.side_effect = info


async def test_install_adds_repository_installs_configures_and_starts(hass, client):
    client.store.repositories_list.side_effect = [[], [REPO]]
    _not_installed(client)
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_awaited_once_with(StoreAddRepository(repository=REPOSITORY))
    client.store.install_addon.assert_awaited_once_with(SLUG)
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(config=OPTIONS, ingress_panel=True, watchdog=True))
    client.addons.start_addon.assert_awaited_once_with(SLUG)
    client.addons.restart_addon.assert_not_awaited()


@pytest.mark.parametrize(("state", "applied_by"), [(AddonState.STARTED, "restart_addon"), (AddonState.STOPPED, "start_addon")])
async def test_an_installed_app_keeps_its_options_but_the_address_and_restarts_when_running(hass, client, state, applied_by):
    other_case = Repository(slug="abcd1234", name="openGym", source=REPOSITORY, url=REPOSITORY.upper() + "/", maintainer="Synthetic")
    client.store.repositories_list.return_value = [other_case]
    client.addons.addon_info.return_value = _info(state, THEIRS)
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_not_awaited()
    client.store.install_addon.assert_not_awaited()
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(
        config={**THEIRS, "address": ADDRESS}, ingress_panel=True, watchdog=True))
    getattr(client.addons, applied_by).assert_awaited_once_with(SLUG)
    getattr(client.addons, {"restart_addon": "start_addon", "start_addon": "restart_addon"}[applied_by]).assert_not_awaited()


@pytest.mark.parametrize("url", ["", "https://other.example.test/declared"])
async def test_a_repository_is_also_found_by_the_source_it_was_added_from(hass, client, url):
    client.store.repositories_list.return_value = [
        Repository(slug="abcd1234", name="openGym", source=REPOSITORY + ".git", url=url, maintainer="Synthetic")]
    assert await opengym_app.async_install(hass, ADDRESS) == (SLUG, "http://abcd1234-opengym:8099")
    client.store.add_repository.assert_not_awaited()


@pytest.mark.parametrize(("failing", "reason"), [
    ("store.install_addon", "app_install_failed"),
    ("addons.addon_info", "app_install_failed"),  # the info right after a successful install
    ("store.addon_info", "app_unavailable"),
    ("store.add_repository", "app_unavailable"),
    ("addons.start_addon", "app_start_failed"),
])
async def test_install_failures_map_to_a_reason(hass, client, failing, reason):
    client.store.repositories_list.side_effect = [[], [REPO]]
    _not_installed(client)
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
    await opengym_app.async_invite_only(hass, SLUG)
    client.addons.set_addon_options.assert_awaited_once_with(SLUG, AddonsOptions(config={**OPTIONS, "invite_only": True}))
    client.addons.restart_addon.assert_awaited_once_with(SLUG)


async def test_invite_only_failure_is_an_app_error(hass, client):
    client.addons.restart_addon.side_effect = SupervisorError("boom")
    with pytest.raises(opengym_app.AppError) as err:
        await opengym_app.async_invite_only(hass, SLUG)
    assert err.value.reason == "app_start_failed"


async def test_available_and_detected_address(hass):
    with patch("custom_components.fitbridge.opengym_app.is_hassio", return_value=True):
        assert opengym_app.available(hass)
    with patch("custom_components.fitbridge.opengym_app.get_url", return_value=ADDRESS):
        assert opengym_app.detected_address(hass) == ADDRESS
    assert opengym_app.detected_address(hass) == ""  # the test instance has no external URL
