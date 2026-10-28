"""The scoring result behind tests/fixtures/mqtt_discovery.json: the old MQTT discovery output for it, kept so the
integration's entities can be compared with what fitbridge published over MQTT. Keys are explicit: wk()'s counter
depends on test order."""
import json
from pathlib import Path

from custom_components.fitbridge.engine.scoring import score
from .test_scoring import CFG, NOW, week_of, wk

FIXTURE = Path(__file__).parents[1] / "fixtures" / "mqtt_discovery.json"
P1, P2 = CFG["people"]


def build():
    """(result, announced badges, scored workouts, record events), each event list as (person, item) pairs."""
    ws = [dict(w, person=P1, key=f"f{i}") for i, w in enumerate(week_of(0))] + [wk(P1, "run", 3, 8, 0, 20, km=2.5, key="f9")]
    result = json.loads(json.dumps(score({P1: ws, P2: []}, [], CFG, NOW(6))))
    r1 = result["people"][P1]
    record = {"key": r1["feed"][0]["key"], "lifts": [{"name": "Bent over row", "w": 70, "r": 6, "unit": "kg"}],
              "fastest_1k": None}
    return result, [(P1, r1["badges"]["unlocked"][0])], [(P1, r1["feed"][0])], [(P1, record)]
