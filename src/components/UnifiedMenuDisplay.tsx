import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Restaurant, Dish } from '@/types/menu';
import DishCard from './DishCard';
import { X, Dices } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDebounce } from '@/hooks/useDebounce';
import { 
  getUnifiedMenu, 
  filterUnifiedMenu, 
  searchUnifiedMenu, 
  UnifiedCategory, 
  UnifiedDish,
  getRestaurantInfo,
  SUBCATEGORY_TAGS,
  UNIFIED_CATEGORIES
} from '@/lib/unifiedMenu';
import { SMOODY_COMING_SOON } from '@/data/smoodyData';

// Map subcategory tag names to translation keys
const SUBCATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  'Mala': 'subcategory.mala',
  'Stir-Fried': 'subcategory.stirFried',
  'Fried': 'subcategory.fried',
  'Grilled': 'subcategory.grilled',
  'Braised': 'subcategory.braised',
  'Curry': 'subcategory.curry',
  'Pad Krapao': 'subcategory.padKrapao',
  'Korean': 'subcategory.korean',
  'Egg': 'subcategory.egg',
  'Salmon': 'subcategory.salmon',
  'Donburi': 'subcategory.donburi',
  'Soup': 'subcategory.soup',
};

// Map category names to translation keys
const CATEGORY_TRANSLATION_KEYS: Record<string, string> = {
  'ALL': 'category.all',
  'COMBO DEALS': 'category.comboDeals',
  'RICE': 'category.rice',
  'NOODLES': 'category.noodles',
  'FRESH SEAFOOD': 'category.freshSeafood',
  'VEGETARIAN': 'category.vegetarian',
  'TOPPINGS': 'category.toppings',
  'SIGNATURE BOWLS': 'category.signatureBowls',
  'GREEK YO': 'category.greekYo',
  'DRINKS': 'category.drinks',
  'DESSERTS': 'category.desserts',
};

interface UnifiedMenuDisplayProps {
  selectedCategory: UnifiedCategory;
  selectedBrand: Restaurant | 'all';
  onDishSelect: (dish: Dish, sourceRect?: { x: number; y: number; width: number; height: number }) => void;
  searchQuery: string;
  dishQuantityMap: Record<string, number>;
}

const UnifiedMenuDisplay = ({
  selectedCategory,
  selectedBrand,
  onDishSelect,
  searchQuery,
  dishQuantityMap,
}: UnifiedMenuDisplayProps) => {
  const { t } = useLanguage();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const surpriseButtonRef = useRef<HTMLButtonElement>(null);
  const [isSurprisePressed, setIsSurprisePressed] = useState(false);
  
  // Get the unified, de-duplicated menu
  const unifiedMenu = useMemo(() => getUnifiedMenu(), []);
  
  // Apply filters
  const filteredByCategory = useMemo(() => 
    filterUnifiedMenu(unifiedMenu, selectedCategory, selectedBrand),
    [unifiedMenu, selectedCategory, selectedBrand]
  );
  
  // Apply search (uses debounced query to prevent re-renders on every keystroke)
  const searchedDishes = useMemo(() => 
    searchUnifiedMenu(filteredByCategory, debouncedSearchQuery),
    [filteredByCategory, debouncedSearchQuery]
  );
  
  // Get available subcategory tags for current category with counts
  const subcategoryTagsWithCounts = useMemo(() => {
    const categoryKey = selectedCategory as string;
    const tags = SUBCATEGORY_TAGS[categoryKey];
    if (!tags) return [];
    
    return tags.map(tagInfo => {
      const count = searchedDishes.filter(dish => {
        const nameLC = dish.name.toLowerCase();
        const categoryLC = dish.originalCategory.toLowerCase();
        
        // Check if any keyword matches
        const matchesKeyword = tagInfo.keywords.some(kw => 
          nameLC.includes(kw.toLowerCase()) ||
          categoryLC.includes(kw.toLowerCase())
        );
        
        // Check if any exclude keyword matches
        const matchesExclude = tagInfo.excludeKeywords?.some(kw => 
          nameLC.includes(kw.toLowerCase()) ||
          categoryLC.includes(kw.toLowerCase())
        ) ?? false;
        
        return matchesKeyword && !matchesExclude;
      }).length;
      return { ...tagInfo, count };
    }).filter(t => t.count > 0).sort((a, b) => b.count - a.count);
  }, [searchedDishes, selectedCategory]);
  
  // Apply subcategory filter
  const finalDishes = useMemo(() => {
    if (!selectedSubcategory) return searchedDishes;
    
    const tagInfo = subcategoryTagsWithCounts.find(t => t.tag === selectedSubcategory);
    if (!tagInfo) return searchedDishes;
    
    return searchedDishes.filter(dish => {
      const nameLC = dish.name.toLowerCase();
      const categoryLC = dish.originalCategory.toLowerCase();
      
      const matchesKeyword = tagInfo.keywords.some(kw => 
        nameLC.includes(kw.toLowerCase()) ||
        categoryLC.includes(kw.toLowerCase())
      );
      
      const matchesExclude = tagInfo.excludeKeywords?.some(kw => 
        nameLC.includes(kw.toLowerCase()) ||
        categoryLC.includes(kw.toLowerCase())
      ) ?? false;
      
      return matchesKeyword && !matchesExclude;
    });
  }, [searchedDishes, selectedSubcategory, subcategoryTagsWithCounts]);
  
  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubcategory(null);
  }, [selectedCategory]);
  
  // Get dishes eligible for "Surprise Me" (exclude toppings, respect brand filter)
  const surpriseMeDishes = useMemo(() => {
    return unifiedMenu.filter(d => {
      if (d.unifiedCategory === 'TOPPINGS') return false;
      if (selectedBrand !== 'all' && d.restaurant !== selectedBrand) return false;
      return true;
    });
  }, [unifiedMenu, selectedBrand]);
  
  const handleSurpriseMe = useCallback(() => {
    if (surpriseMeDishes.length > 0) {
      const randomIndex = Math.floor(Math.random() * surpriseMeDishes.length);
      const rect = surpriseButtonRef.current?.getBoundingClientRect();
      onDishSelect(
        surpriseMeDishes[randomIndex],
        rect
          ? {
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height,
            }
          : undefined
      );
    }
  }, [surpriseMeDishes, onDishSelect]);
  
  // Group dishes by category for display (maintaining UNIFIED_CATEGORIES order)
  const groupedDishes = useMemo(() => {
    if (selectedCategory !== 'ALL') return null;
    
    const groups: Record<string, UnifiedDish[]> = {};
    finalDishes.forEach(dish => {
      if (!groups[dish.unifiedCategory]) {
        groups[dish.unifiedCategory] = [];
      }
      groups[dish.unifiedCategory].push(dish);
    });
    
    // Sort by UNIFIED_CATEGORIES order (excluding 'ALL')
    const orderedCategories = UNIFIED_CATEGORIES.filter(cat => cat !== 'ALL');
    const sortedEntries: [string, UnifiedDish[]][] = [];
    
    orderedCategories.forEach(category => {
      if (groups[category] && groups[category].length > 0) {
        sortedEntries.push([category, groups[category]]);
      }
    });
    
    return sortedEntries;
  }, [finalDishes, selectedCategory]);
  
  // Calculate pill size based on count (word-cloud style)
  const getTagSize = (count: number, maxCount: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.7) return 'text-base px-4 py-2';
    if (ratio > 0.4) return 'text-sm px-3 py-1.5';
    return 'text-xs px-2.5 py-1';
  };
  
  const maxTagCount = Math.max(...subcategoryTagsWithCounts.map(t => t.count), 1);
  
  // Smoody menu items are now integrated into the unified menu flow
  
  return (
    <div className="min-h-screen pb-24 bg-[#0F0F12] text-white touch-pan-y">
      <div className="container mx-auto px-4 py-4">
        {/* Surprise Me Button */}
        {!searchQuery && selectedCategory === 'ALL' && surpriseMeDishes.length > 0 && (
          <button 
            ref={surpriseButtonRef}
            onClick={handleSurpriseMe}
            onPointerDown={() => setIsSurprisePressed(true)}
            onPointerUp={() => setIsSurprisePressed(false)}
            onPointerCancel={() => setIsSurprisePressed(false)}
            onPointerLeave={() => setIsSurprisePressed(false)}
            className={cn('w-full rounded-lg mb-4 px-4 py-3 text-center cursor-pointer bg-gradient-to-r from-[#8B1538] to-[#fd7304] text-white flex items-center justify-center gap-3 transition-[transform,box-shadow,filter] duration-[80ms] ease-out md:hover:scale-[1.01]', isSurprisePressed && 'scale-[0.97] brightness-[0.98] shadow-sm')}
            aria-label={t('menu.surpriseMe')}
          >
            <Dices className="h-5 w-5" />
            <span className="font-bold text-sm md:text-base">{t('menu.surpriseMe')}</span>
            <span className="text-xs opacity-80 hidden sm:inline">{t('menu.surpriseMeSubtitle')}</span>
          </button>
        )}

        {/* Subcategory Filter Pills - Word Cloud Style */}
        {subcategoryTagsWithCounts.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {selectedSubcategory && (
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 transition-all"
                >
                  <X className="h-3 w-3" />
                  {t('subcategory.clear')}
                </button>
              )}
              {subcategoryTagsWithCounts.map(({ tag, count }) => {
                const isSelected = selectedSubcategory === tag;
                const translationKey = SUBCATEGORY_TRANSLATION_KEYS[tag];
                const displayTag = translationKey ? t(translationKey) : tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedSubcategory(isSelected ? null : tag)}
                    className={cn(
                      'rounded-full font-medium transition-all',
                      getTagSize(count, maxTagCount),
                      isSelected
                        ? 'bg-[#fd7304] text-white shadow-lg scale-105'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    )}
                  >
                    {displayTag}
                    <span className="ml-1.5 opacity-60">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Dishes Display */}
        {finalDishes.length > 0 ? (
          selectedCategory === 'ALL' && groupedDishes ? (
            // Grouped view when showing ALL - ordered by UNIFIED_CATEGORIES
            <div className="space-y-8">
              {groupedDishes.map(([category, dishes]) => {
                const translationKey = CATEGORY_TRANSLATION_KEYS[category];
                const displayCategory = translationKey ? t(translationKey) : category;
                return (
                  <section key={category}>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#fd7304]">
                      {displayCategory}
                      <span className="text-sm font-normal text-gray-400">({dishes.length})</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {dishes.map(dish => (
                        <DishCard key={dish.id} dish={dish} onClick={onDishSelect} inBasketCount={dishQuantityMap[dish.id] || 0} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          ) : (
            // Flat grid when filtering by category
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" aria-label="Menu dishes">
              {finalDishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onClick={onDishSelect} inBasketCount={dishQuantityMap[dish.id] || 0} />
              ))}
            </section>
          )
        ) : (
          <section className="text-center py-12">
            <div className="text-6xl mb-4" role="img" aria-label="Search icon">🔍</div>
            <h2 className="text-xl font-semibold mb-2">{t('menu.noDishes')}</h2>
            <p className="text-gray-400">
              {t('menu.adjustFilters')}
            </p>
          </section>
        )}
        
        {/* Results count */}
        {finalDishes.length > 0 && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            {t('menu.showingDishes').replace('{count}', finalDishes.length.toString())}
            {selectedBrand !== 'all' && ` ${t('menu.fromRestaurant').replace('{restaurant}', getRestaurantInfo(selectedBrand).name)}`}
          </div>
        )}

        {/* Coming Soon categories for Smoody */}
        {selectedBrand === 'smoody' && (
          <div className="mt-8 text-center py-8 bg-white/5 rounded-xl border border-smoody-accent/20">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-lg font-bold mb-2 text-white">More Coming Soon!</h3>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {SMOODY_COMING_SOON.map(cat => (
                <span key={cat} className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-full text-sm font-medium">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedMenuDisplay;
