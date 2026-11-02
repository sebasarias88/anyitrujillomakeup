/**
 * Public base URL for canonical links, sitemap, robots and Open Graph.
 * There is no domain yet: set NEXT_PUBLIC_SITE_URL once it exists. Until then
 * it falls back to the Vercel URL of the current deployment (production URL in
 * production, branch URL in previews) and to localhost in development.
 * Only read it on the server: in the browser the Vercel variables are not exposed.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercelHost =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : (process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL);
  if (vercelHost) return `https://${vercelHost}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

export const business = {
  name: "Anyi Trujillo Beauty Studio",
  shortName: "Anyi Trujillo",
  artist: "Anyi Trujillo",
  role: "Maquilladora profesional",
  tagline: "Especialista en novias y maquillaje con aerógrafo",
  yearsOfExperience: 9,
  whatsapp: "573205299186",
  phoneDisplay: "320 529 9186",
  email: "anyitrujillo02@gmail.com",
  instagram: "https://www.instagram.com/anyitrujillomakeup/",
  instagramHandle: "@anyitrujillomakeup",
  instagramFollowers: "15K",
  address: {
    street: "Calle 23 #37-25, Edificio Tesalónica, local 5",
    city: "Armenia",
    region: "Quindío",
    country: "CO",
    countryName: "Colombia",
  },
  geo: { lat: 4.5430903, lng: -75.6886701 },
  mapsUrl:
    "https://www.google.com/maps/place/Anyi+Trujillo+Beauty+Studio/@4.5430903,-75.6886701,17z",
  google: { rating: 5.0, reviews: 31 },
  hours: [
    { days: "Lunes a sábado", time: "8:00 a. m. – 7:00 p. m." },
    { days: "Domingo", time: "Cerrado" },
  ],
  certifications: ["Instituto Cristina Cuéllar · México", "Tempto · New York"],
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatCOP(value: number) {
  return `$${value.toLocaleString("es-CO")}`;
}

export type SitePath = "/" | "/novias" | "/servicios" | "/cursos" | "/portafolio" | "/sobre-anyi" | "/contacto";

/** Every public page: header/menu labels, sitemap and breadcrumbs read from here. */
export const pages = [
  { path: "/", label: "Inicio", priority: 1 },
  { path: "/novias", label: "Novias", priority: 0.9 },
  { path: "/servicios", label: "Servicios", priority: 0.8 },
  { path: "/portafolio", label: "Portafolio", priority: 0.7 },
  { path: "/cursos", label: "Cursos", priority: 0.7 },
  { path: "/sobre-anyi", label: "Sobre Anyi", priority: 0.6 },
  { path: "/contacto", label: "Contacto", priority: 0.8 },
] as const satisfies readonly { path: SitePath; label: string; priority: number }[];

/** Header links: every page except home (the logo goes home). */
export const navLinks = pages.filter((page) => page.path !== "/");

/** The WhatsApp message behind the always-visible action, per page. */
export const pageWhatsappMessage: Record<SitePath, string> = {
  "/": "Hola Anyi ✨ Vi tu página y quiero agendar una cita. ¿Me ayudas con la disponibilidad?",
  "/novias": "Hola Anyi ✨ Me voy a casar y quiero información de tus paquetes de novia.",
  "/servicios": "Hola Anyi ✨ Quiero información sobre tus servicios de maquillaje y peinado.",
  "/portafolio": "Hola Anyi ✨ Vi tu portafolio y quiero agendar un maquillaje.",
  "/cursos": "Hola Anyi ✨ Quiero información sobre tus cursos de maquillaje.",
  "/sobre-anyi": "Hola Anyi ✨ Quiero agendar una cita contigo.",
  "/contacto": "Hola Anyi ✨ Quiero agendar una cita. ¿Me ayudas con la disponibilidad?",
};

export const isSitePath = (path: string): path is SitePath => path in pageWhatsappMessage;

export type BridalPackage = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  includes: string[];
  note?: string;
  highlight?: boolean;
};

export const bridalPackages: BridalPackage[] = [
  {
    id: "especial-estudio",
    name: "Novia Especial",
    subtitle: "En estudio",
    price: 800_000,
    includes: [
      "Prueba de maquillaje y peinado en estudio",
      "Maquillaje y peinado el día de la boda",
      "Entrega completamente lista para la ceremonia",
    ],
    note: "Ideal si quieres vivir todo el proceso en un espacio pensado para tu comodidad.",
  },
  {
    id: "especial-bata",
    name: "Novia Especial",
    subtitle: "Con bata para fotos",
    price: 950_000,
    includes: [
      "Prueba de maquillaje y peinado en estudio",
      "Maquillaje y peinado el día de la boda",
      "Te facilitamos la bata para tus fotografías",
    ],
  },
  {
    id: "rubi",
    name: "Novia Rubí",
    subtitle: "Experiencia completa",
    price: 1_300_000,
    highlight: true,
    includes: [
      "Prueba de maquillaje y peinado en estudio",
      "Maquillaje y peinado el día de la boda",
      "Acompañamiento en la sesión de fotos previa a la ceremonia",
      "Retoque de maquillaje y retoque final",
      "Cambio de peinado",
    ],
    note: "Acompañamiento de hasta 3 horas.",
  },
];

export const extraHourPrice = 140_000;

export const companionServices = [
  { id: "makeup", label: "Maquillaje profesional", price: 140_000 },
  { id: "hairstyle", label: "Peinado", price: 100_000 },
  { id: "waves-long", label: "Ondas cabello largo", price: 90_000 },
  { id: "waves-short", label: "Ondas cabello corto", price: 80_000 },
] as const;

export type CompanionServiceId = (typeof companionServices)[number]["id"];

/**
 * Municipalities of Quindío for home visits. SAMPLE: Anyi has not confirmed
 * which ones she covers; the page labels them "por confirmar". The cost is
 * always quoted per place.
 */
export const homeVisitZones = {
  sample: true,
  // Approximate town-centre coordinates, used to place each town on the home-visit map.
  municipalities: [
    { name: "Armenia", lat: 4.534, lng: -75.681 },
    { name: "Calarcá", lat: 4.531, lng: -75.643 },
    { name: "Circasia", lat: 4.619, lng: -75.636 },
    { name: "Córdoba", lat: 4.392, lng: -75.688 },
    { name: "Filandia", lat: 4.674, lng: -75.658 },
    { name: "Génova", lat: 4.207, lng: -75.79 },
    { name: "La Tebaida", lat: 4.453, lng: -75.788 },
    { name: "Montenegro", lat: 4.566, lng: -75.751 },
    { name: "Pijao", lat: 4.334, lng: -75.705 },
    { name: "Quimbaya", lat: 4.623, lng: -75.763 },
    { name: "Salento", lat: 4.637, lng: -75.57 },
    { name: "Buenavista", lat: 4.36, lng: -75.739 },
  ],
} as const;

export type Municipality = (typeof homeVisitZones.municipalities)[number]["name"];

/**
 * Services beyond bridal for /servicios. Prices are not confirmed yet, so the
 * page shows "Precio de ejemplo · por confirmar" instead of a figure.
 */
export const occasionServices = [
  {
    id: "quince",
    title: "Quinceañeras",
    text: "Maquillaje y peinado para que la quinceañera sea la protagonista, y mi equipo para arreglar a su mamá y a la familia.",
    whatsapp: "Hola Anyi ✨ Quiero información sobre maquillaje y peinado para XV años.",
  },
  {
    id: "social",
    title: "Social y grados",
    text: "Para cumpleaños, grados, matrimonios como invitada y fiestas: un acabado impecable que dura toda la noche.",
    whatsapp: "Hola Anyi ✨ Quiero agendar un maquillaje social o de grado.",
  },
  {
    id: "photos",
    title: "Sesiones de fotos",
    text: "Maquillaje pensado para la cámara en sesiones de maternidad, retratos y fotos de marca.",
    whatsapp: "Hola Anyi ✨ Quiero un maquillaje para una sesión de fotos.",
  },
  {
    id: "hair",
    title: "Peinados",
    text: "Ondas definidas, recogidos y peinados para cualquier evento, solos o junto con el maquillaje.",
    whatsapp: "Hola Anyi ✨ Quiero agendar un peinado.",
  },
] as const;

export type OccasionServiceId = (typeof occasionServices)[number]["id"];

export const bookingServices = [
  "Maquillaje de novia",
  "Prueba de novia",
  "Maquillaje XV años",
  "Maquillaje social",
  "Maquillaje de grado",
  "Sesión de fotos / maternidad",
  "Peinado",
  "Información de cursos",
] as const;

export const reviews = [
  {
    author: "María Ximena Castellanos",
    context: "Novia",
    text: "El trabajo de Anyi es espectacular, muy buen servicio, siempre muy buena actitud. Me maquilló para mi matrimonio y el maquillaje registró muy lindo; quedé muy feliz con el resultado.",
  },
  {
    author: "Astrid Ramírez",
    context: "Mamá de quinceañera",
    text: "Gracias por dejar tan linda a mi princesa, y a mi familia súper divinas. Mil gracias a ti y a tu hermosa hija, que sigan con ese talento tan lindo.",
  },
  {
    author: "Valentina Rogert Triana",
    context: "Clienta recurrente",
    text: "Excelente servicio, es una experiencia llena de amor y vocación. Mi familia y yo seremos clientes recurrentes durante mucho tiempo más. Un verdadero talento.",
  },
] as const;

export const photographers = [
  "Juliana Arbeláez Foto",
  "Alex Palacio Fotografía",
  "Juan David Marín Photo",
] as const;

export const venues = ["Jardín Botánico del Quindío", "Hacienda Moraleja"] as const;

export type FaqPage = "novias" | "contacto";

export const faqs: { q: string; a: string; pages: readonly FaqPage[] }[] = [
  {
    q: "¿Cómo separo mi fecha?",
    a: "Escríbeme por WhatsApp con la fecha, el servicio y la ciudad del evento. Te confirmo disponibilidad y las condiciones para dejar tu fecha reservada en la agenda.",
    pages: ["novias", "contacto"],
  },
  {
    q: "¿Atienden a domicilio?",
    a: "Sí. Puedo ir a tu casa, hotel o lugar del evento en Armenia y el Quindío. El valor del domicilio depende de la ubicación, así que lo cotizamos según tu caso.",
    pages: ["contacto"],
  },
  {
    q: "¿Qué es el maquillaje con aerógrafo?",
    a: "Es una técnica que aplica el producto como una bruma muy fina. El resultado es ligero, uniforme y de larga duración, ideal para fotografía, calor y jornadas largas como una boda.",
    pages: ["novias", "contacto"],
  },
  {
    q: "¿La prueba de novia está incluida?",
    a: "Sí. Todos los paquetes de novia incluyen una prueba de maquillaje y peinado en el estudio, para definir juntas el look antes del gran día.",
    pages: ["novias"],
  },
  {
    q: "¿Los paquetes incluyen accesorios?",
    a: "No. Los accesorios como tocados, coronas o aretes no están incluidos; si quieres, te asesoro para elegir los que mejor van con tu look.",
    pages: ["novias"],
  },
  {
    q: "¿Pueden atender a mis damas e invitadas?",
    a: "Sí. Cuento con un equipo capacitado y entrenado por mí para atender grupos con puntualidad y la misma calidad. Puedes ver las tarifas de acompañantes en el cotizador.",
    pages: ["novias", "contacto"],
  },
];

export const faqsFor = (page: FaqPage) => faqs.filter((faq) => faq.pages.includes(page));
