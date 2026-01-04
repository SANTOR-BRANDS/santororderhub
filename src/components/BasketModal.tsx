import { useState, useEffect } from 'react';
import { BasketItem, getSaucesByRestaurant } from '@/types/menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input'; 
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Minus, Send, MapPin, Phone, Instagram, MessageCircle, Copy, Check } from 'lucide-react';
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
  
  // State for Web Manual Flow
  const [orderCopied, setOrderCopied] = useState(false);
  const [isLiffClient, setIsLiffClient] = useState(false);

  // --- NEW: Load saved data from Local Storage immediately ---
  const [address, setAddress] = useState(() => {
    return localStorage.getItem('santor-user-address') || '';
  });
  const [phoneNumber, setPhoneNumber] = useState(() => {
    return localStorage.getItem('santor-user-phone') || '';
  });

  // Check if running in LINE or Web on mount
  useEffect(() => {
    setIsLiffClient(liff.isInClient());
  }, [isOpen]);

  // --- NEW: Save to Local Storage whenever they type ---
  useEffect(() => {
    localStorage.setItem('santor-user-address', address);
  }, [address]);

  useEffect(() => {
    localStorage.setItem('santor-user-phone', phoneNumber);
  }, [phoneNumber]);


  // --- Calculations ---

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

  const getItemTotalPrice = (item: BasketItem) => {
    const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
    const basePrice = item.selectedVariant?.price || item.dish.price;
    const addOnsTotal = item.addOns.reduce((sum, addon) => sum + addon.price, 0);
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

  // --- Message Generation ---

  const generateOrderMessage = () => {
    if (basketItems.length === 0) return '';
    const restoryItems = basketItems.filter(item => item.dish.restaurant === 'restory');
    const nirvanaItems = basketItems.filter(item => item.dish.restaurant === 'nirvana');
    const mejaiItems = basketItems.filter(item => item.dish.restaurant === 'mejai hai yum');

    let message = '🍽️ *SANTOR Order*\n\n';
    if (lineProfile) {
      message += `👤 Customer: ${lineProfile.displayName}\n🆔 ID: ${lineProfile.userId}\n\n`;
    } else {
      message += `👤 Customer: Guest\n\n`;
    }
    
    const formatItemExtras = (item: BasketItem) => {
      const SAUCES = getSaucesByRestaurant(item.dish.restaurant);
      let extras = '';

      const getName = (id: string, fallback: string) => {
         const val = t(id);
         return val !== id ? val : fallback;
      };
      
      if (item.isCombo && item.combo2) {
         extras += `  🍽️ ${t('basket.dish')} 1:\n`;
         if (item.selectedVariant) extras += `    - ${t('basket.variation')}: ${getName(item.selectedVariant.id, item.selectedVariant.name)}\n`;
         if (item.spicyLevel !== undefined) extras += `    - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
         
         if (item.dish.category !== 'DRINKS' && item.sauce) {
            const sauceIds = item.sauce.split(', ').filter(id => id);
            const sauceDetails = sauceIds.map(id => {
                const s = SAUCES.find(x => x.id === id);
                return s ? (t(s.id) || s.name) : null;
            }).filter(Boolean).join(', ');
            extras += `    - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
         }
         
         extras += `  🍽️ ${t('basket.dish')} 2:\n`;
         if (item.combo2.selectedVariant) extras += `    - ${t('basket.variation')}: ${getName(item.combo2.selectedVariant.id, item.combo2.selectedVariant.name)}\n`;
         
         extras += `  Quantity: ${item.quantity}\n`;
         extras += `  Subtotal: ฿${getItemTotalPrice(item)}\n\n`;

      } else {
         if (item.selectedVariant) extras += `  - ${t('basket.variation')}: ${getName(item.selectedVariant.id, item.selectedVariant.name)}\n`;
         if (item.spicyLevel !== undefined) extras += `  - ${t('basket.spicyLevel')}: ${item.spicyLevel}\n`;
         
         if (item.dish.category !== 'DRINKS' && item.sauce) {
            const sauceIds = item.sauce.split(', ').filter(id => id);
            const sauceDetails = sauceIds.map(id => {
                const s = SAUCES.find(x => x.id === id);
                return s ? (t(s.id) || s.name) : null;
            }).filter(Boolean).join(', ');
            extras += `  - ${t('basket.sauce')}: ${sauceDetails || t('basket.noSauce')}\n`;
         }

         if (item.addOns.length > 0) {
             const names = item.addOns.map(a => getName(a.id, a.name)).join(', ');
             extras += `  - ${t('basket.addOns')}: ${names}\n`;
         }
         
         if (item.extraPls && item.extraPls.length > 0) {
           const extraNames = item.extraPls.map(e => getName(e.id, e.name)).join(', ');
           extras += `  - ${t('basket.extra')}: ${extraNames}\n`;
         }

         extras += `  - Quantity: ${item.quantity}\n`;
         extras += `  Subtotal: ฿${getItemTotalPrice(item)}\n\n`;
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
    message += `📍 Delivery Address: ${address || 'N/A'}\n`;
    message += `📞 Contact: ${phoneNumber || 'N/A'}`;
    
    return message;
  };

  // --- Handlers ---

  const validateInput = () => {
    if (!address.trim()) {
      toast({ 
        title: "Missing Address", 
        description: "Please enter your delivery address.",
        variant: "destructive" 
      });
      return false;
    }
    return true;
  };

  // 1. LIFF AUTO SEND
  const handleLiffSend = async () => {
    if (!validateInput()) return;
    setIsSubmitting(true);
    const message = generateOrderMessage();
    
    try {
        await liff.sendMessages([{ type: 'text', text: message }]);
        toast({ title: "Order Sent!", description: "Your order was sent to our team." });
        liff.closeWindow();
    } catch (err) {
        console.error("LIFF Send Failed", err);
        handleManualCopy();
    } finally {
        setIsSubmitting(false);
    }
  };

  // 2. WEB MANUAL COPY
  const handleManualCopy = async () => {
    if (!validateInput()) return;
    setIsSubmitting(true);
    const message = generateOrderMessage();

    try {
      await navigator.clipboard.writeText(message);
      setOrderCopied(true);
      toast({ title: t('order.copied'), description: t('order.copied.desc') });
    } catch (err) {
      toast({ title: "Copy Failed", description: "Please manually select and copy the text.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 3. WEB OPEN APPS
  const handleOpenLine = () => window.open('https://lin.ee/8kHDCU2', '_blank');
  const handleOpenInstagram = () => window.open('https://ig.me/m/santorbrands', '_blank');

  // --- Render ---

  if (basketItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
           <div className="text-center py-8">
             <div className="text-6xl mb-4">🛒</div>
             <h3 className="text-xl font-semibold mb-2">{t('basket.empty')}</h3>
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
          {/* Basket List */}
          <div className="space-y-4 py-4">
            {basketItems.map((item) => (
               <div key={item.id} className="border rounded-lg p-4">
                 <div className="flex justify-between font-bold">
                    <span>{t(item.dish.id)}</span>
                    <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                 </div>
                 <div className="text-xs text-muted-foreground mt-1">
                    {item.selectedVariant && <div>Variant: {t(item.selectedVariant.id) !== item.selectedVariant.id ? t(item.selectedVariant.id) : item.selectedVariant.name}</div>}
                    {item.spicyLevel && <div>Spicy: {item.spicyLevel}</div>}
                 </div>

                 <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span>{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                    <span>฿{getItemTotalPrice(item)}</span>
                 </div>
               </div>
            ))}
          </div>

          {/* INPUT FIELDS */}
          <div className="space-y-4 py-4 border-t">
            <h4 className="font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Delivery Details
            </h4>
            <Textarea 
              placeholder="Enter your delivery address..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="resize-none"
            />
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Phone Number (Optional)" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
              />
            </div>
          </div>
        </ScrollArea>

        {/* FOOTER ACTIONS */}
        <div className="p-6 pt-0 shrink-0 border-t mt-auto">
          <div className="flex justify-between items-center my-4">
            <span className="text-lg font-semibold">{t('basket.total')}</span>
            <span className="text-2xl font-bold text-primary">฿{getTotalPrice()}</span>
          </div>

          {isLiffClient ? (
            <Button 
                onClick={handleLiffSend}
                className="w-full h-14 text-lg bg-[#06C755] hover:bg-[#05b34c] text-white font-bold gap-2"
                disabled={isSubmitting || !address}
            >
                {isSubmitting ? "Processing..." : (
                <>
                    <Send className="h-5 w-5" />
                    {t('order.confirmAndSend')}
                </>
                )}
            </Button>
          ) : (
            <div className="space-y-3">
                {/* Step 1: Copy */}
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
                    onClick={handleManualCopy}
                    variant={orderCopied ? "outline" : "default"}
                    className="w-full"
                    disabled={isSubmitting || !address}
                  >
                    {orderCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {t('order.copyOrder')}
                  </Button>
                </div>

                {/* Step 2: Open Apps */}
                <div className={cn("space-y-2", !orderCopied && "opacity-40")}>
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">2</span>
                    <span>{t('order.sendOrder.step')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={handleOpenLine}
                      className="bg-[#06C755] hover:bg-[#05b34c] text-white"
                      disabled={!orderCopied}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      LINE
                    </Button>
                    <Button 
                      onClick={handleOpenInstagram}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                      disabled={!orderCopied}
                    >
                      <Instagram className="h-4 w-4 mr-1" />
                      Instagram
                    </Button>
                  </div>
                </div>
            </div>
          )}

          <p className="text-[10px] text-muted-foreground text-center mt-3">
             {lineProfile ? `Ordering as ${lineProfile.displayName}` : "Ordering as Guest"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;
