# ERP System Directives: Theme Architecture, Customization & Module Roadmap

This document outlines the system-wide visual theme tokens, super-admin customization principles, and our strict step-by-step, module-by-module development roadmap.

---

## 🎨 1. The 4 System-Wide Themes

Every UI component built in `@erp/shared-ui` and `apps/web` must use semantic CSS variables mapped across all 4 themes. No hardcoded colors.

### 1.1 Theme Definitions & Palettes

| Token | 1. Light (Enterprise) | 2. Dark (Obsidian Navy) | 3. Midnight Emerald (Cyber Nordic) | 4. Royal Amethyst (Imperial Slate) |
|---|---|---|---|---|
| `data-theme` | `light` | `dark` | `emerald` | `amethyst` |
| `--bg-canvas` | `#f8fafc` (Slate 50) | `#090d16` (Obsidian) | `#04100e` (Deep Forest) | `#0c0a17` (Deep Violet) |
| `--bg-surface` | `#ffffff` (Pure White) | `#111827` (Slate 900) | `#0a221f` (Dark Pine) | `#151226` (Velvet Surface) |
| `--bg-subtle` | `#f1f5f9` (Slate 100) | `#1e293b` (Slate 800) | `#103530` (Pine Subtle) | `#211c3b` (Violet Subtle) |
| `--border-color`| `#e2e8f0` (Slate 200) | `#1f293d` (Slate 800) | `#14423b` (Teal Border) | `#2e2752` (Amethyst Border) |
| `--text-main` | `#0f172a` (Slate 900) | `#f8fafc` (Slate 50) | `#f0fdf4` (Mint White) | `#faf5ff` (Lavender White) |
| `--text-muted` | `#64748b` (Slate 500) | `#94a3b8` (Slate 400) | `#6ee7b7` (Muted Mint) | `#c084fc` (Muted Lilac) |
| `--accent-primary`| `#2563eb` (Blue 600) | `#3b82f6` (Blue 500) | `#10b981` (Emerald 500)| `#8b5cf6` (Violet 500) |
| `--accent-glow` | `rgba(37,99,235,0.15)` | `rgba(59,130,246,0.2)` | `rgba(16,185,129,0.2)` | `rgba(139,92,246,0.2)`|

---

## 🏛️ 2. Architectural Rules & Directives

### 2.1 Universal Component Standard
- **No one-off UI code**: All layout shells, buttons, tables, badges, and cards must reside in `packages/shared-ui/` and consume the semantic design tokens.
- **Theme Resilience**: Any new page, modal, or form added in the future must automatically adapt to all 4 themes without requiring custom CSS.

### 2.2 Super-Admin Full Customizability
- Every system feature is configurable:
  - Enable/Disable modules per company/tenant.
  - Custom document numbering sequences (`prefix`, `padding`, `reset_frequency`).
  - Granular RBAC permissions (`Module:Resource:Action`).
  - Company-specific logo, base currency, and default theme overrides.

### 2.3 Phased Step-by-Step Development
- **No rushed multi-module code dumps**: We build module-by-module with thorough verification and testing:
  1. **Phase 1 (Completed)**: Core Monorepo, Database Schema, Shared Types, UI Components, and 4 Themes.
  2. **Phase 2**: Module 1 — **Sales Management** (Customers, Quotations, Orders, Invoicing, RMA).
  3. **Phase 3**: Module 2 — **Purchase Management** (Vendors, PR, RFQ, PO, GRN, 3-Way Matching).
  4. **Phase 4**: Module 3 — **Inventory Management** (SKU Master, Multi-Warehouse, Stock Movements, WAC/FIFO).
  5. **Phase 5**: Module 4 — **Finance & Accounting** (COA, Double-Entry GL, AR/AP Subledgers, Financial Reports).
  6. **Phase 6**: Module 5 — **Admin & Security** (Tenancy, RBAC Matrix, Sequences, Real-time Audit Trail).
