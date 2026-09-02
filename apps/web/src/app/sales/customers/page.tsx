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
import { Users, Plus, Search, Mail, Phone, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { CustomerDto, PaymentTerms } from '@erp/shared-types';

const initialCustomers: (CustomerDto & { openBalance: number })[] = [
  {
    id: 'c1',
    companyId: 'comp-1',
    code: 'CUST-001',
    name: 'Apex Global Logistics Inc.',
    email: 'billing@apexlogistics.com',
    phone: '+1 555-0192',
    taxNumber: 'US-TAX-8849201',
    creditLimit: 100000,
    paymentTerms: 'NET_30',
    openBalance: 34500,
    isActive: true,
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'c2',
    companyId: 'comp-1',
    code: 'CUST-002',
    name: 'Nexus Cybernetics Corp',
    email: 'accounts@nexuscyber.io',
    phone: '+1 555-0184',
    taxNumber: 'US-TAX-1920394',
    creditLimit: 50000,
    paymentTerms: 'NET_15',
    openBalance: 18900,
    isActive: true,
    createdAt: '2026-08-10T12:00:00Z',
  },
  {
    id: 'c3',
    companyId: 'comp-1',
    code: 'CUST-003',
    name: 'Vanguard Industrial Supplies',
    email: 'procurement@vanguard-ind.com',
    phone: '+44 20-7946-0912',
    taxNumber: 'GB-VAT-9920194',
    creditLimit: 250000,
    paymentTerms: 'NET_60',
    openBalance: 67200,
    isActive: true,
    createdAt: '2026-07-15T09:30:00Z',
  },
  {
    id: 'c4',
    companyId: 'comp-1',
    code: 'CUST-004',
    name: 'Zenith Retail Solutions',
    email: 'finance@zenithretail.com',
    phone: '+1 555-0143',
    taxNumber: 'US-TAX-3049281',
    creditLimit: 25000,
    paymentTerms: 'IMMEDIATE',
    openBalance: 9850,
    isActive: true,
    createdAt: '2026-08-25T14:15:00Z',
  },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: `CUST-00${customers.length + 1}`,
    name: '',
    email: '',
    phone: '',
    taxNumber: '',
    creditLimit: 50000,
    paymentTerms: 'NET_30' as PaymentTerms,
  });

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newCustomer = {
      id: `c${Date.now()}`,
      companyId: 'comp-1',
      code: formData.code,
      name: formData.name,
      email: formData.email || null,
      phone: formData.phone || null,
      taxNumber: formData.taxNumber || null,
      creditLimit: Number(formData.creditLimit) || 0,
      paymentTerms: formData.paymentTerms,
      openBalance: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setCustomers([newCustomer, ...customers]);
    setIsModalOpen(false);
    setFormData({
      code: `CUST-00${customers.length + 2}`,
      name: '',
      email: '',
      phone: '',
      taxNumber: '',
      creditLimit: 50000,
      paymentTerms: 'NET_30',
    });
  };

  const columns: Column<typeof customers[0]>[] = [
    {
      key: 'code',
      header: 'Customer Code',
      render: (r) => <span className="font-semibold text-blue-400">{r.code}</span>,
    },
    {
      key: 'name',
      header: 'Customer / Company Name',
      render: (r) => (
        <div>
          <div className="font-sans font-semibold text-xs">{r.name}</div>
          <div className="flex items-center gap-3 text-[11px] font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {r.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {r.email}
              </span>
            )}
            {r.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {r.phone}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'paymentTerms',
      header: 'Payment Terms',
      align: 'center',
      render: (r) => (
        <span
          className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded border"
          style={{
            backgroundColor: 'var(--badge-bg)',
            color: 'var(--badge-text)',
            borderColor: 'var(--border-color)',
          }}
        >
          {r.paymentTerms}
        </span>
      ),
    },
    {
      key: 'creditLimit',
      header: 'Credit Limit',
      align: 'right',
      render: (r) => <MoneyDisplay amount={r.creditLimit} size="sm" />,
    },
    {
      key: 'openBalance',
      header: 'Current Exposure',
      align: 'right',
      render: (r) => (
        <div className="text-right">
          <MoneyDisplay
            amount={r.openBalance}
            size="sm"
            trend={r.openBalance > r.creditLimit * 0.8 ? 'negative' : 'neutral'}
          />
          <div className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>
            {((r.openBalance / (r.creditLimit || 1)) * 100).toFixed(0)}% utilized
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (r) => (
        <StatusBadge status={r.isActive ? 'APPROVED' : 'VOID'} label={r.isActive ? 'ACTIVE' : 'INACTIVE'} />
      ),
    },
  ];

  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Customer CRM & Accounts Directory"
        badge={`${customers.length} Accounts`}
        subtitle="Manage customer profiles, credit limit governance, tax registration, and payment terms."
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Customer
          </button>
        }
      />

      {/* Filter & Search Bar */}
      <div
        className="flex items-center gap-3 p-3 rounded-xl border"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <Search className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by customer name, code (CUST-001), or email..."
          className="w-full bg-transparent text-xs focus:outline-none"
          style={{ color: 'var(--text-main)' }}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Customer DataTable */}
      <DataTable
        title="Customer Master Records"
        subtitle="Enforces credit exposure checks before Sales Order confirmation"
        icon={Users}
        columns={columns}
        data={filtered}
        keyExtractor={(r) => r.id}
      />

      {/* Add Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Customer Account"
        subtitle="Establish client billing entity and credit limits"
        size="lg"
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Customer Code *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
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
                Legal / Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Acme Corporation Ltd"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Billing Email
              </label>
              <input
                type="email"
                placeholder="billing@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Contact Phone
              </label>
              <input
                type="text"
                placeholder="+1 555-0199"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                Credit Limit (USD) *
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })}
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
                Payment Terms *
              </label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value as PaymentTerms })}
                className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              >
                <option value="IMMEDIATE">IMMEDIATE (Due on Receipt)</option>
                <option value="NET_15">NET_15 (15 Days)</option>
                <option value="NET_30">NET_30 (30 Days)</option>
                <option value="NET_60">NET_60 (60 Days)</option>
                <option value="NET_90">NET_90 (90 Days)</option>
              </select>
            </div>
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
              className="px-4 py-2 text-white text-xs font-semibold rounded-lg shadow-sm cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Save Customer Account
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
