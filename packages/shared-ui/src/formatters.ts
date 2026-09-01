import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatMoney(
  amount: number | string | null | undefined,
  currency = 'USD',
  locale = 'en-US'
): string {
  const num = Number(amount) || 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatQuantity(
  qty: number | string | null | undefined,
  uom?: string,
  locale = 'en-US'
): string {
  const num = Number(qty) || 0;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 4,
  }).format(num);
  return uom ? `${formatted} ${uom}` : formatted;
}

export function formatDate(
  date: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' },
  locale = 'en-US'
): string {
  if (!date) return '-';
  const d = typeof date === 'string' ? new Date(date) : date;
  return isNaN(d.getTime()) ? '-' : new Intl.DateTimeFormat(locale, options).format(d);
}

export function formatPercentage(rate: number | string | null | undefined): string {
  const num = (Number(rate) || 0) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
