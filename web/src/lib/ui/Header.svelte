<script>
  // Large title over the page. The glass only appears once content scrolls under it, and fades out at its lower edge instead of a divider.
  // `onback`: a back chevron above the title (the page was opened with ?back=, e.g. from Kiosk Stage).
  let { title, subtitle = "", onback } = $props();
  let y = $state(0);
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled={y > 0}>
  <div class="in">
    {#if onback}<button type="button" class="back press" onclick={onback}><span aria-hidden="true">‹</span> Back</button>{/if}
    <h1>{title}</h1>
    <p>{subtitle || "\u00a0"}</p>
  </div>
</header>

<style>
  header { position: sticky; top: 0; z-index: 2; padding: calc(env(safe-area-inset-top, 0px) + 1.25rem) 1rem 1rem; }
  header::before {
    content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; transition: opacity var(--fade);
    background: var(--chrome); -webkit-backdrop-filter: var(--chrome-filter); backdrop-filter: var(--chrome-filter);
    -webkit-mask-image: linear-gradient(#000 calc(100% - 1rem), transparent);
    mask-image: linear-gradient(#000 calc(100% - 1rem), transparent);
  }
  .scrolled::before { opacity: 1; }
  .in { max-width: 64rem; margin: 0 auto; }
  .back {
    display: inline-flex; align-items: center; gap: 0.25rem; min-height: 2.75rem; margin: -0.75rem 0 0 -0.25rem; padding: 0 0.5rem 0 0;
    border: 0; background: none; color: var(--accent-text); font: inherit; font-size: 1.0625rem; font-weight: 500;
  }
  .back span { font-size: 1.75rem; line-height: 1; }
  h1 { margin: 0; font-size: 2.125rem; font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
  p { margin: 0.25rem 0 0; color: var(--muted); font-size: 0.9375rem; font-weight: 500; }
  @media (min-width: 768px) { header { padding-inline: 1.5rem; } }
</style>
