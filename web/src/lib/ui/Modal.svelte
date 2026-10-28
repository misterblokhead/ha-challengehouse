<script>
  import { shouldClose, velocity } from "../gesture.js";

  // The shell of every pop-up: a native modal <dialog> (top layer, so it also sits on a details sheet) with a title, × and a
  // scrolling body. show() opens it, locks the page's scroll and returns the body element (null when it is open already). It closes with ×, Esc,
  // a tap on the backdrop (only a press that began there, not a drag let go outside) and, with `drag`, a downward swipe on its
  // header; the native close() hands the focus back to the button that opened it, then onclose runs.
  let { title, drag: draggable = false, wide = false, onclose = null, children } = $props();
  const uid = $props.id();
  let dlg, body;
  let y = $state(0); // px the header has been dragged down
  let drag = null;
  let dragging = $state(false); // no transition while the finger moves it
  let locked = false;
  let downOnBackdrop = false;

  export function show() {
    if (dlg.open) return null;
    locked = document.documentElement.style.overflow !== "hidden"; // a sheet below has locked it already
    if (locked) document.documentElement.style.overflow = "hidden";
    dlg.showModal();
    return body;
  }

  export function close() {
    dlg.close();
  }

  function closed() {
    if (locked) document.documentElement.style.overflow = "";
    locked = false;
    y = 0;
    onclose?.();
  }

  function down(e) {
    if (e.button > 0 || e.target.closest("button")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag = { start: e.clientY, samples: [{ t: e.timeStamp, x: e.clientY }] };
    dragging = true;
  }
  function move(e) {
    if (!drag) return;
    y = Math.max(0, e.clientY - drag.start);
    drag.samples.push({ t: e.timeStamp, x: e.clientY });
    if (drag.samples.length > 8) drag.samples.shift();
  }
  function up(e) {
    if (!drag) return;
    // only the last 100 ms count (a cancel carries no position of its own), as in Sheet
    const last = e.type === "pointercancel" ? [] : [{ t: e.timeStamp, x: e.clientY }];
    const v = velocity([...drag.samples, ...last].filter((s) => e.timeStamp - s.t <= 100));
    drag = null;
    dragging = false;
    if (shouldClose(y, v, dlg.offsetHeight)) dlg.close();
    else y = 0;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (Esc and × are the keyboard way; the backdrop click is a pointer shortcut) -->
<dialog
  bind:this={dlg} aria-labelledby="{uid}-t" class:wide class:dragging style:transform={y ? `translateY(${y}px)` : null}
  onpointerdown={(e) => (downOnBackdrop = e.target === dlg)} onclick={(e) => e.target === dlg && downOnBackdrop && dlg.close()} onclose={closed}
  onkeydown={(e) => e.key === "Escape" && e.stopPropagation()}
>
  {#if draggable}
    <!-- svelte-ignore a11y_no_static_element_interactions (dragging is pointer-only; × and Esc dismiss from the keyboard) -->
    <div class="grab drag" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>{@render head()}</div>
  {:else}
    <div class="grab">{@render head()}</div>
  {/if}
  <div class="body" bind:this={body}>{@render children()}</div>
</dialog>

{#snippet head()}
  <h2 id="{uid}-t">{title}</h2>
  <button type="button" class="close press" aria-label="Close" onclick={() => dlg.close()}>✕</button>
{/snippet}

<style>
  dialog {
    box-sizing: border-box; width: min(calc(100% - 2rem), 32rem); max-width: none; max-height: min(80dvh, 40rem); padding: 0; border: var(--edge);
    border-radius: var(--radius-card); background: var(--card); color: var(--fg); box-shadow: var(--sheet-shadow);
    transition: transform 150ms;
  }
  dialog.wide { width: min(calc(100% - 2rem), 36rem); max-height: min(88dvh, 52rem); }
  dialog[open] { display: flex; flex-direction: column; animation: pop 200ms ease-out; }
  dialog.dragging { transition: none; }
  dialog::backdrop { background: var(--scrim); }
  @keyframes pop { from { opacity: 0; transform: translateY(0.75rem) scale(0.97); } }
  @media (prefers-reduced-motion: reduce) {
    dialog { transition: none; }
    dialog[open] { animation: fade var(--fade); }
    @keyframes fade { from { opacity: 0; } }
  }
  .grab { display: flex; flex: none; align-items: center; justify-content: space-between; padding: 0.5rem 0.5rem 0.25rem 1rem; }
  .drag { touch-action: none; user-select: none; -webkit-user-select: none; }
  h2 { margin: 0; font-size: 1.0625rem; font-weight: 600; }
  .close {
    display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 50%;
    background: var(--fill); color: var(--muted); font: inherit; font-size: 1rem; font-weight: 700;
  }
  .body { flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 0 1rem 1rem; }
</style>
