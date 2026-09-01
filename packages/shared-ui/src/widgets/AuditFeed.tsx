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

const actionColorMap: Record<string, { bg: string; text: string; border: string }> = {
  POST: { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf', border: 'rgba(20, 184, 166, 0.3)' },
  CONFIRM: { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.3)' },
  APPROVE: { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
  CREATE: { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.3)' },
  UPDATE: { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
  DELETE: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)' },
  CANCEL: { bg: 'rgba(244, 63, 94, 0.15)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.3)' },
};

export const AuditFeed: React.FC<AuditFeedProps> = ({
  items,
  title = 'Real-time Immutable Audit Trail',
  subtitle = 'JSON diff snapshots recorded with actor IDs and timestamps',
  className,
}) => {
  return (
    <div
      className={cn('border rounded-xl p-5 shadow-sm space-y-4 transition-all', className)}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div
        className="flex items-center justify-between border-b pb-3"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div>
          <h3
            className="text-sm font-semibold flex items-center gap-2"
            style={{ color: 'var(--text-main)' }}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            {title}
          </h3>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <Clock className="w-3.5 h-3.5 opacity-60" />
          Live Stream
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const badge = actionColorMap[item.action] || {
            bg: 'var(--bg-subtle)',
            text: 'var(--text-main)',
            border: 'var(--border-color)',
          };
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                borderColor: 'var(--border-color)',
              }}
            >
              <div className="flex items-center gap-2.5 truncate mr-3">
                <span
                  className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0"
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.text,
                    borderColor: badge.border,
                  }}
                >
                  {item.action}
                </span>
                <span className="font-mono font-medium shrink-0" style={{ color: 'var(--text-main)' }}>
                  {item.resource}
                </span>
                <span style={{ color: 'var(--text-dim)' }}>&mdash;</span>
                <span className="text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
                  {item.detail}
                </span>
              </div>

              <div
                className="flex items-center gap-3 text-[11px] shrink-0"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="font-medium" style={{ color: 'var(--text-main)' }}>
                  {item.actor}
                </span>
                <span className="font-mono opacity-70">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
