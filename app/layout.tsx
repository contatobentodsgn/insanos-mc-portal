import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Insanos MC", template: "%s — Insanos MC" },
  description: "Nosso combustível é a irmandade. Original de OZ, desde 2015.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
