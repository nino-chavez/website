# Tech Stack

This document defines the complete technical stack for Nino Chavez's portfolio website. The stack is optimized for a high-performance, accessible, single-page React application with SSR capabilities.

## Framework & Runtime

- **Application Framework:** React 19.1.1 (single-page application with SSR support)
- **Language/Runtime:** TypeScript 5.x on Node.js (modern, type-safe development)
- **Package Manager:** pnpm (fast, disk-efficient, strict dependency management)
- **Build Tool:** Vite 6.x (fast HMR, optimized production builds, SSR configuration)

## Frontend

- **JavaScript Framework:** React 19.1.1 with TypeScript
- **CSS Framework:** Tailwind CSS 4.x (CDN + PostCSS for custom utilities)
- **Animation Library:** Framer Motion (declarative animations, gesture support, performance-optimized)
- **UI Components:** Custom component library with consistent camera/photography metaphor
- **3D/Canvas:** Custom 3D canvas system with coordinate transforms and spatial navigation

## State Management & Routing

- **State Management:** React Context API + custom hooks (lightweight, no external state library needed)
- **Routing:** Single-page with scroll-based section navigation (no client-side router library)
- **Scroll Management:** Custom scroll spy hooks for section tracking and smooth scrolling

## Database & Storage

- **Database:** None (static content site with no backend data persistence)
- **Content Storage:** Markdown files for blog content (if applicable), static JSON for portfolio data
- **Asset Storage:** Local assets optimized and bundled during build, potential future CDN integration

## Testing & Quality

- **Unit Testing:** Vitest (Vite-native, fast, ESM support)
- **Integration Testing:** React Testing Library (user-centric testing philosophy)
- **E2E Testing:** Playwright (cross-browser, reliable, modern)
- **Component Development:** Storybook (isolated component development and documentation)
- **Linting/Formatting:** ESLint + Prettier (consistent code style)
- **Type Checking:** TypeScript compiler (tsc) for type safety
- **Accessibility Testing:** axe-core (automated a11y checks), manual keyboard navigation testing

## Performance & Monitoring

- **Performance Budgets:** Lighthouse CI (Core Web Vitals targets: LCP <2.5s, FID <100ms, CLS <0.1)
- **Bundle Analysis:** Built-in Vite rollup visualization
- **Health Monitoring:** Custom health monitoring scripts tracking 7 dimensions (configuration, architecture, tests, docs, features, tech debt, production readiness)
- **Error Tracking:** Console-based during development (future: Sentry integration for production)

## Deployment & Infrastructure

- **Static Hosting:** Vercel (primary deployment, edge functions, automatic builds from Git)
- **SSR Capability:** Express server with Vite SSR (local testing, SEO validation)
- **CI/CD:** GitHub Actions (automated health checks, quality gates, deployment triggers)
- **Version Control:** Git + GitHub (source of truth, PR-based workflow)

## SEO & Social

- **Meta Tags:** React Helmet or custom head management for dynamic meta tags
- **Schema Markup:** JSON-LD structured data for rich search results
- **Social Previews:** Open Graph and Twitter Card meta tags
- **Sitemap:** Generated during build process
- **SSR:** Vite SSR with Express for server-side rendering (ensures search engine indexability)

## Quality Automation

- **Quality Gates:** 7 specialized validation agents (canvas architecture, accessibility, performance, photography metaphor, test coverage, protocol auditor, health monitoring)
- **Pre-commit Hooks:** Potential future integration for linting and type-checking
- **Automated Health Checks:** Weekly comprehensive health assessments via GitHub Actions

## Development Tools

- **Code Editor:** VS Code (assumed, with recommended extensions for React, TypeScript, Tailwind)
- **Browser DevTools:** Chrome DevTools, Firefox DevTools (for debugging and performance profiling)
- **Design Tools:** Figma or similar (for design system documentation and component specs)
- **Terminal:** Modern shell with Git integration

## Third-Party Services

- **Authentication:** None required (public portfolio site)
- **Email:** Standard mailto links (future: potential form service integration like Formspree or Vercel Forms)
- **Analytics:** None currently (future: privacy-respecting analytics like Plausible or Fathom)
- **CDN:** Vercel's built-in edge network for static assets

## Browser Support

- **Modern Browsers:** Chrome/Edge (latest 2 versions), Firefox (latest 2 versions), Safari (latest 2 versions)
- **Mobile Browsers:** iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement:** Core content accessible without JavaScript, enhanced experience with JS enabled
- **Accessibility:** WCAG 2.2 AA compliance across all supported browsers

## Architecture Patterns

- **Component Architecture:** Atomic design principles (atoms, molecules, organisms)
- **Code Organization:** Feature-based folder structure with clear separation of concerns
- **Styling Approach:** Tailwind utility classes with custom design tokens for camera/photography theme
- **Performance Strategy:** Code splitting, lazy loading, optimized images, minimal JavaScript bundle
- **Accessibility Strategy:** Semantic HTML, ARIA labels, keyboard navigation, screen reader support

## Notes

- This is a static-first site with SSR capabilities for SEO, not a dynamic web application
- No backend API or database required - all content is compiled at build time
- Focus is on frontend excellence: performance, accessibility, and sophisticated interactions
- Tech stack chosen for simplicity, performance, and modern development experience
- All dependencies kept minimal to maintain small bundle size and fast load times
