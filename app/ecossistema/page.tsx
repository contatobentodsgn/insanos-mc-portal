import type { Metadata } from "next";
import { EcossistemaClient } from "./EcossistemaClient";

export const metadata: Metadata = {
  title: "Ecossistema Digital | 18 Store, Rádio, Podcast & ALAMO",
  description:
    "Explore o ecossistema digital do Insanos Moto Clube: 18 Store Oficial (vestuário e acessórios), Rádio Insanos Web 24h, Podcast 18Cast e Associação ALAMO.",
};

export default function EcossistemaPage() {
  return <EcossistemaClient />;
}
