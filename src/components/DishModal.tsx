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
  const [needsCutlery, setNeedsCutlery] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // New state for complex logic
  const [isPremiumBeefSwitched, setIsPremiumBeefSwitched] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<DishVariant | null>(null);
  // For combo dishes - track which dish we're customizing (1 or 2)
  const [comboStep, setComboStep] = useState<1 | 2 | 'summary'>(1);
  const [combo1Config, setCombo1Config] = useState<any>(null);
  const [combo2Config, setCombo2Config] = useState<any>(null);

  useEffect(() => {
    if (dish && isOpen) {
      setSelectedAddOns([]);
      setSpicyLevel(dish.spicyRequired ? 2 : undefined); // Default to signature medium
      setSelectedSauces([]);
      setNeedsCutlery(false);
      setQuantity(1);
      setIsPremiumBeefSwitched(false);
      setSelectedVariant(null);
      setComboStep(1);
      setCombo1Config(null);
      setCombo2Config(null);
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

  // Get current effective price (considering premium beef switching and variants)
  const getCurrentPrice = () => {
    let basePrice = dish.price;
    
    // Apply premium beef switch discount
    if (dish.hasPremiumBeefSwitch && isPremiumBeefSwitched && dish.normalBeefPrice) {
      basePrice = dish.normalBeefPrice;
    }
    
    // Apply variant pricing
    if (selectedVariant) {
      basePrice = selectedVariant.price;
    }
    
    return basePrice;
  };

  // Filter add-ons based on dish type and beef switching logic
  const getFilteredAddOns = () => {
    return addOns.filter(addon => {
      // Existing meat filtering logic
      if (addon.category === 'meat') {
        if (addon.id === 'extra-chicken' && !dish.name.toLowerCase().includes('chicken')) return false;
        if (addon.id === 'extra-pork' && !dish.name.toLowerCase().includes('pork')) return false;
        
        // CRITICAL BEEF LOGIC - NEVER show both beef types together
        if (dish.hasPremiumBeefSwitch) {
          // Premium Beef Dish with Switch Option (149฿ → 99฿)
          if (isPremiumBeefSwitched) {
            // Switched to normal beef → ONLY show normal beef add-on (60฿)
            if (addon.isPremiumBeef) return false;
            if (!addon.isNormalBeef && (addon.id === 'extra-beef' || addon.id === 'extra-premium-beef')) return false;
          } else {
            // Using premium beef → ONLY show premium beef add-on (80฿)  
            if (addon.isNormalBeef) return false;
            if (!addon.isPremiumBeef && (addon.id === 'extra-beef' || addon.id === 'extra-premium-beef')) return false;
          }
        } else if (dish.name.toLowerCase().includes('wagyu')) {
          // Wagyu dishes (159฿) → ONLY premium beef add-ons (80฿)
          if (addon.isNormalBeef) return false;
          if (addon.id === 'extra-beef') return false; // Block normal beef completely
        } else if (dish.name.toLowerCase().includes('beef')) {
          // Regular beef dishes → ONLY normal beef add-ons (60฿)
          if (addon.isPremiumBeef) return false;
          if (addon.id === 'extra-premium-beef') return false; // Block premium beef completely
        }
      }
      
      // Don't show extra rice for noodle dishes
      if (addon.id === 'extra-rice' && dish.name.toLowerCase().includes('noodle')) return false;
      
      return true;
    });
  };

  const filteredAddOns = getFilteredAddOns();

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev => prev.find(a => a.id === addon.id) ? prev.filter(a => a.id !== addon.id) : [...prev, addon]);
  };

  const getTotalPrice = () => {
    const basePrice = getCurrentPrice();
    const addOnsTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
    const saucesTotal = selectedSauces.reduce((sum, sauceId) => {
      const sauce = SAUCES.find(s => s.id === sauceId);
      return sum + (sauce?.price || 0);
    }, 0);
    return (basePrice + addOnsTotal + saucesTotal) * quantity;
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
      addOns: selectedAddOns,
      spicyLevel: dish.spicyRequired ? spicyLevel : undefined,
      sauce: selectedSauces.join(', '),
      needsCutlery,
      quantity,
      isPremiumBeefSwitched,
      selectedVariant
    };
    
    onAddToBasket(basketItem);
    onClose();
  };

  const addOnsByCategory = filteredAddOns.reduce((acc, addon) => {
    if (!acc[addon.category]) acc[addon.category] = [];
    acc[addon.category].push(addon);
    return acc;
  }, {} as Record<string, AddOn[]>);

  // Combo logic handler
  const handleComboNext = () => {
    if (comboStep === 1) {
      // Save dish 1 configuration
      setCombo1Config({
        addOns: selectedAddOns,
        spicyLevel,
        sauces: selectedSauces,
        needsCutlery,
        isPremiumBeefSwitched,
        selectedVariant
      });
      
      // Reset for dish 2
      setSelectedAddOns([]);
      setSpicyLevel(dish.spicyRequired ? 2 : undefined);
      setSelectedSauces([]);
      setNeedsCutlery(false);
      setIsPremiumBeefSwitched(false);
      setSelectedVariant(null);
      setComboStep(2);
    } else if (comboStep === 2) {
      // Save dish 2 configuration  
      setCombo2Config({
        addOns: selectedAddOns,
        spicyLevel,
        sauces: selectedSauces,
        needsCutlery,
        isPremiumBeefSwitched,
        selectedVariant
      });
      setComboStep('summary');
    }
  };

  const handleComboAddToBasket = () => {
    if (!combo1Config || !combo2Config) return;
    
    // Create basket item with both configurations
    const basketItem: BasketItem = {
      id: `${dish.id}-combo-${Date.now()}`,
      dish,
      addOns: [...(combo1Config.addOns || []), ...(combo2Config.addOns || [])],
      spicyLevel: combo1Config.spicyLevel, // Use dish 1 as primary
      sauce: `Dish 1: ${combo1Config.sauces?.join(', ') || ''} | Dish 2: ${combo2Config.sauces?.join(', ') || ''}`,
      needsCutlery: combo1Config.needsCutlery || combo2Config.needsCutlery,
      quantity,
      // Store combo configurations for display
      comboConfig: { dish1: combo1Config, dish2: combo2Config }
    };
    
    onAddToBasket(basketItem);
    onClose();
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
                    {dish.hasPremiumBeefSwitch && !isPremiumBeefSwitched && (
                      <span className="text-sm text-muted-foreground ml-1">
                        (Switch to normal: ฿{dish.normalBeefPrice})
                      </span>
                    )}
                  </span>
                </div>
              </DialogHeader>

              {/* Combo Logic */}
              {dish.isCombo ? (
                <div className="mb-6">
                  {comboStep !== 'summary' ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label className="text-lg font-semibold">
                          Customize Dish {comboStep} of 2
                        </Label>
                        <Badge variant="outline">
                          Step {comboStep}/2
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                        <p>You're customizing <strong>Dish {comboStep}</strong> in your combo.</p>
                        <p>Each dish can have different add-ons, spice levels, and sauces.</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label className="text-lg font-semibold mb-4">Combo Summary</Label>
                      <div className="space-y-4">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h4 className="font-medium">Dish 1</h4>
                          <p className="text-sm text-muted-foreground">
                            Spicy: {combo1Config?.spicyLevel || 0} | 
                            Sauce: {combo1Config?.sauces?.join(', ') || 'None'} |
                            Add-ons: {combo1Config?.addOns?.length || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <h4 className="font-medium">Dish 2</h4>
                          <p className="text-sm text-muted-foreground">
                            Spicy: {combo2Config?.spicyLevel || 0} | 
                            Sauce: {combo2Config?.sauces?.join(', ') || 'None'} |
                            Add-ons: {combo2Config?.addOns?.length || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Premium Beef Switch Option */}
              {dish.hasPremiumBeefSwitch && !dish.isCombo && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    {dish.variants ? '2. Beef Option' : '1. Beef Option'}
                  </Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="beef-switch" 
                        checked={isPremiumBeefSwitched} 
                        onCheckedChange={(checked) => {
                          setIsPremiumBeefSwitched(checked === true);
                          // Clear ALL beef-related add-ons when switching - CRITICAL
                          setSelectedAddOns(prev => prev.filter(addon => 
                            addon.id !== 'extra-beef' && 
                            addon.id !== 'extra-premium-beef' && 
                            !addon.isPremiumBeef && 
                            !addon.isNormalBeef
                          ));
                        }} 
                      />
                      <Label htmlFor="beef-switch" className="text-sm">
                        Switch to Normal Beef (-฿{dish.price - (dish.normalBeefPrice || 0)}) → Final price: ฿{dish.normalBeefPrice}
                      </Label>
                    </div>
                    <div className="text-xs text-muted-foreground p-2 bg-muted/30 rounded">
                      {isPremiumBeefSwitched 
                        ? '✓ Using Normal Beef - Only Normal Beef add-ons (฿60) will be available'
                        : '✓ Using Premium Beef - Only Premium Beef add-ons (฿80) will be available'
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Dish Variants */}
              {dish.variants && dish.variants.length > 0 && !dish.isCombo && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    1. Choose Option
                    {dish.name === 'Pad Krapao Minced Pork' && (
                      <span className="block text-xs text-muted-foreground mt-1">
                        Note: Additional toppings after first upgrade charged at regular add-on price
                      </span>
                    )}
                  </Label>
                  <RadioGroup 
                    value={selectedVariant?.id || ''} 
                    onValueChange={(value) => {
                      const variant = dish.variants?.find(v => v.id === value);
                      setSelectedVariant(variant || null);
                    }} 
                    className="gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="" id="base-option" />
                      <Label htmlFor="base-option" className="flex items-center gap-2">
                        <span>{dish.name} (Base)</span>
                        <span className="text-sm text-muted-foreground">฿{dish.price}</span>
                      </Label>
                    </div>
                    {dish.variants.map(variant => (
                      <div key={variant.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={variant.id} id={variant.id} />
                        <Label htmlFor={variant.id} className="flex items-center gap-2">
                          <span>{variant.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {variant.priceModifier >= 0 ? '+' : ''}฿{variant.priceModifier} (฿{variant.price})
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Extra Meat / Extra Rice - Section 2 */}
              {!dish.isCombo && Object.entries(addOnsByCategory).filter(([category]) => category === 'meat').length > 0 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    {dish.hasPremiumBeefSwitch ? '3. Extra Meat / Extra Rice' : dish.variants ? '2. Extra Meat / Extra Rice' : '1. Extra Meat / Extra Rice'}
                  </Label>
                  <div className="space-y-2">
                    {addOnsByCategory.meat?.map(addon => (
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
                    {/* Always show rice after meat */}
                    {filteredAddOns.filter(addon => addon.id === 'extra-rice').map(addon => (
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
              )}

              {/* Spicy Level - Section 3 */}
              {dish.spicyRequired && (!dish.isCombo || comboStep !== 'summary') && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    {(() => {
                      let sectionNumber = 1;
                      if (dish.variants) sectionNumber++;
                      if (dish.hasPremiumBeefSwitch) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([category]) => category === 'meat').length > 0) sectionNumber++;
                      return `${sectionNumber}. Spicy Level`;
                    })()}
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Required)</span>
                  </Label>
                  <RadioGroup value={spicyLevel?.toString()} onValueChange={value => setSpicyLevel(Number(value))} className="gap-2">
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

              {/* Add-ons - Section 4 */}
              {!dish.isCombo && Object.entries(addOnsByCategory).filter(([category]) => category === 'other').length > 0 && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    {(() => {
                      let sectionNumber = 1;
                      if (dish.variants) sectionNumber++;
                      if (dish.hasPremiumBeefSwitch) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([cat]) => cat === 'meat').length > 0) sectionNumber++;
                      if (dish.spicyRequired) sectionNumber++;
                      return `${sectionNumber}. Add-ons`;
                    })()}
                  </Label>
                  <div className="space-y-2">
                    {addOnsByCategory.other?.map(addon => (
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
              )}

              {/* Egg Options - Section 5 */}
              {!dish.isCombo && Object.entries(addOnsByCategory).filter(([category]) => 
                ['thai-omelette', 'creamy-omelette', 'soft-omelette'].includes(category)
              ).map(([category, categoryAddOns]) => (
                <div key={category} className="mb-6">
                  <Label className="text-base font-semibold mb-3">
                    {(() => {
                      let sectionNumber = 1;
                      if (dish.variants) sectionNumber++;
                      if (dish.hasPremiumBeefSwitch) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([cat]) => cat === 'meat').length > 0) sectionNumber++;
                      if (dish.spicyRequired) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([cat]) => cat === 'other').length > 0) sectionNumber++;
                      return `${sectionNumber}. ${
                        category === 'thai-omelette' ? 'Thai Style Omelette 🍳' : 
                        category === 'creamy-omelette' ? 'Creamy Omelette 🍳' : 
                        'Soft Omelette 🍳'
                      }`;
                    })()}
                  </Label>
                  <div className="space-y-2">
                    {categoryAddOns.map(addon => (
                      <div key={addon.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={addon.id} checked={selectedAddOns.some(a => a.id === addon.id)} onCheckedChange={() => toggleAddOn(addon)} />
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

              {/* Sauce Selection - Section 6 */}
              {(!dish.isCombo || comboStep !== 'summary') && (
                <div className="mb-6">
                  <Label className="text-base font-semibold mb-3 flex items-center gap-2">
                    {(() => {
                      let sectionNumber = 1;
                      if (dish.variants) sectionNumber++;
                      if (dish.hasPremiumBeefSwitch) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([cat]) => cat === 'meat').length > 0) sectionNumber++;
                      if (dish.spicyRequired) sectionNumber++;
                      if (Object.entries(addOnsByCategory).filter(([cat]) => cat === 'other').length > 0) sectionNumber++;
                      const eggCategories = Object.entries(addOnsByCategory).filter(([cat]) => 
                        ['thai-omelette', 'creamy-omelette', 'soft-omelette'].includes(cat)
                      );
                      if (eggCategories.length > 0) sectionNumber++;
                      return `${sectionNumber}. Select Sauces`;
                    })()}
                    <span className="text-red-500">*</span>
                    <span className="text-xs text-muted-foreground">(Required - Choose one or more)</span>
                  </Label>
                  <div className="space-y-2">
                    {SAUCES.map(sauce => {
                      const isFreeSauce = sauce.price === 0;
                      const isNoSauce = sauce.id === 'no-sauce';
                      const hasFreeSauceSelected = selectedSauces.some(id => SAUCES.find(s => s.id === id)?.price === 0);
                      const hasNoSauceSelected = selectedSauces.includes('no-sauce');

                      // Disable logic
                      const isDisabled = isNoSauce ? hasFreeSauceSelected && !hasNoSauceSelected : hasNoSauceSelected || isFreeSauce && hasFreeSauceSelected && !selectedSauces.includes(sauce.id);
                      return (
                        <div key={sauce.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={sauce.id} 
                              checked={selectedSauces.includes(sauce.id)} 
                              disabled={isDisabled} 
                              onCheckedChange={checked => {
                                if (checked) {
                                  if (isNoSauce) {
                                    // If selecting "No Sauce", clear all other sauces
                                    setSelectedSauces([sauce.id]);
                                  } else if (isFreeSauce) {
                                    // If selecting a free sauce, remove "No Sauce" and other free sauces
                                    setSelectedSauces(prev => [...prev.filter(id => SAUCES.find(s => s.id === id)?.price !== 0 || id === sauce.id), sauce.id]);
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

              {/* Cutlery */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox id="cutlery" checked={needsCutlery} onCheckedChange={checked => setNeedsCutlery(checked === true)} />
                  <Label htmlFor="cutlery" className="text-sm">I need cutlery</Label>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Quantity and Total */}
              <div className="space-y-4">
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

                {dish.isCombo ? (
                  comboStep === 'summary' ? (
                    <Button onClick={handleComboAddToBasket} className={cn('w-full', theme.button)} size="lg">
                      Add Combo to Basket
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleComboNext} 
                      disabled={!canAddToBasket()} 
                      className={cn('w-full', theme.button)} 
                      size="lg"
                    >
                      {comboStep === 1 ? 'Next: Customize Dish 2' : 'Review Combo'}
                    </Button>
                  )
                ) : (
                  <Button onClick={handleAddToBasket} disabled={!canAddToBasket()} className={cn('w-full', theme.button)} size="lg">
                    Add to Basket
                  </Button>
                )}
              </div>
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DishModal;
