"""The Supervisor calls that install and configure the openGym app (ha-opengym) next to Home Assistant."""
import logging
from contextlib import contextmanager

from aiohasupervisor import SupervisorError, SupervisorNotFoundError
from aiohasupervisor.models import AddonsOptions, StoreAddRepository
from homeassistant.components.hassio import get_supervisor_client
from homeassistant.core import HomeAssistant
from homeassistant.helpers.hassio import is_hassio
from homeassistant.helpers.network import NoURLAvailableError, get_url

_LOGGER = logging.getLogger(__name__)
REPOSITORY = "https://github.com/misterblokhead/ha-opengym"
PORT = 8099  # the app's ingress port


class AppError(Exception):
    """reason is a config flow error key: app_unavailable, app_install_failed or app_start_failed."""

    def __init__(self, reason: str) -> None:
        super().__init__(reason)
        self.reason = reason


@contextmanager
def _failing_as(reason: str):
    """A SupervisorError becomes AppError(reason); the log names the cause."""
    try:
        yield
    except SupervisorError as err:
        _LOGGER.warning("The Supervisor failed (%s): %s: %s", reason, type(err).__name__, err)
        raise AppError(reason) from err


def available(hass: HomeAssistant) -> bool:
    """Only a Home Assistant with a Supervisor can run the app."""
    return is_hassio(hass)


def detected_address(hass: HomeAssistant) -> str:
    """The address people reach Home Assistant at from outside, or '' when there is none to trust."""
    try:
        return get_url(hass, allow_internal=False, allow_ip=False, require_ssl=True, require_standard_port=True)
    except NoURLAvailableError:
        return ""


def _same(url: str | None) -> str:
    return (url or "").rstrip("/").removesuffix(".git").casefold()


async def _repository_slug(client) -> str | None:
    """The slug of the added repository; url is what its repository.yaml declares, source the git URL it was added by."""
    for repo in await client.store.repositories_list():
        if _same(REPOSITORY) in (_same(repo.url), _same(repo.source)):
            return repo.slug
    return None


async def _info(client, slug: str):
    """The app's info, None when it is not installed."""
    try:
        return await client.addons.addon_info(slug)
    except SupervisorNotFoundError:
        return None


async def async_install(hass: HomeAssistant, address: str) -> tuple[str, str]:
    """The app installed (when it is not yet), set up for address and started; returns (slug, internal URL)."""
    client = get_supervisor_client(hass)
    with _failing_as("app_unavailable"):
        repo = await _repository_slug(client)
        if repo is None:
            await client.store.add_repository(StoreAddRepository(repository=REPOSITORY))
            repo = await _repository_slug(client)
    if repo is None:
        raise AppError("app_unavailable")
    slug = f"{repo}_opengym"
    with _failing_as("app_unavailable"):
        info = await _info(client, slug)
    if info is None:
        with _failing_as("app_install_failed"):
            await client.store.install_addon(slug)  # waits for the build, on purpose without a timeout
        with _failing_as("app_unavailable"):
            info = await client.addons.addon_info(slug)
    with _failing_as("app_start_failed"):
        await client.addons.set_addon_options(slug, AddonsOptions(
            config={"address": address, "invite_only": False, "first_user_admin": True}, ingress_panel=True))
        await client.addons.start_addon(slug)
    return slug, f"http://{info.hostname}:{PORT}"


async def async_invite_only(hass: HomeAssistant, slug: str) -> None:
    """Switch the app's invite_only on, keeping its other options, and restart it to apply."""
    client = get_supervisor_client(hass)
    with _failing_as("app_start_failed"):
        options = await client.addons.addon_config(slug)
        await client.addons.set_addon_options(slug, AddonsOptions(config={**options, "invite_only": True}))
        await client.addons.restart_addon(slug)
