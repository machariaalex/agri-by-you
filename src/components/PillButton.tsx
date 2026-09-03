"use client";

import { ArrowRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType, MouseEvent } from "react";
import { navigateTo } from "@/lib/pageTransition";

type Variant = "dark" | "light";

export function PillButton<T extends ElementType = "a">({
  as,
  variant = "dark",
  children,
  className = "",
  onClick,
  ...props
}: {
  as?: T;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "onClick">) {
  const Component = as || "a";
  const styles =
    variant === "dark"
      ? "bg-forest text-cream hover:bg-forest-light"
      : "bg-cream text-forest hover:bg-white";

  function handleClick(e: MouseEvent<HTMLElement>) {
    const href = (props as { href?: string }).href;
    if (Component === "a" && typeof href === "string" && (href.startsWith("#") || href.startsWith("/"))) {
      e.preventDefault();
      navigateTo(href);
    }
    onClick?.(e);
  }

  return (
    <Component
      onClick={handleClick}
      className={`group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(30,40,20,0.35)] ${styles} ${className}`}
      {...props}
    >
      {children}
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-forest-dark transition-transform duration-300 group-hover:rotate-45">
        <ArrowRight size={16} />
      </span>
    </Component>
  );
}
