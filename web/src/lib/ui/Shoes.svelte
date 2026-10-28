<script>
  import { shoeRow } from "../model.js";

  // A person's running shoes: km toward each one's replace-at limit.
  let { shoes } = $props();
  const rows = $derived(shoes.map(shoeRow));
</script>

<ul class="card">
  {#each rows as s, i (shoes[i].id)}
    <li class={s.state}>
      <div class="top"><span class="name">{s.name}</span><span class="km">{s.km}</span></div>
      <span class="bar" aria-hidden="true"><i style:width="{s.frac * 100}%"></i></span>
      <div class="caption">
        <span>{s.detail}</span>
        {#if s.label}<span class="label">{s.label}</span>{/if}
      </div>
    </li>
  {/each}
</ul>

<style>
  ul { margin: 0; padding: 0.25rem 1rem; list-style: none; }
  li { padding: 0.75rem 0; }
  li + li { border-top: 1px solid var(--line); }
  .top, .caption { display: flex; justify-content: space-between; gap: 1rem; }
  .name { font-weight: 600; min-width: 0; overflow-wrap: anywhere; }
  .km { flex: none; font-variant-numeric: tabular-nums; }
  .bar {
    display: block; height: 0.375rem; margin: 0.5rem 0 0.375rem; overflow: hidden; border-radius: var(--radius-chip);
    background: var(--fill); border: var(--edge);
  }
  .bar i { display: block; height: 100%; border-radius: inherit; background: var(--fg); }
  .soon .bar i { background: var(--gym); }
  .replace .bar i { background: var(--warn-text); }
  .label { flex: none; font-weight: 600; }
  .soon .label { color: var(--soon-text); }
  .replace .label { color: var(--warn-text); }
  .unknown { opacity: 0.55; }
</style>
