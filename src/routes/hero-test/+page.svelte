<script lang="ts">
import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Hero Variations - Test Page</title>
</svelte:head>

<div class="bg-neutral-900 text-white">
  <div class="p-8 text-center border-b border-white/10">
    <h1 class="text-4xl font-bold mb-2">Hero Section Variations</h1>
    <p class="text-white/60">Compare layouts to choose your favorite</p>
  </div>

  <!-- Option 1: Split-Screen Layout -->
  <section class="relative min-h-screen border-b-8 border-violet-500">
    <div class="absolute top-4 left-4 z-50 bg-violet-500 text-white px-4 py-2 rounded-full text-sm font-bold">
      Option 1: Split-Screen
    </div>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Left Panel - Text -->
      <div class="lg:w-1/2 bg-neutral-950 flex items-center justify-center p-8 lg:p-16">
        <div class="max-w-xl">
          <div class="mb-6">
            <span class="inline-block px-4 py-2 bg-neutral-800 border border-white/10 rounded-full text-violet-300 text-sm font-semibold uppercase tracking-wider">
              Compound Learning
            </span>
          </div>

          <h1 class="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Nino Chavez
          </h1>

          <p class="text-2xl lg:text-3xl text-white mb-6 font-light">
            I see in systems. I capture in moments.
          </p>

          <p class="text-lg text-white/80 mb-8 leading-relaxed">
            You don't hire a title; you hire a perspective. Mine is forged in enterprise architecture, action photography, coaching, and engineering.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button class="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg">
              View My Work →
            </button>
            <button class="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg">
              View Portfolio
            </button>
          </div>
        </div>
      </div>

      <!-- Right Panel - Image -->
      <div class="lg:w-1/2 relative min-h-[400px] lg:min-h-screen">
        <img
          src={`${base}/images/hero.jpg`}
          alt=""
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-l from-transparent to-neutral-950/20"></div>
      </div>
    </div>
  </section>

  <!-- Option 2: Asymmetric Left-Aligned -->
  <section class="relative min-h-screen border-b-8 border-cyan-500 overflow-hidden">
    <div class="absolute top-4 left-4 z-50 bg-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold">
      Option 2: Asymmetric Left
    </div>

    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src={`${base}/images/hero.jpg`}
        alt=""
        class="w-full h-full object-cover opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center px-8 lg:px-16">
      <div class="max-w-2xl">
        <div class="mb-6">
          <span class="inline-block px-4 py-2 bg-neutral-800/90 backdrop-blur-sm border border-white/10 rounded-full text-violet-300 text-sm font-semibold uppercase tracking-wider">
            Compound Learning
          </span>
        </div>

        <h1 class="text-6xl lg:text-8xl font-black text-white mb-6 leading-tight">
          Nino<br/>Chavez
        </h1>

        <p class="text-2xl lg:text-4xl text-white mb-8 font-light" style="letter-spacing: -0.02em;">
          I see in systems.<br/>I capture in moments.
        </p>

        <div class="bg-neutral-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
          <p class="text-lg text-white/90 leading-relaxed mb-4">
            You don't hire a title; you hire a perspective. Mine is forged in enterprise architecture, action photography, coaching, and engineering.
          </p>
          <p class="text-base text-white/70 leading-relaxed">
            Each discipline reveals patterns the others couldn't see. AI has let me move at the speed of learning—and everything I learn compounds.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <button class="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg">
            View My Work →
          </button>
          <button class="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg backdrop-blur-sm">
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Option 3: Minimal Center with Typography Upgrade -->
  <section class="relative min-h-screen border-b-8 border-green-500 overflow-hidden">
    <div class="absolute top-4 left-4 z-50 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
      Option 3: Minimal Center
    </div>

    <!-- Background Image -->
    <div class="absolute inset-0">
      <img
        src={`${base}/images/hero.jpg`}
        alt=""
        class="w-full h-full object-cover opacity-35"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-900/80"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 min-h-screen flex items-center justify-center px-8 text-center">
      <div class="max-w-5xl">
        <div class="mb-8">
          <span class="inline-block px-4 py-2 bg-neutral-800/80 backdrop-blur-sm border border-white/10 rounded-full text-violet-300 text-sm font-semibold uppercase tracking-wider">
            Compound Learning
          </span>
        </div>

        <h1 class="text-7xl lg:text-9xl font-black text-white mb-8 leading-none" style="letter-spacing: -0.04em; font-family: 'SF Pro Display', system-ui, sans-serif;">
          Nino Chavez
        </h1>

        <p class="text-3xl lg:text-5xl text-white mb-12 font-light leading-tight" style="letter-spacing: -0.02em;">
          I see in systems. I capture in moments.
        </p>

        <p class="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          You don't hire a title; you hire a perspective—forged in architecture, photography, coaching, and engineering.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-10 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-2xl">
            View My Work →
          </button>
          <button class="px-10 py-5 bg-white/5 border border-white/20 text-white text-lg font-semibold rounded-lg backdrop-blur-sm">
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Option 4: Gradient Sidebar -->
  <section class="relative min-h-screen border-b-8 border-orange-500">
    <div class="absolute top-4 left-4 z-50 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
      Option 4: Gradient Sidebar
    </div>

    <div class="flex flex-col lg:flex-row min-h-screen">
      <!-- Left Gradient Sidebar -->
      <div class="lg:w-5/12 relative bg-gradient-to-br from-violet-900 via-purple-900 to-neutral-900 flex items-center justify-center p-8 lg:p-12">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.3),transparent_70%)]"></div>

        <div class="relative z-10 max-w-lg">
          <div class="mb-6">
            <span class="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-semibold uppercase tracking-wider">
              Compound Learning
            </span>
          </div>

          <h1 class="text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Nino<br/>Chavez
          </h1>

          <p class="text-2xl lg:text-3xl text-white mb-6 font-light leading-tight">
            I see in systems.<br/>I capture in moments.
          </p>

          <div class="space-y-4 mb-8">
            <p class="text-base text-white/90 leading-relaxed">
              You don't hire a title; you hire a perspective. Mine is forged in enterprise architecture, action photography, coaching, and engineering.
            </p>
            <p class="text-sm text-white/70 leading-relaxed">
              Each discipline reveals patterns the others couldn't see. AI has let me move at the speed of learning—and everything I learn compounds.
            </p>
          </div>

          <div class="flex flex-col gap-3">
            <button class="px-8 py-4 bg-white text-violet-900 font-semibold rounded-lg shadow-lg hover:bg-white/90">
              View My Work →
            </button>
            <button class="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg backdrop-blur-sm">
              View Portfolio
            </button>
          </div>
        </div>
      </div>

      <!-- Right Image Panel -->
      <div class="lg:w-7/12 relative min-h-[400px] lg:min-h-screen">
        <img
          src={`${base}/images/hero.jpg`}
          alt=""
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-neutral-900/30 to-transparent"></div>
      </div>
    </div>
  </section>

  <!-- Navigation Helper -->
  <div class="sticky bottom-0 bg-neutral-950 border-t border-white/10 p-4 text-center">
    <p class="text-white/60 text-sm">
      Scroll to compare all variations • <a href="/" class="text-violet-400 hover:text-violet-300">← Back to main site</a>
    </p>
  </div>
</div>