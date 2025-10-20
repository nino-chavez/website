<script lang="ts">
  // Phase 2: Event Type Cards
  // Displays dynamic, visually rich cards for each meeting type
  
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { inView } from '$lib/actions/inView';
  import type { EnrichedEventType } from '$lib/types/cal';
  import { PUBLIC_CAL_USERNAME } from '$env/static/public';
  
  // Optional filter by intent
  export let filter: 'enterprise' | 'photography' | null = null;
  
  let eventTypes: EnrichedEventType[] = [];
  let filteredEventTypes: EnrichedEventType[] = [];
  let loading = true;
  let error = false;
  let cardsVisible = false;

  onMount(async () => {
    await fetchEventTypes();
    // Refresh every 5 minutes
    const interval = setInterval(fetchEventTypes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  });

  async function fetchEventTypes() {
    try {
      const response = await fetch('/api/cal/event-types');
      if (response.ok) {
        eventTypes = await response.json();
        error = false;
      } else {
        error = true;
      }
    } catch (err) {
      console.error('Error fetching event types:', err);
      error = true;
    } finally {
      loading = false;
    }
  }
  
  // Filter event types based on intent
  $: {
    if (filter === 'enterprise') {
      // Show tech-related meetings (exclude photography)
      filteredEventTypes = eventTypes.filter(et =>
        !et.title.toLowerCase().includes('photo') &&
        !et.title.toLowerCase().includes('portrait') &&
        !et.title.toLowerCase().includes('shoot')
      );
    } else if (filter === 'photography') {
      // Show photography-specific meetings
      filteredEventTypes = eventTypes.filter(et =>
        et.title.toLowerCase().includes('photo') ||
        et.title.toLowerCase().includes('portrait') ||
        et.title.toLowerCase().includes('shoot')
      );
    } else {
      // No filter - show all
      filteredEventTypes = eventTypes;
    }
  }
  
  // Use filtered list for display
  $: displayEventTypes = filteredEventTypes;

  function getUrgencyStyle(urgency: string): string {
    switch (urgency) {
      case 'high':
        return 'border-red-400/40 bg-red-400/5';
      case 'medium':
        return 'border-amber-400/30 bg-amber-400/5';
      case 'low':
        return 'border-violet-400/30 bg-violet-400/5';
      default:
        return 'border-white/10 bg-white/5';
    }
  }

  function getUrgencyAccent(urgency: string): string {
    switch (urgency) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-amber-400';
      case 'low':
        return 'text-violet-400';
      default:
        return 'text-white/60';
    }
  }

  function getBookingUrl(eventType: EnrichedEventType): string {
    return eventType.bookingUrl || `https://cal.com/${PUBLIC_CAL_USERNAME}/${eventType.slug}`;
  }

  function handleCardsVisible() {
    cardsVisible = true;
  }
</script>

{#if loading}
  <!-- Minimal loading state - just show spinner -->
  <div class="flex justify-center py-4">
    <div class="w-6 h-6 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin"></div>
  </div>
{:else if error || displayEventTypes.length === 0}
  <!-- Minimal fallback - don't show anything if no event types -->
  <!-- The "View Full Calendar" card below will handle navigation -->
{:else}
  <!-- Compact heading when cards exist -->
  <div class="mb-6 text-center">
    <h3 class="text-xl md:text-2xl font-bold text-white mb-1">Choose Your Meeting</h3>
    <p class="text-white/50 text-sm md:text-base">Select the consultation that fits your needs</p>
  </div>
  
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
    use:inView={{ threshold: 0.2, once: true }}
    on:enter={handleCardsVisible}
  >
    {#each displayEventTypes as eventType, i}
      <article
        class="group relative p-6 border rounded-xl transition-all duration-300 md:hover:scale-[1.02] {getUrgencyStyle(eventType.urgency)}"
        in:fly={{
          y: cardsVisible ? 0 : 32,
          duration: 500,
          delay: cardsVisible ? i * 100 : 0
        }}
      >
        <!-- Urgency indicator -->
        {#if eventType.urgency === 'high'}
          <div class="absolute top-3 right-3 flex items-center gap-1 text-xs font-semibold {getUrgencyAccent(eventType.urgency)}">
            <span class="w-1.5 h-1.5 bg-current rounded-full animate-pulse"></span>
            <span>Limited</span>
          </div>
        {/if}

        <!-- Icon and Title -->
        <div class="mb-3">
          <div class="mb-3 w-12 h-12 bg-violet-600/20 border border-violet-400/30 rounded-lg flex items-center justify-center">
            {#if eventType.length <= 15}
              <!-- Quick meetings: clock icon -->
              <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            {:else if eventType.length >= 45}
              <!-- Deep dive meetings: layers icon -->
              <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            {:else}
              <!-- Standard meetings: calendar icon -->
              <svg class="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            {/if}
          </div>
          <h3 class="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
            {eventType.title}
          </h3>
          <div class="flex items-center gap-2 text-sm text-white/60">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{eventType.length} minutes</span>
          </div>
        </div>

        <!-- Purpose -->
        <p class="text-white/70 text-sm mb-3 leading-snug">
          {eventType.purpose}
        </p>

        <!-- Availability slots -->
        {#if eventType.availability.length > 0}
          <div class="mb-3 space-y-1.5">
            <div class="text-xs font-semibold text-white/40 uppercase tracking-wider">
              Next Available:
            </div>
            <div class="flex flex-wrap gap-2">
              {#each eventType.availability.slice(0, 3) as slot}
                <div
                  class="px-3 py-1.5 border rounded-lg text-sm font-medium {slot.isToday ? 'bg-green-400/10 border-green-400/30 text-green-300' : 'bg-white/5 border-white/10 text-white/80'}"
                >
                  <time datetime={slot.dateTime}>
                    {slot.displayTime}
                  </time>
                </div>
              {/each}
            </div>
          </div>
        {:else}
          <div class="mb-3 text-sm text-amber-400">
            Limited availability - check calendar
          </div>
        {/if}

        <!-- CTA Button - Full width on mobile, clear action -->
        <a
          href={getBookingUrl(eventType)}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center md:justify-between w-full px-4 py-3 bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-300 group/btn shadow-lg shadow-violet-600/20"
        >
          <span class="text-white font-bold text-center md:text-left">Book This Meeting</span>
          <svg
            class="hidden md:block w-5 h-5 text-violet-400 transform group-hover/btn:translate-x-1 transition-transform duration-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </article>
    {/each}
  </div>
{/if}

<style>
  /* Enhance hover animations */
  article:hover {
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.15);
  }
</style>