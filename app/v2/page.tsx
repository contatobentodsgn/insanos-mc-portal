import type { Metadata } from "next";
import { HomeV2Client } from "./HomeV2Client";


export const metadata: Metadata = {
  title: "Versão 2 (Cinema Edition) | Insanos Moto Clube",
  description:
    "Experiência cinematográfica do Insanos Moto Clube. 8 capítulos monumentais, comando mundial, mapa de rotas globais e acervo histórico.",
};

export default function V2Page() {
  return <HomeV2Client />;
}
