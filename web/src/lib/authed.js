import { authedFetch } from "./api.js";

// Tiles need Home Assistant's login, which an <img src> cannot send: fetch them signed and show the blob.
// Promises are cached by URL, the most recently used last; past CACHE_MAX the oldest goes and its object URL is freed
// (the wall kiosk never reloads).
export const CACHE_MAX = 200;
const cache = new Map();

export function authedUrl(url) {
  let p = cache.get(url);
  if (p) cache.delete(url); // re-added below: now the most recent
  else {
    p = authedFetch(url).then(async (r) => {
      if (!r.ok) throw new Error(String(r.status));
      return URL.createObjectURL(await r.blob());
    });
    p.catch(() => cache.get(url) === p && cache.delete(url)); // a failure is retried next time
  }
  cache.set(url, p);
  if (cache.size > CACHE_MAX) {
    const [old, q] = cache.entries().next().value;
    cache.delete(old);
    q.then((u) => URL.revokeObjectURL(u), () => {});
  }
  return p;
}
