export type MaterialType = 'Aluminium' | 'UPVC';

export type AluminiumWindowType = 
  | '2 Track'
  | '3 Track'
  | 'Glazing'
  | 'Partition';

export type UPVCWindowType = 
  | '2 Track (2 Shutter)'
  | '2 Track (4 Shutter)'
  | '3 Track (2 Shutter)'
  | '3 Track (3 Shutter)'
  | '3 Track (4 Shutter)'
  | 'Openable'
  | 'French Door';

export type WindowType = AluminiumWindowType | UPVCWindowType;

export interface QuotationItem {
  id: string;
  itemCode: string;
  locationLabel: string; // e.g. "Living Room North", "Master Bed W1"
  material: MaterialType;
  windowType: WindowType;
  widthMm: number;
  heightMm: number;
  areaSqFt: number; // formula: (widthMm / 304) * (heightMm / 304)
  ratePerSqFt: number;
  quantity: number;
  itemTotal: number; // areaSqFt * ratePerSqFt * quantity
  
  // Customization specifications
  glassType: string;
  colorFinish: string;
  meshOption: string;
  hardwareGrade: string;
  customNotes?: string;
  customImageUrl?: string;
}

export interface ClientInfo {
  clientName: string;
  companyName?: string;
  phone: string;
  email: string;
  siteAddress: string;
  city: string;
  architectName?: string;
  referenceNo?: string;
}

export interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
}

export interface CompanyProfile {
  name: string;
  tagline: string;
  address: string;
  cityStateZip: string;
  phone: string;
  email: string;
  website?: string;
  bankDetails?: BankDetails;
}

export interface QuotationSummary {
  subtotal: number;
  totalSqFt: number;
  totalQuantity: number;
  discountPercentage: number;
  discountAmount: number;
  transportationCharge: number;
  installationCharge: number;
  grandTotal: number;
  taxPercentage?: number;
  taxAmount?: number;
}

export interface QuotationData {
  quotationNumber: string;
  date: string;
  validUntil: string;
  client: ClientInfo;
  items: QuotationItem[];
  summary: QuotationSummary;
  terms: string[];
  preRequisites: string[];
  divisionFactor: number; // 304 mm as requested
}
