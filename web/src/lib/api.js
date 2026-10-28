// Paths are relative to the integration's UI API. Inside Home Assistant the panel's `hass` signs each request (fetchWithAuth).
// Without one (the demo) reads fetch ./demo-<path>.json (scores, settings) and writes only log, so the page works on any static host.
// A failed request throws an Error whose `status` is the HTTP status and `detail` the integration's reason, when it gave one.
const PREFIX = "/api/fitbridge/ui/";
let hass;
export const setHass = (h) => (hass = h);
// A signed fetch of any HA path (the map tiles, authed.js); a plain one in the demo
export const authedFetch = (url, init) => (hass ? hass.fetchWithAuth(url, init) : fetch(url, init));

export async function send(method, path, body) {
  if (!hass && method !== "GET") {
    console.info("demo:", method, path, body);
    return { ok: true };
  }
  const init = {
    method,
    headers: body === undefined ? {} : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  };
  const r = await (hass ? hass.fetchWithAuth(PREFIX + path, init) : fetch(`./demo-${path.split("?")[0]}.json`, init)); // the demo has one file per view
  if (!r.ok) {
    const detail = await r.json().then((b) => b?.detail, () => undefined);
    throw Object.assign(new Error(String(r.status)), { status: r.status, detail });
  }
  return r.json();
}

export const get = (path) => send("GET", path);
