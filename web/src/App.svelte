<script>
  import { get } from "./lib/api.js";
  import { layout, weekLabel } from "./lib/model.js";
  import Header from "./lib/ui/Header.svelte";
  import PersonTile from "./lib/ui/PersonTile.svelte";
  import Status from "./lib/ui/Status.svelte";
  import Together from "./lib/ui/Together.svelte";

  let data = $state(null);
  let failure = $state(null);
  let now = $state(new Date());

  // Every 60 s, and when the page comes back into view; before the first scores (503 "waiting", or no answer) every 30 s.
  // A failed reload keeps the scores already shown.
  let timer;
  async function load() {
    clearTimeout(timer);
    if (document.hidden) return; // visibilitychange loads again
    try {
      data = await get("scores");
      failure = null;
    } catch (e) {
      failure = e;
    }
    now = new Date();
    timer = setTimeout(load, data ? 60000 : 30000);
  }

  $effect(() => {
    load();
    const visible = () => document.hidden || load();
    document.addEventListener("visibilitychange", visible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", visible);
    };
  });

  const people = $derived(data?.people ?? {});
  const ids = $derived(Object.keys(people));
  const split = $derived(layout(data?.viewer ?? {}, people));
  const week = $derived(people[split.self ?? ids[0]]?.week);
</script>

<Header title="Training" subtitle={week ? weekLabel(week) : ""} />

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
    <Status scoredAt={data.scored_at} configError={data.config_error} {now} />
    {#if split.self}
      <!-- mapped viewer: the others compact on top, the own tile full width, the own details (Task 8) below -->
      {#if split.others.length}
        <div class="tiles compact">
          {#each split.others as id (id)}<PersonTile person={people[id]} index={ids.indexOf(id)} compact />{/each}
        </div>
      {/if}
      <PersonTile person={people[split.self]} index={ids.indexOf(split.self)} />
    {:else}
      <!-- unmapped viewer (the wall iPad): everyone side by side, read-only -->
      <div class="tiles">
        {#each split.others as id (id)}<PersonTile person={people[id]} index={ids.indexOf(id)} />{/each}
      </div>
    {/if}
    {#if data.group}<Together group={data.group} />{/if}
    <!-- Task 8: <Details> for split.self goes here -->
  {/if}
</main>

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
