# SEO Strategy for Multiple Apps Under One Domain

## Your Setup: 3 Separate Apps

1. **Main Portfolio** (ninochavez.co) - This project
2. **Blog** (Signal Dispatch) - Separate Vercel project
3. **Gallery** (Photography) - Separate Vercel project

---

## ✅ Best Approach: Vercel Rewrites (Proxying)

**What we're using:** `vercel.json` rewrites

### How It Works

```json
{
  "rewrites": [
    {
      "source": "/blog",
      "destination": "https://signal-dispatch-blog.vercel.app"
    }
  ]
}
```

**What happens:**
1. User visits `ninochavez.co/blog`
2. Vercel Edge Network **proxies** the request to your blog app
3. Blog content is served **through** ninochavez.co
4. URL stays `ninochavez.co/blog` in browser
5. Google sees content on ninochavez.co domain

**Key difference from redirects:**
- ❌ **Redirect:** Browser goes to different URL (bad for SEO)
- ✅ **Rewrite/Proxy:** Content served through original URL (good for SEO)

---

## SEO Benefits of This Approach

### 1. **Single Domain Authority**
All content builds authority on ninochavez.co:
- ninochavez.co/ (portfolio)
- ninochavez.co/blog (blog content)
- ninochavez.co/gallery (photography)
- ninochavez.co/cv (resume)

Google sees this as **one unified site** = stronger domain authority.

### 2. **No Duplicate Content**
- Signal Dispatch blog is **only** accessible via ninochavez.co/blog
- Original `signal-dispatch-blog.vercel.app` is invisible to Google
- No canonical URL confusion

### 3. **Link Equity Flows to Main Domain**
- Backlinks to ninochavez.co/blog → help ninochavez.co
- Social shares of blog posts → credit ninochavez.co
- All engagement benefits your main brand

### 4. **Clean Internal Linking**
Portfolio can link to blog posts:
```html
<a href="/blog/ai-transformation-playbook">Read my article</a>
```
Google sees this as internal link (stronger signal than external).

---

## Why Keep Apps Separate?

### Pros of Separate Projects:
✅ **Independent deployments** - Deploy blog without touching portfolio
✅ **Team collaboration** - Different people can work on different apps
✅ **Technology flexibility** - Blog could be Next.js, gallery could be SvelteKit
✅ **Performance isolation** - Blog issues don't affect portfolio
✅ **Smaller bundle sizes** - Each app only loads what it needs

### Cons of Combining Into Monorepo:
❌ **Larger builds** - All apps rebuild on every change
❌ **Complex routing** - Managing three apps in one codebase
❌ **Deployment risk** - Bug in blog could break portfolio deployment
❌ **Bundle bloat** - Single bundle includes all three apps

---

## Implementation Details

### Current Setup (Correct!)

**File:** `vercel.json`
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

**What NOT to do:**
- ❌ Don't create SvelteKit routes at `src/routes/blog/+page.server.ts` (overrides rewrites)
- ❌ Don't use HTTP redirects (changes URL in browser)
- ❌ Don't keep blog on separate domain like `blog.ninochavez.co` (splits authority)

---

## SEO Checklist for Multi-App Setup

### ✅ Done (After this commit):
- [x] Vercel rewrites configured in `vercel.json`
- [x] No competing SvelteKit routes
- [x] Proxy keeps URLs on ninochavez.co

### 📋 TODO:
- [ ] Add canonical tags to blog posts pointing to ninochavez.co URLs
- [ ] Update sitemap.xml to include blog/gallery URLs
- [ ] Verify rewrites work (test ninochavez.co/blog after deployment)
- [ ] Add internal links from portfolio to blog posts
- [ ] Set up Google Analytics to track all three apps under one property

---

## Example: How Google Sees Your Site

```
ninochavez.co/
├── / (homepage)
├── /cv (digital resume)
├── /about (entity hub)
├── /blog/ (Signal Dispatch content - proxied)
│   ├── /blog/ai-transformation
│   ├── /blog/enterprise-architecture
│   └── /blog/photography-systems
└── /gallery/ (Photography portfolio - proxied)
    ├── /gallery/volleyball
    ├── /gallery/tournaments
    └── /gallery/action-sports
```

**Google's perspective:**
"This is a comprehensive site about Nino Chavez with portfolio, blog, and gallery sections. All content is on ninochavez.co, so I'll build authority for this domain."

---

## Alternative Approaches (Not Recommended)

### ❌ Option 1: Separate Domains
```
ninochavez.co (portfolio)
signal-dispatch.com (blog)
ninophotography.com (gallery)
```
**Problem:** Splits SEO authority across 3 domains. Each starts from zero.

### ❌ Option 2: Subdomains
```
ninochavez.co (portfolio)
blog.ninochavez.co (blog)
gallery.ninochavez.co (gallery)
```
**Problem:** Google treats subdomains as separate sites. Less authority sharing.

### ❌ Option 3: Redirects
```
ninochavez.co/blog → redirects to signal-dispatch-blog.vercel.app
```
**Problem:** URL changes in browser, backlinks don't help ninochavez.co

### ✅ Option 4: Proxy Rewrites (Current Approach)
```
ninochavez.co/blog → proxies signal-dispatch-blog.vercel.app
```
**Benefit:** URL stays ninochavez.co/blog, all SEO benefits accrue to main domain.

---

## Testing the Setup

After deployment, verify:

1. **URL stays on ninochavez.co:**
   - Visit `ninochavez.co/blog`
   - Confirm URL bar shows `ninochavez.co/blog` (not the internal Vercel URL)

2. **Content loads correctly:**
   - Blog posts visible
   - Images load
   - CSS/JS works
   - Navigation functions

3. **Google sees correct URLs:**
   ```bash
   # Fetch as Googlebot would see it
   curl -A "Googlebot" https://ninochavez.co/blog
   ```

4. **Internal links work:**
   - Links between portfolio and blog work
   - All assets load from ninochavez.co

---

## Canonical Tags (Important!)

Make sure your blog and gallery apps set canonical URLs:

**In Blog App (Signal Dispatch):**
```html
<head>
  <link rel="canonical" href="https://ninochavez.co/blog/post-slug" />
</head>
```

**In Gallery App:**
```html
<head>
  <link rel="canonical" href="https://ninochavez.co/gallery" />
</head>
```

This tells Google: "Even though I'm hosted on Vercel, my canonical URL is ninochavez.co"

---

## Summary

**Your current approach is SEO-optimal:**
- ✅ Keep 3 separate apps (good for development)
- ✅ Use Vercel rewrites/proxies (good for SEO)
- ✅ All content appears on ninochavez.co (builds domain authority)
- ✅ No URL changes in browser (clean user experience)

**DO NOT:**
- ❌ Combine into monorepo (unnecessary complexity)
- ❌ Use separate domains (splits authority)
- ❌ Use HTTP redirects (bad for SEO)

**You're doing it right!** 🎯
