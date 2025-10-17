<div align="center">
<img width="1200" height="475" alt="Nino Chavez Portfolio Banner" src="./static/images/hero.jpg" />
</div>

# Nino Chavez Portfolio: SvelteKit Edition

A high-performance personal portfolio website built with SvelteKit, demonstrating production-grade web development through AI-assisted methodology and modern web technologies.

## About This Project

Two decades architecting Fortune 500 commerce platforms—where downtime costs millions and "good enough" fails. This SvelteKit portfolio showcases personal projects and technical capabilities through a performant, accessible, and visually compelling interface.

This site demonstrates **modern web development best practices** through real implementations of performance optimization, accessibility compliance, and user experience design.

### Photography-Inspired Navigation

The UI follows a camera-inspired workflow with sections representing the photography process:

1. **Hero** (Capture) - Camera viewfinder interface with dynamic backgrounds
2. **Focus** - Professional background and core expertise
3. **Frame** - Personal project showcase
4. **Exposure** - Technical insights and thought leadership
5. **Gallery** - Action sports photography portfolio
6. **Portfolio** - Professional connection and contact

## Tech Stack

### Frontend Architecture

- **SvelteKit 2.x** - Modern meta-framework for optimal performance
- **Svelte 4.x** - Reactive component framework with minimal runtime
- **Vite 5.x** - Lightning-fast development and optimized production builds
- **Tailwind CSS 3.x** - Utility-first styling with custom design tokens
- **TypeScript/JSDoc** - Type safety via JSConfig with progressive enhancement

### Development & Build Tools

- **pnpm** - Fast, disk space efficient package manager
- **Playwright** - End-to-end testing with visual regression support
- **axe-core** - Automated accessibility testing
- **PostCSS** - Advanced CSS processing and optimization
- **Vercel Adapter** - Optimized deployment for serverless environments

### Performance & Accessibility

- **Static Site Generation** - Pre-rendered pages for instant loading
- **Code Splitting** - Lazy-loaded sections for optimal bundle size
- **WCAG 2.1 AA Compliance** - Comprehensive accessibility support
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Hardware Acceleration** - CSS transforms for smooth animations

### Architecture Patterns

- **Progressive Enhancement** - Core functionality works without JavaScript
- **Component-Driven Development** - Modular, reusable Svelte components
- **Custom Actions** - Svelte actions for DOM enhancements (inView, etc.)
- **Stores** - Reactive state management with Svelte stores
- **SSR/CSR Hybrid** - Server-side rendering with client-side hydration

## Project Structure

```
portfolio-sveltekit/
├── src/                    # Main source directory
│   ├── lib/               # Shared library code
│   │   ├── actions/       # Svelte actions (inView, etc.)
│   │   ├── components/    # Svelte components
│   │   │   ├── sections/ # Page sections (Hero, Focus, Frame, etc.)
│   │   │   ├── ui/       # Reusable UI components
│   │   │   └── util/     # Utility components (Lazy loader)
│   │   └── stores/        # Svelte stores for state management
│   ├── routes/            # SvelteKit routes (file-based routing)
│   │   ├── +layout.svelte # Root layout with head/styles
│   │   └── +page.svelte   # Landing page composition
│   ├── styles/            # Global styles
│   ├── constants.ts       # Application constants
│   └── types.ts           # TypeScript type definitions
├── static/                # Static assets
│   ├── images/           # Image assets (hero, gallery)
│   ├── brand/            # Brand assets
│   └── data/             # Static data files
├── e2e/                   # End-to-end tests
│   ├── audit/            # Performance and accessibility audits
│   └── visual/           # Visual regression tests
├── test-results/         # Test artifacts and reports
├── svelte.config.js      # SvelteKit configuration
├── vite.config.js        # Vite build configuration
├── tailwind.config.cjs   # Tailwind CSS configuration
├── vercel.json           # Vercel deployment configuration
└── playwright.config.ts  # Playwright test configuration
```

## Run Locally

**Prerequisites:** Node.js 18+ and pnpm

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start development server:**
   ```bash
   pnpm dev
   ```
   The site will be available at `http://localhost:5173`

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Preview production build:**
   ```bash
   pnpm preview
   ```

5. **Run tests:**
   ```bash
   # E2E tests
   pnpm test:e2e
   
   # Smoke tests only
   pnpm test:smoke
   
   # Visual regression tests
   pnpm test:visual:update
   ```

## Key Features

### Performance Optimization

- **Lazy Hydration** - Below-the-fold sections load on visibility/idle
- **Critical CSS Inline** - Above-the-fold styles inlined in `<head>`
- **Image Optimization** - Responsive WebP/JPEG with proper sizing
- **Bundle Splitting** - Dynamic imports for non-critical components
- **Cache Headers** - Long-lived caching for static assets

**Current Performance Metrics (Lighthouse Mobile):**
- Performance: 76/100
- Accessibility: 100/100
- Best Practices: 100/100
- SEO: 100/100

### Accessibility Features

- **ARIA Labels** - Comprehensive semantic markup
- **Keyboard Navigation** - Full keyboard support with focus management
- **Screen Reader Support** - Proper heading hierarchy and landmarks
- **Reduced Motion** - Respects `prefers-reduced-motion` preference
- **Color Contrast** - WCAG AA+ compliant color combinations

### Visual Experience

- **Smooth Transitions** - Svelte transitions with hardware acceleration
- **Responsive Images** - `<picture>` elements with multiple sources
- **Dynamic Backgrounds** - Interactive mouse-tracking spotlight effect
- **Scroll Animations** - IntersectionObserver-based reveal animations
- **Focus Indicators** - Clear visual feedback for keyboard navigation

## Development Workflow

### Before Making Changes

1. Review existing component patterns in `src/lib/components/`
2. Check `types.ts` for type definitions
3. Follow Svelte conventions (reactive statements, stores, actions)
4. Consider accessibility and performance implications

### Implementation Standards

- **Component Style** - Use `<script>`, `<markup>`, `<style>` order
- **Naming Conventions** - PascalCase for components, camelCase for utilities
- **Type Safety** - Use JSDoc or TypeScript for complex types
- **Accessibility** - Include ARIA attributes and semantic HTML
- **Performance** - Lazy-load non-critical components

### Testing Strategy

- **E2E Tests** - Playwright tests for user flows
- **Accessibility Tests** - axe-core automated scans
- **Visual Regression** - Snapshot comparisons for UI consistency
- **Performance Tests** - Lighthouse audits in CI/CD

## AI-Assisted Development

This project demonstrates **AI-first development methodology** with comprehensive documentation of the approach:

### Development Principles

1. **Specification-Driven** - All features begin with clear requirements
2. **Incremental Implementation** - Build in phases with continuous validation
3. **Automated Quality** - CI/CD gates for performance and accessibility
4. **Living Documentation** - Self-updating technical specifications

### AI Collaboration Tools

- **Claude Code** - Primary development assistant for architecture and implementation
- **GitHub Copilot** - Real-time code completion and suggestions
- **Cursor AI** - Intelligent refactoring and code navigation

### Quality Standards

This codebase maintains enterprise-grade quality through:

- **Automated Audits** - Performance, accessibility, and best practices
- **Visual Regression** - Prevent unintended UI changes
- **Type Safety** - JSDoc annotations for editor intelligence
- **Code Standards** - Consistent formatting and conventions

## Deployment

This project is optimized for deployment on Vercel with the following configuration:

- **Adapter** - `@sveltejs/adapter-vercel` for serverless deployment
- **Static Assets** - CDN-optimized with long-lived caching
- **Build Output** - Pre-rendered pages with hybrid SSR/CSR
- **Environment** - Node.js 18+ runtime

### Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

## Documentation

### Developer Guides

- **[Agency Audit Report](./e2e/audit/AGENCY_AUDIT_V2_REPORT.md)** - Performance and accessibility audit results
- **[Agent Collaboration Guide](./AGENTS.md)** - AI development methodology (if ported)
- **[Testing Strategy](./e2e/README.md)** - E2E and visual testing approach

### Component Documentation

Component-level documentation is co-located with implementations in `src/lib/components/`.

## Performance Goals

### Current Status (Mobile, Slow 4G)

- ✅ FCP: 1.5s (target: <1.8s)
- ✅ Speed Index: 1.5s (target: <3.4s)
- ⚠️ LCP: 7.4s (target: <2.5s) - **Primary focus area**
- ✅ TBT: 0ms (target: <200ms)
- ✅ CLS: <0.1 (target: <0.1)

### Optimization Roadmap

1. **LCP Improvements** - Compress hero images, add responsive srcset
2. **Font Loading** - Self-host critical fonts, preload WOFF2
3. **Cache Strategy** - Verify immutable headers on deployed assets
4. **Image Formats** - Add AVIF support for modern browsers

## Contributing

While this is a personal portfolio, the development methodology and patterns are available for learning and collaboration:

- Review implementation patterns in `src/lib/components/`
- Explore performance optimization techniques
- Study accessibility implementation examples
- Learn progressive enhancement strategies

## Contact

**Nino Chavez**  
Enterprise Architect & Managing Consultant  
📧 [hello@nino.photos](mailto:hello@nino.photos)  
💼 [LinkedIn](https://www.linkedin.com/in/nino-chavez/)  
📸 [Photography Portfolio](https://gallery.nino.photos)

---

*Built with SvelteKit, designed for performance, optimized for the modern web.*