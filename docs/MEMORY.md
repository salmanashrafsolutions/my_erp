# Cross-Session Project Memory Ledger

**Project**: Apex Enterprise ERP  
**Architecture**: Decoupled Modular Monolith  
**Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, PostgreSQL 16 (Prisma), Redis 7

---

## 📌 Architectural Invariants (Non-Negotiable)

1. **Financial Immutability**:
   - `POSTED` Journal Entries and Stock Ledger entries are strictly immutable. No direct `UPDATE` or `DELETE`.
   - Corrections require explicit reversing entries referencing the original document ID.
   - All entries must satisfy $\sum \text{Debit} \equiv \sum \text{Credit}$ (enforced via Zod refinement and DB transactions).

2. **Component Reusability**:
   - **Zero one-off UI**: All shared primitives (`AppShell`, `PageHeader`, `KpiCard`, `DataTable<T>`, `StatusBadge`, `MoneyDisplay`, `AuditFeed`, `ThemeSelector`) MUST reside in `@erp/shared-ui`.
   - Page files in `apps/web/src/app/` must remain under 100 lines of declarative component composition.

3. **Multi-Tenancy & Row-Level Isolation**:
   - Every database query is scoped with `companyId` (Tenant) and `branchId` (Operating Location).

4. **Stock Reservation Invariant**:
   - Available Stock = $\text{Physical On-Hand} - \text{Reserved Stock (Unfulfilled Orders)}$.
   - Stock cannot be oversold; checkout operations are guarded by Redis distributed locks.

5. **3-Way Matching Engine**:
   - Vendor Bill approval requires $\text{Billed Qty} \le \text{GRN Accepted Qty} \le \text{PO Ordered Qty}$ and unit price match within $\pm 0.5\%$ tolerance.

---

## 🎨 Design System & Theme Memory

- **4 Standardized Themes**:
  1. `light`: Pure White (`#ffffff`), Slate 50 (`#f8fafc`), Blue 600 (`#2563eb`).
  2. `dark`: Slate 900 (`#111827`), Obsidian Navy (`#090d16`), Blue 500 (`#3b82f6`).
  3. `emerald`: Dark Pine (`#071f1a`), Deep Forest (`#030d0b`), Emerald 500 (`#10b981`).
  4. `amethyst`: Royal Slate (`#141026`), Deep Velvet (`#0b0816`), Violet 500 (`#8b5cf6`).
- **Typography**: Inter / Geist Sans for text, `font-mono tabular-nums` for all currency, quantities, and dates.
- **Micro-Animations**: Native GPU CSS keyframe transitions (`fadeInUp`, `pulseGlow`, `hover-lift`, `scale-105`), respecting `@media (prefers-reduced-motion)`.

---

## 🗺️ Module Execution Roadmap

- [x] **Phase 1: Core Foundation & Themes** (Completed, Verified, Pushed).
  - `@erp/shared-types`: Universal DTOs & Zod schemas for all 5 domains.
  - `@erp/database`: Multi-domain Prisma PostgreSQL schema with UUIDv7 PKs.
  - `@erp/shared-ui`: 100% component-driven UI library with 4-theme engine.
  - `apps/web`: Welcome Landing Page + dedicated module workspaces.
- [x] **Phase 2: Sales Module Deep Implementation** (Completed, Verified, Pushed).
  - `LineItemsTable`: Universal dynamic line items editor with automated formula recalculations.
  - `Modal`: Accessible dialog modal.
  - `/sales/customers`: Customer CRM directory, credit limits, payment terms, and Add Customer modal.
  - `/sales/quotations`: Quotation engine with LineItemsTable and Convert-to-Order workflow.
  - `/sales/orders`: Orders pipeline with stock reservation lock status, picking, and dispatch.
  - `/sales/invoices`: Invoicing, AR balance due tracking, and Record Payment modal.
  - `/sales/returns`: RMA return authorization with restock vs scrap inspection workflows.
- [ ] **Phase 3: Purchase Module Deep Implementation** (Next Step)
  - Vendor Master, Purchase Requisitions (PR), Purchase Orders (PO), GRN Gate-In, 3-Way Match validation.
- [ ] **Phase 4: Inventory Module Deep Implementation**
  - SKU Master, Multi-Warehouse/Bin locations, Real-time Stock Ledger, Moving WAC/FIFO costing.
- [ ] **Phase 5: Finance & Accounting Deep Implementation**
  - Chart of Accounts tree, Double-Entry GL builder, AR/AP aging subledgers, P&L & Balance Sheet.
- [ ] **Phase 6: Admin, Tenancy & Security Deep Implementation**
  - Tenant company/branch switcher, Granular RBAC matrix editor, Distributed Sequence engine, Real-time Audit Trail.

---

## 🔗 Repository Reference
- **GitHub**: `https://github.com/salmanashrafsolutions/my_erp`
- **Branch**: `main`
