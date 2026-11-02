import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppBar } from "@/components/layout/whatsapp-bar";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      {/* Paper background and z-index let the page lift off the sticky footer. */}
      <main id="contenido" className="relative z-10 bg-paper pb-px">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppBar />
    </>
  );
}
