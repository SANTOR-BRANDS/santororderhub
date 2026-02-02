import { Dish, Restaurant } from '@/types/menu';
import { restoryMenu, nirvanaMenu, smoodyMenu, SMOODY_CATEGORIES } from '@/data/menuData';
import { getDishImage } from '@/lib/dishImages';

// Unified category mapping - maps original categories to unified types
const CATEGORY_MAPPING: Record<string, string> = {
  // Noodles
  'KOREAN SPICY NOODLES': 'NOODLES',
  'BRAISED MEAT + EGG NOODLES': 'NOODLES',
  'GRILLED MEAT + EGG NOODLES': 'NOODLES',
  'NOODLE SOUP': 'NOODLES',
  
  // Rice dishes
  'PAD KRAPAO': 'RICE',
  'JAPANESE CURRY': 'RICE',
  'DONBURI BOWLS': 'RICE',
  'QUICK DISH': 'RICE',
  'SOMETHING WITH EGG': 'RICE',
  'FRIED CHICKEN + RICE': 'RICE',
  'CHILLI AND FRIED GARLIC': 'RICE',
  'GRILLED MEAT + RICE': 'RICE',
  'BRAISED MEAT + RICE': 'RICE',
  'OTHER': 'RICE', // Stir-Fried Diced Chicken, Creamy Omelette etc
  
  // Fresh Seafood
  'FRESH SALMON': 'FRESH SEAFOOD',
  'FISH MENU': 'FRESH SEAFOOD',
  
  // Vegetarian
  'VEGETARIAN': 'VEGETARIAN',
  
  // Toppings
  'TOPPINGS': 'TOPPINGS',
  
  // Drinks
  'DRINKS': 'DRINKS',
  
  // Desserts
  'DESSERT': 'DESSERTS',
  
  // Combos - treat as featured
  'COMBO DEALS': 'COMBO DEALS',
};

// Subcategory tags for filtering within main categories
export const SUBCATEGORY_TAGS: Record<string, { tag: string; keywords: string[]; excludeKeywords?: string[] }[]> = {
  'ALL': [
    { tag: 'Mala', keywords: ['mala'] },
    { tag: 'Stir-Fried', keywords: ['fried rice', 'stir-fried', 'stir fried'], excludeKeywords: ['krapao', 'pad kra pao'] },
    { tag: 'Fried', keywords: ['karaage', 'katsu', 'tonkatsu', 'torikatsu', 'crunchy', 'crispy'], excludeKeywords: ['fried rice'] },
    { tag: 'Grilled', keywords: ['grilled', 'grill'] },
    { tag: 'Braised', keywords: ['braised'] },
    { tag: 'Curry', keywords: ['curry'] },
    { tag: 'Pad Krapao', keywords: ['krapao', 'pad kra pao'] },
    { tag: 'Korean', keywords: ['korean', 'mama'] },
    { tag: 'Egg', keywords: ['omelette', 'egg'], excludeKeywords: ['noodle', 'noodles'] },
    { tag: 'Salmon', keywords: ['salmon'] },
  ],
  'RICE': [
    { tag: 'Mala', keywords: ['mala'] },
    { tag: 'Stir-Fried', keywords: ['fried rice', 'stir-fried', 'stir fried'], excludeKeywords: ['krapao', 'pad kra pao'] },
    { tag: 'Fried', keywords: ['karaage', 'katsu', 'tonkatsu', 'torikatsu', 'crunchy', 'crispy'], excludeKeywords: ['fried rice'] },
    { tag: 'Grilled', keywords: ['grilled', 'grill'] },
    { tag: 'Curry', keywords: ['curry'] },
    { tag: 'Pad Krapao', keywords: ['krapao', 'pad kra pao'] },
    { tag: 'Donburi', keywords: ['don', 'donburi'] },
    { tag: 'Egg', keywords: ['omelette', 'egg'], excludeKeywords: ['noodle', 'noodles'] },
    { tag: 'Salmon', keywords: ['salmon'] },
  ],
  'NOODLES': [
    { tag: 'Mala', keywords: ['mala'] },
    { tag: 'Braised', keywords: ['braised'] },
    { tag: 'Grilled', keywords: ['grilled', 'grill'] },
    { tag: 'Korean', keywords: ['korean', 'mama'] },
    { tag: 'Soup', keywords: ['soup'] },
  ],
};

// Priority order: Restory > Nirvana > MHY
const RESTAURANT_PRIORITY: Restaurant[] = ['restory', 'nirvana', 'smoody'];

export const UNIFIED_CATEGORIES = [
  'ALL',
  'COMBO DEALS',
  'RICE',
  'NOODLES',
  'FRESH SEAFOOD',
  'VEGETARIAN',
  'TOPPINGS',
  'DRINKS',
  'DESSERTS',
] as const;

export type UnifiedCategory = typeof UNIFIED_CATEGORIES[number];

export interface UnifiedDish extends Dish {
  unifiedCategory: string;
  originalCategory: string;
}

/**
 * Get all menus combined with images applied
 */
const getAllMenusWithImages = (): Dish[] => {
  const allMenus = [
    ...restoryMenu,
    ...nirvanaMenu,
    ...smoodyMenu,
  ];
  
  return allMenus.map(dish => ({
    ...dish,
    image: getDishImage(dish.id) || dish.image,
  }));
};

// Items that should NOT be de-duplicated (different cooking styles per restaurant)
const KEEP_ALL_VARIANTS = [
  'Fried Egg',
  'Fried Duck Egg',
];

/**
 * De-duplicate items using Restory-Priority logic
 * Items with same ID (SAN- prefix) or same name are de-duplicated,
 * keeping only the Restory version if it exists.
 * Exception: Items in KEEP_ALL_VARIANTS are kept from all restaurants.
 */
export const getUnifiedMenu = (): UnifiedDish[] => {
  const allDishes = getAllMenusWithImages();
  const seenIds = new Set<string>();
  const seenNames = new Set<string>();
  const result: UnifiedDish[] = [];
  
  // Sort by priority so Restory items come first
  const sortedDishes = [...allDishes].sort((a, b) => {
    const priorityA = RESTAURANT_PRIORITY.indexOf(a.restaurant);
    const priorityB = RESTAURANT_PRIORITY.indexOf(b.restaurant);
    return priorityA - priorityB;
  });
  
  for (const dish of sortedDishes) {
    // Skip if we've already seen this ID (for SAN- shared items)
    if (seenIds.has(dish.id)) continue;
    
    // Check if this item should keep all variants
    const shouldKeepAllVariants = KEEP_ALL_VARIANTS.some(
      name => dish.name.toLowerCase().trim() === name.toLowerCase()
    );
    
    // Skip if we've already seen this exact name (unless it's a keep-all-variants item)
    const normalizedName = dish.name.toLowerCase().trim();
    if (!shouldKeepAllVariants && seenNames.has(normalizedName)) continue;
    
    // Mark as seen
    seenIds.add(dish.id);
    seenNames.add(normalizedName);
    
    // Map to unified category
    const unifiedCategory = CATEGORY_MAPPING[dish.category] || dish.category;
    
    result.push({
      ...dish,
      unifiedCategory,
      originalCategory: dish.category,
    });
  }
  
  return result;
};

/**
 * Filter unified menu by category and/or brand
 */
export const filterUnifiedMenu = (
  menu: UnifiedDish[],
  category: UnifiedCategory | 'ALL',
  brand: Restaurant | 'all' = 'all'
): UnifiedDish[] => {
  return menu.filter(dish => {
    const matchesCategory = category === 'ALL' || dish.unifiedCategory === category;
    const matchesBrand = brand === 'all' || dish.restaurant === brand;
    return matchesCategory && matchesBrand;
  });
};

/**
 * Get available categories for a specific brand
 * Returns only categories that have at least one dish for that brand
 */
export const getAvailableCategoriesForBrand = (
  menu: UnifiedDish[],
  brand: Restaurant | 'all'
): UnifiedCategory[] => {
  if (brand === 'all') {
    return [...UNIFIED_CATEGORIES];
  }
  
  const brandDishes = menu.filter(dish => dish.restaurant === brand);
  const availableCategories = new Set<string>();
  
  brandDishes.forEach(dish => {
    availableCategories.add(dish.unifiedCategory);
  });
  
  // Return categories in the original order, filtering to only available ones
  return UNIFIED_CATEGORIES.filter(
    cat => cat === 'ALL' || availableCategories.has(cat)
  );
};

/**
 * Search unified menu
 */
export const searchUnifiedMenu = (
  menu: UnifiedDish[],
  query: string
): UnifiedDish[] => {
  if (!query.trim()) return menu;
  
  const normalizedQuery = query.toLowerCase().trim();
  return menu.filter(dish => 
    dish.name.toLowerCase().includes(normalizedQuery) ||
    dish.category.toLowerCase().includes(normalizedQuery) ||
    dish.unifiedCategory.toLowerCase().includes(normalizedQuery) ||
    (dish.description?.toLowerCase().includes(normalizedQuery))
  );
};

/**
 * Get restaurant display info
 */
export const getRestaurantInfo = (restaurant: Restaurant) => {
  const info: Record<Restaurant, { name: string; logo: string; color: string }> = {
    restory: {
      name: 'Restory',
      logo: '/images/RS-LOGO-001.webp',
      color: '#fd7304',
    },
    nirvana: {
      name: 'Nirvana',
      logo: '/images/NV-LOGO-001.webp',
      color: '#ffd93d',
    },
    'smoody': {
      name: 'Smoody',
      logo: '/images/SM-LOGO-001.webp',
      color: '#66015c',
    },
  };
  return info[restaurant];
};
