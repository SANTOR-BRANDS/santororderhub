import { useState, useMemo } from 'react';
import { Restaurant, Dish } from '@/types/menu';
import { Input } from '@/components/ui/input';
import DishCard from './DishCard';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  getUnifiedMenu, 
  filterUnifiedMenu, 
  searchUnifiedMenu, 
  UnifiedCategory, 
  UnifiedDish,
  getRestaurantInfo 
} from '@/lib/unifiedMenu';

interface UnifiedMenuDisplayProps {
  selectedCategory: UnifiedCategory;
  selectedBrand: Restaurant | 'all';
  onDishSelect: (dish: Dish) => void;
}

const UnifiedMenuDisplay = ({
  selectedCategory,
  selectedBrand,
  onDishSelect,
}: UnifiedMenuDisplayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get the unified, de-duplicated menu
  const unifiedMenu = useMemo(() => getUnifiedMenu(), []);
  
  // Apply filters
  const filteredByCategory = useMemo(() => 
    filterUnifiedMenu(unifiedMenu, selectedCategory, selectedBrand),
    [unifiedMenu, selectedCategory, selectedBrand]
  );
  
  // Apply search
  const finalDishes = useMemo(() => 
    searchUnifiedMenu(filteredByCategory, searchQuery),
    [filteredByCategory, searchQuery]
  );
  
  // Get featured/special dish for promo
  const featuredDish = useMemo(() => {
    const specials = unifiedMenu.filter(d => d.isSpecial);
    return specials[0] || unifiedMenu.find(d => d.id === 'RS-DON-001');
  }, [unifiedMenu]);
  
  const handleFeaturedClick = () => {
    if (featuredDish) {
      onDishSelect(featuredDish);
    }
  };
  
  // Group dishes by category for display
  const groupedDishes = useMemo(() => {
    if (selectedCategory !== 'ALL') return null;
    
    const groups: Record<string, UnifiedDish[]> = {};
    finalDishes.forEach(dish => {
      if (!groups[dish.unifiedCategory]) {
        groups[dish.unifiedCategory] = [];
      }
      groups[dish.unifiedCategory].push(dish);
    });
    return groups;
  }, [finalDishes, selectedCategory]);
  
  return (
    <div className="min-h-screen pb-20 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <section className="text-center mb-6">
          <h1 className="text-2xl md:text-4xl font-serif mb-2">Order from many restaurants, ONE DELIVERY</h1>
          <p className="text-gray-400 text-sm md:text-base">
            Browse all dishes • Mix & match from different kitchens
          </p>
        </section>

        {/* Search Bar */}
        <search role="search" className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
          <Input 
            placeholder="Search dishes..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)}
            aria-label="Search dishes" 
            className="pl-10 bg-white/10 border-gray-600 text-white placeholder:text-gray-400 rounded-lg"
          />
        </search>

        {/* Featured Banner */}
        {featuredDish && !searchQuery && selectedCategory === 'ALL' && (
          <button 
            onClick={handleFeaturedClick}
            className="w-full rounded-lg mb-6 p-4 md:p-6 text-center transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-r from-[#8B1538] to-[#fd7304] text-white"
            aria-label="Today's special offer - Click to view dish"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xl">🔥</span>
              <h2 className="text-lg md:text-xl font-bold">Today's Special</h2>
            </div>
            <p className="opacity-90 text-sm md:text-base">
              {featuredDish.name} - Try our signature dish!
            </p>
            {featuredDish.restaurant && (
              <div className="mt-2 flex items-center justify-center gap-2">
                <img 
                  src={getRestaurantInfo(featuredDish.restaurant).logo}
                  alt={getRestaurantInfo(featuredDish.restaurant).name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs opacity-80">
                  from {getRestaurantInfo(featuredDish.restaurant).name}
                </span>
              </div>
            )}
          </button>
        )}

        {/* Dishes Display */}
        {finalDishes.length > 0 ? (
          selectedCategory === 'ALL' && groupedDishes ? (
            // Grouped view when showing ALL
            <div className="space-y-8">
              {Object.entries(groupedDishes).map(([category, dishes]) => (
                <section key={category}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#fd7304]">
                    {category}
                    <span className="text-sm font-normal text-gray-400">({dishes.length})</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {dishes.map(dish => (
                      <DishCard key={dish.id} dish={dish} onClick={onDishSelect} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            // Flat grid when filtering by category
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Menu dishes">
              {finalDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onClick={onDishSelect} />
              ))}
            </section>
          )
        ) : (
          <section className="text-center py-12">
            <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
            <h2 className="text-xl font-semibold mb-2">No dishes found</h2>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </section>
        )}
        
        {/* Results count */}
        {finalDishes.length > 0 && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            Showing {finalDishes.length} dishes
            {selectedBrand !== 'all' && ` from ${getRestaurantInfo(selectedBrand).name}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedMenuDisplay;
