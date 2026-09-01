'use client';

import React from 'react';
import {
  AppShell,
  PageHeader,
  KpiCard,
  DataTable,
  StatusBadge,
  AuditFeed,
  AuditItem,
  Column,
} from '@erp/shared-ui';
import { ShieldCheck, Plus, Users, KeyRound, Building, Hash } from 'lucide-react';

interface SequenceRow {
  code: string;
  prefix: string;
  nextVal: number;
  padding: number;
}

const columns: Column<SequenceRow>[] = [
  {
    key: 'code',
    header: 'Document Type',
    render: (r) => <span className="font-semibold text-cyan-400">{r.code}</span>,
  },
  {
    key: 'prefix',
    header: 'Prefix Format',
    render: (r) => <span style={{ color: 'var(--text-muted)' }}>{r.prefix}</span>,
  },
  {
    key: 'nextVal',
    header: 'Next Counter',
    align: 'right',
    render: (r) => <span>{r.nextVal}</span>,
  },
  {
    key: 'padding',
    header: 'Padding',
    align: 'center',
    render: (r) => <span>{r.padding} digits</span>,
  },
];

const sequences: SequenceRow[] = [
  { code: 'SALES_ORDER', prefix: 'SO-ISB-2026-', nextVal: 43, padding: 5 },
  { code: 'SALES_INVOICE', prefix: 'INV-2026-', nextVal: 104, padding: 5 },
  { code: 'PURCHASE_ORDER', prefix: 'PO-2026-', nextVal: 16, padding: 4 },
  { code: 'GOODS_RECEIPT_NOTE', prefix: 'GRN-2026-', nextVal: 13, padding: 4 },
  { code: 'JOURNAL_ENTRY', prefix: 'JE-2026-', nextVal: 90, padding: 5 },
];

const auditItems: AuditItem[] = [
  { id: 'AUTH-001', action: 'UPDATE', resource: 'auth_role', actor: 'Salman Ashraf', time: '1m ago', detail: 'Updated permissions for Sales Manager role' },
  { id: 'SEQ-004', action: 'CREATE', resource: 'core_number_sequence', actor: 'Salman Ashraf', time: '15m ago', detail: 'Configured new sequence for RMA Returns' },
];

export default function AdminPage() {
  return (
    <AppShell activeModule="admin">
      <PageHeader
        title="Admin & Governance"
        badge="Module 05"
        subtitle="Multi-Tenancy, RBAC Permissions, Number Sequences, and Real-time Audit Logs."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add User
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard title="Active Users" value="36 Users" change="100% MFA" trend="up" subtitle="2FA TOTP Active" icon={Users} />
        <KpiCard title="Security Roles" value="8 Roles" change="RBAC" trend="neutral" subtitle="Granular matrix" icon={KeyRound} />
        <KpiCard title="Operating Branches" value="3 Branches" change="NYC, ISB, LON" trend="neutral" subtitle="Tenant isolation" icon={Building} />
        <KpiCard title="Sequences" value="12 Active" change="Redis Mutex" trend="up" subtitle="Gapless generation" icon={Hash} />
      </div>

      <DataTable
        title="Document Numbering Sequences"
        subtitle="Atomic counter increments protected by Redis distributed locks"
        icon={Hash}
        actionText="Configure"
        columns={columns}
        data={sequences}
        keyExtractor={(r) => r.code}
      />

      <AuditFeed items={auditItems} />
    </AppShell>
  );
}
