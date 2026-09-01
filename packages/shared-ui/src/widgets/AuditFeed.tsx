import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';
import { cn } from '../formatters';

export interface AuditItem {
  id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'POST' | 'CONFIRM' | 'APPROVE' | 'CANCEL';
  resource: string;
  actor: string;
  time: string;
  detail: string;
}

export interface AuditFeedProps {
  items: AuditItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const actionColorMap: Record<string, string> = {
  POST: 'bg-teal-950/80 text-teal-300 border-teal-700/50',
  CONFIRM: 'bg-blue-950/80 text-blue-300 border-blue-700/50',
  APPROVE: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50',
  CREATE: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/50',
  UPDATE: 'bg-amber-950/80 text-amber-300 border-amber-700/50',
  DELETE: 'bg-rose-950/80 text-rose-300 border-rose-700/50',
  CANCEL: 'bg-rose-950/80 text-rose-300 border-rose-700/50',
};

export const AuditFeed: React.FC<AuditFeedProps> = ({
  items,
  title = 'Real-time Immutable Audit Trail',
  subtitle = 'JSON diff snapshots recorded with actor IDs and timestamps',
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            {title}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          Live Stream
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const badgeClass = actionColorMap[item.action] || 'bg-slate-800 text-slate-300 border-slate-700';
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:bg-slate-800/30 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 truncate mr-3">
                <span className={cn('font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0', badgeClass)}>
                  {item.action}
                </span>
                <span className="font-mono text-slate-300 shrink-0">{item.resource}</span>
                <span className="text-slate-500">&mdash;</span>
                <span className="text-slate-300 text-[11px] truncate">{item.detail}</span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 shrink-0">
                <span className="text-slate-300 font-medium">{item.actor}</span>
                <span className="font-mono text-slate-500">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
