<script>
  import { act, done, moveRun, pending } from "../actions.svelte.js";
  import { get } from "../api.js";
  import { charts, detailActions, figures, gymRows, header, noteText, speedShown, splitRows, vizState, zoneRows } from "../details.js";
  import { shouldClose, velocity } from "../gesture.js";
  import { feedRow, shoePicker } from "../model.js";

  // One workout's details (GET workout) in a native modal <dialog>, as RecordsDialog: `open(item)` with a feed row, or `{key}` alone
  // (the fastest 1 km). Header, figures, map, graphs, HR zones, splits, the gym block, then Remove / Restore / Delete and the shoe for
  // who may edit this person. Leaflet and uPlot load on the first open (loadViz); if that fails the rest stays and the map says so.
  // It closes with ×, Esc, a tap on the backdrop or a downward swipe on its header; the native close() hands the focus back to the row.
  // feed: the person's payload feed (a row's live excluded); shoes: the owner's shoe rows when the viewer may move runs, else null.
  let { person, feed, viewer, shoes = null, runShoes } = $props();
  const uid = $props.id();
  const loadViz = () => import("../viz.js");
  let dlg, body;
  let snap = $state.raw(null); // the row it opened from
  let d = $state.raw(null), failure = $state.raw(null);
  let viz = $state.raw(null), vizError = $state.raw(null);
  let confirming = $state(false);
  let y = $state(0); // px the header has been dragged down
  let drag = null;
  let dragging = $state(false); // no transition while the finger moves it
  let locked = false, seq = 0;
  let downOnBackdrop = false; // a press that ends on the backdrop closes only if it began there (not a map drag let go outside)

  export async function open(item) {
    if (dlg.open) return;
    const n = ++seq;
    snap = item;
    d = failure = vizError = null;
    confirming = false;
    locked = document.documentElement.style.overflow !== "hidden"; // a sheet below has locked it already
    if (locked) document.documentElement.style.overflow = "hidden";
    dlg.showModal();
    body.scrollTop = 0;
    try {
      const res = await get(`workout?person=${encodeURIComponent(person)}&key=${encodeURIComponent(item.key)}`);
      if (n !== seq) return; // closed (and maybe reopened) meanwhile
      d = res;
      if ((res.route?.length || res.series) && !viz) loadViz().then((m) => (viz = m), (e) => n === seq && (vizError = e));
    } catch (e) {
      if (n === seq) failure = e;
    }
  }

  function closed() {
    if (locked) document.documentElement.style.overflow = "";
    locked = false;
    y = 0;
    seq++;
    snap = d = null; // the map and graphs go with it
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

  // The workout as the feed shows it now: the payload's row, else (an older row, the fastest 1 km) what was done to it here;
  // a sent Remove / Restore first, as FeedRow
  const id = $derived(snap && `${person}/${snap.key}`);
  const entry = $derived(id && pending[id]);
  const item = $derived.by(() => {
    if (!snap) return null;
    const base = feed.find((w) => w.key === snap.key) ?? { ...d?.summary, ...snap, excluded: done[id] ?? snap.excluded ?? false };
    return entry && entry.want !== null ? { ...base, excluded: entry.want } : base;
  });
  const acts = $derived(d && item ? detailActions(viewer, person, item) : { remove: null, shoe: false });
  const picker = $derived(acts.shoe && shoes ? shoePicker(shoes, runShoes?.[snap.key]) : null);
  const h = $derived(d && header(d.summary));
  const figs = $derived(d ? figures(d).filter(([k]) => !(k === "Shoe" && picker?.options.length)) : []);
  const graphs = $derived(d && charts(d));
  const zones = $derived(d && zoneRows(d.zones, d.max_hr));
  const splits = $derived(d ? splitRows(d) : []);
  const gym = $derived(d && gymRows(d.gym));
  const vs = $derived(vizState(vizError));
  const speed = $derived(d && speedShown(d));
  const why = (e) => (e.status === 404 ? "Workout not found" : e.status === 503 ? "Waiting for fitbridge" : "Couldn't reach Home Assistant");

  async function pick(e) {
    const select = e.currentTarget;
    if (!(await moveRun(person, snap.key, Number(select.value)))) select.value = String(picker.value); // refused: back to the shoe it is on
  }
  const label = { remove: "Remove", restore: "Restore", delete: "Delete" };
  function action() {
    if (acts.remove === "delete") confirming = true;
    else act(person, snap.key, acts.remove);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions (Esc and × are the keyboard way; the backdrop click is a pointer shortcut) -->
<dialog
  bind:this={dlg} aria-labelledby="{uid}-t" class:dragging style:transform={y ? `translateY(${y}px)` : null}
  onpointerdown={(e) => (downOnBackdrop = e.target === dlg)} onclick={(e) => e.target === dlg && downOnBackdrop && dlg.close()} onclose={closed}
  onkeydown={(e) => e.key === "Escape" && e.stopPropagation()}
>
  <!-- svelte-ignore a11y_no_static_element_interactions (dragging is pointer-only; × and Esc dismiss from the keyboard) -->
  <div class="grab" onpointerdown={down} onpointermove={move} onpointerup={up} onpointercancel={up}>
    <h2 id="{uid}-t">{h?.title ?? snap?.name ?? "Workout"}</h2>
    <button type="button" class="close press" aria-label="Close" onclick={() => dlg.close()}>✕</button>
  </div>
  <div class="body" bind:this={body}>
    {#if failure}
      <p class="msg" role="status">{why(failure)}</p>
    {:else if !d}
      <p class="msg" role="status">Loading…</p>
    {:else}
      <p class="sub">
        {h.date} · {h.time} · {h.duration}
        {#if h.plan}<span class="mini">{h.plan}</span>{/if}
        {#if item && feedRow(item).label}<span class="mini off">{feedRow(item).label}</span>{/if}
      </p>
      {#if figs.length || picker?.options.length}
        <dl>
          {#each figs as [k, v] (k)}<div><dt>{k}</dt><dd>{v}</dd></div>{/each}
          {#if picker?.options.length}
            <div class="shoe"><dt><label for="{uid}-shoe">Shoe</label></dt><dd>
              <select id="{uid}-shoe" value={picker.value} onchange={pick}>
                {#if picker.extra}<option value="" disabled>{picker.extra}</option>{/if}
                {#each picker.options as o (o.id)}<option value={o.id}>{o.label}</option>{/each}
              </select>
            </dd></div>
          {/if}
        </dl>
      {/if}
      {#if noteText(d.note)}<p class="caption note">{noteText(d.note)}</p>{/if}

      {#if d.route?.length || graphs?.list.length}
        {#if !vs.map}
          <p class="caption note">{vs.message}</p>
        {:else if !viz}
          <div class="ph" style:height="{d.route?.length ? 220 : 0}px" aria-hidden="true"></div>
        {:else}
          {#if d.route?.length}<viz.MapView route={d.route} kind={d.summary.kind === "run" || d.summary.kind === "walk" ? "run" : "gym"} />{/if}
          {#each graphs?.list ?? [] as g (g.label)}
            <h3>{g.label}</h3>
            <viz.Chart x={graphs.x} label={g.label} values={g.values} color={g.color} fmt={g.fmt} />
          {/each}
        {/if}
      {/if}

      {#if zones}
        <h3>Heart-rate zones</h3>
        <ul class="zones">
          {#each zones as z (z.zone)}
            <li>
              <span class="zn">{z.zone} <small>{z.bpm}</small></span>
              <span class="bar"><span style:width="{z.pct}%"></span></span>
              <span class="num">{z.time} · {z.pct}%</span>
            </li>
          {/each}
        </ul>
      {/if}

      {#if splits.length}
        <h3>Splits</h3>
        <table>
          <thead><tr><th>Km</th><th>Time</th><th>{speed ? "km/h" : "Pace"}</th><th>HR</th><th>Climb</th></tr></thead>
          <tbody>
            {#each splits as s, i (i)}<tr><td>{s.km}</td><td>{s.time}</td><td>{s.pace}</td><td>{s.hr}</td><td>{s.climb}</td></tr>{/each}
          </tbody>
        </table>
      {/if}

      {#if gym}
        <h3>Exercises</h3>
        <ul class="gym">
          {#each gym.exercises as e, i (i)}
            <li>{e.name} · <b>{e.set}</b>{#if e.record} <span role="img" aria-label="Record">🏆</span>{/if}</li>
          {/each}
          <li class="vol">Total volume · <b>{gym.volume}</b></li>
        </ul>
      {/if}

      {#if acts.remove && entry?.want !== null}
        <div class="acts">
          {#if confirming}
            <span class="ask">Delete manual entry?</span>
            <button type="button" class="btn" onclick={() => (confirming = false)}>Cancel</button>
            <button type="button" class="btn danger" onclick={() => (act(person, snap.key, "remove"), dlg.close())}>Delete</button>
          {:else}
            <button type="button" class="btn" class:danger={acts.remove !== "restore"} onclick={action}>{label[acts.remove]}</button>
          {/if}
        </div>
      {/if}
    {/if}
  </div>
</dialog>

<style>
  dialog {
    box-sizing: border-box; width: min(calc(100% - 2rem), 36rem); max-width: none; max-height: min(88dvh, 52rem); padding: 0; border: var(--edge);
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
  .sub { display: flex; flex-wrap: wrap; align-items: center; gap: 0.375rem; margin: 0 0 0.75rem; color: var(--muted); font-size: 0.875rem; }
  .mini {
    padding: 0.0625rem 0.4375rem; border-radius: var(--radius-chip); font-size: 0.6875rem; font-weight: 700;
    background: color-mix(in srgb, var(--bonus) 18%, transparent); color: var(--fg);
  }
  .mini.off { background: var(--fill); }
  dl { display: grid; grid-template-columns: repeat(auto-fill, minmax(7.5rem, 1fr)); gap: 0.5rem 1rem; margin: 0 0 0.75rem; }
  dt { color: var(--muted); font-size: 0.75rem; font-weight: 600; }
  dd { margin: 0; font-weight: 600; font-variant-numeric: tabular-nums; }
  .shoe { grid-column: 1 / -1; }
  select {
    min-height: 2.75rem; max-width: 100%; padding: 0 0.5rem; border: 1px solid var(--line); border-radius: var(--radius-ctl);
    background: var(--card); color: var(--fg); font: inherit; font-size: 1rem; /* 16 px: iOS does not zoom into it */
  }
  select:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .note { margin: 0 0 0.75rem; }
  .ph { border-radius: var(--radius-card); background: var(--fill); }
  h3 { margin: 1rem 0 0.375rem; font-size: 0.8125rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
  ul { margin: 0; padding: 0; list-style: none; }
  .zones li { display: grid; grid-template-columns: 7rem 1fr auto; align-items: center; gap: 0.625rem; padding: 0.25rem 0; font-size: 0.875rem; }
  .zn { font-weight: 600; }
  small { color: var(--muted); font-weight: 500; }
  .bar { height: 0.5rem; border-radius: var(--radius-chip); background: var(--fill); overflow: hidden; }
  .bar span { display: block; height: 100%; background: var(--warn-text); }
  .num { font-variant-numeric: tabular-nums; color: var(--muted); }
  table { width: 100%; border-collapse: collapse; font-size: 0.875rem; font-variant-numeric: tabular-nums; }
  th { color: var(--muted); font-size: 0.75rem; font-weight: 600; text-align: start; padding: 0.25rem 0; }
  td { padding: 0.375rem 0; border-top: 1px solid var(--line); }
  .gym li { padding: 0.625rem 0; }
  .gym li + li { border-top: 1px solid var(--line); }
  b { font-weight: 600; font-variant-numeric: tabular-nums; color: var(--soon-text); } /* the workouts orange, as in Progress */
  .vol { color: var(--muted); }
  .acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 1rem; }
  .danger { color: var(--warn-text); }
  .ask { flex-basis: 100%; font-weight: 600; }
</style>
