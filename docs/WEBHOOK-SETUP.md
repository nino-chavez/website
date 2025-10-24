# Webhook Setup for Automatic Rebuilds

This document explains how to set up automatic rebuilds when new blog posts are published to signal-dispatch-blog.

## Overview

When you publish a new post to signal-dispatch-blog, a webhook automatically triggers a rebuild of nino-chavez-website on Vercel, ensuring the latest posts appear without manual intervention.

## Step 1: Create Vercel Deploy Hook

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **nino-chavez-website**
3. Navigate to **Settings** → **Git** → **Deploy Hooks**
4. Click **Create Hook**
5. Configure the hook:
   - **Name**: `blog-post-published`
   - **Branch**: `main` (or your default branch)
6. Click **Create Hook**
7. **Copy the webhook URL** (it will look like: `https://api.vercel.com/v1/integrations/deploy/...`)

## Step 2: Add Webhook URL to Blog Environment Variables

In your **signal-dispatch-blog** project:

1. Add the webhook URL to your environment variables:
   ```bash
   # In signal-dispatch-blog/.env
   PORTFOLIO_REBUILD_WEBHOOK_URL=https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID/YOUR_TOKEN
   ```

2. Add to Vercel environment variables:
   - Go to signal-dispatch-blog project in Vercel Dashboard
   - Navigate to **Settings** → **Environment Variables**
   - Add: `PORTFOLIO_REBUILD_WEBHOOK_URL` = (paste the webhook URL)

## Step 3: Trigger Webhook on Post Publish

In your blog's build or publish process, add a webhook call:

### Option A: Manual Trigger Script

Create `scripts/trigger-rebuild.js` in signal-dispatch-blog:

```javascript
// scripts/trigger-rebuild.js
const webhookUrl = process.env.PORTFOLIO_REBUILD_WEBHOOK_URL;

if (!webhookUrl) {
  console.log('No webhook URL configured, skipping portfolio rebuild');
  process.exit(0);
}

fetch(webhookUrl, { method: 'POST' })
  .then(res => res.json())
  .then(data => {
    console.log('✓ Portfolio rebuild triggered:', data.job);
  })
  .catch(err => {
    console.error('Failed to trigger rebuild:', err);
    // Don't fail the build if webhook fails
    process.exit(0);
  });
```

Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "node scripts/trigger-rebuild.js"
  }
}
```

### Option B: API Endpoint (for runtime triggers)

If your blog has an API, create an endpoint to trigger rebuilds:

```typescript
// blog/src/routes/api/trigger-rebuild/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const webhookUrl = process.env.PORTFOLIO_REBUILD_WEBHOOK_URL;

  if (!webhookUrl) {
    return json({ error: 'Webhook not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, { method: 'POST' });
    const data = await response.json();

    return json({
      success: true,
      message: 'Rebuild triggered',
      job: data.job
    });
  } catch (error) {
    return json({
      error: 'Failed to trigger rebuild',
      details: error.message
    }, { status: 500 });
  }
};
```

### Option C: Vercel Build Hook in Git Workflow

Add to `.github/workflows/trigger-rebuild.yml` in signal-dispatch-blog:

```yaml
name: Trigger Portfolio Rebuild

on:
  push:
    branches: [main]
    paths:
      - 'posts/**'
      - 'content/**'

jobs:
  trigger-rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: |
          curl -X POST "${{ secrets.PORTFOLIO_REBUILD_WEBHOOK_URL }}"
```

## Step 4: Test the Setup

### Test from command line:
```bash
curl -X POST "https://api.vercel.com/v1/integrations/deploy/YOUR_HOOK_ID/YOUR_TOKEN"
```

### Expected Response:
```json
{
  "job": {
    "id": "...",
    "state": "PENDING",
    "createdAt": 1234567890
  }
}
```

### Verify in Vercel:
1. Go to your nino-chavez-website project
2. Navigate to **Deployments**
3. You should see a new deployment triggered by "Deploy Hook"

## Troubleshooting

### Webhook not triggering
- Verify webhook URL is correct in blog environment variables
- Check Vercel deploy hook exists in dashboard
- Ensure the hook is for the correct branch

### Rebuild triggered but site not updating
- Check deployment logs in Vercel
- Verify blog origin is correct: `PUBLIC_BLOG_ORIGIN=https://blog.ninochavez.co`
- Ensure blog manifest endpoint is accessible: `https://blog.ninochavez.co/manifest.json`

### Build failures
- Check Vercel deployment logs for errors
- Verify blog adapter can fetch from blog origin
- Ensure fallback posts are working

## Security Notes

- **Keep webhook URLs secret** - they allow anyone to trigger deployments
- Store in environment variables, never commit to git
- Consider adding authentication to your blog's trigger endpoint if using Option B
- Monitor Vercel deployment frequency to detect abuse

## Maintenance

- **Webhook URL rotation**: If you need to regenerate the webhook URL, update it in both:
  1. Vercel Dashboard (delete old, create new)
  2. Blog environment variables (local and Vercel)

- **Monitor costs**: Each webhook triggers a build. Vercel has build minute limits on free tier.

## Next Steps

After setup:
1. Publish a test post to your blog
2. Wait 5-10 seconds
3. Check Vercel deployments
4. Verify new post appears on nino-chavez-website after deployment completes
