// ============================================================================
// src/core/utils/api.helper.ts - API Utilities
// ============================================================================
import type { Request } from 'express';

/**
 * Extract pagination parameters from request
 */
export function extractPaginationParams(req: Request) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

/**
 * Extract sort parameters from request
 */
export function extractSortParams(req: Request) {
  const sortBy = (req.query.sortBy as string) || 'createdAt';
  const sortOrder = (req.query.sortOrder as string) === 'asc' ? 'asc' : 'desc';

  return { sortBy, sortOrder };
}

/**
 * Build filter object from query parameters
 */
export function buildFilters(req: Request, allowedFields: string[]): Record<string, unknown> {
  const filters: Record<string, unknown> = {};

  allowedFields.forEach((field) => {
    if (req.query[field]) {
      filters[field] = req.query[field];
    }
  });

  return filters;
}

/**
 * Calculate pagination metadata
 */
export function calculatePaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
}
