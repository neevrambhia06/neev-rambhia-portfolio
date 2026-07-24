import type { Metadata } from "next";
import { profile } from "@/content/profile";

export const siteConfig = {
  name: profile.name,
  url: "https://neevrambhia.com", // Updated for production
  description: `${profile.name} — ${profile.role}`,
  ogImage: "/og-placeholder.png",
};

/** Build per-page metadata that inherits site defaults. */
export function createMetadata(overrides: Metadata = {}): Metadata {
  return {
    ...overrides,
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    // Placeholder favicon from create-next-app; replaced in Phase 2.
    icon: "/favicon.ico",
  },
};
