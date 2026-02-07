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
  
  return (
    <div 
      className={cn(
        'flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full',
        size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1',
        className
      )}
    >
      <img 
        src={info.logo}
        alt={info.name}
        className={cn(
          'rounded-full object-cover',
          size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'
        )}
      />
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
