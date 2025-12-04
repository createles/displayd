function generatePrice(game) {
  // check for incomplete data; if so, use base price
  if (!game) return 19.99;

  // Check if game has indie tag
  const isIndie = game.genres?.some((genre) => genre.slug === "indie");
  
  // Set max price based on genre
  const maxPrice = isIndie ? 29.99 : 69.99;

  // We use Math.sin(game.id) to get a consistent number between -1 and 1,
  // then normalize it to create a "variance" (e.g., $0 to $10 off the max price).
  const seed = Math.sin(game.id) * 10000;
  const randomValue = seed - Math.floor(seed); // A "random" decimal 0.0 - 1.0
  
  // Let's say the base price can fluctuate down by up to $15 from the cap
  // e.g. An AAA game could start at $69.99, or $54.99 depending on its ID.
  let basePrice = maxPrice - (randomValue * 15);

  // 3. Calculate Depreciation
  const releaseYear = new Date(game.released || new Date()).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsOld = Math.max(0, currentYear - releaseYear);

  // Determine the drop rate per year
  // If rating is high (>= 4.5), value holds better (5% drop), otherwise 10% drop
  const dropRate = (game.rating || 0) >= 4.5 ? 0.05 : 0.10;

  // Apply the depreciation formula: Price * (1 - rate) ^ years
  let finalPrice = basePrice * Math.pow(1 - dropRate, yearsOld);

  // 4. Formatting and Clean up
  // Ensure the game never drops below a logical minimum (e.g. $1.99)
  finalPrice = Math.max(1.99, finalPrice);

  // Round to the nearest whole number and add .99 for that retail look
  finalPrice = Math.floor(finalPrice) + 0.99;

  // Return as string with 2 decimal places
  return finalPrice.toFixed(2);
}

export default generatePrice;