// Phase 2: Event Types API
// Returns enriched event types with availability for display cards

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getEventTypes, getAvailableSlots } from '$lib/utils/calClient';
import {
  enrichEventType,
  filterEventTypesForDisplay,
} from '$lib/utils/availabilityHelpers';

export const GET: RequestHandler = async ({ setHeaders }) => {
  try {
    // Set cache headers (5 minutes as per architecture plan)
    setHeaders({
      'Cache-Control': 'public, max-age=300', // 5 minutes
      'CDN-Cache-Control': 'public, max-age=300',
    });

    // Fetch event types
    const eventTypes = await getEventTypes();

    if (eventTypes.length === 0) {
      return json([]);
    }

    // Define time range (next 7 days)
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Enrich each event type with availability
    const enrichedPromises = eventTypes
      .filter(et => !et.hidden)
      .map(async (eventType) => {
        try {
          const slots = await getAvailableSlots(
            eventType.id,
            today.toISOString(),
            nextWeek.toISOString()
          );

          return enrichEventType(eventType, slots, slots.length);
        } catch (err) {
          console.error(`Error enriching event type ${eventType.id}:`, err);
          // Return with empty availability on error
          return enrichEventType(eventType, [], 0);
        }
      });

    const enrichedEventTypes = await Promise.all(enrichedPromises);

    // Filter and sort for display (max 3)
    const displayEventTypes = filterEventTypesForDisplay(enrichedEventTypes, 3);

    return json(displayEventTypes);
  } catch (err) {
    console.error('Error fetching event types:', err);
    return json([]);
  }
};