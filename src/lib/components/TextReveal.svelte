<script>
  import { onMount } from 'svelte';
  import { inView } from '$lib/actions/inView';

  export let text = '';
  export let className = '';
  export let delay = 0;
  export let duration = 800;
  export let staggerDelay = 50;
  export let type = 'words'; // 'words' or 'chars'

  let element;
  let isVisible = false;
  let animationStarted = false;

  // Split text into items
  $: items = type === 'words' ? text.split(' ') : text.split('');

  function onEnter() {
    isVisible = true;
    if (!animationStarted) {
      animationStarted = true;
      // Trigger animation after delay
      setTimeout(() => {
        animateItems();
      }, delay);
    }
  }

  function animateItems() {
    if (!element) return;

    const spans = element.querySelectorAll('.text-item');
    spans.forEach((span, index) => {
      const itemDelay = index * staggerDelay;
      setTimeout(() => {
        span.style.animation = `textReveal ${duration}ms ease-out forwards`;
      }, itemDelay);
    });
  }
</script>

<div
  bind:this={element}
  class="text-reveal-container {className}"
  use:inView={{ threshold: 0.1, once: true }}
  on:enter={onEnter}
>
  {#each items as item, index}
    <span class="text-item" style="--index: {index};">
      {item}{type === 'words' && index < items.length - 1 ? ' ' : ''}
    </span>
  {/each}
</div>

<style>
  .text-item {
    opacity: 0;
    transform: translateY(20px) rotateX(-90deg);
    transform-origin: top;
    display: inline-block;
    animation-fill-mode: forwards;
  }

  @keyframes textReveal {
    0% {
      opacity: 0;
      transform: translateY(20px) rotateX(-90deg);
    }
    100% {
      opacity: 1;
      transform: translateY(0) rotateX(0deg);
    }
  }
</style>