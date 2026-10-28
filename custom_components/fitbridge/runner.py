"""fitbridge's engine inside HA: the 5 min scoring cycle and the 60 s folder scan, in the executor, never overlapping."""
import asyncio
import json
import logging
import secrets
import shutil
import time
from datetime import timedelta
from pathlib import Path

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.start import async_at_started
from homeassistant.util import dt as dt_util

from .const import DATA_DIR, DOMAIN, OPENGYM_TOKEN, OPT_OPENGYM_UIDS, OPT_OPENGYM_URL, OPT_SHADOW, SIGNAL_SCORES
from .engine import manual
from .engine.cycle import ConfigHolder, Inputs, score_cycle
from .engine.ingest import scan_folder
from .engine.opengym import OpenGym
from .engine.store import Store

_LOGGER = logging.getLogger(__name__)
SCORE_EVERY = timedelta(minutes=5)
SCAN_EVERY = timedelta(minutes=1)
PAUSE_CALENDAR = "calendar.training_pause"
ISSUE_TOKEN = "opengym_token"
DEFAULT_CONFIG = Path(__file__).parent / "engine" / "scoring.toml"


class Runner:
    """Shadow mode (the LXC's fitbridge is still the live system): scores into `scores` and shadow-scores.json only.
    Live: after each cycle SIGNAL_SCORES carries the Cycle; handlers must be @callback, as commit() follows them."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        self.hass, self.entry = hass, entry
        self.shadow: bool = entry.options.get(OPT_SHADOW, False)
        self.dir = Path(hass.config.path(DATA_DIR))
        self.folders: dict[str, Path] = {}  # person -> watch folder, scanned every minute (Task 6 fills it)
        self.store: Store | None = None
        self.holder: ConfigHolder | None = None
        self.scores: dict | None = None
        self._lock = asyncio.Lock()
        self._unsubs: list = []

    async def async_start(self) -> None:
        self.store = await self.hass.async_add_executor_job(self._open)
        self._unsubs = [
            async_track_time_interval(self.hass, self._score_tick, SCORE_EVERY, name="fitbridge score"),
            async_track_time_interval(self.hass, self._scan_tick, SCAN_EVERY, name="fitbridge scan"),
            async_at_started(self.hass, self._score_tick),  # once HA runs: the pause calendar is there by then
        ]

    async def async_stop(self) -> None:
        for unsub in self._unsubs:
            unsub()
        async with self._lock:  # a cycle still running finishes first
            store, self.store = self.store, None
            if store is not None:
                await self.hass.async_add_executor_job(store.db.close)

    async def async_score_now(self) -> None:
        """One cycle now, after the one still running."""
        async with self._lock:
            await self._score()

    async def async_manual(self, msg: dict) -> None:
        """One remove / restore / add (engine.manual), then a cycle. ValueError (short reason) when it is invalid."""
        async with self._lock:
            await self.hass.async_add_executor_job(self._manual, msg)
            await self._score()

    async def _score_tick(self, _now=None) -> None:
        if not self._lock.locked():  # a cycle still running: this tick is skipped, not queued
            await self.async_score_now()

    async def _scan_tick(self, _now) -> None:
        if self._lock.locked() or not self.folders:
            return
        async with self._lock:
            if self.store is None:
                return
            try:
                await self.hass.async_add_executor_job(self._scan)
            except Exception as err:  # a failing scan never stops the timer
                _LOGGER.error("Folder scan failed: %s", type(err).__name__)

    async def _score(self) -> None:
        data = self.hass.data.get(DOMAIN)
        if self.store is None or data is None:  # stopped, or unloading (the entry's Data goes before the runner stops)
            return
        og = self._opengym()
        inputs = Inputs(await self._pauses(), data.steps.snapshot() if data.steps else None,
                        {"history": data.settings_history} if data.settings_history else None,
                        dict(self.entry.options.get(OPT_OPENGYM_UIDS, {})))
        try:
            cycle = await self.hass.async_add_executor_job(self._cycle, og, inputs)
        except Exception as err:  # one bad cycle never stops the timers
            _LOGGER.error("Scoring cycle failed: %s", type(err).__name__)
            return
        self.scores = cycle.scores
        self._token_issue(og, cycle.gym_error)
        if self.shadow:
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
        return OpenGym(url, lambda: self.entry.data[OPENGYM_TOKEN], self._save_token)

    def _save_token(self, token: str) -> None:
        """Called by OpenGym in the executor: the entry is updated on the loop."""
        self.hass.add_job(self._store_token, token)

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
        cycle = score_cycle(self.store, self.holder, og, inputs, dt_util.utcnow(), not self.shadow)
        if self.shadow:  # compared with the LXC's /scores during the shadow run
            (self.dir / "shadow-scores.json").write_text(json.dumps(cycle.scores, indent=2, sort_keys=True), encoding="utf-8")
        return cycle

    def _scan(self) -> None:
        for person, folder in self.folders.items():
            scan_folder(self.store, self.dir / "archive", person, Path(folder))

    def _manual(self, msg: dict) -> None:
        config, _ = self.holder.get()
        if config is None:
            raise ValueError("no valid scoring config")
        msg_id = f"{time.time_ns() // 1_000_000:013d}-{secrets.token_hex(3)}"  # as the page's MQTT ids were
        manual.apply(self.store, msg, msg_id, dt_util.utcnow(), tuple(config["people"]))
