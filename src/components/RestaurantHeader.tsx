import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import MenuCategoriesBar from './MenuCategoriesBar';

interface RestaurantHeaderProps {
  selectedRestaurant: Restaurant | null;
  onRestaurantChange: (restaurant: Restaurant | null) => void;
  // Menu categories props (optional, only when restaurant is selected)
  categories?: string[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  themeColor?: string;
}

const RestaurantHeader = ({ 
  selectedRestaurant, 
  onRestaurantChange,
  categories,
  selectedCategory,
  onCategoryChange,
  themeColor
}: RestaurantHeaderProps) => {
  const restaurants = [
    { id: 'restory' as Restaurant, name: 'Restory', available: true },
    { id: 'nirvana' as Restaurant, name: 'Nirvana', available: true },
    { id: 'mejai hai yum' as Restaurant, name: 'Mejai Hai Yum (soon)', available: false },
    { id: 'chan wan' as Restaurant, name: 'Chan Wan (soon)', available: false },
  ];

  const getHeaderStyle = () => {
    if (!selectedRestaurant) return 'bg-gradient-santor text-santor-foreground';
    return selectedRestaurant === 'restory' 
      ? 'bg-gradient-restory text-restory-foreground'
      : 'bg-gradient-nirvana text-nirvana-foreground';
  };

  return (
    <header className={cn('sticky top-0 z-50 transition-smooth', getHeaderStyle())}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* SANTOR Brand */}
          <div className="text-center">
            <button 
              onClick={() => onRestaurantChange(null as any)}
              className="hover:opacity-80 transition-smooth"
            >
              <img 
                src="/images/SAN-LOGO-001.png" 
                alt="Santor" 
                className="h-12 md:h-14 mx-auto"
              />
            </button>
          </div>

          {/* Restaurant Selection */}
          <div className="flex justify-center gap-2 overflow-hidden">
            {/* Show first 2 restaurants on mobile, all on larger screens */}
            {restaurants.slice(0, 2).map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => restaurant.available && onRestaurantChange(restaurant.id)}
                disabled={!restaurant.available}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap',
                  'border border-white/20 backdrop-blur-sm',
                  restaurant.available 
                    ? selectedRestaurant === restaurant.id
                      ? 'bg-white/20 border-white/40 shadow-card'
                      : 'hover:bg-white/10 hover:border-white/30'
                    : 'opacity-40 cursor-not-allowed bg-white/5',
                )}
              >
                {restaurant.name}
              </button>
            ))}
            
            {/* Show remaining restaurants on tablet+ */}
            {restaurants.slice(2).map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => restaurant.available && onRestaurantChange(restaurant.id)}
                disabled={!restaurant.available}
                className={cn(
                  'hidden md:inline-flex px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap',
                  'border border-white/20 backdrop-blur-sm',
                  restaurant.available 
                    ? selectedRestaurant === restaurant.id
                      ? 'bg-white/20 border-white/40 shadow-card'
                      : 'hover:bg-white/10 hover:border-white/30'
                    : 'opacity-40 cursor-not-allowed bg-white/5',
                )}
              >
                {restaurant.name}
              </button>
            ))}

            {/* More dropdown on mobile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'md:hidden px-4 py-2 rounded-lg font-medium transition-smooth whitespace-nowrap',
                    'border border-white/20 backdrop-blur-sm',
                    'hover:bg-white/10 hover:border-white/30',
                    'inline-flex items-center gap-1'
                  )}
                >
                  More
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-background/95 backdrop-blur-sm border-border z-50"
              >
                {restaurants.slice(2).map((restaurant) => (
                  <DropdownMenuItem
                    key={restaurant.id}
                    onClick={() => restaurant.available && onRestaurantChange(restaurant.id)}
                    disabled={!restaurant.available}
                    className={cn(
                      restaurant.available 
                        ? selectedRestaurant === restaurant.id
                          ? 'bg-accent'
                          : ''
                        : 'opacity-40 cursor-not-allowed',
                    )}
                  >
                    {restaurant.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Menu Categories Bar - Only shown when restaurant is selected */}
      {selectedRestaurant && categories && selectedCategory && onCategoryChange && themeColor && (
        <MenuCategoriesBar 
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={onCategoryChange}
          themeColor={themeColor}
        />
      )}
    </header>
  );
};

export default RestaurantHeader;
