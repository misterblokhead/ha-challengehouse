"""Tests for the workout-details engine (synthetic loop around 0, 0 only)."""
import math
import unittest

from custom_components.fitbridge.engine.details import gym_summary, route_details, simplify, track

R = 6371000  # metres, the radius haversine_m uses


def loop(n=321, length_m=3200.0, step_s=3, ele=None, hr=None):
    """(seconds, lat, lon, ele, hr) points once round a circle of length_m around 0, 0; the last meets the first."""
    r = length_m / (2 * math.pi)
    out = []
    for i in range(n):
        a = 2 * math.pi * i / (n - 1)
        out.append((i * step_s, math.degrees(r * math.sin(a) / R), math.degrees(r * math.cos(a) / R),
                    ele(i) if ele else None, hr(i) if hr else None))
    return out


def gpx(pts, gap_after=None, gap_s=300):
    """GPX 1.1 bytes (OpenTracks-style hr extension) of pts; gap_after: index after which gap_s seconds pass."""
    body = []
    for i, (t, lat, lon, ele, hr) in enumerate(pts):
        t += gap_s if gap_after is not None and i > gap_after else 0
        hh, rem = divmod(t, 3600)
        mm, ss = divmod(rem, 60)
        body.append(f'<trkpt lat="{lat:.7f}" lon="{lon:.7f}">'
                    + (f"<ele>{ele}</ele>" if ele is not None else "")
                    + f"<time>2026-01-01T{hh:02d}:{mm:02d}:{ss:02d}Z</time>"
                    + (f"<extensions><gpxtpx:TrackPointExtension><gpxtpx:hr>{hr}</gpxtpx:hr></gpxtpx:TrackPointExtension></extensions>"
                       if hr is not None else "") + "</trkpt>")
    return ('<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1" '
            'version="1.1"><trk><trkseg>' + "".join(body) + "</trkseg></trk></gpx>").encode()


class RouteTests(unittest.TestCase):
    def test_bounds(self):
        d = route_details(gpx(loop()), None)
        self.assertLessEqual(sum(map(len, d["route"])), 300)
        self.assertEqual(len(d["series"]["t"]), 200)
        for col in d["series"].values():
            self.assertEqual(len(col), 200)

    def test_simplify_raises_tolerance_until_cap(self):
        pts = [p[1:3] for p in loop()]
        self.assertGreater(len(simplify(pts, 5.0, cap=300)), 10)
        self.assertLessEqual(len(simplify(pts, 5.0, cap=10)), 10)
        self.assertEqual(len(simplify(pts[:2])), 2)

    def test_long_track_stays_bounded(self):
        # a slightly wavy near-straight line, then a loop: both are 20 000 points
        wavy = [(i, i * 1e-5, 1e-5 * math.sin(i / 7), None, None) for i in range(20000)]
        self.assertLessEqual(len(simplify([p[1:3] for p in wavy], 5.0, cap=300)), 300)
        d = route_details(gpx(loop(n=20000, step_s=1)), None)
        self.assertLessEqual(sum(map(len, d["route"])), 300)
        self.assertLessEqual(len(d["series"]["t"]), 200)

    def test_splits(self):
        s = route_details(gpx(loop()), None)["splits"]
        self.assertEqual([x["km"] for x in s[:3]], [1, 1, 1])
        self.assertAlmostEqual(s[3]["km"], 0.2, delta=0.01)
        for x in s[:3]:
            self.assertAlmostEqual(x["s"], 300, delta=1)
            self.assertAlmostEqual(x["pace"], 300, delta=1)

    def test_gap_splits_and_series(self):
        d = route_details(gpx(loop(ele=lambda i: 5, hr=lambda i: 130), gap_after=160), None)
        self.assertEqual(len(d["route"]), 2)
        self.assertEqual(sum(len(r) > 1 for r in d["route"]), 2)
        self.assertAlmostEqual(sum(x["s"] for x in d["splits"]), 957, delta=1)  # 960 s minus the 3 s step the pause replaced
        t, pace = d["series"]["t"], d["series"]["pace"]
        after = [i for i in range(1, len(t)) if t[i] - t[i - 1] > 60]
        self.assertEqual(len(after), 1)  # the break survives thinning
        self.assertIsNone(pace[after[0]])
        for col in ("hr", "ele"):  # no line across the pause in any graph
            self.assertIsNone(d["series"][col][after[0]], col)
            self.assertIsNotNone(d["series"][col][after[0] - 1], col)
        self.assertLess(max(p for p in pace if p is not None), 1000)

    def test_series_keeps_first_and_last_row(self):
        pts = [(0, 0.0, 0.0, None, None)] + loop(n=400)  # a stray first fix, a pause, then 400 points
        d = route_details(gpx(pts, gap_after=0), None)
        self.assertEqual(d["series"]["t"][0], 0)
        self.assertEqual(d["series"]["t"][-1], 300 + 399 * 3)
        self.assertLessEqual(len(d["series"]["t"]), 200)
        self.assertIsNone(d["series"]["pace"][1])

    def test_gain_hysteresis(self):
        noisy = route_details(gpx(loop(ele=lambda i: 50 + (i % 2))), None)
        self.assertEqual(noisy["gain_m"], 0)
        climb = route_details(gpx(loop(ele=lambda i: 50 + min(i, 100) / 5 + (i % 2))), None)  # 20 m over 100 points, 1 m noise
        self.assertAlmostEqual(climb["gain_m"], 20, delta=1)

    def test_zones(self):
        d = route_details(gpx(loop(hr=lambda i: (100, 130, 150, 170, 190)[i % 5])), 200)
        self.assertAlmostEqual(sum(d["zones"]), 960, delta=0.5)
        for z in d["zones"]:
            self.assertAlmostEqual(z, 192, delta=3)
        self.assertEqual(d["max_hr"], 200)
        self.assertIsNone(route_details(gpx(loop(hr=lambda i: 150)), None)["zones"])
        self.assertIsNone(route_details(gpx(loop()), 200)["zones"])

    def test_zone_edges(self):
        # 4 s intervals ending at hr 90 (45 %: none), 100 (Z1), 190 (Z5), 200 (Z5), 220 (above max: Z5)
        pts = [(4 * i, i * 1e-4, 0, None, hr) for i, hr in enumerate((150, 90, 100, 190, 200, 220))]
        self.assertEqual(route_details(gpx(pts), 200)["zones"], [4, 0, 0, 0, 12])

    def test_no_ele_no_hr(self):
        d = route_details(gpx(loop()), 190)
        self.assertEqual(set(d["series"]["hr"]), {None})
        self.assertEqual(set(d["series"]["ele"]), {None})
        self.assertIsNone(d["gain_m"])
        self.assertIsNone(d["zones"])
        self.assertEqual({x["hr"] for x in d["splits"]} | {x["climb"] for x in d["splits"]}, {None})

    def test_split_hr_and_climb(self):
        d = route_details(gpx(loop(ele=lambda i: i / 10, hr=lambda i: 140)), 190)
        self.assertEqual(d["splits"][0]["hr"], 140)
        self.assertAlmostEqual(d["splits"][0]["climb"], 10, delta=0.5)  # 1 km is 100 points at 0.1 m

    def test_track_segments(self):
        segs = track(gpx(loop(), gap_after=160))
        self.assertEqual([len(s) for s in segs], [161, 160])
        t, lat, lon, ele, hr = track(gpx(loop(ele=lambda i: 7, hr=lambda i: 120)))[0][5]
        self.assertEqual((ele, hr), (7, 120))

    def test_unreadable(self):
        with self.assertRaises(ValueError):
            route_details(b"<gpx", None)
        with self.assertRaises(ValueError):
            track(b"not xml")

    def test_no_points(self):
        d = route_details(b'<gpx xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg/></trk></gpx>', 190)
        self.assertEqual((d["route"], d["splits"], d["series"]["t"], d["zones"], d["gain_m"]), ([], [], [], None, None))


class GymTests(unittest.TestCase):
    def test_gym_summary(self):
        w = {"key": "opengym:7", "unit": "lb", "vol_kg": 1234.0,
             "lifts": {"bench": {"w": 60.0, "r": 8}, "mystery": {"w": 20.0, "r": 12}, "squat": {"w": 100.0, "r": 5}}}
        catalog = {"bench": {"name": "Bench press", "bp": "chest"}, "squat": {"name": "Squat", "bp": "upper legs"}}
        records = [{"id": "squat", "key": "opengym:7"}, {"id": "bench", "key": "opengym:3"}, {"id": "mystery", "key": "opengym:3"}]
        self.assertEqual(gym_summary(w, catalog, records), {"vol_kg": 1234.0, "exercises": [
            {"name": "Bench press", "w": 60.0, "r": 8, "unit": "lb", "record": False},
            {"name": "Exercise mystery", "w": 20.0, "r": 12, "unit": "lb", "record": False},
            {"name": "Squat", "w": 100.0, "r": 5, "unit": "lb", "record": True}]})

    def test_old_cache_without_lifts(self):
        self.assertEqual(gym_summary({"key": "k", "vol_kg": 0.0}, {}, []), {"exercises": [], "vol_kg": 0.0})


if __name__ == "__main__":
    unittest.main()
