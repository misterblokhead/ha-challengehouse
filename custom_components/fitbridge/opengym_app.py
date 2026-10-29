"""The Supervisor calls that install and configure the openGym app (ha-opengym) next to Home Assistant."""
import logging
from contextlib import contextmanager
from urllib.parse import urlsplit

from aiohasupervisor import SupervisorError
from aiohasupervisor.models import AddonsOptions, AddonState, StoreAddRepository
from homeassistant.components.hassio import get_supervisor_client
from homeassistant.core import HomeAssistant
from homeassistant.helpers.hassio import is_hassio
from homeassistant.helpers.network import NoURLAvailableError, get_url

_LOGGER = logging.getLogger(__name__)
# The contract with ha-opengym's opengym/config.yaml: this repository, the slug suffix "_opengym", the options address,
# invite_only and first_user_admin, and port 8099 (its ingress port, run.sh's NGINX_PORT).
REPOSITORY = "https://github.com/misterblokhead/ha-opengym"
PORT = 8099


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


def origin(text: str) -> str | None:
    """https://host[:port] of an address as typed (https:// added when it has no scheme); None for anything else: another
    scheme, no host, an IP address (passkeys never work on one), a path, query, fragment, user or a port that is no number."""
    text = text.strip()
    u = urlsplit(text if "://" in text else f"https://{text}")
    try:
        u.port  # a port that is no number raises
    except ValueError:
        return None
    if u.scheme != "https" or not u.hostname or _is_ip(u.hostname) or u.path not in ("", "/") or u.query or u.fragment or u.username is not None:
        return None
    return f"https://{u.netloc.lower()}"


def _is_ip(host: str) -> bool:
    """IPv6, or IPv4 in any form a browser reads as one (a numeric last label)."""
    return ":" in host or host.rsplit(".", 1)[-1].isdigit()


def _same(url: str | None) -> str:
    return (url or "").rstrip("/").removesuffix(".git").casefold()


async def _repository_slug(client) -> str | None:
    """The slug of the added repository; url is what its repository.yaml declares, source the git URL it was added by."""
    for repo in await client.store.repositories_list():
        if _same(REPOSITORY) in (_same(repo.url), _same(repo.source)):
            return repo.slug
    return None


async def async_install(hass: HomeAssistant, address: str) -> tuple[str, str]:
    """The app installed (when it is not yet), set up for address and (re)started; returns (slug, internal URL). An installed
    app keeps its other options: its invite_only must not reopen sign-up."""
    client = get_supervisor_client(hass)
    with _failing_as("app_unavailable"):
        repo = await _repository_slug(client)
        if repo is None:
            await client.store.add_repository(StoreAddRepository(repository=REPOSITORY))
            repo = await _repository_slug(client)
    if repo is None:
        raise AppError("app_unavailable")
    slug = f"{repo}_opengym"
    with _failing_as("app_unavailable"):  # the app's own info is a 400 until it is installed: ask the store
        installed = (await client.store.addon_info(slug)).installed
    if installed:
        with _failing_as("app_unavailable"):
            info = await client.addons.addon_info(slug)
        config = {**info.options, "address": address}
    else:
        with _failing_as("app_install_failed"):
            await client.store.install_addon(slug)  # waits for the build, on purpose without a timeout
            info = await client.addons.addon_info(slug)
        config = {"address": address, "invite_only": False, "first_user_admin": True}
    with _failing_as("app_start_failed"):  # run.sh exits when openGym dies: only the Watchdog brings it back
        await client.addons.set_addon_options(slug, AddonsOptions(config=config, ingress_panel=True, watchdog=True))
        # start does nothing for a running app, so it would keep its old address
        await (client.addons.restart_addon if info.state == AddonState.STARTED else client.addons.start_addon)(slug)
    return slug, f"http://{info.hostname}:{PORT}"


async def async_invite_only(hass: HomeAssistant, slug: str) -> None:
    """Switch the app's invite_only on, keeping its other options, and restart it to apply."""
    client = get_supervisor_client(hass)
    with _failing_as("app_start_failed"):
        options = (await client.addons.addon_info(slug)).options  # options/config is for the app itself only (403)
        await client.addons.set_addon_options(slug, AddonsOptions(config={**options, "invite_only": True}))
        await client.addons.restart_addon(slug)
