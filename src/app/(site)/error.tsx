"use client";

import { buttonBase, buttonStyles } from "@/components/ui/button-link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { whatsappGreeting } from "@/lib/site";

/** Errors inside a page keep the header and footer; the visitor can retry or write. */
export default function PageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-28 pb-20">
      <h1 className="max-w-[18ch] font-display text-[2.6rem] leading-[1.05] md:text-[3.4rem]">
        Algo no cargó como esperaba
      </h1>
      <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed">
        Intenta de nuevo. Si sigue pasando, escríbeme por WhatsApp y te atiendo directamente.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="button" onClick={reset} className={`${buttonBase} ${buttonStyles.primary}`}>
          Reintentar
        </button>
        <WhatsAppButton message={`${whatsappGreeting} Tu página me mostró un error y quiero agendar una cita.`} variant="text">
          Escribir por WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
