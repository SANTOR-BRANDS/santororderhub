import { Dish } from '@/types/menu';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

const DishCard = ({ dish, onClick }: DishCardProps) => {
  const isUnavailable = dish.isAvailable === false;
  
  return (
    <Card 
      className={cn(
        'transition-smooth backdrop-blur-sm relative',
        !isUnavailable && 'cursor-pointer hover:shadow-card hover:-translate-y-1',
        !isUnavailable && (dish.restaurant === 'restory' 
          ? 'bg-nirvana-secondary text-white hover:border-restory/30 border border-gray-700' 
          : dish.restaurant === 'mejai hai yum'
          ? 'bg-mejai-background hover:border-mejai-primary/50 border border-mejai-accent/30'
          : 'bg-nirvana-primary hover:border-nirvana-accent/30'),
        isUnavailable && 'opacity-60 cursor-not-allowed',
        dish.restaurant === 'nirvana' && 'bg-nirvana-primary border-border/50',
        dish.restaurant === 'restory' && 'bg-nirvana-secondary text-white border border-gray-700',
        dish.restaurant === 'mejai hai yum' && 'bg-mejai-background border border-mejai-accent/30'
      )}
      onClick={() => !isUnavailable && onClick(dish)}
    >
      <CardContent className="p-0">
        {/* Dish Image */}
        <div className="w-full aspect-square rounded-t-lg overflow-hidden relative">
          {isUnavailable ? (
            <div className={cn(
              'w-full h-full flex items-center justify-center',
              dish.restaurant === 'restory' 
                ? 'bg-restory/10' 
                : dish.restaurant === 'mejai hai yum'
                ? 'bg-mejai-accent/20'
                : 'bg-nirvana-accent/10'
            )}>
              <div className="text-center p-6">
                <div className="text-4xl mb-3">🚫</div>
                <div className={cn(
                  'text-sm font-semibold',
                  dish.restaurant === 'restory' ? 'text-restory' : 
                  dish.restaurant === 'mejai hai yum' ? 'text-mejai-primary' : 'text-nirvana-accent'
                )}>
                  Currently Unavailable
                </div>
              </div>
            </div>
          ) : (
            <>
              {dish.image ? (
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-full object-cover transition-smooth hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling!.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={cn(
                'w-full h-full flex items-center justify-center text-muted-foreground',
                dish.restaurant === 'restory' 
                  ? 'bg-restory/10' 
                  : dish.restaurant === 'mejai hai yum'
                  ? 'bg-mejai-accent/20'
                  : 'bg-nirvana-accent/10',
                dish.image ? 'hidden' : ''
              )}>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-current/10 flex items-center justify-center">
                    🍽️
                  </div>
                  <span className="text-xs">No Image</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className={cn(
              'font-semibold text-sm leading-tight',
              dish.restaurant === 'mejai hai yum' ? 'text-black' : 'text-white',
              dish.isSpecial && 'text-amber-600 font-bold'
            )}>
              {dish.name}
            </h3>
            <span className={cn(
              'font-bold text-lg whitespace-nowrap',
              dish.restaurant === 'restory' ? 'text-restory' : 
              dish.restaurant === 'mejai hai yum' ? 'text-mejai-secondary' : 'text-nirvana-accent'
            )}>
              ฿{dish.price}
            </span>
          </div>
          
          {dish.description && (
            <p className={cn(
              "text-xs mb-2 line-clamp-2",
              dish.restaurant === 'mejai hai yum' ? 'text-black/70' : 'text-muted-foreground'
            )}>
              {dish.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className={cn(
              'text-xs px-2 py-1 rounded-full font-semibold',
              dish.restaurant === 'restory' 
                ? 'bg-restory/10 text-restory-secondary' 
                : dish.restaurant === 'mejai hai yum'
                ? 'bg-mejai-secondary/20 text-mejai-secondary'
                : 'bg-nirvana-accent/10 text-nirvana-accent'
            )}>
              {dish.category}
            </span>
            
            {(dish.spicyRequired || dish.isSpecial) && (
              <div className="flex gap-1">
                {dish.spicyRequired && (
                  <span className="text-xs">🌶️</span>
                )}
                {dish.isSpecial && (
                  <span className="text-xs">⭐</span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DishCard;