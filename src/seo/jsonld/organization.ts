/**
 * Organization Structured Data for SANTOR
 * https://schema.org/Organization
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SANTOR BRANDS",
  "alternateName": "SANTOR",
  "url": "https://santororderhub.vercel.app",
  "logo": "https://santororderhub.vercel.app/images/SAN-LOGO-001.png",
  "description": "Authentic Thai cuisine and culinary experience. Home to Restory, Nirvana, and Mejai Hai Yum restaurants.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TH",
    "addressLocality": "Bangkok"
  },
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
