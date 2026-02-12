import { useMemo, useState } from 'react';
import { Restaurant } from '@/types/menu';
import { cn } from '@/lib/utils';
import { Globe, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { UNIFIED_CATEGORIES, UnifiedCategory, getRestaurantInfo, getUnifiedMenu, getAvailableCategoriesForBrand } from '@/lib/unifiedMenu';

// Map category names to translation keys
const CATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  'ALL': 'categories.all',
  'COMBO DEALS': 'categories.comboDeals',
  'SIGNATURE BOWLS': 'categories.signatureBowls',
  'GREEK YO': 'categories.greekYo',
  'RICE': 'categories.rice',
  'NOODLES': 'categories.noodles',
  'FRESH SEAFOOD': 'categories.freshSeafood',
  'VEGETARIAN': 'categories.vegetarian',
  'TOPPINGS': 'categories.toppings',
  'DRINKS': 'categories.drinks',
  'DESSERTS': 'categories.desserts'
};


interface UnifiedHeaderProps {
  selectedCategory: UnifiedCategory;
  onCategoryChange: (category: UnifiedCategory) => void;
  selectedBrand: Restaurant | 'all';
  onBrandChange: (brand: Restaurant | 'all') => void;
}
const BRANDS: (Restaurant | 'all')[] = ['all', 'restory', 'nirvana', 'smoody'];
const UnifiedHeader = ({
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange
}: UnifiedHeaderProps) => {
  const {
    language,
    setLanguage,
    t
  } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [deliveryAddress] = useState(() => localStorage.getItem('santor-user-address') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

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
  return (
    <header className="sticky top-0 z-50 bg-gradient-santor text-santor-foreground">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3">
          {/* Top Row: Location/Delivery Address - Language */}
          <div className="flex items-center justify-between">
            {/* Location/Delivery Address */}
            <button
              onClick={() => {
                const newAddress = prompt(t('header.setAddressPrompt', 'Enter your delivery address:'), deliveryAddress || '');
                if (newAddress !== null && newAddress.trim()) {
                  localStorage.setItem('santor-user-address', newAddress);
                  // Force re-render
                  window.dispatchEvent(new Event('storage'));
                }
              }}
              className="flex items-center gap-2 text-sm hover:bg-white/10 px-2 py-1 rounded transition-colors"
              title={t('header.clickToSetAddress', 'Click to set delivery address')}
            >
              <MapPin className="h-4 w-4 text-white/70" />
              <span className="text-white/90 truncate max-w-[200px] sm:max-w-xs">
                {deliveryAddress || t('header.deliveryPlaceholder', 'Set delivery address')}
              </span>
            </button>

            {/* Language Selector - Pill Shape */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-1.5 text-sm hover:bg-white/10 px-3 py-1.5 rounded-full transition-colors border border-white/20"
                  aria-label="Change language"
                >
                  <Globe className="h-4 w-4" />
                  <span className="font-medium">{language === 'en' ? 'EN' : 'TH'}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-32 p-2" align="end">
                <div className="flex flex-col gap-1">
                  <Button variant={language === 'en' ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start" onClick={() => setLanguage('en')}>
                    English
                  </Button>
                  <Button variant={language === 'th' ? 'secondary' : 'ghost'} size="sm" className="w-full justify-start" onClick={() => setLanguage('th')}>
                    ไทย
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Restaurant Selection - Above Search */}
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-4 py-2">
              {BRANDS.filter(brand => brand !== 'all').map(brand => {
                const info = getRestaurantInfo(brand);
                const isSelected = selectedBrand === brand;
                const isNew = brand === 'smoody';
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandChange(brand)}
                    className={cn(
                      'w-8 h-8 rounded-full overflow-hidden flex items-center justify-center transition-all relative',
                      isSelected ? 'ring-2 ring-white/70 ring-offset-1 ring-offset-transparent' : 'hover:ring-1 hover:ring-white/40'
                    )}
                    title={info?.name || brand}
                  >
                    {isNew && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full animate-pulse z-10">
                        NEW
                      </div>
                    )}
                    {info ? (
                      <img 
                        src={info.logo} 
                        alt={info.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { 
                          e.currentTarget.style.display = 'none'; 
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-xs font-bold text-white">${info.name.charAt(0)}</span>`; 
                        }} 
                      />
                    ) : (
                      <span className="text-xs font-bold text-white">✦</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              type="text"
              placeholder={t('search.placeholder', 'Search dishes or restaurants...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-white/40"
            />
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
                isSelected ? 'text-[#fd7304] border-[#fd7304]' : 'text-gray-400 border-transparent hover:text-gray-200'
              )} 
              aria-current={isSelected ? 'true' : undefined}
            >
              {displayCategory}
            </button>
          );
        })}
          {/* Spacer to ensure last item has breathing room */}
          <div className="shrink-0 w-4" aria-hidden="true" />
        </div>
        </div>
        
        {/* Subcategories Row */}
        {availableCategories.includes('RICE') && (
          <div className="bg-orange-500 text-black px-6 py-2">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              <button className="whitespace-nowrap hover:underline font-medium">Egg</button>
              <button className="whitespace-nowrap hover:underline font-medium">Fried</button>
              <button className="whitespace-nowrap hover:underline font-medium">Steam</button>
              <button className="whitespace-nowrap hover:underline font-medium">Clear</button>
            </div>
          </div>
        )}
        {availableCategories.includes('NOODLES') && (
          <div className="bg-orange-500 text-black px-6 py-2">
            <div className="flex gap-4 overflow-x-auto scrollbar-hide">
              <button className="whitespace-nowrap hover:underline font-medium">Egg</button>
              <button className="whitespace-nowrap hover:underline font-medium">Soup</button>
              <button className="whitespace-nowrap hover:underline font-medium">Stir-Fried</button>
              <button className="whitespace-nowrap hover:underline font-medium">Clear</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default UnifiedHeader;