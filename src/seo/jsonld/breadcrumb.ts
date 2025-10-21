/**
 * Breadcrumb Structured Data Generator
 * https://schema.org/BreadcrumbList
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = 'https://santororderhub.vercel.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  };
}

// Common breadcrumb patterns
export const homeBreadcrumb: BreadcrumbItem[] = [
  { name: "Home", url: "/" }
];

export const aboutBreadcrumb: BreadcrumbItem[] = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" }
];

export const faqBreadcrumb: BreadcrumbItem[] = [
  { name: "Home", url: "/" },
  { name: "FAQ", url: "/faq" }
];

export const termsBreadcrumb: BreadcrumbItem[] = [
  { name: "Home", url: "/" },
  { name: "Terms of Service", url: "/terms-of-service" }
];
