import { useState, useMemo, useEffect } from 'react';
import { Restaurant, Dish, BasketItem } from '@/types/menu';
import UnifiedHeader from '@/components/UnifiedHeader';
import UnifiedMenuDisplay from '@/components/UnifiedMenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { organizationSchema, websiteSchema, restorySchema, nirvanaSchema, mejaiSchema } from '@/seo/jsonld';
import { UnifiedCategory } from '@/lib/unifiedMenu';

const Index = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<UnifiedCategory>('ALL');
  const [selectedBrand, setSelectedBrand] = useState<Restaurant | 'all'>('all');
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    // Load basket from localStorage on mount
    try {
      const saved = localStorage.getItem('santor-basket');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert incrementalExtras from object back to Map
        return parsed.map((item: any) => ({
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

  // Save basket to localStorage whenever it changes
  useEffect(() => {
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
  }, [basketItems]);

  const homeMetadata = {
    ...getMetadata('home'),
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [organizationSchema, websiteSchema, restorySchema, nirvanaSchema, mejaiSchema]
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <SEOHead metadata={homeMetadata} />
      <UnifiedHeader 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
      />

      <main>
        <UnifiedMenuDisplay 
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          onDishSelect={setSelectedDish}
        />
      </main>

      <DishModal 
        dish={selectedDish} 
        isOpen={!!selectedDish} 
        onClose={() => setSelectedDish(null)} 
        onAddToBasket={handleAddToBasket} 
      />

      <BasketModal 
        isOpen={isBasketOpen} 
        onClose={() => setIsBasketOpen(false)} 
        basketItems={basketItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemoveItem={handleRemoveItem} 
      />

      <FloatingBasket 
        basketItems={basketItems} 
        onOpenBasket={() => setIsBasketOpen(true)} 
      />
      
      <Footer selectedRestaurant={null} />
    </div>
  );
};

export default Index;
