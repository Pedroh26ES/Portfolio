import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ChevronRight, 
  Terminal, ExternalLink, Code2, MapPin, Phone, Briefcase
} from 'lucide-react';

// Importando o novo background animado
import ParallaxBackground from './ParallaxBackground';

const Portfolio = () => {
  // Estado para controlar qual seção está ativa na navegação
  const [activeSection, setActiveSection] = useState('home');

  // Animação padrão de surgimento para as seções quando rolar a página
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    // 'scroll-smooth' garante que os links da navbar deslizem suavemente
    <div className="min-h-screen bg-samurai-dark text-white font-sans selection:bg-samurai-gold selection:text-black scroll-smooth">
      
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="fixed top-0 w-full z-50 bg-samurai-dark/90 backdrop-blur-md border-b border-neutral-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div className="font-mono text-xl font-bold flex items-center gap-1">
            <span className="text-neutral-500">&lt;</span>
            <span className="text-samurai-gold">Ronin</span>
            <span className="text-neutral-500">/&gt;</span>
          </div>

          {/* Menu de Navegação Desktop */}
          <nav className="hidden md:flex gap-8">
            {['home', 'sobre', 'experiencia', 'projetos', 'contato'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                onClick={() => setActiveSection(item)}
                className={`text-sm uppercase tracking-[0.15em] transition-colors relative py-2 ${
                  activeSection === item ? 'text-samurai-gold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item}
                {activeSection === item && (
                  <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-samurai-gold" />
                )}
              </a>
            ))}
          </nav>

          {/* Botão Tema/Menu Mobile (Simplificado para o MVP) */}
          <button className="md:hidden text-samurai-gold">
            <Terminal size={24} />
          </button>
        </div>
      </header>

      {/* ================= INTRODUÇÃO ANIMADA ================= */}
      {/* O componente Parallax assume o controle do scroll inicial */}
      <ParallaxBackground />

      {/* ================= CONTEÚDO PRINCIPAL ================= */}
      <main className="relative z-10 bg-samurai-dark">

        {/* --- SEÇÃO: HERO (HOME) --- */}
        <section id="home" className="min-h-[90vh] flex items-center relative overflow-hidden pt-20">
          {/* Brilho de Fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-samurai-gold/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="font-mono text-samurai-gold mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-samurai-gold"></span>
                Despertando o código
              </div>
              <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-white">
                Desenvolvedor <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-samurai-gold to-yellow-200">
                  Full Stack.
                </span>
              </h1>
              <p className="text-neutral-400 text-lg mb-8 max-w-lg font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <div className="flex gap-4">
                <a href="#contato" className="bg-samurai-gold text-black px-8 py-4 font-semibold uppercase tracking-wider text-sm hover:bg-yellow-500 transition-colors flex items-center gap-2">
                  Contato <ChevronRight size={16} />
                </a>
                <div className="flex gap-4 items-center px-4">
                  <a href="#" className="text-neutral-400 hover:text-samurai-gold transition-colors"><Github size={22} /></a>
                  <a href="#" className="text-neutral-400 hover:text-samurai-gold transition-colors"><Linkedin size={22} /></a>
                </div>
              </div>
            </motion.div>

            {/* Imagem/Avatar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1 }}
              className="hidden md:flex justify-center"
            >
              <div className="w-80 h-80 rounded-full border-2 border-samurai-gold/30 relative flex items-center justify-center bg-neutral-900/50 backdrop-blur-sm shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <Code2 size={64} className="text-samurai-gold/50" />
                {/* Badges Flutuantes */}
                <div className="absolute top-10 -right-4 bg-black border border-neutral-800 px-4 py-2 text-xs font-mono text-samurai-gold">React.js</div>
                <div className="absolute bottom-20 -left-8 bg-black border border-neutral-800 px-4 py-2 text-xs font-mono text-samurai-gold">Node.js</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SEÇÃO: SOBRE & SKILLS --- */}
        <section id="sobre" className="py-24 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">01.</span> Minha trajetória
              </h2>

              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <p className="text-neutral-400 leading-relaxed mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                  </p>
                  
                  {/* Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-neutral-800 p-6 bg-black text-center hover:border-samurai-gold/50 transition-colors">
                      <div className="text-3xl font-serif text-samurai-gold mb-2">15+</div>
                      <div className="text-xs font-mono text-neutral-500 uppercase">Projetos</div>
                    </div>
                    <div className="border border-neutral-800 p-6 bg-black text-center hover:border-samurai-gold/50 transition-colors">
                      <div className="text-3xl font-serif text-samurai-gold mb-2">3</div>
                      <div className="text-xs font-mono text-neutral-500 uppercase">Anos de Foco</div>
                    </div>
                  </div>
                </div>

                {/* Skills com Barras de Progresso */}
                <div className="space-y-6">
                  <h3 className="font-mono text-samurai-gold mb-6 uppercase tracking-widest text-sm">Arsenal Principal</h3>
                  {[
                    { name: 'JavaScript / TypeScript', percent: '90%' },
                    { name: 'React / Next.js', percent: '85%' },
                    { name: 'Node.js / Express', percent: '80%' },
                    { name: 'Tailwind CSS', percent: '95%' }
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-mono text-neutral-300">{skill.name}</span>
                        <span className="font-mono text-samurai-gold">{skill.percent}</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-samurai-gold" 
                          initial={{ width: 0 }}
                          whileInView={{ width: skill.percent }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SEÇÃO: EXPERIÊNCIA (TIMELINE) --- */}
        <section id="experiencia" className="py-24">
          <div className="max-w-3xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">02.</span> Histórico da minha Experiência
              </h2>

              <div className="border-l border-neutral-800 ml-3 space-y-12 pb-8">
                {/* Item da Timeline 1 */}
                <div className="relative pl-10">
                  <div className="absolute w-4 h-4 bg-samurai-gold rounded-full -left-[8.5px] top-1 shadow-[0_0_10px_#D4AF37]" />
                  <span className="font-mono text-xs text-samurai-gold border border-samurai-gold/30 px-2 py-1 rounded-full bg-samurai-gold/10">2022 - Presente</span>
                  <h3 className="font-serif text-xl mt-4 text-white">Full Stack Developer</h3>
                  <div className="text-neutral-500 font-mono text-sm mb-4 flex items-center gap-2 mt-1">
                    <Briefcase size={14} /> Empresa Tech S.A.
                  </div>
                  <p className="text-neutral-400 font-light text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                {/* Item da Timeline 2 */}
                <div className="relative pl-10">
                  <div className="absolute w-4 h-4 bg-neutral-800 rounded-full -left-[8.5px] top-1" />
                  <span className="font-mono text-xs text-neutral-500 border border-neutral-800 px-2 py-1 rounded-full">2020 - 2022</span>
                  <h3 className="font-serif text-xl mt-4 text-white">Junior Developer</h3>
                  <div className="text-neutral-500 font-mono text-sm mb-4 flex items-center gap-2 mt-1">
                    <Briefcase size={14} /> Agência Criativa
                  </div>
                  <p className="text-neutral-400 font-light text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SEÇÃO: PROJETOS --- */}
        <section id="projetos" className="py-24 bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 flex items-center gap-4">
                <span className="text-samurai-gold font-mono text-lg">03.</span> Projetos
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Projeto Card */}
                {[1, 2, 3].map((item) => (
                  <div key={item} className="group bg-black border border-neutral-800 hover:border-samurai-gold/50 transition-all duration-300 overflow-hidden">
                    {/* Imagem Placeholder */}
                    <div className="h-48 bg-neutral-900 relative overflow-hidden flex items-center justify-center border-b border-neutral-800">
                      <Terminal size={40} className="text-neutral-700 group-hover:scale-110 transition-transform duration-500" />
                      {/* Overlay On Hover */}
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a href="#" className="w-12 h-12 bg-samurai-gold text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <ExternalLink size={20} />
                        </a>
                        <a href="#" className="w-12 h-12 bg-neutral-800 text-white rounded-full flex items-center justify-center hover:bg-neutral-700 transition-colors">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-white mb-2 group-hover:text-samurai-gold transition-colors">SISTEMA</h3>
                      <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate, sapien at laoreet viverra, diam ipsum varius justo, sed aliquet justo dolor at arcu.
                      </p>
                      <div className="flex gap-3 font-mono text-xs text-neutral-500">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>MongoDB</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SEÇÃO: CONTATO --- */}
        <section id="contato" className="py-24">
          <div className="max-w-5xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-16 flex items-center gap-4 justify-center">
                <span className="text-samurai-gold font-mono text-lg">04.</span> Envie uma Mensagem
              </h2>

              <div className="grid md:grid-cols-5 gap-12 bg-neutral-950 border border-neutral-800 p-8 md:p-12">
                {/* Info */}
                <div className="md:col-span-2 space-y-8">
                  <h3 className="font-serif text-2xl text-white mb-6">Informações</h3>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <Mail className="text-samurai-gold" /> lorem@ipsum.com
                  </div>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <Phone className="text-samurai-gold" /> +00 00 00000-0000
                  </div>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <MapPin className="text-samurai-gold" /> Lorem ipsum, Lorem
                  </div>
                </div>

                {/* Formulário (Design Prototype) */}
                <form className="md:col-span-3 space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Seu Nome" className="w-full bg-black border border-neutral-800 p-4 font-mono text-sm text-white focus:outline-none focus:border-samurai-gold transition-colors" />
                    <input type="email" placeholder="Seu Email" className="w-full bg-black border border-neutral-800 p-4 font-mono text-sm text-white focus:outline-none focus:border-samurai-gold transition-colors" />
                  </div>
                  <textarea placeholder="Sua Mensagem..." rows="4" className="w-full bg-black border border-neutral-800 p-4 font-mono text-sm text-white focus:outline-none focus:border-samurai-gold transition-colors resize-none"></textarea>
                  <button className="w-full bg-samurai-gold text-black py-4 font-bold uppercase tracking-widest text-sm hover:bg-yellow-500 transition-colors">
                    Enviar Pergaminho
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="border-t border-neutral-900 bg-black py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-neutral-500 tracking-widest">
            © {new Date().getFullYear()} CÓDIGO E HONRA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-samurai-gold transition-colors"><Github size={18} /></a>
            <a href="#" className="text-neutral-500 hover:text-samurai-gold transition-colors"><Linkedin size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;