# Phase 1: Shared Types, Database Schema & Core Foundation

This plan establishes the core foundational layer for our 5-pillar ERP system (**Sales**, **Purchase**, **Inventory**, **Finance**, **Admin**). It implements universal domain types and DTOs with Zod validation in `@erp/shared-types`, the complete PostgreSQL database schema via Prisma in `@erp/database`, and baseline formatting utilities in `@erp/shared-ui`.

---

## Phase 0: Documentation Discovery & Architectural Contracts

Before implementing code, the following architectural contracts and schemas have been verified:
- **Domain State Machines & Math**: [MODULES_SPECIFICATION.md](file:///d:/my_erp/docs/MODULES_SPECIFICATION.md) (Line totals, WAC calculation, 3-Way Match validation, AR/AP Credit limit checks).
- **Database Conventions**: [DATABASE_SCHEMA.md](file:///d:/my_erp/docs/DATABASE_SCHEMA.md) (UUIDv7 primary keys, `NUMERIC(15, 4)` for currency, `NUMERIC(12, 4)` for quantities, `TIMESTAMPTZ`, immutable audit log).
- **Component & Design Tokens**: [COMPONENT_SYSTEM.md](file:///d:/my_erp/docs/COMPONENT_SYSTEM.md) (`DataTable<T>`, `LineItemsTable`, `StatusBadge`, `MoneyDisplay`).
- **Engineering Standards**: [DEVELOPMENT_GUIDELINES.md](file:///d:/my_erp/docs/DEVELOPMENT_GUIDELINES.md) (Strict TypeScript, Zod schemas, immutable posted ledgers, `ApiResponse<T>` envelope).

### Allowed APIs & Shared Conventions
- **Validation**: `zod` (`z.object()`, `z.string().uuid()`, `z.coerce.number()`, `z.enum()`).
- **ORM**: Prisma with PostgreSQL provider, UUIDv7 default generation.
- **Precision**: Monetary computations must preserve 4 decimal places before rounding.

### Anti-Pattern Guards
- ❌ **No `any` types**: Everything must have explicit interfaces or Zod-inferred types.
- ❌ **No floating point arithmetic for money**: Currency values must be handled with precision (avoid raw `number` binary floating-point drift).
- ❌ **No direct mutation of POSTED ledger records**: State machines must enforce immutability.

---

## User Review Required

> [!IMPORTANT]
> 1. **Package Scope**: We are setting up `@erp/shared-types`, `@erp/database`, and `@erp/shared-ui` to serve as the unified contract layer for `apps/api` and `apps/web`.
> 2. **Database Schema**: The Prisma schema includes all 5 domain modules (Admin, Sales, Purchase, Inventory, Finance) in one comprehensive schema with foreign key relationships and index definitions.
> 3. **Validation Strategy**: Every DTO in `@erp/shared-types` exports both a runtime Zod schema and a TypeScript type (`z.infer<typeof Schema>`).

---

## Proposed Changes

### 1. Shared Types Package (`packages/shared-types`)

#### [NEW] [packages/shared-types/src/common/api.ts](file:///d:/my_erp/packages/shared-types/src/common/api.ts)
- `ApiResponse<T>` and `PaginatedResponse<T>` interfaces and Zod schemas.
- `PaginationQueryParams` (`page`, `pageSize`, `search`, `sortBy`, `sortOrder`).
- Common status enums (`DocumentStatus`, `PaymentStatus`, `PriorityLevel`).

#### [NEW] [packages/shared-types/src/admin/index.ts](file:///d:/my_erp/packages/shared-types/src/admin/index.ts)
- `CompanyDto`, `BranchDto` validation schemas.
- `UserDto`, `RoleDto`, `Permission` matrix (`Module:Resource:Action`).
- `NumberSequenceDto` (prefix, suffix, nextVal, padding).
- `AuditLogEntry` & `AuditDiff` schemas.

#### [NEW] [packages/shared-types/src/sales/index.ts](file:///d:/my_erp/packages/shared-types/src/sales/index.ts)
- `CustomerDto` (credit limit, payment terms, tax number).
- `SalesQuotationDto` & `SalesQuotationItemDto`.
- `SalesOrderDto` & `SalesOrderItemDto` (`DRAFT`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- `SalesInvoiceDto` (`POSTED`, `PARTIAL`, `PAID`, `OVERDUE`, `VOID`).

#### [NEW] [packages/shared-types/src/purchase/index.ts](file:///d:/my_erp/packages/shared-types/src/purchase/index.ts)
- `VendorDto` (rating, payment terms, tax number, bank details).
- `PurchaseRequisitionDto` & `RFQDto`.
- `PurchaseOrderDto` & `PurchaseOrderItemDto`.
- `GoodsReceiptNoteDto` (GRN) with inspection status.
- `VendorBillDto` with 3-Way Match validation flags.

#### [NEW] [packages/shared-types/src/inventory/index.ts](file:///d:/my_erp/packages/shared-types/src/inventory/index.ts)
- `ItemCategoryDto`, `ItemMasterDto` (SKU, barcode, UOM, valuation method: WAC/FIFO/STD).
- `WarehouseDto` & `WarehouseBinDto`.
- `StockBalanceDto` (on-hand, reserved, available).
- `StockLedgerEntryDto` (immutable movement log: GRN, DISPATCH, TRANSFER, ADJUST).

#### [NEW] [packages/shared-types/src/finance/index.ts](file:///d:/my_erp/packages/shared-types/src/finance/index.ts)
- `ChartOfAccountsDto` (`ASSET`, `LIABILITY`, `EQUITY`, `REVENUE`, `EXPENSE`).
- `JournalEntryDto` & `JournalEntryLineDto` with balanced check: $\sum \text{Debit} \equiv \sum \text{Credit}$.
- `PaymentReceiptDto` & `PaymentAllocationDto`.
- Financial report schemas (Trial Balance, P&L, Balance Sheet).

#### [NEW] [packages/shared-types/src/index.ts](file:///d:/my_erp/packages/shared-types/src/index.ts)
- Unified barrel export for all schemas and DTOs.

---

### 2. Database Package (`packages/database`)

#### [NEW] [packages/database/package.json](file:///d:/my_erp/packages/database/package.json)
- Prisma Client dependency and build/generate scripts.

#### [NEW] [packages/database/tsconfig.json](file:///d:/my_erp/packages/database/tsconfig.json)
- TypeScript configuration extending root `tsconfig.base.json`.

#### [NEW] [packages/database/prisma/schema.prisma](file:///d:/my_erp/packages/database/prisma/schema.prisma)
Complete Prisma schema implementing:
- **Admin**: `TenantCompany`, `TenantBranch`, `AuthUser`, `AuthRole`, `CoreNumberSequence`, `CoreAuditLog`, `CoreOutboxEvent`.
- **Sales**: `SalesCustomer`, `SalesQuotation`, `SalesQuotationItem`, `SalesOrder`, `SalesOrderItem`, `SalesInvoice`, `SalesInvoiceItem`.
- **Purchase**: `PurchaseVendor`, `PurchaseRequisition`, `PurchaseOrder`, `PurchaseOrderItem`, `PurchaseGRN`, `PurchaseGRNItem`, `PurchaseVendorBill`.
- **Inventory**: `InventoryItemCategory`, `InventoryItem`, `InventoryWarehouse`, `InventoryWarehouseBin`, `InventoryStockBalance`, `InventoryStockLedger`.
- **Finance**: `FinanceCOAAccount`, `FinanceJournalEntry`, `FinanceJournalEntryLine`, `FinancePayment`, `FinancePaymentAllocation`.

#### [NEW] [packages/database/src/index.ts](file:///d:/my_erp/packages/database/src/index.ts)
- Singleton Prisma client export with query logging and connection pooling configuration.

---

### 3. Shared UI Package (`packages/shared-ui`)

#### [NEW] [packages/shared-ui/package.json](file:///d:/my_erp/packages/shared-ui/package.json)
- Package configuration with dependencies on Lucide icons, clsx, tailwind-merge.

#### [NEW] [packages/shared-ui/tsconfig.json](file:///d:/my_erp/packages/shared-ui/tsconfig.json)
- TypeScript configuration for UI package.

#### [NEW] [packages/shared-ui/src/formatters.ts](file:///d:/my_erp/packages/shared-ui/src/formatters.ts)
- `formatMoney(amount: number | string, currency?: string)` (tabular numerals).
- `formatQuantity(qty: number | string, uom?: string)`.
- `formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions)`.
- `formatPercentage(rate: number)`.

#### [NEW] [packages/shared-ui/src/index.ts](file:///d:/my_erp/packages/shared-ui/src/index.ts)
- Barrel export for `@erp/shared-ui`.

---

## Verification Plan

### Automated Checks
1. **TypeScript Build & Type-Check**:
   ```bash
   npm run build --workspaces --if-present
   ```
2. **Prisma Schema Validation**:
   ```bash
   npx prisma validate --schema packages/database/prisma/schema.prisma
   ```

### Manual Verification
1. Verify that all 5 domain models in `schema.prisma` match [DATABASE_SCHEMA.md](file:///d:/my_erp/docs/DATABASE_SCHEMA.md).
2. Verify that all Zod DTOs in `packages/shared-types` conform to the formulas in [MODULES_SPECIFICATION.md](file:///d:/my_erp/docs/MODULES_SPECIFICATION.md).
