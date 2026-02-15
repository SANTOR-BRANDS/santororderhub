import { BasketItem, SAUCES } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useState } from 'react';
import { getRestaurantInfo } from '@/lib/unifiedMenu';

interface FloatingBasketProps {
  basketItems: BasketItem[];
  onOpenBasket: () => void;
  shakeTrigger?: number;
}

const FloatingBasket = forwardRef<HTMLDivElement, FloatingBasketProps>(
  ({ basketItems, onOpenBasket, shakeTrigger = 0 }, ref) => {
    const itemCount = basketItems.reduce((total, item) => total + item.quantity, 0);
    const [isShaking, setIsShaking] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    
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

    // Trigger expand animation when shakeTrigger changes
    useEffect(() => {
      if (shakeTrigger > 0) {
        setIsShaking(true);
        const timer = setTimeout(() => {
          setIsShaking(false);
        }, 330); // Match animation duration
        return () => clearTimeout(timer);
      }
    }, [shakeTrigger]);

    // Get unique restaurants from basket items
    const getUniqueRestaurants = () => {
      const restaurants = new Set(basketItems.map(item => item.dish.restaurant));
      return Array.from(restaurants);
    };

    if (itemCount === 0) return null;

    return (
      <div 
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-black/80 to-transparent"
      >
        <Button
          onClick={onOpenBasket}
          onPointerDown={() => setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          onPointerCancel={() => setIsPressed(false)}
          onPointerLeave={() => setIsPressed(false)}
          className={cn(
            'w-full bg-santor text-santor-foreground hover:bg-santor-secondary',
            'shadow-modal py-4 rounded-xl transition-[transform,box-shadow,filter] duration-[85ms] ease-out',
            'border border-white/20 flex items-center justify-center gap-3',
            isPressed && 'scale-[0.96] brightness-[0.97] shadow-md',
            isShaking && 'animate-basket-impact'
          )}
          size="lg"
        >
          {/* Restaurant Logos - Overlapping Avatars */}
          <div className="flex -space-x-2 mr-2">
            {getUniqueRestaurants().map((restaurant) => {
              const info = getRestaurantInfo(restaurant);
              return (
                <div
                  key={restaurant}
                  className="w-7 h-7 rounded-full overflow-hidden bg-white shadow-sm"
                  title={info?.name}
                >
                  <img
                    src={info?.logo}
                    alt={info?.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold flex items-center justify-center h-full text-gray-600">${info?.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
              );
            })}
          </div>

          <ShoppingBag className={cn('h-6 w-6', isShaking && 'animate-basket-icon-impact')} />
          <span className="font-bold text-base">
            {itemCount} item{itemCount > 1 ? 's' : ''} • ฿{totalPrice}
          </span>
          
          {itemCount > 0 && (
            <Badge 
              className="absolute top-1 right-3 bg-red-500 text-white border-0 min-w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              {itemCount > 99 ? '99+' : itemCount}
            </Badge>
          )}
        </Button>
      </div>
    );
  }
);

FloatingBasket.displayName = 'FloatingBasket';

export default FloatingBasket;
