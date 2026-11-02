"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { isSitePath, pageWhatsappMessage } from "@/lib/site";

/**
 * Phone-only bar that keeps WhatsApp one tap away without covering content:
 * past the first screen it appears whenever the visitor scrolls up (together
 * with the header) and slides away while reading down. It also steps aside when
 * the footer, or a section with its own WhatsApp action, comes into view.
 */
export function WhatsAppBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    // Hide once the end of <main> (where the footer starts) enters the screen.
    const main = document.getElementById("contenido");
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 4) setScrollingUp(y < lastY);
      lastY = y;
      setPastHero(window.scrollY > window.innerHeight * 0.7);
      const footerUncovered = main ? main.getBoundingClientRect().bottom < window.innerHeight * 0.9 : false;
      // Sections with their own WhatsApp action (the bridal quote) ask the bar to step aside.
      const ownAction = [...document.querySelectorAll("[data-hide-whatsapp-bar]")].some((element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
      setFooterVisible(footerUncovered || ownAction);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Shown while scrolling up (like the header), so it never sits over what is being read.
  const visible = pastHero && !footerVisible && scrollingUp;
  const message = isSitePath(pathname) ? pageWhatsappMessage[pathname] : pageWhatsappMessage["/"];

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-200 ease-[var(--ease-out)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <WhatsAppButton message={message} className="w-full">
        Agendar por WhatsApp
      </WhatsAppButton>
    </div>
  );
}
