"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { FormState } from "@/lib/forms";
import { useFormAction } from "@/lib/useFormAction";
import { titleCase } from "./format";
import { buttonClass } from "./ui";

const ErrorsContext = createContext<Record<string, string>>({});

export const inputClass =
  "w-full rounded-xl border border-forest/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/10 aria-[invalid=true]:border-red-400";

export function ActionForm({
  action,
  children,
  submitLabel = "Save",
  resetOnSuccess = false,
  className = "grid gap-4",
  footer,
}: {
  action: (prev: FormState, formData: FormData) => Promise<FormState>;
  children: ReactNode;
  submitLabel?: string;
  resetOnSuccess?: boolean;
  className?: string;
  footer?: ReactNode;
}) {
  const [state, formProps, pending] = useFormAction(action);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && resetOnSuccess) ref.current?.reset();
  }, [state, resetOnSuccess]);

  return (
    <ErrorsContext.Provider value={state.fieldErrors ?? {}}>
      <form ref={ref} {...formProps} className={className}>
        {children}
        <div className="flex flex-wrap items-center gap-3">
          <SubmitButton label={submitLabel} pending={pending} />
          {state.message && (
            <p role="status" className={`text-sm font-semibold ${state.ok ? "text-emerald-700" : "text-red-700"}`}>
              {state.message}
            </p>
          )}
          {footer}
        </div>
      </form>
    </ErrorsContext.Provider>
  );
}

export function SubmitButton({ label, pending, variant = "primary" }: { label: string; pending: boolean; variant?: "primary" | "secondary" | "danger" }) {
  return (
    <button type="submit" disabled={pending} className={buttonClass(variant)}>
      {pending ? "Saving…" : label}
    </button>
  );
}

function Wrapper({ name, label, hint, children, className = "" }: { name: string; label: string; hint?: ReactNode; children: ReactNode; className?: string }) {
  const error = useContext(ErrorsContext)[name];
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/55">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs font-semibold text-red-700">{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-ink/45">{hint}</p>
      )}
    </div>
  );
}

type Common = { name: string; label: string; hint?: ReactNode; className?: string; required?: boolean };

export function TextField({
  type = "text",
  defaultValue,
  placeholder,
  ...field
}: Common & { type?: string; defaultValue?: string | number | null; placeholder?: string; step?: string }) {
  const invalid = Boolean(useContext(ErrorsContext)[field.name]);
  return (
    <Wrapper {...field}>
      <input
        id={`f-${field.name}`}
        name={field.name}
        type={type}
        step={field.step}
        required={field.required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={inputClass}
      />
    </Wrapper>
  );
}

export function TextArea({ defaultValue, rows = 4, placeholder, ...field }: Common & { defaultValue?: string | null; rows?: number; placeholder?: string }) {
  const invalid = Boolean(useContext(ErrorsContext)[field.name]);
  return (
    <Wrapper {...field}>
      <textarea
        id={`f-${field.name}`}
        name={field.name}
        rows={rows}
        required={field.required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={inputClass}
      />
    </Wrapper>
  );
}

export function SelectField({
  options,
  defaultValue,
  emptyLabel,
  ...field
}: Common & {
  options: readonly (string | { value: string | number; label: string })[];
  defaultValue?: string | number | null;
  emptyLabel?: string;
}) {
  const invalid = Boolean(useContext(ErrorsContext)[field.name]);
  return (
    <Wrapper {...field}>
      <select
        id={`f-${field.name}`}
        name={field.name}
        defaultValue={defaultValue ?? ""}
        aria-invalid={invalid}
        className={inputClass}
      >
        {emptyLabel !== undefined && <option value="">{emptyLabel}</option>}
        {options.map((o) => {
          const opt = typeof o === "string" ? { value: o, label: titleCase(o) } : o;
          return (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-semibold text-ink/75">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 accent-forest" />
      {label}
    </label>
  );
}

/** Small inline form for a destructive action, with a confirm prompt. */
export function ConfirmButton({
  action,
  label = "Delete",
  confirm = "Delete this record? This can't be undone.",
  variant = "danger",
}: {
  action: () => Promise<void | FormState>;
  label?: string;
  confirm?: string;
  variant?: "primary" | "secondary" | "danger";
}) {
  const [error, setError] = useState<string>();
  return (
    <form
      action={async () => {
        const result = await action();
        setError(result && !result.ok ? result.message : undefined);
      }}
      onSubmit={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
      className="flex flex-col items-end gap-1"
    >
      <button type="submit" className={buttonClass(variant)}>
        {label}
      </button>
      {error && (
        <p role="alert" className="max-w-xs text-right text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}
