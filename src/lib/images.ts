import type { StaticImageData } from "next/image";
import anyiAgenda from "@/assets/images/anyi-agenda.webp";
import anyiPortrait from "@/assets/images/anyi-portrait.webp";
import brideAndDaughter from "@/assets/images/bride-and-daughter.webp";
import brideDressWindow from "@/assets/images/bride-dress-window.webp";
import brideMirror from "@/assets/images/bride-mirror.webp";
import brideTerrace from "@/assets/images/bride-terrace.webp";
import glamFront from "@/assets/images/glam-front.webp";
import glamProfile from "@/assets/images/glam-profile.webp";
import quinceEmerald from "@/assets/images/quince-emerald.webp";
import quinceRuby from "@/assets/images/quince-ruby.webp";
import quinceRubyPortrait from "@/assets/images/quince-ruby-portrait.webp";
import studioSign from "@/assets/images/studio-sign.webp";
import studioVanity from "@/assets/images/studio-vanity.webp";
import workshop from "@/assets/images/workshop-cristina-cuellar.webp";

export const images = {
  anyiAgenda,
  anyiPortrait,
  brideAndDaughter,
  brideDressWindow,
  brideMirror,
  brideTerrace,
  glamFront,
  glamProfile,
  quinceEmerald,
  quinceRuby,
  quinceRubyPortrait,
  studioSign,
  studioVanity,
  workshop,
};

/** One photograph per page: the mobile menu shows it beside each link. */
export const pageCovers = {
  "/": glamFront,
  "/novias": brideDressWindow,
  "/servicios": studioVanity,
  "/portafolio": glamProfile,
  "/contacto": studioSign,
} as const;

export type GalleryCategory = "novias" | "quinceaneras" | "glam" | "estudio";

export const galleryCategories: { id: GalleryCategory | "todas"; label: string }[] = [
  { id: "todas", label: "Todo" },
  { id: "novias", label: "Novias" },
  { id: "quinceaneras", label: "XV años" },
  { id: "glam", label: "Glam & social" },
  { id: "estudio", label: "El estudio" },
];

export const gallery = [
  { id: "bride-terrace", src: brideTerrace, caption: "Novia en terraza", alt: "Novia con recogido romántico y tiara en una terraza con vista al paisaje cafetero", category: "novias" },
  { id: "glam-front", src: glamFront, caption: "Glam suave rosé", alt: "Maquillaje glam suave en tonos rosa con piel luminosa y labios gloss", category: "glam" },
  { id: "quince-emerald", src: quinceEmerald, caption: "XV esmeralda", alt: "Quinceañera con vestido esmeralda, ondas definidas y maquillaje luminoso", category: "quinceaneras" },
  { id: "bride-dress-window", src: brideDressWindow, caption: "Antes de la ceremonia", alt: "Novia con bata de encaje contemplando su vestido antes de la ceremonia", category: "novias" },
  { id: "quince-ruby-portrait", src: quinceRubyPortrait, caption: "Ondas y corona", alt: "Quinceañera con corona roja y ondas largas definidas", category: "quinceaneras" },
  { id: "glam-profile", src: glamProfile, caption: "Piel glow", alt: "Perfil de maquillaje con sombras rosadas, delineado suave y piel glow", category: "glam" },
  { id: "bride-and-companion", src: brideAndDaughter, caption: "Novia y acompañante", alt: "Novia y acompañante con batas bordadas y peinados elaborados", category: "novias" },
  { id: "studio-vanity", src: studioVanity, caption: "El tocador", alt: "Tocador del estudio con espejo de luces, brochas y paletas profesionales", category: "estudio" },
  { id: "quince-ruby", src: quinceRuby, caption: "XV en rojo", alt: "Quinceañera con bata roja junto a su vestido de gala", category: "quinceaneras" },
  { id: "bride-mirror", src: brideMirror, caption: "La prueba", alt: "Clienta mirándose al espejo del estudio con su peinado terminado", category: "novias" },
  { id: "studio-sign", src: studioSign, caption: "La fachada", alt: "Fachada de Anyi Trujillo Beauty Studio con su letrero dorado", category: "estudio" },
] as const satisfies readonly { id: string; caption: string; alt: string; category: GalleryCategory; src: unknown }[];

/**
 * Real before/after pairs of the same client. Empty until Anyi sends them:
 * meanwhile the portfolio shows designed "Próximamente" frames. Never fill
 * this with stock photos or simulated results.
 */
export const beforeAfter: { id: string; before: StaticImageData; after: StaticImageData; alt: string }[] = [];
