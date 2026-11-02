<script>
  import { onMount, untrack } from "svelte";
  import { planOp, say } from "../actions.svelte.js";
  import { expandWeeks, sessionBody, sessionDraft } from "../model.js";
  import PlanSession from "./PlanSession.svelte";

  // Build a plan: its name, whether it repeats, then the weeks (one open at a time), each a list of sessions. `from`: the plan copied or
  // edited (from GET plans), null for a new one; `mode` "new" | "copy" | "edit". It always saves `sessions` lists: a copy's `repeat`
  // weeks are expanded. Back (and a Save the integration took) returns to the plan list; a refused Save shows its reason by the button.
  let { from = null, mode, onback } = $props();
  const uid = $props.id();
  const fresh = () => sessionDraft({ warmup_s: 300, cooldown_s: 300, intervals: [["run", 60], ["walk", 90]], target: { type: "duration" } });
  const weeksOf = (f) => expandWeeks(f.weeks).map((w) => ({ sessions: w.sessions.map(sessionDraft) }));
  const nameOf = (f) => (mode === "copy" ? `${f.name.slice(0, 33)} (copy)` : f.name); // a copy's name stays within 40
  const start = (f) => (f ? { name: nameOf(f), loop: !!f.loop, weeks: weeksOf(f) } : { name: "", loop: false, weeks: [{ sessions: [fresh()] }] });
  let draft = $state(untrack(() => start(from))); // the builder opens anew for another plan
  let open = $state(0); // the week shown, -1 none
  let busy = $state(false), error = $state(null);
  let back;
  onMount(() => back.focus());

  const runs = (n) => `${n} ${n === 1 ? "run" : "runs"}`;
  function addWeek(at, week) {
    draft.weeks.splice(at, 0, week);
    open = at;
  }

  async function save() {
    busy = true;
    const d = $state.snapshot(draft);
    const plan = { name: d.name.trim(), loop: d.loop, weeks: d.weeks.map((w) => ({ sessions: w.sessions.map(sessionBody) })) };
    const r = await planOp({ op: "save", ...(mode === "edit" && { id: from.id }), plan });
    busy = false;
    error = r.error ?? null;
    const at = /^weeks\.(\d+)/.exec(error ?? ""); // "weeks.3.sessions.1.times: ...": show that week
    if (at) open = at[1] - 1;
    if (!error) {
      say(`Saved ${plan.name}`);
      onback();
    }
  }
</script>

<div class="builder">
  <button type="button" class="back press" bind:this={back} onclick={onback}><span aria-hidden="true">‹</span> Back</button>
  <h2>{mode === "edit" ? "Edit plan" : "New plan"}</h2>
  <div class="card head">
    <label class="line">
      <span class="lbl">Name</span>
      <input class="field" type="text" maxlength="40" placeholder="My easy week" bind:value={draft.name} />
    </label>
    <label class="line toggle">
      <span class="lbl">Repeat when done<small class="caption">Starts again at week 1, never graduates</small></span>
      <input type="checkbox" bind:checked={draft.loop} />
    </label>
  </div>

  {#each draft.weeks as w, wi (w)}
    <section class="card week" aria-labelledby="{uid}-w{wi}">
      <h3>
        <button type="button" class="wk" id="{uid}-w{wi}" aria-expanded={open === wi} onclick={() => (open = open === wi ? -1 : wi)}>
          Week {wi + 1} <span class="caption">· {runs(w.sessions.length)}</span><span class="chev" aria-hidden="true">{open === wi ? "▾" : "▸"}</span>
        </button>
      </h3>
      {#if open === wi}
        {#each w.sessions as s, si (s)}
          <PlanSession bind:session={w.sessions[si]} label="Week {wi + 1}, run {si + 1}" ondelete={w.sessions.length > 1 ? () => w.sessions.splice(si, 1) : null} />
        {/each}
        <div class="acts">
          <button type="button" class="btn press" disabled={w.sessions.length >= 7} onclick={() => w.sessions.push(fresh())}>Add session</button>
          <button type="button" class="btn press" disabled={draft.weeks.length >= 52} onclick={() => addWeek(wi + 1, structuredClone($state.snapshot(w)))}>Duplicate week</button>
          <button type="button" class="btn danger press" disabled={draft.weeks.length <= 1} onclick={() => { draft.weeks.splice(wi, 1); open = -1; }}>Delete week</button>
        </div>
      {/if}
    </section>
  {/each}
  <button type="button" class="btn press" disabled={draft.weeks.length >= 52} onclick={() => addWeek(draft.weeks.length, { sessions: [fresh()] })}>Add week</button>

  {#if error}<p class="error" role="alert">{error}</p>{/if}
  <button type="button" class="btn primary press" disabled={busy} onclick={save}>Save</button>
</div>

<style>
  .builder { display: flex; flex-direction: column; align-items: stretch; gap: 0.75rem; }
  .back {
    align-self: flex-start; min-height: 2.75rem; margin-left: -0.25rem; padding: 0 0.25rem; border: 0; background: none;
    color: var(--accent-text); font: inherit; font-size: 1.0625rem;
  }
  h2 { margin: 0 0.25rem; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; }
  .card { padding: 0.25rem 1rem; }
  .line { display: flex; align-items: center; gap: 0.5rem; min-height: 3rem; }
  .line + .line { border-top: 1px solid var(--line); }
  .lbl { display: flex; flex-direction: column; flex: 1; min-width: 0; font-weight: 500; }
  .head .field { flex: 3; min-width: 0; }
  .toggle input { width: 1.5rem; height: 1.5rem; accent-color: var(--accent); }
  h3 { margin: 0; }
  .wk {
    display: flex; align-items: baseline; gap: 0.375rem; width: 100%; min-height: 3rem; padding: 0; border: 0; background: none;
    color: var(--fg); font: inherit; font-size: 1.0625rem; font-weight: 700; text-align: left;
  }
  .chev { margin-left: auto; color: var(--muted); }
  .acts { display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem 0 0.75rem; border-top: 1px solid var(--line); }
  .error { margin: 0; color: var(--warn-text); font-weight: 600; overflow-wrap: anywhere; }
</style>
