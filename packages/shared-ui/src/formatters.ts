import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats monetary amounts with strict tabular numerals formatting.
 * Handles Decimal, numbers, or string numeric values safely.
 */
export function formatMoney(
  amount: number | string | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  if (amount === null || amount === undefined || isNaN(Number(amount))) {
    return '$0.00';
  }

  const num = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Formats inventory quantities with UOM suffix and clean decimals.
 */
export function formatQuantity(
  qty: number | string | null | undefined,
  uom?: string
): string {
  if (qty === null || qty === undefined || isNaN(Number(qty))) {
    return uom ? `0 ${uom}` : '0';
  }

  const num = typeof qty === 'string' ? parseFloat(qty) : qty;
  // If integer, display without trailing decimals; if fractional, show up to 4 decimal places
  const formatted = num % 1 === 0 ? num.toLocaleString() : num.toFixed(4).replace(/\.?0+$/, '');

  return uom ? `${formatted} ${uom}` : formatted;
}

/**
 * Formats date values into standardized display strings (e.g. Sep 01, 2026).
 */
export function formatDate(
  date: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  },
  locale: string = 'en-US'
): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat(locale, options).format(d);
}

/**
 * Formats percentage rates (e.g. 15 -> 15.00%).
 */
export function formatPercentage(rate: number | string | null | undefined): string {
  if (rate === null || rate === undefined || isNaN(Number(rate))) {
    return '0.00%';
  }
  const num = typeof rate === 'string' ? parseFloat(rate) : rate;
  return `${num.toFixed(2)}%`;
}
