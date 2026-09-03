"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { unsplash } from "@/lib/images";
import { testimonials } from "@/lib/data";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lime/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-xl text-center">
          <SectionTag>Our Testimonials</SectionTag>
          <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
            WHAT THEY&apos;RE TAKING ABOUT
          </h2>
          <div className="mt-4 flex justify-center">
            <Squiggle />
          </div>
        </div>

        <div className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="group relative rounded-[1.75rem] bg-white px-8 pb-8 pt-16 shadow-[0_20px_50px_-20px_rgba(30,58,18,0.2)] ring-1 ring-forest/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(30,58,18,0.3)]"
            >
              <Quote
                size={72}
                strokeWidth={1}
                className="pointer-events-none absolute right-6 top-6 text-forest/[0.06] transition-colors duration-300 group-hover:text-gold/10"
              />

              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-cream shadow-lg ring-4 ring-white">
                  <Image
                    src={unsplash(t.photo, "auto=format&fit=crop&q=80&w=160&h=160")}
                    alt={t.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="relative mt-5 text-center text-[15px] italic leading-relaxed text-ink/65">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mx-auto mt-6 h-px w-10 bg-gold/40" />

              <div className="mt-5 text-center">
                <p className="font-display text-xl text-forest">{t.name}</p>
                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-ink/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
