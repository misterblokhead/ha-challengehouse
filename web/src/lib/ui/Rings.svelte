<script>
  import { onMount } from "svelte";
  import { animate as drive } from "../motion.js";
  import { screen } from "../media.svelte.js";
  import { createSpring } from "../spring.js";

  // Three concentric rings, outer to inner: runs, workouts (the `gym` token), active days (the `bonus` token). `size` in CSS px at the default text size; the rings scale with it.
  // They fill from empty once, when the component first appears; later fractions show as they are.
  let { fractions, size = 88 } = $props();

  const KINDS = ["run", "gym", "bonus"];
  const FULL = 1000; // the spring settles to within 0.5, so it runs in thousandths
  let shown = $state(screen.reducedMotion ? FULL : 0);

  const stroke = $derived(size * 0.11);
  const rings = $derived(
    fractions.map((f, i) => {
      const r = size / 2 - stroke / 2 - i * stroke * 1.3;
      const c = 2 * Math.PI * r;
      return { kind: KINDS[i], r, c, len: (c * f * shown) / FULL };
    }),
  );

  onMount(() => {
    if (shown === FULL) return;
    const run = drive(createSpring({ value: 0, response: 0.35, damping: 1 }), { onFrame: (v) => (shown = v) });
    run.to(FULL);
    return run.stop;
  });
</script>

<svg viewBox="0 0 {size} {size}" style:width="{size / 16}rem" aria-hidden="true">
  {#each rings as ring (ring.kind)}
    <circle class="track" style:stroke="var(--{ring.kind})" cx={size / 2} cy={size / 2} r={ring.r} stroke-width={stroke} />
    <circle
      style:stroke="var(--{ring.kind})" cx={size / 2} cy={size / 2} r={ring.r} stroke-width={stroke}
      stroke-dasharray="{ring.len} {ring.c}" opacity={ring.len > 0.01 ? 1 : 0}
      transform="rotate(-90 {size / 2} {size / 2})"
    />
  {/each}
</svg>

<style>
  svg { display: block; flex: none; height: auto; }
  circle { fill: none; stroke-linecap: round; }
  .track { stroke-opacity: 0.2; }
</style>
