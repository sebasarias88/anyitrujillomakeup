"use client";

import { useEffect, useState, type ReactNode } from "react";
import { whatsappUrl } from "@/lib/site";
import { buttonBase, buttonStyles, type ButtonVariant } from "./button-link";
import { WhatsAppIcon } from "./icons";
import { Spinner } from "./spinner";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: boolean;
  /** Disabled until the visitor has given the data the message needs. */
  disabled?: boolean;
  disabledLabel?: string;
};

/**
 * Opens WhatsApp with a pre-filled message. WhatsApp can take a moment to open
 * (app hand-off on phones), so the button shows a loading state meanwhile and
 * blocks double taps. The spinner sits over the invisible label so the button
 * keeps its size.
 */
export function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className = "",
  icon = true,
  disabled = false,
  disabledLabel,
}: WhatsAppButtonProps) {
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (!opening) return;
    const done = () => setOpening(false);
    const timer = window.setTimeout(done, 2500);
    window.addEventListener("focus", done);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("focus", done);
    };
  }, [opening]);

  if (disabled) {
    return (
      <button
        type="button"
        disabled
        className={`${buttonBase} ${buttonStyles[variant]} cursor-not-allowed bg-marble-deep text-ink-soft hover:bg-marble-deep ${className}`}
      >
        {disabledLabel ?? children}
      </button>
    );
  }

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-busy={opening}
      aria-disabled={opening}
      onClick={(event) => {
        if (opening) event.preventDefault();
        else setOpening(true);
      }}
      className={`${buttonBase} ${buttonStyles[variant]} relative ${className}`}
    >
      <span className={`inline-flex items-center gap-2.5 ${opening ? "invisible" : ""}`}>
        {icon ? <WhatsAppIcon className="size-[1.1em]" /> : null}
        {children}
      </span>
      {opening ? (
        <span className="absolute inset-0 flex items-center justify-center gap-2">
          <Spinner />
          <span role="status">Abriendo WhatsApp…</span>
        </span>
      ) : null}
    </a>
  );
}
