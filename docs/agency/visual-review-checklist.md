# Agency Visual Review Checklist

Use this checklist with the screenshots in `test-results/agency/` to evaluate the SPA across IA, visual design, functional architecture, and frontend architecture. Assign a 1–5 score per section (1 = needs work, 5 = outstanding) and note actionable feedback.

## Sections to Review

- Hero (data-section="hero")
- About / Focus (data-section="focus")
- Work / Projects (data-section="frame")
- Essays / Exposure (data-section="exposure")
- Gallery (data-section="gallery")
- Portfolio / Contact (data-section="portfolio")
- Focus Career Timeline (data-testid="career-timeline-card")

## 1. Information Architecture

- Hierarchy: Clear page-level headings and logical grouping
- Navigation: Consistent, discoverable, and keyboard accessible
- Flow: Sections read in a narrative that supports the goals
- Density: Appropriate chunking and scan-ability of content

## 2. Visual Design

- Layout: Grid alignment, consistent spacing rhythm, visual balance
- Typography: Scale, contrast, hierarchy, and readable line-lengths
- Color: Brand alignment, contrast ratios, and state colors
- Imagery: Quality, cropping, purpose, and consistency

## 3. Functional Architecture

- Clarity: Each component has a clear job-to-be-done
- Feedback: Hover, focus, active, and error states are evident
- Controls: Predictable and consistent interactions
- Fallbacks: Graceful degradation when content is missing

## 4. Frontend Architecture

- Components: Reusability, single-responsibility, and naming
- State: Minimal global state, clear flows, stable actions
- Performance: Lazy-loading, critical path, and bundle discipline
- Accessibility: Semantics, ARIA, keyboard, and motion prefs

## 5. Motion & Interactions

- Triggering: In-view vs. scroll-driven with sensible thresholds
- Duration/Timing: Natural and non-distracting
- Reduced Motion: Respects prefers-reduced-motion
- Focus Management: No motion traps; preserves context

## 6. Accessibility (WCAG 2.1 AA)

- Landmarks: Proper use of semantic elements
- Headings: Logical hierarchy (h1..h6)
- Contrast: Text and key UI ≥ 4.5:1 (or ≥ 3:1 for large)
- Keyboard: Fully operable without pointer
- Screen Readers: Labels, roles, and announcements

## 7. Performance Observations

- Perceived performance: First paint and interactivity feel fast
- Jank: Scrolling and animations are smooth
- Images: Appropriately sized and encoded (WebP/AVIF)
- Caching: Static assets and fonts behave as expected

## Scoring Rubric (per section)

- 5: Exemplary; sets a reference for similar work
- 4: Strong; minor refinements only
- 3: Adequate; clear improvements identified
- 2: Weak; needs targeted revisions
- 1: Poor; requires substantial rework

## Reviewer Notes

- Strengths:
- Opportunities:
- Risks / Regressions:
- Recommendations:

## Pass Summary — 2025-10-18

- Scope: Non-accessibility UX refinements only (per directive).
- Changes captured:
  - About/Focus: Capped narrative line length with `max-w-prose` for improved readability.
  - Focus Timeline: Enlarged tap targets (mobile) via padded button wrapper; dot remains visually small; hover/focus preserved.
  - Exposure: Reduced backdrop blur from lg→md to lower GPU cost; removed stray markup around tags list.
- Validation:
  - Build: PASS (vite build)
  - Typecheck: PASS (svelte-check)
  - Lint: PASS (eslint)
  - Visuals: Snapshots updated (test:visual:update) — no regressions observed in Hero/Focus/Exposure.
- Notes:
  - Accessibility items intentionally deferred; existing focus rings and keyboard nav preserved.
  - Consider extending line-length caps to other long-form text in future passes for consistency.
