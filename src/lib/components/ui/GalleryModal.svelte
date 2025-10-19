<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { base } from '$app/paths';

  export let images = [];
  export let initialImageId = '';
  export let isOpen = false;

  const dispatch = createEventDispatcher();

  let currentIndex = 0;
  let isImageLoaded = false;
  let hasImageError = false;
  let modalElement;
  let imageElement;
  let exifOverlayVariant = 'modern'; // 'minimal' | 'classic' | 'modern' | 'instagram'

  const exifVariants = ['minimal', 'classic', 'modern', 'instagram'];

  $: if (isOpen && initialImageId) {
    currentIndex = images.findIndex(img => img.id === initialImageId) || 0;
    isImageLoaded = false;
    hasImageError = false;
  }

  $: currentImage = images[currentIndex];

  function close() {
    dispatch('close');
  }

  function goToPrevious() {
    if (currentIndex > 0) {
      currentIndex--;
      isImageLoaded = false;
      hasImageError = false;
    }
  }

  function goToNext() {
    if (currentIndex < images.length - 1) {
      currentIndex++;
      isImageLoaded = false;
      hasImageError = false;
    }
  }

  function handleKeydown(event) {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      case 'e':
      case 'E':
        cycleExifOverlay();
        break;
    }
  }

  function cycleExifOverlay() {
    const currentVariantIndex = exifVariants.indexOf(exifOverlayVariant);
    exifOverlayVariant = exifVariants[(currentVariantIndex + 1) % exifVariants.length];
  }

  function humanizeCamera(camera) {
    return camera.replace('ILCE-7M4', 'α7 IV')
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

  function handleImageLoad() {
    isImageLoaded = true;
  }

  function handleImageError() {
    hasImageError = true;
  }

  onMount(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  });

  // Focus modal when it opens for accessibility
  $: if (isOpen && modalElement) {
    // Defer to next tick so element is in DOM
    setTimeout(() => {
      try { modalElement.focus(); } catch {}
    }, 0);
  }
</script>

<div class="fixed inset-0 z-50" style="display: {isOpen ? 'block' : 'none'}">
  <button
    type="button"
    class="absolute inset-0 bg-black/90 backdrop-blur-sm"
    on:click={close}
    aria-label="Close image viewer"
  ></button>

  <div 
    class="relative z-10 w-full h-full flex items-center justify-center" 
    bind:this={modalElement} 
    role="dialog" 
    aria-modal="true" 
    aria-labelledby="gallery-modal-title" 
    tabindex="-1"
  >
    <h2 id="gallery-modal-title" class="sr-only">Gallery image viewer</h2>
    {#if isImageLoaded && currentImage?.metadata}
      <button
        class="absolute top-4 left-4 z-10 px-3 py-2 bg-black/60 backdrop-blur-sm text-white/70 hover:text-white rounded-lg text-sm font-medium transition-all duration-200 border border-white/10 hover:border-white/30"
        on:click|stopPropagation={cycleExifOverlay}
        aria-label="Cycle EXIF overlay views (press E)"
        title="Cycle EXIF overlay views (E key)"
      >
        EXIF: {exifOverlayVariant}
      </button>
    {/if}

    {#if currentIndex > 0}
      <button
        class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors"
        on:click|stopPropagation={goToPrevious}
        aria-label="Previous image"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    {/if}

    {#if currentIndex < images.length - 1}
      <button
        class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/70 hover:text-white transition-colors"
        on:click|stopPropagation={goToNext}
        aria-label="Next image"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    <div class="relative max-w-4xl max-h-screen p-4">
      {#if currentImage}
        <img
          bind:this={imageElement}
          src={`${base}/images/gallery/${currentImage.filename}`}
          alt={currentImage.alt || 'Gallery image'}
          class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          on:load={handleImageLoad}
          on:error={handleImageError}
        />

        {#if !isImageLoaded && !hasImageError}
          <div class="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded-lg">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        {/if}

        {#if hasImageError}
          <div class="absolute inset-0 flex items-center justify-center bg-neutral-800 rounded-lg">
            <div class="text-white/70 text-center">
              <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p>Failed to load image</p>
            </div>
          </div>
        {/if}

        {#if isImageLoaded && currentImage?.metadata}
          {#if exifOverlayVariant === 'minimal'}
            <div class="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md px-6 py-3 rounded-lg">
              <div class="flex items-center justify-between text-white text-sm font-mono">
                <div class="flex items-center gap-4">
                  <span class="font-semibold">{humanizeCamera(currentImage.metadata.camera)}</span>
                  <span class="text-white/60">•</span>
                  <span>{currentImage.metadata.lens}</span>
                </div>
                <div class="flex items-center gap-3 text-white/80">
                  <span>{currentImage.metadata.aperture}</span>
                  <span>{currentImage.metadata.shutterSpeed}</span>
                  <span>ISO {currentImage.metadata.iso}</span>
                  <span>{currentImage.metadata.focalLength}</span>
                </div>
              </div>
            </div>
          {:else if exifOverlayVariant === 'classic'}
            <div class="absolute bottom-4 left-4 right-4 bg-white text-black px-8 py-6 rounded-lg">
              <div class="grid grid-cols-2 gap-y-3 font-mono text-sm">
                <div class="col-span-2 flex items-center gap-3 pb-3 border-b border-black/10">
                  <div class="w-10 h-10 bg-black rounded flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div class="font-bold text-base">{humanizeCamera(currentImage.metadata.camera)}</div>
                    <div class="text-black/60 text-xs">{currentImage.metadata.lens}</div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div>
                    <div class="text-xs text-black/50 uppercase tracking-wider">Aperture</div>
                    <div class="font-semibold text-lg">{currentImage.metadata.aperture}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black/50 uppercase tracking-wider">ISO</div>
                    <div class="font-semibold text-lg">{currentImage.metadata.iso}</div>
                  </div>
                </div>
                <div class="space-y-2">
                  <div>
                    <div class="text-xs text-black/50 uppercase tracking-wider">Shutter</div>
                    <div class="font-semibold text-lg">{currentImage.metadata.shutterSpeed}</div>
                  </div>
                  <div>
                    <div class="text-xs text-black/50 uppercase tracking-wider">Focal</div>
                    <div class="font-semibold text-lg">{currentImage.metadata.focalLength}</div>
                  </div>
                </div>
                {#if currentImage.metadata.dateTaken || currentImage.metadata.location}
                  <div class="col-span-2 pt-3 border-t border-black/10 flex items-center gap-4 text-xs text-black/60">
                    {#if currentImage.metadata.dateTaken}
                      <span>{formatDate(currentImage.metadata.dateTaken)}</span>
                    {/if}
                    {#if currentImage.metadata.location}
                      {#if currentImage.metadata.dateTaken}
                        <span>•</span>
                      {/if}
                      <span>{currentImage.metadata.location}</span>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>
          {:else if exifOverlayVariant === 'modern'}
            <div class="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-6 px-8 rounded-lg">
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <div class="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="text-white font-bold text-base leading-tight">{humanizeCamera(currentImage.metadata.camera)}</div>
                    <div class="text-white/70 text-sm">{currentImage.metadata.lens}</div>
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Aperture</div>
                    <div class="text-white font-bold text-base font-mono">{currentImage.metadata.aperture}</div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Shutter</div>
                    <div class="text-white font-bold text-base font-mono">{currentImage.metadata.shutterSpeed}</div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">ISO</div>
                    <div class="text-white font-bold text-base font-mono">{currentImage.metadata.iso}</div>
                  </div>
                  <div class="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div class="text-white/50 text-xs uppercase tracking-wider mb-1">Focal</div>
                    <div class="text-white font-bold text-base font-mono">{currentImage.metadata.focalLength}</div>
                  </div>
                </div>
                {#if currentImage.metadata.dateTaken || currentImage.metadata.location}
                  <div class="flex items-center gap-3 text-xs text-white/50 font-mono">
                    {#if currentImage.metadata.dateTaken}
                      <div class="flex items-center gap-2">
                        <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
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
                          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                        </svg>
                        <span>{currentImage.metadata.location}</span>
                      </div>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>
          {:else if exifOverlayVariant === 'instagram'}
            <div class="absolute top-0 left-0 bottom-0 w-72 bg-gradient-to-r from-black/90 via-black/70 to-transparent backdrop-blur-md flex flex-col justify-between p-8">
              <div class="space-y-4">
                <div class="flex items-center gap-4 text-white">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <span class="text-2xl font-light tracking-wide">{currentImage.metadata.aperture}</span>
                </div>
                <div class="flex items-center gap-3 text-white">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span class="text-2xl font-light tracking-wide">{currentImage.metadata.shutterSpeed} sec</span>
                </div>
                <div class="flex items-center gap-3 text-white">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span class="text-2xl font-light tracking-wide">ISO {currentImage.metadata.iso}</span>
                </div>
                <div class="flex items-center gap-3 text-white">
                  <div class="w-8 h-8 flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                  <span class="text-2xl font-light tracking-wide">{currentImage.metadata.focalLength}</span>
                </div>
              </div>
              <div class="space-y-4 text-white">
                <div class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-semibold">{humanizeCamera(currentImage.metadata.camera)}</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="font-light">{currentImage.metadata.lens}</span>
                </div>
                <div class="h-px bg-white/20 my-3"></div>
                {#if currentImage.metadata.dateTaken}
                  <div class="flex items-center gap-2 text-sm font-light">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatDate(currentImage.metadata.dateTaken)}</span>
                  </div>
                {/if}
                {#if currentImage.metadata.location}
                  <div class="flex items-center gap-2 text-sm font-light">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{currentImage.metadata.location}</span>
                  </div>
                {/if}
              </div>
            </div>
          {/if}
        {/if}
      {/if}
    </div>

    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white/70 text-sm">
      {currentIndex + 1} / {images.length}
    </div>
  </div>
</div>

<style>
  /* Prevent body scroll when modal is open */
  :global(body:has(.modal-open)) {
    overflow: hidden;
  }
</style>