import { Dish, Restaurant } from '@/types/menu';
import { restoryMenu, nirvanaMenu, mejaiMenu } from '@/data/menuData';
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
  
  // Yum/Salads & Fresh
  'FRESH SALMON': 'YUM & FRESH',
  'VEGETARIAN': 'YUM & FRESH',
  'FISH MENU': 'YUM & FRESH',
  
  // Sides/Toppings
  'TOPPINGS': 'SIDES',
  'OTHER': 'SIDES',
  
  // Drinks
  'DRINKS': 'DRINKS',
  
  // Desserts
  'DESSERT': 'DESSERTS',
  
  // Combos - treat as featured
  'COMBO DEALS': 'COMBO DEALS',
};

// Priority order: Restory > Nirvana > MHY
const RESTAURANT_PRIORITY: Restaurant[] = ['restory', 'nirvana', 'mejai hai yum'];

export const UNIFIED_CATEGORIES = [
  'ALL',
  'COMBO DEALS',
  'RICE',
  'NOODLES',
  'YUM & FRESH',
  'SIDES',
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
    ...mejaiMenu,
  ];
  
  return allMenus.map(dish => ({
    ...dish,
    image: getDishImage(dish.id) || dish.image,
  }));
};

/**
 * De-duplicate items using Restory-Priority logic
 * Items with same ID (SAN- prefix) or same name are de-duplicated,
 * keeping only the Restory version if it exists
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
    
    // Skip if we've already seen this exact name (for differently-IDed duplicates)
    const normalizedName = dish.name.toLowerCase().trim();
    if (seenNames.has(normalizedName)) continue;
    
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
    'mejai hai yum': {
      name: 'Mejai Hai Yum',
      logo: '/images/MHY-LOGO-001.webp',
      color: '#fec428',
    },
  };
  return info[restaurant];
};
