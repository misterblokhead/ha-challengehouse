"""Tests for plan-check run-block detection (synthetic data only)."""
import math
from datetime import datetime, timedelta, timezone

import pytest

from custom_components.fitbridge.engine.plancheck import blocks, check, indoor

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


W1_DAY = {"intervals": [("run", 60), ("walk", 90)] * 8}


def det(*lengths):
    """A blocks() result with one block per length, 150 s apart."""
    return {"blocks": [[i * 150, n, 8.0] for i, n in enumerate(lengths)], "boundary_kmh": 7.0}


def state(b, session=W1_DAY):
    return check(b, session)


def test_match_w1():
    assert state(det(*[60] * 8)) == {"state": "match", "found": 8, "planned": 8, "run_s": 480, "planned_run_s": 480}


def test_match_tolerates_two_missing():
    assert state(det(*[60] * 6))["state"] == "match"


def test_review_five_of_eight():
    assert state(det(*[60] * 5))["state"] == "review"


def test_review_short_blocks():
    r = state(det(*[25] * 8))
    assert (r["state"], r["found"]) == ("review", 0)


def test_review_run_time():
    r = state(det(*[35] * 6))
    assert (r["state"], r["found"], r["run_s"]) == ("review", 6, 210)


def test_extra_blocks_ok():
    r = state(det(*[60] * 8, 30))
    assert (r["state"], r["found"], r["run_s"]) == ("match", 8, 510)


def test_w5_single_block():
    w5 = {"intervals": [("run", 1200)]}
    assert state(det(900), w5)["state"] == "match"
    assert state(det(500), w5)["state"] == "review"


def test_indoor_pass_and_fail():
    assert state(indoor(6000, 3600))["state"] == "indoor"
    assert state(indoor(2490, 3600))["state"] == "review"
    assert state(indoor(None, 3600))["state"] == "review"


def test_error_none():
    assert state({"error": True})["state"] == "none"
    assert state(None)["state"] == "none"
