"""SQLite state: workouts, seen files, caches (kv), exclusions and what was announced."""
import sqlite3
import threading
from datetime import datetime, timezone
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS workouts(
  person TEXT NOT NULL, key TEXT NOT NULL, source TEXT NOT NULL,
  activity_type TEXT, start TEXT, end TEXT, duration_s REAL, distance_m REAL,
  kcal REAL, avg_hr REAL, max_hr REAL, points INTEGER, indoor INTEGER,
  file TEXT, status TEXT NOT NULL, job_id TEXT, endurain_ids TEXT, error TEXT,
  updated TEXT NOT NULL, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS seen_files(path TEXT PRIMARY KEY, mtime REAL, size INTEGER);
CREATE TABLE IF NOT EXISTS kv(key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS exclusions(person TEXT, key TEXT, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS badges(person TEXT, id TEXT, unlocked_at TEXT, PRIMARY KEY(person, id));
CREATE TABLE IF NOT EXISTS manual_seen(msg_id TEXT PRIMARY KEY);
CREATE TABLE IF NOT EXISTS announced_workouts(person TEXT, key TEXT, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS best_km(person TEXT, key TEXT, seconds INTEGER, PRIMARY KEY(person, key));
CREATE TABLE IF NOT EXISTS records(person TEXT, id TEXT, value REAL, PRIMARY KEY(person, id));
CREATE TABLE IF NOT EXISTS record_holders(person TEXT, id TEXT, key TEXT, PRIMARY KEY(person, id, key));
"""
# status: stored (new rows with a file) | skipped_no_gps (GPX without points), awaiting_route (outdoor, route GPX not
#         exported yet), no_route (indoor, never has a route), archived (no route kind),
#         manual (entered by hand, through an action), or pending_upload/job_pending/completed/failed from the Endurain
#         uploads (rows from before the move keep them; scoring never reads status)
# manual_seen: ids of the MQTT manual messages from before the move (no longer written).
# Indoor workouts stored as awaiting_route before no_route existed.
MIGRATE = "UPDATE workouts SET status='no_route' WHERE source='health_exporter' AND status='awaiting_route' AND indoor=1"


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


class Store:
    def __init__(self, path):
        self.db = sqlite3.connect(path, check_same_thread=False)
        self.db.row_factory = sqlite3.Row
        self.db.executescript(SCHEMA)
        with self.db:
            self.db.execute(MIGRATE)
        self.lock = threading.Lock()

    def add(self, person, key, source, status, **fields):
        """Insert a workout once; returns False if (person, key) already exists."""
        row = {"person": person, "key": key, "source": source, "status": status, "updated": now_iso(), **fields}
        with self.lock, self.db:
            cur = self.db.execute(
                f"INSERT OR IGNORE INTO workouts({','.join(row)}) VALUES({','.join('?' * len(row))})",
                list(row.values()))
            return cur.rowcount == 1

    def attach_route(self, person, key, status, **fields):
        """A route that arrived after its workout; only a row still awaiting one changes."""
        fields.update(status=status, updated=now_iso())
        with self.lock, self.db:
            cur = self.db.execute(f"UPDATE workouts SET {','.join(f'{k}=?' for k in fields)} "
                                  "WHERE person=? AND key=? AND status='awaiting_route'",
                                  [*fields.values(), person, key])
            return cur.rowcount == 1

    def update(self, person, key, **fields):
        fields["updated"] = now_iso()
        with self.lock, self.db:
            self.db.execute(f"UPDATE workouts SET {','.join(f'{k}=?' for k in fields)} WHERE person=? AND key=?",
                            [*fields.values(), person, key])

    def rows(self, status):
        with self.lock:
            return self.db.execute("SELECT * FROM workouts WHERE status=?", (status,)).fetchall()

    def file_seen(self, path: Path):
        st = path.stat()
        with self.lock:
            row = self.db.execute("SELECT mtime, size FROM seen_files WHERE path=?", (str(path),)).fetchone()
        return row is not None and row["mtime"] == st.st_mtime and row["size"] == st.st_size

    def mark_seen(self, path: Path):
        st = path.stat()
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO seen_files VALUES(?,?,?)", (str(path), st.st_mtime, st.st_size))

    def counts(self):
        with self.lock:
            rows = self.db.execute("SELECT person, status, COUNT(*) n FROM workouts GROUP BY person, status").fetchall()
        out = {}
        for r in rows:
            out.setdefault(r["person"], {})[r["status"]] = r["n"]
        return out

    def all_rows(self):
        with self.lock:
            return self.db.execute("SELECT * FROM workouts").fetchall()

    def kv_get(self, key):
        with self.lock:
            row = self.db.execute("SELECT value FROM kv WHERE key=?", (key,)).fetchone()
        return row["value"] if row else None

    def kv_set(self, key, value):
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (key, value))

    def best_km(self):
        """{(person, workout key): fastest 1 km in seconds, or None when the file gave none}."""
        with self.lock:
            return {(r["person"], r["key"]): r["seconds"] for r in self.db.execute("SELECT * FROM best_km")}

    def set_best_km(self, person, key, seconds):
        with self.lock, self.db:
            self.db.execute("INSERT OR REPLACE INTO best_km VALUES(?,?,?)", (person, key, seconds))

    def exclusions(self):
        with self.lock:
            return {(r["person"], r["key"]) for r in self.db.execute("SELECT person, key FROM exclusions")}

    def set_excluded(self, person, key, excluded: bool):
        sql = "INSERT OR IGNORE INTO exclusions VALUES(?,?)" if excluded else \
            "DELETE FROM exclusions WHERE person=? AND key=?"
        with self.lock, self.db:
            self.db.execute(sql, (person, key))

    def delete_workout(self, person, key):
        with self.lock, self.db:
            self.db.execute("DELETE FROM workouts WHERE person=? AND key=?", (person, key))

    def unseen_badges(self, person, unlocked):
        """(badges not yet recorded, whether to announce them). Read-only; a person's first scoring is silent."""
        with self.lock:
            known = {r["id"] for r in self.db.execute("SELECT id FROM badges WHERE person=?", (person,))}
        scored = self.kv_get(f"scored:{person}") is not None
        return [b for b in unlocked if b["id"] not in known], scored

    def record_badges(self, person, badges):
        with self.lock, self.db:
            self.db.executemany("INSERT OR IGNORE INTO badges VALUES(?,?,?)",
                                [(person, b["id"], b.get("unlocked_at")) for b in badges])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"scored:{person}", now_iso()))

    def unseen_workouts(self, person, feed):
        """(feed items with a key or alias not yet recorded, those of them that are news, whether to announce them).

        An item is news only when neither its key nor an alias (a copy dedup or merge absorbed) was recorded.
        Read-only; a person's first scoring is silent."""
        with self.lock:
            known = {r["key"] for r in self.db.execute("SELECT key FROM announced_workouts WHERE person=?", (person,))}
        new = [w for w in feed if not {w["key"], *w["aliases"]} <= known]
        return (new, [w for w in new if known.isdisjoint([w["key"], *w["aliases"]])],
                self.kv_get(f"workouts_scored:{person}") is not None)

    def record_workouts(self, person, keys):
        with self.lock, self.db:
            self.db.executemany("INSERT OR IGNORE INTO announced_workouts VALUES(?,?)", [(person, k) for k in keys])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"workouts_scored:{person}", now_iso()))

    def records(self, person):
        """({record id: stored value}, whether to announce changes: False on the person's first record pass). Read-only."""
        with self.lock:
            known = {r["id"]: r["value"] for r in self.db.execute("SELECT id, value FROM records WHERE person=?", (person,))}
        return known, self.kv_get(f"records_scored:{person}") is not None

    def record_holders(self, person):
        """{(record id, workout key)}: every workout that has held a record. Read-only."""
        with self.lock:
            return {(r["id"], r["key"]) for r in self.db.execute("SELECT id, key FROM record_holders WHERE person=?", (person,))}

    def save_records(self, person, values, holders):
        with self.lock, self.db:
            self.db.executemany("INSERT OR REPLACE INTO records VALUES(?,?,?)", [(person, i, v) for i, v in values.items()])
            self.db.executemany("INSERT OR IGNORE INTO record_holders VALUES(?,?,?)", [(person, i, k) for i, k in holders])
            self.db.execute("INSERT OR REPLACE INTO kv VALUES(?,?)", (f"records_scored:{person}", now_iso()))
