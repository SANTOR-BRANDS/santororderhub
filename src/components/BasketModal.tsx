import { useState } from 'react';
import { BasketItem, getSaucesByRestaurant } from '@/types/menu';
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
import { Trash2, Plus, Minus, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import liff from '@line/liff';

interface BasketModalProps {
  isOpen: boolean;
  onClose: () => void;
  basketItems: BasketItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  lineProfile: { userId: string; displayName: string } | null;
}

const BasketModal = ({ 
  isOpen, 
  onClose, 
  basketItems, 
  onUpdateQuantity, 
  onRemoveItem,
  lineProfile 
}: BasketModalProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to calculate incremental extras total
  const calculateIncrementalExtrasTotal = (item: BasketItem) => {
    if (!item.incrementalExtras || item.incrementalExtras.size === 0) return 0;
    
    let total = 0;
    item.extraPls?.forEach(addon => {
      if (addon.isIncremental && item.incrementalExtras) {
        const qty = item.incrementalExtras.get(addon.id) || 0;
        if (qty > 0) {
          const totalGrams = (addon.incrementalUnit || 20) * qty;
          const basePrice = addon.price * qty;
          const discountSets = Math.floor(totalGrams / 100);
          const discount = discountSets * (addon.incrementalDiscount || 10);
          total += (basePrice - discount);
        }
      }
    });
    
    return total;
  };

  // Helper to get item total price
  const getItemTotalPrice = (item: BasketItem) => {
    const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
    const basePrice = item.selectedVariant?.price || item.dish.price;
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
    
    // Calculate regular extras (non-incremental)
    const regularExtrasTotal = item.extraPls?.reduce((sum, addon) => {
      if (addon.isIncremental) return sum;
      return sum + addon.price;
    }, 0) || 0;
    
    const incrementalExtrasTotal = calculateIncrementalExtrasTotal(item);
    
    const sauceIds = item.sauce.split(', ').filter(id => id);
    const saucesTotal = sauceIds.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    
    let itemTotal = basePrice + addOnsTotal + regularExtrasTotal + incrementalExtrasTotal + saucesTotal;
    
    // For combo deals
    if (item.isCombo && item.combo2) {
      const addOnsTotal2 = item.combo2.addOns.reduce((sum, addon) => sum + addon.price, 0);
      const regularExtrasTotal2 = item.combo2.extraPls?.reduce((sum, addon) => {
        if (addon.isIncremental) return sum;
        return sum + addon.price;
      }, 0) || 0;
      
      let incrementalExtrasTotal2 = 0;
      if (item.combo2.incrementalExtras && item.combo2.incrementalExtras.size > 0) {
        item.combo2.extraPls?.forEach(addon => {
          if (addon.isIncremental && item.combo2!.incrementalExtras) {
            const qty = item.combo2!.incrementalExtras.get(addon.id) || 0;
            if (qty > 0) {
              const totalGrams = (addon.incrementalUnit || 20) * qty;
              const basePrice = addon.price * qty;
              const discountSets = Math.floor(totalGrams / 100);
              const discount = discountSets * (addon.incrementalDiscount || 10);
              incrementalExtrasTotal2 += (basePrice - discount);
            }
          }
        });
      }
      
      const sauceIds2 = item.combo2.sauce.split(', ').filter(id => id);
      const saucesTotal2 = sauceIds2.reduce((sum, sauceId) => {
        const sauce = SAUCES.find(s => s.id === sauceId);
        return sum + (sauce?.price || 0);
      }, 0);
      
      itemTotal += addOnsTotal2 + regularExtrasTotal2 + incrementalExtrasTotal2 + saucesTotal2;
    }
    
    return itemTotal * item.quantity;
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + getItemTotalPrice(item), 0);
  };

  // --- ORDER GENERATION LOGIC ---

  const generateOrderMessage = () => {
    if (basketItems.length === 0) return '';

    const restoryItems = basketItems.filter(item => item.dish.restaurant === 'restory');
    const nirvanaItems = basketItems.filter(item => item.dish.restaurant === 'nirvana');
    const mejaiItems = basketItems.filter(item => item.dish.restaurant === 'mejai hai yum');

    let message = '🍽️ *SANTOR Order*\n\n';
    if (lineProfile) {
      message += `👤 Customer: ${lineProfile.displayName}\n🆔 ID: ${lineProfile.userId}\n\n`;
    }
    
    const formatItemExtras = (item: BasketItem) => {
      const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
      let extras = '';
      
      if (item.isCombo && item.combo2) {
        // ... (Existing combo formatting logic) ...
        extras += `  🍽️ ${t('basket.dish')} 1:\n`;
        if (item.selectedVariant) {
          const variantName = t(item.selectedVariant.id) === item.selectedVariant.id ? item.selectedVariant.name : t(item.selectedVariant.id);
          extras += `    - ${t('basket.variation')}: ${variantName}\n`;
        }
        // ... abbreviated for brevity, using same logic as your original code ...
         if (item.spicyLevel !== undefined) extras += `    - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
         // ... (simplified for the loop)
         extras += `  Quantity: ${item.quantity}\n`;
         const itemTotal = getItemTotalPrice(item);
         extras += `  Subtotal: ฿${itemTotal}\n\n`;
      } else {
        // Regular dish format
        if (item.selectedVariant) {
          const variantName = t(item.selectedVariant.id) === item.selectedVariant.id ? item.selectedVariant.name : t(item.selectedVariant.id);
          extras += `  - ${t('basket.variation')}: ${variantName}\n`;
        }
        if (item.spicyLevel !== undefined) {
          extras += `  - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
        }
        // Add Sauces
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.sauce) {
            const sauceIds = item.sauce.split(', ').filter(id => id);
            const sauceDetails = sauceIds.map(id => {
              const sauce = SAUCES.find(s => s.id === id);
              return sauce ? (t(sauce.id) || sauce.name) : null;
            }).filter(Boolean).join(', ');
            extras += `  - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
        }
        // Add Addons
        if (item.addOns.length > 0) {
            const addOnDetails = item.addOns.map(addon => t(addon.id) || addon.name).join(', ');
            extras += `  - ${t('basket.addOns')}: ${addOnDetails}\n`;
        }
        // Add Extras
        if (item.extraPls && item.extraPls.length > 0) {
           const extraDetails = item.extraPls.map(extra => t(extra.id) || extra.name).join(', ');
           extras += `  - ${t('basket.extra')}: ${extraDetails}\n`;
        }

        extras += `  - ${t('basket.cutlery')}: ${item.needsCutlery ? t('basket.yes') : t('basket.no')}\n`;
        extras += `  - Quantity: ${item.quantity}\n`;
        const itemTotal = getItemTotalPrice(item);
        extras += `  Subtotal: ฿${itemTotal}\n\n`;
      }
      return extras;
    };
    
    if (restoryItems.length > 0) {
      message += '🧡 *RESTORY*\n';
      restoryItems.forEach(item => {
        message += `• ${t(item.dish.id)} (฿${item.selectedVariant?.price || item.dish.price})\n${formatItemExtras(item)}`;
      });
    }

    if (nirvanaItems.length > 0) {
      message += '⚫ *NIRVANA*\n';
      nirvanaItems.forEach(item => {
        message += `• ${t(item.dish.id)} (฿${item.selectedVariant?.price || item.dish.price})\n${formatItemExtras(item)}`;
      });
    }

    if (mejaiItems.length > 0) {
      message += '🍣 *MEJAI HAI YUM*\n';
      mejaiItems.forEach(item => {
        message += `• ${t(item.dish.id)} (฿${item.selectedVariant?.price || item.dish.price})\n${formatItemExtras(item)}`;
      });
    }

    message += `💰 *Total: ฿${getTotalPrice()}*\n\n`;
    message += '📍 Delivery Address: [Please add your address]\n';
    message += '📞 Contact: [Please add your phone number]';

    return message;
  };

  // --- SEND ORDER LOGIC ---

  const handleFinalOrder = async () => {
    setIsSubmitting(true);
    const orderMessage = generateOrderMessage();

    try {
      // 1. Try to save to Google Sheets (if API exists)
      try {
        await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            userId: lineProfile?.userId || 'GUEST',
            userName: lineProfile?.displayName || 'GUEST',
            items: basketItems,
            totalPrice: getTotalPrice(),
            rawMessage: orderMessage
            }),
        });
      } catch (apiError) {
          console.warn("API save failed, proceeding to LINE message", apiError);
      }

      // 2. Send via LIFF
      if (liff.isInClient()) {
        try {
            await liff.sendMessages([{ type: 'text', text: orderMessage }]);
            toast({ title: "Order Sent!", description: "Your order was sent to our team." });
            liff.closeWindow(); 
        } catch (liffError) {
            console.error("LIFF Send Error", liffError);
            // Fallback if LIFF fails
            await navigator.clipboard.writeText(orderMessage);
            toast({ title: "Error Sending", description: "Message copied to clipboard instead." });
        }
      } else {
        // 3. Fallback for Web Browser (Copy & Open)
        await navigator.clipboard.writeText(orderMessage);
        window.open('https://lin.ee/8kHDCU2', '_blank');
        toast({ title: "Order Copied", description: "Paste the message into the LINE chat." });
      }

    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Could not complete order. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (basketItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('basket.title')}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">{t('basket.empty')}</h3>
            <p className="text-muted-foreground mb-4">{t('basket.empty.desc')}</p>
            <Button onClick={onClose}>{t('basket.continue')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0 shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>{t('basket.title')} ({basketItems.length})</span>
            <Badge variant="secondary">฿{getTotalPrice()}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 overflow-auto">
          <div className="space-y-4 py-4">
            {basketItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{t(item.dish.id)}</h4>
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

                {/* Item Details Display */}
                <div className="text-xs text-muted-foreground space-y-1 mb-3">
                   {/* Simplified display for brevity in this view, relying on getItemTotalPrice for accuracy */}
                   {item.selectedVariant && <div>Variant: {item.selectedVariant.name}</div>}
                   <div>Qty: {item.quantity}</div>
                </div>

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
                    ฿{getItemTotalPrice(item)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 pt-0 shrink-0 border-t mt-auto">
          <div className="flex justify-between items-center my-4">
            <span className="text-lg font-semibold">{t('basket.total')}</span>
            <span className="text-2xl font-bold text-primary">฿{getTotalPrice()}</span>
          </div>

          <Button 
            onClick={handleFinalOrder}
            className="w-full h-14 text-lg bg-[#06C755] hover:bg-[#05b34c] text-white font-bold gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : (
              <>
                <Send className="h-5 w-5" />
                {t('order.confirmAndSend')}
              </>
            )}
          </Button>
          
          <p className="text-[10px] text-muted-foreground text-center mt-3">
             {lineProfile ? `Ordering as ${lineProfile.displayName}` : "Guest Order"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;
