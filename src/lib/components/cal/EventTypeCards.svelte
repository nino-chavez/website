<script lang="ts">
  // Phase 2: Event Type Cards
  // Displays dynamic, visually rich cards for each meeting type
  
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { inView } from '$lib/actions/inView';
  import type { EnrichedEventType } from '$lib/types/cal';
  import { PUBLIC_CAL_USERNAME } from '$env/static/public';
  
  let eventTypes: EnrichedEventType[] = [];
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
{:else if error || eventTypes.length === 0}
  <!-- Minimal fallback - don't show anything if no event types -->
  <!-- The "View Full Calendar" card below will handle navigation -->
{:else}
  <!-- Compact heading when cards exist -->
  <div class="mb-6 text-center">
    <h3 class="text-xl font-bold text-white mb-1">Choose Your Meeting</h3>
    <p class="text-white/50 text-sm">Select the consultation that fits your needs</p>
  </div>
  
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    use:inView={{ threshold: 0.2, once: true }}
    on:enter={handleCardsVisible}
  >
    {#each eventTypes as eventType, i}
      <article
        class="group relative p-5 border rounded-xl transition-all duration-300 hover:scale-[1.02] {getUrgencyStyle(eventType.urgency)}"
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
          <div class="text-3xl mb-2">{eventType.icon}</div>
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
                <time
                  datetime={slot.dateTime}
                  class="px-3 py-1.5 bg-white/5 border rounded-lg text-sm text-white/80 {slot.isToday ? 'border-green-400/30 bg-green-400/10' : 'border-white/10'}"
                >
                  {slot.displayTime}
                </time>
              {/each}
            </div>
          </div>
        {:else}
          <div class="mb-3 text-sm text-amber-400">
            Limited availability - check calendar
          </div>
        {/if}

        <!-- CTA Button -->
        <a
          href={getBookingUrl(eventType)}
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between w-full px-4 py-3 bg-violet-600/20 hover:bg-violet-600/30 border border-violet-400/30 hover:border-violet-400/50 rounded-lg transition-all duration-300 group/btn"
        >
          <span class="text-white font-semibold">Book Now</span>
          <svg 
            class="w-5 h-5 text-violet-400 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
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