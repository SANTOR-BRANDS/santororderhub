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
import { Trash2, Plus, Minus, Instagram, MessageCircle } from 'lucide-react';
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
    
    // For combo deals, don't double the price - it's already the total for both dishes
    if (item.isCombo && item.combo2) {
      // Add extras/sauces from second dish only
      const addOnsTotal2 = item.combo2.addOns.reduce((sum, addon) => sum + addon.price, 0);
      const regularExtrasTotal2 = item.combo2.extraPls?.reduce((sum, addon) => {
        if (addon.isIncremental) return sum;
        return sum + addon.price;
      }, 0) || 0;
      
      // Calculate incremental extras for combo2
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

  const generateOrderMessage = () => {
    if (basketItems.length === 0) return '';

    const restoryItems = basketItems.filter(item => item.dish.restaurant === 'restory');
    const nirvanaItems = basketItems.filter(item => item.dish.restaurant === 'nirvana');
    const mejaiItems = basketItems.filter(item => item.dish.restaurant === 'mejai hai yum');

    let message = '🍽️ *SANTOR Order*\n\n';
    
    const formatItemExtras = (item: BasketItem) => {
      const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
      let extras = '';
      
      if (item.isCombo && item.combo2) {
        // Format combo dish 1
        extras += '  🍽️ Dish 1:\n';
        if (item.selectedVariant) {
          extras += `    - Variation: ${item.selectedVariant.name}\n`;
        }
        if (item.spicyLevel !== undefined) {
          extras += `    - Spicy Level: ${item.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.sauce) {
          const sauceIds = item.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              return sauce.price > 0 ? `${sauce.name} (+฿${sauce.price})` : sauce.name;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `    - Sauce: ${sauceDetails || 'No sauce'}\n`;
        }
        if (item.addOns.length > 0) {
          const addOnDetails = item.addOns.map(addon => `${addon.name} (+฿${addon.price})`).join(', ');
          extras += `    - Add-ons: ${addOnDetails}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          const extraDetails = item.extraPls.map(extra => {
            if (extra.isIncremental && item.incrementalExtras) {
              const qty = item.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extra.name} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extra.name} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `    - Extra: ${extraDetails.join(', ')}\n`;
        }
        
        // Format combo dish 2
        extras += '  🍽️ Dish 2:\n';
        if (item.combo2.selectedVariant) {
          extras += `    - Variation: ${item.combo2.selectedVariant.name}\n`;
        }
        if (item.combo2.spicyLevel !== undefined) {
          extras += `    - Spicy Level: ${item.combo2.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.combo2.sauce) {
          const sauceIds = item.combo2.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              return sauce.price > 0 ? `${sauce.name} (+฿${sauce.price})` : sauce.name;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `    - Sauce: ${sauceDetails || 'No sauce'}\n`;
        }
        if (item.combo2.addOns.length > 0) {
          const addOnDetails = item.combo2.addOns.map(addon => `${addon.name} (+฿${addon.price})`).join(', ');
          extras += `    - Add-ons: ${addOnDetails}\n`;
        }
        if (item.combo2.extraPls && item.combo2.extraPls.length > 0) {
          const extraDetails = item.combo2.extraPls.map(extra => {
            if (extra.isIncremental && item.combo2!.incrementalExtras) {
              const qty = item.combo2!.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extra.name} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extra.name} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `    - Extra: ${extraDetails.join(', ')}\n`;
        }
        
        extras += `  - Cutlery: ${item.needsCutlery ? 'Yes' : 'No'}\n`;
        extras += `  - Quantity: ${item.quantity}\n`;
        
        // Add item subtotal
        const itemTotal = getItemTotalPrice(item) / item.quantity;
        extras += `  💵 Item Subtotal: ฿${itemTotal} × ${item.quantity} = ฿${getItemTotalPrice(item)}\n\n`;
      } else {
        // Regular dish format
        if (item.selectedVariant) {
          extras += `  - Variation: ${item.selectedVariant.name}\n`;
        }
        if (item.spicyLevel !== undefined) {
          extras += `  - Spicy Level: ${item.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.sauce) {
          const sauceIds = item.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              return sauce.price > 0 ? `${sauce.name} (+฿${sauce.price})` : sauce.name;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `  - Sauce: ${sauceDetails || 'No sauce'}\n`;
        }
        if (item.addOns.length > 0) {
          const addOnDetails = item.addOns.map(addon => `${addon.name} (+฿${addon.price})`).join(', ');
          extras += `  - Add-ons: ${addOnDetails}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          const extraDetails = item.extraPls.map(extra => {
            if (extra.isIncremental && item.incrementalExtras) {
              const qty = item.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extra.name} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extra.name} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `  - Extra: ${extraDetails.join(', ')}\n`;
        }
        extras += `  - Cutlery: ${item.needsCutlery ? 'Yes' : 'No'}\n`;
        extras += `  - Quantity: ${item.quantity}\n`;
        
        // Add item subtotal
        const itemTotal = getItemTotalPrice(item) / item.quantity;
        extras += `  💵 Item Subtotal: ฿${itemTotal} × ${item.quantity} = ฿${getItemTotalPrice(item)}\n\n`;
      }
      
      return extras;
    };
    
    if (restoryItems.length > 0) {
      message += '🧡 *RESTORY*\n';
      restoryItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${item.dish.name} (฿${basePrice})\n`;
        message += formatItemExtras(item);
      });
    }

    if (nirvanaItems.length > 0) {
      message += '⚫ *NIRVANA*\n';
      nirvanaItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${item.dish.name} (฿${basePrice})\n`;
        message += formatItemExtras(item);
      });
    }

    if (mejaiItems.length > 0) {
      message += '🍣 *MEJAI HAI YUM*\n';
      mejaiItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${item.dish.name} (฿${basePrice})\n`;
        message += formatItemExtras(item);
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
        title: "Order Copied ✅",
        description: "Your order has been copied to clipboard. You can now paste it in Line or Instagram.",
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

  const handleInstagramOrder = async () => {
    const orderMessage = generateOrderMessage();
    
    try {
      // Copy message to clipboard
      await navigator.clipboard.writeText(orderMessage);
      
      // Open Instagram DM
      window.open('https://ig.me/m/santorbrands', '_blank');
      
      toast({
        title: "✅ Message Copied!",
        description: "Instagram DM opened. Just paste (Ctrl+V) and send!",
      });
    } catch (err) {
      // Fallback if clipboard fails
      window.open('https://ig.me/m/santorbrands', '_blank');
      toast({
        title: "Opening Instagram",
        description: "Please copy your order message and paste it in the chat.",
        variant: "destructive",
      });
    }
  };

  const handleLineOrder = async () => {
    const orderMessage = generateOrderMessage();
    
    try {
      // Copy message to clipboard
      await navigator.clipboard.writeText(orderMessage);
      
      // Open LINE official account
      window.open('https://lin.ee/8kHDCU2', '_blank');
      
      toast({
        title: "✅ Message Copied!",
        description: "LINE chat opened. Just paste (Ctrl+V or long press) and send!",
      });
    } catch (err) {
      // Fallback if clipboard fails
      window.open('https://lin.ee/8kHDCU2', '_blank');
      toast({
        title: "Opening LINE",
        description: "Please copy your order message manually and paste it in chat.",
        variant: "destructive",
      });
    }
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
      <DialogContent className="max-w-md max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0 shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Your Basket ({basketItems.length})</span>
            <Badge variant="secondary">฿{getTotalPrice()}</Badge>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 overflow-auto">
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
                  {item.isCombo && item.combo2 ? (
                    <>
                      {/* Combo Dish 1 */}
                      <div className="font-semibold text-foreground">🍽️ Dish 1:</div>
                      {item.selectedVariant && (
                        <div className="pl-3">Variation: {item.selectedVariant.name}</div>
                      )}
                      {item.spicyLevel !== undefined && (
                        <div className="pl-3">Spicy Level: {item.spicyLevel}</div>
                      )}
                      {item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && (() => {
                        const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
                        const sauceNames = item.sauce.split(', ').filter(id => id).map(id => SAUCES.find(s => s.id === id)?.name).filter(Boolean).join(', ');
                        return <div className="pl-3">Sauce: {sauceNames || 'No sauce'}</div>;
                      })()}
                      {item.addOns.length > 0 && (
                        <div className="pl-3">Add-ons: {item.addOns.map(addon => addon.name).join(', ')}</div>
                      )}
                      {item.extraPls && item.extraPls.length > 0 && (
                        <div className="pl-3">Extra: {item.extraPls.map(extra => {
                          if (extra.isIncremental && item.incrementalExtras) {
                            const qty = item.incrementalExtras.get(extra.id) || 0;
                            if (qty > 0) {
                              const totalGrams = (extra.incrementalUnit || 20) * qty;
                              return `${extra.name} (${totalGrams}g)`;
                            }
                          }
                          return extra.name;
                        }).filter(Boolean).join(', ')}</div>
                      )}
                      
                      {/* Combo Dish 2 */}
                      <div className="font-semibold text-foreground mt-2">🍽️ Dish 2:</div>
                      {item.combo2.selectedVariant && (
                        <div className="pl-3">Variation: {item.combo2.selectedVariant.name}</div>
                      )}
                      {item.combo2.spicyLevel !== undefined && (
                        <div className="pl-3">Spicy Level: {item.combo2.spicyLevel}</div>
                      )}
                      {item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && (() => {
                        const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
                        const sauceNames = item.combo2.sauce.split(', ').filter(id => id).map(id => SAUCES.find(s => s.id === id)?.name).filter(Boolean).join(', ');
                        return <div className="pl-3">Sauce: {sauceNames || 'No sauce'}</div>;
                      })()}
                      {item.combo2.addOns.length > 0 && (
                        <div className="pl-3">Add-ons: {item.combo2.addOns.map(addon => addon.name).join(', ')}</div>
                      )}
                      {item.combo2.extraPls && item.combo2.extraPls.length > 0 && (
                        <div className="pl-3">Extra: {item.combo2.extraPls.map(extra => {
                          if (extra.isIncremental && item.combo2!.incrementalExtras) {
                            const qty = item.combo2!.incrementalExtras.get(extra.id) || 0;
                            if (qty > 0) {
                              const totalGrams = (extra.incrementalUnit || 20) * qty;
                              return `${extra.name} (${totalGrams}g)`;
                            }
                          }
                          return extra.name;
                        }).filter(Boolean).join(', ')}</div>
                      )}
                      <div className="mt-2">Cutlery: {item.needsCutlery ? 'Yes' : 'No'}</div>
                    </>
                  ) : (
                    <>
                      {/* Regular Item */}
                      {item.selectedVariant && (
                        <div>Variation: {item.selectedVariant.name}</div>
                      )}
                      {item.spicyLevel !== undefined && (
                        <div>Spicy Level: {item.spicyLevel}</div>
                      )}
                      {/* Only show sauce for items that require it */}
                      {item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && (() => {
                        const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
                        const sauceNames = item.sauce.split(', ').filter(id => id).map(id => SAUCES.find(s => s.id === id)?.name).filter(Boolean).join(', ');
                        return <div>Sauce: {sauceNames || 'No sauce'}</div>;
                      })()}
                      {item.addOns.length > 0 && (
                        <div>Add-ons: {item.addOns.map(addon => addon.name).join(', ')}</div>
                      )}
                      {item.extraPls && item.extraPls.length > 0 && (
                        <div>Extra: {item.extraPls.map(extra => {
                          if (extra.isIncremental && item.incrementalExtras) {
                            const qty = item.incrementalExtras.get(extra.id) || 0;
                            if (qty > 0) {
                              const totalGrams = (extra.incrementalUnit || 20) * qty;
                              return `${extra.name} (${totalGrams}g)`;
                            }
                          }
                          return extra.name;
                        }).filter(Boolean).join(', ')}</div>
                      )}
                      <div>Cutlery: {item.needsCutlery ? 'Yes' : 'No'}</div>
                    </>
                  )}
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
                    ฿{getItemTotalPrice(item)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-6 pt-0 shrink-0">
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
              onClick={handleLineOrder}
              className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Send via LINE
            </Button>
            <Button 
              onClick={handleInstagramOrder}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Send via Instagram
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Send your order via LINE or Instagram for processing
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;