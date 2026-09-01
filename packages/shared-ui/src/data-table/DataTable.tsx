import React from 'react';
import { cn } from '../formatters';
import { LucideIcon } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  title?: string;
  subtitle?: string;
  icon?: LucideIcon;
  actionText?: string;
  onAction?: () => void;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  title,
  subtitle,
  icon: Icon,
  actionText,
  onAction,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No records found.',
  className,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        'border rounded-xl p-5 shadow-sm space-y-4 transition-all',
        className
      )}
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Header Bar */}
      {(title || actionText) && (
        <div
          className="flex items-center justify-between border-b pb-3"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div>
            {title && (
              <h3
                className="text-sm font-semibold flex items-center gap-2"
                style={{ color: 'var(--text-main)' }}
              >
                {Icon && (
                  <Icon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                )}
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {subtitle}
              </p>
            )}
          </div>
          {actionText && (
            <button
              onClick={onAction}
              className="text-xs font-medium transition-colors cursor-pointer hover:opacity-80"
              style={{ color: 'var(--accent-primary)' }}
            >
              {actionText} &rarr;
            </button>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr
              className="border-b font-medium uppercase text-[10px] tracking-wider"
              style={{
                borderColor: 'var(--border-color)',
                color: 'var(--text-muted)',
              }}
            >
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'py-2 px-3',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="divide-y font-mono"
            style={{ borderColor: 'var(--border-color)' }}
          >
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Loading data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center"
                  style={{ color: 'var(--text-dim)' }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    'transition-colors hover:opacity-95',
                    onRowClick && 'cursor-pointer'
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    borderBottomColor: 'var(--border-color)',
                  }}
                >
                  {columns.map((col) => {
                    const value = (item as Record<string, unknown>)[col.key];
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'py-2.5 px-3',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                          col.className
                        )}
                        style={{ color: 'var(--text-main)' }}
                      >
                        {col.render ? col.render(item) : String(value ?? '-')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
