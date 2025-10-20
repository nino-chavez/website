// Availability Processing Utilities
// Transform Cal.com API data into user-friendly formats

import type {
  AvailabilityStatus,
  NextAvailableSlot,
  EnrichedEventType,
  AvailabilitySlot,
  CalEventType
} from '$lib/types/cal';

/**
 * Format a date/time into a human-readable relative format
 */
export function formatRelativeTime(isoString: string, timezone: string = 'America/Chicago'): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Format time
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  });

  // Same day
  if (diffDays === 0 && date.getDate() === now.getDate()) {
    if (diffHours < 1) {
      return `In ${diffMins} minutes`;
    }
    return `Today at ${timeStr}`;
  }

  // Tomorrow
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth()) {
    return `Tomorrow at ${timeStr}`;
  }

  // This week (next 7 days)
  if (diffDays <= 7) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: timezone });
    return `${dayName} at ${timeStr}`;
  }

  // Beyond this week
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone,
  });
}

/**
 * Calculate availability status based on next available slot
 */
export function calculateAvailabilityStatus(
  nextSlot: string | null,
  totalSlotsThisWeek: number
): AvailabilityStatus {
  if (!nextSlot) {
    return {
      status: 'unavailable',
      nextSlot: null,
      message: 'Fully booked this week',
      slotsThisWeek: 0,
    };
  }

  const slotDate = new Date(nextSlot);
  const now = new Date();
  const hoursUntil = (slotDate.getTime() - now.getTime()) / 3600000;

  let status: 'available' | 'limited' | 'unavailable' = 'available';
  let message = 'Available now';

  if (totalSlotsThisWeek <= 3) {
    status = 'limited';
    message = `Limited availability (${totalSlotsThisWeek} slots left)`;
  } else if (hoursUntil <= 24) {
    status = 'available';
    message = 'Available today';
  } else if (hoursUntil <= 168) {
    // Within a week
    status = 'available';
    message = 'Available this week';
  } else {
    status = 'limited';
    message = 'Book ahead';
  }

  return {
    status,
    nextSlot: {
      dateTime: nextSlot,
      displayTime: formatRelativeTime(nextSlot),
      timestamp: slotDate.getTime(),
    },
    message,
    slotsThisWeek: totalSlotsThisWeek,
  };
}

/**
 * Map event type purpose from title
 */
export function mapEventPurpose(title: string): string {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('quick') || titleLower.includes('check-in')) {
    return 'Perfect for: Initial questions, project fit discussion';
  }
  if (titleLower.includes('architecture') || titleLower.includes('review')) {
    return 'Perfect for: Technical deep-dive, platform strategy';
  }
  if (titleLower.includes('photo') || titleLower.includes('photography')) {
    return 'Perfect for: Tournament coverage, team photography';
  }
  if (titleLower.includes('consultation') || titleLower.includes('consulting')) {
    return 'Perfect for: Strategic planning, enterprise guidance';
  }
  
  return 'Professional consultation';
}

/**
 * Map event type to photography-themed icon
 */
export function mapEventIcon(title: string, duration: number): string {
  const titleLower = title.toLowerCase();
  
  // Duration-based mapping
  if (duration <= 15) return '⚡'; // Flash - quick
  if (duration >= 60) return '🏗️'; // Frame - deep dive
  
  // Purpose-based mapping
  if (titleLower.includes('photo')) return '📸'; // Exposure
  if (titleLower.includes('quick') || titleLower.includes('check')) return '🎯'; // Focus
  if (titleLower.includes('architecture') || titleLower.includes('review')) return '🏗️'; // Frame
  
  return '💼'; // Default business
}

/**
 * Calculate urgency level for event type display
 */
export function calculateUrgency(
  availableSlots: AvailabilitySlot[],
  totalSlotsThisWeek: number
): 'high' | 'medium' | 'low' {
  if (totalSlotsThisWeek <= 2) return 'high';
  if (availableSlots.length > 0 && availableSlots[0].isToday) return 'high';
  if (totalSlotsThisWeek <= 5) return 'medium';
  return 'low';
}

/**
 * Process raw slots into AvailabilitySlot objects
 */
export function processAvailabilitySlots(
  rawSlots: string[],
  limit: number = 3
): AvailabilitySlot[] {
  const now = new Date();
  const today = now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toDateString();

  return rawSlots.slice(0, limit).map((slot) => {
    const slotDate = new Date(slot);
    const slotDateStr = slotDate.toDateString();

    return {
      dateTime: slot,
      displayTime: formatRelativeTime(slot),
      isToday: slotDateStr === today,
      isTomorrow: slotDateStr === tomorrowStr,
    };
  });
}

/**
 * Enrich event type with availability and metadata
 */
export function enrichEventType(
  eventType: CalEventType,
  availabilitySlots: string[],
  totalSlotsThisWeek: number
): EnrichedEventType {
  const slots = processAvailabilitySlots(availabilitySlots);
  
  return {
    ...eventType,
    availability: slots,
    icon: mapEventIcon(eventType.title, eventType.length),
    purpose: mapEventPurpose(eventType.title),
    urgency: calculateUrgency(slots, totalSlotsThisWeek),
  };
}

/**
 * Sort event types by priority for display
 */
export function sortEventTypesByPriority(
  eventTypes: EnrichedEventType[]
): EnrichedEventType[] {
  return [...eventTypes].sort((a, b) => {
    // Priority 1: Urgency (high > medium > low)
    const urgencyOrder = { high: 0, medium: 1, low: 2 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }

    // Priority 2: Duration (shorter first)
    if (a.length !== b.length) {
      return a.length - b.length;
    }

    // Priority 3: Availability (more slots first)
    return b.availability.length - a.availability.length;
  });
}

/**
 * Filter event types for display (max 3, exclude hidden)
 */
export function filterEventTypesForDisplay(
  eventTypes: EnrichedEventType[],
  maxCount: number = 3
): EnrichedEventType[] {
  return sortEventTypesByPriority(eventTypes)
    .filter(et => !et.hidden && et.availability.length > 0)
    .slice(0, maxCount);
}