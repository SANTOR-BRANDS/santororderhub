// Image path utilities - prefers WebP with PNG fallback
export const getDishImage = (dishId: string): string => {
  return `/images/${dishId}.webp`;
};

export const getDishImageFallback = (dishId: string): string => {
  return `/images/${dishId}.png`;
};
