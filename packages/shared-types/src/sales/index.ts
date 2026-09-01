import { z } from 'zod';

// ==========================================
// 1. Customer & CRM
// ==========================================

export const PaymentTermsEnum = z.enum([
  'IMMEDIATE',
  'NET_15',
  'NET_30',
  'NET_60',
  'NET_90',
  'CUSTOM',
]);
export type PaymentTerms = z.infer<typeof PaymentTermsEnum>;

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  email: z.string().email().nullable().optional(),
  phone: z.string().max(50).nullable().optional(),
  taxNumber: z.string().max(100).nullable().optional(),
  creditLimit: z.coerce.number().min(0).default(0),
  paymentTerms: PaymentTermsEnum.default('NET_30'),
  billingAddress: z.record(z.unknown()).nullable().optional(),
  shippingAddress: z.record(z.unknown()).nullable().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export type CustomerDto = z.infer<typeof CustomerSchema>;

export const CreateCustomerSchema = CustomerSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateCustomerDto = z.infer<typeof CreateCustomerSchema>;

// ==========================================
// 2. Sales Line Items
// ==========================================

export const SalesLineItemSchema = z.object({
  id: z.string().uuid().optional(),
  itemId: z.string().uuid(),
  itemSku: z.string().optional(),
  itemName: z.string().optional(),
  description: z.string().max(500).nullable().optional(),
  quantity: z.coerce.number().positive(),
  fulfilledQty: z.coerce.number().min(0).default(0),
  unitPrice: z.coerce.number().min(0),
  taxRate: z.coerce.number().min(0).max(100).default(0),
  taxAmount: z.coerce.number().min(0).default(0),
  discountAmount: z.coerce.number().min(0).default(0),
  lineTotal: z.coerce.number().min(0),
  availableStock: z.coerce.number().optional(),
});
export type SalesLineItemDto = z.infer<typeof SalesLineItemSchema>;

// ==========================================
// 3. Sales Quotation
// ==========================================

export const QuotationStatusEnum = z.enum([
  'DRAFT',
  'SENT',
  'ACCEPTED',
  'EXPIRED',
  'REJECTED',
]);
export type QuotationStatus = z.infer<typeof QuotationStatusEnum>;

export const SalesQuotationSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid(),
  customerId: z.string().uuid(),
  customerName: z.string().optional(),
  quotationNumber: z.string().max(100),
  quotationDate: z.string().date(),
  expiryDate: z.string().date(),
  status: QuotationStatusEnum.default('DRAFT'),
  subtotal: z.coerce.number().min(0),
  taxTotal: z.coerce.number().min(0),
  discountTotal: z.coerce.number().min(0).default(0),
  grandTotal: z.coerce.number().min(0),
  notes: z.string().max(1000).nullable().optional(),
  items: z.array(SalesLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type SalesQuotationDto = z.infer<typeof SalesQuotationSchema>;

export const CreateSalesQuotationSchema = SalesQuotationSchema.omit({
  id: true,
  quotationNumber: true,
  createdAt: true,
});
export type CreateSalesQuotationDto = z.infer<typeof CreateSalesQuotationSchema>;

// ==========================================
// 4. Sales Order
// ==========================================

export const SalesOrderStatusEnum = z.enum([
  'DRAFT',
  'CONFIRMED',
  'IN_PROGRESS',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
]);
export type SalesOrderStatus = z.infer<typeof SalesOrderStatusEnum>;

export const SalesOrderSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid(),
  customerId: z.string().uuid(),
  customerName: z.string().optional(),
  quotationId: z.string().uuid().nullable().optional(),
  orderNumber: z.string().max(100),
  orderDate: z.string().date(),
  deliveryDate: z.string().date().nullable().optional(),
  status: SalesOrderStatusEnum.default('DRAFT'),
  subtotal: z.coerce.number().min(0),
  taxTotal: z.coerce.number().min(0),
  discountTotal: z.coerce.number().min(0).default(0),
  grandTotal: z.coerce.number().min(0),
  notes: z.string().max(1000).nullable().optional(),
  items: z.array(SalesLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type SalesOrderDto = z.infer<typeof SalesOrderSchema>;

export const CreateSalesOrderSchema = SalesOrderSchema.omit({
  id: true,
  orderNumber: true,
  createdAt: true,
});
export type CreateSalesOrderDto = z.infer<typeof CreateSalesOrderSchema>;

// ==========================================
// 5. Sales Invoice
// ==========================================

export const InvoiceStatusEnum = z.enum([
  'DRAFT',
  'POSTED',
  'PARTIAL',
  'PAID',
  'OVERDUE',
  'VOID',
]);
export type InvoiceStatus = z.infer<typeof InvoiceStatusEnum>;

export const SalesInvoiceSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid(),
  orderId: z.string().uuid().nullable().optional(),
  customerId: z.string().uuid(),
  customerName: z.string().optional(),
  invoiceNumber: z.string().max(100),
  issueDate: z.string().date(),
  dueDate: z.string().date(),
  status: InvoiceStatusEnum.default('DRAFT'),
  totalAmount: z.coerce.number().min(0),
  paidAmount: z.coerce.number().min(0).default(0),
  balanceDue: z.coerce.number().min(0),
  items: z.array(SalesLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type SalesInvoiceDto = z.infer<typeof SalesInvoiceSchema>;

export const CreateSalesInvoiceSchema = SalesInvoiceSchema.omit({
  id: true,
  invoiceNumber: true,
  paidAmount: true,
  balanceDue: true,
  createdAt: true,
});
export type CreateSalesInvoiceDto = z.infer<typeof CreateSalesInvoiceSchema>;
