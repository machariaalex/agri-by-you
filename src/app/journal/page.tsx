import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Journal } from "@/components/Journal";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Journal — AgriByYou",
  description: "Latest news and articles from AgriByYou's fields.",
};

export default function JournalPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader title="Journal" image={images.bannerBg} />
        <Journal />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
