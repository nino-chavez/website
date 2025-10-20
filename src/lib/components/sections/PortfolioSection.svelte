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
          <div class="mb-16 md:mb-20 text-center">
            <h2 class="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1]">
              {portfolioCopy.ctaHeading}
            </h2>
            <p class="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              {portfolioCopy.ctaSubheading}
            </p>
          </div>

          <!-- Primary CTA -->
          <div class="max-w-4xl mx-auto mb-16">
            <a
              href="mailto:{portfolioCopy.email}"
              class="group relative block p-8 md:p-12 bg-gradient-to-br from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border border-violet-400/30 hover:border-violet-400/50 rounded-2xl transition-all duration-500 overflow-hidden"
            >
              <!-- Animated gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-400/10 to-violet-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div class="flex-1 text-center md:text-left">
                  <div class="inline-flex items-center gap-2 text-violet-400 text-sm font-semibold uppercase tracking-wider mb-3">
                    <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Available for projects
                  </div>
                  <div class="text-3xl md:text-4xl font-bold text-white mb-2">
                    {portfolioCopy.email}
                  </div>
                  <p class="text-white/60">
                    Enterprise architecture • AI systems • Strategic consulting
                  </p>
                </div>
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center w-16 h-16 bg-violet-600 group-hover:bg-violet-500 rounded-full transition-colors duration-300">
                    <svg class="w-8 h-8 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <!-- Secondary actions -->
          <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-16">
            <a
              href="https://cal.com/nino-chavez"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-violet-600/20 group-hover:bg-violet-600/30 border border-violet-400/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1 text-left">
                <div class="text-white font-semibold mb-1">Schedule a Call</div>
                <div class="text-white/50 text-sm">30-minute consultation</div>
              </div>
              <svg class="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/nino-chavez/"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center gap-4 p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <div class="flex-shrink-0 w-12 h-12 bg-violet-600/20 group-hover:bg-violet-600/30 border border-violet-400/30 rounded-lg flex items-center justify-center transition-colors duration-300">
                <svg class="w-6 h-6 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div class="flex-1 text-left">
                <div class="text-white font-semibold mb-1">LinkedIn Profile</div>
                <div class="text-white/50 text-sm">Connect professionally</div>
              </div>
              <svg class="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <!-- Social proof / Trust signals -->
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                25+ years enterprise architecture
              </span>
              <span class="text-white/20">•</span>
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Fortune 500 consulting
              </span>
              <span class="text-white/20">•</span>
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Responds within 24 hours
              </span>
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