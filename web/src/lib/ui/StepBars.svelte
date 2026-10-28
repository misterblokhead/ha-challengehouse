<script>
  // This week's steps, Monday to Sunday (`bars` from weekBars). Active days wear the active-days ring colour (--bonus): same meaning.
  // The chart is a list of text labels for assistive tech, the drawing itself is decoration.
  let { bars, goal } = $props();
  const top = $derived(Math.max(goal, ...bars.map((b) => b.steps ?? 0)));
  const goalFrac = $derived(goal > 0 ? goal / top : null);
  const weekday = (date) => new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", timeZone: "UTC" });
  const label = (b) => `${weekday(b.date)} ${b.steps.toLocaleString("en-US")} steps`;
</script>

<ul>
  {#each bars as b (b.date)}
    <li aria-label={b.future ? undefined : label(b)} aria-hidden={b.future ? "true" : undefined} aria-current={b.isToday ? "date" : undefined} class:today={b.isToday}>
      <span class="col" aria-hidden="true"><i class:active={b.active} style:height="{b.frac * 100}%"></i></span>
      <span class="day" aria-hidden="true">{b.label}</span>
    </li>
  {/each}
  {#if goalFrac !== null}<span class="goal" aria-hidden="true" style:bottom="calc(1.5rem + (100% - 1.5rem) * {goalFrac})"></span>{/if}
</ul>

<style>
  ul { position: relative; display: flex; gap: 0.5rem; height: 7rem; margin: 0; padding: 0; list-style: none; }
  li { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .col { flex: 1; display: flex; align-items: flex-end; }
  i { display: block; width: 100%; min-height: 2px; border-radius: 0.25rem 0.25rem 0 0; background: var(--muted); opacity: 0.45; }
  i.active { background: var(--bonus); opacity: 1; }
  .day { height: 1.5rem; display: grid; place-items: center; color: var(--muted); font-size: 0.75rem; font-weight: 600; }
  .today .day { color: var(--fg); }
  .today .day::after { content: ""; width: 0.25rem; height: 0.25rem; border-radius: 50%; background: var(--fg); margin-top: 0.125rem; }
  .goal { position: absolute; inset-inline: 0; border-top: 1px dashed var(--line); pointer-events: none; }
</style>
