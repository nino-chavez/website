<script>
  import { onMount, onDestroy } from 'svelte';
  import { base } from '$app/paths';
  import { currentSection } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  import { fly } from 'svelte/transition';

  let images = [];
  let loading = true;
  let scrollContainer;
  let scrollProgress = 0;
  let rafId;
  let lightboxOpen = false;
  let currentImageIndex = 0;
  let exifOverlayVariant = 'off';
  let isImageLoaded = true;

  const exifVariants = ['sideview', 'overlay', 'off'];

  // Entry transition state
  let entered = false;

  // Drag-to-scroll variables
  let isDragging = false;
  let hasDragged = false;
  let startX = 0;
  let scrollLeft = 0;

  function openLightbox(index) {
    if (hasDragged) {
      hasDragged = false;
      return;
    }
    currentImageIndex = index;
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOpen = false;
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  }

  function cycleExifOverlay() {
    const currentVariantIndex = exifVariants.indexOf(exifOverlayVariant);
    exifOverlayVariant = exifVariants[(currentVariantIndex + 1) % exifVariants.length];
  }

  function humanizeCamera(camera) {
    return camera
      .replace('ILCE-7M4', 'α7 IV')
      .replace('ILCE-6100', 'α6100')
      .replace('SONY', 'Sony');
  }

  function formatDate(date) {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function handleKeydown(e) {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'e' || e.key === 'E') cycleExifOverlay();
  }

  // Drag-to-scroll handlers
  function handleMouseDown(e) {
    if (!scrollContainer) return;
    isDragging = true;
    hasDragged = false;
    startX = e.pageX - scrollContainer.offsetLeft;
    scrollLeft = scrollContainer.scrollLeft;
    scrollContainer.style.cursor = 'grabbing';
    scrollContainer.style.userSelect = 'none';
  }

  function handleMouseMove(e) {
    if (!isDragging || !scrollContainer) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;

    if (Math.abs(walk) > 5) {
      hasDragged = true;
    }

    scrollContainer.scrollLeft = scrollLeft - walk;
  }

  function handleMouseUp() {
    isDragging = false;
    if (scrollContainer) {
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.userSelect = '';
    }
    setTimeout(() => {
      hasDragged = false;
    }, 100);
  }

  function handleMouseLeave() {
    if (isDragging) {
      isDragging = false;
      if (scrollContainer) {
        scrollContainer.style.cursor = 'grab';
        scrollContainer.style.userSelect = '';
      }
    }
  }

  async function loadPortfolioData() {
    try {
      const res = await fetch(`${base}/data/gallery-exif-extracted.json`);
      const data = await res.json();
      images = data.images || [];
    } finally {
      loading = false;
    }
  }

  function damp(current, target, smoothing) {
    return current + (target - current) * smoothing;
  }

  function onSectionEnter() {
    currentSection.set('gallery');
    entered = true;
  }

  let targetScroll = 0;
  let currentScroll = 0;
  const smoothing = 0.1;
  let animationCleanup = null;

  function setupAnimation() {
    if (!scrollContainer) return;

    const handleScroll = () => {
      targetScroll = scrollContainer.scrollLeft;
    };

    const animate = () => {
      if (!scrollContainer) {
        if (rafId) cancelAnimationFrame(rafId);
        return;
      }

      currentScroll = damp(currentScroll, targetScroll, smoothing);

      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      scrollProgress = currentScroll / maxScroll;

      const imageElements = scrollContainer.querySelectorAll('.gallery-item');
      const containerWidth = scrollContainer.clientWidth;

      imageElements.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const viewportProgress =
          (rect.left + rect.width / 2 - containerWidth / 2) / (containerWidth / 2);

        const panAmount = -viewportProgress * 20;
        const distanceFromCenter = Math.abs(viewportProgress);
        const imageScale = 1.15 - distanceFromCenter * 0.05;
        const containerScale = 1.0 - distanceFromCenter * 0.1;
        const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.7);

        const img = item.querySelector('img');
        if (img) {
          img.style.transform = `scale(${imageScale}) translateX(${panAmount}%)`;
          img.style.opacity = `${opacity}`;
        }

        item.style.transform = `scale(${Math.max(0.85, containerScale)})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    animate();

    // Store cleanup function
    animationCleanup = () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }

  // Set up animation when scrollContainer becomes available
  $: if (scrollContainer && entered && !animationCleanup) {
    setupAnimation();
  }

  onMount(() => {
    loadPortfolioData();
  });

  onDestroy(() => {
    if (animationCleanup) {
      animationCleanup();
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<section
  id="gallery"
  data-section="gallery"
  class="relative bg-neutral-900 pt-16 md:pt-20 pb-20 md:pb-24"
  use:inView={{ threshold: 0.3, once: true }}
  on:enter={onSectionEnter}
  aria-label="Gallery section - Photography portfolio"
>
  {#if entered}
    <div in:fly={{ y: 32, duration: 700, opacity: 0.2 }} class="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">
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
          <span class="ml-4 text-white/60">Loading portfolio...</span>
        </div>
      {:else if images.length === 0}
        <div class="text-white/60 text-center py-20">
          <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-lg">No images found.</p>
        </div>
      {:else}
        <div
          class="scroll-container"
          bind:this={scrollContainer}
          on:mousedown={handleMouseDown}
          on:mousemove={handleMouseMove}
          on:mouseup={handleMouseUp}
          on:mouseleave={handleMouseLeave}
        >
          <div class="gallery-track">
            {#each images as image, index}
              <button class="gallery-item" on:click={() => openLightbox(index)}>
                <img
                  src={`${base}/images/gallery/${image.filename}`}
                  alt={image.alt || 'Gallery image'}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              </button>
            {/each}
          </div>
        </div>

        <div class="scroll-indicator">
          <div class="progress-bar" style="width: {scrollProgress * 100}%"></div>
        </div>
      {/if}
    </div>
  {/if}
</section>

{#if lightboxOpen}
  <div class="lightbox" on:click={closeLightbox}>
    <button class="lightbox-close" on:click={closeLightbox} aria-label="Close">×</button>

    <button class="lightbox-nav lightbox-prev" on:click|stopPropagation={prevImage} aria-label="Previous">
      ‹
    </button>
    <button class="lightbox-nav lightbox-next" on:click|stopPropagation={nextImage} aria-label="Next">
      ›
    </button>

    {#if isImageLoaded && images[currentImageIndex]?.metadata}
      <button
        class="exif-cycle-button"
        on:click|stopPropagation={cycleExifOverlay}
        aria-label="Cycle EXIF display: {exifOverlayVariant} (press E)"
        title="EXIF: {exifOverlayVariant} (press E to cycle)"
      >
        EXIF: {exifOverlayVariant}
      </button>
    {/if}

    <div class="lightbox-main" on:click|stopPropagation>
      <div class="image-container">
        <img
          src={`${base}/images/gallery/${images[currentImageIndex].filename}`}
          alt={images[currentImageIndex].alt || 'Portfolio image'}
        />

        {#if isImageLoaded && images[currentImageIndex]?.metadata && exifOverlayVariant !== 'off'}
          {@const currentImage = images[currentImageIndex]}

          {#if exifOverlayVariant === 'overlay'}
            <div class="exif-overlay">
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-white font-bold text-base leading-tight">
                      {humanizeCamera(currentImage.metadata.camera)}
                    </div>
                    <div class="text-white/70 text-sm">{currentImage.metadata.lens}</div>
                  </div>
                </div>

                <div class="grid grid-cols-4 gap-3">
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Aperture</div>
                    <div class="text-white font-bold text-base font-mono">
                      {currentImage.metadata.aperture}
                    </div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Shutter</div>
                    <div class="text-white font-bold text-base font-mono">
                      {currentImage.metadata.shutterSpeed}
                    </div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">ISO</div>
                    <div class="text-white font-bold text-base font-mono">{currentImage.metadata.iso}</div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Focal</div>
                    <div class="text-white font-bold text-base font-mono">
                      {currentImage.metadata.focalLength}
                    </div>
                  </div>
                </div>

                {#if currentImage.exif}
                  <div class="grid grid-cols-2 gap-3">
                    {#if currentImage.exif.whiteBalance}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">White Balance</div>
                        <div class="text-white/90 text-sm font-mono">{currentImage.exif.whiteBalance}</div>
                      </div>
                    {/if}
                    {#if currentImage.exif.exposureMode}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Exposure Mode</div>
                        <div class="text-white/90 text-sm font-mono">
                          {currentImage.exif.exposureMode.replace('Mode ', '')}
                        </div>
                      </div>
                    {/if}
                    {#if currentImage.exif.meteringMode}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Metering</div>
                        <div class="text-white/90 text-sm font-mono">
                          {currentImage.exif.meteringMode.replace('Mode ', '')}
                        </div>
                      </div>
                    {/if}
                    {#if currentImage.exif.flash}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Flash</div>
                        <div class="text-white/90 text-sm font-mono">
                          {currentImage.exif.flash.includes('did not fire') ? 'Off' : 'On'}
                        </div>
                      </div>
                    {/if}
                    {#if currentImage.exif.focalLength35mm}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">35mm Equiv</div>
                        <div class="text-white/90 text-sm font-mono">{currentImage.exif.focalLength35mm}mm</div>
                      </div>
                    {/if}
                    {#if currentImage.exif.colorSpace}
                      <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                        <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Color Space</div>
                        <div class="text-white/90 text-sm font-mono">{currentImage.exif.colorSpace}</div>
                      </div>
                    {/if}
                  </div>
                {/if}

                {#if currentImage.metadata.dateTaken || currentImage.metadata.location}
                  <div class="flex items-center gap-3 text-xs text-white/50 font-mono">
                    {#if currentImage.metadata.dateTaken}
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>{formatDate(currentImage.metadata.dateTaken)}</span>
                      </div>
                    {/if}
                    {#if currentImage.metadata.location}
                      {#if currentImage.metadata.dateTaken}
                        <span>•</span>
                      {/if}
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span>{currentImage.metadata.location}</span>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>
          {:else if exifOverlayVariant === 'sideview'}
            <div class="exif-sideview">
              <div class="mb-6 pb-4 border-b border-white/10">
                <div class="flex items-center gap-3 mb-2">
                  <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-white font-semibold text-sm">
                      {humanizeCamera(currentImage.metadata.camera)}
                    </div>
                    <div class="text-white/60 text-xs">{currentImage.metadata.lens}</div>
                  </div>
                </div>
              </div>

              <div class="space-y-3 mb-6">
                <div class="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Exposure</div>

                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center gap-2 text-white/60 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Aperture</span>
                  </div>
                  <span class="font-mono font-semibold">{currentImage.metadata.aperture}</span>
                </div>

                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center gap-2 text-white/60 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Shutter Speed</span>
                  </div>
                  <span class="font-mono font-semibold">{currentImage.metadata.shutterSpeed}</span>
                </div>

                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center gap-2 text-white/60 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span>ISO</span>
                  </div>
                  <span class="font-mono font-semibold">{currentImage.metadata.iso}</span>
                </div>

                <div class="flex items-center justify-between text-white">
                  <div class="flex items-center gap-2 text-white/60 text-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    <span>Focal Length</span>
                  </div>
                  <span class="font-mono font-semibold">{currentImage.metadata.focalLength}</span>
                </div>

                {#if currentImage.exif?.focalLength35mm}
                  <div class="flex items-center justify-between text-white">
                    <div class="text-white/60 text-sm pl-6">35mm Equivalent</div>
                    <span class="font-mono font-semibold">{currentImage.exif.focalLength35mm}mm</span>
                  </div>
                {/if}
              </div>

              {#if currentImage.exif}
                <div class="space-y-3 mb-6 pb-6 border-t border-white/10 pt-6">
                  <div class="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Advanced</div>

                  {#if currentImage.exif.exposureMode}
                    <div class="flex items-center justify-between text-white text-sm">
                      <span class="text-white/60">Exposure Mode</span>
                      <span class="font-mono">{currentImage.exif.exposureMode.replace('Mode ', '')}</span>
                    </div>
                  {/if}

                  {#if currentImage.exif.meteringMode}
                    <div class="flex items-center justify-between text-white text-sm">
                      <span class="text-white/60">Metering</span>
                      <span class="font-mono">{currentImage.exif.meteringMode.replace('Mode ', '')}</span>
                    </div>
                  {/if}

                  {#if currentImage.exif.whiteBalance}
                    <div class="flex items-center justify-between text-white text-sm">
                      <span class="text-white/60">White Balance</span>
                      <span class="font-mono">{currentImage.exif.whiteBalance}</span>
                    </div>
                  {/if}

                  {#if currentImage.exif.flash}
                    <div class="flex items-center justify-between text-white text-sm">
                      <span class="text-white/60">Flash</span>
                      <span class="font-mono">{currentImage.exif.flash.includes('did not fire') ? 'Off' : 'On'}</span>
                    </div>
                  {/if}

                  {#if currentImage.exif.colorSpace}
                    <div class="flex items-center justify-between text-white text-sm">
                      <span class="text-white/60">Color Space</span>
                      <span class="font-mono">{currentImage.exif.colorSpace}</span>
                    </div>
                  {/if}
                </div>
              {/if}

              {#if currentImage.metadata.dateTaken || currentImage.metadata.location}
                <div class="space-y-3 border-t border-white/10 pt-6 mt-auto">
                  <div class="text-white/40 text-xs uppercase tracking-wider font-semibold mb-3">Details</div>

                  {#if currentImage.metadata.dateTaken}
                    <div class="flex items-center gap-2 text-white text-sm">
                      <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span class="font-mono">{formatDate(currentImage.metadata.dateTaken)}</span>
                    </div>
                  {/if}

                  {#if currentImage.metadata.location}
                    <div class="flex items-center gap-2 text-white text-sm">
                      <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{currentImage.metadata.location}</span>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        {/if}
      </div>
    </div>

    <div class="lightbox-thumbs" on:click|stopPropagation>
      <div class="lightbox-thumbs-track">
        {#each images as image, index}
          <button
            class="lightbox-thumb"
            class:active={index === currentImageIndex}
            on:click={() => (currentImageIndex = index)}
          >
            <img src={`${base}/images/gallery/${image.filename}`} alt={`Thumbnail ${index + 1}`} />
          </button>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .scroll-container {
    flex: 1;
    overflow-x: scroll;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    cursor: grab;
    margin-top: 2rem;
    min-height: 75vh;
    height: auto;
  }

  .scroll-container:active {
    cursor: grabbing;
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .gallery-track {
    display: inline-flex;
    gap: 3vw;
    padding: 0 10vw;
    height: 100%;
    align-items: center;
    min-width: 100%;
  }

  .gallery-item {
    flex-shrink: 0;
    width: auto;
    height: 80vh;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    border-radius: 4px;
    transition: transform 0.3s ease;
    will-change: transform;
    border: none;
    padding: 0;
    background: none;
    cursor: pointer;
    position: relative;
  }

  .gallery-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
    pointer-events: none;
  }

  .gallery-item:hover::after {
    background: rgba(0, 0, 0, 0.1);
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease, opacity 0.4s ease;
    will-change: transform, opacity;
    pointer-events: none;
    user-select: none;
  }

  .scroll-indicator {
    position: relative;
    margin-top: 1rem;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
  }

  .progress-bar {
    height: 100%;
    background: rgba(139, 92, 246, 0.8);
    transition: width 0.1s linear;
  }

  /* Lightbox Styles */
  .lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.95);
    z-index: 10000;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lightbox-close {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 3rem;
    line-height: 1;
    cursor: pointer;
    z-index: 10002;
    padding: 0.5rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .lightbox-close:hover {
    opacity: 1;
  }

  .exif-cycle-button {
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    padding: 0.75rem 1rem;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(12px);
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .exif-cycle-button:hover {
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .lightbox-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #fff;
    font-size: 4rem;
    line-height: 1;
    cursor: pointer;
    z-index: 10002;
    padding: 2rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .lightbox-nav:hover {
    opacity: 1;
  }

  .lightbox-prev {
    left: 1rem;
  }

  .lightbox-next {
    right: 1rem;
  }

  .lightbox-main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 6rem;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-container img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    animation: scaleIn 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .lightbox-thumbs {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    padding: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 10001;
    scrollbar-width: none;
  }

  .lightbox-thumbs::-webkit-scrollbar {
    display: none;
  }

  .lightbox-thumbs-track {
    display: flex;
    gap: 0.5rem;
    height: 100%;
  }

  .lightbox-thumb {
    flex-shrink: 0;
    height: 100%;
    aspect-ratio: 2 / 3;
    background: none;
    border: 2px solid transparent;
    padding: 0;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s ease;
    border-radius: 4px;
    overflow: hidden;
  }

  .lightbox-thumb:hover {
    opacity: 0.8;
  }

  .lightbox-thumb.active {
    opacity: 1;
    border-color: #fff;
  }

  .lightbox-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* EXIF Overlay Styles */
  .exif-overlay {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.9) 60%,
      transparent 100%
    );
    padding: 3rem 2rem 1.5rem;
    border-radius: 0.5rem;
    max-height: 80vh;
    overflow-y: auto;
    animation: slideUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .exif-sideview {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20rem;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    overflow-y: auto;
    animation: slideInLeft 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (max-width: 768px) {
    .scroll-container {
      min-height: 60vh;
    }

    .gallery-item {
      height: 55vh;
      aspect-ratio: 2 / 3;
    }

    .gallery-track {
      gap: 5vw;
      padding: 0 5vw;
    }

    .lightbox-close {
      top: 1rem;
      right: 1rem;
      font-size: 2.5rem;
    }

    .exif-cycle-button {
      top: 0.75rem;
      left: 0.75rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
    }

    .lightbox-nav {
      font-size: 3rem;
      padding: 1rem;
    }

    .lightbox-main {
      bottom: 80px;
      padding: 1rem 2rem;
    }

    .lightbox-thumbs {
      height: 80px;
    }

    .exif-sideview {
      width: 16rem;
      padding: 1rem;
    }

    .exif-overlay {
      left: 0.75rem;
      right: 0.75rem;
      bottom: 0.75rem;
      padding: 2rem 1rem 1rem;
    }
  }
</style>
