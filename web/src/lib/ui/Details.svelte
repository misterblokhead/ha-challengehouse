<script>
  import Badges from "./Badges.svelte";
  import Feed from "./Feed.svelte";
  import PlanBar from "./PlanBar.svelte";
  import Progress from "./Progress.svelte";
  import Shoes from "./Shoes.svelte";
  import ShoesDialog from "./ShoesDialog.svelte";
  import { recordKeys, shoesManageable } from "../model.js";

  // A person's plan, 30-day activity, badges, progress and shoes: inline under the viewer's own tile, or in the sheet for anyone else.
  // `canEdit`: this viewer may Remove/Restore this person's workouts (viewer.can_edit).
  let { id, person: p, canEdit } = $props();
  const uid = $props.id();
  const records = $derived(recordKeys(p.pbs));
  const manage = $derived(shoesManageable(p, canEdit)); // live data and this viewer may edit: Manage, and each run's shoe
  let shoesDialog = $state();
</script>

{#if p.plan}
  <section aria-labelledby="{uid}-plan">
    <h2 id="{uid}-plan">Plan</h2>
    <PlanBar plan={p.plan} />
  </section>
{/if}
<section aria-labelledby="{uid}-feed">
  <h2 id="{uid}-feed">Activity</h2>
  <Feed person={id} items={p.feed} {canEdit} {records} shoes={manage ? p.shoes : null} runShoes={p.run_shoes} />
</section>
<section aria-labelledby="{uid}-badges">
  <h2 id="{uid}-badges">Badges <small>{p.badges.count} unlocked</small></h2>
  <Badges badges={p.badges} />
</section>
<section aria-labelledby="{uid}-pbs">
  <h2 id="{uid}-pbs">Progress</h2>
  <Progress person={p} />
</section>
{#if p.shoes?.length || manage}
  <section aria-labelledby="{uid}-shoes">
    <h2 id="{uid}-shoes">
      Shoes
      {#if manage}<button type="button" class="manage press" onclick={() => shoesDialog.open()}>Manage</button>{/if}
    </h2>
    {#if p.shoes.length}<Shoes shoes={p.shoes} />{:else}<p class="caption none">No shoes yet.</p>{/if}
  </section>
  {#if manage}<ShoesDialog bind:this={shoesDialog} person={id} shoes={p.shoes} />{/if}
{/if}

<style>
  h2 {
    display: flex; align-items: baseline; justify-content: space-between; margin: 0.5rem 0.25rem 0.5rem;
    font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em;
  }
  .manage {
    min-width: 2.75rem; min-height: 2.75rem; margin: -0.5rem -0.5rem -0.5rem 0; padding: 0 0.5rem; border: 0; border-radius: var(--radius-ctl);
    background: none; color: var(--accent-text); font: inherit; font-size: 1.0625rem; font-weight: 600;
  }
  .none { margin: 0 0.25rem; }
  small { color: var(--muted); font-size: 0.875rem; font-weight: 500; letter-spacing: 0; }
</style>
