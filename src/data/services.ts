import {
  Sparkles, SprayCan, HardHat, HeartHandshake, Refrigerator,
  Theater, Building2, Truck, Moon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  icon: typeof Sparkles;
};

export const services: Service[] = [
  {
    slug: "regular-cleaning",
    title: "Regular Cleaning",
    short: "Weekly, bi-weekly or monthly upkeep that keeps your home consistently fresh.",
    description:
      "Our recurring cleaning service is designed to maintain a healthy, tidy and welcoming home with predictable visits and a trusted team. Each visit follows a detailed checklist covering dusting, vacuuming, mopping, kitchen and bathroom sanitation so you never come home to a long to-do list.",
    bullets: [
      "Dusting of all reachable surfaces, baseboards and décor",
      "Kitchen counters, sink, stovetop and exterior of appliances",
      "Bathrooms: tubs, showers, toilets, mirrors and fixtures",
      "Vacuum and mop all floors; trash and recycling out",
    ],
    icon: Sparkles,
  },
  {
    slug: "deep-cleaning",
    title: "Deep / Seasonal Cleaning",
    short: "A top-to-bottom reset for spring, fall or whenever your home needs it most.",
    description:
      "A meticulous, room-by-room deep clean that addresses everything regular service doesn't routinely reach. Ideal for spring refresh, holiday prep or restoring a home that hasn't been cleaned in a while.",
    bullets: [
      "Inside windows, tracks, sills and blinds",
      "Detailed scrubbing of grout, tile and tough buildup",
      "Light fixtures, ceiling fans, vents and door frames",
      "Hand-wipe of cabinet exteriors and high-touch surfaces",
    ],
    icon: SprayCan,
  },
  {
    slug: "post-construction",
    title: "Post-Renovation & Post-Construction",
    short: "Removing dust, debris and residue so your renovated space is move-in ready.",
    description:
      "Construction creates fine dust that settles into every corner. Our crews handle multi-stage cleaning — rough, final and touch-up — using HEPA vacuums and the right products to leave the project gallery-ready.",
    bullets: [
      "HEPA vacuum of floors, walls, vents and fixtures",
      "Removal of paint splatter, adhesive and stickers",
      "Polish of glass, mirrors, stainless steel and chrome",
      "Final detail pass before client walkthrough",
    ],
    icon: HardHat,
  },
  {
    slug: "senior-cleaning",
    title: "Cleaning for Seniors",
    short: "Compassionate, reliable cleaning tailored to the needs of older adults.",
    description:
      "A respectful, low-disruption service designed for seniors aging in place. Our trained team is patient, communicates clearly and uses gentle, low-fume products so the home stays safe, comfortable and easy to navigate.",
    bullets: [
      "Slip and trip-hazard reduction (rugs, cords, clutter)",
      "Sanitation of grab bars, mobility aids and high-touch areas",
      "Laundry and linen change available",
      "Same crew each visit — familiar, trusted faces",
    ],
    icon: HeartHandshake,
  },
  {
    slug: "appliances",
    title: "Cleaning Including Appliances",
    short: "Add-on detail of your oven, fridge, microwave and laundry units.",
    description:
      "An add-on or stand-alone service for the appliances that need real time and product to clean properly. We degrease, descale and disinfect the surfaces you use every day.",
    bullets: [
      "Inside oven, racks and stovetop hood",
      "Inside refrigerator and freezer (food temporarily relocated)",
      "Microwave, dishwasher and small appliances",
      "Washer & dryer drum, gasket and lint system",
    ],
    icon: Refrigerator,
  },
  {
    slug: "staging",
    title: "Staging Cleaning",
    short: "Picture-perfect detail to support your real-estate staging.",
    description:
      "A detail-driven clean coordinated with stagers, photographers and realtors. Buyers notice everything — we make sure they only notice the right things.",
    bullets: [
      "Streak-free glass, mirrors and stainless",
      "Touch-up between showings on request",
      "Coordinated scheduling with your stager",
      "Quiet, discreet on-site presence",
    ],
    icon: Theater,
  },
  {
    slug: "commercial-office",
    title: "Commercial & Office Cleaning",
    short: "After-hours office cleaning that keeps your team healthy and productive.",
    description:
      "Customizable janitorial programs for offices, clinics, studios and retail. We work around your hours, follow documented checklists and provide a single point of contact for accountability.",
    bullets: [
      "Workstations, meeting rooms, kitchens and washrooms",
      "Restocking of paper goods, soap and supplies",
      "Floor care: vacuum, mop, buff and periodic deep cycles",
      "Daily, evening or weekend schedules",
    ],
    icon: Building2,
  },
  {
    slug: "move-in-out",
    title: "Move-In / Move-Out Cleaning",
    short: "A spotless handover for tenants, owners, landlords and property managers.",
    description:
      "We get the property ready for the next chapter. Built to satisfy lease and sale requirements, our move-in/move-out package is comprehensive and documented.",
    bullets: [
      "Inside cabinets, drawers, closets and pantries",
      "Detailed appliance interior cleaning",
      "Walls spot-cleaned, baseboards and trim wiped",
      "Final inspection-ready finish",
    ],
    icon: Truck,
  },
  {
    slug: "retirement-housekeeping",
    title: "Retirement Home Housekeeping",
    short: "Day & night-shift housekeeping support for retirement residences.",
    description:
      "Reliable contracted housekeeping for retirement communities. Our staff is trained on infection-control basics, resident-first communication and the operational rhythm of long-term care environments.",
    bullets: [
      "Resident suites, common rooms and dining areas",
      "Day and overnight shift coverage available",
      "PPE, log sheets and supervisor reporting",
      "Background-checked, uniformed team",
    ],
    icon: Moon,
  },
];
