/**
 * SEO Validation Utilities
 * Validates canonical URLs, meta tags, and schema.org structured data
 */

import { pageMetadata } from '@/seo/metadata';
import { 
  organizationSchema, 
  websiteSchema, 
  restorySchema, 
  nirvanaSchema, 
  mejaiSchema,
  faqSchema 
} from '@/seo/jsonld';

export interface SEOValidationResult {
  page: string;
  score: number;
  overallStatus: 'success' | 'warning' | 'error';
  canonical: {
    status: 'success' | 'warning' | 'error';
    expected: string;
    sitemapMatch: boolean;
    issues: string[];
  };
  metaTags: {
    status: 'success' | 'warning' | 'error';
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
    hasOgImage: boolean;
    issues: string[];
  };
  schema: {
    status: 'success' | 'warning' | 'error';
    types: string[];
    isValid: boolean;
    issues: string[];
  };
}

// Sitemap URLs for cross-reference
const sitemapUrls = [
  '/',
  '/about',
  '/faq',
  '/terms'
];

/**
 * Validate canonical URL for a page
 */
function validateCanonical(page: string): SEOValidationResult['canonical'] {
  const metadata = pageMetadata[page];
  const issues: string[] = [];
  
  if (!metadata?.canonical) {
    issues.push('No canonical URL defined in metadata');
    return {
      status: 'error',
      expected: '/',
      sitemapMatch: false,
      issues
    };
  }

  const canonical = metadata.canonical;
  const sitemapMatch = sitemapUrls.includes(canonical);

  if (!sitemapMatch) {
    issues.push(`Canonical URL "${canonical}" not found in sitemap.xml`);
  }

  // Check for URL fragments (not recommended for canonicals)
  if (canonical.includes('#')) {
    issues.push('Canonical URL contains fragment (#), which is not recommended');
  }

  const status = issues.length === 0 ? 'success' : issues.length === 1 ? 'warning' : 'error';

  return {
    status,
    expected: canonical,
    sitemapMatch,
    issues
  };
}

/**
 * Validate meta tags for a page
 */
function validateMetaTags(page: string): SEOValidationResult['metaTags'] {
  const metadata = pageMetadata[page];
  const issues: string[] = [];

  const title = metadata?.title || '';
  const description = metadata?.description || '';
  const titleLength = title.length;
  const descriptionLength = description.length;

  // Check title length (recommended: 50-60 chars)
  if (titleLength === 0) {
    issues.push('Title tag is missing');
  } else if (titleLength > 60) {
    issues.push(`Title is ${titleLength} chars (recommended max: 60)`);
  } else if (titleLength < 30) {
    issues.push(`Title is too short (${titleLength} chars, recommended min: 30)`);
  }

  // Check description length (recommended: 120-160 chars)
  if (descriptionLength === 0) {
    issues.push('Meta description is missing');
  } else if (descriptionLength > 160) {
    issues.push(`Description is ${descriptionLength} chars (recommended max: 160)`);
  } else if (descriptionLength < 70) {
    issues.push(`Description is too short (${descriptionLength} chars, recommended min: 70)`);
  }

  // Check OG image
  const hasOgImage = !!metadata?.ogImage;
  if (!hasOgImage) {
    issues.push('Open Graph image not specified');
  }

  const status = issues.length === 0 ? 'success' : issues.some(i => i.includes('missing')) ? 'error' : 'warning';

  return {
    status,
    title,
    titleLength,
    description,
    descriptionLength,
    hasOgImage,
    issues
  };
}

/**
 * Validate schema.org structured data
 */
function validateSchema(page: string): SEOValidationResult['schema'] {
  const issues: string[] = [];
  const types: string[] = [];

  // Get schemas for the page
  const schemas = getPageSchemas(page);
  
  if (schemas.length === 0) {
    issues.push('No structured data defined for this page');
    return {
      status: 'error',
      types: [],
      isValid: false,
      issues
    };
  }

  // Extract @type from each schema
  schemas.forEach(schema => {
    if (schema['@type']) {
      const type = Array.isArray(schema['@type']) ? schema['@type'].join(', ') : schema['@type'];
      types.push(type);
    }

    // Validate required fields
    if (!schema['@context']) {
      issues.push(`Schema missing @context field`);
    }

    // Validate Organization schema
    if (schema['@type'] === 'Organization') {
      if (!schema.name) issues.push('Organization schema missing name');
      if (!schema.url) issues.push('Organization schema missing url');
    }

    // Validate Restaurant schema
    if (schema['@type'] === 'Restaurant') {
      if (!schema.name) issues.push('Restaurant schema missing name');
      if (!schema.servesCuisine) issues.push('Restaurant schema missing servesCuisine');
      if (!schema.address) issues.push('Restaurant schema missing address');
    }

    // Validate FAQPage schema
    if (schema['@type'] === 'FAQPage') {
      if (!schema.mainEntity || schema.mainEntity.length === 0) {
        issues.push('FAQPage schema missing questions');
      }
    }
  });

  const isValid = issues.length === 0;
  const status = isValid ? 'success' : issues.some(i => i.includes('missing name') || i.includes('missing @context')) ? 'error' : 'warning';

  return {
    status,
    types,
    isValid,
    issues
  };
}

/**
 * Get schemas for a specific page
 */
function getPageSchemas(page: string): any[] {
  const schemas: any[] = [organizationSchema, websiteSchema];

  switch (page) {
    case 'home':
      schemas.push(restorySchema, nirvanaSchema, mejaiSchema);
      break;
    case 'faq':
      schemas.push(faqSchema);
      break;
    // Add more page-specific schemas as needed
  }

  return schemas;
}

/**
 * Calculate overall score for a page
 */
function calculateScore(result: Omit<SEOValidationResult, 'score' | 'overallStatus'>): number {
  let score = 100;
  
  // Canonical validation (30 points)
  if (result.canonical.status === 'error') score -= 30;
  else if (result.canonical.status === 'warning') score -= 15;
  
  // Meta tags validation (40 points)
  if (result.metaTags.status === 'error') score -= 40;
  else if (result.metaTags.status === 'warning') score -= 20;
  
  // Schema validation (30 points)
  if (result.schema.status === 'error') score -= 30;
  else if (result.schema.status === 'warning') score -= 15;

  return Math.max(0, score);
}

/**
 * Get overall status based on individual statuses
 */
function getOverallStatus(
  canonical: 'success' | 'warning' | 'error',
  metaTags: 'success' | 'warning' | 'error',
  schema: 'success' | 'warning' | 'error'
): 'success' | 'warning' | 'error' {
  if (canonical === 'error' || metaTags === 'error' || schema === 'error') {
    return 'error';
  }
  if (canonical === 'warning' || metaTags === 'warning' || schema === 'warning') {
    return 'warning';
  }
  return 'success';
}

/**
 * Validate SEO for a specific page
 */
export async function validateSEOPage(page: string): Promise<SEOValidationResult> {
  const canonical = validateCanonical(page);
  const metaTags = validateMetaTags(page);
  const schema = validateSchema(page);

  const result = {
    page,
    canonical,
    metaTags,
    schema,
  } as Omit<SEOValidationResult, 'score' | 'overallStatus'>;

  const score = calculateScore(result);
  const overallStatus = getOverallStatus(canonical.status, metaTags.status, schema.status);

  return {
    ...result,
    score,
    overallStatus
  };
}

/**
 * Validate SEO for all pages
 */
export async function validateAllPages(): Promise<Record<string, SEOValidationResult>> {
  const pages = ['home', 'aboutUs', 'faq', 'terms'];
  const results: Record<string, SEOValidationResult> = {};

  for (const page of pages) {
    results[page] = await validateSEOPage(page);
  }

  return results;
}
