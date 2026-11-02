"use client";

import { useEffect, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

/**
 * Global "no connection" notice. While offline it also blocks internal
 * navigation: a client-side route change would fail halfway and leave the
 * visitor on a broken screen, so links stay put until the connection returns.
 * External links (WhatsApp) are left alone.
 */
export function OfflineNotice() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );

  useEffect(() => {
    if (online) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.origin === window.location.origin && link.pathname !== window.location.pathname) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [online]);

  if (online) return null;

  return (
    <div role="status" className="fixed inset-x-0 top-0 z-[70] bg-ink px-4 py-2.5 text-center text-[0.95rem] font-medium text-paper">
      Sin conexión a internet. Puedes seguir viendo esta página; para agendar, vuelve a conectarte.
    </div>
  );
}
