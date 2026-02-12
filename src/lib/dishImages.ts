export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  return `/images/${dishId}.webp`;
};
