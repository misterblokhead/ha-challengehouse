<script>
  import { tick } from "svelte";
  import Badges from "./Badges.svelte";
  import Connect from "./Connect.svelte";
  import Feed from "./Feed.svelte";
  import PlanBar from "./PlanBar.svelte";
  import PlanBuilder from "./PlanBuilder.svelte";
  import PlanPicker from "./PlanPicker.svelte";
  import Progress from "./Progress.svelte";
  import Shoes from "./Shoes.svelte";
  import ShoesDialog from "./ShoesDialog.svelte";
  import WorkoutDialog from "./WorkoutDialog.svelte";
  import { recordKeys, shoesManageable } from "../model.js";

  // A person's plan, 90-day activity, badges, progress and shoes: inline under the viewer's own tile, or in the sheet for anyone else.
  // `connect`: the Connect card's data when this viewer may connect this person (and it is not on top of the page already).
  // `canEdit`: this viewer may Remove/Restore this person's workouts (viewer.can_edit) and change their plan; a tap on a workout opens its pop-up.
  // "Change plan" swaps all of this for the plan list, and from there the builder; Back returns. `people`: the names of plan makers.
  let { id, person: p, canEdit, viewer, people = {}, connect = null, reviewTypes = {}, now } = $props();
  const uid = $props.id();
  const records = $derived(recordKeys(p.pbs));
  const manage = $derived(shoesManageable(p, canEdit)); // live data and this viewer may edit: Manage, and each run's shoe
  let shoesDialog = $state(), workout = $state();
  const openWorkout = (item) => workout.open(item);
  let plans = $state(null); // null: the details; {pick, reopen?}: the plan list; {from, mode}: the builder
  let planSection = $state();
  async function closePlans() { // focus back on "Change plan" / "Choose a plan", the section's only button
    plans = null;
    await tick();
    planSection?.querySelector("button")?.focus();
  }
</script>

{#if plans?.pick}
  <PlanPicker person={id} current={p.plan} {viewer} {people} reopen={plans.reopen ?? null}
    onback={closePlans} onbuild={(from, mode) => (plans = { from, mode })} />
{:else if plans}
  <PlanBuilder from={plans.from} mode={plans.mode} onback={() => (plans = { pick: true, reopen: { id: plans.from?.id, mode: plans.mode } })} />
{:else}
{#if p.plan || canEdit}
  <section aria-labelledby="{uid}-plan" bind:this={planSection}>
    <h2 id="{uid}-plan">Plan</h2>
    {#if p.plan}<PlanBar plan={p.plan} {canEdit} onchange={() => (plans = { pick: true })} />
    {:else}<button type="button" class="btn choose press" onclick={() => (plans = { pick: true })}>Choose a plan</button>{/if}
  </section>
{/if}
<section aria-labelledby="{uid}-feed">
  <h2 id="{uid}-feed">Activity</h2>
  {#key id}<Feed person={id} items={p.feed} {records} onopen={openWorkout} />{/key}
</section>
<section aria-labelledby="{uid}-badges">
  <h2 id="{uid}-badges">Badges <small>{p.badges.count} unlocked</small></h2>
  <Badges badges={p.badges} />
</section>
<section aria-labelledby="{uid}-pbs">
  <h2 id="{uid}-pbs">Progress</h2>
  <Progress person={p} onopen={openWorkout} />
</section>
<WorkoutDialog bind:this={workout} person={id} feed={p.feed} {viewer} shoes={manage ? p.shoes : null} runShoes={p.run_shoes} {reviewTypes} />
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

{#if connect}<Connect info={connect} {now} person={p} collapsed />{/if}
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
  .choose { width: 100%; }
  small { color: var(--muted); font-size: 0.875rem; font-weight: 500; letter-spacing: 0; }
</style>
