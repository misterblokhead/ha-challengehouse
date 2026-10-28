// Pure helpers behind the workout pop-up (GET workout): what WorkoutDialog shows, testable without a DOM.
import { duration, feedRow, liftSet, when } from "./model.js";

const pad = (n) => String(n).padStart(2, "0");
const hm = (iso) => /T(\d+:\d+)/.exec(iso ?? "")?.[1] ?? ""; // the wall clock of the household's offset, as the feed shows it

// seconds → "m:ss", or "h:mm:ss" from an hour
export function clock(seconds) {
  const s = Math.round(seconds);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
  return h ? `${h}:${pad(m)}:${pad(s % 60)}` : `${m}:${pad(s % 60)}`;
}

// Rides (kind "home" with a route) read as speed, runs and walks as pace; anything else without a route has neither.
export const speedShown = (d) => !!d.route?.length && d.summary.kind !== "run" && d.summary.kind !== "walk";
const paced = (d) => d.summary.kind === "run" || d.summary.kind === "walk";
const kmh = (pace) => (pace ? 3600 / pace : null); // s/km → km/h

export const header = (s) => ({
  title: s.name,
  date: when(s.start, false),
  time: s.end ? `${hm(s.start)}–${hm(s.end)}` : hm(s.start),
  duration: duration(s.minutes),
  plan: s.plan ?? null,
});

// [[label, text]] of the figures this workout has; the shoe only for runs (the dialog swaps it for the picker when the viewer may move it)
export function figures(d) {
  const s = d.summary, km = s.km > 0 ? s.km : null;
  const pace = km && paced(d) ? Math.round((s.minutes * 60) / km) : null;
  return [
    ["Distance", km && `${km.toFixed(1)} km`],
    ["Pace", pace && `${clock(pace)} /km`],
    ["Speed", km && speedShown(d) && `${(km / (s.minutes / 60)).toFixed(1)} km/h`],
    ["Elevation gain", d.gain_m != null && `${Math.round(d.gain_m)} m`],
    ["Avg heart rate", s.avg_hr != null && `${Math.round(s.avg_hr)} bpm`],
    ["Max heart rate", s.max_hr != null && `${Math.round(s.max_hr)} bpm`],
    ["Calories", s.kcal != null && `${Math.round(s.kcal)} kcal`],
    ["Shoe", s.kind === "run" && s.shoe?.name],
  ].filter(([, v]) => v);
}

// Per km: its number, or a last partial km's own distance; pace m:ss (km/h for a ride)
export function splitRows(d) {
  const speed = speedShown(d);
  return d.splits.map((s, i) => ({
    km: s.km === 1 ? String(i + 1) : `${s.km} km`,
    time: clock(s.s),
    pace: speed ? kmh(s.pace).toFixed(1) : clock(s.pace),
    hr: s.hr == null ? "—" : String(s.hr),
    climb: s.climb == null ? "—" : `${Math.round(s.climb)} m`,
  }));
}

// Time in Z1–Z5 (50–60 … 90–100 % of max HR) with its share; null without zones (no HR or no max HR)
export function zoneRows(zones, maxHr) {
  if (!zones) return null;
  const total = zones.reduce((a, b) => a + b, 0);
  const at = (f) => Math.round(f * maxHr);
  return zones.map((s, i) => ({
    zone: `Z${i + 1}`,
    bpm: i === 4 ? `${at(0.9)}+` : `${at(0.5 + i / 10)}–${at(0.6 + i / 10)}`,
    time: clock(s),
    pct: total ? Math.round((s / total) * 100) : 0,
  }));
}

// The gym block: each exercise's best set ("52 kg × 12"), `record` for the 🏆, total volume
export const gymRows = (g) =>
  g && {
    exercises: g.exercises.map((e) => ({ name: e.name, set: liftSet(e), record: e.record })),
    volume: `${Math.round(g.vol_kg).toLocaleString("en-US")} kg`,
  };

// The graphs against elapsed time (x: s); a series without any value has none. null without a series.
export function charts(d) {
  if (!d.series) return null;
  const { t, pace, hr, ele } = d.series;
  const speed = speedShown(d);
  const list = [
    speed ? { label: "Speed km/h", values: pace.map(kmh), color: "--gym" } : { label: "Pace /km", values: pace, color: "--run", fmt: clock },
    { label: "Heart rate", values: hr, color: "--warn-text" },
    { label: "Elevation m", values: ele, color: "--bonus" },
  ].filter((g) => g.values.some((v) => v != null));
  return { x: t, list };
}

// Remove / Restore / Delete and the shoe picker: only for who may edit this person (viewer.can_edit), the shoe only on a run
export function detailActions(viewer, person, item) {
  if (!viewer?.can_edit?.includes(person)) return { remove: null, shoe: false };
  return { remove: feedRow(item).removable, shoe: item.kind === "run" };
}

// The lazy map and graphs failed to load: the rest of the pop-up stays
export const vizState = (error) => (error ? { map: false, message: "Map unavailable" } : { map: true, message: null });

export const noteText = (note) => ({ file_missing: "Route file not found", file_unreadable: "Route file unreadable" })[note] ?? null;
