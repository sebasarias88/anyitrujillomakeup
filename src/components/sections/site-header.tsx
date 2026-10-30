"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { navLinks, whatsappUrl } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <a href="#inicio" aria-label="Ir al inicio" className="shrink-0 focus-visible:outline-2 focus-visible:outline-nude">
          <Logo className="h-12 text-nude md:h-14" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-sm text-sand">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-ivory">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl("Hola Anyi ✨ Quiero agendar una cita. ¿Me ayudas con la disponibilidad?")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center gap-2 rounded-full bg-nude px-5 text-sm font-semibold text-ink transition hover:bg-champagne sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ivory lg:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="Menú móvil" className="container-page flex flex-col py-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-5 font-display text-4xl font-light text-ivory"
            >
              <span className="font-sans text-xs text-nude">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl("Hola Anyi ✨ Quiero agendar una cita. ¿Me ayudas con la disponibilidad?")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-nude px-6 font-semibold text-ink"
          >
            <WhatsAppIcon className="size-5" />
            Agendar por WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
