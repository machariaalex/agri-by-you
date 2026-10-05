import type { Metadata } from "next";
import { About } from "@/components/About";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Testimonials } from "@/components/Testimonials";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About — AgriByYou",
  description: "Learn about AgriByYou's story, our founder, and 24 years of regenerative farming experience.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader title="About Us" image={images.aboutMain} />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
