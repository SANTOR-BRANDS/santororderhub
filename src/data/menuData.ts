import { Dish, AddOn, Restaurant } from '@/types/menu';

export const restoryMenu: Dish[] = [
  // COMBO DEALS
  { id: 'r1', name: 'Pad Krapao Minced Pork + Coke', price: 116, category: 'COMBO DEALS', restaurant: 'restory', spicyRequired: true },
  { id: 'r2', name: '2x Pad Krapao Minced Pork (Special)', price: 199, category: 'COMBO DEALS', restaurant: 'restory', spicyRequired: true },

  // PAD KRAPAO
  { id: 'r3', name: 'Pad Krapao Minced Pork', price: 99, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r4', name: 'Pad Krapao Minced Pork + Vermicelli', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r5', name: 'Pad Krapao Minced Pork + Chinese Sausage', price: 119, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r6', name: 'Pad Krapao Minced Pork + Century Egg', price: 119, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r7', name: 'Pad Krapao Minced Pork + Chicken Sausage', price: 119, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r8', name: 'Pad Krapao Bacon', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r9', name: 'Pad Krapao Pork Neck Pieces', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r10', name: 'Pad Krapao Pork Belly Pieces', price: 119, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r11', name: 'Pad Krapao Sliced Pork Belly', price: 129, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r12', name: 'Pad Krapao Minced Beef', price: 139, category: 'PAD KRAPAO', restaurant: 'restory', description: 'Option: Switch to Premium Australian Beef', spicyRequired: true },
  { id: 'r13', name: 'Pad Krapao Diced Beef', price: 149, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r14', name: 'Pad Krapao Chicken', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r15', name: 'Pad Krapao Chicken with Skin', price: 99, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r16', name: 'Pad Krapao Chicken Sausage', price: 99, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r17', name: 'Pad Krapao Chinese Sausage', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },

  // JAPANESE CURRY
  { id: 'r18', name: 'Australian Beef Curry', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r19', name: 'Pork Curry + Creamy Omelette', price: 129, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r20', name: 'Chicken Katsu Curry (Torikatsu)', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r21', name: '🔥 Pork Katsu Curry (Tonkatsu) 🔥', price: 149, category: 'JAPANESE CURRY', restaurant: 'restory', isSpecial: true },
  { id: 'r22', name: 'Chicken Karaage Curry', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r23', name: 'Fried Chicken Thigh Curry', price: 149, category: 'JAPANESE CURRY', restaurant: 'restory' },

  // DONBURI BOWLS
  { id: 'r24', name: '⭐ Tonkatsu Don ⭐', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },
  { id: 'r25', name: 'Chicken Karaage Don', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory' },
  { id: 'r26', name: 'Chicken Thigh Don', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory' },
  { id: 'r27', name: '⭐ Torikatsu Don ⭐', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },

  // INT MENU
  { id: 'r28', name: 'Fried Pork with Katsu Sauce', price: 139, category: 'INT MENU', restaurant: 'restory' },
  { id: 'r29', name: 'Chicken Teriyaki on Rice', price: 99, category: 'INT MENU', restaurant: 'restory' },
  { id: 'r30', name: 'Pork Teriyaki on Rice', price: 129, category: 'INT MENU', restaurant: 'restory' },

  // CHILLI AND FRIED GARLIC
  { id: 'r31', name: '⭐ Stir-Fried Pork Belly with Chilli and Fried Garlic ⭐', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', isSpecial: true, spicyRequired: true },
  { id: 'r32', name: 'Stir-Fried Pork Neck with Chilli and Fried Garlic', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
  { id: 'r33', name: 'Stir-Fried Bacon with Chilli and Fried Garlic', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
  { id: 'r34', name: 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg', price: 109, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
];

export const nirvanaMenu: Dish[] = [
  // PAD KRAPAO
  { id: 'n1', name: 'Pad Krapao Minced Beef', price: 99, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n2', name: 'Pad Krapao Minced Pork', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n3', name: 'Pad Krapao Minced Chicken', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true },
  { id: 'n4', name: 'Pad Krapao Diced Chicken', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true },

  // GRILLED MEAT + RICE
  { id: 'n5', name: '⭐ Grilled Beef on Rice ⭐', price: 119, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },
  { id: 'n6', name: 'Mala Grilled Beef on Rice', price: 129, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n7', name: 'Grilled Beef with Spring Onion on Rice', price: 129, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n8', name: 'Grilled Chicken Thigh on Rice', price: 89, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n9', name: 'Mala Grilled Chicken Thigh on Rice', price: 99, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n10', name: 'Grilled Pork Belly on Rice', price: 115, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n11', name: 'Mala Grilled Pork Belly on Rice', price: 125, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },

  // BRAISED MEAT + RICE
  { id: 'n12', name: 'Braised Beef on Rice', price: 129, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n13', name: '⭐ Braised Pork Belly on Rice ⭐', price: 149, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },
  { id: 'n14', name: 'Braised Chicken Wing on Rice 👍', price: 95, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },

  // VEGETARIAN
  { id: 'n15', name: 'Grilled Mushroom with Soy Sauce on Rice', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'n16', name: 'Mala Grilled Mushroom with Soy Sauce on Rice', price: 79, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'n17', name: 'Stir-Fried Mushroom with Soy Sauce', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },

  // OTHERS
  { id: 'n18', name: 'Creamy Omelette on Rice', price: 70, category: 'OTHERS', restaurant: 'nirvana' },
  { id: 'n19', name: 'Mala Beef Rice Noodle Soup', price: 169, category: 'OTHERS', restaurant: 'nirvana' },
  { id: 'n20', name: 'Beef Rice Noodle Soup', price: 159, category: 'OTHERS', restaurant: 'nirvana' },
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
