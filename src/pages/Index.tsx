import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Restaurant, Dish, BasketItem, DishVariant, AddOn } from '@/types/menu';
import UnifiedHeader from '@/components/UnifiedHeader';
import UnifiedMenuDisplay from '@/components/UnifiedMenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import DishCard from '@/components/DishCard';
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
    const cloneW = Math.min(230, source.width * 0.72);
    const cloneH = cloneW * 1.34;
    const startX = source.x + source.width / 2 - cloneW / 2;
    const startY = source.y + source.height / 2 - cloneH / 2;

    // Vertical-only drop: X locked, center lands on basket center Y
    const startCenterY = startY + cloneH / 2;
    const targetCenterY = target.top + target.height / 2;
    const endDY = targetCenterY - startCenterY;

    const LIFT_MS = 150;
    const DROP_MS = 500;
    const FADE_MS = 70;

    setFlyAnim({
      x: startX,
      y: startY,
      dy: endDY,
      w: cloneW,
      dish,
      phase: 'lift',
      fadeOut: false,
    });

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

  const handleAddToBasket = (item: BasketItem, sourceRect?: { x: number; y: number; width: number; height: number }) => {
    const didFly = triggerFlyToBasket(item.dish, sourceRect);
    setBasketItems(prev => [...prev, item]);
    // Trigger basket pulse near animation impact
    if (didFly) {
      setTimeout(() => {
        setBasketShakeTrigger(prev => prev + 1);
      }, 650);
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
          className="pointer-events-none fixed z-[70] overflow-hidden rounded-xl border border-white/25 bg-[#1f1f1f] shadow-xl will-change-transform"
          style={{
            left: `${flyAnim.x}px`,
            top: `${flyAnim.y}px`,
            width: `${flyAnim.w}px`,
            transformOrigin: 'center center',
            transform:
              flyAnim.phase === 'lift'
                ? 'translate3d(0, 0, 0) scale(1.03)'
                : `translate3d(0, ${flyAnim.dy}px, 0) scale(0.2)`,
            opacity: flyAnim.fadeOut ? 0 : 1,
            filter: flyAnim.phase === 'drop' ? 'blur(2px)' : 'blur(0px)',
            boxShadow:
              flyAnim.phase === 'lift'
                ? '0 14px 38px rgba(0,0,0,0.45)'
                : '0 10px 22px rgba(0,0,0,0.32)',
            transition:
              flyAnim.phase === 'lift'
                ? 'transform 150ms ease-out, box-shadow 150ms ease-out'
                : 'transform 500ms ease-in, filter 500ms ease-in, box-shadow 500ms ease-in, opacity 70ms linear',
          }}
        >
          <DishCard dish={flyAnim.dish} onClick={() => {}} inBasketCount={0} />
        </div>
      )}
      
      <Footer selectedRestaurant={null} />
    </div>
  );
};

export default Index;
