import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Elevated white card. Lifts off --bg via soft shadow + hairline border,
 * per the design system — no heavy borders.
 */
export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-bg-elevated shadow-card hover:shadow-card-hover rounded-lg border p-6 transition-shadow",
        className
      )}
    >
      {children}
    </div>
  );
}
