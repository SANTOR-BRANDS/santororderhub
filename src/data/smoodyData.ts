import { Dish, AddOn } from '@/types/menu';

// Smoody paid extras (available for all Smoody dishes)
export const SMOODY_PAID_EXTRAS: AddOn[] = [
  // Greek Yogurt
  { id: 'EXT-GRK-001', name: 'Greek Yo Extra Scoop', price: 69, category: 'sm-greek-yo' },

  // Fresh Fruits
  { id: 'EXT-FRU-001', name: 'Banana', price: 15, category: 'sm-fruits' },
  { id: 'EXT-FRU-002', name: 'Kiwi', price: 25, category: 'sm-fruits' },
  { id: 'EXT-FRU-003', name: 'Dragon Fruit', price: 25, category: 'sm-fruits' },
  { id: 'EXT-FRU-004', name: 'Mango', price: 25, category: 'sm-fruits' },
  { id: 'EXT-FRU-005', name: 'Apple', price: 25, category: 'sm-fruits' },
  { id: 'EXT-FRU-006', name: 'Pineapple', price: 25, category: 'sm-fruits' },
  { id: 'EXT-FRU-007', name: 'Shine Muscat Grape', price: 30, category: 'sm-fruits' },
  { id: 'EXT-FRU-008', name: 'Blueberry', price: 35, category: 'sm-fruits' },
  { id: 'EXT-FRU-009', name: 'Strawberry', price: 35, category: 'sm-fruits' },
  { id: 'EXT-FRU-010', name: 'Avocado', price: 35, category: 'sm-fruits' },

  // Nuts & Seeds
  { id: 'EXT-NUT-001', name: 'Chia Seeds', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-002', name: 'Flax Seeds', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-003', name: 'Coconut Shred', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-004', name: 'Cacao Nibs', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-005', name: 'Choco Chips', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-006', name: 'Raisins', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-007', name: 'Oreo', price: 15, category: 'sm-nuts' },
  { id: 'EXT-NUT-008', name: 'Corn Flakes', price: 20, category: 'sm-nuts' },
  { id: 'EXT-NUT-009', name: 'Homemade Granola', price: 30, category: 'sm-nuts' },
  { id: 'EXT-NUT-010', name: 'Cashew Nuts', price: 30, category: 'sm-nuts' },
  { id: 'EXT-NUT-011', name: 'Almonds', price: 30, category: 'sm-nuts' },

  // Sauces
  { id: 'EXT-SAU-001', name: 'Longan Flower Honey', price: 15, category: 'sm-sauce' },
  { id: 'EXT-SAU-002', name: 'Caramel', price: 15, category: 'sm-sauce' },
  { id: 'EXT-SAU-003', name: 'Chocolate', price: 20, category: 'sm-sauce' },
  { id: 'EXT-SAU-004', name: 'Peanut Butter', price: 30, category: 'sm-sauce' },
  { id: 'EXT-SAU-005', name: 'Choco Peanut Butter', price: 35, category: 'sm-sauce' },
];

// Free toppings list (for Greek Yo 1S+3T and 2S+5T variants)
export const SMOODY_FREE_TOPPINGS = [
  // Fruits
  { id: 'TOP-FRU-001', name: 'Banana', category: 'fruits' as const },
  { id: 'TOP-FRU-002', name: 'Kiwi', category: 'fruits' as const },
  { id: 'TOP-FRU-003', name: 'Dragon Fruit', category: 'fruits' as const },
  { id: 'TOP-FRU-004', name: 'Mango', category: 'fruits' as const },
  { id: 'TOP-FRU-005', name: 'Apple', category: 'fruits' as const },
  { id: 'TOP-FRU-006', name: 'Pineapple', category: 'fruits' as const },
  { id: 'TOP-FRU-007', name: 'Shine Muscat Grape', category: 'fruits' as const },
  { id: 'TOP-FRU-008', name: 'Blueberry', category: 'fruits' as const },
  { id: 'TOP-FRU-009', name: 'Strawberry', category: 'fruits' as const },
  { id: 'TOP-FRU-010', name: 'Avocado', category: 'fruits' as const },
  { id: 'TOP-FRU-011', name: 'Passion Fruit', category: 'fruits' as const },

  // Nuts & Seeds
  { id: 'TOP-NUT-001', name: 'Chia Seeds', category: 'nuts' as const },
  { id: 'TOP-NUT-002', name: 'Flax Seeds', category: 'nuts' as const },
  { id: 'TOP-NUT-003', name: 'Coconut Shred', category: 'nuts' as const },
  { id: 'TOP-NUT-004', name: 'Cacao Nibs', category: 'nuts' as const },
  { id: 'TOP-NUT-005', name: 'Choco Chips', category: 'nuts' as const },
  { id: 'TOP-NUT-006', name: 'Raisins', category: 'nuts' as const },
  { id: 'TOP-NUT-007', name: 'Oreo', category: 'nuts' as const },
  { id: 'TOP-NUT-008', name: 'Corn Flakes', category: 'nuts' as const },
  { id: 'TOP-NUT-009', name: 'Granola', category: 'nuts' as const },
  { id: 'TOP-NUT-010', name: 'Cashew Nuts', category: 'nuts' as const },
  { id: 'TOP-NUT-011', name: 'Almonds', category: 'nuts' as const },

  // Sauces
  { id: 'TOP-SAU-001', name: 'Natural Honey', category: 'sauce' as const },
  { id: 'TOP-SAU-002', name: 'Caramel', category: 'sauce' as const },
  { id: 'TOP-SAU-003', name: 'Chocolate', category: 'sauce' as const },
  { id: 'TOP-SAU-004', name: 'Original Peanut Butter', category: 'sauce' as const },
  { id: 'TOP-SAU-005', name: 'Choco Peanut Butter', category: 'sauce' as const },
];

// Smoody coming-soon categories (for display only)
export const SMOODY_COMING_SOON = [
  'Promotions',
  'Smoothies',
  'Overnight Oats',
  'D.I.Y Bowl',
  'Drinks',
];

// ============ SMOODY MENU ============
export const smoodyMenu: Dish[] = [
  // ============ SIGNATURE BOWLS ============
  {
    id: 'SM-SIG-006',
    name: 'Pink Pussy',
    price: 185,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Signature Berries Base topped with banana, strawberry, blueberry, almond, chia seed, honey.',
    variants: [
      { id: 'SM-SIG-022', name: 'S', price: 145 },
      { id: 'SM-SIG-014', name: 'M', price: 185, isDefault: true },
      { id: 'SM-SIG-006', name: 'L', price: 225 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-004',
    name: 'Glow Berries',
    price: 185,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Signature Berries Base topped with banana, strawberry, blueberry, raisin, flaxseed, coconut shred, honey.',
    variants: [
      { id: 'SM-SIG-020', name: 'S', price: 145 },
      { id: 'SM-SIG-012', name: 'M', price: 185, isDefault: true },
      { id: 'SM-SIG-004', name: 'L', price: 225 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-005',
    name: 'Mango Berry',
    price: 185,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Signature Berries Base topped with mango, strawberry, blueberry, flaxseed, coconut shred, honey.',
    variants: [
      { id: 'SM-SIG-021', name: 'S', price: 145 },
      { id: 'SM-SIG-013', name: 'M', price: 185, isDefault: true },
      { id: 'SM-SIG-005', name: 'L', price: 225 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-003',
    name: 'Banana PB',
    price: 175,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Banana cacao & peanut butter base topped with banana, chocolate chip, cashew nut, peanut butter, coconut shred.',
    variants: [
      { id: 'SM-SIG-019', name: 'S', price: 135 },
      { id: 'SM-SIG-011', name: 'M', price: 175, isDefault: true },
      { id: 'SM-SIG-003', name: 'L', price: 215 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-002',
    name: 'Banana CPB',
    price: 175,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Banana cacao & peanut butter base topped with banana, almond, cacao nibs, cashew, peanut butter, coconut shred.',
    variants: [
      { id: 'SM-SIG-018', name: 'S', price: 135 },
      { id: 'SM-SIG-010', name: 'M', price: 175, isDefault: true },
      { id: 'SM-SIG-002', name: 'L', price: 215 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-008',
    name: 'Tropical Lover',
    price: 165,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Mango & Passion fruit base topped with mango, dragon fruit, cashew nut, chia seed, honey, coconut shred.',
    variants: [
      { id: 'SM-SIG-024', name: 'S', price: 125 },
      { id: 'SM-SIG-016', name: 'M', price: 165, isDefault: true },
      { id: 'SM-SIG-008', name: 'L', price: 195 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-007',
    name: 'Tropical Berry',
    price: 185,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Mango & Passion fruit base topped with mango, blueberry, strawberry, flaxseeds, honey, coconut shred.',
    variants: [
      { id: 'SM-SIG-023', name: 'S', price: 145 },
      { id: 'SM-SIG-015', name: 'M', price: 185, isDefault: true },
      { id: 'SM-SIG-007', name: 'L', price: 215 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-SIG-001',
    name: 'Açaí Greek Yo',
    price: 240,
    category: 'SIGNATURE BOWLS',
    restaurant: 'smoody',
    description: 'Açaí base topped with Greek yogurt, mango, dragon fruit, blueberry, strawberry, chia seeds, coconut shred.',
    variants: [
      { id: 'SM-SIG-017', name: 'S', price: 195 },
      { id: 'SM-SIG-009', name: 'M', price: 240, isDefault: true },
      { id: 'SM-SIG-001', name: 'L', price: 290 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },

  // ============ GREEK YO ============
  {
    id: 'SM-GRK-001',
    name: 'Berry Bliss',
    price: 135,
    category: 'GREEK YO',
    restaurant: 'smoody',
    description: 'Plain greek yogurt topped with seedless grape, blueberry, strawberry, chia seeds, coconut shred.',
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-GRK-002',
    name: 'Three Some Fruits',
    price: 145,
    category: 'GREEK YO',
    restaurant: 'smoody',
    description: 'Plain greek yogurt topped with mango, banana, strawberry, flaxseeds, coconut shred.',
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
  {
    id: 'SM-GRK-003',
    name: 'Homemade Greek Yo',
    price: 59,
    category: 'GREEK YO',
    restaurant: 'smoody',
    description: 'Our signature homemade Greek yogurt. 🔥 1 Scoop PROMO: ฿59 (normally ฿69)!',
    variants: [
      { id: 'SM-GRK-003-1S', name: '1 Scoop — 🔥 PROMO', price: 59, isDefault: true },
      { id: 'SM-GRK-003-1S3T', name: '1 Scoop + 3 Free Toppings', price: 89, freeToppingsLimit: 3 },
      { id: 'SM-GRK-003-2S5T', name: '2 Scoops + 5 Free Toppings', price: 129, freeToppingsLimit: 5 },
    ],
    extraOptions: [...SMOODY_PAID_EXTRAS],
  },
];
