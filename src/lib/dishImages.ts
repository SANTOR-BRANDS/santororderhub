export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // All images are .png
  return `/images/${dishId}.png`;
};
