import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppBar } from "@/components/layout/whatsapp-bar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppBar />
    </>
  );
}
