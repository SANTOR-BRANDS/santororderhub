import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'th';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    'header.welcome': 'Welcome to SANTOR',
    'header.tagline': 'We believe good food is the foundation of happiness',
    'header.more': 'More',
    
    // Restaurant names
    'restaurant.restory': 'Restory',
    'restaurant.restory.desc': 'Asian Fusion - Cooked to Order',
    'restaurant.nirvana': 'Nirvana',
    'restaurant.nirvana.desc': 'Authentic Flavors',
    'restaurant.mejai': 'Mejai Hai Yum',
    'restaurant.mejai.desc': 'Fresh Salmon & Thai Yum',
    'restaurant.chanwan': 'Chan Wan (soon)',
    
    // Basket
    'basket.title': 'Your Basket',
    'basket.empty': 'Your basket is empty',
    'basket.empty.desc': 'Add some delicious dishes to get started!',
    'basket.continue': 'Continue Shopping',
    'basket.total': 'Total',
    'basket.quantity': 'Quantity',
    'basket.cutlery': 'Cutlery',
    'basket.yes': 'Yes',
    'basket.no': 'No',
    
    // Order
    'order.copyOrder': 'Copy Order',
    'order.orderViaLine': 'Order via LINE',
    'order.orderViaInstagram': 'Order via Instagram',
    'order.copied': 'Order Copied ✅',
    'order.copied.desc': 'Your order has been copied to clipboard. You can now paste it in Line or Instagram.',
    'order.messageCopied': '✅ Message Copied!',
    'order.lineDM': 'LINE chat opened. Just paste (Ctrl+V or long press) and send!',
    'order.instagramDM': 'Instagram DM opened. Just paste (Ctrl+V) and send!',
    
    // Dish Modal
    'dish.addToBasket': 'Add to Basket',
    'dish.selectVariant': 'Select Variant',
    'dish.spicyLevel': 'Spicy Level',
    'dish.spicy.notSpicy': 'Not Spicy',
    'dish.spicy.mild': 'Mild',
    'dish.spicy.medium': 'Medium',
    'dish.spicy.hot': 'Hot',
    'dish.spicy.veryHot': 'Very Hot',
    'dish.sauce': 'Sauce',
    'dish.addOns': 'Add-ons',
    'dish.extras': 'Extra',
    'dish.cutlery': 'Cutlery',
    'dish.notes': 'Special Notes',
    'dish.notes.placeholder': 'Any special requests...',
    
    // Categories
    'category.all': 'ALL',
    
    // Common
    'common.price': '฿',
  },
  th: {
    // Header
    'header.welcome': 'ยินดีต้อนรับสู่ SANTOR',
    'header.tagline': 'เราเชื่อว่าอาหารดีคือรากฐานของความสุข',
    'header.more': 'เพิ่มเติม',
    
    // Restaurant names
    'restaurant.restory': 'Restory',
    'restaurant.restory.desc': 'อาหารฟิวชั่นเอเชีย - ทำสด',
    'restaurant.nirvana': 'Nirvana',
    'restaurant.nirvana.desc': 'รสชาติแท้',
    'restaurant.mejai': 'เมจัย ไหหยำ',
    'restaurant.mejai.desc': 'แซลมอนสด & ยำไทย',
    'restaurant.chanwan': 'Chan Wan (เร็วๆ นี้)',
    
    // Basket
    'basket.title': 'ตะกร้าของคุณ',
    'basket.empty': 'ตะกร้าของคุณว่างเปล่า',
    'basket.empty.desc': 'เพิ่มเมนูอร่อยๆ เพื่อเริ่มสั่ง!',
    'basket.continue': 'เลือกเมนูต่อ',
    'basket.total': 'ยอดรวม',
    'basket.quantity': 'จำนวน',
    'basket.cutlery': 'ช้อนส้อม',
    'basket.yes': 'ใช่',
    'basket.no': 'ไม่',
    
    // Order
    'order.copyOrder': 'คัดลอกรายการสั่งซื้อ',
    'order.orderViaLine': 'สั่งผ่าน LINE',
    'order.orderViaInstagram': 'สั่งผ่าน Instagram',
    'order.copied': 'คัดลอกแล้ว ✅',
    'order.copied.desc': 'รายการสั่งซื้อถูกคัดลอกแล้ว คุณสามารถวางใน Line หรือ Instagram ได้เลย',
    'order.messageCopied': '✅ คัดลอกข้อความแล้ว!',
    'order.lineDM': 'เปิดแชท LINE แล้ว แค่วาง (Ctrl+V หรือกดค้างแล้ววาง) และส่ง!',
    'order.instagramDM': 'เปิด Instagram DM แล้ว แค่วาง (Ctrl+V) และส่ง!',
    
    // Dish Modal
    'dish.addToBasket': 'เพิ่มลงตะกร้า',
    'dish.selectVariant': 'เลือกแบบ',
    'dish.spicyLevel': 'ระดับความเผ็ด',
    'dish.spicy.notSpicy': 'ไม่เผ็ด',
    'dish.spicy.mild': 'เผ็ดน้อย',
    'dish.spicy.medium': 'เผ็ดปานกลาง',
    'dish.spicy.hot': 'เผ็ด',
    'dish.spicy.veryHot': 'เผ็ดมาก',
    'dish.sauce': 'น้ำจิ้ม',
    'dish.addOns': 'เพิ่มเติม',
    'dish.extras': 'เพิ่ม',
    'dish.cutlery': 'ช้อนส้อม',
    'dish.notes': 'หมายเหตุพิเศษ',
    'dish.notes.placeholder': 'ข้อความพิเศษ...',
    
    // Categories
    'category.all': 'ทั้งหมด',
    
    // Common
    'common.price': '฿',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('santor-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('santor-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
