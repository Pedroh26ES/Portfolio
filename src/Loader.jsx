import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURAÇÕES HACKER LIGHTNING ---
const DICTIONARY = "0123456789qwertyuiopasdfghjklzxcvbnm".split('');
const LETTER_TOTAL = 406;
const CENTER_WORD = 'hacker lightning';
const CW_START = Math.floor(LETTER_TOTAL / 2 - CENTER_WORD.length / 2);
const CW_END = CW_START + CENTER_WORD.length;
const ROW_LENGTH = 45;

const getBoltStartingPositions = function () {
  const results = [];
  results.push(CW_START);
  results.push(CW_END + 1);
  for (let i = CW_START; i < CW_END + 1; i++) {
    const top = i - ROW_LENGTH;
    const bottom = i + ROW_LENGTH + 1;
    results.push(top, bottom);
  }
  return results;
};

const STARTING_POSITIONS = getBoltStartingPositions();

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genRanChar = () => DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];

function pickRandomProperty(obj) {
  let result;
  let count = 0;
  for (let prop in obj)
    if (Math.random() < 1 / ++count) result = prop;
  return result;
}
// ----------------------------------------

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: Carregando | 1: Katana | 2: Tela Dividindo

  // 1. Efeito de Progresso Numérico
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

  // 2. Efeito Hacker Lightning
  useEffect(() => {
    if (phase !== 0) return; // Roda apenas na fase de carregamento

    const el = document.getElementById('hackerLightning');
    if (!el) return;

    // Gera a string inicial
    let string = ``;
    let wordIndex = 0;
    for (let i = 0; i < LETTER_TOTAL; i++) {
      if (i >= CW_START && i < CW_END) {
        string += `<span class="static">${CENTER_WORD[wordIndex]}</span>`;
        wordIndex++;
      } else {
        string += `<span>${genRanChar()}</span>`;
      }
    }
    el.innerHTML = string;

    const Bolt = function () {
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

        const current = document.querySelector(`#hackerLightning span:nth-child(${this.position})`);
        this.position += move;
        const next = document.querySelector(`#hackerLightning span:nth-child(${this.position})`);

        if (next) {
          if (current) {
            current.style.opacity = 1;
            current.style.color = '#0d0d0d'; // Cor do Fundo
            current.style.textShadow = 'none';
          }
          next.style.opacity = 1;
          next.style.color = '#D4AF37'; // Dourado
          next.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)'; // Brilho neon
        } else {
          if (current) {
            current.style.opacity = 1;
            current.style.color = '#0d0d0d';
            current.style.textShadow = 'none';
          }
          return false;
        }
      };

      this.strike = function () {
        const self = this;
        const animate = setInterval(function () {
          const move = self.move();
          if (move === false) {
            clearInterval(animate);
          }
        }, 16);
      };
    };

    const animateBolts = function () {
      const bolts = [];
      for (let i = 0; i < 15; i++) bolts.push(new Bolt());
      for (let i = 0; i < bolts.length; i++) bolts[i].strike();
    };

    // Inicia os raios e cria um ciclo automático
    animateBolts();
    const interval = setInterval(animateBolts, 1200);

    // Permite disparar no clique da tela
    el.onclick = animateBolts;

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      
      {/* Background Lightning div */}
      {phase === 0 && <div id="hackerLightning" />}

      {/* Fundo Metade Cima */}
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />
      
      {/* Fundo Metade Baixo */}
      <motion.div
        initial={{ y: 0 }}
        animate={phase === 2 ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (phase === 2) onComplete();
        }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0d0d0d] z-10"
      />

      {/* O Texto do Loader */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="z-20 text-center w-[200px] relative font-sans"
          >
            <p className="text-samurai-gold text-[40px] font-thin tracking-widest uppercase mb-[-10px] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
              Loading
            </p>
            <h1 className="text-white text-[60px] font-bold m-0 leading-tight">
              {progress}%
            </h1>
            <div
              className="h-[2px] bg-samurai-gold border-none mt-1 transition-all duration-75 mx-auto shadow-[0_0_10px_#D4AF37]"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animação da Katana */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -200, y: 200, rotate: -45, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-200, 0, 0, 0],
              y: [200, 0, 0, 0],
              rotate: [-45, -45, 0, 0],
              scale: [0.5, 1, 1.5, 40],
            }}
            transition={{
              duration: 1.5,
              times: [0, 0.2, 0.5, 1],
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setPhase(2)}
            className="absolute z-30 flex items-center justify-center w-[600px] h-[100px] pointer-events-none"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[2px] bg-white shadow-[0_0_30px_5px_#D4AF37]"
            />

            <svg viewBox="0 0 500 50" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
              <path d="M100,25 C200,20 400,10 490,20 C495,20.5 500,22 495,25 C400,28 200,30 100,25 Z" fill="#e5e5e5" />
              <path d="M100,25 C200,23 400,15 490,20 C400,26 200,28 100,25 Z" fill="#ffffff" filter="drop-shadow(0px 0px 4px #D4AF37)" />
              <rect x="95" y="10" width="8" height="30" fill="#D4AF37" rx="2" />
              <path d="M20,20 L95,20 L95,30 L20,30 Z" fill="#111" stroke="#D4AF37" strokeWidth="2" />
              <path d="M10,18 L20,18 L20,32 L10,32 Z" fill="#D4AF37" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Loader;