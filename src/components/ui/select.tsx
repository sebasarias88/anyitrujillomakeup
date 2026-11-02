"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CheckIcon, ChevronIcon } from "./icons";
import { Spinner } from "./spinner";

export type SelectOption = {
  value: string;
  label: string;
  /** Shown as a second line; for disabled options it says why. */
  hint?: string;
  disabled?: boolean;
};

type SelectProps = {
  label: string;
  options: readonly SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  loading?: boolean;
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean;
  className?: string;
};

const SEARCH_THRESHOLD = 8;

// Accent-insensitive matching: "cafe" finds "Café".
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/**
 * Custom select (never a native <select>): a combobox button plus a listbox
 * in the top layer via the Popover API, so no panel or dialog can clip it.
 * Full keyboard support, type-to-jump, search above 8 options, flips upward
 * when there is no room below and follows the trigger while scrolling.
 */
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder = "Elegir…",
  loading = false,
  hideLabel = false,
  className = "",
}: SelectProps) {
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);

  const searchable = options.length > SEARCH_THRESHOLD;
  const visible = useMemo(
    () => (searchable && query ? options.filter((option) => normalize(option.label).includes(normalize(query))) : options),
    [options, query, searchable],
  );
  const selected = options.find((option) => option.value === value) ?? null;

  const enabledIndexes = useMemo(
    () => visible.flatMap((option, index) => (option.disabled ? [] : [index])),
    [visible],
  );

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    const popover = popoverRef.current;
    if (!trigger || !popover) return;
    const rect = trigger.getBoundingClientRect();
    const height = Math.min(popover.scrollHeight, 320);
    const below = window.innerHeight - rect.bottom;
    const flip = below < height + 12 && rect.top > below;
    popover.style.left = `${rect.left}px`;
    popover.style.width = `${rect.width}px`;
    popover.style.top = flip ? `${Math.max(8, rect.top - height - 6)}px` : `${rect.bottom + 6}px`;
    popover.style.transformOrigin = flip ? "bottom center" : "top center";
  }, []);

  const show = () => {
    if (loading) return;
    const start = options.findIndex((option) => option.value === value);
    setActive(start >= 0 ? start : (enabledIndexes[0] ?? -1));
    setQuery("");
    setOpen(true);
  };

  const hide = useCallback((focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  const commit = (index: number) => {
    const option = visible[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    hide();
  };

  // Sync React state with the top-layer popover.
  useLayoutEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    if (open && !popover.matches(":popover-open")) {
      popover.showPopover();
      place();
      if (searchable) searchRef.current?.focus();
    }
    if (!open && popover.matches(":popover-open")) popover.hidePopover();
  }, [open, place, searchable]);

  // Light dismiss (outside tap, Escape handled by the browser) closes our state too.
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;
    const onToggle = (event: Event) => {
      if ((event as ToggleEvent).newState === "closed") setOpen(false);
    };
    popover.addEventListener("toggle", onToggle);
    return () => popover.removeEventListener("toggle", onToggle);
  }, []);

  // Follow the trigger while scrolling or resizing.
  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", place, { capture: true, passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, { capture: true });
      window.removeEventListener("resize", place);
    };
  }, [open, place]);

  useEffect(() => {
    if (!open || active < 0) return;
    document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);

  const move = (delta: number) => {
    if (!enabledIndexes.length) return;
    const position = enabledIndexes.indexOf(active);
    const next = position === -1 ? 0 : Math.min(enabledIndexes.length - 1, Math.max(0, position + delta));
    setActive(enabledIndexes[next]);
  };

  const jumpTo = (key: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.text += normalize(key);
    state.timer = window.setTimeout(() => (state.text = ""), 600);
    const match = visible.findIndex((option) => !option.disabled && normalize(option.label).startsWith(state.text));
    if (match >= 0) {
      setActive(match);
      if (!open) onChange(visible[match].value);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(key)) {
        event.preventDefault();
        show();
      } else if (key.length === 1 && !event.metaKey && !event.ctrlKey) {
        jumpTo(key);
      }
      return;
    }
    const actions: Record<string, () => void> = {
      ArrowDown: () => move(1),
      ArrowUp: () => move(-1),
      Home: () => setActive(enabledIndexes[0] ?? -1),
      End: () => setActive(enabledIndexes.at(-1) ?? -1),
      Enter: () => commit(active),
    };
    if (!searchable) actions[" "] = () => commit(active);
    if (actions[key]) {
      event.preventDefault();
      actions[key]();
    } else if (key === "Escape") {
      // Close only the list, never the dialog or menu that contains it.
      event.preventDefault();
      event.stopPropagation();
      hide();
    } else if (key === "Tab") hide(false);
    else if (!searchable && key.length === 1) jumpTo(key);
  };

  const listboxId = `${id}-listbox`;
  const activeId = open && active >= 0 ? `${id}-option-${active}` : undefined;

  return (
    <div className={className}>
      <span id={`${id}-label`} className={hideLabel ? "sr-only" : "mb-2 block text-[0.95rem] font-semibold"}>
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        role="combobox"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={searchable ? undefined : activeId}
        aria-busy={loading}
        disabled={loading}
        onClick={() => (open ? hide() : show())}
        onKeyDown={onKeyDown}
        className="pressable flex min-h-13 w-full items-center justify-between gap-3 bg-marble px-4 text-left text-base hover:bg-marble-deep disabled:cursor-progress"
      >
        <span id={`${id}-value`} className={selected ? "text-ink" : "text-ink-soft"}>
          {loading ? "Cargando…" : (selected?.label ?? placeholder)}
        </span>
        {loading ? (
          <Spinner />
        ) : (
          <ChevronIcon className={`size-4 shrink-0 transition-transform duration-200 ${open ? "-rotate-90" : "rotate-90"}`} />
        )}
      </button>

      <div
        ref={popoverRef}
        popover="auto"
        className="select-popover fixed m-0 max-h-80 overflow-auto bg-paper p-1.5 text-ink shadow-[0_18px_50px_-12px_rgb(4_6_6/0.28)]"
      >
        {searchable ? (
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Buscar…"
            aria-label={`Buscar en ${label}`}
            aria-controls={listboxId}
            aria-activedescendant={activeId}
            className="mb-1.5 min-h-11 w-full bg-marble px-3 text-base outline-none focus-visible:outline-2"
          />
        ) : null}
        <ul id={listboxId} role="listbox" aria-labelledby={`${id}-label`}>
          {visible.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                aria-disabled={option.disabled || undefined}
                onPointerEnter={() => !option.disabled && setActive(index)}
                onClick={() => commit(index)}
                className={`flex cursor-pointer items-start gap-3 px-3 py-2.5 ${
                  option.disabled ? "cursor-not-allowed text-ink-soft" : ""
                } ${index === active ? "bg-marble" : ""}`}
              >
                <CheckIcon className={`mt-1 size-4 shrink-0 ${isSelected ? "" : "invisible"}`} />
                <span>
                  <span className="block">{option.label}</span>
                  {option.hint ? <span className="block text-sm text-ink-soft">{option.hint}</span> : null}
                </span>
              </li>
            );
          })}
          {!visible.length ? <li className="px-3 py-2.5 text-ink-soft">Sin resultados</li> : null}
        </ul>
      </div>
    </div>
  );
}
