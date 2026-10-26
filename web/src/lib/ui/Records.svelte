<script>
  // The personal bests fitbridge keeps (`pbs`).
  let { pbs } = $props();
  const rows = $derived([
    ["Longest session", `${pbs.longest_session_km.toFixed(1)} km`],
    ["Gym PRs", pbs.prs.toLocaleString()],
    ["Total lifted", `${pbs.gym_tonnes.toLocaleString(undefined, { maximumFractionDigits: 1 })} t`],
  ]);
</script>

<dl class="card">
  {#each rows as [k, v] (k)}<div><dt>{k}</dt><dd>{v}</dd></div>{/each}
</dl>

<style>
  dl { margin: 0; padding: 0.25rem 1rem; }
  div { display: flex; justify-content: space-between; gap: 1rem; padding: 0.625rem 0; }
  div + div { border-top: 1px solid var(--line); }
  dt { color: var(--muted); }
  dd { margin: 0; font-weight: 600; }
</style>
