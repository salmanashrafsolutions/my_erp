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
import { TrendingUp, Plus, Users, ShoppingCart, FileText, RotateCcw } from 'lucide-react';

interface SalesOrderRow {
  id: string;
  customer: string;
  date: string;
  amount: number;
  itemsCount: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'SHIPPED' | 'DRAFT';
}

const salesColumns: Column<SalesOrderRow>[] = [
  {
    key: 'id',
    header: 'Order #',
    render: (row) => <span className="font-semibold text-blue-400">{row.id}</span>,
  },
  {
    key: 'customer',
    header: 'Customer',
    render: (row) => <span className="font-sans font-medium">{row.customer}</span>,
  },
  {
    key: 'date',
    header: 'Order Date',
    render: (row) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(row.date)}</span>,
  },
  {
    key: 'itemsCount',
    header: 'Ordered Items',
    align: 'right',
    render: (row) => <span>{formatQuantity(row.itemsCount, 'SKUs')}</span>,
  },
  {
    key: 'amount',
    header: 'Grand Total',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.amount} size="sm" />,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const recentOrders: SalesOrderRow[] = [
  { id: 'SO-ISB-2026-00042', customer: 'Apex Global Logistics Inc.', date: '2026-09-01', amount: 34500, itemsCount: 14, status: 'CONFIRMED' },
  { id: 'SO-NYC-2026-00041', customer: 'Nexus Cybernetics Corp', date: '2026-09-01', amount: 18900, itemsCount: 6, status: 'IN_PROGRESS' },
  { id: 'SO-LON-2026-00040', customer: 'Vanguard Industrial Supplies', date: '2026-08-31', amount: 67200, itemsCount: 28, status: 'SHIPPED' },
  { id: 'SO-ISB-2026-00039', customer: 'Zenith Retail Solutions', date: '2026-08-30', amount: 9850, itemsCount: 3, status: 'DRAFT' },
];

export default function SalesModulePage() {
  return (
    <AppShell>
      <PageHeader
        title="Sales & Customer Management"
        badge="Module 01"
        subtitle="Customer CRM, Quotations, Sales Orders, Stock Reservation, and Invoices."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Create Sales Order
          </button>
        }
      />

      {/* Sales KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Monthly Revenue"
          value={<MoneyDisplay amount={482950} size="lg" />}
          change="+14.8%"
          trend="up"
          subtitle="vs previous period"
          icon={TrendingUp}
        />
        <KpiCard
          title="Active Customers"
          value="482"
          change="+12 New"
          trend="up"
          subtitle="Credit limit enforced"
          icon={Users}
        />
        <KpiCard
          title="Open Sales Orders"
          value="24"
          change="18 Reserved"
          trend="neutral"
          subtitle="Awaiting dispatch"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Unpaid Invoices"
          value={<MoneyDisplay amount={68400} size="lg" />}
          change="3 Overdue"
          trend="down"
          subtitle="Accounts Receivable"
          icon={FileText}
        />
      </div>

      {/* Orders DataTable */}
      <DataTable
        title="Sales Orders & Fulfillment Queue"
        subtitle="Automatic stock reservation active in warehouse inventory"
        icon={TrendingUp}
        actionText="Export CSV"
        columns={salesColumns}
        data={recentOrders}
        keyExtractor={(item) => item.id}
      />
    </AppShell>
  );
}
