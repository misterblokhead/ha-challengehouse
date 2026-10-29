from datetime import date, timedelta
from unittest.mock import patch

import pytest
from conftest import SCORES
from homeassistant.auth.const import GROUP_ID_ADMIN, GROUP_ID_USER
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockUser

from homeassistant.helpers.network import NoURLAvailableError

from custom_components.fitbridge import webhooks
from custom_components.fitbridge.const import (
    DOMAIN,
    OPT_INVITES,
    OPT_OPENGYM_LINK,
    OPT_OPENGYM_URL,
    OPT_PHONES,
    OPT_STEPS,
    OPT_VIEWERS,
    WEBHOOKS,
)
from custom_components.fitbridge.runner import received_key
from custom_components.fitbridge.settings import monday_of

UI = "/api/fitbridge/ui"


@pytest.fixture
async def users(hass, entry):
    """Synthetic users: alex (p1, not admin), sam (p2, admin), robin (admin, not mapped)."""
    admin, user = await hass.auth.async_get_group(GROUP_ID_ADMIN), await hass.auth.async_get_group(GROUP_ID_USER)
    made = {"alex": MockUser(name="Alex", groups=[user]), "sam": MockUser(name="Sam", groups=[admin]),
            "robin": MockUser(name="Robin", groups=[admin])}
    for u in made.values():
        u.add_to_hass(hass)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_VIEWERS: {made["alex"].id: "p1", made["sam"].id: "p2"}})
    return made


@pytest.fixture
def client(hass, hass_client, users):
    async def _client(name):
        token = await hass.auth.async_create_refresh_token(users[name], "https://fit.example.test")
        return await hass_client(hass.auth.async_create_access_token(token))
    return _client


async def test_scores_wait_for_the_first_payload(hass, client, send):
    c = await client("alex")
    resp = await c.get(f"{UI}/scores")
    assert resp.status == 503 and await resp.json() == {"detail": "waiting"}
    await send(SCORES)
    resp = await c.get(f"{UI}/scores")
    assert resp.status == 200
    body = await resp.json()
    assert body["people"] == {p: {**r, "shoes": [], "steps_today": None, "steps_week": None} for p, r in SCORES["people"].items()} and body["viewer"] == {"person": "p1", "can_edit": ["p1"], "can_connect": ["p1"]}
    robin = await (await (await client("robin")).get(f"{UI}/scores")).json()
    assert robin["viewer"] == {"person": None, "can_edit": [], "can_connect": ["p1", "p2"]}  # an admin who is no person



def _older(*days_ago):
    """Feed items `days_ago` days before 2027-03-01, newest first."""
    return [{"key": f"o{n}", "start": (date(2027, 3, 1) - timedelta(days=n)).isoformat() + "T18:00:00+01:00"} for n in days_ago]


async def test_scores_never_carry_older(hass, client, send):
    await send({"people": {"p1": {"feed": [], "older": _older(100)}}})
    body = await (await (await client("alex")).get(f"{UI}/scores")).json()
    assert "older" not in body["people"]["p1"]


async def test_feed_pages_the_older_items_90_days_at_a_time(hass, client, send):
    older = _older(10, 20, 100, 170, 180, 181, 250)
    await send({"people": {"p1": {"feed": [], "older": older}, "p2": {"feed": [], "older": _older(5)}}})
    c = await client("alex")
    body = await (await c.get(f"{UI}/feed", params={"person": "p1", "before": "2027-03-01"})).json()
    assert body == {"items": older[:2], "more": True}                  # the 90 days before 1 Mar start on 1 Dec
    body = await (await c.get(f"{UI}/feed", params={"person": "p1", "before": "2026-12-01"})).json()
    assert body == {"items": older[2:5], "more": True}                  # 1 Dec back to 2 Sep (inclusive): 181 days ago (1 Sep) and 250 are older
    body = await (await c.get(f"{UI}/feed", params={"person": "p1", "before": "2026-09-02"})).json()
    assert body == {"items": older[5:], "more": False}                   # 2 Jun ... 1 Sep takes the rest
    both = await (await c.get(f"{UI}/feed", params={"person": "p2", "before": "2027-03-01"})).json()
    assert both == {"items": _older(5), "more": False}                  # any viewer reads either person


async def test_feed_refusals(hass, client, send):
    c = await client("alex")
    assert (await c.get(f"{UI}/feed", params={"person": "p1", "before": "2027-03-01"})).status == 503
    await send({"people": {"p1": {"feed": []}}})
    assert (await c.get(f"{UI}/feed", params={"person": "nobody", "before": "2027-03-01"})).status == 404
    assert (await c.get(f"{UI}/feed", params={"before": "2027-03-01"})).status == 404
    for before in ({}, {"before": "yesterday"}, {"before": "2027-13-01"}, {"before": "0001-01-01"}):
        assert (await c.get(f"{UI}/feed", params={"person": "p1", **before})).status == 400
    body = await (await c.get(f"{UI}/feed", params={"person": "p1", "before": "2027-03-01"})).json()
    assert body == {"items": [], "more": False}                         # no older at all


async def test_scores_carry_steps_today_from_the_live_sensor(hass, entry, users, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps", "p2": "sensor.gone"}})
    for state, expected in (("247.9", 247), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        body = await (await (await client("sam")).get(f"{UI}/scores")).json()
        assert (body["people"]["p1"]["steps_today"], body["people"]["p2"]["steps_today"]) == (expected, None)



async def test_steps_today_is_0_until_the_phone_reports_today(hass, entry, users, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps"}})
    c = await client("sam")
    for state, expected in (("10504", 0), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        with patch("custom_components.fitbridge.views.dt_util.now", return_value=dt_util.now() + timedelta(days=1)):  # next morning, no report yet
            body = await (await c.get(f"{UI}/scores")).json()
        assert body["people"]["p1"]["steps_today"] == expected

async def test_scores_carry_this_weeks_steps_with_today_from_the_live_sensor(hass, entry, users, client, send, freezer):
    freezer.move_to("2026-10-28 12:00:00+00:00")  # a Wednesday
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, options={**entry.options, OPT_STEPS: {"p1": "sensor.phone_steps", "p2": "sensor.gone"}})
    hass.data["fitbridge"].steps._days["p1"] = {"2026-10-25": 900, "2026-10-26": 12000, "2026-10-27": 8000}
    c = await client("sam")
    for state, today in (("3000", 3000), ("unavailable", None)):
        hass.states.async_set("sensor.phone_steps", state)
        body = await (await c.get(f"{UI}/scores")).json()
        assert body["people"]["p1"]["steps_week"] == {"2026-10-26": 12000, "2026-10-27": 8000, **({"2026-10-28": today} if today else {})}
        assert body["people"]["p2"]["steps_week"] == {}  # a sensor but nothing collected yet
    hass.data["fitbridge"].steps._days["p1"]["2026-10-28"] = 9000  # collected beats a lower live value
    hass.states.async_set("sensor.phone_steps", "100")
    body = await (await c.get(f"{UI}/scores")).json()
    assert body["people"]["p1"]["steps_week"]["2026-10-28"] == 9000


async def test_remove_and_restore_work_on_a_workout_only_in_older(hass, client, send):
    await send({"people": {"p1": {"feed": [{"key": "k1"}], "older": _older(100)}, "p2": {"feed": [], "older": _older(120)}}})
    c = await client("alex")
    with patch.object(hass.data[DOMAIN].runner, "async_manual") as manual:
        for action in ("remove", "restore"):
            assert (await c.post(f"{UI}/workouts", json={"person": "p1", "key": "o100", "action": action})).status == 202
        assert (await c.post(f"{UI}/workouts", json={"person": "p1", "key": "o999", "action": "remove"})).status == 404
        assert (await c.post(f"{UI}/workouts", json={"person": "p2", "key": "o120", "action": "remove"})).status == 403  # the partner's
    assert [call.args[0] for call in manual.await_args_list] == [
        {"action": "remove", "person": "p1", "key": "o100"}, {"action": "restore", "person": "p1", "key": "o100"}]


async def test_remove_goes_through_the_runner(hass, client, send):
    await send(SCORES)
    data = hass.data[DOMAIN]
    c = await client("alex")
    with patch.object(data.runner, "async_manual") as manual:
        resp = await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    manual.assert_awaited_once_with({"action": "remove", "person": "p1", "key": "k1"})
    with patch.object(data.runner, "async_manual", side_effect=ValueError("unknown person")):
        resp = await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "restore"})
    assert resp.status == 400 and await resp.json() == {"detail": "unknown person"}

async def test_mapped_admin_may_edit_partner(hass, client, send):
    await send(SCORES)
    with patch.object(hass.data[DOMAIN].runner, "async_manual"):
        resp = await (await client("sam")).post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})
    assert resp.status == 202


@pytest.mark.parametrize("who,body,status", [
    ("alex", {"person": "p2", "key": "k2", "action": "remove"}, 403),  # partner's, not admin
    ("robin", {"person": "p1", "key": "k1", "action": "remove"}, 403),  # admin, but not mapped
    ("alex", {"person": "p1", "key": "gone", "action": "remove"}, 404),
    ("alex", {"person": "p1", "key": "k1", "action": "delete"}, 400),
    ("alex", {"person": "p1", "key": 1, "action": "remove"}, 400),
    ("alex", ["p1", "k1", "remove"], 400),
    ("alex", {"person": "p1", "key": "steps:p1:2026-10-27", "action": "remove"}, 400),  # an active day is not removable
])
async def test_refused_edits_change_nothing(hass, client, send, who, body, status):
    await send(SCORES)
    with patch.object(hass.data[DOMAIN].runner, "async_manual") as manual:
        resp = await (await client(who)).post(f"{UI}/workouts", json=body)
    assert resp.status == status
    manual.assert_not_called()


REVIEWED = {"people": {p: {"feed": [{"key": f"r{p}", "source": "health_exporter"}]} for p in ("p1", "p2")}}


async def _review(hass, client, send, who, **body):
    await send(REVIEWED)
    types = {"health_exporter": [{"match": "running", "kind": "run"}, {"match": "walking", "kind": "walk"}]}
    with patch.object(hass.data[DOMAIN].runner, "async_review") as review, patch.object(hass.data[DOMAIN].runner, "async_types", return_value=types):
        resp = await (await client(who)).post(f"{UI}/workouts", json={"action": "review", "person": "p1", "key": "rp1", **body})
    return resp, review


async def test_review_owner_202(hass, client, send):
    resp, review = await _review(hass, client, send, "alex", decision="type", type_match="walking")
    assert resp.status == 202 and await resp.json() == {"ok": True}
    review.assert_awaited_once_with("p1", "rp1", "type", "walking")
    resp, review = await _review(hass, client, send, "sam", decision="run", type_match="ignored")  # a mapped admin may; no type, no match kept
    assert resp.status == 202
    review.assert_awaited_once_with("p1", "rp1", "run", None)


async def test_review_clear_null_202(hass, client, send):
    resp, review = await _review(hass, client, send, "alex", decision=None)
    assert resp.status == 202
    review.assert_awaited_once_with("p1", "rp1", None, None)


@pytest.mark.parametrize("who,body,status", [
    ("alex", {"person": "p2", "key": "rp2", "decision": "plan"}, 403),  # the partner's, not admin
    ("robin", {"decision": "plan"}, 403),  # admin, but not mapped
    ("alex", {"key": "gone", "decision": "plan"}, 404),
])
async def test_review_other_person_403(hass, client, send, who, body, status):
    resp, review = await _review(hass, client, send, who, **body)
    assert resp.status == status
    review.assert_not_called()


@pytest.mark.parametrize("body", [{}, {"decision": "nope"}, {"decision": 1}, {"decision": "plan", "key": 1}])
async def test_review_bad_decision_400(hass, client, send, body):
    resp, review = await _review(hass, client, send, "alex", **body)
    assert resp.status == 400
    review.assert_not_called()


@pytest.mark.parametrize("match", [None, 7, "running", "cycling", ""])  # missing, not text, a run type, not in this source's table
async def test_review_type_unknown_400(hass, client, send, match):
    resp, review = await _review(hass, client, send, "alex", decision="type", **({} if match is None else {"type_match": match}))
    assert resp.status == 400
    review.assert_not_called()


@pytest.mark.parametrize("raw,status", [(b"{nope", 400), (b"\xff\xfe", 400), (b'{"key": NaN}', 400), (b" " * 4097, 413)],
                         ids=["not-json", "bad-utf8", "nan", "too-big"])
async def test_bad_bodies(hass, client, send, raw, status):
    await send(SCORES)
    resp = await (await client("alex")).post(f"{UI}/workouts", data=raw)
    assert resp.status == status


async def test_post_before_payload_waits_and_unknown_path_is_404(hass, client, send):
    c = await client("alex")
    assert (await c.post(f"{UI}/workouts", json={"person": "p1", "key": "k1", "action": "remove"})).status == 503
    await send(SCORES)
    assert (await c.get(f"{UI}/nope")).status == 404
    assert (await c.post(f"{UI}/scores", json={})).status == 404


async def test_unauthenticated_is_401(hass, entry, hass_client_no_auth):
    assert (await (await hass_client_no_auth()).get(f"{UI}/scores")).status == 401


P = {"runs": 2, "workouts": 1, "active_days": 3, "steps": 10000}
SETTINGS = {"people": {"p1": P, "p2": {**P, "runs": 0}}, "couple": {"mode": "together", "together": 2, "team": 8, "reward": "Pizza night"}}


def _this_monday():
    return monday_of(dt_util.now().date()).isoformat()


async def test_settings_store_this_mondays_entry(hass, client, send, hass_storage):
    await send(SCORES)
    resp = await (await client("alex")).post(f"{UI}/settings", json=SETTINGS)
    monday = _this_monday()
    assert resp.status == 202 and await resp.json() == {"ok": True, "from": monday}
    history = [{"from": monday, **SETTINGS}]
    assert hass_storage["fitbridge.settings"]["data"] == {"history": history, "profiles": {}}


async def test_second_save_in_a_week_replaces_and_a_later_week_appends(hass, client, send, hass_storage):
    await send(SCORES)
    c = await client("sam")
    await c.post(f"{UI}/settings", json=SETTINGS)
    again = {**SETTINGS, "couple": {**SETTINGS["couple"], "mode": "own"}}
    assert (await c.post(f"{UI}/settings", json=again)).status == 202
    saved = hass_storage["fitbridge.settings"]["data"]["history"]
    assert [(e["from"], e["couple"]["mode"]) for e in saved] == [(_this_monday(), "own")]
    with patch("custom_components.fitbridge.views.dt_util.now", return_value=dt_util.now() + timedelta(days=7)):  # not freezegun: it expires the token
        assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 202
    saved = hass_storage["fitbridge.settings"]["data"]["history"]
    assert len(saved) == 2 and saved[0]["from"] < saved[1]["from"] and saved[1]["couple"]["mode"] == "together"



async def test_a_failed_save_keeps_the_old_settings(hass, client, send):
    await send(SCORES)
    c = await client("alex")
    with patch.object(hass.data[DOMAIN].settings_store, "async_save", side_effect=HomeAssistantError("disk full")):
        assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 500
    assert (await (await c.get(f"{UI}/settings")).json())["current"] is None

@pytest.mark.parametrize("who,body,status,detail", [
    ("robin", SETTINGS, 403, "not allowed"),  # admin, but not mapped
    ("alex", {**SETTINGS, "people": {"p1": {**P, "runs": 9}, "p2": P}}, 400, "people.p1.runs: must be an integer 0-7"),
    ("alex", {"people": {"p1": P}, "couple": SETTINGS["couple"]}, 400, "people.p2: required"),
    ("alex", ["x"], 400, "body: must be an object"),
])
async def test_refused_settings_store_nothing(hass, client, send, hass_storage, who, body, status, detail):
    await send(SCORES)
    resp = await (await client(who)).post(f"{UI}/settings", json=body)
    assert resp.status == status and (await resp.json())["detail"] == detail
    assert "fitbridge.settings" not in hass_storage


async def test_settings_wait_for_the_first_scores(hass, client):
    c = await client("alex")
    assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 503
    assert (await c.get(f"{UI}/settings")).status == 503


async def test_settings_get_returns_current_week_start_and_defaults(hass, client, send):
    p1 = {**SCORES["people"]["p1"], "week": {"goal": {"runs": 1, "gym": 2, "active_days": 0, "steps": 8000}}}
    await send({"people": {"p1": p1, "p2": {"name": "Sam", "feed": []}}})
    c = await client("alex")
    body = await (await c.get(f"{UI}/settings")).json()
    assert body == {"history": [], "profiles": {}, "current": None, "week_start": _this_monday(),
                    "defaults": {"p1": {"runs": 1, "workouts": 2, "active_days": 0, "steps": 8000}}}  # old gym key still read
    await c.post(f"{UI}/settings", json=SETTINGS)
    body = await (await c.get(f"{UI}/settings")).json()
    assert body["current"] == {"from": _this_monday(), **SETTINGS} and body["history"] == [body["current"]]


async def test_birth_years_are_stored_returned_kept_and_cleared(hass, client, send, hass_storage):
    await send(SCORES)
    c = await client("alex")
    both = {"profiles": {"p1": {"birth_year": 1990}, "p2": {"birth_year": 1985}}}
    assert (await c.post(f"{UI}/settings", json={**SETTINGS, **both})).status == 202
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == both["profiles"]
    assert hass_storage["fitbridge.settings"]["data"]["profiles"] == both["profiles"]
    assert (await c.post(f"{UI}/settings", json=SETTINGS)).status == 202  # an older page sends none: they stay
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == both["profiles"]
    assert (await c.post(f"{UI}/settings", json={**SETTINGS, "profiles": {"p1": {"birth_year": None}}})).status == 202  # null clears, p2 untouched
    assert (await (await c.get(f"{UI}/settings")).json())["profiles"] == {"p2": {"birth_year": 1985}}
    assert hass_storage["fitbridge.settings"]["data"]["profiles"] == {"p2": {"birth_year": 1985}}


@pytest.mark.parametrize("profiles,detail", [
    ({"p1": {"birth_year": 1899}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": date.today().year + 1}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": "1990"}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"p1": {"birth_year": True}}, f"profiles.p1.birth_year: must be a year from 1900 to {date.today().year}"),
    ({"zed": {"birth_year": 1990}}, "profiles.zed: unknown person"),
    ([], "profiles: must be an object"),
])
async def test_a_bad_birth_year_is_refused_and_nothing_is_stored(hass, client, send, hass_storage, profiles, detail):
    await send(SCORES)
    resp = await (await client("alex")).post(f"{UI}/settings", json={**SETTINGS, "profiles": profiles})
    assert resp.status == 400 and (await resp.json())["detail"] == detail
    assert "fitbridge.settings" not in hass_storage


async def test_settings_survive_a_reload(hass, entry, client, send, hass_storage):
    await send(SCORES)
    await (await client("alex")).post(f"{UI}/settings", json=SETTINGS)
    await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    await send(SCORES)
    body = await (await (await client("alex")).get(f"{UI}/settings")).json()
    assert body["current"] == {"from": _this_monday(), **SETTINGS}


# ---------- shoes (live: the engine's own shoes) ----------

@pytest.fixture
async def live(hass, setup, hass_client):
    """A live entry (people person1 and person2 from scoring.toml); clients: person1 (not admin), person2 (admin), robin (admin, unmapped)."""
    admin, user = await hass.auth.async_get_group(GROUP_ID_ADMIN), await hass.auth.async_get_group(GROUP_ID_USER)
    made = {"person1": MockUser(name="Person1", groups=[user]), "person2": MockUser(name="Person2", groups=[admin]),
            "robin": MockUser(name="Robin", groups=[admin])}
    for u in made.values():
        u.add_to_hass(hass)
    await setup({OPT_VIEWERS: {made["person1"].id: "person1", made["person2"].id: "person2"}})

    async def _client(name):
        token = await hass.auth.async_create_refresh_token(made[name], "https://fit.example.test")
        return await hass_client(hass.auth.async_create_access_token(token))
    return _client


async def _shoes(c, who="person1"):
    return (await (await c.get(f"{UI}/scores")).json())["people"][who]["shoes"]


async def _add(c, person="person1", name="Trail", km=700):
    resp = await c.post(f"{UI}/shoes", json={"op": "add", "person": person, "name": name, "replace_at_km": km})
    assert resp.status == 202, await resp.text()
    return (await resp.json())["id"]


def _run(hass, person, key, km, days_ago):
    start = dt_util.now() - timedelta(days=days_ago)
    hass.data[DOMAIN].runner.store.add(person, key, "opentracks", "completed", activity_type="running", points=5, distance_m=km * 1000,
                                       start=start.isoformat(), end=(start + timedelta(minutes=30)).isoformat(), duration_s=1800)


async def test_live_scores_carry_the_engines_shoes(hass, live):
    c = await live("person1")
    body = await (await c.get(f"{UI}/scores")).json()
    assert body["people"]["person1"]["shoes"] == [] and body["people"]["person1"]["run_shoes"] == {}
    a = await _add(c)
    assert await _shoes(c) == [{"id": a, "name": "Trail", "km": 0.0, "limit": 700, "runs": 0, "last_run": None, "current": True}]
    assert await (await c.get(f"{UI}/shoes")).json() == {"person1": await _shoes(c), "person2": []}


async def test_shoe_ops_add_update_current_retire(hass, live):
    c = await live("person1")
    a, b = await _add(c, name=" Trail "), await _add(c, name="Road", km=500)
    assert [s["name"] for s in await _shoes(c)] == ["Trail", "Road"]  # trimmed
    assert [s["current"] for s in await _shoes(c)] == [True, False]  # the first one added is current
    resp = await c.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": b})
    assert resp.status == 202 and [s["current"] for s in await _shoes(c)] == [False, True]
    resp = await c.post(f"{UI}/shoes", json={"op": "update", "id": a, "name": "Trail 2", "replace_at_km": 650.5})
    assert resp.status == 202 and [(s["name"], s["limit"]) for s in await _shoes(c)][0] == ("Trail 2", 650.5)
    resp = await c.post(f"{UI}/shoes", json={"op": "update", "id": a, "replace_at_km": 800})  # one field alone
    assert resp.status == 202 and (await _shoes(c))[0]["name"] == "Trail 2" and (await _shoes(c))[0]["limit"] == 800
    resp = await c.post(f"{UI}/shoes", json={"op": "retire", "id": b})
    assert resp.status == 202 and [s["id"] for s in await _shoes(c)] == [a]


async def test_the_first_shoe_added_becomes_current_a_second_does_not(hass, live):
    c = await live("person1")
    a, b = await _add(c, name="A"), await _add(c, name="B")
    assert [(s["id"], s["current"]) for s in await _shoes(c)] == [(a, True), (b, False)]
    await c.post(f"{UI}/shoes", json={"op": "retire", "id": a})  # no current left: the next one added takes over
    c2 = await _add(c, name="C")
    assert [(s["id"], s["current"]) for s in await _shoes(c)] == [(b, False), (c2, True)]
    _run(hass, "person1", "r1", 5, 1)
    await hass.data[DOMAIN].runner.async_score_now()
    assert [(s["km"], s["runs"]) for s in await _shoes(c)] == [(0.0, 0), (5.0, 1)]  # new runs count on it


async def test_a_shoe_op_scores_before_it_answers(hass, live):
    c = await live("person1")
    runner = hass.data[DOMAIN].runner
    with patch.object(runner, "_score", wraps=runner._score) as score:
        await _add(c)
    score.assert_awaited_once()


async def test_shoe_rights_follow_the_shoes_owner(hass, live):
    person1, person2, robin = await live("person1"), await live("person2"), await live("robin")
    mine = await _add(person1)
    theirs = await _add(person2, "person2", "Hers")
    for who, body, status in (
        (person1, {"op": "add", "person": "person2", "name": "X", "replace_at_km": 700}, 403),  # partner's, not admin
        (robin, {"op": "add", "person": "person1", "name": "X", "replace_at_km": 700}, 403),  # admin, but not mapped
        (person1, {"op": "update", "id": theirs, "name": "X"}, 403),
        (person1, {"op": "retire", "id": theirs}, 403),
        (person1, {"op": "current", "person": "person2", "id": theirs}, 403),
        (robin, {"op": "retire", "id": mine}, 403),
    ):
        assert (await who.post(f"{UI}/shoes", json=body)).status == status, body
    assert [s["name"] for s in await _shoes(person1)] == ["Trail"] and [s["name"] for s in await _shoes(person1, "person2")] == ["Hers"]
    assert (await person2.post(f"{UI}/shoes", json={"op": "retire", "id": mine})).status == 202  # an admin may edit anyone's
    assert await _shoes(person1) == []


@pytest.mark.parametrize("body,status,detail", [
    ({"op": "add", "person": "person1", "name": "", "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "   ", "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "x" * 41, "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": 5, "replace_at_km": 700}, 400, "name: 1-40 characters"),
    ({"op": "add", "person": "person1", "name": "x" * 40, "replace_at_km": 99}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": 3001}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": "700"}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x", "replace_at_km": True}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "person1", "name": "x"}, 400, "replace_at_km: a number 100-3000"),
    ({"op": "add", "person": "nobody", "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "add", "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "add", "person": [], "name": "x", "replace_at_km": 700}, 400, "person: not a person"),  # unhashable: not a 500
    ({"op": "add", "person": {}, "name": "x", "replace_at_km": 700}, 400, "person: not a person"),
    ({"op": "current", "person": [], "id": 1}, 400, "person: not a person"),
    ({"op": "frobnicate"}, 400, "op: add, update, current or retire"),
    ({"op": "update", "id": "1", "name": "x"}, 400, "id: a whole number"),
    ({"op": "update", "id": True, "name": "x"}, 400, "id: a whole number"),
    ({"op": "update", "id": 1}, 400, "update: name or replace_at_km"),
    ({"op": "update", "id": 1, "name": ""}, 400, "name: 1-40 characters"),
    ({"op": "update", "id": 999, "name": "x"}, 404, "no such shoe"),
    ({"op": "retire", "id": 999}, 404, "no such shoe"),
    ({"op": "current", "person": "person1", "id": 999}, 400, "no such shoe"),
    (["add"], 400, "expected an object"),
])
async def test_shoe_validation(hass, live, body, status, detail):
    c = await live("person1")
    resp = await c.post(f"{UI}/shoes", json=body)
    assert resp.status == status and await resp.json() == {"detail": detail}
    assert await _shoes(c) == []


async def test_current_takes_only_the_persons_own_shoes(hass, live):
    person1, person2 = await live("person1"), await live("person2")
    theirs = await _add(person2, "person2", "Hers")
    resp = await person1.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": theirs})
    assert resp.status == 400 and await resp.json() == {"detail": "no such shoe"}


async def test_moving_a_run_moves_its_km(hass, live):
    c = await live("person1")
    a, b = await _add(c, name="A"), await _add(c, name="B")
    await c.post(f"{UI}/shoes", json={"op": "current", "person": "person1", "id": a})
    _run(hass, "person1", "r1", 5, 2)
    await hass.data[DOMAIN].runner.async_score_now()
    body = await (await c.get(f"{UI}/scores")).json()
    assert [(s["km"], s["runs"]) for s in body["people"]["person1"]["shoes"]] == [(5.0, 1), (0.0, 0)]
    assert body["people"]["person1"]["run_shoes"] == {"r1": a}
    resp = await c.post(f"{UI}/workouts", json={"action": "shoe", "person": "person1", "key": "r1", "shoe_id": b})
    assert resp.status == 202 and await resp.json() == {"ok": True}
    body = await (await c.get(f"{UI}/scores")).json()
    assert [(s["km"], s["runs"]) for s in body["people"]["person1"]["shoes"]] == [(0.0, 0), (5.0, 1)]
    assert body["people"]["person1"]["run_shoes"] == {"r1": b}


async def test_a_run_only_in_older_moves_too_but_not_the_partners(hass, live):
    person1 = await live("person1")
    a, b = await _add(person1, name="A"), await _add(person1, name="B")
    _run(hass, "person1", "r1", 5, 120)
    _run(hass, "person2", "r2", 5, 120)
    await hass.data[DOMAIN].runner.async_score_now()
    people = hass.data[DOMAIN].scores["people"]
    assert [w["key"] for w in people["person1"]["older"]] == ["r1"] and people["person1"]["run_shoes"] == {"r1": a}
    resp = await person1.post(f"{UI}/workouts", json={"action": "shoe", "person": "person1", "key": "r1", "shoe_id": b})
    assert resp.status == 202 and hass.data[DOMAIN].scores["people"]["person1"]["run_shoes"] == {"r1": b}
    resp = await person1.post(f"{UI}/workouts", json={"action": "shoe", "person": "person2", "key": "r2", "shoe_id": b})
    assert resp.status == 403


async def test_moving_a_run_is_refused_when_it_should(hass, live):
    person1, person2, robin = await live("person1"), await live("person2"), await live("robin")
    a, theirs = await _add(person1, name="A"), await _add(person2, "person2", "Hers")
    _run(hass, "person1", "r1", 5, 2)
    _run(hass, "person2", "r2", 5, 2)
    hass.data[DOMAIN].runner.store.add("person1", "w1", "opentracks", "completed", activity_type="walking", points=5, distance_m=3000,
                                       start=dt_util.now().isoformat(), end=dt_util.now().isoformat(), duration_s=1800)
    await hass.data[DOMAIN].runner.async_score_now()
    for who, body, status, detail in (
        (person1, {"person": "person2", "key": "r2", "shoe_id": theirs}, 403, "not allowed"),  # partner's, not admin
        (robin, {"person": "person1", "key": "r1", "shoe_id": a}, 403, "not allowed"),
        (person1, {"person": "person1", "key": "gone", "shoe_id": a}, 404, "not found"),
        (person1, {"person": "person1", "key": "w1", "shoe_id": a}, 400, "not a run"),
        (person1, {"person": "person1", "key": "r1", "shoe_id": theirs}, 400, "no such shoe"),  # somebody else's shoe
        (person1, {"person": "person1", "key": "r1", "shoe_id": True}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": "r1", "shoe_id": "1"}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": "r1"}, 400, "shoe_id: a whole number"),
        (person1, {"person": "person1", "key": 1, "shoe_id": a}, 400, "expected person, key and shoe_id"),
    ):
        resp = await who.post(f"{UI}/workouts", json={"action": "shoe", **body})
        assert (resp.status, (await resp.json())["detail"]) == (status, detail), body
    assert (await person2.post(f"{UI}/workouts", json={"action": "shoe", "person": "person2", "key": "r2", "shoe_id": theirs})).status == 202


def _gpx(path, points=700, hr=True):
    """A synthetic run north at ~2.8 m/s from yesterday, a fix every 2 s."""
    t0 = dt_util.utcnow() - timedelta(days=1)
    ext = lambda i: f"<extensions><gpxtpx:TrackPointExtension xmlns:gpxtpx='x'><gpxtpx:hr>{140 + i % 10}</gpxtpx:hr></gpxtpx:TrackPointExtension></extensions>" if hr else ""
    path.write_text("<gpx><trk><trkseg>" + "".join(
        f"<trkpt lat='{i * 0.00005:.5f}' lon='0'><ele>{10 + i % 5}</ele><time>{(t0 + timedelta(seconds=2 * i)).isoformat()}</time>{ext(i)}</trkpt>"
        for i in range(points)) + "</trkseg></trk></gpx>")


def _stored(hass, key, file, days_ago=1, person="person1", **fields):
    start = dt_util.now() - timedelta(days=days_ago)
    hass.data[DOMAIN].runner.store.add(person, key, "opentracks", "stored", activity_type="running", points=700, distance_m=3900,
                                       start=start.isoformat(), end=(start + timedelta(minutes=30)).isoformat(), duration_s=1800,
                                       file=str(file), **fields)


async def _details(c, key, person="person1"):
    return await c.get(f"{UI}/workout", params={"person": person, "key": key})


async def test_a_run_opens_with_its_route_graphs_splits_and_shoe(hass, live, tmp_path):
    c = await live("person1")
    shoe = await _add(c)
    _gpx(tmp_path / "r1.gpx")
    _stored(hass, "r1", tmp_path / "r1.gpx", avg_hr=150, max_hr=178, kcal=310)
    await hass.data[DOMAIN].runner.async_score_now()
    resp = await _details(c, "r1")
    assert resp.status == 200
    body = await resp.json()
    s = body["summary"]
    assert (s["key"], s["kind"], s["source"], s["avg_hr"], s["max_hr"], s["kcal"], s["shoe"], s["counts"]) == ("r1", "run", "opentracks", 150, 178, 310, {"id": shoe, "name": "Trail"}, True)
    assert s["minutes"] == 30 and s["km"] == 3.9 and s["end"] > s["start"] and s["reason"] is None
    assert body["note"] is None and body["gym"] is None
    assert 2 <= sum(len(line) for line in body["route"]) <= 300
    series = body["series"]
    assert 2 < len(series["t"]) <= 200 and {len(v) for v in series.values()} == {len(series["t"])}
    assert [round(x["km"]) for x in body["splits"]][:3] == [1, 1, 1] and len(body["splits"]) == 4  # 3 km and a tail of 0.9
    assert len(body["zones"]) == 5 and body["gain_m"] is not None
    bpm = hass.data[DOMAIN].scores["people"]["person1"]["max_hr"]
    assert body["max_hr"] == (bpm and bpm["bpm"])
    assert (await _details(await live("person2"), "r1")).status == 200  # any household user reads either person


async def test_an_older_run_opens_too(hass, live, tmp_path):  # one from before rules.start too: older rows hold those
    _gpx(tmp_path / "old.gpx")
    _stored(hass, "old", tmp_path / "old.gpx", days_ago=120)
    await hass.data[DOMAIN].runner.async_score_now()
    scores = hass.data[DOMAIN].runner.scores["people"]["person1"]
    assert "old" in [w["key"] for w in scores["older"]] and "old" not in [w["key"] for w in scores["feed"]]
    body = await (await _details(await live("person1"), "old")).json()
    assert body["summary"]["key"] == "old" and body["route"]


async def test_workout_details_refusals(hass, live):
    c = await live("person1")
    for params in ({"person": "person1", "key": "nope"}, {"person": "person1"}, {"person": "nobody", "key": "r1"}, {"key": "r1"}):
        assert (await c.get(f"{UI}/workout", params=params)).status == 404, params
    assert await (await c.get(f"{UI}/workout", params={"person": "person1", "key": "nope"})).json() == {"detail": "not found"}


async def test_workout_details_wait_for_the_first_payload(hass, client):
    resp = await (await client("alex")).get(f"{UI}/workout", params={"person": "p1", "key": "k1"})
    assert resp.status == 503


async def test_connect_403_for_other_person(hass, client, send):
    await send(SCORES)
    c = await client("alex")
    assert (await c.get(f"{UI}/connect", params={"person": "p2"})).status == 403
    assert (await c.get(f"{UI}/connect", params={"person": "nobody"})).status == 404


async def test_connect_for_self(hass, entry, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, data={WEBHOOKS: {"p1": "hook1"}}, options={
        **entry.options, OPT_PHONES: {"p1": "iphone"}, OPT_OPENGYM_URL: "https://gym.example.test", OPT_INVITES: {"p1": "code1"}})
    hass.config.external_url = "https://ha.example.test"
    hass.data[DOMAIN].runner.store.kv_set(received_key("p1"), "2026-10-28T12:00:00+00:00")
    resp = await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})
    assert resp.status == 200
    assert await resp.json() == {
        "url": "https://ha.example.test/api/webhook/hook1", "external": True, "phone": "iphone",
        "last_received": "2026-10-28T12:00:00+00:00", "opengym": {"url": "https://gym.example.test", "invite": "code1", "in_ha": False}}


async def test_connect_shows_the_link_for_an_app_opengym(hass, entry, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, data={WEBHOOKS: {"p1": "hook1"}}, options={
        **entry.options, OPT_OPENGYM_URL: "http://app-host:8099", OPT_OPENGYM_LINK: "https://ha.example.test/opengym", OPT_INVITES: {"p1": "code1"}})
    resp = await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})
    assert (await resp.json())["opengym"] == {"url": "https://ha.example.test/opengym", "invite": "code1", "in_ha": True}


async def test_connect_keeps_the_address_for_an_own_opengym(hass, entry, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, data={WEBHOOKS: {"p1": "hook1"}}, options={
        **entry.options, OPT_OPENGYM_URL: "https://gym.example.test", OPT_INVITES: {"p1": "code1"}})
    resp = await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})
    assert (await resp.json())["opengym"] == {"url": "https://gym.example.test", "invite": "code1", "in_ha": False}


async def test_connect_admin_without_person(hass, entry, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, data={WEBHOOKS: {"p2": "hook2"}})
    resp = await (await client("robin")).get(f"{UI}/connect", params={"person": "p2"})
    assert resp.status == 200
    body = await resp.json()
    assert (body["phone"], body["last_received"], body["opengym"]) == (None, None, None)  # nothing set for p2 yet
    assert body["url"].endswith("/api/webhook/hook2")


async def test_connect_no_external_url(hass, entry, client, send):
    await send(SCORES)
    hass.config_entries.async_update_entry(entry, data={WEBHOOKS: {"p1": "hook1"}})
    with patch.object(webhooks, "get_url", side_effect=NoURLAvailableError):  # no external URL, no cloud, no internal
        body = await (await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})).json()
    assert body["external"] is False and body["url"] == "/api/webhook/hook1"
    body = await (await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})).json()  # HA's internal URL: usable, but not away from home
    assert body["external"] is False and body["url"].endswith(":8123/api/webhook/hook1")


async def test_connect_without_a_webhook_id_has_no_url(hass, client, send):
    await send(SCORES)
    assert (await (await (await client("alex")).get(f"{UI}/connect", params={"person": "p1"})).json())["url"] is None
