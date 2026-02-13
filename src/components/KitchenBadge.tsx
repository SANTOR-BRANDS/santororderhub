import { useState } from 'react';
import { Restaurant } from '@/types/menu';
import { getRestaurantInfo } from '@/lib/unifiedMenu';
import { cn } from '@/lib/utils';

interface KitchenBadgeProps {
  restaurant: Restaurant;
  size?: 'sm' | 'md';
  showName?: boolean;
  className?: string;
}

const KitchenBadge = ({ 
  restaurant, 
  size = 'sm', 
  showName = false,
  className 
}: KitchenBadgeProps) => {
  const info = getRestaurantInfo(restaurant);
  const [imgError, setImgError] = useState(false);
  
  return (
    <div 
      className={cn(
        'flex items-center gap-1',
        className
      )}
    >
      {imgError ? (
        <span className={cn(
          'flex items-center justify-center rounded-full bg-white/20 text-[8px] font-bold text-white',
          size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
        )}>
          {info.name.charAt(0)}
        </span>
      ) : (
        <img 
          src={info.logo}
          alt={info.name}
          onError={() => setImgError(true)}
          className={cn(
            'rounded-full object-cover',
            size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
          )}
        />
      )}
      {showName && (
        <span className={cn(
          'text-white font-medium',
          size === 'sm' ? 'text-[10px]' : 'text-xs'
        )}>
          {info.name}
        </span>
      )}
    </div>
  );
};

export default KitchenBadge;
