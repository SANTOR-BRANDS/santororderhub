import { useState, useEffect } from 'react';
import { Dish, AddOn, SPICY_LEVELS, SAUCES, BasketItem, DishVariant } from '@/types/menu';
import { addOns } from '@/data/menuData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Plus, Minus } from 'lucide-react';

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBasket: (item: BasketItem) => void;
}

const DishModal = ({
  dish,
  isOpen,
  onClose,
  onAddToBasket
}: DishModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | null>(null);
  const [selectedExtraPls, setSelectedExtraPls] = useState<AddOn[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<number | undefined>(undefined);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [needsCutlery, setNeedsCutlery] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Combo state for dish 2
  const [selectedVariant2, setSelectedVariant2] = useState<DishVariant | null>(null);
  const [selectedExtraPls2, setSelectedExtraPls2] = useState<AddOn[]>([]);
  const [selectedAddOns2, setSelectedAddOns2] = useState<AddOn[]>([]);
  const [spicyLevel2, setSpicyLevel2] = useState<number | undefined>(undefined);
  const [selectedSauces2, setSelectedSauces2] = useState<string[]>([]);

  useEffect(() => {
    if (dish && isOpen) {
      // Set default variant
      const defaultVariant = dish.variants?.find(v => v.isDefault) || dish.variants?.[0] || null;
      setSelectedVariant(defaultVariant);
      setSelectedExtraPls([]);
      setSelectedAddOns([]);
      setSpicyLevel(dish.spicyRequired ? 2 : undefined); // Default to signature medium
      setSelectedSauces([]);
      setNeedsCutlery(false);
      setQuantity(1);

      // Reset combo state for dish 2
      if (isCombo) {
        setSelectedVariant2(defaultVariant);
        setSelectedExtraPls2([]);
        setSelectedAddOns2([]);
        setSpicyLevel2(dish.spicyRequired ? 2 : undefined);
        setSelectedSauces2([]);
      }
    }
  }, [dish, isOpen]);

  if (!dish) return null;

  const isCombo = dish.name.includes('2x Pad Krapao');

  const getThemeStyles = () => {
    return dish.restaurant === 'restory' ? {
      accent: 'restory',
      bg: 'bg-restory/5',
      border: 'border-restory/20',
      button: 'bg-restory text-restory-foreground hover:bg-restory-secondary'
    } : {
      accent: 'nirvana-accent',
      bg: 'bg-nirvana-accent/5',
      border: 'border-nirvana-accent/20',
      button: 'bg-nirvana-accent text-nirvana-primary hover:bg-nirvana-accent/90'
    };
  };

  const theme = getThemeStyles();

  const getCurrentPrice = () => {
    const basePrice = selectedVariant?.price || dish.price;
    const extraPlsTotal = selectedExtraPls.reduce((sum, addon) => sum + addon.price, 0);
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const saucesTotal = selectedSauces.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);

    if (isCombo) {
      // For combo, add the second dish's extras
      const extraPlsTotal2 = selectedExtraPls2.reduce((sum, addon) => sum + addon.price, 0);
      const addOnsTotal2 = selectedAddOns2.reduce((sum, addon) => sum + addon.price, 0);
      const saucesTotal2 = selectedSauces2.reduce((sum, sauceId) => {
        const sauce = SAUCES.find(s => s.id === sauceId);
        return sum + (sauce?.price || 0);
      }, 0);
      return basePrice + extraPlsTotal + addOnsTotal + saucesTotal + extraPlsTotal2 + addOnsTotal2 + saucesTotal2;
    }
    return basePrice + extraPlsTotal + addOnsTotal + saucesTotal;
  };

  const isPremiumBeef = dish.name.includes('Premium Beef') && selectedVariant?.id === 'premium';
  const isNormalBeef = dish.name.includes('Premium Beef') && selectedVariant?.id === 'normal';

  // Filter extra options based on current selection
  const getFilteredExtraOptions = () => {
    if (!dish.extraOptions) return [];
    return dish.extraOptions.filter(option => {
      if (dish.name.includes('Premium Beef')) {
        if (option.id === 'extra-premium-beef') return isPremiumBeef;
        if (option.id === 'extra-beef') return isNormalBeef;
      }
      return true;
    });
  };

  const toggleExtraPls = (addon: AddOn, dishNumber = 1) => {
    if (dishNumber === 1) {
      setSelectedExtraPls(prev => 
        prev.find(a => a.id === addon.id) 
          ? prev.filter(a => a.id !== addon.id) 
          : [...prev, addon]
      );
    } else {
      setSelectedExtraPls2(prev => 
        prev.find(a => a.id === addon.id) 
          ? prev.filter(a => a.id !== addon.id) 
          : [...prev, addon]
      );
    }
  };

  const toggleAddOn = (addon: AddOn, dishNumber = 1) => {
    if (dishNumber === 1) {
      setSelectedAddOns(prev => 
        prev.find(a => a.id === addon.id) 
          ? prev.filter(a => a.id !== addon.id) 
          : [...prev, addon]
      );
    } else {
      setSelectedAddOns2(prev => 
        prev.find(a => a.id === addon.id) 
          ? prev.filter(a => a.id !== addon.id) 
          : [...prev, addon]
      );
    }
  };

  const getTotalPrice = () => {
    return getCurrentPrice() * quantity;
  };

  const canAddToBasket = () => {
    // DRINKS, FRESH SALMON, and DESSERT don't require sauce
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

  const handleAddToBasket = () => {
    if (!canAddToBasket()) return;
    if (isCombo) {
      // Add two separate basket items for combo
      const basketItem1: BasketItem = {
        id: `${dish.id}-1-${Date.now()}`,
        dish: { ...dish, name: 'Pad Krapao Minced Pork (Combo 1/2)' },
        selectedVariant,
        addOns: selectedAddOns,
        extraPls: selectedExtraPls,
        spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
        sauce: selectedSauces.join(', '),
        needsCutlery,
        quantity,
        isPremiumBeef
      };

      const basketItem2: BasketItem = {
        id: `${dish.id}-2-${Date.now()}`,
        dish: { ...dish, name: 'Pad Krapao Minced Pork (Combo 2/2)' },
        selectedVariant: selectedVariant2,
        addOns: selectedAddOns2,
        extraPls: selectedExtraPls2,
        spicyLevel: dish.spicyRequired ? spicyLevel2 : undefined,
        sauce: selectedSauces2.join(', '),
        needsCutlery: false, // Only need cutlery once
        quantity,
        isPremiumBeef
      };
      onAddToBasket(basketItem1);
      onAddToBasket(basketItem2);
    } else {
      const basketItem: BasketItem = {
        id: `${dish.id}-${Date.now()}`,
        dish,
        selectedVariant,
        addOns: selectedAddOns,
        extraPls: selectedExtraPls,
        spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
        sauce: selectedSauces.join(', '),
        needsCutlery,
        quantity,
        isPremiumBeef
      };
      onAddToBasket(basketItem);
    }
    onClose();
  };

  const addOnsByCategory = addOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, AddOn[]>);

  // Component for rendering customization options
  const renderCustomizationOptions = (dishNumber = 1) => {
    const currentSelectedVariant = dishNumber === 1 ? selectedVariant : selectedVariant2;
    const currentSelectedExtraPls = dishNumber === 1 ? selectedExtraPls : selectedExtraPls2;
    const currentSelectedAddOns = dishNumber === 1 ? selectedAddOns : selectedAddOns2;
    const currentSpicyLevel = dishNumber === 1 ? spicyLevel : spicyLevel2;
    const currentSelectedSauces = dishNumber === 1 ? selectedSauces : selectedSauces2;
    const setCurrentSelectedVariant = dishNumber === 1 ? setSelectedVariant : setSelectedVariant2;
    const setCurrentSpicyLevel = dishNumber === 1 ? setSpicyLevel : setSpicyLevel2;
    const setCurrentSelectedSauces = dishNumber === 1 ? setSelectedSauces : setSelectedSauces2;

    return (
      <>
        {/* Main Dish Variation - Required */}
        {dish.variants && dish.variants.length > 0 && (
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              CHOOSE OPTION <span className="text-red-500">*</span>
              <span className="text-xs text-muted-foreground">(Required)</span>
            </Label>
            <RadioGroup 
              value={currentSelectedVariant?.id || ''} 
              onValueChange={(value) => {
                const variant = dish.variants?.find(v => v.id === value);
                setCurrentSelectedVariant(variant || null);
              }} 
              className="gap-2"
            >
              {dish.variants.map(variant => (
                <div key={variant.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={variant.id} id={`variant-${variant.id}-${dishNumber}`} />
                    <Label htmlFor={`variant-${variant.id}-${dishNumber}`} className="flex items-center gap-2">
                      <span>{variant.name}</span>
                    </Label>
                  </div>
                  {/* Only show price if not zero */}
                  {variant.price !== dish.price && (
                    <span className="text-sm text-muted-foreground">
                      {variant.price > dish.price ? `+${variant.price - dish.price}` : `-${dish.price - variant.price}`}
                    </span>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* EXTRA Section */}
        {getFilteredExtraOptions().length > 0 && (
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3">
              EXTRA
            </Label>
            <div className="space-y-2">
              {getFilteredExtraOptions().map(addon => (
                <div key={addon.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`extra-${addon.id}-${dishNumber}`} 
                      checked={currentSelectedExtraPls.some(a => a.id === addon.id)} 
                      onCheckedChange={() => toggleExtraPls(addon, dishNumber)} 
                    />
                    <Label htmlFor={`extra-${addon.id}-${dishNumber}`} className="text-sm">
                      {addon.name}
                    </Label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {addon.price > 0 ? `+${addon.price}` : '+0'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spicy Level - Required for Pad Krapao only */}
        {dish.spicyRequired && (
          <div className="mb-6">
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              SPICY LEVEL <span className="text-red-500">*</span>
              <span className="text-xs text-muted-foreground">(Required)</span>
            </Label>
            <RadioGroup 
              value={currentSpicyLevel?.toString()} 
              onValueChange={(value) => setCurrentSpicyLevel(Number(value))} 
              className="gap-2"
            >
              {SPICY_LEVELS.map(level => (
                <div key={level.level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level.level.toString()} id={`spicy-${level.level}-${dishNumber}`} />
                  <Label htmlFor={`spicy-${level.level}-${dishNumber}`} className="flex items-center gap-2">
                    <span>({level.level})</span>
                    <span>{level.emoji}</span>
                    <span>{level.label}</span>
                    {level.level === 2 && <Badge variant="outline" className="text-xs">✨</Badge>}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Add-ons - Skip for DRINKS, FRESH SALMON, and DESSERT */}
        {dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT' && Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => (
          <div key={category} className="mb-6">
            <Label className="text-base font-semibold mb-3">
              {category === 'other' ? 'ADD-ONS' : 
               category === 'fried-egg' ? 'FRIED EGG 🍳' : 
               category === 'thai-omelette' ? 'THAI STYLE OMELETTE 🍳' : 
               category === 'creamy-omelette' ? 'CREAMY OMELETTE 🍳' : 
               category === 'soft-omelette' ? 'SOFT OMELETTE 🍳' : 
               category.toUpperCase()}
            </Label>
            <div className="space-y-2">
              {categoryAddOns.map(addon => (
                <div key={addon.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`${addon.id}-${dishNumber}`} 
                      checked={currentSelectedAddOns.some(a => a.id === addon.id)} 
                      onCheckedChange={() => toggleAddOn(addon, dishNumber)} 
                    />
                    <Label htmlFor={`${addon.id}-${dishNumber}`} className="text-sm">
                      {addon.name}
                    </Label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {addon.price > 0 ? `+${addon.price}` : '+0'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sauce Selection - Required (Skip for DRINKS, FRESH SALMON, and DESSERT) */}
        {dish.category !== 'DRINKS' && dish.category !== 'FRESH SALMON' && dish.category !== 'DESSERT' && (
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 flex items-center gap-2">
            SELECT SAUCE <span className="text-red-500">*</span>
            <span className="text-xs text-muted-foreground">(Required)</span>
          </Label>
          <div className="space-y-2">
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

              return (
                <div
                  key={sauce.id}
                  className={`flex items-center justify-between ${disabled ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
                  style={{ transition: 'opacity 0.2s' }}
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${sauce.id}-${dishNumber}`}
                      checked={currentSelectedSauces.includes(sauce.id)}
                      disabled={disabled}
                      onCheckedChange={(checked) => {
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
                      }}
                    />
                    <Label htmlFor={`${sauce.id}-${dishNumber}`}>{sauce.name}</Label>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {sauce.price > 0 ? `+${sauce.price}` : '+0'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        )}
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] p-0">
        <div className="max-h-[90vh] overflow-hidden">
          <ScrollArea className="max-h-[85vh] overflow-y-auto">
            <div className="p-6">
              <DialogHeader className="mb-6">
                {/* Dish Image */}
                <div className={cn('w-full h-48 rounded-lg mb-4 overflow-hidden', theme.border)}>
                  {dish.image ? (
                    <img 
                      src={dish.image} 
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={cn(
                    'w-full h-full flex items-center justify-center text-muted-foreground',
                    theme.bg,
                    dish.image ? 'hidden' : ''
                  )}>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-current/10 flex items-center justify-center">
                        🍽️
                      </div>
                      <span className="text-xs">No Image</span>
                    </div>
                  </div>
                </div>

                <DialogTitle className="text-xl font-bold">
                  {dish.name}
                  {dish.isSpecial && <span className="ml-2">⭐</span>}
                </DialogTitle>
                
                {dish.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {dish.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <Badge variant="secondary" className="capitalize">
                    {dish.restaurant}
                  </Badge>
                  <span className={cn('text-2xl font-bold', `text-${theme.accent}`)}>
                    {getCurrentPrice()}
                  </span>
                </div>
              </DialogHeader>

              {isCombo ? (
                <>
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
                </>
              ) : (
                renderCustomizationOptions(1)
              )}

              {/* Cutlery - Required (Skip for DRINKS) */}
              {dish.category !== 'DRINKS' && (
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  Need cutlery? <span className="text-red-500">*</span>
                  <span className="text-xs text-muted-foreground">(Required)</span>
                </Label>
                <RadioGroup 
                  value={needsCutlery.toString()} 
                  onValueChange={(value) => setNeedsCutlery(value === 'true')} 
                  className="gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true" id="cutlery-yes" />
                    <Label htmlFor="cutlery-yes">Yes, please</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="false" id="cutlery-no" />
                    <Label htmlFor="cutlery-no">No (help reduce pollution) 🫡</Label>
                  </div>
                </RadioGroup>
              </div>
              )}

              <Separator className="my-6" />

              {/* Quantity and Total */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold w-8 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className={cn(`text-${theme.accent}`)}>
                    {getTotalPrice()}
                  </span>
                </div>

                <Button 
                  onClick={handleAddToBasket} 
                  disabled={!canAddToBasket()} 
                  className={cn('w-full', theme.button)} 
                  size="lg"
                >
                  Add to Basket
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishModal;
