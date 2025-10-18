<script>
  import { onMount } from 'svelte';
  import { currentSection, setSection } from '$lib/stores/gameFlow';

  // Define sections in order
  const sections = ['hero', 'focus', 'frame', 'exposure', 'gallery', 'portfolio'];

  onMount(() => {
    let ticking = false;

    function updateCurrentSection() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find which section is currently most visible
      let currentSectionId = 'hero';
      let maxVisibility = 0;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = rect.bottom + scrollY;

          // Calculate how much of the section is visible
          const visibleTop = Math.max(scrollY, elementTop);
          const visibleBottom = Math.min(scrollY + windowHeight, elementBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const visibility = visibleHeight / rect.height;

          if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentSectionId = sectionId;
          }
        }
      }

      // Only update if section changed
      currentSection.update(current => {
        if (current !== currentSectionId) {
          return currentSectionId;
        }
        return current;
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateCurrentSection);
        ticking = true;
      }
    }

    // Initial check
    updateCurrentSection();

    // Listen for scroll events
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });
</script>