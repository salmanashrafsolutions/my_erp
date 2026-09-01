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
} from '@erp/shared-ui';
import { ShoppingBag, Plus, Truck, CheckCircle2, FileCheck } from 'lucide-react';

interface MatchRow {
  id: string;
  vendor: string;
  amount: number;
  variance: string;
  status: string;
}

const columns: Column<MatchRow>[] = [
  {
    key: 'id',
    header: 'PO ↔ GRN Ref',
    render: (r) => <span className="font-semibold text-amber-400">{r.id}</span>,
  },
  {
    key: 'vendor',
    header: 'Vendor Name',
    render: (r) => <span className="font-sans font-medium">{r.vendor}</span>,
  },
  {
    key: 'amount',
    header: 'Billed Amount',
    align: 'right',
    render: (r) => <MoneyDisplay amount={r.amount} size="sm" />,
  },
  {
    key: 'variance',
    header: '3-Way Variance',
    align: 'center',
    render: (r) => (
      <span
        className={
          r.status === 'APPROVED'
            ? 'text-emerald-500 font-mono text-[11px]'
            : r.status === 'REJECTED'
            ? 'text-rose-500 font-mono text-[11px]'
            : 'text-amber-500 font-mono text-[11px]'
        }
      >
        {r.variance}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Match Status',
    align: 'center',
    render: (r) => <StatusBadge status={r.status} />,
  },
];

const matchQueue: MatchRow[] = [
  { id: 'PO-0012 ↔ GRN-0009', vendor: 'Microchip Tech Ltd', amount: 24500, variance: '0.00% (Exact)', status: 'APPROVED' },
  { id: 'PO-0013 ↔ GRN-0010', vendor: 'Global Freight Dynamics', amount: 14800, variance: '+0.12% (OK)', status: 'PENDING_INSPECTION' },
  { id: 'PO-0014 ↔ GRN-0011', vendor: 'Pacific Raw Metals', amount: 58000, variance: 'Overbilled Qty', status: 'REJECTED' },
];

export default function PurchasePage() {
  return (
    <AppShell activeModule="purchase">
      <PageHeader
        title="Purchase & Procurement"
        badge="Module 02"
        subtitle="Vendor Master, Purchase Requisitions, POs, GRN Gate-In, and 3-Way Match Clearance."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Create PO
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard title="Open Commitments" value={<MoneyDisplay amount={128400} size="lg" />} change="-3.2%" trend="down" subtitle="18 orders pending GRN" icon={ShoppingBag} />
        <KpiCard title="Gate-In Receipts" value="6 Shipments" change="Inspection" trend="neutral" subtitle="Warehouse Gate-In" icon={Truck} />
        <KpiCard title="3-Way Match Rate" value="98.4%" change="+1.2%" trend="up" subtitle="Zero overbilling" icon={CheckCircle2} />
        <KpiCard title="Pending AP Bills" value={<MoneyDisplay amount={45200} size="lg" />} change="5 Bills" trend="neutral" subtitle="Accounts Payable" icon={FileCheck} />
      </div>

      <DataTable
        title="3-Way Matching Queue & Payment Clearance"
        subtitle="Constraint: Billed Qty &le; GRN Accepted Qty &le; PO Ordered Qty"
        icon={ShoppingBag}
        actionText="Audit Logs"
        columns={columns}
        data={matchQueue}
        keyExtractor={(r) => r.id}
      />
    </AppShell>
  );
}
