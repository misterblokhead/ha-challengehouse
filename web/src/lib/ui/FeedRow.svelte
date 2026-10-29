<script>
  import { pending } from "../actions.svelte.js";
  import { feedRow } from "../model.js";

  // One workout of the feed. A tap opens its details pop-up (`onopen(item)`); an active day has none. An uncounted workout is greyed
  // and says why in place of its XP. A sent Remove / Restore shows at once, dimmed with a spinner until a payload confirms it (actions.svelte.js).
  let { person, item, record, onopen } = $props(); // record: this workout holds a personal record

  const ICONS = { run: "🏃", walk: "🚶", gym: "🏋️", home: "🧘", active_day: "👟" };
  const entry = $derived(pending[`${person}/${item.key}`]);
  const row = $derived(feedRow(entry && entry.want !== null ? { ...item, excluded: entry.want } : item));
  const deleting = $derived(entry?.want === null);
  const opens = $derived(item.kind !== "active_day");
</script>

<li class:dim={row.removable === "restore" || deleting} class:grey={!!row.label}>
  {#if opens}
    <button type="button" class="head" onclick={() => onopen(item)}>{@render content()}</button>
  {:else}
    <div class="head">{@render content()}</div>
  {/if}
</li>

{#snippet content()}
  <span class="ic {item.kind}" aria-hidden="true">{ICONS[item.kind] ?? "💪"}</span>
  <span class="main">
    <span class="t1">
      {row.title}
      {#if row.plan}<span class="mini">{row.plan}</span>{/if}
      {#if row.chip}<span class="mini" class:warn={row.chip.tone === "warn"}>{row.chip.text}</span>{/if}
      {#if item.joint}<span class="mini">Together</span>{/if}
      {#if record}<span role="img" aria-label="Holds a record">🏆</span>{/if}
    </span>
    <span class="t2">{row.when} · {row.duration}</span>
  </span>
  <span class="right">
    {#if entry}<span class="spin" role="img" aria-label="Saving"></span>{/if}
    {row.removable === "restore" ? "Removed" : (row.label ?? (row.xp && `${row.xp} XP`))}
  </span>
{/snippet}

<style>
  .head {
    display: flex; align-items: center; gap: 0.75rem; width: 100%; min-height: 3.5rem; box-sizing: border-box;
    padding: 0.625rem 1rem; border: 0; background: none; color: inherit; font: inherit; text-align: start;
  }
  button.head:active { background: var(--fill); }
  .head:focus-visible { outline-offset: -2px; }
  .dim .head > * { opacity: 0.45; }
  /* uncounted: no colour, the title muted; text keeps its readable contrast */
  .grey .ic { filter: grayscale(1); }
  .grey .t1 { color: var(--muted); }
  .ic {
    display: grid; place-items: center; flex: none; width: 2.25rem; height: 2.25rem; border-radius: 0.625rem;
    background: var(--fill); font-size: 1.125rem;
  }
  .ic.run { background: color-mix(in srgb, var(--run) 20%, transparent); }
  .ic.gym, .ic.home { background: color-mix(in srgb, var(--gym) 20%, transparent); }
  .ic.active_day { background: color-mix(in srgb, var(--bonus) 20%, transparent); }
  .main { flex: 1; min-width: 0; }
  .t1, .t2 { display: block; }
  .t1 { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; font-weight: 600; }
  .t2 { color: var(--muted); font-size: 0.8125rem; }
  .right { display: flex; flex: none; align-items: center; gap: 0.375rem; color: var(--muted); font-size: 0.875rem; font-weight: 600; }
  .mini {
    padding: 0.0625rem 0.4375rem; border-radius: var(--radius-chip); font-size: 0.6875rem; font-weight: 700;
    background: color-mix(in srgb, var(--bonus) 18%, transparent); color: var(--fg);
  }
  .mini.warn { background: color-mix(in srgb, var(--warn-text) 16%, transparent); color: var(--warn-text); }
  .spin {
    width: 0.75rem; height: 0.75rem; box-sizing: border-box; border-radius: 50%;
    border: 2px solid var(--muted); border-right-color: transparent; animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(1turn); } }
  @media (prefers-reduced-motion: reduce) { .spin { animation: none; border-right-color: var(--muted); opacity: 0.6; } }
</style>
