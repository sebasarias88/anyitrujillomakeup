import type { Metadata } from "next";
import { SystemScreen } from "@/components/layout/system-screen";
import { ButtonLink } from "@/components/ui/button-link";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SystemScreen
      monument="404"
      title="Esta página no existe"
      actions={
        <>
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <WhatsAppButton message="Hola Anyi ✨ Estaba en tu página y quiero agendar una cita." variant="text" icon={false}>
            Escribir por WhatsApp
          </WhatsAppButton>
        </>
      }
    >
      <p>Puede que el enlace esté incompleto o que la página haya cambiado de lugar.</p>
    </SystemScreen>
  );
}
