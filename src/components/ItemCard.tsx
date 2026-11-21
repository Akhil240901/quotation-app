import React, { useState } from 'react';
import {
  QuotationItem,
  MaterialType,
  WindowType,
  AluminiumWindowType,
  UPVCWindowType
} from '../types/quotation';
import {
  ALUMINIUM_WINDOW_TYPES,
  UPVC_WINDOW_TYPES,
  DEFAULT_RATES,
  GLASS_OPTIONS,
  FINISH_OPTIONS,
  MESH_OPTIONS
} from '../data/defaults';
import { calculateAreaInSqFt, calculateItemTotal, formatCurrency } from '../utils/calculations';
import { WindowSchematic } from './WindowSchematic';
import {
  Trash2,
  Copy,
  Sliders,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';

interface ItemCardProps {
  item: QuotationItem;
  index: number;
  divisionFactor: number;
  onUpdate: (updatedItem: QuotationItem) => void;
  onDuplicate: (item: QuotationItem) => void;
  onDelete: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  index,
  divisionFactor,
  onUpdate,
  onDuplicate,
  onDelete,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Available window types based on selected material
  const windowTypeOptions: WindowType[] =
    item.material === 'Aluminium' ? ALUMINIUM_WINDOW_TYPES : UPVC_WINDOW_TYPES;

  // Handle Material change with automatic cascading type & default rate
  const handleMaterialChange = (newMaterial: MaterialType) => {
    const newOptions = newMaterial === 'Aluminium' ? ALUMINIUM_WINDOW_TYPES : UPVC_WINDOW_TYPES;
    const newType = newOptions[0];
    const defaultRate = DEFAULT_RATES[`${newMaterial}:${newType}`] || item.ratePerSqFt;
    const newTotal = calculateItemTotal(item.areaSqFt, defaultRate, item.quantity);

    onUpdate({
      ...item,
      material: newMaterial,
      windowType: newType,
      ratePerSqFt: defaultRate,
      itemTotal: newTotal,
    });
  };

  // Handle Window Type change with auto rate suggestion
  const handleWindowTypeChange = (newType: WindowType) => {
    const defaultRate = DEFAULT_RATES[`${item.material}:${newType}`] || item.ratePerSqFt;
    const newTotal = calculateItemTotal(item.areaSqFt, defaultRate, item.quantity);

    onUpdate({
      ...item,
      windowType: newType,
      ratePerSqFt: defaultRate,
      itemTotal: newTotal,
    });
  };

  // Handle Width / Height change with instant area recalculation
  const handleDimensionChange = (width: number, height: number) => {
    const newArea = calculateAreaInSqFt(width, height, divisionFactor);
    const newTotal = calculateItemTotal(newArea, item.ratePerSqFt, item.quantity);

    onUpdate({
      ...item,
      widthMm: width,
      heightMm: height,
      areaSqFt: newArea,
      itemTotal: newTotal,
    });
  };

  // Handle Rate change
  const handleRateChange = (rate: number) => {
    const safeRate = Math.max(0, rate);
    const newTotal = calculateItemTotal(item.areaSqFt, safeRate, item.quantity);

    onUpdate({
      ...item,
      ratePerSqFt: safeRate,
      itemTotal: newTotal,
    });
  };

  // Handle Quantity stepper / input
  const handleQuantityChange = (qty: number) => {
    const safeQty = Math.max(1, qty);
    const newTotal = calculateItemTotal(item.areaSqFt, item.ratePerSqFt, safeQty);

    onUpdate({
      ...item,
      quantity: safeQty,
      itemTotal: newTotal,
    });
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg shadow-sm transition-all duration-150 mb-4 overflow-hidden">
      {/* Item Card Header Bar */}
      <div className="bg-slate-50/90 border-b border-slate-200 px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto min-w-0">
          <span className="font-mono text-xs font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded shrink-0">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <input
            type="text"
            value={item.locationLabel}
            onChange={(e) => onUpdate({ ...item, locationLabel: e.target.value })}
            className="text-xs font-semibold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:bg-white px-1 py-0.5 rounded outline-none transition flex-1 sm:w-64 min-w-0"
            placeholder="e.g. Master Bedroom W1"
          />
          <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 shrink-0">
            [{item.itemCode || `ITM-${index + 1}`}]
          </span>
        </div>

        {/* Right Action Icons & Line Total */}
        <div className="flex items-center justify-between sm:justify-end space-x-2 w-full sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase font-mono text-slate-400 inline mr-1">
              Total:
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm">
              {formatCurrency(item.itemTotal)}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => onDuplicate(item)}
              title="Duplicate this size / item"
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 rounded transition"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(item.id)}
              title="Delete item"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body: 2 Columns (Schematic Preview + Calculation & Input Grid) */}
      <div className="p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
        {/* Left Column: Visual Schematic / Technical Elevation Drawing */}
        <div className="lg:col-span-4 bg-slate-50/60 border border-slate-200 rounded-md p-3 flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Elevation Preview
            </span>
            <span className="text-[10px] font-mono text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
              {item.material} • {item.windowType}
            </span>
          </div>

          <WindowSchematic
            material={item.material}
            windowType={item.windowType}
            widthMm={item.widthMm}
            heightMm={item.heightMm}
            areaSqFt={item.areaSqFt}
            className="w-full"
          />

          <div className="w-full mt-2 text-center text-[10px] font-mono text-slate-500">
            {item.widthMm} mm × {item.heightMm} mm = <strong className="text-slate-800">{item.areaSqFt.toFixed(2)} Sq.Ft</strong>
          </div>
        </div>

        {/* Right Column: Formulation & Input Controls */}
        <div className="lg:col-span-8 space-y-4">
          {/* Row 1: Material Type & Window Type (Cascading) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Material Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-md border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleMaterialChange('Aluminium')}
                  className={`py-1.5 px-3 text-xs font-medium rounded transition ${item.material === 'Aluminium'
                      ? 'bg-white text-slate-900 shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  Aluminium
                </button>
                <button
                  type="button"
                  onClick={() => handleMaterialChange('UPVC')}
                  className={`py-1.5 px-3 text-xs font-medium rounded transition ${item.material === 'UPVC'
                      ? 'bg-brand-600 text-white shadow-sm font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  UPVC
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Window / Door Type <span className="text-red-500">*</span>
              </label>
              <select
                value={item.windowType}
                onChange={(e) => handleWindowTypeChange(e.target.value as WindowType)}
                className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none shadow-sm"
              >
                {windowTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Dimensions (Width & Height in mm) + Formula Calculated Area */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Width (mm) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="1"
                  value={item.widthMm || ''}
                  onChange={(e) =>
                    handleDimensionChange(Number(e.target.value), item.heightMm)
                  }
                  className="w-full font-mono bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none shadow-sm"
                  placeholder="e.g. 1500"
                />
                <span className="absolute right-2.5 top-1.5 text-[10px] font-mono text-slate-400">
                  mm
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Height (mm) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  max="10000"
                  step="1"
                  value={item.heightMm || ''}
                  onChange={(e) =>
                    handleDimensionChange(item.widthMm, Number(e.target.value))
                  }
                  className="w-full font-mono bg-white border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none shadow-sm"
                  placeholder="e.g. 1200"
                />
                <span className="absolute right-2.5 top-1.5 text-[10px] font-mono text-slate-400">
                  mm
                </span>
              </div>
            </div>

            {/* Calculated Area Display */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Area in Sq.Ft
              </label>
              <div className="bg-slate-100/90 border border-slate-200 rounded-md px-3 py-1.5 flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-brand-900">
                  {item.areaSqFt.toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200" title={`Calculation: (${item.widthMm}/${divisionFactor}) × (${item.heightMm}/${divisionFactor})`}>
                  ÷ {divisionFactor}²
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Rate per Sq.Ft, Quantity Counter, and Subtotal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Rate Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Rate (₹ / Sq.Ft)
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1.5 text-xs text-slate-500 font-medium">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={item.ratePerSqFt || ''}
                  onChange={(e) => handleRateChange(Number(e.target.value))}
                  className="w-full font-mono bg-white border border-slate-300 rounded-md pl-6 pr-3 py-1.5 text-xs text-slate-900 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none shadow-sm"
                  placeholder="450"
                />
              </div>
            </div>

            {/* Quantity Stepper with buttons */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quantity (Nos.)
              </label>
              <div className="flex items-center border border-slate-300 rounded-md overflow-hidden bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-600 border-r border-slate-300 transition"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-full text-center font-mono text-xs font-semibold text-slate-900 py-1.5 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border-l border-slate-300 transition"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Line Item Total */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Line Total Amount
              </label>
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-md px-3 py-1.5 flex items-center justify-between">
                <span className="font-mono font-bold text-xs sm:text-sm text-emerald-900">
                  {formatCurrency(item.itemTotal)}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono">
                  {item.quantity} Qty
                </span>
              </div>
            </div>
          </div>

          {/* Toggle Advanced Specifications (Glass, Color, Notes) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-800 transition"
            >
              <Sliders className="w-3 h-3 text-slate-400" />
              <span>{showAdvanced ? 'Hide Specifications' : 'Add Glass, Finish & Specifications'}</span>
              {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Collapsible Advanced Form */}
          {showAdvanced && (
            <div className="p-3 bg-slate-50 rounded-md border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Glass Specification</label>
                <select
                  value={item.glassType}
                  onChange={(e) => onUpdate({ ...item, glassType: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 outline-none"
                >
                  {GLASS_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Profile Finish / RAL Color</label>
                <select
                  value={item.colorFinish}
                  onChange={(e) => onUpdate({ ...item, colorFinish: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 outline-none"
                >
                  {FINISH_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Mosquito Mesh</label>
                <select
                  value={item.meshOption}
                  onChange={(e) => onUpdate({ ...item, meshOption: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 outline-none"
                >
                  {MESH_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-slate-500 font-medium mb-1">Special Site Notes / Instructions</label>
                <input
                  type="text"
                  value={item.customNotes || ''}
                  onChange={(e) => onUpdate({ ...item, customNotes: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 outline-none"
                  placeholder="e.g. Safety grill alignment, top fanlight, sub-frame requirement"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

