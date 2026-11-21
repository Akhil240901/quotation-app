import React, { useState } from 'react';
import { CompanyProfile, BankDetails } from '../types/quotation';
import { X, Building2, Check, RotateCcw } from 'lucide-react';
import { DEFAULT_COMPANY, DEFAULT_TERMS, DEFAULT_PRE_REQUISITES } from '../data/defaults';

interface CompanySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: CompanyProfile;
  onSaveCompany: (company: CompanyProfile) => void;
  terms: string[];
  onSaveTerms: (terms: string[]) => void;
  preRequisites: string[];
  onSavePreRequisites: (preReqs: string[]) => void;
  divisionFactor: number;
  onSaveDivisionFactor: (factor: number) => void;
}

export const CompanySettingsModal: React.FC<CompanySettingsModalProps> = ({
  isOpen,
  onClose,
  company,
  onSaveCompany,
  terms,
  onSaveTerms,
  preRequisites,
  onSavePreRequisites,
  divisionFactor,
  onSaveDivisionFactor,
}) => {
  const [formData, setFormData] = useState<CompanyProfile>(company);
  const [bankData, setBankData] = useState<BankDetails>(
    company.bankDetails || {
      accountName: 'SHRI RAM GLASS',
      bankName: 'BANK OF BARODA',
      accountNumber: '59070200001606',
      ifscCode: 'BARB0GORELA',
      branch: 'GONDIA',
    }
  );
  const [termsText, setTermsText] = useState(terms.join('\n'));
  const [preReqsText, setPreReqsText] = useState(preRequisites.join('\n'));
  const [factor, setFactor] = useState(divisionFactor);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveCompany({
      ...formData,
      bankDetails: bankData,
    });
    onSaveTerms(
      termsText
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean)
    );
    onSavePreRequisites(
      preReqsText
        .split('\n')
        .map((t) => t.trim())
        .filter(Boolean)
    );
    onSaveDivisionFactor(factor);
    onClose();
  };

  const handleReset = () => {
    setFormData(DEFAULT_COMPANY);
    setBankData(DEFAULT_COMPANY.bankDetails || {
      accountName: 'SHRI RAM GLASS',
      bankName: 'BANK OF BARODA',
      accountNumber: '59070200001606',
      ifscCode: 'BARB0GORELA',
      branch: 'GONDIA',
    });
    setTermsText(DEFAULT_TERMS.join('\n'));
    setPreReqsText(DEFAULT_PRE_REQUISITES.join('\n'));
    setFactor(304);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
            <Building2 className="w-5 h-5 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-semibold text-xs sm:text-sm truncate">Owner & Quotation Profile Settings</h3>
              <p className="text-[11px] text-slate-400 truncate">Configure owner details, bank details & installation terms</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5 sm:space-y-6 text-xs text-slate-700">
          {/* Section 1: Business Profile */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-200">
              Owner & Business Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Owner / Business Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none font-medium text-slate-900"
                  placeholder="e.g. SANDIP BHAGAT"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Tagline / Business Description</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="e.g. UPVC & Architectural Aluminium Solutions"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Phone / Mobile</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="+91 99233 46516"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="sandipbhagat@gmail.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="Balaji Nagar, At Post Sawari"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Tah, Dist & State PIN Code</label>
                <input
                  type="text"
                  value={formData.cityStateZip}
                  onChange={(e) => setFormData({ ...formData, cityStateZip: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none"
                  placeholder="Tah. & Dist. Gondia, Maharashtra - 441601"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Bank Details (Shri Ram Glass) */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-200">
              Payment Bank Details (Term #3: Shri Ram Glass)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Account Name</label>
                <input
                  type="text"
                  value={bankData.accountName}
                  onChange={(e) => setBankData({ ...bankData, accountName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Account Number</label>
                <input
                  type="text"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white outline-none font-mono font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bankData.ifscCode}
                  onChange={(e) => setBankData({ ...bankData, ifscCode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white outline-none font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-600 font-medium mb-1">Branch</label>
                <input
                  type="text"
                  value={bankData.branch}
                  onChange={(e) => setBankData({ ...bankData, branch: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-2.5 py-1.5 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Area Formula Factor */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px] mb-3 pb-1 border-b border-slate-200">
              Calculation Settings
            </h4>
            <div className="bg-slate-50 border border-slate-200 rounded p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-800 block text-xs">
                  Area Formula MM-to-Feet Divisor:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  (Width ÷ {factor}) × (Height ÷ {factor}) = Area (Sq.Ft)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.1"
                  value={factor}
                  onChange={(e) => setFactor(Number(e.target.value) || 304)}
                  className="w-24 bg-white border border-slate-300 rounded px-2 py-1 text-xs font-mono font-bold text-slate-900 text-center"
                />
                <button
                  type="button"
                  onClick={() => setFactor(304)}
                  className={`text-[10px] px-2 py-1 rounded border ${
                    factor === 304 ? 'bg-brand-600 text-white border-brand-700' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  304 mm
                </button>
                <button
                  type="button"
                  onClick={() => setFactor(304.8)}
                  className={`text-[10px] px-2 py-1 rounded border ${
                    factor === 304.8 ? 'bg-brand-600 text-white border-brand-700' : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  304.8 mm
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Terms and Conditions */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px] mb-2 pb-1 border-b border-slate-200">
              Terms & Conditions (One per line)
            </h4>
            <textarea
              rows={6}
              value={termsText}
              onChange={(e) => setTermsText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none font-sans text-xs leading-relaxed"
            />
          </div>

          {/* Section 5: Pre-Requisites for Installation */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase font-mono tracking-wider text-[11px] mb-2 pb-1 border-b border-slate-200">
              Pre-Requisites for Installation of Windows (One per line)
            </h4>
            <textarea
              rows={6}
              value={preReqsText}
              onChange={(e) => setPreReqsText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 focus:bg-white focus:ring-1 focus:ring-brand-500 outline-none font-sans text-xs leading-relaxed"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-3.5 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center space-x-1 text-xs text-slate-500 hover:text-slate-800 py-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex space-x-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 sm:px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded shadow-sm flex items-center justify-center space-x-1.5 transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
