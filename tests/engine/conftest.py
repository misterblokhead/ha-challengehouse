import pytest


@pytest.fixture(autouse=True)
def _allow_localhost_sockets(socket_enabled):
    """Some engine tests run a real HTTP server on localhost; HA's plugin blocks sockets by default."""
