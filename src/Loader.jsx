import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Carregando | 1: Katana | 2: Tela Dividindo

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Quando chega a 100%, espera meio segundo e chama a Katana (Fase 1)
          setTimeout(() => setPhase(1), 500); 
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1; // Contador rápido
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      
      {/* Fundo Metade Cima (Que vai subir) */}
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />
      
      {/* Fundo Metade Baixo (Que vai descer) */}
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          // Quando a tela terminar de abrir, removemos o Loader do HTML
          if (phase === 2) onComplete();
        }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />

      {/* O Texto do Loader (Baseado no seu CodePen com a cor Dourada) */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="z-20 text-center w-[200px] relative font-sans"
          >
            <p className="text-samurai-gold text-[40px] font-thin tracking-widest uppercase mb-[-10px]">
              Loading
            </p>
            <h1 className="text-white text-[60px] font-bold m-0 leading-tight">
              {progress}%
            </h1>
            <div
              className="h-[2px] bg-samurai-gold border-none mt-1 transition-all duration-75 mx-auto"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animação da Katana (Espada) */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -200, y: 200, rotate: -45, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-200, 0, 0, 0],          // Entra na tela
              y: [200, 0, 0, 0],           // Sobe pro centro
              rotate: [-45, -45, 0, 0],    // Gira num corte horizontal
              scale: [0.5, 1, 1.5, 40],    // Aumenta absurdamente engolindo a câmera
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.2, 0.5, 1], // Sincroniza as etapas da animação
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setPhase(2)} // Começa a dividir a tela preta
            className="absolute z-30 flex items-center justify-center w-[600px] h-[100px] pointer-events-none"
          >
            {/* Linha de luz branca horizontal (O Rastro do Corte) */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-white shadow-[0_0_30px_5px_#D4AF37]"
            />

            {/* O SVG desenhado da Katana Samurai */}
            <svg
              viewBox="0 0 500 50"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
            >
              {/* Lâmina */}
              <path d="M100,25 C200,20 400,10 490,20 C495,20.5 500,22 495,25 C400,28 200,30 100,25 Z" fill="#e5e5e5" />
              {/* Brilho do fio (Hamon) */}
              <path d="M100,25 C200,23 400,15 490,20 C400,26 200,28 100,25 Z" fill="#ffffff" filter="drop-shadow(0px 0px 4px #D4AF37)" />
              {/* Guarda (Tsuba) */}
              <rect x="95" y="10" width="8" height="30" fill="#D4AF37" rx="2" />
              {/* Cabo (Tsuka) */}
              <path d="M20,20 L95,20 L95,30 L20,30 Z" fill="#111" stroke="#D4AF37" strokeWidth="2" />
              {/* Pomo */}
              <path d="M10,18 L20,18 L20,32 L10,32 Z" fill="#D4AF37" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Loader;