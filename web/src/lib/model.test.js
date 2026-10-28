import { test } from "node:test";
import assert from "node:assert/strict";
import { counts, goals, ringFractions, stepsLine, togetherLine, rewardLine, levelProgress, weekLabel, staleSince, feedRow, planBar, layout, shortDate, pendingDone, PENDING_MS, serial, shoeRow, goalsDraft, clampGoal, isoWeek, goalsDone, withPendingGoals, weekBars, localDay, stepsSummary, liftLine, recentLifts, allLifts, paceText, recordKeys } from "./model.js";

const week = { runs: 1, workouts: 2, active_days: 3, bonus: 1, goal: { runs: 2, workouts: 2, active_days: 4, steps: 10000 }, days_left: 3, week: "2026-W44" };

test("ringFractions: runs, workouts, active days against their goals, clamped to 0..1", () => {
  assert.deepEqual(ringFractions(week), [0.5, 1, 0.75]);
  assert.deepEqual(ringFractions({ ...week, runs: 5, active_days: 9 }), [1, 1, 1]);
  assert.deepEqual(ringFractions({ ...week, runs: 0, workouts: 1, active_days: 0 }), [0, 0.5, 0]);
});

test("ringFractions: goal 0 is always full", () => {
  const zero = { runs: 0, workouts: 0, active_days: 0, bonus: 0, goal: { runs: 0, workouts: 0, active_days: 0 } };
  assert.deepEqual(ringFractions(zero), [1, 1, 1]);
  assert.deepEqual(ringFractions({ ...zero, goal: { runs: 0, workouts: 2, active_days: 4 }, workouts: 1, active_days: 1 }), [1, 0.5, 0.25]);
});

test("ringFractions: an older payload (gym, no active_days) still reads", () => {
  const old = { runs: 1, gym: 1, bonus: 1, goal: { runs: 2, gym: 2 } };
  assert.deepEqual(ringFractions(old), [0.5, 0.5, 1]);
  assert.deepEqual(ringFractions({ ...old, goal: { runs: 2, gym: 2, active_days: 3 } }), [0.5, 0.5, 0]);
  assert.deepEqual(ringFractions({ ...old, workouts: 2, goal: { ...old.goal, workouts: 4 } }), [0.5, 0.5, 1]); // workouts wins over gym
});

test("stepsLine: steps so far and what is left, Active day once reached, nothing without a sensor", () => {
  assert.equal(stepsLine(8412, 10000), "👟 8,412 steps today · 1,588 to go");
  assert.equal(stepsLine(10000, 10000), "👟 10,000 steps today · Active day ✓");
  assert.equal(stepsLine(12034, 10000), "👟 12,034 steps today · Active day ✓");
  assert.equal(stepsLine(0, 10000), "👟 0 steps today · 10,000 to go");
  assert.equal(stepsLine(null, 10000), null);
  assert.equal(stepsLine(undefined, 10000), null);
  assert.equal(stepsLine(500, undefined), "👟 500 steps today"); // an older payload without a steps goal
});

const person1 = { name: "Person1", week: { ...week, goal_met: true } };
const person2 = { name: "Person2", week: { runs: 1, workouts: 1, active_days: 1, goal_met: false, goal: { runs: 1, workouts: 1, active_days: 3, steps: 8000 } } };
const people = { person1, person2 };
const gw = (over) => ({ mode: "own", met: false, reward: "Pizza night", together: { done: 0, target: 1 }, team: { done: 0, target: 8 }, members_met: { person1: true, person2: false }, ...over });

test("togetherLine: each member's goals, then the mode's own count", () => {
  assert.equal(togetherLine(gw(), people), "Person1 ✓ · Person2 2 of 3");
  assert.equal(togetherLine(gw({ mode: "together" }), people), "Person1 ✓ · Person2 2 of 3 · 0 of 1 together");
  assert.equal(togetherLine(gw({ mode: "together", together: { done: 1, target: 1 } }), people), "Person1 ✓ · Person2 2 of 3 · 1 of 1 together ✓");
  assert.equal(togetherLine(gw({ mode: "team", team: { done: 5, target: 8 } }), people), "5 of 8 team points");
  assert.equal(togetherLine(gw({ mode: "team", met: true, team: { done: 9, target: 8 } }), people), "9 of 8 team points ✓");
});

test("togetherLine: a member with no goal to count shows a tick, an unknown id its id, an older week its gym", () => {
  const none = { name: "Person2", week: { runs: 0, workouts: 0, active_days: 0, goal: { runs: 0, workouts: 0, active_days: 0 } } };
  assert.equal(togetherLine(gw({ members_met: { person2: true } }), { person2: none }), "Person2 ✓");
  assert.equal(togetherLine(gw({ members_met: { ghost: false } }), people), "ghost 0 of 0");
  const old = { name: "Old", week: { runs: 1, gym: 1, goal: { runs: 1, gym: 1 } } };
  assert.equal(togetherLine(gw({ members_met: { old: false } }), { old }), "Old 2 of 2");
});

test("counts and goals: an older payload's gym and missing fields read as workouts and 0", () => {
  const w = { runs: 1, gym: 2, goal: { runs: 2, gym: 3 } };
  assert.deepEqual([counts(w), goals(w)], [[1, 2, 0], [2, 3, 0]]);
  assert.deepEqual(counts({ runs: 0, goal: {} }), [0, 0, 0]);
});

test("rewardLine: what unlocks it, then unlocked, nothing without a reward", () => {
  assert.equal(rewardLine(gw()), "Pizza night: unlocks when you both make your goals");
  assert.equal(rewardLine(gw({ mode: "together", together: { done: 0, target: 2 } })), "Pizza night: unlocks when you both make your goals and do 2 together");
  assert.equal(rewardLine(gw({ mode: "team", team: { done: 0, target: 8 } })), "Pizza night: unlocks when you reach 8 team points");
  assert.equal(rewardLine(gw({ met: true })), "Pizza night unlocked!");
  assert.equal(rewardLine(gw({ reward: "" })), null);
  assert.equal(rewardLine(gw({ reward: "", met: true })), null);
});

test("levelProgress: xp inside the current level", () => {
  assert.deepEqual(levelProgress({ level: 3, xp: 250, level_floor: 200, next_level_xp: 400 }), { level: 3, into: 50, span: 200, frac: 0.25 });
  assert.deepEqual(levelProgress({ level: 1, xp: 0, level_floor: 0, next_level_xp: 100 }), { level: 1, into: 0, span: 100, frac: 0 });
  assert.equal(levelProgress({ level: 2, xp: 500, level_floor: 200, next_level_xp: 400 }).frac, 1);
});

test("weekLabel: week number and days left, singular at 1", () => {
  assert.equal(weekLabel({ week: "2026-W44", days_left: 3 }), "Week 44 · 3 days left");
  assert.equal(weekLabel({ week: "2026-W44", days_left: 1 }), "Week 44 · 1 day left");
  assert.equal(weekLabel({ week: "2027-W01", days_left: 0 }), "Week 1 · 0 days left");
  assert.equal(weekLabel({ week: "2026-W05", days_left: 2 }), "Week 5 · 2 days left");
});

test("staleSince: local HH:MM once older than the limit, else null", () => {
  const at = new Date(2026, 9, 26, 22, 10);
  const at8 = at.toISOString();
  assert.equal(staleSince(at8, new Date(2026, 9, 26, 22, 24)), null);
  assert.equal(staleSince(at8, new Date(2026, 9, 26, 22, 25)), null);
  assert.equal(staleSince(at8, new Date(2026, 9, 26, 22, 26)), "Updated 22:10");
  assert.equal(staleSince(new Date(2026, 9, 26, 7, 5).toISOString(), new Date(2026, 9, 26, 9, 0)), "Updated 07:05");
  assert.equal(staleSince(at8, new Date(2026, 9, 26, 22, 20), 5), "Updated 22:10");
});

const run = { key: "endurain:1", kind: "run", name: "Morning Run", start: "2026-10-26T07:30:00+01:00", minutes: 28, km: 3.1, avg_hr: 151, plan: "W1D2", xp: 24, excluded: false, url: "https://e/1" };

test("feedRow: a run with pace, hr, plan and link", () => {
  assert.deepEqual(feedRow(run), {
    title: "Morning Run", when: "Mon 26 Oct, 07:30", duration: "28 min", xp: "+24",
    detail: { km: "3.1 km", pace: "9:02 /km", hr: "151 bpm", plan: "W1D2", url: "https://e/1" },
    removable: "remove",
  });
});

test("feedRow: gym has no pace or km, long durations in hours, no xp when 0", () => {
  const gym = { key: "opengym:9", kind: "gym", name: "Gym", start: "2026-10-25T18:05:00+01:00", minutes: 65, km: null, avg_hr: null, plan: null, xp: 0, excluded: false, url: null };
  assert.deepEqual(feedRow(gym), {
    title: "Gym", when: "Sun 25 Oct, 18:05", duration: "1 h 05 min", xp: "",
    detail: { km: null, pace: null, hr: null, plan: null, url: null },
    removable: "remove",
  });
  assert.equal(feedRow({ ...gym, minutes: 60 }).duration, "1 h");
});

test("feedRow: an active day shows its steps, has no Remove", () => {
  const day = { key: "steps:person1:2026-10-26", kind: "active_day", name: "Active day", start: "2026-10-26T00:00:00+01:00", minutes: 0, km: null, avg_hr: null, plan: null, xp: 15, steps: 12034, excluded: false, url: null };
  assert.deepEqual(feedRow(day), {
    title: "Active day", when: "Mon 26 Oct", duration: "12,034 steps", xp: "+15",
    detail: { km: null, pace: null, hr: null, plan: null, url: null },
    removable: null,
  });
});

test("feedRow: pace only for run and walk with a distance", () => {
  assert.equal(feedRow({ ...run, kind: "walk" }).detail.pace, "9:02 /km");
  assert.equal(feedRow({ ...run, kind: "gym" }).detail.pace, null);
  assert.equal(feedRow({ ...run, km: 0 }).detail.pace, null);
  assert.equal(feedRow({ ...run, km: null }).detail.km, null);
});

test("feedRow: a malformed start gives an empty date, not a throw", () => {
  assert.equal(feedRow({ ...run, start: "yesterday" }).when, "");
});

test("feedRow: removable is restore when excluded, delete for manual keys, else remove", () => {
  assert.equal(feedRow({ ...run, excluded: true }).removable, "restore");
  assert.equal(feedRow({ ...run, key: "manual:12-ab" }).removable, "delete");
  assert.equal(feedRow({ ...run, key: "manual:12-ab", excluded: true }).removable, "restore");
  assert.equal(feedRow(run).removable, "remove");
});

test("planBar: warm-up walk then intervals as fractions of the total", () => {
  const plan = { state: "W1D2", plan: "c25k", completed: 1, week: 1, day: 2, target: "5 km", due_today: true, warmup_s: 300, intervals: [["run", 60], ["walk", 90], ["run", 60], ["walk", 90]] };
  assert.deepEqual(planBar(plan), [
    { kind: "walk", frac: 0.5 }, { kind: "run", frac: 0.1 }, { kind: "walk", frac: 0.15 }, { kind: "run", frac: 0.1 }, { kind: "walk", frac: 0.15 },
  ]);
  assert.deepEqual(planBar({ state: "W1D2", warmup_s: 0, intervals: [["run", 30], ["walk", 30]] }), [{ kind: "run", frac: 0.5 }, { kind: "walk", frac: 0.5 }]);
});

test("planBar: graduated plan has no bar", () => {
  assert.deepEqual(planBar({ state: "Graduated", plan: "c25k", completed: 27, week: null, day: null, target: null, due_today: false, warmup_s: null, intervals: [] }), []);
});

test("layout: the viewer's own tile first, the rest after", () => {
  const people = { alex: {}, sam: {} };
  assert.deepEqual(layout({ person: "sam", can_edit: ["sam"] }, people), { self: "sam", others: ["alex"] });
  assert.deepEqual(layout({ person: null, can_edit: [] }, people), { self: null, others: ["alex", "sam"] });
  assert.deepEqual(layout({ person: "gone", can_edit: [] }, people), { self: null, others: ["alex", "sam"] });
});

test("shortDate: day and month", () => {
  assert.equal(shortDate("2026-10-23"), "23 Oct");
  assert.equal(shortDate("2027-01-05"), "5 Jan");
});

test("pendingDone: settles when the payload shows the asked state, the workout is gone, or 10 min pass", () => {
  const feed = [{ key: "e:1", excluded: false }, { key: "manual:2", excluded: false }];
  const at = 1_000_000;
  const remove = { key: "e:1", want: true, at };
  assert.equal(pendingDone(remove, feed, at + 60000), false);
  assert.equal(pendingDone(remove, [{ key: "e:1", excluded: true }], at + 60000), true);
  assert.equal(pendingDone(remove, feed, at + 7 * 60000), false); // a scoring cycle (~5-6 min) plus a poll can pass first
  assert.equal(pendingDone(remove, feed, at + PENDING_MS + 1), true);
  assert.equal(pendingDone({ key: "e:1", want: false, at }, feed, at), true); // an Undo before fitbridge applied the remove
  const del = { key: "manual:2", want: null, at };
  assert.equal(pendingDone(del, feed, at + 60000), false);
  assert.equal(pendingDone(del, feed.slice(0, 1), at + 60000), true);
  assert.equal(pendingDone(remove, [], at), true);
});

test("serial: a call for the same id waits until the previous one settled, even a failed one", async () => {
  const tails = {}, log = [];
  let release;
  const first = serial(tails, "p/k", () => new Promise((_, reject) => (release = () => reject(new Error("503")))).finally(() => log.push("remove")));
  const second = serial(tails, "p/k", async () => log.push("restore"));
  const other = serial(tails, "p/x", async () => log.push("other"));
  await other;
  assert.deepEqual(log, ["other"]); // another workout does not wait; the Undo waits for its Remove
  release();
  await assert.rejects(first);
  await second;
  assert.deepEqual(log, ["other", "remove", "restore"]);
  await new Promise((r) => setTimeout(r));
  assert.deepEqual(tails, {}); // nothing kept once idle
});

test("shoeRow: km toward the limit, Replace soon from 90 %, Replace from 100 %", () => {
  const shoe = { name: "Hoka", km: 412.4, limit: 700, runs: 40, last_run: "2026-10-26T12:00:00Z" };
  assert.deepEqual(shoeRow(shoe), { name: "Hoka", km: "412 / 700 km", frac: 412.4 / 700, state: "ok", label: null, detail: "40 runs · last run 26 Oct" });
  assert.equal(shoeRow({ ...shoe, km: 4.13 }).km, "4.1 / 700 km");
  assert.deepEqual([629.9, 630, 699.9].map((km) => shoeRow({ ...shoe, km }).state), ["ok", "soon", "soon"]);
  assert.equal(shoeRow({ ...shoe, km: 630 }).label, "Replace soon");
  const worn = shoeRow({ ...shoe, km: 812 });
  assert.equal(worn.state, "replace");
  assert.equal(worn.label, "Replace");
  assert.equal(worn.frac, 1);
});

test("shoeRow: unknown km, one run, no runs yet", () => {
  const gone = shoeRow({ name: "sensor.gone", km: null, limit: 500, runs: null, last_run: null });
  assert.deepEqual(gone, { name: "sensor.gone", km: "—", frac: 0, state: "unknown", label: null, detail: "" });
  assert.equal(shoeRow({ name: "Nike", km: 3, limit: 700, runs: 1, last_run: "2026-10-05T12:00:00Z" }).detail, "1 run · last run 5 Oct");
  assert.equal(shoeRow({ name: "Nike", km: 0, limit: 700, runs: 0, last_run: null }).detail, "No runs yet");
});

const twoPeople = { person1: { name: "Person1" }, person2: { name: "Person2" } };
const defaults = { person1: { runs: 2, workouts: 1, active_days: 3, steps: 10000 }, person2: { runs: 1, workouts: 1, active_days: 0, steps: 8000 } };

test("goalsDraft: the current entry wins, without its from", () => {
  const current = { from: "2026-10-26", people: { person1: { runs: 3, workouts: 2, active_days: 4, steps: 12000 }, person2: { runs: 1, workouts: 2, active_days: 3, steps: 9000 } },
    couple: { mode: "team", together: 2, team: 10, reward: "Pizza night" } };
  const { from, ...entry } = current;
  assert.deepEqual(goalsDraft({ current, defaults }, twoPeople), entry);
});

test("goalsDraft: defaults (and couple own/1/8/\"\") without a current entry; a person missing from it uses the defaults", () => {
  assert.deepEqual(goalsDraft({ current: null, defaults }, twoPeople), { people: defaults, couple: { mode: "own", together: 1, team: 8, reward: "" } });
  const current = { from: "2026-10-26", people: { person1: { runs: 3, workouts: 2, active_days: 4, steps: 12000 } }, couple: { mode: "own", together: 1, team: 8, reward: "" } };
  assert.deepEqual(goalsDraft({ current, defaults }, twoPeople).people.person2, defaults.person2);
  // an older payload's defaults may lack a field: scoring.toml's defaults, inside the limits
  assert.deepEqual(goalsDraft({ current: null, defaults: { person1: { runs: 2, workouts: 1, active_days: null, steps: null } } }, { person1: {} }).people.person1,
    { runs: 2, workouts: 1, active_days: 0, steps: 10000 });
});

test("clampGoal: the settings limits; steps snap to 1000", () => {
  assert.equal(clampGoal("runs", 8), 7);
  assert.equal(clampGoal("runs", -1), 0);
  assert.equal(clampGoal("workouts", 3), 3);
  assert.equal(clampGoal("active_days", 9), 7);
  assert.equal(clampGoal("steps", 10499), 10000);
  assert.equal(clampGoal("steps", 31000), 30000);
  assert.equal(clampGoal("steps", 1000), 2000);
  assert.equal(clampGoal("together", 0), 1);
  assert.equal(clampGoal("together", 4), 3);
  assert.equal(clampGoal("team", 50), 42);
  assert.equal(clampGoal("team", 0), 1);
});

test("isoWeek: the ISO week number of a date", () => {
  assert.equal(isoWeek("2026-10-26"), 44);
  assert.equal(isoWeek("2026-01-01"), 1);
  assert.equal(isoWeek("2027-01-01"), 53); // a Friday in 2026's last week
  assert.equal(isoWeek("2024-12-30"), 1);
});

test("goalsDone: pending new goals settle once every person's week.goal matches, or 10 min pass", () => {
  const at = 1_000_000;
  const entry = { people: { person1: { runs: 3, workouts: 2, active_days: 4, steps: 12000 } }, couple: { mode: "own", together: 1, team: 8, reward: "" } };
  const pend = { entry, at };
  const p = (goal) => ({ person1: { week: { goal } } });
  assert.equal(goalsDone(pend, p({ runs: 2, workouts: 2, active_days: 4, steps: 12000 }), at + 60000), false);
  assert.equal(goalsDone(pend, p({ runs: 3, workouts: 2, active_days: 4, steps: 12000 }), at + 60000), true);
  assert.equal(goalsDone(pend, p({ runs: 3, gym: 2, active_days: 4, steps: 12000 }), at + 60000), true); // older payload
  assert.equal(goalsDone(pend, p({ runs: 2, workouts: 2, active_days: 4, steps: 12000 }), at + PENDING_MS + 1), true);
  assert.equal(goalsDone(pend, {}, at), true); // nobody left to show it
});

test("withPendingGoals: the people with their pending goals shown, flagged; unchanged without any", () => {
  const people = { person1: { name: "Person1", week: { runs: 1, goal: { runs: 2, gym: 1, active_days: 0, steps: 10000 } } }, sam: { name: "Sam", week: { runs: 0, goal: { runs: 1 } } } };
  assert.equal(withPendingGoals(people, null), people);
  const shown = withPendingGoals(people, { people: { person1: { runs: 3, workouts: 2, active_days: 4, steps: 12000 } } });
  assert.deepEqual(shown.person1.week, { runs: 1, goal: { runs: 3, gym: 1, workouts: 2, active_days: 4, steps: 12000 }, goal_pending: true });
  assert.equal(shown.sam, people.sam);
  assert.equal(people.person1.week.goal.runs, 2); // the payload itself is untouched
});

const wed = { "2026-10-26": 8412, "2026-10-27": 12034, "2026-10-28": 3000 };

test("weekBars: Monday to Sunday of today's week, the days after today future", () => {
  const { bars, goalFrac } = weekBars(wed, 10000, "2026-10-28");
  assert.deepEqual(bars.map((b) => b.label), ["M", "T", "W", "T", "F", "S", "S"]);
  assert.deepEqual(bars.map((b) => b.date), ["2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-10-31", "2026-11-01"]);
  assert.deepEqual(bars.map((b) => b.future), [false, false, false, true, true, true, true]);
  assert.deepEqual(bars.map((b) => b.isToday), [false, false, true, false, false, false, false]);
  assert.deepEqual(bars.map((b) => b.active), [false, true, false, false, false, false, false]);
  assert.deepEqual(bars.map((b) => b.steps), [8412, 12034, 3000, null, null, null, null]);
  assert.equal(bars[0].frac, 8412 / 12034); // the tallest bar fills the chart when it passes the goal
  assert.equal(bars[3].frac, 0);
  assert.equal(goalFrac, 10000 / 12034); // the goal line sits at the same scale as the bars
});

test("weekBars: the goal sets the scale, a missing past day is 0 steps, goal 0 activates nothing", () => {
  const { bars, goalFrac } = weekBars({ "2026-10-28": 2500 }, 10000, "2026-10-28");
  assert.equal(goalFrac, 1);
  assert.equal(bars[2].frac, 0.25);
  assert.equal(bars[0].steps, 0);
  assert.equal(bars[0].future, false);
  assert.ok(weekBars(wed, 0, "2026-10-28").bars.every((b) => !b.active));
  assert.ok(weekBars({}, 0, "2026-10-28").bars.every((b) => b.frac === 0));
  assert.equal(weekBars(wed, 0, "2026-10-28").goalFrac, null); // no goal, no line
});

test("weekBars: Sunday closes the week, Monday opens a new one; no step sensor or an older payload gives null", () => {
  assert.equal(weekBars({}, 10000, "2026-11-01").bars[6].isToday, true);
  assert.equal(weekBars({}, 10000, "2026-11-01").bars[0].date, "2026-10-26");
  assert.equal(weekBars({}, 10000, "2026-11-02").bars[0].isToday, true);
  assert.equal(weekBars(null, 10000, "2026-10-28"), null);
  assert.equal(weekBars(undefined, 10000, "2026-10-28"), null);
});

test("localDay: YYYY-MM-DD from the local date parts, zero-padded, whatever the locale", () => {
  assert.equal(localDay(new Date(2026, 9, 28, 23, 59)), "2026-10-28");
  assert.equal(localDay(new Date(2026, 0, 5, 0, 1)), "2026-01-05");
});

test("stepsSummary: active days and the week's steps, singular for one", () => {
  assert.equal(stepsSummary(weekBars(wed, 10000, "2026-10-28").bars), "1 active day · 23,446 steps");
  assert.equal(stepsSummary(weekBars({ ...wed, "2026-10-28": 11000 }, 10000, "2026-10-28").bars), "2 active days · 31,446 steps");
  assert.equal(stepsSummary(weekBars({}, 10000, "2026-10-28").bars), "0 active days · 0 steps");
});

const lifts = [
  { id: "1", name: "Barbell row", w: 40, r: 8, unit: "kg", date: "2026-10-12", key: "lift:1" },
  { id: "2", name: "Goblet squat", w: 22.5, r: 5, unit: "lb", date: "2026-10-05", key: "lift:2" },
  { id: "3", name: "Bench press", w: 50, r: 5, unit: "kg", date: "2026-09-30", key: "lift:3" },
  { id: "4", name: "Deadlift", w: 80, r: 3, unit: "kg", date: "2026-09-20", key: "lift:4" },
  { id: "5", name: "Curl", w: 12.5, r: 10, unit: "kg", date: "2026-09-10", key: "lift:5" },
  { id: "6", name: "Overhead press", w: 30, r: 6, unit: "kg", date: "2026-09-01", key: "lift:6" },
];

test("liftLine: name, weight without a trailing .0, reps, day and short month", () => {
  assert.equal(liftLine(lifts[0]), "Barbell row · 40 kg × 8 · 12 Oct");
  assert.equal(liftLine(lifts[1]), "Goblet squat · 22.5 lb × 5 · 5 Oct");
  assert.equal(liftLine({ ...lifts[0], w: 40.0, date: "2026-09-03" }), "Barbell row · 40 kg × 8 · 3 Sep");
});

test("recentLifts: the first n as sent (newest first); allLifts: A-Z by name, input untouched", () => {
  assert.deepEqual(recentLifts(lifts).map((l) => l.id), ["1", "2", "3", "4", "5"]);
  assert.deepEqual(recentLifts(lifts, 2).map((l) => l.id), ["1", "2"]);
  assert.deepEqual(allLifts(lifts).map((l) => l.name), ["Barbell row", "Bench press", "Curl", "Deadlift", "Goblet squat", "Overhead press"]);
  assert.equal(lifts[0].id, "1");
});

test("paceText: m:ss", () => {
  assert.equal(paceText(372), "6:12");
  assert.equal(paceText(600), "10:00");
  assert.equal(paceText(245), "4:05");
});

test("recordKeys: the keys of the lift records and the fastest 1 km", () => {
  const pbs = { lifts: lifts.slice(0, 2), fastest_1k: { seconds: 372, date: "2026-10-20", key: "endurain:7", url: null } };
  assert.deepEqual([...recordKeys(pbs)].sort(), ["endurain:7", "lift:1", "lift:2"]);
  assert.deepEqual([...recordKeys({ lifts: [], fastest_1k: null })], []);
});

test("an older payload without steps_week, pbs.lifts or pbs.fastest_1k never throws", () => {
  assert.equal(weekBars(undefined, undefined, "2026-10-28"), null);
  assert.deepEqual(recentLifts(undefined), []);
  assert.deepEqual(allLifts(undefined), []);
  const old = { longest_session_km: 6.2, prs: 2, gym_tonnes: 0 };
  assert.deepEqual([...recordKeys(old)], []);
  assert.deepEqual([...recordKeys({ ...old, lifts: lifts.slice(0, 1) })], ["lift:1"]);
  assert.deepEqual([...recordKeys(undefined)], []);
});

test("one session holding two lift records: both lifts stay, the key is shared", () => {
  const two = [lifts[0], { ...lifts[2], key: lifts[0].key }];
  assert.deepEqual(recentLifts(two).map((l) => l.id), ["1", "3"]);
  assert.deepEqual(allLifts(two).map((l) => l.id), ["1", "3"]);
  assert.deepEqual([...recordKeys({ lifts: two })], ["lift:1"]);
  assert.equal(new Set(two.map((l) => l.id)).size, 2); // the each-key
});
