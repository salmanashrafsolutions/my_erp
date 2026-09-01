'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Layers,
  ShieldCheck,
  Building2,
  ExternalLink,
  Sparkles,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { ThemeSelector } from '@erp/shared-ui';

interface ModuleCard {
  id: string;
  name: string;
  code: string;
  href: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  description: string;
  features: string[];
  badge: string;
  color: string;
}

const modules: ModuleCard[] = [
  {
    id: 'sales',
    name: 'Sales Management',
    code: 'MOD-01',
    href: '/sales',
    icon: TrendingUp,
    description:
      'Customer CRM, Price Lists, Quotation Engine, Sales Orders with automated stock reservation, and Invoicing.',
    features: [
      'Customer Directory & Credit Limit Enforcement',
      'Quotation to Order Conversion Workflow',
      'Fulfillment & Dispatch Pipeline',
      'Sales Invoicing & AR Integration',
    ],
    badge: 'Core Pillar',
    color: '#3b82f6',
  },
  {
    id: 'purchase',
    name: 'Purchase & Procurement',
    code: 'MOD-02',
    href: '/purchase',
    icon: ShoppingBag,
    description:
      'Vendor management, Purchase Requisitions (PR), Purchase Orders (PO), GRN Gate-In, and automated 3-Way Matching.',
    features: [
      'Supplier Master & Payment Terms Matrix',
      'Requisition Approval Workflows',
      'Goods Receipt Note (GRN) Quality Inspection',
      'Strict 3-Way Matching Engine (PO ↔ GRN ↔ Bill)',
    ],
    badge: 'Procure-to-Pay',
    color: '#f59e0b',
  },
  {
    id: 'inventory',
    name: 'Inventory & Warehouse',
    code: 'MOD-03',
    href: '/inventory',
    icon: Package,
    description:
      'Multi-Warehouse location hierarchy (Zone/Aisle/Bin), Moving WAC & FIFO valuation, and immutable stock ledger.',
    features: [
      'SKU Master & Barcode/QR Code Tracking',
      'Multi-Location Real-time Balance Matrix',
      'Moving Weighted Average Costing (WAC)',
      'Immutable Stock Movement Ledger',
    ],
    badge: 'Stock Operations',
    color: '#10b981',
  },
  {
    id: 'finance',
    name: 'Finance & Accounting',
    code: 'MOD-04',
    href: '/finance',
    icon: Layers,
    description:
      'Multi-level Chart of Accounts (COA), Immutable Double-Entry General Ledger, AR/AP Aging subledgers, and P&L.',
    features: [
      '5-Class Chart of Accounts Hierarchy',
      'Immutable Double-Entry Posting (Σ Debit ≡ Σ Credit)',
      'Subledger Accounts Receivable (AR) & Payable (AP)',
      'Real-time Balance Sheet & Trial Balance',
    ],
    badge: 'General Ledger',
    color: '#8b5cf6',
  },
  {
    id: 'admin',
    name: 'Admin & Governance',
    code: 'MOD-05',
    href: '/admin',
    icon: ShieldCheck,
    description:
      'Multi-tenancy companies/branches, granular RBAC permission matrix, custom document number sequences, and audit logs.',
    features: [
      'Tenant Company & Operating Branch Management',
      'Granular RBAC Security Matrix (Module:Resource:Action)',
      'Distributed Document Number Sequence Generator',
      'Real-time Mutation Audit Trail (JSON Diffs)',
    ],
    badge: 'Governance & Security',
    color: '#06b6d4',
  },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen w-full flex flex-col transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-canvas)', color: 'var(--text-main)' }}
    >
      {/* 1. Global Navigation Bar */}
      <header
        className="h-20 border-b px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="flex items-center gap-3.5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg animate-pulse-glow"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight flex items-center gap-2">
              Apex Enterprise ERP
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-mono border"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  borderColor: 'var(--border-color)',
                }}
              >
                Modular Monolith v1.0
              </span>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Decoupled Architecture &bull; PostgreSQL 16 &bull; Next.js 15
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeSelector />

          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 border rounded-lg text-xs font-mono"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-muted)',
            }}
          >
            <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
            <span>Super Admin Engine: 100% Configurable</span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 space-y-12 animate-fade-in-up">
        {/* Welcome Banner */}
        <div
          className="rounded-2xl border p-8 md:p-12 relative overflow-hidden shadow-xl"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          {/* Subtle Background Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-color)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Unified Enterprise Control Hub
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Welcome to <span style={{ color: 'var(--accent-primary)' }}>Apex ERP</span>
            </h1>

            <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              A high-performance, modular enterprise resource planning platform built with zero bloat.
              Select any core domain below to launch its dedicated module workspace in a new tab.
              Every feature, document sequence, and permission is 100% customizable by the Super Administrator.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Financial Immutability
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Stock Reservation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 3-Way Match Verification
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 4 Dynamic System Themes
              </span>
            </div>
          </div>
        </div>

        {/* 3. Core Modules Launch Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Core Enterprise Modules</h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Click any module card to open its dedicated dashboard in a new tab.
              </p>
            </div>
            <span
              className="text-xs font-mono px-3 py-1 rounded-md border"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-muted)',
              }}
            >
              5 Active Domains
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.id}
                  href={mod.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-color)',
                  }}
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between">
                      <div
                        className="p-3 rounded-xl border transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          borderColor: 'var(--border-color)',
                          color: mod.color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-muted)',
                          }}
                        >
                          {mod.code}
                        </span>
                        <span
                          className="text-[10px] font-mono px-2 py-0.5 rounded border font-semibold"
                          style={{
                            backgroundColor: 'var(--badge-bg)',
                            color: 'var(--badge-text)',
                            borderColor: 'var(--border-color)',
                          }}
                        >
                          {mod.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3
                        className="text-lg font-bold tracking-tight transition-colors flex items-center justify-between"
                        style={{ color: 'var(--text-main)' }}
                      >
                        {mod.name}
                        <ExternalLink
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: 'var(--accent-primary)' }}
                        />
                      </h3>
                      <p
                        className="text-xs leading-relaxed mt-2"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {mod.description}
                      </p>
                    </div>

                    {/* Key Capabilities List */}
                    <div
                      className="pt-3 border-t space-y-1.5"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      {mod.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-[11px]"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: mod.color }}
                          />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open in New Tab CTA */}
                  <div
                    className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold"
                    style={{
                      borderColor: 'var(--border-color)',
                      color: 'var(--accent-primary)',
                    }}
                  >
                    <span>Launch Module Workspace</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 4. Super Admin Customization Guarantee */}
        <div
          className="rounded-xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold flex items-center gap-2 justify-center md:justify-start">
              <Sliders className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
              Super Admin Customization Engine
            </h4>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Every parameter in this system is configurable: toggle modules, adjust numbering schemas, manage tenant permissions, or change color themes globally.
            </p>
          </div>

          <Link
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shrink-0 shadow-md"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            Access Governance Console &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
