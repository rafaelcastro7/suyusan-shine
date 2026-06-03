// Testimonial entries. Name/location/rating are static; service/quote are translated
// at testimonials.<id>.{service,quote}.
export type TestimonialMeta = {
  id: string;
  name: string;
  location: string;
  rating: number;
};

export const testimonials: TestimonialMeta[] = [
  { id: "sarah", name: "Sarah Mitchell", location: "Toronto, ON", rating: 5 },
  { id: "james", name: "James Chen", location: "Mississauga, ON", rating: 5 },
  { id: "margaret", name: "Margaret Thompson", location: "Oakville, ON", rating: 5 },
  { id: "david", name: "David Okonkwo", location: "Vaughan, ON", rating: 5 },
  { id: "priya", name: "Priya Sharma", location: "Markham, ON", rating: 5 },
];
