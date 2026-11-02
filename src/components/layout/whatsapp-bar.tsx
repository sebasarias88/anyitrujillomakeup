"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { isSitePath, pageWhatsappMessage } from "@/lib/site";

/**
 * Phone-only bar that keeps WhatsApp one tap away without covering content:
 * it appears once the visitor is past the first screen and steps aside when
 * the footer (which has its own WhatsApp action) comes into view.
 */
export function WhatsAppBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    // The footer is sticky under <main>, so it is always "in view" behind the page.
    // What matters is whether <main> has scrolled far enough to uncover it.
    const main = document.getElementById("contenido");
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.7);
      setFooterVisible(main ? main.getBoundingClientRect().bottom < window.innerHeight * 0.9 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const visible = pastHero && !footerVisible;
  const message = isSitePath(pathname) ? pageWhatsappMessage[pathname] : pageWhatsappMessage["/"];

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 bg-paper px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-200 ease-[var(--ease-out)] sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <WhatsAppButton message={message} className="w-full">
        Agendar por WhatsApp
      </WhatsAppButton>
    </div>
  );
}
