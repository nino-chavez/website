import { test, expect } from '@playwright/test';

async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `
  });
}

// Helper to read computed styles in the browser context
async function getComputed(page, selector, prop) {
  return await page.$eval(selector, (el, prop) => getComputedStyle(el)[prop], prop);
}

test.describe('PHASE 0: Rendering Smoke Test (MANDATORY)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await disableAnimations(page);
    await page.waitForTimeout(800);
  });

  test('Desktop full-page screenshot + CSS sanity', async ({ page }) => {
    // CSS sanity checks
    const bg = await getComputed(page, 'body', 'backgroundColor');
    const color = await getComputed(page, 'body', 'color');
    const font = await getComputed(page, 'body', 'fontFamily');

    // Fail fast if background looks like browser default black or white
    const isLikelyBrokenBg = bg === 'rgb(0, 0, 0)' || bg === 'rgba(0, 0, 0, 0)' || bg === 'rgb(255, 255, 255)';
    if (isLikelyBrokenBg) {
      throw new Error(`CRITICAL BLOCKER: Site Not Rendering Correctly. Body background is ${bg}. Check Tailwind/PostCSS build.`);
    }

    // Basic text styling present (not pure black/white)
    expect(color).not.toBe('rgb(0, 0, 0)');

    // Font sanity: prefer Inter, but allow any sans-serif; flag Times New Roman
    expect(font.toLowerCase()).not.toContain('times');

    // Buttons exist and look styled (rounded/padded)
    const anyButton = page.locator('button').first();
    await expect(anyButton).toBeVisible({ timeout: 2000 });

    const br = await anyButton.evaluate((el) => getComputedStyle(el).borderRadius);
    const pad = await anyButton.evaluate((el) => {
      const s = getComputedStyle(el);
      return `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`;
    });
    // Simple heuristics for styled controls
    expect(parseFloat(br)).toBeGreaterThanOrEqual(2);
    expect(pad).not.toBe('0px 0px 0px 0px');

    await page.setViewportSize({ width: 1366, height: 900 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-smoke-test-desktop.png', fullPage: true });
  });

  test('Mobile full-page screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'audit-smoke-test-mobile.png', fullPage: true });
  });
});
