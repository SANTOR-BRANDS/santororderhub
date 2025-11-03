/**
 * Restaurant Structured Data for SANTOR brands
 * https://schema.org/Restaurant
 */

const baseRestaurantData = {
  "@context": "https://schema.org",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TH",
    "addressLocality": "Bangkok",
    "addressRegion": "Bang Bo, ABAC area"
  },
  "servesCuisine": "Thai",
  "priceRange": "฿฿",
  "acceptsReservations": "False",
  "currenciesAccepted": "THB",
  "areaServed": ["ABAC", "Bang Bo", "Bangkok"]
};

export const restorySchema = {
  ...baseRestaurantData,
  "@type": "Restaurant",
  "name": "Restory",
  "description": "Asian Fusion restaurant serving cooked-to-order Thai dishes with modern twists",
  "url": "https://www.santorbrands.com",
  "servesCuisine": ["Thai", "Asian Fusion"],
  "menu": "https://www.santorbrands.com/#restory"
};

export const nirvanaSchema = {
  ...baseRestaurantData,
  "@type": "Restaurant",
  "name": "Nirvana",
  "description": "Authentic Thai restaurant specializing in traditional flavors and grilled dishes",
  "url": "https://www.santorbrands.com",
  "servesCuisine": "Thai",
  "menu": "https://www.santorbrands.com/#nirvana"
};

export const mejaiSchema = {
  ...baseRestaurantData,
  "@type": "Restaurant",
  "name": "Mejai Hai Yum",
  "description": "Fresh salmon specialties and authentic Thai yum dishes",
  "url": "https://www.santorbrands.com",
  "servesCuisine": ["Thai", "Seafood"],
  "menu": "https://www.santorbrands.com/#mejai"
};
