import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { faqSchema, generateBreadcrumbSchema, faqBreadcrumb } from '@/seo/jsonld';

const FAQ = () => {
  const { t } = useLanguage();
  
  const faqMetadata = {
    ...getMetadata('faq'),
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        faqSchema,
        generateBreadcrumbSchema(faqBreadcrumb)
      ]
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <SEOHead metadata={faqMetadata} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('about.backToHome')}
          </Button>
        </Link>

        <div className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4 text-foreground">{t('faq.title')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('faq.comingSoon')}
          </p>
          <p className="text-muted-foreground mt-4">
            {t('faq.workingOn')}
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;