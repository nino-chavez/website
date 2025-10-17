# Visual Validation System

> Comprehensive validation framework for confirming implementation status from both code AND user journey perspectives.

## Quick Start

```bash
# Run full visual validation suite
npm run visual-validate

# Validate specific feature
npm run visual-validate:feature 9

# Capture all screenshots
npm run capture:all

# Run specific user journey
npx playwright test tests/screenshots/flows/tech-decision-maker-journey.spec.ts
```

## What This System Does

This validation system answers the question: **"Is the feature actually complete from a user's perspective?"**

It validates three layers:

1. **Code Validation** - Does the code exist and work?
2. **Visual Validation** - Does it render correctly?
3. **Functional Validation** - Can users complete their goals?

## Directory Structure

```
agent-os/validation/
├── README.md (this file)
└── visual/ (generated validation reports)
    ├── validation-summary.md
    ├── feature-1-validation.md
    ├── feature-2-validation.md
    └── ...

tests/screenshots/
├── flows/ (user journey tests)
│   ├── tech-decision-maker-journey.spec.ts
│   ├── technical-collaborator-journey.spec.ts
│   ├── action-sports-client-journey.spec.ts
│   ├── accessibility-flow.spec.ts
│   ├── canvas-flow.spec.ts
│   ├── gallery-flow.spec.ts
│   └── navigation-flow.spec.ts
├── scripts/ (component capture)
│   └── capture-components.spec.ts
└── output/ (generated screenshots)
    ├── tech-decision-maker/
    ├── technical-collaborator/
    ├── action-sports-client/
    └── ...
```

## User Journey Tests

### Target Audience Journeys

These tests validate the complete experience for each target audience:

**1. Tech Decision Maker Journey** (`tech-decision-maker-journey.spec.ts`)
- Persona: CTO, VP Engineering (40-55)
- Goal: Quickly validate technical credibility
- Journey: Hero → Expertise → Architecture → Portfolio → Contact

**2. Technical Collaborator Journey** (`technical-collaborator-journey.spec.ts`)
- Persona: Senior Engineer, Architect (30-45)
- Goal: Assess collaboration compatibility
- Journey: Peer evaluation → Depth assessment → Problem-solving → Code quality → Shared expertise

**3. Action Sports Client Journey** (`action-sports-client-journey.spec.ts`)
- Persona: Athlete, Brand Manager (25-40)
- Goal: Evaluate photography style and quality
- Journey: Photography signals → Gallery → Image quality → EXIF → Booking

### Feature-Specific Flows

**4. Accessibility Flow** (`accessibility-flow.spec.ts`)
- Validates WCAG 2.2 AA compliance
- Keyboard navigation
- Screen reader support

**5. Canvas Flow** (`canvas-flow.spec.ts`)
- 3D canvas system
- Spatial navigation
- Performance at 60fps

**6. Gallery Flow** (`gallery-flow.spec.ts`)
- Photography gallery
- EXIF metadata display
- Lightbox functionality

**7. Navigation Flow** (`navigation-flow.spec.ts`)
- Section navigation
- Smooth scrolling
- Mobile responsiveness

## How to Run Validations

### Full Validation (All Features)

```bash
npm run visual-validate
```

This will:
1. Validate code for all 12 roadmap features
2. Run visual tests (screenshots) where flows exist
3. Generate validation reports in `agent-os/validation/visual/`
4. Create summary report with overall status

### Single Feature Validation

```bash
npm run visual-validate:feature 5  # Validate Feature 5: Photography Gallery
```

### Capture Screenshots Only

```bash
# All screenshots (flows + components)
npm run capture:all

# Just user journey flows
npm run capture:flows

# Just isolated components
npm run capture:components
```

Screenshots saved to: `tests/screenshots/output/`

### Run Specific User Journey

```bash
# Tech decision maker journey
npx playwright test tests/screenshots/flows/tech-decision-maker-journey.spec.ts

# With UI (visual debugging)
npx playwright test tests/screenshots/flows/action-sports-client-journey.spec.ts --ui

# Headed mode (watch browser)
npx playwright test tests/screenshots/flows/technical-collaborator-journey.spec.ts --headed
```

## Validation Workflow

### When Implementing a Feature

1. **Code the feature**
2. **Run validation**: `npm run visual-validate:feature X`
3. **Review report**: `agent-os/validation/visual/feature-X-validation.md`
4. **Manual verification**: Complete functional checklist in report
5. **Update roadmap**: Mark feature status in `roadmap.md`

### When Completing a Feature

1. **Run full validation**: `npm run visual-validate`
2. **Review all reports**
3. **Run user journey tests** for affected audiences
4. **Capture baseline screenshots**: `npm run capture:all`
5. **Update roadmap.md** with completion status
6. **Update mission.md** if needed

### Weekly Validation

Run weekly to catch regressions:

```bash
# Every week
npm run visual-validate
npm run capture:all
```

Compare screenshots to previous week to detect visual regressions.

## Interpreting Results

### Validation Report Structure

Each feature gets a validation report with:

- **Code Status**: complete | partial | incomplete
- **Visual Status**: pass | fail | not-tested
- **Functional Status**: pass | fail | not-tested
- **Acceptance Criteria**: X/Y met
- **Issues Found**: List of problems
- **Next Steps**: What to do

### Status Meanings

**Code Status:**
- `complete`: Code exists, compiles, tests pass
- `partial`: Code exists but has issues
- `incomplete`: Code missing or severely broken

**Visual Status:**
- `pass`: Screenshots captured successfully, no visual regressions
- `fail`: Screenshot tests failed
- `not-tested`: No automated visual test exists (manual review needed)

**Functional Status:**
- `pass`: All acceptance criteria met
- `fail`: Some acceptance criteria not met
- `not-tested`: Manual verification not yet performed

### What "Complete" Means

A feature is truly complete when:

- ✅ Code Status: `complete`
- ✅ Visual Status: `pass`
- ✅ Functional Status: `pass`
- ✅ All acceptance criteria met
- ✅ User journey tests pass for relevant audiences
- ✅ No blockers or critical issues

## Manual Verification

Some validations require manual testing:

### Acceptance Criteria Checklist

For each feature, manually verify acceptance criteria listed in:
`agent-os/product/visual-validation-strategy.md`

Example for Feature 6 (Accessibility):

```
Manual Verification:
- [ ] Tab through entire site with keyboard
- [ ] Use screen reader (VoiceOver/NVDA)
- [ ] Test with high contrast mode
- [ ] Verify focus indicators visible
- [ ] Check skip links function
```

### User Testing

Optionally, have real users from target audiences test:

1. **Tech Decision Maker**: Can they quickly assess credibility?
2. **Technical Collaborator**: Do they see collaboration potential?
3. **Action Sports Client**: Does portfolio demonstrate expertise?

## Visual Regression Testing

### Establish Baseline

First time setup:

```bash
# Capture baseline screenshots
git checkout main
npm run capture:all
mv tests/screenshots/output tests/screenshots/baseline
```

### Compare Against Baseline

When working on a feature:

```bash
# On feature branch
npm run capture:all

# Manual comparison
# Compare tests/screenshots/output/ to tests/screenshots/baseline/
```

Future: Automate with `pixelmatch` or similar tool.

## Integration with Roadmap

Validation results should flow back to roadmap.md:

```markdown
## Roadmap Status

1. [x] Feature Name `validation: pass` ✅
2. [~] Feature Name `validation: partial` ⚠️
3. [ ] Feature Name `validation: not-tested` ⏳
```

## Troubleshooting

### Screenshots Failing

```bash
# Check if servers are running
npm run dev  # Dev server on :3000
npm run storybook  # Storybook on :6006

# Run with debug
npx playwright test --debug

# Run headed to watch
npx playwright test --headed
```

### Validation Script Errors

```bash
# Ensure TypeScript compiles
npx tsc --noEmit

# Check test runner works
npm run test:run
```

### Missing Output Directory

```bash
# Create manually if needed
mkdir -p agent-os/validation/visual
mkdir -p tests/screenshots/output
```

## Future Enhancements

- [ ] Automated visual diff (pixelmatch)
- [ ] CI/CD integration (run on every PR)
- [ ] Visual-validator agent (autonomous validation)
- [ ] Lighthouse CI integration
- [ ] Automated acceptance criteria checking
- [ ] Real user testing integration
- [ ] A/B test result tracking

## Related Documentation

- **[visual-validation-strategy.md](../product/visual-validation-strategy.md)** - Comprehensive strategy doc
- **[roadmap.md](../product/roadmap.md)** - Feature implementation status
- **[mission.md](../product/mission.md)** - Product goals and features

## Commands Reference

```bash
# Validation
npm run visual-validate                      # Full validation
npm run visual-validate:feature <N>          # Single feature

# Screenshots
npm run capture:all                          # All screenshots
npm run capture:flows                        # User journey flows
npm run capture:components                   # Component screenshots
npm run capture:clean                        # Delete old screenshots

# User Journeys
npx playwright test tests/screenshots/flows/tech-decision-maker-journey.spec.ts
npx playwright test tests/screenshots/flows/technical-collaborator-journey.spec.ts
npx playwright test tests/screenshots/flows/action-sports-client-journey.spec.ts

# Feature Flows
npx playwright test tests/screenshots/flows/accessibility-flow.spec.ts
npx playwright test tests/screenshots/flows/canvas-flow.spec.ts
npx playwright test tests/screenshots/flows/gallery-flow.spec.ts
npx playwright test tests/screenshots/flows/navigation-flow.spec.ts

# Options
--ui                                         # Visual test runner
--headed                                     # Watch browser
--debug                                      # Step through tests
```

## Questions?

See **visual-validation-strategy.md** for full details on:
- Feature validation matrix
- Acceptance criteria for all features
- User journey definitions
- Validation report templates
