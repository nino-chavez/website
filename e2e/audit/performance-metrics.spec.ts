import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const routes = ['/', '/#focus', '/#frame', '/#gallery', '/#portfolio'];

function getMetrics(metrics) {
  return {
    TTFB: metrics.responseEnd - metrics.startTime,
    FCP: metrics.firstContentfulPaint,
    LCP: metrics.largestContentfulPaint,
    CLS: metrics.cumulativeLayoutShift,
    TTI: metrics.domInteractive,
    Load: metrics.loadEventEnd,
  };
}

test.describe('Performance Metrics', () => {
  const outputDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../test-results/audit-performance');
  test.beforeAll(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });
  for (const route of routes) {
    test(`should capture performance metrics for ${route}`, async ({ page }) => {
      await page.goto(`http://localhost:5173${route}`);
      await page.waitForLoadState('networkidle');
      const metrics = await page.evaluate(() => {
        return {
          startTime: performance.timing.navigationStart,
          responseEnd: performance.timing.responseEnd,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
          largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
          cumulativeLayoutShift: window.__CLS__ || 0,
          domInteractive: performance.timing.domInteractive - performance.timing.navigationStart,
          loadEventEnd: performance.timing.loadEventEnd - performance.timing.navigationStart,
        };
      });
      const fileName = `perf-${route.replace(/[#/]/g, '_') || 'home'}.json`;
      fs.writeFileSync(
        path.join(outputDir, fileName),
        JSON.stringify(getMetrics(metrics), null, 2)
      );
      expect(metrics).toBeTruthy();
    });
  }
});
