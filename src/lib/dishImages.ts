export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // Fix swapped images for RS-FCR-012 and RS-FCR-014
  const swappedImages: Record<string, string> = {
    'RS-FCR-012': '/images/RS-FCR-014.webp',
    'RS-FCR-014': '/images/RS-FCR-012.webp',
  };
  
  if (swappedImages[dishId]) {
    return swappedImages[dishId];
  }
  
  return `/images/${dishId}.webp`;
};
