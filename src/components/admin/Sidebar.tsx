"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Briefcase,
  ExternalLink,
  Handshake,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Package,
  Settings,
  ShoppingBasket,
  Sprout,
  Users,
  X,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { LogoWhite } from "@/components/LogoWhite";

const groups = [
  { label: null, links: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }] },
  {
    label: "CRM",
    links: [
      { href: "/admin/leads", label: "Leads", icon: Inbox },
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/partners", label: "Partners & suppliers", icon: Handshake },
    ],
  },
  {
    label: "Sales",
    links: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingBasket },
      { href: "/admin/products", label: "Products", icon: Package },
    ],
  },
  {
    label: "Website",
    links: [
      { href: "/admin/content/posts", label: "Journal", icon: BookOpen },
      { href: "/admin/content/services", label: "Services", icon: Sprout },
      { href: "/admin/content/projects", label: "Projects", icon: Briefcase },
      { href: "/admin/content/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    ],
  },
];

export function Sidebar({ user, newLeads }: { user: { name: string; email: string }; newLeads: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  const nav = (
    <nav className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-6">
      <Link href="/admin" className="px-2" onClick={() => setOpen(false)}>
        <LogoWhite size={36} />
      </Link>
      {groups.map((group, i) => (
        <div key={i}>
          {group.label && <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-widest text-cream/40">{group.label}</p>}
          <ul className="space-y-0.5">
            {group.links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive(href) ? "bg-cream text-forest" : "text-cream/75 hover:bg-white/10 hover:text-cream"
                  }`}
                >
                  <Icon size={17} />
                  <span className="flex-1">{label}</span>
                  {href === "/admin/leads" && newLeads > 0 && (
                    <span className="rounded-full bg-gold-light px-2 text-xs font-extrabold text-forest-dark">{newLeads}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-auto space-y-0.5 border-t border-white/10 pt-4">
        <Link
          href="/admin/settings"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold ${
            isActive("/admin/settings") ? "bg-cream text-forest" : "text-cream/75 hover:bg-white/10"
          }`}
        >
          <Settings size={17} /> Settings
        </Link>
        <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-cream/75 hover:bg-white/10">
          <ExternalLink size={17} /> View website
        </a>
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-cream/75 hover:bg-white/10">
            <LogOut size={17} /> Sign out
          </button>
        </form>
        <p className="truncate px-3 pt-2 text-xs text-cream/40" title={user.email}>
          {user.name}
        </p>
      </div>
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-forest-dark px-4 py-3 lg:hidden">
        <LogoWhite size={30} />
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-cream">
          <Menu size={22} />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-gradient-to-b from-forest to-forest-dark lg:block">{nav}</aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50" />
          <aside className="absolute inset-y-0 left-0 w-72 bg-gradient-to-b from-forest to-forest-dark">
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-3 top-5 text-cream/70">
              <X size={20} />
            </button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
