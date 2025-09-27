export type Restaurant = 'restory' | 'nirvana';

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
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  category: 'meat' | 'egg' | 'sauce' | 'other' | 'thai-omelette' | 'creamy-omelette' | 'soft-omelette' | 'extra-pls';
}

export interface BasketItem {
  id: string;
  dish: Dish;
  selectedVariant?: DishVariant;
  addOns: AddOn[];
  extraPls: AddOn[];
  spicyLevel?: number;
  sauce: string;
  needsCutlery: boolean;
  quantity: number;
  isPremiumBeef?: boolean;
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
  { id: 'ketchup', name: 'Ketchup', price: 0 },
  { id: 'chilli-fish', name: 'Chilli Fish Sauce', price: 0 },
  { id: 'chilli', name: 'Chilli Sauce', price: 0 },
  { id: 'maggie', name: 'Maggie Sauce', price: 0 },
  { id: 'sweet-chilli', name: 'Sweet Chilli Fish Sauce', price: 10 },
  { id: 'isaan', name: '🔴 Isaan Dipping Sauce', price: 15 },
  { id: 'seafood', name: '🟢 Seafood Sauce', price: 20 },
  { id: 'no-sauce', name: '🚫 NO SAUCE', price: 0 },
];