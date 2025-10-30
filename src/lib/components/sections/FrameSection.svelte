<script lang="ts">
  import { onMount } from 'svelte';
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { PROJECTS } from '$lib/constants';
  import type { Project } from '$lib/types';
  import { fade, fly } from 'svelte/transition';
  import { frameCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';

  // All projects for alternating layout
  $: allProjects = PROJECTS;

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias

  // Animation calculations based on scroll progress
  // Push/pull: slide up effect as section enters (0 to -20px translateY)
  $: translateY = rm ? 0 : Math.max(-20, -20 * (1 - progress));

  // Scale: subtle scale from 0.98 to 1.0
  $: scale = rm ? 1 : 0.98 + (progress * 0.02);

  function getProjectIconSVG(category: string) {
    // Simple, sleek glyphs per category (placeholder for generated icons)
    const base = 'currentColor';
    switch (category) {
      case 'enterprise-commerce':
        return `<path d='M4 6h16v12H4z' fill='none' stroke='${base}' stroke-width='1.5'/><path d='M4 9h16' stroke='${base}' stroke-width='1.5'/><circle cx='8' cy='13' r='1.5' fill='${base}'/><circle cx='16' cy='13' r='1.5' fill='${base}'/>`;
      case 'ai-native-systems':
        return `<circle cx='12' cy='12' r='7' stroke='${base}' stroke-width='1.5' fill='none'/><circle cx='12' cy='12' r='2' fill='${base}'/><path d='M12 5v3M12 19v-3M5 12h3M19 12h-3M7.5 7.5l2.2 2.2M16.5 16.5l-2.2-2.2M16.5 7.5l-2.2 2.2M7.5 16.5l2.2-2.2' stroke='${base}' stroke-width='1.2'/>`;
      case 'platform-architecture':
        return `<path d='M5 7h14v4H5z' stroke='${base}' stroke-width='1.5' fill='none'/><path d='M5 13h14v4H5z' stroke='${base}' stroke-width='1.5' fill='none'/><path d='M9 7v10M15 7v10' stroke='${base}' stroke-width='1.2'/>`;
      case 'system-integration':
        return `<path d='M6 8h6v4H6zM12 12h6v4h-6z' stroke='${base}' stroke-width='1.5' fill='none'/><path d='M12 10h4M10 14h4' stroke='${base}' stroke-width='1.2'/>`;
      case 'performance-optimization':
        return `<path d='M6 16l4-4 3 3 5-6' stroke='${base}' stroke-width='1.8' fill='none'/><path d='M5 18h14' stroke='${base}' stroke-width='1'/>`;
      case 'infrastructure':
        return `<path d='M5 8h14v4H5z' stroke='${base}' stroke-width='1.5' fill='none'/><path d='M7 12v4h10v-4' stroke='${base}' stroke-width='1.5' fill='none'/>`;
      default:
        return `<circle cx='12' cy='12' r='6' stroke='${base}' stroke-width='1.5' fill='none'/>`;
    }
  }

  // Section enter handler
  function onSectionEnter() {
    currentSection.set('frame');
    entered = true;
  }

  // No filters; curated list for clarity
</script>

<section
  id="frame"
  data-section="frame"
  class="relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-900 pb-20 md:pb-24 transition-all duration-300"
  style="transform: translateY({translateY}px) scale({scale});"
  use:inView={{ threshold: 0.3, once: true }}
  use:scrollProgress={{ offsetTop: 120, offsetBottom: 120, disabled: rm }}
  on:enter={onSectionEnter}
  on:progress={(e) => (progress = e.detail.progress)}
  aria-label="Frame section - Project portfolio"
>
  {#if entered}
    <div
      in:fly={{ y: rm ? 0 : 32, duration: rm ? 0 : 700, opacity: rm ? 1 : 0.2 }}
      class="relative z-20 flex flex-col"
    >
      <!-- Project showcase -->
  <div class="relative w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 md:px-6">
        <!-- Section header -->
        <div class="py-6 md:py-8">
          <p class="text-violet-400 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">{frameCopy.kicker}</p>
          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 leading-tight">
            {frameCopy.heading1}
          </h2>
          <p class="text-base md:text-lg xl:text-xl text-white/70 max-w-4xl xl:max-w-5xl leading-relaxed mb-4">
            {#each frameCopy.subhead.split('\n') as line, i}
              {#if i === 0}
                {line}<br class="hidden md:inline" />
              {:else}
                {line}
              {/if}
            {/each}
          </p>
        </div>

        {#if allProjects.length > 0}
          <!-- Alternating Image-Text Layout -->
          <div class="space-y-16 md:space-y-20 lg:space-y-24">
            {#each allProjects as project, index}
              {@const isEven = index % 2 === 0}
              {@const isFeatured = project.featured}

              <div
                class="relative"
                in:fly={{ y: rm ? 0 : 32, duration: rm ? 0 : 600, delay: rm ? 0 : index * 100, opacity: rm ? 1 : 0 }}
              >
                <!-- Project Row -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                  <!-- Image Column -->
                  <div class="relative {isEven ? 'lg:order-1' : 'lg:order-2'}">
                    <div class="relative aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 border border-white/10 group">
                      {#if isFeatured}
                        <!-- Featured Badge -->
                        <div class="absolute top-4 left-4 z-20 px-3 py-1.5 bg-gradient-to-r from-violet-600/95 to-purple-600/95 text-white text-xs font-semibold rounded-lg shadow-lg backdrop-blur-sm border border-violet-400/30">
                          Featured Project
                        </div>
                      {/if}

                      <!-- Project Image -->
                      <img
                        src={project.imageUrl}
                        alt="{project.title} screenshot"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      <!-- Image Overlay on Hover -->
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <!-- Content Column -->
                  <div class="relative {isEven ? 'lg:order-2' : 'lg:order-1'}">
                    <!-- Category Badge -->
                    <div class="flex items-center gap-2 mb-4">
                      <div class="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-300 border border-violet-500/30 flex items-center justify-center">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {@html getProjectIconSVG(project.category)}
                        </svg>
                      </div>
                      <span class="text-xs text-violet-400 uppercase tracking-wide font-semibold">{project.category}</span>
                    </div>

                    <!-- Project Title -->
                    <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                      {project.title}
                    </h3>

                    <!-- Subtitle -->
                    {#if project.subtitle}
                      <p class="text-lg md:text-xl text-violet-300 mb-4 font-medium">
                        {project.subtitle}
                      </p>
                    {/if}

                    <!-- Description -->
                    <p class="text-base md:text-lg text-white/80 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <!-- Metrics -->
                    {#if project.metrics}
                      <div class="flex flex-wrap gap-3 mb-6">
                        {#if project.metrics.performance}
                          <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                            {project.metrics.performance}
                          </span>
                        {/if}
                        {#if project.metrics.scale}
                          <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                            {project.metrics.scale}
                          </span>
                        {/if}
                        {#if project.metrics.timeline}
                          <span class="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                            {project.metrics.timeline}
                          </span>
                        {/if}
                      </div>
                    {/if}

                    <!-- Tech Stack -->
                    <div class="flex flex-wrap gap-2 mb-6">
                      {#each project.technologies.slice(0, 5) as tech}
                        <span class="px-3 py-1.5 bg-violet-600/25 text-violet-200 rounded-md text-sm font-medium border border-violet-500/30">
                          {tech}
                        </span>
                      {/each}
                    </div>

                    <!-- Outcomes -->
                    {#if project.outcomes && project.outcomes.length > 0}
                      <ul class="mb-6 space-y-2">
                        {#each project.outcomes.slice(0, 3) as outcome}
                          <li class="flex items-start text-white/85 text-sm md:text-base">
                            <span class="text-violet-400 mr-3 mt-0.5 flex-shrink-0">{frameCopy.outcomeBulletIcon}</span>
                            <span>{outcome}</span>
                          </li>
                        {/each}
                      </ul>
                    {/if}

                    <!-- Action Links -->
                    <div class="flex flex-wrap gap-4">
                      {#if project.demo}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-violet-500/30"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          View Demo
                        </a>
                      {/if}
                      {#if project.repository}
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-base font-medium rounded-lg border border-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
                        >
                          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.840 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          View Code
                        </a>
                      {/if}
                      {#if project.link && !project.demo && !project.repository}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-violet-500/30"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                          </svg>
                          View Project
                        </a>
                      {/if}
                    </div>
                  </div>

                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="text-center py-16">
            <p class="text-white/60">No projects available.</p>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</section>

<style>
  /* Styles for alternating layout are handled via Tailwind classes */
</style>