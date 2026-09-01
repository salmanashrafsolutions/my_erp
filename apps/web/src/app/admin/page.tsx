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
  sample: string;
}

const sequenceColumns: Column<SequenceRow>[] = [
  {
    key: 'code',
    header: 'Document Type',
    render: (row) => <span className="font-semibold text-cyan-400">{row.code}</span>,
  },
  {
    key: 'prefix',
    header: 'Prefix Format',
    render: (row) => <span style={{ color: 'var(--text-muted)' }}>{row.prefix}</span>,
  },
  {
    key: 'nextVal',
    header: 'Next Counter Value',
    align: 'right',
    render: (row) => <span>{row.nextVal}</span>,
  },
  {
    key: 'padding',
    header: 'Padding Width',
    align: 'center',
    render: (row) => <span>{row.padding} digits</span>,
  },
  {
    key: 'sample',
    header: 'Generated Sample',
    align: 'center',
    render: (row) => <StatusBadge status="CONFIRMED" label={row.sample} />,
  },
];

const sequences: SequenceRow[] = [
  { code: 'SALES_ORDER', prefix: 'SO-ISB-2026-', nextVal: 43, padding: 5, sample: 'SO-ISB-2026-00043' },
  { code: 'SALES_INVOICE', prefix: 'INV-2026-', nextVal: 104, padding: 5, sample: 'INV-2026-00104' },
  { code: 'PURCHASE_ORDER', prefix: 'PO-2026-', nextVal: 16, padding: 4, sample: 'PO-2026-0016' },
  { code: 'GOODS_RECEIPT_NOTE', prefix: 'GRN-2026-', nextVal: 13, padding: 4, sample: 'GRN-2026-0013' },
  { code: 'JOURNAL_ENTRY', prefix: 'JE-2026-', nextVal: 90, padding: 5, sample: 'JE-2026-00090' },
];

const auditItems: AuditItem[] = [
  { id: 'AUTH-001', action: 'UPDATE', resource: 'auth_role', actor: 'Salman Ashraf', time: '1m ago', detail: 'Updated permissions for Sales Manager role' },
  { id: 'SEQ-004', action: 'CREATE', resource: 'core_number_sequence', actor: 'Salman Ashraf', time: '15m ago', detail: 'Configured new sequence for RMA Returns' },
  { id: 'TEN-001', action: 'UPDATE', resource: 'tenants_branch', actor: 'Salman Ashraf', time: '1h ago', detail: 'Activated London Operating Branch (LON-01)' },
];

export default function AdminModulePage() {
  return (
    <AppShell>
      <PageHeader
        title="Admin, Governance & Security Console"
        badge="Module 05"
        subtitle="Multi-Tenancy, RBAC Permissions, Document Number Sequences, and Real-time Audit Trail."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add User / Role
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Users"
          value="36 Users"
          change="100% MFA"
          trend="up"
          subtitle="2FA TOTP Enforced"
          icon={Users}
        />
        <KpiCard
          title="Security Roles (RBAC)"
          value="8 Roles"
          change="Granular Matrix"
          trend="neutral"
          subtitle="Module:Resource:Action"
          icon={KeyRound}
        />
        <KpiCard
          title="Operating Branches"
          value="3 Locations"
          change="NYC, ISB, LON"
          trend="neutral"
          subtitle="Row-level isolation"
          icon={Building}
        />
        <KpiCard
          title="Number Sequences"
          value="12 Active"
          change="Redis Mutex"
          trend="up"
          subtitle="Gapless sequential numbering"
          icon={Hash}
        />
      </div>

      <DataTable
        title="Distributed Document Numbering Sequences"
        subtitle="Atomic counter increments protected by Redis distributed locks"
        icon={Hash}
        actionText="Configure Sequences"
        columns={sequenceColumns}
        data={sequences}
        keyExtractor={(item) => item.code}
      />

      <AuditFeed items={auditItems} />
    </AppShell>
  );
}
