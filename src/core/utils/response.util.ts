// ============================================================================
// core/utils/response.util.ts - Response Helpers
// ============================================================================
import type { IApiResponse } from "@core/interfaces/index.js";

/**
 * Success response helper
 */
export function successResponse<T>(
  data: T,
  message?: string,
): IApiResponse<T> {
  return {
    success: true,
    ...(message !== undefined ? { message } : {}),
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: "",
      version: "v1",
    },
  } as IApiResponse<T>;
}

/**
 * Error response helper
 */
export function errorResponse(
  code: string,
  message: string,
  details?: any,
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
      requestId: "",
      version: "v1",
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
  message?: string,
): IApiResponse<T[]> {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  return {
    success: true,
    ...(message !== undefined ? { message } : {}),
    data,
    meta: {
      timestamp: new Date().toISOString(),
      requestId: "",
      version: "v1",
    },
    // include pagination in a consistent shape
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  } as unknown as IApiResponse<T[]>;
}
