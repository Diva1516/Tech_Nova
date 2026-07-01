/**
 * Formats a number into Indian Rupee (INR) format.
 * Example: 144900 -> ₹1,44,900
 * @param {number} amount - The price amount to format
 * @returns {string} - Formatted currency string
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
export default formatPrice;
