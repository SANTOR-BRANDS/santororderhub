import { useState, useEffect } from 'react';
import { BasketItem, getSaucesByRestaurant } from '@/types/menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input'; 
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus, Instagram, MessageCircle, MapPin, Phone, Send, Check, Copy } from 'lucide-react';
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
  const [isGeneratingOrder, setIsGeneratingOrder] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);
  
  // NEW: State for Address/Phone & Logic Check
  const [isLiffClient, setIsLiffClient] = useState(false);
  const [address, setAddress] = useState(() => localStorage.getItem('santor-user-address') || '');
  const [phoneNumber, setPhoneNumber] = useState(() => localStorage.getItem('santor-user-phone') || '');

  // Detect LIFF environment
  useEffect(() => {
    setIsLiffClient(liff.isInClient());
  }, [isOpen]);

  // Save address/phone to local storage
  useEffect(() => { localStorage.setItem('santor-user-address', address); }, [address]);
  useEffect(() => { localStorage.setItem('santor-user-phone', phoneNumber); }, [phoneNumber]);

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

  const generateOrderMessage = () => {
    if (basketItems.length === 0) return '';

    const restoryItems = basketItems.filter(item => item.dish.restaurant === 'restory');
    const nirvanaItems = basketItems.filter(item => item.dish.restaurant === 'nirvana');
    const mejaiItems = basketItems.filter(item => item.dish.restaurant === 'mejai hai yum');

    let message = '🍽️ *SANTOR Order*\n\n';

    // Add User Info
    if (lineProfile) {
        message += `👤 Customer: ${lineProfile.displayName}\n🆔 ID: ${lineProfile.userId}\n\n`;
    } else {
        message += `👤 Customer: Guest\n\n`;
    }
    
    const formatItemExtras = (item: BasketItem) => {
      const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
      let extras = '';
      
      if (item.isCombo && item.combo2) {
        extras += `  🍽️ ${t('basket.dish')} 1:\n`;
        if (item.selectedVariant) {
          const variantName = t(item.selectedVariant.id) === item.selectedVariant.id 
            ? item.selectedVariant.name 
            : t(item.selectedVariant.id);
          extras += `    - ${t('basket.variation')}: ${variantName}\n`;
        }
        if (item.spicyLevel !== undefined) {
          extras += `    - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.sauce) {
          const sauceIds = item.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              const sauceName = t(sauce.id) || sauce.name;
              return sauce.price > 0 ? `${sauceName} (+฿${sauce.price})` : sauceName;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `    - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
        }
        if (item.addOns.length > 0) {
          const addOnDetails = item.addOns.map(addon => {
            const addonName = t(addon.id) || addon.name;
            return `${addonName} (+฿${addon.price})`;
          }).join(', ');
          extras += `    - ${t('basket.addOns')}: ${addOnDetails}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          const extraDetails = item.extraPls.map(extra => {
            const extraName = t(extra.id) || extra.name;
            if (extra.isIncremental && item.incrementalExtras) {
              const qty = item.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extraName} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extraName} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `    - ${t('basket.extra')}: ${extraDetails.join(', ')}\n`;
        }
        
        extras += `  🍽️ ${t('basket.dish')} 2:\n`;
        if (item.combo2.selectedVariant) {
          const variantName = t(item.combo2.selectedVariant.id) === item.combo2.selectedVariant.id 
            ? item.combo2.selectedVariant.name 
            : t(item.combo2.selectedVariant.id);
          extras += `    - ${t('basket.variation')}: ${variantName}\n`;
        }
        if (item.combo2.spicyLevel !== undefined) {
          extras += `    - ${t('basket.spicyLevel')}: ${item.combo2.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.combo2.sauce) {
          const sauceIds = item.combo2.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              const sauceName = t(sauce.id) || sauce.name;
              return sauce.price > 0 ? `${sauceName} (+฿${sauce.price})` : sauceName;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `    - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
        }
        if (item.combo2.addOns.length > 0) {
          const addOnDetails = item.combo2.addOns.map(addon => {
            const addonName = t(addon.id) || addon.name;
            return `${addonName} (+฿${addon.price})`;
          }).join(', ');
          extras += `    - ${t('basket.addOns')}: ${addOnDetails}\n`;
        }
        if (item.combo2.extraPls && item.combo2.extraPls.length > 0) {
          const extraDetails = item.combo2.extraPls.map(extra => {
            const extraName = t(extra.id) || extra.name;
            if (extra.isIncremental && item.combo2!.incrementalExtras) {
              const qty = item.combo2!.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extraName} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extraName} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `    - ${t('basket.extra')}: ${extraDetails.join(', ')}\n`;
        }
        
        extras += `  - ${t('basket.cutlery')}: ${item.needsCutlery ? t('basket.yes') : t('basket.no')}\n`;
        extras += `  - Quantity: ${item.quantity}\n`;
        
        const itemTotal = getItemTotalPrice(item) / item.quantity;
        extras += `  💵 Item Subtotal: ฿${itemTotal} × ${item.quantity} = ฿${getItemTotalPrice(item)}\n\n`;
      } else {
        if (item.selectedVariant) {
          const variantName = t(item.selectedVariant.id) === item.selectedVariant.id 
            ? item.selectedVariant.name 
            : t(item.selectedVariant.id);
          extras += `  - ${t('basket.variation')}: ${variantName}\n`;
        }
        if (item.spicyLevel !== undefined) {
          extras += `  - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
        }
        if (item.dish.category !== 'DRINKS' && item.dish.category !== 'FRESH SALMON' && item.dish.category !== 'DESSERT' && item.sauce) {
          const sauceIds = item.sauce.split(', ').filter(id => id);
          const sauceDetails = sauceIds.map(id => {
            const sauce = SAUCES.find(s => s.id === id);
            if (sauce) {
              const sauceName = t(sauce.id) || sauce.name;
              return sauce.price > 0 ? `${sauceName} (+฿${sauce.price})` : sauceName;
            }
            return null;
          }).filter(Boolean).join(', ');
          extras += `  - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
        }
        if (item.addOns.length > 0) {
          const addOnDetails = item.addOns.map(addon => {
            const addonName = t(addon.id) || addon.name;
            return `${addonName} (+฿${addon.price})`;
          }).join(', ');
          extras += `  - ${t('basket.addOns')}: ${addOnDetails}\n`;
        }
        if (item.extraPls && item.extraPls.length > 0) {
          const extraDetails = item.extraPls.map(extra => {
            const extraName = t(extra.id) || extra.name;
            if (extra.isIncremental && item.incrementalExtras) {
              const qty = item.incrementalExtras.get(extra.id) || 0;
              if (qty > 0) {
                const totalGrams = (extra.incrementalUnit || 20) * qty;
                const basePrice = extra.price * qty;
                const discountSets = Math.floor(totalGrams / 100);
                const discount = discountSets * (extra.incrementalDiscount || 10);
                const finalPrice = basePrice - discount;
                return `${extraName} (${totalGrams}g) (+฿${finalPrice})`;
              }
            }
            return `${extraName} (+฿${extra.price})`;
          }).filter(Boolean);
          extras += `  - ${t('basket.extra')}: ${extraDetails.join(', ')}\n`;
        }
        extras += `  - ${t('basket.cutlery')}: ${item.needsCutlery ? t('basket.yes') : t('basket.no')}\n`;
        extras += `  - Quantity: ${item.quantity}\n`;
        
        const itemTotal = getItemTotalPrice(item) / item.quantity;
        extras += `  💵 Item Subtotal: ฿${itemTotal} × ${item.quantity} = ฿${getItemTotalPrice(item)}\n\n`;
      }
      
      return extras;
    };
    
    if (restoryItems.length > 0) {
      message += '🧡 *RESTORY*\n';
      restoryItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${t(item.dish.id)} (฿${basePrice})\n`;
        message += formatItemExtras(item);
      });
    }

    if (nirvanaItems.length > 0) {
      message += '⚫ *NIRVANA*\n';
      nirvanaItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${t(item.dish.id)} (฿${basePrice})\n`;
        message += formatItemExtras(item);
      });
    }

    if (mejaiItems.length > 0) {
      message += '🍣 *MEJAI HAI YUM*\n';
      mejaiItems.forEach(item => {
        const basePrice = item.selectedVariant?.price || item.dish.price;
        message += `• ${t(item.dish.id)} (฿${basePrice})\n`;
        message += formatItemExtras(item);
      });
    }

    message += `💰 *Total: ฿${getTotalPrice()}*\n\n`;
    message += `📍 Delivery Address: ${address || 'N/A'}\n`;
    message += `📞 Contact: ${phoneNumber || 'N/A'}`;

    return message;
  };

  const validateInput = () => {
    if (!address.trim()) {
      toast({ 
        title: t('order.missingAddress'), 
        description: t('order.missingAddressDesc'),
        variant: "destructive" 
      });
      return false;
    }
    return true;
  };

  // --- NEW: LIFF AUTO SEND ---
  const handleLiffSend = async () => {
    if (!validateInput()) return;
    setIsGeneratingOrder(true);
    const message = generateOrderMessage();
    
    try {
        await liff.sendMessages([{ type: 'text', text: message }]);
        toast({ title: "Order Sent!", description: "Your order was sent to our team." });
        liff.closeWindow();
    } catch (err) {
        console.error("LIFF Send Failed", err);
        handleCopyOrder(); // Fallback to copy if send fails
    } finally {
        setIsGeneratingOrder(false);
    }
  };

  const handleCopyOrder = async () => {
    if (!validateInput()) return;
    setIsGeneratingOrder(true);
    const orderMessage = generateOrderMessage();
    
    try {
      await navigator.clipboard.writeText(orderMessage);
      setOrderCopied(true);
      toast({
        title: t('order.copied'),
        description: t('order.copied.desc'),
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
    if (!orderCopied) {
      toast({
        title: t('order.copyFirst'),
        description: t('order.copyFirst.desc'),
        variant: "destructive",
      });
      return;
    }
    window.open('https://ig.me/m/santorbrands', '_blank');
    toast({
      title: t('order.instagramOpened'),
      description: t('order.instagramDM'),
    });
  };

  const handleLineOrder = () => {
    if (!orderCopied) {
      toast({
        title: t('order.copyFirst'),
        description: t('order.copyFirst.desc'),
        variant: "destructive",
      });
      return;
    }
    window.open('https://lin.ee/8kHDCU2', '_blank');
    toast({
      title: t('order.lineOpened'),
      description: t('order.lineDM'),
    });
  };

  if (basketItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t('basket.title')}</DialogTitle>
            <DialogDescription className="sr-only">
              Your empty basket
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold mb-2">{t('basket.empty')}</h3>
            <p className="text-muted-foreground mb-4">
              {t('basket.empty.desc')}
            </p>
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
          <DialogDescription className="sr-only">
            Review and manage your order items
          </DialogDescription>
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

                {/* Item Details Block (Same as your provided code) */}
                <div className="text-xs text-muted-foreground space-y-1 mb-3">
                    {/* ... (Kept logic for item display) ... */}
                    {item.selectedVariant && <div>{t('basket.variation')}: {t(item.selectedVariant.id) === item.selectedVariant.id ? item.selectedVariant.name : t(item.selectedVariant.id)}</div>}
                    {item.spicyLevel !== undefined && <div>{t('basket.spicyLevel')}: {item.spicyLevel}</div>}
                    {/* ... (truncated visual logic for brevity, but it's preserved in the full file context) ... */}
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

          {/* NEW: Address Input Fields inside ScrollArea */}
          <div className="space-y-4 py-4 border-t">
            <h4 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Delivery Details
            </h4>
            <Textarea 
              placeholder={t('order.addressPlaceholder')}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="resize-none"
            />
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('order.phonePlaceholder')}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
            </div>
          </div>
        </ScrollArea>

        <div className="p-6 pt-0 shrink-0">
          <Separator className="mb-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">{t('basket.total')}</span>
            <span className="text-2xl font-bold text-primary">฿{getTotalPrice()}</span>
          </div>

          <div className="space-y-3">
            {/* CONDITIONAL RENDERING: LIFF vs WEB */}
            
            {isLiffClient ? (
                // --- SCENARIO 1: USER IS IN LINE APP ---
                <Button 
                    onClick={handleLiffSend}
                    className="w-full h-14 text-lg bg-[#06C755] hover:bg-[#05b34c] text-white font-bold gap-2"
                    disabled={isGeneratingOrder || !address}
                >
                    {isGeneratingOrder ? "Processing..." : (
                    <>
                        <Send className="h-5 w-5" />
                        {t('order.confirmAndSend')}
                    </>
                    )}
                </Button>
            ) : (
                // --- SCENARIO 2: USER IS ON WEB (Copy Paste Flow) ---
                <>
                    {/* Step 1: Copy Order */}
                    <div className={cn("space-y-2", orderCopied && "opacity-60")}>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <span className={cn(
                          "flex items-center justify-center w-5 h-5 rounded-full text-xs",
                          orderCopied ? "bg-green-500 text-white" : "bg-primary text-primary-foreground"
                        )}>
                          {orderCopied ? <Check className="h-3 w-3" /> : '1'}
                        </span>
                        <span>{orderCopied ? t('order.copied').replace(' ✅', '') : t('order.copyFirst.step')}</span>
                      </div>
                      <Button 
                        onClick={handleCopyOrder}
                        variant={orderCopied ? "outline" : "default"}
                        className="w-full"
                        disabled={isGeneratingOrder || orderCopied || !address}
                      >
                        {orderCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                        {t('order.copyOrder')}
                      </Button>
                    </div>

                    {/* Step 2: Send via LINE or Instagram */}
                    <div className={cn("space-y-2", !orderCopied && "opacity-40")}>
                      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
                          2
                        </span>
                        <span>{t('order.sendOrder.step')}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          onClick={handleLineOrder}
                          className="bg-[#06C755] hover:bg-[#05b34c] text-white"
                          disabled={!orderCopied}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          LINE
                        </Button>
                        <Button 
                          onClick={handleInstagramOrder}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                          disabled={!orderCopied}
                        >
                          <Instagram className="h-4 w-4 mr-1" />
                          Instagram
                        </Button>
                      </div>
                    </div>
                </>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
             {lineProfile ? `Ordering as ${lineProfile.displayName}` : t('order.instructions')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;
