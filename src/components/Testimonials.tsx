import { getTestimonials } from "@/lib/content";
import { TestimonialsView } from "./TestimonialsView";

export async function Testimonials() {
  return <TestimonialsView testimonials={await getTestimonials()} />;
}
