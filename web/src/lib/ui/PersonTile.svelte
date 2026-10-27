<script>
  import { screen } from "../media.svelte.js";
  import { levelProgress, ringFractions, stepsLine } from "../model.js";
  import Rings from "./Rings.svelte";

  // `index`: the person's place in the payload, for a stable avatar colour. `compact`: one line with small rings (the partner on a phone).
  // `onopen(event)`: the whole tile becomes a button that opens the person's details.
  let { person: p, index = 0, compact = false, onopen } = $props();

  const AVATARS = [["#30D158", "#0A84FF"], ["#FF9F0A", "#FF375F"], ["#64D2FF", "#5E5CE6"], ["#FFD60A", "#FF9F0A"]];
  const [a1, a2] = $derived(AVATARS[index % AVATARS.length]);
  const lv = $derived(levelProgress(p));
  const w = $derived(p.week);
  const stats = $derived([
    { kind: "run", label: "Runs", n: w.runs, of: w.goal.runs },
    { kind: "gym", label: "Workouts", n: w.workouts ?? w.gym, of: w.goal.workouts ?? w.goal.gym },
    { kind: "bonus", label: "Active days", n: w.active_days ?? 0, of: w.goal.active_days ?? 0 },
  ]);
  const steps = $derived(stepsLine(p.steps_today, w.goal.steps));
  const line = $derived(
    [`Level ${lv.level}`, compact ? `🔥 ${p.streak} wk` : `${p.xp.toLocaleString()} XP`, w.paused && "Week paused"].filter(Boolean).join(" · "),
  );
  const summary = $derived(
    `${p.name}, level ${lv.level}. This week ${stats.map((s) => `${s.label.toLowerCase()} ${s.n} of ${s.of}`).join(", ")}. ` +
      `${w.bonus ? "Weekly bonus earned. " : ""}${steps ? steps.replace("👟 ", "") + ". " : ""}Streak ${p.streak} weeks.`,
  );
</script>

<!-- The content stays mounted whether or not the tile opens details (`onopen` adds a full-size button over it), so the rings fill once. -->
<article class="tile glass" class:compact class:opens={onopen}>
  <div aria-hidden={onopen ? "true" : undefined}>
    <span class="head">
      <span class="avatar" style:--a1={a1} style:--a2={a2} aria-hidden="true">{p.name.slice(0, 1)}</span>
      <span class="who">
        <span class="name">{p.name}</span>
        <span class="lvl">{line}</span>
      </span>
      {#if compact}
        <span class="rings">
          <Rings fractions={ringFractions(w)} size={44} />
          {#if w.bonus}<span class="star small" aria-hidden="true">⭐</span>{/if}
        </span>
        <span class="sr">{summary}</span>
      {:else}
        <span class="streak">🔥 {p.streak} wk</span>
      {/if}
      {#if onopen}<span class="chev" aria-hidden="true">›</span>{/if}
    </span>
    {#if !compact}
      <span class="body">
        <span class="rings">
          <Rings fractions={ringFractions(w)} size={screen.wide ? 112 : 88} />
          {#if w.bonus}<span class="star" aria-hidden="true">⭐</span>{/if}
        </span>
        <span class="stats">
          {#each stats as s (s.kind)}
            <span class="stat">
              <span class="k"><i style:background="var(--{s.kind})"></i>{s.label}</span>
              <span class="v">{s.n}<small>/{s.of}</small></span>
            </span>
          {/each}
        </span>
      </span>
      {#if steps}<span class="steps">{steps}</span>{/if}
      <span class="xp">
        <span class="bar"><i style:width="{lv.frac * 100}%"></i></span>
        <span class="caption">{lv.into.toLocaleString()} of {lv.span.toLocaleString()} XP to level {lv.level + 1}</span>
      </span>
    {/if}
  </div>
  {#if onopen}<button type="button" class="hit" onclick={onopen} aria-label={summary}></button>{/if}
</article>

<style>
  .tile { position: relative; display: block; width: 100%; box-sizing: border-box; padding: 1.25rem; margin: 0; }
  .opens { transition: transform 100ms; }
  .opens:has(> .hit:active) { transform: scale(var(--press-scale)); }
  .hit { position: absolute; inset: 0; margin: 0; padding: 0; border: 0; border-radius: inherit; background: none; }
  .tile.compact { padding: 0.75rem 1rem; border-radius: var(--radius-pill); }
  .who, .name, .steps, .lvl, .stat, .v, .xp, .bar, .caption { display: block; }
  .head { display: flex; align-items: center; gap: 0.75rem; }
  .avatar {
    display: grid; place-items: center; flex: none; width: 2.75rem; height: 2.75rem; border-radius: 50%;
    background: linear-gradient(135deg, var(--a1), var(--a2)); color: #FFF; font-size: 1.125rem; font-weight: 700;
  }
  .compact .avatar { width: 2.25rem; height: 2.25rem; font-size: 0.9375rem; }
  .who { flex: 1; min-width: 0; }
  .name { font-size: 1.25rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.01em; }
  .compact .name { font-size: 1.0625rem; }
  .lvl { color: var(--muted); font-size: 0.875rem; font-weight: 500; }
  .streak { flex: none; font-weight: 600; white-space: nowrap; }
  .chev { color: var(--muted); font-size: 1.5rem; line-height: 1; }

  .body { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 1.25rem; margin-top: 1rem; }
  .stats { display: flex; flex: 1; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1rem; }
  .k {
    display: flex; align-items: center; gap: 0.375rem;
    color: var(--muted); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase;
  }
  .k i { width: 0.5rem; height: 0.5rem; border-radius: 50%; }
  .v { font-size: 1.75rem; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
  .v small { color: var(--muted); font-size: 0.9375rem; font-weight: 600; letter-spacing: 0; }

  .rings { position: relative; display: block; flex: none; }
  .star { position: absolute; top: -0.25rem; right: -0.5rem; font-size: 1.125rem; line-height: 1; }
  .star.small { top: -0.375rem; right: -0.375rem; font-size: 0.75rem; }
  .steps { margin-top: 1rem; font-size: 0.9375rem; font-weight: 600; }
  .xp { margin-top: 1rem; }
  .bar { height: 0.375rem; overflow: hidden; border-radius: var(--radius-chip); background: var(--fill); margin-bottom: 0.375rem; }
  .bar i { display: block; height: 100%; border-radius: inherit; background: var(--fg); }
</style>
