import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

type SystemScreenProps = {
  /** Small label above the title (404, Error, Sin conexión). */
  eyebrow: string;
  title: string;
  children: ReactNode;
  actions: ReactNode;
};

/** Shared layout for 404, error and offline screens: same light theme as the site. */
export function SystemScreen({ eyebrow, title, children, actions }: SystemScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <div className="container-page flex flex-1 flex-col pt-6">
        <Logo className="h-12 self-start text-ink" />
        <div className="my-auto max-w-xl py-16">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 font-display text-[2.6rem] leading-[1.05] md:text-[3.4rem]">{title}</h1>
          <div className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">{children}</div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>
        </div>
      </div>
    </div>
  );
}
