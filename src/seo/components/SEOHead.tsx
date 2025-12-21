import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PageMetadata } from '../metadata';

interface SEOHeadProps {
  metadata: PageMetadata;
  children?: React.ReactNode;
}

export const SEOHead = ({ metadata, children }: SEOHeadProps) => {
  const location = useLocation();
  // Preferred canonical: https://santorbrands.com (no www, no trailing slash)
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://santorbrands.com';
  
  // Always use clean path without query parameters for canonical
  const cleanPath = metadata.canonical || location.pathname;
  // Remove trailing slash for consistency (except for root)
  const normalizedPath = cleanPath === '/' ? '' : cleanPath.replace(/\/$/, '');
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  
  // Check if current URL has query parameters (search, filters, etc.)
  const hasQueryParams = location.search.length > 0;
  
  const imageUrl = metadata.ogImage?.startsWith('http') 
    ? metadata.ogImage 
    : `${siteUrl}${metadata.ogImage || '/share-card.jpeg'}`;

  // Determine robots directive - noindex for parameter pages
  const robotsContent = hasQueryParams 
    ? 'noindex, follow' 
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords.join(', ')} />
      )}
      
      {/* Canonical URL - always clean without query params */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metadata.ogType || 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="SANTOR" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={metadata.twitterCard || 'summary_large_image'} />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={metadata.title} />
      <meta property="twitter:description" content={metadata.description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Robots - noindex for parameter pages, index for clean URLs */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={hasQueryParams ? 'noindex, follow' : 'index, follow'} />
      
      {/* Additional SEO Tags */}
      <meta name="language" content="th" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="SANTOR BRANDS" />
      
      {/* Structured Data */}
      {metadata.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(metadata.structuredData)}
        </script>
      )}
      
      {/* Additional custom head elements */}
      {children}
    </Helmet>
  );
};
