<script lang="ts">
  import { onMount } from 'svelte';
  import { inView } from '$lib/actions/inView';
  import { modernHover } from '$lib/actions/modernTransitions.js';
  
  // Props: articles (array of blog posts)
  export let articles = [];

  // Derived: featured is the most recent, 3 secondary posts below
  $: featured = articles[0];
  $: rowPosts = articles.slice(1, 4); // Show up to 3 in the row
  
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
  <!-- Editorial Layout: Featured on top, row of posts below -->
  <div class="space-y-6 md:space-y-8">
    <!-- Featured Post: Full width -->
    {#if featured}
      <div
        class="relative group rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl overflow-hidden card-entrance border border-violet-400/20 hover:border-violet-400/40 featured-card"
        use:modernHover={{ scale: 1.01, translateY: -4 }}
      >
        <div class="grid md:grid-cols-2 gap-0">
          <!-- Image -->
          <img src={featured.imageUrl} alt={featured.title} class="w-full h-64 md:h-full object-cover" loading="eager" />

          <!-- Content -->
          <div class="p-6 md:p-8 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-semibold text-violet-400 uppercase">{featured.category}</span>
              <span class="text-xs text-white/50">{featured.date}</span>
            </div>
            <h3 class="text-3xl md:text-4xl font-extrabold text-white mb-4">{featured.title}</h3>
            <p class="text-base md:text-lg text-white/80 mb-6 leading-relaxed line-clamp-4 md:line-clamp-6">{featured.excerpt}</p>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener"
              class="inline-block px-6 py-3 rounded-lg bg-violet-500 text-white font-semibold hover:bg-violet-600 transition-colors mt-auto w-fit"
            >
              Read on {featured.platform}
            </a>
          </div>
        </div>
        <div class="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-violet-400/60 group-hover:shadow-[0_0_32px_8px_rgba(139,92,246,0.15)] transition-all duration-300"></div>
      </div>
    {/if}

    <!-- Row of Posts: 3 wider cards -->
    {#if rowPosts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 row-posts">
        {#each rowPosts as post, i}
          <div
            class="relative group rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl overflow-hidden card-entrance border border-violet-400/10 hover:border-violet-400/30 row-card"
            use:modernHover={{ scale: 1.02, translateY: -3 }}
            style="animation-delay: {(i + 2) * 100}ms;"
          >
            <img src={post.imageUrl} alt={post.title} class="w-full h-48 md:h-52 object-cover object-center rounded-t-2xl" loading="lazy" />
            <div class="p-5 md:p-6">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-semibold text-violet-400 uppercase">{post.category}</span>
                <span class="text-xs text-white/50">{post.date}</span>
              </div>
              <h4 class="text-lg md:text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h4>
              <p class="text-sm md:text-base text-white/70 mb-4 line-clamp-3">{post.excerpt}</p>
              <a
                href={post.link}
                target="_blank"
                rel="noopener"
                class="inline-block text-violet-400 font-semibold hover:underline modern-focus"
              >
                Read Article →
              </a>
            </div>
            <div class="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-violet-400/40 group-hover:shadow-[0_0_16px_4px_rgba(139,92,246,0.10)] transition-all duration-300"></div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
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

  .featured-card,
  .row-card {
    opacity: 0;
    transform: translateY(1rem) scale(0.95);
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .entered .featured-card { animation-delay: 0.2s; }
  .entered .row-card:nth-child(1) { animation-delay: 0.4s; }
  .entered .row-card:nth-child(2) { animation-delay: 0.5s; }
  .entered .row-card:nth-child(3) { animation-delay: 0.6s; }
  
  @keyframes slideUpFade {
    0% {
      opacity: 0;
      transform: translateY(1rem) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1.0);
    }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .essays-container,
    .featured-card,
    .row-card {
      opacity: 1;
      transform: none;
      animation: none;
      transition: none;
    }
  }
</style>
