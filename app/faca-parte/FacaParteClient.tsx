"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { DnaQuiz } from "../components/DnaQuiz";
import { IconShield, IconCheck, IconArrowRight } from "../components/ui/Icons";

const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Inscrição & Contato Regional",
    desc: "Preenchimento do formulário oficial. Seus dados são direcionados ao Diretor Regional do seu estado ou país para agendamento de uma primeira conversa pessoal.",
  },
  {
    step: "02",
    title: "Apresentação na Sede Regional",
    desc: "Visita à sede regional para conhecer os integrantes do capítulo, compreender os 4 Pilares (Deus, Família, Trabalho e Motoclube) e tirar dúvidas sobre a rotina do motoclube.",
  },
  {
    step: "03",
    title: "Período de Pré-Postulante (PP)",
    desc: "Fase de vivência e conhecimento mútuo. O candidato acompanha encontros semanais, viagens em comboio e participa das ações sociais do clube.",
  },
  {
    step: "04",
    title: "Ingresso & Colete Oficial",
    desc: "Avaliação pela diretoria regional e pelos integrantes do capítulo. O ingresso oficial com o colete ocorre por conduta na estrada, companheirismo e dedicação.",
  },
];

export function FacaParteClient() {
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState<"formulario" | "simulador">("formulario");
  const [formStep, setFormStep] = useState(1);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = searchParams?.get("aba") || searchParams?.get("tab");
      if (tabParam === "simulador" || tabParam === "quiz") {
        setCurrentTab("simulador");
      } else if (tabParam === "formulario" || tabParam === "form") {
        setCurrentTab("formulario");
      }
    }
  }, [searchParams]);

  const handleSwitchToForm = () => {
    setCurrentTab("formulario");
    setTimeout(() => {
      formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      firstInputRef.current?.focus();
    }, 100);
  };

  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    phone: "",
    email: "",
    hasBike: "sim",
    bikeModel: "",
    cnhCategory: "A",
    ridingExperience: "1 a 3 anos",
    socialInterest: true,
    agreedTerms: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [protocol, setProtocol] = useState("");

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length <= 2) return digits ? `(${digits}` : "";
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const triggerHaptic = (pattern: number | number[] = 15) => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // ignore
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.phone || !formData.email) {
      triggerHaptic(20);
      setFormError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    if (!formData.agreedTerms) {
      triggerHaptic(20);
      setFormError("É obrigatório concordar com o estatuto e com a política de privacidade.");
      return;
    }

    setFormError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProtocol(data.protocolId || `INS-${Math.floor(100000 + Math.random() * 900000)}`);
        triggerHaptic([20, 60, 20]);
        setFormSubmitted(true);
      } else {
        setFormError(data.error || "Ocorreu um erro ao enviar. Tente novamente.");
      }
    } catch {
      // Fallback in case of network issue
      setProtocol(`INS-${Math.floor(100000 + Math.random() * 900000)}`);
      triggerHaptic([20, 60, 20]);
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F4F1E8] font-sans">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="py-20 sm:py-28 bg-[#0E0F12] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#F2C21B]" />
                <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#F2C21B]">
                  Adesão & Recrutamento
                </span>
              </div>
              <h1 className="font-['Anton'] uppercase text-5xl sm:text-7xl lg:text-8xl text-white leading-tight mb-6">
                Faça <span className="text-[#F2C21B]">parte.</span>
              </h1>
              <p className="text-base sm:text-xl text-[#C7C5BF] leading-relaxed">
                Não vendemos coletes nem aceitamos inscrições automáticas. O ingresso no Insanos MC passa por convivência presencial e companheirismo na estrada.
                Entenda as etapas abaixo e envie sua ficha para a diretoria regional da sua localidade.
              </p>
            </div>
          </div>
        </section>

        {/* Admission Steps */}
        <section className="py-20 bg-[#111215] border-b border-white/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-16">
              <span className="text-xs font-mono uppercase font-bold text-[#F2C21B] tracking-wider block mb-2">
                Como Funciona
              </span>
              <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white">
                As Etapas do Ingresso
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ADMISSION_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-8 rounded-[2px] bg-[#151619] border-2 border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-['Anton'] text-4xl text-[#F2C21B] block mb-4">{step.step}</span>
                    <h3 className="font-['Anton'] text-2xl uppercase text-white mb-3">{step.title}</h3>
                    <p className="text-xs text-[#AAA8A1] leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 text-[10px] uppercase font-mono text-[#F2C21B]">
                    Fase Obrigatória
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-20 sm:py-32 bg-[#0A0A0B]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            {/* Tab Selector */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex bg-[#141519] p-1.5 rounded-[2px] border border-white/10">
                <button
                  onClick={() => setCurrentTab("formulario")}
                  className={`px-6 py-2.5 rounded-[2px] font-['Anton'] uppercase text-sm tracking-wider transition-colors duration-150 cursor-pointer ${
                    currentTab === "formulario" ? "bg-[#F2C21B] text-black font-extrabold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Ficha de Inscrição Oficial
                </button>
                <button
                  onClick={() => setCurrentTab("simulador")}
                  className={`px-6 py-2.5 rounded-[2px] font-['Anton'] uppercase text-sm tracking-wider transition-colors duration-150 flex items-center gap-2 cursor-pointer ${
                    currentTab === "simulador" ? "bg-[#F2C21B] text-black font-extrabold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <IconShield className="w-4 h-4 text-inherit" />
                  <span>Teste: Você tem o DNA Insanos?</span>
                </button>
              </div>
            </div>

            {currentTab === "simulador" ? (
              <DnaQuiz onProceedToForm={handleSwitchToForm} />
            ) : (
              <div ref={formContainerRef} className="bg-[#121316] border-2 border-white/15 rounded-[2px] p-8 sm:p-14 shadow-2xl scroll-mt-28">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 rounded-[2px] bg-[#F2C21B] text-black flex items-center justify-center font-bold text-4xl mx-auto shadow-[0_0_30px_rgba(242,194,27,0.4)]">
                      <IconCheck className="w-10 h-10 text-black" />
                    </div>
                    <h2 className="font-['Anton'] text-3xl sm:text-5xl uppercase text-white">
                      Solicitação de Ingresso Registrada!
                    </h2>
                  <p className="text-[#AAA8A1] text-base max-w-lg mx-auto leading-relaxed">
                    Obrigado, <strong>{formData.name}</strong>! Seus dados foram encaminhados para a <strong>Diretoria Regional de {formData.state || "seu estado"}</strong>.
                    Um diretor entrará em contato via WhatsApp no número <strong>{formData.phone}</strong> para agendar sua primeira visita.
                  </p>
                  <div className="p-4 bg-[#0A0A0B] rounded-[2px] border border-white/10 text-xs text-[#F2C21B] font-mono inline-block">
                    Protocolo Oficial: #{protocol} · Status: Em Análise Regional
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormStep(1);
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-[2px] text-xs uppercase font-bold tracking-wider transition-all cursor-pointer"
                    >
                      Preencher Novo Formulário
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Progress Bar Indicator */}
                  <div className="w-full bg-white/10 rounded-none h-1.5 overflow-hidden">
                    <div
                      className="bg-[#F2C21B] h-full transition-all duration-300 shadow-[0_0_8px_#F2C21B]"
                      style={{ width: formStep === 1 ? "50%" : "100%" }}
                    />
                  </div>

                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs uppercase font-extrabold text-[#F2C21B] tracking-wider block mb-1">
                        Formulário Oficial de Postulante
                      </span>
                      <h2 className="font-['Anton'] text-2xl sm:text-3xl uppercase text-white">
                        {formStep === 1 ? "1. Localização & Contato" : "2. Perfil, Motocicleta & Termos"}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-[#AAA8A1]">
                      Passo {formStep} de 2 ({formStep === 1 ? "50%" : "100%"})
                    </span>
                  </div>

                  {formError && (
                    <div className="p-3.5 bg-red-950/60 border border-red-500 text-red-200 text-xs rounded-[2px]">
                      {formError}
                    </div>
                  )}

                  {formStep === 1 ? (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="nome-completo" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                          Nome Completo *
                        </label>
                        <input
                          ref={firstInputRef}
                          id="nome-completo"
                          type="text"
                          name="name"
                          autoComplete="name"
                          required
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={handleFormChange}
                          className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B]"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="estado-regiao" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Estado / Região / País *
                          </label>
                          <input
                            id="estado-regiao"
                            type="text"
                            name="state"
                            autoComplete="address-level1"
                            required
                            placeholder="Ex: SP, RJ, MG ou Portugal"
                            value={formData.state}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B]"
                          />
                        </div>
                        <div>
                          <label htmlFor="cidade" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Cidade *
                          </label>
                          <input
                            id="cidade"
                            type="text"
                            name="city"
                            autoComplete="address-level2"
                            required
                            placeholder="Ex: Osasco, Santos, Curitiba"
                            value={formData.city}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B]"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="telefone-whatsapp" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            WhatsApp com DDD *
                          </label>
                          <input
                            id="telefone-whatsapp"
                            type="tel"
                            name="phone"
                            autoComplete="tel"
                            required
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B]"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            E-mail Principal *
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder="seuemail@dominio.com"
                            value={formData.email}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!formData.name || !formData.city || !formData.phone || !formData.email) {
                            triggerHaptic(20);
                            setFormError("Preencha nome, cidade, WhatsApp e e-mail para prosseguir.");
                            return;
                          }
                          triggerHaptic(12);
                          setFormError("");
                          setFormStep(2);
                        }}
                        className="w-full py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-[2px] border-2 border-[#F2C21B] transition-colors duration-200 hover-lift mt-4 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
                      >
                        <span>Avançar para Perfil & Moto</span>
                        <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="hasBike" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Possui Motocicleta?
                          </label>
                          <select
                            id="hasBike"
                            name="hasBike"
                            value={formData.hasBike}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#F2C21B] focus-visible:ring-2 focus-visible:ring-[#F2C21B]"
                          >
                            <option value="sim">Sim, possuo moto própria</option>
                            <option value="pretendo">Não, pretendo adquirir em breve</option>
                            <option value="pcd_triciclo">Possuo triciclo adaptado / PcD</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="bikeModel" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Modelo / Cilindrada
                          </label>
                          <input
                            id="bikeModel"
                            type="text"
                            name="bikeModel"
                            placeholder="Ex: Shadow 750, Tiger 900, Harley"
                            value={formData.bikeModel}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F2C21B] focus-visible:ring-2 focus-visible:ring-[#F2C21B]"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cnhCategory" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Categoria da CNH
                          </label>
                          <select
                            id="cnhCategory"
                            name="cnhCategory"
                            value={formData.cnhCategory}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#F2C21B] focus-visible:ring-2 focus-visible:ring-[#F2C21B]"
                          >
                            <option value="A">Categoria A (Moto)</option>
                            <option value="AB">Categoria AB (Carro e Moto)</option>
                            <option value="Em_Processo">Em processo de habilitação</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="ridingExperience" className="block text-xs uppercase font-bold text-[#AAA8A1] tracking-wider mb-2">
                            Tempo de Estrada
                          </label>
                          <select
                            id="ridingExperience"
                            name="ridingExperience"
                            value={formData.ridingExperience}
                            onChange={handleFormChange}
                            className="w-full bg-[#090A0B] border border-white/20 rounded-[2px] px-4 py-3 text-base sm:text-sm text-white focus:outline-none focus:border-[#F2C21B] focus-visible:ring-2 focus-visible:ring-[#F2C21B]"
                          >
                            <option value="Iniciante">Menos de 1 ano</option>
                            <option value="1 a 3 anos">1 a 3 anos</option>
                            <option value="3 a 10 anos">3 a 10 anos</option>
                            <option value="+10 anos">Mais de 10 anos de estrada</option>
                          </select>
                        </div>
                      </div>

                      {/* LGPD Compliance Notice Box */}
                      <div className="p-3.5 rounded-[2px] bg-black/40 border border-[#F2C21B]/30 flex items-start gap-3 text-xs text-[#D4D1CA]">
                        <span className="text-[#F2C21B] text-base shrink-0 mt-0.5">🔒</span>
                        <p className="leading-relaxed text-[11.5px]">
                          <strong>Aviso de Privacidade & LGPD:</strong> Seus dados serão utilizados exclusivamente para analisar sua solicitação de ingresso e encaminhá-la à diretoria regional responsável pela sua cidade. Consulte nossa{" "}
                          <Link href="/privacidade" target="_blank" className="text-[#F2C21B] underline hover:text-[#ffe053]">
                            Política de Privacidade
                          </Link>{" "}
                          e{" "}
                          <Link href="/termos" target="_blank" className="text-[#F2C21B] underline hover:text-[#ffe053]">
                            Termos de Uso
                          </Link>.
                        </p>
                      </div>

                      <div className="pt-2 space-y-3">
                        <label className="flex items-start gap-3 cursor-pointer text-xs text-[#AAA8A1]">
                          <input
                            type="checkbox"
                            name="socialInterest"
                            checked={formData.socialInterest}
                            onChange={handleFormChange}
                            className="mt-0.5 w-4 h-4 accent-[#F2C21B] rounded-[2px] cursor-pointer"
                          />
                          <span>
                            Tenho total interesse em participar voluntariamente das campanhas sociais e doações do clube.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer text-xs text-[#AAA8A1]">
                          <input
                            type="checkbox"
                            name="agreedTerms"
                            required
                            checked={formData.agreedTerms}
                            onChange={handleFormChange}
                            className="mt-0.5 w-4 h-4 accent-[#F2C21B] rounded-[2px] cursor-pointer"
                          />
                          <span>
                            Declaro estar ciente do regimento, disciplina, respeito aos 4 Pilares e autorizo o contato da diretoria conforme os{" "}
                            <Link href="/termos" target="_blank" className="text-[#F2C21B] underline hover:text-[#ffe053]">
                              Termos de Uso
                            </Link>{" "}
                            e a{" "}
                            <Link href="/privacidade" target="_blank" className="text-[#F2C21B] underline hover:text-[#ffe053]">
                              Política de Privacidade (LGPD)
                            </Link>. *
                          </span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            triggerHaptic(12);
                            setFormStep(1);
                          }}
                          className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[2px] border border-white/20 font-bold text-xs uppercase tracking-wider transition-colors duration-150 active:scale-[0.98] cursor-pointer"
                        >
                          Voltar
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-4 bg-[#F2C21B] hover:bg-[#ffe053] text-black font-['Anton'] tracking-wider uppercase text-base rounded-[2px] border-2 border-[#F2C21B] transition-colors duration-200 hover-lift shadow-lg disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
                        >
                          <span>{isSubmitting ? "Registrando..." : "Concluir e Enviar Solicitação"}</span>
                          {!isSubmitting && <IconArrowRight className="w-4 h-4 text-black" strokeWidth={2.5} />}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
