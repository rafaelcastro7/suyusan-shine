export type Testimonial = {
  name: string;
  location: string;
  service: string;
  rating: number;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    location: "Toronto, ON",
    service: "Commercial & Office",
    rating: 5,
    quote:
      "Suyusan transformed our office. The team is reliable, professional, and our space has never looked better. Highly recommend to any business in the GTA.",
  },
  {
    name: "James Chen",
    location: "Mississauga, ON",
    service: "Deep Cleaning",
    rating: 5,
    quote:
      "We've been using Suyusan for monthly deep cleans and they never disappoint. Same crew every time — that consistency is invaluable.",
  },
  {
    name: "Margaret Thompson",
    location: "Oakville, ON",
    service: "Regular Cleaning",
    rating: 5,
    quote:
      "My home is spotless after each visit. The eco-friendly products are perfect for my grandkids. Best cleaning service I've tried in years.",
  },
  {
    name: "David Okonkwo",
    location: "Vaughan, ON",
    service: "Move-In / Move-Out",
    rating: 5,
    quote:
      "Booked a move-out clean and got my full deposit back. The place looked better than when I moved in. Fast, thorough and fairly priced.",
  },
  {
    name: "Priya Sharma",
    location: "Markham, ON",
    service: "Retirement Home Housekeeping",
    rating: 5,
    quote:
      "Our residence has relied on Suyusan for over a year. Their staff is respectful with residents and their documentation is impeccable.",
  },
];
