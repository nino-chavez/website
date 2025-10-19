<script>
  /**
   * Optimized Image Component
   * Provides automatic responsive images with proper dimensions to prevent CLS
   * 
   * @param {string} src - Image source path
   * @param {string} alt - Alt text for accessibility
   * @param {number} width - Intrinsic width of the image
   * @param {number} height - Intrinsic height of the image
   * @param {boolean} priority - Whether this is a priority image (LCP candidate)
   * @param {string} sizes - Responsive sizes attribute
   * @param {string} className - Additional CSS classes
   */
  export let src;
  export let alt;
  export let width;
  export let height;
  export let priority = false;
  export let sizes = '100vw';
  export let className = '';
  
  $: aspectRatio = height && width ? `${width} / ${height}` : 'auto';
</script>

<img
  {src}
  {alt}
  {width}
  {height}
  {sizes}
  loading={priority ? 'eager' : 'lazy'}
  decoding={priority ? 'sync' : 'async'}
  fetchpriority={priority ? 'high' : 'auto'}
  style="aspect-ratio: {aspectRatio};"
  class="w-full h-auto {className}"
/>

<style>
  img {
    /* Prevent layout shift with explicit aspect ratio */
    max-width: 100%;
    height: auto;
  }
</style>