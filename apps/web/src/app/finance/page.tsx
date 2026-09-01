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
} from '@erp/shared-ui';
import { Layers, Plus, BookOpen, CheckCircle2, DollarSign, PieChart } from 'lucide-react';

interface JournalRow {
  entryNumber: string;
  date: string;
  memo: string;
  debit: number;
  credit: number;
  status: string;
}

const columns: Column<JournalRow>[] = [
  {
    key: 'entryNumber',
    header: 'Entry #',
    render: (r) => <span className="font-semibold text-purple-400">{r.entryNumber}</span>,
  },
  {
    key: 'date',
    header: 'Date',
    render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.date)}</span>,
  },
  {
    key: 'memo',
    header: 'Journal Memo',
    render: (r) => <span className="font-sans font-medium">{r.memo}</span>,
  },
  {
    key: 'debit',
    header: 'Debit Amount',
    align: 'right',
    render: (r) => <MoneyDisplay amount={r.debit} size="sm" />,
  },
  {
    key: 'credit',
    header: 'Credit Amount',
    align: 'right',
    render: (r) => <MoneyDisplay amount={r.credit} size="sm" />,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (r) => <StatusBadge status={r.status} />,
  },
];

const journals: JournalRow[] = [
  { entryNumber: 'JE-2026-0089', date: '2026-09-01', memo: 'Sales Invoice INV-0042 (AR vs Revenue)', debit: 34500, credit: 34500, status: 'POSTED' },
  { entryNumber: 'JE-2026-0088', date: '2026-09-01', memo: 'Vendor Bill BILL-0012 (Inventory vs AP)', debit: 24500, credit: 24500, status: 'POSTED' },
  { entryNumber: 'JE-2026-0087', date: '2026-08-31', memo: 'COGS Recognition for Order SO-0040', debit: 41200, credit: 41200, status: 'POSTED' },
];

export default function FinancePage() {
  return (
    <AppShell activeModule="finance">
      <PageHeader
        title="Finance & Accounting"
        badge="Module 04"
        subtitle="Chart of Accounts, Double-Entry GL, AR/AP Subledgers, and Financial Statements."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> New Journal
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard title="GL Balance Status" value="100% Balanced" change="Σ Debit ≡ Σ Credit" trend="up" subtitle="Zero discrepancy" icon={CheckCircle2} />
        <KpiCard title="Accounts Receivable" value={<MoneyDisplay amount={142800} size="lg" />} change="Current" trend="neutral" subtitle="Customer AR balances" icon={DollarSign} />
        <KpiCard title="Accounts Payable" value={<MoneyDisplay amount={84200} size="lg" />} change="Net 30" trend="neutral" subtitle="Vendor AP commitments" icon={BookOpen} />
        <KpiCard title="Net Operating Profit" value={<MoneyDisplay amount={324100} size="lg" />} change="+18.4%" trend="up" subtitle="YTD P&L statement" icon={PieChart} />
      </div>

      <DataTable
        title="Immutable General Ledger Journals"
        subtitle="Rule: Posted financial entries cannot be modified or deleted"
        icon={Layers}
        actionText="Trial Balance"
        columns={columns}
        data={journals}
        keyExtractor={(r) => r.entryNumber}
      />
    </AppShell>
  );
}
