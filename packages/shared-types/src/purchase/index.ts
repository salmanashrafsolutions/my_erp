import { z } from 'zod';
import { PaymentTermsEnum } from '../sales';

// ==========================================
// 1. Vendor Master
// ==========================================

export const VendorSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  email: z.string().email().nullable().optional(),
  phone: z.string().max(50).nullable().optional(),
  taxNumber: z.string().max(100).nullable().optional(),
  paymentTerms: PaymentTermsEnum.default('NET_30'),
  bankDetails: z
    .object({
      bankName: z.string().optional(),
      accountNumber: z.string().optional(),
      iban: z.string().optional(),
      swiftCode: z.string().optional(),
    })
    .nullable()
    .optional(),
  rating: z.coerce.number().min(1).max(5).nullable().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});
export type VendorDto = z.infer<typeof VendorSchema>;

export const CreateVendorSchema = VendorSchema.omit({
  id: true,
  createdAt: true,
});
export type CreateVendorDto = z.infer<typeof CreateVendorSchema>;

// ==========================================
// 2. Purchase Line Items
// ==========================================

export const PurchaseLineItemSchema = z.object({
  id: z.string().uuid().optional(),
  itemId: z.string().uuid(),
  itemSku: z.string().optional(),
  itemName: z.string().optional(),
  description: z.string().max(500).nullable().optional(),
  quantity: z.coerce.number().positive(),
  receivedQty: z.coerce.number().min(0).default(0),
  unitCost: z.coerce.number().min(0),
  taxRate: z.coerce.number().min(0).max(100).default(0),
  taxAmount: z.coerce.number().min(0).default(0),
  discountAmount: z.coerce.number().min(0).default(0),
  lineTotal: z.coerce.number().min(0),
});
export type PurchaseLineItemDto = z.infer<typeof PurchaseLineItemSchema>;

// ==========================================
// 3. Purchase Requisition (PR)
// ==========================================

export const RequisitionStatusEnum = z.enum([
  'DRAFT',
  'SUBMITTED',
  'APPROVED',
  'REJECTED',
  'ORDERED',
]);
export type RequisitionStatus = z.infer<typeof RequisitionStatusEnum>;

export const PurchaseRequisitionSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid(),
  requesterId: z.string().uuid(),
  requesterName: z.string().optional(),
  prNumber: z.string().max(100),
  requisitionDate: z.string().date(),
  requiredDate: z.string().date(),
  status: RequisitionStatusEnum.default('DRAFT'),
  department: z.string().max(100),
  purpose: z.string().max(500).optional(),
  items: z.array(PurchaseLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type PurchaseRequisitionDto = z.infer<typeof PurchaseRequisitionSchema>;

// ==========================================
// 4. Purchase Order (PO)
// ==========================================

export const PurchaseOrderStatusEnum = z.enum([
  'DRAFT',
  'APPROVED',
  'SENT',
  'PARTIALLY_RECEIVED',
  'COMPLETED',
  'CANCELLED',
]);
export type PurchaseOrderStatus = z.infer<typeof PurchaseOrderStatusEnum>;

export const PurchaseOrderSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid(),
  vendorId: z.string().uuid(),
  vendorName: z.string().optional(),
  poNumber: z.string().max(100),
  orderDate: z.string().date(),
  expectedDate: z.string().date().nullable().optional(),
  status: PurchaseOrderStatusEnum.default('DRAFT'),
  subtotal: z.coerce.number().min(0),
  taxTotal: z.coerce.number().min(0),
  discountTotal: z.coerce.number().min(0).default(0),
  grandTotal: z.coerce.number().min(0),
  notes: z.string().max(1000).nullable().optional(),
  items: z.array(PurchaseLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type PurchaseOrderDto = z.infer<typeof PurchaseOrderSchema>;

export const CreatePurchaseOrderSchema = PurchaseOrderSchema.omit({
  id: true,
  poNumber: true,
  createdAt: true,
});
export type CreatePurchaseOrderDto = z.infer<typeof CreatePurchaseOrderSchema>;

// ==========================================
// 5. Goods Receipt Note (GRN)
// ==========================================

export const GRNStatusEnum = z.enum([
  'PENDING_INSPECTION',
  'ACCEPTED',
  'REJECTED',
]);
export type GRNStatus = z.infer<typeof GRNStatusEnum>;

export const GRNItemSchema = z.object({
  id: z.string().uuid().optional(),
  poItemId: z.string().uuid(),
  itemId: z.string().uuid(),
  orderedQty: z.coerce.number().positive(),
  receivedQty: z.coerce.number().min(0),
  acceptedQty: z.coerce.number().min(0),
  rejectedQty: z.coerce.number().min(0).default(0),
  batchNumber: z.string().max(100).nullable().optional(),
  expiryDate: z.string().date().nullable().optional(),
});
export type GRNItemDto = z.infer<typeof GRNItemSchema>;

export const GoodsReceiptNoteSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  poId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  grnNumber: z.string().max(100),
  receivedDate: z.string().datetime(),
  status: GRNStatusEnum.default('PENDING_INSPECTION'),
  inspectionNotes: z.string().max(500).nullable().optional(),
  items: z.array(GRNItemSchema).min(1),
});
export type GoodsReceiptNoteDto = z.infer<typeof GoodsReceiptNoteSchema>;

// ==========================================
// 6. Vendor Bill / AP Invoice (3-Way Matching)
// ==========================================

export const VendorBillStatusEnum = z.enum([
  'DRAFT',
  'POSTED',
  'PAID',
  'CANCELLED',
]);
export type VendorBillStatus = z.infer<typeof VendorBillStatusEnum>;

export const VendorBillSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  vendorId: z.string().uuid(),
  poId: z.string().uuid().nullable().optional(),
  grnId: z.string().uuid().nullable().optional(),
  billNumber: z.string().max(100),
  billDate: z.string().date(),
  dueDate: z.string().date(),
  status: VendorBillStatusEnum.default('DRAFT'),
  threeWayMatched: z.boolean().default(false),
  subtotal: z.coerce.number().min(0),
  taxTotal: z.coerce.number().min(0),
  grandTotal: z.coerce.number().min(0),
  paidAmount: z.coerce.number().min(0).default(0),
  items: z.array(PurchaseLineItemSchema).min(1),
  createdAt: z.string().datetime().optional(),
});
export type VendorBillDto = z.infer<typeof VendorBillSchema>;
