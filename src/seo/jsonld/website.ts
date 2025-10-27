/**
 * Website Structured Data for SANTOR
 * https://schema.org/WebSite
 */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SANTOR Order Hub",
  "alternateName": "SANTOR",
  "url": "https://www.santorbrands.com",
  "description": "Online ordering platform for SANTOR restaurants: Restory, Nirvana, and Mejai Hai Yum",
  "inLanguage": ["en", "th"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.santorbrands.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};
