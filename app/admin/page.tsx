import type { Metadata } from "next";
import { AdminClient } from "./AdminClient";

export const metadata: Metadata = {
  title: "Painel Administrativo | Insanos MC",
  description: "Painel de gestão de conteúdos e edição visual do portal oficial do Insanos Moto Clube.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
