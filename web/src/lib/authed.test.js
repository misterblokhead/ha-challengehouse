import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { setHass } from "./api.js";
import { authedUrl, CACHE_MAX } from "./authed.js";

let fetched, fail, revoked;
beforeEach(() => {
  fetched = []; fail = null; revoked = [];
  let n = 0;
  URL.createObjectURL = () => `blob:${++n}`;
  URL.revokeObjectURL = (u) => revoked.push(u);
  setHass({
    fetchWithAuth: async (u) => {
      fetched.push(u);
      if (fail === "reject") throw new Error("offline");
      return { ok: fail !== "status", blob: async () => new Blob(["x"]) };
    },
  });
});

test("a cache hit returns the same object URL and fetches once", async () => {
  const [a, b] = [await authedUrl("/t/hit"), await authedUrl("/t/hit")];
  assert.equal(a, b);
  assert.deepEqual(fetched, ["/t/hit"]);
});

test("a failed fetch rejects and is retried next time", async () => {
  fail = "status";
  await assert.rejects(authedUrl("/t/bad"));
  fail = "reject";
  await assert.rejects(authedUrl("/t/bad"), /offline/);
  fail = null;
  assert.match(await authedUrl("/t/bad"), /^blob:/);
  assert.equal(fetched.length, 3);
});

test("two concurrent calls fetch once and share the URL", async () => {
  const [a, b] = await Promise.all([authedUrl("/t/twin"), authedUrl("/t/twin")]);
  assert.equal(a, b);
  assert.equal(fetched.length, 1);
});

test("past CACHE_MAX the least recently used tile is dropped and its object URL revoked", async () => {
  const first = await authedUrl("/t/lru/0");
  const second = await authedUrl("/t/lru/1");
  for (let i = 2; i < CACHE_MAX; i++) await authedUrl(`/t/lru/${i}`); // fills the cache (other tests' entries go first)
  await authedUrl("/t/lru/0"); // a hit: now the most recent
  for (let i = 0; i < CACHE_MAX; i++) await authedUrl(`/t/lru/more/${i}`);
  await new Promise((r) => setImmediate(r));
  assert.ok(revoked.includes(second));
  assert.ok(revoked.includes(first)); // it too, once enough newer tiles came in
  const n = fetched.length;
  await authedUrl("/t/lru/1");
  assert.equal(fetched.length, n + 1); // fetched again
});
