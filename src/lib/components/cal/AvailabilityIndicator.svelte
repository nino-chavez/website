<script lang="ts">
  // Phase 1: Ambient Availability Indicator
  // Displays real-time availability status with subtle animations
  
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import type { AvailabilityStatus } from '$lib/types/cal';
  
  let availability: AvailabilityStatus | null = null;
  let loading = true;
  let error = false;

  onMount(async () => {
    await fetchAvailability();
    // Refresh every 15 minutes
    const interval = setInterval(fetchAvailability, 15 * 60 * 1000);
    return () => clearInterval(interval);
  });

  async function fetchAvailability() {
    try {
      const response = await fetch('/api/cal/availability');
      if (response.ok) {
        availability = await response.json();
        error = false;
      } else {
        error = true;
      }
    } catch (err) {
      console.error('Error fetching availability:', err);
      error = true;
    } finally {
      loading = false;
    }
  }

  function getStatusColor(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-400';
      case 'limited':
        return 'bg-amber-400';
      case 'unavailable':
        return 'bg-red-400';
      default:
        return 'bg-white/40';
    }
  }

  function getStatusText(status: string): string {
    switch (status) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited availability';
      case 'unavailable':
        return 'Fully booked';
      default:
        return 'Check calendar';
    }
  }
</script>

{#if loading}
  <div class="flex items-center gap-2 text-white/40 text-sm">
    <span class="w-2 h-2 bg-white/40 rounded-full animate-pulse"></span>
    <span>Loading availability...</span>
  </div>
{:else if error || !availability}
  <!-- Graceful fallback -->
  <div class="flex items-center gap-2 text-white/60 text-sm">
    <span class="w-2 h-2 bg-violet-400 rounded-full"></span>
    <span>Check calendar for availability</span>
  </div>
{:else}
  <div 
    class="flex flex-col gap-1"
    in:fade={{ duration: 300 }}
  >
    <div class="flex items-center gap-2 text-white/90 text-sm font-medium">
      <span 
        class="w-2 h-2 rounded-full {getStatusColor(availability.status)}"
        class:animate-pulse={availability.status === 'available'}
      ></span>
      <span>{getStatusText(availability.status)}</span>
    </div>
    
    {#if availability.nextSlot}
      <div class="text-white/60 text-sm ml-4">
        Next: {availability.nextSlot.displayTime}
      </div>
    {/if}
    
    {#if availability.slotsThisWeek > 0 && availability.slotsThisWeek <= 5}
      <div class="text-amber-400 text-xs ml-4">
        {availability.slotsThisWeek} slot{availability.slotsThisWeek === 1 ? '' : 's'} left this week
      </div>
    {/if}
  </div>
{/if}

<style>
  /* Custom pulse animation for high urgency */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>