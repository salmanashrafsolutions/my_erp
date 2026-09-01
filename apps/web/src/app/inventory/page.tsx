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

interface InventoryItemRow {
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  available: number;
  unitCost: number;
  valuationMethod: 'WAC' | 'FIFO' | 'STANDARD';
}

const inventoryColumns: Column<InventoryItemRow>[] = [
  {
    key: 'sku',
    header: 'SKU / Barcode',
    render: (row) => <span className="font-semibold text-emerald-400">{row.sku}</span>,
  },
  {
    key: 'name',
    header: 'Item Description',
    render: (row) => <span className="font-sans font-medium">{row.name}</span>,
  },
  {
    key: 'category',
    header: 'Category',
    render: (row) => <span style={{ color: 'var(--text-muted)' }}>{row.category}</span>,
  },
  {
    key: 'warehouse',
    header: 'Warehouse Location',
    render: (row) => <span>{row.warehouse}</span>,
  },
  {
    key: 'onHand',
    header: 'Physical On-Hand',
    align: 'right',
    render: (row) => <span>{formatQuantity(row.onHand, 'Units')}</span>,
  },
  {
    key: 'available',
    header: 'Available Stock',
    align: 'right',
    render: (row) => (
      <span className="font-bold" style={{ color: 'var(--accent-primary)' }}>
        {formatQuantity(row.available, 'Units')}
      </span>
    ),
  },
  {
    key: 'unitCost',
    header: 'Unit Valuation',
    align: 'right',
    render: (row) => <MoneyDisplay amount={row.unitCost} size="sm" />,
  },
  {
    key: 'valuationMethod',
    header: 'Method',
    align: 'center',
    render: (row) => <StatusBadge status={row.valuationMethod} label={row.valuationMethod} />,
  },
];

const inventoryItems: InventoryItemRow[] = [
  { sku: 'SKU-MICRO-01', name: 'Microcontroller Core ARM v8', category: 'Semiconductors', warehouse: 'WH-MAIN (Zone A)', onHand: 1500, reserved: 200, available: 1300, unitCost: 45.2, valuationMethod: 'WAC' },
  { sku: 'SKU-SENS-04', name: 'Optoelectronic LiDAR Sensor', category: 'Sensors', warehouse: 'WH-MAIN (Zone B)', onHand: 420, reserved: 80, available: 340, unitCost: 120.0, valuationMethod: 'FIFO' },
  { sku: 'SKU-POW-12', name: 'High-Density Lithium Pack 48V', category: 'Power Units', warehouse: 'WH-EAST (Bin 04)', onHand: 85, reserved: 60, available: 25, unitCost: 340.5, valuationMethod: 'WAC' },
  { sku: 'SKU-CAS-09', name: 'Anodized Aluminum Enclosure', category: 'Mechanical', warehouse: 'WH-WEST (Bin 12)', onHand: 3100, reserved: 450, available: 2650, unitCost: 18.5, valuationMethod: 'STANDARD' },
];

export default function InventoryModulePage() {
  return (
    <AppShell>
      <PageHeader
        title="Inventory & Warehouse Management"
        badge="Module 03"
        subtitle="Item Master (SKUs), Bin Locations, Real-time Stock Balances, and WAC/FIFO Costing."
        actions={
          <button
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-opacity hover:opacity-90 shadow-sm cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Add Item / SKU
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Inventory Valuation"
          value={<MoneyDisplay amount={1845200} size="lg" />}
          change="+6.1%"
          trend="up"
          subtitle="Moving WAC recomputed"
          icon={Package}
        />
        <KpiCard
          title="Active SKUs"
          value="3,420"
          change="12 Categories"
          trend="neutral"
          subtitle="Tracked with barcodes"
          icon={Warehouse}
        />
        <KpiCard
          title="Low Stock Alerts"
          value="4 SKUs"
          change="Reorder Needed"
          trend="down"
          subtitle="Below safety threshold"
          icon={AlertCircle}
        />
        <KpiCard
          title="Stock Turnover"
          value="8.4x"
          change="+0.6x"
          trend="up"
          subtitle="Annualized velocity"
          icon={RefreshCw}
        />
      </div>

      <DataTable
        title="Real-Time SKU Master & Stock Reservation Matrix"
        subtitle="Formula: Available Stock = Physical On-Hand - Reserved Stock (Unfulfilled Orders)"
        icon={Package}
        actionText="Stock Movements Ledger"
        columns={inventoryColumns}
        data={inventoryItems}
        keyExtractor={(item) => item.sku}
      />
    </AppShell>
  );
}
