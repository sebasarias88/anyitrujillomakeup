"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { pageCovers } from "@/lib/images";
import { business, navLinks as pages } from "@/lib/site";

type MobileMenuProps = { pathname: string; message: string };

/**
 * Full-screen editorial index on the light ground. Built on a modal <dialog>, which
 * gives focus trapping, Escape to close and an inert page for free; the
 * opening circle grows from the trigger (see .mobile-menu in globals.css).
 */
export function MobileMenu({ pathname, message }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Close when the route changes (a link was followed).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close on navigation
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="pressable min-h-11 rounded-full border border-ink px-5 text-[0.75rem] tracking-[0.16em] uppercase lg:hidden"
      >
        Menú
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label="Menú"
        className="mobile-menu bg-paper m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto p-0 text-ink"
      >
        <div className="container-page flex min-h-full flex-col">
          <div className="flex h-[4.5rem] items-center justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="pressable min-h-11 rounded-full border border-ink px-5 text-[0.75rem] tracking-[0.16em] uppercase"
            >
              Cerrar
            </button>
          </div>

          <nav aria-label="Menú principal" className="mt-2">
            <ul>
              {pages.map((page, index) => {
                const active = pathname === page.path;
                return (
                  <li key={page.path} className="mobile-menu-item" style={{ "--i": index } as CSSProperties}>
                    <Link
                      href={page.path}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between gap-4 py-2.5"
                    >
                      <span
                        className={`font-display text-[2.4rem] leading-none tracking-[-0.01em] ${
                          active ? "italic text-nude-deep" : ""
                        }`}
                      >
                        {page.label}
                      </span>
                      <span className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={pageCovers[page.path]} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mobile-menu-item mt-auto space-y-5 pt-10 pb-8" style={{ "--i": pages.length } as CSSProperties}>
            <WhatsAppButton message={message} className="w-full">
              Agendar por WhatsApp
            </WhatsAppButton>
            <p className="text-[0.95rem] leading-relaxed">
              {business.address.street}, {business.address.city}
              <br />
              {business.hours[0].days}, {business.hours[0].time}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
