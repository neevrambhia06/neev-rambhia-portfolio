import { cn } from "@/lib/utils";

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
};

/** Small neutral chip for tech tags. Surface tone, secondary text. */
export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "bg-surface text-text-secondary inline-block rounded-md px-2 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
}
