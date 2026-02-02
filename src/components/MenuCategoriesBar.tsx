import { Restaurant } from '@/types/menu';

interface MenuCategoriesBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  themeColor: string;
  restaurant?: Restaurant;
}

const MenuCategoriesBar: React.FC<MenuCategoriesBarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  themeColor,
  restaurant,
}) => {
  const getBackgroundClass = () => {
    if (restaurant === 'nirvana') return 'bg-nirvana-secondary backdrop-blur-sm border-t border-gray-700';
    if (restaurant === 'restory') return 'bg-nirvana-secondary backdrop-blur-sm border-t border-gray-800';
    if (restaurant === 'smoody') return 'bg-smoody-background backdrop-blur-sm border-t border-smoody-accent/30';
    return 'bg-white/95 backdrop-blur-sm border-t border-gray-200';
  };
  
  const getTextColor = (isSelected: boolean) => {
    if (restaurant === 'nirvana') return isSelected ? themeColor : '#999';
    if (restaurant === 'restory') return isSelected ? themeColor : '#999';
    if (restaurant === 'smoody') return isSelected ? themeColor : '#666';
    return isSelected ? themeColor : '#555';
  };
  
  return (
    <div className={getBackgroundClass()}>
      <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            className={`text-base font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              selectedCategory === category ? "active-category" : ""
            }`}
            style={{
              borderColor: selectedCategory === category ? themeColor : "transparent",
              color: getTextColor(selectedCategory === category),
              opacity: selectedCategory === category ? 1 : 0.8,
              background: "none",
              outline: "none",
              paddingBottom: "8px",
            }}
            onClick={() => setSelectedCategory(category)}
            aria-current={selectedCategory === category ? "true" : undefined}
          >
            {category}
          </button>
        ))}
      </div>
      <style>{`
        .active-category {
          transition: border-color 0.3s, color 0.3s;
        }
      `}</style>
    </div>
  );
};

export default MenuCategoriesBar;
