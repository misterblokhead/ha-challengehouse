<script>
  import { allLifts, liftLine, paceText, recentLifts, shortDate, stepsSummary, weekBars } from "../model.js";
  import StepBars from "./StepBars.svelte";

  // A person's progress: this week's steps, their heaviest sets, the fastest 1 km and two lifetime lines. Older payloads may lack the
  // steps, `lifts` and `fastest_1k`: each part then falls back to its empty text or is left out.
  let { person: p } = $props();
  const uid = $props.id();
  const goal = $derived(p.week.goal.steps ?? 0);
  const bars = $derived(weekBars(p.steps_week, goal, new Date().toLocaleDateString("en-CA"))); // en-CA is YYYY-MM-DD, in the viewer's own day
  const lifts = $derived(p.pbs.lifts ?? []);
  let all = $state(false);
  const shown = $derived(all ? allLifts(lifts) : recentLifts(lifts));
  const k1 = $derived(p.pbs.fastest_1k);
  const t = $derived(p.pbs.gym_tonnes.toLocaleString(undefined, { maximumFractionDigits: 1 }));
</script>

{#if bars}
  <div class="card steps">
    <StepBars {bars} {goal} />
    <p class="caption">{stepsSummary(bars)}</p>
  </div>
{/if}

<div class="card">
  {#if lifts.length}
    <ul id="{uid}-lifts">{#each shown as l (l.key)}<li>{liftLine(l)}</li>{/each}</ul>
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
    <div class="row"><span class="k">Fastest 1 km</span>
      <span class="v">{#if k1.url}<a href={k1.url} target="_blank" rel="noopener noreferrer">{paceText(k1.seconds)}</a>{:else}{paceText(k1.seconds)}{/if} · {shortDate(k1.date)}</span>
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
  li { padding: 0.625rem 0; }
  li + li { border-top: 1px solid var(--line); }
  .more { margin: 0.25rem 0 0.5rem; }
  .empty { margin: 0; padding: 0.625rem 0; }
  .row { display: flex; justify-content: space-between; gap: 1rem; padding: 0.625rem 0; }
  .row + .row, .empty + .row { border-top: 1px solid var(--line); }
  .k { color: var(--muted); }
  .v { font-weight: 600; font-variant-numeric: tabular-nums; }
  .v a { color: var(--accent-text); }
</style>
