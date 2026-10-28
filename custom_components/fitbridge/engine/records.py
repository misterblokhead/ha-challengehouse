"""Personal-record maths: best gym sets, exercise names and muscle groups from openGym's bundle, fastest 1 km in a GPX. Pure, no I/O."""
import json
import math
import re
import xml.etree.ElementTree as ET
from datetime import datetime

from .scoring_config import finite

KM_MIN_S = 150  # a faster 1 km than this is a GPS glitch, not a run
GAP_S = 60  # a longer pause between points splits the track

_ENTRY = re.compile(r'{"id":"')  # where an entry object starts; its keys come in any order
GROUPS = ("Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Other")
_GROUP_OF = {"chest": "Chest", "back": "Back", "shoulders": "Shoulders", "neck": "Shoulders",
             "upper arms": "Arms", "lower arms": "Arms", "upper legs": "Legs", "lower legs": "Legs",
             "waist": "Core", "full body": "Core", "cardio": "Core"}


def haversine_m(a, b):
    lat1, lon1, lat2, lon2 = map(math.radians, (a[0], a[1], b[0], b[1]))
    h = math.sin((lat2 - lat1) / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin((lon2 - lon1) / 2) ** 2
    return 2 * 6371000 * math.asin(math.sqrt(h))


def _reps(s):
    """Reps of a counting set, else None. Sides: the lower side, both must be done."""
    w = s.get("w")
    if s.get("warmup") is True or s.get("phase") == "warmup" or not (finite(w) and w > 0):  # json.load accepts Infinity/NaN
        return None
    sides = s.get("sides")
    if isinstance(sides, dict):
        l, r = sides.get("L") or {}, sides.get("R") or {}
        reps = min(l.get("r") or 0, r.get("r") or 0) if l.get("done") is True and r.get("done") is True else 0
    else:
        reps = s.get("r") or 0 if s.get("done") is True else 0
    return int(reps) if reps >= 1 else None


def best_set(sets):
    """Heaviest counting set, then most reps: (weight, reps) or None."""
    counted = [(s["w"], r) for s in sets if (r := _reps(s)) is not None]
    return max(counted, default=None)


def session_lifts(entries):
    """{exercise id: {"w", "r"}} - each exercise's best set in one session."""
    out = {}
    for e in entries if isinstance(entries, list) else []:
        try:
            best = best_set(e.get("sets") or []) if isinstance(e.get("id"), str) and e["id"] else None
        except (AttributeError, TypeError, ValueError, OverflowError):  # one malformed entry must not drop the session
            continue
        if best:
            out[e["id"]] = {"w": best[0], "r": best[1]}
    return out


def exercise_catalog(js):
    """{id: {"name", "bp"}} from openGym's exercises bundle; name's first letter capitalised, bp "" when absent."""
    out = {}
    for m in _ENTRY.finditer(js):
        try:
            obj, _ = json.JSONDecoder().raw_decode(js, m.start())  # exactly this entry, whatever follows it
        except ValueError:
            continue
        name, bp = obj.get("n"), obj.get("bp")
        if isinstance(name, str) and name:
            out[obj["id"]] = {"name": name[:1].upper() + name[1:], "bp": bp if isinstance(bp, str) else ""}
    return out


def muscle_group(bp):
    return _GROUP_OF.get(bp, "Other")


def _stretches(gpx):
    """Lists of (lat, lon, datetime) per <trkseg>, split again at gaps over GAP_S."""
    out = []
    for seg in ET.fromstring(gpx).iter():
        if seg.tag.rpartition("}")[2] != "trkseg":
            continue
        run = []
        for pt in seg:
            if pt.tag.rpartition("}")[2] != "trkpt":
                continue
            t = next((c.text for c in pt if c.tag.rpartition("}")[2] == "time"), None)
            try:
                p = (float(pt.get("lat")), float(pt.get("lon")), datetime.fromisoformat(t.strip()))
            except (TypeError, ValueError, AttributeError):
                continue
            if run and (p[2] - run[-1][2]).total_seconds() > GAP_S:
                out.append(run)
                run = []
            run.append(p)
        out.append(run)
    return out


def _fastest_in(pts):
    cum = [0.0]
    for a, b in zip(pts, pts[1:]):
        cum.append(cum[-1] + haversine_m(a, b))
    t = [(p[2] - pts[0][2]).total_seconds() for p in pts]
    best, j = None, 0
    for i in range(len(pts)):
        if cum[i] < 1000:
            continue
        while cum[i] - cum[j + 1] >= 1000:  # cum[j + 1] <= cum[i] - 1000 never holds past i
            j += 1
        start = t[j] + (t[j + 1] - t[j]) * (cum[i] - 1000 - cum[j]) / (cum[j + 1] - cum[j])
        if (w := t[i] - start) >= KM_MIN_S and (best is None or w < best):
            best = w
    return best


def fastest_1k_s(gpx):
    """Fastest 1 km in whole seconds, never across a segment or a gap; None if there is none."""
    try:
        times = [w for run in _stretches(gpx) if (w := _fastest_in(run)) is not None]
    except ET.ParseError:
        return None
    return round(min(times)) if times else None


def record_changes(pbs, stored, loud, holders, recent_keys):
    """(events, updates, held) of a scoring's records against the stored values {record id: value}.

    updates: every current id whose value differs from stored. held: every current (record id, workout key) pair.
    events (one per workout key, in pbs order: lifts newest first, then the run): only a better value of a stored id,
    in a workout of recent_keys that never held that id before (holders), and never on a person's first pass (not loud)."""
    current = [(f"lift:{x['id']}", x["w"] * 1000 + x["r"], x["key"], x) for x in pbs["lifts"]]
    if run := pbs["fastest_1k"]:
        current.append(("run:1k", run["seconds"], run["key"], run))
    events = {}
    for rid, value, key, item in current:
        if not loud or rid not in stored or key not in recent_keys or (rid, key) in holders:
            continue
        if (value < stored[rid]) if rid == "run:1k" else (value > stored[rid]):  # a run is better when faster
            e = events.setdefault(key, {"key": key, "lifts": [], "fastest_1k": None})
            if rid == "run:1k":
                e["fastest_1k"] = value
            else:
                e["lifts"].append({k: item[k] for k in ("name", "w", "r", "unit")})
    return (list(events.values()), {rid: v for rid, v, _, _ in current if stored.get(rid) != v},
            {(rid, key) for rid, _, key, _ in current})
