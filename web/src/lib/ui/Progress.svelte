<script>
  import { groupRows, groupedLifts, liftSet, localDay, paceText, shortDate, stepsSummary, weekBars } from "../model.js";
  import RecordsDialog from "./RecordsDialog.svelte";
  import StepBars from "./StepBars.svelte";

  // A person's progress: this week's steps, their heaviest sets per muscle group (a tap opens all records, at that group), the fastest
  // 1 km (a tap opens its run, `onopen({key})`) and two lifetime lines. Older payloads may lack the steps, `lifts` and `fastest_1k`: each part then falls back to its empty
  // text or is left out.
  let { person: p, onopen } = $props();
  const goal = $derived(p.week.goal.steps ?? 0);
  const week = $derived(weekBars(p.steps_week, goal, localDay())); // the viewer's own day
  const lifts = $derived(p.pbs.lifts ?? []);
  const rows = $derived(groupRows(lifts));
  let dialog;
  const k1 = $derived(p.pbs.fastest_1k);
  const t = $derived(p.pbs.gym_tonnes.toLocaleString(undefined, { maximumFractionDigits: 1 }));
</script>

{#if week}
  <div class="card steps">
    <StepBars bars={week.bars} goalFrac={week.goalFrac} />
    <p class="caption">{stepsSummary(week.bars)}</p>
  </div>
{/if}

<div class="card">
  {#if lifts.length}
    <ul>
      {#each rows as r (r.group)}
        <li><button type="button" class="grp" onclick={() => dialog.open(r.group)}>
          <span class="g">{r.group}</span><span>{r.lift.name} · <b>{liftSet(r.lift)}</b></span>
        </button></li>
      {/each}
    </ul>
    <button type="button" class="btn more" onclick={() => dialog.open()}>All records ({lifts.length})</button>
  {:else}
    <p class="caption empty">Your heaviest sets appear here after your first gym session.</p>
  {/if}
</div>

<div class="card rows">
  {#if k1}
    <!-- an older payload's 1 km has no key: nothing to open -->
    {#snippet fastest()}
      <span class="k"><span class="chip" aria-hidden="true">⚡</span>Fastest 1 km</span>
      <span class="v run">{paceText(k1.seconds)} · {shortDate(k1.date)}</span>
    {/snippet}
    {#if k1.key}
      <button type="button" class="row" onclick={() => onopen({ key: k1.key })}>{@render fastest()}</button>
    {:else}
      <div class="row">{@render fastest()}</div>
    {/if}
  {:else}
    <p class="caption empty">Run 1 km with GPS to set your first time.</p>
  {/if}
  <div class="row"><span class="k">Longest session</span><span class="v">{p.pbs.longest_session_km.toFixed(1)} km</span></div>
  <div class="row"><span class="k">Total lifted</span><span class="v">{t} t</span></div>
</div>

<RecordsDialog bind:this={dialog} groups={groupedLifts(lifts)} />

<style>
  .card { margin: 0 0 0.75rem; padding: 0.25rem 1rem; }
  .steps { padding: 1rem 1rem 0.5rem; }
  .steps .caption { margin: 0.5rem 0 0; text-align: center; font-variant-numeric: tabular-nums; }
  ul { margin: 0; padding: 0; list-style: none; }
  /* colour by meaning, as the rings: lifts wear the workouts orange, the 1 km the runs green; text keeps its readable colours */
  .grp { display: flex; align-items: baseline; gap: 0.625rem; width: 100%; min-height: 2.75rem; box-sizing: border-box; padding: 0.625rem 0; border: 0; background: none; color: inherit; font: inherit; text-align: start; }
  .grp:active { background: var(--fill); }
  .g { color: var(--muted); }
  b { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--soon-text); } /* the workouts orange, in its readable text shade */
  .chip { display: inline-grid; place-items: center; width: 1.5rem; height: 1.5rem; margin-inline-end: 0.5rem; border-radius: 50%; background: var(--run); font-size: 0.8125rem; vertical-align: middle; }
  li + li { border-top: 1px solid var(--line); }
  .more { margin: 0.25rem 0 0.5rem; }
  .empty { margin: 0; padding: 0.625rem 0; }
  .row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.625rem 0; }
  button.row { width: 100%; min-height: 2.75rem; border: 0; background: none; color: inherit; font: inherit; text-align: start; }
  button.row:active { background: var(--fill); }
  .row + .row, .empty + .row { border-top: 1px solid var(--line); }
  .k { color: var(--muted); }
  .v { font-weight: 600; font-variant-numeric: tabular-nums; }
  .v.run { color: var(--good-text); }
</style>
