import { z } from 'zod';

// ==========================================
// 1. Item Category & Master
// ==========================================

export const ValuationMethodEnum = z.enum(['WAC', 'FIFO', 'STANDARD']);
export type ValuationMethod = z.infer<typeof ValuationMethodEnum>;

export const ItemCategorySchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  description: z.string().max(255).nullable().optional(),
});
export type ItemCategoryDto = z.infer<typeof ItemCategorySchema>;

export const ItemMasterSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  categoryId: z.string().uuid(),
  categoryName: z.string().optional(),
  sku: z.string().min(1).max(100),
  barcode: z.string().max(100).nullable().optional(),
  name: z.string().min(1).max(255),
  description: z.string().max(1000).nullable().optional(),
  uom: z.string().min(1).max(50), // PCS, KG, BOX, MTR
  valuationMethod: ValuationMethodEnum.default('WAC'),
  costPrice: z.coerce.number().min(0).default(0),
  sellingPrice: z.coerce.number().min(0).default(0),
  reorderPoint: z.coerce.number().min(0).default(0),
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
});
export type ItemMasterDto = z.infer<typeof ItemMasterSchema>;

export const CreateItemMasterSchema = ItemMasterSchema.omit({
  id: true,
  createdAt: true,
});
export type CreateItemMasterDto = z.infer<typeof CreateItemMasterSchema>;

// ==========================================
// 2. Warehouse & Bin Locations
// ==========================================

export const WarehouseSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  branchId: z.string().uuid().nullable().optional(),
  code: z.string().min(1).max(50),
  name: z.string().min(1).max(255),
  address: z.string().max(500).nullable().optional(),
  isActive: z.boolean().default(true),
});
export type WarehouseDto = z.infer<typeof WarehouseSchema>;

export const CreateWarehouseSchema = WarehouseSchema.omit({ id: true });
export type CreateWarehouseDto = z.infer<typeof CreateWarehouseSchema>;

export const WarehouseBinSchema = z.object({
  id: z.string().uuid(),
  warehouseId: z.string().uuid(),
  zone: z.string().max(50),
  aisle: z.string().max(50),
  rack: z.string().max(50),
  shelf: z.string().max(50),
  binCode: z.string().max(50),
});
export type WarehouseBinDto = z.infer<typeof WarehouseBinSchema>;

// ==========================================
// 3. Stock Balance & Immutable Ledger
// ==========================================

export const StockBalanceSchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  itemId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  itemSku: z.string().optional(),
  itemName: z.string().optional(),
  warehouseName: z.string().optional(),
  qtyOnHand: z.coerce.number().default(0),
  qtyReserved: z.coerce.number().default(0),
  qtyAvailable: z.coerce.number().default(0),
  averageCost: z.coerce.number().min(0).default(0),
  totalValuation: z.coerce.number().min(0).default(0),
});
export type StockBalanceDto = z.infer<typeof StockBalanceSchema>;

export const StockMovementTypeEnum = z.enum([
  'PURCHASE_GRN',
  'SALES_DELIVERY',
  'TRANSFER_IN',
  'TRANSFER_OUT',
  'ADJUSTMENT_ADD',
  'ADJUSTMENT_SUB',
  'SCRAP',
]);
export type StockMovementType = z.infer<typeof StockMovementTypeEnum>;

export const StockLedgerEntrySchema = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid(),
  itemId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  movementType: StockMovementTypeEnum,
  docType: z.string().max(50),
  docId: z.string().uuid(),
  qtyChange: z.coerce.number(), // positive or negative
  unitCost: z.coerce.number().min(0),
  balanceAfter: z.coerce.number(),
  createdAt: z.string().datetime(),
});
export type StockLedgerEntryDto = z.infer<typeof StockLedgerEntrySchema>;

// ==========================================
// 4. Stock Adjustment & Transfer
// ==========================================

export const StockAdjustmentLineSchema = z.object({
  itemId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  currentQty: z.coerce.number(),
  countedQty: z.coerce.number().min(0),
  qtyDifference: z.coerce.number(),
  unitCost: z.coerce.number().min(0),
  reason: z.string().max(255),
});
export type StockAdjustmentLineDto = z.infer<typeof StockAdjustmentLineSchema>;

export const CreateStockAdjustmentSchema = z.object({
  companyId: z.string().uuid(),
  adjustmentDate: z.string().date(),
  reason: z.string().max(500),
  lines: z.array(StockAdjustmentLineSchema).min(1),
});
export type CreateStockAdjustmentDto = z.infer<typeof CreateStockAdjustmentSchema>;
