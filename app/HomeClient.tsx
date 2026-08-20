"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const IMG = {
  hero: "https://www.insanosmc.com.br/wp-content/uploads/2018/04/parallax-main.jpg",
  impact: "https://www.insanosmc.com.br/wp-content/uploads/2024/12/DSC5934-scaled-e1733772023945-660x330-1.jpg",
  news: "https://www.insanosmc.com.br/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-19-at-11.38.01-1.jpeg",
  logo: "https://www.insanosmc.com.br/wp-content/uploads/2018/04/insanosmc.png",
};

const chapters = [
  ["01", "Deus", "Convicção para seguir"],
  ["02", "Família", "Ninguém fica para trás"],
  ["03", "Trabalho", "Atitude que constrói"],
  ["04", "Motoclube", "Irmandade na estrada"],
];

export function HomeClient() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 70, opacity: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 44, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 84%" } });
      });
      gsap.to(".hero-media", { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.8 } });
      gsap.to(".route-line", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".history", start: "top 70%", end: "bottom 70%", scrub: 0.7 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <a className="skip" href="#conteudo">Ir para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Insanos MC — Início"><img src={IMG.logo} alt="Insanos MC" /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">Menu</button>
        <nav id="main-nav" className={menuOpen ? "nav open" : "nav"} aria-label="Navegação principal">
          <a href="#historia">História</a><a href="#irmandade">Irmandade</a><a href="#impacto">Impacto</a><a href="#agora">18News</a><a className="nav-cta" href="#faca-parte">Faça parte <span>↘</span></a>
        </nav>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-media" style={{ backgroundImage: `linear-gradient(90deg,rgba(4,4,4,.96) 0%,rgba(4,4,4,.42) 58%,rgba(4,4,4,.24)),url(${IMG.hero})` }} />
          <div className="hero-copy shell">
            <p className="eyebrow">Original de OZ <i /> Desde 2015</p>
            <h1>Nosso combustível<br />é a <mark>irmandade.</mark></h1>
            <p className="manifesto-strip">Nosso destino é fazer o bem.</p>
            <div className="hero-actions"><a className="button" href="#faca-parte"><span>↘</span> Faça parte</a><a className="text-link" href="#historia">Conheça nossa história →</a></div>
          </div>
          <div className="scroll-cue">Role para conhecer <span>↓</span></div>
        </section>

        <section className="world section" id="irmandade">
          <div className="shell world-grid">
            <div data-reveal><p className="eyebrow">Uma irmandade em movimento</p><h2>Irmandade que<br /><mark>transforma vidas.</mark></h2><p className="lead">Não somos apenas um motoclube. Somos uma família global unida por valores, propósito e respeito.</p></div>
            <div className="world-visual" data-reveal aria-label="Representação da presença mundial do Insanos MC"><div className="map-word">MUNDO</div><span className="pin p1"/><span className="pin p2"/><span className="pin p3"/><span className="pin p4"/></div>
          </div>
          <div className="stats shell" data-reveal><div><strong>12 mil+</strong><span>integrantes*</span></div><div><strong>65</strong><span>países*</span></div><p>* Dados institucionais a validar antes da publicação.</p><a href="#faca-parte">Encontre o Insanos perto de você →</a></div>
        </section>

        <section className="pillars section">
          <div className="shell"><p className="eyebrow" data-reveal>O que nos move</p><h2 data-reveal>Quatro pilares.<br />Uma só <mark>irmandade.</mark></h2><div className="pillar-grid">{chapters.map(([n,t,d]) => <article key={n} data-reveal><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div><p className="manifesto-strip large" data-reveal>Colete não cria irmão. Atitude cria.</p></div>
        </section>

        <section className="history section" id="historia">
          <div className="shell"><p className="eyebrow" data-reveal>História</p><h2 data-reveal>Rompendo paradigmas<br /><mark>desde 2015.</mark></h2><p className="lead" data-reveal>Coragem para romper. Disciplina para construir.</p><div className="route"><div className="route-line" />{[["1922","18 do Forte","Contexto histórico e símbolo adotado pelo clube."],["2015","Original de OZ","Fundação em Osasco e início de uma nova história."],["Hoje","Irmandade mundial","Uma organização conectada por valores e propósito."]].map(([year,title,text]) => <article key={year} data-reveal><strong>{year}</strong><h3>{title}</h3><p>{text}</p><small>Conteúdo a validar com o acervo oficial</small></article>)}</div></div>
        </section>

        <section className="impact section" id="impacto">
          <div className="impact-image" style={{ backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.97),rgba(0,0,0,.18)),url(${IMG.impact})` }} />
          <div className="shell impact-copy"><p className="eyebrow" data-reveal>Nosso destino é fazer o bem</p><h2 data-reveal><mark>Ninguém</mark><br />fica para trás.</h2><p className="lead" data-reveal>A irmandade se prova na estrada e, principalmente, fora dela.</p><div className="project-links" data-reveal><a href="#">Projeto PcD <span>→</span></a><a href="#">Bonde Pela Vida <span>→</span></a><a href="#">Combate Insano <span>→</span></a></div></div>
        </section>

        <section className="legacy section">
          <div className="shell"><p className="eyebrow" data-reveal>Liderança e legado</p><h2 data-reveal>Quem carrega a<br /><mark>história</mark> adiante.</h2><div className="legacy-grid"><div className="legacy-card" data-reveal><span>Comando mundial</span><h3>Nomes e cargos atuais</h3><p>Área reservada aos dados validados pela direção.</p><a href="#">Conheça o comando →</a></div><div className="legacy-card memorial" data-reveal><span>Fundadores · Legado · In Memoriam</span><h3>Honrar quem abriu a estrada</h3><p>Uma área própria para memória institucional e acervo.</p><a href="#">Fundadores e legado →</a></div></div></div>
        </section>

        <section className="news section" id="agora">
          <div className="shell"><p className="eyebrow" data-reveal>18News</p><h2 data-reveal>A irmandade<br /><mark>em movimento.</mark></h2><div className="news-grid"><article className="featured" data-reveal style={{backgroundImage:`linear-gradient(0deg,rgba(0,0,0,.94),rgba(0,0,0,.05)),url(${IMG.news})`}}><span>Reportagem em destaque</span><h3>Histórias de quem vive a irmandade</h3><a href="#">Todas as notícias →</a></article><article data-reveal><span>Próximos eventos</span><h3>Agenda oficial</h3><p>Encontros e ações entram aqui após validação editorial.</p><a href="#">Ver agenda →</a></article><article data-reveal><span>Expedições</span><h3>Estradas, destinos e propósitos</h3><a href="#">Ver expedições →</a></article><article data-reveal><span>Rádio · Podcast</span><h3>A voz da irmandade</h3><a href="#">Ouvir agora →</a></article></div></div>
        </section>

        <section className="join section" id="faca-parte">
          <div className="shell join-grid"><div data-reveal><p className="eyebrow">A estrada começa aqui</p><h2>Faça <mark>parte.</mark></h2><p className="lead">Diga onde você está. Nós conectamos você ao capítulo mais próximo.</p></div><form data-reveal onSubmit={(e)=>e.preventDefault()}><label>Cidade / Estado<input name="location" autoComplete="address-level2" placeholder="Ex.: Osasco — SP" /></label><label>WhatsApp ou e-mail<input name="contact" autoComplete="email" placeholder="Seu melhor contato" /></label><label className="check"><input type="checkbox" required /> Li e concordo com a Política de Privacidade</label><button className="button" type="submit"><span>↘</span> Faça parte</button><p>Você saberá o próximo passo antes de enviar.</p></form></div>
        </section>
      </main>
      <footer><div className="shell footer-grid"><img src={IMG.logo} alt="Insanos MC"/><p>Original de OZ · Desde 2015<br />#SomosDeVerdade</p><nav aria-label="Rodapé"><a href="#historia">História</a><a href="#irmandade">Irmandade</a><a href="#impacto">Impacto</a><a href="#agora">18News</a></nav></div></footer>
    </div>
  );
}
