import { test, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * DESIGN AGENCY VISUAL AUDIT
 * 
 * Purpose: Comprehensive visual inspection of the FocusSection layout
 * Context: Evaluating two-column layout vs proposed alternatives:
 *   - Option 1: Single Column Stack (The Editorial)
 *   - Option 2: Interactive Panel (The System)
 * 
 * Agency Team Roles:
 *   - Information Architecture: Content hierarchy, flow, readability
 *   - Visual Design: Balance, composition, whitespace, typography
 *   - Functional Architecture: Interaction patterns, state management
 *   - Frontend Architecture: Responsive behavior, accessibility, performance
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const AUDIT_DIR = join(process.cwd(), 'test-results', 'agency-audit');

// Critical breakpoints for layout evaluation
const BREAKPOINTS = [
  { name: 'mobile-small', width: 375, height: 812, description: 'iPhone SE' },
  { name: 'mobile-large', width: 428, height: 926, description: 'iPhone 14 Pro Max' },
  { name: 'tablet-portrait', width: 768, height: 1024, description: 'iPad' },
  { name: 'tablet-landscape', width: 1024, height: 768, description: 'iPad landscape' },
  { name: 'laptop', width: 1440, height: 900, description: 'Standard laptop' },
  { name: 'desktop', width: 1920, height: 1080, description: 'Full HD' },
  { name: 'desktop-xl', width: 2560, height: 1440, description: 'QHD' }
];

test.beforeAll(async () => {
  await mkdir(AUDIT_DIR, { recursive: true });
  await mkdir(join(AUDIT_DIR, 'focus-section'), { recursive: true });
  await mkdir(join(AUDIT_DIR, 'content-hierarchy'), { recursive: true });
  await mkdir(join(AUDIT_DIR, 'interactions'), { recursive: true });
  await mkdir(join(AUDIT_DIR, 'responsive-flow'), { recursive: true });
});

test.describe('Design Agency Visual Audit - FocusSection', () => {
  
  test('IA Review: Content Hierarchy & Balance Analysis', async ({ page }) => {
    console.log('\n📐 INFORMATION ARCHITECTURE REVIEW\n');
    
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000); // Allow transitions
      
      // Capture full section view
      const focusSection = page.locator('#focus');
      await expect(focusSection).toBeVisible();
      
      await page.screenshot({
        path: join(AUDIT_DIR, 'focus-section', `${bp.name}-full-section.png`),
        fullPage: true
      });
      
      console.log(`✓ ${bp.name} (${bp.width}x${bp.height}) - ${bp.description}`);
      
      // Capture specific content areas for balance analysis
      if (bp.width >= 1024) {
        // Desktop: Evaluate two-column grid balance
        const leftColumn = page.locator('[data-testid="about-narrative"]').locator('div').first();
        const rightColumn = page.locator('[data-testid="about-narrative"]').locator('div').last();
        
        if (await leftColumn.isVisible() && await rightColumn.isVisible()) {
          const leftBox = await leftColumn.boundingBox();
          const rightBox = await rightColumn.boundingBox();
          
          console.log(`  → Left column height: ${leftBox?.height}px`);
          console.log(`  → Right column height: ${rightBox?.height}px`);
          console.log(`  → Height ratio: ${((leftBox?.height || 0) / (rightBox?.height || 1)).toFixed(2)}`);
        }
      }
    }
  });

  test('IA Review: Areas of Focus vs Architectural Domains Imbalance', async ({ page }) => {
    console.log('\n⚖️  CONTENT BALANCE: Focus Areas vs Domains\n');
    
    const desktop = BREAKPOINTS.find(bp => bp.name === 'desktop')!;
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Isolate the two-column capabilities section
    const capabilitiesGrid = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2').nth(1);
    
    // Left: Areas of Focus
    const focusCard = capabilitiesGrid.locator('> div').first();
    await focusCard.screenshot({
      path: join(AUDIT_DIR, 'content-hierarchy', 'areas-of-focus-card.png')
    });
    
    // Right: Architectural Domains
    const domainsCard = capabilitiesGrid.locator('> div').last();
    await domainsCard.screenshot({
      path: join(AUDIT_DIR, 'content-hierarchy', 'architectural-domains-card.png')
    });
    
    // Get measurements
    const focusBox = await focusCard.boundingBox();
    const domainsBox = await domainsCard.boundingBox();
    
    console.log('📊 IMBALANCE METRICS:');
    console.log(`  Focus Areas height: ${focusBox?.height}px`);
    console.log(`  Domains height: ${domainsBox?.height}px`);
    console.log(`  Difference: ${Math.abs((focusBox?.height || 0) - (domainsBox?.height || 0))}px`);
    console.log(`  Ratio: ${((domainsBox?.height || 0) / (focusBox?.height || 1)).toFixed(2)}x larger`);
  });

  test('Visual Design: Typography & Spacing Audit', async ({ page }) => {
    console.log('\n🎨 VISUAL DESIGN REVIEW\n');
    
    const desktop = BREAKPOINTS.find(bp => bp.name === 'desktop')!;
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Capture section header for typography review
    const header = page.locator('#focus').locator('h2').first();
    await header.screenshot({
      path: join(AUDIT_DIR, 'content-hierarchy', 'section-heading.png')
    });
    
    // Capture thesis/narrative for readability
    const narrative = page.locator('[data-testid="about-narrative"]');
    await narrative.screenshot({
      path: join(AUDIT_DIR, 'content-hierarchy', 'narrative-block.png')
    });
    
    // Capture CTA for positioning analysis
    const cta = page.locator('[data-testid="architect-principle-button"]');
    await cta.screenshot({
      path: join(AUDIT_DIR, 'content-hierarchy', 'cta-button.png')
    });
    
    console.log('✓ Typography hierarchy captured');
    console.log('✓ Spacing and whitespace documented');
  });

  test('Functional Architecture: Interactive States', async ({ page }) => {
    console.log('\n⚙️  FUNCTIONAL ARCHITECTURE REVIEW\n');
    
    const desktop = BREAKPOINTS.find(bp => bp.name === 'desktop')!;
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Test CTA button states
    const ctaButton = page.locator('[data-testid="architect-principle-button"]');
    
    // Default state
    const defaultBox = await ctaButton.boundingBox();
    if (defaultBox) {
      await page.screenshot({
        path: join(AUDIT_DIR, 'interactions', 'cta-button-default.png'),
        clip: defaultBox
      });
    }
    
    // Hover state
    await ctaButton.hover();
    await page.waitForTimeout(300);
    const hoverBox = await ctaButton.boundingBox();
    if (hoverBox) {
      await page.screenshot({
        path: join(AUDIT_DIR, 'interactions', 'cta-button-hover.png'),
        clip: hoverBox
      });
    }
    
    // Focus state
    await page.keyboard.press('Tab');
    await page.waitForTimeout(300);
    await page.screenshot({
      path: join(AUDIT_DIR, 'interactions', 'cta-button-focus.png'),
      fullPage: false
    });
    
    console.log('✓ Button interaction states captured');
    
    // Test timeline expand/collapse
    const timelineItems = page.locator('[data-timeline-index]');
    const firstItem = timelineItems.first();
    const toggleButton = firstItem.locator('button').last();
    
    // Collapsed state
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    await firstItem.screenshot({
      path: join(AUDIT_DIR, 'interactions', 'timeline-collapsed.png')
    });
    
    // Expanded state
    await toggleButton.click();
    await page.waitForTimeout(500);
    await firstItem.screenshot({
      path: join(AUDIT_DIR, 'interactions', 'timeline-expanded.png')
    });
    
    console.log('✓ Timeline interaction patterns captured');
  });

  test('Frontend Architecture: Responsive Breakpoint Analysis', async ({ page }) => {
    console.log('\n💻 FRONTEND ARCHITECTURE REVIEW\n');
    
    // Test layout shifts across breakpoints
    for (const bp of BREAKPOINTS) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      
      // Capture the two-column grid at each breakpoint
      const capabilitiesGrid = page.locator('.grid.grid-cols-1.lg\\:grid-cols-2').nth(1);
      
      await capabilitiesGrid.screenshot({
        path: join(AUDIT_DIR, 'responsive-flow', `${bp.name}-capabilities-grid.png`)
      });
      
      // Log layout characteristics
      const gridBox = await capabilitiesGrid.boundingBox();
      console.log(`${bp.name}: ${gridBox?.width}px wide, ${gridBox?.height}px tall`);
    }
  });

  test('Accessibility: Semantic Structure & ARIA', async ({ page }) => {
    console.log('\n♿ ACCESSIBILITY REVIEW\n');
    
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Check heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4').all();
    console.log(`Total headings: ${headings.length}`);
    
    for (let i = 0; i < headings.length; i++) {
      const text = await headings[i].textContent();
      const tagName = await headings[i].evaluate(el => el.tagName);
      console.log(`  ${tagName}: "${text?.substring(0, 50)}..."`);
    }
    
    // Check ARIA labels
    const focusSection = page.locator('#focus');
    const ariaLabel = await focusSection.getAttribute('aria-label');
    console.log(`\nSection ARIA label: "${ariaLabel}"`);
    
    // Check interactive elements
    const buttons = await page.locator('button').all();
    console.log(`\nInteractive buttons: ${buttons.length}`);
    
    for (let i = 0; i < Math.min(buttons.length, 5); i++) {
      const label = await buttons[i].getAttribute('aria-label') || await buttons[i].textContent();
      console.log(`  Button ${i + 1}: "${label?.substring(0, 50)}"`);
    }
  });

  test('Generate Agency Review Summary Report', async ({ page }) => {
    console.log('\n📋 GENERATING AGENCY REVIEW SUMMARY\n');
    
    const desktop = BREAKPOINTS.find(bp => bp.name === 'desktop')!;
    await page.setViewportSize({ width: desktop.width, height: desktop.height });
    await page.goto(`${BASE_URL}/#focus`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    
    // Full page capture for overview
    await page.screenshot({
      path: join(AUDIT_DIR, 'focus-section-complete-overview.png'),
      fullPage: true
    });
    
    console.log('\n✅ AUDIT COMPLETE');
    console.log(`📁 Results saved to: ${AUDIT_DIR}`);
    console.log('\nNext Steps:');
    console.log('  1. Review screenshots in test-results/agency-audit/');
    console.log('  2. Analyze content balance and layout effectiveness');
    console.log('  3. Compare against proposed alternatives (Editorial vs Interactive)');
    console.log('  4. Document recommendations for layout optimization');
  });
});