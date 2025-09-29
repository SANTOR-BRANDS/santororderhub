import { Dish, AddOn, Restaurant } from '@/types/menu';

export const restoryMenu: Dish[] = [
  // COMBO DEALS
  { 
    id: 'r1', 
    name: 'Pad Krapao Minced Pork + Coke', 
    price: 116, 
    category: 'COMBO DEALS', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r2', 
    name: '2x Pad Krapao Minced Pork (Special)', 
    price: 199, 
    category: 'COMBO DEALS', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // PAD KRAPAO
  { 
    id: 'r3', 
    name: 'Pad Krapao Minced Pork', 
    price: 99, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    variants: [
      { id: 'base', name: 'Base', price: 99, isDefault: true },
      { id: 'vermicelli', name: '🔥With Vermicelli', price: 114 },
      { id: 'chinese-sausage', name: 'With Chinese Sausage', price: 124 },
      { id: 'century-egg', name: 'With Century Egg', price: 124 },
      { id: 'chicken-sausage', name: 'With Chicken Sausage', price: 124 }
    ],
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r4', 
    name: 'Pad Krapao Bacon', 
    price: 109, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-bacon', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r5', 
    name: 'Pad Krapao Pork Belly Pieces', 
    price: 119, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r6', 
    name: 'Pad Krapao Sliced Pork', 
    price: 129, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    variants: [
      { id: 'belly', name: 'Sliced Pork Belly', price: 129, isDefault: true },
      { id: 'neck', name: 'Sliced Pork Neck', price: 129 }
    ],
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r7', 
    name: 'Pad Krapao Minced Premium Beef', 
    price: 149, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    variants: [
      { id: 'premium', name: 'Premium Beef', price: 149, isDefault: true },
      { id: 'normal', name: 'Switch to Normal Beef (-฿50)', price: 99 }
    ],
    extraOptions: [
      { id: 'extra-premium-beef', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' },
      { id: 'extra-beef', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r8', 
    name: '✨ Diced Wagyu Beef Pad Krapao (Grade A3)', 
    price: 159, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    isSpecial: true,
    extraOptions: [
      { id: 'extra-premium-beef', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r9', 
    name: 'Pad Krapao Chicken Breast', 
    price: 109, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-chicken', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r10', 
    name: 'Pad Krapao Chicken', 
    price: 99, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-chicken', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r11', 
    name: 'Pad Krapao Chicken Sausage', 
    price: 99, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-smoked-sausage', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r12', 
    name: 'Pad Krapao Chinese Sausage', 
    price: 109, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-chinese-sausage', name: 'Extra Chinese sausage', price: 25, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // JAPANESE CURRY
  { 
    id: 'r13', 
    name: 'Pork Curry + Creamy Omelette', 
    price: 129, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r14', 
    name: 'Chicken Katsu Curry (Torikatsu)', 
    price: 139, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r15', 
    name: '🔥Pork Katsu Curry (Tonkatsu)', 
    price: 149, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'extra-crunchy-pork', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r16', 
    name: 'Fried Chicken Thigh Curry', 
    price: 149, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-chicken-thigh', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r17', 
    name: 'Chicken Karaage Curry', 
    price: 139, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r18', 
    name: 'Australian Beef Curry', 
    price: 139, 
    category: 'JAPANESE CURRY', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-beef', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' },
      { id: 'extra-curry', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // DONBURI BOWLS
  { 
    id: 'r19', 
    name: '⭐️ Tonkatsu Don', 
    price: 139, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    isSpecial: true,
    variants: [
      { id: 'tonkatsu', name: 'Tonkatsu Don 🐷', price: 139, isDefault: true },
      { id: 'torikatsu', name: 'Torikatsu Don 🐔', price: 139 }
    ],
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-crunchy-pork', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r20', 
    name: 'Chicken Karaage Don', 
    price: 139, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r21', 
    name: 'Chicken Thigh Don', 
    price: 139, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-chicken-thigh', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r22', 
    name: '🔥Tonkatsu with Katsu Sauce', 
    price: 139, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    variants: [
      { id: 'tonkatsu', name: '🐷 Tonkatsu with Katsu Sauce', price: 139, isDefault: true },
      { id: 'torikatsu', name: '🐔 Torikatsu with Katsu Sauce', price: 139 }
    ],
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-crunchy-pork', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r23', 
    name: 'Sliced Pork Teriyaki', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    variants: [
      { id: 'neck', name: 'Sliced Pork Neck', price: 129, isDefault: true },
      { id: 'belly', name: 'Sliced Pork Belly', price: 129 }
    ],
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r24', 
    name: 'Stir-Fried Pork Belly with Sauce + Pickled Egg', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    variants: [
      { id: 'japanese', name: 'With Japanese Sauce', price: 129, isDefault: true },
      { id: 'korean', name: 'With Korean Sauce', price: 139 }
    ],
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r25', 
    name: 'Stir-Fried Pork Neck with Sauce + Pickled Egg', 
    price: 129, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    variants: [
      { id: 'japanese', name: 'With Japanese Sauce', price: 129, isDefault: true },
      { id: 'korean', name: 'With Korean Sauce', price: 139 }
    ],
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r26', 
    name: '🔥 Chicken Teriyaki', 
    price: 119, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-chicken', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r27', 
    name: 'Stir Fried Pork Neck in Soy Sauce + Fish Roe + Pickled Eggs + Seafood Sauce', 
    price: 139, 
    category: 'DONBURI BOWLS', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // KOREAN SPICY NOODLES
  { 
    id: 'r28', 
    name: 'Spicy Korean Mama with Chicken Karaage + Pickled Egg', 
    price: 219, 
    category: 'KOREAN SPICY NOODLES', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r29', 
    name: 'Spicy Korean Mama with Chicken Karaage + Kimchi', 
    price: 199, 
    category: 'KOREAN SPICY NOODLES', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r30', 
    name: 'Spicy Korean Mama with Crunchy Fried Chicken + Boiled Egg', 
    price: 189, 
    category: 'KOREAN SPICY NOODLES', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' }
    ]
  },

  // QUICK DISH
  { 
    id: 'r31', 
    name: 'Juicy Bacon + Pickled Egg + Seafood Sauce', 
    price: 139, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-bacon', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r32', 
    name: '🔥 Pork Belly Slices Grilled with Sesame Oil + Isaan Dipping Sauce', 
    price: 129, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r33', 
    name: 'Sliced Pork Neck with Soft Omelette', 
    price: 129, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r34', 
    name: 'Pork Belly with Southern Curry Paste (Coming Back Soon!)', 
    price: 0, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r35', 
    name: 'Stir-Fried Salted Duck Egg', 
    price: 99, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r36', 
    name: 'Stir-Fried Minced Pork with Salted Egg and Chilli Oil', 
    price: 99, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r37', 
    name: 'Fried Rice with Smoked Chicken Sausage', 
    price: 90, 
    category: 'QUICK DISH', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-smoked-sausage', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r38', 
    name: 'Fried Rice', 
    price: 70, 
    category: 'QUICK DISH', 
    restaurant: 'restory'
  },

  // SOMETHING WITH EGG
  { 
    id: 'r39', 
    name: '⭐️ Pork Teriyaki with Creamy Omelette', 
    price: 129, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r40', 
    name: 'Spicy Crunchy Chicken with Creamy Omelette', 
    price: 129, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r41', 
    name: '🔥 Creamy Shrimp Fat Omelette + Fish Roe', 
    price: 99, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r42', 
    name: 'Minced Pork with Sesame Oil and Creamy Omelette + Fried Garlic', 
    price: 99, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r43', 
    name: 'Minced Pork with Sesame Oil and Soft Omelette + Fried Garlic', 
    price: 99, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r44', 
    name: 'Bacon with Creamy Omelette', 
    price: 99, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-bacon', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r45', 
    name: '👍 Cheese Sausage with Creamy Omelette', 
    price: 89, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-cheese-sausage', name: 'Extra Cheese Sausage', price: 25, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r46', 
    name: 'Smoked Sausage in Tomato Sauce with Creamy Omelette', 
    price: 89, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-smoked-sausage', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r47', 
    name: 'Pork Omelette', 
    price: 75, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r48', 
    name: 'Chilli Omelette', 
    price: 55, 
    category: 'SOMETHING WITH EGG', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // FRIED CHICKEN + RICE
  { 
    id: 'r49', 
    name: '⭐️ Fried Chicken Thigh with Sweet Fish Sauce ⭐️', 
    price: 99, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'extra-chicken-thigh', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r50', 
    name: 'Crunchy Fried Chicken with Sauce', 
    price: 129, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    variants: [
      { id: 'lemon', name: 'With Lemon Sauce', price: 129, isDefault: true },
      { id: 'garlic', name: 'With Garlic Sauce', price: 129 },
      { id: 'korean', name: '🔥 With Korean Sauce', price: 129 },
      { id: 'cheesy', name: 'With Cheesy Sour Cream Sauce', price: 129 }
    ],
    extraOptions: [
      { id: 'extra-crunchy-chicken', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r51', 
    name: '🔥 Fried Chicken Thigh with Teriyaki Sauce', 
    price: 139, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-chicken-thigh', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r52', 
    name: 'Fried Chicken Thigh with Garlic Sauce and Fried Garlic', 
    price: 139, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-chicken-thigh', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r53', 
    name: 'Chicken Karaage with Cheesy Sour Cream Sauce + Onion', 
    price: 139, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r54', 
    name: 'Chicken Karaage with Lemon Sauce', 
    price: 139, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r55', 
    name: 'Chicken Karaage with Creamy Shrimp Fat Omelette + Fish Roe', 
    price: 139, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r56', 
    name: 'Chicken Karaage with Spicy Siracha Mayo Sauce + Fish Roe', 
    price: 149, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r57', 
    name: 'Chicken Karaage with Korean Sauce + Kimchi', 
    price: 149, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r58', 
    name: 'Spicy Chicken Karaage with Garlic Sauce + Pickled Egg + Seafood Sauce', 
    price: 149, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r59', 
    name: 'Chicken Karaage with Cheesy Sour Cream Sauce + Fish Roe', 
    price: 149, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r60', 
    name: 'Chicken Karaage with Korean Sauce', 
    price: 129, 
    category: 'FRIED CHICKEN + RICE', 
    restaurant: 'restory',
    extraOptions: [
      { id: 'extra-karaage-chicken', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'extra-rice', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // CHILLI AND FRIED GARLIC
  { 
    id: 'r61', 
    name: 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg', 
    price: 119, 
    category: 'CHILLI AND FRIED GARLIC', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-chicken-thigh', name: 'Extra Chicken Thigh', price: 50, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r62', 
    name: '⭐️ Stir-Fried Pork Belly with Chilli and Fried Garlic', 
    price: 99, 
    category: 'CHILLI AND FRIED GARLIC', 
    restaurant: 'restory', 
    isSpecial: true, 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r63', 
    name: 'Stir-Fried Pork Neck with Chilli and Fried Garlic', 
    price: 99, 
    category: 'CHILLI AND FRIED GARLIC', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-pork', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }
    ]
  },
  { 
    id: 'r64', 
    name: 'Stir-Fried Bacon with Chilli and Fried Garlic', 
    price: 99, 
    category: 'CHILLI AND FRIED GARLIC', 
    restaurant: 'restory', 
    spicyRequired: true,
    extraOptions: [
      { id: 'extra-bacon', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' }
    ]
  },
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
  // Add-ons
  { id: 'pickled-egg', name: 'Pickled Egg Yolk ⭐️', price: 20, category: 'other' },
  { id: 'salted-egg', name: 'Salted Duck Egg', price: 30, category: 'other' },
  { id: 'century-egg', name: 'Century Egg', price: 30, category: 'other' },
  { id: 'fish-roe', name: 'Fish Roe', price: 45, category: 'other' },
  { id: 'fried-chicken-sweet', name: 'Fried Chicken Thigh + Sweet Chilli Fish Sauce', price: 55, category: 'other' },
  { id: 'fried-chicken', name: 'Fried Chicken Thigh', price: 50, category: 'other' },
  { id: 'crispy-chicken', name: 'Crunchy Fried Chicken', price: 50, category: 'other' },
  { id: 'crispy-chicken-katsu', name: 'Crunchy Fried Chicken + Katsu Sauce 🔥', price: 60, category: 'other' },
  { id: 'karaage-balls', name: 'Fried Chicken Karaage Balls 🔥', price: 50, category: 'other' },
  { id: 'crispy-bacon', name: 'Crispy Bacon', price: 30, category: 'other' },
  { id: 'chinese-sausage', name: 'Chinese sausage', price: 25, category: 'other' },
  { id: 'smoked-sausage', name: 'Smoked Sausage', price: 25, category: 'other' },
  { id: 'cheese-sausage', name: 'Cheese Sausage', price: 25, category: 'other' },
  { id: 'bamboo-shoots', name: 'Bamboo Shoots', price: 20, category: 'other' },
  { id: 'dashi-soup', name: 'Dashi Soup ✨', price: 15, category: 'other' },
  
// Fried Egg 🍳
  { id: 'fried-egg', name: 'Fried Egg', price: 20, category: 'fried-egg' },
  { id: 'fried-duck-egg', name: 'Fried Duck Egg', price: 30, category: 'fried-egg' },

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
