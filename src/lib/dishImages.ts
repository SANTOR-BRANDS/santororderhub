export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // Some images are .jpeg, others are .png
  const jpegImages = ['RS-PKR-008', 'RS-PKR-013'];
  
  if (jpegImages.includes(dishId)) {
    return `/images/${dishId}.jpeg`;
  }
  
  // Default to .png for all other images
  return `/images/${dishId}.png`;
};
