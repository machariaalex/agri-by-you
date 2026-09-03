export const TRANSITION_EVENT = "app:page-transition";

/** Pass a "#section" hash to scroll within the current page, or a real
 * path like "/services" to route to a dedicated page — both go through
 * the same branded loading transition. */
export function navigateTo(target: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<string>(TRANSITION_EVENT, { detail: target }));
}
