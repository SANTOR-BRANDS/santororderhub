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
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [spicyLevel, setSpicyLevel] = useState<number | undefined>(undefined);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [needsCutlery, setNeedsCutlery] = useState<'yes' | 'no' | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | null>(null);
  const [switchedToNormalBeef, setSwitchedToNormalBeef] = useState(false);
  const [comboItems, setComboItems] = useState<Array<{
    spicyLevel?: number;
    selectedSauces: string[];
    selectedAddOns: AddOn[];
  }>>([]);

  useEffect(() => {
    if (dish && isOpen) {
      setSelectedAddOns([]);
      setSpicyLevel(dish.spicyRequired ? 2 : undefined); // Default to signature medium
      setSelectedSauces([]);
      setNeedsCutlery(null);
      setQuantity(1);
      setSelectedVariant(null);
      setSwitchedToNormalBeef(false);
      
      // Initialize combo items for 2x dishes
      if (dish.isComboFor2) {
        setComboItems([
          { spicyLevel: dish.spicyRequired ? 2 : undefined, selectedSauces: [], selectedAddOns: [] },
          { spicyLevel: dish.spicyRequired ? 2 : undefined, selectedSauces: [], selectedAddOns: [] }
        ]);
      } else {
        setComboItems([]);
      }
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

  const filteredAddOns = addOns.filter(addon => {
    if (addon.category === 'meat') {
      if (addon.id === 'extra-chicken' && !dish.name.toLowerCase().includes('chicken')) return false;
      if (addon.id === 'extra-pork' && !dish.name.toLowerCase().includes('pork')) return false;
      if (addon.id === 'extra-beef' && !dish.name.toLowerCase().includes('beef')) return false;
      if (addon.id === 'extra-premium-beef') {
        // Only show premium beef for premium beef dishes that haven't switched to normal beef
        return dish.isPremiumBeef && !switchedToNormalBeef;
      }
    }
    if (addon.id === 'extra-rice' && dish.name.toLowerCase().includes('noodle')) return false;
    return true;
  });

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev => 
      prev.find(a => a.id === addon.id) ? 
      prev.filter(a => a.id !== addon.id) : 
      [...prev, addon]
    );
  };

  const toggleComboAddOn = (comboIndex: number, addon: AddOn) => {
    setComboItems(prev => prev.map((item, index) => {
      if (index === comboIndex) {
        const exists = item.selectedAddOns.find(a => a.id === addon.id);
        return {
          ...item,
          selectedAddOns: exists ? 
            item.selectedAddOns.filter(a => a.id !== addon.id) :
            [...item.selectedAddOns, addon]
        };
      }
      return item;
    }));
  };

  const getCurrentPrice = () => {
    if (dish.hasBeefSwitchOption && switchedToNormalBeef) {
      return dish.price - 50; // Normal beef is 50 THB less
    }
    if (selectedVariant) {
      return dish.price + selectedVariant.priceModifier;
    }
    return dish.price;
  };

  const getTotalPrice = () => {
    const basePrice = getCurrentPrice();
    
    if (dish.isComboFor2) {
      const comboAddOnsTotal = comboItems.reduce((sum, item) => {
        return sum + item.selectedAddOns.reduce((addonSum, addon) => addonSum + addon.price, 0);
      }, 0);
      const comboSaucesTotal = comboItems.reduce((sum, item) => {
        return sum + item.selectedSauces.reduce((sauceSum, sauceId) => {
          const sauce = SAUCES.find(s => s.id === sauceId);
          return sauceSum + (sauce?.price || 0);
        }, 0);
      }, 0);
      return (basePrice + comboAddOnsTotal + comboSaucesTotal) * quantity;
    }

    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const saucesTotal = selectedSauces.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    return (basePrice + addOnsTotal + saucesTotal) * quantity;
  };

  const canAddToBasket = () => {
    if (dish.isComboFor2) {
      return comboItems.every(item => {
        const hasSauce = item.selectedSauces.length > 0;
        const hasSpicyLevel = !dish.spicyRequired || item.spicyLevel !== undefined;
        return hasSauce && hasSpicyLevel;
      }) && needsCutlery !== null;
    }

    const hasSauce = selectedSauces.length > 0;
    const hasSpicyLevel = !dish.spicyRequired || spicyLevel !== undefined;
    const hasCutleryChoice = needsCutlery !== null;
    return hasSauce && hasSpicyLevel && hasCutleryChoice;
  };

  const handleAddToBasket = () => {
    if (!canAddToBasket()) return;

    const basketItem: BasketItem = {
      id: `${dish.id}-${Date.now()}`,
      dish,
      addOns: selectedAddOns,
      spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
      sauce: selectedSauces.join(', '),
      needsCutlery: needsCutlery === 'yes',
      quantity,
      selectedVariant,
      switchedToNormalBeef
    };

    onAddToBasket(basketItem);
    onClose();
  };

  const addOnsByCategory = filteredAddOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, AddOn[]>);

  const renderComboSection = () => {
    if (!dish.isComboFor2) return null;

    return (
      <div className="mb-6">
        <Label className="text-base font-semibold mb-3">
          Customize Both Dishes (2x {dish.name})
        </Label>
        {comboItems.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3">Dish {index + 1}</h4>
            
            {/* Spicy Level for this dish */}
            {dish.spicyRequired && (
              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">Spicy Level *</Label>
                <RadioGroup 
                  value={item.spicyLevel?.toString()} 
                  onValueChange={(value) => {
                    setComboItems(prev => prev.map((comboItem, i) => 
                      i === index ? { ...comboItem, spicyLevel: Number(value) } : comboItem
                    ));
                  }}
                  className="gap-2"
                >
                  {SPICY_LEVELS.map(level => (
                    <div key={level.level} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.level.toString()} id={`combo-${index}-spicy-${level.level}`} />
                      <Label htmlFor={`combo-${index}-spicy-${level.level}`} className="text-sm">
                        ({level.level}) {level.emoji} {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Sauce Selection for this dish */}
            <div className="mb-4">
              <Label className="text-sm font-medium mb-2 block">Sauces *</Label>
              <div className="space-y-2">
                {SAUCES.map(sauce => (
                  <div key={sauce.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`combo-${index}-sauce-${sauce.id}`}
                        checked={item.selectedSauces.includes(sauce.id)}
                        onCheckedChange={(checked) => {
                          setComboItems(prev => prev.map((comboItem, i) => {
                            if (i === index) {
                              if (checked) {
                                if (sauce.id === 'no-sauce') {
                                  return { ...comboItem, selectedSauces: [sauce.id] };
                                } else {
                                  return { 
                                    ...comboItem, 
                                    selectedSauces: [...comboItem.selectedSauces.filter(id => id !== 'no-sauce'), sauce.id] 
                                  };
                                }
                              } else {
                                return { 
                                  ...comboItem, 
                                  selectedSauces: comboItem.selectedSauces.filter(id => id !== sauce.id) 
                                };
                              }
                            }
                            return comboItem;
                          }));
                        }}
                      />
                      <Label htmlFor={`combo-${index}-sauce-${sauce.id}`} className="text-sm">
                        {sauce.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">+฿{sauce.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-ons for this dish */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Add-ons</Label>
              <div className="space-y-2">
                {filteredAddOns.filter(addon => addon.category === 'meat' || addon.category === 'other').map(addon => (
                  <div key={addon.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`combo-${index}-addon-${addon.id}`}
                        checked={item.selectedAddOns.some(a => a.id === addon.id)}
                        onCheckedChange={() => toggleComboAddOn(index, addon)}
                      />
                      <Label htmlFor={`combo-${index}-addon-${addon.id}`} className="text-sm">
                        {addon.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">+฿{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
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
                    ฿{getCurrentPrice()}
                  </span>
                </div>
              </DialogHeader>

              {/* Premium Beef Switch Option */}
              {dish.hasBeefSwitchOption && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Beef Option</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroup value={switchedToNormalBeef ? 'normal' : 'premium'} onValueChange={(value) => setSwitchedToNormalBeef(value === 'normal')}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="premium" id="premium-beef" />
                          <Label htmlFor="premium-beef">Premium Beef (฿{dish.price})</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="normal" id="normal-beef" />
                          <Label htmlFor="normal-beef">Normal Beef (฿{dish.price - 50}) - Save ฿50!</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Consolidated Variants */}
              {dish.consolidatedVariants && dish.consolidatedVariants.length > 0 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 block">Options</Label>
                  <RadioGroup value={selectedVariant?.id || 'base'} onValueChange={(value) => {
                    if (value === 'base') {
                      setSelectedVariant(null);
                    } else {
                      const variant = dish.consolidatedVariants?.find(v => v.id === value);
                      setSelectedVariant(variant || null);
                    }
                  }}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="base" id="base-option" />
                      <Label htmlFor="base-option">Base - ฿{dish.price}</Label>
                    </div>
                    {dish.consolidatedVariants.map(variant => (
                      <div key={variant.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={variant.id} id={variant.id} />
                        <Label htmlFor={variant.id}>
                          {variant.name} - ฿{dish.price + variant.priceModifier}
                          {variant.priceModifier > 0 && <span className="text-green-600"> (+฿{variant.priceModifier})</span>}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Combo Section */}
              {renderComboSection()}

              {/* Regular Spicy Level - only if not combo */}
              {!dish.isComboFor2 && dish.spicyRequired && (
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

              {/* Regular Sauce Selection - only if not combo */}
              {!dish.isComboFor2 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    Select Sauces <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Required - Choose one or more)</span>
                  </Label>
                  <div className="space-y-2">
                    {SAUCES.map(sauce => {
                      const isFreeSauce = sauce.price === 0;
                      const isNoSauce = sauce.id === 'no-sauce';
                      const hasFreeSauceSelected = selectedSauces.some(id => SAUCES.find(s => s.id === id)?.price === 0);
                      const hasNoSauceSelected = selectedSauces.includes('no-sauce');

                      // Disable logic
                      const isDisabled = isNoSauce ? 
                        hasFreeSauceSelected && !hasNoSauceSelected : 
                        hasNoSauceSelected || (isFreeSauce && hasFreeSauceSelected && !selectedSauces.includes(sauce.id));

                      return (
                        <div key={sauce.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={sauce.id}
                              checked={selectedSauces.includes(sauce.id)}
                              disabled={isDisabled}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  if (isNoSauce) {
                                    // If selecting "No Sauce", clear all other sauces
                                    setSelectedSauces([sauce.id]);
                                  } else if (isFreeSauce) {
                                    // If selecting a free sauce, remove "No Sauce" and other free sauces
                                    setSelectedSauces(prev => [
                                      ...prev.filter(id => SAUCES.find(s => s.id === id)?.price !== 0 || id === sauce.id), 
                                      sauce.id
                                    ]);
                                  } else {
                                    // Paid sauce - just add it
                                    setSelectedSauces(prev => [...prev, sauce.id]);
                                  }
                                } else {
                                  setSelectedSauces(prev => prev.filter(id => id !== sauce.id));
                                }
                              }}
                            />
                            <Label htmlFor={sauce.id} className={isDisabled ? 'text-muted-foreground' : ''}>
                              {sauce.name}
                            </Label>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            +฿{sauce.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Regular Add-ons - only if not combo */}
              {!dish.isComboFor2 && Object.entries(addOnsByCategory).map(([category, categoryAddOns]) => (
                <div key={category} className="mb-6">
                  <Label className="text-base font-semibold mb-3 capitalize">
                    {category === 'meat' ? 'Extra Meat' : 
                     category === 'egg' ? 'Egg Options' : 
                     category === 'thai-omelette' ? 'Thai Style Omelette 🍳' : 
                     category === 'creamy-omelette' ? 'Creamy Omelette 🍳' : 
                     category === 'soft-omelette' ? 'Soft Omelette 🍳' : 
                     category === 'other' ? 'Add-ons' : category}
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

              {/* Cutlery */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                  Need Cutlery? <span className="text-red-500">*</span>
                </Label>
                <RadioGroup value={needsCutlery || ''} onValueChange={(value) => setNeedsCutlery(value as 'yes' | 'no')}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cutlery-yes" />
                    <Label htmlFor="cutlery-yes">Yes, please</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cutlery-no" />
                    <Label htmlFor="cutlery-no">No thanks (help save the environment)</Label>
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