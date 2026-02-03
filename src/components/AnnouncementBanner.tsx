import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBanner = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-santor-primary text-santor-primary-foreground overflow-hidden py-1.5">
      <div className="animate-marquee whitespace-nowrap flex gap-16">
        {/* Duplicate content for seamless loop */}
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-xs sm:text-sm font-medium tracking-wide">
            🚚 {t('banner.announcement')} ✨
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
