import Image from "next/image";
import { Apple, Bird, Carrot, Layers, type LucideIcon } from "lucide-react";
import { unsplash } from "@/lib/images";
import { services } from "@/lib/data";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

const icons: Record<string, LucideIcon> = { Carrot, Apple, Layers, Bird };

export function Services() {
  return (
    <section id="services" className="wheat-pattern relative bg-cream-dark py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionTag>What We&apos;re Doing</SectionTag>
          <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            SERVICES WE&apos;RE OFFERING
          </h2>
          <div className="mt-4 flex justify-center">
            <Squiggle />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <div
                key={service.title}
                className="group rounded-3xl bg-white p-8 text-center shadow-[0_10px_40px_-15px_rgba(30,58,18,0.15)] transition-transform hover:-translate-y-1.5"
              >
                <div className="relative mx-auto h-28 w-28">
                  <div className="h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={unsplash(service.image, "auto=format&fit=crop&q=80&w=300&h=300")}
                      alt={service.title}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-cream ring-4 ring-white transition-colors group-hover:bg-gold group-hover:text-forest-dark">
                    <Icon size={19} />
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-extrabold text-forest">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
