import React from 'react';
import { QuotationSummary } from '../types/quotation';
import { formatCurrency, numberToWords } from '../utils/calculations';
import { Calculator, Percent, Truck, Wrench } from 'lucide-react';

interface CommercialSummaryProps {
  summary: QuotationSummary;
  onSummaryChange: (updated: Partial<QuotationSummary>) => void;
}

export const CommercialSummary: React.FC<CommercialSummaryProps> = ({
  summary,
  onSummaryChange,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-3.5 sm:p-5 mb-6 sm:mb-8">
      {/* Header with totals */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center space-x-2">
          <Calculator className="w-4 h-4 text-brand-600 shrink-0" />
          <h3 className="font-semibold text-xs sm:text-sm text-slate-800">
            Quotation Breakdown & Total
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500">
          <div>
            Total Items: <strong className="text-slate-800">{summary.totalQuantity} Units</strong>
          </div>
          <div>
            Total Area: <strong className="text-slate-800">{summary.totalSqFt.toFixed(1)} Sq.Ft</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-start">
        {/* Left Column: Commercial Adjustments (Discounts, Installation, Freight) */}
        <div className="space-y-3 bg-slate-50/70 p-3 sm:p-4 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1 font-mono">
            Optional Quotation Add-ons
          </span>

          {/* Discount Percentage */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <label className="text-xs text-slate-600 flex items-center space-x-1.5">
              <Percent className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Special Discount (%)</span>
            </label>
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={summary.discountPercentage || ''}
                onChange={(e) =>
                  onSummaryChange({ discountPercentage: Number(e.target.value) || 0 })
                }
                className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-mono text-right"
                placeholder="0"
              />
              <span className="text-xs font-mono text-emerald-700 min-w-[4.5rem] text-right shrink-0">
                -{formatCurrency(summary.discountAmount)}
              </span>
            </div>
          </div>

          {/* Installation & Hardware Charges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <label className="text-xs text-slate-600 flex items-center space-x-1.5">
              <Wrench className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Installation & Fitting (₹)</span>
            </label>
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              <input
                type="number"
                min="0"
                step="500"
                value={summary.installationCharge || ''}
                onChange={(e) =>
                  onSummaryChange({ installationCharge: Number(e.target.value) || 0 })
                }
                className="w-24 sm:w-28 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-mono text-right"
                placeholder="0"
              />
              <span className="text-xs font-mono text-slate-600 min-w-[4.5rem] text-right shrink-0">
                {formatCurrency(summary.installationCharge)}
              </span>
            </div>
          </div>

          {/* Transportation / Freight */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2">
            <label className="text-xs text-slate-600 flex items-center space-x-1.5">
              <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Freight & Transportation (₹)</span>
            </label>
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              <input
                type="number"
                min="0"
                step="500"
                value={summary.transportationCharge || ''}
                onChange={(e) =>
                  onSummaryChange({ transportationCharge: Number(e.target.value) || 0 })
                }
                className="w-24 sm:w-28 bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 font-mono text-right"
                placeholder="0"
              />
              <span className="text-xs font-mono text-slate-600 min-w-[4.5rem] text-right shrink-0">
                {formatCurrency(summary.transportationCharge)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Statement Totals */}
        <div className="border border-slate-200 rounded-lg p-3.5 sm:p-5 bg-white space-y-3">
          <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-slate-100">
            <span>Material & Fabrication Subtotal:</span>
            <span className="font-mono font-medium text-slate-900 text-sm">
              {formatCurrency(summary.subtotal)}
            </span>
          </div>

          {summary.discountAmount > 0 && (
            <div className="flex justify-between items-center text-xs text-emerald-700 pb-2 border-b border-slate-100">
              <span>Discount ({summary.discountPercentage}%):</span>
              <span className="font-mono font-medium">-{formatCurrency(summary.discountAmount)}</span>
            </div>
          )}

          {summary.installationCharge > 0 && (
            <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-slate-100">
              <span>Installation & Site Fitting:</span>
              <span className="font-mono font-medium text-slate-800">
                +{formatCurrency(summary.installationCharge)}
              </span>
            </div>
          )}

          {summary.transportationCharge > 0 && (
            <div className="flex justify-between items-center text-xs text-slate-600 pb-2 border-b border-slate-100">
              <span>Freight & Transportation:</span>
              <span className="font-mono font-medium text-slate-800">
                +{formatCurrency(summary.transportationCharge)}
              </span>
            </div>
          )}

          {/* Grand Total Row */}
          <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-baseline gap-2">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-900 block">
                Grand Total
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                (Net Quotation Amount)
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono font-black text-lg sm:text-2xl text-slate-900">
                {formatCurrency(summary.grandTotal)}
              </span>
            </div>
          </div>

          {/* In Words */}
          <div className="pt-2 text-[11px] text-slate-600 bg-slate-50 p-2 sm:p-2.5 rounded border border-slate-200">
            <span className="font-semibold text-slate-700">Amount in Words: </span>
            <span className="italic">{numberToWords(summary.grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
