# Cal.com Integration - Quick Start Guide

Get the intelligent booking system running in 5 minutes.

## Prerequisites

- Cal.com account with API access
- Node.js 18+ and pnpm installed
- Project already cloned

## Setup Steps

### 1. Get Your API Key (2 minutes)

1. Visit [app.cal.com/settings/developer/api-keys](https://app.cal.com/settings/developer/api-keys)
2. Click "New API Key"
3. Copy the key (starts with `cal_live_`)

### 2. Configure Environment (1 minute)

Create `.env` in project root:

```bash
# Required
CAL_API_KEY=cal_live_your_actual_key_here
PUBLIC_CAL_USERNAME=your-cal-username

# Optional (defaults provided)
CAL_API_BASE_URL=https://api.cal.com/v2
CAL_WEBHOOK_SECRET=generate_random_string_here
```

**Find your username**: It's in your Cal.com booking URL:  
`https://cal.com/YOUR-USERNAME/meeting`

### 3. Install & Run (2 minutes)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:5173` and scroll to the Portfolio section.

## What You'll See

✅ **Green availability indicator** - "Available today" with next slot time  
✅ **3 dynamic event cards** - Your actual Cal.com meeting types  
✅ **Smart suggestion toast** - Context-aware booking tips (if conditions met)  

## Verify It's Working

### Check 1: Availability Indicator
- Should show colored dot (green/amber/red)
- Should display "Next: [time]"
- Updates every 15 minutes

### Check 2: Event Type Cards
- Should show 1-3 cards with your event types
- Each card shows 🎯 📸 🏗️ or ⚡ icon
- "Book Now" buttons link to Cal.com
- Updates every 5 minutes

### Check 3: Smart Suggestions
- May not appear immediately (context-dependent)
- Try visiting during different times of day
- Clear browser session and revisit to see different suggestions

## Troubleshooting

### "Module not found" errors
```bash
pnpm install
# Restart dev server
```

### "401 Unauthorized" in console
- Verify API key is correct in `.env`
- Ensure no extra spaces in `.env` file
- Restart dev server after changing `.env`

### No event cards showing
- Check Cal.com dashboard → Event Types
- Ensure at least one event type is NOT hidden
- Verify schedules are configured with availability

### Components not loading
```bash
# Check browser console (F12)
# Look for error messages
# Common issues:
# - Missing environment variables
# - Incorrect API key
# - Network issues
```

## Next Steps

### Production Deployment

1. **Add to Vercel**:
   - Dashboard → Settings → Environment Variables
   - Add all variables from `.env`
   - Redeploy

2. **Setup Webhooks** (optional):
   - Get production URL from Vercel
   - Cal.com dashboard → Webhooks
   - Add webhook: `https://your-site.com/api/cal/webhooks`
   - Copy webhook secret to Vercel env vars

### Customization

**Change icons**: Edit `src/lib/utils/availabilityHelpers.ts` → `mapEventIcon()`  
**Adjust suggestions**: Edit `src/lib/utils/smartSuggestions.ts` → `generateSmartSuggestion()`  
**Modify cards**: Edit `src/lib/components/cal/EventTypeCards.svelte`  

## Resources

- [Full Documentation](./CAL-COM-INTEGRATION.md)
- [Cal.com API Docs](https://cal.com/docs)
- [Component Examples](../src/lib/components/cal/)

## Support

Issues? Email: hello@ninochavez.co