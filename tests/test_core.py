import json

import pytest

from custom_components.fitbridge import core
from custom_components.fitbridge.const import MANUAL_PREFIX

SCORES = {"people": {"p1": {"feed": []}, "p2": {"feed": [{"key": "k1"}, {"key": "k2", "excluded": True}]}}}


def test_parse_scores_valid_str_and_bytes():
    raw = json.dumps(SCORES)
    assert core.parse_scores(raw) == SCORES
    assert core.parse_scores(raw.encode()) == SCORES


@pytest.mark.parametrize("raw", [
    "not json", b"\xff\xfe", "[]", "null", "{}",
    json.dumps({"people": []}),
    json.dumps({"people": {"p1": {}}}),
    json.dumps({"people": {"p1": {"feed": "x"}}}),
    json.dumps({"people": {"p1": []}}),
    json.dumps({"people": {"p1": {"feed": [{"key": "k1"}, "k2"]}}}),
])
def test_parse_scores_invalid(raw):
    assert core.parse_scores(raw) is None


def test_viewer_person():
    viewers = {"u1": "p1", "u2": "ghost"}
    assert core.viewer_person("u1", viewers, SCORES) == "p1"
    assert core.viewer_person("u2", viewers, SCORES) is None  # mapped to a person not in the payload
    assert core.viewer_person("u3", viewers, SCORES) is None


@pytest.mark.parametrize("person,admin,target,expected", [
    (None, False, "p1", False),
    (None, True, "p1", False),
    ("p1", True, "p2", True),
    ("p1", False, "p1", True),
    ("p1", False, "p2", False),
])
def test_can_edit(person, admin, target, expected):
    assert core.can_edit(person, admin, target) is expected


def test_shape_adds_viewer():
    out = core.shape(SCORES, "p1", False)
    assert out["viewer"] == {"person": "p1", "can_edit": ["p1"]}
    assert out["people"] == SCORES["people"]
    assert "viewer" not in SCORES
    assert core.shape(SCORES, "p1", True)["viewer"]["can_edit"] == ["p1", "p2"]
    assert core.shape(SCORES, None, True)["viewer"] == {"person": None, "can_edit": []}


def test_find_workout():
    assert core.find_workout(SCORES, "p2", "k2") == {"key": "k2", "excluded": True}
    assert core.find_workout(SCORES, "p2", "nope") is None
    assert core.find_workout(SCORES, "ghost", "k1") is None


@pytest.mark.parametrize("action", ["remove", "restore"])
def test_manual_message(action):
    topic, payload = core.manual_message(action, "p1", "k1", "m-1")
    assert topic == MANUAL_PREFIX + "m-1" == "fitbridge/manual/m-1"
    assert json.loads(payload) == {"action": action, "person": "p1", "key": "k1"}


def test_manual_message_bad_action():
    with pytest.raises(ValueError):
        core.manual_message("delete", "p1", "k1", "m-1")
