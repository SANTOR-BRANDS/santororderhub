export const getDishImage = (dishId: string): string | undefined => {
  // Map dish ID to image path in public/images folder
  // Example: RS-PKR-001 -> /images/RS-PKR-001.png
  const imagePath = `/images/${dishId}.png`;
  
  // Return the path - Vite will handle the public folder
  return imagePath;
};
