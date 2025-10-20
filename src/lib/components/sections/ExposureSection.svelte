<script lang="ts">
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import type { InsightArticle } from '$lib/types';
  import EssaysEditorialGrid from '$lib/components/sections/EssaysEditorialGrid.svelte';
  import { exposureCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';

  // Receive SSR data from +page.server.ts
  export let data: {
    blogPosts: InsightArticle[];
    blogStatus: 'success' | 'error';
    errorMessage?: string;
  };

  // Use server-loaded data
  $: articles = data.blogPosts || [];
  $: hasError = data.blogStatus === 'error';

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias

  // Ensure articles is always a valid array
  $: hasArticles = Array.isArray(articles) && articles.length > 0;

  // Animation calculations based on scroll progress
  // Push/pull: slide up effect as section enters (0 to -20px translateY)
  $: translateY = rm ? 0 : Math.max(-20, -20 * (1 - progress));

  // Scale: subtle scale from 0.98 to 1.0
  $: scale = rm ? 1 : 0.98 + (progress * 0.02);

  // Section enter handler
  function onSectionEnter() {
    currentSection.set('exposure');
    entered = true;
  }
</script>

<section
  id="exposure"
  data-section="exposure"
  class="relative bg-gradient-to-br from-slate-900 via-neutral-800 to-slate-900 py-20 transition-all duration-300"
  style="transform: translateY({translateY}px) scale({scale});"
  use:inView={{ threshold: 0.3, once: true }}
  use:scrollProgress={{ offsetTop: 120, offsetBottom: 120, disabled: rm }}
  on:enter={onSectionEnter}
  on:progress={(e) => (progress = e.detail.progress)}
  aria-label="Exposure section - Technical insights and articles"
  aria-labelledby="exposure-title"
>
  {#if entered}
      {#if hasError && data.errorMessage}
        <div class="max-w-4xl mx-auto px-6 py-8">
          <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
            <p class="text-yellow-400 mb-2">⚠️ {data.errorMessage}</p>
            <p class="text-white/60 text-sm">Showing archived content</p>
          </div>
        </div>
      {/if}
      
      <!-- Title Section -->
      <div class="max-w-7xl mx-auto px-4 md:px-8 mb-6 title-section" class:entered>
        <p class="text-violet-400 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2 title-kicker">
          {exposureCopy.kicker}
        </p>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-2 leading-tight title-heading">
          {exposureCopy.heading1}
        </h2>
        <p class="text-base md:text-lg text-white/70 max-w-4xl leading-relaxed title-subtitle">
          {exposureCopy.heading2}
        </p>
      </div>
      
      {#if hasArticles}
        <EssaysEditorialGrid articles={articles} />
      {:else}
        <div class="flex flex-col items-center justify-center min-h-[300px] text-center">
          <h3 class="text-2xl font-bold text-white/80 mb-2">No essays available</h3>
          <p class="text-white/60 mb-4">Could not load essays from <a href="https://blog.ninochavez.co" class="underline hover:text-violet-400" target="_blank" rel="noopener">blog.ninochavez.co</a>. Please check back soon.</p>
        </div>
      {/if}
  <!-- Smooth transition fade (placed behind content and animated by scroll) -->
  <div aria-hidden="true" class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent z-[-1] pointer-events-none" style={`opacity: ${rm ? 1 : Math.min(1, Math.max(0, progress))};`}></div>
  {/if}
</section>

<style>
  /* Title animations */
  .title-section {
    opacity: 0;
    transform: translateY(2rem);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .title-section.entered {
    opacity: 1;
    transform: translateY(0);
  }
  
  .title-kicker,
  .title-heading,
  .title-subtitle {
    opacity: 0;
    transform: translateY(1rem);
    animation: titleSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .entered .title-kicker { animation-delay: 0.2s; }
  .entered .title-heading { animation-delay: 0.4s; }
  .entered .title-subtitle { animation-delay: 0.6s; }
  
  @keyframes titleSlideUp {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .title-section,
    .title-kicker,
    .title-heading,
    .title-subtitle {
      opacity: 1;
      transform: none;
      animation: none;
      transition: none;
    }
  }
</style>
