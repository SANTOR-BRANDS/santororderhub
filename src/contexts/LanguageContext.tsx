'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

// Types
export type Language = 'th' | 'en'

export interface Translations {
  // Header
  'header.delivery': string
  'header.pickup': string
  'header.searchPlaceholder': string
  'header.setAddressPrompt': string
  'header.clickToSetAddress': string
  'header.deliveryPlaceholder': string
  
  // Search
  'search.placeholder': string
  'search.dishes': string
  'search.restaurants': string
  'search.noResults': string
  
  // Categories
  'categories.all': string
  'categories.popular': string
  'categories.recommended': string
  'categories.comboDeals': string
  'categories.signatureBowls': string
  'categories.greekYo': string
  'categories.rice': string
  'categories.noodles': string
  'categories.freshSeafood': string
  'categories.vegetarian': string
  'categories.toppings': string
  'categories.drinks': string
  'categories.desserts': string
  
  // Subcategories
  'subcategory.mala': string
  'subcategory.stirFried': string
  'subcategory.fried': string
  'subcategory.grilled': string
  'subcategory.braised': string
  'subcategory.curry': string
  'subcategory.padKrapao': string
  'subcategory.korean': string
  'subcategory.egg': string
  'subcategory.salmon': string
  'subcategory.donburi': string
  'subcategory.soup': string
  'subcategory.clear': string
  
  // Restaurant
  'restaurant.info': string
  'restaurant.deliveryTime': string
  'restaurant.deliveryFee': string
  'restaurant.minOrder': string
  'restaurant.rating': string
  
  // Add to cart
  'cart.addToCart': string
  'cart.added': string
  'cart.adding': string
  
  // Basket
  'basket.empty': string
  'basket.empty.desc': string
  
  // Footer
  'footer.basket': string
  'footer.basketEmpty': string
  'footer.checkout': string
  'footer.total': string
  'footer.deliveryAddress': string
  'footer.selectRestaurant': string
  'footer.followUs': string
  'footer.rightsReserved': string
  'footer.delivery': string
  'footer.payment': string
  'footer.follow': string
  'footer.category': string
  'footer.category.all': string
  'footer.category.back': string
  'footer.variation': string
  'footer.addOns': string
  'footer.visitUs': string
  'footer.aboutUs': string
  'footer.terms': string
  'footer.faq': string
  
  // Dish
  'dish.recommended': string
  'dish.addToBasket': string
  'dish.cutlery': string
  'dish.cutleryQuestion': string
  'dish.cutleryYes': string
  'dish.cutleryNo': string
  
  // Location
  'location.setAddress': string
  'location.addressPrompt': string
  'location.addressSet': string
  
  // Order
  'order.instructions': string
  
  // Menu
  'menu.all': string
  'menu.surpriseMe': string
  'menu.surpriseMeSubtitle': string
  'menu.searchPlaceholder': string
  'menu.noDishes': string
  'menu.adjustFilters': string
  'menu.showingDishes': string
  'menu.fromRestaurant': string
  
  // Common
  'common.loading': string
  'common.error': string
  'common.retry': string
  'common.close': string
}

const thaiTranslations: Record<string, string> = {
  // Header
  'header.delivery': 'ส่ง',
  'header.pickup': 'รับเอง',
  'header.searchPlaceholder': 'ค้นหาเมนู...',
  'header.setAddressPrompt': 'กรุณากรอกที่อยู่จัดส่ง:',
  'header.clickToSetAddress': 'คลิกเพื่อตั้งค่าที่อยู่จัดส่ง',
  'header.deliveryPlaceholder': 'ตั้งค่าที่อยู่จัดส่ง',
  
  // Search
  'search.placeholder': 'ค้นหาเมนู หรือ ร้านอาหาร...',
  'search.dishes': 'เมนูแนะนำ',
  'search.restaurants': 'ร้านอาหาร',
  'search.noResults': 'ไม่พบผลลัพธ์ที่ตรงกัน',
  
  // Categories
  'categories.all': '🍽️ ALL',
  'categories.popular': '🔥 POPULAR',
  'categories.recommended': '⭐ RECOMMENDED',
  'categories.comboDeals': '🔥 COMBO DEALS',
  'categories.signatureBowls': '✨ SIGNATURE BOWLS',
  'categories.greekYo': '🍨 GREEK YO',
  'categories.rice': '🍚 RICE',
  'categories.noodles': '🍜 NOODLES',
  'categories.freshSeafood': '🐟 FRESH SEAFOOD',
  'categories.vegetarian': '🌱 VEGETARIAN',
  'categories.toppings': '🥢 TOPPINGS',
  'categories.drinks': '🧃 DRINKS',
  'categories.desserts': '🍨 DESSERTS',
  
  // Subcategories
  'subcategory.mala': 'หม่าล่า',
  'subcategory.stirFried': 'ผัด',
  'subcategory.fried': 'ทอด',
  'subcategory.grilled': 'ย่าง',
  'subcategory.braised': 'ตุ๋น',
  'subcategory.curry': 'แกงกะหรี่',
  'subcategory.padKrapao': 'ผัดกะเพรา',
  'subcategory.korean': 'เกาหลี',
  'subcategory.egg': 'ไข่',
  'subcategory.salmon': 'แซลมอน',
  'subcategory.donburi': 'ข้าวหน้า',
  'subcategory.soup': 'ก๋วยเตี๋ยว',
  'subcategory.clear': 'ล้าง',
  
  // Restaurant
  'restaurant.info': 'ข้อมูลร้านอาหาร',
  'restaurant.deliveryTime': 'เวลาจัดส่ง',
  'restaurant.deliveryFee': 'ค่าจัดส่ง',
  'restaurant.minOrder': 'ขั้นต่ำ',
  'restaurant.rating': 'คะแนน',
  
  // Add to cart
  'cart.addToCart': 'เพิ่มลงตะกร้า',
  'cart.added': 'เพิ่มแล้ว!',
  'cart.adding': 'กำลังเพิ่ม...',
  
  // Basket
  'basket.empty': 'ตะกร้าว่าง',
  'basket.empty.desc': 'เพิ่มเมนูอร่อยๆ เพื่อเริ่มต้น!',
  
  // Footer
  'footer.basket': 'ตะกร้าสินค้า',
  'footer.basketEmpty': 'ตะกร้าว่าง',
  'footer.checkout': 'ชำระเงิน',
  'footer.total': 'รวม',
  'footer.deliveryAddress': 'ที่อยู่จัดส่ง',
  'footer.selectRestaurant': 'เลือกร้านอาหาร',
  'footer.followUs': 'ติดตามเรา',
  'footer.rightsReserved': 'สงวนลิขสิทธิ์',
  'footer.delivery': 'จัดส่ง',
  'footer.payment': 'ชำระเงิน',
  'footer.follow': 'ติดตาม',
  'footer.category': 'หมวดหมู่',
  'footer.category.all': 'ทั้งหมด',
  'footer.category.back': 'กลับ',
  'footer.variation': 'รูปแบบ',
  'footer.addOns': 'เพิ่มเติม',
  'footer.visitUs': 'เยี่ยมชม',
  'footer.aboutUs': 'เกี่ยวกับเรา',
  'footer.terms': 'เงื่อนไขการใช้งาน',
  'footer.faq': 'คำถามที่พบบ่อย',
  
  // Dish
  'dish.recommended': 'แนะนำ',
  'dish.addToBasket': 'เพิ่มลงตะกร้า',
  'dish.cutlery': 'ช้อนส้อม',
  'dish.cutleryQuestion': 'ต้องการรับช้อนส้อม?',
  'dish.cutleryYes': 'ใช่',
  'dish.cutleryNo': 'ไม่',
  
  // Location
  'location.setAddress': 'ตั้งค่าที่อยู่',
  'location.addressPrompt': 'กรุณากรอกที่อยู่จัดส่งของคุณ:',
  'location.addressSet': 'ตั้งค่าที่อยู่สำเร็จแล้ว',
  
  // Order
  'order.instructions': 'คัดลอกคำสั่งซื้อ จากนั้นส่งผ่าน LINE หรือ Instagram',
  
  // Menu
  'menu.all': 'ทั้งหมด',
  'menu.surpriseMe': 'สุ่มให้ฉัน!',
  'menu.surpriseMeSubtitle': 'เมนูแนะนำพิเศษ',
  'menu.searchPlaceholder': 'ค้นหาเมนู...',
  'menu.noDishes': 'ไม่พบเมนู',
  'menu.adjustFilters': 'ปรับตัวกรอง',
  'menu.showingDishes': 'แสดง {count} เมนู',
  'menu.fromRestaurant': 'จาก {restaurant}',
  
  // Common
  'common.loading': 'กำลังโหลด...',
  'common.error': 'เกิดข้อผิดพลาด',
  'common.retry': 'ลองใหม่',
  'common.close': 'ปิด'
}

const englishTranslations: Record<string, string> = {
  // Header
  'header.delivery': 'Delivery',
  'header.pickup': 'Pickup',
  'header.searchPlaceholder': 'Search dishes...',
  'header.setAddressPrompt': 'Please enter your delivery address:',
  'header.clickToSetAddress': 'Click to set delivery address',
  'header.deliveryPlaceholder': 'Set delivery address',
  
  // Search
  'search.placeholder': 'Search dishes or restaurants...',
  'search.dishes': 'Popular Dishes',
  'search.restaurants': 'Restaurants',
  'search.noResults': 'No results found',
  
  // Categories
  'categories.all': '🍽️ ALL',
  'categories.popular': '🔥 POPULAR',
  'categories.recommended': '⭐ RECOMMENDED',
  'categories.comboDeals': '🔥 COMBO DEALS',
  'categories.signatureBowls': '✨ SIGNATURE BOWLS',
  'categories.greekYo': '🍨 GREEK YO',
  'categories.rice': '🍚 RICE',
  'categories.noodles': '🍜 NOODLES',
  'categories.freshSeafood': '🐟 FRESH SEAFOOD',
  'categories.vegetarian': '🌱 VEGETARIAN',
  'categories.toppings': '🥢 TOPPINGS',
  'categories.drinks': '🧃 DRINKS',
  'categories.desserts': '🍨 DESSERTS',
  
  // Subcategories
  'subcategory.mala': 'Mala',
  'subcategory.stirFried': 'Stir-Fried',
  'subcategory.fried': 'Fried',
  'subcategory.grilled': 'Grilled',
  'subcategory.braised': 'Braised',
  'subcategory.curry': 'Curry',
  'subcategory.padKrapao': 'Pad Krapao',
  'subcategory.korean': 'Korean',
  'subcategory.egg': 'Egg',
  'subcategory.salmon': 'Salmon',
  'subcategory.donburi': 'Donburi',
  'subcategory.soup': 'Soup',
  'subcategory.clear': 'Clear',
  
  // Restaurant
  'restaurant.info': 'Restaurant Info',
  'restaurant.deliveryTime': 'Delivery Time',
  'restaurant.deliveryFee': 'Delivery Fee',
  'restaurant.minOrder': 'Min Order',
  'restaurant.rating': 'Rating',
  
  // Add to cart
  'cart.addToCart': 'Add to Cart',
  'cart.added': 'Added!',
  'cart.adding': 'Adding...',
  
  // Basket
  'basket.empty': 'Your basket is empty',
  'basket.empty.desc': 'Add some delicious dishes to get started!',
  
  // Footer
  'footer.basket': 'Basket',
  'footer.basketEmpty': 'Your basket is empty',
  'footer.checkout': 'Checkout',
  'footer.total': 'Total',
  'footer.deliveryAddress': 'Delivery Address',
  'footer.selectRestaurant': 'Select Restaurant',
  'footer.followUs': 'Follow Us',
  'footer.rightsReserved': 'All rights reserved',
  'footer.delivery': 'Delivery',
  'footer.payment': 'Payment',
  'footer.follow': 'Follow',
  'footer.category': 'Category',
  'footer.category.all': 'All',
  'footer.category.back': 'Back',
  'footer.variation': 'Variation',
  'footer.addOns': 'Add-ons',
  'footer.visitUs': 'Visit Us',
  'footer.aboutUs': 'About Us',
  'footer.terms': 'Terms of Service',
  'footer.faq': 'FAQ',
  
  // Dish
  'dish.recommended': 'Recommended',
  'dish.addToBasket': 'Add to Basket',
  'dish.cutlery': 'Cutlery',
  'dish.cutleryQuestion': 'Need cutlery?',
  'dish.cutleryYes': 'Yes',
  'dish.cutleryNo': 'No',
  
  // Location
  'location.setAddress': 'Set Address',
  'location.addressPrompt': 'Please enter your delivery address:',
  'location.addressSet': 'Address set successfully',
  
  // Order
  'order.instructions': 'Copy your order, then send via LINE or Instagram for processing',
  
  // Menu
  'menu.all': 'All',
  'menu.surpriseMe': 'Surprise Me!',
  'menu.surpriseMeSubtitle': 'Special recommended dish',
  'menu.searchPlaceholder': 'Search dishes...',
  'menu.noDishes': 'No dishes found',
  'menu.adjustFilters': 'Adjust filters',
  'menu.showingDishes': 'Showing {count} dishes',
  'menu.fromRestaurant': 'from {restaurant}',
  
  // Common
  'common.loading': 'Loading...',
  'common.error': 'Error',
  'common.retry': 'Retry',
  'common.close': 'Close'
}

// Context
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('th')

  const t = (key: keyof Translations): string => {
    const translations = language === 'th' ? thaiTranslations : englishTranslations
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}