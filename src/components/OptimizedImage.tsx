import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackIcon?: string;
}

const OptimizedImage = ({ 
  src, 
  alt, 
  className,
  containerClassName,
  fallbackIcon = '🍽️'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

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
      
      {/* Actual image */}
      <img 
        src={src} 
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error('Image failed to load:', src, e);
          
          // Special handling for Smoody images
          if (src.includes('/images/SM-')) {
            console.log('Smoody image failed, attempting retry...');
            // Retry the same image after a short delay
            setTimeout(() => {
              const img = e.currentTarget;
              const retrySrc = src + '?retry=' + Date.now();
              console.log('Retrying Smoody image with:', retrySrc);
              img.src = retrySrc;
            }, 1000);
            return; // Don't set error state immediately
          }
          
          setHasError(true);
        }}
      />
    </div>
  );
};

export default OptimizedImage;
