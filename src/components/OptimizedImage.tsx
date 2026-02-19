import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackIcon?: string;
  sizes?: string;
}

/**
 * Generates responsive image srcset
 * Format: /images/RS-PKR-006-400.webp 400w, /images/RS-PKR-006-600.webp 600w, ...
 */
const generateSrcSet = (src: string): string | undefined => {
  // Only generate srcset for /images/ paths (not external URLs)
  if (!src.startsWith('/images/')) return undefined;
  
  const basePath = src.replace('.webp', '');
  return [
    `${basePath}-400.webp 400w`,
    `${basePath}-600.webp 600w`,
    `${basePath}-800.webp 800w`,
    `${basePath}.webp 1000w`,
  ].join(', ');
};

/**
 * Attempts to get a fallback image URL if the primary format fails
 * Tries: .webp → .png → .jpg
 */
const getFallbackSrc = (src: string): string | null => {
  if (src.endsWith('.webp')) {
    return src.replace('.webp', '.png');
  }
  if (src.endsWith('.png')) {
    return src.replace('.png', '.jpg');
  }
  return null;
};

const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  containerClassName,
  fallbackIcon = '🍽️',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // Generate srcset only once per src
  const srcSet = useMemo(() => generateSrcSet(currentSrc), [currentSrc]);

  const handleError = useCallback(() => {
    // Try fallback format if available and not already attempted
    if (!fallbackAttempted) {
      const fallback = getFallbackSrc(currentSrc);
      if (fallback && fallback !== currentSrc) {
        setCurrentSrc(fallback);
        setFallbackAttempted(true);
        return;
      }
    }
    // If no fallback or fallback also failed, show error state
    setHasError(true);
  }, [currentSrc, fallbackAttempted]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  if (hasError) {
    return (
      <div className={cn(
        'w-full h-full flex items-center justify-center bg-muted/30',
        containerClassName
      )}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-current/10 flex items-center justify-center" role="img" aria-label="Dish placeholder">
            {fallbackIcon}
          </div>
          <span className="text-xs text-muted-foreground">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full', containerClassName)}>
      {/* Skeleton placeholder - shows until image loads */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {/* Actual image with responsive srcset */}
      <img 
        src={currentSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default OptimizedImage;
