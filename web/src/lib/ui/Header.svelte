<script>
  // Large title over the page. The glass only appears once content scrolls under it, and fades out at its lower edge instead of a divider.
  // `onback`: a back chevron above the title (the page was opened with ?back=, e.g. from Kiosk Stage).
  // `onaction` + `actionLabel`: a text button at the title's right (Goals).
  // `brand`: the ChallengeHouse icon in front of the title.
  let { title, subtitle = "", onback, onaction, actionLabel = "", brand = false } = $props();
  let y = $state(0);
</script>

<svelte:window bind:scrollY={y} />

<header class:scrolled={y > 0}>
  <div class="in">
    {#if onback}<button type="button" class="back press" onclick={onback}><span aria-hidden="true">‹</span> Back</button>{/if}
    <div class="row">
      <h1>
        {#if brand}<svg class="brand" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="hdr-brand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB340"/><stop offset="1" stop-color="#FF453A"/></linearGradient></defs><rect width="100" height="100" rx="22.4" fill="url(#hdr-brand)"/><path d="M50 20 L80 45 V80 H20 V45 Z" fill="#FFF" stroke="#FFF" stroke-width="6" stroke-linejoin="round"/><path d="M50 42 C55 49 63 55 63 65.5 a13 13 0 0 1 -26 0 C37 58 42 53 45.5 49 C46 53.5 48 56.5 51 57.5 C49.5 52 49 47 50 42 Z" fill="#FF6B2C"/></svg>{/if}
        {title}
      </h1>
      {#if onaction}<button type="button" class="action press" onclick={onaction}>{actionLabel}</button>{/if}
    </div>
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
  .row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .action {
    flex: none; min-width: 2.75rem; min-height: 2.75rem; margin-right: -0.5rem; padding: 0 0.5rem; border: 0; border-radius: var(--radius-ctl);
    background: none; color: var(--accent-text); font: inherit; font-size: 1.0625rem; font-weight: 600;
  }
  h1 { display: flex; align-items: center; gap: 0.5rem; margin: 0; font-size: 2.125rem; font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
  .brand { flex: none; width: 2rem; height: 2rem; }
  p { margin: 0.25rem 0 0; color: var(--muted); font-size: 0.9375rem; font-weight: 500; }
  @media (min-width: 768px) { header { padding-inline: 1.5rem; } }
</style>
