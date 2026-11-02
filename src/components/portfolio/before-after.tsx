"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { beforeAfter } from "@/lib/images";

const STEP = 5;

/**
 * Before/after comparison. The "before" layer sits on top and is clipped
 * with clip-path (no extra DOM, GPU friendly); the handle is a real slider
 * (role="slider", arrow keys, Home/End) and drags with pointer capture.
 * When it first comes into view it sweeps once to show it can be moved.
 */
function Comparison({ before, after, label }: { before: ReactNode; after: ReactNode; label: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  // One demonstration sweep, the first time the frame is seen (skipped with reduced motion).
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          // 50 → 32 → 68 → 50 on a sine, eased at both ends.
          setPosition(50 - 18 * Math.sin(t * Math.PI * 2) * Math.sin(t * Math.PI));
          if (t < 1 && !dragging.current) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(frame);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const moveTo = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={frameRef}
      className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-[1.25rem] shadow-soft select-none"
      onPointerDown={(event) => {
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        moveTo(event.clientX);
      }}
      onPointerMove={(event) => dragging.current && moveTo(event.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before}
      </div>
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} % antes`}
        onKeyDown={(event) => {
          const moves: Record<string, number> = { ArrowLeft: -STEP, ArrowDown: -STEP, ArrowRight: STEP, ArrowUp: STEP };
          if (event.key in moves) {
            event.preventDefault();
            setPosition((value) => Math.min(100, Math.max(0, value + moves[event.key])));
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            setPosition(event.key === "Home" ? 0 : 100);
          }
        }}
        className="absolute inset-y-0 z-10 -ml-6 flex w-12 cursor-ew-resize justify-center outline-offset-[-4px]"
        style={{ left: `${position}%` }}
      >
        <span aria-hidden className="h-full w-[2px] bg-paper" />
        <span aria-hidden className="absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper shadow-md">
          <ChevronIcon className="size-4 rotate-180" />
          <ChevronIcon className="-ml-1.5 size-4" />
        </span>
      </div>
    </div>
  );
}

function ComingSoonSide({ side }: { side: "Antes" | "Después" }) {
  return (
    <div className={`flex h-full w-full flex-col justify-between p-5 ${side === "Antes" ? "bg-marble-deep" : "bg-nude-field"}`}>
      <span className={`rounded-full bg-white/90 px-3.5 py-1.5 text-[0.75rem] tracking-[0.14em] uppercase ${side === "Antes" ? "self-start" : "self-end"}`}>{side}</span>
      <Logo className="mx-auto h-20 text-ink/15" />
      <span />
    </div>
  );
}

/**
 * The strongest proof a makeup artist has. Until Anyi sends real pairs of
 * the same client, it shows designed empty frames with a working slider.
 */
export function BeforeAfter() {
  const hasPhotos = beforeAfter.length > 0;

  return (
    <section aria-labelledby="before-after-title" className="bg-marble py-24 md:py-28">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Transformaciones</p>
          <h2 id="before-after-title" className="mt-4 font-display text-[2.2rem] leading-[1.1] md:text-[3rem]">
            Antes y <em className="text-nude-deep">después</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[1.05rem] leading-relaxed font-light text-ink-soft">
            {hasPhotos ? "Desliza para comparar. Clientas reales, sin filtros." : "Muy pronto: transformaciones reales de clientas. Mientras tanto, desliza para ver cómo funciona."}
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {hasPhotos
            ? beforeAfter.map((pair) => (
                <Comparison
                  key={pair.id}
                  label={`Comparar antes y después: ${pair.alt}`}
                  before={<Image src={pair.before} alt={`Antes: ${pair.alt}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                  after={<Image src={pair.after} alt={`Después: ${pair.alt}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />}
                />
              ))
            : [0, 1].map((frame) => (
                <Comparison
                  key={frame}
                  label="Comparar antes y después (próximamente)"
                  before={<ComingSoonSide side="Antes" />}
                  after={<ComingSoonSide side="Después" />}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
