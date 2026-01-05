import { describe, it, expect } from 'vitest';
import {
  addDaysFromNow,
  addHoursFromNow,
  addMinutesFromNow,
  isExpired,
  toISOString,
  getTimestamp,
} from '../../src/core/utils/date.util.js';

describe('Date Utilities', () => {
  describe('addDaysFromNow', () => {
    it('should add days to the current date', () => {
      const days = 5;
      const result = addDaysFromNow(days);
      const now = new Date();
      expect(result.getDate()).toBeGreaterThanOrEqual(now.getDate());
      // basic check to see if it's in the future
      expect(result.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('addHoursFromNow', () => {
    it('should add hours to the current date', () => {
      const hours = 5;
      const result = addHoursFromNow(hours);
      const now = new Date();
      expect(result.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('addMinutesFromNow', () => {
    it('should add minutes to the current date', () => {
      const minutes = 30;
      const result = addMinutesFromNow(minutes);
      const now = new Date();
      expect(result.getTime()).toBeGreaterThan(now.getTime());
    });
  });

  describe('isExpired', () => {
    it('should return true for a past date', () => {
      const pastDate = new Date(Date.now() - 1000);
      expect(isExpired(pastDate)).toBe(true);
    });

    it('should return false for a future date', () => {
      const futureDate = new Date(Date.now() + 10000);
      expect(isExpired(futureDate)).toBe(false);
    });
  });

  describe('toISOString', () => {
    it('should format a date to ISO string', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      const result = toISOString(date);
      expect(result).toContain('2023-01-01');
    });
  });

  describe('getTimestamp', () => {
    it('should return the current timestamp', () => {
      const result = getTimestamp();
      const now = Date.now();
      expect(result).toBeGreaterThanOrEqual(now - 100);
      expect(result).toBeLessThanOrEqual(now + 100);
    });
  });
});
