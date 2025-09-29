import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
interface RestaurantHeaderProps {
  selectedRestaurant: Restaurant | null;
  onRestaurantChange: (restaurant: Restaurant) => void;
}
const RestaurantHeader = ({
  selectedRestaurant,
  onRestaurantChange
}: RestaurantHeaderProps) => {
  const restaurants = [{
    id: 'restory' as Restaurant,
    name: 'Restory',
    available: true
  }, {
    id: 'nirvana' as Restaurant,
    name: 'Nirvana',
    available: true
  }, {
    id: 'mejai hai yum' as Restaurant,
    name: 'Mejai Hai Yum (soon)',
    available: false
  }, {
    id: 'chan wan' as Restaurant,
    name: 'Chan Wan (soon)',
    available: false
  }];
  const getHeaderStyle = () => {
    if (!selectedRestaurant) return 'bg-gradient-santor text-santor-foreground';
    return selectedRestaurant === 'restory' ? 'bg-gradient-restory text-restory-foreground' : 'bg-gradient-nirvana text-nirvana-foreground';
  };
  return <header className={cn('sticky top-0 z-50 transition-smooth', getHeaderStyle())}>
      
    </header>;
};
export default RestaurantHeader;