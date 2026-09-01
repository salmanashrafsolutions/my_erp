# Antigravity & AI Agent Directives for ERP Project

This file contains mandatory instructions, rules, and architectural standards that MUST be adhered to by any AI coding assistant or developer working on this ERP system.

---

## 🚨 Non-Negotiable Core Directives

### 1. Consult Documentation First
Before modifying or creating any module, component, database entity, or API endpoint, you MUST read the relevant documentation in `docs/`:
- `docs/ARCHITECTURE.md`: Follow domain isolation and event boundaries.
- `docs/MODULES_SPECIFICATION.md`: Implement the exact state machines, calculation formulas, and validation rules.
- `docs/DATABASE_SCHEMA.md`: Adhere to table naming, UUIDv7 primary keys, constraints, and relational indexes.
- `docs/COMPONENT_SYSTEM.md`: Reuse existing shared components (`DataTable`, `LineItemsTable`, `CurrencyInput`, `StatusBadge`, `AsyncCombobox`, etc.) before creating new ones.
- `docs/DEVELOPMENT_GUIDELINES.md`: Follow typing, error handling, financial immutability, and state management rules.

### 2. Component Reusability Enforcement
- **NEVER** write one-off tables, form fields, line item grids, or status chips inside individual module folders if a shared equivalent exists in `@shared/components/`.
- Dynamic document line items (Sales Quote, Sales Order, Invoice, PO, GRN) MUST use the universal `LineItemsTable` component.
- All list views MUST use the generic `DataTable<T>` component with server-side pagination, sorting, and filter controls.

### 3. Financial & Transaction Integrity
- Never allow direct editing or deletion of a `POSTED` Journal Entry or Stock Ledger entry.
- All financial balances MUST be calculated from immutable ledger lines.
- Wrap all multi-entity operations (e.g. Sales Order confirmation + Stock reservation + Audit log) in strict database transactions (`db.$transaction`).

### 4. Memory & Performance Standards
- Server responses for data lists must always be paginated (default: 25, max: 100).
- Financial ledger exports (CSV/Excel) and PDF reports with large datasets MUST use streaming cursors to prevent high memory spikes.
- UI tables with more than 100 rendered rows MUST use TanStack Virtual.

### 5. UI/UX Excellence (ui-ux-pro-max & frontend-design)
- Follow enterprise high-density layout rules.
- Maintain accessible contrast (minimum 4.5:1), visible keyboard focus rings, and explicit loading states for all async actions.
- Use active-voice button labels ("Confirm Order", "Post Invoice", "Record Payment", "Approve PO").
