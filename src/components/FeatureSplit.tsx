import Image from "next/image";
import { ShieldCheck, Sprout, Tractor, type LucideIcon } from "lucide-react";
import { unsplash, images } from "@/lib/images";
import { splitFeatures } from "@/lib/data";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

const icons: Record<string, LucideIcon> = { Tractor, Sprout, ShieldCheck };

export function FeatureSplit() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal y={30} className="relative">
          <div className="absolute inset-y-6 -left-6 -right-6 -z-10 rounded-[2rem] bg-gold sm:-right-16" />
          <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-xl">
            <Image
              src={unsplash(images.splitPhoto, "auto=format&fit=crop&q=80&w=800")}
              alt="Trowel scooping fresh organic soil"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="lg:pl-10">
          <Reveal>
            <SectionTag>Pure Organic Food</SectionTag>
          </Reveal>
          <RevealText
            as="h2"
            className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl"
          >
            HEALTHY FOOD FOR
            <br />
            YOUR GOOD GROWTH
          </RevealText>
          <Reveal delay={0.1}>
            <Squiggle className="mt-4" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-ink/60">
              Nourish your body with clean, nutrient-rich produce grown exactly as nature intended.
              We prioritize soil health, natural cultivation,
              and eco-friendly practices to deliver safe, chemical-free food that supports vitality, long-term wellness, and healthy living for you and your family.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 grid grid-cols-3 gap-4">
              {splitFeatures.map((feature) => {
                const Icon = icons[feature.icon];
                return (
                  <div
                    key={feature.label}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-forest/10 bg-white px-3 py-6 text-center"
                  >
                    <Icon size={28} className="text-forest" />
                    <span className="text-sm font-bold text-ink">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
