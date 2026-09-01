# Development & Coding Guidelines

This document outlines mandatory engineering standards, TypeScript conventions, state management rules, API standards, error handling patterns, and testing requirements for the ERP codebase.

---

## 1. Core Engineering Principles

### 1.1 Strict Type Safety & Validation
- **No `any`**: Strict TypeScript (`strict: true`, `noImplicitAny: true`).
- **Zod for Runtime Validation**: Every API request body, query parameter, and frontend form MUST be validated with a strict Zod schema.
- **Shared DTOs**: Data Transfer Objects (DTOs) are shared between frontend and backend in `packages/shared-types/`.

### 1.2 Database Mutex & ACID Transactions
- Multi-table mutations (e.g. Sales Order confirmation + Stock reservation + Audit log entry) MUST run inside an interactive database transaction:
```typescript
await prisma.$transaction(async (tx) => {
  // 1. Mutate state
  const order = await tx.salesOrder.update(...);
  // 2. Adjust stock balance
  await tx.inventoryStockBalance.update(...);
  // 3. Write immutable audit log
  await tx.coreAuditLog.create(...);
  // 4. Write to Outbox event queue
  await tx.coreOutboxEvent.create(...);
});
```

### 1.3 Financial Immutability Invariant
- **Never mutate posted accounting records**: Once a Journal Entry status is `POSTED`, its lines and header cannot be updated or deleted.
- **Correction via Reversal**: Corrections require creating a new reversing Journal Entry or a Credit/Debit Memo with an explicit reference to the original document.
- **Debit/Credit Validation**: Always validate $\sum \text{Debit} \equiv \sum \text{Credit}$ before persisting:
```typescript
const totalDebit = lines.reduce((sum, l) => sum + l.debitAmount, 0);
const totalCredit = lines.reduce((sum, l) => sum + l.creditAmount, 0);
if (Math.abs(totalDebit - totalCredit) > 0.0001) {
  throw new UnprocessableEntityException('Debit and Credit totals must balance exactly.');
}
```

---

## 2. Frontend State Management & Data Fetching

### 2.1 Server State (TanStack Query v5)
- All remote API data fetching, caching, deduplication, and refetching must use **TanStack Query**.
- Query keys must follow structured hierarchical array keys:
  - `['sales', 'orders', { page, status, search }]`
  - `['inventory', 'items', id]`
  - `['finance', 'coa', 'tree']`
- **Mutations & Invalidation**: Every successful mutation must invalidate related query keys:
```typescript
const queryClient = useQueryClient();
const confirmOrderMutation = useMutation({
  mutationFn: (id: string) => api.sales.confirmOrder(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['sales', 'orders'] });
    queryClient.invalidateQueries({ queryKey: ['inventory', 'stock'] });
    toast.success('Sales order confirmed and stock reserved.');
  },
});
```

### 2.2 Client State (Zustand)
- Use Zustand strictly for UI state (e.g. active branch/company selection, sidebar collapse state, active modal state). Do NOT duplicate server state in Zustand.

---

## 3. Backend API Architecture & Clean Code

### 3.1 Controller-Service-Repository Pattern
```
[Client HTTP Request]
       │
       ▼
[Controller Layer]       -> Validates request DTO with Zod/Pipes, handles routing & HTTP status
       │
       ▼
[Service Domain Layer]   -> Pure business logic, state machines, math calculations, RBAC check
       │
       ▼
[Repository / ORM Layer] -> Data persistence, ACID transactions, database queries
```

### 3.2 Standardized REST Response Envelope
All API endpoints return a uniform JSON response structure:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

### 3.3 HTTP Status Codes Convention
- `200 OK`: Successful read or update.
- `201 Created`: Successful creation of resource.
- `400 Bad Request`: Validation failure (Zod validation error details).
- `401 Unauthorized`: Missing or expired authentication token.
- `403 Forbidden`: Authenticated user lacks the required RBAC permission.
- `404 Not Found`: Entity with specified ID does not exist.
- `409 Conflict`: Unique constraint violation or concurrency lock collision.
- `422 Unprocessable Entity`: Business invariant violation (e.g. insufficient stock, out-of-balance journal).

---

## 4. Testing Strategy & Quality Assurance

1. **Unit Tests (Vitest / Jest)**:
   - All financial math calculators (COGS, WAC, Tax, Line Totals).
   - State machine transition guards.
   - Sequence number generation logic.
2. **Integration Tests (Supertest + Testcontainers PostgreSQL)**:
   - Full API endpoint tests with real database transactions.
   - 3-Way Match validation testing with varying tolerances.
   - Order-to-Cash and Procure-to-Pay end-to-end flows.
3. **Frontend Component Tests (React Testing Library)**:
   - Universal `DataTable` sorting, filtering, and pagination.
   - Universal `LineItemsTable` dynamic row addition and total recalculations.
