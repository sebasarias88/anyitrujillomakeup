import { ServicePage } from "@/components/shared/service-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/quinceaneras",
  title: "Maquillaje y peinado para quinceañeras en Armenia",
  description: "Maquillaje con aerógrafo y peinado para XV años en Armenia, Quindío, con equipo para la mamá y la familia. En estudio o a domicilio.",
});

export default function QuinceanerasPage() {
  return <ServicePage path="/quinceaneras" category="quinceaneras" galleryTitle="Quinceañeras que he maquillado" />;
}
