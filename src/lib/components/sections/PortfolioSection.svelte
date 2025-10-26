<script lang="ts">
  import { currentSection, reducedMotion } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { fly } from 'svelte/transition';
  import { portfolioCopy } from '$lib/copy';
  import { scrollProgress } from '$lib/actions/scrollProgress';
  
  // Intent-based routing components
  import IntentSelector from '$lib/components/cal/IntentSelector.svelte';
  import ContactByIntent from '$lib/components/cal/ContactByIntent.svelte';
  import SmartSuggestionToast from '$lib/components/cal/SmartSuggestionToast.svelte';
  import type { AvailabilityStatus } from '$lib/types/cal';

  // Entry transition state
  let entered = false;
  let progress = 0;
  $: rm = $reducedMotion;
  
  // Intent routing state
  let selectedIntent: 'enterprise' | 'photography' | null = null;
  
  // Cal.com state
  let availability: AvailabilityStatus | null = null;

  // Section enter handler
  function onSectionEnter() {
    currentSection.set('portfolio');
    entered = true;
  }
  
  // Handle intent selection
  function handleSelectIntent(intent: 'enterprise' | 'photography') {
    selectedIntent = intent;
  }
  
  // Handle back to intent selection
  function handleBackToIntents() {
    selectedIntent = null;
  }
  
  // Handle availability updates
  async function fetchAvailability() {
    try {
      const response = await fetch('/api/cal/availability');
      if (response.ok) {
        availability = await response.json();
      }
    } catch (err) {
      console.error('Error fetching availability:', err);
    }
  }
  
  // Fetch availability when section enters
  $: if (entered) {
    fetchAvailability();
  }
</script>

<section
  id="portfolio"
  data-section="portfolio"
  class="relative bg-gradient-to-br from-neutral-900 via-slate-800 to-neutral-900 pt-8 md:pt-16 lg:pt-20 pb-10 md:pb-16 lg:pb-20"
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
      <div class="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6 lg:py-8">

        <!-- Section header -->
        <div class="mb-8 md:mb-12 lg:mb-16 text-center">
          <h2 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 leading-[1.1]">
            {portfolioCopy.ctaHeading}
          </h2>
          {#if !selectedIntent}
            <!-- Only show subheadline on intent selection view -->
            <p class="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
              Choose how you'd like to connect
            </p>
          {/if}
        </div>

        <!-- ROUTING SYSTEM: Intent-based contact flow -->
        <div class="max-w-6xl mx-auto mb-12 md:mb-16">
          {#if !selectedIntent}
            <!-- Step 1: Intent Selection -->
            <IntentSelector onSelectIntent={handleSelectIntent} />
          {:else}
            <!-- Step 2: Intent-Specific Contact Methods -->
            <ContactByIntent intent={selectedIntent} onBack={handleBackToIntents} />
          {/if}
        </div>

        <!-- UNIVERSAL: LinkedIn & Trust Signals (always visible) -->
        {#if !selectedIntent}
          <div class="max-w-4xl mx-auto">
            <!-- LinkedIn as universal connector -->
            <div class="mb-8 text-center">
              <a
                href="https://www.linkedin.com/in/nino-chavez/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
              >
                <svg class="w-5 h-5 text-violet-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span class="text-white/80 font-medium">Connect on LinkedIn</span>
                <svg class="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <!-- Trust Signals -->
            <div class="text-center">
              <div class="inline-flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs md:text-sm text-white/40">
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  25+ years enterprise architecture
                </span>
                <span class="hidden sm:inline text-white/20">•</span>
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Fortune 500 consulting
                </span>
                <span class="hidden sm:inline text-white/20">•</span>
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Responds within 24 hours
                </span>
              </div>
            </div>
          </div>
        {/if}

      </div>
    </div>
    
    <!-- Smooth transition fade -->
    <div
      aria-hidden="true"
      class="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-neutral-900 to-transparent z-[-1] pointer-events-none"
      style={`opacity: ${rm ? 1 : Math.min(1, Math.max(0, progress))};`}
    ></div>
  {/if}
  
  <!-- Smart Suggestion Toast (Phase 3) - only show for enterprise intent -->
  {#if selectedIntent === 'enterprise'}
    <SmartSuggestionToast {availability} />
  {/if}
</section>

<style>
  /* Custom styles if needed */
</style>