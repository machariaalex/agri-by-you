"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireAdmin } from "@/lib/auth/session";
import { parseForm, type FormState } from "@/lib/forms";
import { checkbox, optionalDate, optionalText, requiredText, wholeNumber } from "@/lib/validation";

const { orderItems, orders, products } = schema;

/* ---------- Products ---------- */

const productSchema = z.object({
  name: requiredText("Name"),
  unit: requiredText("Unit"),
  price: wholeNumber("Price"),
  active: checkbox,
});

export async function saveProduct(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(productSchema, formData);
  if (parsed.error) return parsed.error;

  if (id === null) await db.insert(products).values(parsed.data);
  else await db.update(products).set(parsed.data).where(eq(products.id, id));
  revalidatePath("/admin/products");
  return { ok: true, message: id === null ? "Product added." : "Saved." };
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  // Past order lines keep their description and price; only the link is cleared.
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
}

/* ---------- Orders ---------- */

const itemSchema = z.object({
  productId: z.number().int().nullable(),
  description: z.string().trim().min(1, "Every line needs a description"),
  quantity: z.number().positive("Quantities must be above zero"),
  unitPrice: z.number().int().min(0, "Prices can't be negative"),
});

const orderSchema = z.object({
  customerId: z.coerce.number({ error: "Choose a customer" }).int().positive("Choose a customer"),
  status: z.enum(schema.orderStatus.enumValues),
  orderDate: z.iso.date("Enter the order date"),
  deliveryDate: optionalDate,
  amountPaid: wholeNumber("Amount paid"),
  notes: optionalText,
  items: z
    .string()
    .transform((raw, ctx) => {
      try {
        return JSON.parse(raw) as unknown;
      } catch {
        ctx.addIssue({ code: "custom", message: "Couldn't read the order lines" });
        return z.NEVER;
      }
    })
    .pipe(z.array(itemSchema).min(1, "Add at least one line")),
});

function paymentStatusFor(total: number, paid: number) {
  if (paid <= 0) return "unpaid" as const;
  return paid >= total ? ("paid" as const) : ("partial" as const);
}

export async function saveOrder(id: number | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = parseForm(orderSchema, formData);
  if (parsed.error) return parsed.error;

  const { items, ...order } = parsed.data;
  const total = Math.round(items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0));
  const values = { ...order, total, paymentStatus: paymentStatusFor(total, order.amountPaid) };

  // Reserve the id up front so the order and its lines can be written in one atomic batch.
  const orderId =
    id ?? (await db.execute<{ id: number }>(sql`select nextval(pg_get_serial_sequence('orders', 'id'))::int as id`)).rows[0].id;
  const lines = items.map((item) => ({ ...item, orderId }));

  if (id === null) {
    await db.batch([db.insert(orders).values({ ...values, id: orderId }), db.insert(orderItems).values(lines)]);
  } else {
    await db.batch([
      db.update(orders).set(values).where(eq(orders.id, id)),
      db.delete(orderItems).where(eq(orderItems.orderId, id)),
      db.insert(orderItems).values(lines),
    ]);
  }

  if (id === null) redirect(`/admin/orders/${orderId}`);
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteOrder(id: number) {
  await requireAdmin();
  await db.delete(orders).where(eq(orders.id, id));
  redirect("/admin/orders");
}
