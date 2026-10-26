// Paths are relative to the integration's UI API. Inside Home Assistant the panel's `hass` signs each request (fetchWithAuth).
// Without one (the demo) reads fetch ./demo-scores.json and writes only log, so the page works on any static host.
// Error message stays the status; `detail` carries the server's text ({detail}) when it is a string.
const PREFIX = "/api/fitbridge/ui/";
let hass;
export const setHass = (h) => (hass = h);
export const authedFetch = (url, init) => (hass ? hass.fetchWithAuth(url, init) : fetch(url, init));

export async function send(method, path, body) {
  if (!hass && method !== "GET") {
    console.info("demo:", method, path, body);
    return { ok: true };
  }
  const r = await authedFetch(hass ? PREFIX + path : `./demo-${path}.json`, {
    method,
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!r.ok) {
    const e = new Error(String(r.status));
    e.status = r.status;
    try {
      const d = (await r.json()).detail;
      if (typeof d === "string") e.detail = d;
    } catch {}
    throw e;
  }
  return r.status === 204 ? null : r.json();
}

export const get = (path) => send("GET", path);
