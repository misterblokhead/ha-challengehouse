<script>
  import { onMount } from "svelte";
  import { saveGoals } from "../actions.svelte.js";
  import { get } from "../api.js";
  import { clampGoal, goalsDraft, isoWeek, LIMITS, maxHrText, PERSON_GOALS } from "../model.js";

  // The weekly goals per person, the couple mode with its number, and the reward, set together from a phone. They apply from this
  // week's Monday. `readOnly` (an unmapped viewer, the wall iPad): everything shows, nothing changes and there is no Save.
  // `people`: the payload as scored (names, and what a Save compares against). `onsaved`: after the integration took a Save.
  let { people, readOnly, onsaved } = $props();
  const uid = $props.id();

  let res = $state(null);
  let failure = $state(null);
  let draft = $state(null);
  let saving = $state(false);

  onMount(() => {
    get("settings").then(
      (r) => {
        res = r;
        draft = goalsDraft(r, people);
      },
      (e) => (failure = e),
    );
  });

  const LABELS = { runs: "Runs per week", workouts: "Workouts per week", active_days: "Active days per week", steps: "Steps for an active day" };
  const MODES = [
    { mode: "own", label: "Own", hint: "Met when you both make your own goals." },
    { mode: "together", label: "Together", hint: "Your own goals, plus workouts done together." },
    { mode: "team", label: "Team", hint: "Your runs, workouts and active days added up." },
  ];
  const COUPLE = { together: "Workouts together per week", team: "Team points per week" };
  const lower = (s) => s[0].toLowerCase() + s.slice(1);
  const fmt = (k, v) => (k === "steps" ? v.toLocaleString("en-US") : String(v));

  async function save() {
    saving = true;
    const ok = await saveGoals($state.snapshot(draft), people);
    saving = false;
    if (ok) onsaved();
  }
</script>

{#snippet stepper(obj, k, label)}
  {@const [lo, hi, step] = LIMITS[k]}
  <div class="stepper" role="group" aria-label={label}>
    <span class="name" aria-hidden="true">{label.split(",")[0]}</span>
    <button type="button" class="pm press" aria-label="Fewer {lower(label)}" disabled={readOnly || obj[k] <= lo} onclick={() => (obj[k] = clampGoal(k, obj[k] - step))}>−</button>
    <output aria-live="polite">{fmt(k, obj[k])}</output>
    <button type="button" class="pm press" aria-label="More {lower(label)}" disabled={readOnly || obj[k] >= hi} onclick={() => (obj[k] = clampGoal(k, obj[k] + step))}>+</button>
  </div>
{/snippet}

<h2 class="title">Goals</h2>
{#if !draft}
  <p class="msg" role="status">{failure ? (failure.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant") : "Loading…"}</p>
{:else}
  <p class="caption">Applies from this week (week {isoWeek(res.week_start)})</p>

  {#each Object.keys(draft.people) as id (id)}
    {@const name = people[id]?.name ?? id}
    <section class="group glass" aria-labelledby="{uid}-{id}">
      <h3 id="{uid}-{id}">{name}</h3>
      {#each PERSON_GOALS as k (k)}{@render stepper(draft.people[id], k, `${LABELS[k]}, ${name}`)}{/each}
      <label class="year">
        <span class="name">Birth year</span>
        <input type="number" inputmode="numeric" min="1900" max={new Date().getFullYear()} placeholder="1990" bind:value={draft.profiles[id].birth_year} disabled={readOnly} />
      </label>
      <p class="caption maxhr">{maxHrText(people[id]?.max_hr)}</p>
    </section>
  {/each}

  <section class="group glass" aria-labelledby="{uid}-couple">
    <h3 id="{uid}-couple">Together</h3>
    <div class="seg" role="radiogroup" aria-labelledby="{uid}-couple">
      {#each MODES as m (m.mode)}
        <label class:on={draft.couple.mode === m.mode}>
          <input class="sr" type="radio" name="{uid}-mode" value={m.mode} bind:group={draft.couple.mode} disabled={readOnly} />{m.label}
        </label>
      {/each}
    </div>
    <p class="caption hint">{MODES.find((m) => m.mode === draft.couple.mode).hint}</p>
    {#if COUPLE[draft.couple.mode]}{@render stepper(draft.couple, draft.couple.mode, COUPLE[draft.couple.mode])}{/if}
    <label class="reward">
      <span class="name">Reward</span>
      <input type="text" maxlength="60" placeholder="Pizza night" bind:value={draft.couple.reward} disabled={readOnly} />
    </label>
  </section>

  {#if !readOnly}<button type="button" class="btn save" disabled={saving} onclick={save}>Save</button>{/if}
{/if}

<style>
  .title { margin: 0 0.25rem; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.01em; }
  .caption { margin: -0.5rem 0.25rem 0; }
  .group { display: flex; flex-direction: column; padding: 0.5rem 1rem 0.75rem; }
  h3 { margin: 0.5rem 0 0.25rem; font-size: 1.0625rem; font-weight: 700; }
  .stepper { display: flex; align-items: center; gap: 0.25rem; min-height: 3rem; border-top: 1px solid var(--line); }
  h3 + .stepper { border-top: 0; }
  .name { flex: 1; min-width: 0; font-weight: 500; }
  output { min-width: 3.75rem; text-align: center; font-size: 1.0625rem; font-weight: 700; }
  .pm {
    display: grid; place-items: center; flex: none; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 50%;
    background: var(--fill); color: var(--accent-text); font: inherit; font-size: 1.375rem; font-weight: 600; line-height: 1;
  }

  /* segmented control: native radios (arrow keys move the choice), the labels are the segments */
  .seg { display: flex; margin: 0.25rem 0; padding: 0.125rem; border-radius: var(--radius-ctl); background: var(--fill); }
  .seg label {
    position: relative; display: grid; place-items: center; flex: 1; min-height: 2.75rem; border-radius: 8px;
    font-weight: 600; cursor: pointer; transition: background var(--fade);
  }
  .seg label.on { background: var(--card); box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12); }
  .seg label:has(:focus-visible) { outline: 2px solid var(--accent); outline-offset: 2px; }
  .seg label:has(:disabled) { cursor: default; }
  .hint { margin: 0.25rem 0 0.25rem; }

  .reward { display: flex; flex-direction: column; gap: 0.375rem; padding: 0.5rem 0 0.25rem; border-top: 1px solid var(--line); }
  .reward input {
    box-sizing: border-box; width: 100%; min-height: 2.75rem; padding: 0 0.75rem; border: 1px solid var(--line); border-radius: var(--radius-ctl);
    background: var(--card); color: var(--fg); font: inherit; font-size: 1rem; /* 16 px: iOS does not zoom into it */
  }
  .reward input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .reward input:disabled { opacity: 0.6; }
  .year { display: flex; align-items: center; gap: 0.5rem; min-height: 3rem; border-top: 1px solid var(--line); }
  .year input {
    box-sizing: border-box; width: 6rem; min-height: 2.75rem; padding: 0 0.75rem; border: 1px solid var(--line); border-radius: var(--radius-ctl);
    background: var(--card); color: var(--fg); font: inherit; font-size: 1rem; text-align: center; /* 16 px: iOS does not zoom into it */
  }
  .year input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .year input:disabled { opacity: 0.6; }
  .maxhr { margin: 0 0 0.25rem; }
  .save { align-self: stretch; background: var(--accent-text); color: #FFF; }
  :global([data-theme="dark"]) .save { color: #000; }
</style>
