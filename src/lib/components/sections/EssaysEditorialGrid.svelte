<script lang="ts">
  import { onMount } from 'svelte';
  import { inView } from '$lib/actions/inView';

  // Props: articles (array of blog posts)
  export let articles = [];

  // Derived: featured is the most recent, 2 alternating posts below
  $: featured = articles[0];
  $: alternatingPosts = articles.slice(1, 3); // Show 2 alternating posts
  
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
  class="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-4 md:px-8 essays-container"
  class:entered
  use:inView={{ threshold: 0.2, once: true }}
  on:enter={handleEnter}
>
  <!-- Editorial Layout: Featured on top, row of posts below -->
  <div class="space-y-4 md:space-y-6 lg:space-y-8">
    <!-- Featured Post: Full width -->
    {#if featured}
      <div
        class="relative group rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-2xl overflow-hidden card-entrance border border-violet-400/20 hover:border-violet-400/40 featured-card hover:scale-[1.01] hover:-translate-y-1 transition-transform duration-300"
      >
        <div class="grid md:grid-cols-2 gap-0">
          <!-- Image -->
          <img src={featured.imageUrl} alt={featured.title} class="w-full h-64 md:h-96 object-cover" loading="eager" />

          <!-- Content -->
          <div class="p-4 md:p-6 lg:p-8 flex flex-col">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-semibold text-violet-400 uppercase">{featured.category}</span>
              <span class="text-xs text-white/50">•</span>
              <span class="text-xs text-white/50">{featured.date}</span>
              {#if featured.readTime}
                <span class="text-xs text-white/50">•</span>
                <span class="text-xs text-white/50">{featured.readTime}</span>
              {/if}
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

    <!-- Alternating Posts: 2 rows with image/content alternating -->
    {#if alternatingPosts.length > 0}
      <div class="space-y-6 md:space-y-8 lg:space-y-10">
        {#each alternatingPosts as post, index}
          {@const isEven = index % 2 === 0}

          <div
            class="relative alternating-card"
            style="animation-delay: {(index + 1) * 150}ms;"
          >
            <!-- Post Row -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 shadow-xl overflow-hidden border border-violet-400/10 hover:border-violet-400/30 transition-all duration-300 group">

              <!-- Image Column -->
              <div class="relative {isEven ? 'lg:order-1' : 'lg:order-2'}">
                <div class="relative h-64 md:h-80 lg:h-full overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <!-- Image overlay on hover -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <!-- Content Column -->
              <div class="relative p-6 md:p-8 flex flex-col {isEven ? 'lg:order-2' : 'lg:order-1'}">
                <!-- Meta -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xs font-semibold text-violet-400 uppercase tracking-wide">{post.category}</span>
                  <span class="text-xs text-white/50">•</span>
                  <span class="text-xs text-white/50">{post.date}</span>
                  {#if post.readTime}
                    <span class="text-xs text-white/50">•</span>
                    <span class="text-xs text-white/50">{post.readTime}</span>
                  {/if}
                </div>

                <!-- Title -->
                <h4 class="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-violet-300 transition-colors">
                  {post.title}
                </h4>

                <!-- Subtitle if exists -->
                {#if post.subtitle}
                  <p class="text-base md:text-lg text-violet-300 mb-3 font-medium">
                    {post.subtitle}
                  </p>
                {/if}

                <!-- Excerpt -->
                <p class="text-sm md:text-base text-white/80 mb-4 leading-relaxed line-clamp-4">
                  {post.excerpt}
                </p>

                <!-- Insights/Tags if available -->
                {#if post.insights && post.insights.length > 0}
                  <div class="mb-4">
                    <p class="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-2">Key Insights</p>
                    <ul class="space-y-1">
                      {#each post.insights.slice(0, 2) as insight}
                        <li class="flex items-start text-white/70 text-xs md:text-sm">
                          <span class="text-violet-400 mr-2 mt-0.5 flex-shrink-0">→</span>
                          <span>{insight}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}

                <!-- CTA -->
                <div class="mt-auto pt-4">
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-violet-500/30"
                  >
                    Read on {post.platform}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        {/each}
      </div>
    {/if}

    <!-- View All Essays CTA -->
    <div class="mt-8 md:mt-10 lg:mt-12 text-center view-all-cta">
      <a
        href="https://blog.ninochavez.co"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-violet-400/50 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
      >
        View All Essays
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
        </svg>
      </a>
    </div>
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
  .alternating-card,
  .view-all-cta {
    opacity: 0;
    transform: translateY(1rem) scale(0.95);
    animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .entered .featured-card { animation-delay: 0.2s; }
  .entered .alternating-card:nth-child(1) { animation-delay: 0.4s; }
  .entered .alternating-card:nth-child(2) { animation-delay: 0.6s; }
  .entered .view-all-cta { animation-delay: 0.8s; }
  
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
    .alternating-card,
    .view-all-cta {
      opacity: 1;
      transform: none;
      animation: none;
      transition: none;
    }
  }
</style>
