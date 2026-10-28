"""Tests for fitbridge (stdlib unittest, synthetic data only). Run: python -m unittest -v test_fitbridge"""
import io
import json
import os
import sqlite3
import tempfile
import threading
import time
import unittest
import urllib.error
import urllib.request
import zipfile
from datetime import datetime, timedelta, timezone
from http.server import ThreadingHTTPServer
from pathlib import Path
from unittest import mock

from custom_components.fitbridge.engine import fitbridge as fb
from custom_components.fitbridge.engine.scoring_config import load_config
from .test_config import DEFAULT
from .test_opengym import fake
from .test_records import seg, track

PEOPLE = tuple(load_config(DEFAULT)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]
NOW = datetime(2026, 10, 28, 12, 0, tzinfo=timezone.utc)

# Same shape as the real empty indoor OpenTracks export of 2026-10-25 (no fix -> empty trkseg)
EMPTY_GPX = b"""<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="OpenTracks" xmlns="http://www.topografix.com/GPX/1/1"
 xmlns:opentracks="http://opentracksapp.com/xmlschemas/v1"
 xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v2">
<trk><name>t</name><type><![CDATA[running]]></type>
<extensions><opentracks:trackid>00000000-0000-0000-0000-00000000e0e0</opentracks:trackid></extensions>
<trkseg>
</trkseg></trk></gpx>"""


def gpx_with_points(trackid="11111111-1111-1111-1111-111111111111", hrs=(100, 120, 140)):
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


class FakeEndurain:
    def __init__(self):
        self.uploads, self.reject = [], False

    def upload(self, person, filename, data, idem_key):
        if self.reject:
            raise fb.UploadRejected("HTTP 400")
        self.uploads.append((person, filename, idem_key))
        return f"job-{len(self.uploads)}"

    def job(self, person, job_id):
        return {"status": "completed", "activity_ids": [42]}


class ParseTests(unittest.TestCase):
    def test_empty_opentracks_gpx_has_no_points(self):
        info = fb.parse_gpx(EMPTY_GPX)
        self.assertEqual(info["points"], 0)
        self.assertEqual(info["trackid"], "00000000-0000-0000-0000-00000000e0e0")
        self.assertEqual(info["activity_type"], "running")
        self.assertIsNone(info["avg_hr"])

    def test_gpx_points_hr_and_duration(self):
        info = fb.parse_gpx(gpx_with_points())
        self.assertEqual(info["points"], 3)
        self.assertEqual((info["avg_hr"], info["max_hr"]), (120, 140))
        self.assertEqual(info["duration_s"], 20)
        self.assertGreater(info["distance_m"], 1000)  # 0.01 deg lat steps ~1.1 km each

    def test_hex_zip_maps_fields(self):
        dist = {"HKQuantityTypeIdentifierDistanceWalkingRunning": {"sum": 3.2, "unit": "km"}}
        workouts, gpx = fb.parse_hex_export(hex_zip([hex_workout("A"), hex_workout("B", "running", **dist)],
                                                    {"route.gpx": b"<gpx/>"}))
        self.assertEqual([w["key"] for w in workouts], ["A", "B"])
        self.assertEqual(workouts[0]["kcal"], 182.7)
        self.assertEqual(workouts[0]["avg_hr"], 88.4)
        self.assertIsNone(workouts[0]["distance_m"])
        self.assertEqual(workouts[1]["distance_m"], 3200)
        self.assertEqual(list(gpx), ["route.gpx"])

    def test_empty_export_and_bare_json(self):
        self.assertEqual(fb.parse_hex_export(hex_zip([]))[0], [])
        self.assertEqual(len(fb.parse_hex_export(json.dumps({"workouts": [hex_workout("C")]}).encode())[0]), 1)

    def test_unknown_distance_unit_is_dropped(self):
        self.assertIsNone(fb._distance_m(5, "furlong"))


class FlowTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.sync = root / "sync"
        self.sync.mkdir()
        self.cfg = fb.Config(endurain_url="http://x", data_dir=root / "data", sync_dirs={P0: self.sync},
                             keys={P0: "k1", P1: "k2"}, logins={"person2@example.com": P1})
        self.cfg.data_dir.mkdir()
        self.store = fb.Store(self.cfg.data_dir / "db.sqlite")
        self.client = FakeEndurain()

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()

    def cycle(self):
        fb.scan_sync_folders(self.cfg, self.store)
        fb.upload_pending(self.cfg, self.store, self.client)
        fb.poll_jobs(self.cfg, self.store, self.client)

    def test_folder_flow_uploads_once_and_skips_empty(self):
        (self.sync / "empty.gpx").write_bytes(EMPTY_GPX)
        (self.sync / "run.gpx").write_bytes(gpx_with_points())
        self.cycle()
        self.cycle()
        self.assertEqual(self.client.uploads,
                         [(P0, "11111111-1111-1111-1111-111111111111.gpx",
                           "fitbridge-11111111-1111-1111-1111-111111111111")])
        self.assertEqual(self.store.counts(), {P0: {"completed": 1, "skipped_no_gps": 1}})

    def test_missing_key_keeps_upload_pending(self):
        self.cfg.keys = {}
        (self.sync / "run.gpx").write_bytes(gpx_with_points())
        self.cycle()
        self.assertEqual(self.store.counts(), {P0: {"pending_upload": 1}})

    def test_rejected_upload_is_failed_not_retried(self):
        self.client.reject = True
        (self.sync / "run.gpx").write_bytes(gpx_with_points())
        with self.assertLogs("fitbridge", "ERROR") as logs:
            self.cycle()
            self.cycle()
        self.assertEqual(len(logs.records), 1)
        self.assertEqual(self.store.counts(), {P0: {"failed": 1}})

    def test_ingest_dedups_and_classifies(self):
        body = hex_zip([hex_workout("A"), hex_workout("R", "running")])
        self.assertEqual(fb.ingest_export(self.cfg, self.store, P1, body), (2, 2))
        self.assertEqual(fb.ingest_export(self.cfg, self.store, P1, body), (2, 0))
        self.assertEqual(self.store.counts(), {P1: {"archived": 1, "awaiting_route": 1}})
        self.assertEqual(len(list((self.cfg.data_dir / "archive" / P1).glob("export-*.body"))), 2)

    def route_export(self, with_gpx=True, gpx=None, **fields):
        w = dict(hex_workout("R", "running"), routeFile="routes/running-2026-10-23-r.gpx", **fields)
        extra = {"routes/running-2026-10-23-r.gpx": gpx or gpx_with_points()} if with_gpx else None
        return fb.ingest_export(self.cfg, self.store, P1, hex_zip([w], extra))

    def test_export_route_is_linked_and_uploaded(self):
        self.route_export()
        self.assertEqual(self.store.counts(), {P1: {"pending_upload": 1}})
        fb.upload_pending(self.cfg, self.store, self.client)
        self.assertEqual(self.client.uploads, [(P1, "running-2026-10-23-r.gpx", "fitbridge-R")])
        self.assertEqual(Path(self.store.rows("job_pending")[0]["file"]).read_bytes(), gpx_with_points())

    def test_late_route_attaches_once(self):
        self.route_export(with_gpx=False)
        self.assertEqual(self.store.counts(), {P1: {"awaiting_route": 1}})
        self.route_export()
        self.assertEqual(self.store.counts(), {P1: {"pending_upload": 1}})
        fb.upload_pending(self.cfg, self.store, self.client)
        fb.poll_jobs(self.cfg, self.store, self.client)
        self.route_export()
        fb.upload_pending(self.cfg, self.store, self.client)
        self.assertEqual(len(self.client.uploads), 1)
        self.assertEqual(self.store.counts(), {P1: {"completed": 1}})

    def test_late_route_is_logged_and_archived_gpx_never_rewritten(self):
        self.route_export(with_gpx=False)
        with self.assertLogs("fitbridge", "INFO") as logs:
            self.route_export()
        self.assertTrue(any("route attached" in m for m in logs.output))
        path = Path(self.store.rows("pending_upload")[0]["file"])
        path.write_bytes(b"in use")  # stands in for a file the uploader is reading
        self.route_export()
        self.assertEqual(path.read_bytes(), b"in use")

    def test_indoor_workout_has_no_route_but_still_scores(self):
        w = dict(hex_workout("W", "walking"), indoor=True)
        fb.ingest_export(self.cfg, self.store, P1, hex_zip([w]))
        self.assertEqual(self.store.counts(), {P1: {"no_route": 1}})
        self.assertEqual([x["kind"] for x in fb.db_workouts(self.store, self.cfg, PEOPLE)[P1]], ["walk"])

    def test_route_without_points_is_skipped(self):
        self.route_export(gpx=EMPTY_GPX)
        self.assertEqual(self.store.counts(), {P1: {"skipped_no_gps": 1}})

    def test_excluded_workouts_are_not_uploaded_until_restored(self):
        (self.sync / "run.gpx").write_bytes(gpx_with_points())
        fb.scan_sync_folders(self.cfg, self.store)
        self.route_export()
        self.store.set_excluded(P0, "11111111-1111-1111-1111-111111111111", True)
        self.store.set_excluded(P1, "R", True)
        fb.upload_pending(self.cfg, self.store, self.client)
        self.assertEqual(self.client.uploads, [])
        self.store.set_excluded(P0, "11111111-1111-1111-1111-111111111111", False)
        self.store.set_excluded(P1, "R", False)
        fb.upload_pending(self.cfg, self.store, self.client)
        self.assertEqual(len(self.client.uploads), 2)

    def test_old_indoor_awaiting_rows_move_to_no_route(self):
        self.store.add(P1, "OLD", "health_exporter", "awaiting_route", activity_type="walking", indoor=1)
        self.store.add(P1, "OUT", "health_exporter", "awaiting_route", activity_type="running", indoor=0)
        self.store.db.close()
        self.store = fb.Store(self.cfg.data_dir / "db.sqlite")
        self.assertEqual(self.store.counts(), {P1: {"no_route": 1, "awaiting_route": 1}})

    def manual(self, name, **msg):
        return fb.apply_manual(self.store, {f"fitbridge/manual/{name}": json.dumps(msg).encode()}, NOW, PEOPLE)

    def test_manual_add_remove_restore_and_idempotent(self):
        msg = {"action": "add", "person": P0, "kind": "run", "start": "2026-10-28T07:00:00+01:00",
               "minutes": 30, "km": 4, "indoor": True}
        self.assertEqual(self.manual("m1", **msg), ["fitbridge/manual/m1"])
        self.manual("m1", **msg)
        ws = fb.db_workouts(self.store, self.cfg, PEOPLE)[P0]
        self.assertEqual([(w["kind"], w["indoor"], w["distance_m"], w["duration_s"], w["source"]) for w in ws],
                         [("run", True, 4000, 1800, "manual")])
        self.assertEqual(ws[0]["end"] - ws[0]["start"], timedelta(minutes=30))
        self.manual("r1", action="remove", person=P0, key="manual:m1")
        self.assertEqual(fb.db_workouts(self.store, self.cfg, PEOPLE)[P0], [])

    def test_remove_automatic_excludes_and_restore_brings_back(self):
        self.store.add(P0, "trk1", "opentracks", "completed", activity_type="running", points=10,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800,
                       endurain_ids="[42]")
        self.cfg.endurain_public = "https://e.example"
        for action, expected in [("remove", True), ("restore", False)]:
            self.manual(action, action=action, person=P0, key="trk1")
            w = fb.db_workouts(self.store, self.cfg, PEOPLE)[P0][0]
            self.assertEqual(w["excluded"], expected)
        self.assertEqual(w["url"], "https://e.example/activity/42")

    def test_bad_manual_messages_are_cleared_not_stored(self):
        good = {"action": "add", "person": P0, "kind": "run", "start": "2026-10-28T07:00:00+01:00", "minutes": 30}
        bad = {"a": b"{not json", "b": b"[1]",
               "c": {**good, "start": "2099-01-01T00:00:00+00:00"},
               "d": {**good, "kind": "swim"},
               "e": {**good, "person": "nobody"},
               "f": {**good, "minutes": 0},
               "g": {**good, "minutes": 601},
               "h": {**good, "start": "2026-10-28T07:00:00"},
               "i": {**good, "km": -1},
               "j": {"action": "remove", "person": P0},
               "k": {**good, "action": "explode"},
               "l": {**good, "indoor": "false"},
               "m": {**good, "start": "0001-01-01T00:00:00+01:00"},
               "n": b"[" * 100000,                    # RecursionError in json.loads
               "o": {**good, "minutes": 10 ** 400},   # too big for a float
               "p": {**good, "km": 10 ** 400},
               "q": {**good, "km": 1e306}}             # km * 1000 would be stored as inf
        msgs = {f"fitbridge/manual/{k}": v if isinstance(v, bytes) else json.dumps(v).encode() for k, v in bad.items()}
        with self.assertLogs("fitbridge", "WARNING") as logs:
            cleared = fb.apply_manual(self.store, msgs, NOW, PEOPLE)
        self.assertEqual(len(logs.records), len(msgs))
        self.assertEqual(sorted(cleared), sorted(msgs))
        self.assertEqual(self.store.all_rows(), [])
        self.assertEqual(fb.db_workouts(self.store, self.cfg, PEOPLE)[P0], [])

    def test_manual_messages_apply_in_time_order(self):
        self.store.add(P0, "trk1", "opentracks", "completed", activity_type="running", points=10,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)

        def apply(*msgs):  # (id, action) in broker delivery order
            fb.apply_manual(self.store, {f"fitbridge/manual/{i}": json.dumps(
                {"action": a, "person": P0, "key": "trk1"}).encode() for i, a in msgs}, NOW, PEOPLE)
            return (P0, "trk1") in self.store.exclusions()

        # integration ids are ms, HA script ids seconds: Undo (restore) after Remove wins whatever the delivery order
        self.assertFalse(apply(("1761470000500-000000", "restore"), ("1761470000-ffffff", "remove")))
        self.assertTrue(apply(("1761470002-aaaaaa", "remove"), ("1761470001900-bbbbbb", "restore")))
        self.assertTrue(apply(("1761470003000-cccccc", "remove"), ("not-a-time", "restore")))  # no time prefix: first

    def test_manual_db_error_keeps_topic_for_retry(self):
        topics = {"fitbridge/manual/m1": json.dumps({"action": "add", "person": P0, "kind": "run",
                                                     "start": "2026-10-28T07:00:00+01:00", "minutes": 30}).encode()}
        with mock.patch.object(self.store, "add", side_effect=sqlite3.OperationalError("database is locked")), \
                self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.apply_manual(self.store, topics, NOW, PEOPLE), [])
        self.assertEqual(self.store.all_rows(), [])
        self.assertEqual(fb.apply_manual(self.store, topics, NOW, PEOPLE), list(topics))
        self.assertEqual(len(fb.db_workouts(self.store, self.cfg, PEOPLE)[P0]), 1)

    def test_db_workouts_keys_rows_and_skips(self):
        t = dict(start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        self.store.add(P0, "w", "health_exporter", "archived", activity_type="walking", indoor=0, **t)
        self.store.add(P0, "s", "health_exporter", "archived", activity_type="swimming", **t)
        self.store.add("nobody", "x", "health_exporter", "archived", activity_type="running", **t)
        out = fb.db_workouts(self.store, self.cfg, PEOPLE)
        self.assertEqual(set(out), set(PEOPLE))
        self.assertEqual([(w["key"], w["kind"], w["url"]) for w in out[P0]], [("w", "walk", None)])

    def test_badges_first_scoring_is_silent_and_unseen_is_read_only(self):
        b = [{"id": "a", "unlocked_at": "2026-10-28"}, {"id": "b", "unlocked_at": "2026-10-28"}]
        self.assertEqual(self.store.unseen_badges(P0, b), (b, False))
        self.assertEqual(self.store.unseen_badges(P0, b), (b, False))  # nothing recorded by looking
        self.store.record_badges(P0, b[:1])
        self.assertEqual(self.store.unseen_badges(P0, b), (b[1:], True))
        self.store.record_badges(PEOPLE[-1], [])  # empty first scoring still counts as scored
        self.assertEqual(self.store.unseen_badges(PEOPLE[-1], b), (b, True))

    def test_kv_and_manual_seen(self):
        self.assertIsNone(self.store.kv_get("k"))
        self.store.kv_set("k", "v")
        self.store.kv_set("k", "w")
        self.assertEqual(self.store.kv_get("k"), "w")
        self.assertFalse(self.store.manual_seen("m"))
        self.store.mark_manual_seen("m")
        self.assertTrue(self.store.manual_seen("m"))

    def test_classify(self):
        c = fb.classify
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

    def test_http_identity_from_tailscale_header(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0), fb.make_handler(self.cfg, self.store))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        url = f"http://127.0.0.1:{server.server_port}/capture/hex"
        body = hex_zip([hex_workout("A")])

        def post(headers):
            req = urllib.request.Request(url, data=body, method="POST", headers=headers)
            try:
                with urllib.request.urlopen(req) as r:
                    return r.status, json.loads(r.read())
            except urllib.error.HTTPError as e:
                e.close()
                return e.code, None

        try:
            self.assertEqual(post({})[0], 403)
            self.assertEqual(post({"Tailscale-User-Login": "someone@else"})[0], 403)
            self.assertEqual(post({"Tailscale-User-Login": "ISA@example.com"}), (200, {"workouts": 1, "new": 1}))
            req = urllib.request.Request(url, data=b"not a zip", method="POST",
                                         headers={"Tailscale-User-Login": "person2@example.com"})
            with self.assertRaises(urllib.error.HTTPError) as ctx, self.assertLogs("fitbridge", "WARNING"):
                urllib.request.urlopen(req)
            ctx.exception.close()
            self.assertEqual(ctx.exception.code, 400)
        finally:
            server.shutdown()
            server.server_close()

    def test_403_reads_the_body_first(self):
        # closing a socket with unread data sends a TCP RST (Windows), which the client sees instead of the 403
        class Body(io.BytesIO):
            def close(self):
                self.unread = len(self.getvalue()) - self.tell()
                super().close()

        class Conn:
            def __init__(self, length):
                self.rfile, self.sent = Body(f"POST /x HTTP/1.1\r\nContent-Length: {length}\r\n\r\n".encode() + b"x" * 1000), b""

            def makefile(self, mode, *args):
                return self.rfile

            def sendall(self, data):
                self.sent += data

        for length, unread in [("1000", 0), ("abc", 1000)]:  # unparseable length: still a 403, nothing drained
            with self.subTest(length=length):
                conn = Conn(length)
                fb.make_handler(self.cfg, self.store)(conn, ("127.0.0.1", 1), None)
                self.assertIn(b" 403 ", conn.sent.split(b"\r\n")[0])
                self.assertEqual(conn.rfile.unread, unread)


class EnvTests(unittest.TestCase):
    def test_people_settings_come_from_env_prefixes(self):
        u = P0.upper()
        cfg = fb.Config.from_env({f"ENDURAIN_KEY_{u}": "k", f"ENDURAIN_KEY_{P1.upper()}": "",
                                  f"TAILSCALE_LOGIN_{u}": "A@Example.com", f"OPENGYM_UID_{u}": "uid",
                                  f"SYNC_DIR_{u}": "/s", "MQTT_HOST": "h", "MQTT_PASSWORD": "secret"})
        self.assertEqual((cfg.keys, cfg.logins, cfg.opengym_uids, cfg.sync_dirs),
                         ({P0: "k"}, {"a@example.com": P0}, {P0: "uid"}, {P0: Path("/s")}))
        self.assertEqual(cfg.mqtt, {"host": "h", "port": 1883, "user": "", "password": "secret"})
        self.assertNotIn("secret", repr(cfg))
        self.assertEqual(fb.Config.from_env({}).sync_dirs, {})

    def test_public_urls_come_from_env_only(self):
        for c in (fb.Config.from_env({}), fb.Config(endurain_url="x", data_dir=Path("."))):
            self.assertEqual((c.endurain_public, c.opengym_public), ("", ""))


MANUAL_RUN = json.dumps({"action": "add", "person": P0, "kind": "run", "start": "2026-10-28T07:00:00+01:00",
                         "minutes": 30}).encode()
GYM_UID = "uid-0"
_GYM_START = int(datetime(2026, 10, 27, 17, tzinfo=timezone.utc).timestamp() * 1000)
GYM = {"id": "g1", "start": _GYM_START, "end": _GYM_START + 3600_000, "vol": 1000, "name": "Push"}


class FakeMqtt:
    def __init__(self, retained=None, fail=False):
        self.msgs = {"fitbridge/pauses": b"[]"} if retained is None else retained
        self.fail, self.published = fail, []

    def retained(self, topic_filter, wait=2.0):
        if self.fail:
            raise fb.mqtt.MqttError("broker down")
        if topic_filter.endswith("#"):
            return {t: v for t, v in self.msgs.items() if t.startswith(topic_filter[:-1])}
        return {t: v for t, v in self.msgs.items() if t == topic_filter}

    def publish_many(self, messages):
        if self.fail:
            raise fb.mqtt.MqttError("broker down")
        self.published += list(messages)


class FakeOpenGym:
    def __init__(self, raws=(), raise_=None):
        self.raws, self.raise_ = list(raws), raise_

    def renew_token(self):
        if self.raise_:
            raise self.raise_

    def users(self):
        return [{"id": GYM_UID}]

    def user(self, uid):
        return {"unit": "kg", "workouts": self.raws}

    def exercise_file(self):
        return "assets/exercises-t.js"

    def text(self, path):
        return '{"id":"0118","n":"bent over row","bp":"back"}'


def http_get(server, path):
    with urllib.request.urlopen(f"http://127.0.0.1:{server.server_port}{path}") as r:
        return json.loads(r.read())


class ScoringCycleTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = Path(self.tmp.name)
        self.toml_path = root / "scoring.toml"
        self.toml_path.write_text(DEFAULT, encoding="utf-8")
        self.cfg = fb.Config(endurain_url="http://x", data_dir=root, scoring_toml=self.toml_path,
                             opengym_uids={P0: GYM_UID})
        self.store = fb.Store(root / "db.sqlite")
        self.holder = fb.ConfigHolder(self.toml_path)
        fb.LAST_SCORE = None

    def tearDown(self):
        self.store.db.close()
        self.tmp.cleanup()
        fb.LAST_SCORE = None

    def test_cycle_publishes_and_clears_manual(self):
        mq = FakeMqtt(retained={"fitbridge/manual/m1": MANUAL_RUN, "fitbridge/pauses": b"[]"})
        res = fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), mq, NOW)
        self.assertEqual(res["people"][P0]["week"]["runs"], 1)
        self.assertIn(("fitbridge/manual/m1", b"", True), mq.published)
        self.assertIn(f"homeassistant/sensor/fit_{P0}_xp/config", [t for t, _, _ in mq.published])

    def test_poison_manual_message_is_cleared_and_scoring_continues(self):
        mq = FakeMqtt(retained={"fitbridge/manual/m1": MANUAL_RUN, "fitbridge/manual/x": b"[" * 100000,
                                "fitbridge/pauses": b"[]"})
        with self.assertLogs("fitbridge", "WARNING"):
            res = fb.score_cycle(self.cfg, self.store, self.holder, None, mq, NOW)
        self.assertEqual(res["people"][P0]["week"]["runs"], 1)
        self.assertIn(("fitbridge/manual/x", b"", True), mq.published)

    def test_opengym_down_uses_cache(self):
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([GYM]), None, NOW)
        with self.assertLogs("fitbridge", "WARNING") as logs:
            res = fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym(raise_=OSError()), None, NOW)
        self.assertEqual(res["people"][P0]["week"]["workouts"], 1)
        self.assertIsNotNone(fb.LAST_SCORE["gym_data_as_of"])
        self.assertIn("OSError", logs.output[0])

    def test_gym_remove_and_restore(self):
        for excluded, gym in [(True, 0), (False, 1)]:
            self.store.set_excluded(P0, "opengym:g1", excluded)
            res = fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([GYM]), None, NOW)
            self.assertEqual(res["people"][P0]["week"]["workouts"], gym)
            self.assertEqual([w["excluded"] for w in res["people"][P0]["recent"]], [excluded])

    def test_no_opengym_and_no_cache_scores_without_gym(self):
        res = fb.score_cycle(self.cfg, self.store, self.holder, None, None, NOW)
        self.assertEqual(res["people"][P0]["week"]["workouts"], 0)
        self.assertIsNone(res["gym_data_as_of"])

    def test_pauses_cached_when_missing(self):
        name = load_config(DEFAULT)["people"][P0]["name"]
        pause = json.dumps([{"summary": name, "start": "2026-10-26", "end": "2026-11-02"}]).encode()
        fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt({"fitbridge/pauses": pause}), NOW)
        with self.assertLogs("fitbridge", "WARNING"):
            res = fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt({}), NOW)
        self.assertTrue(res["people"][P0]["week"]["paused"])
        self.assertIsNotNone(res["pauses_as_of"])

    def test_bad_pause_payload_keeps_good_cache(self):
        name = load_config(DEFAULT)["people"][P0]["name"]
        good = json.dumps([{"summary": name, "start": "2026-10-26", "end": "2026-11-02"}]).encode()
        fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt({"fitbridge/pauses": good}), NOW)
        for bad in ([{"summary": name, "start": "not a date", "end": "2026-11-02"}],
                    [{"summary": 5, "start": "2026-10-26", "end": "2026-11-02"}],
                    [{"summary": "Someone Else", "start": "2026-10-26", "end": "not a date"}]):
            with self.subTest(bad=bad), self.assertLogs("fitbridge", "WARNING"):
                res = fb.score_cycle(self.cfg, self.store, self.holder, None,
                                     FakeMqtt({"fitbridge/pauses": json.dumps(bad).encode()}), NOW)
                self.assertTrue(res["people"][P0]["week"]["paused"])

    def test_settings_and_steps_scored_and_bad_settings_keep_good_cache(self):
        good = {"history": [{"from": "2026-10-26", "people": {P0: {"runs": 1, "workouts": 0, "active_days": 1, "steps": 4000}}}]}
        steps = {P0: {"2026-10-27": 4500.7}}
        res = fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt(
            {"fitbridge/pauses": b"[]", "fitbridge/settings": json.dumps(good).encode(), "fitbridge/steps": json.dumps(steps).encode()}), NOW)
        week = res["people"][P0]["week"]
        self.assertEqual((week["goal"]["steps"], week["active_days"]), (4000, 1))
        self.assertIsNone(fb.LAST_SCORE["settings_error"])
        self.assertTrue(fb.LAST_SCORE["settings_as_of"] and fb.LAST_SCORE["steps_as_of"])
        for bad in ({"history": [{"from": "2026-10-27"}]}, {"history": [{"from": "2026-10-26", "couple": {"mode": "x"}}]}):
            with self.subTest(bad=bad), self.assertLogs("fitbridge", "WARNING"):
                res = fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt(
                    {"fitbridge/pauses": b"[]", "fitbridge/settings": json.dumps(bad).encode(), "fitbridge/steps": b"[]"}), NOW)
                self.assertEqual(res["people"][P0]["week"]["goal"]["steps"], 4000)     # cached settings and steps
                self.assertEqual(res["people"][P0]["week"]["active_days"], 1)
                self.assertIn("history[0]", fb.LAST_SCORE["settings_error"])
        with self.assertLogs("fitbridge", "WARNING"):                                   # unreadable JSON is invalid too
            fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt({"fitbridge/pauses": b"[]", "fitbridge/settings": b"{"}), NOW)
        self.assertTrue(fb.LAST_SCORE["settings_error"])
        fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt({"fitbridge/pauses": b"[]", "fitbridge/settings": json.dumps(good).encode()}), NOW)
        self.assertIsNone(fb.LAST_SCORE["settings_error"])                              # a good payload clears it

    def test_missing_settings_is_not_an_error(self):
        fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt(), NOW)
        self.assertEqual((fb.LAST_SCORE["settings_error"], fb.LAST_SCORE["settings_as_of"]), (None, None))

    def test_active_days_are_recorded_but_never_announced(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        steps = FakeMqtt({"fitbridge/pauses": b"[]", "fitbridge/steps": json.dumps({P0: {"2026-10-27": 12000}}).encode()})
        res = self.cycle(steps)
        self.assertEqual([w["kind"] for w in res["people"][P0]["feed"]], ["active_day"])
        self.cycle(steps)
        self.assertEqual(self.workout_events(steps), [])
        known = {r[0] for r in self.store.db.execute("SELECT key FROM announced_workouts WHERE person=?", (P0,))}
        self.assertEqual(known, {f"steps:{P0}:2026-10-27"})

    def test_steps_history_keeps_days_a_later_payload_lacks(self):
        settings = json.dumps({"history": [{"from": "2026-10-26", "people": {
            P0: {"runs": 0, "workouts": 0, "active_days": 2, "steps": 10000}}}]}).encode()

        def cycle(steps):
            res = fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt(
                {"fitbridge/pauses": b"[]", "fitbridge/settings": settings, "fitbridge/steps": json.dumps({P0: steps}).encode()}), NOW)
            r = res["people"][P0]
            return r["week"]["active_days"], r["xp"], r["streak"]

        first = cycle({"2026-10-26": 12000, "2026-10-27": 12000})
        self.assertEqual(first[0::2], (2, 1))
        self.assertEqual(cycle({"2026-10-27": 11000}), first)   # HA dropped the 26th and reports less: the higher counts stay

    def test_mqtt_failure_does_not_record_badges(self):
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), FakeMqtt(), NOW)          # seeds
        self.store.add(P0, "t2", "opentracks", "completed", activity_type="running", points=5,
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        with self.assertLogs("fitbridge", "WARNING"), self.assertRaises(ConnectionError):
            fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), FakeMqtt(fail=True), NOW)
        self.assertEqual(fb.LAST_SCORE["people"][P0]["week"]["runs"], 1)  # scored despite MQTT down
        fresh, announce = self.store.unseen_badges(P0, fb.LAST_SCORE["people"][P0]["badges"]["unlocked"])
        self.assertTrue(fresh and announce)
        mq = FakeMqtt()
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), mq, NOW)
        events = [json.loads(v) for t, v, _ in mq.published if t == "fitbridge/badge_unlocked"]
        self.assertEqual({(e["person"], e["id"]) for e in events}, {(P0, b["id"]) for b in fresh})
        self.assertEqual(self.store.unseen_badges(P0, fresh)[0], [])

    def cycle(self, mq):
        return fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), mq, NOW)

    def add_run(self, key, day="2026-10-27"):
        self.store.add(P0, key, "opentracks", "completed", activity_type="running", points=5,
                       start=f"{day}T18:00:00+01:00", end=f"{day}T18:30:00+01:00", duration_s=1800)

    @staticmethod
    def workout_events(mq):
        return [json.loads(v) for t, v, _ in mq.published if t == "fitbridge/workout_scored"]

    def test_scores_payload_published_retained_each_cycle(self):
        mq = FakeMqtt()
        self.add_run("t1")
        res = self.cycle(mq)
        (payload, retain), = [(v, r) for t, v, r in mq.published if t == "fitbridge/scores"]
        self.assertTrue(retain)
        self.assertEqual(json.loads(payload), json.loads(json.dumps(res)))
        self.assertEqual([w["key"] for w in json.loads(payload)["people"][P0]["feed"]], ["t1"])
        self.assertIn("scored_at", json.loads(payload))

    def test_first_cycle_is_silent_then_new_workout_announced_once(self):
        self.add_run("t1")
        mq = FakeMqtt()
        self.cycle(mq)
        self.assertEqual(self.workout_events(mq), [])
        self.add_run("t2", "2026-10-28")
        self.cycle(mq)
        self.cycle(mq)
        events = self.workout_events(mq)
        self.assertEqual([(e["person"], e["key"]) for e in events], [(P0, "t2")])
        self.assertEqual(events[0]["event_type"], "workout_scored")

    def test_workout_older_than_48_hours_is_recorded_without_announcing(self):
        later = NOW + timedelta(days=3)                       # 2026-10-31
        mq = FakeMqtt()
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), mq, later)  # seeds
        self.add_run("t1", "2026-10-27")                      # first scored days later, e.g. a stored home workout after deploy
        self.add_run("t2", "2026-10-30")
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([]), mq, later)
        self.assertEqual([e["key"] for e in self.workout_events(mq)], ["t2"])
        self.assertEqual(self.store.unseen_workouts(P0, fb.LAST_SCORE["people"][P0]["feed"])[0], [])

    def test_excluded_workout_not_announced(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        self.add_run("t1")
        self.store.set_excluded(P0, "t1", True)
        self.cycle(mq)
        self.store.set_excluded(P0, "t1", False)  # restoring it later is not news either
        self.cycle(mq)
        self.assertEqual(self.workout_events(mq), [])

    def test_late_route_does_not_reannounce(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        w = dict(hex_workout("R", "running"), routeFile="routes/r.gpx",  # inside the scoring window
                 startDate="2026-10-27T15:00:00Z", endDate="2026-10-27T15:30:00Z", duration=1800)
        fb.ingest_export(self.cfg, self.store, P1, hex_zip([w]))
        self.cycle(mq)
        fb.ingest_export(self.cfg, self.store, P1, hex_zip([w], {"routes/r.gpx": gpx_with_points()}))
        self.cycle(mq)
        self.assertEqual([(e["person"], e["key"]) for e in self.workout_events(mq)], [(P1, "R")])

    def test_longer_copy_from_another_source_is_not_announced_again(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        self.add_run("t1")
        self.cycle(mq)
        self.store.add(P0, "H", "health_exporter", "no_route", activity_type="running", indoor=1,  # longer, overlaps t1
                       start="2026-10-27T17:55:00+01:00", end="2026-10-27T18:40:00+01:00", duration_s=2700)
        self.cycle(mq)
        self.cycle(mq)
        self.assertEqual([e["key"] for e in self.workout_events(mq)], ["t1"])
        self.assertEqual(self.store.unseen_workouts(P0, fb.LAST_SCORE["people"][P0]["feed"])[0], [])

    def test_stop_start_continuation_is_not_announced_again(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        self.add_run("t1")
        self.cycle(mq)
        self.store.add(P0, "t3", "opentracks", "completed", activity_type="running", points=5,  # 10 min later, longer
                       start="2026-10-27T18:40:00+01:00", end="2026-10-27T19:30:00+01:00", duration_s=3000)
        self.cycle(mq)
        self.assertEqual([e["key"] for e in self.workout_events(mq)], ["t1"])

    def test_failed_publish_retries_announcement(self):
        mq = FakeMqtt()
        self.cycle(mq)  # seeds
        self.add_run("t1")
        with self.assertLogs("fitbridge", "WARNING"), self.assertRaises(ConnectionError):
            self.cycle(FakeMqtt(fail=True))
        self.cycle(mq)
        self.assertEqual([e["key"] for e in self.workout_events(mq)], ["t1"])

    def test_broken_toml_keeps_last_good(self):
        self.holder.get()
        self.toml_path.write_text("broken = [")
        os.utime(self.toml_path, (time.time() + 5, time.time() + 5))
        with self.assertLogs("fitbridge", "ERROR"):
            conf, err = self.holder.get()
        self.assertIsNotNone(conf)
        self.assertIn("TOML", err)

    def test_config_that_cannot_score_keeps_last_good(self):
        good, _ = self.holder.get()
        for i, (old, new) in enumerate([('title = "{t} runs"', 'title = "{n} runs"'),
                                        ("start = 2026-10-26", "start = 2026-10-26T00:00:00"),
                                        ("from = 2026-10-26", "from = 2026-10-26T00:00:00"),
                                        ("merge_gap_min = 30", "merge_gap_min = inf"),
                                        ("per_min = { run = 1", "per_min = { run = nan")]):
            with self.subTest(new=new):
                self.toml_path.write_text(DEFAULT.replace(old, new, 1), encoding="utf-8")
                os.utime(self.toml_path, (time.time() + 10 + i, time.time() + 10 + i))
                with self.assertLogs("fitbridge", "ERROR"):
                    conf, err = self.holder.get()
                self.assertIs(conf, good)
                self.assertIsNotNone(err)

    def test_no_good_config_skips_scoring(self):
        self.toml_path.write_text("broken = [")
        with self.assertLogs("fitbridge", "ERROR"):
            res = fb.score_cycle(self.cfg, self.store, self.holder, None, FakeMqtt(), NOW)
        self.assertNotIn("people", res)
        self.assertIn("TOML", res["config_error"])

    def test_get_scores_endpoint(self):
        server = ThreadingHTTPServer(("127.0.0.1", 0), fb.make_handler(self.cfg, self.store))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            self.assertEqual(http_get(server, "/scores"), {"error": "not scored yet"})
            fb.score_cycle(self.cfg, self.store, self.holder, None, None, NOW)
            self.assertIn("people", http_get(server, "/scores"))
            self.assertIn("workouts", http_get(server, "/"))
        finally:
            server.shutdown()
            server.server_close()

    def _names_og(self, file="exercises-a1.js", js='{"id":"0118","n":"bent over row","bp":"back"}', fail=False):
        routes = {"/": f'<link href="./assets/{file}">', f"/assets/{file}": js}
        opener = fake(routes)
        if fail:
            def opener(req, timeout=None):
                raise OSError("down")
            opener.paths = []
        return fb.opengym.OpenGym("http://og", lambda: "t", lambda t: None, opener=opener), opener

    def add_gpx_run(self, key, gpx, name=None, activity="running"):
        path = Path(self.tmp.name) / (name or f"{key}.gpx")
        path.write_bytes(gpx)
        self.store.add(P0, key, "opentracks", "completed", activity_type=activity, points=5, file=str(path),
                       start="2026-10-27T18:00:00+01:00", end="2026-10-27T18:30:00+01:00", duration_s=1800)
        return path

    def test_fill_best_km_reads_a_run_file_once(self):
        path = self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        self.add_gpx_run("t2", track([seg(1500, pace=300)]), activity="walking")
        res = self.cycle(FakeMqtt())
        self.assertEqual(self.store.best_km(), {(P0, "t1"): 300})        # the walk gets no row
        self.assertEqual(res["people"][P0]["pbs"]["fastest_1k"]["seconds"], 300)
        path.unlink()
        with self.assertNoLogs("fitbridge", "WARNING"):
            res = self.cycle(FakeMqtt())
        self.assertEqual(res["people"][P0]["pbs"]["fastest_1k"]["seconds"], 300)

    def test_fill_best_km_stores_null_for_a_missing_or_unparseable_file_once(self):
        self.add_gpx_run("gone", b"")
        self.store.update(P0, "gone", file=str(Path(self.tmp.name) / "nope.gpx"))
        self.add_gpx_run("bad", track([seg(1500)]))
        with mock.patch.object(fb.records, "fastest_1k_s", side_effect=TypeError("naive vs aware")):
            with self.assertLogs("fitbridge", "WARNING") as logs:
                res = self.cycle(FakeMqtt())
        self.assertEqual(self.store.best_km(), {(P0, "gone"): None, (P0, "bad"): None})
        self.assertEqual(sorted(l.split(":")[-1].strip() for l in logs.output if "best 1 km" in l),
                         ["FileNotFoundError", "TypeError"])
        self.assertNotIn("naive", "".join(logs.output))
        self.assertIsNone(res["people"][P0]["pbs"]["fastest_1k"])
        with self.assertNoLogs("fitbridge", "WARNING"):
            self.cycle(FakeMqtt())

    def test_old_gym_cache_without_lifts_scores_as_no_lifts(self):
        fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([GYM]), None, NOW)
        cache = json.loads(self.store.kv_get("gym_cache"))
        for w in cache[P0]:
            del w["lifts"], w["unit"]
        self.store.kv_set("gym_cache", json.dumps(cache))
        with self.assertLogs("fitbridge", "WARNING"):
            res = fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym(raise_=OSError()), None, NOW)
        self.assertEqual(res["people"][P0]["week"]["workouts"], 1)
        self.assertEqual(res["people"][P0]["pbs"]["lifts"], [])

    def test_scores_carry_lift_and_run_records(self):
        gym = {**GYM, "entries": [{"id": "0118", "sets": [{"w": 70, "r": 5, "done": True}]},
                                  {"id": "0200", "sets": [{"w": 20, "r": 5, "done": True}]}]}
        self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        server = ThreadingHTTPServer(("127.0.0.1", 0), fb.make_handler(self.cfg, self.store))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        try:
            fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym([gym]), None, NOW)
            pbs = http_get(server, "/scores")["people"][P0]["pbs"]
        finally:
            server.shutdown()
            server.server_close()
        self.assertEqual([(x["id"], x["name"], x["w"], x["r"], x["unit"], x["date"]) for x in pbs["lifts"]],
                         [("0118", "Bent over row", 70, 5, "kg", "2026-10-27"),
                          ("0200", "Exercise 0200", 20, 5, "kg", "2026-10-27")])
        self.assertEqual([(x["group"], x["sessions"]) for x in pbs["lifts"]], [("Back", 1), ("Other", 1)])
        self.assertEqual((pbs["fastest_1k"]["seconds"], pbs["fastest_1k"]["key"], pbs["fastest_1k"]["date"]),
                         (300, "t1", "2026-10-27"))

    @staticmethod
    def gym(w, r, gid="g1", hours=0):
        start = _GYM_START + hours * 3600_000
        return {**GYM, "id": gid, "start": start, "end": start + 3600_000,
                "entries": [{"id": "0118", "sets": [{"w": w, "r": r, "done": True}]}]}

    @staticmethod
    def record_events(mq):
        return [json.loads(v) for t, v, _ in mq.published if t == "fitbridge/record_set"]

    def gym_cycle(self, mq, *sessions, now=NOW):
        return fb.score_cycle(self.cfg, self.store, self.holder, FakeOpenGym(list(sessions)), mq, now)

    def test_better_lift_is_announced_once_after_a_silent_first_pass(self):
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5))
        self.assertEqual(self.record_events(mq), [])
        self.assertEqual(self.store.records(P0), ({"lift:0118": 70005}, True))
        self.gym_cycle(mq, self.gym(70, 5), self.gym(72.5, 5, "g2", hours=2))
        self.gym_cycle(mq, self.gym(70, 5), self.gym(72.5, 5, "g2", hours=2))
        (ev,) = self.record_events(mq)
        self.assertEqual((ev["event_type"], ev["person"], ev["key"], ev["fastest_1k"]), ("record_set", P0, "opengym:g2", None))
        self.assertEqual(ev["lifts"], [{"name": "Bent over row", "w": 72.5, "r": 5, "unit": "kg"}])

    def test_faster_kilometre_is_announced(self):
        mq = FakeMqtt()
        self.add_gpx_run("t1", track([seg(1500, pace=300)]))
        self.cycle(mq)
        self.add_gpx_run("t2", track([seg(1500, pace=280)]))
        self.store.update(P0, "t2", start="2026-10-28T08:00:00+01:00", end="2026-10-28T08:30:00+01:00")  # not a copy of t1
        self.cycle(mq)
        (ev,) = self.record_events(mq)
        self.assertEqual((ev["key"], ev["lifts"], ev["fastest_1k"]), ("t2", [], 280))

    def test_publish_failure_keeps_records_unsaved_and_next_cycle_announces(self):
        self.gym_cycle(FakeMqtt(), self.gym(70, 5))
        better = self.gym(75, 5, "g2", hours=2)
        with self.assertLogs("fitbridge", "WARNING"), self.assertRaises(ConnectionError):
            self.gym_cycle(FakeMqtt(fail=True), self.gym(70, 5), better)
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 70005})
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5), better)
        self.assertEqual([e["key"] for e in self.record_events(mq)], ["opengym:g2"])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 75005})

    def test_without_mqtt_nothing_is_saved_so_the_first_publish_is_still_silent(self):
        self.gym_cycle(None, self.gym(70, 5))
        self.assertEqual(self.store.records(P0), ({}, False))
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5))
        self.assertEqual((self.record_events(mq), self.store.records(P0)), ([], ({"lift:0118": 70005}, True)))

    def test_improvement_in_a_workout_older_than_48_hours_is_stored_silently(self):
        later = NOW + timedelta(days=3)
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5), now=later)
        self.gym_cycle(mq, self.gym(70, 5), self.gym(80, 5, "g2", hours=2), now=later)  # e.g. a restored old session
        self.assertEqual(self.record_events(mq), [])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 80005})

    def test_whole_number_weights_stay_whole_in_scores_and_the_record_event(self):
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5))
        res = self.gym_cycle(mq, self.gym(70, 5), self.gym(70, 6, "g2", hours=2))
        payload = next(v for t, v, _ in mq.published if t == "fitbridge/record_set")
        self.assertIn('"w": 70,', payload)
        self.assertNotIn("70.0", payload)
        self.assertIsInstance(res["people"][P0]["pbs"]["lifts"][0]["w"], int)
        self.assertNotIn('"w": 70.0', self.store.kv_get("gym_cache"))

    def test_removing_and_restoring_the_record_workout_announces_it_once(self):
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5), self.gym(75, 5, "g2", hours=2))   # first pass
        self.gym_cycle(mq, self.gym(70, 5), self.gym(80, 5, "g3", hours=5))
        self.assertEqual(len(self.record_events(mq)), 1)
        self.gym_cycle(mq, self.gym(70, 5), self.gym(75, 5, "g2", hours=2))   # g3 removed: lower value stored
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 75005})
        self.gym_cycle(mq, self.gym(70, 5), self.gym(75, 5, "g2", hours=2), self.gym(80, 5, "g3", hours=5))  # restored
        self.assertEqual(len(self.record_events(mq)), 1)
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 80005})

    def test_the_same_workout_improving_a_record_it_holds_is_silent(self):
        mq = FakeMqtt()
        self.gym_cycle(mq, self.gym(70, 5))
        self.gym_cycle(mq, self.gym(70, 5), self.gym(72, 5, "g2", hours=2))
        self.gym_cycle(mq, self.gym(70, 5), self.gym(74, 5, "g2", hours=2))   # g2 improved in place
        self.assertEqual([e["key"] for e in self.record_events(mq)], ["opengym:g2"])
        self.assertEqual(self.store.records(P0)[0], {"lift:0118": 74005})
        self.gym_cycle(mq, self.gym(70, 5), self.gym(74, 5, "g2", hours=2), self.gym(76, 5, "g3", hours=5))
        self.assertEqual([e["key"] for e in self.record_events(mq)], ["opengym:g2", "opengym:g3"])

    def test_exercise_catalog_cached_fetches_once_per_file_name(self):
        og, opener = self._names_og()
        self.assertEqual(fb.exercise_catalog_cached(og, self.store, NOW), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/", "/assets/exercises-a1.js"])
        self.assertEqual(json.loads(self.store.kv_get("opengym_exercises")),
                         {"file": "assets/exercises-a1.js", "version": 2, "exercises": {"0118": {"name": "Bent over row", "bp": "back"}}})
        later = NOW + timedelta(hours=2)
        self.assertEqual(fb.exercise_catalog_cached(og, self.store, later), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths[2:], ["/"])                      # same file: no bundle fetch
        og2, opener2 = self._names_og("exercises-b2.js", '{"id":"0119","n":"squat","bp":"upper legs"}')
        self.assertEqual(fb.exercise_catalog_cached(og2, self.store, later + timedelta(hours=2)),
                         {"0119": {"name": "Squat", "bp": "upper legs"}})
        self.assertEqual(opener2.paths, ["/", "/assets/exercises-b2.js"])

    def test_exercise_catalog_from_before_body_parts_is_refetched_under_the_same_file_name(self):
        self.store.kv_set("opengym_exercises", json.dumps({"file": "assets/exercises-a1.js", "names": {"0118": "Bent over row"}}))
        og, opener = self._names_og()
        self.assertEqual(fb.exercise_catalog_cached(og, self.store, NOW), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/", "/assets/exercises-a1.js"])

    def test_exercise_catalog_from_before_body_parts_serves_its_names_when_the_refetch_fails(self):
        self.store.kv_set("opengym_exercises", json.dumps({"file": "assets/exercises-a1.js", "names": {"0118": "Bent over row"}}))
        bad, _ = self._names_og(fail=True)
        with self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.exercise_catalog_cached(bad, self.store, NOW), {"0118": {"name": "Bent over row", "bp": ""}})
        self.assertEqual(fb.exercise_catalog_cached(None, self.store, NOW), {"0118": {"name": "Bent over row", "bp": ""}})

    def test_exercise_catalog_failure_serves_cache_and_retries_hourly(self):
        og, _ = self._names_og()
        fb.exercise_catalog_cached(og, self.store, NOW)
        bad, bad_opener = self._names_og(fail=True)
        calls = []
        bad.opener = lambda req, timeout=None: calls.append(1) or bad_opener(req, timeout)
        t = NOW + timedelta(hours=2)
        with self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.exercise_catalog_cached(bad, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(len(calls), 1)
        fb.exercise_catalog_cached(bad, self.store, t + timedelta(minutes=30))
        self.assertEqual(len(calls), 1)                                 # tried < 1 h ago: no request
        with self.assertLogs("fitbridge", "WARNING"):
            fb.exercise_catalog_cached(bad, self.store, t + timedelta(minutes=61))
        self.assertEqual(len(calls), 2)

    def test_exercise_catalog_index_without_bundle_counts_as_failure(self):
        og, _ = self._names_og()
        fb.exercise_catalog_cached(og, self.store, NOW)
        opener = fake({"/": "<html>changed</html>"})
        changed = fb.opengym.OpenGym("http://og", lambda: "t", lambda t: None, opener=opener)
        t = NOW + timedelta(hours=2)
        with self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.exercise_catalog_cached(changed, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(opener.paths, ["/"])
        fb.exercise_catalog_cached(changed, self.store, t + timedelta(minutes=30))
        self.assertEqual(opener.paths, ["/"])                           # waits an hour

    def test_exercise_catalog_new_bundle_without_names_keeps_the_cache_and_backs_off(self):
        og, _ = self._names_og()
        fb.exercise_catalog_cached(og, self.store, NOW)
        changed, opener = self._names_og("exercises-b2.js", "not a bundle")
        t = NOW + timedelta(hours=2)
        with self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.exercise_catalog_cached(changed, self.store, t), {"0118": {"name": "Bent over row", "bp": "back"}})
        n = len(opener.paths)
        self.assertEqual(fb.exercise_catalog_cached(changed, self.store, t + timedelta(minutes=30)),
                         {"0118": {"name": "Bent over row", "bp": "back"}})
        self.assertEqual(len(opener.paths), n)                          # waits an hour

    def test_exercise_catalog_without_cache_or_opengym_is_empty(self):
        self.assertEqual(fb.exercise_catalog_cached(None, self.store, NOW), {})
        bad, _ = self._names_og(fail=True)
        with self.assertLogs("fitbridge", "WARNING"):
            self.assertEqual(fb.exercise_catalog_cached(bad, self.store, NOW + timedelta(hours=2)), {})

    def test_env_token_seeds_db_once(self):
        self.cfg.opengym_token = "t1"
        fb.seed_opengym_token(self.cfg, self.store)
        self.store.kv_set("opengym_token", "renewed")
        fb.seed_opengym_token(self.cfg, self.store)           # same env token: keep the renewed one
        self.assertEqual(self.store.kv_get("opengym_token"), "renewed")
        self.cfg.opengym_token = "t2"                         # re-paired: env wins
        fb.seed_opengym_token(self.cfg, self.store)
        self.assertEqual(self.store.kv_get("opengym_token"), "t2")


if __name__ == "__main__":
    unittest.main()
