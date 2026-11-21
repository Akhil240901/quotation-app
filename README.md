# FenestraQuote ERP — UPVC & Aluminium Quotation System

A professional, minimal ERP-style React application built for fabricators and business owners to calculate, configure, and generate downloadable PDF quotations for UPVC and Aluminium windows and doors.

---

## ✨ Features

- **Area & Price Calculation**:
  - Direct input of Width and Height in millimeters (**mm**).
  - Exact calculation formula: `(Width / 304) × (Height / 304) = Area in Sq.Ft`
  - Automatic line pricing: `Area in Sq.Ft × Rate (₹/Sq.Ft) × Quantity = Item Total`
- **Dynamic Material & Cascading Window Types**:
  - **Aluminium**:
    - 2 Track
    - 3 Track
    - Glazing (Fixed Glazing)
    - Partition
  - **UPVC**:
    - 2 Track (2 Shutter)
    - 2 Track (4 Shutter)
    - 3 Track (2 Shutter)
    - 3 Track (3 Shutter)
    - 3 Track (4 Shutter)
    - Openable (Casement Window)
    - French Door
- **Multi-Item & Batch Sizing**:
  - Add unlimited openings/windows with custom sizes.
  - Quick **Quantity Counter** (`-` / `+`) to increase count of identical windows without recreating them.
  - 1-Click **Duplicate Item** button.
- **Architectural Elevation & Diagram Visualizer**:
  - Live technical architectural schematic drawing showing tracks, sashes, swing lines, and dimension annotations (`W mm × H mm`).
- **Downloadable PDF & Vector Print**:
  - Professional 2-Column quotation layout:
    - **Column 1**: Window Elevation & Dimension drawing.
    - **Column 2**: Specification details, area breakdown, rate, quantity, and total.
  - Financial summary: Subtotal, GST (18%), installation, transportation, discount, and Grand Total (in numbers and Indian currency words).
  - Standard Terms & Conditions, Bank Wire RTGS details, and Signatory block.
  - 1-Click **Download PDF** button powered by `jsPDF` & `html2canvas`.
- **Minimal ERP / Management Software UI**:
  - Clean, slate neutral styling with monospace tabular data.
  - Free from generic AI gradients; built to look like dedicated industrial fabrication management software.
  - Fully responsive across mobile, tablet, and desktop screens.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```
Build files will be generated in the `dist/` directory.

---

## 📐 Formula Reference

$$\text{Area (sq.ft)} = \left(\frac{\text{Width (mm)}}{304}\right) \times \left(\frac{\text{Height (mm)}}{304}\right)$$

$$\text{Line Item Total} = \text{Area (sq.ft)} \times \text{Rate per sq.ft} \times \text{Quantity}$$

