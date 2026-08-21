import type { Metadata } from "next";
import { ComandoClient } from "./ComandoClient";

export const metadata: Metadata = {
  title: "Comando Mundial, Liderança & In Memoriam",
  description:
    "Conheça a estrutura de liderança do Insanos Moto Clube: Comando Mundial Ativo, Diretorias Regionais e a solene homenagem perpétua aos Fundadores, Legado e In Memoriam.",
};

export default function ComandoPage() {
  return <ComandoClient />;
}
