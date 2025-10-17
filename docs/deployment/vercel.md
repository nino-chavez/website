# Deployment Guide

Last Updated: 2025-10-17

## Overview

This SvelteKit portfolio is optimized for deployment on Vercel with static site generation and serverless functions. The deployment process is automated via Git integration and includes production optimizations for performance, caching, and security.

## Prerequisites

- Node.js 18+ installed locally
- pnpm package manager
- Vercel account (free tier sufficient)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Platforms

### Vercel (Recommended)

**Why Vercel:**
- Built-in SvelteKit adapter support
- Automatic deployments on push
- Global CDN with edge network
- Zero-configuration HTTPS
- Preview deployments for PRs
- Excellent performance out of the box

**Configuration:** `vercel.json` included in repository

### Alternative Platforms

- **Netlify** - Use `@sveltejs/adapter-netlify`
- **Cloudflare Pages** - Use `@sveltejs/adapter-cloudflare`
- **Node.js Server** - Use `@sveltejs/adapter-node`
- **Static Hosting** - Use `@sveltejs/adapter-static`

## Vercel Deployment

### Initial Setup

1. **Install Vercel CLI (optional):**
   ```bash
   pnpm add -g vercel
   ```

2. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel auto-detects SvelteKit

3. **Configure Project:**
   - Framework Preset: SvelteKit
   - Build Command: `pnpm build`
   - Output Directory: `.svelte-kit/output`
   - Install Command: `pnpm install`
   - Node Version: 18.x

4. **Deploy:**
   - Click "Deploy"
   - Vercel builds and deploys automatically

### Environment Variables

If using API keys or secrets:

1. Go to Project Settings > Environment Variables
2. Add variables:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   PUBLIC_SITE_URL=https://your-domain.com
   ```
3. Redeploy to apply changes

### Custom Domain

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS with your registrar:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
4. Vercel auto-provisions SSL certificate

### Vercel Configuration (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/images/(.*)\\.(?:avif|webp|jpg|jpeg|png|svg)",
      "headers": [
        { 
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable" 
        }
      ]
    },
    {
      "source": "/brand/(.*)",
      "headers": [
        { 
          "key": "Cache-Control", 
          "value": "public, max-age=31536000, immutable" 
        }
      ]
    }
  ]
}
```

**What This Does:**
- Sets long-lived caching for static images
- Instructs browsers to cache assets for 1 year
- `immutable` directive prevents revalidation
- Applies to `/images/` and `/brand/` directories

## Build Optimization

### Production Build

```bash
# Clean previous builds
rm -rf .svelte-kit

# Build for production
pnpm build

# Preview locally
pnpm preview
```

### Build Output

```text
.svelte-kit/output/
├── client/              # Client-side assets
│   ├── _app/           # Application code
│   │   ├── immutable/  # Hashed, cacheable assets
│   │   └── version.json
│   └── index.html      # Pre-rendered pages
└── server/             # Server-side code
    ├── entries/        # Route handlers
    ├── chunks/         # Shared code
    └── index.js        # Server entry
```

### Bundle Analysis

To analyze bundle size:

```bash
# Install rollup-plugin-visualizer
pnpm add -D rollup-plugin-visualizer

# Add to vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    visualizer({ open: true })
  ]
};

# Build and view report
pnpm build
```

## Performance Optimizations

### Caching Strategy

**Static Assets:**
- Images: 1 year immutable cache
- JS/CSS: Hashed filenames, long-lived cache
- Fonts: CDN with `font-display: swap`

**HTML Pages:**
- Pre-rendered at build time
- Served from CDN edge
- Cache-Control: `public, max-age=0, must-revalidate`

### Image Optimization

**Current Setup:**
- WebP format for modern browsers
- JPEG fallback for legacy browsers
- Responsive `<picture>` elements
- Explicit width/height to prevent CLS

**Recommendations:**
- Consider AVIF for even better compression
- Use responsive `srcset` for multiple sizes
- Lazy-load below-the-fold images
- Compress images with tools like Squoosh or ImageOptim

### Code Splitting

**Implemented:**
- Route-based code splitting (automatic)
- Dynamic imports for below-the-fold components
- Lazy hydration via `Lazy.svelte` wrapper

**Impact:**
- Reduced initial bundle size
- Faster FCP and TTI
- Improved Core Web Vitals

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys on:
- **Push to main branch** → Production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

### Preview Deployments

Each PR gets a unique preview URL:
- Test changes before merging
- Share with stakeholders
- Run automated tests against preview

### Deployment Hooks

Trigger deployments programmatically:

```bash
# Create deploy hook in Vercel dashboard
# Then trigger via curl
curl -X POST https://api.vercel.com/v1/integrations/deploy/...
```

## Monitoring & Analytics

### Vercel Analytics

Enable in Vercel dashboard:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Page load performance
- Geographic distribution

### Custom Analytics

Add Google Analytics or Plausible:

```svelte
<!-- src/routes/+layout.svelte -->
<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  </script>
</svelte:head>
```

### Error Tracking

Integrate Sentry for error monitoring:

```bash
pnpm add @sentry/sveltekit
```

```javascript
// hooks.server.ts
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
});
```

## Deployment Checklist

### Pre-Deployment

- [ ] Run tests: `pnpm test:e2e`
- [ ] Build succeeds: `pnpm build`
- [ ] Preview works: `pnpm preview`
- [ ] Lighthouse audit passes performance targets
- [ ] No accessibility violations
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` (if applicable)

### Post-Deployment

- [ ] Verify production URL loads correctly
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Test on mobile devices
- [ ] Verify custom domain (if applicable)
- [ ] Check SSL certificate is valid
- [ ] Test contact forms/API endpoints (if applicable)
- [ ] Monitor error rates in Sentry (if configured)

### Rollback

If issues occur:

1. Go to Vercel Dashboard > Deployments
2. Find previous working deployment
3. Click "⋯" menu > "Promote to Production"
4. Instant rollback to stable version

## CI/CD Integration

### GitHub Actions

Example workflow for automated testing before deployment:

```yaml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            playwright-report/
            test-results/
```

### Vercel + GitHub Actions

Vercel automatically deploys on push, but you can add pre-deploy tests:

1. Tests run in GitHub Actions
2. If tests pass, Vercel deployment proceeds
3. If tests fail, deployment is blocked

## Troubleshooting

### Build Failures

**Issue:** Build fails with module not found

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

**Issue:** Out of memory during build

**Solution:**
```bash
# Increase Node memory limit
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

### Performance Issues

**Issue:** Slow page loads in production

**Solution:**
- Check bundle size with visualizer
- Enable code splitting for large components
- Optimize images (compress, use WebP)
- Review Lighthouse report for specific issues

### Caching Issues

**Issue:** Changes not reflected in production

**Solution:**
- Hard refresh (Cmd/Ctrl + Shift + R)
- Clear browser cache
- Check `Cache-Control` headers in DevTools
- Verify hashed filenames in build output

## Best Practices

1. **Use Environment Variables** for sensitive data
2. **Enable Preview Deployments** for testing
3. **Monitor Core Web Vitals** via Vercel Analytics
4. **Set up Error Tracking** with Sentry
5. **Automate Tests** in CI/CD pipeline
6. **Version Your Deployments** with Git tags
7. **Document Changes** in commit messages
8. **Test on Real Devices** before major releases

## Resources

- [SvelteKit Deployment Docs](https://kit.svelte.dev/docs/adapters)
- [Vercel SvelteKit Guide](https://vercel.com/docs/frameworks/sveltekit)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Core Web Vitals](https://web.dev/vitals/)
