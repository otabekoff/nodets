// ============================================================================
// src/core/utils/date.util.ts - Date Utilities
// ============================================================================
import { addDays, addHours, addMinutes, formatISO, isPast } from 'date-fns';

/**
 * Add days to current date
 */
export function addDaysFromNow(days: number): Date {
  return addDays(new Date(), days);
}

/**
 * Add hours to current date
 */
export function addHoursFromNow(hours: number): Date {
  return addHours(new Date(), hours);
}

/**
 * Add minutes to current date
 */
export function addMinutesFromNow(minutes: number): Date {
  return addMinutes(new Date(), minutes);
}

/**
 * Check if date is expired
 */
export function isExpired(date: Date): boolean {
  return isPast(date);
}

/**
 * Format date to ISO string
 */
export function toISOString(date: Date): string {
  return formatISO(date);
}

/**
 * Get timestamp
 */
export function getTimestamp(): number {
  return Date.now();
}
