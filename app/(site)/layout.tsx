import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
