import { useState, useMemo } from 'react';
import { Restaurant, Dish } from '@/types/menu';
import { getMenuByRestaurant, getCategoriesByRestaurant } from '@/data/menuData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DishCard from './DishCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuDisplayProps {
  restaurant: Restaurant;
  onDishSelect: (dish: Dish) => void;
}

const MenuDisplay = ({ restaurant, onDishSelect }: MenuDisplayProps) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const menu = useMemo(() => getMenuByRestaurant(restaurant), [restaurant]);
  const categories = useMemo(() => getCategoriesByRestaurant(restaurant), [restaurant]);

  const filteredDishes = useMemo(() => {
    return menu.filter(dish => {
      const matchesCategory = selectedCategory === 'ALL' || dish.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menu, selectedCategory, searchQuery]);

  const getThemeStyles = () => {
    return restaurant === 'restory'
      ? {
          bg: 'bg-restory-background',
          accent: 'restory',
          button: 'bg-restory text-restory-foreground hover:bg-restory-secondary',
          selectedButton: 'bg-restory text-restory-foreground shadow-card',
        }
      : {
          bg: 'bg-nirvana-background',
          accent: 'nirvana-accent',
          button: 'bg-nirvana text-nirvana-foreground hover:bg-nirvana-secondary',
          selectedButton: 'bg-nirvana-accent text-nirvana-primary shadow-card',
        };
  };

  const theme = getThemeStyles();

  return (
    <div className={cn('min-h-screen pb-20', theme.bg)}>
      <div className="container mx-auto px-4 py-6">
        {/* Restaurant Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold capitalize mb-2">
            {restaurant} Menu
          </h2>
          <p className="text-muted-foreground">
            Choose your favorite dishes and customize them to your taste
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search dishes or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card/50 backdrop-blur-sm"
          />
        </div>

        {/* Promotional Banner */}
        <div className={cn(
          'rounded-lg mb-6 p-6 text-center',
          restaurant === 'restory' 
            ? 'bg-gradient-restory text-restory-foreground' 
            : 'bg-gradient-nirvana text-nirvana-foreground'
        )}>
          <h3 className="text-xl font-bold mb-2">🔥 Today's Special</h3>
          <p className="opacity-90">
            {restaurant === 'restory' 
              ? 'Try our signature Tonkatsu Don - perfectly crispy and delicious!' 
              : 'Fresh Grilled Beef on Rice - tender and flavorful!'}
          </p>
        </div>

        {/* Category Filter */}
        <ScrollArea className="mb-6">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'whitespace-nowrap transition-smooth',
                  selectedCategory === category 
                    ? theme.selectedButton
                    : `border-${theme.accent}/20 hover:border-${theme.accent}/40`
                )}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* Dishes Grid */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredDishes.map((dish) => (
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
    </div>
  );
};

export default MenuDisplay;