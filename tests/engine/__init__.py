def overlay(people=("person1", "person2"), start="2026-10-26", timezone="Europe/Amsterdam", group=None):
    """The people/group/start part of a config as the runner hands it to load_config."""
    return {"people": {p: {"name": p.title(), "plan_history": [{"plan": "c25k", "from": start}]} for p in people},
            "group": group, "start": start, "timezone": timezone}
