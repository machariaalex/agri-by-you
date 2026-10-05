import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { titleCase } from "./format";

export function PageHeader({
  title,
  description,
  actions,
  back,
}: {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-8">
      {back && (
        <Link href={back.href} className="text-sm font-semibold text-ink/50 hover:text-forest">
          ← {back.label}
        </Link>
      )}
      <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl text-forest sm:text-4xl">{title}</h1>
          {description && <p className="mt-1 text-sm text-ink/55">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Card({ title, actions, children, className = "" }: { title?: ReactNode; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl bg-white p-5 shadow-[0_10px_30px_-18px_rgba(30,58,18,0.25)] ring-1 ring-forest/5 sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-base font-extrabold text-forest">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

const buttonStyles = {
  primary: "bg-forest text-cream hover:bg-forest-light",
  secondary: "bg-white text-forest ring-1 ring-forest/15 hover:bg-cream",
  danger: "bg-white text-red-700 ring-1 ring-red-200 hover:bg-red-50",
};

export function buttonClass(variant: keyof typeof buttonStyles = "primary") {
  return `inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition-colors disabled:opacity-50 ${buttonStyles[variant]}`;
}

export function LinkButton({ variant, className = "", ...props }: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return <Link {...props} className={`${buttonClass(variant)} ${className}`} />;
}

const tones: Record<string, string> = {
  // lead
  new: "bg-sky-100 text-sky-800",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-violet-100 text-violet-800",
  won: "bg-emerald-100 text-emerald-800",
  lost: "bg-stone-200 text-stone-600",
  // order
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-stone-200 text-stone-600",
  // payment
  unpaid: "bg-red-100 text-red-800",
  partial: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  // partner / content
  prospect: "bg-sky-100 text-sky-800",
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-stone-200 text-stone-600",
  published: "bg-emerald-100 text-emerald-800",
  draft: "bg-stone-200 text-stone-600",
};

export function Badge({ value, label }: { value: string; label?: string }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[value] ?? "bg-cream-dark text-forest"}`}>
      {label ?? titleCase(value)}
    </span>
  );
}

export function Table({ head, children, empty }: { head: ReactNode[]; children: ReactNode; empty?: ReactNode }) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(30,58,18,0.25)] ring-1 ring-forest/5">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-forest/10 text-xs uppercase tracking-wide text-ink/45">
          <tr>
            {head.map((h, i) => (
              <th key={i} className="px-4 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/5">{children}</tbody>
      </table>
      {!hasRows && <div className="px-4 py-12 text-center text-sm text-ink/45">{empty ?? "Nothing here yet."}</div>}
    </div>
  );
}

export function Td({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

/** Table cell whose content links to a record. */
export function RowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-bold text-forest hover:text-gold">
      {children}
    </Link>
  );
}

/** Plain GET form: search box plus optional status filter. Works without JavaScript. */
export function Filters({
  q,
  status,
  statuses,
  placeholder = "Search…",
}: {
  q?: string;
  status?: string;
  statuses?: readonly string[];
  placeholder?: string;
}) {
  return (
    <form className="mb-4 flex flex-wrap gap-2">
      <input
        name="q"
        defaultValue={q}
        placeholder={placeholder}
        aria-label="Search"
        className="min-w-0 basis-full rounded-full border border-forest/10 bg-white px-4 py-2 text-sm focus:border-forest focus:outline-none sm:max-w-xs sm:flex-1 sm:basis-auto"
      />
      {statuses && (
        <select
          name="status"
          defaultValue={status ?? ""}
          aria-label="Filter by status"
          className="rounded-full border border-forest/10 bg-white px-4 py-2 text-sm focus:border-forest focus:outline-none"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {titleCase(s)}
            </option>
          ))}
        </select>
      )}
      <button className={buttonClass("secondary")}>Apply</button>
    </form>
  );
}

export function Stat({ label, value, hint, href }: { label: string; value: ReactNode; hint?: ReactNode; href?: string }) {
  const body = (
    <>
      <p className="text-xs font-bold uppercase tracking-wide text-ink/45">{label}</p>
      <p className="mt-2 font-display text-3xl text-forest">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/50">{hint}</p>}
    </>
  );
  const cls = "block rounded-2xl bg-white p-5 shadow-[0_10px_30px_-18px_rgba(30,58,18,0.25)] ring-1 ring-forest/5";
  return href ? (
    <Link href={href} className={`${cls} transition-transform hover:-translate-y-0.5`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
