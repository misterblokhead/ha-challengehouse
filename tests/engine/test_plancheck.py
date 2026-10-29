"""Tests for plan-check run-block detection (synthetic data only)."""
import math
from datetime import datetime, timedelta, timezone

import pytest

from custom_components.fitbridge.engine.plancheck import blocks, indoor

T0 = datetime(2000, 1, 1, tzinfo=timezone.utc)


def synth(profile, start_lat=0.0):
    """GPX bytes from [(seconds, km/h), ...]: one point per second, walking north from (start_lat, 0).
    (seconds, None) is a pause of that many seconds and starts a new segment."""
    t, lat = 0, start_lat
    segs = [[(t, lat)]]
    for sec, kmh in profile:
        if kmh is None:
            t += sec
            segs.append([(t, lat)])
            continue
        for _ in range(sec):
            t += 1
            lat += math.degrees(kmh / 3.6 / 6371000)
            segs[-1].append((t, lat))
    body = "".join(
        "<trkseg>" + "".join(
            f'<trkpt lat="{lat:.9f}" lon="0"><time>{(T0 + timedelta(seconds=t)).strftime("%Y-%m-%dT%H:%M:%SZ")}</time></trkpt>'
            for t, lat in seg) + "</trkseg>" for seg in segs)
    return f'<gpx xmlns="http://www.topografix.com/GPX/1/1"><trk>{body}</trk></gpx>'.encode()


W1 = [(300, 5.5)] + 8 * [(60, 8.3), (90, 5.5)] + [(300, 5)]


def test_w1_eight_blocks():
    r = blocks(synth(W1))
    assert len(r["blocks"]) == 8
    assert all(55 <= length <= 65 for _, length, _ in r["blocks"])
    assert 6 <= r["boundary_kmh"] <= 8


def test_pause_never_joined():
    assert len(blocks(synth([(30, 8.3), (5, None), (30, 8.3)]))["blocks"]) == 2


def test_short_dip_kept():
    (b,) = blocks(synth([(40, 8.3), (6, 5), (40, 8.3)]))["blocks"]
    assert b[1] == pytest.approx(86, abs=2)


def test_end_sprint_extra_block():
    r = blocks(synth(W1 + [(120, 10)]))
    assert len(r["blocks"]) == 9
    assert r["blocks"][-1][2] > 9.5


def test_continuous_run_fallback():
    r = blocks(synth([(1200, 8.0)]))
    assert len(r["blocks"]) == 1 and r["blocks"][0][1] >= 1190
    assert r["boundary_kmh"] == 7.0


def test_jog_during_walk():
    assert len(blocks(synth(8 * [(60, 9.0), (90, 6.6)]))["blocks"]) == 8


def test_bike_as_run():
    assert blocks(synth([(1500, 2.5)]))["blocks"] == []


def test_unreadable():
    with pytest.raises(ValueError):
        blocks(b"<gpx")


def test_indoor():
    assert indoor(540, 780) == {"indoor": True, "avg_kmh": pytest.approx(2.49, abs=0.01)}
    assert indoor(None, 780)["avg_kmh"] is None
