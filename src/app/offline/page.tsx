import type { Metadata } from "next";
import { SystemScreen } from "@/components/layout/system-screen";
import { business, whatsappUrl, whatsappGreeting } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sin conexión",
  robots: { index: false, follow: false },
};

/** Served by the service worker when a page is not cached and there is no network. No client code. */
export default function OfflinePage() {
  return (
    <SystemScreen
      eyebrow="Sin conexión"
      title="Parece que no tienes conexión"
      actions={
        <a
          href={whatsappUrl(`${whatsappGreeting} Quiero agendar una cita.`)}
          className="pressable inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-[0.82rem] font-medium tracking-[0.1em] text-paper uppercase hover:bg-ink-soft"
        >
          Escribir por WhatsApp
        </a>
      }
    >
      <p>
        Revisa tu internet e inténtalo de nuevo. Si quieres agendar, escríbeme por WhatsApp al {business.phoneDisplay}.
      </p>
    </SystemScreen>
  );
}
