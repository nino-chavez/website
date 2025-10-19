<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  import TechnicalHUD from '$lib/components/ui/TechnicalHUD.svelte';
  import { currentSection } from '$lib/stores/gameFlow';

  export let onNavigate = (sectionId) => {};

  let isScrolled = false;
  let isInHeroSection = true;
  let showScoreboardNav = false;
  let menuToggleRef;
  let mobileMenuRef;

  // Handle scroll to update header state
  function handleScroll() {
    const scrollY = window.scrollY;
    isScrolled = scrollY > 50;

    // Check if we're in the hero section
    const heroHeight = window.innerHeight;
    isInHeroSection = scrollY < heroHeight * 0.7;
  }

  // Handle responsive nav state on window resize
  function handleResize() {
    const isMobile = window.innerWidth < 768;
    // Auto-collapse nav when resizing to mobile, auto-expand when resizing to desktop
    if (isMobile && showScoreboardNav) {
      showScoreboardNav = false;
    } else if (!isMobile && !showScoreboardNav) {
      showScoreboardNav = true;
    }
  }

  // Handle HUD navigation
  function handleHUDNavigate(sectionId) {
    onNavigate(sectionId);
    // Close mobile menu after navigation
    showScoreboardNav = false;
    // Restore focus to toggle button
    setTimeout(() => menuToggleRef?.focus(), 100);
  }

  // Handle mobile menu toggle
  function handleMenuToggle() {
    showScoreboardNav = !showScoreboardNav;
  }

  // Handle keyboard navigation for menu toggle
  function handleMenuToggleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMenuToggle();
    }
    if (event.key === 'Escape' && showScoreboardNav) {
      event.preventDefault();
      showScoreboardNav = false;
    }
  }

  // Scroll to section function
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onMount(() => {
    // Set initial nav state based on screen size
    showScoreboardNav = window.innerWidth >= 768;

    // Set initial scroll state
    handleScroll();

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    // Handle escape key to close mobile menu
    function handleEscape(event) {
      if (event.key === 'Escape' && showScoreboardNav) {
        event.preventDefault();
        showScoreboardNav = false;
        menuToggleRef?.focus();
      }
    }
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  });
</script>

<!-- Skip to main content link for accessibility -->
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-violet-600 focus:text-white focus:rounded-lg focus:shadow-lg"
>
  Skip to main content
</a>

<header
  class="fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-out pointer-events-none"
  style="
    background: {isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(0, 0, 0, 0.3)'};
    backdrop-filter: {isScrolled ? 'blur(12px)' : 'blur(8px)'};
    border-bottom: {isScrolled ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent'};
    box-shadow: {isScrolled ? '0 4px 16px rgba(139, 92, 246, 0.2)' : 'none'};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  "
>
  <div class="container mx-auto px-4 py-2 md:px-6 md:py-4 pointer-events-auto">
    <!-- Header content with logo and navigation -->
    <div class="flex justify-between items-center">
      <!-- Dynamic Logo/Name -->
      <button
        on:click={() => scrollToSection('hero')}
        class="transition-all duration-500 ease-out group relative flex items-center"
      >
        <!-- Logo Image - Visible in hero section -->
        <div
          class="transition-all duration-500 ease-out {isInHeroSection ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}"
          style="
            position: {isInHeroSection ? 'static' : 'absolute'};
            transform: {isInHeroSection ? 'translateX(0)' : 'translateX(-10px)'};
          "
        >
          <img
            src="{base}/brand/logo.png"
            alt="Nino Chavez Logo"
            class="w-10 h-10 transition-all duration-300 ease-out group-hover:scale-110 filter drop-shadow-lg rounded-full"
            style="filter: drop-shadow(0 4px 8px rgba(139, 92, 246, 0.3));"
          />
        </div>

        <!-- Name Text - Visible when scrolled past hero -->
        <div
          class="text-2xl font-bold tracking-wider transition-all duration-500 ease-out {!isInHeroSection ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}"
          style="
            background: linear-gradient(135deg, #ffffff 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
            position: {!isInHeroSection ? 'static' : 'absolute'};
            transform: {!isInHeroSection ? 'translateX(0)' : 'translateX(10px)'};
          "
        >
          <span class="group-hover:scale-105 inline-block transition-transform duration-200">
            NINO CHAVEZ
          </span>
        </div>

        <!-- Hover underline -->
        <div
          class="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300"
          style="background: linear-gradient(90deg, #f97316 0%, #8b5cf6 100%);"
        />
      </button>

      <!-- Technical HUD Navigation -->
      <div class="flex items-center gap-6">
        <!-- Desktop HUD -->
        <div class="hidden md:block">
          <TechnicalHUD
            onNavigate={handleHUDNavigate}
            currentSectionValue={$currentSection}
            variant="header"
          />
        </div>
      </div>
    </div>

    <!-- Mobile navigation toggle -->
    <div class="md:hidden mt-1 flex justify-center">
      <button
        bind:this={menuToggleRef}
        on:click={handleMenuToggle}
        on:keydown={handleMenuToggleKeyDown}
        aria-label={showScoreboardNav ? "Close camera viewfinder navigation" : "Open camera viewfinder to frame navigation"}
        aria-expanded={showScoreboardNav}
        aria-controls="mobile-navigation-menu"
        class="text-white hover:text-white transition-all duration-200 ease-out text-xs font-mono tracking-wider px-3 py-2 rounded-lg border-2 focus:outline-none focus:ring-3 focus:ring-violet-500"
        style="
          background: {showScoreboardNav ? 'rgba(139, 92, 246, 0.15)' : 'rgba(15, 23, 42, 0.9)'};
          backdrop-filter: blur(8px);
          border-color: {showScoreboardNav ? 'rgba(139, 92, 246, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
          box-shadow: {showScoreboardNav ? '0 0 0 2px rgba(139, 92, 246, 0.3)' : 'none'};
          min-width: 44px;
          min-height: 44px;
        "
        title={showScoreboardNav ? "Close viewfinder" : "Open viewfinder to pan through navigation frames"}
      >
        {showScoreboardNav ? 'CLOSE VIEWFINDER' : 'OPEN VIEWFINDER'}
      </button>
    </div>

    <!-- Mobile technical HUD -->
    {#if showScoreboardNav}
      <nav
        bind:this={mobileMenuRef}
        id="mobile-navigation-menu"
        class="md:hidden mt-2 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300"
        aria-label="Camera viewfinder navigation"
      >
        <div class="flex justify-center">
          <TechnicalHUD
            onNavigate={handleHUDNavigate}
            currentSectionValue={$currentSection}
            variant="mobile"
          />
        </div>
      </nav>
    {/if}
  </div>
</header>

<style>
  .slide-in-from-top-2 {
    animation: slideDown 300ms ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>