import React from 'react';
import { cn } from '../formatters';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const variantMap: Record<string, { bg: string; text: string; dot: string }> = {
  // Success
  APPROVED: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', dot: '#10b981' },
  CONFIRMED: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', dot: '#10b981' },
  DELIVERED: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', dot: '#10b981' },
  PAID: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', dot: '#10b981' },
  ACCEPTED: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', dot: '#10b981' },

  // Warning / In-Progress
  PENDING_APPROVAL: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', dot: '#f59e0b' },
  PENDING_INSPECTION: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', dot: '#f59e0b' },
  IN_PROGRESS: { bg: 'rgba(14, 165, 233, 0.15)', text: '#38bdf8', dot: '#0ea5e9' },
  PARTIAL: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', dot: '#f59e0b' },

  // Info
  SHIPPED: { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', dot: '#6366f1' },
  POSTED: { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf', dot: '#14b8a6' },

  // Danger
  CANCELLED: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', dot: '#f43f5e' },
  VOID: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', dot: '#f43f5e' },
  OVERDUE: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', dot: '#f43f5e' },
  REJECTED: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', dot: '#f43f5e' },
};

export interface StatusBadgeProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'sm' }) => {
  const conf = variantMap[status] || {
    bg: 'var(--bg-subtle)',
    text: 'var(--text-muted)',
    dot: 'var(--text-dim)',
  };
  const text = label || status.replace(/_/g, ' ');

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono font-medium rounded-md border tracking-wider uppercase whitespace-nowrap transition-transform hover:scale-105',
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      )}
      style={{
        backgroundColor: conf.bg,
        color: conf.text,
        borderColor: 'var(--border-color)',
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 animate-pulse"
        style={{ backgroundColor: conf.dot }}
      />
      {text}
    </span>
  );
};
