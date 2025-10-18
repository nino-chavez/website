import { test, expect, Page, Locator } from '@playwright/test';

// Agency Visual Scan: capture stable screenshots for core sections across viewports
// Usage: ensure site is running (pnpm preview:test) then run this spec.

const BASE_URL = process.env.BASE_URL || 'http://localhost:3002';

// Viewports to sample typical device classes
const viewports = [
  { name: 'mobile', width: 390, height: 844 }, // iPhone 12 Pro-ish
  { name: 'tablet', width: 820, height: 1180 }, // iPad Air-ish
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'wide', width: 1536, height: 960 },
  { name: 'ultrawide', width: 1920, height: 1080 }
];

// Sections to capture, matching data-section attributes in the app
const sections: Array<{ id: string; label: string }> = [
  { id: 'hero', label: 'Hero' },
  { id: 'focus', label: 'About_Focus' },
  { id: 'frame', label: 'Work_Projects' },
  { id: 'exposure', label: 'Essays_Exposure' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'portfolio', label: 'Portfolio_Contact' }
  // Note: add { id: 'contact', label: 'Contact' } if a dedicated section exists
];

async function gotoAndStabilize(page: Page, viewport: { width: number; height: number }) {
  await page.context().setDefaultTimeout(25000);
  await page.setViewportSize(viewport);
  await page.emulateMedia({ reducedMotion: 'reduce', colorScheme: 'dark' });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  // Wait for fonts and first paint to stabilize
  // @ts-ignore - fonts may not be typed on all runners
  await page.evaluate(() => (document as any).fonts?.ready?.catch?.(() => {}));
  await page.waitForTimeout(180);
}

async function raf(page: Page, n = 2) {
  await page.evaluate(async (count) => {
    for (let i = 0; i < count; i++) {
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
  }, n);
}

async function isInViewport(page: Page, locator: Locator) {
  const box = await locator.boundingBox();
  if (!box) return false;
  const vh = (await page.viewportSize())?.height ?? 0;
  const vw = (await page.viewportSize())?.width ?? 0;
  return box.y >= 0 && box.y + box.height <= vh && box.x >= 0 && box.x + box.width <= vw;
}

async function safeScrollTo(page: Page, locator: Locator, offset = 80) {
  try {
    await locator.scrollIntoViewIfNeeded();
  } catch {}
  const box = await locator.boundingBox();
  if (box) {
    const currentY = await page.evaluate(() => window.scrollY);
    const targetY = Math.max(0, currentY + box.y - offset);
    await page.evaluate((y) => window.scrollTo(0, y), targetY);
  }
  await raf(page, 2);
}

test.describe.configure({ timeout: 120_000 });
test.describe('Agency visual scan', () => {
  for (const vp of viewports) {
    test(`@agency-scan viewport:${vp.name}`, async ({ page }) => {
      await gotoAndStabilize(page, vp);

      // Top-of-page full screenshot
      await page.screenshot({
        path: `test-results/agency/${vp.name}-00-top-fullpage.png`,
        fullPage: true
      });

      // Iterate visible sections gracefully
      for (const { id, label } of sections) {
        const locator = page.locator(`[data-section="${id}"]`).first();
        const count = await locator.count();
        if (!count) continue;

  await safeScrollTo(page, locator);
  await expect(locator).toBeVisible({ timeout: 5000 });
        // Give any lazy content a moment (reduced motion minimizes animation)
        await page.waitForTimeout(140);

        // Element-level capture
        const outPath = `test-results/agency/${vp.name}-section-${id}.png`;
        await locator.screenshot({ path: outPath });
      }

      // Focus extras: capture the career timeline card if present
      const timeline = page.locator('[data-testid="career-timeline-card"]');
      if (await timeline.count()) {
        await safeScrollTo(page, timeline);
        await expect(timeline).toBeVisible({ timeout: 5000 });
        await page.waitForTimeout(140);
        await timeline.screenshot({ path: `test-results/agency/${vp.name}-focus-timeline.png` });
      }

      // Final full-page capture at bottom
      await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight }));
      await page.waitForTimeout(180);
      await page.screenshot({
        path: `test-results/agency/${vp.name}-99-bottom-fullpage.png`,
        fullPage: true
      });
    });
  }
});
