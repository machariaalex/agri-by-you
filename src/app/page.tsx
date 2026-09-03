import { About } from "@/components/About";
import { Banner } from "@/components/Banner";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { FeatureSplit } from "@/components/FeatureSplit";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Journal } from "@/components/Journal";
import { Navbar } from "@/components/Navbar";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Banner />
        <FeatureSplit />
        <Testimonials />
        <CTA />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
