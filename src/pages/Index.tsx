import { useState, useMemo, useEffect } from 'react';
import { Restaurant, Dish, BasketItem } from '@/types/menu';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuDisplay from '@/components/MenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';
import Footer from '@/components/Footer';
import DishCard from '@/components/DishCard';
import { getCategoriesByRestaurant, getAllMenus, getAllCategories, getFeaturedDishes } from '@/data/menuData';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEOHead } from '@/seo/components/SEOHead';
import { getMetadata } from '@/seo/metadata';
import { organizationSchema, websiteSchema, restorySchema, nirvanaSchema, mejaiSchema } from '@/seo/jsonld';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const themeColors: Record<Restaurant, string> = {
  restory: '#fd7304',
  nirvana: '#ffd93d',
  'mejai hai yum': '#fec428'
};

// Cross-brand category mapping
const UNIFIED_CATEGORIES = [
  { id: 'ALL', keywords: [] },
  { id: 'KRAPAO', keywords: ['PAD KRAPAO', 'KRAPAO'] },
  { id: 'RICE', keywords: ['DONBURI', 'DON', 'RICE', 'GRILLED RICE', 'BRAISED RICE'] },
  { id: 'NOODLES', keywords: ['NOODLE', 'NOODLES', 'EGG NOODLE', 'BRAISED NOODLE', 'GRILLED NOODLE'] },
  { id: 'CURRY', keywords: ['CURRY'] },
  { id: 'FRIED', keywords: ['FRIED CHICKEN', 'KARAAGE', 'KOREAN', 'QUICK DISH'] },
  { id: 'GRILLED', keywords: ['GRILLED', 'GRILL'] },
  { id: 'EGGS', keywords: ['EGG', 'OMELETTE', 'SOMETHING WITH EGG'] },
  { id: 'DRINKS', keywords: ['DRINK', 'DESSERT'] },
];

const Index = () => {
  const { t } = useLanguage();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    try {
      const saved = localStorage.getItem('santor-basket');
      if (saved) {
        const parsed = JSON.parse(saved);
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
  
  // Global search state
  const [searchQuery, setSearchQuery] = useState('');
  const [unifiedCategory, setUnifiedCategory] = useState('ALL');
  
  const categories = useMemo(() => selectedRestaurant ? getCategoriesByRestaurant(selectedRestaurant) : [], [selectedRestaurant]);
  const themeColor = selectedRestaurant ? themeColors[selectedRestaurant] : undefined;
  
  // Get all dishes for unified view
  const allDishes = useMemo(() => getAllMenus(), []);
  const featuredDishes = useMemo(() => getFeaturedDishes(), []);
  
  // Filter dishes based on search and category
  const filteredDishes = useMemo(() => {
    let dishes = allDishes;
    
    // Apply unified category filter
    if (unifiedCategory !== 'ALL') {
      const category = UNIFIED_CATEGORIES.find(c => c.id === unifiedCategory);
      if (category) {
        dishes = dishes.filter(dish => 
          category.keywords.some(keyword => 
            dish.category.toUpperCase().includes(keyword.toUpperCase())
          )
        );
      }
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      dishes = dishes.filter(dish =>
        dish.name.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query) ||
        dish.restaurant.toLowerCase().includes(query)
      );
    }
    
    return dishes.filter(d => d.isAvailable !== false);
  }, [allDishes, unifiedCategory, searchQuery]);
  
  const handleAddToBasket = (item: BasketItem) => {
    setBasketItems(prev => [...prev, item]);
  };
  
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setBasketItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };
  
  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  const handleRestaurantChange = (restaurant: Restaurant | null) => {
    setSelectedRestaurant(restaurant);
    setSelectedCategory('ALL');
    setSearchQuery('');
    setUnifiedCategory('ALL');
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

  useEffect(() => {
    try {
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
  
  // Showing results (search or category active)
  const showingResults = searchQuery.trim() || unifiedCategory !== 'ALL';
  
  return (
    <div className={cn(
      "min-h-screen",
      selectedRestaurant === 'restory' ? 'bg-nirvana-secondary' : 
      selectedRestaurant === 'mejai hai yum' ? 'bg-mejai-background' : 
      'bg-background'
    )}>
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
        {selectedRestaurant ? (
          <MenuDisplay 
            restaurant={selectedRestaurant} 
            onDishSelect={setSelectedDish} 
            selectedCategory={selectedCategory} 
            onCategoryChange={setSelectedCategory} 
          />
        ) : (
          <div className="bg-gradient-santor text-santor-foreground">
            {/* Hero Section */}
            <section className="relative py-8 md:py-16 overflow-hidden">
              <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Main Headline */}
                <div className="animate-scale-in mb-6">
                  <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-2 font-serif">
                    {t('foodCourt.headline')}
                  </h1>
                  <p className="text-xl md:text-3xl lg:text-4xl font-light opacity-90">
                    {t('foodCourt.subheadline')}
                  </p>
                </div>
                
                {/* Trust Signals */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 animate-fade-in">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-xl">🏆</span>
                    <span className="font-medium text-sm md:text-base">{t('trust.bestPrices')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-xl">⚡</span>
                    <span className="font-medium text-sm md:text-base">{t('trust.fastDelivery')}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-xl">🍱</span>
                    <span className="font-medium text-sm md:text-base">{t('trust.mixMatch')}</span>
                  </div>
                </div>
                
                {/* Global Search Bar */}
                <div className="max-w-2xl mx-auto mb-8 animate-fade-in">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={t('foodCourt.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-6 text-lg rounded-full bg-white text-foreground shadow-lg border-0 focus-visible:ring-2 focus-visible:ring-primary"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                      >
                        <X className="h-5 w-5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Cross-Brand Category Bar */}
                <div className="overflow-x-auto pb-2 mb-6 animate-fade-in -mx-4 px-4">
                  <div className="flex gap-2 justify-start md:justify-center min-w-max">
                    {UNIFIED_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setUnifiedCategory(category.id)}
                        className={cn(
                          'px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap',
                          unifiedCategory === category.id
                            ? 'bg-white text-santor shadow-md scale-105'
                            : 'bg-white/20 hover:bg-white/30'
                        )}
                      >
                        {t(`category.${category.id.toLowerCase()}`) || category.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            
            {/* Results Section (when searching or filtering) */}
            {showingResults && (
              <section className="bg-background py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  {filteredDishes.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredDishes.map(dish => (
                        <DishCard key={dish.id} dish={dish} onClick={setSelectedDish} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{t('foodCourt.noResults')}</h3>
                      <p className="text-muted-foreground">{t('foodCourt.tryDifferent')}</p>
                    </div>
                  )}
                </div>
              </section>
            )}
            
            {/* Mix & Match Favorites Section */}
            {!showingResults && (
              <section className="bg-background py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {t('foodCourt.favorites')}
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {featuredDishes.map(dish => (
                      <DishCard key={dish.id} dish={dish} onClick={setSelectedDish} />
                    ))}
                  </div>
                </div>
              </section>
            )}
            
            {/* Browse by Brand Section */}
            {!showingResults && (
              <section className="bg-background py-8 px-4 border-t border-border/50">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                    {t('foodCourt.browseByBrand')}
                  </h2>
                  
                  <nav aria-label="Restaurant selection" className="grid grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
                    <article 
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedRestaurant('restory')}
                    >
                      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-card transition-smooth group-hover:scale-105 group-hover:shadow-lg relative">
                        <img src="/images/RS-LOGO-001.webp" alt="Restory" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-semibold">
                          {t('header.orderNow')}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">Restory</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground hidden md:block">
                          {t('restaurant.restory.desc')}
                        </p>
                      </div>
                    </article>
                    
                    <article 
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedRestaurant('nirvana')}
                    >
                      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-card transition-smooth group-hover:scale-105 group-hover:shadow-lg relative">
                        <img src="/images/NV-LOGO-001.webp" alt="Nirvana" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-semibold">
                          {t('header.orderNow')}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">Nirvana</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground hidden md:block">
                          {t('restaurant.nirvana.desc')}
                        </p>
                      </div>
                    </article>
                    
                    <article 
                      className="flex flex-col items-center gap-3 cursor-pointer group"
                      onClick={() => setSelectedRestaurant('mejai hai yum')}
                    >
                      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-card transition-smooth group-hover:scale-105 group-hover:shadow-lg relative">
                        <img src="/images/MHY-LOGO-001.webp" alt="Mejai Hai Yum" className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-semibold">
                          {t('header.orderNow')}
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="font-semibold text-foreground text-sm md:text-base">{t('restaurant.mejai')}</h3>
                        <p className="text-[10px] md:text-sm text-muted-foreground hidden md:block">
                          {t('restaurant.mejai.desc')}
                        </p>
                      </div>
                    </article>
                  </nav>
                </div>
              </section>
            )}
            
            {/* How It Works - Compact */}
            {!showingResults && (
              <section className="bg-gradient-santor py-8 px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-[#8B1538]/50 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-white">{t('how.title')}</h2>
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl md:text-4xl mb-2">1️⃣</div>
                        <h3 className="text-sm md:text-lg font-semibold text-white mb-1">{t('how.step1.short')}</h3>
                        <p className="text-xs md:text-sm text-white/80 hidden md:block">{t('how.step1.desc')}</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl md:text-4xl mb-2">2️⃣</div>
                        <h3 className="text-sm md:text-lg font-semibold text-white mb-1">{t('how.step2.short')}</h3>
                        <p className="text-xs md:text-sm text-white/80 hidden md:block">{t('how.step2.desc')}</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="text-3xl md:text-4xl mb-2">3️⃣</div>
                        <h3 className="text-sm md:text-lg font-semibold text-white mb-1">{t('how.step3.short')}</h3>
                        <p className="text-xs md:text-sm text-white/80 hidden md:block">{t('how.step3.desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
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

      <FloatingBasket basketItems={basketItems} onOpenBasket={() => setIsBasketOpen(true)} />
      
      <Footer selectedRestaurant={selectedRestaurant} />
    </div>
  );
};

export default Index;
