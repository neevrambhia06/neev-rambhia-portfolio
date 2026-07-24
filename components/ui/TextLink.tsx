import Link from "next/link";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Cobalt accent link — the palette's signal color for interactivity. */
export function TextLink({
  href,
  external = false,
  className,
  children,
}: TextLinkProps) {
  const styles = cn(
    "text-accent transition-colors hover:text-accent-hover hover:underline",
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
