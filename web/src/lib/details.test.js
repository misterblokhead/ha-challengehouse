import test from "node:test";
import assert from "node:assert/strict";
import { charts, clock, detailActions, figures, gymRows, header, noteText, splitRows, vizState, zoneRows } from "./details.js";

// an invented run around 0°, 0° in the shape of GET workout
const summary = {
  key: "r1", kind: "run", name: "Run", source: "opentracks", start: "2026-10-27T18:36:18+01:00", end: "2026-10-27T19:06:18+01:00",
  minutes: 30, km: 3.9, avg_hr: 150.4, max_hr: 178, kcal: 310, plan: "W1D1", shoe: { id: 1, name: "Trail" }, counts: true, reason: null,
};
const run = {
  summary, route: [[[0, 0], [0.01, 0], [0.01, 0.01]]], gain_m: 560, max_hr: 178, gym: null, note: null,
  series: { t: [0, 8, 14], dist: [0, 22, 39], pace: [null, 360, 400], hr: [140, 144, null], ele: [10, 14, 12] },
  splits: [{ km: 1, s: 359.7, pace: 360, hr: 144, climb: 14 }, { km: 1, s: 372.2, pace: 372, hr: 150, climb: null }, { km: 0.43, s: 170, pace: 395, hr: null, climb: 2.5 }],
  zones: [0, 0, 418, 980, 0],
};
const ride = { ...run, summary: { ...summary, kind: "home", name: "Ride", km: 12, shoe: null, plan: null } };
const indoor = { ...run, route: null, series: null, splits: [], zones: null, gain_m: null };
const gym = {
  ...indoor, summary: { ...summary, kind: "gym", name: "Gym", km: null, avg_hr: null, max_hr: null, kcal: null, plan: null, shoe: null },
  gym: { exercises: [{ name: "Bench press", w: 52, r: 12, unit: "kg", record: true }, { name: "Squat", w: 60, r: 8, unit: "kg", record: false }], vol_kg: 2400 },
};

test("header: date, start–end, duration and plan session", () => {
  assert.deepEqual(header(summary), { title: "Run", date: "Tue 27 Oct", time: "18:36–19:06", duration: "30 min", plan: "W1D1" });
  assert.equal(header({ ...summary, end: null }).time, "18:36");
});

test("figures: a run has distance, pace, gain, heart rate, kcal and its shoe", () => {
  assert.deepEqual(figures(run), [
    ["Distance", "3.9 km"], ["Pace", "7:42 /km"], ["Elevation gain", "560 m"],
    ["Avg heart rate", "150 bpm"], ["Max heart rate", "178 bpm"], ["Calories", "310 kcal"], ["Shoe", "Trail"],
  ]);
  assert.deepEqual(figures({ ...run, summary: { ...summary, kind: "walk", shoe: null } })[1], ["Pace", "7:42 /km"]);
});

test("figures: a ride with a route shows speed instead of pace", () => {
  assert.deepEqual(figures(ride).slice(0, 2), [["Distance", "12.0 km"], ["Speed", "24.0 km/h"]]);
  assert.ok(!figures(ride).some(([k]) => k === "Pace" || k === "Shoe"));
});

test("figures: without a route only the figures that exist", () => {
  assert.deepEqual(figures(indoor).map(([k]) => k), ["Distance", "Pace", "Avg heart rate", "Max heart rate", "Calories", "Shoe"]);
  const bike = { ...indoor, summary: { ...summary, kind: "home", shoe: null } }; // no route: neither pace nor speed
  assert.deepEqual(figures(bike).map(([k]) => k), ["Distance", "Avg heart rate", "Max heart rate", "Calories"]);
  assert.deepEqual(figures({ ...indoor, summary: { ...summary, km: 0 } }).map(([k]) => k)[0], "Avg heart rate"); // no distance, no pace
});

test("figures and gym rows: a gym session's best sets with 🏆, its volume and a merged Watch's heart rate", () => {
  assert.deepEqual(figures(gym), []);
  assert.deepEqual(figures({ ...gym, summary: { ...gym.summary, avg_hr: 110, kcal: 250 } }), [["Avg heart rate", "110 bpm"], ["Calories", "250 kcal"]]);
  assert.deepEqual(gymRows(gym.gym), {
    exercises: [{ name: "Bench press", set: "52 kg × 12", record: true }, { name: "Squat", set: "60 kg × 8", record: false }],
    volume: "2,400 kg",
  });
  assert.equal(gymRows(null), null);
});

test("splitRows: per km, the last partial km with its distance", () => {
  assert.deepEqual(splitRows(run), [
    { km: "1", time: "6:00", pace: "6:00", hr: "144", climb: "14 m" },
    { km: "2", time: "6:12", pace: "6:12", hr: "150", climb: "—" },
    { km: "0.43 km", time: "2:50", pace: "6:35", hr: "—", climb: "3 m" },
  ]);
  assert.deepEqual(splitRows(ride).map((r) => r.pace), ["10.0", "9.7", "9.1"]); // km/h
  const odd = [{ km: 1, s: 0, pace: 0, hr: null, climb: null }, { km: 1, s: 300, pace: null, hr: null, climb: null }];
  assert.deepEqual(splitRows({ ...ride, splits: odd }).map((r) => r.pace), ["—", "—"]); // no pace: no speed, not a throw
  assert.deepEqual(splitRows({ ...run, splits: odd }).map((r) => r.pace), ["—", "—"]);
});

test("zoneRows: time and share per zone, bpm from max HR; null without zones", () => {
  assert.deepEqual(zoneRows(run.zones, 178), [
    { zone: "Z1", bpm: "89–107", time: "0:00", pct: 0 },
    { zone: "Z2", bpm: "107–125", time: "0:00", pct: 0 },
    { zone: "Z3", bpm: "125–142", time: "6:58", pct: 30 },
    { zone: "Z4", bpm: "142–160", time: "16:20", pct: 70 },
    { zone: "Z5", bpm: "160+", time: "0:00", pct: 0 },
  ]);
  assert.equal(zoneRows(null, 178), null);
});

test("charts: pace (or speed), heart rate and elevation; an all-null series has no graph", () => {
  const c = charts(run);
  assert.deepEqual(c.x, [0, 8, 14]);
  assert.deepEqual(c.list.map((g) => [g.label, g.values]), [["Pace /km", [null, 360, 400]], ["Heart rate", [140, 144, null]], ["Elevation m", [10, 14, 12]]]);
  assert.deepEqual(charts(ride).list[0].values, [null, 10, 9]); // km/h
  assert.deepEqual(charts({ ...run, series: { ...run.series, hr: [null, null, null] } }).list.map((g) => g.label), ["Pace /km", "Elevation m"]);
  assert.equal(charts(indoor), null);
});

test("clock: m:ss, h:mm:ss from an hour", () => {
  assert.equal(clock(59.6), "1:00");
  assert.equal(clock(3725), "1:02:05");
});

test("detailActions: read-only viewers get none; own workouts remove/restore, plus the shoe for runs", () => {
  const item = { key: "r1", kind: "run", excluded: false };
  assert.deepEqual(detailActions({ person: "sam", can_edit: ["sam"] }, "alex", item), { remove: null, shoe: false });
  assert.deepEqual(detailActions({ person: null }, "alex", item), { remove: null, shoe: false }); // the wall kiosk
  const me = { person: "alex", can_edit: ["alex"] };
  assert.deepEqual(detailActions(me, "alex", item), { remove: "remove", shoe: true });
  assert.deepEqual(detailActions(me, "alex", { ...item, excluded: true }), { remove: "restore", shoe: true });
  assert.deepEqual(detailActions(me, "alex", { key: "g1", kind: "gym", excluded: false }), { remove: "remove", shoe: false });
  assert.deepEqual(detailActions(me, "alex", { key: "manual:1-ab", kind: "home", excluded: false }), { remove: "delete", shoe: false });
});

test("vizState: a failed map load keeps the figures and says so", () => {
  assert.deepEqual(vizState(new Error("chunk failed")), { map: false, message: "Map unavailable" });
  assert.deepEqual(vizState(null), { map: true, message: null });
});

test("noteText: a missing or unreadable route file", () => {
  assert.equal(noteText("file_missing"), "Route file not found");
  assert.equal(noteText("file_unreadable"), "Route file unreadable");
  assert.equal(noteText(null), null);
});
