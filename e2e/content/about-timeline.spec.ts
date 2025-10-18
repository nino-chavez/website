import { test, expect } from '@playwright/test';

/**
 * About Timeline Content Test
 * 
 * Purpose: Lock down the career timeline content to prevent silent regressions.
 * This test ensures the Focus (About) section renders exactly five timeline years
 * in the expected order: 2025 (current), 2020, 2015, 2010, 2000.
 * 
 * Context: After a module shadowing fix, placeholder timeline data was accidentally
 * rendered instead of the canonical content. This test prevents that from recurring.
 */

test.describe('About Section Timeline', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Scroll to Focus section to trigger lazy-load and ensure content is rendered
    await page.locator('#focus').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Allow entry transitions to complete
  });

  test('renders exactly five career timeline years', async ({ page }) => {
    const timelineCard = page.locator('[data-testid="career-timeline-card"]');
    await expect(timelineCard).toBeVisible();

    // Expected years in the timeline (current role is featured separately, historical timeline follows)
    const expectedYears = [2025, 2020, 2015, 2010, 2000];

    // Locate all timeline year markers
    const yearElements = page.locator('[data-timeline-index]').locator('div.text-lg.font-bold');
    const yearCount = await yearElements.count();

    // Verify we have exactly the expected number of historical years (excluding current)
    // Current role (2025) is rendered separately, so we expect 4 in the historical timeline
    const historicalYears = expectedYears.slice(1);
    expect(yearCount).toBe(historicalYears.length);

    // Verify each historical year appears in the correct order
    for (let i = 0; i < historicalYears.length; i++) {
      const yearText = await yearElements.nth(i).textContent();
      expect(yearText?.trim()).toBe(String(historicalYears[i]));
    }
  });

  test('renders current role (2025) prominently', async ({ page }) => {
    const timelineCard = page.locator('[data-testid="career-timeline-card"]');
    
    // Find the current role highlight card (should contain "2025" and "Principal Advisor")
    const currentRoleCard = timelineCard.locator('.bg-gradient-to-br.from-athletic-brand-violet\\/10');
    await expect(currentRoleCard).toBeVisible();

    // Verify the current role displays 2025
    const yearElement = currentRoleCard.locator('.text-3xl.font-black');
    await expect(yearElement).toHaveText('2025');

    // Verify the role title is present
    const roleTitle = currentRoleCard.locator('.text-2xl.font-bold');
    await expect(roleTitle).toContainText('Principal Advisor');
  });

  test('timeline years are in reverse chronological order', async ({ page }) => {
    const yearElements = page.locator('[data-timeline-index]').locator('div.text-lg.font-bold');
    const yearCount = await yearElements.count();

    const years: number[] = [];
    for (let i = 0; i < yearCount; i++) {
      const yearText = await yearElements.nth(i).textContent();
      if (yearText) {
        years.push(parseInt(yearText.trim(), 10));
      }
    }

    // Verify years are in descending order (most recent first)
    for (let i = 0; i < years.length - 1; i++) {
      expect(years[i]).toBeGreaterThan(years[i + 1]);
    }
  });

  test('timeline has expand/collapse functionality', async ({ page }) => {
    // Find the first timeline item
    const firstTimelineItem = page.locator('[data-timeline-index="0"]');
    
    // Find the toggle button (not using text in locator since it changes)
    const expandButton = firstTimelineItem.locator('button').filter({ hasText: /Learn more|Show less/ });

    await expect(expandButton).toBeVisible();
    const initialText = await expandButton.textContent();
    expect(initialText?.trim()).toContain('Learn more');

    // Click to expand
    await expandButton.click();
    await page.waitForTimeout(500); // Allow expansion animation and state update
    
    const expandedText = await expandButton.textContent();
    expect(expandedText?.trim()).toContain('Show less');

    // Click to collapse
    await expandButton.click();
    await page.waitForTimeout(500); // Allow collapse animation and state update
    
    const collapsedText = await expandButton.textContent();
    expect(collapsedText?.trim()).toContain('Learn more');
  });
});
