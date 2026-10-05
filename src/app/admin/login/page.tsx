import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in — AgriByYou Admin", robots: { index: false } };

export default async function LoginPage({ searchParams }: PageProps<"/admin/login">) {
  const { next } = await searchParams;
  return (
    <main className="wheat-pattern flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_20px_60px_-25px_rgba(30,58,18,0.35)] ring-1 ring-forest/5">
        <div className="flex justify-center">
          <Logo size={44} />
        </div>
        <h1 className="mt-6 text-center font-display text-3xl text-forest">Admin sign in</h1>
        <p className="mt-1 mb-6 text-center text-sm text-ink/50">Dashboard &amp; CRM</p>
        <LoginForm next={typeof next === "string" ? next : undefined} />
      </div>
    </main>
  );
}
