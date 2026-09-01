# Enterprise Modular ERP System

An enterprise-grade, high-performance, modular Enterprise Resource Planning (ERP) platform built with a **Decoupled Modular Monolith Architecture**, **PostgreSQL**, **Next.js 15 / React 19**, **NestJS / TypeScript**, and **Tailwind CSS / shadcn/ui**.

---

## 🏛️ System Core Pillars (5 Modules)

| # | Module | Core Functionality | Primary Integration |
|---|---|---|---|
| **1** | **Sales** | Customer CRM, Price Lists, Quotations, Sales Orders, Invoicing, Dispatch Notes, RMA & Credit Memos | $\leftrightarrow$ Inventory (Stock Reservation) & Finance (AR) |
| **2** | **Purchase** | Vendor Master, Purchase Requisitions (PR), RFQ & Vendor Matrix, Purchase Orders (PO), Goods Receipt Note (GRN), 3-Way Matching | $\leftrightarrow$ Inventory (Stock In) & Finance (AP) |
| **3** | **Inventory** | Item Master (SKUs/Variants), Multi-Warehouse & Bin Locations, FIFO / WAC Valuation, Stock Ledger, Stock Adjustments, Reorder Rules | $\leftrightarrow$ Sales, Purchase & Finance (COGS / Inventory Asset) |
| **4** | **Finance** | Multi-level Chart of Accounts (COA), Immutable Double-Entry General Ledger (GL), Accounts Receivable (AR), Accounts Payable (AP), Banking & Cash, Real-time P&L, Balance Sheet | $\leftrightarrow$ Master financial posting destination for all modules |
| **5** | **Admin & Core** | Multi-Tenancy / Companies / Branches, Role-Based Access Control (RBAC), User Management, Document Number Sequences, Real-time Audit Trail, System Health | $\leftrightarrow$ Global system security & governance |

---

## 📚 Master Documentation Index

All development, component creation, backend services, and database designs must follow the foundational specifications detailed in the `docs/` folder:

1. 🏛️ **[System Architecture](docs/ARCHITECTURE.md)**: Architectural pattern, domain boundaries, EventBus, Outbox pattern, caching, and memory management.
2. 📋 **[Modules Specification](docs/MODULES_SPECIFICATION.md)**: Exhaustive functional requirements, state machines, business logic, calculations, and rules for all 5 modules.
3. 🗄️ **[Database Schema & Models](docs/DATABASE_SCHEMA.md)**: Complete PostgreSQL table schemas, UUIDv7 PKs, relational constraints, indexes, and audit logs.
4. 🧩 **[Reusable Component System](docs/COMPONENT_SYSTEM.md)**: UI/UX design tokens, atomic components, universal data tables, dynamic line item editors, and reuse patterns.
5. 📐 **[Development & Coding Guidelines](docs/DEVELOPMENT_GUIDELINES.md)**: Engineering standards, naming conventions, financial invariance rules, error handling, and testing.
6. 📁 **[Project Folder Structure](docs/FOLDER_STRUCTURE.md)**: Full layout of frontend, backend, shared packages, and database directories.

---

## 🛠️ Technology Stack

```
Frontend:   Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + shadcn/ui + TanStack Table/Query
Backend:    NestJS / TypeScript (Clean Architecture & Modular Monolith)
Database:   PostgreSQL 16 (Multi-Schema / Domain-Isolated Tables)
Cache/Lock: Redis 7 (TTL Caching, Distributed Locks for Stock & Sequences, BullMQ Job Queues)
Auth/RBAC:  JWT (HTTP-only cookies), Argon2 password hashing, fine-grained permission matrix
```

---

## 🚀 Quick Reference: Key Architectural Invariants

> [!IMPORTANT]
> 1. **Financial Invariant**: Every financial transaction must satisfy $\sum \text{Debit} \equiv \sum \text{Credit}$. Posted journal entries are strictly immutable.
> 2. **Stock Reservation Invariant**: Available stock = $\text{Physical On-Hand} - \text{Reserved (Unfulfilled SOs)}$. Stock cannot be oversold.
> 3. **3-Way Matching Invariant**: A Vendor Bill cannot be approved for payment unless `PO Price & Qty` $\equiv$ `GRN Accepted Qty` $\equiv$ `Bill Amount` (within defined variance thresholds).
> 4. **Audit Trail**: Every data mutation (`INSERT`, `UPDATE`, `DELETE`, `STATUS_CHANGE`) must record actor ID, timestamp, IP, and a JSON diff snapshot.
