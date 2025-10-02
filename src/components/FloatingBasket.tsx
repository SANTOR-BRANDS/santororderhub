import { BasketItem, SAUCES } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingBasketProps {
  basketItems: BasketItem[];
  onOpenBasket: () => void;
}

const FloatingBasket = ({ basketItems, onOpenBasket }: FloatingBasketProps) => {
  const itemCount = basketItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = basketItems.reduce((total, item) => {
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
    const extraPlsTotal = item.extraPls?.reduce((sum, addon) => sum + addon.price, 0) || 0;
    const sauceIds = item.sauce.split(', ').filter(id => id);
    const saucesTotal = sauceIds.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    return total + (item.dish.price + addOnsTotal + extraPlsTotal + saucesTotal) * item.quantity;
  }, 0);

  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={onOpenBasket}
        className={cn(
          'relative bg-santor text-santor-foreground hover:bg-santor-secondary',
          'shadow-modal px-6 py-3 rounded-full transition-bounce',
          'border border-white/20'
        )}
        size="lg"
      >
        <ShoppingBag className="h-5 w-5 mr-2" />
        <span className="font-semibold">
          {itemCount} item{itemCount > 1 ? 's' : ''} • ฿{totalPrice}
        </span>
        
        {itemCount > 0 && (
          <Badge 
            className="absolute -top-2 -right-2 bg-red-500 text-white border-0 min-w-6 h-6 flex items-center justify-center text-xs font-bold"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};

export default FloatingBasket;