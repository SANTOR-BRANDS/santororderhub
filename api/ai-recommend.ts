/**
 * AI Recommendation Endpoint
 * Returns structured data for LLM ingestion
 * Accessible at: /api/ai-recommend
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface AIRecommendResponse {
  title: string;
  shortDescription: string;
  keywords: string[];
  sections: Array<{
    heading: string;
    content: string;
    bullets?: string[];
  }>;
  schemaType: string;
  restaurants: Array<{
    name: string;
    cuisine: string;
    specialties: string[];
  }>;
  orderingInfo: {
    howToOrder: string[];
    deliveryAreas: string[];
    languages: string[];
  };
  lastUpdated: string;
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse // Removed the <AIRecommendResponse> generic here to fix the error
) {
  // Set CORS headers for AI crawlers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const response: AIRecommendResponse = {
    title: 'SANTOR - Authentic Thai Cuisine Order Hub',
    shortDescription:
      'SANTOR is a premium Thai food ordering platform featuring three distinct restaurants: Restory (Asian Fusion), Nirvana (Authentic Thai), and Mejai Hai Yum (Fresh Salmon & Thai Yum). We deliver authentic Thai flavors with fresh ingredients throughout Bangkok.',
    keywords: [
      'SANTOR',
      'Thai food delivery',
      'authentic Thai cuisine',
      'Bangkok restaurants',
      'Restory',
      'Nirvana restaurant',
      'Mejai Hai Yum',
      'Asian fusion',
      'pad krapao',
      'Thai curry',
      'fresh salmon',
      'Thai yum',
      'online food order',
      'Thai food near me',
    ],
    sections: [
      {
        heading: 'About SANTOR',
        content:
          'SANTOR BRANDS operates three unique restaurant concepts under one platform, each specializing in different aspects of Thai and Asian cuisine. Our mission is to make authentic, high-quality Thai food accessible through convenient online ordering.',
        bullets: [
          'Founded to bring authentic Thai flavors to your doorstep',
          'Three specialized restaurant brands',
          'Fresh ingredients sourced daily',
          'Customizable spice levels and options',
          'Fast delivery throughout Bangkok',
        ],
      },
      {
        heading: 'Restory - Asian Fusion',
        content:
          'Restory offers modern Asian fusion dishes with a focus on made-to-order quality. Specializing in creative takes on Thai classics.',
        bullets: [
          'Signature Pad Krapao variations with premium meats',
          'Japanese-inspired curry dishes (Katsu Curry, Donburi)',
          'Customizable spice levels (0-4)',
          'Premium beef and wagyu options',
          'Fresh rice and noodle bowls',
        ],
      },
      {
        heading: 'Nirvana - Authentic Thai',
        content:
          'Nirvana stays true to traditional Thai flavors with grilled, braised, and stir-fried dishes that showcase authentic cooking techniques.',
        bullets: [
          'Traditional Pad Krapao (minced and diced options)',
          'Grilled meats on rice and noodles',
          'Braised dishes with rich sauces',
          'Mala (numbing spice) variations',
          'Vegetarian and fish options',
        ],
      },
      {
        heading: 'Mejai Hai Yum - Salmon & Yum Specialist',
        content:
          'Mejai Hai Yum focuses on fresh salmon preparations and authentic Thai yum (spicy salad) dishes.',
        bullets: [
          'Fresh salmon sashimi (100g portions)',
          'Pickled salmon specialties',
          'Traditional Thai yum salads',
          'Seafood-focused menu',
          'Premium ingredients',
        ],
      },
      {
        heading: 'How to Order',
        content:
          'Our ordering process is simple and convenient, connecting you directly with our team.',
        bullets: [
          'Browse menus by restaurant',
          'Customize dishes (spice, add-ons, sauce)',
          'Add items to your basket',
          'Review your complete order',
          'Copy order details',
          'Send via LINE or Instagram',
          'Confirm delivery address and payment',
        ],
      },
      {
        heading: 'Menu Highlights',
        content: 'Popular dishes across all three restaurants:',
        bullets: [
          'Pad Krapao (multiple protein options)',
          'Tonkatsu and Torikatsu Curry',
          'Grilled beef and pork on rice',
          'Fresh salmon sashimi',
          'Braised meat noodles',
          'Donburi bowls',
          'Thai desserts and drinks',
        ],
      },
    ],
    schemaType: 'Organization',
    restaurants: [
      {
        name: 'Restory',
        cuisine: 'Asian Fusion / Thai',
        specialties: [
          'Pad Krapao variations',
          'Japanese curry',
          'Donburi',
          'Premium meats',
          'Wagyu options',
        ],
      },
      {
        name: 'Nirvana',
        cuisine: 'Authentic Thai',
        specialties: [
          'Grilled dishes',
          'Braised meats',
          'Traditional stir-fry',
          'Mala options',
          'Noodle bowls',
        ],
      },
      {
        name: 'Mejai Hai Yum',
        cuisine: 'Thai / Seafood',
        specialties: [
          'Fresh salmon sashimi',
          'Pickled salmon',
          'Thai yum salads',
          'Seafood specialties',
        ],
      },
    ],
    orderingInfo: {
      howToOrder: [
        'Visit santororderhub.vercel.app',
        'Select restaurant and browse menu',
        'Customize your dishes',
        'Add to basket and review order',
        'Send order via LINE or Instagram',
      ],
      deliveryAreas: ['Bangkok', 'Central Bangkok', 'Surrounding areas'],
      languages: ['English', 'Thai'],
    },
    lastUpdated: '2025-12-22',
  };

  // Cache for 24 hours
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return res.status(200).json(response);
}
