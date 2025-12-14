/**
 * Car Price Calculator
 * Converted from excel-lookup-engine.xlsx
 *
 * Logic:
 * 1. Look up car brand in reference table
 * 2. Apply 19% VAT/tax to base price
 */

// Lookup table (from 'cars' sheet)
const carPrices = {
  bmw: 100,
  mercedes: 544,
  audi: 535,
  vw: 324,
};

/**
 * Calculate car price with tax
 * @param {string} carBrand - The car brand to look up (bmw, mercedes, audi, vw)
 * @returns {object} - Object containing base price, tax, and total
 * @throws {Error} - If car brand is not found
 */
function calculateCarPrice(carBrand) {
  const brand = carBrand.toLowerCase();

  // VLOOKUP equivalent - exact match (FALSE parameter)
  const basePrice = carPrices[brand];

  if (basePrice === undefined) {
    throw new Error(`Car brand "${carBrand}" not found. Available: ${Object.keys(carPrices).join(', ')}`);
  }

  // Tax calculation: price * 1.19 (19% VAT)
  const taxRate = 0.19;
  const taxAmount = basePrice * taxRate;
  const totalPrice = basePrice * (1 + taxRate);

  return {
    brand: brand,
    basePrice: basePrice,
    taxRate: taxRate,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalPrice: Math.round(totalPrice * 100) / 100,
  };
}

// Example usage
console.log('Car Price Calculator');
console.log('====================\n');

// Test with "audi" (same as Excel example)
const result = calculateCarPrice('audi');
console.log(`Brand: ${result.brand}`);
console.log(`Base Price: ${result.basePrice}`);
console.log(`Tax (19%): ${result.taxAmount}`);
console.log(`Total Price: ${result.totalPrice}`);

console.log('\n--- All Cars ---\n');

// Calculate for all cars
for (const brand of Object.keys(carPrices)) {
  const r = calculateCarPrice(brand);
  console.log(`${r.brand}: ${r.basePrice} + ${r.taxAmount} tax = ${r.totalPrice}`);
}

module.exports = { calculateCarPrice, carPrices };
