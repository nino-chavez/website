<!-- Modern Animation Demo Component -->
<script>
  import ModernSection from '$lib/components/transitions/ModernSection.svelte';
  import { modernHover, textReveal, scrollDriven } from '$lib/actions/modernTransitions.js';
</script>

<!-- Example usage of modern animations -->
<div class="demo-container">
  
  <!-- Modern Section with Staggered Entry -->
  <ModernSection 
    className="py-20" 
    stagger={true} 
    staggerDelay={150}
    threshold={0.2}
  >
    <div slot-scope="{ entered }" class="max-w-4xl mx-auto px-6">
      
      <!-- Text Reveal Animations -->
      <h2 
        class="text-4xl font-bold text-white mb-4"
        use:textReveal={{ type: 'slide', delay: 200 }}
        data-stagger
      >
        Modern Animation System
      </h2>
      
      <!-- Cards with Modern Hover -->
      <div class="grid md:grid-cols-3 gap-6 mt-8">
        {#each Array(3) as _, i}
          <div 
            class="bg-neutral-800 p-6 rounded-xl border border-violet-400/20 card-entrance"
            use:modernHover={{ scale: 1.03, translateY: -4 }}
            data-stagger
            style="--stagger-delay: {(i + 1) * 100}ms;"
          >
            <h3 class="text-xl font-semibold text-white mb-2">Card {i + 1}</h3>
            <p class="text-white/70">Enhanced with modern hover micro-interactions</p>
          </div>
        {/each}
      </div>
      
      <!-- Parallax Background Element -->
      <div 
        class="w-32 h-32 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full absolute top-10 right-10 opacity-20 parallax-layer"
        use:scrollDriven={{ speed: 0.3, direction: 'y' }}
      ></div>
      
    </div>
  </ModernSection>
  
</div>

<style>
  .demo-container {
    position: relative;
    overflow: hidden;
  }
</style>