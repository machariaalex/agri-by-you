"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { unsplash } from "@/lib/images";
import { journal } from "@/lib/data";
import { navigateTo } from "@/lib/pageTransition";
import { SectionTag } from "./SectionTag";
import { Squiggle } from "./Squiggle";

export function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-xl text-center">
        <SectionTag>From the Journal</SectionTag>
        <h2 className="mt-4 font-display text-4xl leading-tight text-forest sm:text-5xl">
          LATEST NEWS &amp; ARTICLES
        </h2>
        <div className="mt-4 flex justify-center">
          <Squiggle />
        </div>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-2">
        {journal.map((post) => (
          <a
            href={post.href ?? "#"}
            key={post.title}
            onClick={(e) => {
              if (!post.href) return;
              e.preventDefault();
              navigateTo(post.href);
            }}
            className="group block overflow-hidden rounded-2xl bg-cream-dark shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(30,58,18,0.3)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={unsplash(post.image, "auto=format&fit=crop&q=80&w=700")}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-3 right-3 flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-forest text-cream transition-colors duration-300 group-hover:bg-gold group-hover:text-forest-dark">
                <span className="text-lg font-extrabold leading-none">{post.date.day}</span>
                <span className="text-[11px] uppercase tracking-wide">{post.date.month}</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 p-6">
              <h3 className="text-lg font-extrabold leading-snug text-forest">{post.title}</h3>
              <ArrowUpRight
                size={20}
                className="shrink-0 -translate-x-1 text-forest/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-gold group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
