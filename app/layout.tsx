import type { Metadata, Viewport } from "next";
import "./globals.css";
import { VisualEditor } from "./components/VisualEditor";
import { RadioProvider } from "./context/RadioContext";
import { RadioBar } from "./components/RadioBar";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Insanos MC — Nosso combustível é a irmandade | Original de OZ",
    template: "%s | Insanos MC",
  },
  description:
    "O maior motoclube do Brasil e do mundo. Desde 2015 rompendo paradigmas do motociclismo com disciplina, honra, ajuda comunitária e fraternidade. #SomosDeVerdade",
  keywords: [
    "Insanos MC",
    "Insanos Moto Clube",
    "Original de OZ",
    "18 do Forte",
    "Motoclube Brasil",
    "Ação Social Motociclismo",
    "Projeto PcD",
    "Bonde Pela Vida",
    "Combate Insano",
  ],
  authors: [{ name: "Insanos Moto Clube" }],
  creator: "Insanos MC",
  publisher: "Insanos MC",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://insanosmc.vercel.app",
    siteName: "Insanos Moto Clube",
    title: "Insanos MC — Nosso combustível é a irmandade",
    description:
      "Original de OZ · Desde 2015. Uma irmandade em movimento com presença em mais de 65 países e compromisso com o impacto social.",
    images: [
      {
        url: "https://www.insanosmc.com.br/wp-content/uploads/2018/04/parallax-main.jpg",
        width: 1200,
        height: 630,
        alt: "Insanos Moto Clube — Comboio na Estrada",
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Insanos MC",
  },
  icons: {
    icon: "https://www.insanosmc.com.br/wp-content/uploads/2018/04/insanosmc.png",
    apple: "https://www.insanosmc.com.br/wp-content/uploads/2018/04/insanosmc.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insanos MC — Nosso combustível é a irmandade",
    description: "Original de OZ · Desde 2015 rompendo paradigmas do motociclismo.",
    images: ["https://www.insanosmc.com.br/wp-content/uploads/2018/04/parallax-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F4F1E8] antialiased selection:bg-[#F2C21B] selection:text-black">
        <RadioProvider>
          <RadioBar />
          {children}
          <VisualEditor />
        </RadioProvider>
      </body>
    </html>
  );
}
