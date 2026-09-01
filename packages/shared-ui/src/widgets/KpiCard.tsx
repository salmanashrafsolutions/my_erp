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
        'bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/50">
              {badge}
            </span>
          )}
          <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
            <Icon className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="text-2xl font-bold font-mono text-white tracking-tight">
        {value}
      </div>

      {(subtitle || change) && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 truncate">{subtitle}</span>
          {change && (
            <span
              className={cn(
                'flex items-center font-mono text-[11px] font-medium shrink-0 ml-2',
                trend === 'up' && 'text-emerald-400',
                trend === 'down' && 'text-rose-400',
                trend === 'neutral' && 'text-blue-400'
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
