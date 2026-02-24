import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react'; 

gsap.registerPlugin(ScrollTrigger);

const ParallaxBackground = ({ isLightMode }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const parallaxElements = [
        { id: "#sun-moon", y: 250 },
        { id: "#mountain-back", y: 150 },
        { id: "#mountain-middle", y: 80 },
        { id: "#mountain-front", y: 20 },
      ];

      parallaxElements.forEach((el) => {
        gsap.to(el.id, {
          y: el.y,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });
      });

      let tl1 = gsap.timeline({
        scrollTrigger: { trigger: "#scene-1", start: "top top", end: "bottom top", scrub: 1 }
      });
      tl1.to("#scroll-indicator", { opacity: 0, y: -30, duration: 0.2 }, 0);
      tl1.fromTo("#text-1", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 }, 0.1)
         .to("#text-1", { opacity: 0, y: -50, duration: 0.3 }, 0.7);

      let tl2 = gsap.timeline({
        scrollTrigger: { trigger: "#scene-2", start: "top top", end: "bottom top", scrub: 1 }
      });
      tl2.fromTo("#text-java", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 }, 0.2)
         .to("#text-java", { opacity: 0, y: -50, duration: 0.3 }, 0.7);

      let tl3 = gsap.timeline({
        scrollTrigger: { trigger: "#scene-3", start: "top top", end: "bottom top", scrub: 1 }
      });
      tl3.fromTo("#text-2", { opacity: 0, scale: 0.8, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 0.3 }, 0.2)
         .to("#text-2", { opacity: 0, y: -80, duration: 0.3 }, 0.7);

      let tlFinal = gsap.timeline({
        scrollTrigger: {
          trigger: "#scene-final",
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onEnter: () => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
              homeSection.scrollIntoView({ behavior: 'smooth' });
              window.history.replaceState(null, null, '#home');
            } else {
              window.location.hash = '#home';
            }
          }
        }
      });
      
      tlFinal.to("#gold-flash", { opacity: 0.4, duration: 0.3 }, 0.1)
             .to(".parallax-content", { opacity: 0, duration: 0.4 }, 0.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const gradBack = isLightMode ? ['#d4d4d4', '#a3a3a3'] : ['#1a1a1a', '#050505'];
  const gradMid = isLightMode ? ['#a3a3a3', '#737373'] : ['#111111', '#000000'];
  const gradFront = isLightMode ? ['#737373', '#404040'] : ['#050505', '#000000'];
  const skyClass = isLightMode ? 'bg-[#f0f0f0]' : 'bg-samurai-dark';
  const textClass = isLightMode ? 'text-neutral-900' : 'text-white';
  const sunGlowEnd = isLightMode ? '#f0f0f0' : '#0a0a0a';

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-transparent z-0">
      
      <div className={`sticky top-0 w-full h-screen overflow-hidden ${skyClass} parallax-content transition-colors duration-500`}>
        
        <div id="gold-flash" className="absolute inset-0 bg-samurai-gold opacity-0 mix-blend-overlay z-40 pointer-events-none" />

        <svg viewBox="0 0 1440 800" className="absolute top-0 left-0 w-full h-full object-cover z-0" preserveAspectRatio="xMidYMax slice">
          <defs>
            <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
              <stop offset="40%" stopColor="#D4AF37" stopOpacity={isLightMode ? "0.3" : "0.6"} />
              <stop offset="100%" stopColor={sunGlowEnd} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="grad-back" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradBack[0]} />
              <stop offset="100%" stopColor={gradBack[1]} />
            </linearGradient>
            <linearGradient id="grad-mid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradMid[0]} />
              <stop offset="100%" stopColor={gradMid[1]} />
            </linearGradient>
            <linearGradient id="grad-front" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradFront[0]} />
              <stop offset="100%" stopColor={gradFront[1]} />
            </linearGradient>
          </defs>

          <g id="stars" fill="#D4AF37" opacity={isLightMode ? "0" : "0.6"} className="transition-opacity duration-500">
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

          <circle id="sun-moon" cx="720" cy="450" r="200" fill="url(#gold-glow)" />
          <path id="mountain-back" d="M0,550 L150,380 L350,480 L600,320 L900,500 L1150,380 L1440,550 L1440,800 L0,800 Z" fill="url(#grad-back)" stroke="#D4AF37" strokeWidth="1" strokeOpacity={isLightMode ? "0.4" : "0.2"}/>
          <path id="mountain-middle" d="M0,650 L250,480 L500,600 L800,450 L1100,620 L1440,580 L1440,800 L0,800 Z" fill="url(#grad-mid)" stroke="#D4AF37" strokeWidth="1.5" strokeOpacity={isLightMode ? "0.6" : "0.4"}/>
          <path id="mountain-front" d="M-50,800 L300,550 L650,720 L1050,520 L1490,750 L1490,850 L-50,850 Z" fill="url(#grad-front)" stroke="#D4AF37" strokeWidth="2" strokeOpacity={isLightMode ? "0.8" : "0.7"}/>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-6 pointer-events-none z-10">
          
          <div id="text-1" className="absolute opacity-0">
            <h1 className={`text-5xl md:text-8xl font-serif font-bold ${textClass} tracking-[0.2em] uppercase`}>
              WELCOME
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif text-samurai-gold tracking-wider mt-4 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]">
              to my portfolio
            </h2>
          </div>

          <div id="text-java" className="absolute opacity-0 w-full flex flex-col items-center">
            <h1 className={`text-4xl md:text-7xl font-sans font-bold ${textClass} tracking-[0.1em] uppercase`}>
              Desenvolvedor <span className="text-samurai-gold">Java</span>
            </h1>
            <div className="h-[2px] w-32 md:w-64 bg-samurai-gold mt-6 shadow-[0_0_15px_#D4AF37]"></div>
          </div>

          <div id="text-2" className="absolute opacity-0 w-full flex flex-col items-center">
            <h2 className={`text-4xl md:text-6xl font-serif ${textClass} tracking-wider`}>
              <span className="text-samurai-gold font-bold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]">+4</span> Anos de Experiência
            </h2>
            <div className="h-[2px] w-40 md:w-72 bg-samurai-gold mt-6 shadow-[0_0_15px_#D4AF37]"></div>
          </div>

        </div>

        <div className="absolute bottom-10 w-full flex justify-center pointer-events-none z-20">
          <div id="scroll-indicator">
            <div className="flex flex-col items-center text-samurai-gold animate-bounce">
              <span className="font-mono text-xs tracking-widest uppercase font-bold mb-2 ml-[0.1em]">
                Scroll Down
              </span>
              <ChevronDown size={32} />
            </div>
          </div>
        </div>

      </div>

      <div id="scene-1" className="absolute top-0 w-full h-screen pointer-events-none" />
      <div id="scene-2" className="absolute top-[100vh] w-full h-screen pointer-events-none" />
      <div id="scene-3" className="absolute top-[200vh] w-full h-screen pointer-events-none" />
      <div id="scene-final" className="absolute top-[300vh] w-full h-screen pointer-events-none" />

    </div>
  );
};

export default ParallaxBackground;