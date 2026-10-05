"use server";

import { z } from "zod";
import { db, schema } from "@/db";
import { parseForm, type FormState } from "@/lib/forms";
import { optionalEmail, optionalText, requiredText } from "@/lib/validation";

const inquirySchema = z
  .object({
    name: requiredText("Your name").max(120),
    email: optionalEmail,
    phone: optionalText,
    message: requiredText("A message").max(5000),
    // Honeypot: hidden from people, filled in by bots.
    company: z.string().optional(),
  })
  .refine((v) => v.email || v.phone, { path: ["email"], message: "Add an email or phone number so we can reply" });

/** Public contact form → new lead in the CRM. */
export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parseForm(inquirySchema, formData);
  if (parsed.error) return parsed.error;

  const { company, ...lead } = parsed.data;
  if (company) return { ok: true, message: "Thanks! We'll be in touch shortly." };

  await db.insert(schema.leads).values({ ...lead, source: "website", status: "new" });
  return { ok: true, message: "Thanks! Your message is in — we'll get back to you shortly." };
}

const launchSchema = z
  .object({
    contact: requiredText("Your email or phone").max(200),
    company: z.string().optional(),
  })
  .refine((v) => z.email().safeParse(v.contact).success || /^\+?[\d\s()-]{7,}$/.test(v.contact), {
    path: ["contact"],
    message: "Enter a valid email address or phone number",
  });

/** "Notify me" on the maintenance page → new lead in the CRM. */
export async function subscribeToLaunch(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = parseForm(launchSchema, formData);
  if (parsed.error) return parsed.error;

  const { contact, company } = parsed.data;
  if (company) return { ok: true, message: "You're on the list." };

  const isEmail = contact.includes("@");
  await db.insert(schema.leads).values({
    name: isEmail ? contact.split("@")[0] : contact,
    email: isEmail ? contact.toLowerCase() : null,
    phone: isEmail ? null : contact,
    interest: "Website back online",
    message: "Asked to be notified when the website is back online.",
    source: "website",
    status: "new",
  });
  return { ok: true, message: "You're on the list — we'll let you know as soon as we're back." };
}
