import aiohttp
import pytest

from custom_components.fitbridge import gym

GYM = "https://gym.example.test"


def test_normalize_url():
    assert gym.normalize_url(" gym.example.test/ ") == GYM
    assert gym.normalize_url("http://gym.example.test//") == "http://gym.example.test"


async def test_redeem_users_invite_and_revoke(hass, aioclient_mock):
    aioclient_mock.post(f"{GYM}/api/pair/redeem", json={"token": "tok-1"})
    aioclient_mock.get(f"{GYM}/api/admin/users", json={"users": [{"id": "u1", "name": "Synthetic A"}]})
    aioclient_mock.post(f"{GYM}/api/admin/invites/new", json={"invite": {"code": "C0DE"}})
    aioclient_mock.post(f"{GYM}/api/admin/invites/revoke", json={})
    assert await gym.async_redeem(hass, GYM, "AB12") == "tok-1"
    assert await gym.async_users(hass, GYM, "tok-1") == [{"id": "u1", "name": "Synthetic A"}]
    assert await gym.async_invite(hass, GYM, "tok-1", "Person 1") == "C0DE"
    await gym.async_revoke(hass, GYM, "tok-1", "C0DE")
    calls = [(m, str(u.path), body, (headers or {}).get("Authorization")) for m, u, body, headers in aioclient_mock.mock_calls]
    assert calls == [("POST", "/api/pair/redeem", {"code": "AB12"}, None),
                     ("GET", "/api/admin/users", None, "Bearer tok-1"),
                     ("POST", "/api/admin/invites/new", {"note": "Person 1"}, "Bearer tok-1"),
                     ("POST", "/api/admin/invites/revoke", {"code": "C0DE"}, "Bearer tok-1")]


async def test_gym_errors(hass, aioclient_mock, caplog):
    for reply, reason in (({"exc": aiohttp.ClientConnectionError()}, "cannot_connect"),
                          ({"text": "<html>bad gateway</html>", "status": 502}, "cannot_connect"),
                          ({"json": ["not", "an", "object"]}, "cannot_connect"),
                          ({"json": {"error": "unknown code"}, "status": 404}, "invalid_code"),
                          ({"json": {}}, "invalid_code")):
        aioclient_mock.clear_requests()
        aioclient_mock.post(f"{GYM}/api/pair/redeem", **reply)
        with pytest.raises(gym.GymError) as err:
            await gym.async_redeem(hass, GYM, "SECRET1")
        assert err.value.reason == reason
    for reply, bad_shape in (({"status": 401}, False), ({"json": {"users": 5}}, True), ({"json": {}}, True), ({"exc": TimeoutError()}, False)):
        aioclient_mock.clear_requests()
        for method in ("get", "post"):
            for path in ("users", "invites/new", "invites/revoke"):
                getattr(aioclient_mock, method)(f"{GYM}/api/admin/{path}", **reply)
        calls = [gym.async_users(hass, GYM, "tok-secret"), gym.async_invite(hass, GYM, "tok-secret", "Person 1")]
        if not bad_shape:  # a revoke does not read the reply
            calls.append(gym.async_revoke(hass, GYM, "tok-secret", "C0DE"))
        for call in calls:
            with pytest.raises(gym.GymError) as err:
                await call
            assert err.value.reason == "cannot_connect"
    assert "SECRET1" not in caplog.text and "tok-secret" not in caplog.text and "C0DE" not in caplog.text
