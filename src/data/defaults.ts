import {
  MaterialType,
  AluminiumWindowType,
  UPVCWindowType,
  CompanyProfile,
  ClientInfo,
  QuotationItem
} from '../types/quotation';

export const MATERIAL_OPTIONS: MaterialType[] = ['Aluminium', 'UPVC'];

export const ALUMINIUM_WINDOW_TYPES: AluminiumWindowType[] = [
  '2 Track',
  '3 Track',
  'Glazing',
  'Partition'
];

export const UPVC_WINDOW_TYPES: UPVCWindowType[] = [
  '2 Track (2 Shutter)',
  '2 Track (4 Shutter)',
  '3 Track (2 Shutter)',
  '3 Track (3 Shutter)',
  '3 Track (4 Shutter)',
  'Openable',
  'French Door',
  'Ventilation'
];

export const DEFAULT_RATES: Record<string, number> = {
  // Aluminium
  'Aluminium:2 Track': 380,
  'Aluminium:3 Track': 450,
  'Aluminium:Glazing': 320,
  'Aluminium:Partition': 350,

  // UPVC
  'UPVC:2 Track (2 Shutter)': 480,
  'UPVC:2 Track (4 Shutter)': 520,
  'UPVC:3 Track (2 Shutter)': 560,
  'UPVC:3 Track (3 Shutter)': 620,
  'UPVC:3 Track (4 Shutter)': 650,
  'UPVC:Openable': 580,
  'UPVC:French Door': 680,
  'UPVC:Ventilation': 420,
};

export const GLASS_OPTIONS = [
  '5mm Clear Float Glass',
  '5mm Toughened Glass',
  '6mm Clear Toughened Glass',
  '5mm Frosted / Pinhead Glass',
  '6mm Tinted (Euro Grey / Bronze)',
  'Double Glazed (5mm + 12A + 5mm) Toughened',
  'Laminated Safety Glass (4+0.76+4mm)'
];

export const FINISH_OPTIONS = [
  'Pure White (RAL 9016)',
  'Anthracite Grey (RAL 7016)',
  'Jet Black (RAL 9005)',
  'Golden Oak Woodgrain',
  'Dark Walnut Woodgrain',
  'Champagne / Bronze Anodized',
  'Silver Anodized (Natural)'
];

export const MESH_OPTIONS = [
  'No Mosquito Mesh',
  'SS 304 High-Tensile Mesh',
  'Fiberglass Mesh (Charcoal)',
  'Pet Resistant Heavy Mesh'
];

export const DEFAULT_COMPANY: CompanyProfile = {
  name: 'SHRI ASHTVINAYAK UPVC',
  tagline: 'UPVC & Architectural Aluminium Solutions',
  address: 'Balaji Nagar, At Post Sawari',
  cityStateZip: 'Tah. & Dist. Gondia, Maharashtra - 441601',
  phone: '+91 9307506947',
  email: 'bhagatnikhil329@gmail.com',
  website: '',

};

export const DEFAULT_CLIENT: ClientInfo = {
  clientName: 'Er. Rajesh Kumar Sharma',
  companyName: 'Residential Villa Project',
  phone: '+91 98450 11223',
  email: 'rajesh.sharma@example.com',
  siteAddress: 'Gondia Site Location',
  city: 'Gondia',
  architectName: 'Studio Matrix Architects',
  referenceNo: 'SB-2026-Q1'
};

export const DEFAULT_TERMS: string[] = [
  'Payments terms: (a) 100% Advance along with order, if it is less than Rs. 1,00,000. (b) 50% advance along with order, 50% before delivery, if it is more than Rs. 1,00,000.',
  'Validation of quote 30 days, total execution of project should be completed latest by 3-months.',
  'P.O & Payments should be made in the name of Shri Ram Glass.',
  'The prices are based on the sizes provided by the customer. The prices are valid for variation in sizes up to +/- 30mm per window provided the design and style of product remains unchanged. The customer will be charged on pro-rate basis for difference between the actual sizes and given sizes, if any, beyond the above variation.',
  'After handovering the windows, cleaning not our scope.',
  'Windows security tape should be removed while installing windows freely. After installation security tape removed by us shall be chargeable per window Rs. 100.',
  'If any other commitments given by our sales team, before placing order please call us. Cell : +91 9923346516',
  'After handovering windows, if any service required related to windows & doors, that shall be chargeable. Per visit - Rs. 350.',
  'Material unloading & storage should be client\'s scope.',
  'All disputes shall be subject to Gondia jurisdiction only.'
];

export const DEFAULT_PRE_REQUISITES: string[] = [
  'Walls should be plastered from inside and outside, with inside POP complete.',
  'All jams, sills and soffits should be plastered.',
  'Flooring (where doors have to be installed) should be complete.',
  'Aperture should be smooth.',
  'Base and top of window should be water leveled and sides should be in vertical plumb.',
  'Sill width should be more than the window width.',
  'Opening should be accessible from inside for installation.',
  'Grills: Adequate care should be taken if grills have to be installed. (a) For Horizontal slider Window: Grill should be provided on outer face of slider before installation of window. (b) For Casement windows: Screw type grill is recommended after installation of casement window.',
  'Installation should happen before the last coat of paint. At least one coat of paint should be done before installation begins.',
  'Scaffoldings / bracing should not interrupt the window openings where windows are supposed to be installed.'
];


