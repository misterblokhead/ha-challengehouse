"""Workouts in: OpenTracks GPX files (a webhook body or a watched folder) and Health Exporter & Shortcuts ZIP/JSON
exports, archived raw under archive/<person>/ and stored once; plus the stored rows as scorer workouts."""
import hashlib
import io
import json
import logging
import xml.etree.ElementTree as ET
import zipfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

from . import records
from .scoring_config import HOME_TYPES, KINDS

log = logging.getLogger("fitbridge")

MAX_BODY = 200 * 1024 * 1024
GPX_NS = "{http://www.topografix.com/GPX/1/1}"
HK = "HKQuantityTypeIdentifier"
ROUTE_TYPES = {"running", "walking", "hiking"}  # HealthKit activityType names that carry a route


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


def detect(body: bytes):
    """Which path a webhook body takes: "hex" (Health Exporter ZIP or bare JSON export), "gpx" (a GPX file) or None."""
    if zipfile.is_zipfile(io.BytesIO(body)):
        return "hex"
    head = body[:4096].lstrip()
    if head.startswith(b"{"):
        return "hex"
    if head.startswith(b"<") and b"<gpx" in head:
        return "gpx"
    return None


# ---------- workouts in ----------

def ingest_gpx(store, archive: Path, person: str, data: bytes) -> bool:
    """One OpenTracks GPX, archived under its trackid (or content hash) and stored once; True when it is new.
    Raises the parse error for a file that cannot be read."""
    info = parse_gpx(data)
    key = info.pop("trackid") or "sha256:" + hashlib.sha256(data).hexdigest()
    (archive / person).mkdir(parents=True, exist_ok=True)
    target = archive / person / f"{key.replace(':', '_')}.gpx"
    target.write_bytes(data)
    status = "stored" if info["points"] else "skipped_no_gps"
    if store.add(person, key, "opentracks", status, file=str(target), **info):
        log.info("%s: %s %s (%s points, %s)", person, key, info["activity_type"], info["points"], status)
        return True
    return False


def scan_folder(store, archive: Path, person: str, folder: Path):
    for path in sorted(folder.glob("*.gpx")):
        if store.file_seen(path):
            continue
        data = path.read_bytes()
        try:
            ingest_gpx(store, archive, person, data)
        except (ET.ParseError, ValueError, TypeError) as e:
            # shortcut: a half-synced file parses badly; it is retried when mtime/size change
            log.warning("unreadable GPX %s: %s", path.name, e)
            continue
        store.mark_seen(path)


def ingest_export(store, archive: Path, person: str, body: bytes):
    """Archive a raw export under archive/<person>/ and record its workouts. Returns (total, new)."""
    inbox = archive / person
    inbox.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%f")
    (inbox / f"export-{stamp}.body").write_bytes(body)
    workouts, gpx = parse_hex_export(body)
    for name, data in gpx.items():
        (inbox / "gpx").mkdir(exist_ok=True)
        if not (inbox / "gpx" / name).exists():  # same name = same route; never rewrite a stored one
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
    return ("stored" if points else "skipped_no_gps"), {"file": str(path), "points": points}


# ---------- scoring input ----------

KIND_NAMES = {"run": "Run", "walk": "Walk", "gym": "Gym session", "home": "Home workout"}


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


def aware(text):
    try:
        dt = datetime.fromisoformat(text)
    except (TypeError, ValueError):
        return None
    return dt if dt.tzinfo else None


def db_workouts(store, people):
    """All stored workouts as scorer dicts, per person. Rows we cannot place in time are skipped."""
    out = {p: [] for p in people}
    excluded, best_km = store.exclusions(), store.best_km()
    for r in store.all_rows():
        kind = classify(r["source"], r["activity_type"], r["points"])
        start = aware(r["start"])
        if r["person"] not in out or not kind or not start:
            continue
        end = aware(r["end"])
        dur = r["duration_s"] if r["duration_s"] is not None else ((end - start).total_seconds() if end else None)
        if dur is None or dur <= 0:
            continue
        end = end or start + timedelta(seconds=dur)
        out[r["person"]].append({
            "person": r["person"], "key": r["key"], "source": r["source"], "kind": kind,
            "indoor": bool(r["indoor"]), "start": start, "end": end, "duration_s": float(dur),
            "distance_m": r["distance_m"], "avg_hr": r["avg_hr"], "vol_kg": 0.0, "prs": [],
            "name": KIND_NAMES[kind], "best_1k_s": best_km.get((r["person"], r["key"])), "lifts": {}, "unit": "kg",
            "url": None,  # no links since Endurain went
            "excluded": (r["person"], r["key"]) in excluded,
        })
    return out
