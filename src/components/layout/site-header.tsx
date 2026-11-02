"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { isSitePath, navLinks, pageWhatsappMessage } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

/**
 * Plain white bar: logo, page links, one gold action. The active page carries
 * a short gold stroke that glides between links. The bar slides away while
 * reading down and returns as soon as the visitor scrolls up.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setHidden(y > 160 && y > lastY.current);
        lastY.current = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A new page always starts with the bar visible.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset on route change
    setHidden(false);
  }, [pathname]);

  const message = isSitePath(pathname) ? pageWhatsappMessage[pathname] : pageWhatsappMessage["/"];

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-transform duration-200 ease-[var(--ease-out)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold"
      >
        Saltar al contenido
      </a>
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Anyi Trujillo Beauty Studio, ir al inicio" className="shrink-0">
          <Logo className="h-12 text-ink md:h-[3.25rem]" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.path;
              return (
                <li key={link.path} className="relative">
                  <Link
                    href={link.path}
                    aria-current={active ? "page" : undefined}
                    className={`block py-2 text-[0.95rem] transition-colors duration-200 ${
                      active ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold"
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Phones get the bottom WhatsApp bar instead. */}
          <div className="hidden sm:block">
            <WhatsAppButton message={message}>Agendar</WhatsAppButton>
          </div>
          <MobileMenu pathname={pathname} message={message} />
        </div>
      </div>
    </header>
  );
}
