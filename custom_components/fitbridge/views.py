"""The page API through Home Assistant's own HTTP: HA authenticates, the payload in memory answers."""
import json
import secrets
import time
from http import HTTPStatus

from aiohttp import web
from homeassistant.components import mqtt
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.http import KEY_HASS

from .const import DOMAIN, OPT_VIEWERS
from .core import can_edit, find_workout, manual_message, shape, viewer_person

MAX_UI_BODY = 4 * 1024


def _reject_constant(name: str):
    raise ValueError(name)  # NaN / Infinity are not JSON


async def _read_limited(content, limit: int) -> bytes | None:
    """The request body, or None as soon as it exceeds limit instead of buffering it all."""
    chunks, size = [], 0
    while chunk := await content.read(64 * 1024):
        size += len(chunk)
        if size > limit:
            return None
        chunks.append(chunk)
    return b"".join(chunks)


def _detail(view: HomeAssistantView, detail: str, status: HTTPStatus) -> web.Response:
    return view.json({"detail": detail}, status_code=status)


class UiView(HomeAssistantView):
    url = "/api/fitbridge/ui/{path:.*}"
    name = "api:fitbridge:ui"
    requires_auth = True

    async def get(self, request: web.Request, path: str) -> web.Response:
        if path != "scores":
            return _detail(self, "not found", HTTPStatus.NOT_FOUND)
        data = request.app[KEY_HASS].data.get(DOMAIN)
        if data is None or data.scores is None:
            return _detail(self, "waiting", HTTPStatus.SERVICE_UNAVAILABLE)
        user = request["hass_user"]
        person = viewer_person(user.id, data.entry.options.get(OPT_VIEWERS, {}), data.scores)
        return self.json(shape(data.scores, person, user.is_admin))

    async def post(self, request: web.Request, path: str) -> web.Response:
        if path != "workouts":
            return _detail(self, "not found", HTTPStatus.NOT_FOUND)
        if (request.content_length or 0) > MAX_UI_BODY or (raw := await _read_limited(request.content, MAX_UI_BODY)) is None:
            return _detail(self, "body too large", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
        try:
            body = json.loads(raw, parse_constant=_reject_constant)
        except ValueError:  # includes bad UTF-8
            return _detail(self, "invalid JSON", HTTPStatus.BAD_REQUEST)
        if not (isinstance(body, dict) and body.get("action") in ("remove", "restore")
                and isinstance(body.get("person"), str) and isinstance(body.get("key"), str)):
            return _detail(self, "expected person, key and action remove or restore", HTTPStatus.BAD_REQUEST)
        hass = request.app[KEY_HASS]
        data = hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return _detail(self, "waiting", HTTPStatus.SERVICE_UNAVAILABLE)
        user, person, key = request["hass_user"], body["person"], body["key"]
        viewer = viewer_person(user.id, data.entry.options.get(OPT_VIEWERS, {}), data.scores)
        if not can_edit(viewer, user.is_admin, person):
            return _detail(self, "not allowed", HTTPStatus.FORBIDDEN)
        if find_workout(data.scores, person, key) is None:
            return _detail(self, "not found", HTTPStatus.NOT_FOUND)
        # ms, zero-padded: fitbridge applies messages in id-time order, so an Undo a second later follows its Remove
        msg_id = f"{time.time_ns() // 1_000_000:013d}-{secrets.token_hex(3)}"
        topic, payload = manual_message(body["action"], person, key, msg_id)
        await mqtt.async_publish(hass, topic, payload, qos=1, retain=True)
        return self.json({"ok": True}, status_code=HTTPStatus.ACCEPTED)
