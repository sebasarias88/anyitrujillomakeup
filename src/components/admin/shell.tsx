"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import { Logo } from "@/components/ui/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { images } from "@/lib/images";
import {
  BellIcon, BookIcon, CalendarIcon, CashIcon, ClockIcon, CloseIcon, ExternalIcon, HomeIcon, ImageIcon, ListIcon, LogoutIcon, MenuIcon, SparkleIcon, UsersIcon,
} from "./icons";
import { AdminProvider, formatLongDay, toISO, useAdmin, type PortfolioPhoto } from "./store";
import { ActionButton, PageSkeleton } from "./ui";

type NavItem = { href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> };

const nav: { group: string; items: NavItem[] }[] = [
  {
    group: "Día a día",
    items: [
      { href: "/admin", label: "Resumen", icon: HomeIcon },
      { href: "/admin/agenda", label: "Agenda", icon: CalendarIcon },
      { href: "/admin/citas", label: "Citas", icon: ListIcon },
      { href: "/admin/ventas", label: "Ventas y abonos", icon: CashIcon },
      { href: "/admin/clientas", label: "Clientas", icon: UsersIcon },
    ],
  },
  {
    group: "Mi negocio",
    items: [
      { href: "/admin/servicios", label: "Servicios y precios", icon: SparkleIcon },
      { href: "/admin/horarios", label: "Horarios", icon: ClockIcon },
      { href: "/admin/portafolio", label: "Portafolio", icon: ImageIcon },
      { href: "/admin/cursos", label: "Cursos", icon: BookIcon },
      { href: "/admin/equipo", label: "Equipo", icon: UsersIcon },
    ],
  },
];

export function AdminShell({ children, initialPhotos }: { children: ReactNode; initialPhotos: PortfolioPhoto[] }) {
  return (
    <AdminProvider initialPhotos={initialPhotos}>
      <Gate>{children}</Gate>
    </AdminProvider>
  );
}

function Gate({ children }: { children: ReactNode }) {
  const { ready, signedIn } = useAdmin();
  if (!ready) return <Frame><PageSkeleton /></Frame>;
  if (!signedIn) return <SignIn />;
  return <Frame>{children}</Frame>;
}

function SignIn() {
  const { signIn } = useAdmin();
  return (
    <div className="grid min-h-dvh bg-paper lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src={images.glamRoseHero} alt="" fill sizes="50vw" className="object-cover" priority />
        <div className="absolute inset-x-8 bottom-8 rounded-[1.25rem] bg-paper/92 p-6 shadow-lift backdrop-blur">
          <p className="font-display text-[1.5rem] leading-snug text-ink">
            Tu estudio, <em className="text-nude-deep">organizado</em> desde el celular.
          </p>
          <p className="mt-2 text-[0.9rem] text-ink-soft">Agenda, abonos, clientas y precios en un solo lugar.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-14">
        <div className="mx-auto w-full max-w-sm">
          <Logo className="h-14 text-ink" />
          <p className="eyebrow mt-10 text-nude-deep">Panel administrativo</p>
          <h1 className="mt-2 font-display text-[2.3rem] leading-[1.1] text-ink">
            Hola, <em className="text-nude-deep">Anyi</em>
          </h1>
          <p className="mt-3 text-[0.95rem] text-ink-soft">Entra para ver tu agenda de hoy.</p>
          <form
            className="mt-8 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <label className="block">
              <span className="eyebrow text-ink-soft">Correo</span>
              <input readOnly value="anyi@anyitrujillo.com" className="mt-2 min-h-12 w-full rounded-xl border border-line-strong bg-blush px-4 text-ink outline-none" />
            </label>
            <label className="block">
              <span className="eyebrow text-ink-soft">Contraseña</span>
              <input readOnly type="password" value="demo-demo" className="mt-2 min-h-12 w-full rounded-xl border border-line-strong bg-blush px-4 text-ink outline-none" />
            </label>
            <ActionButton
              className="!min-h-12 w-full"
              loadingText="Entrando…"
              onClick={() => new Promise<void>((resolve) => setTimeout(() => { signIn(); resolve(); }, 700))}
            >
              Entrar al panel
            </ActionButton>
          </form>
          <p className="mt-6 rounded-xl bg-nude-field px-4 py-3 text-[0.82rem] text-nude-deep">
            Esto es un demo: los datos son de ejemplo y se guardan solo en este navegador.
          </p>
          <Link href="/" className="mt-6 inline-block text-[0.85rem] text-ink-soft underline underline-offset-4 hover:text-ink">
            ← Volver al sitio web
          </Link>
        </div>
      </div>
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The drawer remembers the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  return (
    <div className="min-h-dvh bg-blush">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-paper lg:block">
        <Sidebar />
      </aside>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="admin-fade absolute inset-0 bg-ink/35" />
          <aside className="admin-slide absolute inset-y-0 left-0 w-[17rem] bg-paper shadow-lift">
            <button type="button" aria-label="Cerrar menú" onClick={() => setOpen(false)} className="absolute top-4 right-3 grid size-9 place-items-center rounded-full text-ink-soft hover:bg-marble">
              <CloseIcon className="size-4.5" />
            </button>
            <Sidebar />
          </aside>
        </div>
      ) : null}
      <div className="lg:pl-64">
        <TopBar onMenu={() => setOpen(true)} />
        <main className="mx-auto max-w-[78rem] px-4 pt-6 pb-16 sm:px-8 sm:pt-8">{children}</main>
      </div>
    </div>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const { signOut, ready } = useAdmin();
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-6 pb-4">
        <Link href="/admin" aria-label="Resumen">
          <Logo className="h-11 text-ink" />
        </Link>
        <p className="eyebrow mt-2 text-nude-deep">Panel del estudio</p>
      </div>
      <nav aria-label="Panel" className="flex-1 overflow-y-auto px-3 pb-4">
        {nav.map((section) => (
          <div key={section.group} className="mt-4">
            <p className="eyebrow px-3 pb-2 text-ink-soft/80">{section.group}</p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-10 items-center gap-3 rounded-xl px-3 text-[0.9rem] transition-colors ${
                        active ? "bg-nude-field text-ink" : "text-ink-soft hover:bg-marble hover:text-ink"
                      }`}
                    >
                      <Icon className={`size-[1.15rem] ${active ? "text-nude-deep" : ""}`} />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-line p-3">
        <Link href="/" className="flex min-h-10 items-center gap-3 rounded-xl px-3 text-[0.9rem] text-ink-soft hover:bg-marble hover:text-ink">
          <ExternalIcon className="size-[1.15rem]" />
          Ver mi sitio web
        </Link>
        {ready ? (
          <button type="button" onClick={signOut} className="flex min-h-10 w-full items-center gap-3 rounded-xl px-3 text-[0.9rem] text-ink-soft hover:bg-marble hover:text-ink">
            <LogoutIcon className="size-[1.15rem]" />
            Cerrar sesión
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const { data, today } = useAdmin();
  const pending = data?.appointments.filter((appointment) => appointment.status === "pendiente").length ?? 0;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[78rem] items-center gap-3 px-4 sm:px-8">
        <button type="button" onClick={onMenu} aria-label="Abrir menú" className="pressable grid size-10 place-items-center rounded-full border border-line lg:hidden">
          <MenuIcon className="size-5" />
        </button>
        <div className="min-w-0 flex-1">
          {today ? (
            <p className="truncate text-[0.85rem] text-ink-soft">{formatLongDay(toISO(today))}</p>
          ) : (
            <Skeleton className="h-4 w-40 rounded-full" />
          )}
        </div>
        <span className="hidden rounded-full bg-nude-field px-3 py-1 text-[0.72rem] tracking-[0.08em] text-nude-deep uppercase sm:inline">Demo</span>
        <Link href="/admin/citas?estado=pendiente" aria-label={`${pending} citas por confirmar`} className="pressable relative grid size-10 place-items-center rounded-full border border-line text-ink hover:border-ink">
          <BellIcon className="size-5" />
          {pending ? (
            <span className="absolute -top-1 -right-1 grid min-w-5 place-items-center rounded-full bg-nude-deep px-1 text-[0.68rem] text-paper tabular-nums">{pending}</span>
          ) : null}
        </Link>
        <span className="grid size-10 place-items-center rounded-full bg-ink font-display text-paper">A</span>
      </div>
    </header>
  );
}

/** Renders the page body only once the demo data is ready. */
export function AdminPage({ children, cards }: { children: () => ReactNode; cards?: number }) {
  const { ready } = useAdmin();
  return ready ? <div className="admin-page">{children()}</div> : <PageSkeleton cards={cards} />;
}
