import { z } from "zod";

/** Empty form inputs arrive as "" — store them as null. */
export const optionalText = z
  .string()
  .optional()
  .transform((v) => (v ? v : null));

export const optionalEmail = z
  .union([z.literal(""), z.email("Enter a valid email")])
  .optional()
  .transform((v) => (v ? v.toLowerCase() : null));

export const optionalDate = z
  .union([z.literal(""), z.iso.date("Enter a valid date")])
  .optional()
  .transform((v) => (v ? v : null));

export const requiredText = (label: string) => z.string({ error: `${label} is required` }).min(1, `${label} is required`);

/** Unchecked checkboxes are absent from FormData. */
export const checkbox = z
  .string()
  .optional()
  .transform((v) => v === "on" || v === "true");

export const wholeNumber = (label: string) =>
  z.coerce.number({ error: `${label} must be a number` }).int(`${label} must be a whole number`).min(0, `${label} can't be negative`);
