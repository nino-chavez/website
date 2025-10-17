import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/#focus', '/#frame', '/#gallery', '/#portfolio'];

test.describe('Accessibility (axe-core)', () => {
  const outputDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../test-results/audit-axe');
  test.beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });
  for (const route of routes) {
    test(`should have no critical accessibility violations on ${route}`, async ({ page }) => {
      await page.goto(`http://localhost:5173${route}`);
      await page.waitForLoadState('networkidle');
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      const fileName = `axe-${route.replace(/[#/]/g, '_') || 'home'}.json`;
      fs.writeFileSync(
        path.join(outputDir, fileName),
        JSON.stringify(accessibilityScanResults, null, 2)
      );
      expect(accessibilityScanResults.violations.length, `Violations: ${JSON.stringify(accessibilityScanResults.violations, null, 2)}`).toBe(0);
    });
  }
});
