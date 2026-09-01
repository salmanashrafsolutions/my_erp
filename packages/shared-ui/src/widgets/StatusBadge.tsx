import React from 'react';
import { cn } from '../formatters';

export type BadgeStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'POSTED'
  | 'PAID'
  | 'PARTIAL'
  | 'CANCELLED'
  | 'VOID'
  | 'OVERDUE'
  | 'REJECTED'
  | 'PENDING_INSPECTION'
  | 'ACCEPTED';

export interface StatusBadgeProps {
  status: BadgeStatus | string;
  label?: string;
  size?: 'sm' | 'md';
}

const statusColorMap: Record<string, string> = {
  DRAFT: 'bg-slate-800 text-slate-300 border-slate-700',
  PENDING_APPROVAL: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
  PENDING_INSPECTION: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
  APPROVED: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  CONFIRMED: 'bg-blue-950/60 text-blue-300 border-blue-800/60',
  IN_PROGRESS: 'bg-sky-950/60 text-sky-300 border-sky-800/60',
  SHIPPED: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/60',
  DELIVERED: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  POSTED: 'bg-teal-950/60 text-teal-300 border-teal-800/60',
  PAID: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
  PARTIAL: 'bg-amber-950/60 text-amber-300 border-amber-800/60',
  CANCELLED: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
  VOID: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  OVERDUE: 'bg-rose-950/60 text-rose-300 border-rose-800/60',
  REJECTED: 'bg-red-950/60 text-red-300 border-red-800/60',
  ACCEPTED: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'sm' }) => {
  const colorClass = statusColorMap[status] || 'bg-slate-800 text-slate-300 border-slate-700';
  const text = label || status.replace(/_/g, ' ');

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-medium rounded-md border tracking-wider uppercase whitespace-nowrap',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
        colorClass
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {text}
    </span>
  );
};
