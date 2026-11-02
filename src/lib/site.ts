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
  hours: [
    { days: "Lunes a sábado", time: "8:00 a. m. – 7:00 p. m." },
    { days: "Domingo", time: "Cerrado" },
  ],
  certifications: ["Instituto Cristina Cuéllar · México", "Tempto · New York"],
} as const;

/** Opening of every WhatsApp message (message text, not interface). taste-skill-ignore */
export const whatsappGreeting = "Hola Anyi ✨"; // taste-skill-ignore

export function whatsappUrl(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatCOP(value: number) {
  return `$${value.toLocaleString("es-CO")}`;
}

export type SitePath =
  | "/"
  | "/servicios"
  | "/novias"
  | "/quinceaneras"
  | "/social"
  | "/cursos"
  | "/portafolio"
  | "/sobre-mi"
  | "/contacto";

/** Every public page: menu (when `nav`), sitemap and breadcrumbs read from here. */
export const pages = [
  { path: "/", label: "Inicio", priority: 1, nav: true },
  { path: "/servicios", label: "Servicios", priority: 0.9, nav: true },
  { path: "/novias", label: "Novias", priority: 0.9, nav: false },
  { path: "/quinceaneras", label: "Quinceañeras", priority: 0.8, nav: false },
  { path: "/social", label: "Social", priority: 0.8, nav: false },
  { path: "/cursos", label: "Cursos", priority: 0.7, nav: false },
  { path: "/portafolio", label: "Portafolio", priority: 0.7, nav: true },
  { path: "/sobre-mi", label: "Sobre mí", priority: 0.6, nav: true },
  { path: "/contacto", label: "Contacto", priority: 0.8, nav: true },
] as const satisfies readonly { path: SitePath; label: string; priority: number; nav: boolean }[];

/** Header and mobile menu links. */
export const navLinks = pages.filter((page) => page.nav);

/** The WhatsApp message behind the always-visible action, per page. */
export const pageWhatsappMessage: Record<SitePath, string> = {
  "/": `${whatsappGreeting} Vi tu página y quiero agendar una cita. ¿Me ayudas con la disponibilidad?`,
  "/servicios": `${whatsappGreeting} Quiero información sobre tus servicios de maquillaje y peinado.`,
  "/novias": `${whatsappGreeting} Me voy a casar y quiero información de tus paquetes de novia.`,
  "/quinceaneras": `${whatsappGreeting} Quiero información sobre maquillaje y peinado para XV años.`,
  "/social": `${whatsappGreeting} Quiero agendar un maquillaje social o de grado.`,
  "/cursos": `${whatsappGreeting} Quiero información sobre tus cursos de maquillaje.`,
  "/portafolio": `${whatsappGreeting} Vi tu portafolio y quiero agendar un maquillaje.`,
  "/sobre-mi": `${whatsappGreeting} Quiero agendar una cita contigo.`,
  "/contacto": `${whatsappGreeting} Quiero agendar una cita. ¿Me ayudas con la disponibilidad?`,
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
    whatsapp: `${whatsappGreeting} Quiero información sobre maquillaje y peinado para XV años.`,
  },
  {
    id: "social",
    title: "Social y grados",
    text: "Para cumpleaños, grados, matrimonios como invitada y fiestas: un acabado impecable que dura toda la noche.",
    whatsapp: `${whatsappGreeting} Quiero agendar un maquillaje social o de grado.`,
  },
  {
    id: "photos",
    title: "Sesiones de fotos",
    text: "Maquillaje pensado para la cámara en sesiones de maternidad, retratos y fotos de marca.",
    whatsapp: `${whatsappGreeting} Quiero un maquillaje para una sesión de fotos.`,
  },
  {
    id: "hair",
    title: "Peinados",
    text: "Ondas definidas, recogidos y peinados para cualquier evento, solos o junto con el maquillaje.",
    whatsapp: `${whatsappGreeting} Quiero agendar un peinado.`,
  },
] as const;

export type OccasionServiceId = (typeof occasionServices)[number]["id"];

/**
 * Courses. Confirmed: Anyi teaches in-person and personalised courses.
 * SAMPLE: the descriptions and topics below are examples to confirm with her;
 * there are no dates or prices yet, and the page must not invent them.
 */
export const courses = {
  sample: true,
  formats: [
    {
      id: "presencial",
      title: "Curso presencial",
      text: "Clases prácticas en el estudio, en grupo, con acompañamiento paso a paso.",
    },
    {
      id: "personalizado",
      title: "Curso personalizado",
      text: "Uno a uno, a tu ritmo y enfocado en lo que tú quieres dominar.",
    },
  ],
  levels: [
    { id: "self", label: "Automaquillaje", hint: "Para maquillarte tú misma" },
    { id: "pro", label: "Profesional", hint: "Para trabajar como maquilladora" },
  ],
  topics: [
    "Preparación y cuidado de la piel",
    "Ojos, delineado y pestañas",
    "Maquillaje social y de novia",
    "Ondas y peinados",
    "Productos y kit profesional",
    "Cómo empezar a trabajar como maquilladora",
  ],
} as const;

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


export type ServicePath = "/novias" | "/quinceaneras" | "/social" | "/cursos";

export type ServiceOption = { name: string; detail: string; price: number };

export type Service = {
  path: ServicePath;
  title: string;
  /** Lowest price, shown as "Desde $X". */
  fromPrice: number;
  /** SAMPLE prices: shown so Anyi sees the layout; replace with her real prices. */
  samplePrice: boolean;
  summary: string;
  badge?: string;
  /** Detail page copy. */
  heroTitle: string;
  heroAccent: string;
  intro: string;
  includes: { title: string; text: string }[];
  options: ServiceOption[];
};

export const services: Service[] = [
  {
    path: "/novias",
    title: "Novias",
    fromPrice: 800_000,
    samplePrice: false,
    badge: "Mi especialidad",
    summary: "Prueba, maquillaje y peinado para el día que soñaste.",
    heroTitle: "Tu boda,",
    heroAccent: "como siempre la soñaste",
    intro: "Prueba en el estudio, maquillaje con aerógrafo y peinado, y si quieres, te acompaño durante tus fotos.",
    includes: [],
    options: [],
  },
  {
    path: "/quinceaneras",
    title: "Quinceañeras",
    fromPrice: 350_000,
    samplePrice: true,
    summary: "Que la protagonista brille, y su familia también.",
    heroTitle: "Tus XV años,",
    heroAccent: "una noche para brillar",
    intro: "Maquillaje y peinado para la quinceañera, y mi equipo para arreglar a su mamá y a la familia el mismo día.",
    includes: [
      { title: "Asesoría de look", text: "Elegimos juntas el estilo según su vestido y su personalidad." },
      { title: "Maquillaje con aerógrafo", text: "Luminoso, ligero y firme durante toda la fiesta." },
      { title: "Peinado", text: "Ondas, recogido o semirecogido para lucir la corona." },
      { title: "Equipo para la familia", text: "Mamá, hermanas y damas, atendidas por mi equipo." },
    ],
    options: [
      { name: "XV · Maquillaje", detail: "Solo maquillaje, en el estudio", price: 350_000 },
      { name: "XV · Maquillaje y peinado", detail: "El look completo", price: 480_000 },
      { name: "XV · Experiencia completa", detail: "Look completo y retoque antes de la fiesta", price: 620_000 },
    ],
  },
  {
    path: "/social",
    title: "Social",
    fromPrice: 170_000,
    samplePrice: true,
    summary: "Grados, fiestas y eventos: elegante toda la noche.",
    heroTitle: "Un look elegante",
    heroAccent: "para cada evento",
    intro: "Grados, cumpleaños, matrimonios como invitada y sesiones de fotos, en el estudio o a domicilio.",
    includes: [
      { title: "Piel impecable", text: "Preparación de piel y base de larga duración." },
      { title: "Ojos y pestañas", text: "Del natural al glam, según tu evento." },
      { title: "Pensado para fotos", text: "Un acabado que se ve perfecto en cámara." },
      { title: "Estudio o domicilio", text: "Voy a donde te arregles en el Quindío." },
    ],
    options: [
      { name: "Maquillaje social", detail: "Natural o glam", price: 170_000 },
      { name: "Maquillaje y ondas", detail: "Look completo para tu evento", price: 250_000 },
      { name: "Sesión de fotos", detail: "Maternidad, retrato o marca", price: 220_000 },
    ],
  },
  {
    path: "/cursos",
    title: "Cursos",
    fromPrice: 450_000,
    samplePrice: true,
    summary: "Aprende mis técnicas, para ti o para trabajar.",
    heroTitle: "Aprende a maquillar",
    heroAccent: "como una profesional",
    intro: "Cursos presenciales en el estudio y personalizados uno a uno, con las técnicas que uso con mis novias.",
    includes: [
      { title: "Clases prácticas", text: "Practicas en el estudio, con acompañamiento paso a paso." },
      { title: "Técnica profesional", text: "Preparación de piel, ojos, pestañas y acabados duraderos." },
      { title: "A tu ritmo", text: "En grupo o uno a uno, según lo que quieras dominar." },
      { title: "Certificado", text: "Al terminar recibes tu certificado del curso." },
    ],
    options: [
      { name: "Automaquillaje", detail: "Para maquillarte tú misma · 1 sesión", price: 450_000 },
      { name: "Curso personalizado", detail: "Uno a uno, a tu ritmo · 3 sesiones", price: 950_000 },
      { name: "Curso profesional", detail: "Para trabajar como maquilladora", price: 1_800_000 },
    ],
  },
];

export const serviceFor = (path: ServicePath) => services.find((service) => service.path === path)!;
