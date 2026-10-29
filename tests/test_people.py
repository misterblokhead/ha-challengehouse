"""People, group and start date as the entry's options hold them (synthetic data only)."""
from datetime import date

from custom_components.fitbridge import people
from custom_components.fitbridge.const import OPT_GROUP, OPT_PEOPLE, OPT_START

TOML = """
[rules]
start = 2026-10-26
timezone = "Europe/Amsterdam"

[people.person1]
name = "Person 1"
plan_history = [{ plan = "c25k", from = 2026-10-26 }, { plan = "free", from = 2026-12-01 }]
goal = { runs = 3 }

[people.person2]
name = "Person 2"

[group]
name = "couple"
members = ["person1", "person2"]
"""


def test_make_ids():
    assert people.make_ids(["Zoë", "zoe", "🏃", "Person 1"]) == ["zoe", "zoe_2", "person1", "person_1"]
    assert people.make_ids(["Sam"], taken=["sam"]) == ["sam_2"]
    assert people.make_ids(["🏃", "🏃"], taken=["person1"]) == ["person2", "person3"]
    assert people.make_ids(["Unknown"]) == ["unknown"]


def test_overlay_none_without_people():
    assert people.overlay({}, "Europe/Amsterdam") is None
    assert people.overlay({OPT_GROUP: {"name": "couple", "members": []}}, "Europe/Amsterdam") is None


def test_overlay_shape():
    options = {OPT_PEOPLE: {"p1": people.person("Alex", "c25k", date(2026, 10, 26))}, OPT_START: "2026-10-26"}
    assert people.overlay(options, "Europe/Amsterdam") == {
        "people": {"p1": {"name": "Alex", "plan_history": [{"plan": "c25k", "from": "2026-10-26"}]}},
        "group": None, "start": "2026-10-26", "timezone": "Europe/Amsterdam"}
    group = {"name": "couple", "members": ["p1", "p2"]}
    assert people.overlay({**options, OPT_GROUP: group}, "Europe/London")["group"] == group


def test_person_without_plan_has_no_history():
    assert people.person("Alex", None, date(2026, 10, 26)) == {"name": "Alex", "plan_history": []}
    assert people.person("Alex", "none", date(2026, 10, 26)) == {"name": "Alex", "plan_history": []}


def test_with_plan_appends_and_a_stop_without_a_plan_changes_nothing():
    today = date(2026, 11, 2)
    on = people.person("Alex", "c25k", date(2026, 10, 26))
    stopped = people.with_plan(on, "none", today)
    assert stopped["plan_history"] == [{"plan": "c25k", "from": "2026-10-26"}, {"plan": None, "from": "2026-11-02"}]
    assert people.with_plan(stopped, "none", today) == stopped  # already no plan
    assert people.with_plan(on, "c25k", today)["plan_history"][-1] == {"plan": "c25k", "from": "2026-11-02"}  # starts again
    assert people.with_plan({"name": "Alex"}, "none", today) == {"name": "Alex"}  # a migrated record without history


def test_from_toml():
    assert people.from_toml(TOML) == {
        OPT_PEOPLE: {
            "person1": {"name": "Person 1", "goal": {"runs": 3},
                        "plan_history": [{"plan": "c25k", "from": "2026-10-26"}, {"plan": "free", "from": "2026-12-01"}]},
            "person2": {"name": "Person 2"}},
        OPT_GROUP: {"name": "couple", "members": ["person1", "person2"]},
        OPT_START: "2026-10-26"}


def test_from_toml_without_people_or_group():
    assert people.from_toml("[rules]\nstart = 2026-10-26\n") is None
    assert people.from_toml(TOML.split("[group]")[0])[OPT_GROUP] is None
