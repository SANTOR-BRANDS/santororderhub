import { Dish, AddOn, Restaurant } from '@/types/menu';

export const restoryMenu: Dish[] = [
  // COMBO DEALS
  {
    id: 'RS-COM-001',
    name: 'Pad Krapao Minced Pork + Coke',
    price: 116,
    category: 'COMBO DEALS',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-COM-002',
    name: '2x Pad Krapao Minced Pork (Special)',
    price: 199,
    category: 'COMBO DEALS',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // PAD KRAPAO
  // The old r3 is now split into multiple distinct items to match the new ID list.
  {
    id: 'RS-PKR-001',
    name: 'Pad Krapao Minced Pork',
    price: 99,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  { 
    id: 'RS-PKR-002', 
    name: 'Pad Krapao Minced Pork + Vermicelli', 
    price: 114, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true, 
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ] 
  },
  { 
    id: 'RS-PKR-003', 
    name: 'Pad Krapao Minced Pork + Chinese Sausage', 
    price: 124, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true, 
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ] 
  },
  { 
    id: 'RS-PKR-004', 
    name: 'Pad Krapao Minced Pork + Century Egg', 
    price: 124, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true, 
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ] 
  },
  { 
    id: 'RS-PKR-005', 
    name: 'Pad Krapao Minced Pork + Chicken Sausage', 
    price: 124, 
    category: 'PAD KRAPAO', 
    restaurant: 'restory', 
    spicyRequired: true, 
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ] 
  },
  {
    id: 'RS-PKR-006',
    name: 'Pad Krapao Bacon',
    price: 109,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-ADD-012', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' }, // Mapped to Crispy Bacon Add-On
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-007',
    name: 'Pad Krapao Pork Belly Pieces (chunky and soft)', // Name clarified to match new list
    price: 119,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // The old r6 variants (belly, neck) are now separate top-level items
  {
    id: 'RS-PKR-008',
    name: 'Pad Krapao Sliced Pork Belly (juicy and soft)',
    price: 129,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-009',
    name: 'Pad Krapao Sliced Pork Neck (meaty and tender)',
    price: 129,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // The old r7 is now split into two items to reflect the switch option
  {
    id: 'RS-PKR-010',
    name: 'Pad Krapao Minced Premium Beef',
    price: 149,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' },
      { id: 'SAN-EXT-005', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-011',
    name: 'Pad Krapao Minced Premium Beef (Switch to Normal Beef -50THB)',
    price: 99, // Updated price for the switched/normal beef option
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' },
      { id: 'SAN-EXT-005', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-012',
    name: '✨Diced Wagyu Beef Pad Krapao ✨ (Grade A3)',
    price: 159,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-013',
    name: 'Pad Krapao Chicken Breast',
    price: 109,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-014',
    name: 'Pad Krapao Chicken',
    price: 99,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-015',
    name: 'Pad Krapao Chicken Sausage', // Assuming this is smoked sausage based on price/extra
    price: 99,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-ADD-014', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-PKR-016',
    name: 'Pad Krapao Chinese Sausage',
    price: 109,
    category: 'PAD KRAPAO',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-ADD-013', name: 'Extra Chinese sausage', price: 25, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // JAPANESE CURRY
  {
    id: 'RS-CUR-001',
    name: 'Pork Curry + Creamy Omelette',
    price: 129,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-CUR-002',
    name: 'Chicken Katsu Curry (Torikatsu)',
    price: 139,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' }, // Mapped to Crunchy Fried Chicken
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-CUR-003',
    name: '🔥Pork Katsu Curry (Tonkatsu)',
    price: 149,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-ADD-009', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' }, // No dedicated pork katsu add-on, using chicken katsu ID for now
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-CUR-004',
    name: 'Fried Chicken Thigh Curry',
    price: 149,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-008', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' }, // Mapped to Fried Chicken Thigh
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-CUR-005',
    name: 'Chicken Karaage Curry',
    price: 139,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' }, // Mapped to Fried Chicken Karaage Balls
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-CUR-006',
    name: 'Australian Beef Curry',
    price: 139,
    category: 'JAPANESE CURRY',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-005', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' },
      { id: 'SAN-EXT-006', name: '✨ Extra Curry', price: 40, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // DONBURI BOWLS
  // Old r19 variants are now separate items
  {
    id: 'RS-DON-001',
    name: '⭐️Tonkatsu Don ⭐️',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-ADD-009', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-002',
    name: '⭐️Torikatsu Don ⭐️',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-ADD-009', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-003',
    name: 'Chicken Karaage Don',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-004',
    name: 'Chicken Thigh Don',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-008', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // Old r22 variants are now separate items
  {
    id: 'RS-DON-005',
    name: '👍Tonkatsu with Katsu Sauce',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-ADD-009', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-006',
    name: '👍Torikatsu with Katsu Sauce',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-ADD-009', name: '🐷 Extra Crunchy Pork', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-007',
    name: 'Sliced Pork Teriyaki on Rice',
    price: 129,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // Old r24 variants are now separate items
  {
    id: 'RS-DON-008',
    name: 'Stir-Fried Pork Belly with Japanese Sauce + Pickled Egg',
    price: 129,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-009',
    name: 'Stir-Fried Pork Belly with Korean Sauce + Pickled Egg',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // Old r25 variants are now separate items
  {
    id: 'RS-DON-010',
    name: 'Stir-Fried Pork Neck with Japanese Sauce + Pickled Egg',
    price: 129,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-011',
    name: 'Stir-Fried Pork Neck with Korean Sauce + Pickled Egg',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-012',
    name: '🔥Chicken Teriyaki on Rice',
    price: 119,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-DON-013',
    name: 'Stir Fried Pork Neck in Soy Sauce + Fish Roe + Pickled Eggs + Seafood Sauce',
    price: 139,
    category: 'DONBURI BOWLS',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // KOREAN SPICY NOODLES
  {
    id: 'RS-KOR-001',
    name: 'Spicy Korean Mama with Chicken Karaage + Pickled Egg',
    price: 219,
    category: 'KOREAN SPICY NOODLES',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-KOR-002',
    name: 'Spicy Korean Mama with Chicken Karaage + Kimchi',
    price: 199,
    category: 'KOREAN SPICY NOODLES',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Karaage Chicken', price: 50, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-KOR-003',
    name: 'Spicy Korean Mama with Crunchy Fried Chicken + Boiled Egg',
    price: 189,
    category: 'KOREAN SPICY NOODLES',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' }
    ]
  },

  // QUICK DISH
  {
    id: 'RS-QIK-001',
    name: 'Juicy Bacon on Rice + Pickled Egg + Seafood Sauce', // Name updated to match list
    price: 139,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-012', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-002',
    name: '🔥Pork Belly Slices Grilled with Sesame Oil + Isaan Dipping Sauce',
    price: 129,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-003',
    name: 'Sliced Pork Neck with Soft Omelette',
    price: 129,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-004',
    name: 'Pork Belly with Southern Curry Paste on Rice (Coming Back Soon!)',
    price: 0,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-005',
    name: 'Stir-Fried Salted Duck Egg on Rice', // Name updated to match list
    price: 99,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-006',
    name: 'Stir-Fried Minced Pork with Salted Egg and Chilli Oil on Rice', // Name updated to match list
    price: 99,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-007',
    name: 'Fried Rice with Smoked Chicken Sausage',
    price: 90,
    category: 'QUICK DISH',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-014', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-QIK-008',
    name: 'Fried Rice',
    price: 70,
    category: 'QUICK DISH',
    restaurant: 'restory'
  },

  // SOMETHING WITH EGG
  {
    id: 'RS-SWE-001',
    name: '⭐️Pork Teriyaki with Creamy Omelette on Rice ⭐️', // Name updated to match list
    price: 129,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-002',
    name: 'Spicy Crunchy Chicken with Creamy Omelette on Rice', // Name updated to match list
    price: 129,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-003',
    name: '🔥Creamy Shrimp Fat Omelette on Rice + Fish Roe', // Name updated to match list
    price: 99,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-004',
    name: 'Minced Pork with Sesame Oil and Creamy Omelette + Fried Garlic',
    price: 99,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-005',
    name: 'Minced Pork with Sesame Oil and Soft Omelette + Fried Garlic',
    price: 99,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-006',
    name: 'Bacon with Creamy Omelette',
    price: 99,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-012', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-007',
    name: '👍Cheese Sausage with Creamy Omelette on Rice', // Name updated to match list
    price: 89,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-015', name: 'Extra Cheese Sausage', price: 25, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-008',
    name: 'Smoked Sausage in Tomato Sauce with Creamy Omelette on Rice', // Name updated to match list
    price: 89,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-014', name: 'Extra Smoked Sausage', price: 25, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-009',
    name: 'Pork Omelette on Rice', // Name updated to match list
    price: 75,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-SWE-010',
    name: 'Chilli Omelette on Rice', // Name updated to match list
    price: 55,
    category: 'SOMETHING WITH EGG',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // FRIED CHICKEN + RICE
  {
    id: 'RS-FCR-001',
    name: '⭐️Fried Chicken Thigh with Sweet Fish Sauce on Rice ⭐️',
    price: 99,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    isSpecial: true,
    extraOptions: [
      { id: 'SAN-ADD-008', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  // Old r50 variants are now separate items
  {
    id: 'RS-FCR-002',
    name: 'Crunchy Fried Chicken with Lemon Sauce',
    price: 129,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-003',
    name: 'Crunchy Fried Chicken with Garlic Sauce',
    price: 129,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-004',
    name: '🔥Crunchy Fried Chicken with Korean Sauce',
    price: 129,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-005',
    name: 'Crunchy Fried Chicken with Cheesy Sour Cream Sauce',
    price: 129,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-010', name: '🐔 Extra Crunchy Chicken', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-006',
    name: '🔥Fried Chicken Thigh with Teriyaki Sauce',
    price: 139,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-008', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-007',
    name: 'Fried Chicken Thigh with Garlic Sauce and Fried Garlic on Rice', // Name updated to match list
    price: 139,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-008', name: '🍗 Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-008',
    name: 'Chicken Karaage with Cheesy Sour Cream Sauce + Onion',
    price: 139,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-009',
    name: 'Chicken Karaage with Lemon Sauce',
    price: 139,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-010',
    name: 'Chicken Karaage with Creamy Shrimp Fat Omelette + Fish Roe',
    price: 139,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-011',
    name: 'Chicken Karaage with Spicy Siracha Mayo Sauce on Rice + Fish Roe',
    price: 149,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-012',
    name: 'Chicken Karaage with Korean Sauce + Kimchi',
    price: 149,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-013',
    name: 'Spicy Chicken Karaage with Garlic Sauce on Rice + Pickled Egg + Seafood Sauce',
    price: 149,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-014',
    name: 'Chicken Karaage with Cheesy Sour Cream Sauce + Fish Roe',
    price: 149,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },
  {
    id: 'RS-FCR-015',
    name: 'Chicken Karaage with Korean Sauce',
    price: 129,
    category: 'FRIED CHICKEN + RICE',
    restaurant: 'restory',
    extraOptions: [
      { id: 'SAN-ADD-011', name: '🐔 Extra Chicken Karaage', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }
    ]
  },

  // CHILLI AND FRIED GARLIC
  {
    id: 'RS-CFG-001',
    name: 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg',
    price: 119,
    category: 'CHILLI AND FRIED GARLIC',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-ADD-008', name: 'Extra Chicken Thigh', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' } // Added missing rice option
    ]
  },
  {
    id: 'RS-CFG-002',
    name: '⭐️ Stir-Fried Pork Belly with Chilli and Fried Garlic ⭐️',
    price: 99,
    category: 'CHILLI AND FRIED GARLIC',
    restaurant: 'restory',
    isSpecial: true,
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' } // Added missing rice option
    ]
  },
  {
    id: 'RS-CFG-003',
    name: 'Stir-Fried Pork Neck with Chilli and Fried Garlic',
    price: 99,
    category: 'CHILLI AND FRIED GARLIC',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' } // Added missing rice option
    ]
  },
  {
    id: 'RS-CFG-004',
    name: 'Stir-Fried Bacon with Chilli and Fried Garlic',
    price: 99,
    category: 'CHILLI AND FRIED GARLIC',
    restaurant: 'restory',
    spicyRequired: true,
    extraOptions: [
      { id: 'SAN-ADD-012', name: '🥓 Extra Bacon', price: 30, category: 'extra-pls' },
      { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' } // Added missing rice option
    ]
  },
];

export const nirvanaMenu: Dish[] = [
  // PAD KRAPAO
  { id: 'NV-PKR-001', name: 'Pad Krapao Minced Beef', price: 99, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true, ExtraOptions: [{ id: 'SAN-EXT-005', name: '🐮 Extra Beef (100g)', price: 60, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-PKR-002', name: 'Pad Krapao Minced Pork', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true, ExtraOptions: [{ id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-PKR-003', name: 'Pad Krapao Minced Chicken', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true, ExtraOptions: [{ id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-PKR-004', name: 'Pad Krapao Diced Chicken', price: 89, category: 'PAD KRAPAO', restaurant: 'nirvana', spicyRequired: true, ExtraOptions: [{ id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },

  // GRILLED MEAT + RICE
  { id: 'NV-GRR-001', name: '⭐ Grilled Beef on Rice ⭐', price: 119, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', isSpecial: true, ExtraOptions: [{ id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-002', name: 'Mala Grilled Beef on Rice', price: 129, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-003', name: 'Grilled Beef with Spring Onion on Rice', price: 129, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-004', name: '🐮 Extra Premium Beef (100g)', price: 80, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-004', name: 'Grilled Chicken Thigh on Rice', price: 89, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-005', name: 'Mala Grilled Chicken Thigh on Rice', price: 99, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-001', name: '🐔 Extra Chicken (150g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-006', name: 'Grilled Pork Belly on Rice', price: 115, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-007', name: 'Mala Grilled Pork Belly on Rice', price: 125, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-008', name: 'Grilled Sliced Pork Sirloin on Rice', price: 105, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },
  { id: 'NV-GRR-009', name: 'Mala Grilled Sliced Pork Sirloin on Rice', price: 115, category: 'GRILLED MEAT + RICE', restaurant: 'nirvana', ExtraOptions: [{ id: 'SAN-EXT-003', name: '🐷 Extra Pork (100g)', price: 50, category: 'extra-pls' }, { id: 'SAN-EXT-002', name: '🍚 Extra Jasmine Rice (200g)', price: 20, category: 'extra-pls' }] },

  // BRAISED MEAT + RICE
  { id: 'NV-BRR-001', name: 'Braised Beef on Rice', price: 129, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana' },
  { id: 'NV-BRR-002', name: '⭐ Braised Pork Belly on Rice ⭐', price: 149, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },
  { id: 'NV-BRR-003', name: 'Braised Chicken Wing on Rice 👍', price: 95, category: 'BRAISED MEAT + RICE', restaurant: 'nirvana', isSpecial: true },

  // BRAISED MEAT + EGG NOODLES
  { id: 'NV-BRN-001', name: 'Braised Chicken Wing with Egg Noodles', price: 125, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-BRN-002', name: 'Mala Braised Chicken Wing with Egg Noodles', price: 135, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-BRN-003', name: 'Braised Beef with Egg Noodles', price: 159, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-BRN-004', name: 'Mala Braised Beef with Egg Noodles', price: 169, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-BRN-005', name: 'Braised Pork Belly with Egg Noodles', price: 179, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-BRN-006', name: 'Mala Braised Pork Belly with Egg Noodles', price: 189, category: 'BRAISED MEAT + EGG NOODLES', restaurant: 'nirvana' },

  // GRILLED MEAT + EGG NOODLES
  { id: 'NV-GRN-001', name: 'Grilled Pork Belly with Egg Noodles', price: 145, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-002', name: 'Mala Grilled Pork Belly with Egg Noodles', price: 155, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-003', name: 'Grilled Sliced Pork Sirloin with Egg Noodles', price: 135, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-004', name: 'Mala Grilled Sliced Pork Sirloin with Egg Noodles', price: 145, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-005', name: 'Grilled Chicken Thigh with Egg Noodles', price: 119, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-006', name: 'Mala Grilled Chicken Thigh with Egg Noodles', price: 129, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },
  { id: 'NV-GRN-007', name: '⭐ Grilled Beef with Egg Noodles ⭐', price: 149, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana', isSpecial: true },
  { id: 'NV-GRN-008', name: 'Mala Grilled Beef with Egg Noodles', price: 159, category: 'GRILLED MEAT + EGG NOODLES', restaurant: 'nirvana' },

  // NOODLE SOUP
  { id: 'NV-NSP-001', name: 'Mala Beef Rice Noodle Soup', price: 169, category: 'NOODLE SOUP', restaurant: 'nirvana' },
  { id: 'NV-NSP-002', name: 'Beef Rice Noodle Soup', price: 159, category: 'NOODLE SOUP', restaurant: 'nirvana' },

  // VEGETARIAN
  { id: 'NV-VEG-001', name: 'Grilled Mushroom with Soy Sauce on Rice', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'NV-VEG-002', name: 'Mala Grilled Mushroom with Soy Sauce on Rice', price: 79, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'NV-VEG-003', name: 'Stir-Fried Mushroom with Soy Sauce', price: 69, category: 'VEGETARIAN', restaurant: 'nirvana' },
  { id: 'NV-VEG-004', name: 'Mala Stir-Fried Mushroom with Soy Sauce', price: 79, category: 'VEGETARIAN', restaurant: 'nirvana' },

  // FISH MENU
  { id: 'NV-FIS-001', name: 'Grilled Saba Fish with Soy Sauce on Rice', price: 139, category: 'FISH MENU', restaurant: 'nirvana' },
  { id: 'NV-FIS-002', name: 'Mala Grilled Saba Fish with Soy Sauce on Rice', price: 149, category: 'FISH MENU', restaurant: 'nirvana' },

  // OTHER
  { id: 'NV-OTH-001', name: 'Creamy Omelette on Rice', price: 70, category: 'OTHER', restaurant: 'nirvana' },
  { id: 'NV-OTH-002', name: 'Stir-Fried Diced Chicken on Rice', price: 99, category: 'OTHER', restaurant: 'nirvana' },
];

export const addOns: AddOn[] = [
  // Add-ons
  { id: 'SAN-ADD-001', name: 'Pickled Egg Yolk ⭐️', price: 20, category: 'ADD-ONS' },
  { id: 'SAN-ADD-002', name: 'Salted Duck Egg', price: 30, category: 'ADD-ONS' },
  { id: 'SAN-ADD-003', name: 'Century Egg', price: 30, category: 'ADD-ONS' },
  { id: 'SAN-ADD-004', name: 'Fish Roe', price: 45, category: 'ADD-ONS' },
  { id: 'SAN-ADD-005', name: 'Fried Chicken Thighs + Sweet Chilli Fish Sauce', price: 55, category: 'ADD-ONS' },
  { id: 'SAN-ADD-006', name: 'Fried Chicken Thighs', price: 50, category: 'ADD-ONS' },
  { id: 'SAN-ADD-007', name: 'Crunchy Fried Chicken + Katsu Sauce 🔥', price: 60, category: 'ADD-ONS' },
  { id: 'SAN-ADD-008', name: 'Crunchy Fried Chicken', price: 50, category: 'ADD-ONS' },
  { id: 'SAN-ADD-009', name: 'Fried Chicken Karaage Balls 🔥', price: 50, category: 'ADD-ONS' },
  { id: 'SAN-ADD-010', name: 'Crispy Bacon', price: 30, category: 'ADD-ONS' },
  { id: 'SAN-ADD-011', name: 'Chinese Sausage', price: 25, category: 'ADD-ONS' },
  { id: 'SAN-ADD-012', name: 'Smoked Sausage', price: 25, category: 'ADD-ONS' },
  { id: 'SAN-ADD-013', name: 'Cheese Sausage', price: 25, category: 'ADD-ONS' },
  { id: 'SAN-ADD-014', name: 'Bamboo Shoots 🍀', price: 25, category: 'ADD-ONS' },
  { id: 'SAN-ADD-015', name: 'Dashi Soup 🍀', price: 15, category: 'ADD-ONS' },

  // Fried Egg 🍳
  { id: 'SAN-FEG-001', name: 'Fried Egg', price: 20, category: 'FRIED EGG' },
  { id: 'SAN-FEG-002', name: 'Fried Duck Egg', price: 25, category: 'FRIED EGG' },
  
  // Thai Style Omelette 🍳
  { id: 'SAN-THO-001', name: 'Thai Style Omelette (1 Egg)', price: 20, category: 'THAI STYLE OMELETTE' },
  { id: 'SAN-THO-002', name: 'Thai Style Omelettes (2 Eggs)', price: 35, category: 'THAI STYLE OMELETTE' },
  { id: 'SAN-THO-003', name: 'Thai Style Omelette with Chilli', price: 30, category: 'THAI STYLE OMELETTE' },
  { id: 'SAN-THO-004', name: 'Thai Style Omelette with Minced Pork', price: 45, category: 'THAI STYLE OMELETTE' },

  // Creamy Omelette 🍳
  { id: 'SAN-CRO-001', name: 'Creamy Omelette (1 Egg)', price: 20, category: 'CREAMY OMELETTE' },
  { id: 'SAN-CRO-002', name: 'Creamy Omelettes (2 Eggs)', price: 30, category: 'CREAMY OMELETTE' },
  { id: 'SAN-CRO-003', name: 'Creamy Omelette with Shrimp Fat', price: 30, category: 'CREAMY OMELETTE' },
  { id: 'SAN-CRO-004', name: 'Creamy Omelette with Shrimp Fat + Fish Roe', price: 45, category: 'CREAMY OMELETTE' },
  
  // Soft Omelette 🍳
  { id: 'SAN-SOO-001', name: 'Soft Omelette (1 Egg)', price: 20, category: 'SOFT OMELETTE' },
  { id: 'SAN-SOO-002', name: 'Soft Omelette (2 Eggs)', price: 30, category: 'SOFT OMELETTE' },
  { id: 'SAN-SOO-003', name: 'Soft Omelette with Shrimp Fat', price: 30, category: 'SOFT OMELETTE' },
  { id: 'SAN-SOO-004', name: 'Soft Omelette with Shrimp Fat + Fish Roe', price: 45, category: 'SOFT OMELETTE' },
];

// Note: Sauce and Spice options are const with conditions

export const getMenuByRestaurant = (restaurant: Restaurant): Dish[] => {
  return restaurant === 'restory' ? restoryMenu : nirvanaMenu;
};

export const getCategoriesByRestaurant = (restaurant: Restaurant): string[] => {
  const menu = getMenuByRestaurant(restaurant);
  const categories = [...new Set(menu.map(dish => dish.category))];
  return ['ALL', ...categories];
};
