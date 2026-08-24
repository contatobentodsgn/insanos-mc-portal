import type { Metadata } from "next";
import { EventosClient } from "./EventosClient";

export const metadata: Metadata = {
  title: "Agenda & Eventos Oficiais — Calendário Nacional e Mundial",
  description:
    "Calendário oficial de encontros, passeios, ações humanitárias do Bonde Pela Vida e mega expedições do Insanos Moto Clube. Sincronize com o Google Agenda e Apple Calendar (.ics) em 1 clique.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/eventos",
  },
  openGraph: {
    title: "Agenda & Eventos Oficiais | Insanos MC",
    description:
      "Confira os próximos bondes e encontros nacionais e mundiais do maior motoclube do Brasil e do mundo.",
    url: "https://insanosmc.vercel.app/eventos",
  },
};

export default function EventosPage() {
  return <EventosClient />;
}
