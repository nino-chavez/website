<script>
  import { inView } from '$lib/actions/inView';

  export let className = '';
  export let delay = 0;
  export let duration = 600;
  export let direction = 'up'; // 'up', 'down', 'left', 'right', 'fade'

  let isVisible = false;

  function onEnter() {
    isVisible = true;
  }

  // Calculate transform based on direction
  $: transform = direction === 'up' ? 'translateY(30px)' :
                 direction === 'down' ? 'translateY(-30px)' :
                 direction === 'left' ? 'translateX(30px)' :
                 direction === 'right' ? 'translateX(-30px)' :
                 'none';
</script>

<div
  class="fade-in-element {className}"
  class:visible={isVisible}
  style="--delay: {delay}ms; --duration: {duration}ms; --transform: {transform};"
  use:inView={{ threshold: 0.1, once: true }}
  on:enter={onEnter}
>
  <slot />
</div>

<style>
  .fade-in-element {
    opacity: 0;
    transform: var(--transform);
    transition: opacity var(--duration) ease-out var(--delay), transform var(--duration) ease-out var(--delay);
  }

  .fade-in-element.visible {
    opacity: 1;
    transform: none;
  }
</style>