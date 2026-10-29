"""Workouts in: OpenTracks GPX files (a webhook body or a watched folder) and Health Exporter & Shortcuts ZIP/JSON
exports, archived raw under archive/<person>/ and stored once; plus the stored rows as scorer workouts."""
import hashlib
import io
import json
import logging
import re
import xml.etree.ElementTree as ET
import zipfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

from . import records
from .scoring_config import KINDS, finite

log = logging.getLogger(__name__)

MAX_UNZIPPED = 32 * 1024 * 1024  # read into HA's memory from an internet-facing webhook
GPX_NS = "{http://www.topografix.com/GPX/1/1}"
HK = "HKQuantityTypeIdentifier"
ROUTE_TYPES = {"running", "walking", "hiking", "cycling"}  # HealthKit activityType names that carry a route
BOM = b"\xef\xbb\xbf"


class Unreadable(ValueError):
    """A body that is no Health Exporter export or GPX file; its message is the parse error's class name only."""


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
    factor = {"m": 1, "km": 1000, "mi": 1609.344}.get(unit.lower() if isinstance(unit, str) else "")
    return value * factor if value is not None and factor else None


def _number(v):
    """v when it is a real number, else None: a number of the wrong type is dropped, never stored or scored."""
    return v if finite(v) else None


def _text(w, key):
    """w[key] when it is text or missing; anything else makes the export unusable (a 400, nothing stored)."""
    v = w.get(key)
    if v is not None and not isinstance(v, str):
        raise ValueError(f"{key} is not text")
    return v


def map_hex_workout(w: dict) -> dict:
    stats = w.get("statistics") or {}

    def stat(name, key):
        return _number((stats.get(HK + name) or {}).get(key))

    dist = stats.get(HK + "DistanceWalkingRunning") or {}
    return {
        "key": _text(w, "uuid"),
        "activity_type": _text(w, "activityType"),
        "start": _text(w, "startDate"), "end": _text(w, "endDate"),
        "duration_s": _number(w.get("duration")),
        "distance_m": _distance_m(_number(dist.get("sum")), dist.get("unit")),
        "kcal": stat("ActiveEnergyBurned", "sum"),
        "avg_hr": stat("HeartRate", "average"), "max_hr": stat("HeartRate", "max"),
        "indoor": w.get("indoor") if isinstance(w.get("indoor"), bool) else None,
        "route_file": _text(w, "routeFile"),
    }


def parse_hex_export(body: bytes):
    """Workouts + raw GPX entries from a Health Exporter ZIP (or bare JSON) export."""
    docs, gpx = [], {}
    if zipfile.is_zipfile(io.BytesIO(body)):
        with zipfile.ZipFile(io.BytesIO(body)) as z:
            wanted = [i for i in z.infolist() if i.filename.endswith((".json", ".gpx"))]
            if sum(i.file_size for i in wanted) > MAX_UNZIPPED:
                raise ValueError("zip expands too large")
            budget = MAX_UNZIPPED
            for info in wanted:
                # z.read() decompresses up to 2 GB before cutting to the declared file_size: read at most the budget
                with z.open(info) as f:
                    data = f.read(budget + 1)
                if (budget := budget - len(data)) < 0:
                    raise ValueError("zip expands too large")
                if info.filename.endswith(".json"):
                    docs.append(json.loads(data))
                else:
                    gpx[Path(info.filename).name] = data
    else:
        docs.append(json.loads(body))
    if not docs or not all(isinstance(d, dict) and isinstance(d.get("workouts"), list)
                           and all(isinstance(w, dict) for w in d["workouts"]) for d in docs):
        raise ValueError("not a Health Exporter export")
    workouts = [map_hex_workout(w) for d in docs for w in d["workouts"] if w.get("uuid")]
    return workouts, gpx


def detect(body: bytes):
    """Which path a webhook body takes: "hex" (Health Exporter ZIP or bare JSON export), "gpx" (a GPX file) or None."""
    if zipfile.is_zipfile(io.BytesIO(body)):
        return "hex"
    head = body[:4096].removeprefix(BOM).lstrip()
    if head.startswith(b"{"):
        return "hex"
    if head.startswith(b"<") and b"<gpx" in head:
        return "gpx"
    return None


# ---------- workouts in ----------

def _parsed(parse, data):
    """parse(data), or Unreadable naming only the error's class: nothing is written for a body that cannot be read."""
    try:
        return parse(data)
    except Exception as e:
        raise Unreadable(type(e).__name__) from e


def ingest_body(store, archive: Path, person: str, body: bytes) -> dict:
    """A webhook body by its kind: {"workouts": total, "new": new} for an export, {"new": bool} for a GPX file.
    Raises Unreadable for anything else."""
    kind = detect(body)
    if kind == "hex":
        total, new = ingest_export(store, archive, person, body)
        return {"workouts": total, "new": new}
    if kind == "gpx":
        return {"new": ingest_gpx(store, archive, person, body)}
    raise Unreadable("unknown body")


def ingest_gpx(store, archive: Path, person: str, data: bytes) -> bool:
    """One OpenTracks GPX, keyed by its trackid (or content hash), archived and stored once; True when it is new.
    Raises Unreadable for a file that cannot be read."""
    info = _parsed(parse_gpx, data)
    key = info.pop("trackid") or "sha256:" + hashlib.sha256(data).hexdigest()
    if store.has(person, key):
        return False
    # the trackid comes from the phone: hashed, it can never name a path outside the archive
    target = archive / person / f"{hashlib.sha256(key.encode()).hexdigest()}.gpx"
    target.parent.mkdir(parents=True, exist_ok=True)
    if not target.exists():
        target.write_bytes(data)
    status = "stored" if info["points"] else "skipped_no_gps"
    if store.add(person, key, "opentracks", status, file=str(target), **info):
        log.info("%s: %s %s (%s points, %s)", person, key, info["activity_type"], info["points"], status)
        return True
    return False


def scan_folder(store, archive: Path, person: str, folder: Path) -> bool:
    """Stores each new or changed GPX file in folder; True when it stored one (a new workout or not)."""
    stored = False
    for path in sorted(folder.glob("*.gpx")):
        if store.file_seen(path):
            continue
        data = path.read_bytes()
        try:
            ingest_gpx(store, archive, person, data)
        except (ET.ParseError, ValueError, TypeError) as e:
            # shortcut: a half-synced file parses badly; it is retried when mtime/size change
            log.warning("unreadable GPX %s: %s", path.name, type(e.__cause__ or e).__name__)  # Unreadable: its cause
            continue
        store.mark_seen(path)
        stored = True
    return stored


def ingest_export(store, archive: Path, person: str, body: bytes):
    """Record an export's workouts, and archive the raw export under archive/<person>/ when it brought a new workout or
    route. Returns (total, new). Raises Unreadable, before anything is written, for a body that is no usable export."""
    workouts, gpx = _parsed(parse_hex_export, body)
    inbox = archive / person
    inbox.mkdir(parents=True, exist_ok=True)
    for name, data in gpx.items():
        (inbox / "gpx").mkdir(exist_ok=True)
        if not (inbox / "gpx" / name).exists():  # same name = same route; never rewrite a stored one
            (inbox / "gpx" / name).write_bytes(data)
    new = attached = 0
    for w in workouts:
        key, route = w.pop("key"), Path(w.pop("route_file") or "").name
        status, linked = _route_status(w, gpx.get(route), inbox / "gpx" / route, key)
        if store.add(person, key, "health_exporter", status, **w, **linked):
            new += 1
            log.info("%s: %s %s %s (%s)", person, key, w["activity_type"], w["start"], status)
        elif linked and store.attach_route(person, key, status, **linked):
            attached += 1
            log.info("%s: %s route attached (%s)", person, key, status)
    if new or attached:  # an exact repeat (a phone retry) is not kept again
        stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%S%f")
        (inbox / f"export-{stamp}.body").write_bytes(body)
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
        log.warning("unreadable route GPX for %s: %s", key, type(e).__name__)
        return "awaiting_route", {}
    return ("stored" if points else "skipped_no_gps"), {"file": str(path), "points": points}


# ---------- scoring input ----------

MANUAL_NAMES = {"run": "Run", "walk": "Walk", "gym": "Gym session", "home": "Home workout"}


def type_name(activity_type) -> str:
    """An uncounted type as words with a capital: HealthKit's "americanFootball" -> "American football"."""
    words = re.sub(r"(?<=[a-z])([A-Z])", lambda m: " " + m[1].lower(), str(activity_type or "Unknown"))
    return words[:1].upper() + words[1:]


def classify(source, activity_type, points, types):
    """{"kind", "name", "min_min", "effort"} of a workout from the type table (config["types"]), or None when its
    type does not count. A manual entry names its own kind. min_min None: the kind's rules.min_<kind>_min decides.
    An OpenTracks run without GPS points counts nothing either: kind None, reason "no_gps"."""
    t = str(activity_type or "").lower()
    if source == "manual":
        return {"kind": t, "name": MANUAL_NAMES[t], "min_min": None, "effort": False} if t in KINDS else None
    for e in types.get(source, ()):
        if (t == e["match"]) if source == "health_exporter" else (e["match"] in t):  # opentracks: first substring hit wins
            if e["kind"] == "run" and source == "opentracks" and not points:
                return {"kind": None, "name": e["name"], "min_min": None, "effort": False, "reason": "no_gps"}
            return {"kind": e["kind"], "name": e["name"], "min_min": e.get("min_min"), "effort": e["effort"]}
    return None


def is_run(row, types):
    c = classify(row["source"], row["activity_type"], row["points"], types)
    return c is not None and c["kind"] == "run"


def aware(text):
    try:
        dt = datetime.fromisoformat(text)
    except (TypeError, ValueError):
        return None
    return dt if dt.tzinfo else None


def db_workouts(store, people, types):
    """All stored workouts as scorer dicts: (counted, uncounted), each {person: [workout]}. An uncounted one has kind None
    and a reason: "type" when the table does not know its type (name = its type), or "no_gps" (classify). Rows we cannot place in time are skipped; a number stored as
    text (rows from before map_hex_workout checked them) counts as missing."""
    out, uncounted = {p: [] for p in people}, {p: [] for p in people}
    excluded, best_km = store.exclusions(), store.best_km()
    for r in store.all_rows():
        c = classify(r["source"], r["activity_type"], r["points"], types)
        start = aware(r["start"])
        if r["person"] not in out or not start:
            continue
        end = aware(r["end"])
        dur = _number(r["duration_s"])
        dur = dur if dur is not None else ((end - start).total_seconds() if end else None)
        if dur is None or dur <= 0:
            continue
        end = end or start + timedelta(seconds=dur)
        c = c or {"kind": None, "name": type_name(r["activity_type"]), "min_min": None, "effort": False, "reason": "type"}
        (out if c["kind"] else uncounted)[r["person"]].append({
            "person": r["person"], "key": r["key"], "source": r["source"], "kind": c["kind"],
            "indoor": bool(r["indoor"]), "start": start, "end": end, "duration_s": float(dur),
            "distance_m": _number(r["distance_m"]), "avg_hr": _number(r["avg_hr"]), "vol_kg": 0.0, "prs": [],
            "max_hr": _number(r["max_hr"]), "kcal": _number(r["kcal"]), "min_min": c["min_min"], "effort": c["effort"],
            "name": c["name"], "best_1k_s": best_km.get((r["person"], r["key"])), "lifts": {}, "unit": "kg",
            "url": None,  # no links since Endurain went
            "excluded": (r["person"], r["key"]) in excluded, "reason": c.get("reason"),
        })
    return out, uncounted
