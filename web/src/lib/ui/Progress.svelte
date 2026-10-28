<script>
  import { allLifts, liftSet, localDay, paceText, recentLifts, shortDate, stepsSummary, weekBars } from "../model.js";
  import StepBars from "./StepBars.svelte";

  // A person's progress: this week's steps, their heaviest sets, the fastest 1 km and two lifetime lines. Older payloads may lack the
  // steps, `lifts` and `fastest_1k`: each part then falls back to its empty text or is left out.
  let { person: p } = $props();
  const uid = $props.id();
  const goal = $derived(p.week.goal.steps ?? 0);
  const week = $derived(weekBars(p.steps_week, goal, localDay())); // the viewer's own day
  const lifts = $derived(p.pbs.lifts ?? []);
  let all = $state(false);
  const shown = $derived(all ? allLifts(lifts) : recentLifts(lifts));
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
    <ul id="{uid}-lifts">{#each shown as l (l.id)}<li><span class="dot" aria-hidden="true"></span><span>{l.name} · <b>{liftSet(l)}</b> · {shortDate(l.date)}</span></li>{/each}</ul>
    {#if lifts.length > recentLifts(lifts).length}
      <button type="button" class="btn more" aria-expanded={all} aria-controls="{uid}-lifts" onclick={() => (all = !all)}>
        {all ? "Show fewer" : `Show all (${lifts.length})`}
      </button>
    {/if}
  {:else}
    <p class="caption empty">Your heaviest sets appear here after your first gym session.</p>
  {/if}
</div>

<div class="card rows">
  {#if k1}
    <div class="row"><span class="k"><span class="chip" aria-hidden="true">⚡</span>Fastest 1 km</span>
      <span class="v run">{#if k1.url}<a href={k1.url} target="_blank" rel="noopener noreferrer">{paceText(k1.seconds)}</a>{:else}{paceText(k1.seconds)}{/if} · {shortDate(k1.date)}</span>
    </div>
  {:else}
    <p class="caption empty">Run 1 km with GPS to set your first time.</p>
  {/if}
  <div class="row"><span class="k">Longest session</span><span class="v">{p.pbs.longest_session_km.toFixed(1)} km</span></div>
  <div class="row"><span class="k">Total lifted</span><span class="v">{t} t</span></div>
</div>

<style>
  .card { margin: 0 0 0.75rem; padding: 0.25rem 1rem; }
  .steps { padding: 1rem 1rem 0.5rem; }
  .steps .caption { margin: 0.5rem 0 0; text-align: center; font-variant-numeric: tabular-nums; }
  ul { margin: 0; padding: 0; list-style: none; }
  /* colour by meaning, as the rings: lifts wear the workouts orange, the 1 km the runs green; text keeps its readable colours */
  li { display: flex; align-items: baseline; gap: 0.625rem; padding: 0.625rem 0; }
  .dot { flex: none; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--gym); transform: translateY(-0.0625rem); }
  b { font-weight: 600; font-variant-numeric: tabular-nums; }
  .chip { display: inline-grid; place-items: center; width: 1.5rem; height: 1.5rem; margin-inline-end: 0.5rem; border-radius: 50%; background: var(--run); font-size: 0.8125rem; vertical-align: middle; }
  li + li { border-top: 1px solid var(--line); }
  .more { margin: 0.25rem 0 0.5rem; }
  .empty { margin: 0; padding: 0.625rem 0; }
  .row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.625rem 0; }
  .row + .row, .empty + .row { border-top: 1px solid var(--line); }
  .k { color: var(--muted); }
  .v { font-weight: 600; font-variant-numeric: tabular-nums; }
  .v a { color: var(--accent-text); }
  .v.run, .v.run a { color: var(--good-text); }
</style>
