import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos e condições gerais de navegação, propriedade intelectual e uso do portal oficial do Insanos Moto Clube.",
  alternates: {
    canonical: "https://insanosmc.vercel.app/termos",
  },
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans selection:bg-[#F2C21B] selection:text-black">
      <Navbar />

      <main className="py-20 sm:py-28 bg-[#0E0F12]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#F2C21B]" />
              <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                Regimento Digital
              </span>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-6xl text-white tracking-wide mb-4">
              Termos de <span className="text-[#F2C21B]">Uso</span>
            </h1>
            <p className="text-sm font-mono text-[#AAA8A1]">
              Última atualização: Agosto de 2026 · Portal Oficial Insanos Moto Clube
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-[#C7C5BF] text-sm sm:text-base leading-relaxed">
            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar o portal oficial do <strong>Insanos Moto Clube</strong> (<code className="text-[#F2C21B] bg-black/40 px-2 py-0.5 rounded">https://insanosmc.vercel.app</code>), você declara expressamente haver lido, compreendido e concordado com as condições descritas neste documento e na nossa <Link href="/privacidade" className="text-[#F2C21B] underline hover:text-[#ffe053]">Política de Privacidade</Link>.
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                2. Propriedade Intelectual & Marcas Registradas
              </h2>
              <p className="mb-3">
                O brasão, logotipo, marca figurativa e nominativa <strong>“Insanos MC”</strong>, <strong>“Original de OZ”</strong>, <strong>“18 do Forte”</strong>, brasões divisórios e conteúdos editoriais do portal são propriedades intelectuais exclusivas do Insanos Moto Clube, protegidas pelas leis brasileiras e tratados internacionais de direitos autorais e marcas.
              </p>
              <p>
                É expressamente proibida a reprodução, cópia, estampagem em vestuário ou utilização comercial de nossos símbolos sem autorização prévia, expressa e formal do Comando Nacional do motoclube.
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                3. Natureza do Processo de Ingresso
              </h2>
              <p className="mb-3">
                O envio da ficha de candidatura através da página <strong>“Faça Parte”</strong> ou a conclusão do teste doutrinário constituem manifestações voluntárias de interesse cívico e de irmandade.
              </p>
              <p>
                O preenchimento do formulário <strong>não garante</strong> aprovação automática nem confere direito imediato ao uso de colete ou representação pública do clube. Todo ingresso depende de entrevista presencial, análise idônea de conduta e cumprimento integral do período de Pré-Postulante (PP).
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                4. Links para Serviços Externos do Ecossistema
              </h2>
              <p className="mb-3">
                O portal pode disponibilizar atalhos para frentes parceiras e serviços de nosso ecossistema oficial (ex: Loja Oficial 18 Store, Rádio Web Insanos MC, canais de podcast e projetos sociais).
              </p>
              <p>
                Transações comerciais na loja oficial regem-se pelas políticas específicas de e-commerce da referida plataforma autorizada.
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                5. Foro e Legislação Aplicável
              </h2>
              <p>
                Estes Termos são regidos e interpretados segundo as leis da República Federativa do Brasil. Para dirimir quaisquer controvérsias oriundas do uso deste portal, fica eleito o Foro da Comarca de Osasco/SP, com expressa renúncia a qualquer outro.
              </p>
            </section>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <Link
                href="/privacidade"
                className="text-xs uppercase font-['Anton'] text-[#F2C21B] hover:underline tracking-wider"
              >
                ← Consultar Política de Privacidade (LGPD)
              </Link>
              <Link
                href="/"
                className="px-6 py-2.5 bg-[#F2C21B] text-black font-['Anton'] uppercase text-xs tracking-wider rounded hover:bg-[#ffe053] transition-colors"
              >
                Voltar à Página Principal
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
