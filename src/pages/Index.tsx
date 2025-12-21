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
  const {
    t
  } = useLanguage();
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
  const categories = useMemo(() => selectedRestaurant ? getCategoriesByRestaurant(selectedRestaurant) : [], [selectedRestaurant]);
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
      "@graph": [organizationSchema, websiteSchema, restorySchema, nirvanaSchema, mejaiSchema]
    }
  };
  return <div className={cn("min-h-screen", selectedRestaurant === 'restory' ? 'bg-nirvana-secondary' : selectedRestaurant === 'mejai hai yum' ? 'bg-mejai-background' : 'bg-background')}>
      <SEOHead metadata={homeMetadata} />
      <RestaurantHeader selectedRestaurant={selectedRestaurant} onRestaurantChange={handleRestaurantChange} categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} themeColor={themeColor} />

      <main>
        {selectedRestaurant ? <MenuDisplay restaurant={selectedRestaurant} onDishSelect={setSelectedDish} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} /> : <section className="min-h-[80vh] flex items-center justify-center bg-gradient-santor text-santor-foreground">
            <div className="text-center p-4 md:p-8 max-w-6xl mx-auto">
              {/* Mobile-First Hero - Compact */}
              <div className="text-5xl md:text-8xl mb-3 md:mb-6 animate-scale-in" role="img" aria-label="Restaurant icon">🍽️</div>
              <h1 className="text-2xl md:text-5xl mb-2 md:mb-4 animate-fade-in font-serif text-center font-normal">{t('header.welcome')}</h1>
              <p className="text-sm md:text-xl opacity-90 mb-2 md:mb-3 max-w-2xl mx-auto animate-fade-in hidden md:block">{t('header.tagline')}</p>
              <p className="text-lg md:text-3xl font-semibold mb-4 md:mb-4 animate-fade-in font-mono text-primary-foreground px-0 bg-destructive">Order from many restaurants,  ONE DELIVERY.</p>
              
              {/* Restaurant Selection - MOBILE FIRST (appears immediately) */}
              <div className="animate-fade-in mb-6 md:mb-0 md:order-last">
                <p className="text-lg md:text-3xl font-semibold mb-4 md:mb-6">Select restaurants to start ordering:</p>
                <nav aria-label="Restaurant selection" className="grid grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto px-2 md:px-4">
                  <article className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('restory')}>
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 relative">
                      <img src="/images/RS-LOGO-001.webp" alt="Restory" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-semibold">
                        Order Now
                      </div>
                    </div>
                    <p className="text-[10px] md:text-sm opacity-80 text-center hidden md:block">Asian Fusion - Cooked to Order</p>
                  </article>
                  <article className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('nirvana')}>
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 relative">
                      <img src="/images/NV-LOGO-001.webp" alt="Nirvana" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-semibold">
                        Order Now
                      </div>
                    </div>
                    <p className="text-[10px] md:text-sm opacity-80 text-center hidden md:block">Authentic Flavors</p>
                  </article>
                  <article className="flex flex-col items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setSelectedRestaurant('mejai hai yum')}>
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white transition-smooth group-hover:scale-105 relative">
                      <img src="/images/MHY-LOGO-001.webp" alt="Mejai Hai Yum" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-green-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full font-semibold">
                        Order Now
                      </div>
                    </div>
                    <p className="text-[10px] md:text-sm opacity-80 text-center hidden md:block">Fresh Salmon & Thai Yum</p>
                  </article>
                </nav>
              </div>

              {/* Trust Signals - Compact on mobile, below restaurants */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-12 text-xs md:text-base animate-fade-in">
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl">🏆</span>
                  <span className="font-medium">Best Prices</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl">⚡</span>
                  <span className="font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-lg md:text-2xl">🍱</span>
                  <span className="font-medium">Mix & Match</span>
                </div>
              </div>

              {/* How It Works - Compact on mobile, expanded on desktop */}
              <div className="mb-6 md:mb-12 animate-fade-in bg-[#8B1538] rounded-full px-6 py-3 md:px-10 md:py-6 md:rounded-2xl inline-block">
                <h2 className="text-sm md:text-2xl font-bold mb-2 md:mb-6">How It Works</h2>
                {/* Mobile: horizontal compact row */}
                <div className="flex md:hidden justify-center gap-6 text-xs">
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-1">1️⃣</span>
                    <span className="font-medium text-[10px]">Choose</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-1">2️⃣</span>
                    <span className="font-medium text-[10px]">Confirm</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xl mb-1">3️⃣</span>
                    <span className="font-medium text-[10px]">Delivered</span>
                  </div>
                </div>
                {/* Desktop: full cards */}
                <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                  <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm transition-smooth hover:scale-105">
                    <div className="text-4xl mb-3">1️⃣</div>
                    <h3 className="text-lg font-semibold mb-2">Choose Restaurants</h3>
                    <p className="text-sm opacity-80">Browse Restory, Nirvana & Mejai Hai Yum</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm transition-smooth hover:scale-105">
                    <div className="text-4xl mb-3">2️⃣</div>
                    <h3 className="text-lg font-semibold mb-2">Build Your Order</h3>
                    <p className="text-sm opacity-80">Mix dishes from all restaurants</p>
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white/10 rounded-xl backdrop-blur-sm transition-smooth hover:scale-105">
                    <div className="text-4xl mb-3">3️⃣</div>
                    <h3 className="text-lg font-semibold mb-2">Delivered to Your Door</h3>
                    <p className="text-sm opacity-80">One order, one delivery fee</p>
                  </div>
                </div>
              </div>
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