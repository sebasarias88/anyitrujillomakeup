import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", id }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-nude uppercase ${centered ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-nude/60" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 font-display text-4xl leading-[1.05] font-light text-balance text-ivory md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-pretty text-sand md:text-lg">{description}</p>
      ) : null}
    </Reveal>
  );
}
