<script>
  import { currentSection, setSection } from '$lib/stores/gameFlow';

  // Define the sections in order
  const sections = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'focus', label: 'About', icon: '🎯' },
    { id: 'frame', label: 'Approach', icon: '📐' },
    { id: 'exposure', label: 'Experience', icon: '📷' },
    { id: 'gallery', label: 'Gallery', icon: '🎨' },
    { id: 'portfolio', label: 'Work', icon: '💼' }
  ];

  // Get current section index
  $: currentIndex = sections.findIndex(s => s.id === $currentSection);

  function navigateToSection(sectionId) {
    setSection(sectionId);
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<nav class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
  <div class="bg-black/80 backdrop-blur-lg border border-white/10 rounded-full px-6 py-3 shadow-2xl">
    <div class="flex items-center space-x-6">
      {#each sections as section, index}
        <button
          on:click={() => navigateToSection(section.id)}
          class="flex flex-col items-center space-y-1 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-lg p-2 {index === currentIndex ? 'text-violet-400' : 'text-white/70'} {index <= currentIndex ? 'opacity-100' : 'opacity-50'}"
        >
          <span class="text-lg">{section.icon}</span>
          <span class="text-xs font-medium">{section.label}</span>
          {#if index === currentIndex}
            <div class="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
          {:else if index < currentIndex}
            <div class="w-2 h-2 bg-violet-400/60 rounded-full"></div>
          {:else}
            <div class="w-2 h-2 bg-white/20 rounded-full"></div>
          {/if}
        </button>
      {/each}
    </div>

    <!-- Progress bar -->
    <div class="mt-3 w-full bg-white/10 rounded-full h-1">
      <div
        class="bg-gradient-to-r from-violet-400 to-violet-600 h-1 rounded-full transition-all duration-500"
        style="width: {((currentIndex + 1) / sections.length) * 100}%"
      ></div>
    </div>
  </div>
</nav>