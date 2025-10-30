import { useState, useEffect, useRef } from 'react';

interface LazyMapProps {
  src: string;
  title: string;
  className?: string;
}

const LazyMap = ({ src, title, className = '' }: LazyMapProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before it comes into view
      }
    );

    observer.observe(mapRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={mapRef} className={className}>
      {shouldLoad ? (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        />
      ) : (
        <div className="w-full h-full bg-muted animate-pulse flex items-center justify-center text-muted-foreground text-sm">
          Loading map...
        </div>
      )}
    </div>
  );
};

export default LazyMap;
