"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { parseForm, type FormState } from "@/lib/forms";
import { optionalDate, optionalEmail, optionalText, requiredText } from "@/lib/validation";

const { activities, customers, leads, partners } = schema;
type EntityType = (typeof schema.entityType.enumValues)[number];

const paths: Record<EntityType, string> = {
  lead: "/admin/leads",
  customer: "/admin/customers",
  partner: "/admin/partners",
};

/* ---------- Leads ---------- */

const leadSchema = z.object({
  name: requiredText("Name"),
  email: optionalEmail,
  phone: optionalText,
  interest: optionalText,
  message: optionalText,
  source: z.enum(schema.leadSource.enumValues),
  status: z.enum(schema.leadStatus.enumValues),
  followUpOn: optionalDate,
});

export async function saveLead(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(leadSchema, formData);
  if (parsed.error) return parsed.error;

  if (id === null) {
    const [row] = await db.insert(leads).values(parsed.data).returning({ id: leads.id });
    redirect(`/admin/leads/${row.id}`);
  }
  await db.update(leads).set(parsed.data).where(eq(leads.id, id));
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Saved." };
}

export async function setLeadStatus(id: number, status: (typeof schema.leadStatus.enumValues)[number]) {
  await requireAdmin();
  await db.update(leads).set({ status }).where(eq(leads.id, id));
  revalidatePath("/admin", "layout");
}

export async function deleteLead(id: number) {
  await requireAdmin();
  await db.delete(activities).where(and(eq(activities.entityType, "lead"), eq(activities.entityId, id)));
  await db.delete(leads).where(eq(leads.id, id));
  redirect("/admin/leads");
}

/** Creates a customer from the lead (or reuses its linked one), marks the lead won, and opens the customer. */
export async function convertLead(id: number) {
  await requireAdmin();
  const [lead] = await db.select().from(leads).where(eq(leads.id, id));
  if (!lead) redirect("/admin/leads");
  if (lead.customerId) redirect(`/admin/customers/${lead.customerId}`);

  const [customer] = await db
    .insert(customers)
    .values({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      notes: [lead.interest && `Interested in: ${lead.interest}`, lead.message].filter(Boolean).join("\n\n") || null,
    })
    .returning({ id: customers.id });
  await db.update(leads).set({ status: "won", customerId: customer.id }).where(eq(leads.id, id));
  redirect(`/admin/customers/${customer.id}`);
}

/* ---------- Customers ---------- */

const customerSchema = z.object({
  name: requiredText("Name"),
  type: z.enum(schema.customerType.enumValues),
  contactName: optionalText,
  email: optionalEmail,
  phone: optionalText,
  location: optionalText,
  notes: optionalText,
});

export async function saveCustomer(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(customerSchema, formData);
  if (parsed.error) return parsed.error;

  if (id === null) {
    const [row] = await db.insert(customers).values(parsed.data).returning({ id: customers.id });
    redirect(`/admin/customers/${row.id}`);
  }
  await db.update(customers).set(parsed.data).where(eq(customers.id, id));
  revalidatePath(`/admin/customers/${id}`);
  return { ok: true, message: "Saved." };
}

export async function deleteCustomer(id: number): Promise<FormState> {
  await requireAdmin();
  const [order] = await db.select({ id: schema.orders.id }).from(schema.orders).where(eq(schema.orders.customerId, id)).limit(1);
  if (order) return { ok: false, message: "This customer has orders. Delete or reassign them first." };
  await db.delete(activities).where(and(eq(activities.entityType, "customer"), eq(activities.entityId, id)));
  await db.delete(customers).where(eq(customers.id, id));
  redirect("/admin/customers");
}

/* ---------- Partners & suppliers ---------- */

const partnerSchema = z.object({
  name: requiredText("Name"),
  kind: z.enum(schema.partnerKind.enumValues),
  status: z.enum(schema.partnerStatus.enumValues),
  contactName: optionalText,
  email: optionalEmail,
  phone: optionalText,
  location: optionalText,
  offering: optionalText,
  notes: optionalText,
});

export async function savePartner(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(partnerSchema, formData);
  if (parsed.error) return parsed.error;

  if (id === null) {
    const [row] = await db.insert(partners).values(parsed.data).returning({ id: partners.id });
    redirect(`/admin/partners/${row.id}`);
  }
  await db.update(partners).set(parsed.data).where(eq(partners.id, id));
  revalidatePath(`/admin/partners/${id}`);
  return { ok: true, message: "Saved." };
}

export async function deletePartner(id: number) {
  await requireAdmin();
  await db.delete(activities).where(and(eq(activities.entityType, "partner"), eq(activities.entityId, id)));
  await db.delete(partners).where(eq(partners.id, id));
  redirect("/admin/partners");
}

/* ---------- Activity log ---------- */

const activitySchema = z.object({
  kind: z.enum(schema.activityKind.enumValues),
  body: requiredText("A note"),
});

export async function addActivity(
  entityType: EntityType,
  entityId: number,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const me = await requireAdmin();
  const parsed = parseForm(activitySchema, formData);
  if (parsed.error) return parsed.error;

  await db.insert(activities).values({ ...parsed.data, entityType, entityId, authorId: me.id });
  // Logging contact with a new lead moves it along the pipeline.
  if (entityType === "lead" && parsed.data.kind !== "note") {
    await db.update(leads).set({ status: "contacted" }).where(and(eq(leads.id, entityId), eq(leads.status, "new")));
  }
  revalidatePath(`${paths[entityType]}/${entityId}`);
  return { ok: true, message: "Logged." };
}

export async function deleteActivity(id: number) {
  await requireAdmin();
  const [row] = await db.delete(activities).where(eq(activities.id, id)).returning();
  if (row) revalidatePath(`${paths[row.entityType]}/${row.entityId}`);
}
