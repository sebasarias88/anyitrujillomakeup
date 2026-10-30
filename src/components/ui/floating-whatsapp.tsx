"use client";

import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl("Hola Anyi ✨ Vi tu página y quiero agendar una cita.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Anyi por WhatsApp"
      className={`fixed right-5 bottom-5 z-40 flex size-14 items-center justify-center rounded-full bg-nude text-ink shadow-[0_15px_40px_-10px_rgb(208_154_115/0.8)] transition duration-500 hover:scale-105 hover:bg-champagne md:right-8 md:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-nude/60 motion-safe:animate-ping [animation-duration:2.5s]" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
