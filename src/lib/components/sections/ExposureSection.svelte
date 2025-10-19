<script lang="ts">
  import { onMount } from 'svelte';
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { INSIGHTS_ARTICLES } from '$lib/constants';
  import type { InsightArticle } from '$lib/types';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import { fade, fly } from 'svelte/transition';
  import { exposureCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';

  let currentArticleIndex = 0;
  let slideDirection: 'left' | 'right' | null = null;
  let articles: InsightArticle[] = INSIGHTS_ARTICLES;

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias

  // Reactive statement for current article
  $: currentArticle = articles[currentArticleIndex];

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
  class="min-h-screen relative bg-gradient-to-br from-slate-900 via-neutral-800 to-slate-900"
  use:inView={{ threshold: 0.3, once: true }}
  use:scrollProgress={{ offsetTop: 120, offsetBottom: 120, disabled: rm }}
  on:enter={onSectionEnter}
  on:progress={(e) => (progress = e.detail.progress)}
  aria-label="Exposure section - Technical insights and articles"
  aria-labelledby="exposure-title"
>
  {#if entered}
    <div
      in:fly={{ y: rm ? 0 : 32, duration: rm ? 0 : 700, opacity: rm ? 1 : 0.2 }}
      class="relative z-20 min-h-screen flex flex-col training-log-aesthetic"
    >
      <div class="flex-1 flex items-center justify-center py-9 md:py-15">
        <div class="max-w-6xl mx-auto px-4 md:px-6">
          <!-- Section header -->
          <div class="text-center mb-10 md:mb-16">
            <div class="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/70 border border-white/15">
              {exposureCopy.kicker}
            </div>
            <h2 id="exposure-title" class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/95 leading-tight mb-3">
              {exposureCopy.heading1}
            </h2>
            <p class="text-lg md:text-xl lg:text-2xl font-semibold text-violet-300 mb-5">
              {exposureCopy.heading2}
            </p>
            <p class="text-base md:text-lg lg:text-xl text-white/80 max-w-[72ch] mx-auto leading-relaxed px-4">
              {#each exposureCopy.intro.split('\n') as line, i}
                {#if i === 0}
                  {line}<br class="hidden md:inline" />
                {:else}
                  {line}
                {/if}
              {/each}
            </p>
          </div>

          <!-- Carousel container -->
          <div class="relative flex justify-center items-center mb-12 group" style="min-height: 380px;">
            <!-- Left arrow -->
            <button
              on:click={handlePreviousArticle}
              class="absolute left-2 md:-left-20 top-1/2 -translate-y-1/2 z-20 opacity-80 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 outline-none focus:ring-2 focus:ring-violet-400"
              title="Previous insight"
              aria-label="Previous article"
              style="width: 44px; height: 44px;"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 28L14 18L22 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Card with slide animation -->
            <div
              class="transition-transform duration-300 ease-in-out bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl px-6 py-7 md:px-10 md:py-8 scannable-typography high-readability w-full max-w-3xl mx-auto flex flex-col shadow-2xl min-h-[280px] md:min-h-[340px]"
              class:translate-x-12={slideDirection === 'left'}
              class:-translate-x-12={slideDirection === 'right'}
              class:opacity-0={slideDirection !== null}
              class:scale-95={slideDirection !== null}
              class:opacity-100={slideDirection === null}
              class:scale-100={slideDirection === null}
            >
              <!-- Article header -->
              <div class="mb-6 flex flex-col gap-2">
                <div class="flex items-center flex-wrap gap-4 mb-2">
                  {#if currentArticle.category}
                    <span class="px-4 py-1 bg-violet-400/20 text-violet-400 rounded-full text-sm font-medium">
                      {currentArticle.category}
                    </span>
                  {/if}
                  {#if currentArticle.date}
                    <span class="text-white/50 text-sm">{currentArticle.date}</span>
                  {/if}
                  {#if currentArticle.readTime}
                    <span class="text-white/50 text-sm">{currentArticle.readTime}</span>
                  {/if}
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {currentArticle.title}
                </h3>
                {#if currentArticle.subtitle}
                  <p class="text-lg text-violet-400/80">
                    {currentArticle.subtitle}
                  </p>
                {/if}
                <p class="text-base text-white/80 leading-relaxed">
                  {currentArticle.excerpt}
                </p>
              </div>

              <!-- Key insights -->
              {#if currentArticle.insights && currentArticle.insights.length > 0}
                <div class="mb-6">
                  <h4 class="text-base font-semibold text-white mb-2 flex items-center">
                    <span class="mr-2">{exposureCopy.keyInsightsIcon}</span>
                    {exposureCopy.keyInsightsLabel}
                  </h4>
                  <ul class="space-y-2">
                    {#each currentArticle.insights as insight, index}
                      <li class="flex items-start space-x-4">
                        <div class="w-2 h-2 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span class="text-white/90 leading-relaxed text-sm">{insight}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {:else}
                <div class="my-4 border-t border-white/10"></div>
              {/if}
              <div class="flex flex-wrap gap-2 mb-4">
                {#each currentArticle.tags || [] as tag}
                  <span class="px-2 py-1 text-xs bg-white/10 text-white/70 rounded-md hover:bg-white/20 transition-colors">
                    #{tag}
                  </span>
                {/each}
              </div>

              <!-- Read more button -->
              <a
                href={currentArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-4 py-2 rounded-md bg-violet-400/80 text-white text-sm font-semibold hover:bg-violet-400 transition-colors mt-2 focus:outline-none focus:ring-2 focus:ring-violet-400"
                style="align-self: flex-start;"
              >
                {exposureCopy.readMore}
              </a>
            </div>

            <!-- Right arrow -->
            <button
              on:click={handleNextArticle}
              class="absolute right-2 md:-right-20 top-1/2 -translate-y-1/2 z-20 opacity-80 hover:opacity-100 focus:opacity-100 transition-opacity duration-200 outline-none focus:ring-2 focus:ring-violet-400"
              title="Next insight"
              aria-label="Next article"
              style="width: 44px; height: 44px;"
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 28L22 18L14 8" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Dots indicator -->
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-4 mb-2">
              {#each articles as _, index}
                <div
                  class="w-3 h-3 rounded-full transition-all duration-300 {index === currentArticleIndex ? 'bg-violet-400' : 'bg-cyan-400/60'}"
                ></div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
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
</style>
