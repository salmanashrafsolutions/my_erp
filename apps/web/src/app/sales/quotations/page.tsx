'use client';

import React, { useState } from 'react';
import {
  AppShell,
  PageHeader,
  DataTable,
  StatusBadge,
  MoneyDisplay,
  Modal,
  LineItemsTable,
  LineItem,
  Column,
  formatDate,
} from '@erp/shared-ui';
import { FileText, Plus, CheckCircle, ArrowRight } from 'lucide-react';
import { QuotationStatus } from '@erp/shared-types';

interface QuotationRow {
  id: string;
  code: string;
  customerName: string;
  issueDate: string;
  validUntil: string;
  totalAmount: number;
  status: QuotationStatus;
  itemsCount: number;
}

const initialQuotations: QuotationRow[] = [
  {
    id: 'q1',
    code: 'QUO-2026-00084',
    customerName: 'Apex Global Logistics Inc.',
    issueDate: '2026-09-01',
    validUntil: '2026-09-30',
    totalAmount: 41250,
    status: 'SENT',
    itemsCount: 3,
  },
  {
    id: 'q2',
    code: 'QUO-2026-00083',
    customerName: 'Nexus Cybernetics Corp',
    issueDate: '2026-08-30',
    validUntil: '2026-09-29',
    totalAmount: 18900,
    status: 'ACCEPTED',
    itemsCount: 2,
  },
  {
    id: 'q3',
    code: 'QUO-2026-00082',
    customerName: 'Vanguard Industrial Supplies',
    issueDate: '2026-08-28',
    validUntil: '2026-09-15',
    totalAmount: 94500,
    status: 'DRAFT',
    itemsCount: 5,
  },
  {
    id: 'q4',
    code: 'QUO-2026-00081',
    customerName: 'Pacific Metals Group',
    issueDate: '2026-08-10',
    validUntil: '2026-08-25',
    totalAmount: 52000,
    status: 'EXPIRED',
    itemsCount: 1,
  },
];

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState(initialQuotations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState('Apex Global Logistics Inc.');
  const [validDays, setValidDays] = useState(30);

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: 'l1',
      itemId: '1',
      itemSku: 'SKU-MICRO-01',
      itemName: 'Microcontroller Core ARM v8',
      quantity: 50,
      unitPrice: 45.0,
      discountAmount: 100,
      taxRate: 15,
      taxAmount: 322.5,
      lineTotal: 2472.5,
      availableStock: 1300,
    },
    {
      id: 'l2',
      itemId: '2',
      itemSku: 'SKU-SENS-04',
      itemName: 'Optoelectronic LiDAR Sensor',
      quantity: 10,
      unitPrice: 120.0,
      discountAmount: 0,
      taxRate: 15,
      taxAmount: 180.0,
      lineTotal: 1380.0,
      availableStock: 340,
    },
  ]);

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) return;

    const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const newQuo: QuotationRow = {
      id: `q-${Date.now()}`,
      code: `QUO-2026-000${quotations.length + 85}`,
      customerName: selectedCustomer,
      issueDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + validDays * 86400000).toISOString().split('T')[0],
      totalAmount: total,
      status: 'DRAFT',
      itemsCount: lineItems.length,
    };

    setQuotations([newQuo, ...quotations]);
    setIsModalOpen(false);
  };

  const convertToOrder = (quoId: string) => {
    setQuotations(
      quotations.map((q) => (q.id === quoId ? { ...q, status: 'ACCEPTED' as QuotationStatus } : q))
    );
  };

  const columns: Column<QuotationRow>[] = [
    {
      key: 'code',
      header: 'Quotation #',
      render: (r) => <span className="font-semibold text-blue-400">{r.code}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (r) => <span className="font-sans font-medium">{r.customerName}</span>,
    },
    {
      key: 'issueDate',
      header: 'Issue Date',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.issueDate)}</span>,
    },
    {
      key: 'validUntil',
      header: 'Expiry Date',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.validUntil)}</span>,
    },
    {
      key: 'itemsCount',
      header: 'Items',
      align: 'right',
      render: (r) => <span>{r.itemsCount} SKUs</span>,
    },
    {
      key: 'totalAmount',
      header: 'Grand Total',
      align: 'right',
      render: (r) => <MoneyDisplay amount={r.totalAmount} size="sm" />,
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
        <div className="flex items-center justify-center gap-2">
          {r.status === 'SENT' || r.status === 'DRAFT' ? (
            <button
              onClick={() => convertToOrder(r.id)}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-3 h-3" /> Accept &amp; Convert
            </button>
          ) : (
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-dim)' }}>
              Locked
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Sales Quotation Engine"
        badge={`${quotations.length} Active Quotes`}
        subtitle="Create price quotations, configure line item discounts, and convert accepted quotes to Sales Orders."
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Create Quotation
          </button>
        }
      />

      {/* Quotations DataTable */}
      <DataTable
        title="Quotation Register & State Machine"
        subtitle="Lifecycle: DRAFT → SENT → ACCEPTED / REJECTED / EXPIRED"
        icon={FileText}
        columns={columns}
        data={quotations}
        keyExtractor={(r) => r.id}
      />

      {/* Create Quotation Modal with LineItemsTable */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Generate New Sales Quotation"
        subtitle="Configure dynamic line items with automated tax & discount calculation"
        size="2xl"
      >
        <form onSubmit={handleCreateQuotation} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Target Customer *
              </label>
              <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                <option value="Apex Global Logistics Inc.">Apex Global Logistics Inc.</option>
                <option value="Nexus Cybernetics Corp">Nexus Cybernetics Corp</option>
                <option value="Vanguard Industrial Supplies">Vanguard Industrial Supplies</option>
                <option value="Zenith Retail Solutions">Zenith Retail Solutions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Quote Validity Period
              </label>
              <select
                value={validDays}
                onChange={(e) => setValidDays(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                <option value={15}>15 Days</option>
                <option value={30}>30 Days (Standard)</option>
                <option value={60}>60 Days</option>
              </select>
            </div>
          </div>

          {/* Universal LineItemsTable Component */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              Quotation Line Items
            </div>
            <LineItemsTable items={lineItems} onChange={setLineItems} currency="USD" />
          </div>

          <div
            className="pt-4 border-t flex justify-end gap-2.5"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
              Issue Quotation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
