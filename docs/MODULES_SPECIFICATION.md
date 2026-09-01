# Detailed Modules Specification & Business Logic

This document specifies the exact functional requirements, state machines, business workflows, calculations, and validations for each of the 5 ERP modules.

---

## 1. Sales Management Module

### 1.1 Core Entities & Workflows
```
Customer Lead / Account
       │
       ▼
Sales Quotation (Draft → Sent → Accepted / Expired / Rejected)
       │ (Convert)
       ▼
Sales Order (Draft → Confirmed → In Progress → Shipped → Delivered → Closed / Cancelled)
       ├──► Stock Reservation (Hold quantity in warehouse)
       ├──► Delivery Note / Dispatch (Pick, Pack, Ship)
       └──► Sales Invoice (Draft → Posted → Partially Paid → Paid → Overdue → Void)
                 │
                 └──► Payment Receipt & AR Ledger Settlement
```

### 1.2 Business Logic & Calculation Engine
1. **Line Total Calculation**:
   $$\text{Line Net Amount} = (\text{Quantity} \times \text{Unit Price}) - \text{Discount Amount}$$
   $$\text{Line Tax Amount} = \text{Line Net Amount} \times \left(\frac{\text{Tax Rate \%}}{100}\right)$$
   $$\text{Line Gross Total} = \text{Line Net Amount} + \text{Line Tax Amount}$$
2. **Document Grand Total**:
   $$\text{Subtotal} = \sum \text{Line Net Amount}$$
   $$\text{Tax Total} = \sum \text{Line Tax Amount}$$
   $$\text{Grand Total} = \text{Subtotal} + \text{Tax Total} + \text{Shipping/Freight Charges} - \text{Global Discount}$$
3. **Credit Limit Enforcement**:
   $$\text{Current Exposure} = \text{Open AR Balance} + \text{Uninvoiced Confirmed Orders}$$
   - If $\text{Current Exposure} + \text{New Order Grand Total} > \text{Customer Credit Limit}$, order confirmation requires explicit `Manager Override Approval`.
4. **Return Merchandise Authorization (RMA) & Credit Notes**:
   - Condition inspection flags items as `Restockable` (adds back to inventory stock ledger) or `Damaged` (routes to scrap/loss ledger).
   - Generates a **Credit Note** crediting the customer's AR balance or triggering a cash refund.

---

## 2. Purchase Management Module

### 2.1 Core Entities & Workflows
```
Purchase Requisition (PR) [Department Demand]
       │ (Approve)
       ▼
Request for Quotation (RFQ) [Multi-Vendor Bidding Matrix]
       │ (Award Bid)
       ▼
Purchase Order (PO) (Draft → Approved → Sent → Partially Received → Completed → Cancelled)
       │
       ├──► Goods Receipt Note (GRN) [Warehouse Gate-In & Quality Inspection]
       └──► Vendor Bill / AP Invoice (Draft → Posted → Paid)
                 │
                 └──► 3-Way Matching Engine (PO ↔ GRN ↔ Bill)
```

### 2.2 3-Way Matching Invariant
A Vendor Bill CANNOT be approved for payment disbursement until the 3-Way Match validation passes:
- **Quantity Match**: $\text{Billed Quantity} \le \text{GRN Accepted Quantity} \le \text{PO Ordered Quantity}$.
- **Price Match**: $\text{Bill Unit Price} \equiv \text{PO Unit Price}$ (within allowable variance threshold, e.g. $\pm 0.5\%$).
- **Landed Cost Allocation**: Freight, customs duties, and handling fees are distributed across line items based on item weight or line value:
  $$\text{Item Landed Cost} = \text{Purchase Price} + \left(\frac{\text{Item Value}}{\text{Total Shipment Value}} \times \text{Total Shipping Fees}\right)$$

---

## 3. Inventory & Warehouse Management Module

### 3.1 Item Master & Tracking Structure
- **SKU / Barcode / QR Code**: Unique identifier per SKU.
- **Unit of Measure (UOM) Conversion Matrix**: Base UOM (e.g. `Pieces`) with conversion multipliers (e.g. `1 Box = 24 Pieces`, `1 Pallet = 40 Boxes`).
- **Traceability**: Lot/Batch tracking with expiration dates, and Serial Number tracking for serialized assets.
- **Location Hierarchy**: `Warehouse` $\rightarrow$ `Zone` $\rightarrow$ `Aisle` $\rightarrow$ `Rack` $\rightarrow$ `Shelf` $\rightarrow$ `Bin`.

### 3.2 Real-time Stock Quantities
For any given item at any warehouse location:
$$\text{Available Stock} = \text{Physical On-Hand} - \text{Reserved Stock (Confirmed SOs)} - \text{Quarantined / Defective}$$
$$\text{Virtual Projected Stock} = \text{Available Stock} + \text{Inbound On-Order (Approved POs)}$$

### 3.3 Inventory Valuation Methods
1. **Moving Weighted Average Cost (WAC)**:
   $$\text{New WAC} = \frac{(\text{Current Qty} \times \text{Current WAC}) + (\text{Incoming Qty} \times \text{Incoming Unit Cost})}{\text{Current Qty} + \text{Incoming Qty}}$$
2. **First-In First-Out (FIFO)**: Cost layers maintained per batch arrival; stock issues consume the oldest available cost layers first.
3. **Stock Movements & Immutable Stock Ledger**:
   - Every movement creates an immutable `inventory_stock_ledger` row (`Timestamp`, `Item`, `Warehouse`, `Qty Delta`, `Unit Cost`, `Balance After`, `Doc Ref`).
   - Movement types: `PURCHASE_GRN`, `SALES_DELIVERY`, `TRANSFER_IN`, `TRANSFER_OUT`, `ADJUSTMENT_ADD`, `ADJUSTMENT_SUB`, `SCRAP`.

---

## 4. Finance & Accounting Module

### 4.1 Chart of Accounts (COA) Hierarchy
The Chart of Accounts adheres to the standard 5-class account taxonomy:
1. **`1000 - 1999` Assets** (Current Assets, Accounts Receivable, Inventory, Fixed Assets).
2. **`2000 - 2999` Liabilities** (Accounts Payable, Accrued Taxes, Short/Long-Term Debt).
3. **`3000 - 3999` Equity** (Owner Capital, Retained Earnings).
4. **`4000 - 4999` Revenue** (Sales Revenue, Service Income, Interest).
5. **`5000 - 5999` Cost of Goods Sold (COGS)** (Material Cost, Direct Labor, Landed Freight).
6. **`6000 - 6999` Operating Expenses** (Salaries, Rent, Utilities, Marketing).

### 4.2 Immutable Double-Entry Journal Engine
Every financial posting event creates a `finance_journal_entry` with 2 or more `finance_journal_entry_line` items:
- **Strict Equality Rule**:
  $$\sum \text{Debit Amount} \equiv \sum \text{Credit Amount}$$
- **Automated Module Postings**:
  - **Sales Invoice Posting**:
    - `Debit`: Accounts Receivable (Asset) $[\text{Grand Total}]$
    - `Credit`: Sales Revenue (Income) $[\text{Subtotal}]$
    - `Credit`: Output Tax Payable (Liability) $[\text{Tax Total}]$
  - **Sales Delivery Note (COGS & Inventory Asset)**:
    - `Debit`: Cost of Goods Sold (COGS) $[\text{Total Valuation Cost}]$
    - `Credit`: Inventory Asset (Asset) $[\text{Total Valuation Cost}]$
  - **Vendor Bill Posting**:
    - `Debit`: Inventory In-Transit / Asset $[\text{Subtotal}]$
    - `Debit`: Input Tax Recoverable $[\text{Tax Total}]$
    - `Credit`: Accounts Payable (Liability) $[\text{Grand Total}]$
  - **Customer Payment Receipt**:
    - `Debit`: Bank / Cash Account $[\text{Amount Received}]$
    - `Credit`: Accounts Receivable $[\text{Amount Received}]$

---

## 5. Admin & Core Management Module

### 5.1 RBAC & Permission Matrix
Permissions are structured as `Module` : `Resource` : `Action`:
```
sales:quotation:create, sales:quotation:read, sales:quotation:update, sales:quotation:approve, sales:quotation:delete
sales:order:create, sales:order:confirm, sales:order:cancel
purchase:po:create, purchase:po:approve, purchase:grn:create
inventory:item:create, inventory:stock:adjust, inventory:valuation:read
finance:journal:create, finance:journal:post, finance:reports:export
admin:user:manage, admin:role:manage, admin:company:manage
```

### 5.2 Document Numbering Sequence Engine
Customizable numbering sequences with zero-padding and token evaluation:
- Pattern: `{PREFIX}-{BRANCH_CODE}-{YYYY}-{MM}-{NUMBER:5}`
- Example: `SO-ISB-2026-09-00042`
- Guarantees sequential, gapless numbering through Redis atomic increment + database lock.

### 5.3 Complete Audit Logging
- Automatically logs all entity mutations: `Actor User ID`, `Company ID`, `Branch ID`, `IP Address`, `User Agent`, `Timestamp`, `Action (CREATE, UPDATE, DELETE, POST, REVERSE)`, `Entity Name`, `Entity ID`, and `JSON Diff (before & after values)`.
