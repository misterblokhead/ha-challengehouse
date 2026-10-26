import { send } from "./api.js";
import { pendingDone } from "./model.js";

// Remove / Restore / Delete from the activity feed. The row changes at once (pending) and settles when a payload shows the change.
// `pending`: by "person/key", {person, key, want, at, n}; see pendingDone. `toast`: the one message at the bottom, with an optional Undo.
export const TOAST_MS = 5000;
export const pending = $state({});
export const toast = $state({ on: false, text: "", undo: null });

let hide, seq = 0;
export function say(text, undo = null) {
  clearTimeout(hide);
  Object.assign(toast, { on: true, text, undo });
  hide = setTimeout(() => (toast.on = false), TOAST_MS);
}

// After every payload: drop what it now shows (or what is older than PENDING_MS)
export function settle(people, now = Date.now()) {
  for (const [id, e] of Object.entries(pending)) if (pendingDone(e, people[e.person]?.feed ?? [], now)) delete pending[id];
}

// action "remove" | "restore"; a manual entry's remove deletes it (fitbridge), so it gets no Undo
export async function act(person, key, action) {
  const id = `${person}/${key}`, prev = pending[id], n = ++seq;
  const manual = key.startsWith("manual:");
  pending[id] = { person, key, want: manual && action === "remove" ? null : action === "remove", at: Date.now(), n };
  if (action === "remove" && !manual) say("Removed", () => act(person, key, "restore"));
  try {
    await send("POST", "workouts", { person, key, action });
  } catch (e) {
    if (pending[id]?.n === n) { // unless a later tap (Undo) already replaced it
      if (prev) pending[id] = prev;
      else delete pending[id];
    }
    say(e.status === 403 ? "Not allowed" : e.status === 404 ? "Already gone" : "Couldn't reach Home Assistant");
  }
}
