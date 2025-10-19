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
  class="min-h-screen relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-900 pb-48 md:pb-56"
  use:inView={{ threshold: 0.3, once: true }}
  use:scrollProgress={{ offsetTop: 120, offsetBottom: 120, disabled: rm }}
  on:enter={onSectionEnter}
  on:progress={(e) => (progress = e.detail.progress)}
  aria-label="Portfolio section - Contact and professional details"
>
  {#if entered}
    <div
      in:fly={{ y: rm ? 0 : 32, duration: rm ? 0 : 700, opacity: rm ? 1 : 0.2 }}
      class="relative z-20 min-h-screen flex flex-col mb-32 md:mb-40"
    >
      <div class="flex-1 flex items-center justify-center py-16 md:py-24 px-4">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Section header -->
          <!-- Header trigger and animated block -->
          <div aria-hidden="true" class="h-px pointer-events-none" use:inView={{ threshold: 0.2, once: true }} on:enter={() => (headerVisible = true)}></div>
          {#if headerVisible}
          <div
            class="mb-12 md:mb-16"
            in:fly|local={{ y: rm ? 0 : 16, duration: rm ? 0 : 420, delay: rm ? 0 : 60, opacity: rm ? 1 : 0 }}
          >
            <h2 class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <TextReveal text={portfolioCopy.heading1} type="words" delay={0} staggerDelay={100} />
              <span class="block text-violet-400">
                <TextReveal text={portfolioCopy.heading2} type="words" delay={600} staggerDelay={100} />
              </span>
            </h2>
            <p class="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">{portfolioCopy.intro}</p>
          </div>
          {/if}

          <!-- Contact options -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
            use:inView={{ threshold: 0.2, once: true }}
            on:enter={() => (cardsVisible = true)}
          >
            <!-- Professional Services -->
            <div
              class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 transition-all duration-300"
              in:fly|local={{ y: rm ? 0 : 24, duration: rm ? 0 : 450, delay: rm ? 0 : (cardsVisible ? 0 : 0), opacity: rm ? 1 : 0 }}
            >
              <div class="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">{portfolioCopy.enterpriseCard.title}</h3>
              <p class="text-white/70 mb-6 leading-relaxed">
                {portfolioCopy.enterpriseCard.description}
              </p>
              <div class="space-y-3 text-sm">
                {#each portfolioCopy.enterpriseCard.badges as badge}
                  <div class="flex items-center gap-3 text-white/60">
                    <span class="w-2 h-2 bg-{badge.color}-400 rounded-full"></span>
                    <span>{badge.text}</span>
                  </div>
                {/each}
              </div>
            </div>

            <!-- Speaking & Content -->
            <div
              class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300"
              in:fly|local={{ y: rm ? 0 : 24, duration: rm ? 0 : 450, delay: rm ? 0 : (cardsVisible ? 120 : 0), opacity: rm ? 1 : 0 }}
            >
              <div class="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-white mb-4">{portfolioCopy.speakingCard.title}</h3>
              <p class="text-white/70 mb-6 leading-relaxed">
                {portfolioCopy.speakingCard.description}
              </p>
              <div class="space-y-3 text-sm">
                {#each portfolioCopy.speakingCard.badges as badge}
                  <div class="flex items-center gap-3 text-white/60">
                    <span class="w-2 h-2 bg-{badge.color}-400 rounded-full"></span>
                    <span>{badge.text}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <!-- Contact CTA -->
          <div
            class="bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 rounded-2xl p-8 md:p-12 mt-8"
            use:inView={{ threshold: 0.2, once: true }}
            on:enter={() => (ctaVisible = true)}
            in:fly|local={{ y: rm ? 0 : 24, duration: rm ? 0 : 480, delay: rm ? 0 : (ctaVisible ? 180 : 0), opacity: rm ? 1 : 0 }}
          >
            <h3 class="text-3xl font-bold text-white mb-6">{portfolioCopy.ctaHeading}</h3>
            <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {portfolioCopy.ctaIntro}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:{portfolioCopy.email}"
                class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {portfolioCopy.emailButtonLabel}
              </a>

              <a
                href="https://www.linkedin.com/in/nino-chavez/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {portfolioCopy.linkedInButtonLabel}
              </a>
            </div>

            <!-- Additional contact info -->
            <div class="mt-8 pt-8 border-t border-white/10">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div class="text-white/60 text-sm uppercase tracking-wider mb-2">{portfolioCopy.locationLabel}</div>
                  <div class="text-white font-medium">{portfolioCopy.locationValue}</div>
                </div>
                <div>
                  <div class="text-white/60 text-sm uppercase tracking-wider mb-2">{portfolioCopy.timezoneLabel}</div>
                  <div class="text-white font-medium">{portfolioCopy.timezoneValue}</div>
                </div>
                <div>
                  <div class="text-white/60 text-sm uppercase tracking-wider mb-2">{portfolioCopy.responseLabel}</div>
                  <div class="text-white font-medium">{portfolioCopy.responseValue}</div>
                </div>
              </div>
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