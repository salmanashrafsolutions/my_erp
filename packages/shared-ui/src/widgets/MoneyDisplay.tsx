import React from 'react';
import { formatMoney, cn } from '../formatters';

export interface MoneyDisplayProps {
  amount: number | string | null | undefined;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  trend?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const MoneyDisplay: React.FC<MoneyDisplayProps> = ({
  amount,
  currency = 'USD',
  size = 'md',
  trend = 'neutral',
  className,
}) => {
  const formatted = formatMoney(amount, currency);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-xl font-bold',
  };

  const trendClasses = {
    positive: 'text-emerald-400',
    negative: 'text-rose-400',
    neutral: 'text-slate-100',
  };

  return (
    <span
      className={cn(
        'font-mono tabular-nums tracking-tight inline-block',
        sizeClasses[size],
        trendClasses[trend],
        className
      )}
    >
      {formatted}
    </span>
  );
};
