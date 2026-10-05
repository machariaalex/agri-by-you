import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Squiggle } from "@/components/Squiggle";

export const metadata: Metadata = {
  title: "Building AgriByYou: Why Sourcing the Right Farming Inputs Matters — Journal",
  description:
    "Before the trip to Siaya, the AgriByYou team sourced certified onion seeds, drip irrigation equipment, and organic soil nutrients from ABI Organic Agriculture.",
};

function StepNumber({ n }: { n: string }) {
  return <span className="font-display text-3xl text-gold">{n}</span>;
}

export default function SourcingFarmingInputsPost() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-16">
          <Image
            src="/images/blog/sourcing-load1.jpeg"
            alt="Coiled drip irrigation pipes and organic inputs loaded into a van at ABI Organic Agriculture"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/95 via-forest-dark/50 to-forest-dark/20" />

          <div className="relative mx-auto w-full max-w-3xl px-6 pb-16 lg:px-10">
            <a
              href="/journal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cream/70 transition-colors hover:text-gold-light"
            >
              <ArrowLeft size={15} />
              Back to Journal
            </a>

            <span className="mt-6 inline-flex w-fit items-center rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest-dark">
              Field Notes
            </span>

            <h1 className="mt-5 text-balance font-display text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
              Building AgriByYou: Why Sourcing the Right Farming Inputs Matters
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
              <span className="flex items-center gap-1.5">
                <User size={14} /> AgriByYou Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> September 1, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 4 min read
              </span>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <p className="text-balance font-display text-2xl leading-snug text-forest sm:text-3xl">
            Every high-yielding organic farm starts long before the seed touches
            the soil.
          </p>

          <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-ink/70">
            <p>
              It begins with deliberate choices about the tools, seeds, and
              inputs you feed into your land. At AgriByYou, our promise is to
              farm the way you would farm it&mdash;without taking shortcuts on
              quality or compromising on organic principles.
            </p>
            <p>
              That&apos;s why, before making the trip to Siaya, our team stopped
              by ABI (Agribase Bioscience Int Ltd / ABI Organic Agriculture) to
              pick up everything we needed for our organic onion venture.
              Here&apos;s a breakdown of what went into sourcing our input
              inventory and why each choice was critical for our farm.
            </p>
          </div>

          <div className="space-y-16 mt-14">
            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="01" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  High-Quality Onion Seeds
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                Onions can be temperamental crops. Choosing the right seed
                variety determines not just the size and shape of the bulb, but
                also the plant&apos;s natural resistance to local pests and
                weather variations. Sourcing certified seeds guarantees strong
                germination rates in our nursery beds, setting up our Siaya
                project for a uniform, healthy crop right from week one.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="02" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  Precision Drip Irrigation Equipment
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                Water management is one of the biggest factors in organic
                farming. Flood irrigation can wash away vital soil nutrients and
                spread waterborne fungal diseases. Sourcing reliable drip lines,
                emitters, and connectors allows us to feed water directly to the
                onion roots. This conserves water, keeps foliage dry, and
                optimizes moisture levels in the soil.
              </p>
              <figure className="mt-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src="/images/blog/sourcing-load2.jpeg"
                    alt="Coiled drip irrigation lines and a Fine Drop supply box loaded for the trip to Siaya"
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-ink/45">
                  Drip lines, emitters, and connectors&mdash;loaded up and ready for the Siaya plot.
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="03" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  Certified Organic Nutrients &amp; Soil Enhancers
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                True organic onions require clean, chemical-free nutrition. At
                ABI, we gathered certified organic fertilizers, bio-stimulants,
                and natural soil regenerators. Instead of relying on synthetic
                chemical fertilizers that strip soil health over time, these
                organic nutrients enrich the micro-biome of the soil, ensuring
                our onions grow naturally firm, nutrient-dense, and rich in
                flavor.
              </p>
            </div>
          </div>

          <div className="relative my-16 overflow-hidden rounded-3xl bg-forest px-8 py-10 sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <p className="relative text-balance font-display text-2xl leading-snug text-cream sm:text-3xl">
              &ldquo;It&apos;s easy to buy cheap materials or rely on chemical
              quick-fixes&mdash;but that&apos;s not how we do things at{" "}
              <span className="text-gold-light">AgriByYou</span>.&rdquo;
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-forest sm:text-3xl">
              Doing Things the Right Way
            </h2>
            <Squiggle className="mt-3" />
            <div className="mt-5 space-y-6 leading-relaxed text-ink/70">
              <p>
                Going to trusted suppliers like ABI to secure verified organic
                inputs and durable irrigation hardware ensures we build a
                transparent, sustainable farm from day zero.
              </p>
            </div>
          </div>

          <figure className="mt-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/blog/sourcing-team.jpeg"
                alt="The AgriByYou team loading supplies into the van before the trip to Siaya"
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-ink/45">
              Loaded up and all smiles&mdash;the AgriByYou team before the trip to Siaya.
            </figcaption>
          </figure>

          <p className="mt-10 leading-relaxed text-ink/70">
            With the seeds, pipes, and organic nutrients loaded up, our next
            stop was the field in Siaya&mdash;ready to roll up our sleeves and
            get our hands dirty.
          </p>

          <div className="mt-16 border-t border-forest/10 pt-10 text-center">
            <p className="font-display text-2xl text-forest sm:text-3xl">
              AgriByYou &mdash; We farm the way you would farm it.
            </p>
            <a
              href="/journal/siaya-organic-onions"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-gold"
            >
              Continue the story: our hands in Siaya&apos;s fields
              <ArrowUpRight size={16} />
            </a>
          </div>
        </article>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
