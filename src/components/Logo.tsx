import Image from "next/image";

const ASPECT_RATIO = 1652 / 612;

export function Logo({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="AgriByYou"
      width={Math.round(size * ASPECT_RATIO)}
      height={size}
      priority
      className={className}
      style={{ height: size, width: "auto" }}
    />
  );
}
