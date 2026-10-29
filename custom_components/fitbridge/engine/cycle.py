"""The scoring cycle: sources (openGym, pauses, steps, settings) -> score -> what to announce."""
import json
import logging
from collections.abc import Callable
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

from . import details, opengym, records, scoring, scoring_config, shoes
from .ingest import Unreadable, aware, db_workouts, is_run

log = logging.getLogger(__name__)


@dataclass
class Inputs:
    pauses: list[dict]                   # the pause calendar's events: {"summary", "start", "end"}
    steps: dict[str, dict[str, int]]     # {person: {"YYYY-MM-DD": steps}} as the steps collector keeps them; None: nothing yet
    settings: dict | None                # {"history": [...]} as the settings store keeps it; None: nothing saved yet
    opengym_uids: dict[str, str]         # person -> openGym uid
    opengym_invites: dict[str, str] = field(default_factory=dict)  # person -> invite code not used yet


@dataclass
class Cycle:
    scores: dict                         # the full result; each person's `older` feed is served by GET feed only, not /scores
    badges: list[tuple[str, dict]]       # (person, badge) to announce
    workouts: list[tuple[str, dict]]     # (person, feed item) to announce
    records: list[tuple[str, dict]]      # (person, record event) to announce
    commit: Callable[[], None]           # records the above as announced; call it after announcing
    gym_error: str | None = None         # class name of this cycle's openGym failure (the cache was used), or None
    gym_links: dict[str, str] = field(default_factory=dict)  # person -> uid of the account an invite linked; fresh fetches only


def fill_best_km(store, types):
    """Fastest 1 km of every run file not read yet. A file that cannot be read or parsed stores NULL, so it is
    logged once and never re-read."""
    done = store.best_km()
    for r in store.all_rows():
        if (r["person"], r["key"]) in done or not r["file"] or not is_run(r, types):
            continue
        try:
            seconds = records.fastest_1k_s(Path(r["file"]).read_bytes())
        except Exception as e:  # one bad file never blocks a cycle
            log.warning("best 1 km of %s: %s", r["key"], type(e).__name__)
            seconds = None
        store.set_best_km(r["person"], r["key"], seconds)


class ConfigHolder:
    """scoring.toml (plus the fixed people overlay), reloaded when its mtime changes; keeps the last good config when the new one is bad."""

    def __init__(self, path: Path, overlay: dict | None = None):
        self.path, self.overlay, self.mtime, self.config, self.error = path, overlay, None, None, None

    def get(self):
        """(last good config or None, current error or None)."""
        try:
            mtime = self.path.stat().st_mtime
        except OSError as e:
            self.mtime, self.error = None, f"cannot read {self.path}: {e}"
            return self.config, self.error
        if mtime != self.mtime:
            self.mtime = mtime
            try:
                new = scoring_config.load_config(self.path.read_text(encoding="utf-8"), self.overlay)
                scoring.score({}, [], new, datetime.now(timezone.utc))  # a config that cannot score is broken too
                self.config, self.error = new, None
            except Exception as e:
                self.error = f"{type(e).__name__}: {e}"
                log.error("scoring config %s: %s", self.path, self.error)
        return self.config, self.error


def _why(e):
    """Loggable reason: this one carries a token-free message; anything else is logged by class only."""
    return f"{type(e).__name__}: {e}" if isinstance(e, opengym.OpenGymAuthError) else type(e).__name__


class _NoPayload(Exception):
    """An input has nothing yet: not an error."""


def _cached(store, name, now, fetch):
    """Run fetch() (None: source not configured) and keep its JSON in kv[name]; on failure the old cache stays.
    Returns (cached value or None, when it was fetched, the exception fetch() raised or None)."""
    error = None
    if fetch is not None:
        try:
            text = json.dumps(fetch(), default=datetime.isoformat)
        except _NoPayload:  # nothing published yet: the cache stays, quietly
            pass
        except Exception as e:  # a failing source never breaks the rest (spec section 2)
            log.warning("%s: source unavailable, using the cache: %s", name, _why(e))
            error = e
        else:
            store.kv_set(name, text)
            store.kv_set(f"{name}_at", now.isoformat(timespec="seconds"))
    return json.loads(store.kv_get(name) or "null"), store.kv_get(f"{name}_at"), error


def exercise_catalog_cached(og, store, now):
    """{exercise id: {"name", "bp"}} from openGym's bundle, cached by bundle file name (and cache version 2, which added
    bp). Any failure serves the cache and waits an hour before the next try."""
    cached = json.loads(store.kv_get("opengym_exercises") or "null") or {}
    fresh = cached.get("version") == 2
    old = cached.get("exercises") if fresh else {k: {"name": v, "bp": ""} for k, v in (cached.get("names") or {}).items()}
    tried = aware(store.kv_get("opengym_exercises_tried"))
    if og is None or (tried and now - tried < timedelta(hours=1)):
        return old
    try:
        file = og.exercise_file()
        if not file:
            raise ValueError("no exercises bundle in openGym's index page")
        if file != cached.get("file") or not fresh:
            if not (catalog := records.exercise_catalog(og.text("/" + file))):
                raise ValueError("no exercise names in openGym's bundle")  # a changed format must not wipe the cache
            store.kv_set("opengym_exercises", json.dumps({"file": file, "version": 2, "exercises": catalog}))
            return catalog
        return old
    except Exception as e:  # no og, page down or changed: names fall back to the ids
        log.warning("exercise names: %s", _why(e))
        store.kv_set("opengym_exercises_tried", now.isoformat(timespec="seconds"))
        return old


def _gym(og, inputs, people, links):
    """The workouts to cache; the links found go into `links`, never into the cache."""
    og.renew_token()
    out, found = opengym.fetch_all(og, inputs.opengym_uids, people, None, inputs.opengym_invites)  # no public link
    links.update(found)
    return out


def _given(raw):
    if raw is None:
        raise _NoPayload  # not invalid: nothing to report, the cache stays
    return raw


def _pauses(pauses, config):
    # not _given: there is always a pause list (an empty one at least), so a missing one is warned about
    if not (isinstance(pauses, list) and all(
            isinstance(e, dict) and isinstance(e.get("start"), str) and isinstance(e.get("end"), str)
            and isinstance(e.get("summary") or "", str) for e in pauses)):
        raise ValueError("no valid pause list")
    tz = ZoneInfo(config["rules"]["timezone"])
    for e in pauses:  # every event, whatever its title: a bad date must never replace a good cache
        scoring.event_dates(e, tz)
    return pauses


def _steps(raw, people, cached):
    """The steps merged into `cached`, the higher count per person and day.
    HA sends only its last 35 days; fitbridge keeps every day, or old active days would drop out of scoring."""
    merged = {p: dict(days) for p, days in (cached or {}).items()}
    for p, days in scoring_config.parse_steps(_given(raw), people).items():
        kept = merged.setdefault(p, {})
        for d, n in days.items():
            kept[d] = max(n, kept.get(d, 0))
    return merged


def score_cycle(store, holder, og, inputs: Inputs, now) -> Cycle:
    """Sources -> score -> what to announce. The caller announces, then calls commit(): a failed announce is retried next cycle."""
    config, config_error = holder.get()
    if config is None:
        log.error("no valid scoring config, scoring skipped: %s", config_error)
        return Cycle({"error": "no valid scoring config", "config_error": config_error}, [], [], [], lambda: None)
    people = tuple(config["people"])

    links = {}
    gym, gym_as_of, gym_failure = _cached(store, "gym_cache", now, None if og is None else lambda: _gym(og, inputs, people, links))
    pauses, pauses_as_of, _ = _cached(store, "pauses_cache", now, lambda: _pauses(inputs.pauses, config))
    settings, settings_as_of, settings_failure = _cached(store, "settings_cache", now, lambda: (
        scoring_config.parse_settings(_given(inputs.settings), people)))
    settings_error = str(settings_failure) if isinstance(settings_failure, ValueError) else None  # invalid, not unreachable
    gym_error = type(gym_failure).__name__ if gym_failure else None
    steps, steps_as_of, _ = _cached(store, "steps_cache", now, lambda: (
        _steps(inputs.steps, people, json.loads(store.kv_get("steps_cache") or "null"))))
    fill_best_km(store, config["types"])
    workouts, uncounted = db_workouts(store, people, config["types"])
    excluded = store.exclusions()
    for p, ws in workouts.items():
        shoes.assign_new(store, p, [w["key"] for w in ws if w["kind"] == "run"])
    for p, ws in (gym or {}).items():
        if p in workouts:
            workouts[p] += [{**w, "start": datetime.fromisoformat(w["start"]),
                             "end": datetime.fromisoformat(w["end"]),
                             "lifts": w.get("lifts") or {}, "unit": w.get("unit") or "kg",  # cache from before lifts
                             "excluded": (p, w["key"]) in excluded} for w in ws]
    result = scoring.score(workouts, pauses or [], config, now, steps, settings,
                            exercise_catalog_cached(og, store, now), uncounted)
    for p, r in result["people"].items():
        r["shoes"] = shoes.rows(store, p, workouts[p])
        r["run_shoes"] = shoes.assigned(store, p)
    scores = {**result, "config_error": config_error, "gym_data_as_of": gym_as_of,
              "pauses_as_of": pauses_as_of, "settings_error": settings_error,
              "settings_as_of": settings_as_of, "steps_as_of": steps_as_of, "scored_at": now.isoformat(timespec="seconds")}
    unseen = [(p, *store.unseen_badges(p, r["badges"]["unlocked"])) for p, r in result["people"].items()]
    workouts_unseen = [(p, *store.unseen_workouts(p, r["feed"])) for p, r in result["people"].items()]
    announce = [(p, b) for p, fresh, loud in unseen if loud for b in fresh]
    stale = now - timedelta(hours=48)  # older news (home workouts stored before they were scored) is only recorded
    announce_workouts = [(p, w) for p, _, news, loud in workouts_unseen if loud for w in news
                         if not w["excluded"] and w["kind"] != "active_day" and w["reason"] not in ("type", "no_gps")  # these only get recorded
                         and datetime.fromisoformat(w["start"]) >= stale]
    recs = []  # (person, record events, record values to save, (record id, workout key) pairs to remember)
    for p, r in result["people"].items():
        recent = {k for w in r["feed"] if datetime.fromisoformat(w["start"]) >= stale for k in (w["key"], *w["aliases"])}
        recs.append((p, *records.record_changes(r["pbs"], *store.records(p), store.record_holders(p), recent)))

    def commit():
        for p, _, values, held in recs:  # only once announced
            store.save_records(p, values, held)
        for p, fresh, _ in unseen:  # only after a successful announce: a failed one is announced next cycle
            store.record_badges(p, fresh)
        for p, new, _, _ in workouts_unseen:  # excluded ones too: restoring a workout is not news
            store.record_workouts(p, [k for w in new for k in (w["key"], *w["aliases"])])

    return Cycle(scores, announce, announce_workouts, [(p, e) for p, es, _, _ in recs for e in es], commit, gym_error, {} if gym_failure else links)


def _route(paths, bpm):
    """(route_details of the files' tracks joined in time order, or {} when no file could be read; the note on a file
    that is gone or unreadable, or None). A merged workout's pieces join with the gap between them as a pause; a file
    whose time span overlaps one already taken is a dedup copy of it and is skipped."""
    segs, spans, note, read = [], [], None, False
    for path in paths:
        try:
            got = details.track(Path(path).read_bytes())
        except OSError:
            note = "file_missing"
            continue
        except Unreadable as err:  # the class only: never the file's content or path
            log.warning("Workout details: unreadable route file: %s", type(err).__name__)
            note = "file_unreadable"
            continue
        read = True
        span = (got[0][0][0], got[-1][-1][0]) if got else None
        if span and any(span[0] < b and a < span[1] for a, b in spans):
            continue
        spans += [span] if span else []
        segs += got
    return (details.route_details(sorted(segs, key=lambda seg: seg[0][0]), bpm) if read else {}), note


def workout_details(store, scores, person, item, now):
    """One feed item's pop-up: its summary, the stored rows behind it (the key and the copies it absorbed), the route
    figures from the archived GPX files and, for a gym session, its sets. `scores`: the person's."""
    keys = [item["key"], *item["aliases"]]
    with store.lock:
        rows = {r["key"]: dict(r) for r in store.db.execute(
            f"SELECT * FROM workouts WHERE person=? AND key IN ({','.join('?' * len(keys))})", [person, *keys])}
        shoe = store.db.execute("SELECT s.id, s.name FROM run_shoes r JOIN shoes s ON s.id=r.shoe_id WHERE r.person=? AND r.key=?",
                                (person, item["key"])).fetchone()
    cache = (json.loads(store.kv_get("gym_cache") or "null") or {}).get(person, [])
    gym = {w["key"]: w for w in cache if w["key"] in keys}

    def figure(field):  # the kept copy's, else a copy it absorbed (a gym session that took a Watch workout's heart rate)
        return next((r[field] for k in keys if (r := rows.get(k)) and scoring_config.finite(r[field])), None)

    end = max((e for k in keys if (e := aware((rows.get(k) or gym.get(k) or {}).get("end")))), default=None)  # a merge's last piece
    bpm = (scores.get("max_hr") or {}).get("bpm")
    out = {"route": None, "series": None, "splits": [], "zones": None, "gain_m": None, "max_hr": bpm, "gym": None, "note": None}
    route, out["note"] = _route(dict.fromkeys(r["file"] for k in keys if (r := rows.get(k)) and r["file"]), bpm)
    out |= route
    if g := gym.get(item["key"]) or next(iter(gym.values()), None):
        out["gym"] = details.gym_summary({**g, "lifts": g.get("lifts") or {}, "unit": g.get("unit") or "kg"},
                                         exercise_catalog_cached(None, store, now), (scores.get("pbs") or {}).get("lifts", []))
    out["summary"] = {
        "key": item["key"], "kind": item["kind"], "name": item["name"], "source": item["source"], "start": item["start"],
        "end": end.astimezone(datetime.fromisoformat(item["start"]).tzinfo).isoformat() if end else None,
        "minutes": item["minutes"], "km": item["km"], "avg_hr": figure("avg_hr"), "max_hr": figure("max_hr"), "kcal": figure("kcal"),
        "plan": item["plan"], "shoe": dict(shoe) if shoe else None, "counts": item["counts"], "reason": item["reason"]}
    return out
