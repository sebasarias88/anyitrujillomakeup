import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { monumentStyle } from "@/lib/monument";

type SystemScreenProps = {
  /** Large decorative word along the bottom edge (404, Ups, Sin red). */
  monument: string;
  title: string;
  children: ReactNode;
  actions: ReactNode;
};

/** Shared layout for 404, error and offline screens: same light theme as the site. */
export function SystemScreen({ monument, title, children, actions }: SystemScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col overflow-hidden bg-paper text-ink">
      <div className="container-page flex flex-1 flex-col pt-6">
        <Logo className="h-12 self-start text-ink" />
        <div className="my-auto max-w-xl py-16">
          <h1 className="font-display text-[2.6rem] leading-[1] tracking-[-0.02em] md:text-[3.6rem]">{title}</h1>
          <div className="mt-5 text-[1.05rem] leading-relaxed">{children}</div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{actions}</div>
        </div>
      </div>
      <div aria-hidden data-monument={monument} style={monumentStyle(monument, 40)} className="monument text-monument container-page -mb-[0.12em] whitespace-nowrap select-none" />
    </div>
  );
}
