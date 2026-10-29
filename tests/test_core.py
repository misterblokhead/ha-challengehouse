import pytest

from custom_components.fitbridge import core

SCORES = {"people": {"p1": {"feed": []}, "p2": {"feed": [{"key": "k1"}, {"key": "k2", "excluded": True}]}}}


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


@pytest.mark.parametrize("person,admin,target,expected", [
    (None, True, "p1", True),
    (None, False, "p1", False),
    ("p1", False, "p1", True),
    ("p1", False, "p2", False),
    ("p1", True, "p2", True),
])
def test_can_connect(person, admin, target, expected):
    assert core.can_connect(person, admin, target) is expected


def test_shape_adds_viewer():
    out = core.shape(SCORES, "p1", False)
    assert out["viewer"] == {"person": "p1", "can_edit": ["p1"], "can_connect": ["p1"]}
    assert out["people"] == {p: {**r, "shoes": [], "steps_today": None, "steps_week": None} for p, r in SCORES["people"].items()}
    assert "viewer" not in SCORES and "shoes" not in SCORES["people"]["p1"]
    assert core.shape(SCORES, "p1", True)["viewer"]["can_edit"] == ["p1", "p2"]
    assert core.shape(SCORES, None, True)["viewer"] == {"person": None, "can_edit": [], "can_connect": ["p1", "p2"]}


def test_public_drops_older_and_keeps_an_error_payload():
    assert core.public({"x": 1, "people": {"p1": {"feed": [], "older": [{"key": "k"}]}}}) == {"x": 1, "people": {"p1": {"feed": []}}}
    assert core.public({"error": "no valid scoring config"}) == {"error": "no valid scoring config"}


def test_find_workout():
    assert core.find_workout(SCORES, "p2", "k2") == {"key": "k2", "excluded": True}
    assert core.find_workout(SCORES, "p2", "nope") is None
    assert core.find_workout(SCORES, "ghost", "k1") is None


def test_find_workout_reaches_a_workout_from_before_the_start():
    from custom_components.fitbridge.engine.scoring import score
    from tests.engine.test_scoring import CFG, NOW, wk
    early = wk("p", "run", -30, 18, 0, 30)  # a month before the shipped rules.start
    scores = score({"person1": [early], "person2": []}, [], CFG, NOW(1))
    assert core.find_workout(scores, "person1", early["key"])["key"] == early["key"]


def test_shape_adds_steps_today_per_person():
    out = core.shape(SCORES, None, False, {"p1": 812, "ghost": 5})
    assert out["people"]["p1"]["steps_today"] == 812 and out["people"]["p2"]["steps_today"] is None


def test_shape_adds_steps_week_per_person():
    out = core.shape(SCORES, None, False, None, {"p1": {"2026-10-26": 12000}, "ghost": {}})
    assert out["people"]["p1"]["steps_week"] == {"2026-10-26": 12000} and out["people"]["p2"]["steps_week"] is None
