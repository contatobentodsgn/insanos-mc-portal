import type { Metadata, Viewport } from "next";
import "./globals.css";
import { VisualEditor } from "./components/VisualEditor";
import { RadioProvider } from "./context/RadioContext";
import { RadioBar } from "./components/RadioBar";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { NoiseOverlay } from "./components/NoiseOverlay";

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://insanosmc.vercel.app"),
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
    siteName: "Insanos Moto Clube Mundial",
    title: "Insanos MC — Nosso combustível é a irmandade",
    description:
      "Original de OZ · Desde 2015. Uma irmandade em movimento com presença em mais de 65 países e compromisso inegociável com a caridade e a honra.",
    images: [
      {
        url: "/images/insanos/hero_biker.webp",
        width: 1200,
        height: 630,
        alt: "Insanos Moto Clube — Comboio Oficial na Estrada",
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
    icon: "/images/insanos/insanos_mc_logo.svg",
    apple: "/images/insanos/insanos_mc_logo.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insanos MC — Nosso combustível é a irmandade",
    description: "Original de OZ · Desde 2015 rompendo paradigmas do motociclismo mundial.",
    images: ["/images/insanos/hero_biker.webp"],
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
        <NoiseOverlay />
        <ScrollProgressBar />
        <RadioProvider>
          <RadioBar />
          {children}
          <VisualEditor />
        </RadioProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('error', function(e) {
                  var msg = (e && e.message) ? e.message : '';
                  if (msg.indexOf('Loading chunk') !== -1 || msg.indexOf('ChunkLoadError') !== -1 || msg.indexOf('removeChild') !== -1) {
                    if (!window.__hasAutoReloaded) {
                      window.__hasAutoReloaded = true;
                      window.location.reload();
                    }
                  }
                });
                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e ? e.reason : '';
                  var msg = typeof reason === 'string' ? reason : (reason && reason.message ? reason.message : '');
                  if (msg.indexOf('Loading chunk') !== -1 || msg.indexOf('ChunkLoadError') !== -1 || msg.indexOf('Failed to fetch') !== -1) {
                    if (!window.__hasAutoReloaded) {
                      window.__hasAutoReloaded = true;
                      window.location.reload();
                    }
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
