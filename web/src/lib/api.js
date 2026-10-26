// Paths are relative to the integration's UI API. Inside Home Assistant the panel's `hass` signs each request (fetchWithAuth).
// Without one (the demo) reads fetch ./demo-scores.json and writes only log, so the page works on any static host.
// A failed request throws an Error whose `status` is the HTTP status.
const PREFIX = "/api/fitbridge/ui/";
let hass;
export const setHass = (h) => (hass = h);

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
  const r = await (hass ? hass.fetchWithAuth(PREFIX + path, init) : fetch(`./demo-${path}.json`, init));
  if (!r.ok) throw Object.assign(new Error(String(r.status)), { status: r.status });
  return r.json();
}

export const get = (path) => send("GET", path);
