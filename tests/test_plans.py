"""Custom plans: validation, ids, store load (synthetic data only)."""
import copy
import logging

import pytest

from custom_components.fitbridge import plans

SESSION = {"warmup_s": 300, "cooldown_s": 300, "intervals": [["run", 60], ["walk", 90]], "times": 8,
           "target": {"type": "duration"}, "note": "easy", "junk": 1}
BODY = {"name": "Mine", "loop": True, "extra": 1, "weeks": [
    {"sessions": [SESSION, {"warmup_s": 0, "target": {"type": "distance", "km": 5}}, {"warmup_s": 0, "target": {"type": "none"}}],
     "repeat": 3}]}


def test_validate_accepts_a_builder_plan_and_sets_fractions():
    out = plans.validate(copy.deepcopy(BODY))
    assert out == {"name": "Mine", "loop": True, "weeks": [{"sessions": [
        {"warmup_s": 300, "cooldown_s": 300, "intervals": [["run", 60], ["walk", 90]], "times": 8,
         "target": {"type": "duration", "fraction": 0.8}, "note": "easy"},
        {"warmup_s": 0, "target": {"type": "distance", "km": 5, "fraction": 0.9}},
        {"warmup_s": 0, "target": {"type": "none"}}]}]}
    assert plans.validate({"name": "x", "weeks": BODY["weeks"]})["loop"] is False


def _body(**session):
    return {"name": "Mine", "weeks": [{"sessions": [{"warmup_s": 0, "target": {"type": "duration"}, **session}]}]}


@pytest.mark.parametrize("body, field", [
    ({**BODY, "name": "x" * 41}, "name"),
    ({**BODY, "name": ""}, "name"),
    ({**BODY, "weeks": [BODY["weeks"][0]] * 53}, "weeks"),
    ({"name": "x", "weeks": [{"sessions": [SESSION] * 8}]}, "weeks.1.sessions"),
    ({"name": "x", "weeks": [{"sessions": []}]}, "weeks.1.sessions"),
    (_body(intervals=[["run", 60]] * 31), "weeks.1.sessions.1.intervals"),
    (_body(intervals=[["run", 60], ["walk", 0]]), "weeks.1.sessions.1.intervals.2"),
    (_body(intervals=[["run", 10801]]), "weeks.1.sessions.1.intervals.1"),
    (_body(times=51), "weeks.1.sessions.1.times"),
    (_body(target={"type": "distance", "km": 0.05}), "weeks.1.sessions.1.target.km"),
    (_body(target={"type": "distance", "km": 101}), "weeks.1.sessions.1.target.km"),
    *[(_body(target={"type": "distance", "km": km}), "weeks.1.sessions.1.target.km")
      for km in (10**400, float("nan"), float("inf"), True, "5", None)],
    (_body(note="n" * 81), "weeks.1.sessions.1.note"),
    (_body(warmup_s=10801), "weeks.1.sessions.1.warmup_s"),
    ("nope", "body"),
])
def test_validate_refuses_over_the_limits(body, field):
    with pytest.raises(ValueError) as e:
        plans.validate(body)
    assert str(e.value).startswith(f"{field}: ")


def test_validate_accepts_the_limits():
    plans.validate({"name": "x" * 40, "weeks": [{"sessions": [
        {"warmup_s": 10800, "cooldown_s": 10800, "intervals": [["run", 10800]] * 30, "times": 50,
         "target": {"type": "distance", "km": 0.1}, "note": "n" * 80}] * 7}] * 52})


def test_new_id_prefixes_and_dedupes():
    assert plans.new_id("Long run", set()) == "my_long_run"
    assert plans.new_id("Long run", {"my_long_run"}) == "my_long_run_2"
    assert plans.new_id("Long run", {"my_long_run", "my_long_run_2"}) == "my_long_run_3"


def test_used_collects_history_plans():
    options = {"people": {"p1": {"plan_history": [{"plan": "my_a", "from": "2026-11-01"}, {"plan": None, "from": "2026-11-02"}]},
                          "p2": {"plan_history": [{"plan": "c25k", "from": "2026-11-01"}]}, "p3": {"name": "no history"}}}
    assert plans.used(options) == {"my_a", "c25k"}
    assert plans.used({}) == set()


class _Store:
    def __init__(self, data):
        self.data = data

    async def async_load(self):
        return self.data


async def test_load_skips_a_bad_stored_plan(caplog):
    good = plans.validate(copy.deepcopy(BODY))
    bad = {**good, "name": ""}
    with caplog.at_level(logging.WARNING):
        out = await plans.load(_Store({"plans": {"my_good": {**good, "by": "p1"}, "my_bad": bad, "my_odd": "x"}}))
    assert out == {"my_good": {**good, "by": "p1"}}
    assert "Skipping custom plan my_bad" in caplog.text and "Skipping custom plan my_odd" in caplog.text


@pytest.mark.parametrize("data", [None, [], {}, {"plans": []}, {"plans": None}])
async def test_load_of_nothing_is_empty(data):
    assert await plans.load(_Store(data)) == {}
