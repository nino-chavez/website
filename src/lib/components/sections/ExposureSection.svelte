<script lang="ts">
  import { onMount } from 'svelte';
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import type { InsightArticle } from '$lib/types';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import EssaysEditorialGrid from '$lib/components/sections/EssaysEditorialGrid.svelte';
  import { fade, fly } from 'svelte/transition';
  import { exposureCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';
  import { textReveal } from '$lib/actions/modernTransitions.js';

  // Receive SSR data from +page.server.ts
  export let data: {
    blogPosts: InsightArticle[];
    blogStatus: 'success' | 'error';
    errorMessage?: string;
  };

  let currentArticleIndex = 0;
  let slideDirection: 'left' | 'right' | null = null;
  let selectedFilter = '';

  // Use server-loaded data
  $: articles = data.blogPosts || [];
  $: hasError = data.blogStatus === 'error';

  // Compute unique filters (categories) from articles
  $: filters = Array.from(
    new Set(
      articles.flatMap(a => a.category ? [a.category] : []).filter(Boolean)
    )
  );

  // Filtered articles based on selectedFilter
  $: filteredArticles = selectedFilter
    ? articles.filter(a => a.category === selectedFilter)
    : articles;

  function handleFilterSelect(filter: string) {
    selectedFilter = filter;
  }

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias

  // Ensure articles is always a valid array
  $: hasArticles = Array.isArray(articles) && articles.length > 0;
  $: currentArticle = hasArticles ? articles[currentArticleIndex] : null;

  // Section enter handler
  function onSectionEnter() {
    currentSection.set('exposure');
    entered = true;
  }

  // Navigation functions
  function handleNextArticle() {
    slideDirection = 'right';
    setTimeout(() => {
      currentArticleIndex = (currentArticleIndex + 1) % articles.length;
      slideDirection = null;
    }, 250);
  }

  function handlePreviousArticle() {
    slideDirection = 'left';
    setTimeout(() => {
      currentArticleIndex = currentArticleIndex === 0 ? articles.length - 1 : currentArticleIndex - 1;
      slideDirection = null;
    }, 250);
  }

  // Keyboard navigation
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePreviousArticle();
      if (e.key === 'ArrowRight') handleNextArticle();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });
</script>

<section
  id="exposure"
  data-section="exposure"
  class="relative bg-gradient-to-br from-slate-900 via-neutral-800 to-slate-900 py-20"
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
      <div class="max-w-4xl mx-auto px-6 text-center mb-6 title-section" class:entered>
        <p 
          class="text-violet-400 text-sm font-semibold uppercase tracking-wide mb-2 title-kicker"
        >
          {exposureCopy.kicker}
        </p>
        <h2 
          class="text-4xl md:text-5xl font-black text-white mb-2 title-heading"
        >
          {exposureCopy.heading1}
        </h2>
        <p 
          class="text-xl text-white/70 title-subtitle"
        >
          {exposureCopy.heading2}
        </p>
      </div>
      
      {#if hasArticles}
        <EssaysEditorialGrid
          articles={filteredArticles}
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={handleFilterSelect}
        />
      {:else}
        <div class="flex flex-col items-center justify-center min-h-[300px] text-center">
          <h3 class="text-2xl font-bold text-white/80 mb-2">No essays available</h3>
          <p class="text-white/60 mb-4">Could not load essays from <a href="https://blog.nino.photos" class="underline hover:text-violet-400" target="_blank" rel="noopener">blog.nino.photos</a>. Please check back soon.</p>
        </div>
      {/if}
  <!-- Smooth transition fade (placed behind content and animated by scroll) -->
  <div aria-hidden="true" class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent z-[-1] pointer-events-none" style={`opacity: ${rm ? 1 : Math.min(1, Math.max(0, progress))};`}></div>
  {/if}
</section>

<style>
  .training-log-aesthetic {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.9));
  }

  .scannable-typography {
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    line-height: 1.6;
  }

  .high-readability {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .scannable-typography h3,
  .scannable-typography h4 {
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .scannable-typography p {
    max-width: 65ch;
  }
  
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
