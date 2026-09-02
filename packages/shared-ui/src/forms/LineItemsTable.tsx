'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { formatMoney, cn } from '../formatters';

export interface LineItem {
  id: string;
  itemId: string;
  itemSku: string;
  itemName: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxRate: number; // e.g. 15 for 15%
  taxAmount: number;
  lineTotal: number;
  availableStock?: number;
}

export interface LineItemsTableProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  currency?: string;
  readOnly?: boolean;
  availableProducts?: { id: string; sku: string; name: string; price: number; stock?: number }[];
  className?: string;
}

const sampleProducts = [
  { id: '1', sku: 'SKU-MICRO-01', name: 'Microcontroller Core ARM v8', price: 45.0, stock: 1300 },
  { id: '2', sku: 'SKU-SENS-04', name: 'Optoelectronic LiDAR Sensor', price: 120.0, stock: 340 },
  { id: '3', sku: 'SKU-POW-12', name: 'Lithium Battery Pack 48V', price: 340.0, stock: 25 },
  { id: '4', sku: 'SKU-CAS-09', name: 'Anodized Aluminum Enclosure', price: 18.5, stock: 2650 },
];

export const LineItemsTable: React.FC<LineItemsTableProps> = ({
  items,
  onChange,
  currency = 'USD',
  readOnly = false,
  availableProducts = sampleProducts,
  className,
}) => {
  const calculateRow = (item: Partial<LineItem>): LineItem => {
    const qty = Math.max(0, Number(item.quantity) || 0);
    const price = Math.max(0, Number(item.unitPrice) || 0);
    const discount = Math.max(0, Number(item.discountAmount) || 0);
    const taxRate = Math.max(0, Number(item.taxRate) || 0);

    const netAmount = Math.max(0, qty * price - discount);
    const taxAmount = (netAmount * taxRate) / 100;
    const lineTotal = netAmount + taxAmount;

    return {
      id: item.id || `line-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      itemId: item.itemId || '',
      itemSku: item.itemSku || '',
      itemName: item.itemName || '',
      description: item.description || '',
      quantity: qty,
      unitPrice: price,
      discountAmount: discount,
      taxRate: taxRate,
      taxAmount: taxAmount,
      lineTotal: lineTotal,
      availableStock: item.availableStock,
    };
  };

  const handleProductSelect = (index: number, productId: string) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (!product) return;

    const newItems = [...items];
    newItems[index] = calculateRow({
      ...newItems[index],
      itemId: product.id,
      itemSku: product.sku,
      itemName: product.name,
      unitPrice: product.price,
      availableStock: product.stock,
      quantity: newItems[index]?.quantity || 1,
    });
    onChange(newItems);
  };

  const handleFieldChange = (index: number, field: keyof LineItem, val: string | number) => {
    const newItems = [...items];
    newItems[index] = calculateRow({
      ...newItems[index],
      [field]: val,
    });
    onChange(newItems);
  };

  const addRow = () => {
    const firstProd = availableProducts[0];
    const newRow = calculateRow({
      itemId: firstProd?.id || '',
      itemSku: firstProd?.sku || '',
      itemName: firstProd?.name || '',
      unitPrice: firstProd?.price || 0,
      availableStock: firstProd?.stock || 0,
      quantity: 1,
      taxRate: 15,
      discountAmount: 0,
    });
    onChange([...items, newRow]);
  };

  const removeRow = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  // Grand Totals Calculation
  const subtotal = items.reduce((sum, item) => sum + Math.max(0, item.quantity * item.unitPrice - item.discountAmount), 0);
  const totalTax = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discountAmount, 0);
  const grandTotal = subtotal + totalTax;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Table Container */}
      <div
        className="border rounded-xl overflow-hidden shadow-xs"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-color)',
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr
                className="border-b font-mono uppercase text-[10px] tracking-wider"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-muted)',
                }}
              >
                <th className="py-2.5 px-3 min-w-[180px]">Item / SKU</th>
                <th className="py-2.5 px-3 min-w-[70px] text-right">Qty</th>
                <th className="py-2.5 px-3 min-w-[90px] text-right">Unit Price</th>
                <th className="py-2.5 px-3 min-w-[80px] text-right">Discount</th>
                <th className="py-2.5 px-3 min-w-[70px] text-right">Tax (%)</th>
                <th className="py-2.5 px-3 min-w-[100px] text-right">Line Total</th>
                {!readOnly && <th className="py-2.5 px-3 w-10 text-center"></th>}
              </tr>
            </thead>
            <tbody className="divide-y font-mono" style={{ borderColor: 'var(--border-color)' }}>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={readOnly ? 6 : 7}
                    className="py-8 text-center"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    No line items added yet. Click &quot;+ Add Line Item&quot; below.
                  </td>
                </tr>
              ) : (
                items.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-800/10 transition-colors">
                    {/* Item Select */}
                    <td className="py-2 px-3">
                      {readOnly ? (
                        <div>
                          <div className="font-semibold">{item.itemSku}</div>
                          <div className="text-[11px] font-sans" style={{ color: 'var(--text-muted)' }}>
                            {item.itemName}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <select
                            value={item.itemId}
                            onChange={(e) => handleProductSelect(index, e.target.value)}
                            className="w-full border rounded-md px-2 py-1 text-xs focus:outline-none"
                            style={{
                              backgroundColor: 'var(--bg-subtle)',
                              borderColor: 'var(--border-color)',
                              color: 'var(--text-main)',
                            }}
                          >
                            {availableProducts.map((p) => (
                              <option key={p.id} value={p.id}>
                                {p.sku} — {p.name}
                              </option>
                            ))}
                          </select>
                          {item.availableStock !== undefined && (
                            <div className="text-[10px] font-sans" style={{ color: 'var(--text-muted)' }}>
                              Available Stock:{' '}
                              <span
                                className="font-mono font-semibold"
                                style={{
                                  color: item.availableStock > 10 ? 'var(--accent-primary)' : '#f43f5e',
                                }}
                              >
                                {item.availableStock} Units
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Quantity */}
                    <td className="py-2 px-3 text-right">
                      {readOnly ? (
                        <span>{item.quantity}</span>
                      ) : (
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => handleFieldChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                          className="w-16 text-right border rounded-md px-2 py-1 text-xs focus:outline-none"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-main)',
                          }}
                        />
                      )}
                    </td>

                    {/* Unit Price */}
                    <td className="py-2 px-3 text-right">
                      {readOnly ? (
                        formatMoney(item.unitPrice, currency)
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleFieldChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-20 text-right border rounded-md px-2 py-1 text-xs focus:outline-none"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-main)',
                          }}
                        />
                      )}
                    </td>

                    {/* Discount */}
                    <td className="py-2 px-3 text-right">
                      {readOnly ? (
                        formatMoney(item.discountAmount, currency)
                      ) : (
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.discountAmount}
                          onChange={(e) => handleFieldChange(index, 'discountAmount', parseFloat(e.target.value) || 0)}
                          className="w-16 text-right border rounded-md px-2 py-1 text-xs focus:outline-none"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-main)',
                          }}
                        />
                      )}
                    </td>

                    {/* Tax Rate % */}
                    <td className="py-2 px-3 text-right">
                      {readOnly ? (
                        `${item.taxRate}%`
                      ) : (
                        <select
                          value={item.taxRate}
                          onChange={(e) => handleFieldChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                          className="border rounded-md px-1.5 py-1 text-xs focus:outline-none"
                          style={{
                            backgroundColor: 'var(--bg-subtle)',
                            borderColor: 'var(--border-color)',
                            color: 'var(--text-main)',
                          }}
                        >
                          <option value={0}>0%</option>
                          <option value={5}>5%</option>
                          <option value={10}>10%</option>
                          <option value={15}>15%</option>
                          <option value={18}>18%</option>
                        </select>
                      )}
                    </td>

                    {/* Line Total */}
                    <td className="py-2 px-3 text-right font-bold" style={{ color: 'var(--text-main)' }}>
                      {formatMoney(item.lineTotal, currency)}
                    </td>

                    {/* Delete Action */}
                    {!readOnly && (
                      <td className="py-2 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => removeRow(index)}
                          className="p-1 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Add Row Bar */}
        {!readOnly && (
          <div
            className="p-2.5 border-t flex items-center justify-between"
            style={{
              backgroundColor: 'var(--bg-subtle)',
              borderColor: 'var(--border-color)',
            }}
          >
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-color)',
                color: 'var(--accent-primary)',
              }}
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
              {items.length} {items.length === 1 ? 'Item' : 'Items'} Added
            </span>
          </div>
        )}
      </div>

      {/* Financial Summary Box */}
      <div className="flex justify-end">
        <div
          className="w-72 border rounded-xl p-4 space-y-2 text-xs font-mono shadow-xs"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
            <span>Net Subtotal:</span>
            <span>{formatMoney(subtotal, currency)}</span>
          </div>

          {totalDiscount > 0 && (
            <div className="flex justify-between text-rose-400">
              <span>Total Discount:</span>
              <span>-{formatMoney(totalDiscount, currency)}</span>
            </div>
          )}

          <div className="flex justify-between" style={{ color: 'var(--text-muted)' }}>
            <span>Calculated Tax:</span>
            <span>+{formatMoney(totalTax, currency)}</span>
          </div>

          <div
            className="pt-2 border-t flex justify-between font-bold text-sm"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-main)',
            }}
          >
            <span>Grand Total:</span>
            <span style={{ color: 'var(--accent-primary)' }}>{formatMoney(grandTotal, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
