import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  actions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight flex items-center gap-2.5"
          style={{ color: 'var(--text-main)' }}
        >
          {title}
          {badge && (
            <span
              className="text-xs px-2.5 py-0.5 rounded-full border font-normal font-mono"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-color)',
              }}
            >
              {badge}
            </span>
          )}
        </h1>
        {subtitle && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};
