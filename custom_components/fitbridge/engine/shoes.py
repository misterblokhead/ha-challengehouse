"""Shoes: km counted from the owner's runs, each run on one shoe, one current shoe per person."""
from . import scoring, store as store_mod
from .ingest import classify, db_workouts


def _current(store, person):
    """The current shoe's id, or None when none is set or it has been retired."""
    value = store.kv_get(f"current_shoe:{person}")
    with store.lock:
        row = store.db.execute("SELECT id FROM shoes WHERE id=? AND person=? AND retired=0",
                               (int(value) if value else -1, person)).fetchone()
    return row["id"] if row else None


def _shoe(store, person, shoe_id):
    """The active shoe of that person, or ValueError."""
    with store.lock:
        row = store.db.execute("SELECT * FROM shoes WHERE id=?", (shoe_id,)).fetchone()
    if not row or row["retired"] or row["person"] != person:
        raise ValueError("no such shoe")
    return row


def add(store, person, name, replace_at_km, *, current_if_none=False) -> int:
    """A new shoe's id; with current_if_none it becomes the current shoe when the person has none (new runs count on it)."""
    with store.lock, store.db:
        shoe_id = store.db.execute("INSERT INTO shoes(person, name, replace_at_km, added) VALUES(?,?,?,?)",
                                   (person, name, replace_at_km, store_mod.now_iso())).lastrowid
    if current_if_none and _current(store, person) is None:
        set_current(store, person, shoe_id)
    return shoe_id


def update(store, shoe_id, *, name=None, replace_at_km=None, start_km=None, retired=None):
    fields = {k: v for k, v in (("name", name), ("replace_at_km", replace_at_km), ("start_km", start_km),
                                ("retired", None if retired is None else int(retired))) if v is not None}
    with store.lock, store.db:
        if not store.db.execute("SELECT 1 FROM shoes WHERE id=?", (shoe_id,)).fetchone():
            raise ValueError("no such shoe")
        if fields:
            store.db.execute(f"UPDATE shoes SET {','.join(f'{k}=?' for k in fields)} WHERE id=?",
                             [*fields.values(), shoe_id])


def set_current(store, person, shoe_id):
    _shoe(store, person, shoe_id)
    store.kv_set(f"current_shoe:{person}", str(shoe_id))


def move_run(store, person, key, shoe_id):
    _shoe(store, person, shoe_id)
    with store.lock:
        r = store.db.execute("SELECT * FROM workouts WHERE person=? AND key=?", (person, key)).fetchone()
    if not r or classify(r["source"], r["activity_type"], r["points"]) != "run":
        raise ValueError("not a run")
    with store.lock, store.db:
        store.db.execute("INSERT OR REPLACE INTO run_shoes VALUES(?,?,?)", (person, key, shoe_id))


def assign_new(store, person, run_keys):
    """Runs without a shoe go on the current one; with no current shoe they stay unassigned (and count nowhere)."""
    if (shoe := _current(store, person)) is None:
        return
    with store.lock, store.db:
        store.db.executemany("INSERT OR IGNORE INTO run_shoes VALUES(?,?,?)", [(person, k, shoe) for k in run_keys])


def _used(store, person, runs):
    """{shoe id: (km, runs, latest start)} over the assigned non-excluded runs."""
    on = assigned(store, person)
    used = {}
    # the same run recorded by two sources counts once, as in scoring (the kept copy's shoe is the one that counts)
    for w in scoring._dedup([w for w in runs if w["kind"] == "run" and not w["excluded"]]):
        if w["key"] in on:
            km, n, last = used.get(on[w["key"]], (0.0, 0, None))
            used[on[w["key"]]] = (km + (w["distance_m"] or 0) / 1000, n + 1, max(last or w["start"], w["start"]))
    return used


def assigned(store, person) -> dict:
    """{run key: shoe id} for the page's "Shoe" picker; a retired shoe's runs are in it too."""
    with store.lock:
        return {r["key"]: r["shoe_id"] for r in store.db.execute("SELECT key, shoe_id FROM run_shoes WHERE person=?", (person,))}


def rows(store, person, runs):
    """Active shoes, oldest first, for the page. `runs` are the person's scorer workouts (db_workouts)."""
    used, current = _used(store, person, runs), _current(store, person)
    with store.lock:
        shoes = store.db.execute("SELECT * FROM shoes WHERE person=? AND retired=0 ORDER BY added, id", (person,)).fetchall()
    out = []
    for s in shoes:
        km, n, last = used.get(s["id"], (0.0, 0, None))
        out.append({"id": s["id"], "name": s["name"], "km": round((s["start_km"] or 0) + km, 1),
                    "limit": s["replace_at_km"], "runs": n, "last_run": last.date().isoformat() if last else None,
                    "current": s["id"] == current})
    return out


def carry_over(store, person, endurain):
    """Shoes from Endurain ({"name", "replace_at_km", "km"} each): the first becomes current and takes every existing
    run; each start_km is Endurain's km minus what fitbridge counts. Safe to run twice (shoes match by name)."""
    runs = db_workouts(store, (person,))[person]
    with store.lock:
        known = {r["name"]: r["id"] for r in store.db.execute("SELECT id, name FROM shoes WHERE person=?", (person,))}
    ids = [known.get(e["name"]) or add(store, person, e["name"], e["replace_at_km"]) for e in endurain]
    if ids and _current(store, person) is None:
        set_current(store, person, ids[0])
    if ids:
        with store.lock, store.db:
            store.db.executemany("INSERT OR IGNORE INTO run_shoes VALUES(?,?,?)",
                                 [(person, w["key"], ids[0]) for w in runs if w["kind"] == "run"])
    used = _used(store, person, runs)
    for e, shoe_id in zip(endurain, ids):
        update(store, shoe_id, start_km=(e["km"] or 0) - used.get(shoe_id, (0.0,))[0] if e["km"] is not None else 0)
