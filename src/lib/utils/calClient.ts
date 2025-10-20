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
      'x-cal-secret-key': apiKey,
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
 */
export async function getEventTypes(): Promise<CalEventType[]> {
  try {
    const data = await calFetch<{ data: CalEventType[] }>('/event-types');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching event types:', error);
    return [];
  }
}

/**
 * Fetch a specific event type by ID
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
 * Note: Cal.com API v2 may require different endpoint - adjust as needed
 */
export async function getAvailableSlots(
  eventTypeId: number,
  startDate: string,
  endDate: string
): Promise<string[]> {
  try {
    // This endpoint structure may vary - consult Cal.com API docs
    const data = await calFetch<{ data: { slots: string[] } }>(
      `/slots?eventTypeId=${eventTypeId}&startTime=${startDate}&endTime=${endDate}`
    );
    return data.data?.slots || [];
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