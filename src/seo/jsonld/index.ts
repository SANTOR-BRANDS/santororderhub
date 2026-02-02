/**
 * Central export for all JSON-LD structured data
 */

export { organizationSchema } from './organization';
export { websiteSchema } from './website';
export { restorySchema, nirvanaSchema, smoodySchema } from './restaurants';
export { faqSchema } from './faq';
export {
  generateBreadcrumbSchema,
  homeBreadcrumb,
  aboutBreadcrumb,
  faqBreadcrumb,
  termsBreadcrumb,
  type BreadcrumbItem
} from './breadcrumb';

// Combined schema for homepage
export const homePageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    // Import and spread the schemas
  ]
};
