import { Dish, AddOn, Restaurant } from '@/types/menu';

export const restoryMenu: Dish[] = [
  // COMBO DEALS
  { 
    id: 'r1', 
    name: 'Pad Krapao Minced Pork + Coke', 
    price: 116, 
    category: 'COMBO DEALS', 
    restaurant: 'restory', 
    spicyRequired: true 
  },
  { 
    id: 'r2', 
    name: '2x Pad Krapao Minced Pork (Special)', 
    price: 199, 
    category: 'COMBO DEALS', 
    restaurant: 'restory', 
    spicyRequired: true,
    isComboFor2: true
  },

  // PAD KRAPAO
  { 
    id: 'r3', 
    name: 'Pad Krapao Minced Pork', 
    price: 99, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    consolidatedVariants: [
      { id: 'vermicelli', name: 'Vermicelli', priceModifier: 10 },
      { id: 'chinese-sausage', name: 'Chinese Sausage', priceModifier: 20 },
      { id: 'century-egg', name: 'Century Egg', priceModifier: 20 },
      { id: 'chicken-sausage', name: 'Chicken Sausage', priceModifier: 20 }
    ]
  },
  { id: 'r4', name: 'Pad Krapao Bacon', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r5', name: 'Pad Krapao Pork', price: 129, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r6', name: 'Sliced Pork Belly (juicy and soft)', price: 129, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r7', name: 'Sliced Pork Neck (meaty and tender)', price: 129, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r8', name: 'Pork Belly Pieces (chunky and soft)', price: 119, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { 
    id: 'r9', 
    name: 'Pad Krapao Minced Premium Beef', 
    price: 149, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    isPremiumBeef: true,
    hasBeefSwitchOption: true,
    description: 'Option: Switch to Normal Beef -฿50'
  },
  { 
    id: 'r10', 
    name: '✨Diced Wagyu Beef Pad Krapao ✨ (Grade A3)', 
    price: 159, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    isPremiumBeef: true,
    isSpecial: true
  },
  { id: 'r11', name: 'Pad Krapao Chicken Breast', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r12', name: 'Pad Krapao Chicken', price: 99, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r13', name: 'Pad Krapao Chicken Sausage', price: 99, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },
  { id: 'r14', name: 'Pad Krapao Chinese Sausage', price: 109, category: 'PAD KRAPAO', restaurant: 'restory', spicyRequired: true },

  // JAPANESE CURRY
  { id: 'r15', name: 'Australian Beef Curry', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r16', name: 'Pork Curry + Creamy Omelette', price: 129, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r17', name: 'Chicken Katsu Curry (Torikatsu)', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r18', name: '🔥 Pork Katsu Curry (Tonkatsu) 🔥', price: 149, category: 'JAPANESE CURRY', restaurant: 'restory', isSpecial: true },
  { id: 'r19', name: 'Chicken Karaage Curry', price: 139, category: 'JAPANESE CURRY', restaurant: 'restory' },
  { id: 'r20', name: 'Fried Chicken Thigh Curry', price: 149, category: 'JAPANESE CURRY', restaurant: 'restory' },

  // DONBURI BOWLS
  { id: 'r21', name: '⭐ Tonkatsu Don ⭐', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },
  { id: 'r22', name: '⭐ Torikatsu Don ⭐', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },
  { id: 'r23', name: 'Chicken Karaage Don', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory' },
  { id: 'r24', name: 'Chicken Thigh Don', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory' },
  { id: 'r25', name: '👍Tonkatsu with Katsu Sauce', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },
  { id: 'r26', name: '👍Torikatsu with Katsu Sauce', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory', isSpecial: true },
  { 
    id: 'r27', 
    name: 'Sliced Pork Teriyaki', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    consolidatedVariants: [
      { id: 'pork-neck', name: 'Sliced Pork Neck', priceModifier: 0 },
      { id: 'pork-belly', name: 'Sliced Pork Belly', priceModifier: 0 }
    ]
  },
  { 
    id: 'r28', 
    name: 'Stir-Fried Pork Belly with Sauce + Pickled Egg', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    consolidatedVariants: [
      { id: 'japanese-sauce', name: 'with Japanese Sauce', priceModifier: 0 },
      { id: 'korean-sauce', name: 'with Korean Sauce', priceModifier: 10 }
    ]
  },
  { 
    id: 'r29', 
    name: 'Stir-Fried Pork Neck with Sauce + Pickled Egg', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    consolidatedVariants: [
      { id: 'japanese-sauce', name: 'with Japanese Sauce', priceModifier: 0 },
      { id: 'korean-sauce', name: 'with Korean Sauce', priceModifier: 10 }
    ]
  },
  { id: 'r30', name: 'Chicken Teriyaki', price: 119, category: 'DONBURI BOWLS', restaurant: 'restory' },
  { id: 'r31', name: 'Stir Fried Pork Neck in Soy Sauce + Fish Roe + Pickled Eggs + Seafood Sauce', price: 139, category: 'DONBURI BOWLS', restaurant: 'restory' },

  // KOREAN SPICY NOODLES
  { id: 'r32', name: 'Spicy Korean Mama with Crunchy Fried Chicken + Boiled Egg', price: 139, category: 'KOREAN SPICY NOODLES', restaurant: 'restory' },
  { id: 'r33', name: 'Spicy Korean Mama with Chicken Karaage + Kimchi', price: 139, category: 'KOREAN SPICY NOODLES', restaurant: 'restory' },
  { id: 'r34', name: 'Spicy Korean Mama with Chicken Karaage + Pickled Egg', price: 159, category: 'KOREAN SPICY NOODLES', restaurant: 'restory' },

  // QUICK DISH
  { id: 'r35', name: 'Juicy Bacon + Pickled Egg + Seafood Sauce', price: 139, category: 'QUICK DISH', restaurant: 'restory' },
  { id: 'r36', name: '🔥Pork Belly Slices Grilled with Sesame Oil + Isaan Dipping Sauce', price: 129, category: 'QUICK DISH', restaurant: 'restory', isSpecial: true },
  { id: 'r37', name: 'Sliced Pork Neck with Soft Omelette', price: 129, category: 'QUICK DISH', restaurant: 'restory' },
  { id: 'r38', name: 'Stir-Fried Salted Duck Egg', price: 99, category: 'QUICK DISH', restaurant: 'restory' },
  { id: 'r39', name: 'Stir-Fried Minced Pork with Salted Egg and Chilli Oil', price: 99, category: 'QUICK DISH', restaurant: 'restory' },
  { id: 'r40', name: 'Fried Rice with Smoked Chicken Sausage', price: 90, category: 'QUICK DISH', restaurant: 'restory' },
  { id: 'r41', name: 'Fried Rice', price: 70, category: 'QUICK DISH', restaurant: 'restory' },

  // SOMETHING WITH EGG
  { id: 'r42', name: '⭐ Pork Teriyaki with Creamy Omelette ⭐', price: 129, category: 'SOMETHING WITH EGG', restaurant: 'restory', isSpecial: true },
  { id: 'r43', name: 'Spicy Crunchy Chicken with Creamy Omelette', price: 129, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r44', name: '🔥Creamy Shrimp Fat Omelette + Fish Roe', price: 99, category: 'SOMETHING WITH EGG', restaurant: 'restory', isSpecial: true },
  { id: 'r45', name: 'Minced Pork with Sesame Oil and Creamy Omelette + Fried Garlic', price: 99, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r46', name: 'Minced Pork with Sesame Oil and Soft Omelette + Fried Garlic', price: 99, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r47', name: 'Bacon with Creamy Omelette', price: 99, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r48', name: '👍Cheese Sausage with Creamy Omelette', price: 89, category: 'SOMETHING WITH EGG', restaurant: 'restory', isSpecial: true },
  { id: 'r49', name: 'Smoked Sausage in Tomato Sauce with Creamy Omelette', price: 89, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r50', name: 'Pork Omelette', price: 75, category: 'SOMETHING WITH EGG', restaurant: 'restory' },
  { id: 'r51', name: 'Chilli Omelette', price: 55, category: 'SOMETHING WITH EGG', restaurant: 'restory' },

  // FRIED CHICKEN + RICE
  { id: 'r52', name: '👍Fried Chicken Thigh with Garlic Sauce and Fried Garlic', price: 139, category: 'FRIED CHICKEN + RICE', restaurant: 'restory', isSpecial: true },
  { id: 'r53', name: 'Fried Chicken Thigh with Teriyaki Sauce', price: 139, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r54', name: '⭐ Fried Chicken Thigh with Sweet Fish Sauce ⭐', price: 99, category: 'FRIED CHICKEN + RICE', restaurant: 'restory', isSpecial: true },
  { 
    id: 'r55', 
    name: 'Crunchy Fried Chicken with Sauce', 
    price: 129, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    consolidatedVariants: [
      { id: 'lemon-sauce', name: 'with Lemon Sauce', priceModifier: 0 },
      { id: 'garlic-sauce', name: 'with Garlic Sauce', priceModifier: 0 },
      { id: 'korean-sauce', name: 'with Korean Sauce', priceModifier: 0 },
      { id: 'cheesy-sour-cream', name: 'with Cheesy Sour Cream Sauce', priceModifier: 0 }
    ]
  },
  { id: 'r56', name: 'Chicken Karaage with Korean Sauce', price: 129, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r57', name: 'Chicken Karaage with Lemon Sauce', price: 139, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r58', name: 'Chicken Karaage with Spicy Mayo Sauce + Fish Roe', price: 149, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r59', name: 'Spicy Chicken Karaage with Garlic Sauce + Pickled Egg + Seafood Sauce', price: 149, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r60', name: 'Chicken Karaage with Cheesy Sour Cream Sauce + Fish Roe', price: 149, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r61', name: '🔥Chicken Karaage with Cheesy Sour Cream Sauce + Onion', price: 139, category: 'FRIED CHICKEN + RICE', restaurant: 'restory', isSpecial: true },
  { id: 'r62', name: 'Chicken Karaage with Creamy Shrimp Fat Omelette + Fish Roe', price: 139, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },
  { id: 'r63', name: 'Chicken Karaage with Korean Sauce + Kimchi', price: 149, category: 'FRIED CHICKEN + RICE', restaurant: 'restory' },

  // CHILLI AND FRIED GARLIC
  { id: 'r64', name: 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg', price: 119, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
  { id: 'r65', name: '⭐ Stir-Fried Pork Belly with Chilli and Fried Garlic ⭐', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', isSpecial: true, spicyRequired: true },
  { id: 'r66', name: 'Stir-Fried Pork Neck with Chilli and Fried Garlic', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
  { id: 'r67', name: 'Stir-Fried Bacon with Chilli and Fried Garlic', price: 99, category: 'CHILLI AND FRIED GARLIC', restaurant: 'restory', spicyRequired: true },
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
  { id: 'n12', name: 'Grilled Sliced Pork Sirloin on Rice', price: 105, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n13', name: 'Mala Grilled Sliced Pork Sirloin on Rice', price: 115, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana' },

  // BRAISED MEAT + RICE
  { id: 'n14', name: 'Braised Beef on Rice', price: 129, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'n15', name: '⭐ Braised Pork Belly on Rice ⭐', price: 149, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },
  { id: 'n16', name: 'Braised Chicken Wing on Rice 👍', price: 95, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },

  // BRAISED MEAT + EGG NOODLES
  { id: 'n17', name: 'Braised Chicken Wing with Egg Noodles', price: 125, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n18', name: 'Mala Braised Chicken Wing with Egg Noodles', price: 135, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n19', name: 'Braised Beef with Egg Noodles', price: 159, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n20', name: 'Mala Braised Beef with Egg Noodles', price: 169, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n21', name: 'Braised Pork Belly with Egg Noodles', price: 179, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n22', name: 'Mala Braised Pork Belly with Egg Noodles', price: 189, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },

  // GRILLED MEAT + EGG NOODLES
  { id: 'n23', name: 'Grilled Pork Belly with Egg Noodles', price: 145, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n24', name: 'Mala Grilled Pork Belly with Egg Noodles', price: 155, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n25', name: 'Grilled Sliced Pork Sirloin with Egg Noodles', price: 135, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n26', name: 'Mala Grilled Sliced Pork Sirloin with Egg Noodles', price: 145, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n27', name: 'Grilled Chicken Thigh with Egg Noodles', price: 119, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n28', name: 'Mala Grilled Chicken Thigh with Egg Noodles', price: 129, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'n29', name: '⭐ Grilled Beef with Egg Noodles ⭐', price: 149, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana', isSpecial: true },
  { id: 'n30', name: 'Mala Grilled Beef with Egg Noodles', price: 159, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },

  // NOODLE SOUP
  { id: 'n31', name: 'Mala Beef Rice Noodle Soup', price: 169, category: 'NOODLE SOUP', restaurant: 'nirvana' },
  { id: 'n32', name: 'Beef Rice Noodle Soup', price: 159, category: 'NOODLE SOUP', restaurant: 'nirvana' },

  // VEGETARIAN
  { id: 'n33', name: 'Grilled Mushroom with Soy Sauce on Rice', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'n34', name: 'Mala Grilled Mushroom with Soy Sauce on Rice', price: 79, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'n35', name: 'Stir-Fried Mushroom with Soy Sauce', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'n36', name: 'Mala Stir-Fried Mushroom with Soy Sauce', price: 79, category: 'VEGETARIAN', restaurant: 'nirvana' },

  // FISH MENU
  { id: 'n37', name: 'Grilled Saba Fish with Soy Sauce on Rice', price: 139, category: 'FISH MENU', restaurant: 'nirvana' },
  { id: 'n38', name: 'Mala Grilled Saba Fish with Soy Sauce on Rice', price: 149, category: 'FISH MENU', restaurant: 'nirvana' },

  // OTHER
  { id: 'n39', name: 'Creamy Omelette on Rice', price: 70, category: 'OTHER', restaurant: 'nirvana' },
  { id: 'n40', name: 'Stir-Fried Diced Chicken on Rice', price: 99, category: 'OTHER', restaurant: 'nirvana' },
];

export const addOns: AddOn[] = [
  // Extra Meat
  { id: 'extra-chicken', name: '🐔 Extra Chicken 150g', price: 50, category: 'meat' },
  { id: 'extra-pork', name: '🐷 Extra Pork 100g', price: 50, category: 'meat' },
  { id: 'extra-premium-beef', name: '🐮 Extra Premium Beef 100g', price: 80, category: 'meat', isPremium: true },
  { id: 'extra-beef', name: '🐮 Extra Beef 100g', price: 60, category: 'meat' },
  { id: 'extra-rice', name: '🍚 Extra Jasmine Rice 200g', price: 20, category: 'other' },

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
