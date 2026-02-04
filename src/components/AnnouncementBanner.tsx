import { useLanguage } from '@/contexts/LanguageContext';

const AnnouncementBanner = () => {
  const { t } = useLanguage();
  
  const announcement = t('banner.announcement');

  const items = Array.from({ length: 6 }).map((_, i) => (
    <span
      key={i}
      className="text-xs sm:text-sm font-medium tracking-wide text-primary-foreground bg-primary font-mono px-1"
    >
      {announcement}
    </span>
  ));
  
  return (
    <div className="bg-santor-primary text-santor-primary-foreground overflow-hidden py-1.5">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {/* Two identical groups + same trailing gap => seamless loop */}
        <div className="flex items-center gap-16 pr-16 whitespace-nowrap">{items}</div>
        <div className="flex items-center gap-16 pr-16 whitespace-nowrap" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;