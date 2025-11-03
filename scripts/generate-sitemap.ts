/**
 * Generate sitemap.xml for SEO
 * Run this at build time to create a sitemap with all routes
 */

interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const baseUrl = 'https://www.santorbrands.com';

const routes: SitemapEntry[] = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/faq',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/terms',
    changefreq: 'yearly',
    priority: 0.5,
  },
];

function generateSitemap(): string {
  const lastmod = new Date().toISOString().split('T')[0];
  
  const urlElements = routes.map(route => {
    const loc = `${baseUrl}${route.url}`;
    const urlContent = `
  <url>
    <loc>${loc}</loc>
    <lastmod>${route.lastmod || lastmod}</lastmod>
    <changefreq>${route.changefreq || 'monthly'}</changefreq>
    <priority>${route.priority || 0.5}</priority>
  </url>`;
    return urlContent;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Generate and write sitemap
const sitemap = generateSitemap();

// For Deno/Node
if (typeof Deno !== 'undefined') {
  Deno.writeTextFileSync('public/sitemap.xml', sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');
} else if (typeof require !== 'undefined') {
  const fs = require('fs');
  const path = require('path');
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated at public/sitemap.xml');
}

export { generateSitemap };
