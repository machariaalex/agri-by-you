import type { z } from "zod";

export type FormState = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string>;
};

export const initialFormState: FormState = {};

/** Validates FormData against a schema; on failure returns a FormState with the first error per field. */
export function parseForm<T extends z.ZodType>(
  schema: T,
  formData: FormData,
): { data: z.infer<T>; error?: undefined } | { data?: undefined; error: FormState } {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("$ACTION")) continue;
    raw[key] = typeof value === "string" ? value.trim() : value;
  }
  const result = schema.safeParse(raw);
  if (result.success) return { data: result.data };

  const fieldErrors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    fieldErrors[key] ??= issue.message;
  }
  return { error: { ok: false, message: "Please fix the highlighted fields.", fieldErrors } };
}
