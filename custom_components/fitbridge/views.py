"""The page API through Home Assistant's own HTTP: HA authenticates, the payload in memory answers."""
import json
import secrets
import time
from http import HTTPStatus

from aiohttp import web
from homeassistant.components import mqtt
from homeassistant.components.http import HomeAssistantView
from homeassistant.helpers.http import KEY_HASS
from homeassistant.util import dt as dt_util

from . import settings
from .const import DOMAIN, OPT_SHOES, OPT_STEPS, OPT_VIEWERS
from .core import can_edit, find_workout, manual_message, shape, shoes, viewer_person
from .steps import parse, week

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


async def _json_body(view: HomeAssistantView, request: web.Request):
    """(parsed JSON, None), or (None, the error response)."""
    if (request.content_length or 0) > MAX_UI_BODY or (raw := await _read_limited(request.content, MAX_UI_BODY)) is None:
        return None, _detail(view, "body too large", HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
    try:
        return json.loads(raw, parse_constant=_reject_constant), None
    except ValueError:  # includes bad UTF-8
        return None, _detail(view, "invalid JSON", HTTPStatus.BAD_REQUEST)


def _defaults(scores: dict) -> dict:
    """Each person's goal for the week as the latest scores report it (scoring.toml unless settings apply)."""
    out = {}
    for p, person in scores["people"].items():
        goal = (person.get("week") or {}).get("goal")
        if isinstance(goal, dict):
            out[p] = {"runs": goal.get("runs"), "workouts": goal.get("workouts", goal.get("gym")),
                      "active_days": goal.get("active_days"), "steps": goal.get("steps")}
    return out


def _steps_today(state) -> int | None:
    """The phone's count, or 0 while its last report is from before today: a phone resets only when it reports."""
    n = parse(state.state) if state else None
    if n is None:
        return None
    reported = getattr(state, "last_reported", None) or state.last_updated
    return n if dt_util.as_local(reported).date() == dt_util.now().date() else 0


class UiView(HomeAssistantView):
    url = "/api/fitbridge/ui/{path:.*}"
    name = "api:fitbridge:ui"
    requires_auth = True

    async def get(self, request: web.Request, path: str) -> web.Response:
        if path not in ("scores", "settings"):
            return _detail(self, "not found", HTTPStatus.NOT_FOUND)
        data = request.app[KEY_HASS].data.get(DOMAIN)
        if data is None or data.scores is None:
            return _detail(self, "waiting", HTTPStatus.SERVICE_UNAVAILABLE)
        if path == "settings":
            monday = settings.monday_of(dt_util.now().date())
            return self.json({"history": data.settings_history, "current": settings.current(data.settings_history, monday),
                              "week_start": monday.isoformat(), "defaults": _defaults(data.scores)})
        user = request["hass_user"]
        person = viewer_person(user.id, data.entry.options.get(OPT_VIEWERS, {}), data.scores)
        chosen = data.entry.options.get(OPT_SHOES, {})
        hass = request.app[KEY_HASS]
        states = {eid: (s.state, dict(s.attributes)) if (s := hass.states.get(eid)) else None
                  for limits in chosen.values() for eid in limits}
        steps = {p: _steps_today(hass.states.get(eid)) for p, eid in data.entry.options.get(OPT_STEPS, {}).items()}
        today = dt_util.now().date()
        weeks = {p: week(data.steps.days(p) if data.steps else {}, today) for p in steps}
        for p, n in steps.items():
            if n is not None:  # the live count leads the collector, which only files a phone's own reports
                weeks[p][today.isoformat()] = max(weeks[p].get(today.isoformat(), 0), n)
        return self.json(shape(data.scores, person, user.is_admin, {p: shoes(limits, states) for p, limits in chosen.items()}, steps, weeks))

    async def post(self, request: web.Request, path: str) -> web.Response:
        if path not in ("workouts", "settings"):
            return _detail(self, "not found", HTTPStatus.NOT_FOUND)
        body, error = await _json_body(self, request)
        if error is not None:
            return error
        if path == "settings":
            return await self._post_settings(request, body)
        if not (isinstance(body, dict) and body.get("action") in ("remove", "restore")
                and isinstance(body.get("person"), str) and isinstance(body.get("key"), str)):
            return _detail(self, "expected person, key and action remove or restore", HTTPStatus.BAD_REQUEST)
        if body["key"].startswith("steps:"):  # an active day comes from steps: there is nothing to remove
            return _detail(self, "active days cannot be removed", HTTPStatus.BAD_REQUEST)
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
        if not data.shadow:
            try:
                await data.runner.async_manual({"action": body["action"], "person": person, "key": key})
            except ValueError as err:
                return _detail(self, str(err), HTTPStatus.BAD_REQUEST)
            return self.json({"ok": True}, status_code=HTTPStatus.ACCEPTED)
        # shadow: the LXC's fitbridge is live (cleanup after the switch: this MQTT branch goes).
        # ms, zero-padded: fitbridge applies messages in id-time order, so an Undo a second later follows its Remove
        msg_id = f"{time.time_ns() // 1_000_000:013d}-{secrets.token_hex(3)}"
        topic, payload = manual_message(body["action"], person, key, msg_id)
        await mqtt.async_publish(hass, topic, payload, qos=1, retain=True)
        return self.json({"ok": True}, status_code=HTTPStatus.ACCEPTED)

    async def _post_settings(self, request: web.Request, body) -> web.Response:
        hass = request.app[KEY_HASS]
        data = hass.data.get(DOMAIN)
        if data is None or data.scores is None:
            return _detail(self, "waiting", HTTPStatus.SERVICE_UNAVAILABLE)
        user = request["hass_user"]
        if viewer_person(user.id, data.entry.options.get(OPT_VIEWERS, {}), data.scores) is None:
            return _detail(self, "not allowed", HTTPStatus.FORBIDDEN)
        try:
            entry = settings.validate(body, data.scores["people"])
        except ValueError as err:
            return _detail(self, str(err), HTTPStatus.BAD_REQUEST)
        monday = settings.monday_of(dt_util.now().date())
        history = settings.put(data.settings_history, entry, monday)
        await data.settings_store.async_save({"history": history})
        await settings.publish(hass, history)
        data.settings_history = history  # only once stored and sent: a failed save leaves GET on the old goals
        return self.json({"ok": True, "from": monday.isoformat()}, status_code=HTTPStatus.ACCEPTED)
