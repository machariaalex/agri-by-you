"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { submitInquiry } from "@/lib/actions/inquiry";
import { useFormAction } from "@/lib/useFormAction";
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

const inputClass =
  "w-full rounded-xl border border-forest/10 bg-white px-4 py-3.5 text-sm placeholder:text-ink/40 focus:border-forest focus:outline-none";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-semibold text-red-700">{message}</p> : null;
}

export function Contact() {
  const [state, formProps, pending] = useFormAction(submitInquiry);
  const errors = state.fieldErrors ?? {};

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
          {state.ok ? (
            <div role="status" className="relative py-16 text-center">
              <p className="font-display text-3xl text-forest">Message received</p>
              <p className="mx-auto mt-3 max-w-sm text-ink/60">{state.message}</p>
            </div>
          ) : (
          <form className="relative grid gap-4" {...formProps}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <input name="name" type="text" placeholder="Your Name" aria-label="Your name" className={inputClass} required />
                <FieldError message={errors.name} />
              </div>
              <div>
                <input name="email" type="email" placeholder="Email Address" aria-label="Email address" className={inputClass} />
                <FieldError message={errors.email} />
              </div>
            </div>
            <input name="phone" type="tel" placeholder="Phone / WhatsApp (optional)" aria-label="Phone or WhatsApp" className={inputClass} />
            <div>
              <textarea name="message" placeholder="Write a Message" aria-label="Message" rows={5} className={inputClass} required />
              <FieldError message={errors.message} />
            </div>
            <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div>
              <PillButton as="button" type="submit" disabled={pending}>
                {pending ? "Sending…" : "Send a Message"}
              </PillButton>
            </div>
          </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
