# Phase 1.5: Multi-Disciplinary Agency Audit v2.0 (SvelteKit Adaptation)

Project: The Living Archive v2
Audit Date: 2025-10-17
Version: 2.0 (Mandatory Visual Verification)
Status: READY TO EXECUTE

This document adapts the v2.0 audit to the new SvelteKit app. It bakes in a mandatory rendering smoke test using Playwright before any deeper analysis. The Playwright config starts a preview server on port 3002 by default; override with TEST_URL if needed.

- Default URL: http://localhost:3002 (SvelteKit preview)
- Override: set TEST_URL env var (e.g., http://localhost:3001)
- Command: pnpm test:e2e -- --grep "PHASE 0"

---

## Critical Lesson Learned

The v1 audit missed a CSS compilation failure because it relied solely on automated checks. v2.0 requires screenshots and CSS sanity checks as a blocking gate.

---

## Phase 0: Rendering Smoke Test (Mandatory)

If this phase fails, STOP immediately.

What the automated Playwright test verifies:
- Opens the homepage and disables animations for deterministic screenshots
- Captures desktop and mobile full-page screenshots
- Performs CSS sanity checks to detect unstyled/default rendering

Blocking conditions (any triggers a CRITICAL BLOCKER):
- Body background is pure black/white/transparent, suggesting CSS not loaded
- Text is default black (no color styling)
- No visible button or the first button appears unstyled (no padding/radius)
- Font family includes "Times" (suggests Inter not loaded)

Acceptable background colors for this app (brand + tailwind base):
- brand-dark: #0a0a0f (rgb(10, 10, 15))
- neutral-900: #171717 (rgb(23, 23, 23))

Artifacts produced:
- audit-smoke-test-desktop.png
- audit-smoke-test-mobile.png

---

## Phase 1: Automated Analysis

- Lighthouse: Optional CLI step (see commands section) – capture HTML report
- Accessibility: axe-core via Playwright (optional add-on); capture violations and summaries
- Performance: Use page.metrics() to record JS/layout timing and screenshot CLS candidates

---

## Phase 2: Visual Inspection (Required)

Capture screenshots at multiple breakpoints and verify:
- Visual hierarchy (CTA prominence, headings)
- Color system (brand-violet #8b5cf6 accents, neutral backgrounds)
- Typography (Inter), spacing, and responsive layout

---

## Phase 3: Interactive Elements

Click through primary interactive elements; verify hover/focus states, smooth transitions, and loading/skeletons as applicable.

---

## Phase 4-7: Journeys, Cognitive Load, Delight, Report

Follow the original v2.0 structure. Use screenshots from Phase 0/2 and results from Phase 1.

---

## How to run

1) Build and preview will be started automatically by Playwright

- pnpm build
- pnpm test:e2e -- --grep "PHASE 0"

2) Optional: Run Lighthouse (adjust port)

- npx lighthouse http://localhost:3002 --view --output=html --output-path=audit-lighthouse.html

3) Optional: Add axe-core integration

- pnpm add -D axe-core @axe-core/playwright
- Write a test using axe to analyze the page and attach results

Notes:
- You can override the base URL with TEST_URL env variable to target a different port or deployed URL.
- Visual diffs are not required in Phase 0; only presence of screenshots and CSS sanity.
