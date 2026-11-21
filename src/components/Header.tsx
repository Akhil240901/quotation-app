import React from 'react';
import {
  Building2,
  FileText,
  Download,
  Printer,
  Plus,
  Settings,
  SlidersHorizontal,
  Eye,
  Edit3
} from 'lucide-react';
import logo from '../assets/img/logo.jpeg';

interface HeaderProps {
  activeTab: 'editor' | 'preview';
  setActiveTab: (tab: 'editor' | 'preview') => void;
  onAddItem: () => void;
  onDownloadPdf: () => void;
  onPrint: () => void;
  onOpenSettings: () => void;
  isDownloading: boolean;
  downloadProgressText?: string;
  itemCount: number;
  grandTotal: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onAddItem,
  onDownloadPdf,
  onPrint,
  onOpenSettings,
  isDownloading,
  downloadProgressText,
  itemCount,
  grandTotal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[3.75rem] py-2 sm:py-0">
          {/* Logo & Product Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 pr-2">
            <div className="h-9 w-9 sm:h-10 sm:w-10 bg-white rounded-md flex items-center justify-center p-0.5 overflow-hidden shadow-inner border border-slate-700 shrink-0">
              <img src={logo} alt="Logo" className="h-full w-full object-contain rounded" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-semibold tracking-tight text-xs sm:text-base md:text-lg text-slate-100 truncate">
                  SHRI ASHTVINAYAK UPVC
                </span>
                <span className="hidden xs:inline-block text-[9px] uppercase font-mono tracking-wider bg-slate-800 text-sky-400 px-1 py-0.5 rounded border border-slate-700 shrink-0">
                  ERP
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate">
                UPVC & Architectural Aluminium Estimation Manager
              </p>
            </div>
          </div>

          {/* View Toggle Tabs (Desktop) */}
          <div className="hidden md:flex items-center bg-slate-800/80 p-1 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'editor'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Quotation Editor</span>
              <span className="ml-1 px-1.5 py-0.2 bg-slate-900/60 text-slate-300 rounded text-[10px]">
                {itemCount}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'preview'
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Print / PDF Preview</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            {activeTab === 'editor' && (
              <button
                type="button"
                onClick={onAddItem}
                className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-md border border-slate-700 transition"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Item</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenSettings}
              title="Company Profile & Quotation Settings"
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md border border-slate-700 transition"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onPrint}
              title="Quick Print Quotation"
              className="hidden lg:inline-flex items-center space-x-1.5 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-medium px-2.5 py-2 rounded-md border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white text-xs font-medium px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-md shadow-sm transition shrink-0"
            >
              <Download className={`w-3.5 h-3.5 ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>
                {isDownloading ? (downloadProgressText || '...') : (
                  <>
                    <span className="sm:hidden">PDF</span>
                    <span className="hidden sm:inline">Download PDF</span>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden border-t border-slate-800 py-1.5 justify-between items-center">
          <div className="flex space-x-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition ${activeTab === 'editor' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
            >
              Editor ({itemCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition ${activeTab === 'preview' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
            >
              PDF View
            </button>
          </div>
          {activeTab === 'editor' && (
            <button
              type="button"
              onClick={onAddItem}
              className="inline-flex items-center space-x-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-2.5 py-1 rounded transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
