import "./globals.css";
import { fontBody, fontHeading, fontMono } from "@/lib/fonts";
import { defaultMetadata } from "@/lib/metadata";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
