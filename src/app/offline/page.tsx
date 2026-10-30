import type { Metadata } from "next";
import { Logo } from "@/components/ui/logo";
import { business, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sin conexión",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <Logo className="h-28 text-nude" />
      <h1 className="mt-8 font-display text-4xl font-light text-ivory">Parece que no tienes conexión</h1>
      <p className="mt-3 max-w-md text-sand">
        Revisa tu internet e inténtalo de nuevo. Si quieres agendar, escríbeme por WhatsApp al {business.phoneDisplay}.
      </p>
      <a
        href={whatsappUrl("Hola Anyi ✨ Quiero agendar una cita.")}
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-nude px-7 font-semibold text-ink"
      >
        Escribir por WhatsApp
      </a>
    </main>
  );
}
