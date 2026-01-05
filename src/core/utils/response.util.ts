// ============================================================================
// core/utils/response.util.ts - Response Helpers
// ============================================================================
import { IApiResponse } from '@core/interfaces/index.js';

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  message?: string
): IApiResponse<T> {
  return {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: '',
      version: 'v1',
    },
  };
}

/**
 * Error response helper
 */
export function errorResponse(
  code: string,
  message: string,
  details?: any
): IApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
      requestId: '',
      version: 'v1',
    },
  };
}

/**
 * Paginated response helper
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message?: string
): IApiResponse<T[]> {
  return {
    success: true,
    message,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: '',
      version: 'v1',
    },
  };
}