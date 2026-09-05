"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { BarnSketch } from "./BarnSketch";
import { PillButton } from "./PillButton";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

const contactRows = [
  { icon: MapPin, label: "Visit the Farm", value: "Available on appointment" },
  { icon: Phone, label: "Call or WhatsApp", value: "0748 155 551 · 0794 994 089 · 0718 236 084" },
  { icon: Mail, label: "Email Us", value: "sales@agribyyou.com" },
];

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <Reveal>
            <SectionTag>Contact Now</SectionTag>
          </Reveal>
          <RevealText
            as="h2"
            className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl"
          >
            GET IN TOUCH NOW
          </RevealText>
          <Reveal delay={0.1}>
            <Squiggle className="mt-4" />
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md leading-relaxed text-ink/60">
              Have questions about our farm-fresh produce, need custom orders, or want to explore
              agribusiness partnerships? Reach out to our team today — we are here to bring pure,
              sustainably grown produce from our fields to yours.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-9 space-y-6">
              {contactRows.map((row) => (
                <div key={row.label} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-cream">
                    <row.icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm text-ink/50">{row.label}</p>
                    <p className="font-extrabold text-ink">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={30} className="relative overflow-hidden rounded-[1.75rem] bg-cream-dark p-8">
          <BarnSketch className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-40" />
          <form className="relative grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="rounded-xl border border-forest/10 bg-white px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-forest focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="rounded-xl border border-forest/10 bg-white px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-forest focus:outline-none"
              />
            </div>
            <textarea
              placeholder="Write a Message"
              rows={5}
              className="rounded-xl border border-forest/10 bg-white px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-forest focus:outline-none"
            />
            <div>
              <PillButton as="button" type="submit">
                Send a Message
              </PillButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
