"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { initialFormState, type FormState } from "./forms";

/**
 * useActionState for forms that keep what the user typed when the action returns errors.
 * React resets a <form action> after every submission; dispatching from onSubmit avoids that,
 * while the action prop still lets the form work before hydration.
 */
export function useFormAction(action: (prev: FormState, formData: FormData) => Promise<FormState>) {
  const [state, formAction, pending] = useActionState(action, initialFormState);
  const formProps = {
    action: formAction,
    noValidate: true,
    onSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      startTransition(() => formAction(data));
    },
  };
  return [state, formProps, pending] as const;
}
