import { asc } from "drizzle-orm";
import { ActionForm, ConfirmButton, TextField } from "@/components/admin/form";
import { formatDate } from "@/components/admin/format";
import { Card, PageHeader } from "@/components/admin/ui";
import { db, schema } from "@/db";
import { addAdmin, changePassword, removeAdmin } from "@/lib/actions/auth";
import { requireAdmin } from "@/lib/auth/session";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const me = await requireAdmin();
  const admins = await db
    .select({ id: schema.adminUsers.id, name: schema.adminUsers.name, email: schema.adminUsers.email, createdAt: schema.adminUsers.createdAt })
    .from(schema.adminUsers)
    .orderBy(asc(schema.adminUsers.createdAt));

  return (
    <>
      <PageHeader title="Settings" description={`Signed in as ${me.email}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Change your password">
          <ActionForm action={changePassword} submitLabel="Update password" resetOnSuccess>
            <TextField name="current" label="Current password" type="password" />
            <TextField name="password" label="New password" type="password" hint="At least 10 characters." />
            <TextField name="confirm" label="Confirm new password" type="password" />
          </ActionForm>
        </Card>

        <Card title="Team">
          <ul className="mb-6 divide-y divide-forest/5">
            {admins.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="font-bold text-forest">
                    {a.name} {a.id === me.id && <span className="text-xs font-semibold text-ink/40">(you)</span>}
                  </p>
                  <p className="truncate text-xs text-ink/50">
                    {a.email} · since {formatDate(a.createdAt)}
                  </p>
                </div>
                {a.id !== me.id && (
                  <ConfirmButton action={removeAdmin.bind(null, a.id)} label="Remove" confirm={`Remove ${a.name}'s admin access?`} variant="secondary" />
                )}
              </li>
            ))}
          </ul>
          <h3 className="mb-3 text-sm font-extrabold text-forest">Add an admin</h3>
          <ActionForm action={addAdmin} submitLabel="Add admin" resetOnSuccess>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField name="name" label="Name" />
              <TextField name="email" label="Email" type="email" />
            </div>
            <TextField name="password" label="Temporary password" type="password" hint="Share it with them privately; they can change it here." />
          </ActionForm>
        </Card>
      </div>
    </>
  );
}
