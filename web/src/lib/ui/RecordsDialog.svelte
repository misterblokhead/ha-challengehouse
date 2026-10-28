<script>
  import { shouldClose, velocity } from "../gesture.js";
  import { liftSet, shortDate } from "../model.js";

  // Every lift record by muscle group in a native modal <dialog> (top layer, so it also sits on a details sheet). `open(group)` shows it
  // scrolled to that group, or at the top without one. It closes with ×, Esc, a tap on the backdrop or a downward swipe on its header;
  // closing with the native close() hands the focus back to the button that opened it.
  let { groups } = $props(); // groupedLifts(): [{group, lifts}]
  const uid = $props.id();
  let dlg, body;
  let y = $state(0); // px the header has been dragged down
  let drag = null;
  let dragging = $state(false); // no transition while the finger moves it
  let locked = false;

  export function open(group = null) {
    if (dlg.open) return;
    locked = document.documentElement.style.overflow !== "hidden"; // a sheet below has locked it already
    if (locked) document.documentElement.style.overflow = "hidden";
    dlg.showModal();
    body.scrollTop = 0;
    if (group) body.querySelector(`[data-group="${group}"]`)?.scrollIntoView({ block: "start" });
  }

  function closed() {
    if (locked) document.documentElement.style.overflow = "";
    locked = false;
    y = 0;
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
  bind:this={dlg} aria-labelledby="{uid}-t" class:dragging style:transform={y ? `translateY(${y}px)` : null}
  onclick={(e) => e.target === dlg && dlg.close()} onclose={closed}
  onkeydown={(e) => e.key === "Escape" && e.stopPropagation()}
>
  <!-- svelte-ignore a11y_no_static_element_interactions (dragging is pointer-only; × and Esc dismiss from the keyboard) -->
  <div class="grab" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
    <h2 id="{uid}-t">All records</h2>
    <button type="button" class="close press" aria-label="Close" onclick={() => dlg.close()}>✕</button>
  </div>
  <div class="body" bind:this={body}>
    {#each groups as g (g.group)}
      <h3 data-group={g.group}>{g.group}</h3>
      <ul>
        {#each g.lifts as l (l.id)}<li><span class="dot" aria-hidden="true"></span><span>{l.name} · <b>{liftSet(l)}</b> · {shortDate(l.date)}</span></li>{/each}
      </ul>
    {/each}
  </div>
</dialog>

<style>
  dialog {
    box-sizing: border-box; width: min(calc(100% - 2rem), 32rem); max-width: none; max-height: min(80dvh, 40rem); padding: 0; border: var(--edge);
    border-radius: var(--radius-card); background: var(--card); color: var(--fg); box-shadow: var(--sheet-shadow);
    transition: transform 150ms;
  }
  dialog[open] { display: flex; flex-direction: column; animation: pop 200ms ease-out; }
  dialog.dragging { transition: none; }
  dialog::backdrop { background: var(--scrim); }
  @keyframes pop { from { opacity: 0; transform: translateY(0.75rem) scale(0.97); } }
  @media (prefers-reduced-motion: reduce) {
    dialog { transition: none; }
    dialog[open] { animation: fade var(--fade); }
    @keyframes fade { from { opacity: 0; } }
  }
  .grab { display: flex; flex: none; align-items: center; justify-content: space-between; padding: 0.5rem 0.5rem 0.25rem 1rem; touch-action: none; user-select: none; -webkit-user-select: none; }
  h2 { margin: 0; font-size: 1.0625rem; font-weight: 600; }
  .close {
    display: grid; place-items: center; width: 2.75rem; height: 2.75rem; border: 0; border-radius: 50%;
    background: var(--fill); color: var(--muted); font: inherit; font-size: 1rem; font-weight: 700;
  }
  .body { flex: 1; overflow-y: auto; overscroll-behavior: contain; padding: 0 1rem 1rem; }
  h3 { margin: 1rem 0 0; font-size: 0.8125rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
  h3:first-child { margin-top: 0; }
  ul { margin: 0; padding: 0; list-style: none; }
  li { display: flex; align-items: baseline; gap: 0.625rem; padding: 0.625rem 0; }
  li + li { border-top: 1px solid var(--line); }
  .dot { flex: none; width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--gym); transform: translateY(-0.0625rem); }
  b { font-weight: 600; font-variant-numeric: tabular-nums; }
</style>
