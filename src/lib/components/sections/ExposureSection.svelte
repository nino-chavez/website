<script lang="ts">
  // ExposureSection: Experience section
  export let setRef: (el: HTMLDivElement | null) => void = () => {};
</script>

<section bind:this={setRef} id="exposure" data-section="exposure" class="min-h-screen flex items-center justify-center bg-neutral-900">
  <div class="text-center px-6">
    <h2 class="text-4xl font-bold text-white">Exposure Section</h2>
    <p class="text-white/70 mt-4">Experience - Coming soon...</p>
  </div>
</section>
