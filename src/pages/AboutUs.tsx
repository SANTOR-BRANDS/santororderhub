import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('about.backToHome')}
          </Button>
        </Link>

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-santor rounded-full flex items-center justify-center">
              {/* Image Replacement: Using the <img> tag */}
              <img 
                src="/images/SAN-LOGO-003.png" // Path relative to the public folder
                alt="Santor Logo" 
                className="w-full h-full object-contain p-4" // Styling to fit the circular container
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">{t('about.title')}</h1>
            <p className="text-xl text-muted-foreground italic">
              {t('about.quote')}
            </p>
          </div>

          {/* Story Section */}
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground leading-relaxed mb-6">
              {t('about.paragraph1')}
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              {t('about.paragraph2')} <em>{t('about.paragraph2Quote')}</em>
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              {t('about.paragraph3')}
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              {t('about.paragraph4')}
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              {t('about.paragraph5')}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
