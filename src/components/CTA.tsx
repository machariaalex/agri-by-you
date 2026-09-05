import Image from "next/image";
import { Sprout } from "lucide-react";
import { unsplash, images } from "@/lib/images";
import { PillButton } from "./PillButton";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

export function CTA() {
  return (
    <section className="relative overflow-hidden bg-forest">
      <Image
        src={unsplash(images.ctaBg, "auto=format&fit=crop&q=60&w=1600")}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 text-center lg:flex-row lg:justify-between lg:text-left lg:px-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <Reveal>
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-light ring-1 ring-white/20">
              <Sprout size={32} />
            </span>
          </Reveal>
          <RevealText
            as="h2"
            className="max-w-md font-display text-3xl leading-tight text-cream sm:text-4xl"
          >
            WE&apos;RE POPULAR LEADER IN AGRICULTURE &amp; ORGANIC MARKET.
          </RevealText>
        </div>
        <Reveal delay={0.15}>
          <PillButton as="a" href="/contact" variant="light" className="shrink-0">
            Discover More
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
