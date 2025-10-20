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
        <div class="flex-shrink-0 text-2xl pt-0.5">
          {getUrgencyIcon(suggestion.urgency)}
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