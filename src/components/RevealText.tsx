"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/** Masked "swipe up" reveal for headings — the text slides up into view
 * from behind a clipped container as it scrolls into the viewport.
 *
 * The intersection check must happen on the outer, unclipped wrapper —
 * not the inner translated element. An element that's fully clipped by
 * its own overflow-hidden ancestor has zero visible area, so per the
 * IntersectionObserver spec it never reports as "intersecting", and an
 * observer on the inner element would never fire, leaving it stuck
 * off-screen forever. */
export function RevealText<T extends ElementType = "div">({
  as,
  children,
  className = "",
  delay = 0,
}: {
  as?: T;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const Component = as || "div";
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "-80px" });

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      <motion.div
        initial={{ y: "115%" }}
        animate={inView ? { y: 0 } : { y: "115%" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Component className={className}>{children}</Component>
      </motion.div>
    </div>
  );
}
