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
    ></div>

    <div
      bind:this={modalContent}
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-violet-500/20 rounded-xl shadow-2xl outline-none"
      role="document"
      tabindex="-1"
      style="background: linear-gradient(135deg, rgba(10, 10, 15, 0.95), rgba(30, 41, 59, 0.9)); backdrop-filter: blur(20px);"
    >
      <!-- Header -->
      <div class="sticky top-0 bg-neutral-900/95 backdrop-blur-sm border-b border-violet-500/20 p-6 flex items-center justify-between z-10" style="background: linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(30, 41, 59, 0.95));">
        <h2 id="modal-title" class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
          The Architect's Principle
        </h2>
        <button
          class="text-white/70 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-violet-500/10 border border-transparent hover:border-violet-500/30"
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
          <h2 class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent mb-6">
            The Architect's Principle: From Line Cook to Master Chef
          </h2>

          <div class="space-y-6">
            <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6">
              <p class="text-lg leading-relaxed text-white/80 mb-6">
                The AI industry has a systemic flaw: it is full of brilliant line cooks. We have tacticians executing disconnected recipes with incredible speed, optimizing for output without a coherent vision. The result is chaos—a kitchen that produces impressive but inconsistent dishes while burning through resources.
              </p>
              <p class="leading-relaxed text-white/80">
                This is not a tooling problem. It is a leadership problem. The solution is The Chef's Protocol: a constitutional framework that enforces architectural rigor across AI-assisted development. It distinguishes between AI-Augmented (efficiency gains on known patterns) and AI-Native (fundamentally new capabilities). The artifact is the system that ensures every AI interaction produces production-grade, maintainable code.
              </p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                1. Mastering the Fundamentals
              </h3>
              <p class="leading-relaxed text-white/80">
                Every great chef begins by mastering the fundamentals. They learn the discipline of a Michelin star kitchen—the non-negotiable standards, the importance of <em class="text-violet-400 underline decoration-violet-400/40">mise en place</em>, and how to execute a classic French mother sauce before attempting to deconstruct it. This is the foundation of traditional software architecture: mastering system design before trying to innovate.
              </p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                2. Architecting the System
              </h3>
              <p class="leading-relaxed text-white/80">
                The shift from cook to chef happens when the focus moves from executing a single dish to architecting the entire system. A successful restaurant is a <strong class="text-white font-semibold">high-agency environment</strong> designed to maximize <strong class="text-white font-semibold">signal</strong> (diner satisfaction) over <strong class="text-white font-semibold">noise</strong> (wasted motion, returned dishes).
              </p>
              <p class="leading-relaxed text-white/80">
                Resilience is a systems problem. A kitchen that collapses during the dinner rush has a systems failure, not an individual one. The Master Chef's primary role is to architect the system that produces consistently excellent dishes under pressure.
              </p>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                3. Sourcing the Ingredients
              </h3>
              <p class="leading-relaxed text-white/80 mb-4">
                With a robust system, the chef sources new, powerful ingredients to design the menu:
              </p>
              <ul class="space-y-3 ml-6">
                <li class="flex items-start">
                  <span class="text-violet-400 mr-2">•</span>
                  <span><strong class="text-white font-semibold">Large Language Models (LLMs)</strong> are the universal principles of flavor—the salt, fat, acid, and heat that form the foundation of all great cuisines.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-violet-400 mr-2">•</span>
                  <span><strong class="text-white font-semibold">Generative AI</strong> is the art of plating and presentation, transforming core ingredients into something visually arresting.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-violet-400 mr-2">•</span>
                  <span><strong class="text-white font-semibold">Agentic AI</strong> is molecular gastronomy—the experimental frontier that changes our fundamental understanding of what a dish can be.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-violet-400 mr-2">•</span>
                  <span><strong class="text-white font-semibold">Data-centric AI</strong> is the farm-to-table movement, a return to the foundational truth that the quality of the dish is always limited by the quality of the ingredients.</span>
                </li>
              </ul>
            </div>

            <div class="space-y-4">
              <h3 class="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                4. The Artifact: The Chef's Protocol
              </h3>
              <p class="leading-relaxed text-white/80">
                A philosophy is not a business model. This approach is codified into a tangible, operational framework: <strong class="text-white font-semibold">The Chef's Protocol.</strong>
              </p>
              <p class="leading-relaxed text-white/80 mb-6">
                It is a system for building AI-native products with rigor and taste. It distinguishes between two clear mandates:
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-6">
                  <h4 class="text-lg font-semibold text-violet-400 mb-3">Elevating the Classics (AI-Augmented)</h4>
                  <p class="leading-relaxed text-white/80">
                    Using a modern technique to perfect a well-understood dish, making it more efficient and refined.
                  </p>
                </div>
                <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
                  <h4 class="text-lg font-semibold text-cyan-400 mb-3">Deriving the Unique (AI-Native)</h4>
                  <p class="leading-relaxed text-white/80">
                    Using new ingredients to create dishes with no precedent, solving problems that were previously unsolvable.
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl p-6 mt-8">
              <p class="leading-relaxed text-white/80 font-medium">
                The protocol is the artifact of the Master Chef's work. It is not a recipe. It is the system that creates the menu, ensuring every action is a calculated, de-risked decision that moves us from chaos to clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-neutral-900/95 backdrop-blur-sm border-t border-violet-500/20 p-6 flex justify-end" style="background: linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(30, 41, 59, 0.95));">
        <button
          class="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          on:click={onClose}
          type="button"
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom scrollbar styling to match site design */
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.3) rgba(255, 255, 255, 0.05);
  }

  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
  }
</style>

