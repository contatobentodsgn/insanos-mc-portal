import React, { useState } from "react";
import Link from "next/link";
import { IconShield } from "./ui/Icons";

interface Question {
  id: number;
  pillar: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    pillar: "Pilar: Doutrina & Prioridades",
    question: "Em caso de conflito de tempo ou decisão pessoal, qual a ordem sagrada e inegociável de prioridades do integrante?",
    options: [
      {
        text: "1º Deus, 2º Família, 3º Trabalho e 4º Motoclube.",
        isCorrect: true,
        feedback: "Correto. Essa é a base de todo integrante. O motoclube jamais exige o sacrifício do lar ou do sustento digno.",
      },
      {
        text: "1º Motoclube acima de tudo, depois o resto.",
        isCorrect: false,
        feedback: "Incorreto. O Insanos MC preza pelo equilíbrio do homem com sua fé, sua família e sua profissão.",
      },
      {
        text: "Apenas andar de moto aos fins de semana sem regras.",
        isCorrect: false,
        feedback: "Incorreto. O Insanos é uma irmandade estruturada com estatuto e compromisso de conduta.",
      },
    ],
  },
  {
    id: 2,
    pillar: "Pilar: Ação Humanitária",
    question: "Qual é a obrigação e postura de cada divisão e integrante em relação às campanhas sociais do clube?",
    options: [
      {
        text: "Participação ativa e voluntária mensal nas doações de sangue, alimentos e auxílio aos necessitados.",
        isCorrect: true,
        feedback: "Exato! Nosso destino é fazer o bem. A ação social é o coração pulsante do Insanos MC.",
      },
      {
        text: "Apenas pagar mensalidade e não participar de nenhuma ação com a comunidade.",
        isCorrect: false,
        feedback: "Incorreto. A presença física e o trabalho voluntário direto são deveres de quem veste nosso colete.",
      },
      {
        text: "Ajudar somente quando houver evento comemorativo.",
        isCorrect: false,
        feedback: "Incorreto. Nossas ações de solidariedade ocorrem de forma contínua durante todo o ano.",
      },
    ],
  },
  {
    id: 3,
    pillar: "Pilar: Hierarquia & Respeito",
    question: "Complete a máxima histórica do Insanos Moto Clube: 'Colete não cria irmão...'",
    options: [
      {
        text: "'...Atitude cria.'",
        isCorrect: true,
        feedback: "Exato! A honra, a lealdade na adversidade e o respeito aos irmãos e às leis são provados no dia a dia.",
      },
      {
        text: "'...O modelo da moto cria.'",
        isCorrect: false,
        feedback: "Incorreto. Aceitamos todas as marcas e cilindradas; o que importa é o caráter do piloto.",
      },
      {
        text: "'...O tempo de estrada cria.'",
        isCorrect: false,
        feedback: "Incorreto. Respeitamos veteranos, mas a atitude e humildade de cada dia definem a fraternidade.",
      },
    ],
  },
];

export function DnaQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    const currentQ = QUESTIONS[currentStep];
    const option = currentQ.options[index];
    const newAnswers = [...selectedAnswers, index];
    setSelectedAnswers(newAnswers);
    setFeedbackText(option.feedback);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsAnswered(false);
      setFeedbackText("");
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setFeedbackText("");
    setIsAnswered(false);
  };

  const currentQ = QUESTIONS[currentStep];
  const totalCorrect = selectedAnswers.filter(
    (ansIndex, qIndex) => QUESTIONS[qIndex].options[ansIndex]?.isCorrect
  ).length;

  return (
    <div className="p-8 sm:p-12 rounded-2xl bg-[#141519] border border-[#F2C21B]/30 shadow-2xl">
      {!showResult ? (
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider block mb-1">
                {currentQ.pillar}
              </span>
              <h3 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white">
                Simulador de Afinidade Doutrinária
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
                  className={`w-full text-left p-5 rounded-xl border text-sm sm:text-base font-semibold transition-colors duration-200 flex items-start gap-4 ${
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
                className="shrink-0 px-6 py-3 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-xs rounded transition-colors duration-200 hover-lift shadow-md"
              >
                {currentStep < QUESTIONS.length - 1 ? "Próxima Pergunta →" : "Ver Resultado Final ↘"}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Showcase */
        <div className="text-center py-6">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#F2C21B]/15 text-[#F2C21B] mb-4">
            <IconShield className="w-8 h-8 text-[#F2C21B]" />
          </div>
          <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-widest block mb-2">
            Resultado da Avaliação
          </span>
          <h3 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white mb-4">
            {totalCorrect === 3 ? "100% Compatível com o DNA Insanos" : "Bom Conhecimento Doutrinário"}
          </h3>
          <p className="text-base text-[#C7C5BF] max-w-2xl mx-auto leading-relaxed mb-8">
            {totalCorrect === 3
              ? "Você demonstrou compreensão total dos 4 Pilares (Deus, Família, Trabalho e Motoclube), da vocação social e do regimento de respeito mútuo. Você possui o perfil ideal para iniciar o período de Pré-Postulante (PP)."
              : "Você compreendeu a essência do motoclube. Recomendamos aprofundar na leitura dos 4 Pilares e prosseguir com sua inscrição para conversar com a liderança regional."}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faca-parte"
              className="px-8 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded transition-colors duration-200 hover-lift shadow-xl"
            >
              Preencher Ficha de Ingresso Oficial ↘
            </Link>
            <button
              onClick={handleReset}
              className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-bold uppercase tracking-wider transition-colors duration-150"
            >
              Refazer Simulação ↻
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
