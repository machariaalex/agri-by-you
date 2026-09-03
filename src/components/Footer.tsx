"use client";

import Image from "next/image";
import { ArrowRight, ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { unsplash } from "@/lib/images";
import { footerExplore, journal } from "@/lib/data";
import { navigateTo } from "@/lib/pageTransition";
import { LogoWhite } from "./LogoWhite";
import { FacebookIcon, InstagramIcon, XIcon } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-forest to-forest-dark pt-20 text-cream/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div>
          <LogoWhite size={88} />
          <p className="mt-5 max-w-[22ch] text-sm leading-relaxed">
            A By You Product. For You.
          </p>
        </div>

        <div>
          <h4 className="font-display text-xl text-cream">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {footerExplore.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(link.href);
                  }}
                  className="transition-all duration-300 hover:pl-1.5 hover:text-gold-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl text-cream">News</h4>
          <ul className="mt-5 space-y-4">
            {journal.map((post) => (
              <li key={post.title}>
                <a
                  href={post.href ?? "#"}
                  onClick={(e) => {
                    if (!post.href) return;
                    e.preventDefault();
                    navigateTo(post.href);
                  }}
                  className="group flex gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={unsplash(post.image, "auto=format&fit=crop&q=70&w=100&h=100")}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gold-light">
                      {post.date.day} {post.date.month}
                    </p>
                    <p className="text-sm leading-snug transition-colors group-hover:text-cream">
                      {post.title}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl text-cream">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-gold-light" /> 0748 155 551 · 0794 994 089
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-gold-light" /> sales@agribyyou.com
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={14} className="text-gold-light" /> Nairobi, Kenya
            </li>
          </ul>
          <form className="mt-5 flex overflow-hidden rounded-full bg-white/10" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="m-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-forest-dark"
            >
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-6 sm:flex-row sm:justify-between lg:px-10">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cream transition-all duration-300 hover:-translate-y-1 hover:bg-gold hover:text-forest-dark"
          >
            <ArrowUp size={16} />
          </a>
          <p className="order-last text-sm text-cream/50 sm:order-none">
            © 2026 AgriByYou. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[InstagramIcon, FacebookIcon, XIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-gold hover:text-forest-dark"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
