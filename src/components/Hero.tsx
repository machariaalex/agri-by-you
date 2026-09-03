"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { unsplash, images } from "@/lib/images";
import { PillButton } from "./PillButton";

const slides = [
  {
    heading: "Unbeatable Organic and Agriculture Services",
    image: images.heroBg,
    href: "#about",
  },
  {
    heading: "Sustainable Farming for a Better Tomorrow",
    image: images.bannerBg,
    href: "#services",
  },
  {
    heading: "Pure Organic Produce, Delivered With Care",
    image: images.serviceAgriculture,
    href: "#contact",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <AnimatePresence>
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={unsplash(slide.image, "auto=format&fit=crop&q=75&w=1800")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/55 to-forest-dark/40" />

      <div className="absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full border border-white/70 transition-colors ${
              i === index ? "bg-white" : ""
            }`}
          />
        ))}
      </div>

      <button
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-6 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 lg:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-24 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 lg:flex"
      >
        <ChevronRight size={20} />
      </button>

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center">
        <AnimatePresence mode="wait">
          <motion.div key={index} className="flex flex-col items-center">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.55 }}
              className="max-w-3xl text-balance font-body text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-6xl"
            >
              {slide.heading}
            </motion.h1>

            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-10"
            >
              <PillButton as="a" href={slide.href} variant="light">
                Discover More
              </PillButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
