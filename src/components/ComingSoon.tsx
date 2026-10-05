"use client";

import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import { subscribeToLaunch } from "@/lib/actions/inquiry";
import { useFormAction } from "@/lib/useFormAction";
import { LogoWhite } from "./LogoWhite";

const ease = [0.22, 1, 0.36, 1] as const;

/** Deterministic pseudo-random (integer hash, rounded) so the server and every
 * browser render exactly the same scene and hydration matches. */
const rand = (i: number, salt: number) => {
  let h = (i * 374761393 + salt * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return Math.round(((h >>> 0) / 4294967296) * 1000) / 1000;
};
const r2 = (n: number) => Math.round(n * 100) / 100;

const FIREFLIES = Array.from({ length: 26 }, (_, i) => ({
  left: r2(rand(i, 1) * 100),
  top: r2(40 + rand(i, 2) * 60),
  size: r2(2 + rand(i, 3) * 3),
  duration: r2(9 + rand(i, 4) * 10),
  delay: r2(-rand(i, 5) * 18),
}));

const BLADES = Array.from({ length: 120 }, (_, i) => {
  const x = r2((i / 120) * 1460 - 10 + rand(i, 6) * 10);
  const h = r2(40 + rand(i, 7) * 90);
  const bend = r2((rand(i, 8) - 0.5) * 30);
  const p = (n: number) => r2(n);
  return {
    d: `M${p(x - 2.5)} 160 Q${p(x + bend * 0.4)} ${p(160 - h * 0.55)} ${p(x + bend)} ${p(160 - h)} Q${p(x + bend * 0.4 + 2)} ${p(160 - h * 0.5)} ${p(x + 2.5)} 160 Z`,
    duration: r2(3.5 + rand(i, 9) * 3),
    delay: r2(-rand(i, 10) * 5),
    shade: rand(i, 11),
  };
});

export function ComingSoon() {
  const reduce = useReducedMotion();
  const [state, formProps, pending] = useFormAction(subscribeToLaunch);

  // Gentle mouse parallax: the plant drifts against the pointer, fireflies with it.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const sceneX = useTransform(sx, (v) => v * -18);
  const sceneY = useTransform(sy, (v) => v * -12);
  const glowX = useTransform(sx, (v) => v * 40);
  const glowY = useTransform(sy, (v) => v * 30);

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <main
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-dark text-cream"
    >
      {/* Atmosphere: soft light, warm soil glow and film grain. */}
      <motion.div
        aria-hidden="true"
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -top-1/3 left-1/2 -z-10 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,122,85,0.45)_0%,rgba(47,80,53,0.15)_40%,transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-gold/45 via-gold/10 to-transparent"
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />

      {!reduce &&
        FIREFLIES.map((f, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="firefly pointer-events-none absolute -z-10 rounded-full bg-[#f3e2b3]"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pt-8 lg:px-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <LogoWhite size={44} />
        </motion.div>
        <motion.a
          href="https://wa.me/254748155551"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm font-bold backdrop-blur-sm transition-colors hover:border-gold-light/60 hover:text-gold-light"
        >
          <MessageCircle size={16} />
          <span className="hidden sm:inline">Order on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </motion.a>
      </header>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 pb-44 pt-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:pb-48">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold-light/30 bg-gold-light/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-light"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-light" />
            </span>
            Under Maintenance
          </motion.p>

          <h1 className="mt-7 font-body text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {["Something", "fresh", "is"].map((word, i) => (
              <span key={word} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.55, ease }}
                className="inline-block font-script text-[1.25em] font-bold leading-none text-gold-light"
              >
                growing.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-cream/70"
          >
            We&apos;re making some improvements to our website and will be back shortly. The farm
            hasn&apos;t paused, though: you can still order fresh vegetables, fruits, organic onions
            and farm-raised ducks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease }}
            className="mt-10 max-w-lg"
          >
            {state.ok ? (
              <div role="status" className="flex items-center gap-3 rounded-2xl border border-gold-light/30 bg-gold-light/10 px-5 py-4">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-forest-dark"
                >
                  <Check size={18} />
                </motion.span>
                <p className="text-sm font-semibold">{state.message}</p>
              </div>
            ) : (
              <form {...formProps}>
                <label htmlFor="launch-contact" className="text-sm font-semibold text-cream/80">
                  Get a message when we&apos;re back
                </label>
                <div className="mt-3 flex rounded-full border border-cream/15 bg-cream/[0.06] p-1.5 backdrop-blur-md transition-colors focus-within:border-gold-light/60">
                  <input
                    id="launch-contact"
                    name="contact"
                    placeholder="Email or phone number"
                    autoComplete="email"
                    aria-invalid={Boolean(state.fieldErrors?.contact)}
                    aria-describedby={state.fieldErrors?.contact ? "launch-error" : undefined}
                    className="min-w-0 flex-1 bg-transparent px-4 text-sm text-cream placeholder:text-cream/40 focus:outline-none"
                  />
                  <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                  <motion.button
                    type="submit"
                    disabled={pending}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex shrink-0 items-center gap-2 rounded-full bg-gold-light px-5 py-3 text-sm font-extrabold text-forest-dark disabled:opacity-60"
                  >
                    {pending ? "Adding…" : "Notify me"}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </motion.button>
                </div>
                {state.fieldErrors?.contact && (
                  <p id="launch-error" className="mt-2 pl-4 text-xs font-semibold text-[#f0b8a0]">
                    {state.fieldErrors.contact}
                  </p>
                )}
              </form>
            )}
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/70"
          >
            <li>
              <a href="tel:+254748155551" className="flex items-center gap-2 transition-colors hover:text-gold-light">
                <Phone size={15} className="text-gold-light" /> 0748 155 551
              </a>
            </li>
            <li>
              <a href="mailto:sales@agribyyou.com" className="flex items-center gap-2 transition-colors hover:text-gold-light">
                <Mail size={15} className="text-gold-light" /> sales@agribyyou.com
              </a>
            </li>
          </motion.ul>
        </div>

        <motion.div
          style={{ x: sceneX, y: sceneY }}
          className="order-1 mx-auto w-full max-w-[17rem] sm:max-w-sm lg:order-2 lg:max-w-md"
        >
          <Sprout reduce={Boolean(reduce)} />
        </motion.div>
      </div>

      <Meadow reduce={Boolean(reduce)} />

      <footer className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-5 text-xs text-cream/50 lg:px-10">
          <p>© {new Date().getFullYear()} AgriByYou · By You, For You.</p>
          <a href="/admin" className="transition-colors hover:text-cream">
            Team login
          </a>
        </div>
      </footer>
    </main>
  );
}

/** A seedling that pushes out of the soil, unfurls its leaves and then
 * sways, ringed by a slowly rotating "under construction" badge. */
function Sprout({ reduce }: { reduce: boolean }) {
  const draw = (delay: number, duration = 1.2) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration, delay, ease: "easeInOut" as const },
  });
  const unfurl = (delay: number) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring" as const, stiffness: 90, damping: 11, delay },
  });

  return (
    <div className="relative aspect-square">
      <svg viewBox="0 0 400 400" className={`absolute inset-0 h-full w-full ${reduce ? "" : "animate-[spin_40s_linear_infinite]"}`}>
        <defs>
          <path id="badge-ring" d="M200 200 m-170 0 a170 170 0 1 1 340 0 a170 170 0 1 1 -340 0" />
        </defs>
        <text className="fill-gold-light/70 font-body text-[17px] font-bold uppercase tracking-[0.42em]">
          <textPath href="#badge-ring">
            Under maintenance · Back shortly · AgriByYou ·
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-[15%] rounded-full border border-cream/10 bg-[radial-gradient(circle_at_50%_70%,rgba(96,43,12,0.55),rgba(26,44,29,0.9)_70%)] shadow-[inset_0_0_60px_rgba(0,0,0,0.35)]" />
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease }}
        className="absolute inset-[15%] rounded-full border border-dashed border-gold-light/25"
      />

      <svg viewBox="0 0 200 200" className="absolute inset-[15%] h-[70%] w-[70%]" role="img" aria-label="A seedling growing">
        {/* soil */}
        <motion.path
          d="M30 158 Q100 140 170 158 Q100 176 30 158 Z"
          fill="#3d200c"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease }}
          style={{ originX: "100px", originY: "158px" }}
        />
        {[52, 78, 124, 146].map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={157 + (i % 2) * 3}
            r={1.8}
            fill="#7a4a24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          />
        ))}

        <motion.g
          animate={reduce ? undefined : { rotate: [-2.5, 2.5, -2.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          style={{ originX: "100px", originY: "156px" }}
        >
          {/* stem */}
          <motion.path
            d="M100 156 C100 136 96 112 101 92 C104 80 102 70 100 62"
            fill="none"
            stroke="#8fb486"
            strokeWidth={4}
            strokeLinecap="round"
            {...draw(0.6, 1.4)}
          />

          {/* lower-left leaf */}
          <motion.g {...unfurl(1.7)} style={{ originX: "100px", originY: "118px" }}>
            <path d="M100 118 C84 118 62 108 54 88 C76 86 94 98 100 118 Z" fill="#4f7a55" />
            <motion.path d="M100 118 C86 110 70 100 58 90" fill="none" stroke="#2f5035" strokeWidth={1.2} {...draw(2.1, 0.8)} />
          </motion.g>

          {/* upper-right leaf */}
          <motion.g {...unfurl(2.1)} style={{ originX: "101px", originY: "92px" }}>
            <path d="M101 92 C114 90 136 80 146 58 C122 56 104 70 101 92 Z" fill="#6a9a62" />
            <motion.path d="M101 92 C116 84 130 72 142 61" fill="none" stroke="#2f5035" strokeWidth={1.2} {...draw(2.5, 0.8)} />
          </motion.g>

          {/* bud */}
          <motion.g {...unfurl(2.6)} style={{ originX: "100px", originY: "62px" }}>
            <path d="M100 62 C92 56 92 44 100 36 C108 44 108 56 100 62 Z" fill="#b39882" />
            <path d="M100 62 L100 42" stroke="#602b0c" strokeWidth={1} strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* a little ground sparkle as it breaks through */}
        {!reduce &&
          [-1, 1].map((dir) => (
            <motion.circle
              key={dir}
              cx={100}
              cy={152}
              r={2}
              fill="#f3e2b3"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], x: dir * 22, y: -18 }}
              transition={{ duration: 1.1, delay: 0.75, ease: "easeOut" }}
            />
          ))}
      </svg>
    </div>
  );
}

/** Swaying grass along the bottom edge; each blade rotates from its base on the GPU. */
function Meadow({ reduce }: { reduce: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full sm:h-40"
    >
      {BLADES.map((b, i) => (
        <path
          key={i}
          d={b.d}
          fill={b.shade > 0.66 ? "#2f5035" : b.shade > 0.33 ? "#48654d" : "#1f3a24"}
          className={reduce ? undefined : "blade"}
          style={{ animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        />
      ))}
    </svg>
  );
}
