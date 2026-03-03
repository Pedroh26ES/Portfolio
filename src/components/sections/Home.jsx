import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ChevronRight, Code2 } from "lucide-react";

const Home = ({ isLightMode, t, fadeUp }) => (
  <section
    id="home"
    className="min-h-[90vh] flex items-center relative overflow-hidden pt-20"
  >
    {/* Glow de fundo */}
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none ${
        isLightMode ? "bg-samurai-gold/10" : "bg-samurai-gold/5"
      }`}
    />

    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
      {/* Texto */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <div className="font-mono text-samurai-gold mb-4 flex items-center gap-2 text-sm">
          <span className="w-8 h-[1px] bg-samurai-gold" />
          {t.greeting}
        </div>
        <h1 className="text-5xl md:text-7xl font-sans font-bold leading-tight mb-6">
          {t.headline1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-samurai-gold to-yellow-500">
            {t.headline2}
          </span>
        </h1>
        <p
          className={`text-lg mb-8 max-w-lg font-light leading-relaxed ${
            isLightMode ? "text-neutral-600" : "text-neutral-400"
          }`}
        >
          {t.heroBio}
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="#contato"
            className="bg-samurai-gold text-black px-8 py-4 font-bold uppercase tracking-wider text-sm hover:bg-yellow-500 transition-colors flex items-center gap-2 shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
          >
            {t.heroCta} <ChevronRight size={16} />
          </a>
          <div className="flex gap-4 items-center px-2">
            <a
              href="#"
              className={`transition-colors ${
                isLightMode
                  ? "text-neutral-500 hover:text-samurai-gold"
                  : "text-neutral-400 hover:text-samurai-gold"
              }`}
            >
              <Github size={22} />
            </a>
            <a
              href="#"
              className={`transition-colors ${
                isLightMode
                  ? "text-neutral-500 hover:text-samurai-gold"
                  : "text-neutral-400 hover:text-samurai-gold"
              }`}
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Orbe animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:flex justify-center relative"
      >
        <div
          className={`w-80 h-80 rounded-full border-2 border-samurai-gold/30 relative flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] ${
            isLightMode ? "bg-white/40" : "bg-neutral-900/50"
          }`}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Code2 size={70} className="text-samurai-gold" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-10 -right-4 border px-4 py-2 text-xs font-mono font-bold text-samurai-gold shadow-lg ${
              isLightMode
                ? "bg-[#fcfcfc] border-[#d4d4d4]"
                : "bg-black border-neutral-800"
            }`}
          >
            Java
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className={`absolute bottom-20 -left-8 border px-4 py-2 text-xs font-mono font-bold text-samurai-gold shadow-lg ${
              isLightMode
                ? "bg-[#fcfcfc] border-[#d4d4d4]"
                : "bg-black border-neutral-800"
            }`}
          >
            Spring Boot
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Home;
