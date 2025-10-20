# Deploy Instructions: Fix Blog/Gallery URL Rewriting

## Problem
`ninochavez.co/blog` was showing `signal-dispatch-blog.vercel.app` in the browser URL.

## Root Cause
SvelteKit server routes (`src/routes/blog/+page.server.ts`) were doing redirects instead of letting Vercel rewrites handle it.

## Solution Applied

### 1. Removed SvelteKit Redirect Routes
Deleted:
- `src/routes/blog/+page.server.ts` (was doing redirect)
- `src/routes/gallery/+page.server.ts` (was doing redirect)

Now these directories exist but are empty, which means SvelteKit won't create routes for them.

### 2. Vercel Rewrites (Already Correct)
The `vercel.json` already has the correct configuration:

```json
{
  "rewrites": [
    {
      "source": "/blog",
      "destination": "https://signal-dispatch-blog.vercel.app"
    },
    {
      "source": "/blog/:path*",
      "destination": "https://signal-dispatch-blog.vercel.app/:path*"
    },
    {
      "source": "/gallery",
      "destination": "https://nino-chavez-gallery.vercel.app"
    },
    {
      "source": "/gallery/:path*",
      "destination": "https://nino-chavez-gallery.vercel.app/:path*"
    }
  ]
}
```

**Rewrites vs Redirects:**
- **Rewrite**: Serves content from destination URL but keeps original URL in browser ✅
- **Redirect**: Changes browser URL to destination URL ❌

## How to Deploy

### Option 1: Git Push (Recommended)
```bash
cd /Users/nino/Workspace/02-local-dev/sites/nino-chavez-website

# Check current status
git status

# If blog/gallery directories show as untracked (empty directories)
# You can add them or leave them - doesn't matter since they're empty
git add src/routes/blog src/routes/gallery

# If there are other changes to commit
git add vercel.json static/robots.txt

# Commit
git commit -m "Fix blog/gallery URL rewriting - remove SvelteKit redirects, use Vercel rewrites only"

# Push to trigger deployment
git push
```

### Option 2: Vercel CLI
```bash
cd /Users/nino/Workspace/02-local-dev/sites/nino-chavez-website
vercel --prod
```

## Post-Deployment Verification

After deployment completes, test:

```bash
# 1. Visit blog - URL should stay as ninochavez.co/blog
curl -I https://ninochavez.co/blog
# Should return 200 OK (not 301/302/307/308)

# 2. Check in browser
# Visit: https://ninochavez.co/blog
# Browser URL bar should show: https://ninochavez.co/blog
# NOT: https://signal-dispatch-blog.vercel.app

# 3. Check blog post
# Visit: https://ninochavez.co/blog/some-post-slug
# Browser URL bar should show: https://ninochavez.co/blog/some-post-slug

# 4. Check gallery
# Visit: https://ninochavez.co/gallery
# Browser URL bar should show: https://ninochavez.co/gallery
```

## How It Works After Fix

```
User visits: https://ninochavez.co/blog
                      ↓
Vercel Edge Network (checks routes)
                      ↓
NO SvelteKit route at src/routes/blog/+page.server.ts
                      ↓
Falls through to vercel.json rewrites
                      ↓
Rewrite matches: /blog → signal-dispatch-blog.vercel.app
                      ↓
Fetches content from signal-dispatch-blog.vercel.app
                      ↓
Serves content BUT keeps URL as ninochavez.co/blog ✅
```

## Troubleshooting

### If URL still changes after deployment:

1. **Check Vercel Dashboard**
   - Go to project settings → Rewrites
   - Ensure vercel.json rewrites are applied
   - Look for any conflicting redirect rules

2. **Clear Cache**
   ```bash
   # Clear browser cache or test in incognito
   # Vercel edge cache will update automatically
   ```

3. **Check Build Logs**
   - Ensure no errors during deployment
   - Verify vercel.json was picked up

4. **Verify SvelteKit Build**
   ```bash
   # Local build test
   npm run build
   # Check that .svelte-kit/output/server/entries/pages doesn't have blog or gallery routes
   ```

## Why This Approach?

**Vercel Rewrites** are the correct solution because:
1. ✅ Keep ninochavez.co in browser URL
2. ✅ Serve content from separate Vercel projects
3. ✅ No CORS issues (same domain)
4. ✅ Consolidated SEO authority under ninochavez.co
5. ✅ Proper canonical URLs

**SvelteKit Redirects** were wrong because:
1. ❌ Change browser URL to signal-dispatch-blog.vercel.app
2. ❌ Split SEO authority between domains
3. ❌ Expose internal deployment URLs
4. ❌ Override Vercel rewrites

## Next Steps

After this deployment works:
1. Deploy signal-dispatch-blog with canonical URL updates
2. Verify sitemap.xml uses ninochavez.co/blog/* URLs
3. Submit sitemap to Google Search Console
4. Monitor crawler behavior

---

**Expected Result**: Visiting `ninochavez.co/blog` will show blog content while keeping `ninochavez.co/blog` in the browser URL bar.
