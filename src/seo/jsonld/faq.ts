/**
 * FAQ Structured Data
 * https://schema.org/FAQPage
 */

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I place an order?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Browse our menu, select your dishes, customize them, and add to basket. Then click the basket icon to review your order and send it via LINE or Instagram."
      }
    },
    {
      "@type": "Question",
      "name": "What restaurants are available?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We have three restaurants: Restory (Asian Fusion), Nirvana (Authentic Thai), and Mejai Hai Yum (Fresh Salmon & Thai Yum). Each offers unique dishes with authentic Thai flavors."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer delivery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer delivery throughout Bangkok. Delivery details and your address will be confirmed when you send your order via LINE or Instagram."
      }
    },
    {
      "@type": "Question",
      "name": "Can I customize the spice level?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! Most dishes allow you to select your preferred spice level from not spicy to extra spicy. Look for the spice options when adding items to your basket."
      }
    },
    {
      "@type": "Question",
      "name": "What payment methods do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Payment methods will be confirmed when you place your order through LINE or Instagram. We accept various payment options including cash and mobile payments."
      }
    }
  ]
};
