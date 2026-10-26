<script>
  import { planBar } from "../model.js";

  // The next session of the running plan: "W1D2" with "Due today" or "Rest day", and its run/walk intervals; a finished plan has none.
  let { plan } = $props();
  const segs = $derived(planBar(plan));
  const minutes = $derived(Math.round(((plan.warmup_s ?? 0) + plan.intervals.reduce((t, [, s]) => t + s, 0)) / 60));
</script>

<div class="card plan">
  <div class="top">
    <span class="big">{plan.state}</span>
    {#if segs.length}<span class="tag" class:due={plan.due_today}>{plan.due_today ? "Due today" : "Rest day"}</span>{/if}
  </div>
  {#if segs.length}
    <div class="segs" role="img" aria-label="Run and walk intervals, {minutes} minutes in total">
      {#each segs as s, i (i)}<i style:flex-grow={s.frac} style:background="var(--{s.kind === 'run' ? 'run' : 'fill'})"></i>{/each}
    </div>
    <div class="legend caption">
      <span><i class="dot" style:background="var(--run)"></i> run · <i class="dot" style:background="var(--fill)"></i> walk</span>
      <span>{minutes} min</span>
    </div>
  {/if}
</div>

<style>
  .plan { padding: 1rem; }
  .top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
  .tag { padding: 0.25rem 0.625rem; border-radius: var(--radius-chip); background: var(--fill); font-size: 0.8125rem; font-weight: 600; }
  .tag.due { background: color-mix(in srgb, var(--good) 18%, transparent); color: var(--good-text); }
  .segs { display: flex; gap: 2px; height: 1.75rem; margin-top: 0.875rem; overflow: hidden; border-radius: 0.5rem; }
  .segs i { flex: 1 1 0; min-width: 2px; }
  .legend { display: flex; justify-content: space-between; margin-top: 0.5rem; }
  .dot { display: inline-block; width: 0.625rem; height: 0.625rem; border-radius: 50%; vertical-align: -0.0625rem; }
</style>
