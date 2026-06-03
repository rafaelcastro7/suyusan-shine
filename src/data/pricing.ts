// Pricing tiers and starting rates (CAD). Editable, deterministic.
// Rates are "starting at" estimates used by the booking wizard and pricing page.

export type PricingTier = {
  id: string;
  name: string;
  tagline: string;
  startingAt: number; // CAD
  unit: string;
  popular?: boolean;
  features: string[];
};

export const pricingTiers: PricingTier[] = [
  {
    id: "home",
    name: "Home Cleaning",
    tagline: "Recurring upkeep for houses & condos",
    startingAt: 119,
    unit: "per visit",
    features: [
      "Weekly, bi-weekly or monthly",
      "Same trusted crew every visit",
      "Kitchen, bathrooms, floors & dusting",
      "Eco-friendly products included",
      "100% satisfaction guarantee",
    ],
  },
  {
    id: "deep",
    name: "Deep Clean",
    tagline: "Top-to-bottom seasonal reset",
    startingAt: 249,
    unit: "per clean",
    popular: true,
    features: [
      "Everything in Home Cleaning",
      "Inside windows, tracks & blinds",
      "Grout, tile & buildup scrubbing",
      "Light fixtures, vents & door frames",
      "Cabinet exteriors hand-wiped",
    ],
  },
  {
    id: "commercial",
    name: "Commercial",
    tagline: "Offices, clinics & retirement homes",
    startingAt: 0,
    unit: "custom quote",
    features: [
      "Custom janitorial programs",
      "Day, evening or weekend schedules",
      "Insured, bonded & background-checked",
      "Single point of contact",
      "Supply restocking available",
    ],
  },
];

// Size multipliers for the booking wizard (applied to home/deep starting rates).
export type SizeOption = {
  id: string;
  label: string;
  multiplier: number;
};

export const sizeOptions: SizeOption[] = [
  { id: "studio", label: "Studio / 1 bed", multiplier: 1 },
  { id: "2bed", label: "2 bedrooms", multiplier: 1.25 },
  { id: "3bed", label: "3 bedrooms", multiplier: 1.55 },
  { id: "4bed", label: "4 bedrooms", multiplier: 1.85 },
  { id: "5plus", label: "5+ bedrooms", multiplier: 2.2 },
];

// Frequency discounts for recurring service.
export type FrequencyOption = {
  id: string;
  label: string;
  discount: number; // fraction off, e.g. 0.15 = 15% off
};

export const frequencyOptions: FrequencyOption[] = [
  { id: "once", label: "One-time", discount: 0 },
  { id: "monthly", label: "Monthly", discount: 0.1 },
  { id: "biweekly", label: "Bi-weekly", discount: 0.15 },
  { id: "weekly", label: "Weekly", discount: 0.2 },
];

// Estimate a quote from tier + size + frequency. Deterministic, no backend.
export function estimateQuote(tierId: string, sizeId: string, frequencyId: string): number {
  const tier = pricingTiers.find((t) => t.id === tierId);
  const size = sizeOptions.find((s) => s.id === sizeId);
  const freq = frequencyOptions.find((f) => f.id === frequencyId);
  if (!tier || !size || tier.startingAt === 0) return 0;
  const base = tier.startingAt * size.multiplier;
  const discounted = base * (1 - (freq?.discount ?? 0));
  return Math.round(discounted);
}
