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
  return <div className={cn('min-h-screen pb-20', restaurant === 'nirvana' ? 'bg-nirvana-secondary' : 'bg-restory-background')}>
      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Title */}
        <div className="text-center mb-8">
          
          <p className="text-muted-foreground">
            Choose your favorite dishes and customize them to your taste!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search dishes or categories..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 backdrop-blur-sm bg-slate-200 rounded-sm" />
        </div>

        {/* Promotional Banner */}
        <div className={cn('rounded-lg mb-6 p-6 text-center', restaurant === 'restory' ? 'bg-gradient-restory text-restory-foreground' : 'bg-white text-black')}>
          <h3 className="text-xl font-bold mb-2">🔥 Today's Special</h3>
          <p className="opacity-90">
            {restaurant === 'restory' ? 'Try our signature Tonkatsu Don - perfectly crunchy and delicious!' : 'MUST TRY! Braised Pork Belly on Rice - melts in your mouth 🤤'}
          </p>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredDishes.map(dish => <DishCard key={dish.id} dish={dish} onClick={onDishSelect} />)}
          </div> : <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>}
      </div>
    </div>;
};
export default MenuDisplay;