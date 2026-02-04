import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBanner = () => {
  const { t } = useLanguage();
  
  const announcement = t('banner.announcement');
  
  return (
    <div className="bg-santor-primary text-santor-primary-foreground overflow-hidden py-1.5">
      <div className="animate-marquee flex whitespace-nowrap">
        {/* Two identical sets for seamless loop */}
        {[...Array(8)].map((_, i) => (
          <span 
            key={i} 
            className="text-xs sm:text-sm font-medium tracking-wide text-primary-foreground bg-primary font-mono mx-8"
          >
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;