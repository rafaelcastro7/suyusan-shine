// Pricing structural data — IDs, numbers, multipliers. Text labels (name, tagline,
// unit, features, sizes, frequencies) are translated in locale files at:
//   pricing.tiers.<id>.{name,tagline,unit,features}
//   pricing.sizes.<id>
//   pricing.frequencies.<id>

export type PricingTier = {
  id: string;
  startingAt: number; // CAD
  popular?: boolean;
};

export const pricingTiers: PricingTier[] = [
  { id: "home", startingAt: 119 },
  { id: "deep", startingAt: 249, popular: true },
  { id: "commercial", startingAt: 0 },
];

export type SizeOption = { id: string; multiplier: number };

export const sizeOptions: SizeOption[] = [
  { id: "studio", multiplier: 1 },
  { id: "2bed", multiplier: 1.25 },
  { id: "3bed", multiplier: 1.55 },
  { id: "4bed", multiplier: 1.85 },
  { id: "5plus", multiplier: 2.2 },
];

export type FrequencyOption = { id: string; discount: number };

export const frequencyOptions: FrequencyOption[] = [
  { id: "once", discount: 0 },
  { id: "monthly", discount: 0.1 },
  { id: "biweekly", discount: 0.15 },
  { id: "weekly", discount: 0.2 },
];

export function estimateQuote(tierId: string, sizeId: string, frequencyId: string): number {
  const tier = pricingTiers.find((t) => t.id === tierId);
  const size = sizeOptions.find((s) => s.id === sizeId);
  const freq = frequencyOptions.find((f) => f.id === frequencyId);
  if (!tier || !size || tier.startingAt === 0) return 0;
  const base = tier.startingAt * size.multiplier;
  const discounted = base * (1 - (freq?.discount ?? 0));
  return Math.round(discounted);
}
