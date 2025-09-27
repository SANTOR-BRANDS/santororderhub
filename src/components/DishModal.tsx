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
    }
  }, [dish, isOpen]);

  if (!dish) return null;

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
    return selectedVariant?.price || dish.price;
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

  const toggleExtraPls = (addon: AddOn) => {
    setSelectedExtraPls(prev => 
      prev.find(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const getTotalPrice = () => {
    const basePrice = getCurrentPrice();
    const extraPlsTotal = selectedExtraPls.reduce((sum, addon) => sum + addon.price, 0);
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const saucesTotal = selectedSauces.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    return (basePrice + extraPlsTotal + addOnsTotal + saucesTotal) * quantity;
  };

  const canAddToBasket = () => {
    const hasSauce = selectedSauces.length > 0;
    const hasSpicyLevel = !dish.spicyRequired || spicyLevel !== undefined;
    return hasSauce && hasSpicyLevel;
  };

  const handleAddToBasket = () => {
    if (!canAddToBasket()) return;
    
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
    onClose();
  };

  const addOnsByCategory = addOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, AddOn[]>);

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
                    ฿{getCurrentPrice()}
                  </span>
                </div>
              </DialogHeader>

              {/* Main Dish Variation - Required */}
              {dish.variants && dish.variants.length > 0 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    Choose Option <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Required)</span>
                  </Label>
                  <RadioGroup 
                    value={selectedVariant?.id || ''} 
                    onValueChange={(value) => {
                      const variant = dish.variants?.find(v => v.id === value);
                      setSelectedVariant(variant || null);
                    }} 
                    className="gap-2"
                  >
                    {dish.variants.map(variant => (
                      <div key={variant.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={variant.id} id={`variant-${variant.id}`} />
                          <Label htmlFor={`variant-${variant.id}`} className="flex items-center gap-2">
                            <span>{variant.name}</span>
                            {variant.price !== dish.price && (
                              <span className="text-sm text-muted-foreground">
                                {variant.price > dish.price ? `+฿${variant.price - dish.price}` : `-฿${dish.price - variant.price}`}
                              </span>
                            )}
                          </Label>
                        </div>
                        <span className="text-sm font-semibold">฿{variant.price}</span>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* EXTRA PLS Section */}
              {getFilteredExtraOptions().length > 0 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    EXTRA PLS
                  </Label>
                  <div className="space-y-2">
                    {getFilteredExtraOptions().map(addon => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`extra-${addon.id}`} 
                            checked={selectedExtraPls.some(a => a.id === addon.id)} 
                            onCheckedChange={() => toggleExtraPls(addon)} 
                          />
                          <Label htmlFor={`extra-${addon.id}`} className="text-sm">
                            {addon.name}
                          </Label>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          +฿{addon.price}
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
                    Spicy Level <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Required)</span>
                  </Label>
                  <RadioGroup 
                    value={spicyLevel?.toString()} 
                    onValueChange={(value) => setSpicyLevel(Number(value))} 
                    className="gap-2"
                  >
                    {SPICY_LEVELS.map(level => (
                      <div key={level.level} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.level.toString()} id={`spicy-${level.level}`} />
                        <Label htmlFor={`spicy-${level.level}`} className="flex items-center gap-2">
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

              {/* Add-ons */}
              {Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => (
                <div key={category} className="mb-6">
                  <Label className="text-base font-semibold mb-3 capitalize">
                    {category === 'other' ? 'ADD-ONS' : 
                     category === 'thai-omelette' ? 'Thai Style Omelette 🍳' : 
                     category === 'creamy-omelette' ? 'Creamy Omelette 🍳' : 
                     category === 'soft-omelette' ? 'Soft Omelette 🍳' : 
                     category}
                  </Label>
                  <div className="space-y-2">
                    {categoryAddOns.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={addon.id} 
                            checked={selectedAddOns.some(a => a.id === addon.id)} 
                            onCheckedChange={() => toggleAddOn(addon)} 
                          />
                          <Label htmlFor={addon.id} className="text-sm">
                            {addon.name}
                          </Label>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          +฿{addon.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Sauce Selection - Required */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  Select Sauce <span className="text-red-500">*</span>
                  <span className="text-xs text-muted-foreground">(Required)</span>
                </Label>
                <div className="space-y-2">
                  {SAUCES.map(sauce => {
                    const isNoSauce = sauce.id === 'no-sauce';
                    return (
                      <div key={sauce.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {isNoSauce ? (
                            <Button
                              variant={selectedSauces.includes(sauce.id) ? "default" : "outline"}
                              size="sm"
                              onClick={() => {
                                if (selectedSauces.includes(sauce.id)) {
                                  setSelectedSauces([]);
                                } else {
                                  setSelectedSauces([sauce.id]);
                                }
                              }}
                              className="text-xs"
                            >
                              {sauce.name}
                            </Button>
                          ) : (
                            <>
                              <Checkbox 
                                id={sauce.id} 
                                checked={selectedSauces.includes(sauce.id)} 
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedSauces(prev => [...prev.filter(id => id !== 'no-sauce'), sauce.id]);
                                  } else {
                                    setSelectedSauces(prev => prev.filter(id => id !== sauce.id));
                                  }
                                }}
                              />
                              <Label htmlFor={sauce.id}>
                                {sauce.name}
                              </Label>
                            </>
                          )}
                        </div>
                        {!isNoSauce && (
                          <span className="text-sm text-muted-foreground">
                            +฿{sauce.price}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cutlery - Required */}
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
                    ฿{getTotalPrice()}
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