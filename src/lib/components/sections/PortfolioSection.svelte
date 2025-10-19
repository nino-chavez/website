<script lang="ts">
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import TextReveal from '$lib/components/TextReveal.svelte';
  import { fade, fly } from 'svelte/transition';
  import { portfolioCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';

  // Entry transition state
  let entered = false;
  let progress = 0; // 0..1 scroll progress through this section
  $: rm = $reducedMotion; // convenience alias
  let cardsVisible = false; // trigger grid item entrance animations
  let headerVisible = false; // animate header block
  let ctaVisible = false; // animate CTA block

  // Section enter handler
  function onSectionEnter() {
    currentSection.set('portfolio');
    entered = true;
  }
</script>

<section
  id="portfolio"
  data-section="portfolio"
  class="relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-900 pt-16 md:pt-20 pb-20 md:pb-24"
  use:inView={{ threshold: 0.3, once: true }}
  use:scrollProgress={{ offsetTop: 120, offsetBottom: 120, disabled: rm }}
  on:enter={onSectionEnter}
  on:progress={(e) => (progress = e.detail.progress)}
  aria-label="Portfolio section - Contact and professional details"
>
  {#if entered}
    <div
      in:fly={{ y: rm ? 0 : 32, duration: rm ? 0 : 700, opacity: rm ? 1 : 0.2 }}
      class="relative z-20"
    >
      <div class="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <!-- Section header -->
          <div class="mb-12 md:mb-16 text-center">
            <p class="text-violet-400 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">Contact</p>
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Let's Work Together
            </h2>
            <p class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Building enterprise commerce platforms that handle billions in transactions.
              Available for consulting engagements and strategic architecture projects.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto mb-12">
            <a
              href="mailto:{portfolioCopy.email}"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>

            <a
              href="https://cal.com/nino-chavez"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white text-lg font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </a>
          </div>

          <!-- Contact info -->
          <div class="max-w-2xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div>
                <div class="text-white/60 text-xs uppercase tracking-wider mb-1">{portfolioCopy.locationLabel}</div>
                <div class="text-white font-medium">{portfolioCopy.locationValue}</div>
              </div>
              <div>
                <div class="text-white/60 text-xs uppercase tracking-wider mb-1">{portfolioCopy.timezoneLabel}</div>
                <div class="text-white font-medium">{portfolioCopy.timezoneValue}</div>
              </div>
              <div>
                <div class="text-white/60 text-xs uppercase tracking-wider mb-1">{portfolioCopy.responseLabel}</div>
                <div class="text-white font-medium">{portfolioCopy.responseValue}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- Smooth transition fade (placed behind content) -->
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-neutral-900 to-transparent z-[-1] pointer-events-none"
      style={`opacity: ${rm ? 1 : Math.min(1, Math.max(0, progress))};`}
    ></div>
  {/if}
</section>

<style>
  /* Custom styles if needed */
</style>