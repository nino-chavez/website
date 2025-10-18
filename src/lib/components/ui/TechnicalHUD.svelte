<script>
  import { currentSection } from '$lib/stores/gameFlow';

  export let onNavigate = (sectionId) => {};
  export let currentSectionValue = '';
  export let variant = 'header'; // 'header' | 'floating' | 'mobile'

  let hoveredSection = null;

  // Navigation sections with technical metadata
  const hudSections = [
    {
      id: 'hero',
      label: 'HOME',
      metric: 'Load Time: 0.8s',
      description: 'Portfolio entry point',
      ariaLabel: 'Frame shot at hero section - Portfolio entry point'
    },
    {
      id: 'focus',
      label: 'ABOUT',
      metric: 'Experience: 20+ Years',
      description: 'Professional background',
      ariaLabel: 'Frame shot at focus section - Professional background'
    },
    {
      id: 'frame',
      label: 'WORK',
      metric: 'Scale: Enterprise',
      description: 'Project portfolio',
      ariaLabel: 'Frame shot at frame section - Project portfolio'
    },
    {
      id: 'exposure',
      label: 'ESSAYS',
      metric: 'Focus: Technical',
      description: 'Articles & thoughts',
      ariaLabel: 'Frame shot at exposure section - Articles and thoughts'
    },
    {
      id: 'gallery',
      label: 'GALLERY',
      metric: 'Format: Professional',
      description: 'Photography portfolio',
      ariaLabel: 'Frame shot at gallery section - Photography portfolio'
    },
    {
      id: 'portfolio',
      label: 'CONTACT',
      metric: 'Status: Available',
      description: 'Get in touch',
      ariaLabel: 'Frame shot at portfolio section - Get in touch'
    }
  ];

  function handleSectionClick(sectionId) {
    onNavigate(sectionId);
  }

  function handleSectionHover(sectionId) {
    hoveredSection = sectionId;
  }

  function handleSectionLeave() {
    hoveredSection = null;
  }

  function handleKeyDown(event, sectionId) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSectionClick(sectionId);
    }
  }

  // Variant-specific styling
  $: variantClasses = {
    header: 'px-0 py-0',
    floating: 'px-4 py-4 rounded-lg bg-neutral-900/95 backdrop-blur-md border border-white/10',
    mobile: 'px-4 py-4 rounded-md bg-neutral-900/90'
  };

  $: itemClasses = {
    header: 'px-4 py-2 text-sm font-medium',
    floating: 'px-4 py-2 text-sm font-medium',
    mobile: 'px-4 py-4 text-base font-medium'
  };
</script>

<nav
  class="technical-hud {variantClasses[variant]}"
  aria-label="Camera viewfinder navigation for sections"
>
  <div
    class="flex items-center gap-1"
    class:flex-col={variant === 'mobile'}
    class:gap-2={variant === 'mobile'}
  >
    {#each hudSections as section (section.id)}
      {@const isHovered = section.id === hoveredSection}
      {@const isActive = section.id === currentSectionValue}

      <div class="relative">
        <button
          on:click={() => handleSectionClick(section.id)}
          on:keydown={(e) => handleKeyDown(e, section.id)}
          on:mouseenter={() => handleSectionHover(section.id)}
          on:mouseleave={handleSectionLeave}
          on:focus={() => handleSectionHover(section.id)}
          on:blur={handleSectionLeave}
          aria-current={isActive ? 'page' : undefined}
          class="relative font-mono text-xs tracking-wider transition-all duration-200 ease-out border rounded
                 {itemClasses[variant]}
                 {isActive
                   ? 'text-white bg-violet-500/15 border-violet-400/60 shadow-[0_0_20px_rgba(139,92,246,0.4),0_0_0_2px_rgba(139,92,246,0.3)]'
                   : isHovered
                   ? 'text-white bg-cyan-500/10 border-cyan-400/40 shadow-[0_0_16px_rgba(6,182,212,0.3),0_0_0_1px_rgba(6,182,212,0.2)] translate-x-0.5'
                   : 'text-white bg-transparent border-transparent hover:text-white hover:bg-white/5 hover:border-white/20 hover:translate-x-0.5'
                 }
                 active:scale-95 active:bg-white/10
                 focus:outline-none focus:ring-3 focus:ring-violet-500"
          style="min-width: {variant === 'mobile' ? '44px' : 'auto'}; min-height: {variant === 'mobile' ? '44px' : 'auto'};"
          aria-label={section.ariaLabel}
          title="Pan to {section.description}"
        >
          {section.label}
        </button>

        <!-- Technical hover overlay -->
        {#if isHovered && variant !== 'mobile'}
          <div
            class="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 glass-dark border border-cyan-400/30 rounded-lg px-4 py-2 pointer-events-none z-60 min-w-max whitespace-nowrap animate-fade-in-up"
            role="tooltip"
            style="backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(6, 182, 212, 0.3), 0 0 0 1px rgba(6, 182, 212, 0.2);"
          >
            <!-- Tooltip arrow pointing up -->
            <div
              class="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-neutral-900/95 border-l border-t border-cyan-400/30 rotate-45"
              aria-hidden="true"
            />

            <div class="text-xs font-mono text-orange-400 font-medium">
              {section.metric}
            </div>
            <div class="text-xs text-white/70 mt-1">
              {section.description}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</nav>

<style>
  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate(-50%, 10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }
</style>