import type { Metadata } from "next";
import { HistoriaClient } from "./HistoriaClient";

export const metadata: Metadata = {
  title: "Nossa História & Os 18 do Forte",
  description:
    "A história do Insanos Moto Clube: a bravura inspiradora de 1922 em Copacabana, a fundação em 2015 em Osasco/SP (Original de OZ) e a consolidação como o maior motoclube do mundo.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/historia",
  },
};

export default function HistoriaPage() {
  return <HistoriaClient />;
}
