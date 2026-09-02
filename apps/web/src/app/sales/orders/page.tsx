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
  formatQuantity,
} from '@erp/shared-ui';
import { ShoppingCart, Plus, CheckCircle, Truck, AlertTriangle } from 'lucide-react';
import { SalesOrderStatus } from '@erp/shared-types';

interface OrderRow {
  id: string;
  orderNumber: string;
  customerName: string;
  orderDate: string;
  itemsCount: number;
  totalAmount: number;
  status: SalesOrderStatus;
  stockReserved: boolean;
}

const initialOrders: OrderRow[] = [
  {
    id: 'o1',
    orderNumber: 'SO-ISB-2026-00042',
    customerName: 'Apex Global Logistics Inc.',
    orderDate: '2026-09-01',
    itemsCount: 14,
    totalAmount: 34500,
    status: 'CONFIRMED',
    stockReserved: true,
  },
  {
    id: 'o2',
    orderNumber: 'SO-NYC-2026-00041',
    customerName: 'Nexus Cybernetics Corp',
    orderDate: '2026-09-01',
    itemsCount: 6,
    totalAmount: 18900,
    status: 'IN_PROGRESS',
    stockReserved: true,
  },
  {
    id: 'o3',
    orderNumber: 'SO-LON-2026-00040',
    customerName: 'Vanguard Industrial Supplies',
    orderDate: '2026-08-31',
    itemsCount: 28,
    totalAmount: 67200,
    status: 'SHIPPED',
    stockReserved: true,
  },
  {
    id: 'o4',
    orderNumber: 'SO-ISB-2026-00039',
    customerName: 'Zenith Retail Solutions',
    orderDate: '2026-08-30',
    itemsCount: 3,
    totalAmount: 9850,
    status: 'DRAFT',
    stockReserved: false,
  },
];

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState('Apex Global Logistics Inc.');

  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: 'l1',
      itemId: '1',
      itemSku: 'SKU-MICRO-01',
      itemName: 'Microcontroller Core ARM v8',
      quantity: 100,
      unitPrice: 45.0,
      discountAmount: 0,
      taxRate: 15,
      taxAmount: 675.0,
      lineTotal: 5175.0,
      availableStock: 1300,
    },
  ]);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) return;

    const total = lineItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const newOrder: OrderRow = {
      id: `o-${Date.now()}`,
      orderNumber: `SO-ISB-2026-000${orders.length + 43}`,
      customerName: customer,
      orderDate: new Date().toISOString().split('T')[0],
      itemsCount: lineItems.reduce((s, i) => s + i.quantity, 0),
      totalAmount: total,
      status: 'CONFIRMED',
      stockReserved: true,
    };

    setOrders([newOrder, ...orders]);
    setIsModalOpen(false);
  };

  const advanceOrderStatus = (orderId: string, nextStatus: SalesOrderStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
  };

  const columns: Column<OrderRow>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (r) => <span className="font-semibold text-blue-400">{r.orderNumber}</span>,
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (r) => <span className="font-sans font-medium">{r.customerName}</span>,
    },
    {
      key: 'orderDate',
      header: 'Order Date',
      render: (r) => <span style={{ color: 'var(--text-muted)' }}>{formatDate(r.orderDate)}</span>,
    },
    {
      key: 'itemsCount',
      header: 'Ordered Items',
      align: 'right',
      render: (r) => <span>{formatQuantity(r.itemsCount, 'Units')}</span>,
    },
    {
      key: 'totalAmount',
      header: 'Order Total',
      align: 'right',
      render: (r) => <MoneyDisplay amount={r.totalAmount} size="sm" />,
    },
    {
      key: 'stockReserved',
      header: 'Inventory Lock',
      align: 'center',
      render: (r) =>
        r.stockReserved ? (
          <span className="flex items-center justify-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" /> Stock Reserved
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded border border-amber-500/20">
            <AlertTriangle className="w-3 h-3" /> Uncommitted
          </span>
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
      header: 'Lifecycle Workflow',
      align: 'center',
      render: (r) => (
        <div className="flex items-center justify-center gap-2">
          {r.status === 'DRAFT' && (
            <button
              onClick={() => advanceOrderStatus(r.id, 'CONFIRMED')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-blue-400 bg-blue-950/40 border border-blue-500/30 hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              Confirm &amp; Lock Stock
            </button>
          )}
          {r.status === 'CONFIRMED' && (
            <button
              onClick={() => advanceOrderStatus(r.id, 'IN_PROGRESS')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-amber-400 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/50 transition-colors cursor-pointer"
            >
              Start Picking
            </button>
          )}
          {r.status === 'IN_PROGRESS' && (
            <button
              onClick={() => advanceOrderStatus(r.id, 'SHIPPED')}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md text-purple-400 bg-purple-950/40 border border-purple-500/30 hover:bg-purple-900/50 transition-colors cursor-pointer"
            >
              <Truck className="w-3 h-3" /> Dispatch Goods
            </button>
          )}
          {r.status === 'SHIPPED' && (
            <button
              onClick={() => advanceOrderStatus(r.id, 'DELIVERED')}
              className="px-2.5 py-1 text-[11px] font-semibold rounded-md text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              Confirm Delivery
            </button>
          )}
          {r.status === 'DELIVERED' && (
            <span className="text-[11px] font-mono text-emerald-400">Fulfilled</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <AppShell activeModule="sales">
      <PageHeader
        title="Sales Orders & Fulfillment Pipeline"
        badge={`${orders.length} Orders`}
        subtitle="Manage sales order execution, automatic warehouse stock reservation, picking, and dispatch."
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3.5 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Plus className="w-3.5 h-3.5" /> Create Sales Order
          </button>
        }
      />

      {/* Orders DataTable */}
      <DataTable
        title="Sales Orders Lifecycle"
        subtitle="State Machine: DRAFT → CONFIRMED (Locks Stock) → IN_PROGRESS → SHIPPED → DELIVERED"
        icon={ShoppingCart}
        columns={columns}
        data={orders}
        keyExtractor={(r) => r.id}
      />

      {/* Create Order Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Sales Order"
        subtitle="Confirms order and initiates atomic stock reservation in warehouse"
        size="2xl"
      >
        <form onSubmit={handleCreateOrder} className="space-y-5">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              Customer *
            </label>
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
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
            <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              Order Line Items &amp; Stock Availability
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
              Confirm Order &amp; Reserve Stock
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}
