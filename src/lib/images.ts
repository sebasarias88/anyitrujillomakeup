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

export type GalleryCategory = "novias" | "quinceaneras" | "glam" | "estudio";

export const galleryCategories: { id: GalleryCategory | "todas"; label: string }[] = [
  { id: "todas", label: "Todo" },
  { id: "novias", label: "Novias" },
  { id: "quinceaneras", label: "XV años" },
  { id: "glam", label: "Glam & social" },
  { id: "estudio", label: "El estudio" },
];

export const gallery = [
  { src: brideTerrace, alt: "Novia con recogido romántico y tiara en una terraza con vista al paisaje cafetero", category: "novias" },
  { src: glamFront, alt: "Maquillaje glam suave en tonos rosa con piel luminosa y labios gloss", category: "glam" },
  { src: quinceEmerald, alt: "Quinceañera con vestido esmeralda, ondas definidas y maquillaje luminoso", category: "quinceaneras" },
  { src: brideDressWindow, alt: "Novia con bata de encaje contemplando su vestido antes de la ceremonia", category: "novias" },
  { src: quinceRubyPortrait, alt: "Quinceañera con corona roja y ondas largas definidas", category: "quinceaneras" },
  { src: glamProfile, alt: "Perfil de maquillaje con sombras rosadas, delineado suave y piel glow", category: "glam" },
  { src: brideAndDaughter, alt: "Novia y su hija con batas bordadas y peinados elaborados", category: "novias" },
  { src: studioVanity, alt: "Tocador del estudio con espejo de luces, brochas y paletas profesionales", category: "estudio" },
  { src: quinceRuby, alt: "Quinceañera con bata roja junto a su vestido de gala", category: "quinceaneras" },
  { src: brideMirror, alt: "Clienta mirándose al espejo del estudio con su peinado terminado", category: "novias" },
  { src: studioSign, alt: "Fachada de Anyi Trujillo Beauty Studio con su letrero dorado", category: "estudio" },
] as const satisfies readonly { alt: string; category: GalleryCategory; src: unknown }[];
