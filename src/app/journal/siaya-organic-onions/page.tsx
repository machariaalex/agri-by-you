import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Squiggle } from "@/components/Squiggle";

export const metadata: Metadata = {
  title: "By You, For You: Why We Got Our Hands Dirty in Siaya's Fields — Journal",
  description:
    "Behind the scenes of AgriByYou's organic onion project in Siaya County — soil preparation, drip irrigation, and raising the nursery from the ground up.",
};

function StepNumber({ n }: { n: string }) {
  return <span className="font-display text-3xl text-gold">{n}</span>;
}

export default function SiayaOrganicOnionsPost() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-end overflow-hidden pt-16">
          <Image
            src="/images/blog/siaya-field.jpeg"
            alt="Freshly laid drip irrigation lines across the Siaya onion plot at golden hour"
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
              By You, For You: Why We Got Our Hands Dirty in Siaya&apos;s Fields
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
              <span className="flex items-center gap-1.5">
                <User size={14} /> AgriByYou Team
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> September 3, 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 4 min read
              </span>
            </div>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
          <p className="text-balance font-display text-2xl leading-snug text-forest sm:text-3xl">
            The journey to a truly organic harvest doesn&apos;t start in a boardroom or
            behind a screen&mdash;it begins in the soil.
          </p>

          <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-ink/70">
            <p>
              Recently, the AgriByYou team packed up and traveled down to Siaya County
              to launch our latest venture: our organic onion project. For us, this
              wasn&apos;t just another site visit. It marked a defining milestone in our
              mission to transform how food is grown, tracked, and delivered.
            </p>
            <p>
              At AgriByYou, our promise is simple: we farm the way you would farm it.
              It&apos;s a By You, For You philosophy. That means no shortcuts, no
              synthetic quick-fixes, and no hands-off management. To deliver on that
              promise, we knew we had to get our hands dirty right alongside our farm
              workers.
            </p>
            <p>Here is a look behind the scenes at how we kicked off our Siaya organic onion project from the ground up.</p>
          </div>

          <div className="relative my-14 overflow-hidden rounded-3xl bg-forest px-8 py-10 sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
            <p className="relative text-balance font-display text-2xl leading-snug text-cream sm:text-3xl">
              &ldquo;We farm the way <span className="text-gold-light">you</span> would
              farm it&mdash;it&apos;s a By You, For You philosophy.&rdquo;
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="01" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  Groundwork &amp; Soil Preparation
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                Organic farming demands healthy, resilient soil. Our first order of
                business in Siaya was prepping the land to create the optimal
                environment for organic onions. We worked the earth directly,
                clearing weeds, breaking up tough clods, and enriching the soil
                structure naturally. Ensuring proper soil aeration and organic
                nutrient balance early on gives the crop the natural immunity it
                needs to thrive without chemical intervention.
              </p>
            </div>

            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="02" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  Precision Water Management
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                Onions require consistent, controlled moisture to develop healthy
                root systems and solid bulbs&mdash;especially under organic
                protocols. We laid out and calibrated drip irrigation lines across
                the entire plot. Drip piping allows us to deliver precise amounts
                of water directly to the root zones, minimizing evaporation losses
                and preventing moisture pooling on leaves, which significantly
                reduces the risk of fungal diseases naturally.
              </p>
              <figure className="mt-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src="/images/blog/drip-lines.jpeg"
                    alt="Drip irrigation lines and fittings laid across trenches at the Siaya plot"
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-ink/45">
                  Calibrating and laying drip lines across the Siaya plot, root zone by root zone.
                </figcaption>
              </figure>
            </div>

            <div>
              <div className="flex items-baseline gap-4">
                <StepNumber n="03" />
                <h2 className="font-display text-2xl text-forest sm:text-3xl">
                  Raising the Nursery
                </h2>
              </div>
              <Squiggle className="mt-3" />
              <p className="mt-5 leading-relaxed text-ink/70">
                The foundation of a strong yield lies in how seeds are nursed. We
                personally prepared the nursery beds and carefully sowed our onion
                seeds under controlled conditions. Raising our seedlings on-site
                ensures we closely monitor their early-stage germination, vigor,
                and health before transplanting them into the main fields.
              </p>
              <figure className="mt-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
                  <Image
                    src="/images/blog/nursery-bed.jpeg"
                    alt="Nursery beds mulched and prepared inside the greenhouse for the onion seedlings"
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm text-ink/45">
                  Nursery beds, mulched and readied for the onion seedlings&apos; earliest days.
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl text-forest sm:text-3xl">
              Why Getting Our Hands Dirty Matters
            </h2>
            <Squiggle className="mt-3" />
            <div className="mt-5 space-y-6 leading-relaxed text-ink/70">
              <p>
                Building a transparent, authentic agricultural ecosystem requires
                direct connection to the field. By participating in every
                mechanical detail&mdash;from tilling the Siaya soil to laying pipes
                and planting nursery beds&mdash;we ensure that every onion produced
                meets the uncompromising quality standards our community expects.
              </p>
              <p>
                This Siaya project is just the beginning. As the seedlings grow
                into robust crops over the coming months, we will continue sharing
                every step of the journey with you.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-forest/10 pt-10 text-center">
            <p className="font-display text-2xl text-forest sm:text-3xl">
              AgriByYou &mdash; We farm the way you would farm it.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest transition-colors hover:text-gold"
            >
              Get in touch about the Siaya project
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
