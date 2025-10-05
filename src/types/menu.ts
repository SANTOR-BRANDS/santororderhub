export type Restaurant = 'restory' | 'nirvana' | 'mejai hai yum';

export interface DishVariant {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  category: string;
  restaurant: Restaurant;
  description?: string;
  isSpecial?: boolean;
  spicyRequired?: boolean;
  image?: string;
  variants?: DishVariant[];
  extraOptions?: AddOn[];
  isAvailable?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: 'meat' | 'egg' | 'sauce' | 'other' | 'fried-egg' | 'thai-omelette' | 'creamy-omelette' | 'soft-omelette' | 'extra-pls';
  isIncremental?: boolean; // For beef/pork 20g increments
  incrementalUnit?: number; // 20g units
  incrementalDiscount?: number; // Discount per 100g
}

export interface BasketItem {
  id: string;
  dish: Dish;
  selectedVariant?: DishVariant;
  addOns: AddOn[];
  extraPls: AddOn[];
  incrementalExtras?: Map<string, number>; // For tracking beef/pork 20g quantities
  spicyLevel?: number;
  sauce: string;
  needsCutlery: boolean;
  quantity: number;
  isPremiumBeef?: boolean;
  // For combo deals (2x Pad Krapao)
  isCombo?: boolean;
  combo2?: {
    selectedVariant?: DishVariant;
    addOns: AddOn[];
    extraPls: AddOn[];
    incrementalExtras?: Map<string, number>;
    spicyLevel?: number;
    sauce: string;
  };
}

export interface SpicyLevel {
  level: number;
  label: string;
  emoji: string;
}

export const SPICY_LEVELS: SpicyLevel[] = [
  { level: 0, label: 'Not Spicy', emoji: '' },
  { level: 1, label: 'Little', emoji: '🌶️' },
  { level: 2, label: 'Medium (Signature)', emoji: '🌶️🌶️' },
  { level: 3, label: 'Spicy', emoji: '🌶️🌶️🌶️' },
  { level: 4, label: 'Extra Spicy', emoji: '🌶️🌶️🌶️🌶️' },
];

export const SAUCES = [
  { id: 'SAN-SAU-001', name: 'Ketchup', price: 0 },
  { id: 'SAN-SAU-002', name: 'Chilli Fish Sauce', price: 0 },
  { id: 'SAN-SAU-003', name: 'Chilli Sauce', price: 0 },
  { id: 'SAN-SAU-004', name: 'Maggie Sauce', price: 0 },
  { id: 'SAN-SAU-005', name: 'Sweet Chilli Fish Sauce', price: 10 },
  { id: 'SAN-SAU-006', name: '🔴 Isaan Dipping Sauce', price: 15 },
  { id: 'SAN-SAU-007', name: '🟢 Seafood Sauce', price: 20 },
  { id: 'SAN-SAU-008', name: '🚫 NO SAUCE', price: 0 },
];

export const NIRVANA_SAUCES = [
  { id: 'NV-SAU-001', name: 'Soy Sauce', price: 0 },
  { id: 'NV-SAU-002', name: 'Chilli Fish Sauce', price: 0 },
  { id: 'NV-SAU-003', name: 'Isaan Dipping Sauce', price: 0 },
  { id: 'NV-SAU-004', name: 'Seafood Sauce', price: 0 },
  { id: 'NV-SAU-005', name: '🚫 No Sauce', price: 0 },
];

export const getSaucesByRestaurant = (restaurant: Restaurant) => {
  return restaurant === 'nirvana' ? NIRVANA_SAUCES : SAUCES;
};
