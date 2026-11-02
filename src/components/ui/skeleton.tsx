import type { ReactNode } from "react";

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`skeleton ${className}`} />;
}

/** Wraps a block of skeletons so screen readers hear "Cargando…" once. */
export function SkeletonRegion({ label = "Cargando…", className = "", children }: { label?: string; className?: string; children: ReactNode }) {
  return (
    <div aria-busy="true" className={className}>
      <span role="status" className="sr-only">
        {label}
      </span>
      {children}
    </div>
  );
}
