<script>
  import { toast } from "../actions.svelte.js";

  function undo() {
    const u = toast.undo;
    Object.assign(toast, { on: false, undo: null });
    u();
  }
</script>

<!-- always in the DOM so the live region announces each message; the text stays while it fades out -->
<div class="toast" class:on={toast.on} role="status" aria-live="polite">
  {#if toast.on}
    <span>{toast.text}</span>
    {#if toast.undo}<button type="button" class="press" onclick={undo}>Undo</button>{/if}
  {/if}
</div>

<style>
  .toast {
    position: fixed; z-index: 20; left: 50%; bottom: calc(env(safe-area-inset-bottom, 0px) + 1.5rem);
    display: flex; align-items: center; gap: 0.25rem; box-sizing: border-box; max-width: calc(100% - 2rem);
    min-height: 2.75rem; padding: 0 0.375rem 0 1.125rem; border-radius: var(--radius-chip);
    background: var(--fg); color: var(--bg); font-size: 0.9375rem; font-weight: 600; box-shadow: var(--shadow-menu);
    opacity: 0; transform: translate(-50%, 1rem); pointer-events: none;
    transition: opacity var(--fade), transform 250ms cubic-bezier(0.22, 1, 0.36, 1);
  }
  .toast:not(.on) { padding-right: 1.125rem; }
  .on { opacity: 1; transform: translate(-50%, 0); pointer-events: auto; }
  button {
    min-height: 2.25rem; padding: 0 0.875rem; border: 0; border-radius: var(--radius-chip);
    background: transparent; color: var(--accent); font: inherit; font-weight: 700;
  }
  /* the toast is inverted (--fg on --bg), so its link colour is the other theme's */
  :global([data-theme="dark"]) button { color: #0062C4; }
  @media (prefers-reduced-motion: reduce) { .toast, .on { transform: translate(-50%, 0); } }
</style>
