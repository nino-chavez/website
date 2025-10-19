<script>
  import { onMount } from 'svelte';

  /**
   * Lazy loader for Svelte components
   * Props:
   * - loader: () => Promise<{ default: SvelteComponent }>
   * - mode: 'visible' | 'idle' | 'load' (default: 'visible')
   * - rootMargin: IntersectionObserver rootMargin (default: '200px')
   * - threshold: IntersectionObserver threshold (default: 0.1)
   * Forwards all other props to the loaded component.
   */
  export let loader;
  export let mode = 'visible';
  export let rootMargin = '200px';
  export let threshold = 0.1;

  let component = null;
  let error = null;
  let hostEl;

  async function load() {
    if (!component && loader) {
      try {
        const mod = await loader();
        component = mod.default;
      } catch (err) {
        console.error('Lazy component load failed:', err);
        error = err;
      }
    }
  }

  onMount(() => {
    if (mode === 'load') {
      load();
      return;
    }

    if (mode === 'idle') {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => load());
      } else {
        setTimeout(load, 1);
      }
      return;
    }

    const io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry && entry.isIntersecting) {
        load();
        io.disconnect();
      }
    }, { rootMargin, threshold });

    if (hostEl) io.observe(hostEl);
    return () => io.disconnect();
  });
</script>

<div bind:this={hostEl}>
  {#if component}
    <svelte:component this={component} {...$$restProps} />
  {:else}
    <slot name="placeholder" />
  {/if}
  <slot />
  <!-- optional default slot content below placeholder -->
</div>

<style>
  :global(.lazy-placeholder) {
    min-height: 40vh;
  }
</style>
