"use client";

import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Skeleton, SkeletonRegion } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import type { AppointmentStatus } from "./store";
import { statusLabels } from "./store";
import { CloseIcon } from "./icons";

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <section className={`rounded-[1.25rem] border border-line bg-paper p-5 shadow-soft sm:p-6 ${className}`}>{children}</section>;
}

export function CardTitle({ title, action, hint }: { title: string; action?: ReactNode; hint?: string }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="font-display text-[1.3rem] leading-tight text-ink">{title}</h2>
        {hint ? <p className="mt-1 text-[0.82rem] text-ink-soft">{hint}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function PageTitle({ eyebrow, title, intro, action }: { eyebrow: string; title: ReactNode; intro?: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow text-nude-deep">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[2rem] leading-[1.1] text-ink sm:text-[2.4rem]">{title}</h1>
        {intro ? <p className="mt-2 max-w-xl text-[0.95rem] text-ink-soft">{intro}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 flex-wrap gap-2">{action}</div> : null}
    </div>
  );
}

type Variant = "primary" | "outline" | "ghost" | "danger";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-soft",
  outline: "border border-line-strong bg-paper text-ink hover:border-ink",
  ghost: "text-ink-soft hover:bg-marble hover:text-ink",
  danger: "border border-[#e6c9c2] bg-paper text-[#a23f2c] hover:bg-[#fbefec]",
};

type ActionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & {
  variant?: Variant;
  size?: "md" | "sm";
  /** Async handlers show a spinner and lock the button until they finish. */
  onClick?: () => void | Promise<void>;
  loadingText?: string;
};

export function ActionButton({ variant = "primary", size = "md", onClick, loadingText, children, className = "", disabled, ...props }: ActionButtonProps) {
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onClick={async () => {
        if (!onClick) return;
        const result = onClick();
        if (result instanceof Promise) {
          setLoading(true);
          try {
            await result;
          } finally {
            if (mounted.current) setLoading(false);
          }
        }
      }}
      className={`pressable inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.06em] whitespace-nowrap select-none disabled:cursor-not-allowed disabled:opacity-60 ${
        size === "md" ? "min-h-11 px-5 text-[0.82rem]" : "min-h-9 px-3.5 text-[0.76rem]"
      } ${variants[variant]} ${className}`}
    >
      {loading ? <Spinner className="size-3.5" /> : null}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

const statusStyles: Record<AppointmentStatus, string> = {
  pendiente: "bg-[#fff6dc] text-[#7a5a00] border-[#f1df9f]",
  confirmada: "bg-[#eaf3ec] text-[#2f6b45] border-[#c8e0cf]",
  completada: "bg-marble text-ink-soft border-line",
  cancelada: "bg-[#fbefec] text-[#a23f2c] border-[#efd3cc]",
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.72rem] font-medium whitespace-nowrap ${statusStyles[status]}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {statusLabels[status]}
    </span>
  );
}

export function Tag({ children, tone = "nude" }: { children: ReactNode; tone?: "nude" | "plain" }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.72rem] whitespace-nowrap ${
        tone === "nude" ? "bg-nude-field text-nude-deep" : "border border-line text-ink-soft"
      }`}
    >
      {children}
    </span>
  );
}

export function Stat({ label, value, note, trend }: { label: string; value: ReactNode; note?: string; trend?: "up" | "down" }) {
  return (
    <Card className="!p-4 sm:!p-5">
      <p className="eyebrow text-ink-soft">{label}</p>
      <p className="mt-3 font-display text-[1.6rem] leading-none sm:text-[2rem] text-ink tabular-nums">{value}</p>
      {note ? (
        <p className={`mt-2 text-[0.8rem] ${trend === "up" ? "text-[#2f6b45]" : trend === "down" ? "text-[#a23f2c]" : "text-ink-soft"}`}>
          {trend === "up" ? "▲ " : trend === "down" ? "▼ " : ""}
          {note}
        </p>
      ) : null}
    </Card>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: ReactNode }) {
  return (
    <div className="rounded-[1.25rem] border border-dashed border-line-strong bg-blush px-6 py-10 text-center">
      <p className="font-display text-[1.25rem] text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-[0.9rem] text-ink-soft">{text}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function PageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <SkeletonRegion label="Cargando el panel…">
      <Skeleton className="h-4 w-28 rounded-full" />
      <Skeleton className="mt-3 h-10 w-72 max-w-full rounded-xl" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: cards }, (_, index) => (
          <Skeleton key={index} className="h-32 rounded-[1.25rem]" />
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Skeleton className="h-80 rounded-[1.25rem]" />
        <Skeleton className="h-80 rounded-[1.25rem]" />
      </div>
    </SkeletonRegion>
  );
}

export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Cerrar" onClick={onClose} className="admin-fade absolute inset-0 bg-ink/35 backdrop-blur-[2px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="admin-rise relative flex max-h-[92dvh] w-full flex-col rounded-t-[1.5rem] bg-paper shadow-lift sm:max-w-lg sm:rounded-[1.5rem]"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-[1.35rem] text-ink">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="pressable grid size-9 place-items-center rounded-full text-ink-soft hover:bg-marble">
            <CloseIcon className="size-4.5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer ? <div className="flex flex-wrap justify-end gap-2 border-t border-line px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="eyebrow text-ink-soft">{label}</span>
      <div className="mt-2">{children}</div>
      {hint ? <span className="mt-1.5 block text-[0.78rem] text-ink-soft">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "w-full min-h-11 rounded-xl border border-line-strong bg-paper px-4 text-[0.95rem] text-ink placeholder:text-ink-soft/70 outline-none transition-colors focus:border-ink";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-ink" : "bg-line-strong"}`}
    >
      <span className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-paper shadow-sm transition-transform duration-200 ease-out ${checked ? "translate-x-5" : ""}`} />
    </button>
  );
}

export function Segmented<T extends string>({ value, onChange, options, label }: { value: T; onChange: (value: T) => void; options: { value: T; label: string; count?: number }[]; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={value === option.value}
          onClick={() => onChange(option.value)}
          className={`pressable inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-[0.8rem] whitespace-nowrap ${
            value === option.value ? "bg-ink text-paper" : "border border-line bg-paper text-ink-soft hover:border-ink hover:text-ink"
          }`}
        >
          {option.label}
          {option.count !== undefined ? (
            <span className={`rounded-full px-1.5 text-[0.7rem] tabular-nums ${value === option.value ? "bg-paper/20" : "bg-marble"}`}>{option.count}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

/** Small toast in the corner, so every action gets feedback. */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  useEffect(() => {
    if (!message) return;
    const timer = window.setTimeout(() => setMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [message]);
  const toast = message ? (
    <div role="status" className="admin-rise fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-[0.85rem] text-paper shadow-lift">
      {message}
    </div>
  ) : null;
  return { toast, show: setMessage };
}

export function Avatar({ name, color }: { name: string; color?: string }) {
  const initials = name
    .replace(/\(.*\)/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-full font-display text-[0.9rem] text-paper"
      style={{ backgroundColor: color ?? "#c98f6a" }}
    >
      {initials}
    </span>
  );
}
