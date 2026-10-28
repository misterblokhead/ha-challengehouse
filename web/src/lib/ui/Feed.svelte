<script>
  import FeedRow from "./FeedRow.svelte";

  // The 30-day feed, newest first; excluded workouts stay in it, dimmed, so they can be restored.
  let { person, items, canEdit, records } = $props(); // records: the keys that hold a record (recordKeys), for the 🏆
</script>

{#if items.length}
  <ul class="card">
    {#each items as item (item.key)}<FeedRow {person} {item} {canEdit} record={records?.has(item.key)} />{/each}
  </ul>
{:else}
  <p class="caption empty">No workouts in the last 30 days.</p>
{/if}

<style>
  ul { margin: 0; padding: 0; list-style: none; overflow: hidden; }
  ul > :global(li + li) { border-top: 1px solid var(--line); }
  .empty { margin: 0; }
</style>
