import type { Metadata } from "next";
import { Hero3dClient } from "./Hero3dClient";

export const metadata: Metadata = {
  title: "Hero 3D Medalha Interativa (Variação Experimental) | Insanos Moto Clube",
  description:
    "Variação experimental com animação da Medalha 3D metálica em Canvas e GSAP ScrollTrigger com rotação conectada ao scroll.",
};

export default function Hero3dPage() {
  return <Hero3dClient />;
}
