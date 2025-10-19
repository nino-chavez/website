<script>
  import { onMount } from 'svelte';
  import { modernInView, scrollDriven } from '$lib/actions/modernTransitions.js';
  import { reducedMotion } from '$lib/stores/gameFlow';
  
  export let className = '';
  export let stagger = false;
  export let staggerDelay = 100;
  export let parallax = false;
  export let parallaxSpeed = 0.3;
  export let animationClass = 'animate-in';
  export let threshold = 0.15;
  export let onEnter = () => {};
  
  let entered = false;
  let sectionElement;
  
  function handleModernEnter(event) {
    console.log('Modern enter triggered:', event.detail);
    entered = true;
    onEnter(event.detail);
  }
  
  // Fallback: trigger animation after mount with a delay
  onMount(() => {
    setTimeout(() => {
      if (!entered) {
        console.log('Fallback animation trigger');
        entered = true;
      }
    }, 1000);
  });
</script>

<div
  bind:this={sectionElement}
  class={`modern-section ${className}`}
  use:modernInView={{
    threshold,
    stagger,
    staggerDelay,
    animationClass
  }}
  on:modernenter={handleModernEnter}
>
  <slot {entered} />
</div>

<style>
  .modern-section {
    position: relative;
    opacity: 0;
    transform: translateY(2rem);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  :global(.modern-section.animate-in) {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Reduced motion overrides */
  @media (prefers-reduced-motion: reduce) {
    .modern-section {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>