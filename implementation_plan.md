# Phase 2: Module 1 — Sales Management Implementation

This plan implements the complete **Sales Management Domain** across both the frontend workspace (`apps/web/src/app/sales/*`) and shared UI primitives (`packages/shared-ui`), adhering strictly to [MODULES_SPECIFICATION.md](file:///d:/my_erp/docs/MODULES_SPECIFICATION.md) §1, [COMPONENT_SYSTEM.md](file:///d:/my_erp/docs/COMPONENT_SYSTEM.md), and [AGENTS.md](file:///d:/my_erp/AGENTS.md).

---

## User Review Required

> [!IMPORTANT]
> 1. **Universal `LineItemsTable` Component**: To prevent duplicate table logic, we build the shared `LineItemsTable` in `packages/shared-ui/src/forms/LineItemsTable.tsx`. It enforces exact calculations:
>    $$\text{Line Net Amount} = (\text{Quantity} \times \text{Unit Price}) - \text{Discount Amount}$$
>    $$\text{Line Tax Amount} = \text{Line Net Amount} \times \left(\frac{\text{Tax Rate \%}}{100}\right)$$
>    $$\text{Line Gross Total} = \text{Line Net Amount} + \text{Line Tax Amount}$$
> 2. **Dedicated Sales Workspaces**: All 5 sub-routes in `apps/web/src/app/sales/` (`customers/`, `quotations/`, `orders/`, `invoices/`, `returns/`) will be fully implemented with typed data tables, search filters, state machines, and creation modals.
> 3. **4-Theme Consistency**: Every component uses semantic CSS variables (`var(--bg-surface)`, `var(--border-color)`, `var(--accent-primary)`), looking crisp in Light, Dark, Midnight Emerald, and Royal Amethyst.

---

## Proposed Changes

### 1. Shared UI Layer (`packages/shared-ui`)

#### [NEW] [packages/shared-ui/src/forms/LineItemsTable.tsx](file:///d:/my_erp/packages/shared-ui/src/forms/LineItemsTable.tsx)
- Reusable line item editor for Sales Quotes, Orders, Invoices, and Purchase Orders.
- Features: Add/remove rows, SKU selection, quantity, unit price, tax rate %, discount amount, line total calculation, and live summary box (Subtotal, Tax Total, Grand Total).

#### [NEW] [packages/shared-ui/src/widgets/Modal.tsx](file:///d:/my_erp/packages/shared-ui/src/widgets/Modal.tsx)
- Reusable, accessible dialog modal with backdrop blur, keyboard ESC handling, header/footer actions, and responsive sizing.

#### [MODIFY] [packages/shared-ui/src/index.ts](file:///d:/my_erp/packages/shared-ui/src/index.ts)
- Export `LineItemsTable` and `Modal`.

---

### 2. Sales Module Application Routes (`apps/web/src/app/sales`)

#### [NEW] [apps/web/src/app/sales/customers/page.tsx](file:///d:/my_erp/apps/web/src/app/sales/customers/page.tsx)
- Customer CRM directory with search, payment terms badges (`NET_30`, `NET_60`, `IMMEDIATE`), credit limit displays, and Add Customer modal with Zod validation.

#### [NEW] [apps/web/src/app/sales/quotations/page.tsx](file:///d:/my_erp/apps/web/src/app/sales/quotations/page.tsx)
- Quotations list with status workflow (`DRAFT`, `SENT`, `ACCEPTED`, `EXPIRED`, `REJECTED`).
- New Quotation builder drawer/modal powered by `LineItemsTable`.
- "Convert to Sales Order" action button.

#### [NEW] [apps/web/src/app/sales/orders/page.tsx](file:///d:/my_erp/apps/web/src/app/sales/orders/page.tsx)
- Sales Orders directory with lifecycle status machine (`DRAFT` $\rightarrow$ `CONFIRMED` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `SHIPPED` $\rightarrow$ `DELIVERED` $\rightarrow$ `CANCELLED`).
- Stock reservation indicators and credit limit check warnings.
- New Sales Order builder modal.

#### [NEW] [apps/web/src/app/sales/invoices/page.tsx](file:///d:/my_erp/apps/web/src/app/sales/invoices/page.tsx)
- Sales Invoices with payment status (`DRAFT`, `POSTED`, `PARTIAL`, `PAID`, `OVERDUE`, `VOID`).
- Balance due tracking and "Post to General Ledger" action.

#### [NEW] [apps/web/src/app/sales/returns/page.tsx](file:///d:/my_erp/apps/web/src/app/sales/returns/page.tsx)
- Return Merchandise Authorization (RMA) & Credit Notes directory.
- Inspection condition flags (`Restockable` vs `Damaged`).

---

## Verification Plan

### Automated Checks
1. **TypeScript Type-Check**:
   ```bash
   npx.cmd tsc -p packages/shared-ui/tsconfig.json --noEmit ; npx.cmd tsc -p apps/web/tsconfig.json --noEmit
   ```

### Manual Verification
1. Open `http://localhost:3000/sales` and navigate through all 5 sub-routes:
   - `/sales/customers`
   - `/sales/quotations`
   - `/sales/orders`
   - `/sales/invoices`
   - `/sales/returns`
2. Test dynamic calculation inside `LineItemsTable` (Qty $\times$ Price - Discount + Tax).
3. Test theme switching across all 4 themes (Light, Dark, Emerald, Amethyst).
4. Commit and push to GitHub repository.
