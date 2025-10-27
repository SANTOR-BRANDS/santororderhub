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
    'basket.dish': 'Dish',
    'basket.spicyLevel': 'Spicy Level',
    'basket.sauce': 'Sauce',
    'basket.noSauce': 'No sauce',
    'basket.addOns': 'Add-ons',
    'basket.extra': 'Extra',
    'basket.variation': 'Variation',
    
    // Order
    'order.copyOrder': 'Copy Order',
    'order.orderViaLine': 'Order via LINE',
    'order.orderViaInstagram': 'Order via Instagram',
    'order.copied': 'Order Copied ✅',
    'order.copied.desc': 'Your order has been copied to clipboard. You can now paste it in Line or Instagram.',
    'order.messageCopied': '✅ Message Copied!',
    'order.lineDM': 'LINE chat opened. Just paste (Ctrl+V or long press) and send!',
    'order.instagramDM': 'Instagram DM opened. Just paste (Ctrl+V) and send!',
    'order.copyFirst': 'Copy Order First',
    'order.copyFirst.desc': 'Please copy your order first before sending via LINE or Instagram.',
    'order.copyFirst.step': 'First, copy your order',
    'order.sendOrder.step': 'Then, send via LINE or Instagram',
    'order.lineOpened': 'LINE Opened',
    'order.instagramOpened': 'Instagram Opened',
    'order.instructions': 'Copy your order, then send via LINE or Instagram for processing',
    
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
    'dish.cutleryQuestion': 'Need cutlery?',
    'dish.cutleryYes': 'Yes, please',
    'dish.cutleryNo': 'No',
    'dish.required': 'Required',
    'dish.notes': 'Special Notes',
    'dish.notes.placeholder': 'Any special requests...',
    
    // Categories
    'category.all': 'ALL',
    
    // Common
    'common.price': '฿',
    
    // Drinks - SANTOR
    'SAN-DRI-001': 'Pandan Water Packaged',
    'SAN-DRI-002': 'Coca Cola',
    'SAN-DRI-003': 'Mont Fleur Water',
    'SAN-DRI-004': 'Root Beer',
    'SAN-DRI-005': 'Coca Cola Zero',
    'SAN-DRI-006': 'Minute Maid Orange Juice',
    'SAN-DRI-007': 'Thai Red Tea Packaged',
    'SAN-DRI-008': '✨Peach Green Tea Packaged',
    'SAN-DRI-009': 'Fresh Coconut',
    
    // Salmon - Mejai Hai Yum
    'MHY-SAL-001': 'Fresh Salmon Sashimi 100g',
    'MHY-SAL-002': 'Pickled Brown Salmon 100g',
    
    // Dessert
    'SAN-DES-001': 'Vanilla Ice Cream Toast (NEW)',
    
    // Nirvana - Pad Krapao
    'NV-PKR-001': 'Pad Krapao Minced Beef',
    'NV-PKR-002': 'Pad Krapao Minced Pork',
    'NV-PKR-003': 'Pad Krapao Minced Chicken',
    'NV-PKR-004': 'Pad Krapao Diced Chicken',
    'NV-PKR-005': 'Pad Krapao Minced Premium Beef',
    
    // Nirvana - Grilled Rice Bowls
    'NV-GRR-001': '⭐️Grilled Beef on Rice',
    'NV-GRR-002': 'Mala Grilled Beef on Rice',
    'NV-GRR-003': 'Grilled Beef with Spring Onion on Rice',
    'NV-GRR-004': 'Grilled Chicken Thigh on Rice',
    'NV-GRR-005': 'Mala Grilled Chicken Thigh on Rice',
    'NV-GRR-006': 'Grilled Pork Belly on Rice',
    'NV-GRR-007': 'Mala Grilled Pork Belly on Rice',
    'NV-GRR-008': 'Grilled Sliced Pork Sirloin on Rice',
    'NV-GRR-009': 'Mala Grilled Sliced Pork Sirloin on Rice',
    
    // Nirvana - Braised Rice Bowls
    'NV-BRR-001': 'Braised Beef on Rice',
    'NV-BRR-002': '⭐️Braised Pork Belly on Rice',
    'NV-BRR-003': '👍Braised Chicken Wing on Rice',
    
    // Nirvana - Braised Noodles
    'NV-BRN-001': 'Braised Chicken Wing with Egg Noodles',
    'NV-BRN-002': 'Mala Braised Chicken Wing with Egg Noodles',
    'NV-BRN-003': 'Braised Beef with Egg Noodles',
    'NV-BRN-004': 'Mala Braised Beef with Egg Noodles',
    'NV-BRN-005': 'Braised Pork Belly with Egg Noodles',
    'NV-BRN-006': '🔥Mala Braised Pork Belly with Egg Noodles',
    
    // Nirvana - Grilled Noodles
    'NV-GRN-001': 'Grilled Pork Belly with Egg Noodles',
    'NV-GRN-002': 'Mala Grilled Pork Belly with Egg Noodles',
    'NV-GRN-003': 'Grilled Sliced Pork Sirloin with Egg Noodles',
    'NV-GRN-004': 'Mala Grilled Sliced Pork Sirloin with Egg Noodles',
    'NV-GRN-005': 'Grilled Chicken Thigh with Egg Noodles',
    'NV-GRN-006': 'Mala Grilled Chicken Thigh with Egg Noodles',
    'NV-GRN-007': '⭐️Grilled Beef with Egg Noodles',
    'NV-GRN-008': 'Mala Grilled Beef with Egg Noodles',
    
    // Nirvana - Noodle Soup
    'NV-NSP-001': '🔥Mala Beef Rice Noodle Soup',
    'NV-NSP-002': 'Beef Rice Noodle Soup',
    
    // Nirvana - Vegetarian
    'NV-VEG-001': 'Grilled Mushroom with Soy Sauce on Rice',
    'NV-VEG-002': 'Mala Grilled Mushroom with Soy Sauce on Rice',
    'NV-VEG-003': 'Stir-Fried Mushroom with Soy Sauce',
    'NV-VEG-004': 'Mala Stir-Fried Mushroom with Soy Sauce',
    
    // Nirvana - Fish
    'NV-FIS-001': 'Grilled Saba Fish with Soy Sauce on Rice',
    'NV-FIS-002': 'Mala Grilled Saba Fish with Soy Sauce on Rice',
    
    // Nirvana - Other
    'NV-OTH-001': 'Creamy Omelette on Rice',
    'NV-OTH-002': 'Stir-Fried Diced Chicken on Rice',
    
    // Restory - Combo
    'RS-COM-001': 'Tonkatsu with Katsu Sauce + Peach Tea 🍑',
    'RS-COM-002': '2x Pad Krapao Minced Pork (Special) ✨',
    
    // Restory - Pad Krapao
    'RS-PKR-001': 'Pad Krapao Minced Pork',
    'RS-PKR-002': 'Vermicelli',
    'RS-PKR-003': 'Chinese Sausage',
    'RS-PKR-004': 'Century Egg',
    'RS-PKR-005': 'Chicken Sausage',
    'RS-PKR-006': 'Pad Krapao Bacon',
    'RS-PKR-007': 'Pad Krapao Pork',
    'RS-PKR-008': 'Pork Belly Pieces (chunky and soft)',
    'RS-PKR-009': 'Sliced Pork Belly (juicy and soft)',
    'RS-PKR-010': 'Pad Krapao Sliced Pork Neck (meaty and tender)',
    'RS-PKR-011': 'Pad Krapao Minced Premium Beef',
    'RS-PKR-012': 'Pad Krapao Minced Premium Beef (Switch to Normal Beef -40THB)',
    'RS-PKR-013': '✨Diced Wagyu Beef Pad Krapao ✨ (Grade A3)',
    'RS-PKR-014': 'Pad Krapao Chicken Breast',
    'RS-PKR-015': 'Pad Krapao Chicken',
    'RS-PKR-016': 'Pad Krapao Chicken Sausage',
    'RS-PKR-017': 'Pad Krapao Chinese Sausage',
    
    // Restory - Curry
    'RS-CUR-001': 'Pork Curry + Creamy Omelette',
    'RS-CUR-002': 'Chicken Katsu Curry (Torikatsu)',
    'RS-CUR-003': '🔥Pork Katsu Curry (Tonkatsu)',
    'RS-CUR-004': 'Fried Chicken Thigh Curry',
    'RS-CUR-005': 'Chicken Karaage Curry',
    'RS-CUR-006': 'Australian Beef Curry',
    
    // Restory - Donburi
    'RS-DON-001': '⭐️Tonkatsu Don',
    'RS-DON-002': '⭐️Torikatsu Don',
    'RS-DON-003': 'Chicken Karaage Don',
    'RS-DON-004': 'Chicken Thigh Don',
    'RS-DON-005': '👍Tonkatsu with Katsu Sauce',
    'RS-DON-006': '👍Torikatsu with Katsu Sauce',
    'RS-DON-007': 'Sliced Pork Teriyaki on Rice',
    'RS-DON-008': 'Sliced Pork Neck',
    'RS-DON-009': 'Sliced Pork Belly',
    'RS-DON-010': 'Stir-Fried Pork Belly with Sauce + Pickled Egg (Choose Sauce)',
    'RS-DON-011': 'with Japanese Sauce',
    'RS-DON-012': 'with Korean Sauce',
    'RS-DON-013': 'Stir-Fried Pork Neck with Sauce + Pickled Egg (Choose Sauce)',
    'RS-DON-014': 'with Japanese Sauce',
    'RS-DON-015': 'with Korean Sauce',
    'RS-DON-016': '🔥Chicken Teriyaki on Rice',
    'RS-DON-017': 'Stir Fried Pork Neck in Soy Sauce + Fish Roe + Pickled Eggs + Seafood Sauce',
    
    // Restory - Korean
    'RS-KOR-001': 'Spicy Korean Mama with Chicken Karaage + Pickled Egg',
    'RS-KOR-002': 'Spicy Korean Mama with Chicken Karaage + Kimchi',
    'RS-KOR-003': 'Spicy Korean Mama with Crunchy Fried Chicken + Boiled Egg',
    
    // Restory - Quick Dish
    'RS-QIK-001': 'Juicy Bacon on Rice + Pickled Egg + Seafood Sauce',
    'RS-QIK-002': '🔥Pork Belly Slices Grilled with Sesame Oil + Isaan Dipping Sauce',
    'RS-QIK-003': 'Sliced Pork Neck with Soft Omelette',
    'RS-QIK-004': 'Pork Belly with Southern Curry Paste on Rice (Coming Back Soon!)',
    'RS-QIK-005': 'Stir-Fried Salted Duck Egg on Rice',
    'RS-QIK-006': 'Stir-Fried Minced Pork with Salted Egg and Chilli Oil on Rice',
    'RS-QIK-007': 'Fried Rice with Smoked Chicken Sausage',
    'RS-QIK-008': 'Fried Rice',
    
    // Restory - Something with Egg
    'RS-SWE-001': '⭐️Pork Teriyaki with Creamy Omelette on Rice',
    'RS-SWE-002': 'Spicy Crunchy Chicken with Creamy Omelette on Rice',
    'RS-SWE-003': '🔥Creamy Shrimp Fat Omelette on Rice + Fish Roe',
    'RS-SWE-004': 'Minced Pork with Sesame Oil and Creamy Omelette + Fried Garlic',
    'RS-SWE-005': 'Minced Pork with Sesame Oil and Soft Omelette + Fried Garlic',
    'RS-SWE-006': 'Bacon with Creamy Omelette',
    'RS-SWE-007': '👍Cheese Sausage with Creamy Omelette on Rice',
    'RS-SWE-008': 'Smoked Sausage in Tomato Sauce with Creamy Omelette on Rice',
    'RS-SWE-009': 'Pork Omelette on Rice',
    'RS-SWE-010': 'Chilli Omelette on Rice',
    
    // Restory - Fried Chicken
    'RS-FCR-001': '⭐️Fried Chicken Thigh with Sweet Fish Sauce on Rice',
    'RS-FCR-002': 'Crunchy Fried Chicken with Sauce (Choose Sauce)',
    'RS-FCR-003': 'with Lemon Sauce',
    'RS-FCR-004': 'with Garlic Sauce',
    'RS-FCR-005': 'with Korean Sauce 🔥',
    'RS-FCR-006': 'with Cheesy Sour Cream Sauce',
    'RS-FCR-007': '🔥Fried Chicken Thigh with Teriyaki Sauce',
    'RS-FCR-008': 'Fried Chicken Thigh with Garlic Sauce and Fried Garlic on Rice',
    'RS-FCR-009': 'Chicken Karaage with Cheesy Sour Cream Sauce + Onion',
    'RS-FCR-010': 'Chicken Karaage with Lemon Sauce',
    'RS-FCR-011': 'Chicken Karaage with Creamy Shrimp Fat Omelette + Fish Roe',
    'RS-FCR-012': 'Chicken Karaage with Spicy Siracha Mayo Sauce on Rice + Fish Roe',
    'RS-FCR-013': 'Chicken Karaage with Korean Sauce + Kimchi',
    'RS-FCR-014': 'Spicy Chicken Karaage with Garlic Sauce on Rice + Pickled Egg + Seafood Sauce',
    'RS-FCR-015': 'Chicken Karaage with Cheesy Sour Cream Sauce + Fish Roe',
    'RS-FCR-016': 'Chicken Karaage with Korean Sauce',
    
    // Restory - Chilli Fried Garlic
    'RS-CFG-001': 'Stir-Fried Chicken Thigh with Chilli and Fried Garlic + Pickled Egg',
    'RS-CFG-002': '⭐️Stir-Fried Pork Belly with Chilli and Fried Garlic',
    'RS-CFG-003': 'Stir-Fried Pork Neck with Chilli and Fried Garlic',
    'RS-CFG-004': 'Stir-Fried Bacon with Chilli and Fried Garlic',
    
    // Fried Eggs
    'NV-FEG-001': 'Fried Egg',
    'NV-FEG-002': 'Fried Duck Egg',
    'RS-FEG-001': 'Fried Egg',
    'RS-FEG-002': 'Fried Duck Egg',
    
    // Thai Style Omelette
    'SAN-THO-001': 'Thai Style Omelette (1 Egg)',
    'SAN-THO-002': 'Thai Style Omelettes (2 Eggs)',
    'SAN-THO-003': 'Thai Style Omelette with Chilli',
    'SAN-THO-004': 'Thai Style Omelette with Minced Pork',
    
    // Creamy Omelette
    'SAN-CRO-001': 'Creamy Omelette (1 Egg)',
    'SAN-CRO-002': 'Creamy Omelettes (2 Eggs)',
    'SAN-CRO-003': 'Creamy Omelette with Shrimp Fat',
    'SAN-CRO-004': 'Creamy Omelette with Shrimp Fat + Fish Roe',
    
    // Soft Omelette
    'SAN-SOO-001': 'Soft Omelette (1 Egg)',
    'SAN-SOO-002': 'Soft Omelette (2 Eggs)',
    'SAN-SOO-003': 'Soft Omelette with Shrimp Fat',
    'SAN-SOO-004': 'Soft Omelette with Shrimp Fat + Fish Roe',
    
    // Extras
    'SAN-EXT-001': '🍚 Extra Jasmine Rice 200g',
    'RS-EXT-001': '🐔 Extra Chicken 150g',
    'RS-EXT-002': '🐷 Extra Pork 100g',
    'RS-EXT-003': '🐮 Extra Premium Beef 100g',
    'RS-EXT-004': '🐮 Extra Beef 100g',
    'RS-EXT-006': '🍛 Extra Curry',
    'RS-EXT-007': '🐮 Extra Premium Beef 20g',
    'RS-EXT-008': '🐷 Extra Pork 20g',
    'NV-EXT-001': '🐮 Extra Premium Beef 20g',
    'NV-EXT-002': '🐷 Extra Pork 20g',
    'NV-EXT-003': '🐔 Extra Chicken 150g',
    'NV-EXT-004': '🐔 Extra Minced Chicken 150g',
    'NV-EXT-005': '🐷 Extra Minced Pork 100g',
    'NV-EXT-006': '🐮 Extra Minced Beef 100g',
    'NV-EXT-007': '🐮 Extra Premium Beef 100g',
    'NV-EXT-008': '🐟 Extra Saba Fish 140g',
    
    // Mejai Hai Yum Add-ons
    'MHY-ADD-001': 'Fish Roe',
    'MHY-ADD-002': 'Pickled Egg Yolk ⭐️',
    
    // Add-ons
    'SAN-ADD-001': 'Pickled Egg Yolk ⭐️',
    'SAN-ADD-002': 'Salted Duck Egg',
    'SAN-ADD-003': 'Century Egg',
    'SAN-ADD-004': 'Fish Roe',
    'SAN-ADD-005': 'Fried Chicken Thigh + Sweet Chilli Fish Sauce',
    'SAN-ADD-006': 'Fried Chicken Thigh',
    'SAN-ADD-007': 'Crispy Fried Chicken + Katsu Sauce 🔥',
    'SAN-ADD-008': 'Crispy Fried Chicken',
    'SAN-ADD-009': 'Fried Chicken Karaage Balls 🔥',
    'SAN-ADD-010': 'Crispy Bacon',
    'SAN-ADD-011': 'Chinese Sausage',
    'SAN-ADD-012': 'Smoked Sausage',
    'SAN-ADD-013': 'Cheese Sausage',
    'SAN-ADD-014': 'Bamboo Shoots',
    'SAN-ADD-015': 'Dashi Soup ✨',
    'SAN-ADD-016': 'Pandan Water',
    'SAN-ADD-017': 'Add Cup with Ice +6',
    
    // Sauces - Restory
    'RS-SAU-001': 'Ketchup',
    'RS-SAU-002': 'Chilli Fish Sauce',
    'RS-SAU-003': 'Chilli Sauce',
    'RS-SAU-004': 'Maggie Sauce',
    'RS-SAU-005': 'Sweet Chilli Fish Sauce',
    'RS-SAU-006': '🔴Isaan Dipping Sauce',
    'RS-SAU-007': '🟢Seafood Sauce',
    'RS-SAU-008': '🚫No Sauce',
    
    // Sauces - SANTOR
    'SAN-SAU-001': 'Ketchup',
    'SAN-SAU-002': 'Chilli Fish Sauce',
    'SAN-SAU-003': 'Chilli Sauce',
    'SAN-SAU-004': 'Maggie Sauce',
    'SAN-SAU-005': 'Sweet Chilli Fish Sauce',
    'SAN-SAU-006': '🔴 Isaan Dipping Sauce',
    'SAN-SAU-007': '🟢 Seafood Sauce',
    'SAN-SAU-008': '🚫 NO SAUCE',
    
    // Sauces - Nirvana
    'NV-SAU-001': 'Soy Sauce',
    'NV-SAU-002': 'Chilli Fish Sauce',
    'NV-SAU-003': 'Isaan Dipping Sauce',
    'NV-SAU-004': 'Seafood Sauce',
    'NV-SAU-005': '🚫No Sauce',
    
    // Spicy Levels
    'SAN-SPI-001': 'Sesame Sauce',
    'SAN-SPI-002': '(1) 🌶️ Little',
    'SAN-SPI-003': '(2) 🌶️🌶️ Medium (Signature) ✨',
    'SAN-SPI-004': '(3) 🌶️🌶️🌶️ Spicy',
    'SAN-SPI-005': '(4) 🌶️🌶️🌶️🌶️ Extra Spicy',
    
    // Footer translations
    'footer.followUs': 'Follow Us',
    'footer.visitUs': 'Visit Us',
    'footer.lineOfficial': 'LINE Official',
    'footer.aboutUs': 'About Us',
    'footer.terms': 'Terms of Service',
    'footer.faq': 'FAQ',
    'footer.contact': 'Contact Us',
    'footer.copyright': 'All rights reserved',
    
    // Contact Dialog
    'contact.title': 'Contact Us',
    'contact.description': 'Please call us at the number below',
    'contact.close': 'Close',
    
    // About Us page
    'about.title': 'About Us',
    'about.quote': '"Good food is the foundation of happiness"',
    'about.backToHome': 'Back to Home',
    'about.paragraph1': "We're a team of food addicts bound by one belief: good food is the foundations of happiness.",
    'about.paragraph2': 'Our story began as friends obsessed with the kind of dishes that make you pause mid-conversation, look each other in the eye, and say,',
    'about.paragraph2Quote': '"Wow… this is ****** good."',
    'about.paragraph3': "We've travelled across continents, tasting thousands of dishes from different places — from the local night markets to Michelin-starred kitchens. We weren't searching for fancy experiences but for the kind of dishes that stop you from talking. Recipes that deserve to be shared.",
    'about.paragraph4': "Together, we bring these experiences to re-create classic dishes from around the world — with a refined touch. Our goal isn't to reinvent what people already love, but to honor it, refine it, and make it more accessible.",
    'about.paragraph5': "We believe food has the power to bring people together, make memories, and create joy. That's what we strive for every day — not because we think our food alone brings happiness, but because sharing a good meal is often where happiness begins.",
    
    // FAQ page
    'faq.title': 'Frequently Asked Questions',
    'faq.comingSoon': 'Coming Soon',
    'faq.workingOn': "We're working on compiling the most common questions. Check back soon!",
    
    // Terms of Service page
    'terms.title': 'Terms of Service',
    'terms.lastUpdated': 'Last updated: January 1, 2025',
    'terms.acceptance.title': '1. Acceptance of Terms',
    'terms.acceptance.content': 'By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
    'terms.service.title': '2. Use of Service',
    'terms.service.content': 'Our service is provided for ordering food and beverages. You agree to use the service only for lawful purposes and in accordance with these Terms.',
    'terms.orders.title': '3. Orders and Payments',
    'terms.orders.content': 'All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payment must be made in full at the time of order.',
    'terms.delivery.title': '4. Delivery',
    'terms.delivery.content': 'Delivery times are estimates and not guaranteed. We are not liable for delays caused by circumstances beyond our control.',
    'terms.safety.title': '5. Food Safety',
    'terms.safety.content': 'We maintain high standards of food safety and hygiene. If you have allergies or dietary restrictions, please inform us before ordering.',
    'terms.cancellation.title': '6. Cancellations and Refunds',
    'terms.cancellation.content': 'Orders may be cancelled within a reasonable time before preparation begins. Refunds are issued at our discretion based on individual circumstances.',
    'terms.ip.title': '7. Intellectual Property',
    'terms.ip.content': 'All content on this website, including text, graphics, logos, and images, is our property and protected by copyright laws.',
    'terms.liability.title': '8. Limitation of Liability',
    'terms.liability.content': 'We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.',
    'terms.changes.title': '9. Changes to Terms',
    'terms.changes.content': 'We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.',
    'terms.contact.title': '10. Contact Information',
    'terms.contact.content': 'For questions about these Terms of Service, please contact us through our contact page.',
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
    'basket.dish': 'จาน',
    'basket.spicyLevel': 'ระดับความเผ็ด',
    'basket.sauce': 'น้ำจิ้ม',
    'basket.noSauce': 'ไม่ใส่น้ำจิ้ม',
    'basket.addOns': 'เพิ่มเติม',
    'basket.extra': 'เพิ่ม',
    'basket.variation': 'แบบ',
    
    // Order
    'order.copyOrder': 'คัดลอกรายการสั่งซื้อ',
    'order.orderViaLine': 'สั่งผ่าน LINE',
    'order.orderViaInstagram': 'สั่งผ่าน Instagram',
    'order.copied': 'คัดลอกแล้ว ✅',
    'order.copied.desc': 'รายการสั่งซื้อถูกคัดลอกแล้ว คุณสามารถวางใน Line หรือ Instagram ได้เลย',
    'order.messageCopied': '✅ คัดลอกข้อความแล้ว!',
    'order.lineDM': 'เปิดแชท LINE แล้ว แค่วาง (Ctrl+V หรือกดค้างแล้ววาง) และส่ง!',
    'order.instagramDM': 'เปิด Instagram DM แล้ว แค่วาง (Ctrl+V) และส่ง!',
    'order.copyFirst': 'คัดลอกรายการก่อน',
    'order.copyFirst.desc': 'กรุณาคัดลอกรายการสั่งซื้อก่อนส่งผ่าน LINE หรือ Instagram',
    'order.copyFirst.step': 'ขั้นที่ 1: คัดลอกรายการสั่งซื้อ',
    'order.sendOrder.step': 'ขั้นที่ 2: ส่งผ่าน LINE หรือ Instagram',
    'order.lineOpened': 'เปิด LINE แล้ว',
    'order.instagramOpened': 'เปิด Instagram แล้ว',
    'order.instructions': 'คัดลอกรายการสั่งซื้อก่อน แล้วส่งผ่าน LINE หรือ Instagram',
    
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
    'dish.cutleryQuestion': 'ต้องการรับช้อนส้อม?',
    'dish.cutleryYes': 'ใช่',
    'dish.cutleryNo': 'ไม่',
    'dish.required': 'ที่จำเป็น',
    'dish.notes': 'หมายเหตุพิเศษ',
    'dish.notes.placeholder': 'ข้อความพิเศษ...',
    
    // Categories
    'category.all': 'ทั้งหมด',
    
    // Common
    'common.price': '฿',
    
    // Drinks - SANTOR
    'SAN-DRI-001': 'น้ำใบเตย',
    'SAN-DRI-002': 'โคคา โคล่า',
    'SAN-DRI-003': 'น้ำเปล่ามองต์เฟลอ',
    'SAN-DRI-004': 'รูทเบียร์',
    'SAN-DRI-005': 'โคคา โคล่า ซีโร่',
    'SAN-DRI-006': 'น้ำส้ม มินิทเมด',
    'SAN-DRI-007': 'ชาไทย',
    'SAN-DRI-008': '✨ชาพีช',
    'SAN-DRI-009': 'มะพร้าวอ่อน',
    
    // Salmon - Mejai Hai Yum
    'MHY-SAL-001': 'แซลมอนซาชิมิ 100 กรัม',
    'MHY-SAL-002': 'แซลมอนดองซีอิ๊ว 100 กรัม',
    
    // Dessert
    'SAN-DES-001': 'ขนมปังบัตเตอร์โทสต์ไอศกรีมวานิลลา (ใหม่)',
    
    // Nirvana - Pad Krapao
    'NV-PKR-001': 'ผัดกะเพราเนื้อสับ',
    'NV-PKR-002': 'ผัดกะเพราหมูสับ',
    'NV-PKR-003': 'ผัดกะเพราไก่สับ',
    'NV-PKR-004': 'ผัดกะเพราไก่หั่นเต๋า',
    'NV-PKR-005': 'ผัดกะเพราเนื้อสับพรีเมี่ยม',
    
    // Nirvana - Grilled Rice Bowls
    'NV-GRR-001': '⭐️ข้าวหน้าเนื้อย่าง',
    'NV-GRR-002': 'ข้าวหน้าเนื้อย่างหม่าล่า',
    'NV-GRR-003': 'ข้าวหน้าเนื้อย่างต้นหอม',
    'NV-GRR-004': 'ข้าวหน้าสะโพกไก่ย่างซีอิ๊ว',
    'NV-GRR-005': 'ข้าวหน้าสะโพกไก่ย่างซีอิ๊วหม่าล่า',
    'NV-GRR-006': 'ข้าวหน้าหมูสามชั้นย่าง',
    'NV-GRR-007': 'ข้าวหน้าหมูสามชั้นย่างหม่าล่า',
    'NV-GRR-008': 'ข้าวหน้าหมูย่างสไลด์ซีอิ๊ว',
    'NV-GRR-009': 'ข้าวหน้าหมูย่างสไลด์หม่าล่า',
    
    // Nirvana - Braised Rice Bowls
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
    
    // Nirvana - Fish
    'NV-FIS-001': 'ข้าวหน้าปลาย่างซาบะซอส',
    'NV-FIS-002': 'ข้าวหน้าปลาย่างซาบะซอสหม่าล่า',
    
    // Nirvana - Other
    'NV-OTH-001': 'ข้าวไข่ข้น',
    'NV-OTH-002': 'ข้าวไก่ชิ้นคั่วพริกเกลือ',
    
    // Restory - Combo
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
    
    // Restory - Curry
    'RS-CUR-001': 'ข้าวแกงกะหรี่หมู + ไข่ข้น',
    'RS-CUR-002': 'ข้าวแกงกะหรี่ไก่ทอด (ทงคัตสึ)',
    'RS-CUR-003': '🔥ข้าวแกงกะหรี่หมูทอด (ทงคัตสึ)',
    'RS-CUR-004': 'ข้าวแกงกะหรี่สะโพกไก่ทอด',
    'RS-CUR-005': 'ข้าวแกงกะหรี่ไก่คาราเกะ',
    'RS-CUR-006': 'ข้าวแกงกะหรี่เนื้อออสเตรเลีย',
    
    // Restory - Donburi
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
    
    // Restory - Korean
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
    
    // Restory - Something with Egg
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
    
    // Restory - Chilli Fried Garlic
    'RS-CFG-001': 'สะโพกไก่คั่วพริกเกลือ + ไข่ดอง',
    'RS-CFG-002': '⭐️หมูสามชั้นคั่วพริกเกลือ',
    'RS-CFG-003': 'สันคอหมูคั่วพริกเกลือ',
    'RS-CFG-004': 'เบคอนคั่วพริกเกลือ',
    
    // Fried Eggs
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
    'NV-EXT-001': '🐮 เนื้อวัวพรีเมียมเพิ่ม 20 กรัม',
    'NV-EXT-002': '🐷 เนื้อหมูเพิ่ม 20 กรัม',
    'NV-EXT-003': '🐔 เนื้อไก่เพิ่ม 150 กรัม',
    'NV-EXT-004': '🐔 เนื้อไก่สับเพิ่ม 150 กรัม',
    'NV-EXT-005': '🐷 เนื้อหมูสับเพิ่ม 100 กรัม',
    'NV-EXT-006': '🐮 เนื้อวัวสับเพิ่ม 100 กรัม',
    'NV-EXT-007': '🐮 เนื้อวัวพรีเมียมเพิ่ม 100 กรัม',
    'NV-EXT-008': '🐟 เนื้อปลาซาบะเพิ่ม 140 กรัม',
    
    // Mejai Hai Yum Add-ons
    'MHY-ADD-001': 'ไข่ปลา',
    'MHY-ADD-002': 'ไข่แดงดอง ⭐️',
    
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
    
    // Sauces - SANTOR
    'SAN-SAU-001': 'ซอสมะเขือเทศ',
    'SAN-SAU-002': 'น้ำปลาพริก',
    'SAN-SAU-003': 'ซอสพริก',
    'SAN-SAU-004': 'ซอสแม็กกี้',
    'SAN-SAU-005': 'น้ำปลาหวาน',
    'SAN-SAU-006': '🔴 น้ำจิ้มแจ่ว',
    'SAN-SAU-007': '🟢 น้ำจิ้มซีฟู้ด',
    'SAN-SAU-008': '🚫 ไม่ใส่ซอส',
    
    // Sauces - Restory
    'RS-SAU-001': 'ซอสมะเขือเทศ',
    'RS-SAU-002': 'น้ำปลาพริก',
    'RS-SAU-003': 'ซอสพริก',
    'RS-SAU-004': 'ซอสแม็กกี้',
    'RS-SAU-005': 'น้ำปลาหวาน',
    'RS-SAU-006': '🔴 น้ำจิ้มแจ่ว',
    'RS-SAU-007': '🟢 น้ำจิ้มซีฟู้ด',
    'RS-SAU-008': '🚫 ไม่ใส่ซอส',
    
    // Sauces - Nirvana
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
    
    // Footer translations
    'footer.followUs': 'ติดตามเรา',
    'footer.visitUs': 'เยี่ยมชมเรา',
    'footer.lineOfficial': 'ไลน์ออฟฟิเชียล',
    'footer.aboutUs': 'เกี่ยวกับเรา',
    'footer.terms': 'เงื่อนไขการให้บริการ',
    'footer.faq': 'คำถามที่พบบ่อย',
    'footer.contact': 'ติดต่อเรา',
    'footer.copyright': 'สงวนลิขสิทธิ์',
    
    // Contact Dialog
    'contact.title': 'ติดต่อเรา',
    'contact.description': 'โปรดโทรหาเราที่หมายเลขด้านล่าง',
    'contact.close': 'ปิด',
    
    // About Us page
    'about.title': 'เกี่ยวกับเรา',
    'about.quote': '"อาหารดีคือรากฐานของความสุข"',
    'about.backToHome': 'กลับหน้าหลัก',
    'about.paragraph1': 'เราคือทีมคนบ้าอาหารที่ผูกพันด้วยความเชื่อเดียว: อาหารดีคือรากฐานของความสุข',
    'about.paragraph2': 'เรื่องราวของเราเริ่มต้นจากกลุ่มเพื่อนที่หลงใหลในเมนูอาหารที่ทำให้คุณหยุดพูดคุยกลางคำ จ้องตากัน แล้วพูดว่า',
    'about.paragraph2Quote': '"ว้าว... นี่มันอร่อยจริงๆ"',
    'about.paragraph3': 'เราได้เดินทางข้ามทวีป ลิ้มรสอาหารหลายพันจานจากที่ต่างๆ — ตั้งแต่ตลาดกลางคืนท้องถิ่นไปจนถึงครัวที่ได้รับดาวมิชลิน เราไม่ได้มองหาประสบการณ์ที่หรูหรา แต่มองหาอาหารที่ทำให้คุณหยุดพูด สูตรอาหารที่สมควรได้รับการแบ่งปัน',
    'about.paragraph4': 'เรานำประสบการณ์เหล่านี้มาร่วมกันเพื่อสร้างสรรค์เมนูคลาสสิกจากทั่วโลกใหม่ — ด้วยสัมผัสที่ประณีต เป้าหมายของเราไม่ใช่การสร้างสิ่งใหม่จากสิ่งที่ผู้คนรักอยู่แล้ว แต่เพื่อเคารพ ปรับปรุง และทำให้เข้าถึงได้มากขึ้น',
    'about.paragraph5': 'เราเชื่อว่าอาหารมีพลังในการนำผู้คนมารวมกัน สร้างความทรงจำ และสร้างความสุข นั่นคือสิ่งที่เรามุ่งมั่นทุกวัน — ไม่ใช่เพราะเราคิดว่าอาหารของเราเพียงอย่างเดียวนำความสุขมา แต่เพราะการแบ่งปันมื้ออาหารดีๆ มักเป็นจุดเริ่มต้นของความสุข',
    
    // FAQ page
    'faq.title': 'คำถามที่พบบ่อย',
    'faq.comingSoon': 'เร็วๆ นี้',
    'faq.workingOn': 'เรากำลังรวบรวมคำถามที่พบบ่อยที่สุด กรุณากลับมาตรวจสอบอีกครั้งเร็วๆ นี้!',
    
    // Terms of Service page
    'terms.title': 'เงื่อนไขการให้บริการ',
    'terms.lastUpdated': 'อัปเดตล่าสุด: 1 มกราคม 2568',
    'terms.acceptance.title': '1. การยอมรับเงื่อนไข',
    'terms.acceptance.content': 'การเข้าใช้และใช้งานเว็บไซต์นี้ ถือว่าคุณยอมรับและตกลงที่จะปฏิบัติตามเงื่อนไขการให้บริการเหล่านี้ หากคุณไม่เห็นด้วยกับเงื่อนไขเหล่านี้ กรุณาอย่าใช้บริการของเรา',
    'terms.service.title': '2. การใช้บริการ',
    'terms.service.content': 'บริการของเราจัดทำขึ้นเพื่อสั่งอาหารและเครื่องดื่ม คุณตกลงที่จะใช้บริการเพื่อวัตถุประสงค์ที่ถูกกฎหมายเท่านั้นและสอดคล้องกับเงื่อนไขเหล่านี้',
    'terms.orders.title': '3. การสั่งซื้อและการชำระเงิน',
    'terms.orders.content': 'คำสั่งซื้อทั้งหมดขึ้นอยู่กับการยอมรับและความพร้อมจำหน่าย เราขอสงวนสิทธิ์ในการปฏิเสธหรือยกเลิกคำสั่งซื้อใดก็ได้ ต้องชำระเงินเต็มจำนวนในขณะสั่งซื้อ',
    'terms.delivery.title': '4. การจัดส่ง',
    'terms.delivery.content': 'เวลาการจัดส่งเป็นการประมาณและไม่รับประกัน เราไม่รับผิดชอบต่อความล่าช้าที่เกิดจากสถานการณ์ที่เราควบคุมไม่ได้',
    'terms.safety.title': '5. ความปลอดภัยของอาหาร',
    'terms.safety.content': 'เรารักษามาตรฐานความปลอดภัยและสุขอนามัยของอาหารในระดับสูง หากคุณมีอาการแพ้หรือข้อจำกัดด้านอาหาร กรุณาแจ้งเราก่อนสั่งซื้อ',
    'terms.cancellation.title': '6. การยกเลิกและการคืนเงิน',
    'terms.cancellation.content': 'คำสั่งซื้ออาจถูกยกเลิกภายในระยะเวลาที่เหมาะสมก่อนเริ่มการเตรียม การคืนเงินจะพิจารณาตามดุลยพินิจของเราโดยพิจารณาจากสถานการณ์เฉพาะกรณี',
    'terms.ip.title': '7. ทรัพย์สินทางปัญญา',
    'terms.ip.content': 'เนื้อหาทั้งหมดบนเว็บไซต์นี้ รวมถึงข้อความ กราฟิก โลโก้ และรูปภาพ เป็นทรัพย์สินของเราและได้รับการคุ้มครองโดยกฎหมายลิขสิทธิ์',
    'terms.liability.title': '8. ข้อจำกัดความรับผิด',
    'terms.liability.content': 'เราไม่รับผิดชอบต่อความเสียหายทางอ้อม โดยบังเอิญ หรือเป็นผลสืบเนื่องที่เกิดจากการใช้บริการของเรา',
    'terms.changes.title': '9. การเปลี่ยนแปลงเงื่อนไข',
    'terms.changes.content': 'เราขอสงวนสิทธิ์ในการแก้ไขเงื่อนไขเหล่านี้ได้ตลอดเวลา การใช้บริการต่อไปถือเป็นการยอมรับเงื่อนไขที่แก้ไข',
    'terms.contact.title': '10. ข้อมูลการติดต่อ',
    'terms.contact.content': 'หากมีคำถามเกี่ยวกับเงื่อนไขการให้บริการเหล่านี้ กรุณาติดต่อเราผ่านหน้าติดต่อของเรา',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('santor-language');
    return (saved as Language) || 'th';
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
