export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // All images use .webp format consistently
  const imagePath = `/images/${dishId}.webp`;
  
  // Enhanced debugging for Smoody images across all environments
  if (dishId.startsWith('SM-')) {
    console.log('Smoody Image Loading:', {
      dishId,
      imagePath,
      userAgent: navigator.userAgent,
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|IEMobile/.test(navigator.userAgent),
      timestamp: new Date().toISOString()
    });
  }
  
  return imagePath;
};
