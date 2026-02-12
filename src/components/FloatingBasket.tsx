import { BasketItem, SAUCES } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useState } from 'react';

interface FloatingBasketProps {
  basketItems: BasketItem[];
  onOpenBasket: () => void;
  shakeTrigger?: number;
}

const FloatingBasket = forwardRef<HTMLDivElement, FloatingBasketProps>(
  ({ basketItems, onOpenBasket, shakeTrigger = 0 }, ref) => {
    const itemCount = basketItems.reduce((total, item) => total + item.quantity, 0);
    const [isShaking, setIsShaking] = useState(false);
    
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

    if (itemCount === 0) return null;

    return (
      <div 
        ref={ref}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-gradient-to-t from-black/80 to-transparent"
      >
        <Button
          onClick={onOpenBasket}
          className={cn(
            'w-full bg-santor text-santor-foreground hover:bg-santor-secondary',
            'shadow-modal py-4 rounded-xl transition-bounce',
            'border border-white/20 flex items-center justify-center gap-3',
            isShaking && 'animate-basket-expand'
          )}
          size="lg"
        >
          <ShoppingBag className="h-6 w-6" />
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
