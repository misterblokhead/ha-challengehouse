<script>
  import { shoeOp } from "../actions.svelte.js";
  import { SHOE_DEFAULT_KM, SHOE_LIMITS, shoeForm, shoeRow } from "../model.js";
  import Modal from "./Modal.svelte";

  // Manage a person's shoes in a Modal: add one, set the current one, change a shoe's replace-at km, retire one (hidden from then on,
  // its runs kept). `open()` shows it. Every change is saved at once and the page reloads.
  let { person, shoes } = $props(); // shoes: the person's rows (live data: they carry an id)
  const rows = $derived(shoes.map((s) => ({ ...shoeRow(s), id: s.id, limit: s.limit, current: !!s.current })));
  let modal;
  let name = $state("");
  let km = $state(SHOE_DEFAULT_KM);
  let error = $state(null);
  let busy = $state(false);
  let retiring = $state(null); // the shoe id asked "Retire?"

  export function open() {
    modal.show();
  }

  function closed() {
    retiring = null;
    error = null;
  }

  async function run(body) {
    busy = true;
    const ok = await shoeOp(body);
    busy = false;
    return ok;
  }

  async function add(e) {
    e.preventDefault();
    const form = shoeForm(name, km);
    error = form.error ?? null;
    if (!error && (await run({ op: "add", person, ...form }))) name = "";
  }

  async function limit(e, s) {
    const form = shoeForm(undefined, e.currentTarget.value, { partial: true });
    error = form.error ?? null;
    if (error) e.currentTarget.value = s.limit;
    else if (form.replace_at_km !== s.limit) await run({ op: "update", id: s.id, ...form });
  }

  async function retire(s) {
    retiring = null;
    await run({ op: "retire", id: s.id });
  }
</script>

<Modal bind:this={modal} title="Manage shoes" onclose={closed}>
  {#if rows.length}
    <ul>
      {#each rows as s (s.id)}
        <li>
          <div class="top">
            <span class="name">{s.name}{#if s.current} <span class="mini">Current</span>{/if}</span>
            <span class="caption">{s.km}</span>
          </div>
          <div class="acts">
            <label>
              Replace at
              <input
                type="number" inputmode="numeric" min={SHOE_LIMITS.replace_at_km[0]} max={SHOE_LIMITS.replace_at_km[1]}
                step={SHOE_LIMITS.replace_at_km[2]} value={s.limit} disabled={busy} onchange={(e) => limit(e, s)}
              /> km
            </label>
            {#if retiring === s.id}
              <span class="ask">Retire {s.name}?</span>
              <button type="button" class="btn" onclick={() => (retiring = null)}>Cancel</button>
              <button type="button" class="btn danger" disabled={busy} onclick={() => retire(s)}>Retire</button>
            {:else}
              {#if !s.current}
                <button type="button" class="btn" disabled={busy} onclick={() => run({ op: "current", person, id: s.id })}>Set current</button>
              {/if}
              <button type="button" class="btn danger" disabled={busy} onclick={() => (retiring = s.id)}>Retire</button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
    {#if !rows.some((s) => s.current)}<p class="caption note">No current shoe: new runs count on no shoe until you set one.</p>{/if}
  {:else}
    <p class="caption note">No shoes yet.</p>
  {/if}
  <form onsubmit={add}>
    <h3>Add a shoe</h3>
    <label>
      Name
      <input type="text" maxlength={SHOE_LIMITS.name[1]} bind:value={name} disabled={busy} />
    </label>
    <label>
      Replace at (km)
      <input
        type="number" inputmode="numeric" min={SHOE_LIMITS.replace_at_km[0]} max={SHOE_LIMITS.replace_at_km[1]}
        step={SHOE_LIMITS.replace_at_km[2]} bind:value={km} disabled={busy}
      />
    </label>
    {#if error}<p class="error" role="alert">{error}</p>{/if}
    <button type="submit" class="btn add" disabled={busy}>Add</button>
  </form>
</Modal>

<style>
  h3 { margin: 0; font-size: 0.8125rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
  ul { margin: 0; padding: 0; list-style: none; }
  li { padding: 0.75rem 0; }
  li + li { border-top: 1px solid var(--line); }
  .top { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
  .name { font-weight: 600; min-width: 0; overflow-wrap: anywhere; }
  .mini {
    padding: 0.0625rem 0.4375rem; border-radius: var(--radius-chip); font-size: 0.6875rem; font-weight: 700;
    background: color-mix(in srgb, var(--run) 20%, transparent);
  }
  .acts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
  .ask { flex-basis: 100%; font-weight: 600; }
  .danger { color: var(--warn-text); }
  .note { margin: 0.5rem 0; }
  label { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
  input {
    box-sizing: border-box; min-height: 2.75rem; padding: 0 0.75rem; border: 1px solid var(--line); border-radius: var(--radius-ctl);
    background: var(--card); color: var(--fg); font: inherit; font-size: 1rem; /* 16 px: iOS does not zoom into it */
  }
  input[type="number"] { width: 6rem; }
  input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  input:disabled { opacity: 0.6; }
  form { display: flex; flex-direction: column; align-items: stretch; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--line); }
  form label { flex-direction: column; align-items: stretch; gap: 0.25rem; font-weight: 600; }
  form input[type="number"] { width: 100%; }
  .error { margin: 0; color: var(--warn-text); font-weight: 600; }
  .add { background: var(--accent-text); color: #FFF; }
  :global([data-theme="dark"]) .add { color: #000; }
</style>
