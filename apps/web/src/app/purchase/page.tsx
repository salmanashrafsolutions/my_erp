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

interface MatchQueueRow {
  id: string;
  vendor: string;
  billedAmount: number;
  variance: string;
  status: 'APPROVED' | 'PENDING_INSPECTION' | 'REJECTED';
}

const matchColumns: Column<MatchQueueRow>[] = [
  {
    key: 'id',
    header: 'PO ↔ GRN Reference',
    render: (row) => <span className="font-semibold">{row.id}</span>,
  },
  {
    key: 'vendor',
    header: 'Vendor Legal Name',
    render: (row) => <span className="font-sans font-medium">{row.vendor}</span>,
  },
  {
    key: 'billedAmount',
    header: 'Billed Amount',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.billedAmount} size="sm" />,
  },
  {
    key: 'variance',
    header: 'Variance',
    align: 'center',
    render: (row) => (
      <span
        className={
          row.status === 'APPROVED'
            ? 'text-emerald-500 font-mono text-[11px]'
            : row.status === 'REJECTED'
            ? 'text-rose-500 font-mono text-[11px]'
            : 'text-amber-500 font-mono text-[11px]'
        }
      >
        {row.variance}
      </span>
    ),
  },
  {
    key: 'status',
    header: '3-Way Match Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const matchQueue: MatchQueueRow[] = [
  { id: 'PO-2026-0012 ↔ GRN-2026-0009', vendor: 'Microchip Tech Ltd', billedAmount: 24500, variance: '0.00% (Exact)', status: 'APPROVED' },
  { id: 'PO-2026-0013 ↔ GRN-2026-0010', vendor: 'Global Freight Dynamics', billedAmount: 14800, variance: '+0.12% (In-Tolerance)', status: 'PENDING_INSPECTION' },
  { id: 'PO-2026-0014 ↔ GRN-2026-0011', vendor: 'Pacific Raw Metals', billedAmount: 58000, variance: 'Qty Mismatch (Overbilled)', status: 'REJECTED' },
  { id: 'PO-2026-0015 ↔ GRN-2026-0012', vendor: 'Apex Packaging Industries', billedAmount: 8900, variance: '0.00% (Exact)', status: 'APPROVED' },
];

export default function PurchaseModulePage() {
  return (
    <AppShell>
      <PageHeader
        title="Purchase & Procurement Management"
        badge="Module 02"
        subtitle="Vendor Master, Requisitions, Purchase Orders, Gate-In GRN, and 3-Way Matching."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Create Purchase Order
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Open PO Commitments"
          value={<MoneyDisplay amount={128400} size="lg" />}
          change="-3.2%"
          trend="down"
          subtitle="18 orders pending fulfillment"
          icon={ShoppingBag}
        />
        <KpiCard
          title="Inbound Shipments"
          value="6 Pending"
          change="Gate-In Active"
          trend="neutral"
          subtitle="Awaiting GRN inspection"
          icon={Truck}
        />
        <KpiCard
          title="3-Way Matched"
          value="98.4%"
          change="+1.2%"
          trend="up"
          subtitle="Automated payment clearance"
          icon={CheckCircle2}
        />
        <KpiCard
          title="Pending AP Bills"
          value={<MoneyDisplay amount={45200} size="lg" />}
          change="5 Bills"
          trend="neutral"
          subtitle="Accounts Payable queue"
          icon={FileCheck}
        />
      </div>

      <DataTable
        title="3-Way Matching Engine & Payment Clearance"
        subtitle="Validation rule: Billed Qty &le; GRN Accepted Qty &le; PO Ordered Qty"
        icon={ShoppingBag}
        actionText="Review Tolerances"
        columns={matchColumns}
        data={matchQueue}
        keyExtractor={(item) => item.id}
      />
    </AppShell>
  );
}
