<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import GalleryModal from '$lib/components/ui/GalleryModal.svelte';
  import { currentSection } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { fade, fly } from 'svelte/transition';

  let images = [];
  let loading = true;
  let selectedImageId = '';
  let isModalOpen = false;
  let containerRef;
  let carouselRef;
  let index = 0;
  let perSlide = 3;

  // Entry transition state
  let entered = false;

  // Responsive slide count
  function updatePerSlide() {
    const width = window.innerWidth;
    if (width < 640) perSlide = 1;        // Mobile: 1-up (tall)
    else if (width < 1024) perSlide = 2;  // Tablet: 2-up
    else if (width < 1440) perSlide = 2;  // Desktop: favor height (2-up)
    else if (width < 1536) perSlide = 3;  // XL: 3-up
    else perSlide = 4;                    // 2XL+: 4-up
  }

  // Build slides: chunk all images by perSlide
  $: slides = images.length > 0 ? chunkArray(images, perSlide) : [];

  function chunkArray(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  }

  function scrollToIndex(i) {
    if (!containerRef) return;
    const width = containerRef.clientWidth;
    // Smooth scroll with slight overshoot for natural feel
    containerRef.scrollTo({ left: i * width + 30, behavior: 'smooth' });
    setTimeout(() => containerRef.scrollTo({ left: i * width, behavior: 'smooth' }), 140);
    index = i;
  }

  function handleNext() {
    scrollToIndex(Math.min(index + 1, slides.length - 1));
  }

  function handlePrev() {
    scrollToIndex(Math.max(index - 1, 0));
  }

  // Track index on manual scroll/swipe
  function handleScroll() {
    if (!containerRef) return;
    const i = Math.round(containerRef.scrollLeft / containerRef.clientWidth);
    if (i !== index) index = i;
  }

  // Keyboard navigation
  function handleKeydown(event) {
    if (event.key === 'ArrowLeft') handlePrev();
    if (event.key === 'ArrowRight') handleNext();
  }

  onMount(() => {
    // Set initial responsive state
    updatePerSlide();

    // Add event listeners
    window.addEventListener('resize', updatePerSlide);
    window.addEventListener('keydown', handleKeydown);

    // Load gallery data
    loadGalleryData();

    return () => {
      window.removeEventListener('resize', updatePerSlide);
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  async function loadGalleryData() {
    try {
      const res = await fetch(`${base}/data/gallery-exif-extracted.json`);
      const data = await res.json();
      images = data.images || [];
    } finally {
      loading = false;
    }
  }

  function openModal(imageId) {
    selectedImageId = imageId;
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
    selectedImageId = '';
  }

  function onSectionEnter() {
    currentSection.set('gallery');
    entered = true;
  }
</script>

<section
  id="gallery"
  data-section="gallery"
  class="relative bg-neutral-900 pt-16 md:pt-20 pb-20 md:pb-24"
  use:inView={{ threshold: 0.3, once: true }}
  on:enter={onSectionEnter}
  aria-label="Gallery section - Photography portfolio"
>
  {#if entered}
      <div
        in:fly={{ y: 32, duration: 700, opacity: 0.2 }}
        class="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8"
      >
      <div>
        <p class="text-violet-400 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">Photography</p>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">
          Visual Stories
        </h2>
        <p class="text-base md:text-lg text-white/70 max-w-4xl leading-relaxed mb-4">
          Action sports and urban landscapes captured through the lens
        </p>
      </div>

      {#if loading}
        <div class="flex items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400"></div>
          <span class="ml-4 text-white/60">Loading gallery...</span>
        </div>
      {:else if images.length === 0}
        <div class="text-white/60 text-center py-20">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">No images found.</p>
        </div>
      {:else}
        <div class="relative w-full">
          <!-- Navigation Arrows -->
          {#if slides.length > 1}
            <button
              on:click={handlePrev}
              disabled={index === 0}
              class="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full p-1.5 md:p-2 transition-all duration-200"
              aria-label="Previous images"
              class:scale-110={false}
              class:-translate-x-1={false}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
                <path d="M24 30L14 20L24 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button
              on:click={handleNext}
              disabled={index === slides.length - 1}
              class="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full p-1.5 md:p-2 transition-all duration-200"
              aria-label="Next images"
              class:scale-110={false}
              class:translate-x-1={false}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
                <path d="M16 30L26 20L16 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          {/if}

          <!-- Scroll container with snap -->
          <div
            bind:this={containerRef}
            on:scroll={handleScroll}
            class="overflow-x-auto no-scrollbar snap-x snap-mandatory w-full"
            style="scroll-behavior: smooth; scroll-snap-type: x proximity;"
            aria-roledescription="carousel"
            aria-label="Photography portfolio gallery"
          >
            <div class="flex w-full">
              {#each slides as group, slideIdx (slideIdx)}
                <div class="snap-start shrink-0 w-full px-4 flex justify-center">
                  <!-- Responsive grid: 1/2/3/4 columns -->
                  <div class={`grid gap-4 lg:gap-6 justify-center mx-auto grid-cols-${perSlide}`} style="max-width:1600px;">
                    {#each group as image, cardIdx (image.id)}
                      {@const globalIndex = slideIdx * perSlide + cardIdx}
                      {@const isVisible = slideIdx === index}

                      <div>
                        <button
                          class="relative group overflow-hidden rounded-xl shadow-lg bg-neutral-800 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full"
                          on:click={() => openModal(image.id)}
                          aria-label={`View ${image.alt || 'gallery image'}`}
                        >
                          <img
                            src={`${base}/images/gallery/${image.filename}`}
                            alt={image.alt || 'Gallery image'}
                            class="w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[64vh] xl:h-[68vh] 2xl:h-[72vh] object-cover group-hover:scale-110 transition-transform duration-500"
                            loading={slideIdx === 0 ? 'eager' : 'lazy'}
                            decoding="async"
                          />

                          <!-- Overlay with metadata -->
                          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                              {#if image.metadata?.camera}
                                <p class="text-sm font-medium">{image.metadata.camera}</p>
                              {/if}
                              {#if image.metadata?.dateTaken}
                                <p class="text-xs opacity-80">{new Date(image.metadata.dateTaken).toLocaleDateString()}</p>
                              {/if}
                              {#if image.metadata?.location}
                                <p class="text-xs opacity-80">{image.metadata.location}</p>
                              {/if}
                            </div>
                          </div>

                          <!-- Featured badge -->
                          {#if image.isFeatured}
                            <div class="absolute top-3 right-3 bg-violet-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                              Featured
                            </div>
                          {/if}
                        </button>
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Progress indicator dots -->
          {#if slides.length > 1}
            <div class="mt-3 md:mt-4 flex items-center justify-center gap-2">
              {#each slides as _, i}
                <button
                  on:click={() => scrollToIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  class="rounded-full transition-all duration-300 {i === index ? 'bg-violet-500' : 'bg-white/30 hover:bg-white/50'}"
                  style="width: {i === index ? '40px' : '10px'}; height: 10px;"
                ></button>
              {/each}
            </div>
          {/if}

          <!-- Slide counter -->
          {#if slides.length > 1}
            <div class="mt-2 text-center">
              <p class="text-sm text-white/60 font-mono">
                {index + 1} / {slides.length}
              </p>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <GalleryModal
      images={images}
      initialImageId={selectedImageId}
      isOpen={isModalOpen}
      on:close={closeModal}
    />
  {/if}
</section>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
