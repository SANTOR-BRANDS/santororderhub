import { useMemo } from 'react';
import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
import { Globe, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { UNIFIED_CATEGORIES, UnifiedCategory, getRestaurantInfo, getUnifiedMenu, getAvailableCategoriesForBrand } from '@/lib/unifiedMenu';

// Map category names to translation keys
const CATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  'ALL': 'category.all',
  'COMBO DEALS': 'category.comboDeals',
  'RICE': 'category.rice',
  'NOODLES': 'category.noodles',
  'FRESH SEAFOOD': 'category.freshSeafood',
  'VEGETARIAN': 'category.vegetarian',
  'TOPPINGS': 'category.toppings',
  'DRINKS': 'category.drinks',
  'DESSERTS': 'category.desserts',
};

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
  
  // Fast scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  
  // Handle brand change - keep category if available, otherwise reset to ALL
  const handleBrandChange = (brand: Restaurant | 'all') => {
    const newAvailableCategories = getAvailableCategoriesForBrand(unifiedMenu, brand);
    onBrandChange(brand);
    // Only reset to ALL if current category isn't available for new brand
    if (!newAvailableCategories.includes(selectedCategory)) {
      onCategoryChange('ALL');
    }
    scrollToTop();
  };
  
  // Handle category change - scroll to top
  const handleCategoryChange = (category: UnifiedCategory) => {
    onCategoryChange(category);
    scrollToTop();
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
                    className="text-inherit hover:bg-white/20 border border-white/30 rounded-full px-3 py-1.5"
                    aria-label="Change language"
                  >
                    <Globe className="h-4 w-4 mr-1.5" />
                    <span className="font-medium">{language === 'en' ? 'EN' : 'TH'}</span>
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

          {/* Brand Filter - Compact Grid */}
          <nav className="w-full" aria-label="Restaurant filter">
            <div className="grid grid-cols-4 gap-2">
              {BRANDS.map((brand) => {
                const isSelected = selectedBrand === brand;
                const info = brand === 'all' ? null : getRestaurantInfo(brand);
                
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandChange(brand)}
                    className={cn(
                      'relative flex flex-col items-center justify-center gap-1 py-2 rounded-lg transition-all',
                      isSelected 
                        ? 'bg-white/15' 
                        : 'hover:bg-white/10'
                    )}
                  >
                    {/* Logo Circle - Fixed size */}
                    <div className={cn(
                      'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0',
                      brand === 'all' ? 'bg-white/20' : 'bg-white',
                      isSelected && 'ring-2 ring-white/60'
                    )}>
                      {info ? (
                        <img 
                          src={info.logo} 
                          alt={info.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    
                    {/* Brand Name */}
                    <span className={cn(
                      'text-[10px] sm:text-xs font-medium text-center leading-tight',
                      isSelected ? 'text-white' : 'text-white/70'
                    )}>
                      {brand === 'all' ? t('menu.all') : info?.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
      
      {/* Category Navigation Bar */}
      <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto px-4 py-3 scrollbar-hide snap-x snap-mandatory">
          {availableCategories.map((category) => {
            const isSelected = selectedCategory === category;
            const translationKey = CATEGORY_TRANSLATION_KEYS[category];
            const displayCategory = translationKey ? t(translationKey) : category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  'text-xs sm:text-sm md:text-base font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap pb-2 snap-start',
                  isSelected 
                    ? 'text-[#fd7304] border-[#fd7304]' 
                    : 'text-gray-400 border-transparent hover:text-gray-200'
                )}
                aria-current={isSelected ? 'true' : undefined}
              >
                {getCategoryEmoji(category)} {displayCategory}
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
