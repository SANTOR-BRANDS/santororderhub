import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Restaurant, Dish, BasketItem, DishVariant, AddOn } from '@/types/menu';
import UnifiedHeader from '@/components/UnifiedHeader';
import UnifiedMenuDisplay from '@/components/UnifiedMenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
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
  const [selectedDishSourceRect, setSelectedDishSourceRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [flyAnim, setFlyAnim] = useState<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    w: number;
    h: number;
    dishName: string;
    dishPrice: number;
    dishImage?: string;
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

  const triggerFlyToBasket = useCallback((dish: Dish) => {
    if (!selectedDishSourceRect || !floatingBasketRef.current) return;

    const source = selectedDishSourceRect;
    const target = floatingBasketRef.current.getBoundingClientRect();

    const endX = target.left + target.width / 2 - source.width * 0.18;
    const endY = target.top + target.height / 2 - source.height * 0.18;

    setFlyAnim({
      x: source.x,
      y: source.y,
      dx: endX - source.x,
      dy: endY - source.y,
      w: source.width,
      h: source.height,
      dishName: dish.name,
      dishPrice: dish.price,
      dishImage: dish.image,
    });

    setTimeout(() => setFlyAnim(null), 760);
  }, [selectedDishSourceRect]);

  const dishQuantityMap = useMemo(() => {
    const map: Record<string, number> = {};
    basketItems.forEach((item) => {
      map[item.dish.id] = (map[item.dish.id] || 0) + item.quantity;
    });
    return map;
  }, [basketItems]);

  const handleAddToBasket = (item: BasketItem) => {
    triggerFlyToBasket(item.dish);
    setBasketItems(prev => [...prev, item]);
    // Trigger basket shake animation
    setBasketShakeTrigger(prev => prev + 1);
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

  const handleDishSelect = useCallback((dish: Dish, sourceRect?: { x: number; y: number; width: number; height: number }) => {
    setSelectedDish(dish);
    setSelectedDishSourceRect(sourceRect ?? null);
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
          setSelectedDishSourceRect(null);
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
          className="pointer-events-none fixed z-[70] overflow-hidden rounded-xl border border-white/25 bg-[#1f1f1f] shadow-xl animate-fly-to-basket"
          style={{
            left: `${flyAnim.x}px`,
            top: `${flyAnim.y}px`,
            width: `${flyAnim.w}px`,
            height: `${flyAnim.h}px`,
            ['--fly-x' as string]: `${flyAnim.dx}px`,
            ['--fly-y' as string]: `${flyAnim.dy}px`,
          }}
        >
          <div className="flex h-full w-full flex-col">
            <div className="h-[72%] w-full overflow-hidden bg-black/20">
              {flyAnim.dishImage ? (
                <img src={flyAnim.dishImage} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm">🍽️</div>
              )}
            </div>
            <div className="flex h-[28%] items-center justify-between px-2 text-[10px] text-white/90">
              <span className="max-w-[68%] truncate font-medium">{flyAnim.dishName}</span>
              <span className="font-bold text-[#fd7304]">฿{flyAnim.dishPrice}</span>
            </div>
          </div>
        </div>
      )}
      
      <Footer selectedRestaurant={null} />
    </div>
  );
};

export default Index;
