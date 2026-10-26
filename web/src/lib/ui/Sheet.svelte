<script>
  import { onMount } from "svelte";
  import { rubberband, shouldClose, velocity } from "../gesture.js";
  import { screen } from "../media.svelte.js";
  import { animate, cssMs } from "../motion.js";
  import { createSpring } from "../spring.js";

  // A bottom sheet over the page. It grows out of `from` (the tapped tile; without one, the bottom edge) and Close, Esc or the scrim
  // shrink it back into it. Dragged by its top bar it follows the finger (rubber-band above the top); on release it closes when the
  // flick's projected end passes half its height, else springs back. Every motion starts from what is on screen, so a closing sheet can
  // be grabbed again. Reduced motion: it cross-fades in and out; a drag still follows the finger but nothing springs.
  let { label, from = null, onclose, onback, children } = $props();

  const FULL = 1000; // growth in thousandths: springs settle to within 0.5
  const SMALL = 0.5; // its scale when it starts growing
  const still = screen.reducedMotion;
  let g = $state(still ? FULL : 0);
  let y = $state(0); // px dragged down; below 0 rubber-banded above the top
  let h = $state(1);
  let shown = $state(false); // reduced motion only
  let origin = $state("50% 100%");
  let sheet, closeBtn, closing = false, drag = null;

  const opacity = $derived(still ? +shown : Math.min(1, g / 500));
  const scale = $derived(still ? 1 : SMALL + ((1 - SMALL) * g) / FULL);

  const finish = () => {
    if (closing && (g === 0 || y >= h)) {
      closing = false;
      onclose();
    }
  };
  // A spring per move with its own damping/response; it starts from the value on screen and, unless told, the running velocity.
  function driver(set) {
    let spring, run;
    return {
      stop: () => run?.stop(),
      to(value, target, { velocity = run?.running ? spring.velocity : 0, damping = 1, response = 0.35 } = {}) {
        run?.stop();
        spring = createSpring({ value, damping, response });
        run = animate(spring, { onFrame: set, onSettle: finish });
        run.to(target, velocity);
      },
    };
  }
  const grow = driver((v) => (g = v));
  const drop = driver((v) => (y = v));

  function close() {
    if (closing) return;
    closing = true;
    if (still) {
      shown = false;
      setTimeout(onclose, cssMs("--fade"));
    } else grow.to(g, 0, { response: 0.3 });
  }

  function down(e) {
    if (e.button > 0 || e.target.closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    grow.stop();
    drop.stop();
    closing = false; // caught mid-flight: it stays where it is and follows the finger
    drag = { from: y, start: e.clientY, samples: [{ t: e.timeStamp, x: e.clientY }] };
  }
  function move(e) {
    if (!drag) return;
    const raw = drag.from + e.clientY - drag.start;
    y = raw < 0 ? -rubberband(-raw, h) : raw;
    drag.samples.push({ t: e.timeStamp, x: e.clientY });
    if (drag.samples.length > 8) drag.samples.shift();
  }
  function up(e) {
    if (!drag) return;
    // only the last 100 ms count: a finger that stopped before lifting throws nothing (a cancel carries no position of its own)
    const last = e.type === "pointercancel" ? [] : [{ t: e.timeStamp, x: e.clientY }];
    const v = velocity([...drag.samples, ...last].filter((s) => e.timeStamp - s.t <= 100));
    drag = null;
    if (shouldClose(y, v, h)) {
      if (still) close();
      else {
        closing = true;
        drop.to(y, h, { velocity: v, response: 0.3 });
      }
    } else if (still) {
      y = 0;
    } else {
      drop.to(y, 0, { velocity: v, damping: 0.8, response: 0.3 });
      if (g < FULL) grow.to(g, FULL);
    }
  }

  onMount(() => {
    if (from) {
      const r = from.getBoundingClientRect();
      origin = `${r.left + r.width / 2 - sheet.offsetLeft}px ${r.top + r.height / 2 - sheet.offsetTop}px`;
    }
    closeBtn.focus({ preventScroll: true });
    const root = document.documentElement;
    root.style.overflow = "hidden";
    if (still) requestAnimationFrame(() => (shown = true));
    else grow.to(0, FULL);
    return () => {
      grow.stop();
      drop.stop();
      root.style.overflow = "";
    };
  });
</script>

<svelte:window onkeydown={(e) => e.key === "Escape" && close()} />

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (Esc and the Close button are the keyboard way) -->
<div class="scrim" class:fade={still} style:opacity={opacity * Math.min(1, Math.max(0, 1 - y / h))} onclick={close} aria-hidden="true"></div>
<div
  class="sheet" class:fade={still} role="dialog" aria-modal="true" aria-label={label} bind:this={sheet} bind:offsetHeight={h}
  style:opacity style:transform="translate3d(0, {y}px, 0) scale({scale})" style:transform-origin={origin}
>
  <!-- svelte-ignore a11y_no_static_element_interactions (dragging is pointer-only; Close and Esc dismiss from the keyboard) -->
  <div class="grab" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
    <span class="handle" aria-hidden="true"></span>
    <div class="bar">
      {#if onback}<button type="button" class="back press" onclick={onback}><span aria-hidden="true">‹</span> Back</button>{/if}
      <button type="button" class="close press" aria-label="Close" bind:this={closeBtn} onclick={close}>✕</button>
    </div>
  </div>
  <div class="body">{@render children()}</div>
</div>

<style>
  .scrim { position: fixed; inset: 0; z-index: 10; background: var(--scrim); }
  .sheet {
    position: fixed; z-index: 11; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; box-sizing: border-box;
    width: 100%; max-width: 40rem; height: min(94dvh, 60rem); margin: 0 auto;
    border-top: 1px solid var(--tile-edge); border-radius: 1.375rem 1.375rem 0 0; background: var(--sheet);
    -webkit-backdrop-filter: var(--sheet-filter); backdrop-filter: var(--sheet-filter); box-shadow: var(--sheet-shadow);
    will-change: transform, opacity;
  }
  /* fills the gap under the sheet while it is rubber-banded above the top */
  .sheet::after { content: ""; position: absolute; top: 100%; left: 0; right: 0; height: 50vh; background: var(--sheet); }
  .fade { transition: opacity var(--fade); }
  .grab { flex: none; padding: 0.5rem 1rem 0.25rem; touch-action: none; cursor: grab; user-select: none; -webkit-user-select: none; }
  .grab:active { cursor: grabbing; }
  .handle { display: block; width: 2.25rem; height: 0.3125rem; margin: 0 auto 0.25rem; border-radius: var(--radius-chip); background: var(--line); }
  .bar { display: flex; align-items: center; min-height: 2.75rem; }
  .back {
    display: inline-flex; align-items: center; gap: 0.25rem; min-height: 2.75rem; padding: 0 0.5rem 0 0; border: 0; background: none;
    color: var(--accent-text); font: inherit; font-size: 1.0625rem; font-weight: 500;
  }
  .back span { font-size: 1.75rem; line-height: 1; }
  .close {
    display: grid; place-items: center; width: 2.75rem; height: 2.75rem; margin-left: auto; border: 0; border-radius: 50%;
    background: var(--fill); color: var(--muted); font: inherit; font-size: 1rem; font-weight: 700;
  }
  .body {
    display: flex; flex: 1; flex-direction: column; gap: 1rem; overflow-y: auto; overscroll-behavior: contain;
    padding: 0 1rem calc(env(safe-area-inset-bottom, 0px) + 2rem);
  }
</style>
