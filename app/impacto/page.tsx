import type { Metadata } from "next";
import { ImpactoClient } from "./ImpactoClient";

export const metadata: Metadata = {
  title: "Ações Sociais & Projetos | Ninguém Fica Para Trás",
  description:
    "Conheça os projetos sociais do Insanos Moto Clube: Projeto PcD (motos e triciclos adaptados), Bonde Pela Vida (doação de sangue), Combate Insano (artes marciais para jovens) e auxílio comunitário.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/impacto",
  },
};

export default function ImpactoPage() {
  return <ImpactoClient />;
}
