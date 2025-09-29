import React from "react";
interface MenuCategoriesBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  themeColor: string;
}
const MenuCategoriesBar: React.FC<MenuCategoriesBarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  themeColor,
}) => (
  // FIX: Removed 'bg-white/95' and 'backdrop-blur-sm' for solid visibility.
  <div className="sticky top-[120px] z-40 bg-white border-b border-gray-200 mb-6">
    <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category}
          className={`text-base font-semibold transition-all cursor-pointer border-b-2 whitespace-nowrap ${
            selectedCategory === category ? "active-category" : ""
          }`}
          style={{
            borderColor: selectedCategory === category ? themeColor : "transparent",
            color: selectedCategory === category ? themeColor : "#555",
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
export default MenuCategoriesBar;
