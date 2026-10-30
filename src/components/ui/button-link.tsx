import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-nude text-ink hover:bg-champagne shadow-[0_10px_40px_-12px_rgb(208_154_115/0.7)]",
  outline: "border border-nude/50 text-ivory hover:border-nude hover:bg-nude/10",
  ghost: "text-ivory hover:text-nude",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
};

export function ButtonLink({ variant = "primary", external, className = "", children, ...props }: ButtonLinkProps) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 text-sm font-semibold tracking-wide transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
