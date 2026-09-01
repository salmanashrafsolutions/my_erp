import { z } from 'zod';

// ==========================================
// 1. Universal API Response Envelope
// ==========================================

export interface ApiMeta {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: ApiMeta;
  error?: ApiError;
  timestamp: string;
}

export const ApiMetaSchema = z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1).max(100),
  totalCount: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
});

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export function createApiResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.boolean(),
    data: dataSchema,
    meta: ApiMetaSchema.optional(),
    error: ApiErrorSchema.optional(),
    timestamp: z.string().datetime(),
  });
}

// ==========================================
// 2. Pagination & Search Query Parameters
// ==========================================

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  companyId: z.string().uuid().optional(),
  branchId: z.string().uuid().optional(),
});

export type PaginationQueryParams = z.infer<typeof PaginationQuerySchema>;

// ==========================================
// 3. Shared Enums & Value Types
// ==========================================

export const DocumentStatusEnum = z.enum([
  'DRAFT',
  'PENDING_APPROVAL',
  'APPROVED',
  'CONFIRMED',
  'IN_PROGRESS',
  'SHIPPED',
  'DELIVERED',
  'POSTED',
  'PARTIAL',
  'PAID',
  'CANCELLED',
  'VOID',
  'OVERDUE',
  'REJECTED',
]);
export type DocumentStatus = z.infer<typeof DocumentStatusEnum>;

export const PaymentStatusEnum = z.enum([
  'UNPAID',
  'PARTIALLY_PAID',
  'PAID',
  'OVERDUE',
  'VOID',
]);
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;

export const CurrencyCodeEnum = z.enum(['USD', 'EUR', 'GBP', 'PKR', 'AED', 'SAR', 'CAD', 'AUD', 'CNY']);
export type CurrencyCode = z.infer<typeof CurrencyCodeEnum>;
