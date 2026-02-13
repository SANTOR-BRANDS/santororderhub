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
      <div
        className={cn(
          'rounded-full p-[1px] bg-gradient-to-br from-white/60 via-white/20 to-black/20 shadow-[0_1px_3px_rgba(0,0,0,0.25)]',
          size === 'sm' ? 'w-6 h-6' : 'w-7 h-7'
        )}
      >
        {imgError ? (
          <span className={cn(
            'flex h-full w-full items-center justify-center rounded-full bg-white/20 text-[8px] font-bold text-white',
            size === 'sm' ? 'text-[8px]' : 'text-[9px]'
          )}>
            {info.name.charAt(0)}
          </span>
        ) : (
          <img 
            src={info.logo}
            alt={info.name}
            onError={() => setImgError(true)}
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </div>
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
