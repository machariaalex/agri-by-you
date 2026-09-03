"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoWhite } from "./LogoWhite";
import { TRANSITION_EVENT } from "@/lib/pageTransition";

export function PageLoader() {
  const [active, setActive] = useState(false);
  const timeouts = useRef<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    function handle(e: Event) {
      const target = (e as CustomEvent<string>).detail;
      const isHash = target.startsWith("#");

      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];

      setActive(true);
      document.documentElement.style.overflow = "hidden";

      const jump = window.setTimeout(() => {
        const prevBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";

        if (isHash) {
          if (target === "#top") {
            window.scrollTo(0, 0);
          } else {
            document.querySelector(target)?.scrollIntoView({ block: "start" });
          }
          window.history.pushState(null, "", target);
        } else {
          router.push(target);
          window.scrollTo(0, 0);
        }

        document.documentElement.style.scrollBehavior = prevBehavior;

        const reveal = window.setTimeout(
          () => {
            setActive(false);
            document.documentElement.style.overflow = "";
          },
          isHash ? 220 : 320,
        );
        timeouts.current.push(reveal);
      }, 650);
      timeouts.current.push(jump);
    }

    window.addEventListener(TRANSITION_EVENT, handle);
    return () => {
      window.removeEventListener(TRANSITION_EVENT, handle);
      timeouts.current.forEach((t) => clearTimeout(t));
    };
  }, [router]);

  return (
    <div
      aria-hidden={!active}
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-forest-dark transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <LogoWhite size={64} />
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/25 border-t-gold" />
      </div>
    </div>
  );
}
