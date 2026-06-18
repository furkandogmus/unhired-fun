"use client";

import { useState, useRef, useEffect } from "react";

export default function EasterEgg({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }

    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("click", handler);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <span className="easter-egg" ref={ref}>
      <button
        className="easter-trigger"
        type="button"
        aria-label="Secret"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        ?
      </button>
      {open && (
        <span className="easter-pop" role="status">
          {children}
        </span>
      )}
    </span>
  );
}
