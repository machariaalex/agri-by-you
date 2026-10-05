"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { images, unsplash } from "@/lib/images";
import { navigateTo } from "@/lib/pageTransition";
import { PillButton } from "./PillButton";

const headline = ["Grown", "With", "Care.", "Harvested", "For", "You."];
const ease = [0.22, 1, 0.36, 1] as const;

/** Full-screen hero: the photo slowly scales and drifts behind the headline
 * as you scroll, while the copy lifts away. Everything animates through
 * transform/opacity only, so it stays on the GPU compositor. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const bgScale = useTransform(progress, [0, 1], [1.05, 1.35]);
  const bgY = useTransform(progress, [0, 1], ["0%", "18%"]);
  const copyY = useTransform(progress, [0, 0.8], ["0%", "-35%"]);
  const copyOpacity = useTransform(progress, [0, 0.6], [1, 0]);
  const veilOpacity = useTransform(progress, [0, 1], [0.35, 0.85]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-forest-dark pt-16"
    >
      <motion.div
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={unsplash(images.heroBg, "auto=format&fit=crop&q=80&w=2200")}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Earthy grade: deep forest at the top fading into warm soil at the base. */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/80 via-forest-dark/45 to-gold/70" />
      <motion.div
        style={{ opacity: reduce ? 0.35 : veilOpacity }}
        className="absolute inset-0 bg-forest-dark"
      />

      <motion.div
        style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
        className="relative mx-auto w-full max-w-6xl px-6 will-change-transform lg:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-light"
        >
          <span className="h-px w-10 bg-gold-light" />
          Organic Farming · Kenya
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-body text-5xl font-extrabold leading-[0.98] tracking-tight text-cream sm:text-7xl lg:text-[6.5rem]">
          {headline.map((word, i) => (
            <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.07, ease }}
                className={`inline-block ${i >= 3 ? "text-gold-light" : ""}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-cream/75"
        >
          We farm the way you would farm it — soil-first, chemical-free, and straight from our
          fields to your table. By You, For You.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="mt-10 flex flex-wrap items-center gap-6"
        >
          <PillButton as="a" href="#solutions" variant="light">
            Explore Our Produce
          </PillButton>
          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("/contact");
            }}
            className="text-sm font-bold text-cream underline decoration-gold-light/60 underline-offset-8 transition-colors hover:text-gold-light"
          >
            Place a Bulk Order
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          navigateTo("#about");
        }}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:flex flex-col items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-cream/60"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-cream/20">
          <motion.span
            animate={reduce ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-gold-light"
          />
        </span>
      </motion.a>
    </section>
  );
}
