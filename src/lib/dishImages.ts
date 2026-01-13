// Prefers WebP, falls back to PNG
export const getDishImage = (dishId: string): string => {
  return `/images/${dishId}.webp`;
};

export const getDishImageFallback = (dishId: string): string => {
  return `/images/${dishId}.png`;
};
