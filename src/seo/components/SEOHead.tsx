import { Helmet } from 'react-helmet-async';
import { PageMetadata } from '../metadata';

interface SEOHeadProps {
  metadata: PageMetadata;
  children?: React.ReactNode;
}

export const SEOHead = ({ metadata, children }: SEOHeadProps) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://www.santorbrands.com';
  const canonicalUrl = metadata.canonical 
    ? `${siteUrl}${metadata.canonical}` 
    : siteUrl;
  const imageUrl = metadata.ogImage?.startsWith('http') 
    ? metadata.ogImage 
    : `${siteUrl}${metadata.ogImage || '/share-card.jpeg'}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metadata.title}</title>
      <meta name="title" content={metadata.title} />
      <meta name="description" content={metadata.description} />
      {metadata.keywords && (
        <meta name="keywords" content={metadata.keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
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
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
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
