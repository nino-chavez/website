<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let images = [];
  let loading = true;

  onMount(async () => {
    try {
      const res = await fetch(`${base}/data/gallery-exif-extracted.json`);
      const data = await res.json();
      images = data.images || [];
    } finally {
      loading = false;
    }
  });
</script>

<section id="gallery" aria-label="Gallery" class="relative py-20 bg-neutral-900">
  <div class="max-w-7xl mx-auto px-4 md:px-8">
    <h2 class="text-3xl md:text-5xl font-bold text-white mb-8 text-center">Gallery</h2>
    {#if loading}
      <div class="text-white/60 text-center py-12">Loading images…</div>
    {:else if images.length === 0}
      <div class="text-white/60 text-center py-12">No images found.</div>
    {:else}
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {#each images as img (img.id)}
          <figure class="relative group overflow-hidden rounded-lg shadow-lg bg-neutral-800">
            <img
              src={`${base}/images/gallery/${img.filename}`}
              alt={img.metadata?.camera ? `Photo taken with ${img.metadata.camera}` : 'Gallery image'}
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              decoding="async"
            />
            <figcaption class="absolute bottom-0 left-0 w-full bg-black/60 text-xs text-white px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {img.metadata?.dateTaken?.slice(0, 10)}
              {#if img.metadata?.camera}
                &nbsp;•&nbsp;{img.metadata.camera}
              {/if}
            </figcaption>
          </figure>
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  /* Responsive grid tweaks for mobile */
  @media (max-width: 640px) {
    .h-48 { height: 7.5rem; }
  }
</style>
