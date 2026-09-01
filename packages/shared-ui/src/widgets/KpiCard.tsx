import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../formatters';

export interface KpiCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  badge?: string;
  icon: LucideIcon;
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend = 'neutral',
  badge,
  icon: Icon,
  className,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl p-5 border flex flex-col justify-between transition-all shadow-sm hover:shadow-md',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span
              className="text-[10px] font-mono px-2 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-color)',
              }}
            >
              {badge}
            </span>
          )}
          <div
            className="p-2 rounded-lg border"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-color)',
              color: 'var(--accent-primary)',
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div
        className="text-2xl font-bold font-mono tracking-tight"
        style={{ color: 'var(--text-main)' }}
      >
        {value}
      </div>

      {(subtitle || change) && (
        <div
          className="flex items-center justify-between mt-3 pt-3 border-t text-xs"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <span className="truncate" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </span>
          {change && (
            <span
              className={cn(
                'flex items-center font-mono text-[11px] font-medium shrink-0 ml-2',
                trend === 'up' && 'text-emerald-500',
                trend === 'down' && 'text-rose-500',
                trend === 'neutral' && 'text-blue-500'
              )}
            >
              {trend === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
              {trend === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
