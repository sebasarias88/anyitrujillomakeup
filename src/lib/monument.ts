import type { CSSProperties } from "react";

/**
 * Font size that makes a word run nearly margin to margin on one line.
 * Cormorant Garamond light averages about half an em per letter, so the
 * size is the usable width divided by half the letter count, capped.
 */
export function monumentStyle(word: string, maxVw = 24): CSSProperties {
  const vw = Math.min(maxVw, 88 / (word.length * 0.5));
  return { fontSize: `${vw.toFixed(2)}vw` };
}
