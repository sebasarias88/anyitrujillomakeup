import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "ink" | "text";

export const buttonStyles: Record<ButtonVariant, string> = {
  // Black pill, as in the brand logo; the yellow is kept for tiny accents only.
  primary: "min-h-12 px-7 rounded-full bg-ink text-paper hover:bg-ink-soft",
  ink: "min-h-12 px-7 rounded-full border border-ink text-ink hover:bg-ink hover:text-paper",
  text: "min-h-11 text-ink underline decoration-1 underline-offset-[6px] hover:decoration-2",
};

export const buttonBase =
  "pressable inline-flex items-center justify-center gap-2.5 text-[0.82rem] font-medium tracking-[0.1em] uppercase select-none";

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

/** Internal navigation styled as a button. External WhatsApp links use WhatsAppButton. */
export function ButtonLink({ variant = "primary", className = "", children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} className={`${buttonBase} ${buttonStyles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
