import { Dish, AddOn, Restaurant } from '@/types/menu';

export const restoryMenu: Dish[] = [
  // SIGNATURE PREMIUM (Anchoring Effect - Show highest value first)
  { id: 'r21', name: '🔥 Pork Katsu Curry (Tonkatsu) 🔥', price: 149, category: 'SIGNATURE PREMIUM', restaurant: 'restory', isSpecial: true },
  { id: 'r23', name: 'Fried Chicken Thigh Curry', price: 149, category: 'SIGNATURE PREMIUM', restaurant: 'restory' },
  { id: 'r13', name: 'Pad Krapao Diced Beef', price: 149, category: 'SIGNATURE PREMIUM', restaurant: 'restory', spicyRequired: true },

  // CHEF'S SPECIALS (High-margin items positioned prominently)
  { id: 'r24', name: '⭐ Tonkatsu Don ⭐', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory', isSpecial: true },
  { id: 'r12', name: 'Pad Krapao Minced Beef', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory', description: 'Option: Switch to Premium Australian Beef', spicyRequired: true },
  { id: 'r18', name: 'Australian Beef Curry', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },
  { id: 'r20', name: 'Chicken Katsu Curry (Torikatsu)', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },
  { id: 'r22', name: 'Chicken Karaage Curry', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },
  { id: 'r25', name: 'Chicken Karaage Don', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },
  { id: 'r26', name: 'Chicken Thigh Don', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },
  { id: 'r27', name: '⭐ Torikatsu Don ⭐', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory', isSpecial: true },
  { id: 'r28', name: 'Fried Pork with Katsu Sauce', price: 139, category: "CHEF'S SPECIALS", restaurant: 'restory' },

  // COMFORT CLASSICS (Mid-range, high-volume items)
  { id: 'r11', name: 'Pad Krapao Sliced Pork Belly', price: 129, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },
  { id: 'r19', name: 'Pork Curry + Creamy Omelette', price: 129, category: 'COMFORT CLASSICS', restaurant: 'restory' },
  { id: 'r30', name: 'Pork Teriyaki', price: 129, category: 'COMFORT CLASSICS', restaurant: 'restory' },
  { id: 'r5', name: 'Pad Krapao Minced Pork + Chinese Sausage', price: 119, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },
  { id: 'r6', name: 'Pad Krapao Minced Pork + Century Egg', price: 119, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },
  { id: 'r7', name: 'Pad Krapao Minced Pork + Chicken Sausage', price: 119, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },
  { id: 'r10', name: 'Pad Krapao Pork Belly Pieces', price: 119, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },
  { id: 'r2', name: '2x Pad Krapao Minced Pork (Special)', price: 199, category: 'COMFORT CLASSICS', restaurant: 'restory', spicyRequired: true },

  // CROWD FAVORITES (Popular, profitable mid-tier items)
  { id: 'r1', name: 'Pad Krapao Minced Pork + Coke', price: 116, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r14', name: 'Pad Krapao Chicken', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r4', name: 'Pad Krapao Minced Pork + Vermicelli', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r8', name: 'Pad Krapao Bacon', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r9', name: 'Pad Krapao Pork Neck Pieces', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r17', name: 'Pad Krapao Chinese Sausage', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },
  { id: 'r34', name: 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg', price: 109, category: 'CROWD FAVORITES', restaurant: 'restory', spicyRequired: true },

  // EVERYDAY VALUE (Strategic value positioning after premium items)
  { id: 'r31', name: '⭐ Stir-Fried Pork Belly with Chilli and Fried Garlic ⭐', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', isSpecial: true, spicyRequired: true },
  { id: 'r3', name: 'Pad Krapao Minced Pork', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', spicyRequired: true },
  { id: 'r15', name: 'Pad Krapao Chicken with Skin', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', spicyRequired: true },
  { id: 'r16', name: 'Pad Krapao Chicken Sausage', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', spicyRequired: true },
  { id: 'r29', name: 'Chicken Teriyaki', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory' },
  { id: 'r32', name: 'Stir-Fried Pork Neck with Chilli and Fried Garlic', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', spicyRequired: true },
  { id: 'r33', name: 'Stir-Fried Bacon with Chilli and Fried Garlic', price: 99, category: 'EVERYDAY VALUE', restaurant: 'restory', spicyRequired: true },
];

export const nirvanaMenu: Dish[] = [
  // PREMIUM SPECIALTIES (Anchoring effect with highest-priced signature items)
  { id: 'n19', name: 'Mala Beef Rice Noodle Soup', price: 169, category: 'PREMIUM SPECIALTIES', restaurant: 'nirvana' },
  { id: 'n20', name: 'Beef Rice Noodle Soup', price: 159, category: 'PREMIUM SPECIALTIES', restaurant: 'nirvana' },
  { id: 'n13', name: '⭐ Braised Pork Belly ⭐', price: 149, category: 'PREMIUM SPECIALTIES', restaurant: 'nirvana', isSpecial: true },

  // SIGNATURE GRILLED (Feature profitable grilled items prominently)
  { id: 'n6', name: 'Mala Grilled Beef', price: 129, category: 'SIGNATURE GRILLED', restaurant: 'nirvana' },
  { id: 'n7', name: 'Grilled Beef with Spring Onion', price: 129, category: 'SIGNATURE GRILLED', restaurant: 'nirvana' },
  { id: 'n12', name: 'Braised Beef', price: 129, category: 'SIGNATURE GRILLED', restaurant: 'nirvana' },
  { id: 'n11', name: 'Mala Grilled Pork Belly', price: 125, category: 'SIGNATURE GRILLED', restaurant: 'nirvana' },
  { id: 'n5', name: '⭐ Grilled Beef ⭐', price: 119, category: 'SIGNATURE GRILLED', restaurant: 'nirvana', isSpecial: true },
  { id: 'n10', name: 'Grilled Pork Belly', price: 115, category: 'SIGNATURE GRILLED', restaurant: 'nirvana' },

  // CROWD PLEASERS (Mid-range, high-volume items)
  { id: 'n1', name: 'Pad Krapao Minced Beef', price: 99, category: 'CROWD PLEASERS', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n9', name: 'Mala Grilled Chicken Thigh', price: 99, category: 'CROWD PLEASERS', restaurant: 'nirvana' },
  { id: 'n14', name: 'Braised Chicken Wing 👍', price: 95, category: 'CROWD PLEASERS', restaurant: 'nirvana', isSpecial: true },

  // EVERYDAY FAVORITES (Popular, accessible pricing)
  { id: 'n2', name: 'Pad Krapao Minced Pork', price: 89, category: 'EVERYDAY FAVORITES', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n3', name: 'Pad Krapao Minced Chicken', price: 89, category: 'EVERYDAY FAVORITES', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n4', name: 'Pad Krapao Diced Chicken', price: 89, category: 'EVERYDAY FAVORITES', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n8', name: 'Grilled Chicken Thigh', price: 89, category: 'EVERYDAY FAVORITES', restaurant: 'nirvana' },

  // LIGHT & HEALTHY (Positioned as value options after showcasing premium items)
  { id: 'n16', name: 'Mala Grilled Mushroom with Soy Sauce', price: 79, category: 'LIGHT & HEALTHY', restaurant: 'nirvana' },
  { id: 'n18', name: 'Creamy Omelette', price: 70, category: 'LIGHT & HEALTHY', restaurant: 'nirvana' },
  { id: 'n15', name: 'Grilled Mushroom with Soy Sauce', price: 69, category: 'LIGHT & HEALTHY', restaurant: 'nirvana' },
  { id: 'n17', name: 'Stir-Fried Mushroom with Soy Sauce', price: 69, category: 'LIGHT & HEALTHY', restaurant: 'nirvana' },
];

export const addOns: AddOn[] = [
  // Extra Meat
  { id: 'extra-chicken', name: 'Extra Chicken 150g', price: 60, category: 'meat' },
  { id: 'extra-pork', name: 'Extra Pork 100g', price: 60, category: 'meat' },
  { id: 'extra-beef', name: 'Extra Beef 100g', price: 80, category: 'meat' },
  { id: 'extra-rice', name: 'Extra Jasmine Rice 200g', price: 20, category: 'other' },

  // Add-ons
  { id: 'pickled-egg', name: 'Pickled Egg Yolk ⭐', price: 20, category: 'other' },
  { id: 'salted-egg', name: 'Salted Duck Egg', price: 30, category: 'other' },
  { id: 'century-egg', name: 'Century Egg', price: 30, category: 'other' },
  { id: 'fish-roe', name: 'Fish Roe', price: 45, category: 'other' },
  { id: 'fried-chicken-sweet', name: 'Fried Chicken Thighs + Sweet Chilli Fish Sauce', price: 50, category: 'other' },
  { id: 'fried-chicken', name: 'Fried Chicken Thighs', price: 45, category: 'other' },
  { id: 'crispy-chicken', name: 'Crispy Fried Chicken', price: 50, category: 'other' },
  { id: 'crispy-chicken-katsu', name: 'Crispy Fried Chicken + Katsu Sauce ⭐', price: 60, category: 'other' },
  { id: 'karaage-balls', name: 'Fried Chicken Karaage Balls ⭐', price: 50, category: 'other' },
  { id: 'crispy-bacon', name: 'Crispy Bacon', price: 30, category: 'other' },
  { id: 'chinese-sausage', name: 'Chinese Sausage', price: 25, category: 'other' },
  { id: 'smoked-sausage', name: 'Smoked Sausage', price: 25, category: 'other' },
  { id: 'cheese-sausage', name: 'Cheese Sausage', price: 25, category: 'other' },
  { id: 'dashi-soup', name: 'Dashi Soup', price: 15, category: 'other' },

  // Thai Style Omelette 🍳
  { id: 'thai-omelette-1', name: 'Thai Style Omelette (1 Egg)', price: 20, category: 'thai-omelette' },
  { id: 'thai-omelette-2', name: 'Thai Style Omelettes (2 Eggs)', price: 35, category: 'thai-omelette' },
  { id: 'thai-omelette-chilli', name: 'Thai Style Omelette with Chilli', price: 30, category: 'thai-omelette' },
  { id: 'thai-omelette-pork', name: 'Thai Style Omelette with Minced Pork', price: 45, category: 'thai-omelette' },

  // Creamy Omelette 🍳
  { id: 'creamy-omelette-1', name: 'Creamy Omelette (1 Egg)', price: 20, category: 'creamy-omelette' },
  { id: 'creamy-omelette-2', name: 'Creamy Omelettes (2 Eggs)', price: 30, category: 'creamy-omelette' },
  { id: 'creamy-omelette-shrimp', name: 'Creamy Omelette with Shrimp Fat', price: 30, category: 'creamy-omelette' },
  { id: 'creamy-omelette-shrimp-roe', name: 'Creamy Omelette with Shrimp Fat + Fish Roe', price: 45, category: 'creamy-omelette' },

  // Soft Omelette 🍳
  { id: 'soft-omelette-1', name: 'Soft Omelette (1 Egg)', price: 20, category: 'soft-omelette' },
  { id: 'soft-omelette-2', name: 'Soft Omelette (2 Eggs)', price: 30, category: 'soft-omelette' },
  { id: 'soft-omelette-shrimp', name: 'Soft Omelette with Shrimp Fat', price: 30, category: 'soft-omelette' },
  { id: 'soft-omelette-shrimp-roe', name: 'Soft Omelette with Shrimp Fat + Fish Roe', price: 45, category: 'soft-omelette' },
];

export const getMenuByRestaurant = (restaurant: Restaurant): Dish[] => {
  return restaurant === 'restory' ? restoryMenu : nirvanaMenu;
};

export const getCategoriesByRestaurant = (restaurant: Restaurant): string[] => {
  const menu = getMenuByRestaurant(restaurant);
  const categories = [...new Set(menu.map(dish => dish.category))];
  return ['ALL', ...categories];
};
