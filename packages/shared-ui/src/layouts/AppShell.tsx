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
  Building,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

export interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: { name: string; href: string }[];
}

const defaultNavigation: NavItem[] = [
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

export interface AppShellProps {
  children: React.ReactNode;
  activeBranch?: string;
  userName?: string;
  userRole?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeBranch = 'NYC Headquarters (Main)',
  userName = 'Salman Ashraf',
  userRole = 'Super Administrator',
}) => {
  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100">
      {/* 1. Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shrink-0 border-r border-slate-800 min-h-screen">
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

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Modules
            </div>
            <nav className="space-y-1">
              {defaultNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="space-y-1">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ) : (
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
                    )}
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

        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-medium text-xs text-slate-300">
              {userName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-slate-200 truncate">{userName}</div>
              <div className="text-[10px] text-slate-400 truncate">{userRole}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3 w-96">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, items, accounts, invoices... (Press '/' to focus)"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-medium text-slate-200 cursor-pointer hover:bg-slate-700/60 transition-colors">
              <Building className="w-3.5 h-3.5 text-blue-500" />
              <span>{activeBranch}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>

            <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-slate-900" />
            </button>

            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-800/60 rounded-full text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Database Synced
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
