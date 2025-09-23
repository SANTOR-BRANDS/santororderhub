import { useState } from 'react';
import { Restaurant, Dish, BasketItem } from '@/types/menu';
import RestaurantHeader from '@/components/RestaurantHeader';
import MenuDisplay from '@/components/MenuDisplay';
import DishModal from '@/components/DishModal';
import BasketModal from '@/components/BasketModal';
import FloatingBasket from '@/components/FloatingBasket';

const Index = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const handleAddToBasket = (item: BasketItem) => {
    setBasketItems(prev => [...prev, item]);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setBasketItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setBasketItems(prev => prev.filter(item => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader
        selectedRestaurant={selectedRestaurant}
        onRestaurantChange={setSelectedRestaurant}
      />

      {selectedRestaurant ? (
        <MenuDisplay
          restaurant={selectedRestaurant}
          onDishSelect={setSelectedDish}
        />
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center bg-gradient-santor text-santor-foreground">
          <div className="text-center p-8">
            <div className="text-8xl mb-6">🍽️</div>
            <h1 className="text-4xl font-bold mb-4">Welcome to SANTOR</h1>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Your premier dining destination. Select a restaurant above to explore 
              our delicious menus and place your order via Instagram DM.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div 
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20"
                onClick={() => setSelectedRestaurant('restory')}
              >
                <h3 className="text-xl font-bold mb-2">🧡 Restory</h3>
                <p className="text-sm opacity-80">Japanese-Thai fusion cuisine</p>
              </div>
              <div 
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-smooth hover:bg-white/20"
                onClick={() => setSelectedRestaurant('nirvana')}
              >
                <h3 className="text-xl font-bold mb-2">⚫ Nirvana</h3>
                <p className="text-sm opacity-80">Authentic Thai flavors</p>
              </div>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Index;