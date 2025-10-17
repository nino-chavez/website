# AI Agent Collaboration Guide

## Agent Team Structure

This SvelteKit project employs multiple AI agents working together to deliver production-grade web development. Each agent should understand their role in the collaborative development process.

## Coding Standards

All code in this project is expected to adhere to modern web development best practices and SvelteKit conventions.

### SvelteKit/Svelte Requirements

- All components follow Svelte 4.x conventions
- Use `<script>`, markup, `<style>` organization
- Leverage Svelte reactivity (`$:`) for computed values
- Use stores for shared state across components
- Implement proper TypeScript/JSDoc types via JSConfig

### Component Architecture

- **Functional components** - Use Svelte's component model
- **Props** - Export variables for component props
- **Actions** - Create custom Svelte actions for DOM enhancements
- **Stores** - Use Svelte stores for reactive state management
- **Transitions** - Leverage Svelte's built-in transition system

### File Organization

- Components in `src/lib/components/` organized by domain
- Shared types in `src/types.ts`
- Constants and data in `src/constants.ts`
- Custom actions in `src/lib/actions/`
- Stores in `src/lib/stores/`
- Routes follow SvelteKit's file-based routing in `src/routes/`

### Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.svelte`)
- **Files**: PascalCase for components, camelCase for utilities
- **Props**: camelCase exported variables
- **CSS classes**: Follow Tailwind conventions
- **Actions**: camelCase (e.g., `inView.ts`)

## Architecture Principles

### 1. Static Site Optimization

- Pre-render pages during build for optimal performance
- Minimize client-side JavaScript with progressive enhancement
- Use CDN resources appropriately (fonts, images)
- Implement code splitting via dynamic imports

### 2. Accessibility First

- Maintain ARIA labels and proper heading hierarchy
- Ensure keyboard navigation works correctly
- Test with screen readers in mind
- Follow WCAG 2.1 AA guidelines
- Respect `prefers-reduced-motion` user preference

### 3. Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Test across device sizes (320px to 2560px+)
- Maintain consistent spacing and typography
- Use semantic HTML elements
- Implement responsive images with `<picture>` and `srcset`

### 4. Performance Engineering

- Lazy-load below-the-fold components
- Inline critical CSS in layout head
- Optimize images (WebP, proper sizing, lazy loading)
- Minimize bundle size with tree-shaking
- Implement proper caching headers

## Visual Design System

### Brand Colors

- `neutral-900`: #0a0a0f (background)
- `violet-600/purple-600`: Gradient accent colors
- `white/[opacity]`: Text with varying opacity levels

### Typography

- **Primary**: Inter font family via Google Fonts
- **Font weights**: 300 (light), 400 (normal), 600 (semibold), 900 (black)
- Consistent spacing using Tailwind scale
- Proper heading hierarchy (h1, h2, h3)
- Responsive text sizes via Tailwind breakpoints

### Interactions

- Subtle animations via Svelte transitions
- Mouse-tracking spotlight effect on hero
- Smooth scrolling between sections
- Hardware-accelerated transforms
- Reduced motion support via store

## Development Workflow

### 1. Before Making Changes

- Review existing component patterns in `src/lib/components/`
- Check `types.ts` for type definitions
- Review similar components for consistency
- Consider accessibility and performance implications
- Test across browsers and devices

### 2. Implementation Standards

- Write clean, maintainable Svelte components
- Add proper type annotations via JSDoc or TypeScript
- Maintain existing code style and conventions
- Test keyboard navigation thoroughly
- Verify responsive behavior
- Check accessibility with automated tools

### 3. Testing Approach

- **Manual testing** across devices and browsers
- **Keyboard navigation** verification
- **Screen reader** compatibility check
- **Performance** impact assessment via Lighthouse
- **Visual regression** tests via Playwright
- **Accessibility** scans via axe-core

## Common Patterns

### Section Components

```svelte
<script>
  import { currentSection } from '$lib/stores/gameFlow';
  import { inView } from '$lib/actions/inView';
  
  export let className = '';
  
  function onSectionEnter() {
    currentSection.set('sectionId');
  }
</script>

<section
  id="sectionId"
  data-section="sectionId"
  class={className}
  use:inView={{ threshold: 0.3, once: true }}
  on:enter={onSectionEnter}
  aria-label="Section description"
>
  <!-- Content -->
</section>
```

### Lazy-Loaded Components

```svelte
<script>
  import Lazy from '$lib/components/util/Lazy.svelte';
  
  const ComponentLoader = () => import('./HeavyComponent.svelte');
</script>

<Lazy component={ComponentLoader} />
```

### Navigation Integration

- Use `data-section` attributes for section identification
- Implement smooth scrolling with `scrollIntoView`
- Maintain active section highlighting via stores
- Support keyboard navigation

### Svelte Actions

```javascript
// src/lib/actions/inView.ts
export function inView(node, options = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.dispatchEvent(new CustomEvent('enter'));
        if (options.once) observer.disconnect();
      }
    });
  }, options);
  
  observer.observe(node);
  
  return {
    destroy() {
      observer.disconnect();
    }
  };
}
```

## Communication Between Agents

- Document architectural decisions in commit messages
- Note breaking changes or pattern modifications
- Share context about user experience considerations
- Coordinate on feature additions to avoid conflicts
- Update documentation when adding new patterns

## Error Handling

- Graceful degradation for interactive features
- Proper error boundaries at component level
- Accessibility fallbacks for dynamic content
- Performance monitoring via Lighthouse
- Console logging for development debugging

## Quality Gates

### Automated Checks

- **Lighthouse audits** - Performance, accessibility, SEO, best practices
- **axe-core scans** - Automated accessibility testing
- **Visual regression** - Prevent unintended UI changes
- **E2E tests** - User flow verification
- **Build validation** - Ensure production builds succeed

### Manual Verification

- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Device testing (mobile, tablet, desktop)
- Keyboard-only navigation
- Screen reader compatibility
- Reduced motion preference respect

## Best Practices

### Performance

- Keep bundle sizes minimal (<200KB initial)
- Lazy-load non-critical components
- Optimize images (WebP, proper sizing)
- Use hardware acceleration (transform3d)
- Implement proper caching strategies

### Accessibility

- Use semantic HTML elements
- Provide ARIA labels where needed
- Maintain proper heading hierarchy
- Ensure keyboard focus management
- Test with screen readers regularly

### Maintainability

- Keep components small and focused
- Extract reusable logic into actions/utilities
- Document complex logic with comments
- Follow consistent naming conventions
- Update tests when changing behavior

---

**Remember:** This portfolio demonstrates technical expertise through its implementation quality. Every code change should reflect professional software development practices and modern web standards.
