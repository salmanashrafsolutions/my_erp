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
  formatQuantity,
} from '@erp/shared-ui';
import { Package, Plus, Warehouse, AlertCircle, RefreshCw } from 'lucide-react';

interface ItemRow {
  sku: string;
  name: string;
  warehouse: string;
  available: number;
  unitCost: number;
  method: string;
}

const columns: Column<ItemRow>[] = [
  {
    key: 'sku',
    header: 'SKU Code',
    render: (r) => <span className="font-semibold text-emerald-400">{r.sku}</span>,
  },
  {
    key: 'name',
    header: 'Description',
    render: (r) => <span className="font-sans font-medium">{r.name}</span>,
  },
  {
    key: 'warehouse',
    header: 'Warehouse Zone',
    render: (r) => <span style={{ color: 'var(--text-muted)' }}>{r.warehouse}</span>,
  },
  {
    key: 'available',
    header: 'Available Stock',
    align: 'right',
    render: (r) => (
      <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
        {formatQuantity(r.available, 'Units')}
      </span>
    ),
  },
  {
    key: 'unitCost',
    header: 'Unit Valuation',
    align: 'right',
    render: (r) => <MoneyDisplay amount={r.unitCost} size="sm" />,
  },
  {
    key: 'method',
    header: 'Method',
    align: 'center',
    render: (r) => <StatusBadge status={r.method} label={r.method} />,
  },
];

const items: ItemRow[] = [
  { sku: 'SKU-MICRO-01', name: 'Microcontroller Core ARM v8', warehouse: 'WH-MAIN (Zone A)', available: 1300, unitCost: 45.2, method: 'WAC' },
  { sku: 'SKU-SENS-04', name: 'Optoelectronic LiDAR Sensor', warehouse: 'WH-MAIN (Zone B)', available: 340, unitCost: 120.0, method: 'FIFO' },
  { sku: 'SKU-POW-12', name: 'Lithium Battery Pack 48V', warehouse: 'WH-EAST (Bin 04)', available: 25, unitCost: 340.5, method: 'WAC' },
];

export default function InventoryPage() {
  return (
    <AppShell activeModule="inventory">
      <PageHeader
        title="Inventory & Warehousing"
        badge="Module 03"
        subtitle="Item Master (SKUs), Bin Locations, Real-time Balances, and WAC/FIFO Costing."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add SKU
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <KpiCard title="Inventory Valuation" value={<MoneyDisplay amount={1845200} size="lg" />} change="+6.1%" trend="up" subtitle="Moving WAC active" icon={Package} />
        <KpiCard title="Active SKUs" value="3,420" change="12 Categories" trend="neutral" subtitle="Barcode tracked" icon={Warehouse} />
        <KpiCard title="Low Stock Alerts" value="4 SKUs" change="Reorder" trend="down" subtitle="Below safety min" icon={AlertCircle} />
        <KpiCard title="Stock Turnover" value="8.4x" change="+0.6x" trend="up" subtitle="Annual velocity" icon={RefreshCw} />
      </div>

      <DataTable
        title="Stock Balances & Reservation Status"
        subtitle="Available = Physical On-Hand - Reserved Stock"
        icon={Package}
        actionText="Movements Ledger"
        columns={columns}
        data={items}
        keyExtractor={(r) => r.sku}
      />
    </AppShell>
  );
}
