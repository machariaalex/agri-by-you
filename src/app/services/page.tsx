import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { FeatureSplit } from "@/components/FeatureSplit";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Services } from "@/components/Services";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Services — AgriByYou",
  description: "Explore AgriByYou's agriculture, organic, vegetable, and dairy services.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader title="Services" image={images.serviceAgriculture} />
        <Services />
        <FeatureSplit />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
