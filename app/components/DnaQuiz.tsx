"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { IconShield, IconArrowRight, IconRefresh, IconChat, IconCheck } from "./ui/Icons";
import { INSTITUTIONAL_METRICS } from "../data/institutional";

interface Question {
  id: number;
  pillar: string;
  question: React.ReactNode;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    pillar: "Pilar 01: Deus & Família",
    question: "Em relação aos 4 Pilares do Insanos MC (Deus, Família, Trabalho e Motoclube), qual é a ordem de prioridade na vida do integrante?",
    options: [
      {
        text: "1º Deus, 2º Família, 3º Trabalho e 4º Motoclube.",
        isCorrect: true,
        feedback: "Exato! Essa é a base de todo integrante. O motoclube jamais exige o sacrifício do lar ou do sustento digno.",
      },
      {
        text: "1º Motoclube acima de tudo, depois o resto.",
        isCorrect: false,
        feedback: "Incorreto. O Insanos MC preza pelo equilíbrio do homem com sua fé, sua família e sua profissão.",
      },
      {
        text: "Apenas andar de moto aos fins de semana sem compromissos.",
        isCorrect: false,
        feedback: "Incorreto. O Insanos é uma irmandade estruturada com estatuto e compromisso de conduta.",
      },
    ],
  },
  {
    id: 2,
    pillar: "Pilar 02: Comunidade & Ação Social",
    question: "Qual é a obrigação e postura de cada divisão e integrante em relação às campanhas sociais do clube?",
    options: [
      {
        text: "Participação ativa e voluntária contínua nas doações de sangue, alimentos e auxílio aos necessitados.",
        isCorrect: true,
        feedback: `Exato! Nosso destino é fazer o bem. A ação social é o coração pulsante do Insanos MC em ${INSTITUTIONAL_METRICS.countries} países.`,
      },
      {
        text: "Apenas pagar mensalidade e não participar de nenhuma ação com a comunidade.",
        isCorrect: false,
        feedback: "Incorreto. A presença física e o trabalho voluntário direto são deveres de quem veste nosso colete.",
      },
      {
        text: "Ajudar somente quando houver evento comemorativo ou aniversário.",
        isCorrect: false,
        feedback: "Incorreto. Nossas ações de solidariedade ocorrem de forma contínua durante todo o ano.",
      },
    ],
  },
  {
    id: 3,
    pillar: "Pilar 03: Honra & Hierarquia",
    question: "Complete a máxima histórica do Insanos Moto Clube: 'Colete não cria irmão...'",
    options: [
      {
        text: "'...Atitude cria.'",
        isCorrect: true,
        feedback: "Exato! A honra, a lealdade na adversidade e o respeito aos irmãos e às leis são provados no dia a dia.",
      },
      {
        text: "'...O modelo ou cilindrada da moto cria.'",
        isCorrect: false,
        feedback: "Incorreto. Aceitamos todas as marcas e cilindradas; o que importa é o caráter e postura do piloto.",
      },
      {
        text: "'...O tempo de estrada cria.'",
        isCorrect: false,
        feedback: "Incorreto. Respeitamos veteranos, mas a atitude e humildade de cada dia definem a fraternidade.",
      },
    ],
  },
  {
    id: 4,
    pillar: "Pilar 04: Irmandade & Conduta",
    question: "Como o integrante do Insanos MC deve agir na estrada e em seu convívio público?",
    options: [
      {
        text: "Com disciplina exemplar de comboio, respeito às leis de trânsito e postura de liderança positiva.",
        isCorrect: true,
        feedback: "Perfeito! O Insanos MC é referência mundial em organização de comboio, segurança e conduta ilibada.",
      },
      {
        text: "Fazendo manobras perigosas e desrespeitando o espaço dos outros motoristas.",
        isCorrect: false,
        feedback: "Incorreto. Não toleramos imprudência na pilotagem ou desrespeito no asfalto.",
      },
      {
        text: "Sem se preocupar com os irmãos que estão atrás no comboio.",
        isCorrect: false,
        feedback: "Incorreto. Nenhum irmão fica para trás. A segurança do grupo é responsabilidade de todos.",
      },
    ],
  },
];

interface DnaQuizProps {
  onProceedToForm?: () => void;
}

export function DnaQuiz({ onProceedToForm }: DnaQuizProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const triggerHaptic = (pattern: number | number[] = 15) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    triggerHaptic(15);
    const currentQ = QUESTIONS[currentStep];
    const option = currentQ.options[index];
    const newAnswers = [...selectedAnswers, index];
    setSelectedAnswers(newAnswers);
    setFeedbackText(option.feedback);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      triggerHaptic(12);
      setCurrentStep(currentStep + 1);
      setIsAnswered(false);
      setFeedbackText("");
    } else {
      triggerHaptic([20, 60, 20]);
      setShowResult(true);
    }
  };

  const handleReset = () => {
    triggerHaptic(12);
    setCurrentStep(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setFeedbackText("");
    setIsAnswered(false);
    setDownloadSuccess(false);
  };

  const currentQ = QUESTIONS[currentStep];
  const totalCorrect = selectedAnswers.filter(
    (ansIndex, qIndex) => QUESTIONS[qIndex]?.options[ansIndex]?.isCorrect
  ).length;

  const scorePercentage = Math.round((totalCorrect / QUESTIONS.length) * 100);

  // Generate 9:16 High-Res Story Image (1080 x 1920)
  const generateStoryCard = () => {
    setIsGeneratingCard(true);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background Gradient (Deep Carbon & Gold Glow)
    const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGrad.addColorStop(0, "#08090A");
    bgGrad.addColorStop(0.5, "#101114");
    bgGrad.addColorStop(1, "#050506");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Subtle Radial Glow at Center
    const glow = ctx.createRadialGradient(540, 750, 50, 540, 750, 600);
    glow.addColorStop(0, "rgba(242, 194, 27, 0.18)");
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 1080, 1920);

    // Top / Bottom Decorative Gold Borders
    ctx.strokeStyle = "#F2C21B";
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 960, 1800);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(75, 75, 930, 1770);

    // Header Tag
    ctx.textAlign = "center";
    ctx.font = "bold 26px monospace";
    ctx.fillStyle = "#F2C21B";
    ctx.fillText("INSANOS MOTO CLUBE · ORIGINAL DE OZ 2015", 540, 180);

    // Title
    ctx.font = "900 68px Anton, Impact, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("CERTIFICADO DE AFINIDADE", 540, 270);

    ctx.font = "bold 22px 'Space Grotesk', sans-serif";
    ctx.fillStyle = "#E0DDD8";
    ctx.fillText("TESTE OFICIAL DE AFINIDADE", 540, 330);

    // Divider Line
    ctx.strokeStyle = "rgba(242, 194, 27, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(340, 370);
    ctx.lineTo(740, 370);
    ctx.stroke();

    // Central Medal Crest Badge Container
    ctx.fillStyle = "rgba(20, 22, 26, 0.9)";
    ctx.strokeStyle = "#F2C21B";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(140, 430, 800, 780, 32);
    ctx.fill();
    ctx.stroke();

    // Score Circle Background
    ctx.fillStyle = "rgba(242, 194, 27, 0.12)";
    ctx.beginPath();
    ctx.arc(540, 640, 140, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#F2C21B";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Score Text
    ctx.font = "900 96px Anton, Impact, sans-serif";
    ctx.fillStyle = "#F2C21B";
    ctx.fillText(`${scorePercentage}%`, 540, 675);

    // Result Classification
    ctx.font = "bold 32px 'Anton', sans-serif";
    ctx.fillStyle = "#F2C21B";
    ctx.fillText(scorePercentage === 100 ? "AFINIDADE TOTAL COM OS PILARES" : "ALTA AFINIDADE DE CONDUTA", 540, 860);

    ctx.font = "bold 26px sans-serif";
    ctx.fillStyle = "#E0DDD8";
    ctx.fillText("Perfil: Disciplina, Fé, Honra & Ação Social", 540, 920);

    // Validated Pillars Chips
    const pillars = [
      "✓ 1º Deus & Família",
      "✓ 2º Ação Humanitária",
      "✓ 3º Honra & Hierarquia",
      "✓ 4º Irmandade & Conduta",
    ];

    pillars.forEach((p, idx) => {
      const y = 1000 + idx * 45;
      ctx.font = "bold 24px monospace";
      ctx.fillStyle = "#F2C21B";
      ctx.fillText(p, 540, y);
    });

    // Verification Code & Date
    const today = new Date().toLocaleDateString("pt-BR");
    const certId = `IMC-${Math.floor(100000 + Math.random() * 900000)}`;

    ctx.font = "20px monospace";
    ctx.fillStyle = "#88857E";
    ctx.fillText(`CÓDIGO: ${certId} · EMISSÃO: ${today}`, 540, 1300);

    // Action Quote
    ctx.font = "italic 32px Georgia, serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText('"Colete não cria irmão. Atitude cria."', 540, 1420);

    ctx.font = "bold 24px monospace";
    ctx.fillStyle = "#F2C21B";
    ctx.fillText("NOSSO DESTINO É FAZER O BEM", 540, 1475);

    // Footer Slogan & Hashtags
    ctx.font = "900 40px Anton, Impact, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("#SOMOSDEVERDADE · +12.000 INTEGRANTES", 540, 1620);

    ctx.font = "22px monospace";
    ctx.fillStyle = "#AAA8A1";
    ctx.fillText("insanosmc.com.br · 18 do Forte", 540, 1680);

    // Trigger Download
    setTimeout(() => {
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `Certificado-DNA-Insanos-${scorePercentage}pct.png`;
      a.click();
      triggerHaptic(25);
      setIsGeneratingCard(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    }, 400);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Acabei de realizar o Teste de Afinidade no site oficial do Insanos Moto Clube e obtive ${scorePercentage}% de alinhamento com os 4 Pilares. Gostaria de saber como conhecer o capítulo mais próximo!`
  );

  return (
    <div className="p-6 sm:p-10 lg:p-12 rounded-2xl bg-[#141519] border border-[#F2C21B]/30 shadow-2xl relative overflow-hidden">
      {!showResult ? (
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider block mb-1">
                {currentQ.pillar}
              </span>
              <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white">
                Teste de Afinidade com os 4 Pilares
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#AAA8A1]">
                Pergunta {currentStep + 1} de {QUESTIONS.length}
              </span>
              <div className="w-24 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-[#F2C21B] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Text */}
          <h4 className="font-['Anton'] text-xl sm:text-2xl uppercase text-white mb-6 leading-snug">
            {currentQ.question}
          </h4>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentStep] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-5 rounded-xl border text-sm sm:text-base font-semibold transition-colors duration-200 flex items-start gap-4 cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? "bg-emerald-950/40 border-emerald-500 text-emerald-200"
                        : "bg-red-950/40 border-red-500 text-red-200"
                      : "bg-[#0E0F12] border-white/10 hover:border-white/30 text-white/90"
                  }`}
                >
                  <span className="font-mono text-xs text-[#F2C21B] mt-0.5 font-bold">
                    {String.fromCharCode(65 + idx)})
                  </span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-[#0B0C0E] border border-white/10 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-opacity duration-300">
              <p className="text-xs sm:text-sm text-[#C7C5BF] leading-relaxed">
                {feedbackText}
              </p>
              <button
                onClick={handleNext}
                className="shrink-0 px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-xs rounded transition-colors duration-200 shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{currentStep < QUESTIONS.length - 1 ? "Próxima Pergunta" : "Ver Resultado & Certificado"}</span>
                <IconArrowRight className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Showcase with Gamification Card & 9:16 Export */
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#F2C21B]/15 text-[#F2C21B] mb-3">
            <IconShield className="w-9 h-9 text-[#F2C21B]" />
          </div>

          <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-widest block mb-1">
            Certificado de Afinidade Insanos
          </span>

          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white mb-2">
            {scorePercentage}% de Compatibilidade
          </h3>

          <p className="text-sm sm:text-base text-[#C7C5BF] max-w-2xl mx-auto leading-relaxed mb-6">
            {scorePercentage >= 75
              ? "Você demonstrou compreensão total dos 4 Pilares (Deus, Família, Trabalho e Motoclube), da vocação social e do regimento de respeito mútuo. Você possui o perfil ideal para iniciar como Pré-Postulante (PP)."
              : "Você compreendeu a essência do motoclube. Recomendamos aprofundar na leitura dos 4 Pilares e conversar com a liderança regional mais próxima."}
          </p>

          {/* Gamification Preview Badge Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-b from-[#1E2026] to-[#0D0E10] border border-[#F2C21B]/40 shadow-2xl mb-8 text-left space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-[11px] font-mono text-[#F2C21B] uppercase tracking-wider font-bold">
                Insanos MC · 18 do Forte
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                VALIDADO
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#F2C21B]/15 border-2 border-[#F2C21B] flex items-center justify-center font-['Anton'] text-2xl text-[#F2C21B] shrink-0">
                {scorePercentage}%
              </div>
              <div>
                <h4 className="font-['Anton'] text-lg uppercase text-white leading-tight">
                  {scorePercentage === 100 ? "Afinidade Total com os Pilares" : "Alta Afinidade de Conduta"}
                </h4>
                <p className="text-xs text-[#AAA8A1]">Perfil: Disciplina, Fé & Ação Social</p>
              </div>
            </div>
            <div className="text-[11px] text-[#88857E] font-mono pt-2 border-t border-white/5 flex justify-between">
              <span>#SomosDeVerdade</span>
              <span>Padronizado para Stories (9:16)</span>
            </div>
          </div>

          {/* Action Buttons: Download Story 9:16 + WhatsApp Regional + Form */}
          <div className="flex flex-wrap justify-center items-center gap-3.5">
            {/* Download Story Card 9:16 */}
            <button
              onClick={generateStoryCard}
              disabled={isGeneratingCard}
              className="px-6 py-3.5 bg-gradient-to-r from-yellow-500 to-[#F2C21B] hover:from-yellow-400 hover:to-yellow-300 text-black font-['Anton'] tracking-wider uppercase text-sm rounded-xl shadow-lg inline-flex items-center gap-2.5 cursor-pointer active:scale-95 transition-all"
            >
              {isGeneratingCard ? (
                <span>Gerando Imagem 9:16…</span>
              ) : downloadSuccess ? (
                <>
                  <IconCheck className="w-4 h-4 text-black" />
                  <span>Cartão Baixado!</span>
                </>
              ) : (
                <>
                  <span>📸 Salvar Cartão para Stories (9:16)</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Contact with Regional Leader */}
            <a
              href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-['Anton'] tracking-wider uppercase text-sm rounded-xl shadow-lg inline-flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <IconChat className="w-4 h-4 text-white" />
              <span>Conversar com a Regional</span>
            </a>

            {/* Proceed to Official Admission Form */}
            {onProceedToForm ? (
              <button
                onClick={onProceedToForm}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Ficha de Ingresso</span>
                <IconArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            ) : (
              <Link
                href="/faca-parte?aba=formulario"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all inline-flex items-center gap-2"
              >
                <span>Ficha de Ingresso</span>
                <IconArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            )}

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-4 py-3.5 text-[#AAA8A1] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <IconRefresh className="w-3.5 h-3.5 text-inherit" />
              <span>Refazer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
