<script>
  import { say } from "../actions.svelte.js";
  import { connectSteps, connectStatus, gymCaption } from "../model.js";

  // How a person's phone reaches fitbridge: their webhook address (a secret: the integration only answers the person and admins),
  // the steps for their phone and whether a workout has arrived. `collapsed`: a row that opens (Details); else a card (top of the page).
  let { info, now, person = null, collapsed = false } = $props();
  let picked = $state(null); // a choice made here when the integration has no phone for this person; it is not saved
  const phone = $derived(info.phone ?? picked);
  const guide = $derived(connectSteps(phone));
  const status = $derived(connectStatus(info, now, person));
  const gym = $derived(gymCaption(info.opengym));
  let field = $state();

  // Selected first, so it is ready to copy by hand when neither copy works (no Clipboard API on plain http; iOS wants a selection).
  async function copy() {
    field.focus();
    field.setSelectionRange(0, field.value.length);
    let copied = false;
    try {
      await navigator.clipboard.writeText(info.url);
      copied = true;
    } catch {
      try { copied = document.execCommand("copy"); } catch { /* none left: the selection stays */ }
    }
    say(copied ? "Copied" : "Select and copy the address");
  }
</script>

{#snippet body()}
  <p class="status" class:ok={status.state === "connected"}>{status.text}</p>
  {#if info.url}
    <div class="url">
      <input bind:this={field} readonly value={info.url} aria-label="Your address" onfocus={(e) => e.currentTarget.select()} />
      <button type="button" class="btn press" onclick={copy} aria-label="Copy address">Copy</button>
    </div>
  {/if}
  {#if !info.external}<p class="warn">This address only works at home.</p>{/if}
  {#if !phone}
    <p class="caption">{guide.title}</p>
    <div class="choice">
      <button type="button" class="btn press" onclick={() => (picked = "iphone")}>iPhone</button>
      <button type="button" class="btn press" onclick={() => (picked = "android")}>Android</button>
    </div>
  {:else}
    <ol>{#each guide.steps as s (s)}<li>{s}</li>{/each}</ol>
  {/if}
  {#if gym}
    <p class="caption">{gym.before}<b>{gym.code}</b>{gym.after}</p>
  {/if}
{/snippet}

{#if collapsed}
  <details class="card connect">
    <summary>Connect your phone <small>{status.state === "connected" ? "Connected" : "Waiting"}</small></summary>
    <div class="inner">{@render body()}</div>
  </details>
{:else}
  <section class="card connect" aria-label="Connect your phone">
    <div class="inner"><h2>Connect your phone</h2>{@render body()}</div>
  </section>
{/if}

<style>
  .connect { padding: 0; }
  .inner { display: flex; flex-direction: column; gap: 0.625rem; padding: 1rem; }
  summary { display: flex; align-items: center; justify-content: space-between; min-height: 2.75rem; padding: 0 1rem; font-weight: 600; cursor: pointer; }
  summary + .inner { padding-top: 0; }
  small { color: var(--muted); font-size: 0.875rem; font-weight: 500; }
  h2 { margin: 0; font-size: 1.0625rem; font-weight: 700; letter-spacing: -0.01em; }
  p { margin: 0; overflow-wrap: anywhere; }
  .status { color: var(--muted); font-size: 0.9375rem; }
  .status.ok { color: var(--good-text); font-weight: 600; }
  .warn { color: var(--warn-text); font-size: 0.875rem; }
  .url { display: flex; gap: 0.5rem; }
  input {
    flex: 1; min-width: 0; min-height: 2.75rem; box-sizing: border-box; padding: 0 0.75rem; border: 0; border-radius: var(--radius-ctl);
    background: var(--fill); color: var(--fg); font: inherit; font-size: 1rem; text-overflow: ellipsis; /* 16 px: iOS does not zoom into it */
  }
  input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .choice { display: flex; gap: 0.5rem; }
  .choice .btn { flex: 1; }
  ol { margin: 0; padding-left: 1.25rem; font-size: 0.9375rem; }
  li + li { margin-top: 0.375rem; }
</style>
