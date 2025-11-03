/**
 * Organization Structured Data for SANTOR
 * https://schema.org/Organization
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SANTOR BRANDS",
  "alternateName": ["SANTOR", "Guimei", "Guimei ABAC"],
  "url": "https://www.santorbrands.com",
  "logo": "https://www.santorbrands.com/images/SAN-LOGO-001.svg",
  "description": "Best Thai food near ABAC and Bang Bo. Authentic Thai cuisine and Asian fusion restaurant group featuring Guimei, Restory, Nirvana, and Mejai Hai Yum.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TH",
    "addressLocality": "Bangkok",
    "addressRegion": "Bang Bo, ABAC area"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Bangkok"
    },
    {
      "@type": "Place",
      "name": "ABAC"
    },
    {
      "@type": "Place",
      "name": "Bang Bo"
    }
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["en", "th"]
    }
  ],
  "sameAs": [
    "https://www.instagram.com/santorbrands",
    "https://lin.ee/8kHDCU2"
  ],
  "foundingDate": "2024",
  "slogan": "We believe good food is the foundation of happiness"
};
