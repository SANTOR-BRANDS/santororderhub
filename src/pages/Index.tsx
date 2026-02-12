import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Restaurant, Dish, BasketItem, DishVariant, AddOn } from '@/types/menu';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import UnifiedHeader from '@/components/UnifiedHeader';
import UnifiedMenuDisplay from '@/components/UnifiedMenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAddress } from '@/contexts/AddressContext';
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

const Index = () => {
  const { t } = useLanguage();
  const { address, setAddress, openAddressModal, isAddressModalOpen, setIsAddressModalOpen } = useAddress();
  const [selectedCategory, setSelectedCategory] = useState<UnifiedCategory>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<Restaurant | 'all'>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [basketShakeTrigger, setBasketShakeTrigger] = useState(0);
  const floatingBasketRef = useRef<HTMLDivElement>(null);
  
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

  const handleAddToBasket = (item: BasketItem) => {
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
      <AnnouncementBanner />
      <UnifiedHeader 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        <UnifiedMenuDisplay 
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onDishSelect={setSelectedDish}
          searchQuery={searchQuery}
        />
      </main>

      <DishModal 
        dish={selectedDish} 
        isOpen={!!selectedDish} 
        onClose={() => setSelectedDish(null)} 
        onAddToBasket={handleAddToBasket}
        onOrderNow={() => setIsBasketOpen(true)}
        basketRef={floatingBasketRef}
      />

      <BasketModal 
        isOpen={isBasketOpen} 
        onClose={() => setIsBasketOpen(false)} 
        basketItems={basketItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />

      <FloatingBasket 
        ref={floatingBasketRef}
        basketItems={basketItems} 
        onOpenBasket={() => setIsBasketOpen(true)}
        shakeTrigger={basketShakeTrigger}
      />
      
      <Footer selectedRestaurant={null} />
    </div>
  );
};

export default Index;
