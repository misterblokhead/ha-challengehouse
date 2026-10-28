<script>
  import uPlot from "uplot";
  import { clock } from "./details.js";

  // One series against elapsed time. x: seconds from the start; values: nulls are gaps (a pause draws no line across);
  // color: a token name; fmt: the y axis's tick text (pace as m:ss), numbers as they are without one.
  // shortcut: colours are read once per pop-up, so a light/dark flip while it is open keeps the old ones until it reopens
  let { x, label, values, color, fmt = null, height = 140 } = $props();
  let el;

  $effect(() => {
    const css = getComputedStyle(el);
    const token = (name) => css.getPropertyValue(name).trim();
    const muted = token("--muted"), line = token("--line"), font = `11px ${token("--font")}`;
    const axis = (extra) => ({ stroke: muted, font, grid: { stroke: line, width: 1 }, ticks: { stroke: line, width: 1 }, ...extra });
    const plot = new uPlot(
      {
        width: el.clientWidth || 300,
        height,
        legend: { show: false }, // the heading names it
        cursor: { drag: { x: false, y: false } },
        scales: { x: { time: false } },
        axes: [axis({ values: (u, v) => v.map(clock) }), axis(fmt ? { values: (u, v) => v.map(fmt), size: 48 } : {})],
        series: [{}, { label, stroke: token(color), width: 2, spanGaps: false, points: { show: false } }],
      },
      [x, values],
      el,
    );
    const ro = new ResizeObserver(() => plot.setSize({ width: el.clientWidth, height }));
    ro.observe(el);
    return () => { ro.disconnect(); plot.destroy(); };
  });
</script>

<div bind:this={el} class="chart" role="img" aria-label="Graph: {label} against time"></div>

<style>
  .chart { width: 100%; min-width: 0; color: var(--fg); }
</style>
