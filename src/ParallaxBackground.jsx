import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Criação da Timeline conectada ao Scroll
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".parallax-container",
          start: "top top",
          end: "100% bottom", // A animação dura toda a altura do container (300vh)
          scrub: 1, // Suaviza a animação para acompanhar o scroll
        }
      });

      // 1. Animação das Montanhas e do Sol/Lua (Efeito Parallax)
      // Elementos do fundo movem-se mais que os da frente
      tl.to("#sun-moon", { y: 250 }, 0);
      tl.to("#mountain-back", { y: 150 }, 0);
      tl.to("#mountain-middle", { y: 80 }, 0);
      tl.to("#mountain-front", { y: 20 }, 0);

      // 2. Animação dos Textos (Surgem e Desaparecem em sequência)
      
      // Texto 1: Desenvolvedor Java
      tl.fromTo("#text-1", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.1 }, 0.05);
      tl.to("#text-1", { opacity: 0, y: -50, duration: 0.1 }, 0.2);

      // Texto 2: Experiência
      tl.fromTo("#text-2", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.1 }, 0.25);
      tl.to("#text-2", { opacity: 0, y: -50, duration: 0.1 }, 0.4);

      // Texto 3: Tecnologias
      tl.fromTo("#text-3", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.1 }, 0.45);
      tl.to("#text-3", { opacity: 0, y: -50, duration: 0.1 }, 0.6);

      // Texto 4: Fechamento
      tl.fromTo("#text-4", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.1 }, 0.65);
      // Mantém o texto 4 na tela no final da animação
      tl.to("#text-4", { opacity: 1, y: -20, duration: 0.1 }, 0.8);

    }, containerRef);

    return () => ctx.revert(); // Limpeza do GSAP ao desmontar
  }, []);

  return (
    // O container principal tem 300vh para permitir um longo tempo de scroll
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#0a0a0a] parallax-container z-0">
      
      {/* Container "Sticky" mantém a cena fixa na tela enquanto você rola os 300vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">
        
        {/* SVG Background (Paisagem Samurai Preto/Dourado) */}
        <svg viewBox="0 0 1440 800" className="absolute top-0 left-0 w-full h-full object-cover" preserveAspectRatio="xMidYMax slice">
          <defs>
            {/* Brilho Dourado do Sol/Lua */}
            <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
              <stop offset="40%" stopColor="#D4AF37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </radialGradient>
            
            {/* Degradês Escuros para as Montanhas */}
            <linearGradient id="grad-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#050505" />
            </linearGradient>
            <linearGradient id="grad-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
            <linearGradient id="grad-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#050505" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>

          {/* Estrelas (Pontos dourados) */}
          <g id="stars" fill="#D4AF37" opacity="0.6">
            <circle cx="200" cy="150" r="1.5" />
            <circle cx="450" cy="80" r="2.5" />
            <circle cx="800" cy="250" r="1.5" />
            <circle cx="1100" cy="120" r="2" />
            <circle cx="1350" cy="300" r="1" />
            <circle cx="650" cy="200" r="2" />
            <circle cx="950" cy="90" r="1.5" />
            <circle cx="150" cy="350" r="2.5" />
            <circle cx="1250" cy="180" r="1.5" />
          </g>

          {/* Sol / Lua Samurai */}
          <circle id="sun-moon" cx="720" cy="450" r="200" fill="url(#gold-glow)" />

          {/* Montanhas Traseiras */}
          <path id="mountain-back" d="M0,550 L150,380 L350,480 L600,320 L900,500 L1150,380 L1440,550 L1440,800 L0,800 Z" fill="url(#grad-back)" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.2"/>
          
          {/* Montanhas do Meio */}
          <path id="mountain-middle" d="M0,650 L250,480 L500,600 L800,450 L1100,620 L1440,580 L1440,800 L0,800 Z" fill="url(#grad-mid)" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity="0.4"/>
          
          {/* Montanhas da Frente */}
          <path id="mountain-front" d="M-50,800 L300,550 L650,720 L1050,520 L1490,750 L1490,850 L-50,850 Z" fill="url(#grad-front)" stroke="#D4AF37" strokeWidth="2" strokeOpacity="0.7"/>
        </svg>

        {/* Camada de Textos (HTML puro sobre o SVG animado pelo GSAP) */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-6 pointer-events-none">
          
          {/* CENA 1 */}
          <div id="text-1" className="absolute opacity-0">
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
              Desenvolvedor Java
            </h1>
            <div className="h-[2px] w-1/3 bg-samurai-gold mx-auto mt-6 shadow-[0_0_15px_#D4AF37]"></div>
          </div>

          {/* CENA 2 */}
          <div id="text-2" className="absolute opacity-0">
            <h2 className="text-3xl md:text-5xl font-serif text-samurai-gold tracking-wider drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              +4 Anos de Experiência
            </h2>
            <p className="text-neutral-400 mt-6 text-lg md:text-xl font-mono uppercase tracking-widest">
              Forjando soluções robustas e seguras.
            </p>
          </div>

          {/* CENA 3 */}
          <div id="text-3" className="absolute opacity-0">
            <h2 className="text-3xl md:text-6xl font-serif text-white tracking-wider">
              Spring Boot <span className="text-samurai-gold">&</span> Microserviços
            </h2>
            <p className="text-samurai-gold mt-6 text-lg md:text-xl font-mono uppercase tracking-widest">
              Arquiteturas escaláveis de alta performance.
            </p>
          </div>

          {/* CENA 4 */}
          <div id="text-4" className="absolute opacity-0">
            <h2 className="text-4xl md:text-7xl font-serif text-samurai-gold tracking-widest uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] mb-2">
              Código Limpo.
            </h2>
            <h2 className="text-4xl md:text-7xl font-serif text-white tracking-widest uppercase">
              Precisão Extrema.
            </h2>
          </div>

        </div>
        
      </div>
    </div>
  );
};

export default ParallaxBackground;