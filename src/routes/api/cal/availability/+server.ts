// Phase 1: Ambient Availability API
// Returns current availability status for display in Portfolio section

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSchedules, getEventTypes, getAvailableSlots } from '$lib/utils/calClient';
import { calculateAvailabilityStatus } from '$lib/utils/availabilityHelpers';

export const GET: RequestHandler = async ({ setHeaders }) => {
  try {
    // Set cache headers (15 minutes as per architecture plan)
    setHeaders({
      'Cache-Control': 'public, max-age=900', // 15 minutes
      'CDN-Cache-Control': 'public, max-age=900',
    });

    // Fetch schedules and event types in parallel
    const [schedules, eventTypes] = await Promise.all([
      getSchedules(),
      getEventTypes()
    ]);

    if (eventTypes.length === 0) {
      // Graceful degradation - return unavailable status
      return json({
        status: 'unavailable',
        nextSlot: null,
        message: 'Currently unavailable',
        slotsThisWeek: 0,
      });
    }

    // Get available slots for all event types this week
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Fetch slots for all event types
    const slotPromises = eventTypes
      .filter(et => !et.hidden)
      .map(et => 
        getAvailableSlots(
          et.id,
          today.toISOString(),
          nextWeek.toISOString()
        )
      );

    const allSlotArrays = await Promise.all(slotPromises);
    const allSlots = allSlotArrays.flat().sort();

    // Calculate availability status
    const nextSlot = allSlots.length > 0 ? allSlots[0] : null;
    const availabilityStatus = calculateAvailabilityStatus(nextSlot, allSlots.length);

    return json(availabilityStatus);
  } catch (err) {
    console.error('Error fetching availability:', err);
    
    // Graceful degradation - return limited status
    return json({
      status: 'limited',
      nextSlot: null,
      message: 'Check calendar for availability',
      slotsThisWeek: 0,
    });
  }
};