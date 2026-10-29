<script>
  import { tick } from "svelte";
  import { pendingGoals, refresh, settle } from "./lib/actions.svelte.js";
  import { get } from "./lib/api.js";
  import { connectIds, connectOnTop, layout, weekLabel, withPendingGoals } from "./lib/model.js";
  import Connect from "./lib/ui/Connect.svelte";
  import Details from "./lib/ui/Details.svelte";
  import Goals from "./lib/ui/Goals.svelte";
  import Header from "./lib/ui/Header.svelte";
  import PersonTile from "./lib/ui/PersonTile.svelte";
  import Sheet from "./lib/ui/Sheet.svelte";
  import Status from "./lib/ui/Status.svelte";
  import Toast from "./lib/ui/Toast.svelte";
  import Together from "./lib/ui/Together.svelte";

  // Inside HA the page is an iframe and the URL (/fitness?person=sam&back=/kiosk-stage) is the parent's; in the demo it is our own.
  const host = (() => {
    try {
      return window.parent.location.search !== undefined ? window.parent : window;
    } catch {
      return window; // not same-origin: only our own URL
    }
  })();
  const query = new URLSearchParams(host.location.search);
  let wanted = query.get("person"); // opens that person's sheet once the first scores are in
  const back = /^\/(?!\/)/.test(query.get("back") ?? "") ? query.get("back") : null; // a path on this HA only
  const goBack = back && (() => {
    host.history.pushState(null, "", back);
    host.dispatchEvent(new Event("location-changed"));
  });

  let sheet = $state(null); // {id, from}: whose details the sheet shows, and the tile it grows from
  const openSheet = (id) => (e) => (sheet = { id, from: e.currentTarget });
  let goals = $state(null); // {from}: the Goals sheet is open, grown from the Goals button
  let goalsSheet = $state();
  async function closeSheet() {
    const from = sheet?.from ?? goals?.from;
    sheet = goals = null;
    await tick(); // the page is inert until the sheet is gone
    from?.focus({ preventScroll: true });
  }

  let data = $state(null);
  let failure = $state(null);
  let now = $state(new Date());
  let connects = $state({}); // person -> the integration's `connect` answer; a person the viewer may not connect (403) never gets one

  // Every 60 s, and when the page comes back into view; before the first scores (503 "waiting", or no answer) every 30 s.
  // A failed reload keeps the scores already shown.
  let timer;
  async function load() {
    clearTimeout(timer);
    if (document.hidden) return; // visibilitychange loads again
    try {
      data = await get("scores");
      failure = null;
      settle(data.people);
      if (wanted && Object.hasOwn(data.people, wanted) && wanted !== layout(data.viewer, data.people).self) sheet = { id: wanted, from: null };
      wanted = null;
    } catch (e) {
      failure = e;
    }
    now = new Date();
    if (data) loadConnects(data);
    clearTimeout(timer); // a visibilitychange load may have overlapped this one
    timer = setTimeout(load, data ? 60000 : 30000);
  }

  // The Connect card's data for whoever the viewer may connect; a refused or failed request hides that person's card (a lost right, a gone person).
  const loadConnects = (d) =>
    connectIds(d.viewer, d.people).forEach((id) =>
      get(`connect?person=${encodeURIComponent(id)}`).then((info) => { connects[id] = info; }, () => { delete connects[id]; }));

  $effect(() => {
    load();
    const visible = () => document.hidden || load();
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  });

  $effect(() => {
    if (refresh.n) load(); // a shoe change: its new km are in the scores already
  });

  const people = $derived(withPendingGoals(data?.people ?? {}, pendingGoals.entry)); // saved goals show until a payload carries them
  const ids = $derived(Object.keys(people));
  const split = $derived(layout(data?.viewer ?? {}, people));
  const week = $derived(people[split.self ?? ids[0]]?.week);
  const canEdit = (id) => !!data?.viewer?.can_edit?.includes(id);
  const connectTop = $derived(!!split.self && connectOnTop(people[split.self], connects[split.self]));
  const sheetShown = $derived((!!sheet && Object.hasOwn(people, sheet.id)) || (!!goals && !!data)); // the page is inert exactly while a sheet is there
</script>

<div inert={sheetShown}>
<Header
  title="Training" brand subtitle={week ? weekLabel(week) : ""} onback={goBack}
  actionLabel="Goals" onaction={data ? (e) => (goals = { from: e.currentTarget }) : undefined}
/>

<main>
  {#if !data}
    <div class="tiles" aria-hidden="true">
      <div class="tile skeleton glass"></div>
      <div class="tile skeleton glass"></div>
    </div>
    {#if failure}
      <p class="msg" role="status">{failure.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant"}</p>
    {/if}
  {:else}
    <Status scoredAt={data.scored_at} configError={data.config_error} settingsError={data.settings_error} {now} />
    {#if connectTop}<Connect info={connects[split.self]} {now} person={people[split.self]} />{/if}
    {#if split.self}
      <!-- mapped viewer: the others compact on top, the own tile full width, the own details (Task 8) below -->
      {#if split.others.length}
        <div class="tiles compact">
          {#each split.others as id (id)}
            <PersonTile person={people[id]} index={ids.indexOf(id)} compact onopen={openSheet(id)} />
          {/each}
        </div>
      {/if}
      <PersonTile person={people[split.self]} index={ids.indexOf(split.self)} />
    {:else}
      <!-- unmapped viewer (the wall iPad): everyone side by side, read-only -->
      <div class="tiles">
        {#each split.others as id (id)}<PersonTile person={people[id]} index={ids.indexOf(id)} onopen={openSheet(id)} />{/each}
      </div>
    {/if}
    {#if data.group}<Together group={data.group} {people} />{/if}
    {#if split.self}<Details id={split.self} person={people[split.self]} canEdit={canEdit(split.self)} viewer={data.viewer} connect={connectTop ? null : connects[split.self]} {now} />{/if}
  {/if}
</main>
</div>

{#if goals && data}
  <Sheet label="Goals" from={goals.from} onclose={closeSheet} onback={goBack} bind:this={goalsSheet}>
    <Goals people={data.people} readOnly={!split.self} onsaved={() => goalsSheet?.close()} />
  </Sheet>
{:else if sheetShown}
  <Sheet label="{people[sheet.id].name}'s details" from={sheet.from} onclose={closeSheet} onback={goBack}>
    <PersonTile person={people[sheet.id]} index={ids.indexOf(sheet.id)} />
    <Details id={sheet.id} person={people[sheet.id]} canEdit={canEdit(sheet.id)} viewer={data.viewer} connect={connects[sheet.id]} {now} />
  </Sheet>
{/if}
<Toast />

<style>
  main {
    display: flex; flex-direction: column; gap: 1rem; box-sizing: border-box; max-width: 64rem; margin: 0 auto;
    padding: 0.25rem 1rem calc(env(safe-area-inset-bottom, 0px) + 2rem);
  }
  .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); gap: 1rem; }
  .tiles.compact { grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr)); gap: 0.75rem; }
  .skeleton { height: 12rem; background: var(--fill); box-shadow: none; }
  .msg { padding: 0.5rem 0; }
  @media (min-width: 768px) { main { padding-inline: 1.5rem; } }
</style>
