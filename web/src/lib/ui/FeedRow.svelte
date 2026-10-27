<script>
  import { act, pending } from "../actions.svelte.js";
  import { screen } from "../media.svelte.js";
  import { feedRow } from "../model.js";
  import { animate } from "../motion.js";
  import { createSpring } from "../spring.js";

  // One workout of the feed. Tap opens it in place (a height spring, from wherever it is, so a second tap reverses it mid-way):
  // the details, "Open in Endurain", and Remove / Restore / Delete when `canEdit`. A sent change shows at once, dimmed with a spinner
  // until a payload confirms it (actions.svelte.js).
  let { person, item, canEdit } = $props();

  const ICONS = { run: "🏃", walk: "🚶", gym: "🏋️", home: "🧘", active_day: "👟" };
  const uid = $props.id();
  const entry = $derived(pending[`${person}/${item.key}`]);
  const row = $derived(feedRow(entry && entry.want !== null ? { ...item, excluded: entry.want } : item));
  const facts = $derived(
    [["Distance", row.detail.km], ["Pace", row.detail.pace], ["Avg heart rate", row.detail.hr], ["Plan session", row.detail.plan]]
      .filter(([, v]) => v),
  );
  const deleting = $derived(entry?.want === null);
  const expandable = $derived(facts.length > 0 || !!row.detail.url || (canEdit && !!row.removable)); // an active day has nothing to open

  let open = $state(false);
  let confirming = $state(false);
  let box = $state(), inner = $state(); // inside the expandable `{#if}`
  const spring = createSpring({ response: 0.35, damping: 1 });
  const run = animate(spring, {
    onFrame: (v) => (box.style.height = `${v}px`),
    onSettle: () => open && (box.style.height = "auto"), // follows later content (the Delete confirm)
  });
  $effect(() => run.stop);

  function toggle() {
    if (!expandable) return;
    open = !open;
    confirming = false;
    if (screen.reducedMotion) {
      box.style.height = open ? "auto" : "0px"; // the content cross-fades (CSS)
      return;
    }
    if (!run.running) spring.value = box.offsetHeight; // from what is on screen
    run.to(open ? inner.offsetHeight : 0);
  }

  const label = { remove: "Remove", restore: "Restore", delete: "Delete" };
  function action() {
    if (row.removable === "delete") confirming = true;
    else act(person, item.key, row.removable);
  }
</script>

<li class:dim={row.removable === "restore" || deleting}>
  <button type="button" class="head" aria-expanded={expandable ? open : undefined} aria-controls={expandable ? `${uid}-more` : undefined} onclick={toggle}>
    <span class="ic {item.kind}" aria-hidden="true">{ICONS[item.kind] ?? "💪"}</span>
    <span class="main">
      <span class="t1">
        {row.title}
        {#if item.plan}<span class="mini">{item.plan}</span>{/if}
        {#if item.joint}<span class="mini">Together</span>{/if}
      </span>
      <span class="t2">{row.when} · {row.duration}</span>
    </span>
    <span class="right">
      {#if entry}<span class="spin" role="img" aria-label="Saving"></span>{/if}
      {row.removable === "restore" ? "Removed" : row.xp && `${row.xp} XP`}
    </span>
  </button>
  {#if expandable}
  <div class="more" class:open id="{uid}-more" bind:this={box} inert={!open}>
    <div class="inner" bind:this={inner}>
      {#if facts.length}
        <dl>
          {#each facts as [k, v] (k)}<div><dt>{k}</dt><dd>{v}</dd></div>{/each}
        </dl>
      {/if}
      <div class="acts">
        {#if row.detail.url}<a class="btn link" href={row.detail.url} target="_blank" rel="noopener noreferrer">Open in Endurain</a>{/if}
        {#if canEdit && !deleting && row.removable}
          {#if confirming}
            <span class="ask">Delete manual entry?</span>
            <button type="button" class="btn" onclick={() => (confirming = false)}>Cancel</button>
            <button type="button" class="btn danger" onclick={() => (toggle(), act(person, item.key, "remove"))}>Delete</button>
          {:else}
            <button type="button" class="btn" class:danger={row.removable !== "restore"} onclick={action}>{label[row.removable]}</button>
          {/if}
        {/if}
      </div>
    </div>
  </div>
  {/if}
</li>

<style>
  .head {
    display: flex; align-items: center; gap: 0.75rem; width: 100%; min-height: 3.5rem; box-sizing: border-box;
    padding: 0.625rem 1rem; border: 0; background: none; color: inherit; font: inherit; text-align: start;
  }
  .head:active { background: var(--fill); }
  .head:focus-visible { outline-offset: -2px; }
  .dim .head > * { opacity: 0.45; }
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
  .spin {
    width: 0.75rem; height: 0.75rem; box-sizing: border-box; border-radius: 50%;
    border: 2px solid var(--muted); border-right-color: transparent; animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(1turn); } }

  .more { height: 0; overflow: hidden; }
  .inner { padding: 0 1rem 1rem 4rem; opacity: 0; transition: opacity var(--fade); }
  .open .inner { opacity: 1; }
  dl { display: grid; grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr)); gap: 0.5rem 1rem; margin: 0 0 0.75rem; }
  dt { color: var(--muted); font-size: 0.75rem; font-weight: 600; }
  dd { margin: 0; font-weight: 600; }
  .acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
  .acts:empty { display: none; }
  .link { display: inline-flex; align-items: center; text-decoration: none; }
  .danger { color: var(--warn-text); }
  .ask { flex-basis: 100%; font-weight: 600; }
  @media (prefers-reduced-motion: reduce) { .spin { animation: none; border-right-color: var(--muted); opacity: 0.6; } }
</style>
