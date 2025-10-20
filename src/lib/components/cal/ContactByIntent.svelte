<script lang="ts">
  // Conditional Contact Methods Based on User Intent
  // Shows different contact options for Enterprise vs Photography inquiries
  
  import { fade, fly } from 'svelte/transition';
  import EventTypeCards from './EventTypeCards.svelte';
  import { portfolioCopy } from '$lib/copy';
  
  export let intent: 'enterprise' | 'photography' | null = null;
  export let onBack: () => void;
  
  // Filter prop to pass to EventTypeCards
  $: intentFilter = intent;
</script>

{#if intent === 'enterprise'}
  <!-- Enterprise Consultation Funnel -->
  <div in:fly={{ x: 20, duration: 400 }} out:fade={{ duration: 200 }}>
    <!-- Back button -->
    <button
      on:click={onBack}
      class="mb-6 flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back to inquiry type</span>
    </button>

    <!-- Enterprise-specific event cards -->
    <div class="mb-8">
      <div class="mb-6 text-center">
        <h3 class="text-xl md:text-2xl font-bold text-white mb-2">
          Enterprise Consultation Options
        </h3>
        <p class="text-white/60 text-sm md:text-base">
          Choose the session that fits your technical needs
        </p>
      </div>
      <EventTypeCards filter="enterprise" />
    </div>

    <!-- Fallback -->
    <div class="text-center">
      <p class="text-white/50 text-sm mb-3">Prefer to start with email?</p>
      <a
        href="mailto:{portfolioCopy.email}"
        class="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-semibold transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>{portfolioCopy.email}</span>
      </a>
    </div>
  </div>

{:else if intent === 'photography'}
  <!-- Photography Inquiry Funnel -->
  <div in:fly={{ x: 20, duration: 400 }} out:fade={{ duration: 200 }}>
    <!-- Back button -->
    <button
      on:click={onBack}
      class="mb-6 flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors text-sm"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back to inquiry type</span>
    </button>

    <div class="max-w-2xl mx-auto">
      <!-- Photography contact card -->
      <div class="p-8 md:p-10 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 border border-cyan-400/30 rounded-2xl">
        <div class="text-center mb-6">
          <div class="mb-4 inline-flex w-16 h-16 bg-cyan-600/20 border border-cyan-400/30 rounded-xl items-center justify-center">
            <svg class="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-3">
            Photography Inquiry
          </h3>
          <p class="text-white/70 leading-relaxed">
            Tournament coverage, team photography, or print licensing inquiries
          </p>
        </div>

        <!-- Contact options -->
        <div class="space-y-4">
          <!-- Primary: Email for photography -->
          <a
            href="mailto:{portfolioCopy.email}?subject=Photography Inquiry"
            class="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 rounded-lg transition-all duration-300"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-cyan-600/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-white font-semibold">Send Email Inquiry</div>
                <div class="text-white/50 text-sm">{portfolioCopy.email}</div>
              </div>
            </div>
            <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          <!-- Secondary: View gallery -->
          <a
            href="https://photography.ninochavez.co"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/30 rounded-lg transition-all duration-300"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-cyan-600/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="text-white font-semibold">View Portfolio</div>
                <div class="text-white/50 text-sm">Browse photography work</div>
              </div>
            </div>
            <svg class="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <!-- Response time -->
        <div class="mt-6 pt-6 border-t border-white/10 text-center">
          <p class="text-white/50 text-sm">
            <svg class="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Typical response within 24 hours
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}