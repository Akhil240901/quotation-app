import React from 'react';
import { QuotationData, CompanyProfile } from '../types/quotation';
import { WindowSchematic } from './WindowSchematic';
import { formatCurrency, numberToWords } from '../utils/calculations';
import logo from '../assets/img/logo.jpeg';

interface QuotationPreviewProps {
  quotation: QuotationData;
  company: CompanyProfile;
}

export const QuotationPreview: React.FC<QuotationPreviewProps> = ({
  quotation,
  company,
}) => {
  const { client, items, summary, quotationNumber, date, validUntil, terms, preRequisites, divisionFactor } =
    quotation;

  const bank = company.bankDetails || {
    accountName: 'SHRI RAM GLASS',
    bankName: 'BANK OF BARODA',
    accountNumber: '59070200001606',
    ifscCode: 'BARB0GORELA',
    branch: 'GONDIA'
  };

  return (
    <div className="w-full flex justify-center py-2 sm:py-6 px-0 sm:px-4">
      {/* Printable Sheet Container (A4 PDF capture and print) */}
      <div
        id="quotation-print-container"
        className="w-full max-w-[840px] bg-white border border-slate-300 shadow-lg text-slate-800 p-4 sm:p-8 md:p-10 font-sans print:border-none print:shadow-none print:p-0 print:max-w-none overflow-hidden"
      >
        {/* ================= HEADER SECTION ================= */}
        <div className="border-b-2 border-slate-900 pb-4 sm:pb-5 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            {/* Owner Brand & Contact */}
            <div className="max-w-md flex items-start space-x-3 sm:space-x-3.5 w-full sm:w-auto">
              <div className="h-12 w-12 sm:h-16 sm:w-16 bg-white border border-slate-200 rounded p-1 shrink-0 flex items-center justify-center shadow-sm">
                <img src={logo} alt="Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2 mb-0.5">
                  <span className="font-mono text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase break-words">
                    {company.name}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 mb-1">
                  {company.tagline}
                </p>
                <div className="text-[11px] text-slate-600 space-y-0.5 leading-relaxed font-sans">
                  <p className="font-medium text-slate-800">{company.address}, {company.cityStateZip}</p>
                  <p>
                    <span>Ph: {company.phone}</span> {company.email && <>| <span>Email: {company.email}</span></>}
                  </p>
                </div>
              </div>
            </div>

            {/* Quotation Document Details */}
            <div className="w-full sm:w-auto sm:text-right bg-slate-50 border border-slate-200 rounded p-3 min-w-0 sm:min-w-[210px]">
              <div className="text-xs uppercase tracking-wider font-bold text-brand-900 font-mono mb-1">
                PRICE ESTIMATE / QUOTATION
              </div>
              <div className="text-sm font-mono font-bold text-slate-900 mb-1.5 sm:mb-2">
                {quotationNumber}
              </div>
              <div className="text-[11px] text-slate-600 space-y-0.5 font-mono">
                <div>Date: <span className="text-slate-900 font-semibold">{date}</span></div>
                <div>Valid Until: <span className="text-slate-900 font-semibold">{validUntil}</span></div>
                {client.referenceNo && (
                  <div>Ref #: <span className="text-slate-900 font-semibold">{client.referenceNo}</span></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= CLIENT & PROJECT SITE INFO ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-slate-50/70 border border-slate-200 rounded-md p-3 sm:p-4 mb-4 sm:mb-6 text-xs">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block mb-1">
              Quotation Issued To
            </span>
            <div className="font-bold text-slate-900 text-sm mb-0.5">
              {client.clientName}
            </div>
            {client.companyName && (
              <div className="font-medium text-slate-700 mb-1">{client.companyName}</div>
            )}
            <div className="text-slate-600 text-[11px]">
              <p>Phone: {client.phone || 'N/A'}</p>
              {client.email && <p>Email: {client.email}</p>}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block mb-1">
              Project & Delivery Site
            </span>
            <div className="text-slate-800 font-medium">
              {client.siteAddress || 'Site Address as per client specification'}
            </div>
            <div className="text-slate-600 text-[11px] mt-1">
              <p>City/Region: {client.city || 'Gondia, Maharashtra'}</p>
              {client.architectName && <p>Architect: {client.architectName}</p>}
            </div>
          </div>
        </div>

        {/* ================= ITEMS SECTION (2 COLUMNS) ================= */}
        <div className="mb-4 sm:mb-6">
          <div className="text-xs uppercase font-mono tracking-wider font-bold text-slate-900 pb-2 border-b border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span>Schedule of Windows & Openings</span>
            <span className="text-[11px] text-slate-500 font-normal">
              Formula: (Width ÷ {divisionFactor}) × (Height ÷ {divisionFactor}) = Sq.Ft
            </span>
          </div>

          <div className="divide-y divide-slate-200">
            {items.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400 font-mono">
                No window or door openings added yet. Please add openings in the Quotation Editor.
              </div>
            ) : (
              items.map((item, idx) => (
              <div
                key={item.id}
                className="py-3 sm:py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center break-inside-avoid"
              >
                {/* COLUMN 1: Image / Technical Elevation with dimensions */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded p-2 sm:p-2.5">
                  <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1">
                    <span className="font-bold text-slate-700">Item #{idx + 1}</span>
                    <span className="uppercase text-[9px] bg-slate-200 px-1 py-0.5 rounded text-slate-700 font-semibold">
                      {item.material}
                    </span>
                  </div>

                  <WindowSchematic
                    material={item.material}
                    windowType={item.windowType}
                    widthMm={item.widthMm}
                    heightMm={item.heightMm}
                    areaSqFt={item.areaSqFt}
                    compact
                    className="w-full"
                  />

                  <div className="mt-1 text-[10px] font-mono text-slate-600 font-medium text-center">
                    Dimension: {item.widthMm} mm (W) × {item.heightMm} mm (H)
                  </div>
                </div>

                {/* COLUMN 2: Details, Specifications, Dimensions & Commercials */}
                <div className="sm:col-span-7 space-y-2 text-xs">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {item.locationLabel || `Opening Item #${idx + 1}`}
                      </h4>
                      <span className="font-mono text-xs font-semibold text-slate-500">
                        {item.itemCode || `W-${idx + 1}`}
                      </span>
                    </div>
                    <div className="text-slate-700 font-medium text-xs mt-0.5">
                      Type: <span className="font-semibold text-slate-900">{item.windowType}</span>
                    </div>
                  </div>

                  {/* Specifications bullet row */}
                  <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                    <div>
                      <span className="text-slate-500 font-medium">Glass: </span>
                      <span className="text-slate-800">{item.glassType}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Profile Finish: </span>
                      <span className="text-slate-800">{item.colorFinish}</span>
                    </div>
                    {item.meshOption && item.meshOption !== 'No Mosquito Mesh' && (
                      <div>
                        <span className="text-slate-500 font-medium">Mesh: </span>
                        <span className="text-slate-800">{item.meshOption}</span>
                      </div>
                    )}
                    {item.customNotes && (
                      <div className="italic text-slate-500 text-[10px]">
                        Note: {item.customNotes}
                      </div>
                    )}
                  </div>

                  {/* Detailed Dimension and Calculation Math */}
                  <div className="font-mono text-[11px] text-slate-600 flex flex-wrap gap-x-3 gap-y-1">
                    <div>
                      Area: <strong className="text-slate-900">{item.areaSqFt.toFixed(1)} Sq.Ft</strong>
                    </div>
                    <div className="text-slate-400 hidden xs:inline">|</div>
                    <div>
                      Rate: <strong className="text-slate-900">₹{item.ratePerSqFt} / sq.ft</strong>
                    </div>
                    <div className="text-slate-400 hidden xs:inline">|</div>
                    <div>
                      Quantity: <strong className="text-slate-900">{item.quantity} Nos.</strong>
                    </div>
                  </div>

                  {/* Pricing sub-total row */}
                  <div className="flex flex-wrap justify-between items-center gap-1 pt-1 border-t border-slate-200">
                    <span className="text-[11px] text-slate-500 font-mono">
                      Calculation: ({item.areaSqFt.toFixed(1)} sq.ft × ₹{item.ratePerSqFt} × {item.quantity})
                    </span>
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {formatCurrency(item.itemTotal)}
                    </span>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>

        {/* ================= COMMERCIAL SUMMARY BLOCK ================= */}
        <div className="border-t-2 border-slate-900 pt-4 mb-4 sm:mb-6 break-inside-avoid">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start">
            {/* Left Box: Bank Details for Payment as per Term #3 */}
            <div className="sm:col-span-6 space-y-2 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded p-3">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-800 block mb-1">
                  Bank Details for P.O & Payments
                </span>
                <p className="text-[10px] text-slate-500 mb-1.5 font-medium">
                  (P.O & Payments should be made in the name of <strong>Shri Ram Glass</strong>)
                </p>
                <div className="font-mono text-[11px] text-slate-700 space-y-0.5">
                  <p><span className="text-slate-500">Account Name:</span> <strong className="text-slate-900">{bank.accountName}</strong></p>
                  <p><span className="text-slate-500">Bank Name:</span> <strong>{bank.bankName}</strong></p>
                  <p><span className="text-slate-500">Account Number:</span> <strong className="text-slate-900 font-bold">{bank.accountNumber}</strong></p>
                  <p><span className="text-slate-500">IFSC Code:</span> <strong className="text-slate-900">{bank.ifscCode}</strong></p>
                  <p><span className="text-slate-500">Branch:</span> {bank.branch}</p>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono px-1">
                Total Openings: <strong>{summary.totalQuantity} Nos.</strong> | Total Area: <strong>{summary.totalSqFt.toFixed(1)} Sq.Ft</strong>
              </div>
            </div>

            {/* Right Box: Math Financial Breakdown (No GST) */}
            <div className="sm:col-span-6 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-600 py-0.5">
                <span>Material Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatCurrency(summary.subtotal)}</span>
              </div>

              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 py-0.5">
                  <span>Special Discount ({summary.discountPercentage}%):</span>
                  <span>-{formatCurrency(summary.discountAmount)}</span>
                </div>
              )}

              {summary.installationCharge > 0 && (
                <div className="flex justify-between text-slate-600 py-0.5">
                  <span>Installation & Site Erection:</span>
                  <span>+{formatCurrency(summary.installationCharge)}</span>
                </div>
              )}

              {summary.transportationCharge > 0 && (
                <div className="flex justify-between text-slate-600 py-0.5">
                  <span>Freight & Logistics:</span>
                  <span>+{formatCurrency(summary.transportationCharge)}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="border-t-2 border-slate-900 pt-2 pb-1 flex justify-between items-baseline text-slate-900 gap-2">
                <span className="font-bold text-sm uppercase tracking-wider">Grand Total:</span>
                <span className="font-black text-lg sm:text-xl text-slate-900">
                  {formatCurrency(summary.grandTotal)}
                </span>
              </div>

              {/* Amount in words */}
              <div className="text-[10px] text-slate-600 italic text-right leading-tight break-words">
                {numberToWords(summary.grandTotal)}
              </div>
            </div>
          </div>
        </div>

        {/* ================= TERMS & CONDITIONS ================= */}
        <div className="border-t border-slate-300 pt-3 sm:pt-4 mb-4 text-[10px] text-slate-700 leading-relaxed break-inside-avoid">
          <span className="font-bold uppercase tracking-wider text-slate-900 font-mono block mb-1.5 text-xs">
            Terms and Conditions
          </span>
          <div className="space-y-1 pl-1">
            {/* 1. Payment Terms */}
            <div>
              <p className="font-semibold text-slate-900">1. Payments terms: -</p>
              <p className="pl-3 text-slate-600">a. 100% Advance along with order, if it is less than Rs. 1,00,000.</p>
              <p className="pl-3 text-slate-600">b. 50% advance along with order, 50% before delivery, if it is more than Rs. 1,00,000.</p>
            </div>

            {/* 2. Validation */}
            <p><strong className="text-slate-900">2.</strong> Validation of quote 30 days, total execution of project should be completed latest by 3-months.</p>

            {/* 3. P.O & Payments */}
            <div>
              <p><strong className="text-slate-900">3.</strong> P.O & Payments should made in the name of <strong>Shri Ram Glass</strong>.</p>
              <div className="pl-1 sm:pl-3 font-mono text-[9px] sm:text-[9.5px] text-slate-600 bg-slate-50 p-2 my-1 rounded border border-slate-200 flex flex-wrap gap-x-2 gap-y-1">
                <span>Account Name : <strong>SHRI RAM GLASS</strong></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span>Bank Name : <strong>BANK OF BARODA</strong></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span>Account Number : <strong>59070200001606</strong></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span>IFSC : <strong>BARB0GORELA</strong></span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span>Branch : <strong>GONDIA</strong></span>
              </div>
            </div>

            {/* 4. Sizes Variation */}
            <p><strong className="text-slate-900">4.</strong> The prices are based on the sizes provided by the customer. The prices are valid for variation in sizes up to +/- 30mm per window provided the design and style of product remains unchanged. The customer will be charged on pro-rate basis for difference between the actual sizes and given sizes, if any, beyond the above variation.</p>

            {/* 5. Cleaning */}
            <p><strong className="text-slate-900">5.</strong> After handovering the windows, cleaning not our scope.</p>

            {/* 6. Security tape */}
            <p><strong className="text-slate-900">6.</strong> Windows security tape should be remove while installing windows freely, After installation security tape will be removed by us that should be chargeable per window Rs. 100.</p>

            {/* 7. Sales commitments */}
            <p><strong className="text-slate-900">7.</strong> If any other commitments given by our sales team, before placing order please call us. Cell : <strong className="text-slate-900 font-mono">+91 9923346516</strong></p>

            {/* 8. Service visit */}
            <p><strong className="text-slate-900">8.</strong> After handovering windows, If any service require related to windows & doors, that should be chargeable. Per visit - <strong>Rs. 350</strong>.</p>

            {/* 9. Unloading */}
            <p><strong className="text-slate-900">9.</strong> Material unloading & storage should be your scope.</p>

            {/* 10. Jurisdiction */}
            <p><strong className="text-slate-900">10.</strong> All disputes shall be subject jurisdiction only.</p>
          </div>
        </div>

        {/* ================= PRE-REQUISITES FOR INSTALLATION ================= */}
        <div className="border-t border-slate-200 pt-3 mb-4 text-[10px] text-slate-700 leading-relaxed break-inside-avoid bg-slate-50/50 p-2.5 sm:p-3 rounded">
          <span className="font-bold uppercase tracking-wider text-slate-900 font-mono block mb-1 text-xs">
            Pre-Requisites for installation of Windows:-
          </span>
          <div className="space-y-0.5 pl-1 text-slate-600">
            <p><strong className="text-slate-800">1.</strong> Walls should be plastered from inside and outside, with inside POP complete.</p>
            <p><strong className="text-slate-800">2.</strong> All jams, sills and soffits should be plastered.</p>
            <p><strong className="text-slate-800">3.</strong> Flooring (where doors have to be installed) should be complete.</p>
            <p><strong className="text-slate-800">4.</strong> Aperture should be smooth.</p>
            <p><strong className="text-slate-800">5.</strong> Base and top of window should be water leveled and sides should be in vertical plump.</p>
            <p><strong className="text-slate-800">6.</strong> Sill width should be more than the window width.</p>
            <p><strong className="text-slate-800">7.</strong> Opening should be accessible from inside for installation.</p>
            <div className="pl-1">
              <p><strong className="text-slate-800">8.</strong> Grills: Adequate care should be taken if grills have to be installed.</p>
              <p className="pl-3">a. For Horizontal slider Window: Grill should be provided on the outer face of slider before the installation of the window.</p>
              <p className="pl-3">b. For Casement windows: Screw type grill is recommended after installation of casement window.</p>
            </div>
            <p><strong className="text-slate-800">9.</strong> Installation should happen before the last coat of paint. At least one coat of paint should be done before installation begins.</p>
            <p><strong className="text-slate-800">10.</strong> Scaffoldings/ bracing should not interrupt the window openings where windows are supposed to be installed.</p>
          </div>
        </div>

        {/* ================= CUSTOMER ACCEPTANCE DECLARATION ================= */}
        <div className="border-t border-slate-300 pt-3 mb-4 text-[10px] sm:text-[10.5px] text-slate-800 bg-slate-100/70 p-2 sm:p-2.5 rounded border border-slate-200 italic break-inside-avoid">
          I hereby accept the estimate as per above mentioned price and specifications. I have read and understood the terms & conditions and agree to them.
        </div>

        {/* ================= SIGNATURE & STAMP FOOTER ================= */}
        <div className="pt-2 flex flex-col sm:flex-row justify-between sm:items-end gap-6 sm:gap-4 text-xs text-slate-700 break-inside-avoid">
          <div className="text-left w-full sm:w-auto">
            <div className="hidden sm:block h-10"></div>
            <p className="text-[11px] font-semibold text-slate-900 border-t border-slate-400 pt-1 w-full sm:w-48 text-center mt-4 sm:mt-0">
              Signature of Customer
            </p>
          </div>

          <div className="text-left sm:text-right w-full sm:w-auto">
            <p className="font-semibold text-slate-900 font-mono uppercase text-[11px] mb-2 sm:mb-8 break-words max-w-full sm:max-w-xs sm:ml-auto">
              For {company.name} / SHRI RAM GLASS
            </p>
            <p className="text-[11px] font-semibold text-slate-900 border-t border-slate-400 pt-1 w-full sm:w-48 text-center sm:ml-auto mt-4 sm:mt-0">
              Authorized Signatory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
