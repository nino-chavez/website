# Phase 1.5: Multi-Disciplinary Agency Audit v2.0 — SvelteKit Adaptation

**Project:** The Living Archive v2 (SvelteKit)
**Audit Date:** 2025-10-17
**Version:** 2.0 (SvelteKit Adaptation)
**Status:** 🔍 READY TO EXECUTE

---

## Critical Lesson Learned

**Previous Audit Failure:** v1 missed a catastrophic CSS failure due to lack of visual browser inspection.

**Root Cause:** No mandatory "smoke test" with screenshots and visual verification before automated analysis.

---

## Agency Team Composition (SvelteKit Context)

1. **Content Strategist** — Copy, IA, messaging
2. **UX Designer** — Usability, flows, navigation
3. **Visual Designer** — Brand, hierarchy, color, typography
4. **UI Engineer** — SvelteKit, Tailwind, performance, accessibility
5. **Psychology Consultant** — Cognitive load, delight, emotional design

---

## ⚠️ PHASE 0: RENDERING SMOKE TEST (MANDATORY)

**THIS PHASE CANNOT BE SKIPPED. IF IT FAILS, STOP IMMEDIATELY.**

### Step 0.1: Navigate and Capture

- Use Playwright to open the SvelteKit site (`http://localhost:4173` or configured port)
- Wait for network idle and animations to settle
- Take full-page desktop and mobile screenshots:

```typescript
await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
await page.waitForTimeout(2000);
await page.screenshot({ path: 'test-results/audit-smoke-test-desktop.png', fullPage: true });
await page.setViewportSize({ width: 375, height: 667 });
await page.screenshot({ path: 'test-results/audit-smoke-test-mobile.png', fullPage: true });
```

### Step 0.2: Visual Sanity Checks

- Confirm Tailwind and Inter font are loaded
- Background is `#18181b` (not pure black)
- Text, buttons, spacing, and images are styled
- No unstyled or default browser elements

### Step 0.3: Critical Failure Detection

- If any critical blockers (unstyled, missing CSS, pure black bg, etc.), STOP and diagnose build/CSS pipeline

---

## PHASE 1: Automated Analysis

- Run Lighthouse (`npx lighthouse http://localhost:4173 --output=html`)
- Capture performance, accessibility, best practices, SEO
- Use Playwright + axe-core for accessibility scan
- Capture performance metrics via Playwright

---

## PHASE 2: Visual Browser Inspection

- Take screenshots at desktop (1920x1080), tablet (768x1024), and mobile (375x667)
- Validate visual hierarchy, color, typography, spacing, and responsiveness
- Compare against design tokens (see `src/constants.ts`)

---

## PHASE 3: Interactive Element Testing

- Use Playwright to click all buttons/links, test filters, sort, scroll, and verify hover/focus/active states
- Confirm smooth transitions, sticky header, lazy loading, and no layout shift

---

## PHASE 4: User Journey Simulation

- Simulate first-time visitor, photo discovery, and deep browsing scenarios
- Record observations and success criteria for each journey

---

## PHASE 5: Cognitive Load Assessment

- Evaluate decision points, information density, CTA clarity, and visual noise
- Rate cognitive load for first impression and task completion

---

## PHASE 6: Delight Factor Analysis

- Rate micro-interactions, animation smoothness, and delight factor for key UI elements

---

## PHASE 7: Comprehensive Report Generation

- Use provided markdown template for reporting
- Include screenshots, metrics, accessibility results, and prioritized recommendations

---

## SvelteKit-Specific Notes

- Use `test-results/` for all screenshots and audit artifacts
- Reference Tailwind and Inter font in all visual checks
- Use Playwright config to ensure correct base URL and output paths
- Validate all sections/components are rendered and styled
- Confirm accessibility and performance best practices for SvelteKit

---

**To execute:**
- Run the Playwright smoke test and ensure screenshots are saved to `test-results/`
- Run Lighthouse and axe-core audits
- Complete all checklist items before proceeding to next phase
- Generate and save the audit report in `test-results/` or `docs/audits/`
