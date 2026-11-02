<script>
  import { planBar, programmeText, sessionPlan, sessionSeconds } from "../model.js";

  // One session of the builder (a sessionDraft, edited in place): warm-up, run/walk rows × times, cool-down, when it is done, a note, and a
  // live preview with the plan bar. `label`: "Week 2, run 1". `ondelete`: removes it (null: the week's only session).
  let { session: s = $bindable(), label, ondelete = null } = $props();
  const uid = $props.id();
  const DONE = [
    { type: "duration", label: "Time", hint: "Done at 80% of the planned time." },
    { type: "distance", label: "Distance", hint: "Done at 90% of the distance." },
    { type: "none", label: "Any run", hint: "Any run counts." },
  ];
  const dist = $derived(s.target.type === "distance");
  const plan = $derived(sessionPlan($state.snapshot(s)));
  const segs = $derived(dist ? [] : planBar(plan));

  const secs = (v) => Math.max(0, Math.round(v)) || 0; // an emptied field is 0
  const mmss = (iv, min, sec) => (iv[1] = secs(min) * 60 + secs(sec));
</script>

{#snippet minutes(key, name)}
  <label class="line">
    <span class="lbl">{name}</span>
    <input class="field num" type="number" inputmode="decimal" min="0" max="180" step="0.5" value={s[key] / 60}
      onchange={(e) => (s[key] = secs(e.currentTarget.valueAsNumber * 60))} /> min
  </label>
{/snippet}

<fieldset class="session">
  <legend>{label}</legend>
  {#if ondelete}<button type="button" class="del press" aria-label="Delete {label}" onclick={ondelete}>×</button>{/if}
  {@render minutes("warmup_s", "Warm-up walk")}

  {#if !dist}
    {#each s.intervals as iv, i (i)}
      <div class="line iv" role="group" aria-label="Interval {i + 1}">
        <select class="field" aria-label="Interval {i + 1} kind" bind:value={iv[0]}>
          <option value="run">Run</option>
          <option value="walk">Walk</option>
        </select>
        <input class="field num" type="number" inputmode="numeric" min="0" max="180" aria-label="Interval {i + 1} minutes"
          value={Math.floor(iv[1] / 60)} onchange={(e) => mmss(iv, e.currentTarget.valueAsNumber, iv[1] % 60)} />
        <span aria-hidden="true">:</span>
        <input class="field num" type="number" inputmode="numeric" min="0" max="59" aria-label="Interval {i + 1} seconds"
          value={iv[1] % 60} onchange={(e) => mmss(iv, Math.floor(iv[1] / 60), e.currentTarget.valueAsNumber)} />
        <button type="button" class="del press" aria-label="Delete interval {i + 1}" onclick={() => s.intervals.splice(i, 1)}>×</button>
      </div>
    {/each}
    <button type="button" class="btn press" disabled={s.intervals.length >= 30}
      onclick={() => s.intervals.push([s.intervals.at(-1)?.[0] === "run" ? "walk" : "run", 60])}>Add interval</button>
    {#if s.intervals.length}
      <div class="line" role="group" aria-label="Times through the intervals">
        <span class="lbl" aria-hidden="true">Times</span>
        <button type="button" class="pm press" aria-label="Fewer times" disabled={s.times <= 1} onclick={() => s.times--}>−</button>
        <output aria-live="polite">{s.times}</output>
        <button type="button" class="pm press" aria-label="More times" disabled={s.times >= 50} onclick={() => s.times++}>+</button>
      </div>
    {/if}
  {/if}

  {@render minutes("cooldown_s", "Cool-down walk")}

  <div class="seg" role="radiogroup" aria-label="Done when">
    {#each DONE as d (d.type)}
      <label class:on={s.target.type === d.type}>
        <input class="sr" type="radio" name="{uid}-done" value={d.type} bind:group={s.target.type} />{d.label}
      </label>
    {/each}
  </div>
  <p class="caption">{DONE.find((d) => d.type === s.target.type).hint}</p>
  {#if dist}
    <label class="line">
      <span class="lbl">Distance</span>
      <input class="field num" type="number" inputmode="decimal" min="0.1" max="100" step="0.1" value={s.target.km}
        onchange={(e) => (s.target.km = Math.round(e.currentTarget.valueAsNumber * 10) / 10 || 0)} /> km
    </label>
  {/if}
  <label class="line note">
    <span class="lbl">Note</span>
    <input class="field" type="text" maxlength="80" placeholder="Easy pace" bind:value={s.note} />
  </label>

  <div class="preview" aria-live="polite">
    {#if segs.length}
      <div class="segs" role="img" aria-label="Run and walk intervals">
        {#each segs as g, i (i)}<i style:flex-grow={g.frac} style:background="var(--{g.kind === 'run' ? 'run' : 'fill'})"></i>{/each}
      </div>
    {/if}
    <p class="caption">{programmeText(plan) || "No run yet"}{#if !dist} · {Math.round(sessionSeconds(s) / 60)} min{/if}</p>
  </div>
</fieldset>

<style>
  .session { position: relative; display: flex; flex-direction: column; gap: 0.25rem; margin: 0; padding: 0.5rem 0 0.75rem; border: 0; border-top: 1px solid var(--line); }
  legend { float: left; padding: 0.25rem 0; font-weight: 700; }
  legend + * { clear: left; }
  .session > .del { position: absolute; top: 0.25rem; right: -0.5rem; }
  .line { display: flex; align-items: center; gap: 0.375rem; min-height: 3rem; }
  .lbl { flex: 1; min-width: 0; font-weight: 500; }
  .num { width: 4.5rem; text-align: center; }
  .iv .num { width: 3.75rem; }
  .iv select { flex: 1; min-width: 0; }
  .note .field { flex: 3; min-width: 0; }
  output { min-width: 2.5rem; text-align: center; font-size: 1.0625rem; font-weight: 700; }
  .del {
    display: grid; place-items: center; flex: none; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 50%;
    background: none; color: var(--warn-text); font: inherit; font-size: 1.375rem;
  }
  .btn { align-self: flex-start; }
  .caption { margin: 0.25rem 0; }

  /* segmented control: native radios (arrow keys move the choice), the labels are the segments */
  .seg { display: flex; margin-top: 0.5rem; padding: 0.125rem; border-radius: var(--radius-ctl); background: var(--fill); }
  .seg label {
    position: relative; display: grid; place-items: center; flex: 1; min-height: 2.75rem; border-radius: 8px;
    font-weight: 600; cursor: pointer; transition: background var(--fade);
  }
  .seg label.on { background: var(--card); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12); }
  .seg label:has(:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }

  .preview { margin-top: 0.5rem; }
  .segs { display: flex; gap: 2px; height: 1.25rem; overflow: hidden; border-radius: 0.375rem; }
  .segs i { flex: 1 1 0; min-width: 2px; }
</style>
