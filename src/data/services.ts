import {
  Sparkles, SprayCan, HardHat, HeartHandshake, Refrigerator,
  Theater, Building2, Truck, Moon,
} from "lucide-react";

export type ServiceMeta = {
  slug: string;
  icon: typeof Sparkles;
};

// Text is stored in translation files at services.items.<slug>.{title,short,description,bullets}
export const services: ServiceMeta[] = [
  { slug: "regular-cleaning", icon: Sparkles },
  { slug: "deep-cleaning", icon: SprayCan },
  { slug: "post-construction", icon: HardHat },
  { slug: "senior-cleaning", icon: HeartHandshake },
  { slug: "appliances", icon: Refrigerator },
  { slug: "staging", icon: Theater },
  { slug: "commercial-office", icon: Building2 },
  { slug: "move-in-out", icon: Truck },
  { slug: "retirement-housekeeping", icon: Moon },
];
