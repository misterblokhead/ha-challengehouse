COUPLE = {"name": "couple", "members": ["person1", "person2"]}
# People the way the shipped scoring.toml had them, for the tests of a TOML that still carries its own.
LEGACY_PEOPLE = """
[people.person1]
name = "Person 1"
plan_history = [{ plan = "c25k", from = 2026-10-26 }]

[people.person2]
name = "Person 2"
plan_history = [{ plan = "c25k", from = 2026-10-26 }]

[group]
name = "couple"
members = ["person1", "person2"]
"""


def overlay(people=("person1", "person2"), start="2026-10-26", timezone="Europe/Amsterdam", group=None):
    """The people/group/start part of a config as the runner hands it to load_config."""
    return {"people": {p: {"name": f"Person {p[6:]}" if p.startswith("person") else p.title(), "plan_history": [{"plan": "c25k", "from": start}]} for p in people},
            "group": group, "start": start, "timezone": timezone}


TWO = overlay(group=COUPLE)
ONE = overlay(("person1",))
