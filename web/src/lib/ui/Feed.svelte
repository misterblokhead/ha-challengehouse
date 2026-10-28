<script>
  import { done, loadOlder } from "../actions.svelte.js";
  import { localDay, mergeOlder, minusDays, olderState } from "../model.js";
  import FeedRow from "./FeedRow.svelte";

  // The 90-day feed, newest first, then what "Load older" brought in; excluded workouts stay in it, dimmed, so they can be restored.
  let { person, items, records, onopen } = $props(); // records: the keys that hold a record (recordKeys), for the 🏆; onopen(item): the pop-up

  let older = $state([]), more = $state(true), busy = $state(false);
  let before = null; // the day the next request asks for what is before: set by the first one, then 90 days further back each time
  const shown = $derived(mergeOlder(items, olderState(older, person, done)));

  async function load() {
    busy = true;
    const day = before ?? shown.at(-1)?.start.slice(0, 10) ?? minusDays(localDay(), 88); // the feed's own date: the household's; one day of slack for a browser behind the household's timezone
    const page = await loadOlder(person, day);
    busy = false;
    if (!page) return; // refused: the toast said why, the button stays
    older = mergeOlder(older, page.items);
    before = minusDays(day, 90);
    more = page.more;
  }
</script>

{#if shown.length}
  <ul class="card">
    {#each shown as item (item.key)}<FeedRow {person} {item} record={records?.has(item.key)} {onopen} />{/each}
  </ul>
{:else}
  <p class="caption empty">No workouts in the last 90 days.</p>
{/if}
{#if more}<button type="button" class="btn older" disabled={busy} onclick={load}>Load older</button>{/if}

<style>
  ul { margin: 0; padding: 0; list-style: none; overflow: hidden; }
  ul > :global(li + li) { border-top: 1px solid var(--line); }
  .empty { margin: 0; }
  .older { margin: 0.75rem auto 0; display: block; }
</style>
