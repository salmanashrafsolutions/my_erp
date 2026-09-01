'use client';

import React from 'react';
import {
  AppShell,
  PageHeader,
  KpiCard,
  DataTable,
  StatusBadge,
  MoneyDisplay,
  AuditFeed,
  formatDate,
  formatQuantity,
  Column,
  AuditItem,
} from '@erp/shared-ui';
import { TrendingUp, ShoppingBag, Package, Layers, Plus } from 'lucide-react';

interface SalesOrderRow {
  id: string;
  customer: string;
  date: string;
  amount: number;
  itemsCount: number;
  status: 'CONFIRMED' | 'IN_PROGRESS' | 'SHIPPED' | 'DRAFT';
}

interface MatchQueueRow {
  id: string;
  vendor: string;
  billedAmount: number;
  variance: string;
  status: 'APPROVED' | 'PENDING_INSPECTION' | 'REJECTED';
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
    render: (row) => <span className="font-sans text-slate-200">{row.customer}</span>,
  },
  {
    key: 'date',
    header: 'Date',
    render: (row) => <span className="text-slate-400">{formatDate(row.date)}</span>,
  },
  {
    key: 'itemsCount',
    header: 'Items',
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

const matchColumns: Column<MatchQueueRow>[] = [
  {
    key: 'id',
    header: 'PO ↔ GRN Ref',
    render: (row) => <span className="font-semibold text-slate-200">{row.id}</span>,
  },
  {
    key: 'vendor',
    header: 'Vendor',
    render: (row) => <span className="font-sans text-slate-300">{row.vendor}</span>,
  },
  {
    key: 'billedAmount',
    header: 'Billed Amount',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.billedAmount} size="sm" />,
  },
  {
    key: 'status',
    header: 'Match Status',
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

const matchQueue: MatchQueueRow[] = [
  { id: 'PO-0012 ↔ GRN-0009', vendor: 'Microchip Tech Ltd', billedAmount: 24500, variance: '0.00%', status: 'APPROVED' },
  { id: 'PO-0013 ↔ GRN-0010', vendor: 'Global Freight Dynamics', billedAmount: 14800, variance: '+0.12%', status: 'PENDING_INSPECTION' },
  { id: 'PO-0014 ↔ GRN-0011', vendor: 'Pacific Raw Metals', billedAmount: 58000, variance: 'Mismatch', status: 'REJECTED' },
];

const auditItems: AuditItem[] = [
  { id: 'JE-0089', action: 'POST', resource: 'finance_journal_entry', actor: 'Salman Ashraf', time: '2m ago', detail: 'Posted journal for INV-2026-0042 ($34,500.00)' },
  { id: 'SO-0042', action: 'CONFIRM', resource: 'sales_order', actor: 'Salman Ashraf', time: '12m ago', detail: 'Reserved 14 SKUs in WH-MAIN' },
  { id: 'GRN-0009', action: 'CREATE', resource: 'inventory_stock_ledger', actor: 'Outbox Worker', time: '34m ago', detail: 'Stock Inbound: +500 units SKU-MICRO-01' },
];

export default function DashboardPage() {
  return (
    <AppShell>
      {/* 1. Header */}
      <PageHeader
        title="Executive ERP Overview"
        badge="Live Production Node"
        subtitle="Real-time operational, financial, and inventory telemetry across all branches."
        actions={
          <button className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm">
            <Plus className="w-3.5 h-3.5" /> Create Document
          </button>
        }
      />

      {/* 2. KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Monthly Sales"
          value={<MoneyDisplay amount={482950} size="lg" />}
          change="+14.8%"
          trend="up"
          subtitle="vs last month"
          icon={TrendingUp}
        />
        <KpiCard
          title="Open Purchase Orders"
          value={<MoneyDisplay amount={128400} size="lg" />}
          change="-3.2%"
          trend="down"
          subtitle="18 orders pending GRN"
          icon={ShoppingBag}
        />
        <KpiCard
          title="Inventory Valuation"
          value={<MoneyDisplay amount={1845200} size="lg" />}
          change="+6.1%"
          trend="up"
          subtitle="3,420 Active SKUs (WAC)"
          icon={Package}
        />
        <KpiCard
          title="General Ledger Balance"
          value={<MoneyDisplay amount={938100} size="lg" />}
          change="Balanced"
          trend="neutral"
          subtitle="Debit = Credit (100%)"
          icon={Layers}
        />
      </div>

      {/* 3. Operational Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <DataTable
            title="Active Sales Orders & Fulfillment Pipeline"
            subtitle="Real-time stock reservation and dispatch status"
            icon={TrendingUp}
            actionText="View All Orders"
            columns={salesColumns}
            data={recentOrders}
            keyExtractor={(item) => item.id}
          />
        </div>

        <div>
          <DataTable
            title="3-Way Matching Engine"
            subtitle="PO ↔ GRN ↔ Vendor Bill validation"
            icon={ShoppingBag}
            actionText="Audit Queue"
            columns={matchColumns}
            data={matchQueue}
            keyExtractor={(item) => item.id}
          />
        </div>
      </div>

      {/* 4. Real-time Audit Feed */}
      <AuditFeed items={auditItems} />
    </AppShell>
  );
}
