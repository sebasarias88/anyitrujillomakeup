"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function OfflineNotice() {
  const online = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );

  if (online) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-70 bg-nude px-4 py-2 text-center text-sm font-semibold text-ink"
    >
      Sin conexión a internet. Algunas imágenes o enlaces pueden no cargar hasta que vuelvas a conectarte.
    </div>
  );
}
