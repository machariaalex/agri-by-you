"use client";

import { useState, type PointerEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Sprout, type LucideIcon } from "lucide-react";
import { unsplash } from "@/lib/images";
import { navigateTo } from "@/lib/pageTransition";
import { serviceIcons } from "@/lib/serviceIcons";

export type SolutionCategory = "produce" | "livestock" | "services" | "insights";

export type Solution = {
  id: string;
  category: SolutionCategory;
  /** Bento footprint: feature = 2×2, tall = 1×2, wide = 2×1, normal = 1×1. */
  size: "feature" | "tall" | "wide" | "normal";
  icon: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  cta: string;
};

const FILTERS: { key: SolutionCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "produce", label: "Produce" },
  { key: "livestock", label: "Livestock" },
  { key: "services", label: "Farm Services" },
  { key: "insights", label: "Insights" },
];

const CATEGORY_LABEL: Record<SolutionCategory, string> = {
  produce: "Produce",
  livestock: "Livestock",
  services: "Farm Service",
  insights: "Journal",
};

const SIZE_CLASS: Record<Solution["size"], string> = {
  feature: "sm:col-span-2 sm:row-span-2",
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  normal: "",
};

const layoutSpring = { type: "spring", stiffness: 280, damping: 32, mass: 0.8 } as const;
const tiltSpring = { stiffness: 220, damping: 20, mass: 0.5 };

export function SolutionsGrid({ items }: { items: Solution[] }) {
  const [active, setActive] = useState<SolutionCategory | "all">("all");
  const filters = FILTERS.filter((f) => f.key === "all" || items.some((i) => i.category === f.key));
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <LayoutGroup>
      <div role="toolbar" aria-label="Filter solutions" className="mt-12 flex flex-wrap gap-2.5">
        {filters.map((f) => {
          const selected = f.key === active;
          const count = f.key === "all" ? items.length : items.filter((i) => i.category === f.key).length;
          return (
            <motion.button
              key={f.key}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(f.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className={`relative rounded-full border px-5 py-2.5 text-sm font-bold transition-colors ${
                selected ? "border-forest text-cream" : "border-forest/15 bg-white text-forest hover:border-forest/40"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId="solutions-filter-pill"
                  transition={layoutSpring}
                  className="absolute inset-0 rounded-full bg-forest"
                />
              )}
              <span className="relative flex items-center gap-2">
                {f.label}
                <span className={`text-xs ${selected ? "text-gold-light" : "text-ink/40"}`}>{count}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        layout
        aria-live="polite"
        className="mt-8 grid grid-flow-dense auto-rows-[16rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ layout: layoutSpring, opacity: { duration: 0.25 }, scale: { duration: 0.35 } }}
              className={SIZE_CLASS[item.size]}
            >
              <SolutionCard item={item} tone={items.indexOf(item) % 2 === 0 ? "forest" : "soil"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </LayoutGroup>
  );
}

/** One bento card: tilts toward the cursor in 3D and blooms a soft glow
 * under the pointer. Both effects are pure transform/opacity. */
function SolutionCard({ item, tone }: { item: Solution; tone: "forest" | "soil" }) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  // Pointer position: normalised (0–1) drives the tilt, pixels drive the glow.
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), tiltSpring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), tiltSpring);

  const Icon: LucideIcon = serviceIcons[item.icon] ?? Sprout;
  const feature = item.size === "feature";

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowX.set(x);
    glowY.set(y);
    if (!reduce) {
      px.set(x / rect.width);
      py.set(y / rect.height);
    }
  }

  function onPointerLeave() {
    setHovered(false);
    px.set(0.5);
    py.set(0.5);
  }

  const surface = item.image
    ? "bg-forest-dark text-cream"
    : tone === "soil"
      ? "bg-gold text-cream"
      : "bg-forest text-cream";

  return (
    <motion.article
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 shadow-[0_18px_50px_-24px_rgba(26,44,29,0.55)] will-change-transform ${surface} ${
        feature ? "sm:p-9" : ""
      }`}
    >
      {item.image ? (
        <>
          <div className="absolute inset-0 -z-20 transition-transform duration-700 ease-out group-hover:scale-[1.07]">
            <Image
              src={unsplash(item.image, "auto=format&fit=crop&q=75&w=1000")}
              alt=""
              fill
              sizes={feature || item.size === "wide" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-dark via-forest-dark/55 to-forest-dark/5" />
        </>
      ) : (
        <Icon
          aria-hidden="true"
          strokeWidth={1}
          className="absolute -bottom-10 -right-8 -z-10 h-56 w-56 text-cream/[0.07] transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110"
        />
      )}

      {/* Organic glow that follows the pointer and blooms open on hover. */}
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        initial={false}
        animate={{ scale: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -left-48 -top-48 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(179,152,130,0.7)_0%,rgba(79,122,85,0.35)_40%,transparent_70%)] mix-blend-screen"
      />

      <div className="flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 text-cream ring-1 ring-cream/25 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-light group-hover:text-forest-dark">
          <Icon size={19} />
        </span>
        <span className="rounded-full bg-cream/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/80 ring-1 ring-cream/15 backdrop-blur-sm">
          {CATEGORY_LABEL[item.category]}
        </span>
      </div>

      <div>
        <h3 className={`font-extrabold leading-tight ${feature ? "text-3xl sm:text-4xl" : "text-xl"}`}>
          <a
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              navigateTo(item.href);
            }}
            className="outline-none after:absolute after:inset-0 after:rounded-[1.75rem] focus-visible:after:ring-2 focus-visible:after:ring-gold-light"
          >
            {item.title}
          </a>
        </h3>
        <p
          className={`mt-2 text-sm leading-relaxed text-cream/70 ${
            feature ? "line-clamp-3 max-w-md sm:line-clamp-none sm:text-base" : item.size === "tall" || item.size === "wide" ? "line-clamp-3" : "line-clamp-2"
          }`}
        >
          {item.description}
        </p>
        <span aria-hidden="true" className="mt-4 flex items-center gap-3 text-sm font-bold text-cream">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-light text-forest-dark transition-transform duration-200 ease-out group-hover:rotate-45 group-hover:scale-110 group-active:scale-90">
            <ArrowUpRight size={16} />
          </span>
          <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">{item.cta}</span>
        </span>
      </div>
    </motion.article>
  );
}
