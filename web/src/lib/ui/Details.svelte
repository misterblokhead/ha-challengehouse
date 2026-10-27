<script>
  import Badges from "./Badges.svelte";
  import Feed from "./Feed.svelte";
  import PlanBar from "./PlanBar.svelte";
  import Records from "./Records.svelte";
  import Shoes from "./Shoes.svelte";

  // A person's plan, 30-day activity, badges, records and shoes: inline under the viewer's own tile, or in the sheet for anyone else.
  // `canEdit`: this viewer may Remove/Restore this person's workouts (viewer.can_edit).
  let { id, person: p, canEdit } = $props();
  const uid = $props.id();
</script>

{#if p.plan}
  <section aria-labelledby="{uid}-plan">
    <h2 id="{uid}-plan">Plan</h2>
    <PlanBar plan={p.plan} />
  </section>
{/if}
<section aria-labelledby="{uid}-feed">
  <h2 id="{uid}-feed">Activity</h2>
  <Feed person={id} items={p.feed} {canEdit} />
</section>
<section aria-labelledby="{uid}-badges">
  <h2 id="{uid}-badges">Badges <small>{p.badges.count} unlocked</small></h2>
  <Badges badges={p.badges} />
</section>
<section aria-labelledby="{uid}-pbs">
  <h2 id="{uid}-pbs">Records</h2>
  <Records pbs={p.pbs} />
</section>
{#if p.shoes?.length}
  <section aria-labelledby="{uid}-shoes">
    <h2 id="{uid}-shoes">Shoes</h2>
    <Shoes shoes={p.shoes} />
  </section>
{/if}

<style>
  h2 {
    display: flex; align-items: baseline; justify-content: space-between; margin: 0.5rem 0.25rem 0.5rem;
    font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em;
  }
  small { color: var(--muted); font-size: 0.875rem; font-weight: 500; letter-spacing: 0; }
</style>
