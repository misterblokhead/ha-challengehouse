<script>
  import { rewardLine, togetherLine } from "../model.js";

  // The couple's shared numbers; only rendered when fitbridge has a [group]. `g.week` (this week's goal in its mode and the reward)
  // is missing on older payloads: then only the numbers show.
  let { group: g, people } = $props();
  const progress = $derived(g.week ? togetherLine(g.week, people) : "");
  const reward = $derived(g.week ? rewardLine(g.week) : null);
  const facts = $derived([
    { v: `🔥 ${g.streak}`, unit: " wk", k: "Couple streak" },
    { v: String(g.month_joint), unit: "", k: "Joint this month" },
    { v: g.km_together.toFixed(1), unit: " km", k: "Distance" },
  ]);
</script>

<section class="together glass" aria-labelledby="together-title">
  <h2 id="together-title">Together</h2>
  {#if progress}<p class="progress">{progress}</p>{/if}
  {#if reward}<p class="reward" class:met={g.week.met}>{g.week.met ? "🎉 " : "🎁 "}{reward}</p>{/if}
  <dl>
    {#each facts as f (f.k)}
      <div><dt>{f.k}</dt><dd>{f.v}<small>{f.unit}</small></dd></div>
    {/each}
  </dl>
</section>

<style>
  .together { padding: 1rem 1.25rem; }
  h2 { margin: 0 0 0.5rem; font-size: 1.0625rem; font-weight: 700; letter-spacing: -0.01em; }
  p { margin: 0 0 0.5rem; overflow-wrap: anywhere; }
  .progress { font-weight: 600; }
  .reward { color: var(--muted); font-size: 0.875rem; }
  .reward.met { color: var(--good-text); font-weight: 600; }
  dl { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1rem; margin: 0; }
  dt { color: var(--muted); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.02em; text-transform: uppercase; }
  dd { margin: 0; font-size: 1.375rem; font-weight: 700; line-height: 1.15; letter-spacing: -0.01em; }
  dd small { color: var(--muted); font-size: 0.875rem; font-weight: 600; letter-spacing: 0; }
</style>
