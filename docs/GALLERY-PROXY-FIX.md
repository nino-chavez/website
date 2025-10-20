# Gallery 404 Fix - Environment Variable Setup

## Problem
Gallery shows "Not found" when accessing ninochavez.co/gallery

## Root Cause
The gallery app's `svelte.config.js` now uses:
```javascript
base: process.env.VITE_BASE_PATH || ''
```

But `VITE_BASE_PATH` is not set in Vercel, so the app builds with `base: ''` (empty), meaning it expects to be at the root `/` instead of `/gallery`.

---

## Solution: Set Environment Variable in Vercel

### Step 1: Go to Gallery Project Settings
1. Open https://vercel.com/dashboard
2. Find project: **nino-chavez-gallery**
3. Click on it
4. Go to **Settings** tab
5. Click **Environment Variables** in left sidebar

### Step 2: Add Environment Variable
1. Click **Add New**
2. Fill in:
   - **Key:** `VITE_BASE_PATH`
   - **Value:** `/gallery`
   - **Environments:** Check all three boxes (Production, Preview, Development)
3. Click **Save**

### Step 3: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the three dots menu (•••)
4. Click **Redeploy**
5. Confirm

### Step 4: Wait and Test
1. Wait ~30-60 seconds for deployment
2. Visit: https://ninochavez.co/gallery
3. Verify:
   - ✅ Content loads
   - ✅ Styling displays
   - ✅ No 404s in console
   - ✅ URL stays on ninochavez.co

---

## Alternative: Update Config Directly (If Env Var Doesn't Work)

If setting the environment variable doesn't work, we can hardcode it:

**File:** `/nino-chavez-gallery/svelte.config.js`

Change line 18 from:
```javascript
base: process.env.VITE_BASE_PATH || ''
```

To:
```javascript
base: '/gallery'
```

Then:
```bash
cd /Users/nino/Workspace/02-local-dev/sites/nino-chavez-gallery
git add svelte.config.js
git commit -m "Hardcode /gallery base path"
git push
```

---

## Why This Happens

The gallery can be accessed two ways:
1. **Standalone:** https://nino-chavez-gallery.vercel.app (base path should be `''`)
2. **Proxied:** https://ninochavez.co/gallery (base path should be `'/gallery'`)

Using the environment variable allows:
- Vercel deployment: Sets `VITE_BASE_PATH='/gallery'` → works when proxied
- Local dev: No env var set → `base: ''` → works at localhost:5173/

---

## Expected Behavior After Fix

### Before (Current - Broken):
```
ninochavez.co/gallery
  ↓ (proxy to nino-chavez-gallery.vercel.app)
  ↓ (app built with base: '')
  ↓ (tries to load /main.css)
  ↓
ninochavez.co/main.css → 404 ❌
```

### After (Fixed):
```
ninochavez.co/gallery
  ↓ (proxy to nino-chavez-gallery.vercel.app)
  ↓ (app built with base: '/gallery')
  ↓ (tries to load /gallery/main.css)
  ↓
ninochavez.co/gallery/main.css
  ↓ (proxy to nino-chavez-gallery.vercel.app/main.css)
  ↓
200 OK ✅
```

---

## Quick Test
After setting the env var and redeploying, check:
```bash
curl -I https://ninochavez.co/gallery
# Should return 200, not 404
```

Then visit in browser and check console for 404s.

---

**Next Action:** Go to Vercel dashboard and add the environment variable!
