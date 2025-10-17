import { test, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

// SvelteKit base URL and output directories
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const OUTPUT_DIR = join(process.cwd(), 'test-results');
const SCREENSHOTS_DIR = join(OUTPUT_DIR, 'screenshots');
const VIDEOS_DIR = join(OUTPUT_DIR, 'videos');

// Audit breakpoints
const AUDIT_BREAKPOINTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'ultrawide', width: 2560, height: 1440 }
];

// Section IDs for SvelteKit portfolio
const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'focus', name: 'Focus' },
  { id: 'frame', name: 'Frame' },
  { id: 'exposure', name: 'Exposure' },
  { id: 'gallery', name: 'Gallery' },
  { id: 'portfolio', name: 'Portfolio' }
];

test.beforeAll(async () => {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });
  await mkdir(VIDEOS_DIR, { recursive: true });
});

test.describe('UX/UI Layout Audit - Screenshot Generation (SvelteKit)', () => {
  test('Generate viewport screenshots for all breakpoints', async ({ page }) => {
    for (const breakpoint of AUDIT_BREAKPOINTS) {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });
      for (const section of SECTIONS) {
        const url = `${BASE_URL}/#${section.id}`;
        await page.goto(url, { waitUntil: 'networkidle' });
        await page.waitForTimeout(500);
        const viewportFilename = `${breakpoint.name}-${section.id}-viewport.png`;
        await page.screenshot({ path: join(SCREENSHOTS_DIR, viewportFilename), fullPage: false });
      }
    }
  });

  test('Generate full-page screenshots for desktop', async ({ page }) => {
    const desktop = AUDIT_BREAKPOINTS.find(bp => bp.name === 'desktop');
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    for (const section of SECTIONS) {
      const url = `${BASE_URL}/#${section.id}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const fullpageFilename = `desktop-${section.id}-full.png`;
      await page.screenshot({ path: join(SCREENSHOTS_DIR, fullpageFilename), fullPage: true });
    }
  });

  test('Capture hover state screenshots', async ({ page }) => {
    const desktop = AUDIT_BREAKPOINTS.find(bp => bp.name === 'desktop');
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}/#frame`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const interactiveSelectors = [
      'button:not([disabled])',
      'a[href]',
      '[role="button"]',
      '.card',
      '.btn-primary',
      '.btn-secondary'
    ];
    for (const selector of interactiveSelectors) {
      const elements = await page.locator(selector).all();
      if (elements.length > 0) {
        const firstElement = elements[0];
        await firstElement.hover();
        await page.waitForTimeout(300);
        const selectorName = selector.replace(/[^a-z0-9]/gi, '-');
        const hoverFilename = `desktop-frame-hover-${selectorName}.png`;
        await page.screenshot({ path: join(SCREENSHOTS_DIR, hoverFilename), fullPage: false });
      }
    }
  });

  test('Capture focus state screenshots', async ({ page }) => {
    const desktop = AUDIT_BREAKPOINTS.find(bp => bp.name === 'desktop');
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const focusableCount = 5;
    for (let i = 0; i < focusableCount; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      const focusFilename = `desktop-focus-state-${i + 1}.png`;
      await page.screenshot({ path: join(SCREENSHOTS_DIR, focusFilename), fullPage: false });
    }
  });

  test('Generate mobile navigation and touch target screenshots', async ({ page }) => {
    const mobile = AUDIT_BREAKPOINTS.find(bp => bp.name === 'mobile');
    await page.setViewportSize({ width: mobile.width, height: mobile.height });
    await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const navToggle = page.locator('[aria-label*="menu"], .mobile-nav-toggle, [class*="hamburger"]').first();
    if (await navToggle.count() > 0) {
      await navToggle.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: join(SCREENSHOTS_DIR, 'mobile-navigation-open.png'), fullPage: false });
      await navToggle.click();
      await page.waitForTimeout(500);
    }
    await page.goto(`${BASE_URL}/#portfolio`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: join(SCREENSHOTS_DIR, 'mobile-touch-targets.png'), fullPage: false });
  });

  test('Verify all sections exist', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    for (const section of SECTIONS) {
      const sectionElement = page.locator(`#${section.id}`);
      await expect(sectionElement).toBeAttached({ timeout: 5000 });
    }
  });
});
