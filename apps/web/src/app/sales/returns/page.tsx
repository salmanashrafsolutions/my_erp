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
import { RotateCcw, Plus, PackageCheck, AlertOctagon } from 'lucide-react';

interface ReturnRow {
  id: string;
  rmaNumber: string;
  orderRef: string;
  customerName: string;
  returnDate: string;
  itemsCount: number;
  refundAmount: number;
  disposition: 'RESTOCKABLE' | 'DAMAGED_WRITE_OFF' | 'PENDING_INSPECTION';
  creditNoteIssued: boolean;
  status: 'PENDING_INSPECTION' | 'APPROVED' | 'REJECTED';
}

const initialReturns: ReturnRow[] = [
  {
    id: 'rma1',
    rmaNumber: 'RMA-2026-00012',
    orderRef: 'SO-ISB-2026-00039',
    customerName: 'Zenith Retail Solutions',
    returnDate: '2026-09-01',
    itemsCount: 2,
    refundAmount: 1850,
    disposition: 'RESTOCKABLE',
    creditNoteIssued: true,
    status: 'APPROVED',
  },
  {
    id: 'rma2',
    rmaNumber: 'RMA-2026-00013',
    orderRef: 'SO-NYC-2026-00041',
    customerName: 'Nexus Cybernetics Corp',
    returnDate: '2026-09-02',
    itemsCount: 1,
    refundAmount: 3400,
    disposition: 'PENDING_INSPECTION',
    creditNoteIssued: false,
    status: 'PENDING_INSPECTION',
  },
];

export default function SalesReturnsPage() {
  const [returns, setReturns] = useState(initialReturns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderRef: 'SO-ISB-2026-00042',
    customerName: 'Apex Global Logistics Inc.',
    itemsCount: 1,
    refundAmount: 450,
    disposition: 'RESTOCKABLE' as ReturnRow['disposition'],
  });

  const handleCreateRma = (e: React.FormEvent) => {
    e.preventDefault();
    const newRma: ReturnRow = {
      id: `rma-${Date.now()}`,
      rmaNumber: `RMA-2026-000${returns.length + 14}`,
      orderRef: formData.orderRef,
      customerName: formData.customerName,
      returnDate: new Date().toISOString().split('T')[0],
      itemsCount: Number(formData.itemsCount) || 1,
      refundAmount: Number(formData.refundAmount) || 0,
      disposition: formData.disposition,
      creditNoteIssued: false,
      status: 'PENDING_INSPECTION',
    };

    setReturns([newRma, ...returns]);
    setIsModalOpen(false);
  };

  const columns: Column<ReturnRow>[] = [
    {
      key: 'rmaNumber',
      header: 'RMA #',
      render: (r) => <span className="font-semibold text-rose-400">{r.rmaNumber}</span>,
    },
    {
      key: 'orderRef',
      header: 'Original Order',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{r.orderRef}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (r) => <span className="font-sans font-medium">{r.customerName}</span>,
    },
    {
      key: 'returnDate',
      header: 'Return Date',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.returnDate)}</span>,
    },
    {
      key: 'itemsCount',
      header: 'Units Returned',
      align: 'right',
      render: (r) => <span>{r.itemsCount} Units</span>,
    },
    {
      key: 'refundAmount',
      header: 'Credit Note Value',
      align: 'right',
      render: (r) => <MoneyDisplay amount={r.refundAmount} size="sm" />,
    },
    {
      key: 'disposition',
      header: 'Quality Inspection',
      align: 'center',
      render: (r) =>
        r.disposition === 'RESTOCKABLE' ? (
          <span className="flex items-center justify-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
            <PackageCheck className="w-3 h-3" /> Restock to WH
          </span>
        ) : r.disposition === 'DAMAGED_WRITE_OFF' ? (
          <span className="flex items-center justify-center gap-1 text-[10px] font-mono text-rose-400 bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/20">
            <AlertOctagon className="w-3 h-3" /> Damaged (Scrap)
          </span>
        ) : (
          <span className="text-[10px] font-mono text-amber-400">Awaiting QA</span>
        ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (r) => <StatusBadge status={r.status} />,
    },
  ];

  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Returns & RMA Management"
        badge={`${returns.length} Return Authorizations`}
        subtitle="Process customer merchandise returns, quality inspections, warehouse restock, and credit note issuance."
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Authorize Return (RMA)
          </button>
        }
      />

      {/* Returns DataTable */}
      <DataTable
        title="Merchandise Returns & Credit Notes"
        subtitle="Restockable items automatically increment inventory; damaged items post to Scrap COGS Expense"
        icon={RotateCcw}
        columns={columns}
        data={returns}
        keyExtractor={(r) => r.id}
      />

      {/* Create RMA Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Authorize Customer Return (RMA)"
        subtitle="Initiates warehouse gate-in inspection and credit note workflow"
        size="md"
      >
        <form onSubmit={handleCreateRma} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              Original Sales Order Ref *
            </label>
            <select
              value={formData.orderRef}
              onChange={(e) => setFormData({ ...formData, orderRef: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              <option value="SO-ISB-2026-00042">SO-ISB-2026-00042 (Apex Global)</option>
              <option value="SO-NYC-2026-00041">SO-NYC-2026-00041 (Nexus Corp)</option>
              <option value="SO-LON-2026-00040">SO-LON-2026-00040 (Vanguard Ind)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Returned Quantity *
              </label>
              <input
                type="number"
                min="1"
                required
                value={formData.itemsCount}
                onChange={(e) => setFormData({ ...formData, itemsCount: parseInt(e.target.value) || 1 })}
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
                Credit Amount (USD) *
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={formData.refundAmount}
                onChange={(e) => setFormData({ ...formData, refundAmount: parseFloat(e.target.value) || 0 })}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              Initial Condition Assessment *
            </label>
            <select
              value={formData.disposition}
              onChange={(e) => setFormData({ ...formData, disposition: e.target.value as ReturnRow['disposition'] })}
              className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              <option value="RESTOCKABLE">RESTOCKABLE (Intact packaging &mdash; Return to Active Stock)</option>
              <option value="DAMAGED_WRITE_OFF">DAMAGED_WRITE_OFF (Damaged &mdash; Write-off Expense)</option>
              <option value="PENDING_INSPECTION">PENDING_INSPECTION (Quarantine until QA testing)</option>
            </select>
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
              Authorize Return
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
