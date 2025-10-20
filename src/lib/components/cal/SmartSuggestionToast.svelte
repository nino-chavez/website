<script lang="ts">
  // Phase 3: Smart Suggestion Toast
  // Contextual booking suggestions with dismissible toast UI
  
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import type { SmartSuggestion, AvailabilityStatus } from '$lib/types/cal';
  import {
    buildBookingContext,
    generateSmartSuggestion,
    markSuggestionShown,
    updateLastVisit,
    getUrgencyColor,
    getUrgencyIcon,
  } from '$lib/utils/smartSuggestions';
  
  export let availability: AvailabilityStatus | null = null;
  
  let suggestion: SmartSuggestion | null = null;
  let visible = false;
  let dismissed = false;

  $: if (availability && !dismissed) {
    checkAndShowSuggestion();
  }

  onMount(() => {
    updateLastVisit();
  });

  function checkAndShowSuggestion() {
    if (!availability || dismissed) return;

    const context = buildBookingContext(
      availability.slotsThisWeek,
      availability.nextSlot?.dateTime
    );

    const generated = generateSmartSuggestion(context);
    
    if (generated) {
      suggestion = generated;
      visible = true;
      markSuggestionShown();
      
      // Auto-dismiss after 10 seconds for low urgency
      if (generated.urgency === 'low') {
        setTimeout(dismiss, 10000);
      }
    }
  }

  function dismiss() {
    visible = false;
    dismissed = true;
  }
</script>

{#if visible && suggestion}
  <div
    class="fixed bottom-6 right-6 z-50 max-w-md"
    in:fly={{ y: 50, duration: 300 }}
    out:fade={{ duration: 200 }}
  >
    <div
      class="relative p-4 bg-neutral-800 border border-white/20 rounded-xl shadow-2xl backdrop-blur-sm"
      role="alert"
      aria-live="polite"
    >
      <!-- Urgency accent bar -->
      <div 
        class="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        class:bg-red-400={suggestion.urgency === 'high'}
        class:bg-amber-400={suggestion.urgency === 'medium'}
        class:bg-violet-400={suggestion.urgency === 'low'}
      ></div>

      <div class="flex items-start gap-3">
        <!-- Icon -->
        <div class="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center {suggestion.urgency === 'high' ? 'bg-red-400/20' : suggestion.urgency === 'medium' ? 'bg-amber-400/20' : 'bg-violet-400/20'}">
          {#if suggestion.urgency === 'high'}
            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          {:else if suggestion.urgency === 'medium'}
            <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          {:else}
            <svg class="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          {/if}
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-white mb-1">
            Smart Booking Tip
          </div>
          <p class="text-sm text-white/80 leading-relaxed">
            {suggestion.message}
          </p>
          
          {#if suggestion.action}
            <button
              class="mt-3 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              on:click={() => {
                // Navigate to specific event type or perform action
                dismiss();
              }}
            >
              {suggestion.action.label} →
            </button>
          {/if}
        </div>

        <!-- Dismiss button -->
        <button
          class="flex-shrink-0 p-1 text-white/40 hover:text-white/80 transition-colors"
          on:click={dismiss}
          aria-label="Dismiss suggestion"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add subtle animation for attention */
  @keyframes subtle-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    }
    50% {
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
    }
  }
  
  div[role="alert"]:has(.bg-red-400) {
    animation: subtle-pulse 2s ease-in-out infinite;
  }
</style>