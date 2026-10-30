export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://anyitrujillomakeup.com").replace(/\/$/, "");

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

export const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#novias", label: "Novias" },
  { href: "#aerografo", label: "Aerógrafo" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#cursos", label: "Cursos" },
  { href: "#agenda", label: "Agenda" },
] as const;

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

export const faqs = [
  {
    q: "¿Cómo separo mi fecha?",
    a: "Escríbeme por WhatsApp con la fecha, el servicio y la ciudad del evento. Te confirmo disponibilidad y las condiciones para dejar tu fecha reservada en la agenda.",
  },
  {
    q: "¿Atienden a domicilio?",
    a: "Sí. Puedo ir a tu casa, hotel o lugar del evento en Armenia y el Quindío. El valor del domicilio depende de la ubicación, así que lo cotizamos según tu caso.",
  },
  {
    q: "¿Qué es el maquillaje con aerógrafo?",
    a: "Es una técnica que aplica el producto como una bruma muy fina. El resultado es ligero, uniforme y de larga duración, ideal para fotografía, calor y jornadas largas como una boda.",
  },
  {
    q: "¿La prueba de novia está incluida?",
    a: "Sí. Todos los paquetes de novia incluyen una prueba de maquillaje y peinado en el estudio, para definir juntas el look antes del gran día.",
  },
  {
    q: "¿Los paquetes incluyen accesorios?",
    a: "No. Los accesorios como tocados, coronas o aretes no están incluidos; si quieres, te asesoro para elegir los que mejor van con tu look.",
  },
  {
    q: "¿Pueden atender a mis damas e invitadas?",
    a: "Sí. Cuento con un equipo capacitado y entrenado por mí para atender grupos con puntualidad y la misma calidad. Puedes ver las tarifas de acompañantes en el cotizador.",
  },
] as const;
