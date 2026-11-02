"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { bridalPackages, services } from "@/lib/site";

/**
 * Demo data for the admin panel. Everything lives in the browser: there is no
 * backend yet. The data is generated around "today" after mount (never during
 * render, so pages stay prerenderable) and kept in localStorage so changes
 * survive a reload while Anyi tries the demo.
 */

export type AppointmentStatus = "pendiente" | "confirmada" | "completada" | "cancelada";
export type Place = "estudio" | "domicilio";

export type Appointment = {
  id: string;
  clientId: string;
  service: string;
  price: number;
  /** ISO date YYYY-MM-DD. */
  date: string;
  time: string;
  place: Place;
  municipality?: string;
  status: AppointmentStatus;
  staffId: string;
  companions: number;
  paid: number;
  notes?: string;
};

export type Client = { id: string; name: string; phone: string; since: string; notes: string; tags: string[] };
export type Staff = { id: string; name: string; role: string; color: string };
export type CatalogItem = { id: string; name: string; group: string; price: number; active: boolean; duration: number };
export type Course = { id: string; name: string; date: string; seats: number; enrolled: string[]; price: number };
export type PortfolioPhoto = { id: string; src: string; caption: string; category: string; featured: boolean };

export type AdminData = {
  appointments: Appointment[];
  clients: Client[];
  staff: Staff[];
  catalog: CatalogItem[];
  courses: Course[];
  photos: PortfolioPhoto[];
  /** Weekday (0 = Sunday) → open hours. */
  availability: Record<number, string[]>;
  blockedDates: string[];
};

export const allSlots = ["8:00 a. m.", "9:00 a. m.", "10:00 a. m.", "11:00 a. m.", "12:00 m.", "1:00 p. m.", "2:00 p. m.", "3:00 p. m.", "4:00 p. m.", "5:00 p. m.", "6:00 p. m."];

const STORAGE_KEY = "anyi-admin-demo-v2";

export const toISO = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export const fromISO = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

function seed(today: Date): AdminData {
  const staff: Staff[] = [
    { id: "anyi", name: "Anyi Trujillo", role: "Maquilladora principal", color: "#9a6340" },
    { id: "laura", name: "Laura (ejemplo)", role: "Maquilladora", color: "#c98f6a" },
    { id: "dani", name: "Daniela (ejemplo)", role: "Peinadora", color: "#7d8b74" },
  ];

  const names = [
    "Valentina Gómez", "Camila Ríos", "Mariana López", "Sofía Hernández", "Isabella Castaño", "Laura Restrepo",
    "Daniela Cardona", "Juliana Osorio", "Natalia Quintero", "Paula Arango", "Manuela Giraldo", "Sara Valencia",
    "Andrea Muñoz", "Luisa Salazar",
  ];
  const clients: Client[] = names.map((name, index) => ({
    id: `c${index + 1}`,
    name,
    phone: `31${String(2000000 + index * 73517).padStart(8, "0")}`,
    since: toISO(addDays(today, -40 - index * 23)),
    notes: index % 3 === 0 ? "Piel mixta. Prefiere looks naturales." : index % 3 === 1 ? "Piel seca: hidratar bien antes de la base." : "",
    tags: index % 4 === 0 ? ["Novia"] : index % 4 === 1 ? ["XV años"] : ["Social"],
  }));

  const catalog: CatalogItem[] = [
    ...bridalPackages.map((pkg) => ({ id: pkg.id, name: `${pkg.name} · ${pkg.subtitle}`, group: "Novias", price: pkg.price, active: true, duration: pkg.id === "rubi" ? 240 : 150 })),
    ...services
      .filter((service) => service.path !== "/novias")
      .flatMap((service) =>
        service.options.map((option, index) => ({
          id: `${service.path.slice(1)}-${index}`,
          name: option.name,
          group: service.title,
          price: option.price,
          active: true,
          duration: service.path === "/cursos" ? 240 : 90,
        })),
      ),
    { id: "comp-makeup", name: "Acompañante · maquillaje", group: "Acompañantes", price: 140_000, active: true, duration: 60 },
    { id: "comp-hair", name: "Acompañante · peinado", group: "Acompañantes", price: 100_000, active: true, duration: 45 },
  ];

  const plan: [number, number, string, AppointmentStatus, Place, string][] = [
    [-26, 0, "rubi", "completada", "domicilio", "anyi"],
    [-21, 3, "quinceaneras-1", "completada", "estudio", "anyi"],
    [-18, 5, "social-0", "completada", "estudio", "laura"],
    [-15, 1, "especial-bata", "completada", "estudio", "anyi"],
    [-12, 7, "social-1", "completada", "domicilio", "laura"],
    [-9, 9, "quinceaneras-2", "completada", "estudio", "anyi"],
    [-7, 11, "social-2", "cancelada", "estudio", "laura"],
    [-5, 2, "especial-estudio", "completada", "estudio", "anyi"],
    [-3, 4, "social-0", "completada", "estudio", "dani"],
    [-1, 6, "cursos-1", "completada", "estudio", "anyi"],
    [0, 8, "social-1", "confirmada", "estudio", "laura"],
    [0, 10, "especial-bata", "confirmada", "estudio", "anyi"],
    [0, 12, "comp-makeup", "pendiente", "estudio", "dani"],
    [1, 13, "quinceaneras-1", "confirmada", "domicilio", "anyi"],
    [2, 0, "social-0", "pendiente", "estudio", "laura"],
    [3, 1, "rubi", "confirmada", "domicilio", "anyi"],
    [4, 5, "social-2", "pendiente", "estudio", "anyi"],
    [6, 7, "especial-estudio", "pendiente", "estudio", "anyi"],
    [8, 9, "quinceaneras-0", "confirmada", "estudio", "laura"],
    [11, 2, "rubi", "confirmada", "domicilio", "anyi"],
    [15, 4, "cursos-0", "pendiente", "estudio", "anyi"],
    [19, 6, "especial-bata", "pendiente", "estudio", "anyi"],
  ];
  const times = ["8:00 a. m.", "9:00 a. m.", "10:00 a. m.", "11:00 a. m.", "2:00 p. m.", "3:00 p. m.", "4:00 p. m."];
  const towns = ["Circasia", "Salento", "Calarcá", "Montenegro"];
  const appointments: Appointment[] = plan.map(([offset, clientIndex, catalogId, status, place, staffId], index) => {
    const item = catalog.find((entry) => entry.id === catalogId)!;
    const companions = item.group === "Novias" ? (index % 3) + 1 : item.group === "Quinceañeras" ? 2 : 0;
    const price = item.price + companions * 140_000;
    // The studio is closed on Sundays: move those demo appointments to Saturday.
    const day = addDays(today, offset);
    const date = day.getDay() === 0 ? addDays(day, -1) : day;
    return {
      id: `a${index + 1}`,
      clientId: clients[clientIndex].id,
      service: item.name,
      price,
      date: toISO(date),
      time: times[index % times.length],
      place,
      municipality: place === "domicilio" ? towns[index % towns.length] : undefined,
      status,
      staffId,
      companions,
      paid: status === "completada" ? price : status === "confirmada" ? Math.round(price * 0.5) : 0,
    };
  });

  const courses: Course[] = [
    { id: "k1", name: "Automaquillaje (ejemplo)", date: toISO(addDays(today, 9)), seats: 8, enrolled: ["c3", "c6", "c10", "c12", "c14"], price: 450_000 },
    { id: "k2", name: "Curso profesional (ejemplo)", date: toISO(addDays(today, 24)), seats: 6, enrolled: ["c2", "c7"], price: 1_800_000 },
    { id: "k3", name: "Novias con aerógrafo (ejemplo)", date: toISO(addDays(today, 40)), seats: 5, enrolled: [], price: 1_200_000 },
  ];

  const availability: Record<number, string[]> = {
    0: [],
    1: allSlots.slice(0, 10),
    2: allSlots.slice(0, 10),
    3: allSlots.slice(0, 10),
    4: allSlots.slice(0, 10),
    5: allSlots.slice(0, 10),
    6: allSlots.slice(0, 8),
  };

  return { appointments, clients, staff, catalog, courses, photos: [], availability, blockedDates: [] };
}

type AdminContextValue = {
  ready: boolean;
  today: Date | null;
  data: AdminData | null;
  signedIn: boolean;
  signIn: () => void;
  signOut: () => void;
  /** Applies a change after a short simulated network wait, so buttons can show their loading state. */
  mutate: (change: (data: AdminData) => AdminData) => Promise<void>;
  resetDemo: () => void;
};

const AdminContext = createContext<AdminContextValue | null>(null);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function AdminProvider({ children, initialPhotos }: { children: ReactNode; initialPhotos: PortfolioPhoto[] }) {
  const [today, setToday] = useState<Date | null>(null);
  const [data, setData] = useState<AdminData | null>(null);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const now = new Date();
    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let stored: AdminData | null = null;
    let session = false;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) stored = JSON.parse(raw) as AdminData;
      session = window.sessionStorage.getItem(`${STORAGE_KEY}-session`) === "1";
    } catch {
      // Storage can be unavailable (private mode): the demo still works in memory.
    }
    const next = stored ?? { ...seed(day), photos: initialPhotos };
    // Simulated first load, so the skeletons are visible for a moment.
    const timer = window.setTimeout(() => {
      setToday(day);
      setData(next);
      setSignedIn(session);
    }, 450);
    return () => window.clearTimeout(timer);
  }, [initialPhotos]);

  useEffect(() => {
    if (!data) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore: storage full or blocked.
    }
  }, [data]);

  const mutate = useCallback(async (change: (current: AdminData) => AdminData) => {
    await wait(650);
    setData((current) => (current ? change(current) : current));
  }, []);

  const value = useMemo<AdminContextValue>(
    () => ({
      ready: Boolean(data && today),
      today,
      data,
      signedIn,
      signIn: () => {
        setSignedIn(true);
        try {
          window.sessionStorage.setItem(`${STORAGE_KEY}-session`, "1");
        } catch {
          // Ignore.
        }
      },
      signOut: () => {
        setSignedIn(false);
        try {
          window.sessionStorage.removeItem(`${STORAGE_KEY}-session`);
        } catch {
          // Ignore.
        }
      },
      mutate,
      resetDemo: () => {
        if (!today) return;
        setData({ ...seed(today), photos: initialPhotos });
      },
    }),
    [data, today, signedIn, mutate, initialPhotos],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
}

export const statusLabels: Record<AppointmentStatus, string> = {
  pendiente: "Por confirmar",
  confirmada: "Confirmada",
  completada: "Completada",
  cancelada: "Cancelada",
};

const dayFormat = new Intl.DateTimeFormat("es-CO", { weekday: "short", day: "numeric", month: "short" });
const longDayFormat = new Intl.DateTimeFormat("es-CO", { weekday: "long", day: "numeric", month: "long" });
const upperFirst = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
export const formatDay = (iso: string) => upperFirst(dayFormat.format(fromISO(iso)).replace(".", ""));
export const formatLongDay = (iso: string) => {
  const text = longDayFormat.format(fromISO(iso));
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/** For pages rendered inside the gate, where the data is always loaded. */
export function useData() {
  const { data, today, mutate } = useAdmin();
  if (!data || !today) throw new Error("Admin data is not ready");
  return { data, today, todayISO: toISO(today), mutate };
}

export const clientName = (data: AdminData, id: string) => data.clients.find((client) => client.id === id)?.name ?? "Clienta";
export const staffOf = (data: AdminData, id: string) => data.staff.find((member) => member.id === id);
export const balance = (appointment: Appointment) => Math.max(appointment.price - appointment.paid, 0);
export const shiftISO = (iso: string, days: number) => toISO(addDays(fromISO(iso), days));
export const slotRank = (time: string) => allSlots.indexOf(time);
export const byDateTime = (a: Appointment, b: Appointment) => a.date.localeCompare(b.date) || slotRank(a.time) - slotRank(b.time);
