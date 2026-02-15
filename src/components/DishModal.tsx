import { useState, useEffect, useRef } from 'react';
import { Dish, AddOn, SPICY_LEVELS, getSaucesByRestaurant, BasketItem, DishVariant } from '@/types/menu';
import { addOns } from '@/data/menuData';
import { SMOODY_FREE_TOPPINGS } from '@/data/smoodyData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plus, Minus, ShoppingCart, Zap, Gift } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';
interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBasket: (
    item: BasketItem,
    sourceRect?: { x: number; y: number; width: number; height: number },
    options?: { animateDrop?: boolean }
  ) => void;
  onOrderNow?: (item: BasketItem) => void;
}
const DishModal = ({
  dish,
  isOpen,
  onClose,
  onAddToBasket,
  onOrderNow
}: DishModalProps) => {
  const {
    t
  } = useLanguage();
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | null>(null);
  const [selectedExtraPls, setSelectedExtraPls] = useState<AddOn[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [incrementalQuantities, setIncrementalQuantities] = useState<Map<string, number>>(new Map());
  const [spicyLevel, setSpicyLevel] = useState<number | undefined>(undefined);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [needsCutlery, setNeedsCutlery] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedFreeToppings, setSelectedFreeToppings] = useState<string[]>([]);
  const [isAddPressed, setIsAddPressed] = useState(false);
  const [isOrderPressed, setIsOrderPressed] = useState(false);
  const [isOrderTransition, setIsOrderTransition] = useState(false);
  const [showBasketTransitionContent, setShowBasketTransitionContent] = useState(false);

  // Refs for scrolling to error sections
  const spicyRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const spicy2Ref = useRef<HTMLDivElement>(null);
  const sauce2Ref = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Combo state for dish 2
  const [selectedVariant2, setSelectedVariant2] = useState<DishVariant | null>(null);
  const [selectedExtraPls2, setSelectedExtraPls2] = useState<AddOn[]>([]);
  const [selectedAddOns2, setSelectedAddOns2] = useState<AddOn[]>([]);
  const [incrementalQuantities2, setIncrementalQuantities2] = useState<Map<string, number>>(new Map());
  const [spicyLevel2, setSpicyLevel2] = useState<number | undefined>(undefined);
  const [selectedSauces2, setSelectedSauces2] = useState<string[]>([]);
  
  // Compute isCombo before useEffect so it can be in the dependency array
  const isCombo = dish?.name.includes('2x Pad Krapao') ?? false;
  
  useEffect(() => {
    if (dish && isOpen) {
      // Set default variant
      const defaultVariant = dish.variants?.find(v => v.isDefault) || dish.variants?.[0] || null;
      setSelectedVariant(defaultVariant);
      setSelectedExtraPls([]);
      setSelectedAddOns([]);
      setIncrementalQuantities(new Map());
      setSpicyLevel(dish.spicyRequired ? 2 : undefined); // Default to signature medium
      setSelectedSauces([]);
      setNeedsCutlery(false);
      setQuantity(1);
      setSelectedFreeToppings([]);

      // Reset combo state for dish 2
      if (isCombo) {
        setSelectedVariant2(defaultVariant);
        setSelectedExtraPls2([]);
        setSelectedAddOns2([]);
        setIncrementalQuantities2(new Map());
        setSpicyLevel2(dish.spicyRequired ? 2 : undefined);
        setSelectedSauces2([]);
      }

      setIsOrderTransition(false);
      setShowBasketTransitionContent(false);
    }
  }, [dish, isOpen, isCombo]);
  if (!dish) return null;
  const SAUCES = dish.customSauces || getSaucesByRestaurant(dish.restaurant);

  // Calculate price for incremental items with discount
  const calculateIncrementalPrice = (addon: AddOn, quantity: number) => {
    if (!addon.isIncremental || !addon.incrementalUnit || !addon.incrementalDiscount) {
      return addon.price * quantity;
    }
    const totalGrams = addon.incrementalUnit * quantity;
    const basePrice = addon.price * quantity;
    const discountSets = Math.floor(totalGrams / 100); // Every 100g gets discount
    const discount = discountSets * addon.incrementalDiscount;
    return basePrice - discount;
  };
  const isSmoody = dish.restaurant === 'smoody';
  const getThemeStyles = () => {
    if (dish.restaurant === 'restory') {
      return {
        accent: 'restory',
        bg: 'bg-restory/5',
        border: 'border-restory/20',
        button: 'bg-restory text-restory-foreground hover:bg-restory-secondary'
      };
    }
    if (dish.restaurant === 'smoody') {
      return {
        accent: 'smoody-accent',
        bg: 'bg-smoody-accent/5',
        border: 'border-smoody-accent/20',
        button: 'bg-smoody-accent text-white hover:bg-smoody-accent/90'
      };
    }
    return {
      accent: 'nirvana-accent',
      bg: 'bg-nirvana-accent/5',
      border: 'border-nirvana-accent/20',
      button: 'bg-nirvana-accent text-nirvana-primary hover:bg-nirvana-accent/90'
    };
  };
  const theme = getThemeStyles();

  const getCurrentPrice = () => {
    const basePrice = selectedVariant?.price || dish.price;

    // Calculate extras with incremental pricing
    const extraPlsTotal = selectedExtraPls.reduce((sum, addon) => {
      if (addon.isIncremental) {
        const qty = incrementalQuantities.get(addon.id) || 0;
        return sum + calculateIncrementalPrice(addon, qty);
      }
      return sum + addon.price;
    }, 0);
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const saucesTotal = selectedSauces.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    if (isCombo) {
      // For combo, add the second dish's extras
      const extraPlsTotal2 = selectedExtraPls2.reduce((sum, addon) => {
        if (addon.isIncremental) {
          const qty = incrementalQuantities2.get(addon.id) || 0;
          return sum + calculateIncrementalPrice(addon, qty);
        }
        return sum + addon.price;
      }, 0);
      const addOnsTotal2 = selectedAddOns2.reduce((sum, addon) => sum + addon.price, 0);
      const saucesTotal2 = selectedSauces2.reduce((sum, sauceId) => {
        const sauce = SAUCES.find(s => s.id === sauceId);
        return sum + (sauce?.price || 0);
      }, 0);
      return basePrice + extraPlsTotal + addOnsTotal + saucesTotal + extraPlsTotal2 + addOnsTotal2 + saucesTotal2;
    }
    return basePrice + extraPlsTotal + addOnsTotal + saucesTotal;
  };

  // Filter extra options based on current selection and variant restrictions
  const getFilteredExtraOptions = (dishNumber = 1) => {
    if (!dish.extraOptions) return [];
    const currentVariant = dishNumber === 1 ? selectedVariant : selectedVariant2;
    return dish.extraOptions.filter(option => {
      // Check variant restriction - only show add-on if matches selected variant
      if (option.variantRestriction && currentVariant) {
        return option.variantRestriction === currentVariant.id;
      }
      // If no restriction, always show
      if (option.variantRestriction && !currentVariant) {
        return false; // Hide restricted options if no variant selected
      }
      return true;
    });
  };
  const toggleExtraPls = (addon: AddOn, dishNumber = 1) => {
    // Incremental items are handled differently
    if (addon.isIncremental) return;
    if (dishNumber === 1) {
      setSelectedExtraPls(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
    } else {
      setSelectedExtraPls2(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
    }
  };
  const updateIncrementalQuantity = (addon: AddOn, delta: number, dishNumber = 1) => {
    const currentMap = dishNumber === 1 ? incrementalQuantities : incrementalQuantities2;
    const setMap = dishNumber === 1 ? setIncrementalQuantities : setIncrementalQuantities2;
    const currentExtras = dishNumber === 1 ? selectedExtraPls : selectedExtraPls2;
    const setExtras = dishNumber === 1 ? setSelectedExtraPls : setSelectedExtraPls2;
    const currentQty = currentMap.get(addon.id) || 0;
    const newQty = Math.max(0, currentQty + delta);
    const newMap = new Map(currentMap);
    if (newQty > 0) {
      newMap.set(addon.id, newQty);
      // Add to extras if not already there
      if (!currentExtras.find(a => a.id === addon.id)) {
        setExtras(prev => [...prev, addon]);
      }
    } else {
      newMap.delete(addon.id);
      // Remove from extras if quantity is 0
      setExtras(prev => prev.filter(a => a.id !== addon.id));
    }
    setMap(newMap);
  };
  const toggleAddOn = (addon: AddOn, dishNumber = 1) => {
    if (dishNumber === 1) {
      setSelectedAddOns(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
    } else {
      setSelectedAddOns2(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
    }
  };
  const getTotalPrice = () => {
    return getCurrentPrice() * quantity;
  };
  const canAddToBasket = () => {
    // TOPPINGS items don't require any selections
    if (dish.category === 'TOPPINGS') return true;

    // Smoody, DRINKS, FRESH SALMON, and DESSERT don't require sauce
    if (isSmoody) return true;
    const requiresSauce = dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT';
    const hasSauce = requiresSauce ? selectedSauces.length > 0 : true;
    const hasSpicyLevel = !dish.spicyRequired || spicyLevel !== undefined;
    if (isCombo) {
      const hasSauce2 = selectedSauces2.length > 0;
      const hasSpicyLevel2 = !dish.spicyRequired || spicyLevel2 !== undefined;
      return hasSauce && hasSpicyLevel && hasSauce2 && hasSpicyLevel2;
    }
    return hasSauce && hasSpicyLevel;
  };

  // Validate and scroll to first error
  const validateAndScrollToError = (): boolean => {
    setValidationError(null);

    // TOPPINGS items don't require any selections
    if (dish.category === 'TOPPINGS') return true;
    // Smoody dishes don't require sauce
    if (isSmoody) return true;
    const requiresSauce = dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT';

    // Check spicy level first for dish 1
    if (dish.spicyRequired && spicyLevel === undefined) {
      setValidationError('spicy1');
      spicyRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return false;
    }

    // Check sauce for dish 1
    if (requiresSauce && selectedSauces.length === 0) {
      setValidationError('sauce1');
      sauceRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return false;
    }

    // For combos, check dish 2
    if (isCombo) {
      if (dish.spicyRequired && spicyLevel2 === undefined) {
        setValidationError('spicy2');
        spicy2Ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        return false;
      }
      if (requiresSauce && selectedSauces2.length === 0) {
        setValidationError('sauce2');
        sauce2Ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        return false;
      }
    }
    return true;
  };
  const createBasketItem = (): BasketItem => {
    if (isCombo) {
      return {
        id: `${dish.id}-combo-${Date.now()}`,
        dish,
        selectedVariant,
        addOns: selectedAddOns,
        extraPls: selectedExtraPls,
        incrementalExtras: incrementalQuantities,
        spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
        sauce: selectedSauces.join(', '),
        needsCutlery,
        quantity,
        isCombo: true,
        combo2: {
          selectedVariant: selectedVariant2,
          addOns: selectedAddOns2,
          extraPls: selectedExtraPls2,
          incrementalExtras: incrementalQuantities2,
          spicyLevel: dish.spicyRequired ? spicyLevel2 : undefined,
          sauce: selectedSauces2.join(', ')
        }
      };
    } else {
      return {
        id: `${dish.id}-${Date.now()}`,
        dish,
        selectedVariant,
        addOns: selectedAddOns,
        extraPls: selectedExtraPls,
        incrementalExtras: incrementalQuantities,
        spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
        sauce: selectedSauces.join(', '),
        needsCutlery,
        quantity,
        ...(selectedFreeToppings.length > 0 ? {
          freeToppings: selectedFreeToppings
        } : {})
      };
    }
  };
  const handleAddToBasket = () => {
    if (!validateAndScrollToError()) return;
    const basketItem = createBasketItem();
    const rect = modalContentRef.current?.getBoundingClientRect();
    onAddToBasket(
      basketItem,
      rect
        ? { x: rect.left, y: rect.top, width: rect.width, height: rect.height }
        : undefined,
      { animateDrop: true }
    );
    onClose();
  };
  const handleOrderNow = () => {
    if (!validateAndScrollToError()) return;
    const basketItem = createBasketItem();
    onAddToBasket(basketItem, undefined, { animateDrop: false });

    setIsOrderTransition(true);
    setTimeout(() => {
      setShowBasketTransitionContent(true);
    }, 40);

    setTimeout(() => {
      onClose();
      if (onOrderNow) {
        onOrderNow(basketItem);
      }
    }, 280);
  };

  // Filter add-ons by restaurant prefix
  const restaurantPrefix = dish.restaurant === 'nirvana' ? 'NV-' : dish.restaurant === 'restory' ? 'RS-' : dish.restaurant === 'smoody' ? 'SM-' : 'MHY-';
  const filteredAddOns = addOns.filter(addon => addon.id.startsWith(restaurantPrefix) || addon.id.startsWith('SAN-'));
  const addOnsByCategory = filteredAddOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, AddOn[]>);

  // Smoody grouped extras category config
  const SMOODY_EXTRA_CATEGORIES: {
    key: string;
    label: string;
    emoji: string;
  }[] = [{
    key: 'sm-greek-yo',
    label: 'GREEK YO',
    emoji: '🍨'
  }, {
    key: 'sm-fruits',
    label: 'FRESH FRUITS',
    emoji: '🍓'
  }, {
    key: 'sm-nuts',
    label: 'NUTS & SEEDS',
    emoji: '🥜'
  }, {
    key: 'sm-sauce',
    label: 'SAUCES',
    emoji: '🍯'
  }];

  // Render Smoody grouped extras
  const renderSmoodyGroupedExtras = (dishNumber = 1) => {
    const filteredExtras = getFilteredExtraOptions(dishNumber);
    if (filteredExtras.length === 0) return null;
    const currentExtraPls = dishNumber === 1 ? selectedExtraPls : selectedExtraPls2;
    const grouped = filteredExtras.reduce((acc, addon) => {
      if (!acc[addon.category]) acc[addon.category] = [];
      acc[addon.category].push(addon);
      return acc;
    }, {} as Record<string, AddOn[]>);
    return <div className="mb-6">
        <Label className="text-base font-semibold mb-3">EXTRA TOPPINGS</Label>
        {SMOODY_EXTRA_CATEGORIES.map(({
        key,
        label,
        emoji
      }) => {
        const items = grouped[key];
        if (!items || items.length === 0) return null;
        return <div key={key} className="mb-4">
              <div className="text-sm font-semibold text-muted-foreground mb-1 px-1 my-[6px]">
                {emoji} {label}
              </div>
              <div className="space-y-1">
                {items.map(addon => <Label key={addon.id} htmlFor={`extra-${addon.id}-${dishNumber}`} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                    <div className="flex items-center gap-3">
                      <Checkbox id={`extra-${addon.id}-${dishNumber}`} checked={currentExtraPls.some(a => a.id === addon.id)} onCheckedChange={() => toggleExtraPls(addon, dishNumber)} />
                      <span className="text-sm">{addon.name}</span>
                      {addon.id === 'EXT-GRK-001' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/90 text-white">🔥 PROMO</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {addon.id === 'EXT-GRK-001' && (
                        <span className="text-xs text-muted-foreground line-through">+69</span>
                      )}
                      <span className="text-sm text-muted-foreground">+{addon.price}</span>
                    </div>
                  </Label>)}
              </div>
            </div>;
      })}
      </div>;
  };

  // Render free toppings section for Smoody Greek Yo variants
  const renderFreeToppingsSection = (dishNumber = 1) => {
    const currentVariant = dishNumber === 1 ? selectedVariant : selectedVariant2;
    const limit = currentVariant?.freeToppingsLimit;
    if (!limit || !isSmoody) return null;
    const toppingsByCategory = SMOODY_FREE_TOPPINGS.reduce((acc, t) => {
      if (!acc[t.category]) acc[t.category] = [];
      acc[t.category].push(t);
      return acc;
    }, {} as Record<string, typeof SMOODY_FREE_TOPPINGS>);
    const categoryLabels: Record<string, {
      label: string;
      emoji: string;
    }> = {
      fruits: {
        label: 'FRUITS',
        emoji: '🍓'
      },
      nuts: {
        label: 'NUTS & SEEDS',
        emoji: '🥜'
      },
      sauce: {
        label: 'SAUCES',
        emoji: '🍯'
      }
    };
    return <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
        <Label className="text-base font-semibold mb-1 flex items-center gap-2">
          <Gift className="h-4 w-4 text-green-500" />
          FREE TOPPINGS — Pick {limit}
        </Label>
        <p className="text-xs text-muted-foreground mb-3">
          {selectedFreeToppings.length}/{limit} selected
        </p>
        {Object.entries(toppingsByCategory).map(([cat, toppings]) => {
        const info = categoryLabels[cat];
        if (!info) return null;
        return <div key={cat} className="mb-3">
              <div className="text-sm font-semibold text-muted-foreground mb-1 px-1">
                {info.emoji} {info.label}
              </div>
              <div className="space-y-1">
                {toppings.map(topping => {
              const isSelected = selectedFreeToppings.includes(topping.id);
              const atLimit = selectedFreeToppings.length >= limit && !isSelected;
              return <Label key={topping.id} htmlFor={`free-${topping.id}-${dishNumber}`} className={cn("flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors", atLimit && "opacity-40 pointer-events-none")}>
                      <div className="flex items-center gap-3">
                        <Checkbox id={`free-${topping.id}-${dishNumber}`} checked={isSelected} disabled={atLimit} onCheckedChange={checked => {
                    if (checked) {
                      setSelectedFreeToppings(prev => [...prev, topping.id]);
                    } else {
                      setSelectedFreeToppings(prev => prev.filter(id => id !== topping.id));
                    }
                  }} />
                        <span className="text-sm">{topping.name}</span>
                      </div>
                      <span className="text-xs font-medium text-green-500">FREE</span>
                    </Label>;
            })}
              </div>
            </div>;
      })}
      </div>;
  };

  // Component for rendering customization options
  const renderCustomizationOptions = (dishNumber = 1) => {
    const currentSelectedVariant = dishNumber === 1 ? selectedVariant : selectedVariant2;
    const currentSelectedExtraPls = dishNumber === 1 ? selectedExtraPls : selectedExtraPls2;
    const currentSelectedAddOns = dishNumber === 1 ? selectedAddOns : selectedAddOns2;
    const currentIncrementalQuantities = dishNumber === 1 ? incrementalQuantities : incrementalQuantities2;
    const currentSpicyLevel = dishNumber === 1 ? spicyLevel : spicyLevel2;
    const currentSelectedSauces = dishNumber === 1 ? selectedSauces : selectedSauces2;
    const setCurrentSelectedVariant = dishNumber === 1 ? setSelectedVariant : setSelectedVariant2;
    const setCurrentSpicyLevel = dishNumber === 1 ? setSpicyLevel : setSpicyLevel2;
    const setCurrentSelectedSauces = dishNumber === 1 ? setSelectedSauces : setSelectedSauces2;

    // Refs and error states for this dish number
    const currentSpicyRef = dishNumber === 1 ? spicyRef : spicy2Ref;
    const currentSauceRef = dishNumber === 1 ? sauceRef : sauce2Ref;
    const spicyHasError = validationError === (dishNumber === 1 ? 'spicy1' : 'spicy2');
    const sauceHasError = validationError === (dishNumber === 1 ? 'sauce1' : 'sauce2');
    return <>
        {/* Main Dish Variation - Required */}
        {dish.variants && dish.variants.length > 0 && <div className="mb-6">
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              CHOOSE OPTION <span className="text-red-500">*</span>
              <span className="text-xs text-muted-foreground">({t('dish.required')})</span>
            </Label>
            <RadioGroup value={currentSelectedVariant?.id || ''} onValueChange={value => {
          const variant = dish.variants?.find(v => v.id === value);
          setCurrentSelectedVariant(variant || null);

          // Reset free toppings when variant changes (Smoody)
          if (isSmoody) setSelectedFreeToppings([]);

          // Clear incompatible beef extras when variant changes
          if (dish.name.includes('Premium Beef')) {
            if (dishNumber === 1) {
              setSelectedExtraPls(prev => prev.filter(addon => addon.id !== 'SAN-EXT-004' && addon.id !== 'SAN-EXT-005'));
              setIncrementalQuantities(prev => {
                const newMap = new Map(prev);
                newMap.delete('SAN-EXT-004');
                newMap.delete('SAN-EXT-005');
                return newMap;
              });
            } else {
              setSelectedExtraPls2(prev => prev.filter(addon => addon.id !== 'SAN-EXT-004' && addon.id !== 'SAN-EXT-005'));
              setIncrementalQuantities2(prev => {
                const newMap = new Map(prev);
                newMap.delete('SAN-EXT-004');
                newMap.delete('SAN-EXT-005');
                return newMap;
              });
            }
          }
        }} className="space-y-1">
              {dish.variants.map(variant => {
                const isPromoVariant = variant.id === 'SM-GRK-003-1S';
                return <Label key={variant.id} htmlFor={`variant-${variant.id}-${dishNumber}`} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={variant.id} id={`variant-${variant.id}-${dishNumber}`} />
                    <span>{t(variant.id) === variant.id ? variant.name : t(variant.id)}</span>
                    {isPromoVariant && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500/90 text-white">🔥 PROMO</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isPromoVariant && (
                      <span className="text-xs text-muted-foreground line-through">฿69</span>
                    )}
                    {!isSmoody && variant.price !== dish.price && <span className="text-sm text-muted-foreground">
                        {variant.price > dish.price ? `+${variant.price - dish.price}` : `-${dish.price - variant.price}`}
                      </span>}
                  </div>
                </Label>;
              })}
            </RadioGroup>
          </div>}

        {/* Free Toppings Section (Smoody Greek Yo) */}
        {isSmoody && renderFreeToppingsSection(dishNumber)}

        {/* EXTRA Section */}
        {isSmoody ? renderSmoodyGroupedExtras(dishNumber) : getFilteredExtraOptions(dishNumber).length > 0 && <div className="mb-6">
              <Label className="text-base font-semibold mb-3">
                EXTRA
              </Label>
              <div className="space-y-1">
                {getFilteredExtraOptions(dishNumber).map(addon => {
            if (addon.isIncremental) {
              const qty = currentIncrementalQuantities.get(addon.id) || 0;
              const totalGrams = qty * (addon.incrementalUnit || 20);
              const totalPrice = calculateIncrementalPrice(addon, qty);
              return <div key={addon.id} className="flex items-center justify-between py-2.5 px-3 border rounded-lg">
                        <div className="flex-1">
                          <span className="text-sm font-medium">{t(addon.id)}</span>
                          {qty > 0 && <div className="text-xs text-muted-foreground mt-1">
                              {totalGrams}g • ฿{totalPrice}
                              {totalGrams >= 100 && <span className="ml-2 text-green-600">
                                  (-฿{Math.floor(totalGrams / 100) * (addon.incrementalDiscount || 10)} discount)
                                </span>}
                            </div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => updateIncrementalQuantity(addon, -1, dishNumber)} disabled={qty === 0}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{qty}</span>
                          <Button type="button" variant="outline" size="icon" className="h-8 w-8" onClick={() => updateIncrementalQuantity(addon, 1, dishNumber)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>;
            }
            return <Label key={addon.id} htmlFor={`extra-${addon.id}-${dishNumber}`} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                      <div className="flex items-center gap-3">
                        <Checkbox id={`extra-${addon.id}-${dishNumber}`} checked={currentSelectedExtraPls.some(a => a.id === addon.id)} onCheckedChange={() => toggleExtraPls(addon, dishNumber)} />
                        <span className="text-sm">{t(addon.id)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {addon.price > 0 ? `+${addon.price}` : '+0'}
                      </span>
                    </Label>;
          })}
              </div>
            </div>}

        {/* Spicy Level - Required for Pad Krapao only */}
        {dish.spicyRequired && <div ref={currentSpicyRef} className={cn("mb-6 p-3 rounded-lg transition-all duration-300", spicyHasError && "border-2 border-red-500 bg-red-500/10")}>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              SPICY LEVEL <span className="text-red-500">*</span>
              <span className="text-xs text-muted-foreground">({t('dish.required')})</span>
              {spicyHasError && <span className="text-red-500 text-xs ml-2">Please select</span>}
            </Label>
            <RadioGroup value={currentSpicyLevel?.toString() || ''} onValueChange={value => {
          setCurrentSpicyLevel(Number(value));
          if (spicyHasError) setValidationError(null);
        }} className="space-y-1">
              {SPICY_LEVELS.map(level => <Label key={level.level} htmlFor={`spicy-${level.level}-${dishNumber}`} className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                  <RadioGroupItem value={level.level.toString()} id={`spicy-${level.level}-${dishNumber}`} />
                  <span>{t(`SAN-SPI-00${level.level + 1}`)}</span>
                </Label>)}
            </RadioGroup>
          </div>}

        {/* Add-ons - Skip for Smoody, DRINKS, FRESH SALMON, and DESSERT */}
        {!isSmoody && dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT' && Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => <div key={category} className="mb-6">
            <Label className="text-base font-semibold mb-3">
              {category === 'other' ? 'ADD-ONS' : category === 'fried-egg' ? 'FRIED EGG 🍳' : category === 'thai-omelette' ? 'THAI STYLE OMELETTE 🍳' : category === 'creamy-omelette' ? 'CREAMY OMELETTE 🍳' : category === 'soft-omelette' ? 'SOFT OMELETTE 🍳' : category.toUpperCase()}
            </Label>
            <div className="space-y-1">
              {categoryAddOns.map(addon => <Label key={addon.id} htmlFor={`${addon.id}-${dishNumber}`} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <Checkbox id={`${addon.id}-${dishNumber}`} checked={currentSelectedAddOns.some(a => a.id === addon.id)} onCheckedChange={() => toggleAddOn(addon, dishNumber)} />
                    <span className="text-sm">{t(addon.id)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {addon.price > 0 ? `+${addon.price}` : '+0'}
                  </span>
                </Label>)}
            </div>
          </div>)}

        {/* Sauce Selection - Required (Skip for Smoody, DRINKS, FRESH SALMON, and DESSERT) */}
        {!isSmoody && dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT' && <div ref={currentSauceRef} className={cn("mb-6 p-3 rounded-lg transition-all duration-300", sauceHasError && "border-2 border-red-500 bg-red-500/10")}>
          <Label className="text-base font-semibold mb-3 flex items-center gap-2">
            SELECT SAUCE <span className="text-red-500">*</span>
            <span className="text-xs text-muted-foreground">({t('dish.required')})</span>
            {sauceHasError && <span className="text-red-500 text-xs ml-2">Please select</span>}
          </Label>
          {dish.customSauces ?
        // Radio buttons for dishes with custom sauces (single selection)
        <RadioGroup value={currentSelectedSauces[0] || ''} onValueChange={value => {
          setCurrentSelectedSauces([value]);
          if (sauceHasError) setValidationError(null);
        }} className="space-y-1">
              {dish.customSauces.map(sauce => <Label key={sauce.id} htmlFor={`${sauce.id}-${dishNumber}`} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={sauce.id} id={`${sauce.id}-${dishNumber}`} />
                    <span>{t(sauce.id)}</span>
                  </div>
                  {sauce.price > 0 && <span className="text-sm text-muted-foreground">
                      +{sauce.price}
                    </span>}
                </Label>)}
            </RadioGroup> :
        // Checkboxes for regular dishes (multiple selection allowed)
        <div className="space-y-1">
              {SAUCES.map(sauce => {
            const isFreeSauce = sauce.price === 0;
            const isNoSauce = sauce.id === 'SAN-SAU-008';
            const noSauceSelected = currentSelectedSauces.includes('SAN-SAU-008');
            const selectedFreeSauce = currentSelectedSauces.find(id => {
              const s = SAUCES.find(s => s.id === id);
              return s && s.price === 0 && s.id !== 'SAN-SAU-008';
            });
            let disabled = false;
            if (isNoSauce) {
              disabled = false;
            } else if (noSauceSelected) {
              disabled = true;
            } else if (isFreeSauce) {
              disabled = selectedFreeSauce && selectedFreeSauce !== sauce.id;
            } else {
              disabled = false;
            }
            return <Label key={sauce.id} htmlFor={`${sauce.id}-${dishNumber}`} className={cn("flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded-md py-2.5 px-3 transition-colors", disabled && "opacity-40 pointer-events-none")}>
                    <div className="flex items-center gap-3">
                      <Checkbox id={`${sauce.id}-${dishNumber}`} checked={currentSelectedSauces.includes(sauce.id)} disabled={disabled} onCheckedChange={checked => {
                  // Clear validation error when user selects
                  if (sauceHasError) setValidationError(null);

                  // Don't allow changes if disabled (no sauce is selected)
                  if (disabled) return;
                  if (isNoSauce) {
                    if (checked) {
                      setCurrentSelectedSauces(['SAN-SAU-008']);
                    } else {
                      setCurrentSelectedSauces([]);
                    }
                    return;
                  }
                  if (isFreeSauce) {
                    if (checked) {
                      // Keep paid sauces, remove other free sauces, add this free sauce
                      const paidSauces = currentSelectedSauces.filter(id => {
                        const s = SAUCES.find(s => s.id === id);
                        return s && s.price > 0;
                      });
                      setCurrentSelectedSauces([...paidSauces, sauce.id]);
                    } else {
                      setCurrentSelectedSauces(prev => prev.filter(id => id !== sauce.id));
                    }
                    return;
                  }
                  // For paid sauces, don't allow selection if no sauce is selected
                  if (noSauceSelected) return;
                  if (checked) {
                    setCurrentSelectedSauces(prev => [...prev.filter(id => id !== 'SAN-SAU-008'), sauce.id]);
                  } else {
                    setCurrentSelectedSauces(prev => prev.filter(id => id !== sauce.id));
                  }
                }} />
                      <span>{t(sauce.id)}</span>
                    </div>
                    {sauce.price > 0 && <span className="text-sm text-muted-foreground">
                        +{sauce.price}
                      </span>}
                  </Label>;
          })}
            </div>}
        </div>}
      </>;
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent ref={modalContentRef} className="max-w-md max-h-[90vh] rounded-2xl p-0 flex flex-col overflow-hidden">
        <div className="relative flex-1 overflow-hidden flex flex-col">
          <div className={cn('pointer-events-none absolute inset-0 z-10 transition-opacity duration-[220ms] ease-out', isOrderTransition ? 'opacity-100 bg-background/10 backdrop-blur-[1.5px]' : 'opacity-0')} />
          <div className={cn('flex-1 overflow-hidden flex flex-col transition-[opacity,transform,filter] duration-[220ms] ease-out', isOrderTransition ? 'opacity-0 scale-[0.98] blur-[1px]' : 'opacity-100 scale-100')}>
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="p-6 pb-4">
              <DialogHeader className="mb-6">
                <DialogDescription className="sr-only">
                  Customize your dish options, add-ons, and preferences
                </DialogDescription>
                {/* Dish Image */}
                <div>
                  <div className={cn('w-full h-48 rounded-lg mb-4 overflow-hidden', theme.border)}>
                    {dish.image ? (
                      <OptimizedImage 
                        src={dish.image} 
                        alt={dish.name}
                        className="w-full h-full object-cover"
                        containerClassName={theme.bg}
                      />
                    ) : (
                      <div className={cn('w-full h-full flex items-center justify-center text-muted-foreground', theme.bg)}>
                        <div className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-current/10 flex items-center justify-center">
                            🍽️
                          </div>
                          <span className="text-xs">No Image</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <DialogTitle className="text-xl font-bold">
                  {(() => {
                    const translated = t(dish.id);
                    return (!translated || translated === dish.id) ? dish.name : translated;
                  })()}
                  {dish.isSpecial && <span className="ml-2">⭐</span>}
                </DialogTitle>
                
                {dish.description && <p className="text-sm text-muted-foreground mt-2">
                    {dish.description}
                  </p>}
                
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="secondary" className="capitalize">
                    {dish.restaurant}
                  </Badge>
                  <span className={cn('text-2xl font-bold', `text-${theme.accent}`)}>
                    {getCurrentPrice()}
                  </span>
                </div>
              </DialogHeader>

              {/* Simplified view for TOPPINGS - only quantity selection */}
              {dish.category !== 'TOPPINGS' && <>
                  {isCombo ? <>
                      <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          🍽️ DISH 1 CUSTOMIZATION
                        </h3>
                        {renderCustomizationOptions(1)}
                      </div>
                      
                      <Separator className="my-6" />
                      
                      <div className="mb-8">
                        <h3 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                          🍽️ DISH 2 CUSTOMIZATION
                        </h3>
                        {renderCustomizationOptions(2)}
                      </div>
                    </> : renderCustomizationOptions(1)}

                  {/* Cutlery - Required (Skip for DRINKS) */}
                  {dish.category !== 'DRINKS' && <div className="mb-6">
                     <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                      {t('dish.cutleryQuestion')} <span className="text-red-500">*</span>
                      <span className="text-xs text-muted-foreground">({t('dish.required')})</span>
                    </Label>
                    <RadioGroup value={needsCutlery.toString()} onValueChange={value => setNeedsCutlery(value === 'true')} className="gap-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="cutlery-yes" />
                        <Label htmlFor="cutlery-yes">{t('dish.cutleryYes')}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="cutlery-no" />
                        <Label htmlFor="cutlery-no">{t('dish.cutleryNo')}</Label>
                      </div>
                    </RadioGroup>
                  </div>}

                  <Separator className="my-6" />
                </>}

            </div>
          </ScrollArea>
          
          {/* Sticky Footer - Quantity, Total, and Buttons */}
          <div className="sticky bottom-0 bg-background border-t border-border p-4 space-y-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Quantity</Label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold w-8 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span className={cn(`text-${theme.accent}`)}>
                ฿{getTotalPrice()}
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddToBasket}
                onPointerDown={() => setIsAddPressed(true)}
                onPointerUp={() => setIsAddPressed(false)}
                onPointerCancel={() => setIsAddPressed(false)}
                onPointerLeave={() => setIsAddPressed(false)}
                variant="outline"
                className={cn('flex-1 gap-2 transition-[transform,box-shadow,filter] duration-[85ms] ease-out', isAddPressed && 'scale-[0.97] brightness-[0.98] shadow-sm')}
                size="lg"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Basket
              </Button>
              <Button
                onClick={handleOrderNow}
                onPointerDown={() => setIsOrderPressed(true)}
                onPointerUp={() => setIsOrderPressed(false)}
                onPointerCancel={() => setIsOrderPressed(false)}
                onPointerLeave={() => setIsOrderPressed(false)}
                className={cn('flex-1 gap-2 transition-[transform,box-shadow,filter] duration-[90ms] ease-out', theme.button, isOrderPressed && 'scale-[0.96] brightness-[0.97] shadow-sm')}
                size="lg"
              >
                <Zap className="h-4 w-4" />
                Order Now
              </Button>
            </div>
          </div>
          </div>

          <div className={cn('absolute inset-0 bg-background/95 backdrop-blur-sm transition-[opacity] duration-[200ms] ease-out flex items-center justify-center', showBasketTransitionContent ? 'opacity-100' : 'opacity-0 pointer-events-none')}> 
            <div className="text-center">
              <div className="text-4xl mb-3">✓</div>
              <div className="text-lg font-semibold">Added to Order</div>
              <div className="text-sm text-muted-foreground mt-1">Opening basket...</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default DishModal;
