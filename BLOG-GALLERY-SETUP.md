# Blog & Gallery Custom Domain Setup

## Problem
Currently `/blog` and `/gallery` redirect but expose internal Vercel URLs in the browser address bar.

## Solution: Custom Subdomains

Set up custom domains for your blog and gallery so they live on your ninochavez.co domain.

---

## Option 1: Subdomains (Recommended)

### Step 1: Add Custom Domains to Blog Project
```bash
# Navigate to blog project directory
cd /path/to/signal-dispatch-blog

# Add custom domain
vercel domains add blog.ninochavez.co
```

### Step 2: Add Custom Domains to Gallery Project
```bash
# Navigate to gallery project directory
cd /path/to/nino-chavez-gallery

# Add custom domain
vercel domains add gallery.ninochavez.co
```

### Step 3: Update DNS Records
Add CNAME records in your domain registrar:
```
blog.ninochavez.co    → CNAME → cname.vercel-dns.com
gallery.ninochavez.co → CNAME → cname.vercel-dns.com
```

### Step 4: Update This Portfolio's Redirects
Update redirect destinations:
- `src/routes/blog/+page.server.ts` → `https://blog.ninochavez.co`
- `src/routes/gallery/+page.server.ts` → `https://gallery.ninochavez.co`

---

## Option 2: Path-Based Proxying (Current Approach)

Keep current URLs but accept that browser will show the actual destination.

**Pros:**
- No additional DNS setup
- Works immediately
- Separate deployment domains

**Cons:**
- Browser URL changes to internal Vercel domain
- Less "clean" from branding perspective

---

## Option 3: Monorepo Approach

Move blog and gallery into this project as routes:
- Copy blog code to `src/routes/blog/`
- Copy gallery code to `src/routes/gallery/`

**Pros:**
- Single deployment
- Clean URLs (ninochavez.co/blog stays in address bar)
- Unified analytics

**Cons:**
- Larger bundle size
- All deployments affect all sections
- More complex codebase

---

## Recommendation

**Use Option 1 (Subdomains):**
- Professional URLs: blog.ninochavez.co, gallery.ninochavez.co
- Keeps projects independent
- Clean branding
- Best for SEO (each subdomain can rank independently)

**Quick Setup:**
```bash
# 1. Add domains to projects
cd /path/to/signal-dispatch-blog
vercel domains add blog.ninochavez.co

cd /path/to/nino-chavez-gallery
vercel domains add gallery.ninochavez.co

# 2. Update DNS (in domain registrar)
# Add CNAME: blog.ninochavez.co → cname.vercel-dns.com
# Add CNAME: gallery.ninochavez.co → cname.vercel-dns.com

# 3. Update redirects in this project
# Edit src/routes/blog/+page.server.ts
# Edit src/routes/gallery/+page.server.ts
```

Then update sitemap.xml and robots.txt to reference the new subdomain URLs.

---

## Current Status

✅ Redirects working (307/308 HTTP redirects)
⚠️ Browser shows internal Vercel URLs
📋 Waiting on custom domain setup

**Next Action:** Set up blog.ninochavez.co and gallery.ninochavez.co subdomains
