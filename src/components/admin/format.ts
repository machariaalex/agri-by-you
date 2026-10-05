export function formatKES(amount: number) {
  return `KES ${amount.toLocaleString("en-KE")}`;
}

/** Accepts a Date or a Postgres date string ("2026-10-02"). */
export function formatDate(value: Date | string | null | undefined, withTime = false) {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value.length === 10 ? `${value}T00:00:00` : value) : value;
  return d.toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

export function todayISO() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });
}

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
