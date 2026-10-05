"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";

/** Taproot running down the viewBox (100 × 1000, stretched to the viewport height). */
const TAPROOT = "M50 0 C62 70 38 140 50 210 S40 350 54 430 S42 580 50 660 S58 820 48 1000";

/** Lateral roots. `at` is the page-scroll progress at which each one starts
 * growing, roughly when the taproot reaches its junction. */
const LATERALS = [
  { at: 0.06, d: "M52 90 C70 105 80 120 92 150", hair: "M81 122 C85 130 91 131 97 128" },
  { at: 0.15, d: "M47 170 C30 185 18 200 8 235", hair: "M22 196 C18 190 12 189 5 191" },
  { at: 0.26, d: "M48 280 C66 300 76 320 90 360", hair: "M74 316 C80 314 86 316 93 322" },
  { at: 0.36, d: "M45 370 C28 390 16 420 10 455", hair: "M20 410 C26 418 26 426 22 434" },
  { at: 0.48, d: "M52 500 C70 515 82 545 94 575", hair: "M80 540 C76 548 77 556 82 562" },
  { at: 0.58, d: "M48 600 C32 620 20 640 6 680", hair: "M24 634 C18 628 12 628 6 632" },
  { at: 0.7, d: "M53 720 C68 740 78 770 88 800", hair: "M76 764 C82 762 88 764 94 770" },
  { at: 0.82, d: "M50 850 C34 870 24 900 14 930", hair: "M26 894 C30 902 30 910 26 918" },
];

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

function Lateral({ progress, at, d, hair }: { progress: MotionValue<number>; at: number; d: string; hair: string }) {
  const length = useTransform(progress, [at, at + 0.08], [0, 1]);
  const hairLength = useTransform(progress, [at + 0.05, at + 0.12], [0, 1]);
  return (
    <>
      <motion.path d={d} {...stroke} strokeWidth={1.1} style={{ pathLength: length, opacity: length }} />
      <motion.path d={hair} {...stroke} strokeWidth={0.8} style={{ pathLength: hairLength, opacity: hairLength }} />
    </>
  );
}

/** A root system in the left page margin that grows as you scroll down,
 * topped by a leaf whose outline and veins draw themselves on load.
 * Desktop-only (it needs the empty margin) and hidden for reduced motion. */
export function RootSystem() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 top-16 z-30 hidden w-20 flex-col items-center text-gold-light/80 xl:flex 2xl:w-28"
    >
      <svg viewBox="0 0 40 44" className="mt-4 h-11 w-10 shrink-0">
        <motion.path
          d="M20 42 C6 32 4 16 20 3 C36 16 34 32 20 42 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
        />
        {[
          "M20 42 L20 8",
          "M20 30 L11 24",
          "M20 30 L29 24",
          "M20 21 L12 15",
          "M20 21 L28 15",
          "M20 13 L15 9",
          "M20 13 L25 9",
        ].map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.9}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 1.2 + i * 0.12, ease: "easeOut" }}
          />
        ))}
      </svg>

      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="w-full flex-1">
        <motion.path d={TAPROOT} {...stroke} strokeWidth={1.6} style={{ pathLength: progress }} />
        {LATERALS.map((root) => (
          <Lateral key={root.d} progress={progress} {...root} />
        ))}
      </svg>
    </div>
  );
}
