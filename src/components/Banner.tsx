import Image from "next/image";
import { unsplash, images } from "@/lib/images";
import { OliveBranch } from "./OliveBranch";
import { PillButton } from "./PillButton";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

export function Banner() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <Image
        src={unsplash(images.bannerBg, "auto=format&fit=crop&q=75&w=1800")}
        alt="Golden hour over green farmland"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/45 to-forest-dark/35" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="hidden sm:block">
            <OliveBranch />
          </div>
          <RevealText
            as="h2"
            className="max-w-3xl text-balance font-body text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl"
          >
            Grown With Purpose, Harvested With Pride
          </RevealText>
          <div className="hidden sm:block">
            <OliveBranch flip />
          </div>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <PillButton as="a" href="#contact" variant="light">
            Discover More
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
