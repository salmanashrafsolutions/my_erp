'use client';

import React, { useState } from 'react';
import {
  AppShell,
  PageHeader,
  DataTable,
  StatusBadge,
  MoneyDisplay,
  Modal,
  Column,
  formatDate,
} from '@erp/shared-ui';
import { FileText, Plus, DollarSign, CheckCircle2, ShieldCheck } from 'lucide-react';
import { InvoiceStatus } from '@erp/shared-types';

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  customerName: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: InvoiceStatus;
  postedToGl: boolean;
}

const initialInvoices: InvoiceRow[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2026-00042',
    orderNumber: 'SO-ISB-2026-00042',
    customerName: 'Apex Global Logistics Inc.',
    issueDate: '2026-09-01',
    dueDate: '2026-10-01',
    totalAmount: 34500,
    paidAmount: 0,
    balanceDue: 34500,
    status: 'POSTED',
    postedToGl: true,
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2026-00041',
    orderNumber: 'SO-NYC-2026-00041',
    customerName: 'Nexus Cybernetics Corp',
    issueDate: '2026-09-01',
    dueDate: '2026-09-16',
    totalAmount: 18900,
    paidAmount: 10000,
    balanceDue: 8900,
    status: 'PARTIAL',
    postedToGl: true,
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2026-00040',
    orderNumber: 'SO-LON-2026-00040',
    customerName: 'Vanguard Industrial Supplies',
    issueDate: '2026-08-15',
    dueDate: '2026-08-30',
    totalAmount: 67200,
    paidAmount: 0,
    balanceDue: 67200,
    status: 'OVERDUE',
    postedToGl: true,
  },
  {
    id: 'inv4',
    invoiceNumber: 'INV-2026-00039',
    orderNumber: 'SO-ISB-2026-00038',
    customerName: 'Zenith Retail Solutions',
    issueDate: '2026-08-20',
    dueDate: '2026-08-20',
    totalAmount: 9850,
    paidAmount: 9850,
    balanceDue: 0,
    status: 'PAID',
    postedToGl: true,
  },
];

export default function SalesInvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice || paymentAmount <= 0) return;

    const newPaid = selectedInvoice.paidAmount + paymentAmount;
    const newBalance = Math.max(0, selectedInvoice.totalAmount - newPaid);
    const newStatus: InvoiceStatus = newBalance === 0 ? 'PAID' : 'PARTIAL';

    setInvoices(
      invoices.map((inv) =>
        inv.id === selectedInvoice.id
          ? {
              ...inv,
              paidAmount: newPaid,
              balanceDue: newBalance,
              status: newStatus,
            }
          : inv
      )
    );
    setSelectedInvoice(null);
  };

  const columns: Column<InvoiceRow>[] = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      render: (r) => <span className="font-semibold text-blue-400">{r.invoiceNumber}</span>,
    },
    {
      key: 'orderNumber',
      header: 'Sales Order Ref',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{r.orderNumber}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (r) => <span className="font-sans font-medium">{r.customerName}</span>,
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (r) => (
        <span
          className={r.status === 'OVERDUE' ? 'text-rose-400 font-bold' : ''}
          style={{ color: r.status === 'OVERDUE' ? undefined : 'var(--text-muted)' }}
        >
          {formatDate(r.dueDate)}
        </span>
      ),
    },
    {
      key: 'totalAmount',
      header: 'Invoice Total',
      align: 'right',
      render: (r) => <MoneyDisplay amount={r.totalAmount} size="sm" />,
    },
    {
      key: 'balanceDue',
      header: 'Balance Due',
      align: 'right',
      render: (r) => (
        <MoneyDisplay
          amount={r.balanceDue}
          size="sm"
          trend={r.balanceDue > 0 ? (r.status === 'OVERDUE' ? 'negative' : 'neutral') : 'positive'}
        />
      ),
    },
    {
      key: 'postedToGl',
      header: 'GL Journal',
      align: 'center',
      render: (r) =>
        r.postedToGl ? (
          <span className="flex items-center justify-center gap-1 text-[10px] font-mono text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-500/20">
            <ShieldCheck className="w-3 h-3" /> JE-POSTED
          </span>
        ) : (
          <span className="text-[10px] font-mono text-slate-500">Unposted</span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      render: (r) => (
        <div className="flex items-center justify-center">
          {r.balanceDue > 0 ? (
            <button
              onClick={() => {
                setSelectedInvoice(r);
                setPaymentAmount(r.balanceDue);
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <DollarSign className="w-3 h-3" /> Record Payment
            </button>
          ) : (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
              <CheckCircle2 className="w-3 h-3" /> Settled
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Sales Invoicing & Accounts Receivable (AR)"
        badge={`${invoices.length} Invoices`}
        subtitle="Manage sales invoices, double-entry general ledger posting, payment recording, and aging receivables."
      />

      {/* Invoices DataTable */}
      <DataTable
        title="Sales Invoices Register"
        subtitle="Immutable Financial Record &middot; Auto-posts AR vs Revenue upon issuance"
        icon={FileText}
        columns={columns}
        data={invoices}
        keyExtractor={(r) => r.id}
      />

      {/* Record Payment Modal */}
      {selectedInvoice && (
        <Modal
          isOpen={!!selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          title={`Record Customer Payment &mdash; ${selectedInvoice.invoiceNumber}`}
          subtitle={`Customer: ${selectedInvoice.customerName} &middot; Total: $${selectedInvoice.totalAmount.toLocaleString()}`}
          size="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Outstanding Balance
              </label>
              <div
                className="p-3 rounded-lg border font-mono text-sm font-bold"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--accent-primary)',
                }}
              >
                ${selectedInvoice.balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Payment Amount Received (USD) *
              </label>
              <input
                type="number"
                required
                min="0.01"
                max={selectedInvoice.balanceDue}
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Deposit Account (General Ledger) *
              </label>
              <select
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                <option value="1010">1010 &mdash; Main Operating Bank Checking</option>
                <option value="1020">1020 &mdash; Wire &amp; Stripe Clearing Account</option>
              </select>
            </div>

            <div
              className="pt-4 border-t flex justify-end gap-2.5"
              style={{ borderColor: 'var(--border-color)' }}
            >
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer hover:opacity-90 flex items-center gap-1.5"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              >
                Post Payment Entry
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AppShell>
  );
}
