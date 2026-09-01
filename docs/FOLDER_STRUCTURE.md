# Project Folder & Directory Structure

This document outlines the complete directory layout, naming conventions, and file placement rules for the ERP platform.

---

## 1. Monorepo / High-Level Layout

```
d:/my_erp/
├── .agents/                      # Antigravity & AI Agent Skills, Rules & Configs
│   ├── skills/                   # Installed skills (ui-ux-pro-max, claude-mem, frontend-design, etc.)
│   └── mcp_config.json           # Workspace MCP configuration (21st.dev)
│
├── docs/                         # Master Project Architecture & Design Specs
│   ├── ARCHITECTURE.md           # Modular Monolith & Event Bus design
│   ├── MODULES_SPECIFICATION.md  # Detailed requirements for 5 modules
│   ├── DATABASE_SCHEMA.md        # Complete PostgreSQL tables, keys & indexes
│   ├── COMPONENT_SYSTEM.md       # Shared design system & reusable components
│   ├── DEVELOPMENT_GUIDELINES.md # Engineering standards, invariants & testing
│   └── FOLDER_STRUCTURE.md       # This file
│
├── apps/                         # Applications
│   ├── web/                      # Next.js 15 App Router Frontend
│   └── api/                      # NestJS Backend API Engine
│
├── packages/                     # Shared Workspace Packages
│   ├── database/                 # Prisma / Drizzle Schema & Migrations
│   ├── shared-types/             # TypeScript interfaces, Enums, Zod schemas & DTOs
│   └── shared-ui/                # Reusable UI component library (shadcn/ui + 21st.dev)
│
├── README.md                     # Project master overview
├── AGENTS.md                     # Agent directives and strict guardrails
├── GEMINI.md                     # Gemini / Antigravity rule entrypoint
└── package.json                  # Root workspace package.json (pnpm / npm workspaces)
```

---

## 2. Frontend Application (`apps/web/`)

```
apps/web/
├── public/                       # Static assets, logos, favicon
├── src/
│   ├── app/                      # Next.js App Router (Page routes by module)
│   │   ├── layout.tsx            # Root layout with Theme, QueryProvider, AuthProvider
│   │   ├── page.tsx              # Landing / Redirect to Dashboard
│   │   │
│   │   ├── (auth)/               # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   │
│   │   └── (dashboard)/          # Authenticated ERP App Shell
│   │       ├── layout.tsx        # Dashboard shell (Sidebar, Header, Breadcrumbs)
│   │       ├── page.tsx          # Overview KPI Dashboard
│   │       │
│   │       ├── sales/            # 1. SALES MODULE
│   │       │   ├── customers/    # Customer directory & CRM
│   │       │   ├── quotations/   # Quotation builder & list
│   │       │   ├── orders/       # Sales orders & fulfillment
│   │       │   ├── invoices/     # Sales invoicing & tax documents
│   │       │   └── returns/      # RMA & credit memos
│   │       │
│   │       ├── purchase/         # 2. PURCHASE MODULE
│   │       │   ├── vendors/      # Vendor master directory
│   │       │   ├── requisitions/ # Purchase requisitions (PR)
│   │       │   ├── rfq/          # Request for quotations
│   │       │   ├── orders/       # Purchase orders (PO)
│   │       │   ├── grn/          # Goods receipt notes (GRN)
│   │       │   └── bills/        # Vendor bills & 3-way match
│   │       │
│   │       ├── inventory/        # 3. INVENTORY MODULE
│   │       │   ├── items/        # SKU Item Master & Variants
│   │       │   ├── warehouses/   # Warehouses & bin locations
│   │       │   ├── transfers/    # Stock transfers
│   │       │   ├── adjustments/  # Cycle counts & write-offs
│   │       │   └── ledger/       # Immutable Stock Movement Ledger
│   │       │
│   │       ├── finance/          # 4. FINANCE MODULE
│   │       │   ├── chart-of-accounts/ # COA hierarchy tree
│   │       │   ├── journal-entries/   # General Ledger builder
│   │       │   ├── receivables/       # AR Aging & Customer payments
│   │       │   ├── payables/          # AP Aging & Vendor payments
│   │       │   ├── banking/           # Bank accounts & reconciliation
│   │       │   └── reports/           # Balance Sheet, P&L, Trial Balance
│   │       │
│   │       └── admin/            # 5. ADMIN MANAGEMENT MODULE
│   │           ├── users/        # User accounts & MFA status
│   │           ├── roles/        # RBAC permission matrix editor
│   │           ├── companies/    # Company profile & branches
│   │           ├── sequences/    # Document number sequence manager
│   │           └── audit-logs/   # Real-time mutation audit trail
│   │
│   ├── components/               # Module-specific and composite components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # API client, axios/fetch instance, utils
│   └── stores/                   # Zustand stores for UI client state
```

---

## 3. Backend Application (`apps/api/`)

```
apps/api/
├── src/
│   ├── main.ts                   # Application bootstrap & global pipes/interceptors
│   ├── app.module.ts             # Root NestJS module importing domain modules
│   │
│   ├── common/                   # Cross-Cutting Infrastructure
│   │   ├── auth/                 # JWT, Password hashing, Auth Guards
│   │   ├── rbac/                 # Permission guards & decorators (@RequirePermission)
│   │   ├── audit/                # Global AuditLog Interceptor
│   │   ├── tenancy/              # Tenant / Company context middleware
│   │   ├── sequence/             # Distributed Number Sequence Generator
│   │   ├── events/               # Transactional Outbox & EventBus Engine
│   │   └── filters/              # Global HTTP exception filters
│   │
│   └── modules/                  # 5 Core Domain Modules
│       ├── sales/                # Sales Module
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── dto/
│       │   ├── events/
│       │   └── sales.module.ts
│       │
│       ├── purchase/             # Purchase Module
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── dto/
│       │   ├── events/
│       │   └── purchase.module.ts
│       │
│       ├── inventory/            # Inventory Module
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── dto/
│       │   ├── events/
│       │   └── inventory.module.ts
│       │
│       ├── finance/              # Finance Module
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── dto/
│       │   ├── events/
│       │   └── finance.module.ts
│       │
│       └── admin/                # Admin Module
│           ├── controllers/
│           ├── services/
│           ├── dto/
│           └── admin.module.ts
```

---

## 4. Shared Packages (`packages/`)

```
packages/
├── shared-types/                 # Universal TypeScript Interfaces & DTOs
│   ├── src/
│   │   ├── sales/
│   │   ├── purchase/
│   │   ├── inventory/
│   │   ├── finance/
│   │   ├── admin/
│   │   ├── api-response.ts
│   │   └── index.ts
│   └── package.json
│
├── shared-ui/                    # Universal UI Components (shadcn + 21st.dev)
│   ├── src/
│   │   ├── data-table/
│   │   ├── forms/
│   │   ├── widgets/
│   │   ├── layouts/
│   │   └── index.ts
│   └── package.json
│
└── database/                     # Database Schema & Migrations
    ├── prisma/
    │   ├── schema.prisma         # Full multi-domain schema
    │   ├── migrations/           # Versioned SQL migrations
    │   └── seed.ts               # Default COA, Admin roles, System sequences
    └── package.json
```
