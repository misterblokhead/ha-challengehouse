// Pure helpers behind the page: everything the components show is computed here so it can be tested without a DOM.
const clamp = (x) => Math.min(1, Math.max(0, x));
const pad = (n) => String(n).padStart(2, "0");
const ratio = (n, goal) => (goal > 0 ? clamp(n / goal) : 1); // goal 0: nothing to do, so the ring is full

export const ringFractions = (w) => [ratio(w.runs, w.goal.runs), ratio(w.gym, w.goal.gym), clamp(w.bonus)];

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
function when(start) {
  const m = /^(\d+)-(\d+)-(\d+)T(\d+:\d+)/.exec(start);
  if (!m) return "";
  const [, y, mo, d, hm] = m;
  return `${DAYS[new Date(Date.UTC(y, mo - 1, d)).getUTCDay()]} ${Number(d)} ${MONTHS[mo - 1]}, ${hm}`;
}

const duration = (m) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${pad(m % 60)} min` : `${m / 60} h`);

function pace(item) {
  if (!(item.kind === "run" || item.kind === "walk") || !(item.km > 0)) return null;
  const s = Math.round((item.minutes * 60) / item.km);
  return `${Math.floor(s / 60)}:${pad(s % 60)} /km`;
}

export const feedRow = (item) => ({
  title: item.name,
  when: when(item.start),
  duration: duration(item.minutes),
  xp: item.xp ? `+${item.xp}` : "",
  detail: {
    km: item.km == null ? null : `${item.km.toFixed(1)} km`,
    pace: pace(item),
    hr: item.avg_hr == null ? null : `${item.avg_hr} bpm`,
    plan: item.plan ?? null,
    url: item.url ?? null,
  },
  removable: item.excluded ? "restore" : item.key.startsWith("manual:") ? "delete" : "remove",
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
export const PENDING_MS = 6 * 60000;
export function pendingDone(entry, feed, now) {
  const item = feed.find((w) => w.key === entry.key);
  return now - entry.at > PENDING_MS || !item || (entry.want !== null && item.excluded === entry.want);
}
