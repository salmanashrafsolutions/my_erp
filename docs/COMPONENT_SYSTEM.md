# Reusable Component System & UI/UX Design Architecture

This document establishes the UI/UX design tokens, shared component hierarchy, component props contracts, and guidelines for building reusable enterprise-grade UI widgets using **21st.dev**, **shadcn/ui**, and **Tailwind CSS**.

---

## 1. Design Tokens & UI/UX Foundations

The design system enforces a high-density, accessible, and distinctive visual identity adhering to `ui-ux-pro-max` and `frontend-design` principles.

### 1.1 Color Tokens (Semantic States)
| Token Name | Tailwind Class | Semantic Usage |
|---|---|---|
| `status-draft` | `bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300` | Uncommitted drafts (Quotes, Orders, Journals) |
| `status-pending` | `bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300` | Awaiting approval / in-transit |
| `status-success` | `bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300`| Approved, Paid, Confirmed, Completed |
| `status-danger` | `bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300` | Cancelled, Overdue, Voided, Rejected |
| `status-info` | `bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300` | Processing, Shipped, In-Review |

### 1.2 Typography & Numerical Formatting
- **Body Font**: Inter / Geist Sans (Clear legibility at small sizes).
- **Data & Numeric Displays**: Monospace tabular numerals (`font-mono tabular-nums`) for currency amounts, ledger debits/credits, and quantities to ensure exact column alignment.
- **Enterprise Density**: Compact tables (`py-2 px-3` row padding) with sticky headers and horizontal scroll preservation.

---

## 2. Shared Reusable Component Catalog

All shared components live in `packages/shared-ui/` (or `frontend/src/components/shared/`). **No module is permitted to duplicate these.**

```
frontend/src/components/shared/
├── data-table/
│   ├── DataTable.tsx             # Universal virtualized data table
│   ├── DataTablePagination.tsx   # Server/client pagination controls
│   ├── DataTableToolbar.tsx      # Search, filters, and export buttons
│   ├── DataTableColumnHeader.tsx # Sortable column header with icons
│   └── DataTableViewOptions.tsx  # Dynamic column visibility toggle
├── forms/
│   ├── FormField.tsx             # Unified label, input, tooltip, error wrapper
│   ├── CurrencyInput.tsx         # Auto-formatting currency field with symbol prefix
│   ├── AsyncCombobox.tsx         # Search-as-you-type selector (SKU, Customer, Vendor)
│   ├── DateRangePicker.tsx       # Presets (Today, This Month, Last Quarter) + Custom Range
│   └── LineItemsTable.tsx        # Dynamic multi-row editor with live tax/total calculations
├── widgets/
│   ├── StatusBadge.tsx           # Standard colored status pill with icon
│   ├── MoneyDisplay.tsx          # Formatted currency with positive/negative styling
│   ├── ApprovalTimeline.tsx      # Step-by-step workflow progress visualizer
│   ├── DocumentPrintView.tsx     # Printable PDF / Tax invoice preview template
│   └── AuditDrawer.tsx           # Slide-over showing entity history & JSON diffs
└── layouts/
    ├── AppSidebar.tsx            # Multi-module collapsible navigation tree
    ├── AppHeader.tsx             # Breadcrumbs, Branch Switcher, Quick Search (CMD+K)
    └── PageHeader.tsx            # Standard page title, subtitle, and primary CTAs
```

---

## 3. Core Component Specifications & Contracts

### 3.1 Universal `DataTable<TData, TValue>`
Every list page (Orders, Customers, Items, Bills, Invoices, Journals) uses this single component:
- **Features**: Server-side cursor/offset pagination, multi-column sorting, debounced search, facet filters, row selection, export to CSV/Excel, and column visibility toggle.
- **Props Contract**:
```typescript
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  currentPage: number;
  pageSize: number;
  onPaginationChange: (page: number, size: number) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onSearchChange?: (search: string) => void;
  isLoading?: boolean;
  facetFilters?: FacetFilterConfig[];
  bulkActions?: BulkAction<TData>[];
  exportFilename?: string;
}
```

### 3.2 Universal `LineItemsTable`
Used identically in Sales Quotations, Sales Orders, Sales Invoices, Purchase Requisitions, Purchase Orders, and GRNs:
- **Features**: Add/remove rows, reorder rows, SKU search autocomplete, automated tax/discount calculations, keyboard arrow navigation between cells, and stock warning badges.
- **Props Contract**:
```typescript
export interface LineItem {
  id: string;
  itemId: string;
  itemSku?: string;
  itemName?: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  lineTotal: number;
  availableStock?: number;
}

interface LineItemsTableProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency?: string;
  showStockStatus?: boolean;
  readOnly?: boolean;
  taxOptions?: { label: string; rate: number }[];
}
```

### 3.3 Universal `AsyncCombobox`
Searchable dropdown for high-volume entities (10,000+ customers, vendors, SKUs):
- **Features**: Debounced server-side query, infinite scrolling, keyboard navigation, and custom row rendering with subtitles (e.g. Item SKU + Available Stock).
- **Props Contract**:
```typescript
interface AsyncComboboxProps<T> {
  placeholder: string;
  searchFn: (query: string) => Promise<T[]>;
  getOptionLabel: (item: T) => string;
  getOptionValue: (item: T) => string;
  renderOption?: (item: T) => React.ReactNode;
  value?: string;
  onChange: (value: string, item?: T) => void;
  disabled?: boolean;
}
```

### 3.4 Universal `StatusBadge`
Standardized badges for every status enum in the ERP:
```typescript
interface StatusBadgeProps {
  status: 
    | 'DRAFT' | 'CONFIRMED' | 'APPROVED' | 'IN_PROGRESS' 
    | 'SHIPPED' | 'DELIVERED' | 'POSTED' | 'PAID' 
    | 'PARTIAL' | 'CANCELLED' | 'VOID' | 'OVERDUE';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

### 3.5 Universal `AuditDrawer`
Universal side-panel that opens on any document to display audit history:
- **Props Contract**:
```typescript
interface AuditDrawerProps {
  entityName: string;
  entityId: string;
  isOpen: boolean;
  onClose: () => void;
}
```

---

## 4. UI/UX Rules for Adding New Components

1. **Check First**: Before creating any component, verify if a matching component exists in `packages/shared-ui/` or can be installed via **21st.dev** / **shadcn/ui**.
2. **Headless & Accessible**: Use Radix UI primitives as underlying building blocks to guarantee keyboard accessibility (WCAG 2.1 AA).
3. **Compound Components**: Favor compound component composition (`<DataTable.Header>`, `<DataTable.Body>`, `<DataTable.Pagination>`) for high flexibility.
4. **Never Hardcode Formats**: Currency, dates, and numbers must always use localized utility formatters (`formatMoney(amount, currency)`, `formatDate(date)`).
