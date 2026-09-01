import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  ShieldCheck,
  LayoutDashboard,
  Building2,
  FileText,
  CreditCard,
  Truck,
  ArrowRightLeft,
  Users,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  {
    name: 'Sales',
    icon: TrendingUp,
    badge: '12',
    children: [
      { name: 'Customers CRM', href: '/sales/customers' },
      { name: 'Quotations', href: '/sales/quotations' },
      { name: 'Sales Orders', href: '/sales/orders' },
      { name: 'Sales Invoices', href: '/sales/invoices' },
      { name: 'Returns & RMA', href: '/sales/returns' },
    ],
  },
  {
    name: 'Purchase',
    icon: ShoppingBag,
    badge: '4',
    children: [
      { name: 'Vendors Master', href: '/purchase/vendors' },
      { name: 'Requisitions (PR)', href: '/purchase/requisitions' },
      { name: 'Purchase Orders', href: '/purchase/orders' },
      { name: 'Goods Receipt (GRN)', href: '/purchase/grn' },
      { name: 'Vendor Bills (3-Way)', href: '/purchase/bills' },
    ],
  },
  {
    name: 'Inventory',
    icon: Package,
    badge: '8',
    children: [
      { name: 'Item Master (SKUs)', href: '/inventory/items' },
      { name: 'Warehouses & Bins', href: '/inventory/warehouses' },
      { name: 'Stock Transfers', href: '/inventory/transfers' },
      { name: 'Stock Adjustments', href: '/inventory/adjustments' },
      { name: 'Stock Movement Ledger', href: '/inventory/ledger' },
    ],
  },
  {
    name: 'Finance & Accounting',
    icon: Layers,
    children: [
      { name: 'Chart of Accounts', href: '/finance/chart-of-accounts' },
      { name: 'General Ledger Entries', href: '/finance/journal-entries' },
      { name: 'Accounts Receivable', href: '/finance/receivables' },
      { name: 'Accounts Payable', href: '/finance/payables' },
      { name: 'Financial Statements', href: '/finance/reports' },
    ],
  },
  {
    name: 'Admin & Security',
    icon: ShieldCheck,
    children: [
      { name: 'User Management', href: '/admin/users' },
      { name: 'Roles & RBAC', href: '/admin/roles' },
      { name: 'Companies & Branches', href: '/admin/companies' },
      { name: 'Number Sequences', href: '/admin/sequences' },
      { name: 'Real-time Audit Logs', href: '/admin/audit-logs' },
    ],
  },
];

export const AppSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
            Apex ERP <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/20 text-blue-400 font-mono rounded">v1.0</span>
          </div>
          <div className="text-[11px] text-slate-400">Enterprise Edition</div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Modules
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.children && (
                    <div className="ml-7 space-y-0.5 pl-2 border-l border-slate-800">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-slate-800/50 rounded transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Tenant Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-medium text-xs text-slate-300">
            SA
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-medium text-slate-200 truncate">Salman Ashraf</div>
            <div className="text-[10px] text-slate-400 truncate">Super Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
