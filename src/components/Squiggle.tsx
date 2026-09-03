export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="64"
      height="18"
      viewBox="0 0 64 18"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M2 14C6 6 9 6 12 12C15 18 18 6 21 4C24 2 27 14 30 14C33 14 35 4 38 4C41 4 43 14 46 14C49 14 51 6 54 6C57 6 59 12 62 12"
        stroke="var(--color-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
