import React from 'react';
import { AppSidebar } from '../components/AppSidebar';
import { AppHeader } from '../components/AppHeader';
import { StatusBadge } from '../components/StatusBadge';
import { formatMoney, formatDate, formatQuantity } from '@erp/shared-ui';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';

const kpis = [
  {
    title: 'Total Monthly Sales',
    value: formatMoney(482950),
    change: '+14.8%',
    trend: 'up',
    subtitle: 'vs last month',
    module: 'Sales',
    icon: TrendingUp,
    accent: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30',
  },
  {
    title: 'Open Purchase Orders',
    value: formatMoney(128400),
    change: '-3.2%',
    trend: 'down',
    subtitle: '18 orders pending GRN',
    module: 'Purchase',
    icon: ShoppingBag,
    accent: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/30',
  },
  {
    title: 'Total Inventory Valuation',
    value: formatMoney(1845200),
    change: '+6.1%',
    trend: 'up',
    subtitle: '3,420 Active SKUs (WAC)',
    module: 'Inventory',
    icon: Package,
    accent: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30',
  },
  {
    title: 'Net General Ledger Balance',
    value: formatMoney(938100),
    change: 'Balanced',
    trend: 'neutral',
    subtitle: 'Debit = Credit (100%)',
    module: 'Finance',
    icon: Layers,
    accent: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30',
  },
];

const recentSalesOrders = [
  {
    id: 'SO-ISB-2026-00042',
    customer: 'Apex Global Logistics Inc.',
    date: '2026-09-01',
    amount: 34500,
    itemsCount: 14,
    status: 'CONFIRMED' as const,
  },
  {
    id: 'SO-NYC-2026-00041',
    customer: 'Nexus Cybernetics Corp',
    date: '2026-09-01',
    amount: 18900,
    itemsCount: 6,
    status: 'IN_PROGRESS' as const,
  },
  {
    id: 'SO-LON-2026-00040',
    customer: 'Vanguard Industrial Supplies',
    date: '2026-08-31',
    amount: 67200,
    itemsCount: 28,
    status: 'SHIPPED' as const,
  },
  {
    id: 'SO-ISB-2026-00039',
    customer: 'Zenith Retail Solutions',
    date: '2026-08-30',
    amount: 9850,
    itemsCount: 3,
    status: 'DRAFT' as const,
  },
];

const threeWayMatchQueue = [
  {
    poNumber: 'PO-2026-0012',
    vendor: 'Microchip Tech Ltd',
    grnNumber: 'GRN-2026-0009',
    billedAmount: 24500,
    matchStatus: 'APPROVED' as const,
    variance: '0.00%',
  },
  {
    poNumber: 'PO-2026-0013',
    vendor: 'Global Freight Dynamics',
    grnNumber: 'GRN-2026-0010',
    billedAmount: 14800,
    matchStatus: 'PENDING_INSPECTION' as const,
    variance: '+0.12% (In-Tolerance)',
  },
  {
    poNumber: 'PO-2026-0014',
    vendor: 'Pacific Raw Metals',
    grnNumber: 'GRN-2026-0011',
    billedAmount: 58000,
    matchStatus: 'REJECTED' as const,
    variance: 'Qty Mismatch (Overbilled)',
  },
];

const realTimeAuditTrail = [
  {
    action: 'POST',
    resource: 'finance_journal_entry',
    id: 'JE-2026-0089',
    actor: 'Salman Ashraf',
    time: '2 mins ago',
    detail: 'Balanced journal entry for Invoice INV-2026-0042 ($34,500.00)',
  },
  {
    action: 'CONFIRM',
    resource: 'sales_order',
    id: 'SO-ISB-2026-00042',
    actor: 'Salman Ashraf',
    time: '12 mins ago',
    detail: 'Reserved 14 items in Main Warehouse (WH-MAIN)',
  },
  {
    action: 'CREATE',
    resource: 'inventory_stock_ledger',
    id: 'GRN-2026-0009',
    actor: 'System Outbox Worker',
    time: '34 mins ago',
    detail: 'Stock Inbound: +500 units SKU-MICRO-01 (WAC recomputed)',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* 1. App Sidebar */}
      <AppSidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />

        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Executive Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
                Executive ERP Overview
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-normal">
                  Live Production Node
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time operational, financial, and inventory telemetry across all branches.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3.5 py-2 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm">
                <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
                Run Period Audit
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-blue-500/20">
                + Create New Document
              </button>
            </div>
          </div>

          {/* 3. Four Core Module KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={kpi.title}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 relative overflow-hidden backdrop-blur-sm hover:border-slate-700 transition-all shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {kpi.module}
                    </span>
                    <div className={`p-2 rounded-lg border bg-gradient-to-br ${kpi.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="text-2xl font-bold font-mono text-white tracking-tight">
                    {kpi.value}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400">{kpi.subtitle}</span>
                    <span
                      className={`flex items-center font-medium font-mono text-[11px] ${
                        kpi.trend === 'up'
                          ? 'text-emerald-400'
                          : kpi.trend === 'down'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {kpi.trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
                      {kpi.trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                      {kpi.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Two-Column Operational Views */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Sales Orders (2 Cols) */}
            <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    Active Sales Orders & Dispatch Pipeline
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Orders with automatic warehouse inventory reservation
                  </p>
                </div>
                <span className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer">
                  View All Orders &rarr;
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-medium uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3">Order Number</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3 text-right">Items</th>
                      <th className="py-2.5 px-3 text-right">Grand Total</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {recentSalesOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-semibold text-blue-400 cursor-pointer">
                          {order.id}
                        </td>
                        <td className="py-3 px-3 font-sans text-slate-200 font-normal">
                          {order.customer}
                        </td>
                        <td className="py-3 px-3 text-slate-400">{formatDate(order.date)}</td>
                        <td className="py-3 px-3 text-right text-slate-300">
                          {formatQuantity(order.itemsCount, 'SKUs')}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-white">
                          {formatMoney(order.amount)}
                        </td>
                        <td className="py-3 px-3 text-center font-sans">
                          <StatusBadge status={order.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Purchase 3-Way Match Invariant Queue (1 Col) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    3-Way Matching Engine
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">PO &harr; GRN &harr; Vendor Bill</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="space-y-3">
                {threeWayMatchQueue.map((item) => (
                  <div
                    key={item.poNumber}
                    className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-semibold text-slate-200">
                        {item.poNumber} &harr; {item.grnNumber}
                      </span>
                      <StatusBadge status={item.matchStatus} />
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>{item.vendor}</span>
                      <span className="font-mono font-bold text-white">
                        {formatMoney(item.billedAmount)}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                      <span>Variance Check:</span>
                      <span
                        className={
                          item.matchStatus === 'APPROVED'
                            ? 'text-emerald-400'
                            : item.matchStatus === 'REJECTED'
                            ? 'text-rose-400'
                            : 'text-amber-400'
                        }
                      >
                        {item.variance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Real-Time Audit Log & Transactional Outbox Activity */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 backdrop-blur-sm shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Real-time Immutable Audit Trail & Outbox Stream
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Complete JSON diffs recorded with actor IDs, timestamps, and database transaction hashes
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Live Feed
              </div>
            </div>

            <div className="space-y-2.5">
              {realTimeAuditTrail.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 hover:bg-slate-800/30 transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                        log.action === 'POST'
                          ? 'bg-teal-950/80 text-teal-300 border-teal-700/50'
                          : log.action === 'CONFIRM'
                          ? 'bg-blue-950/80 text-blue-300 border-blue-700/50'
                          : 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50'
                      }`}
                    >
                      {log.action}
                    </span>
                    <span className="font-mono text-slate-300">{log.resource} ({log.id})</span>
                    <span className="text-slate-400">&mdash;</span>
                    <span className="text-slate-300 text-[11px]">{log.detail}</span>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">{log.actor}</span>
                    <span className="font-mono text-slate-500">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
