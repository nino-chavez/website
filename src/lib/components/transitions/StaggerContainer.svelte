<script>
  import { modernInView } from '$lib/actions/modernTransitions.js';
  import { reducedMotion } from '$lib/stores/gameFlow';
  
  export let className = '';
  export let staggerDelay = 150;
  export let animationType = 'slide'; // 'slide', 'fade', 'scale'
  export let threshold = 0.1;
  
  let entered = false;
  
  function handleStaggerEnter(event) {
    entered = true;
  }
</script>

<div
  class={`stagger-container ${className} ${animationType}-stagger`}
  use:modernInView={{
    threshold,
    stagger: true,
    staggerDelay,
    animationClass: `stagger-${animationType}`
  }}
  on:modernenter={handleStaggerEnter}
>
  {#each $$slots.default as slot, i}
    <div 
      data-stagger 
      class="stagger-item"
      style="--stagger-index: {i}; --stagger-delay: {i * staggerDelay}ms;"
    >
      <slot />
    </div>
  {/each}
</div>

<style>
  .stagger-container {
    position: relative;
  }
  
  .stagger-item {
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  /* Slide animation */
  .slide-stagger .stagger-item {
    transform: translateY(2rem);
  }
  
  .slide-stagger .stagger-item.animate-in-stagger {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Fade animation */
  .fade-stagger .stagger-item {
    transform: none;
  }
  
  .fade-stagger .stagger-item.animate-in-stagger {
    opacity: 1;
  }
  
  /* Scale animation */
  .scale-stagger .stagger-item {
    transform: scale(0.8);
  }
  
  .scale-stagger .stagger-item.animate-in-stagger {
    opacity: 1;
    transform: scale(1);
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .stagger-item {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>