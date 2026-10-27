<script>
  import { staleSince } from "../model.js";

  // A warning when fitbridge's scoring.toml or the goals saved from the page are broken (it keeps scoring with the last valid ones), and the time of old scores.
  let { scoredAt, configError, settingsError, now } = $props();
  const stale = $derived(scoredAt ? staleSince(scoredAt, now) : null);
</script>

{#if configError}
  <p class="warn card" role="alert"><b>Scoring config has an error.</b> fitbridge keeps the last valid one. {configError}</p>
{/if}
{#if settingsError}
  <p class="warn card" role="alert"><b>Goal settings have an error.</b> fitbridge keeps the last valid ones. {settingsError}</p>
{/if}
{#if stale}
  <p class="caption stale">{stale}</p>
{/if}

<style>
  p { margin: 0; }
  .warn { padding: 0.75rem 1rem; color: var(--warn-text); font-size: 0.875rem; overflow-wrap: anywhere; }
  .stale { text-align: center; }
</style>
