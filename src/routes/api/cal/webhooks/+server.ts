// Phase 4: Webhook Intelligence
// Handles Cal.com webhook events for real-time updates

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { WebhookEvent } from '$lib/types/cal';
import { verifyWebhookSignature } from '$lib/utils/calClient';
import { env } from '$env/dynamic/private';

// In-memory cache for booking metrics (in production, use Redis or database)
let bookingMetrics = {
  totalBookings: 0,
  bookingsByType: {} as Record<number, number>,
  lastBookingTime: null as number | null,
};

/**
 * GET handler - returns current booking metrics
 */
export const GET: RequestHandler = async () => {
  return json(bookingMetrics);
};

/**
 * POST handler - processes webhook events from Cal.com
 */
export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-cal-signature') || '';
    const webhookSecret = env.CAL_WEBHOOK_SECRET;

    // Verify webhook signature for security
    if (webhookSecret && !verifyWebhookSignature(body, signature, webhookSecret)) {
      return json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: WebhookEvent = JSON.parse(body);

    // Process different event types
    switch (event.type) {
      case 'BOOKING_CREATED':
        handleBookingCreated(event);
        break;
      
      case 'BOOKING_RESCHEDULED':
        handleBookingRescheduled(event);
        break;
      
      case 'BOOKING_CANCELLED':
        handleBookingCancelled(event);
        break;
      
      default:
        console.log('Unhandled webhook event type:', event.type);
    }

    // Invalidate availability cache (trigger revalidation)
    // In production, this would invalidate CDN cache or trigger ISR
    console.log('Webhook processed, cache should be invalidated');

    return json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return json({ error: 'Webhook processing failed' }, { status: 500 });
  }
};

/**
 * Handle booking created events
 */
function handleBookingCreated(event: WebhookEvent): void {
  bookingMetrics.totalBookings += 1;
  bookingMetrics.lastBookingTime = Date.now();
  
  const eventTypeId = event.booking.eventTypeId;
  bookingMetrics.bookingsByType[eventTypeId] = 
    (bookingMetrics.bookingsByType[eventTypeId] || 0) + 1;

  console.log('Booking created:', {
    eventType: event.eventType.title,
    startTime: event.booking.startTime,
  });
}

/**
 * Handle booking rescheduled events
 */
function handleBookingRescheduled(event: WebhookEvent): void {
  console.log('Booking rescheduled:', {
    eventType: event.eventType.title,
    newTime: event.booking.startTime,
  });
}

/**
 * Handle booking cancelled events
 */
function handleBookingCancelled(event: WebhookEvent): void {
  bookingMetrics.totalBookings = Math.max(0, bookingMetrics.totalBookings - 1);
  
  console.log('Booking cancelled:', {
    eventType: event.eventType.title,
    originalTime: event.booking.startTime,
  });
}