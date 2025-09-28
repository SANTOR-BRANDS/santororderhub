import { useState, useMemo } from 'react';
import { Restaurant, Dish } from '@/types/menu';
import { getMenuByRestaurant, getCategoriesByRestaurant } from '@/data/menuData';
import { Input } from '@/components/ui/input';
import DishCard from './DishCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuDisplayProps {
  restaurant: Restaurant;
  onDishSelect: (dish: Dish) => void;
}

const themeColors: Record<Restaurant, { accent: string; color: string }> = {
  restory: { accent: 'restory', color: '#FF9800' },
  nirvana: { accent: 'nirvana-accent', color: '#0ea5e9' },
};

const MenuDisplay = ({
  restaurant,
  onDishSelect,
}: MenuDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const menu = useMemo(() => getMenuByRestaurant(restaurant), [restaurant]);
  const categories = useMemo(() => getCategoriesByRestaurant(restaurant), [restaurant]);
  const filteredDishes = useMemo(() => {
    return menu.filter(dish => {
      const matchesCategory =
        selectedCategory === 'ALL' || dish.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, selectedCategory, searchQuery]);

  const theme = themeColors[restaurant];

  return (
    <div className={cn('min-h-screen pb-20 bg-white')}>
      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold capitalize mb-2 text-slate-50">
            {restaurant} Menu
          </h2>
          <p className="text-muted-foreground">
            Choose your favorite dishes and customize them to your taste!
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search dishes or categories..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 backdrop-blur-sm bg-slate-200 rounded-sm"
          />
        </div>

        {/* Promotional Banner */}
        <div
          className={cn(
            'rounded-lg mb-6 p-6 text-center',
            restaurant === 'restory'
              ? 'bg-gradient-restory text-restory-foreground'
              : 'bg-gradient-nirvana text-nirvana-foreground'
          )}
        >
          <h3 className="text-xl font-bold mb-2">🔥 Today's Special</h3>
          <p className="opacity-90">
            {restaurant === 'restory'
              ? 'Try our signature Tonkatsu Don - perfectly crunchy and delicious!'
              : 'MUST TRY! Braised Pork Belly on Rice - melts in your mouth 🤤'}
          </p>
        </div>

        {/* Sticky Category Menu Under Restaurant Selector */}
        <div
          className="sticky top-[88px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
          style={{ marginBottom: '1.5rem' }}
        >
          <div className="flex gap-6 overflow-x-auto px-4 py-3">
            {categories.map((category, idx) => (
              <button
                key={category}
                className={`text-base font-semibold transition-all cursor-pointer border-b-2 ${
                  selectedCategory === category
                    ? 'active-category'
                    : ''
                }`}
                style={{
                  borderColor:
                    selectedCategory === category
                      ? theme.color
                      : 'transparent',
                  color:
                    selectedCategory === category
                      ? theme.color
                      : '#555',
                  opacity: selectedCategory === category ? 1 : 0.8,
                  paddingBottom: '4px',
                  background: 'none',
                  outline: 'none',
                }}
                onClick={() => setSelectedCategory(category)}
                aria-current={selectedCategory === category ? 'true' : undefined}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDishes.map(dish => (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={onDishSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
      {/* Add to your CSS file for smooth underline: */}
      <style>{`
        .active-category {
          transition: border-color 0.3s, color 0.3s;
        }
      `}</style>
    </div>
  );
};

export default MenuDisplay;
