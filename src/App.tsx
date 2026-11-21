import React, { useState, useMemo } from 'react';
import {
  QuotationData,
  QuotationItem,
  ClientInfo,
  CompanyProfile,
  QuotationSummary
} from './types/quotation';
import {
  DEFAULT_COMPANY,
  DEFAULT_CLIENT,
  DEFAULT_TERMS,
  DEFAULT_PRE_REQUISITES,
  DEFAULT_RATES
} from './data/defaults';
import { calculateAreaInSqFt, calculateItemTotal, formatCurrency } from './utils/calculations';
import { generateQuotationPdf } from './utils/pdfGenerator';
import { Header } from './components/Header';
import { ClientBar } from './components/ClientBar';
import { ItemCard } from './components/ItemCard';
import { CommercialSummary } from './components/CommercialSummary';
import { QuotationPreview } from './components/QuotationPreview';
import { CompanySettingsModal } from './components/CompanySettingsModal';
import { Plus, Sparkles, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgressText, setDownloadProgressText] = useState('');

  // Quotation Meta State
  const [quotationNumber, setQuotationNumber] = useState('QT-2026-089');
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const validUntilStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  }, []);
  const [date, setDate] = useState(todayStr);
  const [validUntil, setValidUntil] = useState(validUntilStr);

  // Core Data
  const [client, setClient] = useState<ClientInfo>(DEFAULT_CLIENT);
  const [company, setCompany] = useState<CompanyProfile>(DEFAULT_COMPANY);
  const [terms, setTerms] = useState<string[]>(DEFAULT_TERMS);
  const [preRequisites, setPreRequisites] = useState<string[]>(DEFAULT_PRE_REQUISITES);
  const [divisionFactor, setDivisionFactor] = useState<number>(304); // Default 304 mm as requested
  const [items, setItems] = useState<QuotationItem[]>([]);

  // Commercial adjustment states (Net quotation without GST)
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [installationCharge, setInstallationCharge] = useState(0);
  const [transportationCharge, setTransportationCharge] = useState(0);

  // Compute Full Commercial Summary reactively (pure quotation without GST)
  const summary: QuotationSummary = useMemo(() => {
    let subtotal = 0;
    let totalSqFt = 0;
    let totalQuantity = 0;

    for (const item of items) {
      subtotal += item.itemTotal;
      totalSqFt += item.areaSqFt * item.quantity;
      totalQuantity += item.quantity;
    }

    const discountAmount = Number((subtotal * (discountPercentage / 100)).toFixed(2));
    const netAfterDiscount = subtotal - discountAmount;
    const grandTotal = Number((netAfterDiscount + installationCharge + transportationCharge).toFixed(2));

    return {
      subtotal: Number(subtotal.toFixed(2)),
      totalSqFt: Number(totalSqFt.toFixed(2)),
      totalQuantity,
      discountPercentage,
      discountAmount,
      installationCharge,
      transportationCharge,
      grandTotal,
    };
  }, [items, discountPercentage, installationCharge, transportationCharge]);

  // Combined full quotation data structure for preview & export
  const fullQuotationData: QuotationData = useMemo(() => ({
    quotationNumber,
    date,
    validUntil,
    client,
    items,
    summary,
    terms,
    preRequisites,
    divisionFactor,
  }), [quotationNumber, date, validUntil, client, items, summary, terms, preRequisites, divisionFactor]);

  // Item Operations
  const handleAddItem = () => {
    const newItemNumber = items.length + 1;
    const defaultWidth = 1500;
    const defaultHeight = 1200;
    const area = calculateAreaInSqFt(defaultWidth, defaultHeight, divisionFactor);
    const defaultRate = DEFAULT_RATES['UPVC:2 Track (2 Shutter)'] || 480;

    const newItem: QuotationItem = {
      id: `item-${Date.now()}`,
      itemCode: `W-${String(newItemNumber).padStart(2, '0')}`,
      locationLabel: `Window / Opening #${newItemNumber}`,
      material: 'UPVC',
      windowType: '2 Track (2 Shutter)',
      widthMm: defaultWidth,
      heightMm: defaultHeight,
      areaSqFt: area,
      ratePerSqFt: defaultRate,
      quantity: 1,
      itemTotal: calculateItemTotal(area, defaultRate, 1),
      glassType: '5mm Clear Float Glass',
      colorFinish: 'Pure White (RAL 9016)',
      meshOption: 'No Mosquito Mesh',
      hardwareGrade: 'Standard / Touch Lock',
      customNotes: '',
    };

    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = (updatedItem: QuotationItem) => {
    setItems((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleDuplicateItem = (itemToDup: QuotationItem) => {
    const dupIndex = items.length + 1;
    const duplicated: QuotationItem = {
      ...itemToDup,
      id: `item-${Date.now()}`,
      itemCode: `W-${String(dupIndex).padStart(2, '0')}`,
      locationLabel: `${itemToDup.locationLabel} (Copy)`,
    };
    setItems((prev) => [...prev, duplicated]);
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Division factor update updates all existing items
  const handleDivisionFactorChange = (newFactor: number) => {
    setDivisionFactor(newFactor);
    setItems((prev) =>
      prev.map((item) => {
        const area = calculateAreaInSqFt(item.widthMm, item.heightMm, newFactor);
        const itemTotal = calculateItemTotal(area, item.ratePerSqFt, item.quantity);
        return {
          ...item,
          areaSqFt: area,
          itemTotal,
        };
      })
    );
  };

  const handleSummaryAdjustments = (updated: Partial<QuotationSummary>) => {
    if (updated.discountPercentage !== undefined) setDiscountPercentage(updated.discountPercentage);
    if (updated.installationCharge !== undefined) setInstallationCharge(updated.installationCharge);
    if (updated.transportationCharge !== undefined) setTransportationCharge(updated.transportationCharge);
  };

  // Download PDF Handler
  const handleDownloadPdf = async () => {
    if (items.length === 0) {
      alert('Please add at least one window or door item before downloading the quotation PDF.');
      return;
    }
    try {
      setIsDownloading(true);
      // Temporarily switch to preview mode to render printable element if not active
      if (activeTab !== 'preview') {
        setActiveTab('preview');
        // Allow DOM to settle
        await new Promise((resolve) => setTimeout(resolve, 350));
      }

      const safeClientName = (client.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Quotation_${quotationNumber}_${safeClientName}.pdf`;

      await generateQuotationPdf({
        elementId: 'quotation-print-container',
        fileName: filename,
        onProgress: (status) => setDownloadProgressText(status),
      });
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Could not generate PDF. Please try the Print button to Save as PDF.');
    } finally {
      setIsDownloading(false);
      setDownloadProgressText('');
    }
  };

  const handlePrint = () => {
    if (activeTab !== 'preview') {
      setActiveTab('preview');
      setTimeout(() => {
        window.print();
      }, 400);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Application Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onAddItem={handleAddItem}
        onDownloadPdf={handleDownloadPdf}
        onPrint={handlePrint}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isDownloading={isDownloading}
        downloadProgressText={downloadProgressText}
        itemCount={items.length}
        grandTotal={summary.grandTotal}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-6">
        {/* Client & Project Information Strip */}
        <ClientBar
          client={client}
          quotationNumber={quotationNumber}
          date={date}
          validUntil={validUntil}
          divisionFactor={divisionFactor}
          onClientChange={setClient}
          onMetaChange={(no, dt, vld) => {
            setQuotationNumber(no);
            setDate(dt);
            setValidUntil(vld);
          }}
          onDivisionFactorChange={handleDivisionFactorChange}
        />

        {/* Tab 1: Form / Estimation Editor Mode */}
        {activeTab === 'editor' && (
          <div>
            {/* List of Window / Door Item Cards */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <div className="flex flex-col xs:flex-row xs:items-center justify-between pb-2 border-b border-slate-200 gap-1">
                <div className="flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-brand-700 shrink-0" />
                  <h2 className="text-xs sm:text-sm font-semibold text-slate-800 uppercase tracking-wider font-mono">
                    Window & Door Openings ({items.length})
                  </h2>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] sm:text-xs text-slate-500">
                  <span>Width & Height in mm</span>
                  <span>•</span>
                  <span>Auto Sq.Ft</span>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-6 sm:p-10 text-center my-4">
                  <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-brand-600 mb-3">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">
                    No Window or Door Openings Added Yet
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    Enter the dimensions (width & height in mm) of your first window or door opening to calculate area and quotation price.
                  </p>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="inline-flex items-center space-x-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add First Opening</span>
                  </button>
                </div>
              ) : (
                items.map((item, index) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    divisionFactor={divisionFactor}
                    onUpdate={handleUpdateItem}
                    onDuplicate={handleDuplicateItem}
                    onDelete={handleDeleteItem}
                  />
                ))
              )}
            </div>

            {/* Add More Items Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-white border border-dashed border-slate-300 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 hover:border-brand-400 transition">
              <div className="text-xs text-slate-600">
                <p className="font-semibold text-slate-800">Need to estimate different window or door sizes?</p>
                <p className="text-slate-500">Click Add Item to append another opening specification with custom mm dimensions.</p>
              </div>

              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-md shadow transition"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Add Another Size</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className="inline-flex items-center justify-center space-x-1.5 bg-brand-50 hover:bg-brand-100 text-brand-800 border border-brand-200 text-xs font-semibold px-4 py-2.5 rounded-md transition"
                >
                  <span>Review Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Commercial Adjustments & Grand Total */}
            <CommercialSummary
              summary={summary}
              onSummaryChange={handleSummaryAdjustments}
            />
          </div>
        )}

        {/* Tab 2: Document / Print / PDF View Mode */}
        {activeTab === 'preview' && (
          <div>
            <div className="no-print bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 text-xs text-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span>
                <strong>Print / PDF View:</strong> This shows the exact 2-column layout with technical elevation diagrams and specifications ready for export.
              </span>
              <div className="flex items-center justify-between sm:justify-end space-x-2.5 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className="text-xs font-semibold text-amber-900 underline"
                >
                  Return to Editor
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded font-medium shadow-sm hover:bg-emerald-500 transition"
                >
                  Download PDF
                </button>
              </div>
            </div>

            <QuotationPreview
              quotation={fullQuotationData}
              company={company}
            />
          </div>
        )}
      </main>

      {/* Footer Info */}
      <footer className="no-print bg-white border-t border-slate-200 py-3 sm:py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-1.5 sm:gap-2 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">{company.name}</span> — Internal Quotation & ERP Billing Suite
          </div>

        </div>
      </footer>

      {/* Settings Modal */}
      <CompanySettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        company={company}
        onSaveCompany={setCompany}
        terms={terms}
        onSaveTerms={setTerms}
        preRequisites={preRequisites}
        onSavePreRequisites={setPreRequisites}
        divisionFactor={divisionFactor}
        onSaveDivisionFactor={handleDivisionFactorChange}
      />
    </div>
  );
}

export default App;

