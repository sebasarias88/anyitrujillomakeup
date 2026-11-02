import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "ink" | "text";

export const buttonStyles: Record<ButtonVariant, string> = {
  // Gold is reserved for the main action: dark text on gold, never white.
  primary: "min-h-12 px-6 bg-gold text-ink hover:bg-gold-deep",
  ink: "min-h-12 px-6 bg-ink text-paper hover:bg-ink-soft",
  text: "min-h-11 text-ink underline decoration-1 underline-offset-[6px] hover:decoration-2",
};

export const buttonBase =
  "pressable inline-flex items-center justify-center gap-2.5 text-[0.95rem] font-semibold select-none";

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
