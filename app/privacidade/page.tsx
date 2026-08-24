import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD)",
  description:
    "Diretrizes de transparência, proteção e tratamento de dados pessoais do Insanos Moto Clube em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).",
  alternates: {
    canonical: "https://insanosmc.vercel.app/privacidade",
  },
};

export default function PrivacidadePage() {
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
                Governança & Transparência
              </span>
            </div>
            <h1 className="font-['Anton'] uppercase text-4xl sm:text-6xl text-white tracking-wide mb-4">
              Política de <span className="text-[#F2C21B]">Privacidade (LGPD)</span>
            </h1>
            <p className="text-sm font-mono text-[#AAA8A1]">
              Última atualização: Agosto de 2026 · Em conformidade com a Lei nº 13.709/2018 (LGPD)
            </p>
          </div>

          {/* Content */}
          <div className="space-y-10 text-[#C7C5BF] text-sm sm:text-base leading-relaxed">
            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                1. Identificação do Controlador
              </h2>
              <p>
                O <strong>Insanos Moto Clube Mundial</strong> (“Insanos MC”), organização fundada em 2015 com sede de origem em Osasco/SP e presença internacional em mais de 65 países, atua como <strong>Controlador</strong> dos dados pessoais coletados por meio do portal oficial (<code className="text-[#F2C21B] bg-black/40 px-2 py-0.5 rounded">https://insanosmc.vercel.app</code>) e de seus canais digitais autorizados.
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                2. Dados Coletados e Finalidade do Tratamento
              </h2>
              <p className="mb-4">
                Ao preencher a ficha de solicitação de ingresso (“Faça Parte”), os seguintes dados pessoais são coletados:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/90">
                <li><strong>Nome Completo:</strong> Identificação do candidato perante a diretoria regional.</li>
                <li><strong>Estado, Cidade e Região:</strong> Encaminhamento do contato para o Diretor Regional e capítulo local responsável.</li>
                <li><strong>Telefone (WhatsApp):</strong> Contato direto para agendamento de entrevistas, alinhamento prévio e convite para visita à sede.</li>
                <li><strong>E-mail:</strong> Envio de confirmação de recebimento, protocolo oficial e comunicados institucionais.</li>
                <li><strong>Informações de Motocicleta & CNH:</strong> Avaliação técnica de perfil de rodagem e enquadramento em projetos (ex: Bonde Geral, Divisão PcD).</li>
              </ul>
              <p className="mt-4 text-xs font-mono text-[#AAA8A1]">
                * Base legal: Consentimento inequívoco do titular (Art. 7º, I da LGPD) e procedimentos preliminares relacionados à adesão voluntária (Art. 7º, V da LGPD).
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                3. Compartilhamento e Sigilo dos Dados
              </h2>
              <p className="mb-3">
                O Insanos MC <strong>jamais comercializa, aluga ou cede dados pessoais a terceiros para fins de marketing ou publicidade não autorizada</strong>.
              </p>
              <p>
                O compartilhamento de dados ocorre <strong>estritamente</strong> no âmbito interno do motoclube:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1.5 text-white/90">
                <li>Diretoria Nacional de Recrutamento & Cadastro;</li>
                <li>Diretorias Regionais e Capitães de Estrada da localidade do candidato;</li>
                <li>Autoridades públicas competentes, exclusivamente mediante requisição legal fundamentada.</li>
              </ul>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                4. Armazenamento, Segurança e Retenção
              </h2>
              <p className="mb-3">
                Adotamos medidas técnicas e organizacionais rígidas de segurança da informação, incluindo criptografia em trânsito (HTTPS / TLS 1.3), bancos de dados com restrição de acesso por privilégios mínimos e proteção contra injeção e abuso.
              </p>
              <p>
                Os dados de candidatos que não prosseguirem no processo de Pré-Postulante (PP) são retidos pelo período máximo de 12 (doze) meses para controle histórico e prevenção de fraudes, após o qual são devidamente excluídos ou anonimizados.
              </p>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                5. Direitos do Titular (Art. 18 da LGPD)
              </h2>
              <p className="mb-3">
                Em conformidade com a legislação brasileira, o titular de dados possui o direito de solicitar a qualquer momento:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                  <span className="font-bold text-white block mb-1">Confirmação & Acesso:</span>
                  Saber se tratamos seus dados e solicitar cópia integral.
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                  <span className="font-bold text-white block mb-1">Correção & Atualização:</span>
                  Solicitar retificação de dados incompletos ou desatualizados.
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                  <span className="font-bold text-white block mb-1">Eliminação de Dados:</span>
                  Solicitar a exclusão definitiva dos dados coletados sob consentimento.
                </div>
                <div className="p-3 bg-black/40 border border-white/10 rounded-lg">
                  <span className="font-bold text-white block mb-1">Revogação do Consentimento:</span>
                  Retirar autorização de contato a qualquer tempo.
                </div>
              </div>
            </section>

            <section className="bg-[#121316] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h2 className="font-['Anton'] text-2xl uppercase text-white mb-4 text-[#F2C21B]">
                6. Canal do Encarregado de Dados (DPO)
              </h2>
              <p className="mb-4">
                Para exercer seus direitos de privacidade ou esclarecer dúvidas operacionais sobre o tratamento de seus dados, entre em contato diretamente com nossa equipe institucional:
              </p>
              <div className="p-4 bg-black/50 border border-[#F2C21B]/30 rounded-xl font-mono text-xs text-white space-y-1">
                <div><strong>Encarregado (DPO):</strong> Coordenação Nacional de Tecnologia & Governança</div>
                <div><strong>Canal Oficial:</strong> privacidade@insanosmc.com.br</div>
                <div><strong>Portal Oficial:</strong> https://insanosmc.vercel.app</div>
              </div>
            </section>

            <div className="flex justify-between items-center pt-6 border-t border-white/10">
              <Link
                href="/termos"
                className="text-xs uppercase font-['Anton'] text-[#F2C21B] hover:underline tracking-wider"
              >
                ← Consultar Termos de Uso
              </Link>
              <Link
                href="/faca-parte"
                className="px-6 py-2.5 bg-[#F2C21B] text-black font-['Anton'] uppercase text-xs tracking-wider rounded-xl hover:bg-[#ffe053] transition-colors"
              >
                Voltar à Ficha de Ingresso
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
