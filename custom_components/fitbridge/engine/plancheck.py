"""Plan check: the run/walk blocks of a run's GPX track, and the indoor fallback. Pure, no I/O."""
from bisect import bisect_left, bisect_right
from statistics import fmean

from .details import track
from .records import haversine_m

WINDOW_S = 10  # speed is the distance over this centred window; it shrinks at a segment's ends
MIN_BLOCK_S = 25  # a shorter run is not a block
MAX_DIP_S = 10  # a slower stretch shorter than this does not end a block (measured before the smoothing widened it)
BOUNDARY_KMH = (6.0, 8.0)  # the run/walk boundary is clamped to this
FALLBACK_KMH = 7.0  # the boundary when speeds form one cluster (a continuous run, or no running)
MOVING_KMH = 1.0
MIN_GAP_KMH = 1.5  # cluster means closer than this are one cluster
ITERATIONS = 20


def _speeds(seg, t0):
    """[(seconds from t0, km/h)] per point of one segment."""
    ts = [(p[0] - t0).total_seconds() for p in seg]
    cum = [0.0]
    for a, b in zip(seg, seg[1:]):
        cum.append(cum[-1] + haversine_m(a[1:3], b[1:3]))
    out = []
    for t in ts:
        j, k = bisect_left(ts, t - WINDOW_S / 2), bisect_right(ts, t + WINDOW_S / 2) - 1
        out.append((t, (cum[k] - cum[j]) / (ts[k] - ts[j]) * 3.6 if ts[k] > ts[j] else 0.0))
    return out


def _boundary(speeds):
    """Midpoint of a 1-D 2-means over the moving speeds, clamped; FALLBACK_KMH when they form one cluster."""
    moving = sorted(v for v in speeds if v > MOVING_KMH)
    if len(moving) < 2:
        return FALLBACK_KMH
    lo, hi = (moving[int(q * (len(moving) - 1))] for q in (0.2, 0.8))
    for _ in range(ITERATIONS):
        mid = (lo + hi) / 2
        a, b = [v for v in moving if v < mid], [v for v in moving if v >= mid]
        if not a or not b:
            return FALLBACK_KMH
        if (new := (fmean(a), fmean(b))) == (lo, hi):
            break
        lo, hi = new
    return FALLBACK_KMH if hi - lo < MIN_GAP_KMH else min(max((lo + hi) / 2, BOUNDARY_KMH[0]), BOUNDARY_KMH[1])


def blocks(gpx):
    """{"blocks": [[start_s, length_s, kmh], ...], "boundary_kmh"}: the runs of speed at or above the boundary
    (start_s from the first point), merged across dips under MAX_DIP_S, at least MIN_BLOCK_S long. Never across a
    pause. An unparseable file raises Unreadable (a ValueError)."""
    segs = track(gpx)
    if not segs:
        return {"blocks": [], "boundary_kmh": FALLBACK_KMH}
    per_seg = [_speeds(seg, segs[0][0][0]) for seg in segs]
    bound = _boundary([v for seg in per_seg for _, v in seg])
    runs = []  # [first t, last t, speeds]
    for seg in per_seg:
        cur = None
        for t, v in seg:
            if v < bound:
                continue
            if cur and t - cur[1] - 1 - WINDOW_S / 2 < MAX_DIP_S:  # the window stretches a short dip by half its width
                cur[1] = t
                cur[2].append(v)
            else:
                cur = [t, t, [v]]
                runs.append(cur)
    return {"blocks": [[round(a), round(b - a) + 1, round(fmean(vs), 2)] for a, b, vs in runs if b - a + 1 >= MIN_BLOCK_S],
            "boundary_kmh": bound}


def indoor(distance_m, duration_s):
    """A run with no usable track: {"indoor": True, "avg_kmh"} (None without a distance or duration)."""
    return {"indoor": True, "avg_kmh": distance_m / duration_s * 3.6 if distance_m is not None and duration_s > 0 else None}
