import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageHeader } from "@/components/PageHeader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact — AgriByYou",
  description: "Get in touch with AgriByYou — call, email, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHeader title="Contact" image={images.ctaBg} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
