<script>
  import { currentSection } from '$lib/stores/gameFlow';

  export let className = '';

  const currentYear = new Date().getFullYear();

  // External site links
  const siteLinks = [
    { href: 'https://photography.ninochavez.co', label: 'Photography' },
    { href: 'https://blog.ninochavez.co', label: 'Blog' },
    { href: 'https://signalx.studio', label: 'Signal-X-Studio' },
    { href: 'https://letspepper.com', label: 'LetsPepper' }
  ];

  // Social links
  const socialLinks = [
    {
      href: 'https://www.linkedin.com/in/nino-chavez/',
      label: 'LinkedIn',
      icon: 'linkedin'
    },
    {
      href: 'https://github.com/nino-chavez',
      label: 'GitHub',
      icon: 'github'
    },
    {
      href: 'https://www.instagram.com/nino.chavez.photo/',
      label: 'Instagram',
      icon: 'instagram'
    },
    {
      href: 'mailto:hello@ninochavez.co',
      label: 'Email',
      icon: 'email'
    }
  ];

  // Get social icon SVG
  function getSocialIcon(icon) {
    switch (icon) {
      case 'linkedin':
        return `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>`;
      case 'github':
        return `<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>`;
      case 'instagram':
        return `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>`;
      case 'email':
        return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`;
      default:
        return '';
    }
  }
</script>

<footer class={`relative py-20 px-6 bg-neutral-900 border-t border-white/5 ${className}`}>
  <div class="max-w-7xl mx-auto">

    <!-- Main footer content -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">

      <!-- Brand section - takes more space -->
      <div class="lg:col-span-5">
        <div class="mb-8">
          <h3 class="text-3xl font-black text-white mb-4 tracking-tight">Nino Chavez</h3>
          <p class="text-white/50 text-base leading-relaxed max-w-md">
            Enterprise architect building AI-native commerce platforms. 25 years transforming complex systems into scalable infrastructure that processes billions.
          </p>
        </div>

        <!-- Social links -->
        <div class="flex gap-3">
          {#each socialLinks as link}
            <a
              href={link.href}
              target={link.icon !== 'email' ? '_blank' : null}
              rel={link.icon !== 'email' ? 'noopener noreferrer' : null}
              class="w-11 h-11 bg-white/5 hover:bg-violet-600/20 border border-white/10 hover:border-violet-400/30 rounded-xl flex items-center justify-center transition-all duration-300 group"
              aria-label={link.label}
            >
              <svg
                class="w-5 h-5 text-white/50 group-hover:text-violet-400 transition-colors duration-300"
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

      <!-- Navigation columns -->
      <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        <!-- Explore -->
        <div>
          <h4 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Explore</h4>
          <nav class="space-y-3">
            {#each siteLinks as link}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                class="group block text-white/60 hover:text-white transition-colors duration-200 text-sm"
              >
                <span class="inline-flex items-center gap-2">
                  {link.label}
                  <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </a>
            {/each}
          </nav>
        </div>

        <!-- Expertise -->
        <div>
          <h4 class="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Expertise</h4>
          <div class="space-y-3 text-sm text-white/50">
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Enterprise Commerce Architecture</span>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>AI-Native Platform Development</span>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Legacy System Modernization</span>
            </div>
            <div class="flex items-start gap-2">
              <svg class="w-4 h-4 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Strategic Technical Advisory</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom section -->
    <div class="pt-8 border-t border-white/5">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="text-white/30 text-xs">
          &copy; {currentYear} Nino Chavez. Built with precision.
        </div>

        <div class="flex items-center gap-4 text-xs text-white/30">
          <span class="hover:text-white/50 transition-colors">SvelteKit</span>
          <span class="text-white/20">•</span>
          <span class="hover:text-white/50 transition-colors">Tailwind CSS</span>
          <span class="text-white/20">•</span>
          <span class="hover:text-white/50 transition-colors">Vercel</span>
        </div>
      </div>
    </div>
  </div>
</footer>

<style>
  /* Additional custom styles if needed */
</style>
