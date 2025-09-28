import { useState } from 'react';
import { Restaurant, Dish, BasketItem } from '@/types/menu';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuDisplay from '@/components/MenuDisplay';
import MenuCategoriesBar from '@/components/ui/MenuCategoriesBar';
import { getCategoriesByRestaurant } from '@/data/menuData';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';

const Index = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

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

  const categories = selectedRestaurant ? getCategoriesByRestaurant(selectedRestaurant) : [];
  const themeColor = selectedRestaurant === 'restory' ? '#FF9800' : '#0ea5e9';

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader selectedRestaurant={selectedRestaurant} onRestaurantChange={setSelectedRestaurant} />

      {/* Sticky category bar right under restaurant selector */}
      {selectedRestaurant && (
        <MenuCategoriesBar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          themeColor={themeColor}
        />
      )}

      {selectedRestaurant ? (
        <MenuDisplay
          restaurant={selectedRestaurant}
          onDishSelect={setSelectedDish}
          selectedCategory={selectedCategory}
        />
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-santor text-santor-foreground">
          <div className="text-center p-8">
            <div className="text-8xl mb-6">🍽️</div>
            <h1 className="text-4xl font-bold mb-4">Welcome to SANTOR</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">We believe good food is the foundation of happiness</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20" onClick={() => setSelectedRestaurant('restory')}>
                <h3 className="text-xl font-bold mb-2">🧡 Restory</h3>
                <p className="text-sm opacity-80">Asian Fusion - Cooked to Order</p>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20" onClick={() => setSelectedRestaurant('nirvana')}>
                <h3 className="text-xl font-bold mb-2">⚫ Nirvana</h3>
                <p className="text-sm opacity-80">Authentic Flavors</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <DishModal dish={selectedDish} isOpen={!!selectedDish} onClose={() => setSelectedDish(null)} onAddToBasket={handleAddToBasket} />

      <BasketModal isOpen={isBasketOpen} onClose={() => setIsBasketOpen(false)} basketItems={basketItems} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />

      <FloatingBasket basketItems={basketItems} onOpenBasket={() => setIsBasketOpen(true)} />
    </div>
  );
};

export default Index;
