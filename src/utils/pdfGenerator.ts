import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface GeneratePdfOptions {
  elementId: string;
  fileName: string;
  onProgress?: (status: string) => void;
}

export async function generateQuotationPdf({
  elementId,
  fileName,
  onProgress,
}: GeneratePdfOptions): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Quotation document element #${elementId} not found`);
  }

  onProgress?.('Preparing document for export...');

  // Scroll to top to ensure complete capture
  window.scrollTo(0, 0);

  // Save current styling
  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;

  try {
    // Standardize to A4 width proportion for capture
    element.style.width = '800px';
    element.style.maxWidth = '800px';

    onProgress?.('Rendering high-resolution vector canvas...');

    const canvas = await html2canvas(element, {
      scale: 2, // 2x resolution for crisp text & line art
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
    });

    onProgress?.('Generating PDF pages...');

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Subsequent pages if quotation has many items
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    onProgress?.('Saving PDF file...');
    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
  } finally {
    // Restore layout
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    onProgress?.('');
  }
}

