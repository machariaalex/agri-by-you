export function BarnSketch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 120"
      fill="none"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMax slice"
    >
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.5">
        <path d="M20 110V70L55 45L90 70V110" />
        <path d="M20 70H90" />
        <rect x="45" y="85" width="20" height="25" />
        <circle cx="115" cy="60" r="14" />
        <path d="M115 46V30" />
        <path d="M150 110V60H190V110" />
        <path d="M150 60L170 40L190 60" />
        <path d="M160 110V90H180V110" />
        <path d="M220 110C220 90 235 75 255 75C275 75 290 90 290 110" />
        <path d="M310 110V50L330 35L350 50V110" />
        <path d="M330 35V20" />
        <circle cx="330" cy="16" r="4" />
      </g>
    </svg>
  );
}
