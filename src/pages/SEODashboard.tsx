import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { validateSEOPage, type SEOValidationResult } from '@/lib/seoValidation';
import { pageMetadata } from '@/seo/metadata';
import { SEOHead } from '@/seo/components/SEOHead';

const SEODashboard = () => {
  const [validationResults, setValidationResults] = useState<Record<string, SEOValidationResult>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAllPages = async () => {
      const results: Record<string, SEOValidationResult> = {};
      const pages = ['home', 'aboutUs', 'faq', 'terms'];

      for (const page of pages) {
        results[page] = await validateSEOPage(page);
      }

      setValidationResults(results);
      setLoading(false);
    };

    validateAllPages();
  }, []);

  const getStatusIcon = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusBadge = (status: 'success' | 'warning' | 'error') => {
    const variants = {
      success: 'default',
      warning: 'secondary',
      error: 'destructive',
    } as const;
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const dashboardMetadata = {
    title: 'SEO Dashboard - SANTOR',
    description: 'Monitor SEO health, canonical URLs, meta tags, and schema validation',
    canonical: '/seo-dashboard',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <SEOHead metadata={dashboardMetadata} />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">SEO Dashboard</h1>
          <p className="text-muted-foreground">Loading SEO validation data...</p>
        </div>
      </div>
    );
  }

  const overallScore = Object.values(validationResults).reduce((acc, result) => {
    return acc + result.score;
  }, 0) / Object.keys(validationResults).length;

  return (
    <div className="min-h-screen bg-background p-8">
      <SEOHead metadata={dashboardMetadata} />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">SEO Dashboard</h1>
            <p className="text-muted-foreground mt-2">Monitor canonical URLs, meta tags, and schema validation</p>
          </div>
          <Card className="w-48">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">Overall Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{Math.round(overallScore)}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="canonicals">Canonicals</TabsTrigger>
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(validationResults).map(([page, result]) => (
                <Card key={page}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="capitalize">{page === 'home' ? 'Home' : page.replace(/([A-Z])/g, ' $1').trim()}</span>
                      {getStatusIcon(result.overallStatus)}
                    </CardTitle>
                    <CardDescription>Score: {result.score}%</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Canonical</span>
                        {getStatusBadge(result.canonical.status)}
                      </div>
                      <div className="flex justify-between">
                        <span>Meta Tags</span>
                        {getStatusBadge(result.metaTags.status)}
                      </div>
                      <div className="flex justify-between">
                        <span>Schema</span>
                        {getStatusBadge(result.schema.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="canonicals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Canonical URL Validation</CardTitle>
                <CardDescription>Ensure canonical tags are properly set and consistent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(validationResults).map(([page, result]) => (
                    <div key={page} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold capitalize flex items-center gap-2">
                          {page === 'home' ? 'Home' : page.replace(/([A-Z])/g, ' $1').trim()}
                          {getStatusIcon(result.canonical.status)}
                        </h3>
                        {getStatusBadge(result.canonical.status)}
                      </div>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="text-muted-foreground">Expected: </span>
                          <code className="bg-muted px-2 py-1 rounded text-xs">
                            https://www.santorbrands.com{result.canonical.expected}
                          </code>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Sitemap: </span>
                          <code className="bg-muted px-2 py-1 rounded text-xs">
                            {result.canonical.sitemapMatch ? '✓ Match' : '✗ Mismatch'}
                          </code>
                        </div>
                        {result.canonical.issues.length > 0 && (
                          <div className="mt-2 p-3 bg-destructive/10 rounded-md">
                            <ul className="list-disc list-inside space-y-1 text-destructive">
                              {result.canonical.issues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meta" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags Validation</CardTitle>
                <CardDescription>Check title tags, descriptions, and Open Graph metadata</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(validationResults).map(([page, result]) => (
                    <div key={page} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold capitalize flex items-center gap-2">
                          {page === 'home' ? 'Home' : page.replace(/([A-Z])/g, ' $1').trim()}
                          {getStatusIcon(result.metaTags.status)}
                        </h3>
                        {getStatusBadge(result.metaTags.status)}
                      </div>
                      <div className="space-y-3 text-sm">
                        <div className="grid gap-2">
                          <div className="flex items-start gap-2">
                            <span className="text-muted-foreground min-w-24">Title:</span>
                            <div className="flex-1">
                              <code className="bg-muted px-2 py-1 rounded text-xs block">
                                {result.metaTags.title}
                              </code>
                              <span className="text-xs text-muted-foreground mt-1 block">
                                Length: {result.metaTags.titleLength} chars {result.metaTags.titleLength > 60 ? '⚠️ Too long' : '✓'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-muted-foreground min-w-24">Description:</span>
                            <div className="flex-1">
                              <code className="bg-muted px-2 py-1 rounded text-xs block">
                                {result.metaTags.description}
                              </code>
                              <span className="text-xs text-muted-foreground mt-1 block">
                                Length: {result.metaTags.descriptionLength} chars {result.metaTags.descriptionLength > 160 ? '⚠️ Too long' : '✓'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground min-w-24">OG Image:</span>
                            <span className={result.metaTags.hasOgImage ? 'text-success' : 'text-destructive'}>
                              {result.metaTags.hasOgImage ? '✓ Present' : '✗ Missing'}
                            </span>
                          </div>
                        </div>
                        {result.metaTags.issues.length > 0 && (
                          <div className="mt-2 p-3 bg-destructive/10 rounded-md">
                            <ul className="list-disc list-inside space-y-1 text-destructive">
                              {result.metaTags.issues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Schema.org Structured Data</CardTitle>
                <CardDescription>Validate JSON-LD structured data for search engines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(validationResults).map(([page, result]) => (
                    <div key={page} className="border-b border-border pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold capitalize flex items-center gap-2">
                          {page === 'home' ? 'Home' : page.replace(/([A-Z])/g, ' $1').trim()}
                          {getStatusIcon(result.schema.status)}
                        </h3>
                        {getStatusBadge(result.schema.status)}
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Schema Types: </span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {result.schema.types.map((type) => (
                              <Badge key={type} variant="outline">{type}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Valid: </span>
                          <span className={result.schema.isValid ? 'text-success' : 'text-destructive'}>
                            {result.schema.isValid ? '✓ Yes' : '✗ No'}
                          </span>
                        </div>
                        {result.schema.issues.length > 0 && (
                          <div className="mt-2 p-3 bg-destructive/10 rounded-md">
                            <ul className="list-disc list-inside space-y-1 text-destructive">
                              {result.schema.issues.map((issue, idx) => (
                                <li key={idx}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="mt-3">
                          <a
                            href={`https://validator.schema.org/#url=https://www.santorbrands.com${pageMetadata[page]?.canonical || '/'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Test in Schema Validator <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SEODashboard;
