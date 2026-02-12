export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // All Smoody images are .webp format - confirmed by checking file system
  const imagePath = `/images/${dishId}.webp`;
  
  // Debug logging for Smoody images to track loading issues
  if (dishId.startsWith('SM-')) {
    console.log('Smoody Image Debug:', {
      dishId,
      imagePath,
      timestamp: new Date().toISOString()
    });
  }
  
  return imagePath;
};
