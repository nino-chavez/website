# Project Structure

Last Updated: 2025-10-17

## Overview

This document describes the organization of Nino Chavez's SvelteKit portfolio website, following modern SvelteKit conventions and best practices for production-grade web applications.

## Directory Structure

```text
portfolio-sveltekit/
├── .svelte-kit/           # SvelteKit build output (gitignored)
├── docs/                  # Project documentation
│   ├── developer/        # Developer reference and guides
│   └── components/       # Component documentation
├── e2e/                   # End-to-end tests (Playwright)
│   ├── audit/            # Performance and accessibility audits
│   │   ├── accessibility-axe.spec.ts
│   │   ├── performance-metrics.spec.ts
│   │   ├── AGENCY_AUDIT_V2_REPORT.md
│   │   └── AGENCY_AUDIT_V2.sveltekit.md
│   └── visual/           # Visual regression tests
│       └── hero-and-focus.spec.ts
├── playwright-report/     # Playwright test reports
├── src/                   # ⭐ Main source directory
│   ├── lib/              # Shared library code
│   │   ├── actions/      # Svelte actions
│   │   │   └── inView.ts # IntersectionObserver action
│   │   ├── components/   # Svelte components (domain-organized)
│   │   │   ├── sections/ # Page sections
│   │   │   │   ├── HeroSection.svelte
│   │   │   │   ├── FocusSection.svelte
│   │   │   │   ├── FrameSection.svelte
│   │   │   │   ├── ExposureSection.svelte
│   │   │   │   ├── GallerySection.svelte
│   │   │   │   └── PortfolioSection.svelte
│   │   │   ├── ui/       # Reusable UI components
│   │   │   │   ├── Footer.svelte
│   │   │   │   ├── Header.svelte
│   │   │   │   └── ProjectCard.svelte
│   │   │   └── util/     # Utility components
│   │   │       └── Lazy.svelte # Lazy hydration wrapper
│   │   └── stores/       # Svelte stores
│   │       └── gameFlow.ts # Navigation/section state
│   ├── routes/           # SvelteKit routes (file-based)
│   │   ├── +layout.svelte # Root layout
│   │   ├── +layout.ts     # Layout load function
│   │   └── +page.svelte   # Landing page
│   ├── styles/           # Global styles
│   │   ├── globals.css
│   │   └── globals.purged.css
│   ├── app.css           # Tailwind directives
│   ├── app.d.ts          # TypeScript ambient declarations
│   ├── app.html          # HTML template
│   ├── constants.ts      # Application constants
│   ├── hooks.server.ts   # Server-side hooks
│   └── types.ts          # TypeScript type definitions
├── static/               # ⭐ Static assets (served as-is)
│   ├── images/          # Image assets
│   │   ├── hero.jpg
│   │   ├── hero.webp
│   │   ├── hero-mobile.webp
│   │   └── gallery/     # Gallery images
│   ├── brand/           # Brand assets
│   ├── data/            # Static data files
│   └── robots.txt       # SEO robots file
├── test-results/         # Test artifacts and reports
│   ├── lighthouse-report.report.html
│   ├── lighthouse-report.report.json
│   ├── lighthouse-report.after.report.html
│   └── lighthouse-report.after.report.json
├── AGENTS.md            # AI agent collaboration guide
├── jsconfig.json        # JavaScript configuration (TypeScript via JSDoc)
├── package.json         # Dependencies and scripts
├── playwright.config.ts # Playwright configuration
├── pnpm-lock.yaml       # pnpm lock file
├── postcss.config.cjs   # PostCSS configuration
├── README.md            # Project README
├── svelte.config.js     # SvelteKit configuration
├── tailwind.config.cjs  # Tailwind CSS configuration
├── vercel.json          # Vercel deployment config
└── vite.config.js       # Vite build configuration
```

## Source Organization

### SvelteKit Routes (`src/routes/`)

SvelteKit uses **file-based routing** where the file structure determines the URL structure:

- **`+page.svelte`** - Page component (rendered at route)
- **`+layout.svelte`** - Layout wrapper (wraps pages)
- **`+layout.ts`** - Layout load function (server/client data loading)
- **`+page.ts`** - Page load function (server/client data loading)
- **`+server.ts`** - API endpoint (server-only)

**Current Routes:**
- `/` - Landing page (`+page.svelte`)
  - Composed of all section components
  - Lazy-loads below-the-fold sections

### Component Organization (`src/lib/components/`)

Components are organized by domain/purpose:

#### **sections/** - Page Sections

Photography workflow-inspired sections:

- **`HeroSection.svelte`** - Hero/capture interface
  - Responsive hero image with `<picture>`
  - Mouse-tracking spotlight effect
  - CTA buttons with smooth scroll
  - Eagerly loaded (above-the-fold)

- **`FocusSection.svelte`** - About/professional background
- **`FrameSection.svelte`** - Project showcase
- **`ExposureSection.svelte`** - Technical insights
- **`GallerySection.svelte`** - Photography portfolio
- **`PortfolioSection.svelte`** - Contact/connection

All sections except Hero are **lazy-loaded** via `Lazy.svelte` wrapper.

#### **ui/** - Reusable UI Components

- **`Header.svelte`** - Navigation header
- **`Footer.svelte`** - Site footer
- **`ProjectCard.svelte`** - Project display card

#### **util/** - Utility Components

- **`Lazy.svelte`** - Lazy hydration wrapper
  - Uses IntersectionObserver for visibility detection
  - Defers component loading until visible/idle/onload
  - Forwards props via `$$restProps`

### Actions (`src/lib/actions/`)

Svelte actions provide reusable DOM enhancements:

- **`inView.ts`** - IntersectionObserver action
  - Dispatches `enter` event when element enters viewport
  - Supports threshold and once options
  - Used for scroll-triggered animations

**Usage:**
```svelte
<section
  use:inView={{ threshold: 0.3, once: true }}
  on:enter={handleEnter}
>
```

### Stores (`src/lib/stores/`)

Svelte stores manage reactive global state:

- **`gameFlow.ts`** - Navigation and section state
  - `currentSection` - Active section ID
  - `reducedMotion` - User motion preference

**Usage:**
```svelte
<script>
  import { currentSection } from '$lib/stores/gameFlow';
  
  // Read
  console.log($currentSection);
  
  // Write
  currentSection.set('hero');
</script>
```

### Styles (`src/styles/`)

- **`globals.css`** - Global styles and utility classes
- **`globals.purged.css`** - Production-optimized (purged) CSS
- **`app.css`** - Tailwind directives and custom CSS

### Static Assets (`static/`)

Files in `static/` are served as-is at the root URL:

- `static/images/hero.jpg` → `/images/hero.jpg`
- `static/robots.txt` → `/robots.txt`

**Image Assets:**
- **Hero images** - Multiple formats/sizes for responsive loading
  - `hero.jpg` - JPEG fallback (1920x1280)
  - `hero.webp` - WebP desktop (1920x1280)
  - `hero-mobile.webp` - WebP mobile (800x533)
- **Gallery** - Photography portfolio images

## Configuration Files

### `svelte.config.js`

SvelteKit configuration:
- Adapter: `@sveltejs/adapter-vercel`
- Preprocessors: Vite plugin
- Kit options: Paths, aliases

### `vite.config.js`

Vite build configuration:
- Plugins: SvelteKit
- Build options: Minification, sourcemaps
- Server options: Port, host

### `tailwind.config.cjs`

Tailwind CSS configuration:
- Content paths for purging
- Custom theme extensions
- Plugins and variants

### `playwright.config.ts`

Playwright test configuration:
- Projects: Chromium, Firefox, WebKit
- Test directories
- Reporter configuration

### `vercel.json`

Vercel deployment configuration:
- Cache headers for static assets
- Build settings
- Environment variables

## Development Patterns

### Component Structure

Svelte components follow a consistent structure:

```svelte
<script>
  // 1. Imports
  import { onMount } from 'svelte';
  import { myStore } from '$lib/stores/myStore';
  
  // 2. Props (exported variables)
  export let className = '';
  export let title;
  
  // 3. Local state
  let mounted = false;
  
  // 4. Reactive statements
  $: computedValue = $myStore * 2;
  
  // 5. Functions
  function handleClick() {
    // ...
  }
  
  // 6. Lifecycle
  onMount(() => {
    mounted = true;
  });
</script>

<!-- 7. Markup -->
<div class={className}>
  {#if mounted}
    <h1>{title}</h1>
    <p>{computedValue}</p>
  {/if}
</div>

<!-- 8. Styles (scoped by default) -->
<style>
  div {
    padding: 1rem;
  }
</style>
```

### Lazy Loading Pattern

Below-the-fold sections use dynamic imports:

```svelte
<!-- src/routes/+page.svelte -->
<script>
  import Lazy from '$lib/components/util/Lazy.svelte';
  import HeroSection from '$lib/components/sections/HeroSection.svelte';
  
  const FocusLoader = () => import('$lib/components/sections/FocusSection.svelte');
  const FrameLoader = () => import('$lib/components/sections/FrameSection.svelte');
</script>

<!-- Eager (above-the-fold) -->
<HeroSection />

<!-- Lazy (below-the-fold) -->
<Lazy component={FocusLoader} />
<Lazy component={FrameLoader} />
```

### Navigation Pattern

Sections register themselves on viewport entry:

```svelte
<script>
  import { currentSection } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  
  function onSectionEnter() {
    currentSection.set('hero');
  }
</script>

<section
  id="hero"
  data-section="hero"
  use:inView={{ threshold: 0.3, once: true }}
  on:enter={onSectionEnter}
>
  <!-- Content -->
</section>
```

## Testing Structure

### E2E Tests (`e2e/`)

**Audit Tests:**
- `accessibility-axe.spec.ts` - axe-core accessibility scans
- `performance-metrics.spec.ts` - Lighthouse performance audits
- `smoke.spec.ts` - Basic smoke tests

**Visual Tests:**
- `hero-and-focus.spec.ts` - Visual regression for hero and focus sections

### Test Artifacts (`test-results/`)

Lighthouse reports stored as HTML and JSON for analysis:
- Before optimization baseline
- After optimization comparison

## Build Output

### `.svelte-kit/`

Generated during development and build (gitignored):
- `output/` - Production build artifacts
  - `client/` - Client-side JavaScript and CSS
  - `server/` - Server-side rendering code
- `types/` - Generated TypeScript definitions

### Production Build

```bash
pnpm build
```

Creates optimized production build:
- Pre-rendered static pages
- Code-split JavaScript bundles
- Minified CSS
- Optimized assets

## Key Architectural Decisions

### 1. Lazy Hydration

**Why:** Reduce initial JavaScript payload and improve FCP/TBT.

**How:** Custom `Lazy.svelte` wrapper with IntersectionObserver, `requestIdleCallback`, and `window.onload` fallback.

**Impact:** Below-the-fold sections defer hydration until visible or idle.

### 2. Critical CSS Inline

**Why:** Eliminate render-blocking CSS for above-the-fold content.

**How:** Inline critical hero styles in `+layout.svelte` `<svelte:head>`.

**Impact:** Faster FCP and improved perceived performance.

### 3. Responsive Images

**Why:** Reduce LCP by serving appropriately sized images.

**How:** `<picture>` element with multiple `<source>` elements and media queries.

**Impact:** Mobile devices fetch smaller WebP, desktop gets larger WebP, legacy browsers get JPEG.

### 4. Progressive Enhancement

**Why:** Ensure core functionality works without JavaScript.

**How:** Server-side rendering with client-side hydration; semantic HTML.

**Impact:** Better SEO, accessibility, and resilience.

## Further Reading

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev/)
- [Agency Audit Report](../../e2e/audit/AGENCY_AUDIT_V2_REPORT.md)
