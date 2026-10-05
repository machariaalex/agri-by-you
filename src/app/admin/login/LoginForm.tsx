"use client";

import { login } from "@/lib/actions/auth";
import { useFormAction } from "@/lib/useFormAction";
import { inputClass } from "@/components/admin/form";
import { buttonClass } from "@/components/admin/ui";

export function LoginForm({ next }: { next?: string }) {
  const [state, formProps, pending] = useFormAction(login);
  const errors = state.fieldErrors ?? {};
  return (
    <form {...formProps} className="grid gap-4">
      {next && <input type="hidden" name="next" value={next} />}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/55">
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} aria-invalid={!!errors.email} />
        {errors.email && <p className="mt-1 text-xs font-semibold text-red-700">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/55">
          Password
        </label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} aria-invalid={!!errors.password} />
        {errors.password && <p className="mt-1 text-xs font-semibold text-red-700">{errors.password}</p>}
      </div>
      {state.message && !state.ok && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className={`${buttonClass()} py-3`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
