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

interface JournalEntryRow {
  entryNumber: string;
  date: string;
  memo: string;
  sourceModule: string;
  totalDebit: number;
  totalCredit: number;
  status: 'POSTED' | 'DRAFT' | 'VOID';
}

const journalColumns: Column<JournalEntryRow>[] = [
  {
    key: 'entryNumber',
    header: 'Entry #',
    render: (row) => <span className="font-semibold text-purple-400">{row.entryNumber}</span>,
  },
  {
    key: 'date',
    header: 'Posting Date',
    render: (row) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(row.date)}</span>,
  },
  {
    key: 'memo',
    header: 'Journal Memo / Reference',
    render: (row) => <span className="font-sans font-medium">{row.memo}</span>,
  },
  {
    key: 'sourceModule',
    header: 'Source',
    render: (row) => <span style={{ color: 'var(--text-muted)' }}>{row.sourceModule}</span>,
  },
  {
    key: 'totalDebit',
    header: 'Debit',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.totalDebit} size="sm" />,
  },
  {
    key: 'totalCredit',
    header: 'Credit',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.totalCredit} size="sm" />,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    render: (row) => <StatusBadge status={row.status} />,
  },
];

const journalEntries: JournalEntryRow[] = [
  { entryNumber: 'JE-2026-0089', date: '2026-09-01', memo: 'Sales Invoice INV-2026-0042 (AR vs Sales Revenue + Tax)', sourceModule: 'SALES', totalDebit: 34500, totalCredit: 34500, status: 'POSTED' },
  { entryNumber: 'JE-2026-0088', date: '2026-09-01', memo: 'Vendor Bill BILL-2026-0012 (Inventory Asset vs AP)', sourceModule: 'PURCHASE', totalDebit: 24500, totalCredit: 24500, status: 'POSTED' },
  { entryNumber: 'JE-2026-0087', date: '2026-08-31', memo: 'COGS Recognition for Sales Order SO-2026-0040', sourceModule: 'INVENTORY', totalDebit: 41200, totalCredit: 41200, status: 'POSTED' },
  { entryNumber: 'JE-2026-0086', date: '2026-08-31', memo: 'Customer Wire Payment Receipt (Bank Checking vs AR)', sourceModule: 'BANKING', totalDebit: 18900, totalCredit: 18900, status: 'POSTED' },
];

export default function FinanceModulePage() {
  return (
    <AppShell>
      <PageHeader
        title="Finance & Accounting Management"
        badge="Module 04"
        subtitle="Chart of Accounts, Immutable Double-Entry GL, AR/AP Subledgers, and Financial Statements."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> New Journal Entry
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="General Ledger Status"
          value="100% Balanced"
          change="Σ Debit ≡ Σ Credit"
          trend="up"
          subtitle="Zero ledger discrepancy"
          icon={CheckCircle2}
        />
        <KpiCard
          title="Accounts Receivable (AR)"
          value={<MoneyDisplay amount={142800} size="lg" />}
          change="Current"
          trend="neutral"
          subtitle="Open customer balances"
          icon={DollarSign}
        />
        <KpiCard
          title="Accounts Payable (AP)"
          value={<MoneyDisplay amount={84200} size="lg" />}
          change="Within Net 30"
          trend="neutral"
          subtitle="Vendor commitments"
          icon={BookOpen}
        />
        <KpiCard
          title="YTD Net Operating Profit"
          value={<MoneyDisplay amount={324100} size="lg" />}
          change="+18.4%"
          trend="up"
          subtitle="Real-time P&L statement"
          icon={PieChart}
        />
      </div>

      <DataTable
        title="General Ledger Double-Entry Journals (Immutable)"
        subtitle="Rule: Posted accounting entries are strictly immutable. Corrections require offsetting reversals."
        icon={Layers}
        actionText="Trial Balance"
        columns={journalColumns}
        data={journalEntries}
        keyExtractor={(item) => item.entryNumber}
      />
    </AppShell>
  );
}
