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
    'category.COMBO DEALS': 'COMBO DEALS',
    'category.PAD KRAPAO': 'PAD KRAPAO',
    'category.JAPANESE CURRY': 'JAPANESE CURRY',
    'category.DONBURI BOWLS': 'DONBURI BOWLS',
    'category.KOREAN SPICY NOODLES': 'KOREAN SPICY NOODLES',
    'category.QUICK DISH': 'QUICK DISH',
    'category.SOMETHING WITH EGG': 'SOMETHING WITH EGG',
    'category.FRIED CHICKEN': 'FRIED CHICKEN',
    'category.STIR FRY WITH SALT & PEPPER': 'STIR FRY WITH SALT & PEPPER',
    'category.GRILLED RICE': 'GRILLED RICE',
    'category.BRAISED RICE': 'BRAISED RICE',
    'category.BRAISED NOODLES': 'BRAISED NOODLES',
    'category.GRILLED NOODLES': 'GRILLED NOODLES',
    'category.NOODLE SOUP': 'NOODLE SOUP',
    'category.VEGETARIAN': 'VEGETARIAN',
    'category.FISH MENU': 'FISH MENU',
    'category.OTHER': 'OTHER',
    'category.TOPPINGS': 'TOPPINGS',
    'category.DRINKS': 'DRINKS',
    'category.DESSERT': 'DESSERT',
    'category.FRESH SALMON': 'FRESH SALMON',
    
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
    'category.COMBO DEALS': 'คอมโบดีล',
    'category.PAD KRAPAO': 'ผัดกะเพรา',
    'category.JAPANESE CURRY': 'แกงกะหรี่ญี่ปุ่น',
    'category.DONBURI BOWLS': 'ข้าวหน้า (ดงบุริ)',
    'category.KOREAN SPICY NOODLES': 'บะหมี่เกาหลีเผ็ด',
    'category.QUICK DISH': 'เมนูด่วน',
    'category.SOMETHING WITH EGG': 'เมนูไข่',
    'category.FRIED CHICKEN': 'ไก่ทอด',
    'category.STIR FRY WITH SALT & PEPPER': 'คั่วพริกเกลือ',
    'category.GRILLED RICE': 'ข้าวหน้าย่าง',
    'category.BRAISED RICE': 'ข้าวหน้าตุ๋น',
    'category.BRAISED NOODLES': 'บะหมี่ตุ๋น',
    'category.GRILLED NOODLES': 'บะหมี่ย่าง',
    'category.NOODLE SOUP': 'ก๋วยเตี๋ยว',
    'category.VEGETARIAN': 'เมนูเจ',
    'category.FISH MENU': 'เมนูปลา',
    'category.OTHER': 'อื่นๆ',
    'category.TOPPINGS': 'ท็อปปิ้ง',
    'category.DRINKS': 'เครื่องดื่ม',
    'category.DESSERT': 'ของหวาน',
    'category.FRESH SALMON': 'แซลมอนสด',
    
    // Common
    'common.price': '฿',

    // Dish translations - Drinks
    'SAN-DRI-001': 'น้ำใบเตย',
    'SAN-DRI-002': 'โคคา โคล่า',
    'SAN-DRI-003': 'น้ำเปล่ามองต์เฟลอ',
    'SAN-DRI-004': 'รูทเบียร์',
    'SAN-DRI-005': 'โคคา โคล่า ซีโร่',
    'SAN-DRI-006': 'น้ำส้ม มินิทเมด',
    'SAN-DRI-007': 'ชาไทย',
    'SAN-DRI-008': '✨ชาพีช',
    'SAN-DRI-009': 'กาแฟ (เฟรนช์เพรส)',
    'SAN-DRI-010': '100% อาราบิก้า (คั่วเข้ม)',
    
    // Fresh Salmon
    'SAN-FSH-001': 'แซลมอนซาชิมิ 100 กรัม',
    'SAN-FSH-002': 'แซลมอนดองซีอิ๊ว 100 กรัม',
    
    // Dessert
    'SAN-DES-001': 'ขนมปังบัตเตอร์โทสต์ไอศกรีมวานิลลา (ใหม่)',
    
    // Nirvana - Pad Krapao
    'NV-PKR-001': 'ผัดกะเพราเนื้อสับ',
    'NV-PKR-002': 'ผัดกะเพราหมูสับ',
    'NV-PKR-003': 'ผัดกะเพราไก่สับ',
    'NV-PKR-004': 'ผัดกะเพราไก่หั่นเต๋า',
    'NV-PKR-005': 'ผัดกะเพราเนื้อสับพรีเมี่ยม',
    
    // Nirvana - Grilled Rice
    'NV-GRR-001': '⭐️ข้าวหน้าเนื้อย่าง',
    'NV-GRR-002': 'ข้าวหน้าเนื้อย่างหม่าล่า',
    'NV-GRR-003': 'ข้าวหน้าเนื้อย่างต้นหอม',
    'NV-GRR-004': 'ข้าวหน้าสะโพกไก่ย่างซีอิ๊ว',
    'NV-GRR-005': 'ข้าวหน้าสะโพกไก่ย่างซีอิ๊วหม่าล่า',
    'NV-GRR-006': 'ข้าวหน้าหมูสามชั้นย่าง',
    'NV-GRR-007': 'ข้าวหน้าหมูสามชั้นย่างหม่าล่า',
    'NV-GRR-008': 'ข้าวหน้าหมูย่างสไลด์ซีอิ๊ว',
    'NV-GRR-009': 'ข้าวหน้าหมูย่างสไลด์หม่าล่า',
    
    // Nirvana - Braised Rice
    'NV-BRR-001': 'ข้าวหน้าเนื้อตุ๋น',
    'NV-BRR-002': '⭐️ข้าวหน้าหมูสามชั้นตุ๋น',
    'NV-BRR-003': '👍ข้าวหน้าปีกไก่ตุ๋น',
    
    // Nirvana - Braised Noodles
    'NV-BRN-001': 'บะหมี่ปีกไก่ตุ๋น',
    'NV-BRN-002': 'บะหมี่ปีกไก่ตุ๋นหม่าล่า',
    'NV-BRN-003': 'บะหมี่เนื้อตุ๋น',
    'NV-BRN-004': 'บะหมี่เนื้อตุ๋นหม่าล่า',
    'NV-BRN-005': 'บะหมี่หมูสามชั้นตุ๋น',
    'NV-BRN-006': '🔥บะหมี่หมูสามชั้นตุ๋นหม่าล่า',
    
    // Nirvana - Grilled Noodles
    'NV-GRN-001': 'บะหมี่หมูสามชั้นย่าง',
    'NV-GRN-002': 'บะหมี่หมูสามชั้นย่างหม่าล่า',
    'NV-GRN-003': 'บะหมี่หมูย่างสไลด์',
    'NV-GRN-004': 'บะหมี่หมูย่างสไลด์หม่าล่า',
    'NV-GRN-005': 'บะหมี่สะโพกไก่ย่างซีอิ๊ว',
    'NV-GRN-006': 'บะหมี่สะโพกไก่ย่างซีอิ๊วหม่าล่า',
    'NV-GRN-007': '⭐️บะหมี่เนื้อย่าง',
    'NV-GRN-008': 'บะหมี่เนื้อย่างหม่าล่า',
    
    // Nirvana - Noodle Soup
    'NV-NSP-001': '🔥ก๋วยเตี๋ยวเรือเนื้อหม่าล่า',
    'NV-NSP-002': 'ก๋วยเตี๋ยวเรือเนื้อ',
    
    // Nirvana - Vegetarian
    'NV-VEG-001': 'ข้าวหน้าเห็ดย่างซอสซีอิ๊ว',
    'NV-VEG-002': 'ข้าวหน้าเห็ดย่างซอสซีอิ๊วหม่าล่า',
    'NV-VEG-003': 'เห็ดผัดซอสซีอิ๊ว',
    'NV-VEG-004': 'เห็ดผัดซอสซีอิ๊วหม่าล่า',
    
    // Nirvana - Fish Menu
    'NV-FIS-001': 'ข้าวหน้าปลาย่างซาบะซอส',
    'NV-FIS-002': 'ข้าวหน้าปลาย่างซาบะซอสหม่าล่า',
    
    // Nirvana - Other
    'NV-OTH-001': 'ข้าวไข่ข้น',
    'NV-OTH-002': 'ข้าวไก่ชิ้นคั่วพริกเกลือ',
    
    // Restory - Combo Deals
    'RS-COM-001': 'ผัดกะเพราหมูสับ + โค้ก',
    'RS-COM-002': 'กะเพราหมูสับ 2x (พิเศษ) ✨',
    
    // Restory - Pad Krapao
    'RS-PKR-001': 'ผัดกะเพราหมูสับ',
    'RS-PKR-002': 'วุ้นเส้น',
    'RS-PKR-003': 'กุนเชียง',
    'RS-PKR-004': 'ไข่เยี่ยวม้า',
    'RS-PKR-005': 'ไส้กรอกไก่รมควัน',
    'RS-PKR-006': 'ผัดกะเพราเบคอน',
    'RS-PKR-007': 'ผัดกะเพราหมูชิ้น',
    'RS-PKR-008': 'หมูสามชั้นหั่นชิ้น (หนานุ่ม)',
    'RS-PKR-009': 'หมูสามชั้นสไลด์ (ฉ่ำนุ่ม)',
    'RS-PKR-010': 'ผัดกะเพราสันคอหมูสไลด์ (มีเนื้อสัมผัส นุ่ม)',
    'RS-PKR-011': 'ผัดกะเพราเนื้อสับพรีเมียม',
    'RS-PKR-012': 'ผัดกะเพราเนื้อสับพรีเมียม (เปลี่ยนเป็นเนื้อธรรมดา -50 บาท)',
    'RS-PKR-013': '✨ผัดกะเพราเนื้อวากิวหั่นเต๋า ✨ (เกรด A3)',
    'RS-PKR-014': 'ผัดกะเพราอกไก่',
    'RS-PKR-015': 'ผัดกะเพราไก่ชิ้น',
    'RS-PKR-016': 'ผัดกะเพราไส้กรอกไก่รมควัน',
    'RS-PKR-017': 'ผัดกะเพรากุนเชียง',
    
    // Restory - Japanese Curry
    'RS-CUR-001': 'ข้าวแกงกะหรี่หมู + ไข่ข้น',
    'RS-CUR-002': 'ข้าวแกงกะหรี่ไก่ทอด (ทงคัตสึ)',
    'RS-CUR-003': '🔥ข้าวแกงกะหรี่หมูทอด (ทงคัตสึ)',
    'RS-CUR-004': 'ข้าวแกงกะหรี่สะโพกไก่ทอด',
    'RS-CUR-005': 'ข้าวแกงกะหรี่ไก่คาราเกะ',
    'RS-CUR-006': 'ข้าวแกงกะหรี่เนื้อออสเตรเลีย',
    
    // Restory - Donburi Bowls
    'RS-DON-001': '⭐️ทงคัตสึด้ง',
    'RS-DON-002': '⭐️ทงคัตสึด้ง',
    'RS-DON-003': 'ข้าวหน้าไก่คาราเกะ',
    'RS-DON-004': 'ข้าวหน้าสะโพกไก่',
    'RS-DON-005': '👍ทงคัตสึ ราดซอสคัตสึ',
    'RS-DON-006': '👍ทงริคัตสึ ราดซอสคัตสึ',
    'RS-DON-007': 'ข้าวหน้าหมูสไลด์เทริยากิ',
    'RS-DON-008': 'สันคอหมูสไลด์',
    'RS-DON-009': 'หมูสามชั้นสไลด์',
    'RS-DON-010': 'หมูสามชั้นผัดซอส + ไข่ดอง (เลือกซอส)',
    'RS-DON-011': 'ซอสญี่ปุ่น',
    'RS-DON-012': 'ซอสเกาหลี',
    'RS-DON-013': 'สันคอหมูผัดซอส + ไข่ดอง (เลือกซอส)',
    'RS-DON-014': 'ซอสญี่ปุ่น',
    'RS-DON-015': 'ซอสเกาหลี',
    'RS-DON-016': '🔥ข้าวหน้าไก่เทริยากิ',
    'RS-DON-017': 'สันคอหมูผัดซอส+ ไข่กุ้ง + ไข่ดอง + น้ำจิ้มซีฟู้ด',
    
    // Restory - Korean Spicy Noodles
    'RS-KOR-001': 'มาม่าเกาหลีเผ็ดไก่คาราเกะ + ไข่ดอง',
    'RS-KOR-002': 'มาม่าเกาหลีเผ็ดไก่คาราเกะ + กิมจิ',
    'RS-KOR-003': 'มาม่าเกาหลีเผ็ดไก่ทอดกรอบ + ไข่ต้ม',
    
    // Restory - Quick Dish
    'RS-QIK-001': 'ข้าวเบคอนหอมฉ่ำ + ไข่ดอง + น้ำจิ้มซีฟู้ด',
    'RS-QIK-002': '🔥หมูสามชั้นย่างน้ำมันงา + น้ำจิ้มแจ่ว',
    'RS-QIK-003': 'สันคอสไลด์ไข่เยิ้ม',
    'RS-QIK-004': 'หมูสามชั้นผัดพริกแกงใต้ราดข้าว (กำลังจะกลับมา!)',
    'RS-QIK-005': 'ข้าวหมูสับผัดไข่เค็ม',
    'RS-QIK-006': 'ข้าวหมูสับไข่เค็มผัดน้ำพริกเผา',
    'RS-QIK-007': 'ข้าวผัดไส้กรอกไก่รมควัน',
    'RS-QIK-008': 'ข้าวผัดไข่น้ำมันงา',
    
    // Restory - Something With Egg
    'RS-SWE-001': '⭐️ข้าวหมูเทริยากิไข่ข้น',
    'RS-SWE-002': 'ข้าวไก่กรอบเผ็ดไข่ข้น',
    'RS-SWE-003': '🔥ข้าวไข่ข้นมันกุ้ง + ไข่กุ้ง',
    'RS-SWE-004': 'หมูสับผัดน้ำมันงาไข่ข้น + กระเทียมเจียว',
    'RS-SWE-005': 'หมูสับผัดน้ำมันงาไข่ยู่ยี่+ กระเทียมเจียว',
    'RS-SWE-006': 'เบคอนไข่ข้นออริกาโน่',
    'RS-SWE-007': '👍ไข่ข้นไส้กรอกชีส',
    'RS-SWE-008': 'ไส้กรอกรมควันผัดซอสมะเขือเทศไข่ข้น',
    'RS-SWE-009': 'ข้าวไข่เจียวหมูสับ',
    'RS-SWE-010': 'ข้าวไข่เจียวพริกซอย',
    
    // Restory - Fried Chicken
    'RS-FCR-001': '⭐️ข้าวสะโพกไก่ทอดซอสน้ำปลาหวาน',
    'RS-FCR-002': 'ไก่ทอดกรอบราดซอส (เลือกซอส)',
    'RS-FCR-003': 'ซอสมะนาว',
    'RS-FCR-004': 'ซอสกระเทียม',
    'RS-FCR-005': 'ซอสเกาหลี 🔥',
    'RS-FCR-006': 'ซาวครีมชีส',
    'RS-FCR-007': '🔥สะโพกไก่ทอดซอสเทริยากิ',
    'RS-FCR-008': 'สะโพกไก่ทอดซอสกระเทียมราดข้าว + กระเทียมเจียว',
    'RS-FCR-009': 'ไก่คาราเกะซาวครีมชีสซี่ + หัวหอม',
    'RS-FCR-010': 'ไก่คาราเกะซอสมะนาว',
    'RS-FCR-011': 'ไก่คาราเกะไข่ข้นมันกุ้ง + ไข่กุ้ง',
    'RS-FCR-012': 'ไก่คาราเกะซอสมาโยศรีราชาเผ็ดราดข้าว + ไข่กุ้ง',
    'RS-FCR-013': 'ไก่คาราเกะซอสเกาหลี + กิมจิ',
    'RS-FCR-014': 'ไก่คาราเกะเผ็ดซอสกระเทียมราดข้าว + ไข่ดอง + น้ำจิ้มซีฟู้ด',
    'RS-FCR-015': 'ไก่คาราเกะซาวครีมชีสซี่ + ไข่กุ้ง',
    'RS-FCR-016': 'ไก่คาราเกะซอสเกาหลี',
    
    // Restory - Stir Fry with Salt & Pepper
    'RS-CFG-001': 'สะโพกไก่คั่วพริกเกลือ + ไข่ดอง',
    'RS-CFG-002': '⭐️หมูสามชั้นคั่วพริกเกลือ',
    'RS-CFG-003': 'สันคอหมูคั่วพริกเกลือ',
    'RS-CFG-004': 'เบคอนคั่วพริกเกลือ',
    
    // Fried Egg
    'NV-FEG-001': 'ไข่ไก่ดาว',
    'NV-FEG-002': 'ไข่เป็ดดาว',
    'RS-FEG-001': 'ไข่ดาว',
    'RS-FEG-002': 'ไข่เป็ดดาว',
    
    // Thai Style Omelette
    'SAN-THO-001': 'ไข่เจียวทรงเครื่อง (1 ฟอง)',
    'SAN-THO-002': 'ไข่เจียวทรงเครื่อง (2 ฟอง)',
    'SAN-THO-003': 'ไข่เจียวทรงเครื่องพริกซอย',
    'SAN-THO-004': 'ไข่เจียวทรงเครื่องหมูสับ',
    
    // Creamy Omelette
    'SAN-CRO-001': 'ไข่ข้น (1 ฟอง)',
    'SAN-CRO-002': 'ไข่ข้น (2 ฟอง)',
    'SAN-CRO-003': 'ไข่ข้นมันกุ้ง',
    'SAN-CRO-004': 'ไข่ข้นมันกุ้ง + ไข่กุ้ง',
    
    // Soft Omelette
    'SAN-SOO-001': 'ไข่ยู่ยี่  (1 ฟอง)',
    'SAN-SOO-002': 'ไข่ยู่ยี่ (2 ฟอง)',
    'SAN-SOO-003': 'ไข่ยู่ยี่มันกุ้ง',
    'SAN-SOO-004': 'ไข่ยู่ยี่มันกุ้ง + ไข่กุ้ง',
    
    // Extras
    'SAN-EXT-001': '🍚 ข้าวหอมมะลิเพิ่ม 200 กรัม',
    'RS-EXT-001': '🐔 เนื้อไก่เพิ่ม 150 กรัม',
    'RS-EXT-002': '🐷 เนื้อหมูเพิ่ม 100 กรัม',
    'RS-EXT-003': '🐮 เนื้อวัวพรีเมียมเพิ่ม 100 กรัม',
    'RS-EXT-004': '🐮 เนื้อวัวเพิ่ม 100 กรัม',
    'RS-EXT-006': '🍗 สะโพกไก่เพิ่ม',
    'RS-EXT-007': '🐔 ไก่ทอดกรอบเพิ่ม',
    'RS-EXT-008': '🐔 ไก่คาราเกะเพิ่ม',
    'NV-EXT-003': '🐔 เนื้อไก่เพิ่ม 150 กรัม',
    'NV-EXT-004': '🐔 เนื้อไก่สับเพิ่ม 150 กรัม',
    'NV-EXT-005': '🐷 เนื้อหมูสับเพิ่ม 100 กรัม',
    'NV-EXT-006': '🐮 เนื้อวัวสับเพิ่ม 100 กรัม',
    'NV-EXT-007': '🐮 เนื้อวัวพรีเมียมเพิ่ม 100 กรัม',
    'NV-EXT-008': '🐟 เนื้อปลาซาบะเพิ่ม 140 กรัม',
    
    // Add-ons
    'SAN-ADD-001': 'ไข่ดอง ⭐️',
    'SAN-ADD-002': 'ไข่เค็ม',
    'SAN-ADD-003': 'ไข่เยี่ยวม้า',
    'SAN-ADD-004': 'ไข่กุ้ง',
    'SAN-ADD-005': 'สะโพกไก่ทอด + น้ำปลาหวาน',
    'SAN-ADD-006': 'สะโพกไก่ทอด',
    'SAN-ADD-007': 'ไก่ทอดกรอบ + ซอสคัตสึ 🔥',
    'SAN-ADD-008': 'ไก่ทอดกรอบ',
    'SAN-ADD-009': 'ไก่คาราเกะ 🔥',
    'SAN-ADD-010': 'เบคอนกรอบ',
    'SAN-ADD-011': 'กุนเชียง',
    'SAN-ADD-012': 'ไส้กรอกรมควัน',
    'SAN-ADD-013': 'ไส้กรอกชีส',
    'SAN-ADD-014': 'หน่อไม้',
    'SAN-ADD-015': 'ซุปดาชิ ✨',
    'SAN-ADD-016': 'น้ำใบเตย',
    'SAN-ADD-017': 'แก้วพร้อมน้ำแข็ง +6',
    
    // Sauces
    'RS-SAU-001': 'ซอสมะเขือเทศ',
    'RS-SAU-002': 'น้ำปลาพริก',
    'RS-SAU-003': 'ซอสพริก',
    'RS-SAU-004': 'ซอสแม็กกี้',
    'RS-SAU-005': 'น้ำปลาหวาน',
    'RS-SAU-006': '🔴 น้ำจิ้มแจ่ว',
    'RS-SAU-007': '🟢 น้ำจิ้มซีฟู้ด',
    'RS-SAU-008': '🚫 ไม่ใส่ซอส',
    'NV-SAU-001': 'ซอสซีอิ๊ว',
    'NV-SAU-002': 'น้ำปลาพริก',
    'NV-SAU-003': 'น้ำจิ้มแจ่ว',
    'NV-SAU-004': 'น้ำจิ้มซีฟู้ด',
    'NV-SAU-005': '🚫 ไม่ใส่ซอส',
    
    // Spicy Levels
    'SAN-SPI-001': '(0) ไม่เผ็ด',
    'SAN-SPI-002': '(1) 🌶️ เผ็ดน้อย',
    'SAN-SPI-003': '(2) 🌶️🌶️ เผ็ดกลาง (สูตรซิกเนเจอร์) ✨',
    'SAN-SPI-004': '(3) 🌶️🌶️🌶️ เผ็ดมาก',
    'SAN-SPI-005': '(4) 🌶️🌶️🌶️🌶️ เผ็ดมากที่สุด',
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
