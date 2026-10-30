import LogoSvg from "@/assets/logo.svg";

type LogoProps = {
  className?: string;
};

/**
 * Brand script logo. The SVG is single-color, so we render it as a CSS mask
 * and tint it with the current text color (nude by default).
 */
export function Logo({ className = "h-12 text-nude" }: LogoProps) {
  const src = typeof LogoSvg === "string" ? LogoSvg : LogoSvg.src;
  const mask = `url(${src}) center / contain no-repeat`;
  return (
    <span
      role="img"
      aria-label="Anyi Trujillo Beauty Studio"
      className={`inline-block aspect-[1034/794] bg-current ${className}`}
      style={{ mask, WebkitMask: mask }}
    />
  );
}
