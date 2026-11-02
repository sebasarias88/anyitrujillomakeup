"use client";

import { SystemScreen } from "@/components/layout/system-screen";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import "./globals.css";
import { whatsappGreeting } from "@/lib/site";

/** Last resort when the root layout itself fails: renders its own html and body. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="es-CO">
      <body>
        <SystemScreen
          monument="Ups"
          title="Algo no cargó como esperaba"
          actions={
            <>
              <button type="button" onClick={reset} className="pressable min-h-12 bg-gold px-6 font-semibold text-ink hover:bg-gold-deep">
                Reintentar
              </button>
              <WhatsAppButton message={`${whatsappGreeting} Tu página me mostró un error y quiero agendar una cita.`} variant="text">
                Escribir por WhatsApp
              </WhatsAppButton>
            </>
          }
        >
          <p>Intenta de nuevo. Si sigue pasando, escríbeme por WhatsApp y te atiendo directamente.</p>
        </SystemScreen>
      </body>
    </html>
  );
}
