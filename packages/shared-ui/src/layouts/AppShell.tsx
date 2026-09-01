'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  ShieldCheck,
  Building2,
  Building,
  Search,
  Menu,
  X,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import { ThemeSelector } from '../widgets/ThemeSelector';
import { cn } from '../formatters';

export interface ModuleNavConfig {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  subItems: { name: string; href: string }[];
}

const moduleConfigs: ModuleNavConfig[] = [
  {
    id: 'sales',
    name: 'Sales',
    href: '/sales',
    icon: TrendingUp,
    badge: '12',
    subItems: [
      { name: 'Overview', href: '/sales' },
      { name: 'Customers CRM', href: '/sales/customers' },
      { name: 'Quotations', href: '/sales/quotations' },
      { name: 'Sales Orders', href: '/sales/orders' },
      { name: 'Invoices & AR', href: '/sales/invoices' },
    ],
  },
  {
    id: 'purchase',
    name: 'Purchase',
    href: '/purchase',
    icon: ShoppingBag,
    badge: '4',
    subItems: [
      { name: 'Overview', href: '/purchase' },
      { name: 'Vendors Directory', href: '/purchase/vendors' },
      { name: 'Purchase Orders', href: '/purchase/orders' },
      { name: 'Goods Receipt (GRN)', href: '/purchase/grn' },
      { name: '3-Way Match Bills', href: '/purchase/bills' },
    ],
  },
  {
    id: 'inventory',
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    badge: '8',
    subItems: [
      { name: 'Overview', href: '/inventory' },
      { name: 'Item Master (SKUs)', href: '/inventory/items' },
      { name: 'Warehouses & Bins', href: '/inventory/warehouses' },
      { name: 'Stock Movements', href: '/inventory/ledger' },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    href: '/finance',
    icon: Layers,
    subItems: [
      { name: 'Overview', href: '/finance' },
      { name: 'Chart of Accounts', href: '/finance/chart-of-accounts' },
      { name: 'Journal Entries (GL)', href: '/finance/journal-entries' },
      { name: 'Receivables & Payables', href: '/finance/receivables' },
    ],
  },
  {
    id: 'admin',
    name: 'Admin',
    href: '/admin',
    icon: ShieldCheck,
    subItems: [
      { name: 'Overview', href: '/admin' },
      { name: 'User Management', href: '/admin/users' },
      { name: 'RBAC Roles', href: '/admin/roles' },
      { name: 'Number Sequences', href: '/admin/sequences' },
      { name: 'Audit Logs', href: '/admin/audit-logs' },
    ],
  },
];

export interface AppShellProps {
  children: React.ReactNode;
  activeModule?: 'sales' | 'purchase' | 'inventory' | 'finance' | 'admin';
  activeBranch?: string;
  userName?: string;
  userRole?: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  activeModule,
  activeBranch = 'HQ - Main Branch',
  userName = 'Salman Ashraf',
  userRole = 'Super Admin',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Determine current active module from prop or pathname
  const currentModuleId =
    activeModule ||
    (pathname.includes('/sales')
      ? 'sales'
      : pathname.includes('/purchase')
      ? 'purchase'
      : pathname.includes('/inventory')
      ? 'inventory'
      : pathname.includes('/finance')
      ? 'finance'
      : pathname.includes('/admin')
      ? 'admin'
      : 'sales');

  const currentModule = moduleConfigs.find((m) => m.id === currentModuleId) || moduleConfigs[0];

  return (
    <div
      className="flex min-h-screen w-full transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)' }}
    >
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* 1. Context-Aware Responsive Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r flex flex-col transition-transform duration-200 lg:static lg:translate-x-0',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Brand & Hub Link */}
        <div
          className="h-16 flex items-center justify-between px-5 border-b shrink-0"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs tracking-tight">Apex ERP</div>
              <div
                className="text-[10px] flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--accent-primary)' }}
              >
                <LayoutGrid className="w-2.5 h-2.5" /> Launchpad Hub
              </div>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md border lg:hidden"
            style={{ borderColor: 'var(--border-color)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Module Switcher Bar */}
        <div
          className="p-3 border-b shrink-0"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div
            className="text-[10px] font-mono uppercase tracking-wider mb-1.5 px-1"
            style={{ color: 'var(--text-dim)' }}
          >
            Active Module
          </div>
          <div className="grid grid-cols-5 gap-1">
            {moduleConfigs.map((mod) => {
              const Icon = mod.icon;
              const isActive = mod.id === currentModuleId;
              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  title={mod.name}
                  className={cn(
                    'flex flex-col items-center justify-center py-2 rounded-lg border text-[10px] transition-all',
                    isActive ? 'shadow-xs font-semibold' : 'opacity-60 hover:opacity-100'
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="mt-0.5 text-[9px] truncate max-w-full px-0.5">
                    {mod.name.slice(0, 3)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Current Module Sub-Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
          <div>
            <div
              className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 flex items-center justify-between"
              style={{ color: 'var(--text-muted)' }}
            >
              <span>{currentModule.name} Workspace</span>
              {currentModule.badge && (
                <span
                  className="text-[9px] px-1.5 py-0.2 rounded font-mono border"
                  style={{
                    backgroundColor: 'var(--badge-bg)',
                    color: 'var(--badge-text)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  {currentModule.badge}
                </span>
              )}
            </div>

            <nav className="space-y-1">
              {currentModule.subItems.map((sub) => {
                const isCurrent = pathname === sub.href;
                return (
                  <Link
                    key={sub.name}
                    href={sub.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border',
                      isCurrent
                        ? 'font-semibold shadow-xs'
                        : 'border-transparent hover:opacity-90'
                    )}
                    style={{
                      backgroundColor: isCurrent ? 'var(--bg-subtle)' : 'transparent',
                      borderColor: isCurrent ? 'var(--border-color)' : 'transparent',
                      color: isCurrent ? 'var(--accent-primary)' : 'var(--text-muted)',
                    }}
                  >
                    <span>{sub.name}</span>
                    {isCurrent && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: 'var(--accent-primary)' }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer User Profile */}
        <div
          className="p-3.5 border-t shrink-0 flex items-center justify-between text-xs"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                color: 'var(--accent-primary)',
              }}
            >
              {userName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="truncate">
              <div className="font-semibold text-xs truncate">{userName}</div>
              <div className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                {userRole}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Responsive Main Work Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header
          className="h-16 border-b px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md gap-3"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
          }}
        >
          {/* Mobile Menu Button + Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-lg border lg:hidden"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
              }}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="relative w-full">
              <Search
                className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search module... (Press '/' to focus)"
                className="w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-main)',
                }}
              />
            </div>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeSelector />

            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 border rounded-lg text-xs font-medium cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-main)',
              }}
            >
              <Building className="w-3 h-3" style={{ color: 'var(--accent-primary)' }} />
              <span className="truncate max-w-[110px]">{activeBranch}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
