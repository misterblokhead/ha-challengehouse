import json
from datetime import date

import pytest

from custom_components.fitbridge.settings import current, monday_of, put, validate

P = {"runs": 2, "workouts": 1, "active_days": 3, "steps": 10000}
BODY = {"people": {"p1": P, "p2": {**P, "runs": 0}}, "couple": {"mode": "team", "together": 2, "team": 8, "reward": "Pizza night"}}
MON, NEXT = date(2026, 10, 26), date(2026, 11, 2)


def test_validate_accepts_a_complete_entry_and_drops_extra_keys():
    assert validate(BODY, ["p1", "p2"]) == BODY
    noisy = {**BODY, "from": "x", "people": {"p1": {**P, "x": 1}, "p2": P}}
    assert validate(noisy, ["p1", "p2"])["people"]["p1"] == P
    empty_reward = {**BODY, "couple": {**BODY["couple"], "reward": ""}}
    assert validate(empty_reward, ["p1", "p2"])["couple"]["reward"] == ""  # may be empty


def _with(person=None, couple=None):
    return {"people": {"p1": {**P, **(person or {})}, "p2": P}, "couple": {**BODY["couple"], **(couple or {})}}


@pytest.mark.parametrize("body,field", [
    (_with(person={"runs": 8}), "people.p1.runs"),
    (_with(person={"workouts": -1}), "people.p1.workouts"),
    (_with(person={"active_days": 1.5}), "people.p1.active_days"),
    (_with(person={"active_days": True}), "people.p1.active_days"),
    (_with(person={"runs": "2"}), "people.p1.runs"),
    (_with(person={"steps": 1000}), "people.p1.steps"),
    (_with(person={"steps": 31000}), "people.p1.steps"),
    (_with(person={"steps": 10500}), "people.p1.steps"),
    (_with(couple={"mode": "both"}), "couple.mode"),
    (_with(couple={"together": 0}), "couple.together"),
    (_with(couple={"together": 4}), "couple.together"),
    (_with(couple={"team": 0}), "couple.team"),
    (_with(couple={"team": 43}), "couple.team"),
    (_with(couple={"reward": "x" * 61}), "couple.reward"),
    (_with(couple={"reward": None}), "couple.reward"),
    ({"people": {"p1": P}, "couple": BODY["couple"]}, "people.p2"),  # every person is required
    ({"people": {"p1": P, "p2": P, "p3": P}, "couple": BODY["couple"]}, "people.p3"),  # and no stranger
    ({"people": {"p1": P, "p2": P}}, "couple"),
    ({"couple": BODY["couple"]}, "people"),
    ([], "body"),
])
def test_validate_names_the_field(body, field):
    with pytest.raises(ValueError, match=f"^{field}: "):
        validate(body, ["p1", "p2"])


def test_put_replaces_the_same_monday_and_keeps_order():
    first = put([], {"n": 1}, NEXT)
    assert first == [{"from": "2026-11-02", "n": 1}]
    assert put(first, {"n": 2}, NEXT) == [{"from": "2026-11-02", "n": 2}]  # same week: replaced
    assert put(first, {"n": 3}, MON) == [{"from": "2026-10-26", "n": 3}, {"from": "2026-11-02", "n": 1}]
    assert put(first, {"n": 4}, date(2026, 11, 9))[-1] == {"from": "2026-11-09", "n": 4}  # a later week appends


def test_current_is_the_last_entry_not_after_the_week():
    history = [{"from": "2026-10-12"}, {"from": "2026-10-26"}]
    assert current(history, MON) == history[1] and current(history, date(2026, 10, 19)) == history[0]
    assert current(history, date(2026, 10, 5)) is None and current([], MON) is None


def test_monday_of():
    assert [monday_of(date(2026, 10, d)) for d in (26, 27, 31)] == [MON] * 3 and monday_of(date(2026, 11, 1)) == MON


def test_a_published_history_passes_fitbridges_own_parser():
    from custom_components.fitbridge.engine.scoring_config import parse_settings
    entry = validate(BODY, ["p1", "p2"])
    history = put(put([], entry, NEXT), entry, MON)  # out-of-order saves still publish sorted
    assert parse_settings(json.loads(json.dumps({"history": history})), {"p1", "p2"}) == {"history": history}
