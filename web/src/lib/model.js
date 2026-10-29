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
export function when(start, time = true) {
  const m = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(start);
  if (!m) return "";
  const [, y, mo, d, hm] = m;
  const day = `${DAYS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()]} ${Number(d)} ${MONTHS[mo - 1]}`;
  return time ? `${day}, ${hm}` : day;
}

export const duration = (m) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${pad(m % 60)} min` : `${m / 60} h`);

// Why a workout earns nothing (`reason` of an uncounted one); the row shows it greyed, in place of its XP.
const UNCOUNTED = { short: "Too short", easy: "Too easy", type: "Type not counted", no_gps: "No GPS" };

// The plan-check chip after the plan day: a match "8/8 blocks", a run waiting for its owner's call "Review", an indoor run; else none.
const chip = (item) => {
  const c = item.check;
  if (item.needs_review) return { text: "Review", tone: "warn" };
  if (c?.state === "match") return { text: `${c.found}/${c.planned} blocks`, tone: "plain" };
  if (c?.state === "indoor") return { text: "indoor", tone: "plain" };
  return null;
};

export const feedRow = (item) => ({
  title: item.name,
  when: when(item.start, item.kind !== "active_day"),
  duration: item.kind === "active_day" ? `${num(item.steps)} steps` : duration(item.minutes),
  xp: item.xp ? `+${item.xp}` : "",
  label: UNCOUNTED[item.reason] ?? null,
  plan: item.plan && item.caught_up ? `${item.plan} · caught up` : item.plan,
  chip: chip(item),
  removable: item.kind === "active_day" ? null : item.excluded ? "restore" : item.key.startsWith("manual:") ? "delete" : "remove",
});

// The feed with the older items a "Load older" brought in appended, none twice (by key); the payload's own rows win.
export function mergeOlder(feed, items) {
  const have = new Set(feed.map((w) => w.key));
  return [...feed, ...items.filter((w) => !have.has(w.key))];
}

// The loaded older rows with the Remove / Restore / Delete the integration took (`done`: {"person/key": excluded, or null for a delete}).
// The payload's feed never carries these rows, so nothing else would show the change.
export const olderState = (items, person, done) =>
  items.flatMap((w) => { const d = done[`${person}/${w.key}`]; return d === null ? [] : d === undefined ? [w] : [{ ...w, excluded: d }]; });

// "YYYY-MM-DD" minus `n` days
export const minusDays = (day, n) => new Date(Date.parse(`${day}T00:00:00Z`) - n * 864e5).toISOString().slice(0, 10);

// Seconds as minutes in halves: 60 -> "1 min", 90 -> "1.5 min"
const half = (s) => Math.round(s / 30) / 2;
const mins = (s) => `${half(s)} min`;

// The next session as text: "5 min warm-up walk · 8 × (1 min run + 1.5 min walk) · 5 min cool-down walk"; once through (times 1) the steps
// run on with arrows. "" for no plan or a graduated one.
export function programmeText(plan) {
  if (!plan?.steps?.length) return "";
  const step = ([kind, s]) => `${mins(s)} ${kind}`;
  const main = plan.times > 1 ? `${plan.times} × (${plan.steps.map(step).join(" + ")})` : plan.steps.map(step).join(" → ");
  return [plan.warmup_s > 0 && `${mins(plan.warmup_s)} warm-up walk`, main, plan.cooldown_s > 0 && `${mins(plan.cooldown_s)} cool-down walk`].filter(Boolean).join(" · ");
}

// The plan check of a run in the pop-up: "8 of 8 run blocks · 9.5 of 8 min running · matches W1D2". `kmh`: the run's average speed, which
// an indoor run has no blocks to show instead (the feed row's km over its minutes).
export function checkLine(c, kmh = null) {
  if (c.state === "none") return "No track to check · counts by duration";
  if (c.state === "indoor") return kmh == null ? "Indoor run" : `Indoor: ${kmh.toFixed(1)} km/h average`;
  const fit = c.state === "match" ? "matches" : "doesn't match";
  return `${c.found} of ${c.planned} run blocks · ${half(c.run_s)} of ${mins(c.planned_run_s)} running · ${fit} ${c.label}`;
}

export function planBar(plan) {
  if (!plan) return []; // a person without a plan has no bar
  const segs = [["walk", plan.warmup_s ?? 0], ...plan.intervals, ["walk", plan.cooldown_s ?? 0]].filter(([, s]) => s > 0);
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

// Managing shoes (live data only). Limits as the integration validates them: name length [min, max], replace-at km [min, max, step].
export const SHOE_LIMITS = { name: [1, 40], replace_at_km: [100, 3000, 10] };
export const SHOE_DEFAULT_KM = 700;

// "Manage" and the run's shoe picker: for who may edit this person, and only with the integration's shoes (ids). A person without
// shoes yet has `run_shoes` ({}), so the first shoe can still be added.
export const shoesManageable = (p, canEdit) => !!canEdit && (p.run_shoes !== undefined || (p.shoes ?? []).some((s) => s.id != null));

// The form's raw name and km as a POST body's fields, or {error}. `partial`: a field left out (undefined) is skipped (an update of one).
export function shoeForm(name, km, { partial = false } = {}) {
  const out = {};
  if (!(partial && name === undefined)) {
    const n = String(name ?? "").trim();
    if (n.length < SHOE_LIMITS.name[0]) return { error: "Give the shoe a name" };
    if (n.length > SHOE_LIMITS.name[1]) return { error: `A name of at most ${SHOE_LIMITS.name[1]} characters` };
    out.name = n;
  }
  if (!(partial && km === undefined)) {
    const [lo, hi] = SHOE_LIMITS.replace_at_km;
    const v = typeof km === "number" ? km : km === null || String(km).trim() === "" ? NaN : Number(km);
    if (!(v >= lo && v <= hi)) return { error: `Replace at: ${lo} to ${hi} km` }; // NaN fails both
    out.replace_at_km = v;
  }
  return out;
}

// The run's "Shoe" select: the owner's active shoes (the current one marked) and the one the run is on. `assigned`: the shoe id from
// `run_shoes`. A run on no shoe, or on one since retired, has none of the options selected and a placeholder `extra` says so.
export function shoePicker(shoes, assigned) {
  const options = shoes.map((s) => ({ id: s.id, label: s.current ? `${s.name} (current)` : s.name }));
  const on = options.some((o) => o.id === assigned);
  return { value: on ? assigned : "", options, extra: on ? null : assigned == null ? "No shoe" : "Retired shoe" };
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
    profiles: Object.fromEntries(Object.keys(people).map((id) => [id, { birth_year: res.profiles?.[id]?.birth_year ?? null }])), // null: none (an empty field sends it back to clear)
  };
}

// The max HR in use, beside the birth year: "Max HR 180 · estimate", "Max HR 186 · measured 26 Oct"; "—" without one (`max_hr` from the scores).
export const maxHrText = (m) => (m ? `Max HR ${m.bpm} · ${m.source === "measured" && m.date ? `measured ${shortDate(m.date)}` : m.source}` : "—");

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

// A date's local "YYYY-MM-DD", from its own parts (toLocaleDateString depends on the browser's locale data).
export const localDay = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// This week's steps as {bars, goalFrac}: seven bars, Monday to Sunday of `today`'s week (`today`: the browser's local "YYYY-MM-DD"), and where
// the goal line sits (0-1 of the chart height, null without a goal). `stepsWeek` has only the days the sensor reported: a past day missing
// from it is 0 steps, a day after today has none (`steps` null). null without a step sensor.
export function weekBars(stepsWeek, goal, today) {
  if (stepsWeek == null) return null;
  const t = Date.parse(`${today}T00:00:00Z`);
  const monday = t - ((new Date(t).getUTCDay() + 6) % 7) * 864e5;
  const days = Array.from({ length: 7 }, (_, i) => new Date(monday + i * 864e5).toISOString().slice(0, 10));
  const steps = days.map((d) => (d > today ? null : (stepsWeek[d] ?? 0)));
  const top = Math.max(goal ?? 0, ...steps.map((s) => s ?? 0));
  const bars = days.map((date, i) => ({
    label: "MTWTFSS"[i], date, steps: steps[i], frac: top > 0 ? (steps[i] ?? 0) / top : 0,
    active: goal > 0 && steps[i] >= goal, isToday: date === today, future: date > today,
  }));
  return { bars, goalFrac: goal > 0 ? goal / top : null };
}

export function stepsSummary(bars) {
  const active = bars.filter((b) => b.active).length;
  return `${active} active ${active === 1 ? "day" : "days"} · ${num(bars.reduce((s, b) => s + (b.steps ?? 0), 0))} steps`;
}

// "Barbell row · 40 kg × 8 · 12 Oct"
export const liftSet = (l) => `${l.w} ${l.unit} × ${l.r}`;
export const liftLine = (l) => `${l.name} · ${liftSet(l)} · ${shortDate(l.date)}`;

// The lift records by muscle group (fitbridge's `group`; none or an unknown one: "Other"), in this order.
export const GROUPS = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Other"];
const byGroup = (lifts) => GROUPS.map((group) => ({ group, lifts: (lifts ?? []).filter((l) => (GROUPS.includes(l.group) ? l.group : "Other") === group) })).filter((g) => g.lifts.length);

// One row per group with records: its most-done lift (most `sessions`; tie: most recent, then A-Z) and how many records it has.
export const groupRows = (lifts) =>
  byGroup(lifts).map(({ group, lifts: ls }) => ({
    group, count: ls.length,
    lift: [...ls].sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0) || b.date.localeCompare(a.date) || a.name.localeCompare(b.name))[0],
  }));

// Every record per group, A-Z by name.
export const groupedLifts = (lifts) => byGroup(lifts).map(({ group, lifts: ls }) => ({ group, lifts: [...ls].sort((a, b) => a.name.localeCompare(b.name)) }));
export const paceText = (seconds) => `${Math.floor(seconds / 60)}:${pad(seconds % 60)}`;

// The feed keys of the workouts that hold a record (a lift's best set, the fastest 1 km), for the 🏆.
export const recordKeys = (pbs) => new Set([...(pbs?.lifts ?? []).map((l) => l.key), pbs?.fastest_1k?.key].filter(Boolean));

// The Connect card (webhook URL and phone steps; `info` is the integration's `connect` answer, undefined when not allowed or not loaded).
// On top of the page only for a fresh person: nothing received yet and no workouts on the page (migrated people keep it in Details).
export const connectOnTop = (person, info) => !!info && info.last_received == null && !person.feed.length;

// The people to ask `connect` about: whoever the integration says the viewer may connect (core.can_connect), own person first.
export const connectIds = (viewer, people) =>
  [...new Set([viewer.person, ...(viewer.can_connect ?? [])])].filter((id) => Object.hasOwn(people, id));

const STEPS = {
  iphone: {
    title: "iPhone",
    steps: [
      "Install Health Exporter & Shortcuts (a paid one-time app) and turn on routes in it.",
      "In Shortcuts make a shortcut called \"Sync workouts\": Export Workouts (last 7 days, all types), then Repeat with each, then Get Contents of URL (method POST, request body File, your address).",
      "Add a personal automation that runs it when a social app is opened.",
      "Add a second one that runs it when an Apple Watch workout ends.",
    ],
  },
  android: {
    title: "Android",
    steps: [
      "Install OpenTracks from F-Droid and turn on instant GPX export.",
      "Install Automate and import the flow file from the repo's phone/ folder.",
      "In the flow, open the HTTP request block and paste your address as its URL, then start the flow.",
    ],
  },
};
export const connectSteps = (phone) => STEPS[phone] ?? { title: "Which phone do you have?", steps: [] };

// The openGym invite sentence as parts, so the page can set the code in bold without HTML. An app inside Home Assistant is opened
// from its sidebar in a browser (the Home Assistant app can't make a home-screen shortcut); otherwise from its own address.
export function gymCaption(gym) {
  if (!gym?.invite) return null;
  const open = gym.in_ha
    ? `Open openGym from the Home Assistant sidebar in Chrome, not in the Home Assistant app (${gym.url}). Choose`
    : `Open openGym at ${gym.url}, choose`;
  return { before: `${open} Create new profile, enter code `, code: gym.invite, after: ", then Add to Home Screen." };
}

// "Connected · last workout received today, 07:05" (local time; the date instead of "today" on another day). Nothing received yet:
// a person with workouts already (migrated from before the update) is not waiting for a first one.
export function connectStatus(info, now, person = null) {
  if (info.last_received == null) return { state: "waiting", text: person?.feed?.length ? "No upload since this update" : "Waiting for the first workout" };
  const at = new Date(info.last_received);
  const day = at.toDateString() === now.toDateString() ? "today" : `${at.getDate()} ${MONTHS[at.getMonth()]}`;
  return { state: "connected", text: `Connected · last workout received ${day}, ${pad(at.getHours())}:${pad(at.getMinutes())}` };
}
