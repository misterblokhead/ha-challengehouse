<script>
  import { onMount, tick } from "svelte";
  import { planOp, say } from "../actions.svelte.js";
  import { get } from "../api.js";
  import { planSummary } from "../model.js";

  // Every plan, to start one for `person` at a chosen week, or stop the current one (the viewer may edit this person). A viewer who is
  // a person may also build plans: "New plan", "Copy & edit", and "Edit" / "Delete" of a custom plan nobody has used.
  // `current`: the person's plan block (null: none). `onbuild(plan, mode)`: open the builder, mode "new" | "copy" | "edit".
  // `reopen` {id, mode}: back from the builder, that plan open again and focus on the button that opened it.
  let { person, current, viewer, people = {}, reopen = null, onback, onbuild } = $props();
  const uid = $props.id();
  const maker = $derived(viewer?.person != null);
  let plans = $state(null), failure = $state(null);
  let chosen = $state(null), week = $state(1), busy = $state(false), deleting = $state(null);
  let back, root;

  const load = () => get("plans").then((r) => (plans = r.plans), (e) => (failure = e));
  onMount(async () => {
    if (!reopen) back.focus();
    await load();
    if (!reopen) return;
    chosen = reopen.id ?? null;
    await tick();
    (root?.querySelector(`[data-op="${reopen.mode}"]`) ?? back)?.focus(); // Edit is gone once the plan is used; none once Back was hit
  });

  const host = (url) => { try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return "Source"; } };
  function choose(p) {
    chosen = chosen === p.id ? null : p.id;
    week = 1;
    deleting = null;
  }
  async function op(body, toast, then) {
    busy = true;
    const r = await planOp(body);
    busy = false;
    say(r.error ?? toast);
    if (!r.error) then();
  }
  const start = (p) => op({ op: "start", person, plan: p.id, start_week: week }, `Started ${p.name}`, onback);
  const stop = () => op({ op: "stop", person }, "Plan stopped", onback);
  const remove = (p) => op({ op: "delete", id: p.id }, `Deleted ${p.name}`, () => { chosen = deleting = null; load(); });
</script>

<div class="picker" bind:this={root}>
  <button type="button" class="back press" bind:this={back} onclick={onback}><span aria-hidden="true">‹</span> Back</button>
  <h2 id="{uid}-t">{current ? "Change plan" : "Choose a plan"}</h2>
  {#if current}<button type="button" class="btn danger press" disabled={busy} onclick={stop}>Stop plan</button>{/if}

  {#if !plans}
    <p class="msg" role="status">{failure ? (failure.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant") : "Loading…"}</p>
  {:else}
    <ul class="card" aria-labelledby="{uid}-t">
      {#each plans as p (p.id)}
        {@const open = chosen === p.id}
        <li>
          <button type="button" class="row" aria-expanded={open} onclick={() => choose(p)}>
            <span class="name">
              {p.name}
              {#if p.used}<span role="img" aria-label="In use">🔒</span>{/if}
              {#if p.id === current?.plan}<span class="mini">Current</span>{/if}
            </span>
            <span class="caption">{planSummary(p)}</span>
          </button>
          {#if p.source}<a class="caption by" href={p.source} target="_blank" rel="noopener noreferrer">{host(p.source)}</a>
          {:else if p.by}<span class="caption by">by {people[p.by]?.name ?? p.by}</span>{/if}
          {#if open}
            <div class="acts">
              <div class="stepper" role="group" aria-label="Start week">
                <span class="lbl" aria-hidden="true">Start at week</span>
                <button type="button" class="pm press" aria-label="Earlier start week" disabled={week <= 1} onclick={() => week--}>−</button>
                <output aria-live="polite">{week}</output>
                <button type="button" class="pm press" aria-label="Later start week" disabled={week >= p.weeks.length} onclick={() => week++}>+</button>
              </div>
              <button type="button" class="btn primary press wide" disabled={busy} onclick={() => start(p)}>Start today</button>
              {#if maker}
                <button type="button" class="btn press" data-op="copy" onclick={() => onbuild(p, "copy")}>Copy & edit</button>
                {#if p.custom && !p.used}
                  <button type="button" class="btn press" data-op="edit" onclick={() => onbuild(p, "edit")}>Edit</button>
                  {#if deleting === p.id}
                    <span class="ask">Delete {p.name}?</span>
                    <button type="button" class="btn press" onclick={() => (deleting = null)}>Cancel</button>
                    <button type="button" class="btn danger press" disabled={busy} onclick={() => remove(p)}>Delete</button>
                  {:else}
                    <button type="button" class="btn danger press" onclick={() => (deleting = p.id)}>Delete</button>
                  {/if}
                {/if}
              {/if}
            </div>
          {/if}
        </li>
      {/each}
    </ul>
    {#if maker}<button type="button" class="btn press" data-op="new" onclick={() => onbuild(null, "new")}>New plan</button>{/if}
  {/if}
</div>

<style>
  .picker { display: flex; flex-direction: column; align-items: stretch; gap: 0.75rem; }
  .back {
    align-self: flex-start; min-height: 2.75rem; margin-left: -0.25rem; padding: 0 0.25rem; border: 0; background: none;
    color: var(--accent-text); font: inherit; font-size: 1.0625rem;
  }
  h2 { margin: 0 0.25rem; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; }
  ul { margin: 0; padding: 0 1rem; list-style: none; }
  li { padding: 0.25rem 0 0.75rem; }
  li + li { border-top: 1px solid var(--line); }
  .row {
    display: flex; flex-direction: column; align-items: flex-start; gap: 0.125rem; width: 100%; min-height: 2.75rem; padding: 0.5rem 0 0;
    border: 0; background: none; color: var(--fg); font: inherit; text-align: left;
  }
  .name { font-weight: 600; overflow-wrap: anywhere; }
  .mini {
    padding: 0.0625rem 0.4375rem; border-radius: var(--radius-chip); font-size: 0.6875rem; font-weight: 700;
    background: color-mix(in srgb, var(--run) 20%, transparent);
  }
  .by { display: inline-block; padding: 0.125rem 0; }
  a.by { color: var(--accent-text); }
  .acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
  .stepper { display: flex; align-items: center; gap: 0.25rem; flex-basis: 100%; }
  .lbl { flex: 1; font-weight: 500; }
  output { min-width: 2.5rem; text-align: center; font-size: 1.0625rem; font-weight: 700; }
  .wide { flex-basis: 100%; }
  .ask { flex-basis: 100%; font-weight: 600; }
</style>
