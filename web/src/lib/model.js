// Pure helpers behind the page: everything the components show is computed here so it can be tested without a DOM.
const clamp = (x) => Math.min(1, Math.max(0, x));
const pad = (n) => String(n).padStart(2, "0");
const ratio = (n, goal) => (goal > 0 ? clamp(n / goal) : 1); // goal 0: nothing to do, so the ring is full

// Older payloads (mid-deploy) call workouts `gym` and have no active days; every reader of the week and its goals goes through these.
// shortcut: mid-deploy gym alias, delete once every fitbridge sends `workouts`.
const workouts = (x) => x.workouts ?? x.gym ?? 0;
export const goals = (w) => [w.goal.runs, workouts(w.goal), w.goal.active_days ?? 0];
export const counts = (w) => [w.runs, workouts(w), w.active_days ?? 0];

export const ringFractions = (w) => counts(w).map((n, i) => ratio(n, goals(w)[i]));

const num = (n) => n.toLocaleString("en-US");

// "👟 8,412 steps today · 1,588 to go"; null without a step sensor (`steps` null). `goal` missing (older payload): just the count.
export function stepsLine(steps, goal) {
  if (steps == null) return null;
  const tail = !(goal > 0) ? "" : steps >= goal ? " · Active day ✓" : ` · ${num(goal - steps)} to go`;
  return `👟 ${num(steps)} steps today${tail}`;
}

// The couple's week in its mode, from `group.week` and the people map: "Person1 ✓ · Person2 2 of 3", "... · 1 of 1 together ✓", "5 of 8 team points".
export function togetherLine(gw, people) {
  const tick = (done) => (done ? " ✓" : "");
  const member = ([id, met]) => {
    const p = people[id];
    if (met) return `${p?.name ?? id} ✓`;
    const g = p ? goals(p.week) : [];
    const n = p ? counts(p.week) : [];
    return `${p?.name ?? id} ${g.filter((x, i) => x > 0 && n[i] >= x).length} of ${g.filter((x) => x > 0).length}`;
  };
  if (gw.mode === "team") return `${gw.team.done} of ${gw.team.target} team points${tick(gw.met)}`;
  const parts = Object.entries(gw.members_met).map(member);
  if (gw.mode === "together") parts.push(`${gw.together.done} of ${gw.together.target} together${tick(gw.together.done >= gw.together.target)}`);
  return parts.join(" · ");
}

// The couple's reward: what unlocks it, then that it did; null when none is set.
export function rewardLine(gw) {
  if (!gw.reward) return null;
  if (gw.met) return `${gw.reward} unlocked!`;
  const when = { own: "you both make your goals", together: `you both make your goals and do ${gw.together.target} together`, team: `you reach ${gw.team.target} team points` };
  return `${gw.reward}: unlocks when ${when[gw.mode]}`;
}

export function levelProgress(p) {
  const into = p.xp - p.level_floor;
  const span = p.next_level_xp - p.level_floor;
  return { level: p.level, into, span, frac: span > 0 ? clamp(into / span) : 1 };
}

// `w.week` is the ISO week string, e.g. "2026-W05"
export const weekLabel = (w) => `Week ${Number(w.week.split("-W")[1])} · ${w.days_left} ${w.days_left === 1 ? "day" : "days"} left`;

export function staleSince(scoredAt, now, minutes = 15) {
  const at = new Date(scoredAt);
  return now - at > minutes * 60000 ? `Updated ${pad(at.getHours())}:${pad(at.getMinutes())}` : null;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// The feed's `start` is ISO with the household's offset; its own wall-clock fields are what people recognise, whatever the device's zone.
// `time` false: the date alone (an active day is a whole day, its start is midnight).
function when(start, time = true) {
  const m = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(start);
  if (!m) return "";
  const [, y, mo, d, hm] = m;
  const day = `${DAYS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()]} ${Number(d)} ${MONTHS[mo - 1]}`;
  return time ? `${day}, ${hm}` : day;
}

const duration = (m) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${pad(m % 60)} min` : `${m / 60} h`);

function pace(item) {
  if (!(item.kind === "run" || item.kind === "walk") || !(item.km > 0)) return null;
  const s = Math.round((item.minutes * 60) / item.km);
  return `${Math.floor(s / 60)}:${pad(s % 60)} /km`;
}

export const feedRow = (item) => ({
  title: item.name,
  when: when(item.start, item.kind !== "active_day"),
  duration: item.kind === "active_day" ? `${num(item.steps)} steps` : duration(item.minutes),
  xp: item.xp ? `+${item.xp}` : "",
  detail: {
    km: item.km == null ? null : `${item.km.toFixed(1)} km`,
    pace: pace(item),
    hr: item.avg_hr == null ? null : `${item.avg_hr} bpm`,
    plan: item.plan ?? null,
    url: item.url ?? null,
  },
  removable: item.kind === "active_day" ? null : item.excluded ? "restore" : item.key.startsWith("manual:") ? "delete" : "remove",
});

export function planBar(plan) {
  const segs = [["walk", plan.warmup_s ?? 0], ...plan.intervals].filter(([, s]) => s > 0);
  const total = segs.reduce((t, [, s]) => t + s, 0);
  return segs.map(([kind, s]) => ({ kind, frac: s / total }));
}

export function layout(viewer, people) {
  const self = Object.hasOwn(people, viewer.person) ? viewer.person : null;
  return { self, others: Object.keys(people).filter((id) => id !== self) };
}

// "2026-10-23" → "23 Oct" (a badge's unlock day)
export const shortDate = (iso) => `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

// A Remove, Restore or Delete the page sent stays pending until a payload shows it, or until PENDING_MS pass (then the payload wins).
// `entry.want`: the `excluded` value asked for, or null for a deleted manual entry (gone from the feed). A workout no longer in the
// feed has nothing left to show either way.
export const PENDING_MS = 10 * 60000; // fitbridge scores every ~305-365 s, the page polls every 60 s
export function pendingDone(entry, feed, now) {
  const item = feed.find((w) => w.key === entry.key);
  return now - entry.at > PENDING_MS || !item || (entry.want !== null && item.excluded === entry.want);
}

// Runs `fn` once the previous call for the same `id` has settled (failed or not), so an Undo never overtakes its Remove.
// `tails`: the caller's {id: promise} map; an id is dropped from it again once idle.
export function serial(tails, id, fn) {
  const run = (tails[id] ?? Promise.resolve()).then(fn);
  const tail = (tails[id] = run.catch(() => {}));
  tail.then(() => tails[id] === tail && delete tails[id]);
  return run;
}

// A shoe from the integration ({name, km, limit, runs, last_run}): km toward its replace-at limit, "Replace soon" from 90 %.
// `km` is null when HA has no number for the shoe's sensor.
export function shoeRow(s) {
  const km = (n) => (n < 10 ? n.toFixed(1) : Math.round(n).toLocaleString());
  const state = s.km == null ? "unknown" : s.km >= s.limit ? "replace" : s.km >= 0.9 * s.limit ? "soon" : "ok";
  const last = s.last_run ? new Date(s.last_run) : null;
  const runs = s.runs ? `${s.runs} ${s.runs === 1 ? "run" : "runs"}` : s.runs === 0 ? "No runs yet" : "";
  return {
    name: s.name,
    km: s.km == null ? "—" : `${km(s.km)} / ${km(s.limit)} km`,
    frac: s.km == null ? 0 : clamp(s.km / s.limit),
    state,
    label: { soon: "Replace soon", replace: "Replace" }[state] ?? null,
    detail: [runs, last && `last run ${last.getDate()} ${MONTHS[last.getMonth()]}`].filter(Boolean).join(" · "),
  };
}

// The Goals sheet. Settings limits (as the integration validates them): [min, max, step].
export const LIMITS = { runs: [0, 7, 1], workouts: [0, 7, 1], active_days: [0, 7, 1], steps: [2000, 30000, 1000], together: [1, 3, 1], team: [1, 42, 1] };
export const PERSON_GOALS = ["runs", "workouts", "active_days", "steps"];
const TOML_GOAL = { runs: 0, workouts: 0, active_days: 0, steps: 10000 }; // scoring.toml's defaults, for a field an older payload lacks

export function clampGoal(field, value) {
  const [lo, hi, step] = LIMITS[field];
  return Math.min(hi, Math.max(lo, Math.round(value / step) * step));
}

// The entry the sheet starts from (a POST body: no `from`): this week's settings, else each person's goal as scored now.
export function goalsDraft(res, people) {
  const cur = res.current;
  const goal = (id) => cur?.people?.[id] ?? res.defaults?.[id] ?? {};
  return {
    people: Object.fromEntries(Object.keys(people).map((id) => {
      const g = goal(id);
      return [id, Object.fromEntries(PERSON_GOALS.map((k) => [k, clampGoal(k, g[k] ?? TOML_GOAL[k])]))];
    })),
    couple: { mode: "own", together: 1, team: 8, reward: "", ...cur?.couple },
  };
}

// "2026-10-26" → 44
export function isoWeek(ymd) {
  const d = new Date(`${ymd}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7)); // the Thursday of its week decides the year
  return Math.ceil(((d - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7);
}

// Saved goals ({entry, at}) stay pending until every person's week.goal in a payload carries them, or PENDING_MS pass.
const sameGoal = (want, goal) => PERSON_GOALS.every((k) => (k === "workouts" ? workouts(goal) : goal[k]) === want[k]);
export const goalsDone = (pend, people, now) =>
  now - pend.at > PENDING_MS || Object.entries(pend.entry.people).every(([id, g]) => !people[id] || sameGoal(g, people[id].week.goal));

// The people as the tiles show them: pending goals in place of the scored ones, with `week.goal_pending`.
export function withPendingGoals(people, entry) {
  if (!entry) return people;
  const out = { ...people };
  for (const [id, g] of Object.entries(entry.people)) {
    const p = people[id];
    if (p) out[id] = { ...p, week: { ...p.week, goal: { ...p.week.goal, ...g }, goal_pending: true } };
  }
  return out;
}

// This week's steps as seven bars, Monday to Sunday of `today`'s week (`today`: the browser's local "YYYY-MM-DD"). `stepsWeek` has only the days
// the sensor reported: a past day missing from it is 0 steps, a day after today has none (`steps` null). null without a step sensor.
export function weekBars(stepsWeek, goal, today) {
  if (stepsWeek == null) return null;
  const t = Date.parse(`${today}T00:00:00Z`);
  const monday = t - ((new Date(t).getUTCDay() + 6) % 7) * 864e5;
  const days = Array.from({ length: 7 }, (_, i) => new Date(monday + i * 864e5).toISOString().slice(0, 10));
  const steps = days.map((d) => (d > today ? null : (stepsWeek[d] ?? 0)));
  const top = Math.max(goal ?? 0, ...steps.map((s) => s ?? 0));
  return days.map((date, i) => ({
    label: "MTWTFSS"[i], date, steps: steps[i], frac: top > 0 ? (steps[i] ?? 0) / top : 0,
    active: goal > 0 && steps[i] >= goal, isToday: date === today, future: date > today,
  }));
}

export function stepsSummary(bars) {
  const active = bars.filter((b) => b.active).length;
  return `${active} active ${active === 1 ? "day" : "days"} · ${num(bars.reduce((s, b) => s + (b.steps ?? 0), 0))} steps`;
}

// "Barbell row · 40 kg × 8 · 12 Oct"
export const liftLine = (l) => `${l.name} · ${l.w} ${l.unit} × ${l.r} · ${shortDate(l.date)}`;
export const recentLifts = (lifts, n = 5) => (lifts ?? []).slice(0, n); // fitbridge sends them newest first
export const allLifts = (lifts) => [...(lifts ?? [])].sort((a, b) => a.name.localeCompare(b.name));
export const paceText = (seconds) => `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;

// The feed keys of the workouts that hold a record (a lift's best set, the fastest 1 km), for the 🏆.
export const recordKeys = (pbs) => new Set([...(pbs?.lifts ?? []).map((l) => l.key), pbs?.fastest_1k?.key].filter(Boolean));
