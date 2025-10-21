import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { generateBreadcrumbSchema, termsBreadcrumb } from '@/seo/jsonld';

const TermsOfService = () => {
  const { t } = useLanguage();
  
  const termsMetadata = {
    ...getMetadata('terms'),
    structuredData: generateBreadcrumbSchema(termsBreadcrumb)
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SEOHead metadata={termsMetadata} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('about.backToHome')}
          </Button>
        </Link>

        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-8 text-foreground">{t('terms.title')}</h1>
          
          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.acceptance.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.acceptance.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.service.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.service.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.orders.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.orders.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.delivery.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.delivery.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.safety.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.safety.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.cancellation.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.cancellation.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.ip.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.ip.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.liability.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.liability.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.changes.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.changes.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">{t('terms.contact.title')}</h2>
              <p className="text-muted-foreground">
                {t('terms.contact.content')}
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              {t('terms.lastUpdated')}
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;