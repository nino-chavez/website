// Phase 3: Smart Suggestions System
// Generate contextual booking suggestions based on user behavior and availability

import type { SmartSuggestion, BookingContext } from '$lib/types/cal';

/**
 * Get user's timezone
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Get current hour in user's timezone
 */
export function getCurrentHour(): number {
  return new Date().getHours();
}

/**
 * Get current day of week (0 = Sunday)
 */
export function getDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Get last visit timestamp from localStorage
 */
export function getLastVisit(): number | null {
  if (typeof window === 'undefined') return null;
  const lastVisit = localStorage.getItem('cal_last_visit');
  return lastVisit ? parseInt(lastVisit, 10) : null;
}

/**
 * Update last visit timestamp
 */
export function updateLastVisit(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cal_last_visit', Date.now().toString());
}

/**
 * Check if suggestion was already shown this session
 */
export function wasSuggestionShown(): boolean {
  if (typeof window === 'undefined') return true;
  return sessionStorage.getItem('cal_suggestion_shown') === 'true';
}

/**
 * Mark suggestion as shown for this session
 */
export function markSuggestionShown(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('cal_suggestion_shown', 'true');
}

/**
 * Build booking context from current state
 */
export function buildBookingContext(
  availableSlots: number,
  nextSlotTime?: string
): BookingContext {
  const hasAfternoonSlots = nextSlotTime 
    ? new Date(nextSlotTime).getHours() >= 12 
    : false;

  return {
    userTimezone: getUserTimezone(),
    dayOfWeek: getDayOfWeek(),
    hourOfDay: getCurrentHour(),
    lastVisit: getLastVisit(),
    availableSlots,
    hasAfternoonSlots,
  };
}

/**
 * Generate smart suggestion based on context
 */
export function generateSmartSuggestion(context: BookingContext): SmartSuggestion | null {
  const { dayOfWeek, hourOfDay, lastVisit, availableSlots, hasAfternoonSlots } = context;

  // Don't show if already shown this session
  if (wasSuggestionShown()) {
    return null;
  }

  // High urgency: Very limited availability
  if (availableSlots <= 2 && availableSlots > 0) {
    return {
      message: `Only ${availableSlots} slot${availableSlots === 1 ? '' : 's'} left this week—book now`,
      urgency: 'high',
    };
  }

  // High urgency: Friday afternoon (slots fill up over weekend)
  if (dayOfWeek === 5 && hourOfDay >= 14) {
    return {
      message: 'Monday slots filling fast—lock in your spot before the weekend',
      urgency: 'high',
    };
  }

  // Medium urgency: Morning hours with afternoon availability
  if (hourOfDay < 10 && hasAfternoonSlots) {
    return {
      message: 'Book your afternoon slot before the lunch rush',
      urgency: 'medium',
    };
  }

  // Medium urgency: Returning visitor
  if (lastVisit) {
    const daysSinceVisit = (Date.now() - lastVisit) / (1000 * 60 * 60 * 24);
    if (daysSinceVisit >= 7) {
      return {
        message: 'New availability opened since your last visit',
        urgency: 'medium',
      };
    }
  }

  // Low urgency: Limited slots but not critical
  if (availableSlots <= 5 && availableSlots > 2) {
    return {
      message: `${availableSlots} slots available this week`,
      urgency: 'low',
    };
  }

  // Low urgency: Thursday/Friday (plan ahead for next week)
  if (dayOfWeek >= 4 && availableSlots > 5) {
    return {
      message: 'Plan ahead—book your slot for next week',
      urgency: 'low',
    };
  }

  // Default: No suggestion
  return null;
}

/**
 * Get urgency color for styling
 */
export function getUrgencyColor(urgency: 'high' | 'medium' | 'low'): string {
  switch (urgency) {
    case 'high':
      return 'text-red-400';
    case 'medium':
      return 'text-amber-400';
    case 'low':
      return 'text-violet-400';
    default:
      return 'text-white/60';
  }
}

/**
 * Get urgency icon
 */
export function getUrgencyIcon(urgency: 'high' | 'medium' | 'low'): string {
  switch (urgency) {
    case 'high':
      return '⚡';
    case 'medium':
      return '🎯';
    case 'low':
      return '💡';
    default:
      return 'ℹ️';
  }
}

/**
 * Check if user should see a suggestion
 * Combines context and display rules
 */
export function shouldShowSuggestion(
  availableSlots: number,
  nextSlotTime?: string
): boolean {
  // Don't show if no slots available
  if (availableSlots === 0) return false;

  // Don't show if already shown this session
  if (wasSuggestionShown()) return false;

  // Build context and check if suggestion would be generated
  const context = buildBookingContext(availableSlots, nextSlotTime);
  const suggestion = generateSmartSuggestion(context);

  return suggestion !== null;
}