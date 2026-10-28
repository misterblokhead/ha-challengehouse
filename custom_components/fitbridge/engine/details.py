"""What a workout's details pop-up shows: route, graphs, km splits, heart-rate zones, climb (from an archived GPX) and
a gym session's sets. Pure, no I/O; everything it returns is bounded for the page."""
import math
import xml.etree.ElementTree as ET
from bisect import bisect_left, bisect_right
from datetime import datetime

from .ingest import Unreadable
from .records import GAP_S, haversine_m
from .scoring_config import finite

ROUTE_POINTS = 300  # all polylines together
SERIES_ROWS = 200
PACE_WINDOW_S = 30  # the pace graph averages this far back
MOVING_MS = 0.3  # slower than this over the window is standing still: no pace
HYSTERESIS_M = 2  # a climb or descent counts once it is this large, so GPS noise adds no gain
TAIL_M = 10  # a last partial split shorter than this is not shown


def downsample(rows, n=SERIES_ROWS):
    """At most n rows, evenly spread by index, first and last kept."""
    return rows if len(rows) <= n else [rows[round(i * (len(rows) - 1) / (n - 1))] for i in range(n)]


def _local(el):
    return el.tag.rpartition("}")[2]


def track(gpx):
    """[[(time, lat, lon, ele | None, hr | None), ...], ...]: one list per <trkseg>, split again at gaps over GAP_S.
    Points without a readable position or time are skipped; an unparseable file raises Unreadable (a ValueError)."""
    try:
        root = ET.fromstring(gpx)
    except ET.ParseError as e:
        raise Unreadable(type(e).__name__) from None
    out = []
    for seg in root.iter():
        if _local(seg) != "trkseg":
            continue
        run = []
        for pt in seg:
            if _local(pt) != "trkpt":
                continue
            text = {_local(c): c.text for c in pt.iter() if c.text}
            try:
                p = (datetime.fromisoformat(text["time"].strip()), float(pt.get("lat")), float(pt.get("lon")),
                     _num(text.get("ele")), _num(text.get("hr")))
            except (KeyError, TypeError, ValueError):
                continue
            if run and (p[0] - run[-1][0]).total_seconds() > GAP_S:
                out.append(run)
                run = []
            run.append(p)
        if run:
            out.append(run)
    return out


def _num(text):
    try:
        v = float(text)
    except (TypeError, ValueError):
        return None
    return v if finite(v) else None


def _dist_to_chord(p, a, b):
    dx, dy = b[0] - a[0], b[1] - a[1]
    n = dx * dx + dy * dy
    if n == 0:  # a closed loop: the chord is a point
        return math.hypot(p[0] - a[0], p[1] - a[1])
    return abs(dx * (a[1] - p[1]) - dy * (a[0] - p[0])) / math.sqrt(n)


def _rdp(points, tol_m):
    """Ramer-Douglas-Peucker on (lat, lon, ...) points as [lat, lon] at 5 decimals (~1 m); iterative, so a long
    track cannot hit the recursion limit."""
    if len(points) <= 2:
        return [[round(p[0], 5), round(p[1], 5)] for p in points]
    lat0, lon0 = points[0][:2]
    kx = 111_320 * math.cos(math.radians(lat0))
    xy = [((p[1] - lon0) * kx, (p[0] - lat0) * 110_540) for p in points]
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    todo = [(0, len(points) - 1)]
    while todo:
        i, j = todo.pop()
        far, k = max(((_dist_to_chord(xy[m], xy[i], xy[j]), m) for m in range(i + 1, j)), default=(0.0, i))
        if far > tol_m:
            keep[k] = True
            todo += [(i, k), (k, j)]
    return [[round(p[0], 5), round(p[1], 5)] for p, kept in zip(points, keep) if kept]


def _fit(chunks, tol_m, cap):
    """Each chunk simplified with one tolerance, raised until all together are at most cap points."""
    while True:
        out = [_rdp(c, tol_m) for c in chunks]
        if sum(map(len, out)) <= cap:
            return out
        if tol_m > 1e6:  # only endpoints are left: shortcut, drop segments beyond what cap holds
            return out[:cap // 2]
        tol_m *= 1.5


def simplify(points, tol_m=5.0, cap=ROUTE_POINTS):
    """[[lat, lon], ...] of at most cap points: Ramer-Douglas-Peucker, tolerance raised until it fits."""
    return _fit([points], tol_m, cap)[0]


def _gain(eles):
    """Metres climbed, a rise or fall counting only once it reaches HYSTERESIS_M; None without any elevation."""
    eles = [e for e in eles if e is not None]
    if not eles:
        return None
    gain, low, high, up = 0.0, eles[0], eles[0], False
    for e in eles[1:]:
        if up:
            if e > high:
                gain, high = gain + e - high, e
            elif high - e >= HYSTERESIS_M:
                up, low = False, e
        elif e < low:
            low = e
        elif e - low >= HYSTERESIS_M:
            gain, high, up = gain + e - low, e, True
    return gain


def _splits(D, T, hr, ele):
    """Per km (and the partial rest): time by interpolating moving time T at each cumulative distance D."""
    def at(x):
        i = bisect_left(D, x)
        if i == 0 or i == len(D):
            return T[min(i, len(D) - 1)]
        return T[i - 1] + (T[i] - T[i - 1]) * (x - D[i - 1]) / (D[i] - D[i - 1])  # D[i - 1] < x <= D[i]

    edges = [1000.0 * k for k in range(1, int(D[-1] // 1000) + 1)]
    if D[-1] - (edges[-1] if edges else 0) >= TAIL_M:
        edges.append(D[-1])
    out, a = [], 0.0
    for b in edges:
        lo, hi = bisect_left(D, a), bisect_right(D, b)
        s, hrs = at(b) - at(a), [h for h in hr[lo:hi] if h is not None]
        climb = _gain(ele[max(lo - 1, 0):hi])
        out.append({"km": round((b - a) / 1000, 2), "s": round(s, 1), "pace": round(s / ((b - a) / 1000)),
                    "hr": round(sum(hrs) / len(hrs)) if hrs else None,
                    "climb": None if climb is None else round(climb, 1)})
        a = b
    return out


def _zones(segs, max_hr):
    """Seconds per 10 % band of max_hr, 50 % up (Z1..Z5, above 100 % counts in Z5); None without hr or max_hr."""
    if not max_hr or not any(p[4] is not None for seg in segs for p in seg):
        return None
    z = [0.0] * 5
    for seg in segs:
        for a, b in zip(seg, seg[1:]):
            if b[4] is not None and (band := int(b[4] * 10 // max_hr) - 5) >= 0:
                z[min(band, 4)] += (b[0] - a[0]).total_seconds()
    return [round(x, 1) for x in z]


def route_details(gpx, max_hr):
    """{"route": [polyline per segment], "series": t (s), dist (m), pace (s/km), hr, ele as equal-length lists,
    "splits", "zones", "gain_m", "max_hr"}. A pause never joins two segments: no line, no split time, no pace
    across it (the first row after one has no pace)."""
    segs = track(gpx)
    pts = [p for seg in segs for p in seg]
    D, T, starts, wall, pace = [], [], [], [], []
    d = s = 0.0
    for seg in segs:
        starts.append(len(D))
        j = 0
        for i, p in enumerate(seg):
            if i:
                d += haversine_m(seg[i - 1][1:3], p[1:3])
                s += (p[0] - seg[i - 1][0]).total_seconds()
                while (p[0] - seg[j][0]).total_seconds() > PACE_WINDOW_S and j < i - 1:
                    j += 1
                dt, dd = (p[0] - seg[j][0]).total_seconds(), d - D[starts[-1] + j]
                pace.append(round(dt / dd * 1000) if dt > 0 and dd / dt >= MOVING_MS else None)
            else:
                pace.append(None)
            D.append(d)
            T.append(s)
            wall.append((p[0] - pts[0][0]).total_seconds())
    hr, ele = [p[4] for p in pts], [p[3] for p in pts]
    keep = set(downsample(list(range(len(pts)))))
    firsts = set(starts[1:])  # keep the rows after a pause, or the graph would draw a line across it
    for i in firsts - keep:
        if free := keep - firsts - {0, len(pts) - 1}:
            keep.remove(min(free, key=lambda k: abs(k - i)))
            keep.add(i)
    rows = sorted(keep)
    gain = _gain(ele)
    return {
        "route": _fit([[p[1:3] for p in seg] for seg in segs if len(seg) > 1], 5.0, ROUTE_POINTS),
        "series": {"t": [round(wall[i]) for i in rows], "dist": [round(D[i]) for i in rows],
                   "pace": [pace[i] for i in rows], "hr": [hr[i] for i in rows],
                   "ele": [None if ele[i] is None else round(ele[i], 1) for i in rows]},
        "splits": _splits(D, T, hr, ele) if pts else [],
        "zones": _zones(segs, max_hr),
        "gain_m": None if gain is None else round(gain, 1),
        "max_hr": max_hr,
    }


def gym_summary(workout, catalog, records):
    """A gym workout's best set per exercise, named from the exercise catalogue; record: that set is a personal
    record held by this workout (records: the person's lift records, each with the id and key of its workout)."""
    held = {r["id"] for r in records if r["key"] == workout["key"]}
    return {"exercises": [{"name": ((catalog or {}).get(ex) or {}).get("name") or f"Exercise {ex}", "w": s["w"], "r": s["r"],
                           "unit": workout.get("unit") or "kg", "record": ex in held}
                          for ex, s in (workout.get("lifts") or {}).items()],
            "vol_kg": workout["vol_kg"]}
