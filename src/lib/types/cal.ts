// Cal.com API Types
// Based on Cal.com API v2 documentation

export interface CalSchedule {
  id: number;
  name: string;
  isDefault: boolean;
  availability: CalAvailability[];
}

export interface CalAvailability {
  days: number[];
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
}

export interface CalEventType {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  length: number; // Duration in minutes
  bookingUrl: string;
  hidden: boolean;
  metadata?: {
    purpose?: string;
    icon?: string;
  };
}

export interface CalBooking {
  id: number;
  uid: string;
  title: string;
  description: string | null;
  startTime: string; // ISO 8601
  endTime: string; // ISO 8601
  status: 'ACCEPTED' | 'PENDING' | 'CANCELLED';
  eventTypeId: number;
}

export interface CalUser {
  id: number;
  username: string;
  email: string;
  name: string;
  bio: string | null;
  timeZone: string;
}

// Application-level types

export interface AvailabilityStatus {
  status: 'available' | 'limited' | 'unavailable';
  nextSlot: NextAvailableSlot | null;
  message: string;
  slotsThisWeek: number;
}

export interface NextAvailableSlot {
  dateTime: string; // ISO 8601
  displayTime: string; // e.g., "Today at 2pm CT"
  timestamp: number;
}

export interface EnrichedEventType extends CalEventType {
  availability: AvailabilitySlot[];
  icon: string;
  purpose: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface AvailabilitySlot {
  dateTime: string; // ISO 8601
  displayTime: string; // e.g., "Tomorrow 10am"
  isToday: boolean;
  isTomorrow: boolean;
}

export interface SmartSuggestion {
  message: string;
  urgency: 'high' | 'medium' | 'low';
  action?: {
    label: string;
    eventTypeId: number;
  };
}

export interface BookingContext {
  userTimezone: string;
  dayOfWeek: number; // 0-6 (Sunday = 0)
  hourOfDay: number; // 0-23
  lastVisit: number | null; // timestamp
  availableSlots: number;
  hasAfternoonSlots: boolean;
}

export interface WebhookEvent {
  type: 'BOOKING_CREATED' | 'BOOKING_RESCHEDULED' | 'BOOKING_CANCELLED';
  booking: CalBooking;
  eventType: CalEventType;
  timestamp: string;
}

export interface BookingMetrics {
  totalBookings: number;
  bookingsByType: Record<number, number>;
  lastBookingTime: number | null;
}