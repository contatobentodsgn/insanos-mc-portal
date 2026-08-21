import type { Metadata } from "next";
import { FacaParteClient } from "./FacaParteClient";

export const metadata: Metadata = {
  title: "Faça Parte do Insanos MC | Processo de Ingresso",
  description:
    "Descubra como ingressar no Insanos Moto Clube: pré-requisitos, período de Pré-Postulante (PP), compromisso com as ações sociais e formulário oficial de adesão regional.",
};

export default function FacaPartePage() {
  return <FacaParteClient />;
}
