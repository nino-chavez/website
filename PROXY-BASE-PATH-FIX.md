# Fixing Gallery & Blog Proxy Base Paths

## Problem
Gallery and blog apps are loading but all assets (CSS/JS/images) fail because they're looking for files at the wrong path:

**Gallery app expects:**
- `/main.css` ❌ (tries to load from ninochavez.co/main.css - doesn't exist)

**Gallery app needs:**
- `/gallery/main.css` ✅ (loads from ninochavez.co/gallery/main.css - proxied correctly)

---

## Solution: Configure Base Path in Each App

### For Gallery App (nino-chavez-gallery)

The gallery needs to know it's served from `/gallery/` path.

**If gallery is SvelteKit:**

Edit `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/gallery' : ''
    }
  }
};

export default config;
```

**If gallery is Next.js:**

Edit `next.config.js`:
```javascript
module.exports = {
  basePath: '/gallery',
  assetPrefix: '/gallery'
};
```

**If gallery is Vite/vanilla:**

Edit `vite.config.js`:
```javascript
export default {
  base: '/gallery/'
};
```

---

### For Blog App (signal-dispatch-blog)

Same approach - configure base path to `/blog`.

**If blog is SvelteKit:**

Edit `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-vercel';

const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/blog' : ''
    }
  }
};

export default config;
```

**If blog is Next.js:**

Edit `next.config.js`:
```javascript
module.exports = {
  basePath: '/blog',
  assetPrefix: '/blog'
};
```

---

## After Configuring Base Paths

### 1. Rebuild Each App
```bash
# In gallery project
cd /path/to/nino-chavez-gallery
pnpm build
git add .
git commit -m "Configure /gallery base path for ninochavez.co proxy"
git push

# In blog project
cd /path/to/signal-dispatch-blog
pnpm build
git add .
git commit -m "Configure /blog base path for ninochavez.co proxy"
git push
```

### 2. Verify Deployment
Wait 30 seconds for Vercel to deploy each app.

### 3. Test on ninochavez.co
- Visit https://ninochavez.co/gallery
- Check browser console - no 404s for CSS/JS
- Verify styling loads correctly
- Test navigation within gallery

---

## Alternative Option: Vercel Edge Config (Advanced)

If you can't modify the gallery/blog apps, use Vercel Edge Middleware to rewrite asset paths.

**Not recommended because:**
- More complex
- Harder to maintain
- Requires middleware in THIS project
- Can break with framework updates

**Better to fix at source (configure base path in each app)**

---

## What This Fixes

### Before (Broken):
```
User visits: ninochavez.co/gallery
Gallery loads, tries to fetch: ninochavez.co/main.css (404 ❌)
Gallery tries to fetch: ninochavez.co/script.js (404 ❌)
Result: Unstyled content, broken navigation
```

### After (Working):
```
User visits: ninochavez.co/gallery
Gallery loads, tries to fetch: ninochavez.co/gallery/main.css (200 ✅)
Gallery tries to fetch: ninochavez.co/gallery/script.js (200 ✅)
Result: Fully styled, working navigation
```

---

## Testing Checklist

After deploying base path fixes:

**Gallery:**
- [ ] https://ninochavez.co/gallery loads with styling
- [ ] Navigation links stay on /gallery/* paths
- [ ] Images load correctly
- [ ] No 404s in browser console
- [ ] URL bar stays on ninochavez.co

**Blog:**
- [ ] https://ninochavez.co/blog loads with styling
- [ ] Article links stay on /blog/* paths
- [ ] No 404s in browser console
- [ ] URL bar stays on ninochavez.co

---

## Quick Diagnosis

To check which framework each app uses:

```bash
# Check gallery
cd /path/to/nino-chavez-gallery
cat package.json | grep -E "(next|svelte|vite)"

# Check blog
cd /path/to/signal-dispatch-blog
cat package.json | grep -E "(next|svelte|vite)"
```

Then apply the appropriate base path config from above.

---

## Need Help?

Let me know:
1. What framework is the gallery app? (SvelteKit/Next.js/Vite/other)
2. What framework is the blog app?

I can provide the exact config file changes needed.
