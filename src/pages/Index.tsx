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

const themeColors: Record<Restaurant, string> = {
  restory: '#FF9800',
  nirvana: '#ffd93d',
  'mejai hai yum': '#FF6B9D'
};

const Index = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
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

  return <div className={cn("min-h-screen", selectedRestaurant === 'restory' ? 'bg-nirvana-secondary' : 'bg-background')}>
      <RestaurantHeader 
        selectedRestaurant={selectedRestaurant} 
        onRestaurantChange={handleRestaurantChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        themeColor={themeColor}
      />

      {selectedRestaurant ? <MenuDisplay 
        restaurant={selectedRestaurant} 
        onDishSelect={setSelectedDish}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      /> : <div className="min-h-[80vh] flex items-center justify-center bg-gradient-santor text-santor-foreground">
          <div className="text-center p-8">
            <div className="text-8xl mb-6">🍽️</div>
            <h1 className="text-4xl font-bold mb-4">Welcome to SANTOR</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">We believe good food is the foundation of happiness</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20" onClick={() => setSelectedRestaurant('restory')}>
                <h3 className="text-xl font-bold mb-2">🧡 Restory</h3>
                <p className="text-sm opacity-80">Asian Fusion - Cooked to Order</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20" onClick={() => setSelectedRestaurant('nirvana')}>
                <h3 className="text-xl font-bold mb-2">⚫ Nirvana</h3>
                <p className="text-sm opacity-80">Authentic Flavors</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20" onClick={() => setSelectedRestaurant('mejai hai yum')}>
                <h3 className="text-xl font-bold mb-2">💗 Mejai Hai Yum</h3>
                <p className="text-sm opacity-80">Fresh Salmon & Thai Yum</p>
              </div>
            </div>
          </div>
        </div>}

      <DishModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} onAddToBasket={handleAddToBasket} />

      <BasketModal isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} basketItems={basketItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />

      <FloatingBasket basketItems={basketItems} onOpenBasket={() => setIsBasketOpen(true)} />
      
      <Footer selectedRestaurant={selectedRestaurant} />
    </div>;
};
export default Index;