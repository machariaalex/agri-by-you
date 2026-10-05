import type { Metadata } from "next";
import { count, eq } from "drizzle-orm";
import { Sidebar } from "@/components/admin/Sidebar";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: { default: "Admin — AgriByYou", template: "%s — AgriByYou Admin" },
  robots: { index: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  const [{ n }] = await db.select({ n: count() }).from(schema.leads).where(eq(schema.leads.status, "new"));

  return (
    <div className="min-h-full flex-1 bg-cream">
      <Sidebar user={user} newLeads={n} />
      <main className="px-4 py-8 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
