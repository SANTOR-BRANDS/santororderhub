import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Restaurant, Dish, BasketItem, DishVariant, AddOn } from '@/types/menu';
import UnifiedHeader from '@/components/UnifiedHeader';
import UnifiedMenuDisplay from '@/components/UnifiedMenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAddress } from '@/contexts/AddressContext';
import AddressModal from '@/components/AddressModal';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { organizationSchema, websiteSchema, restorySchema, nirvanaSchema, smoodySchema } from '@/seo/jsonld';
import { UnifiedCategory } from '@/lib/unifiedMenu';

// Type for serialized basket item (Map becomes Record when JSON serialized)
interface SerializedBasketItem {
  id: string;
  dish: Dish;
  selectedVariant?: DishVariant;
  addOns: AddOn[];
  extraPls: AddOn[];
  incrementalExtras?: Record<string, number>;
  spicyLevel?: number;
  sauce: string;
  needsCutlery: boolean;
  quantity: number;
  isPremiumBeef?: boolean;
  freeToppings?: string[];
  isCombo?: boolean;
  combo2?: {
    selectedVariant?: DishVariant;
    addOns: AddOn[];
    extraPls: AddOn[];
    incrementalExtras?: Record<string, number>;
    spicyLevel?: number;
    sauce: string;
  };
}

interface IndexProps {
  initialBrand?: Restaurant;
}

const Index = ({ initialBrand }: IndexProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { address, setAddress, openAddressModal, isAddressModalOpen, setIsAddressModalOpen } = useAddress();
  const [selectedCategory, setSelectedCategory] = useState<UnifiedCategory>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<Restaurant | 'all'>(initialBrand || 'all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [flyAnim, setFlyAnim] = useState<{
    x: number;
    y: number;
    dy: number;
    w: number;
    dish: Dish;
    phase: 'lift' | 'drop';
    fadeOut: boolean;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [basketShakeTrigger, setBasketShakeTrigger] = useState(0);
  const floatingBasketRef = useRef<HTMLDivElement>(null);

  // Handle URL updates when brand changes
  const handleBrandChange = useCallback((brand: Restaurant | 'all') => {
    setSelectedBrand(brand);
    if (brand === 'all') {
      navigate('/', { replace: true });
    } else {
      navigate(`/${brand}`, { replace: true });
    }
  }, [navigate]);

  // Sync URL with selected brand on mount (for direct links)
  useEffect(() => {
    const path = location.pathname.slice(1); // Remove leading /
    if (['smoody', 'restory', 'nirvana'].includes(path)) {
      setSelectedBrand(path as Restaurant);
    }
  }, [location.pathname]);
  
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    // Load basket from localStorage on mount
    try {
      const saved = localStorage.getItem('santor-basket');
      if (saved) {
        const parsed = JSON.parse(saved) as SerializedBasketItem[];
        // Convert incrementalExtras from object back to Map
        return parsed.map((item) => ({
          ...item,
          incrementalExtras: item.incrementalExtras ? new Map(Object.entries(item.incrementalExtras)) : undefined,
          combo2: item.combo2 ? {
            ...item.combo2,
            incrementalExtras: item.combo2.incrementalExtras ? new Map(Object.entries(item.combo2.incrementalExtras)) : undefined
          } : undefined
        }));
      }
    } catch (error) {
      console.error('Failed to load basket from localStorage:', error);
    }
    return [];
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const triggerFlyToBasket = useCallback((dish: Dish, sourceRect?: { x: number; y: number; width: number; height: number }) => {
    if (!floatingBasketRef.current) return false;

    const source = sourceRect || {
      x: Math.max(12, (window.innerWidth - 280) / 2),
      y: 220,
      width: Math.min(280, window.innerWidth - 24),
      height: 220,
    };
    const target = floatingBasketRef.current.getBoundingClientRect();

    // Spawn from center of modal source, using dish-card proportions
    const cloneW = Math.max(170, Math.min(230, source.width * 0.55));
    const startX = source.x + source.width / 2 - cloneW / 2;
    const startY = source.y + source.height / 2 - cloneW * 0.67;

    // Vertical-only drop: X locked, center lands on basket center Y
    const startCenterY = startY + cloneW * 0.67;
    const targetCenterY = target.top + target.height / 2;
    const endDY = targetCenterY - startCenterY;

    const LIFT_MS = 110;
    const DROP_MS = 200;
    const FADE_MS = 35;

    setFlyAnim({
      x: startX,
      y: startY,
      dy: endDY,
      w: cloneW,
      dish,
      phase: 'lift',
      fadeOut: false,
    });
    
    // Debug: log the image URL
    console.log('Animation dish image:', dish.image, 'for dish:', dish.id);

    setTimeout(() => {
      setFlyAnim((prev) => (prev ? { ...prev, phase: 'drop' } : prev));
    }, LIFT_MS);

    setTimeout(() => {
      setFlyAnim((prev) => (prev ? { ...prev, fadeOut: true } : prev));
    }, LIFT_MS + DROP_MS - FADE_MS);

    setTimeout(() => setFlyAnim(null), LIFT_MS + DROP_MS + 20);
    return true;
  }, []);

  const dishQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    basketItems.forEach((item) => {
      map[item.dish.id] = (map[item.dish.id] || 0) + item.quantity;
    });
    return map;
  }, [basketItems]);

  const handleAddToBasket = (
    item: BasketItem,
    sourceRect?: { x: number; y: number; width: number; height: number },
    options?: { animateDrop?: boolean }
  ) => {
    const shouldAnimateDrop = options?.animateDrop !== false;
    const didFly = shouldAnimateDrop ? triggerFlyToBasket(item.dish, sourceRect) : false;
    setBasketItems(prev => [...prev, item]);
    // Trigger basket pulse near animation impact
    if (didFly) {
      setTimeout(() => {
        setBasketShakeTrigger(prev => prev + 1);
      }, 330);
    } else {
      setBasketShakeTrigger(prev => prev + 1);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setBasketItems(prev => prev.map(item => item.id === itemId ? {
      ...item,
      quantity
    } : item));
  };

  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleDishSelect = useCallback((dish: Dish, _sourceRect?: { x: number; y: number; width: number; height: number }) => {
    setSelectedDish(dish);
    // sourceRect is now used at add-time from modal coordinates
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  // Save basket to localStorage with throttling (max once per second)
  // This prevents performance issues when basket updates rapidly
  useEffect(() => {
    const saveBasket = () => {
      try {
        // Convert Maps to objects for JSON serialization
        const serializable = basketItems.map(item => ({
          ...item,
          incrementalExtras: item.incrementalExtras ? Object.fromEntries(item.incrementalExtras) : undefined,
          combo2: item.combo2 ? {
            ...item.combo2,
            incrementalExtras: item.combo2.incrementalExtras ? Object.fromEntries(item.combo2.incrementalExtras) : undefined
          } : undefined
        }));
        localStorage.setItem('santor-basket', JSON.stringify(serializable));
      } catch (error) {
        console.error('Failed to save basket to localStorage:', error);
      }
    };

    // Use setTimeout to throttle saves to max once per second
    const timeoutId = setTimeout(saveBasket, 500);
    
    return () => clearTimeout(timeoutId);
  }, [basketItems]);

  const homeMetadata = {
    ...getMetadata('home'),
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, websiteSchema, restorySchema, nirvanaSchema, smoodySchema]
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <SEOHead metadata={homeMetadata} />
      <UnifiedHeader 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <UnifiedMenuDisplay 
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onDishSelect={handleDishSelect}
          searchQuery={searchQuery}
          dishQuantityMap={dishQuantityMap}
        />
      </main>

      <DishModal 
        dish={selectedDish} 
        isOpen={!!selectedDish} 
        onClose={() => {
          setSelectedDish(null);
        }} 
        onAddToBasket={handleAddToBasket}
        onOrderNow={() => setIsBasketOpen(true)}
      />

      <BasketModal 
        isOpen={isBasketOpen} 
        onClose={() => setIsBasketOpen(false)} 
        basketItems={basketItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />

      <AddressModal />

      <FloatingBasket 
        ref={floatingBasketRef}
        basketItems={basketItems} 
        onOpenBasket={() => setIsBasketOpen(true)}
        shakeTrigger={basketShakeTrigger}
      />

      {flyAnim && (
        <div
          className="pointer-events-none fixed z-[70] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl will-change-transform"
          style={{
            left: `${flyAnim.x}px`,
            top: `${flyAnim.y}px`,
            width: `${flyAnim.w}px`,
            transformOrigin: 'center center',
            transform:
              flyAnim.phase === 'lift'
                ? 'translate3d(0, 0, 0) scale(1.03)'
                : `translate3d(0, ${flyAnim.dy}px, 0) scale(0.08)`,
            opacity: flyAnim.fadeOut ? 0 : 1,
            filter: flyAnim.phase === 'drop' ? 'blur(1.8px)' : 'blur(0px)',
            boxShadow: '0 8px 18px rgba(0,0,0,0.22)',
            transition:
              flyAnim.phase === 'lift'
                ? 'transform 110ms ease-out'
                : 'transform 200ms ease-in, filter 200ms ease-in, opacity 35ms linear',
          }}
        >
          <div className="h-full w-full bg-white text-black">
            <div className="w-full aspect-square overflow-hidden bg-gray-100">
              {flyAnim.dish.image ? (
                <img src={flyAnim.dish.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl">🍽️</div>
              )}
            </div>
            <div className="p-2.5">
              <div className="line-clamp-2 text-[12px] font-semibold leading-tight">
                {(() => {
                  const translated = t(flyAnim.dish.id);
                  return !translated || translated === flyAnim.dish.id ? flyAnim.dish.name : translated;
                })()}
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/70">{flyAnim.dish.category}</span>
                <span className="text-sm font-bold text-[#fd7304]">฿{flyAnim.dish.price}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer selectedRestaurant={null} />
    </div>
  );
};

export default Index;
