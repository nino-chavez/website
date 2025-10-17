<script>
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;

  const dispatch = createEventDispatcher();
  let modalContent;

  function onClose() {
    isOpen = false;
    dispatch('close');
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') onClose();
  }

  // Simple focus management: focus modal content when opened
  $: if (isOpen) {
    setTimeout(() => modalContent?.focus(), 0);
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <!-- Clickable overlay -->
    <div
      class="absolute inset-0 bg-black/80"
      role="button"
      aria-label="Close modal"
      tabindex="0"
      on:click={onClose}
      on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && onClose()}
    />

    <div
      bind:this={modalContent}
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-white/10 rounded-xl shadow-2xl outline-none"
      role="document"
      tabindex="-1"
    >
      <!-- Header -->
      <div class="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between z-10">
        <h2 id="modal-title" class="text-2xl md:text-3xl font-bold text-white">
          The Architect's Principle
        </h2>
        <button
          class="text-white/70 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          on:click={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 md:p-8 space-y-6 text-white/90">
        <div class="prose prose-invert max-w-none">
          <p class="text-lg leading-relaxed">
            Enterprise architecture isn't about choosing the right framework or following the latest trend. It's about understanding the constraints that matter and building systems that can evolve under pressure.
          </p>

          <h3 class="text-xl font-bold text-white mt-8 mb-4">Three Core Beliefs</h3>

          <div class="space-y-6">
            <div class="bg-white/5 border border-white/10 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-athletic-brand-violet mb-3">
                1. Revenue is the North Star
              </h4>
              <p class="leading-relaxed">
                Every architectural decision either enables revenue or creates friction. Order latency, inventory accuracy, checkout flow—these aren't technical metrics. They're revenue metrics. Good architecture makes money. Bad architecture loses it.
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-athletic-brand-cyan mb-3">
                2. Complexity is Inevitable, Chaos is Not
              </h4>
              <p class="leading-relaxed">
                Large systems are inherently complex. But complexity doesn't have to mean chaos. Clear boundaries, well-defined contracts, and disciplined data flows turn complexity into predictability. The goal isn't simplicity—it's clarity.
              </p>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-athletic-brand-green mb-3">
                3. Build for Change, Not Perfection
              </h4>
              <p class="leading-relaxed">
                The best architectures aren't the most elegant—they're the most adaptable. Markets shift. Requirements evolve. Teams change. Architecture that can't adapt is architecture that's already obsolete.
              </p>
            </div>
          </div>

          <h3 class="text-xl font-bold text-white mt-8 mb-4">The Practice</h3>
          <p class="leading-relaxed">
            I've applied this principle across Fortune 500 commerce platforms, AI governance frameworks, and real-time orchestration systems. The tools change. The platforms evolve. But the principle stays constant: understand the constraints, design for evolution, and never lose sight of what drives the business.
          </p>

          <p class="leading-relaxed mt-6">
            That's the architect's job. Not to build the perfect system—but to build the system that survives.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-neutral-900/95 backdrop-blur-sm border-t border-white/10 p-6 flex justify-end">
        <button
          class="px-6 py-3 bg-athletic-brand-violet hover:bg-violet-600 text-white font-semibold rounded-lg transition-colors"
          on:click={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}

