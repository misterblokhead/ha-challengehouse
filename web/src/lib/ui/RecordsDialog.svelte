<script>
  import { liftSet, shortDate } from "../model.js";
  import Modal from "./Modal.svelte";

  // Every lift record by muscle group in a Modal you can swipe down. `open(group)` shows it scrolled to that group, or at the top
  // without one.
  let { groups } = $props(); // groupedLifts(): [{group, lifts}]
  let modal;

  export function open(group = null) {
    const body = modal.show();
    if (!body) return;
    body.scrollTop = 0;
    if (group) body.querySelector(`[data-group="${group}"]`)?.scrollIntoView({ block: "start" });
  }
</script>

<Modal bind:this={modal} title="All records" drag>
  {#each groups as g (g.group)}
    <h3 data-group={g.group}>{g.group}</h3>
    <ul>
      {#each g.lifts as l (l.id)}<li><span>{l.name} · <b>{liftSet(l)}</b> · {shortDate(l.date)}</span></li>{/each}
    </ul>
  {/each}
</Modal>

<style>
  h3 { margin: 1rem 0 0; font-size: 0.8125rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
  h3:first-child { margin-top: 0; }
  ul { margin: 0; padding: 0; list-style: none; }
  li { display: flex; align-items: baseline; gap: 0.625rem; padding: 0.625rem 0; }
  li + li { border-top: 1px solid var(--line); }
  b { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--soon-text); } /* the workouts orange, in its readable text shade */
</style>
