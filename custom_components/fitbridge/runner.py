"""fitbridge's engine inside HA: the 5 min scoring cycle, the 60 s folder scan and webhook uploads, in the executor,
never overlapping."""
import asyncio
import json
import logging
import secrets
import shutil
import time
from datetime import datetime, timedelta
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.start import async_at_started
from homeassistant.util import dt as dt_util

from .const import DATA_DIR, DOMAIN, OPENGYM_TOKEN, OPT_FOLDERS, OPT_OPENGYM_UIDS, OPT_OPENGYM_URL, OPT_SHADOW, SIGNAL_SCORES
from .core import find_workout
from .engine import details, manual
from .engine.cycle import ConfigHolder, Inputs, exercise_catalog_cached, score_cycle
from .engine.ingest import Unreadable, aware, ingest_body, scan_folder
from .engine.opengym import OpenGym
from .engine.scoring_config import finite
from .engine.store import Store

_LOGGER = logging.getLogger(__name__)
SCORE_EVERY = timedelta(minutes=5)
SCAN_EVERY = timedelta(minutes=1)
PAUSE_CALENDAR = "calendar.training_pause"
ISSUE_TOKEN = "opengym_token"
DEFAULT_CONFIG = Path(__file__).parent / "engine" / "scoring.toml"


def _without_older(scores: dict) -> dict:
    """The scores as the LXC's /scores has them: no `older` feed (it lives in memory, for the page's Load older)."""
    people = scores.get("people")
    if not isinstance(people, dict):
        return scores
    return {**scores, "people": {p: {k: v for k, v in r.items() if k != "older"} for p, r in people.items()}}


class Runner:
    """Shadow mode (the LXC's fitbridge is still the live system): scores into `scores` and shadow-scores.json only.
    Live: after each cycle SIGNAL_SCORES carries the Cycle; handlers must be @callback, as commit() follows them.
    Not shadow but not live (old entities in the way): scores for the page, announces and records nothing."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass, self.entry = hass, entry
        self.shadow: bool = entry.options.get(OPT_SHADOW, False)
        self.live: bool = not self.shadow  # entities and announcements; set before async_start
        self.dir = Path(hass.config.path(DATA_DIR))
        self.folders: dict[str, Path] = {p: Path(f) for p, f in entry.options.get(OPT_FOLDERS, {}).items()}  # scanned every minute
        self.store: Store | None = None
        self.holder: ConfigHolder | None = None
        self.scores: dict | None = None
        self._lock = asyncio.Lock()
        self._scoring = 0  # cycles running or waiting for the lock
        self._queued = False  # a cycle waits for the lock
        self.stopping = False  # set when the unload starts: its signal handlers are going
        self._unsubs: list = []

    async def async_start(self) -> None:
        self.store = await self.hass.async_add_executor_job(self._open)
        self._unsubs = [
            async_track_time_interval(self.hass, self._score_tick, SCORE_EVERY, name="fitbridge score"),
            async_track_time_interval(self.hass, self._scan_tick, SCAN_EVERY, name="fitbridge scan"),
            async_at_started(self.hass, self._score_tick),  # once HA runs: the pause calendar is there by then
        ]

    async def async_stop(self) -> None:
        self.stopping = True
        for unsub in self._unsubs:
            unsub()
        async with self._lock:  # a cycle still running finishes first
            store, self.store = self.store, None
            if store is not None:
                await self.hass.async_add_executor_job(store.db.close)
        for person in self.folders:  # the next runner raises them again if still missing, not for a folder dropped
            ir.async_delete_issue(self.hass, DOMAIN, f"folder_missing_{person}")

    async def async_score_now(self) -> None:
        """One cycle now, after the one still running. While another already waits for the lock, that one is this
        cycle too: it starts later, so it scores whatever the caller stored (a burst of uploads, one cycle)."""
        if self._queued:
            return
        self._queued = True  # a call cancelled while waiting (unload) leaves it set: that runner is done
        self._scoring += 1
        try:
            async with self._lock:
                self._queued = False
                await self._score()
        finally:
            self._scoring -= 1

    async def async_people(self) -> dict:
        """scoring.toml's people (its last good config): webhooks, watch folders and openGym users go by them."""
        config, _ = await self.hass.async_add_executor_job(self.holder.get)  # racing a cycle's get() only loads it twice
        return config["people"] if config else {}

    async def async_types(self) -> dict:
        """scoring.toml's type table (its last good config), for the shoe changes that must tell a run."""
        config, _ = await self.hass.async_add_executor_job(self.holder.get)
        return config["types"] if config else {}

    async def async_ingest(self, person: str, body: bytes) -> dict | None:
        """A webhook body stored (engine.ingest.ingest_body's reply, Unreadable for junk), then scored when it brought
        something new; None when stopped."""
        async with self._lock:
            if self.store is None:
                return None
            reply = await self.hass.async_add_executor_job(ingest_body, self.store, self.dir / "archive", person, body)
        if reply["new"]:  # the phone gets its answer without waiting for the cycle
            self.entry.async_create_background_task(self.hass, self.async_score_now(), "fitbridge score")
        return reply

    async def async_details(self, person: str, key: str) -> dict | None:
        """What a workout's pop-up shows, read in the executor from the store and the archived GPX; None when the last
        scores (feed or older) have no such workout."""
        scores, store = self.scores, self.store
        item = find_workout(scores, person, key) if store and scores and isinstance(scores.get("people"), dict) else None
        if item is None:
            return None
        return await self.hass.async_add_executor_job(self._details, store, scores["people"][person], person, item)

    async def async_pair(self, token: str) -> None:
        """A new openGym token: after the running cycle, whose renewal of the old token must land first, never after."""
        async with self._lock:
            self._store_token(token)
        ir.async_delete_issue(self.hass, DOMAIN, ISSUE_TOKEN)

    async def async_manual(self, msg: dict) -> None:
        """One remove / restore / add (engine.manual), then a cycle. ValueError (short reason) when it is invalid."""
        await self._change(self._manual, msg)

    async def async_shoes(self, fn):
        """fn(store) (engine.shoes calls), then a cycle so the next scores carry the new km. ValueError (short reason)
        when invalid; returns what fn returned."""
        return await self._change(fn)

    async def _change(self, fn, *args):
        """fn(store, *args) in the executor, then a cycle; returns what fn returned. ValueError when stopping."""
        async with self._lock:
            if self.store is None or self.stopping:
                raise ValueError("fitness is stopping")
            result = await self.hass.async_add_executor_job(fn, self.store, *args)
            await self._score()
        return result

    async def _score_tick(self, _now=None) -> None:
        if not self._scoring:  # a cycle still running (or queued): this tick is skipped; a scan or upload only delays it
            await self.async_score_now()

    async def _scan_tick(self, _now) -> None:
        if self._lock.locked() or not self.folders:
            return
        async with self._lock:
            if self.store is None:
                return
            try:
                missing = await self.hass.async_add_executor_job(self._scan)
            except Exception as err:  # a failing scan never stops the timer
                _LOGGER.error("Folder scan failed: %s", type(err).__name__)
                return
        for person, folder in self.folders.items():
            issue = f"folder_missing_{person}"
            if person in missing:
                ir.async_create_issue(self.hass, DOMAIN, issue, is_fixable=False, severity=ir.IssueSeverity.WARNING,
                                      translation_key="folder_missing",
                                      translation_placeholders={"person": person, "folder": str(folder)})
            else:
                ir.async_delete_issue(self.hass, DOMAIN, issue)

    async def _score(self) -> None:
        data = self.hass.data.get(DOMAIN)
        if self.store is None or data is None:  # stopped, or unloading (the entry's Data goes before the runner stops)
            return
        og = self._opengym()
        inputs = Inputs(await self._pauses(), data.steps.snapshot() if data.steps else None,
                        {"history": data.settings_history, "profiles": data.settings_profiles}
                        if data.settings_history or data.settings_profiles else None,
                        dict(self.entry.options.get(OPT_OPENGYM_UIDS, {})))
        try:
            cycle = await self.hass.async_add_executor_job(self._cycle, og, inputs)
        except Exception as err:  # one bad cycle never stops the timers
            _LOGGER.error("Scoring cycle failed: %s", type(err).__name__)
            return
        self.scores = cycle.scores
        self._token_issue(og, cycle.gym_error)
        if not self.shadow and isinstance(cycle.scores.get("people"), dict):  # no valid scoring config: the page keeps the last
            data.scores = cycle.scores
        if not self.live or self.stopping:  # stopping: no handler would get it, so nothing is recorded; the next runner announces
            return
        async_dispatcher_send(self.hass, SIGNAL_SCORES, cycle)
        try:  # only after the handlers ran: a restart in between repeats an announcement, never loses one
            await self.hass.async_add_executor_job(cycle.commit)
        except Exception as err:
            _LOGGER.error("Recording the announcements failed: %s", type(err).__name__)

    async def _pauses(self) -> list | None:
        """The pause calendar's events from 400 days back to 14 ahead, as the old automation published them."""
        now = dt_util.now()
        try:
            response = await self.hass.services.async_call(
                "calendar", "get_events",
                {"entity_id": PAUSE_CALENDAR, "start_date_time": now - timedelta(days=400),
                 "end_date_time": now + timedelta(days=14)},
                blocking=True, return_response=True)
            return response[PAUSE_CALENDAR]["events"]
        except Exception:  # no calendar or a failing one: the engine keeps its cached pauses (and warns)
            return None

    def _opengym(self) -> OpenGym | None:
        url = self.entry.options.get(OPT_OPENGYM_URL)
        if not url or not self.entry.data.get(OPENGYM_TOKEN):
            return None
        renewed: list[str] = []  # this cycle's renewal: its next calls must not send the old token

        def save_token(token: str) -> None:  # called by OpenGym in the executor: the entry is updated on the loop
            renewed.append(token)
            self.hass.add_job(self._store_token, token)
        return OpenGym(url, lambda: renewed[-1] if renewed else self.entry.data[OPENGYM_TOKEN], save_token)

    @callback
    def _store_token(self, token: str) -> None:
        self.hass.config_entries.async_update_entry(self.entry, data={**self.entry.data, OPENGYM_TOKEN: token})

    @callback
    def _token_issue(self, og: OpenGym | None, gym_error: str | None) -> None:
        if gym_error == "OpenGymAuthError":
            if ir.async_get(self.hass).async_get_issue(DOMAIN, ISSUE_TOKEN) is None:  # once, not every cycle
                ir.async_create_issue(self.hass, DOMAIN, ISSUE_TOKEN, is_fixable=False,
                                      severity=ir.IssueSeverity.ERROR, translation_key=ISSUE_TOKEN)
        elif og is not None and gym_error is None:  # the gym answered
            ir.async_delete_issue(self.hass, DOMAIN, ISSUE_TOKEN)

    # ---------- executor ----------

    def _open(self) -> Store:
        (self.dir / "archive").mkdir(parents=True, exist_ok=True)
        config = self.dir / "scoring.toml"
        if not config.exists():  # the user's copy is never overwritten
            shutil.copyfile(DEFAULT_CONFIG, config)
        self.holder = ConfigHolder(config)
        return Store(self.dir / "fitbridge.db")

    def _cycle(self, og, inputs):
        cycle = score_cycle(self.store, self.holder, og, inputs, dt_util.utcnow(), self.live)
        if self.shadow:  # compared with the LXC's /scores during the shadow run
            (self.dir / "shadow-scores.json").write_text(json.dumps(_without_older(cycle.scores), indent=2, sort_keys=True), encoding="utf-8")
        return cycle

    def _scan(self) -> set[str]:
        """Scans each person's folder; returns the people whose folder is not there."""
        missing = {p for p, folder in self.folders.items() if not Path(folder).is_dir()}
        for person, folder in self.folders.items():
            if person not in missing:
                scan_folder(self.store, self.dir / "archive", person, Path(folder))
        return missing

    def _details(self, store: Store, scores: dict, person: str, item: dict) -> dict:
        """One feed item's pop-up: its summary, the stored rows behind it (the key and the copies it absorbed), the route
        figures from the archived GPX and, for a gym session, its sets. `scores`: the person's."""
        keys = [item["key"], *item["aliases"]]
        with store.lock:
            rows = {r["key"]: dict(r) for r in store.db.execute(
                f"SELECT * FROM workouts WHERE person=? AND key IN ({','.join('?' * len(keys))})", [person, *keys])}
            shoe = store.db.execute("SELECT s.id, s.name FROM run_shoes r JOIN shoes s ON s.id=r.shoe_id WHERE r.person=? AND r.key=?",
                                    (person, item["key"])).fetchone()
        cache = (json.loads(store.kv_get("gym_cache") or "null") or {}).get(person, [])
        gym = {w["key"]: w for w in cache if w["key"] in keys}

        def figure(field):  # the kept copy's, else a copy it absorbed (a gym session that took a Watch workout's heart rate)
            return next((r[field] for k in keys if (r := rows.get(k)) and finite(r[field])), None)

        end = aware((rows.get(item["key"]) or gym.get(item["key"]) or {}).get("end"))
        bpm = (scores.get("max_hr") or {}).get("bpm")
        out = {"route": None, "series": None, "splits": [], "zones": None, "gain_m": None, "max_hr": bpm, "gym": None, "note": None}
        if path := next((r["file"] for k in keys if (r := rows.get(k)) and r["file"]), None):
            try:
                out |= details.route_details(Path(path).read_bytes(), bpm)
            except OSError:
                out["note"] = "file_missing"
            except Unreadable as err:  # the class only: never the file's content or path
                _LOGGER.warning("Workout details: unreadable route file: %s", type(err).__name__)
                out["note"] = "file_unreadable"
        if g := gym.get(item["key"]) or next(iter(gym.values()), None):
            out["gym"] = details.gym_summary({**g, "lifts": g.get("lifts") or {}, "unit": g.get("unit") or "kg"},
                                             exercise_catalog_cached(None, store, dt_util.utcnow()), (scores.get("pbs") or {}).get("lifts", []))
        out["summary"] = {
            "key": item["key"], "kind": item["kind"], "name": item["name"], "source": item["source"], "start": item["start"],
            "end": end.astimezone(datetime.fromisoformat(item["start"]).tzinfo).isoformat() if end else None,
            "minutes": item["minutes"], "km": item["km"], "avg_hr": figure("avg_hr"), "max_hr": figure("max_hr"), "kcal": figure("kcal"),
            "plan": item["plan"], "shoe": dict(shoe) if shoe else None, "counts": item["counts"], "reason": item["reason"]}
        return out

    def _manual(self, store: Store, msg: dict) -> None:
        config, _ = self.holder.get()
        if config is None:
            raise ValueError("no valid scoring config")
        msg_id = f"{time.time_ns() // 1_000_000:013d}-{secrets.token_hex(3)}"  # as the page's MQTT ids were
        manual.apply(store, msg, msg_id, dt_util.utcnow(), tuple(config["people"]))
