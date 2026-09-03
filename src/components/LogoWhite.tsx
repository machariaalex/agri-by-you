import Image from "next/image";

const ASPECT_RATIO = 1547 / 640;

export function LogoWhite({ size = 44, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/images/logo-white.png"
      alt="AgriByYou"
      width={Math.round(size * ASPECT_RATIO)}
      height={size}
      className={className}
      style={{ height: size, width: "auto" }}
    />
  );
}
