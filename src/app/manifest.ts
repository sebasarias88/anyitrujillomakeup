import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: "Maquillaje y peinado profesional en Armenia, Quindío. Novias, aerógrafo, quinceañeras y cursos.",
    id: "/",
    scope: "/",
    orientation: "portrait",
    categories: ["beauty", "lifestyle"],
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "es-CO",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
