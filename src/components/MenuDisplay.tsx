import { useState, useMemo } from 'react';
import { Restaurant, Dish } from '@/types/menu';
import { getMenuByRestaurant } from '@/data/menuData';
import { Input } from '@/components/ui/input';
import DishCard from './DishCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuDisplayProps {
  restaurant: Restaurant;
  onDishSelect: (dish: Dish) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}
const themeColors: Record<Restaurant, {
  accent: string;
  color: string;
}> = {
  restory: {
    accent: 'restory',
    color: '#FF9800'
  },
  nirvana: {
    accent: 'nirvana-accent',
    color: '#ffd93d'
  },
  'mejai hai yum': {
    accent: 'mejai',
    color: '#fec428'
  }
};
const MenuDisplay = ({
  restaurant,
  onDishSelect,
  selectedCategory,
  onCategoryChange
}: MenuDisplayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const menu = useMemo(() => getMenuByRestaurant(restaurant), [restaurant]);
  const filteredDishes = useMemo(() => {
    return menu.filter(dish => {
      const matchesCategory = selectedCategory === 'ALL' || dish.category === selectedCategory;
      const matchesSearch = searchQuery === '' || dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, selectedCategory, searchQuery]);
  const theme = themeColors[restaurant];
  
  const getBackgroundClass = () => {
    if (restaurant === 'nirvana') return 'bg-nirvana-secondary';
    if (restaurant === 'restory') return 'bg-nirvana-secondary text-white';
    if (restaurant === 'mejai hai yum') return 'bg-mejai-background';
    return 'bg-white';
  };
  
  const getPromoBannerClass = () => {
    if (restaurant === 'restory') return 'bg-gradient-restory text-restory-foreground';
    if (restaurant === 'mejai hai yum') return 'bg-gradient-mejai text-mejai-foreground';
    return 'bg-white text-black';
  };
  
  const getPromoMessage = () => {
    if (restaurant === 'restory') return 'Try our signature Tonkatsu Don - perfectly crunchy and delicious!';
    if (restaurant === 'nirvana') return 'MUST TRY! Braised Pork Belly on Rice - melts in your mouth 🤤';
    return 'Fresh salmon dishes - Premium quality!';
  };
  
  const getSpecialDishId = () => {
    if (restaurant === 'restory') return 'RS-DON-001'; // Tonkatsu Don
    if (restaurant === 'nirvana') return 'NV-BRR-002'; // Braised Pork Belly on Rice
    return 'MHY-SAL-001'; // Fresh Salmon Sashimi
  };
  
  const handleSpecialClick = () => {
    const specialDishId = getSpecialDishId();
    const specialDish = menu.find(dish => dish.id === specialDishId);
    if (specialDish) {
      onDishSelect(specialDish);
    }
  };
  
  return <div className={cn('min-h-screen pb-20', getBackgroundClass())}>
      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Title */}
        <section className="text-center mb-8">
          <h1 className="sr-only">{restaurant.charAt(0).toUpperCase() + restaurant.slice(1)} Menu - Order Thai Food Online</h1>
          <p className="text-muted-foreground">
            Choose your favorite dishes and customize them to your taste!
          </p>
        </section>

        {/* Search Bar */}
        <search role="search" className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
          <Input 
            placeholder="Search dishes or categories..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search dishes or categories" 
            className={cn(
              "pl-10 backdrop-blur-sm rounded-sm bg-white/60 border-gray-300 text-gray-900 placeholder:text-gray-500",
              restaurant === 'restory' && 'bg-white/10 border-gray-600 text-white placeholder:text-gray-400'
            )} 
          />
        </search>

        {/* Promotional Banner */}
        <button 
          onClick={handleSpecialClick}
          className={cn(
            'w-full rounded-lg mb-6 p-6 text-center transition-smooth hover:scale-[1.02] cursor-pointer sparkle-border', 
            getPromoBannerClass()
          )} 
          aria-label="Today's special offer - Click to view dish"
        >
          <h2 className="text-xl font-bold mb-2">🔥 Today&apos;s Special</h2>
          <p className="opacity-90">
            {getPromoMessage()}
          </p>
        </button>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4" aria-label="Menu dishes">
            {filteredDishes.map(dish => <DishCard key={dish.id} dish={dish} onClick={onDishSelect} />)}
          </section> : <section className="text-center py-12">
            <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
            <h2 className="text-xl font-semibold mb-2">No dishes found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </section>}
      </div>
    </div>;
};
export default MenuDisplay;