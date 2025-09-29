import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';

interface RestaurantHeaderProps {
  selectedRestaurant: Restaurant | null;
  onRestaurantChange: (restaurant: Restaurant) => void;
}

const RestaurantHeader = ({ selectedRestaurant, onRestaurantChange }: RestaurantHeaderProps) => {
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
    <header className={cn('fixed top-0 w-full z-50 transition-smooth', getHeaderStyle())}>{/* ... rest of the header content ... */}</header>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* SANTOR Brand */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wider">
              SANTOR
            </h1>
            <p className="text-sm opacity-90 mt-1">Restaurant Holdings</p>
          </div>

          {/* Restaurant Selection */}
          <div className="flex flex-wrap justify-center gap-2">
            {restaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => restaurant.available && onRestaurantChange(restaurant.id)}
                disabled={!restaurant.available}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-smooth',
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default RestaurantHeader;
