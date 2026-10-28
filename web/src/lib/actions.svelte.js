import { send } from "./api.js";
import { goalsDone, pendingDone, serial } from "./model.js";

// Remove / Restore / Delete from the activity feed. The row changes at once (pending) and settles when a payload shows the change.
// `pending`: by "person/key", {person, key, want, at, n}; see pendingDone. `toast`: the one message at the bottom, with an optional Undo.
export const TOAST_MS = 5000;
export const pending = $state({});
export const toast = $state({ on: false, text: "", undo: null });
// Goals saved from the Goals sheet: {entry, at} until a payload's week.goal carries them (goalsDone); the tiles show them meanwhile.
export const pendingGoals = $state({ entry: null, at: 0 });

// Shoe changes are counted by the integration: after one the page reloads at once (App.svelte watches `refresh.n`).
export const refresh = $state({ n: 0 });

let hide, seq = 0;
const sending = {}; // by "person/key": the last send, so an Undo is sent only after its Remove
export function say(text, undo = null) {
  clearTimeout(hide);
  Object.assign(toast, { on: true, text, undo });
  hide = setTimeout(() => (toast.on = false), TOAST_MS);
}

// After every payload: drop what it now shows (or what is older than PENDING_MS)
export function settle(people, now = Date.now()) {
  for (const [id, e] of Object.entries(pending)) if (pendingDone(e, people[e.person]?.feed ?? [], now)) delete pending[id];
  if (pendingGoals.entry && goalsDone(pendingGoals, people, now)) pendingGoals.entry = null;
}

// The Goals sheet's Save; true once the integration took it. `people`: the payload shown now (saving what it already shows leaves nothing pending).
export async function saveGoals(entry, people) {
  try {
    await send("POST", "settings", entry);
  } catch (e) {
    say(e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant"));
    return false;
  }
  Object.assign(pendingGoals, { entry, at: Date.now() });
  settle(people);
  say("Saved · updates within 5 min");
  return true;
}

// action "remove" | "restore"; a manual entry's remove deletes it (fitbridge), so it gets no Undo
export async function act(person, key, action) {
  const id = `${person}/${key}`, prev = pending[id], n = ++seq;
  const manual = key.startsWith("manual:");
  pending[id] = { person, key, want: manual && action === "remove" ? null : action === "remove", at: Date.now(), n };
  if (action === "remove" && !manual) say("Removed", () => act(person, key, "restore"));
  try {
    await serial(sending, id, () => send("POST", "workouts", { person, key, action }));
  } catch (e) {
    if (pending[id]?.n === n) { // unless a later tap (Undo) already replaced it
      if (prev) pending[id] = prev;
      else delete pending[id];
    }
    say(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
  }
}

const why = (e) => e.detail ?? (e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");

// A change to a person's shoes (a body for POST shoes: add, update, current, retire); true once the integration took it.
export async function shoeOp(body) {
  try {
    await send("POST", "shoes", body);
  } catch (e) {
    say(why(e));
    return false;
  }
  refresh.n++;
  return true;
}

// A run moved to another of its owner's shoes; true once the integration took it.
export async function moveRun(person, key, shoe_id) {
  try {
    await send("POST", "workouts", { action: "shoe", person, key, shoe_id });
  } catch (e) {
    say(why(e));
    return false;
  }
  refresh.n++;
  say("Moved to the other shoe");
  return true;
}
