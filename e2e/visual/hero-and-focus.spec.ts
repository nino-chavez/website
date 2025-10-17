import { test, expect } from '@playwright/test';

// Helper to disable animations for stable screenshots
async function disableAnimations(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
        animation-delay: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });
}

test.describe('Visual audit: Hero & Focus', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await disableAnimations(page);
  });

  test('Hero section baseline', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero).toHaveScreenshot('hero-baseline.png', { animations: 'disabled' });
  });

  test('Focus section baseline', async ({ page }) => {
    await page.locator('#focus').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300); // allow any lazy content to paint

    const focus = page.locator('#focus');
    await expect(focus).toBeVisible();
    await expect(focus).toHaveScreenshot('focus-baseline.png', { animations: 'disabled' });
  });
});
