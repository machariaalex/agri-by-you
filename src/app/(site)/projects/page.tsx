import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { Projects } from "@/components/Projects";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Projects — AgriByYou",
  description: "Recently completed partnerships with grain, dairy, vineyard, and vegetable farms.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader title="Projects" image={images.heroBg} />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
