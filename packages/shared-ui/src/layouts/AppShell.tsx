'use client';

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
import { ThemeSelector } from '../widgets/ThemeSelector';

export interface NavItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
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
      { name: 'Overview', href: '/sales' },
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
      { name: 'Overview', href: '/purchase' },
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
      { name: 'Overview', href: '/inventory' },
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
      { name: 'Overview', href: '/finance' },
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
      { name: 'Overview', href: '/admin' },
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
    <div
      className="flex min-h-screen w-full transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)' }}
    >
      {/* 1. Sidebar */}
      <aside
        className="w-64 flex flex-col shrink-0 border-r min-h-screen"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div
          className="h-16 flex items-center px-6 border-b gap-3"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-md"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
              Apex ERP{' '}
              <span
                className="text-[10px] px-1.5 py-0.2 font-mono rounded"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                }}
              >
                v1.0
              </span>
            </div>
            <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              Enterprise Edition
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            <div
              className="px-3 text-[11px] font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-dim)' }}
            >
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
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors group hover:opacity-90"
                        style={{
                          color: 'var(--text-main)',
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ) : (
                      <div
                        className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer group"
                        style={{ color: 'var(--text-main)' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 opacity-75 group-hover:opacity-100" />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                            style={{
                              backgroundColor: 'var(--badge-bg)',
                              color: 'var(--badge-text)',
                              borderColor: 'var(--border-color)',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                    {item.children && (
                      <div
                        className="ml-7 space-y-0.5 pl-2 border-l"
                        style={{ borderColor: 'var(--border-color)' }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-2.5 py-1.5 text-[11px] rounded transition-colors hover:opacity-100"
                            style={{ color: 'var(--text-muted)' }}
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

        <div
          className="p-4 border-t"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              {userName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium truncate">{userName}</div>
              <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                {userRole}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 border-b px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-3 w-96">
            <div className="relative w-full">
              <Search
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search orders, items, accounts, invoices... (Press '/' to focus)"
                className="w-full border rounded-lg pl-9 pr-4 py-1.5 text-xs focus:outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* 4-Theme Selector */}
            <ThemeSelector />

            {/* Branch Switcher */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-medium cursor-pointer transition-colors shadow-xs"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              <Building className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
              <span>{activeBranch}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </div>

            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg border transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-muted)',
              }}
            >
              <Bell className="w-4 h-4" />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full ring-2"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  borderColor: 'var(--bg-surface)',
                }}
              />
            </button>

            {/* Live Status Pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11px] font-mono shadow-xs"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-color)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--accent-primary)' }}
              />
              Database Live
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 space-y-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
