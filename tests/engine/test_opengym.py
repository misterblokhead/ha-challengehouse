import io
import json
import unittest
import urllib.error

from custom_components.fitbridge.engine.opengym import OpenGym, OpenGymAuthError, fetch_all, person_for, to_workout
from custom_components.fitbridge.engine.scoring_config import load_config
from .test_config import DEFAULT

PEOPLE = tuple(load_config(DEFAULT)["people"])
P0, P1 = PEOPLE[0], PEOPLE[-1]


def fake(routes, status=200):
    """Opener returning canned JSON (or raw text for str routes) per path; records request headers and calls."""
    class Opener:
        def __init__(self):
            self.headers, self.paths = [], []

        def __call__(self, req, timeout=None):
            self.headers.append(dict(req.header_items()))
            self.timeout = timeout
            path = req.full_url.split("://", 1)[1].split("/", 1)[1]
            self.paths.append("/" + path)
            if status != 200:
                raise urllib.error.HTTPError(req.full_url, status, "x", {}, None)
            body = routes["/" + path]
            return io.BytesIO((body if isinstance(body, str) else json.dumps(body)).encode())
    return Opener()


class OpenGymTests(unittest.TestCase):
    def test_mapping_explicit_uid_only(self):
        self.assertEqual(person_for({"id": "u1", "name": "Whatever"}, {P0: "u1"}), P0)
        self.assertIsNone(person_for({"id": "u2", "name": P1}, {P0: "u1"}))

    def test_to_workout_and_invalid_sessions(self):
        ok = to_workout({"id": "w1", "start": 1793030000000, "end": 1793033600000, "vol": 5200, "prs": ["bench"], "name": "Push"}, P0, "https://gym")
        self.assertEqual((ok["duration_s"], ok["vol_kg"], ok["key"]), (3600, 5200, "opengym:w1"))
        self.assertEqual((ok["kind"], ok["indoor"], ok["prs"], ok["start"].utcoffset().total_seconds()), ("gym", True, ["bench"], 0))
        self.assertEqual((ok["url"], to_workout({"id": "w", "start": 1, "end": 2}, P0, "")["url"]), ("https://gym", None))
        for bad in [{"id": "a", "start": 1}, {"id": "b", "start": 5, "end": 5}, {"id": "c", "start": 0, "end": 13 * 3600 * 1000}]:
            self.assertIsNone(to_workout(bad, P0, "x"))

    def test_fetch_all_with_unregistered_person(self):
        og = OpenGym("http://og", lambda: "t", lambda t: None, opener=fake({
            "/api/admin/users": {"users": [{"id": "u1", "name": "A"}, {"id": "u9", "name": "Stranger"}]},
            "/api/admin/user?id=u1": {"unit": "lb", "workouts": [{"id": "w", "start": 1, "end": 3600001}, {"id": "bad", "start": 1}]}}))
        out = fetch_all(og, {P0: "u1"}, PEOPLE, "x")
        self.assertEqual(set(out), set(PEOPLE))
        self.assertEqual((len(out[P0]), out[P0][0]["unit"]), (1, "lb"))
        if P1 != P0:
            self.assertEqual(out[P1], [])

    def test_unit_defaults_to_kg_and_anything_but_lb_is_kg(self):
        for detail, unit in [({}, "kg"), ({"unit": "stone"}, "kg"), ({"unit": "lb"}, "lb")]:
            og = OpenGym("http://og", lambda: "t", lambda t: None, opener=fake({
                "/api/admin/users": {"users": [{"id": "u1"}]},
                "/api/admin/user?id=u1": {**detail, "workouts": [{"id": "w", "start": 1, "end": 3600001}]}}))
            self.assertEqual(fetch_all(og, {P0: "u1"}, PEOPLE, "x")[P0][0]["unit"], unit)

    def test_to_workout_carries_best_sets_and_unit(self):
        raw = {"id": "w", "start": 1, "end": 3600001,
               "entries": [{"id": "0118", "sets": [{"w": 60, "r": 8, "done": True}, {"w": 70, "r": 5, "done": True}]}]}
        w = to_workout(raw, P0, "x", unit="lb")
        self.assertEqual((w["lifts"], w["unit"]), ({"0118": {"w": 70.0, "r": 5}}, "lb"))
        none = to_workout({"id": "w", "start": 1, "end": 3600001}, P0, "x")
        self.assertEqual((none["lifts"], none["unit"]), ({}, "kg"))

    def test_malformed_entries_do_not_raise(self):
        done = {"w": 50, "r": 5, "done": True}
        for entries in ["oops", 7, {"id": "a"}, [None, "x", 3], [{"id": "a", "sets": "s"}],
                        [{"id": ["x"], "sets": [done]}, {"id": 5, "sets": [done]}, {"id": "a", "sets": [None, {"w": "heavy", "r": 5, "done": True}, {"w": 50, "r": "5", "done": True}]}]]:
            w = to_workout({"id": "w", "start": 1, "end": 3600001, "entries": entries}, P0, "x")
            self.assertEqual(w["lifts"], {})
        w = to_workout({"id": "w", "start": 1, "end": 3600001, "entries": [None, {"id": "b", "sets": [done]}]}, P0, "x")
        self.assertEqual(w["lifts"], {"b": {"w": 50.0, "r": 5}})  # one bad entry keeps the good ones

    def test_exercise_file_found_in_index_page(self):
        page = '<script type="module" src="./assets/index-Ab1.js"></script><link href="./assets/exercises-x9_Z-1.js">'
        og = OpenGym("http://og", lambda: "t", lambda t: None, opener=fake({"/": page}))
        self.assertEqual(og.exercise_file(), "assets/exercises-x9_Z-1.js")
        self.assertIsNone(OpenGym("http://og", lambda: "t", lambda t: None, opener=fake({"/": "<html></html>"})).exercise_file())

    def test_text_sends_no_auth_header(self):
        opener = fake({"/assets/e.js": "body"})
        self.assertEqual(OpenGym("http://og", lambda: "t", lambda t: None, opener=opener).text("/assets/e.js"), "body")
        self.assertEqual((opener.headers[-1].get("Authorization"), opener.timeout), (None, 30))

    def test_bad_rows_are_skipped_not_fatal(self):
        good = {"id": "w", "start": 1, "end": 3600001}
        bad = [{"start": 1, "end": 3600001},                              # no id
               {"id": "n", "start": float("nan"), "end": 3600001},
               {"id": "h", "start": 1e17, "end": 1e17 + 3600000},         # beyond datetime's range
               {"id": "v", "start": 1, "end": 3600001, "vol": "heavy"}]
        og = OpenGym("http://og", lambda: "t", lambda t: None, opener=fake({
            "/api/admin/users": {"users": [{"id": "u1"}]}, "/api/admin/user?id=u1": {"workouts": bad + [good]}}))
        self.assertEqual([w["key"] for w in fetch_all(og, {P0: "u1"}, PEOPLE, "x")[P0]], ["opengym:w"])

    def test_renew_saves_new_token_and_bearer_header(self):
        saved = []
        opener = fake({"/api/me": {"user": {}, "token": "new"}})
        OpenGym("http://og", lambda: "old", saved.append, opener=opener).renew_token()
        self.assertEqual((saved, opener.headers[-1]["Authorization"], opener.timeout), (["new"], "Bearer old", 30))

    def test_renew_without_token_saves_nothing(self):
        saved = []
        OpenGym("http://og", lambda: "old", saved.append, opener=fake({"/api/me": {"user": {}}})).renew_token()
        self.assertEqual(saved, [])

    def test_401_raises_auth_error_without_token(self):
        og = OpenGym("http://og", lambda: "s3cret", lambda t: None, opener=fake({}, status=401))
        with self.assertRaises(OpenGymAuthError) as e:
            og.users()
        self.assertNotIn("s3cret", str(e.exception))


if __name__ == "__main__":
    unittest.main()
