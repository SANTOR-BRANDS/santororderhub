import { useState, useEffect } from 'react';
import { Dish } from '@/types/menu';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ShoppingCart, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import KitchenBadge from './KitchenBadge';
import OptimizedImage from './OptimizedImage';
interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}
const DishCard = ({
  dish,
  onClick
}: DishCardProps) => {
  const {
    t
  } = useLanguage();
  const isUnavailable = dish.isAvailable === false;
  const translated = t(dish.id);
  const dishName = !translated || translated === dish.id ? dish.name : translated;
  
  // Preload Smoody images for mobile devices
  useEffect(() => {
    if (dish.restaurant === 'smoody' && dish.image) {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|IEMobile/.test(navigator.userAgent);
      if (isMobile) {
        console.log('Preloading Smoody image for mobile:', dish.image);
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image/webp';
        link.href = dish.image;
        document.head.appendChild(link);
        
        return () => {
          document.head.removeChild(link);
        };
      }
    }
  }, [dish.id, dish.restaurant, dish.image]);
  return <article className={cn('transition-smooth backdrop-blur-sm relative rounded-lg border', !isUnavailable && 'cursor-pointer hover:shadow-card hover:-translate-y-1', !isUnavailable && (dish.restaurant === 'restory' ? 'bg-nirvana-secondary text-white hover:border-restory/30 border-gray-700' : dish.restaurant === 'smoody' ? 'bg-smoody-background hover:border-smoody-primary/50 border-smoody-accent/30' : 'bg-nirvana-primary hover:border-nirvana-accent/30 border-border/50'), isUnavailable && 'opacity-60 cursor-not-allowed', dish.restaurant === 'nirvana' && 'bg-nirvana-primary border-border/50', dish.restaurant === 'restory' && 'bg-nirvana-secondary text-white border-gray-700', dish.restaurant === 'smoody' && 'bg-smoody-background border-smoody-accent/30')} onClick={() => !isUnavailable && onClick(dish)}>
      <CardContent className="p-0">
        {/* Dish Image */}
        <div className="w-full aspect-square rounded-t-lg overflow-hidden relative">
          {isUnavailable ? <div className={cn('w-full h-full flex items-center justify-center', dish.restaurant === 'restory' ? 'bg-restory/10' : dish.restaurant === 'smoody' ? 'bg-smoody-accent/20' : 'bg-nirvana-accent/10')}>
              <div className="text-center p-6">
                <div className="text-4xl mb-3" role="img" aria-label="Unavailable">🚫</div>
                <div className={cn('text-sm font-semibold', dish.restaurant === 'restory' ? 'text-restory' : dish.restaurant === 'smoody' ? 'text-smoody-primary' : 'text-nirvana-accent')}>
                  Currently Unavailable
                </div>
              </div>
            </div> : dish.image ? <OptimizedImage src={dish.image} alt={`${dish.name} - ${dish.category} dish`} className="hover:scale-105 transition-smooth" containerClassName={cn(dish.restaurant === 'restory' ? 'bg-restory/10' : dish.restaurant === 'smoody' ? 'bg-smoody-accent/20' : 'bg-nirvana-accent/10')} /> : <div className={cn('w-full h-full flex items-center justify-center text-muted-foreground', dish.restaurant === 'restory' ? 'bg-restory/10' : dish.restaurant === 'smoody' ? 'bg-smoody-accent/20' : 'bg-nirvana-accent/10')}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-current/10 flex items-center justify-center" role="img" aria-label="Dish placeholder">
                  🍽️
                </div>
                <span className="text-xs">No Image</span>
              </div>
            </div>}
          
          {/* Kitchen Badge - shows which restaurant the dish is from */}
          {!isUnavailable && <div className="absolute top-2 left-2">
              <KitchenBadge restaurant={dish.restaurant} size="sm" />
            </div>}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className={cn('font-semibold text-sm leading-tight', dish.restaurant === 'smoody' ? 'text-black' : 'text-white', dish.isSpecial && 'text-amber-600 font-bold')}>
              {dishName}
            </h3>
            <div className="flex items-center gap-1.5">
              {/* Show original price crossed out for promo items */}
              {dish.id === 'SM-GRK-003' && <span className="text-xs line-through text-center text-red-600 font-medium">฿69</span>}
              <span className={cn('font-bold text-lg whitespace-nowrap', dish.restaurant === 'restory' ? 'text-restory' : dish.restaurant === 'smoody' ? 'text-smoody-secondary' : 'text-nirvana-accent')}>
                ฿{dish.price}
              </span>
            </div>
          </div>
          
          {/* Promo badge for discounted items */}
          {dish.id === 'SM-GRK-003' && <div className="mb-2">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/90 text-white">
                🔥 PROMO
              </span>
            </div>}
          
          {/* Description only shown in DishModal, not on cards */}

          <div className="flex items-center justify-between">
            <span className={cn('text-xs px-2 py-1 rounded-full font-semibold', dish.restaurant === 'restory' ? 'bg-restory/10 text-restory-secondary' : dish.restaurant === 'smoody' ? 'bg-smoody-secondary/20 text-smoody-secondary' : 'bg-nirvana-accent/10 text-nirvana-accent')}>
              {dish.category}
            </span>
            
            {(dish.spicyRequired || dish.isSpecial) && <div className="flex gap-1">
                {dish.spicyRequired && <span className="text-xs" role="img" aria-label="Spicy">🌶️</span>}
                {dish.isSpecial && <span className="text-xs" role="img" aria-label="Special dish">⭐</span>}
              </div>}
          </div>
        </div>
      </CardContent>
    </article>;
};
export default DishCard;