export function OliveBranch({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="72"
      height="140"
      viewBox="0 0 72 140"
      fill="none"
      className={flip ? "scale-x-[-1]" : ""}
    >
      <path d="M36 0V140" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      {[18, 40, 62, 84, 106].map((y, i) => (
        <g key={y} opacity="0.9">
          <ellipse cx={36 - 16} cy={y} rx="13" ry="6" fill="white" transform={`rotate(-30 ${36 - 16} ${y})`} />
          {i < 4 && (
            <ellipse cx={36 + 16} cy={y + 11} rx="13" ry="6" fill="white" transform={`rotate(30 ${36 + 16} ${y + 11})`} />
          )}
        </g>
      ))}
    </svg>
  );
}
