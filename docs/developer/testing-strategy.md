# Testing Strategy

Last Updated: 2025-10-17

## Overview

This SvelteKit portfolio employs a comprehensive testing strategy covering end-to-end functionality, accessibility compliance, performance benchmarks, and visual regression. The testing approach prioritizes user experience quality and production readiness.

## Testing Stack

### Playwright

- **E2E Testing** - User flow verification across browsers
- **Visual Regression** - Screenshot comparison for UI consistency
- **Accessibility Testing** - axe-core integration for WCAG compliance
- **Performance Testing** - Lighthouse audits via Playwright

### Test Browsers

- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

## Test Structure

### E2E Tests (`e2e/`)

```text
e2e/
├── audit/                    # Quality audits
│   ├── accessibility-axe.spec.ts      # axe-core scans
│   ├── performance-metrics.spec.ts    # Lighthouse audits
│   ├── smoke.spec.ts                  # Basic smoke tests
│   └── AGENCY_AUDIT_V2_REPORT.md     # Audit results
└── visual/                   # Visual regression
    └── hero-and-focus.spec.ts         # Screenshot comparisons
```

## Test Categories

### 1. Smoke Tests

**Purpose:** Verify basic functionality and page loads.

**Coverage:**
- Page renders without errors
- Critical content is visible
- No console errors
- Basic navigation works

**Run:** `pnpm test:smoke`

### 2. Accessibility Tests

**Purpose:** Ensure WCAG 2.1 AA compliance.

**Coverage:**
- Automated axe-core scans
- Keyboard navigation
- ARIA attributes
- Color contrast
- Focus management
- Heading hierarchy

**Metrics:**
- Lighthouse Accessibility: 100/100
- Zero axe violations
- Complete keyboard access

**Run:** `pnpm test:e2e -- --grep accessibility`

### 3. Performance Tests

**Purpose:** Validate performance metrics and identify regressions.

**Coverage:**
- Core Web Vitals (LCP, FID, CLS)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)
- Speed Index

**Targets (Mobile, Slow 4G):**
- FCP: <1.8s
- Speed Index: <3.4s
- LCP: <2.5s
- TBT: <200ms
- CLS: <0.1

**Run:** `pnpm test:e2e -- --grep performance`

### 4. Visual Regression Tests

**Purpose:** Prevent unintended UI changes.

**Coverage:**
- Hero section layout
- Focus section content
- Responsive breakpoints
- Interactive states (hover, focus)
- Theme consistency

**Run:** `pnpm test:visual:update` (to update snapshots)

## Running Tests

### All Tests

```bash
pnpm test:e2e
```

### Smoke Tests Only

```bash
pnpm test:smoke
```

### UI Mode (Interactive)

```bash
pnpm test:e2e:ui
```

### Visual Regression Update

```bash
pnpm test:visual:update
```

### View Reports

```bash
pnpm show-report
```

## Test Artifacts

### Lighthouse Reports

Location: `test-results/`

- `lighthouse-report.report.html` - Baseline audit
- `lighthouse-report.report.json` - Baseline metrics
- `lighthouse-report.after.report.html` - Post-optimization audit
- `lighthouse-report.after.report.json` - Post-optimization metrics

### Playwright Reports

Location: `playwright-report/`

- HTML report with test results
- Screenshots on failure
- Video recordings (if enabled)
- Trace files for debugging

### Visual Regression Snapshots

Location: `e2e/visual/*.spec.ts-snapshots/`

- Baseline screenshots
- Comparison diffs on failure

## Continuous Integration

### GitHub Actions (Recommended)

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Quality Gates

### Pre-Commit

- Build succeeds
- No TypeScript errors
- Lint passes

### Pre-Push

- All tests pass
- No accessibility violations
- Performance within targets

### Pre-Deploy

- Lighthouse Performance: >75/100
- Lighthouse Accessibility: 100/100
- Lighthouse Best Practices: 100/100
- Lighthouse SEO: 100/100
- Zero axe violations
- No visual regressions

## Test Writing Guidelines

### E2E Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('[data-testid="hero-section"]');
    
    // Act
    await element.scrollIntoViewIfNeeded();
    
    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Accessibility Test Structure

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/');
  
  const results = await new AxeBuilder({ page })
    .analyze();
  
  expect(results.violations).toEqual([]);
});
```

### Visual Regression Structure

```typescript
import { test, expect } from '@playwright/test';

test('hero section should match snapshot', async ({ page }) => {
  await page.goto('/');
  
  const hero = page.locator('[data-testid="hero-section"]');
  await hero.scrollIntoViewIfNeeded();
  
  await expect(hero).toHaveScreenshot('hero-section.png');
});
```

## Best Practices

### 1. Use Data Attributes

```svelte
<section data-testid="hero-section">
  <!-- Content -->
</section>
```

### 2. Wait for Network Idle

```typescript
await page.goto('/', { waitUntil: 'networkidle' });
```

### 3. Use Locator Strategies

```typescript
// Good
const button = page.locator('[data-testid="cta-button"]');

// Avoid
const button = page.locator('button.px-8.py-4.bg-gradient-to-r');
```

### 4. Test User Flows

Focus on user journeys, not implementation details:

```typescript
test('user can navigate to contact section', async ({ page }) => {
  // User lands on page
  await page.goto('/');
  
  // User clicks contact button
  await page.click('[data-testid="contact-button"]');
  
  // User sees contact form
  await expect(page.locator('#portfolio')).toBeInViewport();
});
```

### 5. Isolate Tests

Each test should be independent and repeatable:

```typescript
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
});
```

## Debugging Tests

### Run in Headed Mode

```bash
pnpm test:e2e --headed
```

### Debug Mode

```bash
pnpm test:e2e --debug
```

### Trace Viewer

```bash
# Enable traces in playwright.config.ts
trace: 'on-first-retry'

# View traces
npx playwright show-trace trace.zip
```

### Screenshots on Failure

Automatically captured in `test-results/` when tests fail.

## Performance Testing Details

### Lighthouse Configuration

```typescript
const lighthouseConfig = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 2.625,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
  },
};
```

### Metrics Collection

```typescript
const metrics = await page.evaluate(() => {
  const paint = performance.getEntriesByType('paint');
  const fcp = paint.find(p => p.name === 'first-contentful-paint');
  
  return {
    fcp: fcp?.startTime,
    cls: /* ... */,
    lcp: /* ... */,
  };
});
```

## Future Enhancements

- [ ] Unit tests for utilities and stores (Vitest)
- [ ] Component testing (Playwright Component Testing)
- [ ] Visual regression across breakpoints
- [ ] Performance budgets in CI
- [ ] Automated Lighthouse CI integration
- [ ] Cross-device testing (BrowserStack/Sauce Labs)

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Lighthouse Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
- [Web Vitals](https://web.dev/vitals/)
