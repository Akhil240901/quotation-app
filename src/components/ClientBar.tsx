import React, { useState } from 'react';
import { ClientInfo } from '../types/quotation';
import { User, Phone, MapPin, Calendar, Hash, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface ClientBarProps {
  client: ClientInfo;
  quotationNumber: string;
  date: string;
  validUntil: string;
  divisionFactor: number;
  onClientChange: (client: ClientInfo) => void;
  onMetaChange: (quotationNumber: string, date: string, validUntil: string) => void;
  onDivisionFactorChange?: (factor: number) => void;
}

export const ClientBar: React.FC<ClientBarProps> = ({
  client,
  quotationNumber,
  date,
  validUntil,
  divisionFactor,
  onClientChange,
  onMetaChange,
  onDivisionFactorChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6 transition">
      {/* Primary Summary Strip */}
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-sm">
          {/* Quotation No */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold shrink-0">
              Quotation #
            </span>
            <input
              type="text"
              value={quotationNumber}
              onChange={(e) => onMetaChange(e.target.value, date, validUntil)}
              className="font-mono font-medium text-slate-900 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-2 py-1 text-xs w-28 sm:w-36 outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="QT-2026-001"
            />
          </div>

          {/* Client Name */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 flex-1 sm:flex-initial min-w-[140px]">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={client.clientName}
              onChange={(e) => onClientChange({ ...client, clientName: e.target.value })}
              className="font-medium text-slate-900 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-2 py-1 text-xs w-full sm:w-56 outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Client / Customer Name"
            />
          </div>

          {/* Client Phone */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={client.phone}
              onChange={(e) => onClientChange({ ...client, phone: e.target.value })}
              className="text-slate-800 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-2 py-1 text-xs w-28 sm:w-36 outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Contact No."
            />
          </div>

          {/* Site Location */}
          <div className="hidden lg:flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={client.siteAddress}
              onChange={(e) => onClientChange({ ...client, siteAddress: e.target.value })}
              className="text-slate-800 bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded px-2 py-1 text-xs w-64 outline-none focus:ring-1 focus:ring-brand-500"
              placeholder="Site Address / Location"
            />
          </div>
        </div>

        {/* Right Toggle Button */}
        <div className="flex items-center justify-between sm:justify-end space-x-3 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex sm:hidden text-[10px] text-slate-500 font-mono">
            ÷ {divisionFactor}² sq.ft
          </div>
          <div className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
            <span className="font-mono text-[11px] text-slate-600">Formula:</span>
            <span className="font-mono font-medium text-brand-700 bg-brand-50 px-1 py-0.5 rounded border border-brand-200">
              (W / {divisionFactor}) × (H / {divisionFactor}) = Sq.Ft
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded transition shrink-0"
          >
            <span>{isExpanded ? 'Less' : 'More Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Expanded Details */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-slate-50/70 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Company / Project Title</label>
            <input
              type="text"
              value={client.companyName || ''}
              onChange={(e) => onClientChange({ ...client, companyName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="e.g. Skyline Residency Villa #4"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Client Email Address</label>
            <input
              type="email"
              value={client.email}
              onChange={(e) => onClientChange({ ...client, email: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="client@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">City / Region</label>
            <input
              type="text"
              value={client.city}
              onChange={(e) => onClientChange({ ...client, city: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="City, State"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Architect / Reference</label>
            <input
              type="text"
              value={client.architectName || ''}
              onChange={(e) => onClientChange({ ...client, architectName: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Architect or Consultant"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Quotation Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => onMetaChange(quotationNumber, e.target.value, validUntil)}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Valid Until Date</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => onMetaChange(quotationNumber, date, e.target.value)}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-500 font-medium mb-1">Site Delivery Address</label>
            <input
              type="text"
              value={client.siteAddress}
              onChange={(e) => onClientChange({ ...client, siteAddress: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded px-2.5 py-1.5 text-slate-800 focus:ring-1 focus:ring-brand-500 outline-none"
              placeholder="Complete Site Address"
            />
          </div>
        </div>
      )}
    </div>
  );
};

