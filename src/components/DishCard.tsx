import { memo } from 'react';
import { Dish } from '@/types/menu';
import { CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import KitchenBadge from './KitchenBadge';
import OptimizedImage from './OptimizedImage';
import { Check, Plus } from 'lucide-react';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish, sourceRect?: { x: number; y: number; width: number; height: number }) => void;
  inBasketCount?: number;
}

const PROMO_ORIGINAL_PRICES: Partial<Record<string, number>> = {
  'SM-GRK-003': 69,
  'RS-COM-001': 194,
  'RS-COM-002': 248,
};

const DishCard = memo(function DishCard({
  dish,
  onClick,
  inBasketCount = 0,
}: DishCardProps) {
  const {
    t
  } = useLanguage();
  const isUnavailable = dish.isAvailable === false;
  const translated = t(dish.id);
  const dishName = !translated || translated === dish.id ? dish.name : translated;
  const originalPrice = PROMO_ORIGINAL_PRICES[dish.id];
  const isPromo = !!originalPrice && originalPrice > dish.price;
  return <article className={cn('transition-smooth backdrop-blur-sm relative rounded-lg border', !isUnavailable && 'cursor-pointer md:hover:shadow-card md:hover:-translate-y-1', !isUnavailable && (dish.restaurant === 'restory' ? 'bg-nirvana-secondary text-white md:hover:border-restory/30 border-gray-700' : dish.restaurant === 'smoody' ? 'bg-smoody-background md:hover:border-smoody-primary/50 border-smoody-accent/30' : 'bg-nirvana-primary md:hover:border-nirvana-accent/30 border-border/50'), isUnavailable && 'opacity-60 cursor-not-allowed', dish.restaurant === 'nirvana' && 'bg-nirvana-primary border-border/50', dish.restaurant === 'restory' && 'bg-nirvana-secondary text-white border-gray-700', dish.restaurant === 'smoody' && 'bg-smoody-background border-smoody-accent/30')} onClick={e => {
    if (isUnavailable) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onClick(dish, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    });
  }}>
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
            </div> : dish.image ? <OptimizedImage src={dish.image} alt={`${dish.name} - ${dish.category} dish`} className="md:hover:scale-105 transition-smooth" containerClassName={cn(dish.restaurant === 'restory' ? 'bg-restory/10' : dish.restaurant === 'smoody' ? 'bg-smoody-accent/20' : 'bg-nirvana-accent/10')} /> : <div className={cn('w-full h-full flex items-center justify-center text-muted-foreground', dish.restaurant === 'restory' ? 'bg-restory/10' : dish.restaurant === 'smoody' ? 'bg-smoody-accent/20' : 'bg-nirvana-accent/10')}>
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

          {/* Promo savings badge */}
          {!isUnavailable && isPromo && <div className="absolute top-0 right-0 overflow-hidden rounded-tr-lg">
              <span className="inline-flex h-6 items-center gap-1 rounded-bl-lg bg-red-500/90 px-2.5 text-[10px] font-semibold text-white shadow-sm border-l border-b border-white/15">
                <span className="leading-none">🔥</span>
                <span className="leading-none">PROMO</span>
              </span>
            </div>}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className={cn('font-semibold text-sm leading-tight line-clamp-2 min-h-[2.25rem]', dish.restaurant === 'smoody' ? 'text-black' : 'text-white', dish.isSpecial && 'text-amber-600 font-bold')}>
              {dishName}
              {(dish.spicyRequired || dish.isSpecial) && <span className="ml-1 text-xs opacity-80 align-middle">
                  {dish.spicyRequired && '🌶️'}
                  {dish.isSpecial && '⭐'}
                </span>}
            </h3>
            <div className="flex shrink-0 flex-col items-end text-right">
              {/* Show original price crossed out for promo items */}
              <span className={cn('font-bold text-lg leading-none whitespace-nowrap', dish.restaurant === 'restory' ? 'text-restory' : dish.restaurant === 'smoody' ? 'text-smoody-secondary' : 'text-nirvana-accent')}>
                ฿{dish.price}
              </span>
              {isPromo && <span className="mt-0.5 text-[10px] leading-none text-gray-400 line-through">฿{originalPrice}</span>}
            </div>
          </div>
          
          {/* Description only shown in DishModal, not on cards */}

          <div className="flex items-center justify-between">
            <span className={cn('text-xs px-2 py-1 rounded-full font-semibold max-w-[calc(100%-2rem)] truncate', dish.restaurant === 'restory' ? 'bg-restory/10 text-restory-secondary' : dish.restaurant === 'smoody' ? 'bg-smoody-secondary/20 text-smoody-secondary' : 'bg-nirvana-accent/10 text-nirvana-accent')}>
              {dish.category}
            </span>

            {/* Add/status button aligned with category tag */}
            {!isUnavailable && <button
                type="button"
                onClick={e => {
                e.stopPropagation();
                const card = (e.currentTarget.closest('article') as HTMLElement | null);
                if (card) {
                  const rect = card.getBoundingClientRect();
                  onClick(dish, {
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height
                  });
                } else {
                  onClick(dish);
                }
              }}
                aria-label={inBasketCount > 0 ? `In basket: ${inBasketCount}` : 'Add to basket'}
                className={cn('h-6 w-6 rounded-full flex items-center justify-center transition-all shrink-0', inBasketCount > 0 ? 'bg-green-500 text-white' : 'bg-white/90 text-black hover:bg-white')}
              >
                {inBasketCount <= 0 ? <Plus className="h-3 w-3" /> : inBasketCount === 1 ? <Check className="h-3 w-3" /> : <span className="text-[10px] font-bold leading-none">{inBasketCount}</span>}
              </button>}
          </div>
        </div>
      </CardContent>
    </article>;
});

export default DishCard;
