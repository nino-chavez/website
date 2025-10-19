<script lang="ts">
  import { onMount } from 'svelte';
  import { inView } from '$lib/actions/inView';
  import { modernHover } from '$lib/actions/modernTransitions.js';
  
  // Props: articles (array of blog posts), filters (array of categories/tags)
  export let articles = [];
  export let filters = [];
  export let selectedFilter = '';
  export let onFilterSelect = (filter: string) => {};

  // Derived: featured is the most recent, rest are secondary, rest are more
  $: featured = articles[0];
  $: secondary = articles.slice(1, 7); // Show up to 6 secondary
  $: morePosts = articles.slice(7);
  
  let entered = false;
  
  function handleEnter() {
    console.log('Essays grid entered view');
    entered = true;
  }
  
  // Fallback animation trigger
  onMount(() => {
    setTimeout(() => {
      if (!entered) {
        console.log('Fallback: triggering essays animation');
        entered = true;
      }
    }, 500);
  });
</script>

<div 
  class="w-full max-w-7xl mx-auto px-4 md:px-8 essays-container"
  class:entered
  use:inView={{ threshold: 0.2, once: true }}
  on:enter={handleEnter}
>
  <!-- Filter Bar -->
  <div class="flex flex-wrap gap-2 mb-6 justify-center filter-bar">
    <button
      class="px-4 py-1 rounded-full text-sm font-semibold border border-violet-400 bg-violet-400/10 text-violet-300 hover:bg-violet-400/20 transition-all modern-hover filter-button"
      class:selected={selectedFilter === ''}
      on:click={() => onFilterSelect('')}
      use:modernHover={{ scale: 1.05, translateY: -1 }}
    >
      All
    </button>
    {#each filters as filter, i}
      <button
        class="px-4 py-1 rounded-full text-sm font-semibold border border-violet-400 bg-violet-400/10 text-violet-300 hover:bg-violet-400/20 transition-all modern-hover filter-button"
        class:selected={selectedFilter === filter}
        on:click={() => onFilterSelect(filter)}
        use:modernHover={{ scale: 1.05, translateY: -1 }}
        style="animation-delay: {(i + 1) * 100}ms;"
      >
        {filter}
      </button>
    {/each}
  </div>

  <!-- Editorial Grid -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-min editorial-grid">
    <!-- Featured Post: full width on mobile, 2/3 width on desktop -->
    {#if featured}
      <div 
        class="md:col-span-2 relative group rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl overflow-hidden card-entrance border border-violet-400/20 hover:border-violet-400/40 featured-card"
        use:modernHover={{ scale: 1.02, translateY: -4 }}
      >
        <img src={featured.imageUrl} alt={featured.title} class="w-full h-48 md:h-64 object-cover object-center rounded-t-3xl" loading="lazy" />
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xs font-semibold text-violet-400 uppercase">{featured.category}</span>
            <span class="text-xs text-white/50">{featured.date}</span>
          </div>
          <h3 class="text-2xl md:text-3xl font-extrabold text-white mb-2">{featured.title}</h3>
          <p class="text-base text-white/80 mb-4">{featured.excerpt}</p>
          <a 
            href={featured.link} 
            target="_blank" 
            rel="noopener" 
            class="inline-block px-4 py-2 rounded-md bg-violet-500 text-white font-semibold hover:bg-violet-600 spring-button modern-focus"
          >
            Read More
          </a>
        </div>
        <div class="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-violet-400/60 group-hover:shadow-[0_0_32px_8px_rgba(139,92,246,0.15)] transition-all duration-300"></div>
      </div>
    {/if}
    <!-- Secondary Posts Column: shares grid with featured -->
    <div class="flex flex-col gap-4 md:gap-5 secondary-posts">
      {#each secondary as post, i}
        <div 
          class="relative group rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl overflow-hidden card-entrance border border-violet-400/10 hover:border-violet-400/30 secondary-card"
          use:modernHover={{ scale: 1.02, translateY: -3 }}
          style="animation-delay: {(i + 2) * 150}ms;"
        >
          <img src={post.imageUrl} alt={post.title} class="w-full h-40 object-cover object-center rounded-t-2xl" loading="lazy" />
          <div class="p-5">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-semibold text-violet-400 uppercase">{post.category}</span>
              <span class="text-xs text-white/50">{post.date}</span>
            </div>
            <h4 class="text-lg font-bold text-white mb-1">{post.title}</h4>
            <p class="text-sm text-white/70 mb-2">{post.excerpt}</p>
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener" 
              class="inline-block text-violet-400 font-semibold hover:underline modern-focus"
            >
              Read
            </a>
          </div>
          <div class="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-violet-400/40 group-hover:shadow-[0_0_16px_4px_rgba(139,92,246,0.10)] transition-all duration-300"></div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Horizontal Scroll for more posts -->
  {#if morePosts.length > 0}
    <div class="mt-8 md:mt-10">
      <div class="flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar more-posts">
        {#each morePosts as post, i}
          <div 
            class="min-w-[320px] max-w-xs flex-shrink-0 relative group rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-lg overflow-hidden card-entrance border border-violet-400/10 hover:border-violet-400/30 more-card"
            use:modernHover={{ scale: 1.02, translateY: -3 }}
            style="animation-delay: {(i + 8) * 100}ms;"
          >
            <img src={post.imageUrl} alt={post.title} class="w-full h-40 object-cover object-center rounded-t-2xl" loading="lazy" />
            <div class="p-5">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-semibold text-violet-400 uppercase">{post.category}</span>
                <span class="text-xs text-white/50">{post.date}</span>
              </div>
              <h4 class="text-lg font-bold text-white mb-1">{post.title}</h4>
              <p class="text-sm text-white/70 mb-2">{post.excerpt}</p>
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener" 
                class="inline-block text-violet-400 font-semibold hover:underline modern-focus"
              >
                Read
              </a>
            </div>
            <div class="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-violet-400/40 group-hover:shadow-[0_0_16px_4px_rgba(139,92,246,0.10)] transition-all duration-300"></div>
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .selected {
    background: linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%);
    color: #fff !important;
    border-color: #8b5cf6 !important;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Animation styles */
  .essays-container {
    opacity: 0;
    transform: translateY(2rem);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .essays-container.entered {
    opacity: 1;
    transform: translateY(0);
  }
  
  .filter-button,
  .featured-card,
  .secondary-card,
  .more-card {
    opacity: 0;
    transform: translateY(1rem);
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
  
  .entered .filter-button:nth-child(1) { animation-delay: 0.1s; }
  .entered .filter-button:nth-child(2) { animation-delay: 0.2s; }
  .entered .filter-button:nth-child(3) { animation-delay: 0.3s; }
  .entered .filter-button:nth-child(4) { animation-delay: 0.4s; }
  
  .entered .featured-card { animation-delay: 0.3s; }
  .entered .secondary-card:nth-child(1) { animation-delay: 0.5s; }
  .entered .secondary-card:nth-child(2) { animation-delay: 0.6s; }
  .entered .secondary-card:nth-child(3) { animation-delay: 0.7s; }
  .entered .secondary-card:nth-child(4) { animation-delay: 0.8s; }
  .entered .secondary-card:nth-child(5) { animation-delay: 0.9s; }
  .entered .secondary-card:nth-child(6) { animation-delay: 1.0s; }
  
  .entered .more-card:nth-child(1) { animation-delay: 1.1s; }
  .entered .more-card:nth-child(2) { animation-delay: 1.2s; }
  .entered .more-card:nth-child(3) { animation-delay: 1.3s; }
  
  @keyframes slideUpFade {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .essays-container,
    .filter-button,
    .featured-card,
    .secondary-card,
    .more-card {
      opacity: 1;
      transform: none;
      animation: none;
      transition: none;
    }
  }
</style>
