import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

/**
 * Link styled as a button. Color/surface only — sizing stays default-ish
 * until the typography/layout phase.
 */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: ButtonLinkProps) {
  const styles = cn(
    "inline-block rounded-md px-4 py-2 transition-colors",
    variant === "primary" && "bg-primary text-white hover:bg-primary-hover",
    variant === "secondary" &&
      "border border-border-strong bg-bg-elevated text-text-primary hover:bg-surface",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
