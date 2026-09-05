import Image from "next/image";
import { Check } from "lucide-react";
import { unsplash, images } from "@/lib/images";
import { PillButton } from "./PillButton";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

const checklist = [
  {
    label: "Sustainable Growth",
    text: "Environmentally responsible practices that protect soil health and biodiversity.",
  },
  {
    label: "Farm-Fresh Quality",
    text: "High-grade organic produce grown directly with care and precision.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <SectionTag>Get to Know AgriByYou</SectionTag>
          </Reveal>
          <RevealText
            as="h2"
            className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl"
          >
            AgriByYou, We Farm the Way You would Farm it. By You, For You.
          </RevealText>
          <Reveal delay={0.1}>
            <Squiggle className="mt-4" />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg leading-relaxed text-ink/60">
              We bridge the gap between conscientious farming and your table.
              Designed to operate as a natural extension of your own hands,
              we combine sustainable agricultural practices with technology to deliver pure,
              traceable, and health-conscious produce.
              Every yield is cultivated with the exact care, environmental respect,
              and integrity you would demand for your own family.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 space-y-3">
              {checklist.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span className="text-ink/85">
                    <span className="font-bold text-ink">{item.label}:</span> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9">
              <PillButton as="a" href="/services">
                About More
              </PillButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={30} className="relative">
          <div className="absolute -left-4 bottom-10 -z-10 h-64 w-40 rounded-2xl bg-gold sm:-left-6 sm:w-52" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-xl">
            <Image
              src={unsplash(images.aboutMain, "auto=format&fit=crop&q=80&w=900")}
              alt="Our team planting seedlings in the greenhouse"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-4 h-40 w-56 overflow-hidden rounded-[1.5rem] shadow-xl ring-4 ring-cream sm:-right-8 sm:h-48 sm:w-64">
            <Image
              src={unsplash(images.aboutSmall, "auto=format&fit=crop&q=80&w=500")}
              alt="Hands holding freshly sorted seeds"
              fill
              sizes="16rem"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
