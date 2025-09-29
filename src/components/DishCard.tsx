import { Dish } from '@/types/menu';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
}

const DishCard = ({ dish, onClick }: DishCardProps) => {
  return (
    <Card 
      className={cn(
        'cursor-pointer transition-smooth hover:shadow-card hover:-translate-y-1',
        'border-border/50 backdrop-blur-sm',
        dish.restaurant === 'restory' 
          ? 'hover:border-restory/30' 
          : 'hover:border-nirvana-accent/30'
      )}
      onClick={() => onClick(dish)}
    >
      <CardContent className="p-0">
        {/* Dish Image: Reduced height on mobile to save vertical space */}
        <div className="w-full h-32 md:h-48 rounded-t-lg overflow-hidden">
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
              : 'bg-nirvana-accent/10',
            dish.image ? 'hidden' : ''
          )}>
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-1 md:mb-2 rounded-full bg-current/10 flex items-center justify-center text-xl md:text-2xl">
                🍽️
              </div>
              <span className="text-xs">No Image</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4"> {/* Reduced padding on mobile */}
          <div className="flex justify-between items-start gap-1 md:gap-2 mb-1 md:mb-2"> {/* Reduced gap and margin on mobile */}
            <h3 className={cn(
              // CHANGE: Shrink dish name text from text-sm to text-xs on mobile
              'font-semibold text-xs md:text-sm leading-tight', 
              dish.isSpecial && 'text-amber-600 font-bold'
            )}>
              {dish.name}
            </h3>
            <span className={cn(
              // CHANGE: Shrink price text from text-lg to text-sm on mobile
              'font-bold text-sm md:text-lg whitespace-nowrap', 
              dish.restaurant === 'restory' ? 'text-restory' : 'text-nirvana-accent'
            )}>
              ฿{dish.price}
            </span>
          </div>
          
          {dish.description && (
            <p className="text-xs text-muted-foreground mb-1 line-clamp-2"> {/* Reduced margin on mobile */}
              {dish.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-1"> {/* Added top margin for spacing */}
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full', // Slightly reduced vertical padding on tag
              dish.restaurant === 'restory' 
                ? 'bg-restory/10 text-restory-secondary' 
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
