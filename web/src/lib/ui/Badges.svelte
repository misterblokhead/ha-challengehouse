<script>
  import { shortDate } from "../model.js";

  // The latest unlocks, highlighted with their day, then the next three with progress. Icons are scoring.toml's mdi names; the page
  // runs in its own iframe without HA's icon set, so they map to emoji.
  let { badges: b } = $props();

  const ICONS = {
    run: "🏃", "run-fast": "🏃", "map-marker-distance": "📍", ruler: "📏", "calendar-check": "📅", dumbbell: "🏋️",
    "weight-lifter": "🏋️", trophy: "🏆", "trophy-award": "🏆", target: "🎯", fire: "🔥", "star-circle": "⭐", beach: "🏖️",
    "weather-sunset-up": "🌅", "weather-night": "🌙", "account-multiple": "👥", medal: "🏅",
  };
  const icon = (x) => ICONS[String(x.icon).replace(/^mdi:/, "")] ?? "🏅";
  const num = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 1 });
</script>

<div class="card badges">
  {#if b.recent.length}
    <ul>
      {#each b.recent as x (x.id)}
        <li class="new">
          <span class="medal" aria-hidden="true">{icon(x)}</span>
          <span class="t">{x.title}</span>
          <span class="s">{shortDate(x.unlocked_at)}</span>
        </li>
      {/each}
    </ul>
  {/if}
  {#if b.next.length}
    <ul>
      {#each b.next as x (x.id)}
        <li class="locked">
          <span class="medal" aria-hidden="true">{icon(x)}</span>
          <span class="t">{x.title}</span>
          <span class="s">{num(x.current)} of {num(x.target)}</span>
          <span class="prog" aria-hidden="true"><i style:width="{Math.min(1, x.current / x.target) * 100}%"></i></span>
        </li>
      {/each}
    </ul>
  {/if}
  {#if !b.recent.length && !b.next.length}<p class="caption">No badges yet.</p>{/if}
</div>

<style>
  .badges { display: flex; flex-direction: column; gap: 1rem; padding: 1rem; }
  ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 0; padding: 0; list-style: none; }
  ul + ul { padding-top: 1rem; border-top: 1px solid var(--line); }
  li { display: flex; flex-direction: column; align-items: center; min-width: 0; text-align: center; }
  .medal {
    display: grid; place-items: center; width: 3.5rem; height: 3.5rem; margin-bottom: 0.375rem; border-radius: 50%;
    background: var(--fill); font-size: 1.5rem;
  }
  .new .medal { background: color-mix(in srgb, var(--gym) 16%, var(--card)); box-shadow: inset 0 0 0 3px var(--gym); }
  .locked .medal { filter: grayscale(1); opacity: 0.6; }
  .t { font-size: 0.8125rem; font-weight: 600; line-height: 1.2; overflow-wrap: anywhere; }
  .s { color: var(--muted); font-size: 0.75rem; }
  .prog { display: block; width: 80%; height: 0.3125rem; margin-top: 0.375rem; overflow: hidden; border-radius: var(--radius-chip); background: var(--fill); }
  .prog i { display: block; height: 100%; border-radius: inherit; background: var(--fg); }
  .caption { margin: 0; }
</style>
