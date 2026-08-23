import type { Metadata } from "next";
import { NewsClient } from "./NewsClient";

export const metadata: Metadata = {
  title: "18News — A Revista Oficial do Insanos MC",
  description:
    "Acompanhe as últimas notícias, expedições internacionais, grandes encontros, podcast 18Cast e ações sociais do Insanos Moto Clube.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/18news",
  },
};

export default function NewsPage() {
  return <NewsClient />;
}
