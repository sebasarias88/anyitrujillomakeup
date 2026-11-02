"use client";

import { useReducedMotion } from "motion/react";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * A formatted figure whose digits roll to their new value (transform only,
 * 200 ms). Screen readers get the plain text; the columns are decorative.
 */
export function RollingNumber({ value, className = "" }: { value: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const chars = value.split("");

  return (
    <span className={`relative inline-flex [font-variant-numeric:lining-nums_tabular-nums] ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((char, index) => {
          const digit = DIGITS.indexOf(char);
          // Key from the right so units stay units when the number grows.
          const key = chars.length - index;
          if (digit === -1) return <span key={`s${key}`}>{char}</span>;
          return (
            <span key={`d${key}`} className="relative inline-block h-[1.1em] overflow-hidden leading-[1.1]">
              {/* The 0–9 column is drawn by CSS (.digit-column::before), so it is not page text. */}
              <span
                className="digit-column block"
                style={{
                  transform: `translateY(-${digit * 10}%)`,
                  transition: reduceMotion ? "none" : "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              />
            </span>
          );
        })}
      </span>
    </span>
  );
}
