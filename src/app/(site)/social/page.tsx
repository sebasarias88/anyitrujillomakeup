import { ServicePage } from "@/components/shared/service-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/social",
  title: "Maquillaje social y de grado en Armenia",
  description: "Maquillaje para grados, fiestas, eventos y sesiones de fotos en Armenia, Quindío. Natural o glam, en estudio o a domicilio.",
});

export default function SocialPage() {
  return <ServicePage path="/social" category="glam" galleryTitle="Looks sociales y glam" />;
}
