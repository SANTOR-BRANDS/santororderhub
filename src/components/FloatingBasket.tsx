import { useState, useEffect } from 'react';
import { BasketItem, SAUCES } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRestaurantInfo } from '@/lib/unifiedMenu';
import { useLanguage } from '@/contexts/LanguageContext';

interface FloatingBasketProps {
  basketItems: BasketItem[];
  onOpenBasket: () => void;
  triggerAnimation?: boolean;
}

const FloatingBasket = ({ basketItems, onOpenBasket, triggerAnimation }: FloatingBasketProps) => {
  const { t } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const itemCount = basketItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = basketItems.reduce((total, item) => {
    const basePrice = item.selectedVariant?.price || item.dish.price;
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
    const extraPlsTotal = item.extraPls?.reduce((sum, addon) => sum + addon.price, 0) || 0;
    const sauceIds = item.sauce.split(', ').filter(id => id);
    const saucesTotal = sauceIds.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    return total + (basePrice + addOnsTotal + extraPlsTotal + saucesTotal) * item.quantity;
  }, 0);

  // Get unique restaurants in basket for showing trust cues
  const uniqueRestaurants = Array.from(new Set(basketItems.map(item => item.dish.restaurant)));

  // Trigger animation when triggerAnimation prop changes
  useEffect(() => {
    if (triggerAnimation) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [triggerAnimation]);
  
  // Stop any existing animation when basket changes (items are added/removed)
  useEffect(() => {
    setIsAnimating(false);
  }, [basketItems.length]);

  // Always show the basket bar, even when empty, but show different state
  const isEmpty = itemCount === 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-black/80 to-transparent">
      <Button
        onClick={isEmpty ? () => {/* No action when empty */} : onOpenBasket}
        className={cn(
          'w-full bg-santor text-santor-foreground hover:bg-santor-secondary',
          'shadow-modal py-4 rounded-xl transition-all duration-300',
          'border border-white/20 flex items-center justify-between gap-3 px-4',
          isAnimating && 'animate-bounce scale-105',
          isEmpty && 'cursor-default opacity-80'
        )}
        size="lg"
      >
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6" />
          <span className="font-bold text-base">
            {isEmpty ? (
              t('basket.empty', 'Your basket is empty')
            ) : (
              `${itemCount} item${itemCount > 1 ? 's' : ''} • ฿${totalPrice}`
            )}
          </span>
        </div>
        
        {/* Restaurant Logos - Trust Cue - Only show when not empty */}
        {!isEmpty && (
          <div className="flex items-center gap-1">
            {uniqueRestaurants.slice(0, 3).map(restaurant => {
              const info = getRestaurantInfo(restaurant);
              if (!info) return null;
              return (
                <div
                  key={restaurant}
                  className="w-6 h-6 rounded-full overflow-hidden border border-white/30 bg-white/10 flex items-center justify-center"
                  title={info.name}
                >
                  <img 
                    src={info.logo} 
                    alt={info.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = `<span class="text-xs font-bold text-white">${info.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
              );
            })}
            {uniqueRestaurants.length > 3 && (
              <span className="text-xs text-white/70 ml-1">+{uniqueRestaurants.length - 3}</span>
            )}
          </div>
        )}
      </Button>
    </div>
  );
};

export default FloatingBasket;