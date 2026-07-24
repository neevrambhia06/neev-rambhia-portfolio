/** Merge class names, filtering falsy values. Swap for clsx/tailwind-merge later if needed. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
