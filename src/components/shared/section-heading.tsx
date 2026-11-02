import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Label, title (one phrase in italic nude) and an optional sentence, used by every section. */
export function SectionHeading({ id, eyebrow, title, intro, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 font-display text-[2.2rem] leading-[1.1] text-balance md:text-[3rem]">
        {title}
      </h2>
      {intro ? <p className={`mt-4 text-[1.05rem] leading-relaxed font-light text-ink-soft ${centered ? "mx-auto max-w-[52ch]" : "max-w-[52ch]"}`}>{intro}</p> : null}
    </Reveal>
  );
}
