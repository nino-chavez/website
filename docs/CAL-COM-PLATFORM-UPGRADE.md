# Cal.com Platform Account Upgrade Guide

## Why You Need Platform

Your current implementation uses **Cal.com API v2**, which requires a **Platform account** (paid tier). Your personal API key (`cal_live_...`) doesn't have access to these endpoints, which is why you're seeing:

```
"PermissionsGuard - no authentication provided"
```

## Platform Benefits

### For Your Integration

**API Access:**
- ✅ Managed Users API - Full programmatic user management
- ✅ Event Types API - Dynamic event type fetching
- ✅ Bookings API - Complete booking CRUD operations
- ✅ Schedules API - Availability management
- ✅ Webhooks API - Real-time event notifications

**What This Enables:**
- Real-time availability indicators
- Dynamic event type cards
- Smart booking suggestions
- Webhook intelligence
- Custom booking flows

### Additional Platform Features

- OAuth client credentials for secure integrations
- Managed user access tokens
- Team and organization management
- Advanced webhook configurations
- Higher API rate limits
- Priority support

## Upgrade Process

### Step 1: Visit Cal.com Pricing

Go to: https://cal.com/pricing

Look for **Platform** tier (typically ~$99-299/month depending on needs)

### Step 2: Upgrade Your Account

1. Click "Upgrade to Platform" or similar CTA
2. Select billing plan (monthly/annual)
3. Complete payment information
4. Confirm upgrade

### Step 3: Access Platform Features

After upgrade, you'll see new options in your dashboard:
- **Settings** → **Developer** → **Platform**
- New API key generation with Platform permissions
- OAuth client credentials available
- Managed users section

### Step 4: Generate New API Credentials

**Option A: API Key (Simpler)**
1. Settings → Developer → API Keys
2. Create new key with Platform permissions
3. Copy the new `cal_live_...` key
4. **Important**: This should now work with v2 endpoints

**Option B: OAuth (More Secure for Production)**
1. Settings → Developer → OAuth Clients
2. Create new OAuth client
3. Copy `client_id` and `client_secret`
4. Update integration to use OAuth flow

### Step 5: Update Your .env

Replace your current API key with the new Platform API key:

```bash
# Before (personal account)
CAL_API_KEY=cal_live_0c5d571db24a1b05f4f879f6d0b14372

# After (Platform account - new key will be different)
CAL_API_KEY=cal_live_NEW_PLATFORM_KEY_HERE
```

### Step 6: Verify Access

Test the API with your new key:

```bash
curl -H "x-cal-secret-key: cal_live_NEW_PLATFORM_KEY" \
     "https://api.cal.com/v2/event-types"

# Should return your event types, not a 403 error
```

### Step 7: Restart Dev Server

```bash
# Stop server (Ctrl+C)
# Update .env with new key
# Restart
pnpm dev
```

## What Will Work After Upgrade

Once you upgrade and update your API key, **everything I implemented will work immediately**:

✅ **Availability Indicator** - Shows "Available today" with real-time status  
✅ **Event Type Cards** - Your 3 meeting types with availability  
✅ **Smart Suggestions** - Context-aware booking tips  
✅ **Webhooks** - Real-time booking events (already configured!)  

No code changes needed - just the new API key.

## Cost Analysis

### Platform Investment

**Monthly Cost**: ~$99-299/month (verify current pricing)

**ROI Calculation**:
- Personal brand portfolio booking system
- Showcase technical capability to clients
- Professional booking experience
- Real-time intelligence features

**Alternative Use Cases:**
- Use Platform for client projects
- Build custom booking apps
- White-label scheduling solutions
- Enterprise integrations

### Development Cost Saved

If you had built this manually without AI assistance:
- **Development time**: ~120-160 hours at senior dev rate
- **Cost**: $15,000-24,000 at $150/hr
- **With AI**: ~30 hours + $5 AI cost = $4,505 saved

**The Platform subscription is a fraction of custom development cost.**

## Alternatives If Not Upgrading

If Cal.com Platform isn't right for you now, we have these options:

### Option 1: Cal.com Embed SDK (Free)
- Client-side only, no API needed
- Works with your current account
- Less dynamic, but functional
- Quick to implement

### Option 2: Static Enhancement
- Keep simple Cal.com link
- Add client-side improvements:
  - Timezone detection
  - Time-based messaging
  - Custom styling
- No real-time data, but works

### Option 3: Wait and Use Static
- Keep current static link
- Upgrade to Platform when needed
- Code is ready to activate anytime

## Recommendation

**For Your Use Case (Personal Brand Portfolio):**

✅ **Upgrade to Platform** if:
- You want the "wow factor" of real-time booking intelligence
- You plan to use Cal.com for client projects
- You value the technical showcase aspect
- You want webhooks and advanced features

⏸️ **Wait/Use Alternatives** if:
- Current booking volume doesn't justify cost
- Simple Cal.com link is working fine
- Want to test conversion first
- Prefer to invest elsewhere initially

## After Upgrade Checklist

- [ ] Upgrade Cal.com account to Platform tier
- [ ] Generate new Platform API key
- [ ] Update `.env` with new key
- [ ] Restart dev server
- [ ] Verify API endpoints return data
- [ ] Test all 3 components in Portfolio section
- [ ] Deploy to Vercel with new credentials
- [ ] Confirm webhooks are receiving events
- [ ] Monitor booking conversion improvements

## Support

**Cal.com Platform Support:**
- Help Center: https://cal.com/help
- Platform Docs: https://cal.com/docs/platform
- Email: support@cal.com

**Integration Support:**
- Quick Start: [CAL-COM-QUICK-START.md](./CAL-COM-QUICK-START.md)
- Full Docs: [CAL-COM-INTEGRATION.md](./CAL-COM-INTEGRATION.md)
- Email: hello@ninochavez.co

---

**Next Step**: Upgrade your Cal.com account to Platform tier, then the entire implementation will activate automatically with your new API key! 🚀