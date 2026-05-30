import n2words from 'n2words';

/**
 * Regex for validating Indian GST Identification Number (GSTIN).
 */
export const GSTIN_REGEX = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}/;

/**
 * Standard GST rates in India.
 */
export const GST_RATES = [0, 5, 12, 18, 28] as const;

/**
 * Map of Indian states and Union Territories to their 2-digit GST codes.
 */
export const INDIAN_STATE_CODES: { [key: string]: string } = {
  '01': 'Jammu & Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Odisha',
  '22': 'Chhattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman & Diu',
  '26': 'Dadra & Nagar Haveli',
  '27': 'Maharashtra',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Andaman & Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh',
  '97': 'Other Territory',
};

/**
 * Calculates the CGST, SGST, and IGST amounts for a given transaction.
 * @param amount The taxable amount.
 * @param gstRate The total GST rate (e.g., 18 for 18%).
 * @param sellerStateCode The 2-digit GST state code of the seller.
 * @param placeOfSupply The 2-digit GST state code for the place of supply.
 * @returns An object containing the calculated cgst, sgst, and igst amounts.
 */
export function calculateGST(
  amount: number,
  gstRate: number,
  sellerStateCode: string,
  placeOfSupply: string
): { cgst: number; sgst: number; igst: number } {
  const isIntraState = sellerStateCode === placeOfSupply;
  const totalGstAmount = (amount * gstRate) / 100;

  if (isIntraState) {
    return {
      cgst: totalGstAmount / 2,
      sgst: totalGstAmount / 2,
      igst: 0,
    };
  }

  return {
    cgst: 0,
    sgst: 0,
    igst: totalGstAmount,
  };
}

/**
 * Formats a number into the Indian currency system (lakhs, crores).
 * @param amount The number to format.
 * @returns A string representation of the number in Indian format (e.g., "1,00,000").
 */
export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Converts a number into its currency word representation in English (India).
 * e.g., 2000 -> "Rupees Two Thousand Only"
 * @param amount The number to convert.
 * @returns The amount in words.
 */
export function amountInWords(amount: number): string {
  const words = n2words(amount, { lang: 'en-IN' });
  const capitalizedWords = words.charAt(0).toUpperCase() + words.slice(1);
  return `Rupees ${capitalizedWords} Only`;
}