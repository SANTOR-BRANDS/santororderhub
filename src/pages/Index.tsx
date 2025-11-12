import { useState, useMemo, useEffect } from 'react';
import { Restaurant, Dish, BasketItem } from '@/types/menu';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuDisplay from '@/components/MenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import { getCategoriesByRestaurant } from '@/data/menuData';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { organizationSchema, websiteSchema, restorySchema, nirvanaSchema, mejaiSchema } from '@/seo/jsonld';

const themeColors: Record<Restaurant, string> = {
  restory: '#fd7304',
  nirvana: '#ffd93d',
  'mejai hai yum': '#fec428'
};

const Index = () => {
  const { t } = useLanguage();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
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
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const categories = useMemo(() => 
    selectedRestaurant ? getCategoriesByRestaurant(selectedRestaurant) : [],
    [selectedRestaurant]
  );
  
  const themeColor = selectedRestaurant ? themeColors[selectedRestaurant] : undefined;
  
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
  const handleRestaurantChange = (restaurant: Restaurant | null) => {
    setSelectedRestaurant(restaurant);
    setSelectedCategory('ALL'); // Reset category when changing restaurant
  };

  useEffect(() => {
    if (selectedRestaurant) {
      window.scrollTo(0, 0);
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    if (selectedCategory !== 'ALL') {
      window.scrollTo(0, 0);
    }
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
      "@graph": [
        organizationSchema,
        websiteSchema,
        restorySchema,
        nirvanaSchema,
        mejaiSchema
      ]
    }
  };

  return <div className={cn("min-h-screen", selectedRestaurant === 'restory' ? 'bg-nirvana-secondary' : selectedRestaurant === 'mejai hai yum' ? 'bg-mejai-background' : 'bg-background')}>
      <SEOHead metadata={homeMetadata} />
      <RestaurantHeader
        selectedRestaurant={selectedRestaurant} 
        onRestaurantChange={handleRestaurantChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        themeColor={themeColor}
      />

      <main>
        {selectedRestaurant ? <MenuDisplay 
          restaurant={selectedRestaurant} 
          onDishSelect={setSelectedDish}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        /> : <section className="min-h-[80vh] flex items-center justify-center bg-gradient-santor text-santor-foreground">
            <div className="text-center p-8">
              <div className="text-8xl mb-6" role="img" aria-label="Restaurant icon">🍽️</div>
              <h1 className="text-4xl font-bold mb-4">{t('header.welcome')}</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">{t('header.tagline')}</p>
            <p className="text-2xl font-semibold mb-6">Choose your restaurant:</p>
            <nav aria-label="Restaurant selection" className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
              <article className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('restory')}>
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 p-3">
                  <img src="/images/RS-LOGO-001.webp" alt="Restory" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs md:text-sm opacity-80 text-center">Asian Fusion - Cooked to Order</p>
              </article>
              <article className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('nirvana')}>
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 p-3">
                  <img src="/images/NV-LOGO-001.webp" alt="Nirvana" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs md:text-sm opacity-80 text-center">Authentic Flavors</p>
              </article>
              <article className="flex flex-col items-center gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('mejai hai yum')}>
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 p-3">
                  <img src="/images/MHY-LOGO-001.webp" alt="Mejai Hai Yum" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs md:text-sm opacity-80 text-center">Fresh Salmon & Thai Yum</p>
              </article>
            </nav>
          </div>
        </section>}
      </main>

      <DishModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} onAddToBasket={handleAddToBasket} />

      <BasketModal isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} basketItems={basketItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />

      <FloatingBasket basketItems={basketItems} onOpenBasket={() => setIsBasketOpen(true)} />
      
      <Footer selectedRestaurant={selectedRestaurant} />
    </div>;
};
export default Index;