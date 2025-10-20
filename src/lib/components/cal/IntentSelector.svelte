<script lang="ts">
  // Intent-Based Contact Routing
  // Segments users by primary intent before revealing contact methods
  
  import { fade, fly } from 'svelte/transition';
  import { inView } from '$lib/actions/inView';
  
  export let onSelectIntent: (intent: 'enterprise' | 'photography') => void;
  
  let cardsVisible = false;
  
  function handleCardsVisible() {
    cardsVisible = true;
  }
</script>

<div 
  class="max-w-4xl mx-auto"
  use:inView={{ threshold: 0.2, once: true }}
  on:enter={handleCardsVisible}
>
  <!-- Intent Question -->
  <div class="mb-8 text-center">
    <h3 class="text-2xl md:text-3xl font-bold text-white mb-2">
      What is the nature of your inquiry?
    </h3>
    <p class="text-white/50 text-sm md:text-base">
      Select the area that best matches your needs
    </p>
  </div>

  <!-- Intent Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Enterprise & AI Intent -->
    <button
      on:click={() => onSelectIntent('enterprise')}
      class="group text-left p-8 bg-gradient-to-br from-violet-600/10 to-purple-600/10 hover:from-violet-600/20 hover:to-purple-600/20 border border-violet-400/30 hover:border-violet-400/50 rounded-2xl transition-all duration-500 transform hover:scale-[1.02]"
      in:fly={{ 
        y: cardsVisible ? 0 : 32, 
        duration: 500, 
        delay: 0 
      }}
    >
      <!-- Icon -->
      <div class="mb-4 w-14 h-14 bg-violet-600/20 border border-violet-400/30 rounded-xl flex items-center justify-center">
        <svg class="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      </div>
      
      <!-- Title -->
      <div class="text-2xl font-bold text-white mb-3">
        Enterprise & AI
      </div>
      
      <!-- Description -->
      <p class="text-white/70 leading-relaxed mb-6">
        Strategic guidance on enterprise architecture, AI systems, and platform development.
      </p>
      
      <!-- CTA -->
      <div class="flex items-center gap-2 text-violet-400 font-semibold group-hover:gap-3 transition-all">
        <span>Schedule Consultation</span>
        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </button>

    <!-- Photography & Media Intent -->
    <button
      on:click={() => onSelectIntent('photography')}
      class="group text-left p-8 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 hover:from-cyan-600/20 hover:to-blue-600/20 border border-cyan-400/30 hover:border-cyan-400/50 rounded-2xl transition-all duration-500 transform hover:scale-[1.02]"
      in:fly={{ 
        y: cardsVisible ? 0 : 32, 
        duration: 500, 
        delay: 100 
      }}
    >
      <!-- Icon -->
      <div class="mb-4 w-14 h-14 bg-cyan-600/20 border border-cyan-400/30 rounded-xl flex items-center justify-center">
        <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      
      <!-- Title -->
      <div class="text-2xl font-bold text-white mb-3">
        Photography & Media
      </div>
      
      <!-- Description -->
      <p class="text-white/70 leading-relaxed mb-6">
        Inquiries for tournament coverage, team photography, or print licensing.
      </p>
      
      <!-- CTA -->
      <div class="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all">
        <span>Send Inquiry</span>
        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </button>
  </div>
</div>

<style>
  /* Enhance hover effects */
  button:hover {
    box-shadow: 0 12px 32px rgba(139, 92, 246, 0.2);
  }
</style>