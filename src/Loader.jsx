import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DICTIONARY = "0123456789qwertyuiopasdfghjklzxcvbnm".split('');
const LETTER_TOTAL = 406;
const CENTER_WORD = 'sistema dourado';
const CW_START = Math.floor(LETTER_TOTAL / 2 - CENTER_WORD.length / 2);
const CW_END = CW_START + CENTER_WORD.length;
const ROW_LENGTH = 45;

const getTrailStartingPositions = () => {
  const results = [CW_START, CW_END + 1];
  for (let i = CW_START; i < CW_END + 1; i++) {
    results.push(i - ROW_LENGTH, i + ROW_LENGTH + 1);
  }
  return results;
};

const STARTING_POSITIONS = getTrailStartingPositions();

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
const genRanChar = () => DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];

function pickRandomProperty(obj) {
  let result;
  let count = 0;
  for (let prop in obj) {
    if (Math.random() < 1 / ++count) result = prop;
  }
  return result;
}

// ----------------------------------------

const DouradoWebLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  
  const gridRef = useRef(null);
  
  // Separando intervalos e frames de animação para limpeza correta
  const activeIntervals = useRef(new Set());
  const activeFrames = useRef(new Set());

  // Progresso de 0 a 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase(1), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Efeito Matrix/Grid (Otimizado)
  useEffect(() => {
    if (phase !== 0 || !gridRef.current) return;

    const el = gridRef.current;
    let string = ``;
    let wordIndex = 0;

    for (let i = 0; i < LETTER_TOTAL; i++) {
      if (i >= CW_START && i < CW_END) {
        string += `<span class="static" style="opacity:1; color:#0d0d0d;">${CENTER_WORD[wordIndex]}</span>`;
        wordIndex++;
      } else {
        string += `<span style="opacity:1; color:#0d0d0d;">${genRanChar()}</span>`;
      }
    }
    el.innerHTML = string;
    const spans = el.children;

    function Trail() {
      this.position = STARTING_POSITIONS[getRandomIntInclusive(0, STARTING_POSITIONS.length - 1)];
      this.lastDirection = '';
      this.moves = { left: -1, right: 1, up: -ROW_LENGTH, down: ROW_LENGTH };

      this.move = function () {
        let direction = pickRandomProperty(this.moves);
        while (direction === this.lastDirection) {
          direction = pickRandomProperty(this.moves);
        }
        this.lastDirection = direction;
        const move = this.moves[direction];

        const current = spans[this.position - 1]; 
        this.position += move;
        const next = spans[this.position - 1];

        if (next) {
          if (current) {
            current.style.color = '#0d0d0d'; 
            current.style.textShadow = 'none';
          }
          next.style.color = '#D4AF37'; 
          next.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)'; 
          return true;
        } else {
          if (current) {
            current.style.color = '#0d0d0d';
            current.style.textShadow = 'none';
          }
          return false;
        }
      };

      this.flow = function () {
        const self = this;
        let frameId;
        
        // Uso de requestAnimationFrame para 60fps cravados na GPU
        const step = () => {
          const moved = self.move();
          if (moved) {
            frameId = requestAnimationFrame(step);
            activeFrames.current.add(frameId);
          } else {
            activeFrames.current.delete(frameId);
          }
        };
        
        frameId = requestAnimationFrame(step);
        activeFrames.current.add(frameId);
      };
    }

    const animateTrails = () => {
      // Limita o número de animações simultâneas para não estourar a memória/FPS
      if (activeFrames.current.size < 120) {
        for (let i = 0; i < 15; i++) {
          new Trail().flow();
        }
      }
    };

    animateTrails();
    const trailInterval = setInterval(animateTrails, 1200);
    activeIntervals.current.add(trailInterval);

    el.onclick = animateTrails;

    return () => {
      activeIntervals.current.forEach(clearInterval);
      activeIntervals.current.clear();
      
      activeFrames.current.forEach(cancelAnimationFrame);
      activeFrames.current.clear();
    };
  }, [phase]);

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden">
      
      {phase === 0 && (
        <div 
          ref={gridRef} 
          id="goldenGrid" 
          className="absolute inset-0 flex flex-wrap content-center justify-center w-full h-full cursor-pointer select-none"
        />
      )}

      {/* Cortinas de Fundo */}
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: "transform" }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />
      
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{ willChange: "transform" }}
        onAnimationComplete={() => {
          if (phase === 2 && onComplete) onComplete();
        }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />

      {/* Porcentagem */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            style={{ willChange: "transform, opacity, filter" }}
            className="z-20 text-center w-[200px] relative font-sans"
          >
            <p className="text-[#D4AF37] text-[40px] font-thin tracking-widest uppercase mb-[-10px] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
              Loading
            </p>
            <h1 className="text-white text-[60px] font-bold m-0 leading-tight">
              {progress}%
            </h1>
            <div
              className="h-[2px] bg-[#D4AF37] border-none mt-1 transition-all duration-75 mx-auto shadow-[0_0_10px_#D4AF37]"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animação da Katana e Rastro */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 60],
              rotate: [0, 1080, 1080, 1080],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.5, 0.75, 1], 
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setPhase(2)}
            style={{ willChange: "transform, opacity" }} // Essencial para evitar lag no zoom massivo
            className="absolute z-30 flex items-center justify-center w-[600px] h-[100px] pointer-events-none"
          >
            {/* Rastro por onde passou */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1, rotate: 0 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.2, 1.5],
                  rotate: [0, 720, 1080],
                }}
                transition={{
                  duration: 1.2, 
                  delay: i * 0.1, 
                  ease: "easeOut",
                  repeat: 0
                }}
                style={{ willChange: "transform, opacity" }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 500 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <path d="M105,26 Q250,21 475,21 L485,24 Q250,27 105,27 Z" fill="none" stroke="url(#trailGradient)" strokeWidth="2" opacity="0.6"/>
                </svg>
              </motion.div>
            ))}

            {/* SVG da Katana Principal */}
            <svg viewBox="0 0 500 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9F295" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8A6B1C" />
                </linearGradient>
                <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
                  <stop offset="50%" stopColor="rgba(212, 175, 55, 0.8)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                </linearGradient>
              </defs>
              
              <path d="M105,26 Q250,16 485,18 Q495,19 498,22 Q480,27 250,28 Q105,28 105,26 Z" fill="#e5e5e5" />
              <path d="M105,26 Q250,21 475,21 L485,24 Q250,27 105,27 Z" fill="#ffffff" filter="drop-shadow(0px 0px 4px #D4AF37)" />
              <rect x="98" y="23" width="7" height="6" fill="url(#goldGradient)" rx="1" />
              <ellipse cx="96" cy="26" rx="3" ry="12" fill="#111" stroke="url(#goldGradient)" strokeWidth="1.5" />
              <path d="M20,23 L93,23 L93,29 L20,29 Z" fill="#111" />
              <path d="M25,23 L32,29 M35,23 L42,29 M45,23 L52,29 M55,23 L62,29 M65,23 L72,29 M75,23 L82,29 M85,23 L92,29" stroke="url(#goldGradient)" strokeWidth="1.5" opacity="0.9" />
              <path d="M14,22 L20,23 L20,29 L14,30 C11,30 9,28 9,26 C9,24 11,22 14,22 Z" fill="url(#goldGradient)" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default DouradoWebLoader;