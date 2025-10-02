import { useState } from 'react';
import { BasketItem, SAUCES } from '@/types/menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, Minus, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  basketItems: BasketItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

const BasketModal = ({ 
  isOpen, 
  onClose, 
  basketItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: BasketModalProps) => {
  const { toast } = useToast();
  const [isGeneratingOrder, setIsGeneratingOrder] = useState(false);

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => {
      const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
      const itemTotal = (item.dish.price + addOnsTotal) * item.quantity;
      return total + itemTotal;
    }, 0);
  };

  const generateOrderMessage = () => {
    if (basketItems.length === 0) return '';

    const restoryItems = basketItems.filter(item => item.dish.restaurant === 'restory');
    const nirvanaItems = basketItems.filter(item => item.dish.restaurant === 'nirvana');

    let message = '🍽️ *SANTOR Order*\n\n';
    
    if (restoryItems.length > 0) {
      message += '🧡 *RESTORY*\n';
      restoryItems.forEach(item => {
        message += `• ${item.dish.name} (฿${item.dish.price})\n`;
        if (item.spicyLevel !== undefined) {
          message += `  - Spicy Level: ${item.spicyLevel}\n`;
        }
        if (item.sauce) {
          const sauce = SAUCES.find(s => s.id === item.sauce);
          message += `  - Sauce: ${sauce ? sauce.name : 'No sauce'}\n`;
        }
        if (item.addOns.length > 0) {
          message += `  - Add-ons: ${item.addOns.map(addon => addon.name).join(', ')}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          message += `  - Extra: ${item.extraPls.map(extra => extra.name).join(', ')}\n`;
        }
        message += `  - Cutlery: ${item.needsCutlery ? 'Yes' : 'No'}\n`;
        message += `  - Quantity: ${item.quantity}\n\n`;
      });
    }

    if (nirvanaItems.length > 0) {
      message += '⚫ *NIRVANA*\n';
      nirvanaItems.forEach(item => {
        message += `• ${item.dish.name} (฿${item.dish.price})\n`;
        if (item.spicyLevel !== undefined) {
          message += `  - Spicy Level: ${item.spicyLevel}\n`;
        }
        if (item.sauce) {
          const sauce = SAUCES.find(s => s.id === item.sauce);
          message += `  - Sauce: ${sauce ? sauce.name : 'No sauce'}\n`;
        }
        if (item.addOns.length > 0) {
          message += `  - Add-ons: ${item.addOns.map(addon => addon.name).join(', ')}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          message += `  - Extra: ${item.extraPls.map(extra => extra.name).join(', ')}\n`;
        }
        message += `  - Cutlery: ${item.needsCutlery ? 'Yes' : 'No'}\n`;
        message += `  - Quantity: ${item.quantity}\n\n`;
      });
    }

    message += `💰 *Total: ฿${getTotalPrice()}*\n\n`;
    message += '📍 Delivery Address: [Please add your address]\n';
    message += '📞 Contact: [Please add your phone number]';

    return message;
  };

  const handleCopyOrder = async () => {
    setIsGeneratingOrder(true);
    const orderMessage = generateOrderMessage();
    
    try {
      await navigator.clipboard.writeText(orderMessage);
      toast({
        title: "Order copied!",
        description: "Your order has been copied to clipboard. You can now paste it in Instagram DM.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please manually copy the order message.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingOrder(false);
    }
  };

  const handleInstagramOrder = () => {
    const orderMessage = generateOrderMessage();
    const encodedMessage = encodeURIComponent(orderMessage);
    const instagramUrl = `https://ig.me/m/santor_official?text=${encodedMessage}`;
    window.open(instagramUrl, '_blank');
  };

  if (basketItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Your Basket</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">Your basket is empty</h3>
            <p className="text-muted-foreground mb-4">
              Add some delicious dishes to get started!
            </p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Your Basket ({basketItems.length})</span>
            <Badge variant="secondary">฿{getTotalPrice()}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {basketItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{item.dish.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        'capitalize text-xs',
                        item.dish.restaurant === 'restory' 
                          ? 'border-restory/50 text-restory' 
                          : 'border-nirvana-accent/50 text-nirvana-accent'
                      )}
                    >
                      {item.dish.restaurant}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Item Details */}
                <div className="text-xs text-muted-foreground space-y-1 mb-3">
                  {item.spicyLevel !== undefined && (
                    <div>Spicy Level: {item.spicyLevel}</div>
                  )}
                  <div>Sauce: {SAUCES.find(s => s.id === item.sauce)?.name || 'No sauce'}</div>
                  {item.addOns.length > 0 && (
                    <div>Add-ons: {item.addOns.map(addon => addon.name).join(', ')}</div>
                  )}
                  {item.extraPls && item.extraPls.length > 0 && (
                    <div>Extra: {item.extraPls.map(extra => extra.name).join(', ')}</div>
                  )}
                  <div>Cutlery: {item.needsCutlery ? 'Yes' : 'No'}</div>
                </div>

                {/* Quantity and Price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="font-semibold">
                    ฿{(item.dish.price + item.addOns.reduce((sum, addon) => sum + addon.price, 0)) * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 pt-0">
          <Separator className="mb-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-primary">฿{getTotalPrice()}</span>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleCopyOrder}
              variant="outline"
              className="w-full"
              disabled={isGeneratingOrder}
            >
              📋 Copy Order Message
            </Button>
            <Button 
              onClick={handleInstagramOrder}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Send via Instagram DM
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Orders are sent via Instagram DM to SANTOR for processing
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;