'use client';

import React from 'react';
import {
  AppShell,
  PageHeader,
  KpiCard,
  DataTable,
  StatusBadge,
  MoneyDisplay,
  Column,
  formatDate,
  formatQuantity,
} from '@erp/shared-ui';
import { TrendingUp, Plus, Users, ShoppingCart, FileText } from 'lucide-react';

interface OrderRow {
  id: string;
  customer: string;
  date: string;
  itemsCount: number;
  amount: number;
  status: string;
}

const columns: Column<OrderRow>[] = [
  {
    key: 'id',
    header: 'Order #',
    render: (r) => <span className="font-semibold text-blue-400">{r.id}</span>,
  },
  {
    key: 'customer',
    header: 'Customer',
    render: (r) => <span className="font-sans font-medium">{r.customer}</span>,
  },
  {
    key: 'date',
    header: 'Date',
    render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.date)}</span>,
  },
  {
    key: 'itemsCount',
    header: 'SKUs',
    align: 'right',
    render: (r) => <span>{formatQuantity(r.itemsCount)}</span>,
  },
  {
    key: 'amount',
    header: 'Total',
    align: 'right',
    render: (r) => <MoneyDisplay amount={r.amount} size="sm" />,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (r) => <StatusBadge status={r.status} />,
  },
];

const orders: OrderRow[] = [
  { id: 'SO-2026-0042', customer: 'Apex Logistics', date: '2026-09-01', itemsCount: 14, amount: 34500, status: 'CONFIRMED' },
  { id: 'SO-2026-0041', customer: 'Nexus Corp', date: '2026-09-01', itemsCount: 6, amount: 18900, status: 'IN_PROGRESS' },
  { id: 'SO-2026-0040', customer: 'Vanguard Industrial', date: '2026-08-31', itemsCount: 28, amount: 67200, status: 'SHIPPED' },
  { id: 'SO-2026-0039', customer: 'Zenith Retail', date: '2026-08-30', itemsCount: 3, amount: 9850, status: 'DRAFT' },
];

export default function SalesPage() {
  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Sales Workspace"
        badge="Module 01"
        subtitle="Customer CRM, Quotations, Orders, and Invoices with real-time stock reservation."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> New Order
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard title="Monthly Sales" value={<MoneyDisplay amount={482950} size="lg" />} change="+14.8%" trend="up" subtitle="Current period" icon={TrendingUp} />
        <KpiCard title="Active Customers" value="482" change="+12" trend="up" subtitle="Credit limits active" icon={Users} />
        <KpiCard title="Open Orders" value="24" change="18 Reserved" trend="neutral" subtitle="Warehouse allocation" icon={ShoppingCart} />
        <KpiCard title="Open AR Balance" value={<MoneyDisplay amount={68400} size="lg" />} change="3 Overdue" trend="down" subtitle="Receivables queue" icon={FileText} />
      </div>

      <DataTable
        title="Recent Sales Orders"
        subtitle="Real-time stock reservation active"
        icon={TrendingUp}
        actionText="All Orders"
        columns={columns}
        data={orders}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
