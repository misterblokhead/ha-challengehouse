"""Tests for ingest (synthetic data only)."""
import io
import json
import tempfile
import unittest
import zipfile
from pathlib import Path

from custom_components.fitbridge.engine import ingest
from custom_components.fitbridge.engine.scoring_config import load_config
from custom_components.fitbridge.engine.store import Store
from .test_config import DEFAULT

PEOPLE = tuple(load_config(DEFAULT)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]

# Same shape as the real empty indoor OpenTracks export of 2026-10-25 (no fix -> empty trkseg)
EMPTY_GPX = b"""<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="OpenTracks" xmlns="http://www.topografix.com/GPX/1/1"
 xmlns:opentracks="http://opentracksapp.com/xmlschemas/v1"
 xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v2">
<trk><name>t</name><type><![CDATA[running]]></type>
<extensions><opentracks:trackid>00000000-0000-0000-0000-00000000e0e0</opentracks:trackid></extensions>
<trkseg>
</trkseg></trk></gpx>"""
TRACK = "11111111-1111-1111-1111-111111111111"


def gpx_with_points(trackid=TRACK, hrs=(100, 120, 140)):
    pts = "".join(
        f'<trkpt lat="45.5{i}" lon="5.0"><time>2026-10-25T10:00:{i * 10:02d}Z</time>'
        f"<extensions><gpxtpx:TrackPointExtension><gpxtpx:hr>{hr}</gpxtpx:hr>"
        f"</gpxtpx:TrackPointExtension></extensions></trkpt>"
        for i, hr in enumerate(hrs))
    return EMPTY_GPX.replace(b"00000000-0000-0000-0000-00000000e0e0", trackid.encode()).replace(
        b"<trkseg>\n</trkseg>", f"<trkseg>{pts}</trkseg>".encode())


def hex_workout(uid, activity="traditionalStrengthTraining", **stats):
    return {"uuid": uid, "activityType": activity, "startDate": "2026-10-23T15:31:38Z",
            "endDate": "2026-10-23T16:19:10Z", "duration": 2851.3, "indoor": False, "source": "watch",
            "events": [], "statistics": {
                "HKQuantityTypeIdentifierActiveEnergyBurned": {"sum": 182.7, "unit": "kcal"},
                "HKQuantityTypeIdentifierHeartRate": {"average": 88.4, "max": 120, "min": 58, "unit": "count/min"},
                **stats}}


def hex_zip(workouts, extra=None):
    doc = {"exportInfo": {"workoutCount": len(workouts)}, "workouts": workouts}
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w") as z:
        z.writestr("workouts_export_1_X/workouts_export_1_X.json", json.dumps(doc))
        for name, data in (extra or {}).items():
            z.writestr(f"workouts_export_1_X/{name}", data)
    return buf.getvalue()


class ParseTests(unittest.TestCase):
    def test_empty_opentracks_gpx_has_no_points(self):
        info = ingest.parse_gpx(EMPTY_GPX)
        self.assertEqual(info["points"], 0)
        self.assertEqual(info["trackid"], "00000000-0000-0000-0000-00000000e0e0")
        self.assertEqual(info["activity_type"], "running")
        self.assertIsNone(info["avg_hr"])

    def test_gpx_points_hr_and_duration(self):
        info = ingest.parse_gpx(gpx_with_points())
        self.assertEqual(info["points"], 3)
        self.assertEqual((info["avg_hr"], info["max_hr"]), (120, 140))
        self.assertEqual(info["duration_s"], 20)
        self.assertGreater(info["distance_m"], 1000)  # 0.01 deg lat steps ~1.1 km each

    def test_hex_zip_maps_fields(self):
        dist = {"HKQuantityTypeIdentifierDistanceWalkingRunning": {"sum": 3.2, "unit": "km"}}
        workouts, gpx = ingest.parse_hex_export(hex_zip([hex_workout("A"), hex_workout("B", "running", **dist)],
                                                        {"route.gpx": b"<gpx/>"}))
        self.assertEqual([w["key"] for w in workouts], ["A", "B"])
        self.assertEqual(workouts[0]["kcal"], 182.7)
        self.assertEqual(workouts[0]["avg_hr"], 88.4)
        self.assertIsNone(workouts[0]["distance_m"])
        self.assertEqual(workouts[1]["distance_m"], 3200)
        self.assertEqual(list(gpx), ["route.gpx"])

    def test_empty_export_and_bare_json(self):
        self.assertEqual(ingest.parse_hex_export(hex_zip([]))[0], [])
        self.assertEqual(len(ingest.parse_hex_export(json.dumps({"workouts": [hex_workout("C")]}).encode())[0]), 1)

    def test_unknown_distance_unit_is_dropped(self):
        self.assertIsNone(ingest._distance_m(5, "furlong"))

    def test_detect(self):
        bare = json.dumps({"workouts": [hex_workout("C")]}).encode()
        for body, want in [(hex_zip([hex_workout("A")]), "hex"), (bare, "hex"), (b"\r\n " + bare, "hex"),
                           (gpx_with_points(), "gpx"), (EMPTY_GPX, "gpx"), (b"", None),
                           (b"\x8f\x00\x13junk\xff" * 50, None), (b"<html><body>no</body></html>", None)]:
            with self.subTest(body=body[:20]):
                self.assertEqual(ingest.detect(body), want)

    def test_classify(self):
        c = ingest.classify
        self.assertEqual(c("opentracks", "Hardlopen", 10), "run")
        self.assertEqual(c("opentracks", "running", 0), None)
        self.assertEqual(c("opentracks", "Wandelen", 10), "walk")
        self.assertEqual(c("health_exporter", "running", None), "run")
        self.assertEqual(c("health_exporter", "hiking", None), "walk")
        self.assertEqual(c("health_exporter", "walking", None), "walk")
        for t in ("yoga", "HighIntensityIntervalTraining", "functionalStrengthTraining", "cardioDance"):
            self.assertEqual(c("health_exporter", t, []), "home")
        self.assertEqual(c("manual", "home", []), "home")
        self.assertIsNone(c("health_exporter", "swimming", []))
        self.assertEqual(c("manual", "gym", None), "gym")
        self.assertEqual(c("manual", "swim", None), None)


class FlowTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.sync = root / "sync"
        self.sync.mkdir()
        self.archive = root / "data" / "archive"
        self.store = Store(root / "db.sqlite")

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def test_folder_scan_stores_once_and_skips_empty(self):
        (self.sync / "empty.gpx").write_bytes(EMPTY_GPX)
        (self.sync / "run.gpx").write_bytes(gpx_with_points())
        for _ in range(2):
            ingest.scan_folder(self.store, self.archive, P0, self.sync)
        self.assertEqual(self.store.counts(), {P0: {"stored": 1, "skipped_no_gps": 1}})
        self.assertEqual((self.archive / P0 / f"{TRACK}.gpx").read_bytes(), gpx_with_points())

    def test_unreadable_gpx_in_folder_is_retried_when_it_changes(self):
        path = self.sync / "half.gpx"
        path.write_bytes(gpx_with_points()[:200])
        with self.assertLogs("custom_components.fitbridge", "WARNING"):
            ingest.scan_folder(self.store, self.archive, P0, self.sync)
        self.assertEqual(self.store.counts(), {})
        path.write_bytes(gpx_with_points())  # synced in full: new size
        ingest.scan_folder(self.store, self.archive, P0, self.sync)
        self.assertEqual(self.store.counts(), {P0: {"stored": 1}})

    def test_ingest_gpx_twice_stores_one_row(self):
        self.assertTrue(ingest.ingest_gpx(self.store, self.archive, P0, gpx_with_points()))
        self.assertFalse(ingest.ingest_gpx(self.store, self.archive, P0, gpx_with_points()))
        (row,) = self.store.all_rows()
        self.assertEqual((row["key"], row["source"], row["status"], row["points"]), (TRACK, "opentracks", "stored", 3))
        self.assertEqual(Path(row["file"]), self.archive / P0 / f"{TRACK}.gpx")

    def test_ingest_gpx_without_trackid_is_keyed_by_hash(self):
        data = gpx_with_points().replace(b"<opentracks:trackid>" + TRACK.encode() + b"</opentracks:trackid>", b"")
        self.assertTrue(ingest.ingest_gpx(self.store, self.archive, P0, data))
        (row,) = self.store.all_rows()
        self.assertTrue(row["key"].startswith("sha256:"))
        self.assertEqual(Path(row["file"]).name, row["key"].replace(":", "_") + ".gpx")

    def test_ingest_gpx_raises_on_junk(self):
        with self.assertRaises(Exception):
            ingest.ingest_gpx(self.store, self.archive, P0, b"<gpx")
        self.assertEqual(self.store.all_rows(), [])

    def test_ingest_dedups_and_classifies(self):
        body = hex_zip([hex_workout("A"), hex_workout("R", "running")])
        self.assertEqual(ingest.ingest_export(self.store, self.archive, P1, body), (2, 2))
        self.assertEqual(ingest.ingest_export(self.store, self.archive, P1, body), (2, 0))
        self.assertEqual(self.store.counts(), {P1: {"archived": 1, "awaiting_route": 1}})
        self.assertEqual(len(list((self.archive / P1).glob("export-*.body"))), 2)

    def test_unreadable_export_raises(self):
        for body in (b"not a zip", b"{"):
            with self.subTest(body=body), self.assertRaises((ValueError, KeyError, zipfile.BadZipFile)):
                ingest.ingest_export(self.store, self.archive, P1, body)

    def test_ingest_body_takes_each_path_and_strips_a_bom(self):
        bare = json.dumps({"workouts": [hex_workout("C")]}).encode()
        self.assertEqual(ingest.ingest_body(self.store, self.archive, P1, hex_zip([hex_workout("A")])), {"workouts": 1, "new": 1})
        self.assertEqual(ingest.ingest_body(self.store, self.archive, P1, b"\xef\xbb\xbf" + bare), {"workouts": 1, "new": 1})
        self.assertEqual(ingest.ingest_body(self.store, self.archive, P0, b"\xef\xbb\xbf" + gpx_with_points()), {"new": True})
        self.assertEqual(ingest.ingest_body(self.store, self.archive, P0, gpx_with_points()), {"new": False})
        self.assertEqual(self.store.counts(), {P0: {"stored": 1}, P1: {"archived": 2}})

    def test_unusable_bodies_raise_unreadable_and_store_nothing(self):
        no_json = io.BytesIO()
        with zipfile.ZipFile(no_json, "w") as z:
            z.writestr("readme.txt", "no export here")
        array_zip = io.BytesIO()
        with zipfile.ZipFile(array_zip, "w") as z:
            z.writestr("x/x.json", "[1, 2]")
        for body in (b"junk", b"[{\"uuid\": \"A\"}]", b"{}", b'{"workouts": [1]}', b'{"workouts": "x"}',
                     b'{"workouts": [{"uuid": "A", "statistics": 5}]}', no_json.getvalue(), array_zip.getvalue(),
                     b"<gpx><trk>", b'<gpx xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg><trkpt lat="x" lon="5"/></trkseg></trk></gpx>', b"{",
                     *(json.dumps({"workouts": [dict(hex_workout("A", "running"), **{k: v})]}).encode()
                       for k, v in (("uuid", 5), ("startDate", {"x": 1}), ("activityType", ["running"]), ("routeFile", {"x": 1})))):
            with self.subTest(body=body[:60]), self.assertRaises(ingest.Unreadable):
                ingest.ingest_body(self.store, self.archive, P1, body)
        self.assertEqual(self.store.all_rows(), [])
        self.assertFalse(self.archive.exists())  # nothing written, not even the raw body

    def test_numbers_of_the_wrong_type_are_dropped_and_never_break_scoring(self):
        w = dict(hex_workout("T", "running"), duration="an hour", indoor="no", startDate="2026-10-20T07:00:00+00:00",
                 endDate="2026-10-20T07:30:00+00:00")
        w["statistics"]["HKQuantityTypeIdentifierHeartRate"]["average"] = "88"
        w["statistics"]["HKQuantityTypeIdentifierDistanceWalkingRunning"] = {"sum": "5", "unit": "km"}
        body = json.dumps({"workouts": [w]}).encode()
        self.assertEqual(ingest.ingest_body(self.store, self.archive, P1, body), {"workouts": 1, "new": 1})
        (row,) = self.store.all_rows()
        self.assertEqual((row["duration_s"], row["distance_m"], row["avg_hr"], row["indoor"]), (None, None, None, None))
        t = dict(start="2026-10-21T07:00:00+00:00", end="2026-10-21T07:20:00+00:00", activity_type="walking")
        self.store.add(P0, "old", "health_exporter", "archived", duration_s="an hour", distance_m="far", avg_hr="x", **t)
        out = ingest.db_workouts(self.store, PEOPLE)  # a row stored before the check is harmless too
        self.assertEqual([(x["duration_s"], x["distance_m"], x["avg_hr"]) for x in out[P1] + out[P0]],
                         [(1800.0, None, None), (1200.0, None, None)])

    def route_export(self, with_gpx=True, gpx=None, **fields):
        w = dict(hex_workout("R", "running"), routeFile="routes/running-2026-10-23-r.gpx", **fields)
        extra = {"routes/running-2026-10-23-r.gpx": gpx or gpx_with_points()} if with_gpx else None
        return ingest.ingest_export(self.store, self.archive, P1, hex_zip([w], extra))

    def test_export_route_is_linked_and_stored(self):
        self.route_export()
        self.assertEqual(self.store.counts(), {P1: {"stored": 1}})
        self.assertEqual(Path(self.store.rows("stored")[0]["file"]).read_bytes(), gpx_with_points())

    def test_late_route_attaches_once(self):
        self.route_export(with_gpx=False)
        self.assertEqual(self.store.counts(), {P1: {"awaiting_route": 1}})
        self.route_export()
        self.assertEqual(self.store.counts(), {P1: {"stored": 1}})
        self.route_export()
        self.assertEqual(self.store.counts(), {P1: {"stored": 1}})

    def test_late_route_is_logged_and_archived_gpx_never_rewritten(self):
        self.route_export(with_gpx=False)
        with self.assertLogs("custom_components.fitbridge", "INFO") as logs:
            self.route_export()
        self.assertTrue(any("route attached" in m for m in logs.output))
        path = Path(self.store.rows("stored")[0]["file"])
        path.write_bytes(b"in use")
        self.route_export()
        self.assertEqual(path.read_bytes(), b"in use")

    def test_indoor_workout_has_no_route_but_still_scores(self):
        w = dict(hex_workout("W", "walking"), indoor=True)
        ingest.ingest_export(self.store, self.archive, P1, hex_zip([w]))
        self.assertEqual(self.store.counts(), {P1: {"no_route": 1}})
        self.assertEqual([x["kind"] for x in ingest.db_workouts(self.store, PEOPLE)[P1]], ["walk"])

    def test_route_without_points_is_skipped(self):
        self.route_export(gpx=EMPTY_GPX)
        self.assertEqual(self.store.counts(), {P1: {"skipped_no_gps": 1}})

    def test_db_workouts_keys_rows_and_skips(self):
        t = dict(start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        self.store.add(P0, "w", "health_exporter", "archived", activity_type="walking", indoor=0, **t)
        self.store.add(P0, "s", "health_exporter", "archived", activity_type="swimming", **t)
        self.store.add("nobody", "x", "health_exporter", "archived", activity_type="running", **t)
        self.store.add(P0, "e", "opentracks", "completed", activity_type="running", points=10, endurain_ids="[42]", **t)
        out = ingest.db_workouts(self.store, PEOPLE)
        self.assertEqual(set(out), set(PEOPLE))
        self.assertEqual([(w["key"], w["kind"], w["url"]) for w in out[P0]], [("w", "walk", None), ("e", "run", None)])


if __name__ == "__main__":
    unittest.main()
