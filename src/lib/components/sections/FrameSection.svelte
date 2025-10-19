<script lang="ts">
  import { onMount } from 'svelte';
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { PROJECTS } from '$lib/constants';
  import type { Project } from '$lib/types';
  import { fade, fly } from 'svelte/transition';
  import { frameCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';

  // Choose featured project (first marked featured, else first)
  $: featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  $: rest = PROJECTS.filter((p) => p !== featured);

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias
  let gridVisible = false; // trigger additional projects entrance

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
  class="relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-900 pb-48 md:pb-56"
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
      <!-- Section header -->
      <div class="text-center py-10 md:py-14 px-4">
        <div class="text-xs md:text-sm text-white/60 uppercase tracking-wider mb-2">{frameCopy.kicker}</div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2">
          {frameCopy.heading1}
        </h2>
        <p class="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-violet-400 mb-3">
          {frameCopy.heading2}
        </p>
        <p class="text-base md:text-lg lg:text-xl text-white/85 max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed mb-4">
          {#each frameCopy.subhead.split('\n') as line, i}
            {#if i === 0}
              {line}<br class="hidden md:inline" />
            {:else}
              {line}
            {/if}
          {/each}
        </p>
        <!-- Filters removed: small portfolio benefits from focused curation -->
      </div>

      <!-- Project showcase -->
  <div class="relative w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 md:px-6">
        {#if PROJECTS.length > 0}
          <!-- Featured Project Hero -->
          <div class="relative block w-full min-w-full overflow-hidden mb-10 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 pt-32 pb-16 px-8 md:px-16">
            <!-- Featured badge -->
            <div
              class="absolute top-6 left-8 z-30 px-4 py-2 bg-gradient-to-r from-violet-600/90 to-purple-600/90 text-white text-sm font-semibold rounded-lg shadow-lg backdrop-blur-sm border border-violet-400/30"
              in:fly={{ y: rm ? 0 : -12, duration: rm ? 0 : 400, opacity: rm ? 1 : 0 }}
            >
              Featured Project
            </div>

            <!-- Content overlay -->
            <div class="relative z-20" in:fly={{ y: rm ? 0 : 24, duration: rm ? 0 : 520, opacity: rm ? 1 : 0 }}>
              <!-- Project details -->
              <div class="relative">
                <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                  {featured.title}
                </h3>
                {#if featured.subtitle}
                  <p class="text-base md:text-lg text-white/90 mb-4 max-w-3xl">
                    {featured.subtitle}
                  </p>
                {/if}

                {#if featured.description}
                  <p class="text-sm md:text-base text-white/80 mb-6 max-w-3xl">
                    {featured.description}
                  </p>
                {/if}

                {#if featured.metrics}
                  <div class="flex flex-wrap gap-3 mb-6">
                    {#if featured.metrics.performance}
                      <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                        {featured.metrics.performance}
                      </span>
                    {/if}
                    {#if featured.metrics.scale}
                      <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                        {featured.metrics.scale}
                      </span>
                    {/if}
                    {#if featured.metrics.timeline}
                      <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/15">
                        {featured.metrics.timeline}
                      </span>
                    {/if}
                  </div>
                {/if}

                <!-- Tech stack badges -->
                <div class="flex flex-wrap gap-3 mb-6">
                  {#each featured.technologies.slice(0, 4) as tech}
                    <span
                      class="px-4 py-2 bg-violet-600/30 text-violet-200 rounded-lg border border-violet-400/40 text-sm font-medium backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  {/each}
                </div>

                {#if featured.outcomes && featured.outcomes.length > 0}
                  <ul class="mb-6 space-y-2 max-w-3xl">
                    {#each featured.outcomes.slice(0, 3) as point}
                      <li class="flex items-start text-white/85 text-sm md:text-base">
                        <span class="text-violet-400 mr-3 mt-0.5">{frameCopy.outcomeBulletIcon}</span>
                        <span>{point}</span>
                      </li>
                    {/each}
                  </ul>
                {/if}

                <!-- CTA buttons -->
                <div class="flex flex-wrap gap-4">
                  {#if featured.repository}
                    <a
                      href={featured.repository}
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
                </div>
              </div>
            </div>
          </div>

          <!-- Sentinel to trigger grid entrance -->
          <div aria-hidden="true" use:inView={{ threshold: 0.2, once: true }} on:enter={() => (gridVisible = true)}></div>

          <!-- Additional projects grid -->
          {#if rest.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {#if gridVisible}
                {#each rest as project, index}
                <div
                  class="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  in:fly|local={{ y: rm ? 0 : 20, duration: rm ? 0 : 420, delay: rm ? 0 : index * 90, opacity: rm ? 1 : 0 }}
                >
                  <!-- Icon header -->
                  <div class="flex items-center gap-3 px-5 pt-5">
                    <div class="w-10 h-10 rounded-lg bg-violet-500/15 text-violet-300 border border-violet-500/30 flex items-center justify-center">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {@html getProjectIconSVG(project.category)}
                      </svg>
                    </div>
                    <div class="text-xs text-white/50 uppercase tracking-wide">{project.category}</div>
                  </div>

                  <!-- Content -->
                  <div class="p-6">
                    <h3 class="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                      {project.title}
                    </h3>
                    {#if project.subtitle}
                      <p class="text-white/70 mb-3">{project.subtitle}</p>
                    {/if}
                    <p class="text-white/70 text-sm mb-4 line-clamp-3">{project.description}</p>

                    <!-- Tech stack -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      {#each project.technologies.slice(0, 3) as tech}
                        <span class="px-2 py-1 bg-violet-500/20 text-violet-300 rounded text-xs">
                          {tech}
                        </span>
                      {/each}
                    </div>

                    <!-- Links -->
                    <div class="flex gap-3">
                      {#if project.demo}
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-violet-400 hover:text-violet-300 text-sm font-medium"
                        >
                          {frameCopy.demoLabel}
                        </a>
                      {/if}
                      {#if project.repository}
                        <a
                          href={project.repository}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-white/60 hover:text-white text-sm font-medium"
                        >
                          {frameCopy.codeLabel}
                        </a>
                      {/if}
                    </div>
                  </div>
                </div>
                {/each}
              {/if}
            </div>
          {/if}
        {:else}
          <div class="text-center py-16">
            <p class="text-white/60">No projects found in this category.</p>
          </div>
        {/if}
      </div>
    </div>
    <!-- Smooth transition fade (behind content, animated by scroll) -->
    <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-900 to-transparent z-[-1] pointer-events-none" style={`opacity: ${rm ? 1 : Math.min(1, Math.max(0, progress))};`} />
  {/if}
</section>

<style>
  .line-clamp-3 {
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>