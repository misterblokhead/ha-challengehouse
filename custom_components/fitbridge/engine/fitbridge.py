#!/usr/bin/env python3
"""fitbridge: moves workouts from the phones into Endurain and scores them (see specs/fitness-HANDOVER.md).

- OpenTracks GPX files that Syncthing drops into SYNC_DIR_<ID> folders are uploaded as-is.
- "Health Exporter & Shortcuts" ZIP/JSON exports POSTed through `tailscale serve`.
  The sender is identified by the Tailscale-User-Login header that `tailscale serve` sets
  (TAILSCALE_LOGIN_<ID>), so the phone needs no token. Runs wait for route support (format
  not seen yet); other workouts are archived only (gym sessions are counted from openGym).
- Every SCORE_SECONDS: scores everyone in scoring.toml, publishes to HA over MQTT, serves GET /scores.

Stdlib only. State in SQLite, raw inputs kept under DATA_DIR/archive.
"""
import hashlib
import io
import json
import logging
import os
import shutil
import sqlite3
import threading
import time
import urllib.error
import urllib.request
import uuid
import xml.etree.ElementTree as ET
import zipfile
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from zoneinfo import ZoneInfo

from . import mqtt, opengym, publish, records, scoring, scoring_config
from .scoring_config import HOME_TYPES, KINDS, finite

log = logging.getLogger("fitbridge")

LAST_SCORE = None  # last score_cycle() result, served on GET /scores
MAX_BODY = 200 * 1024 * 1024
MAX_DRAIN = 1024 * 1024  # body bytes read before a 403
GPX_NS = "{http://www.topografix.com/GPX/1/1}"
HK = "HKQuantityTypeIdentifier"
ROUTE_TYPES = {"running", "walking", "hiking"}  # HealthKit activityType names that carry a route

SCHEMA = """
CREATE TABLE IF NOT EXISTS workouts(
  person TEXT NOT NULL, key TEXT NOT NULL, source TEXT NOT NULL,
  activity_type TEXT, start TEXT, end TEXT, duration_s REAL, distance_m REAL,
  kcal REAL, avg_hr REAL, max_hr REAL, points INTEGER, indoor INTEGER,
  file TEXT, status TEXT NOT NULL, job_id TEXT, endurain_ids TEXT, error TEXT,
  updated TEXT NOT NULL, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS seen_files(path TEXT PRIMARY KEY, mtime REAL, size INTEGER);
CREATE TABLE IF NOT EXISTS kv(key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS exclusions(person TEXT, key TEXT, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS badges(person TEXT, id TEXT, unlocked_at TEXT, PRIMARY KEY(person, id));
CREATE TABLE IF NOT EXISTS manual_seen(msg_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS announced_workouts(person TEXT, key TEXT, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS best_km(person TEXT, key TEXT, seconds INTEGER, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS records(person TEXT, id TEXT, value REAL, PRIMARY KEY(person, id));
CREATE TABLE IF NOT EXISTS record_holders(person TEXT, id TEXT, key TEXT, PRIMARY KEY(person, id, key));
"""
# status: pending_upload -> job_pending -> completed | failed
#         skipped_no_gps (GPX without points), awaiting_route (outdoor, route GPX not exported yet),
#         no_route (indoor, never has a route), archived (not for Endurain),
#         manual (entered by hand through MQTT, never uploaded)
# Indoor workouts stored as awaiting_route before no_route existed.
MIGRATE = "UPDATE workouts SET status='no_route' WHERE source='health_exporter' AND status='awaiting_route' AND indoor=1"


def per_person(env, prefix):
    """{<id lowercased>: value} for every non-empty env var <prefix><ID>."""
    return {k[len(prefix):].lower(): v for k, v in env.items() if k.startswith(prefix) and k != prefix and v}


@dataclass
class Config:
    endurain_url: str
    data_dir: Path
    sync_dirs: dict = field(default_factory=dict)  # person -> folder of OpenTracks GPX files
    port: int = 8091
    scan_seconds: int = 60
    keys: dict = field(default_factory=dict, repr=False)  # person -> Endurain API key
    logins: dict = field(default_factory=dict)            # tailscale login (lowercase) -> person
    scoring_toml: Path = Path("/opt/fitbridge/scoring.toml")
    opengym_url: str = "http://127.0.0.1:8092"
    opengym_token: str = field(default="", repr=False)
    opengym_uids: dict = field(default_factory=dict)      # person -> openGym uid
    mqtt: dict = field(default_factory=lambda: {"host": ""}, repr=False)  # host, port, user, password
    score_seconds: int = 300
    endurain_public: str = ""  # public links for HA; empty = no links (set in .env, see env.example)
    opengym_public: str = ""

    @classmethod
    def from_env(cls, env=os.environ):
        return cls(
            endurain_url=env.get("ENDURAIN_URL", "http://127.0.0.1:8080").rstrip("/"),
            data_dir=Path(env.get("DATA_DIR", "/var/lib/fitbridge")),
            sync_dirs={p: Path(v) for p, v in per_person(env, "SYNC_DIR_").items()},
            port=int(env.get("LISTEN_PORT", "8091")),
            scan_seconds=int(env.get("SCAN_SECONDS", "60")),
            keys=per_person(env, "ENDURAIN_KEY_"),
            logins={v.lower(): p for p, v in per_person(env, "TAILSCALE_LOGIN_").items()},
            scoring_toml=Path(env.get("SCORING_TOML", "/opt/fitbridge/scoring.toml")),
            opengym_url=env.get("OPENGYM_URL", "http://127.0.0.1:8092"),
            opengym_token=env.get("OPENGYM_TOKEN", ""),
            opengym_uids=per_person(env, "OPENGYM_UID_"),
            mqtt={"host": env.get("MQTT_HOST", ""), "port": int(env.get("MQTT_PORT", "1883")),
                  "user": env.get("MQTT_USER", ""), "password": env.get("MQTT_PASSWORD", "")},
            score_seconds=int(env.get("SCORE_SECONDS", "300")),
            endurain_public=env.get("ENDURAIN_PUBLIC_URL", "").rstrip("/"),
            opengym_public=env.get("OPENGYM_PUBLIC_URL", "").rstrip("/"),
        )


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def seconds_between(start, end):
    try:
        return (datetime.fromisoformat(end) - datetime.fromisoformat(start)).total_seconds()
    except (TypeError, ValueError):
        return None


# ---------- parsing ----------

def parse_gpx(data: bytes) -> dict:
    """Summary of an OpenTracks GPX: trackid, type, points, times, distance, HR."""
    root = ET.fromstring(data)
    pts, hrs = [], []
    for pt in root.iter(GPX_NS + "trkpt"):
        t = pt.find(GPX_NS + "time")
        pts.append((float(pt.get("lat")), float(pt.get("lon")), t.text.strip() if t is not None and t.text else None))
        hrs += [int(float(el.text)) for el in pt.iter() if el.tag.endswith("}hr") and el.text]
    trackid = next((el.text.strip() for el in root.iter() if el.tag.endswith("}trackid") and el.text), None)
    trk_type = root.find(f"{GPX_NS}trk/{GPX_NS}type")
    times = [p[2] for p in pts if p[2]]
    start, end = (times[0], times[-1]) if times else (None, None)
    return {
        "trackid": trackid,
        "activity_type": trk_type.text.strip() if trk_type is not None and trk_type.text else None,
        "points": len(pts),
        "start": start, "end": end, "duration_s": seconds_between(start, end),
        "distance_m": sum(records.haversine_m(a, b) for a, b in zip(pts, pts[1:])),
        "avg_hr": sum(hrs) / len(hrs) if hrs else None,
        "max_hr": max(hrs) if hrs else None,
    }


def _distance_m(value, unit):
    factor = {"m": 1, "km": 1000, "mi": 1609.344}.get((unit or "").lower())
    return value * factor if value is not None and factor else None


def map_hex_workout(w: dict) -> dict:
    stats = w.get("statistics") or {}

    def stat(name, key):
        return (stats.get(HK + name) or {}).get(key)

    dist = stats.get(HK + "DistanceWalkingRunning") or {}
    return {
        "key": w["uuid"],
        "activity_type": w.get("activityType"),
        "start": w.get("startDate"), "end": w.get("endDate"),
        "duration_s": w.get("duration"),
        "distance_m": _distance_m(dist.get("sum"), dist.get("unit")),
        "kcal": stat("ActiveEnergyBurned", "sum"),
        "avg_hr": stat("HeartRate", "average"), "max_hr": stat("HeartRate", "max"),
        "indoor": w.get("indoor"),
        "route_file": w.get("routeFile"),
    }


def parse_hex_export(body: bytes):
    """Workouts + raw GPX entries from a Health Exporter ZIP (or bare JSON) export."""
    docs, gpx = [], {}
    if zipfile.is_zipfile(io.BytesIO(body)):
        with zipfile.ZipFile(io.BytesIO(body)) as z:
            if sum(i.file_size for i in z.infolist()) > MAX_BODY:
                raise ValueError("zip expands too large")
            for info in z.infolist():
                if info.filename.endswith(".json"):
                    docs.append(json.loads(z.read(info)))
                elif info.filename.endswith(".gpx"):
                    gpx[Path(info.filename).name] = z.read(info)
    else:
        docs.append(json.loads(body))
    workouts = [map_hex_workout(w) for d in docs for w in (d.get("workouts") or []) if w.get("uuid")]
    return workouts, gpx


# ---------- Endurain ----------

class UploadRejected(Exception):
    """Endurain refused the file itself (do not retry)."""


class Endurain:
    def __init__(self, url, keys):
        self.url, self.keys = url, keys

    def _call(self, req):
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read() or b"{}")

    def upload(self, person, filename, data: bytes, idem_key):
        boundary = uuid.uuid4().hex
        body = (f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="{filename}"\r\n'
                f"Content-Type: application/octet-stream\r\n\r\n").encode() + data + f"\r\n--{boundary}--\r\n".encode()
        req = urllib.request.Request(
            f"{self.url}/api/v1/activities/upload", data=body, method="POST",
            headers={"X-API-Key": self.keys[person], "Idempotency-Key": idem_key,
                     "Content-Type": f"multipart/form-data; boundary={boundary}"})
        try:
            return self._call(req)["id"]
        except urllib.error.HTTPError as e:
            if e.code in (400, 413, 415, 422):
                raise UploadRejected(f"HTTP {e.code}: {e.read()[:300]!r}") from e
            raise

    def job(self, person, job_id):
        req = urllib.request.Request(f"{self.url}/api/v1/activities/ingestion-jobs/{job_id}",
                                     headers={"X-API-Key": self.keys[person]})
        return self._call(req)


# ---------- state ----------

class Store:
    def __init__(self, path):
        self.db = sqlite3.connect(path, check_same_thread=False)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(SCHEMA)
        with self.db:
            self.db.execute(MIGRATE)
        self.lock = threading.Lock()

    def add(self, person, key, source, status, **fields):
        """Insert a workout once; returns False if (person, key) already exists."""
        row = {"person": person, "key": key, "source": source, "status": status, "updated": now_iso(), **fields}
        with self.lock, self.db:
            cur = self.db.execute(
                f"INSERT OR IGNORE INTO workouts({','.join(row)}) VALUES({','.join('?' * len(row))})",
                list(row.values()))
            return cur.rowcount == 1

    def attach_route(self, person, key, status, **fields):
        """A route that arrived after its workout; only a row still awaiting one changes."""
        fields.update(status=status, updated=now_iso())
        with self.lock, self.db:
            cur = self.db.execute(f"UPDATE workouts SET {','.join(f'{k}=?' for k in fields)} "
                                  "WHERE person=? AND key=? AND status='awaiting_route'",
                                  [*fields.values(), person, key])
            return cur.rowcount == 1

    def update(self, person, key, **fields):
        fields["updated"] = now_iso()
        with self.lock, self.db:
            self.db.execute(f"UPDATE workouts SET {','.join(f'{k}=?' for k in fields)} WHERE person=? AND key=?",
                            [*fields.values(), person, key])

    def rows(self, status):
        with self.lock:
            return self.db.execute("SELECT * FROM workouts WHERE status=?", (status,)).fetchall()

    def file_seen(self, path: Path):
        st = path.stat()
        with self.lock:
            row = self.db.execute("SELECT mtime, size FROM seen_files WHERE path=?", (str(path),)).fetchone()
        return row is not None and row["mtime"] == st.st_mtime and row["size"] == st.st_size

    def mark_seen(self, path: Path):
        st = path.stat()
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO seen_files VALUES(?,?,?)", (str(path), st.st_mtime, st.st_size))

    def counts(self):
        with self.lock:
            rows = self.db.execute("SELECT person, status, COUNT(*) n FROM workouts GROUP BY person, status").fetchall()
        out = {}
        for r in rows:
            out.setdefault(r["person"], {})[r["status"]] = r["n"]
        return out

    def all_rows(self):
        with self.lock:
            return self.db.execute("SELECT * FROM workouts").fetchall()

    def kv_get(self, key):
        with self.lock:
            row = self.db.execute("SELECT value FROM kv WHERE key=?", (key,)).fetchone()
        return row["value"] if row else None

    def kv_set(self, key, value):
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (key, value))

    def best_km(self):
        """{(person, workout key): fastest 1 km in seconds, or None when the file gave none}."""
        with self.lock:
            return {(r["person"], r["key"]): r["seconds"] for r in self.db.execute("SELECT * FROM best_km")}

    def set_best_km(self, person, key, seconds):
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO best_km VALUES(?,?,?)", (person, key, seconds))

    def exclusions(self):
        with self.lock:
            return {(r["person"], r["key"]) for r in self.db.execute("SELECT person, key FROM exclusions")}

    def set_excluded(self, person, key, excluded: bool):
        sql = "INSERT OR IGNORE INTO exclusions VALUES(?,?)" if excluded else \
            "DELETE FROM exclusions WHERE person=? AND key=?"
        with self.lock, self.db:
            self.db.execute(sql, (person, key))

    def delete_workout(self, person, key):
        with self.lock, self.db:
            self.db.execute("DELETE FROM workouts WHERE person=? AND key=?", (person, key))

    def unseen_badges(self, person, unlocked):
        """(badges not yet recorded, whether to announce them). Read-only; a person's first scoring is silent."""
        with self.lock:
            known = {r["id"] for r in self.db.execute("SELECT id FROM badges WHERE person=?", (person,))}
        scored = self.kv_get(f"scored:{person}") is not None
        return [b for b in unlocked if b["id"] not in known], scored

    def record_badges(self, person, badges):
        with self.lock, self.db:
            self.db.executemany("INSERT OR IGNORE INTO badges VALUES(?,?,?)",
                                [(person, b["id"], b.get("unlocked_at")) for b in badges])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"scored:{person}", now_iso()))

    def unseen_workouts(self, person, feed):
        """(feed items with a key or alias not yet recorded, those of them that are news, whether to announce them).

        An item is news only when neither its key nor an alias (a copy dedup or merge absorbed) was recorded.
        Read-only; a person's first scoring is silent."""
        with self.lock:
            known = {r["key"] for r in self.db.execute("SELECT key FROM announced_workouts WHERE person=?", (person,))}
        new = [w for w in feed if not {w["key"], *w["aliases"]} <= known]
        return (new, [w for w in new if known.isdisjoint([w["key"], *w["aliases"]])],
                self.kv_get(f"workouts_scored:{person}") is not None)

    def record_workouts(self, person, keys):
        with self.lock, self.db:
            self.db.executemany("INSERT OR IGNORE INTO announced_workouts VALUES(?,?)", [(person, k) for k in keys])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"workouts_scored:{person}", now_iso()))

    def records(self, person):
        """({record id: stored value}, whether to announce changes: False on the person's first record pass). Read-only."""
        with self.lock:
            known = {r["id"]: r["value"] for r in self.db.execute("SELECT id, value FROM records WHERE person=?", (person,))}
        return known, self.kv_get(f"records_scored:{person}") is not None

    def record_holders(self, person):
        """{(record id, workout key)}: every workout that has held a record. Read-only."""
        with self.lock:
            return {(r["id"], r["key"]) for r in self.db.execute("SELECT id, key FROM record_holders WHERE person=?", (person,))}

    def save_records(self, person, values, holders):
        with self.lock, self.db:
            self.db.executemany("INSERT OR REPLACE INTO records VALUES(?,?,?)", [(person, i, v) for i, v in values.items()])
            self.db.executemany("INSERT OR IGNORE INTO record_holders VALUES(?,?,?)", [(person, i, k) for i, k in holders])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"records_scored:{person}", now_iso()))

    def manual_seen(self, msg_id) -> bool:
        with self.lock:
            return self.db.execute("SELECT 1 FROM manual_seen WHERE msg_id=?", (msg_id,)).fetchone() is not None

    def mark_manual_seen(self, msg_id):
        with self.lock, self.db:
            self.db.execute("INSERT OR IGNORE INTO manual_seen VALUES(?)", (msg_id,))


# ---------- scoring input ----------

KIND_NAMES = {"run": "Run", "walk": "Walk", "gym": "Gym session", "home": "Home workout"}
MANUAL_MAX_MIN = 600
MANUAL_MAX_KM = 1000
MANUAL_EARLIEST = datetime(2000, 1, 1, tzinfo=timezone.utc)


def classify(source, activity_type, points):
    """Workout kind (run|walk|gym|home) per spec section 4, or None when it does not count."""
    t = (activity_type or "").lower()
    if source == "manual":
        return t if t in KINDS else None
    if source == "opentracks":
        if "run" in t or "hardlop" in t:
            return "run" if points else None
        return "walk" if "walk" in t or "wandel" in t else None
    if source == "health_exporter":  # HealthKit names
        if t in HOME_TYPES:
            return "home"
        return {"running": "run", "walking": "walk", "hiking": "walk"}.get(t)
    return None


def _aware(text):
    try:
        dt = datetime.fromisoformat(text)
    except (TypeError, ValueError):
        return None
    return dt if dt.tzinfo else None


def fill_best_km(store):
    """Fastest 1 km of every run file not read yet. A file that cannot be read or parsed stores NULL, so it is
    logged once and never re-read."""
    done = store.best_km()
    for r in store.all_rows():
        if (r["person"], r["key"]) in done or not r["file"] or classify(r["source"], r["activity_type"], r["points"]) != "run":
            continue
        try:
            seconds = records.fastest_1k_s(Path(r["file"]).read_bytes())
        except Exception as e:  # one bad file never blocks a cycle
            log.warning("best 1 km of %s: %s", r["key"], type(e).__name__)
            seconds = None
        store.set_best_km(r["person"], r["key"], seconds)


def db_workouts(store, cfg, people):
    """All stored workouts as scorer dicts, per person. Rows we cannot place in time are skipped."""
    out = {p: [] for p in people}
    excluded, best_km = store.exclusions(), store.best_km()
    public = cfg.endurain_public
    for r in store.all_rows():
        kind = classify(r["source"], r["activity_type"], r["points"])
        start = _aware(r["start"])
        if r["person"] not in out or not kind or not start:
            continue
        end = _aware(r["end"])
        dur = r["duration_s"] if r["duration_s"] is not None else ((end - start).total_seconds() if end else None)
        if dur is None or dur <= 0:
            continue
        end = end or start + timedelta(seconds=dur)
        try:
            ids = json.loads(r["endurain_ids"] or "null")
        except ValueError:
            ids = None
        out[r["person"]].append({
            "person": r["person"], "key": r["key"], "source": r["source"], "kind": kind,
            "indoor": bool(r["indoor"]), "start": start, "end": end, "duration_s": float(dur),
            "distance_m": r["distance_m"], "avg_hr": r["avg_hr"], "vol_kg": 0.0, "prs": [],
            "name": KIND_NAMES[kind], "best_1k_s": best_km.get((r["person"], r["key"])), "lifts": {}, "unit": "kg",
            "url": f"{public}/activity/{ids[0]}" if public and isinstance(ids, list) and ids else None,
            "excluded": (r["person"], r["key"]) in excluded,
        })
    return out


def _apply_one(store, msg_id, raw, now, people):
    """Apply one manual message; raises ValueError (short reason) when it is invalid."""
    try:
        msg = json.loads(raw)
    except ValueError:
        raise ValueError("not JSON") from None
    if not isinstance(msg, dict):
        raise ValueError("not an object")
    person, action = msg.get("person"), msg.get("action")
    if person not in people:
        raise ValueError("unknown person")
    if action in ("remove", "restore"):
        key = msg.get("key")
        if not isinstance(key, str) or not key:
            raise ValueError("missing key")
        if action == "remove" and key.startswith("manual:"):
            store.delete_workout(person, key)
        else:
            store.set_excluded(person, key, action == "remove")
    elif action == "add":
        minutes, km = msg.get("minutes"), msg.get("km")
        if msg.get("kind") not in KINDS:
            raise ValueError("unknown kind")
        if not finite(minutes) or not 0 < minutes <= MANUAL_MAX_MIN:
            raise ValueError("bad minutes")
        if km is not None and (not finite(km) or not 0 <= km <= MANUAL_MAX_KM):
            raise ValueError("bad km")
        start = _aware(msg.get("start"))
        if not start:
            raise ValueError("start must be an ISO 8601 time with timezone")
        if start > now:
            raise ValueError("start in the future")
        if start < MANUAL_EARLIEST:  # absurd years overflow later datetime arithmetic
            raise ValueError("start too early")
        indoor = msg.get("indoor", False)
        if not isinstance(indoor, bool):
            raise ValueError("indoor must be a boolean")
        store.add(person, f"manual:{msg_id}", "manual", "manual", activity_type=msg["kind"],
                  start=start.isoformat(), end=(start + timedelta(minutes=minutes)).isoformat(),
                  duration_s=minutes * 60, distance_m=None if km is None else km * 1000,
                  indoor=int(indoor))
    else:
        raise ValueError("unknown action")


def _msg_order(topic):
    """Sort key: the id's time prefix in ms (HA scripts send seconds, the integration ms), then the topic; no time prefix first."""
    head = topic.rsplit("/", 1)[-1].split("-", 1)[0]
    if not (head.isascii() and head.isdigit()):
        return 0, 0, topic
    t = int(head)
    return 1, t * 1000 if t < 1e12 else t, topic


def apply_manual(store, messages, now, people):
    """Apply fitbridge/manual/<id> messages once each, oldest first (an Undo must follow its Remove); returns the topics to
    clear: applied or invalid, not those a database error kept from applying (the retained message is the only copy, so it
    is retried)."""
    retry = set()
    for topic in sorted(messages, key=_msg_order):
        raw = messages[topic]
        msg_id = topic.rsplit("/", 1)[-1]
        if store.manual_seen(msg_id):
            continue
        try:
            _apply_one(store, msg_id, raw, now, people)
        except sqlite3.Error as e:
            log.warning("manual message %s kept for retry: %s", msg_id, type(e).__name__)
            retry.add(topic)
            continue
        except Exception as e:  # e.g. RecursionError on nested JSON: a bad message must never block scoring
            log.warning("manual message %s rejected: %s", msg_id, e if isinstance(e, ValueError) else type(e).__name__)
            continue
        store.mark_manual_seen(msg_id)
    return [t for t in messages if t not in retry]


# ---------- scoring cycle ----------

class ConfigHolder:
    """scoring.toml, reloaded when its mtime changes; keeps the last good config when the new one is bad."""

    def __init__(self, path: Path):
        self.path, self.mtime, self.config, self.error = path, None, None, None

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
                new = scoring_config.load_config(self.path.read_text(encoding="utf-8"))
                scoring.score({}, [], new, datetime.now(timezone.utc))  # a config that cannot score is broken too
                self.config, self.error = new, None
            except Exception as e:
                self.error = f"{type(e).__name__}: {e}"
                log.error("scoring config %s: %s", self.path, self.error)
        return self.config, self.error


def _why(e):
    """Loggable reason: these two carry token-free messages; anything else is logged by class only."""
    return f"{type(e).__name__}: {e}" if isinstance(e, (opengym.OpenGymAuthError, mqtt.MqttError)) else type(e).__name__


class _NoPayload(Exception):
    """A retained topic is empty: not an error."""


def _cached(store, name, now, fetch):
    """Run fetch() (None: source not configured) and keep its JSON in kv[name]; on failure the old cache stays.
    Returns (cached value or None, when it was fetched, the message when fetch() found the payload invalid)."""
    error = None
    if fetch is not None:
        try:
            text = json.dumps(fetch(), default=datetime.isoformat)
        except _NoPayload:  # nothing published yet: the cache stays, quietly
            pass
        except Exception as e:  # a failing source never breaks the rest (spec section 2)
            log.warning("%s: source unavailable, using the cache: %s", name, _why(e))
            error = str(e) if isinstance(e, ValueError) else None  # invalid, not unreachable
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
    tried = _aware(store.kv_get("opengym_exercises_tried"))
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


def _gym(og, cfg, people):
    og.renew_token()
    return opengym.fetch_all(og, cfg.opengym_uids, people, cfg.opengym_public)


def _retained_json(mq, topic):
    raw = mq.retained(topic).get(topic)
    if not raw:
        raise _NoPayload  # not invalid: nothing to report, the cache stays
    return json.loads(raw)


def _pauses(mq, config):
    # not _retained_json: HA keeps a pause list published (an empty one at least), so a missing one is warned about
    raw = mq.retained("fitbridge/pauses").get("fitbridge/pauses")
    pauses = json.loads(raw) if raw else None
    if not (isinstance(pauses, list) and all(
            isinstance(e, dict) and isinstance(e.get("start"), str) and isinstance(e.get("end"), str)
            and isinstance(e.get("summary") or "", str) for e in pauses)):
        raise ValueError("no valid pause list on fitbridge/pauses")
    tz = ZoneInfo(config["rules"]["timezone"])
    for e in pauses:  # every event, whatever its title: a bad date must never replace a good cache
        scoring.event_dates(e, tz)
    return pauses


def _steps(mq, people, cached):
    """The retained steps merged into `cached`, the higher count per person and day.
    HA sends only its last 35 days; fitbridge keeps every day, or old active days would drop out of scoring."""
    merged = {p: dict(days) for p, days in (cached or {}).items()}
    for p, days in scoring_config.parse_steps(_retained_json(mq, "fitbridge/steps"), people).items():
        kept = merged.setdefault(p, {})
        for d, n in days.items():
            kept[d] = max(n, kept.get(d, 0))
    return merged


def score_cycle(cfg, store, holder, og, mq, now):
    """Manual -> sources -> score -> LAST_SCORE -> publish -> record badges, workouts and records. Only the publish error propagates."""
    global LAST_SCORE
    config, config_error = holder.get()
    if config is None:
        log.error("no valid scoring config, scoring skipped: %s", config_error)
        LAST_SCORE = {"error": "no valid scoring config", "config_error": config_error}
        return LAST_SCORE
    people = tuple(config["people"])

    if mq is not None:
        try:
            topics = apply_manual(store, mq.retained("fitbridge/manual/#"), now, people)
            if topics:
                mq.publish_many([(t, b"", True) for t in topics])
        except mqtt.MqttError as e:  # applying is idempotent per message id, so clearing can wait a cycle
            log.warning("manual messages skipped this cycle: %s", _why(e))

    gym, gym_as_of, _ = _cached(store, "gym_cache", now, None if og is None else lambda: _gym(og, cfg, people))
    pauses, pauses_as_of, _ = _cached(store, "pauses_cache", now, None if mq is None else lambda: _pauses(mq, config))
    settings, settings_as_of, settings_error = _cached(store, "settings_cache", now, None if mq is None else lambda: (
        scoring_config.parse_settings(_retained_json(mq, "fitbridge/settings"), people)))
    steps, steps_as_of, _ = _cached(store, "steps_cache", now, None if mq is None else lambda: (
        _steps(mq, people, json.loads(store.kv_get("steps_cache") or "null"))))
    fill_best_km(store)
    workouts, excluded = db_workouts(store, cfg, people), store.exclusions()
    for p, ws in (gym or {}).items():
        if p in workouts:
            workouts[p] += [{**w, "start": datetime.fromisoformat(w["start"]),
                             "end": datetime.fromisoformat(w["end"]),
                             "lifts": w.get("lifts") or {}, "unit": w.get("unit") or "kg",  # cache from before lifts
                             "excluded": (p, w["key"]) in excluded} for w in ws]
    result = scoring.score(workouts, pauses or [], config, now, steps, settings,
                            exercise_catalog_cached(og, store, now))
    # stored before publishing, so GET /scores shows this cycle even when MQTT is down
    LAST_SCORE = {**result, "config_error": config_error, "gym_data_as_of": gym_as_of,
                  "pauses_as_of": pauses_as_of, "settings_error": settings_error,
                  "settings_as_of": settings_as_of, "steps_as_of": steps_as_of, "scored_at": now.isoformat(timespec="seconds")}

    unseen = [(p, *store.unseen_badges(p, r["badges"]["unlocked"])) for p, r in result["people"].items()]
    workouts_unseen = [(p, *store.unseen_workouts(p, r["feed"])) for p, r in result["people"].items()]
    if mq is not None:
        announce = [(p, b) for p, fresh, loud in unseen if loud for b in fresh]
        stale = now - timedelta(hours=48)  # older news (home workouts stored before they were scored) is only recorded
        announce_workouts = [(p, w) for p, _, news, loud in workouts_unseen if loud for w in news
                             if not w["excluded"] and w["kind"] != "active_day"  # active days never announce, only get recorded
                             and datetime.fromisoformat(w["start"]) >= stale]
        recs = []  # (person, record events, record values to save, (record id, workout key) pairs to remember)
        for p, r in result["people"].items():
            recent = {k for w in r["feed"] if datetime.fromisoformat(w["start"]) >= stale for k in (w["key"], *w["aliases"])}
            recs.append((p, *records.record_changes(r["pbs"], *store.records(p), store.record_holders(p), recent)))
        mq.publish_many(publish.discovery_messages(result, announce, announce_workouts, [(p, e) for p, es, _, _ in recs for e in es])
                        + [publish.scores_message(LAST_SCORE)])
        for p, _, values, held in recs:  # after the publish too; without MQTT nothing is saved, so the first publish stays silent
            store.save_records(p, values, held)
    for p, fresh, _ in unseen:  # only after a successful publish: a failed one is announced next cycle
        store.record_badges(p, fresh)
    for p, new, _, _ in workouts_unseen:  # excluded ones too: restoring a workout is not news
        store.record_workouts(p, [k for w in new for k in (w["key"], *w["aliases"])])
    return LAST_SCORE


def seed_opengym_token(cfg, store):
    """A new OPENGYM_TOKEN in the env (re-paired) replaces the renewed token in the DB; the same one does not."""
    if not cfg.opengym_token:
        return
    digest = hashlib.sha256(cfg.opengym_token.encode()).hexdigest()
    if store.kv_get("opengym_env_sha256") != digest:
        store.kv_set("opengym_token", cfg.opengym_token)
        store.kv_set("opengym_env_sha256", digest)


# ---------- work ----------

def scan_sync_folders(cfg: Config, store: Store):
    for person, folder in cfg.sync_dirs.items():
        scan_folder(cfg, store, person, folder)


def scan_folder(cfg: Config, store: Store, person: str, folder: Path):
    archive = cfg.data_dir / "archive" / person
    archive.mkdir(parents=True, exist_ok=True)
    for path in sorted(folder.glob("*.gpx")):
        if store.file_seen(path):
            continue
        data = path.read_bytes()
        try:
            info = parse_gpx(data)
        except (ET.ParseError, ValueError, TypeError) as e:
            # shortcut: a half-synced file parses badly; it is retried when mtime/size change
            log.warning("unreadable GPX %s: %s", path.name, e)
            continue
        key = info.pop("trackid") or "sha256:" + hashlib.sha256(data).hexdigest()
        target = archive / f"{key.replace(':', '_')}.gpx"
        shutil.copyfile(path, target)
        status = "pending_upload" if info["points"] else "skipped_no_gps"
        if store.add(person, key, "opentracks", status, file=str(target), **info):
            log.info("%s: %s %s (%s points, %s)", person, key, info["activity_type"], info["points"], status)
        store.mark_seen(path)


def upload_pending(cfg: Config, store: Store, client):
    excluded = store.exclusions()
    for row in store.rows("pending_upload"):
        person, key = row["person"], row["key"]
        if person not in cfg.keys or (person, key) in excluded:
            continue  # no API key yet, or removed by hand: stays pending until restored
        try:
            job_id = client.upload(person, Path(row["file"]).name, Path(row["file"]).read_bytes(), f"fitbridge-{key}")
        except UploadRejected as e:
            store.update(person, key, status="failed", error=str(e))
            log.error("%s: upload of %s rejected: %s", person, key, e)
            continue
        except (urllib.error.URLError, OSError, KeyError) as e:
            log.warning("%s: upload of %s failed, will retry: %s", person, key, e)
            continue
        store.update(person, key, status="job_pending", job_id=job_id)
        log.info("%s: uploaded %s as job %s", person, key, job_id)


def poll_jobs(cfg: Config, store: Store, client):
    for row in store.rows("job_pending"):
        person, key = row["person"], row["key"]
        try:
            job = client.job(person, row["job_id"])
        except (urllib.error.URLError, OSError, KeyError) as e:
            log.warning("%s: job %s poll failed: %s", person, row["job_id"], e)
            continue
        if job.get("status") in ("completed", "failed"):
            store.update(person, key, status=job["status"], error=job.get("error_code"),
                         endurain_ids=json.dumps(job.get("activity_ids")))
            log.info("%s: %s -> %s %s", person, key, job["status"], job.get("activity_ids") or job.get("error_code"))


def ingest_export(cfg: Config, store: Store, person: str, body: bytes):
    """Archive a raw export and record its workouts. Returns (total, new)."""
    inbox = cfg.data_dir / "archive" / person
    inbox.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%f")
    (inbox / f"export-{stamp}.body").write_bytes(body)
    workouts, gpx = parse_hex_export(body)
    for name, data in gpx.items():
        (inbox / "gpx").mkdir(exist_ok=True)
        if not (inbox / "gpx" / name).exists():  # same name = same route; never rewrite a file being uploaded
            (inbox / "gpx" / name).write_bytes(data)
    new = 0
    for w in workouts:
        key, route = w.pop("key"), Path(w.pop("route_file") or "").name
        status, linked = _route_status(w, gpx.get(route), inbox / "gpx" / route, key)
        if store.add(person, key, "health_exporter", status, **w, **linked):
            new += 1
            log.info("%s: %s %s %s (%s)", person, key, w["activity_type"], w["start"], status)
        elif linked and store.attach_route(person, key, status, **linked):
            log.info("%s: %s route attached (%s)", person, key, status)
    return len(workouts), new


def _route_status(w, gpx_data, path, key):
    """Status for an exported workout, plus file/points when its route GPX is in this export."""
    if w["activity_type"] not in ROUTE_TYPES:
        return "archived", {}
    if w["indoor"]:
        return "no_route", {}
    if gpx_data is None:
        return "awaiting_route", {}
    try:
        points = parse_gpx(gpx_data)["points"]
    except (ET.ParseError, ValueError, TypeError) as e:
        log.warning("unreadable route GPX for %s: %s", key, e)
        return "awaiting_route", {}
    return ("pending_upload" if points else "skipped_no_gps"), {"file": str(path), "points": points}


def make_handler(cfg: Config, store: Store):
    class Handler(BaseHTTPRequestHandler):
        def _reply(self, code, payload):
            data = json.dumps(payload).encode()
            self.send_response(code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def do_GET(self):
            if self.path.split("?")[0] == "/scores":
                return self._reply(200, LAST_SCORE or {"error": "not scored yet"})
            self._reply(200, {"ok": True, "workouts": store.counts()})

        def do_POST(self):  # any path: the sender, not the URL, decides whose export it is
            person = cfg.logins.get(self.headers.get("Tailscale-User-Login", "").lower())
            try:
                length = int(self.headers.get("Content-Length") or 0)
            except ValueError:  # unparseable: treated as no body (403, or 411 for a known sender)
                length = 0
            if not person:  # read the body first: closing with unread data sends a TCP RST instead of the 403
                self.rfile.read(max(0, min(length, MAX_DRAIN)))
                return self._reply(403, {"error": "unknown sender"})
            if not 0 < length <= MAX_BODY:
                return self._reply(413 if length else 411, {"error": "bad length"})
            body = self.rfile.read(length)
            try:
                total, new = ingest_export(cfg, store, person, body)
            except (ValueError, KeyError, zipfile.BadZipFile) as e:
                log.warning("%s: unreadable export: %s", person, e)
                return self._reply(400, {"error": "unreadable export"})
            self._reply(200, {"workouts": total, "new": new})

        def log_message(self, fmt, *args):
            log.debug(fmt, *args)

    return Handler


def worker(cfg, store, client, holder, og, mq):
    next_score = 0.0
    while True:
        try:
            scan_sync_folders(cfg, store)
            upload_pending(cfg, store, client)
            poll_jobs(cfg, store, client)
        except Exception:  # keep the loop alive; the error is in the journal
            log.exception("worker cycle failed")
        if time.monotonic() >= next_score:
            next_score = time.monotonic() + cfg.score_seconds
            try:
                score_cycle(cfg, store, holder, og, mq, datetime.now(timezone.utc))
            except mqtt.MqttError as e:
                log.warning("MQTT publish failed, badges stay unannounced: %s", _why(e))
            except Exception:
                log.exception("scoring cycle failed")
        time.sleep(cfg.scan_seconds)


def main():
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    cfg = Config.from_env()
    cfg.data_dir.mkdir(parents=True, exist_ok=True)
    store = Store(cfg.data_dir / "fitbridge.db")
    if not cfg.sync_dirs:
        log.warning("no SYNC_DIR_<ID> set: OpenTracks folder scan is off")
    for p in cfg.sync_dirs:
        if p not in cfg.keys:
            log.warning("no ENDURAIN_KEY_%s: uploads for %s stay pending", p.upper(), p)
    seed_opengym_token(cfg, store)
    og = mq = None
    if store.kv_get("opengym_token"):
        og = opengym.OpenGym(cfg.opengym_url, lambda: store.kv_get("opengym_token"),
                             lambda token: store.kv_set("opengym_token", token))
    else:
        log.warning("no OPENGYM_TOKEN: gym sessions come from the cache only")
    if cfg.mqtt["host"] and not cfg.mqtt["password"]:
        log.warning("MQTT off: MQTT_PASSWORD empty")
    elif cfg.mqtt["host"]:
        mq = mqtt.Mqtt(cfg.mqtt["host"], cfg.mqtt["port"], cfg.mqtt["user"], cfg.mqtt["password"])
    else:
        log.warning("no MQTT_HOST: no HA entities or manual entries; pauses from the cache only")
    threading.Thread(target=worker, args=(cfg, store, Endurain(cfg.endurain_url, cfg.keys),
                                          ConfigHolder(cfg.scoring_toml), og, mq), daemon=True).start()
    log.info("listening on 127.0.0.1:%d", cfg.port)
    ThreadingHTTPServer(("127.0.0.1", cfg.port), make_handler(cfg, store)).serve_forever()


if __name__ == "__main__":
    main()
