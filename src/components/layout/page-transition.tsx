import { ViewTransition, type ReactNode } from "react";

/**
 * Wraps each page's content so route changes play the airbrush "mist"
 * (see .page-mist in globals.css). It must live in every page, not in the
 * layout: layouts persist across navigations, so enter/exit never fire there.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-mist" exit="page-mist" default="none">
      {children}
    </ViewTransition>
  );
}
