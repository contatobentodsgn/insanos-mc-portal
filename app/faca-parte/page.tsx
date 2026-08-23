import React, { Suspense } from "react";
import type { Metadata } from "next";
import { FacaParteClient } from "./FacaParteClient";

export const metadata: Metadata = {
  title: "Faça Parte do Insanos MC | Processo de Ingresso",
  description:
    "Descubra como ingressar no Insanos Moto Clube: pré-requisitos, período de Pré-Postulante (PP), compromisso com as ações sociais e formulário oficial de adesão regional.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/faca-parte",
  },
};

export default function FacaPartePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0A0A]" />}>
      <FacaParteClient />
    </Suspense>
  );
}
