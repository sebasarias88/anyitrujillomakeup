"use client";

import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/** Errors inside a page keep the header and footer; the visitor can retry or write. */
export default function PageError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pt-28 pb-20">
      <h1 className="max-w-[18ch] font-display text-[2.6rem] leading-[1] tracking-[-0.02em] md:text-[3.6rem]">
        Algo no cargó como esperaba
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        Intenta de nuevo. Si sigue pasando, escríbeme por WhatsApp y te atiendo directamente.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button type="button" onClick={reset} className="pressable min-h-12 bg-gold px-6 font-semibold text-ink hover:bg-gold-deep">
          Reintentar
        </button>
        <WhatsAppButton message="Hola Anyi ✨ Tu página me mostró un error y quiero agendar una cita." variant="text">
          Escribir por WhatsApp
        </WhatsAppButton>
      </div>
    </section>
  );
}
