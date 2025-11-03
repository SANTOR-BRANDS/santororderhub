/**
 * SEO Metadata Configuration
 * Central source of truth for all SEO-related metadata
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  ogType?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: Record<string, any>;
}

export const defaultMetadata: PageMetadata = {
  title: 'SANTOR - Best Thai Food Near ABAC & Bang Bo | Guimei Thai Restaurant',
  description: 'Best Thai food near ABAC and Bang Bo. Order from SANTOR\'s Guimei, Restory, and Nirvana restaurants. Authentic Thai cuisine, Asian fusion, fresh ingredients. Fast delivery to ABAC area.',
  keywords: [
    'guimei',
    'guimei abac',
    'guimei thai restaurant',
    'SANTOR',
    'SANTOR ABAC',
    'SANTOR Bang Bo',
    'Restory ABAC',
    'Restory Bang Bo',
    'Nirvana ABAC',
    'Nirvana Bang Bo',
    'best food near me',
    'best food in bang bo',
    'best food around abac',
    'best food abac',
    'Thai restaurant near ABAC',
    'Thai restaurant Bang Bo',
    'food delivery ABAC',
    'food delivery Bang Bo',
    'Thai food near me',
    'authentic Thai cuisine',
    'Asian fusion ABAC',
    'restaurant near ABAC',
    'restaurant Bang Bo'
  ],
  ogType: 'website',
  ogImage: '/share-card.jpeg',
  twitterCard: 'summary_large_image',
};

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    ...defaultMetadata,
    canonical: '/',
  },
  aboutUs: {
    title: 'About SANTOR - Our Story & Mission | SANTOR',
    description: 'Learn about SANTOR\'s journey to bring authentic Thai cuisine to your doorstep. Discover our commitment to quality, freshness, and traditional flavors.',
    canonical: '/about',
    keywords: [
      'SANTOR about',
      'Thai restaurant story',
      'SANTOR mission',
      'authentic Thai food',
      'restaurant history'
    ],
    ogType: 'website',
  },
  faq: {
    title: 'Frequently Asked Questions - SANTOR Help Center',
    description: 'Find answers to common questions about ordering, delivery, menu items, and more. Get help with your SANTOR food order.',
    canonical: '/faq',
    keywords: [
      'SANTOR FAQ',
      'food delivery questions',
      'order help',
      'Thai food questions',
      'delivery information'
    ],
    ogType: 'website',
  },
  terms: {
    title: 'Terms of Service - SANTOR',
    description: 'Read SANTOR\'s terms of service, including ordering policies, delivery terms, and usage guidelines.',
    canonical: '/terms',
    keywords: ['terms of service', 'SANTOR terms', 'legal'],
    ogType: 'website',
  },
};

export function getMetadata(pageKey: string): PageMetadata {
  return pageMetadata[pageKey] || defaultMetadata;
}

export function generateTitle(pageTitle: string, includeDefault = true): string {
  if (includeDefault && !pageTitle.includes('SANTOR')) {
    return `${pageTitle} | SANTOR`;
  }
  return pageTitle;
}
