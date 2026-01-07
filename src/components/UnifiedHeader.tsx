import { useMemo } from 'react';
import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
import { Languages, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { UNIFIED_CATEGORIES, UnifiedCategory, getRestaurantInfo, getUnifiedMenu, getAvailableCategoriesForBrand } from '@/lib/unifiedMenu';

interface UnifiedHeaderProps {
  selectedCategory: UnifiedCategory;
  onCategoryChange: (category: UnifiedCategory) => void;
  selectedBrand: Restaurant | 'all';
  onBrandChange: (brand: Restaurant | 'all') => void;
}

const BRANDS: (Restaurant | 'all')[] = ['all', 'restory', 'nirvana', 'mejai hai yum'];

const UnifiedHeader = ({ 
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
}: UnifiedHeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  // Get available categories based on selected brand
  const unifiedMenu = useMemo(() => getUnifiedMenu(), []);
  const availableCategories = useMemo(() => 
    getAvailableCategoriesForBrand(unifiedMenu, selectedBrand),
    [unifiedMenu, selectedBrand]
  );
  
  // Handle brand change - reset to ALL category
  const handleBrandChange = (brand: Restaurant | 'all') => {
    onBrandChange(brand);
    onCategoryChange('ALL');
  };
  
  // Scroll to top when logo is clicked
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <header className="sticky top-0 z-50 bg-gradient-santor text-santor-foreground">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {/* SANTOR Brand with Language Selector */}
          <div className="flex items-center justify-between">
            <div className="flex-1" />
            <button 
              onClick={handleLogoClick}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Scroll to top"
            >
              <img 
                src="/images/SAN-LOGO-001.svg" 
                alt="SANTOR Restaurant Holdings Logo" 
                className="h-12 md:h-14"
              />
            </button>
            <nav className="flex-1 flex justify-end" aria-label="Language selection">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-inherit hover:bg-white/10"
                    aria-label="Change language"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    {language === 'en' ? 'EN' : 'ไทย'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-32 p-2" align="end">
                  <div className="flex flex-col gap-1">
                    <Button
                      variant={language === 'en' ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </Button>
                    <Button
                      variant={language === 'th' ? 'secondary' : 'ghost'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setLanguage('th')}
                    >
                      ไทย
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </nav>
          </div>

          {/* Brand Filter Pills */}
          <div className="flex items-center justify-center gap-2 w-full">
            <Filter className="h-4 w-4 opacity-70 shrink-0" />
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand;
                const info = brand === 'all' ? null : getRestaurantInfo(brand);
                
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandChange(brand)}
                    className={cn(
                      'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all',
                      'border border-white/20',
                      isSelected 
                        ? 'bg-white/25 border-white/40 shadow-sm' 
                        : 'hover:bg-white/10 hover:border-white/30'
                    )}
                  >
                    {info && (
                      <img 
                        src={info.logo} 
                        alt={info.name}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
                      />
                    )}
                    <span className="truncate max-w-[70px] sm:max-w-none">{brand === 'all' ? 'All' : info?.name}</span>
                    {isSelected && brand !== 'all' && (
                      <X 
                        className="h-3 w-3 ml-0.5 opacity-70 hover:opacity-100 shrink-0" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBrandChange('all');
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Navigation Bar */}
      <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto px-4 py-3 scrollbar-hide snap-x snap-mandatory">
          {availableCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  'text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap pb-2 snap-start',
                  isSelected 
                    ? 'text-[#fd7304] border-[#fd7304]' 
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                )}
                aria-current={isSelected ? 'true' : undefined}
              >
                {getCategoryEmoji(category)} {category}
              </button>
            );
          })}
          {/* Spacer to ensure last item has breathing room */}
          <div className="shrink-0 w-4" aria-hidden="true" />
        </div>
      </div>
    </header>
  );
};

const getCategoryEmoji = (category: UnifiedCategory): string => {
  const emojis: Record<UnifiedCategory, string> = {
    'ALL': '🍽️',
    'COMBO DEALS': '🔥',
    'RICE': '🍚',
    'NOODLES': '🍜',
    'FRESH SEAFOOD': '🐟',
    'VEGETARIAN': '🌱',
    'TOPPINGS': '🥢',
    'DRINKS': '🧃',
    'DESSERTS': '🍨',
  };
  return emojis[category];
};

export default UnifiedHeader;
