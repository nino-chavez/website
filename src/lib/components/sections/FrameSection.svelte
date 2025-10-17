<script lang="ts">
  // FrameSection: Approach section
  export let setRef: (el: HTMLDivElement | null) => void = () => {};
</script>

<section bind:this={setRef} id="frame" data-section="frame" class="min-h-screen flex items-center justify-center bg-neutral-800">
  <div class="text-center px-6">
    <h2 class="text-4xl font-bold text-white">Frame Section</h2>
    <p class="text-white/70 mt-4">Approach - Coming soon...</p>
  </div>
</section>
