<script>
  import { currentSection } from '$lib/stores/gameFlow';

  export let className = '';

  const currentYear = new Date().getFullYear();

  // Navigation links
  const navLinks = [
    { href: '#hero', label: 'Home', section: 'hero' },
    { href: '#thesis', label: 'Thesis', section: 'thesis' },
    { href: '#frame', label: 'Work', section: 'frame' },
    { href: '#gallery', label: 'Gallery', section: 'gallery' },
    { href: '#portfolio', label: 'Contact', section: 'portfolio' }
  ];

  // Social links
  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/nino-chavez/',
      label: 'LinkedIn',
      icon: 'linkedin'
    },
    {
      href: 'https://github.com/ninochavez',
      label: 'GitHub',
      icon: 'github'
    },
    {
      href: 'mailto:nino@signalx.studio',
      label: 'Email',
      icon: 'email'
    }
  ];

  // Smooth scroll to section
  function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      currentSection.set(sectionId);
    }
  }

  // Get social icon SVG
  function getSocialIcon(icon) {
    switch (icon) {
      case 'linkedin':
        return `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>`;
      case 'github':
        return `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`;
      case 'email':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`;
      default:
        return '';
    }
  }
</script>

<footer class={`py-16 px-6 bg-neutral-900 border-t border-white/10 ${className}`}>
  <div class="max-w-7xl mx-auto">

    <!-- Main footer content -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

      <!-- Brand section -->
      <div class="md:col-span-1">
        <div class="mb-6">
          <h3 class="text-2xl font-bold text-white mb-2">Nino Chavez</h3>
          <p class="text-white/60 text-sm leading-relaxed">
            Enterprise Architect & AI Systems Builder.<br>
            Transforming complex systems into scalable solutions.
          </p>
        </div>

        <!-- Social links -->
        <div class="flex gap-4">
          {#each socialLinks as link}
            <a
              href={link.href}
              target={link.icon !== 'email' ? '_blank' : null}
              rel={link.icon !== 'email' ? 'noopener noreferrer' : null}
              class="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg flex items-center justify-center transition-all duration-300 group"
              aria-label={link.label}
            >
              <svg
                class="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300"
                fill={link.icon === 'email' ? 'none' : 'currentColor'}
                stroke={link.icon === 'email' ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
              >
                {@html getSocialIcon(link.icon)}
              </svg>
            </a>
          {/each}
        </div>
      </div>

      <!-- Navigation -->
      <div class="md:col-span-1">
        <h4 class="text-lg font-semibold text-white mb-6">Navigate</h4>
        <nav class="space-y-3">
          {#each navLinks as link}
            <button
              on:click={() => scrollToSection(link.section)}
              class="block text-white/60 hover:text-white transition-colors duration-300 text-left hover:translate-x-1 transform"
            >
              {link.label}
            </button>
          {/each}
        </nav>
      </div>

      <!-- Contact info -->
      <div class="md:col-span-1">
        <h4 class="text-lg font-semibold text-white mb-6">Connect</h4>
        <div class="space-y-4">
          <div>
            <div class="text-white/60 text-sm uppercase tracking-wider mb-1">Email</div>
            <a
              href="mailto:nino@signalx.studio"
              class="text-white hover:text-violet-400 transition-colors duration-300"
            >
              nino@signalx.studio
            </a>
          </div>
          <div>
            <div class="text-white/60 text-sm uppercase tracking-wider mb-1">Location</div>
            <div class="text-white">San Francisco Bay Area</div>
          </div>
          <div>
            <div class="text-white/60 text-sm uppercase tracking-wider mb-1">Availability</div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              <span class="text-white">Available for projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom section -->
    <div class="pt-8 border-t border-white/10">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-white/60 text-sm">
          &copy; {currentYear} Nino Chavez. All rights reserved.
        </div>

        <div class="flex items-center gap-6 text-sm text-white/60">
          <span>Built with SvelteKit & Tailwind CSS</span>
          <span class="text-white/30">•</span>
          <span>Hosted on Vercel</span>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Additional custom styles if needed */
</style>
