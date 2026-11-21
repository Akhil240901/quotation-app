export const DEFAULT_DIVISION_FACTOR = 304; // User specified: (width/304 * height/304)

/**
 * Calculates area in square feet given width and height in mm
 * Formula specified by user: (width / 304) * (height / 304)
 */
export function calculateAreaInSqFt(
  widthMm: number,
  heightMm: number,
  divisionFactor: number = DEFAULT_DIVISION_FACTOR
): number {
  if (!widthMm || !heightMm || widthMm <= 0 || heightMm <= 0) return 0;
  const area = (widthMm / divisionFactor) * (heightMm / divisionFactor);
  return Number(area.toFixed(2));
}

/**
 * Calculates total price for a single quotation item
 */
export function calculateItemTotal(
  areaSqFt: number,
  ratePerSqFt: number,
  quantity: number
): number {
  if (areaSqFt <= 0 || ratePerSqFt <= 0 || quantity <= 0) return 0;
  const total = areaSqFt * ratePerSqFt * quantity;
  return Number(total.toFixed(2));
}

/**
 * Formats a number to Indian Rupees format (e.g. ₹ 1,45,200.00)
 */
export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a numeric amount to Indian Currency Words
 * e.g., 45200 -> "Rupees Forty Five Thousand Two Hundred Only"
 */
export function numberToWords(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 0) return 'Rupees Zero Only';

  const singleDigits = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];

  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  function convertTwoDigits(n: number): string {
    if (n < 20) return singleDigits[n];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit !== 0 ? ' ' + singleDigits[unit] : '');
  }

  function convertThreeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let res = '';
    if (hundred > 0) {
      res += singleDigits[hundred] + ' Hundred';
      if (rest > 0) res += ' and ';
    }
    if (rest > 0) {
      res += convertTwoDigits(rest);
    }
    return res;
  }

  // Indian Numbering System: Crores, Lakhs, Thousands, Hundreds
  let num = rounded;
  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  const hundred = num % 1000;

  let words = 'Rupees ';

  if (crore > 0) {
    words += convertThreeDigits(crore) + ' Crore ';
  }
  if (lakh > 0) {
    words += convertThreeDigits(lakh) + ' Lakh ';
  }
  if (thousand > 0) {
    words += convertThreeDigits(thousand) + ' Thousand ';
  }
  if (hundred > 0) {
    words += convertThreeDigits(hundred) + ' ';
  }

  return words.trim() + ' Only';
}

