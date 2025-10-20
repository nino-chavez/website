// Cal.com API Client
// Centralized API interaction with error handling and type safety

import type { CalEventType, CalSchedule, CalUser } from '$lib/types/cal';
import { env } from '$env/dynamic/private';

class CalComAPIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'CalComAPIError';
  }
}

/**
 * Base fetch wrapper for Cal.com API calls
 * Uses API v2 with Bearer token authentication
 */
async function calFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const apiKey = env.CAL_API_KEY;
  const baseUrl = env.CAL_API_BASE_URL || 'https://api.cal.com/v2';
  
  if (!apiKey) {
    throw new CalComAPIError('CAL_API_KEY environment variable is not set');
  }
  
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new CalComAPIError(
      `Cal.com API error: ${response.statusText} - ${error}`,
      response.status
    );
  }

  return response.json();
}

/**
 * Fetch all event types for the authenticated user
 * v2 API returns nested structure: { data: { eventTypeGroups: [{ eventTypes: [...] }] } }
 */
export async function getEventTypes(): Promise<CalEventType[]> {
  try {
    const response = await calFetch<{
      data: {
        eventTypeGroups: Array<{ eventTypes: any[] }>
      }
    }>('/event-types');
    
    // Extract event types from nested structure
    const allEventTypes = response.data?.eventTypeGroups?.flatMap(group =>
      (group.eventTypes || []).map(et => ({
        id: et.id,
        title: et.title,
        slug: et.slug,
        description: et.description,
        length: et.length,
        bookingUrl: `https://cal.com/nino-chavez/${et.slug}`,
        hidden: et.hidden,
        metadata: et.metadata
      }))
    ) || [];
    
    return allEventTypes;
  } catch (error) {
    console.error('Error fetching event types:', error);
    return [];
  }
}

/**
 * Fetch a specific event type by ID
 * v2 API returns { data: {...} }
 */
export async function getEventType(eventTypeId: number): Promise<CalEventType | null> {
  try {
    const data = await calFetch<{ data: CalEventType }>(`/event-types/${eventTypeId}`);
    return data.data;
  } catch (error) {
    console.error(`Error fetching event type ${eventTypeId}:`, error);
    return null;
  }
}

/**
 * Fetch user schedules
 * v2 API endpoint
 */
export async function getSchedules(): Promise<CalSchedule[]> {
  try {
    const data = await calFetch<{ data: CalSchedule[] }>('/schedules');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return [];
  }
}

/**
 * Fetch authenticated user profile
 * v2 API: /users/me
 */
export async function getUserProfile(): Promise<CalUser | null> {
  try {
    const data = await calFetch<{ data: CalUser }>('/users/me');
    return data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Get available slots for a specific event type
 * v2 API: /slots?eventTypeId=X&start=YYYY-MM-DD&end=YYYY-MM-DD
 */
export async function getAvailableSlots(
  eventTypeId: number,
  startDate: string,
  endDate: string
): Promise<string[]> {
  try {
    // Convert ISO datetime to date format (YYYY-MM-DD)
    const start = startDate.split('T')[0];
    const end = endDate.split('T')[0];
    
    // Slots endpoint requires cal-api-version header
    const data = await calFetch<{ data: Record<string, Array<{ start: string }>> }>(
      `/slots?eventTypeId=${eventTypeId}&start=${start}&end=${end}`,
      {
        headers: {
          'cal-api-version': '2024-09-04'
        }
      }
    );
    
    // v2 slots API returns: { data: { "2050-09-05": [{ start: "..." }] } }
    const allSlots: string[] = [];
    if (data.data) {
      Object.values(data.data).forEach(daySlots => {
        daySlots.forEach(slot => {
          if (slot.start) allSlots.push(slot.start);
        });
      });
    }
    
    return allSlots.sort();
  } catch (error) {
    console.error(`Error fetching slots for event type ${eventTypeId}:`, error);
    return [];
  }
}

/**
 * Create a webhook subscription
 */
export async function createWebhook(
  url: string,
  eventTriggers: string[]
): Promise<{ id: number } | null> {
  try {
    const data = await calFetch<{ data: { id: number } }>('/webhooks', {
      method: 'POST',
      body: JSON.stringify({
        subscriberUrl: url,
        eventTriggers,
        active: true,
      }),
    });
    return data.data;
  } catch (error) {
    console.error('Error creating webhook:', error);
    return null;
  }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Implementation depends on Cal.com's webhook signature method
  // Typically HMAC-SHA256
  try {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return signature === expectedSignature;
  } catch (error) {
    console.error('Error verifying webhook signature:', error);
    return false;
  }
}