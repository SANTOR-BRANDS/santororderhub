import { useMemo, useState } from 'react';
import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
import { Globe, MapPin, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAddress } from '@/contexts/AddressContext';
import { UNIFIED_CATEGORIES, UnifiedCategory, getRestaurantInfo, getUnifiedMenu, getAvailableCategoriesForBrand } from '@/lib/unifiedMenu';

// Map category names to translation keys
const CATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  'ALL': 'category.all',
  'COMBO DEALS': 'category.comboDeals',
  'SIGNATURE BOWLS': 'category.signatureBowls',
  'GREEK YO': 'category.greekYo',
  'RICE': 'category.rice',
  'NOODLES': 'category.noodles',
  'FRESH SEAFOOD': 'category.freshSeafood',
  'VEGETARIAN': 'category.vegetarian',
  'TOPPINGS': 'category.toppings',
  'DRINKS': 'category.drinks',
  'DESSERTS': 'category.desserts'
};

interface UnifiedHeaderProps {
  selectedCategory: UnifiedCategory;
  onCategoryChange: (category: UnifiedCategory) => void;
  selectedBrand: Restaurant | 'all';
  onBrandChange: (brand: Restaurant | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const BRANDS: (Restaurant | 'all')[] = ['all', 'restory', 'nirvana', 'smoody'];

const UnifiedHeader = ({
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  searchQuery,
  onSearchChange,
}: UnifiedHeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { address, openAddressModal } = useAddress();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // Get available categories based on selected brand
  const unifiedMenu = useMemo(() => getUnifiedMenu(), []);
  const availableCategories = useMemo(() => getAvailableCategoriesForBrand(unifiedMenu, selectedBrand), [unifiedMenu, selectedBrand]);

  // Fast scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
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

  // Get display text for address button
  const getAddressDisplay = () => {
    if (!address) return t('order.addressPlaceholder') || 'Set delivery address';
    // Truncate if too long
    return address.length > 30 ? address.substring(0, 30) + '...' : address;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f] text-santor-foreground">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Top Row: Address (left) + Language (right) */}
          <div className="flex items-center justify-between">
            {/* Address Button - Left */}
            <button
              onClick={openAddressModal}
              className="flex items-center gap-2 text-sm text-white/90 hover:text-white hover:bg-white/20 rounded-full px-3 py-1.5 transition-colors cursor-pointer"
              aria-label="Set delivery address"
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate max-w-[180px] sm:max-w-[220px]">
                {getAddressDisplay()}
              </span>
            </button>

            {/* Language Selector - Right */}
            <Popover open={isLanguageOpen} onOpenChange={setIsLanguageOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-auto text-sm text-inherit hover:bg-white/20 rounded-full px-3 py-1.5" 
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
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageOpen(false);
                    }}
                  >
                    English
                  </Button>
                  <Button 
                    variant={language === 'th' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    className="w-full justify-start" 
                    onClick={() => {
                      setLanguage('th');
                      setIsLanguageOpen(false);
                    }}
                  >
                    ไทย
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true" />
            <Input 
              placeholder={t('menu.searchPlaceholder') || 'Search dishes...'} 
              value={searchQuery} 
              onChange={e => onSearchChange(e.target.value)}
              aria-label={t('menu.searchPlaceholder') || 'Search dishes'} 
              className="pl-10 pr-10 bg-white/10 border-0 text-white placeholder:text-gray-400 rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="flex items-center justify-center w-full px-2">
            <div className="flex items-center justify-between w-full max-w-md gap-2">
              {BRANDS.map(brand => {
                const isSelected = selectedBrand === brand;
                const info = brand === 'all' ? null : getRestaurantInfo(brand);
                const displayName = brand === 'all' ? t('menu.all') : info?.name;
                const isNew = brand === 'smoody';
                return (
                  <button 
                    key={brand} 
                    onClick={() => handleBrandChange(brand)} 
                    className={cn(
                      'flex-1 flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl transition-all relative',
                      isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                    )}
                  >
                    {isNew && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full z-10">
                        NEW
                      </div>
                    )}
                    <div className={cn(
                      'w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center border border-transparent',
                      isSelected && 'border-[#fd7304]/80'
                    )}>
                      {info ? (
                        <img 
                          src={info.logo} 
                          alt={info.name} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { 
                            e.currentTarget.style.display = 'none'; 
                            e.currentTarget.parentElement!.innerHTML = `<span class="text-lg font-bold text-white">${info.name.charAt(0)}</span>`; 
                          }} 
                        />
                      ) : (
                        <span className="text-lg drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">✦</span>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-center leading-tight line-clamp-1">
                      {displayName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Navigation Bar */}
      <div className="bg-[#1a1a1a]/95 backdrop-blur-sm border-t border-gray-700">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto px-6 py-3 scrollbar-hide snap-x snap-mandatory mx-[12px]">
          {availableCategories.map(category => {
            const isSelected = selectedCategory === category;
            const translationKey = CATEGORY_TRANSLATION_KEYS[category];
            const displayCategory = translationKey ? t(translationKey) : category;
            return (
              <button 
                key={category} 
                onClick={() => handleCategoryChange(category)} 
                className={cn(
                  "sm:text-sm md:text-base font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap pb-2 snap-start text-sm",
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
    'ALL': '',
    'COMBO DEALS': '🔥',
    'SIGNATURE BOWLS': '✨',
    'GREEK YO': '🍨',
    'RICE': '🍚',
    'NOODLES': '🍜',
    'FRESH SEAFOOD': '🐟',
    'VEGETARIAN': '🌱',
    'TOPPINGS': '🥢',
    'DRINKS': '🧃',
    'DESSERTS': '🍨'
  };
  return emojis[category];
};

export default UnifiedHeader;
