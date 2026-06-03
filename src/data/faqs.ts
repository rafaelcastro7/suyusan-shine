// FAQ ids. Translated text lives at faq.items.<id>.{q,a}
export const faqIds = [
  "insured",
  "supplies",
  "sameCleaner",
  "guarantee",
  "pay",
  "cancellation",
  "pets",
  "areas",
  "home",
  "advance",
] as const;

export type FAQId = (typeof faqIds)[number];
